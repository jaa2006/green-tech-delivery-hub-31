
import React, { useEffect, useRef, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ttapi from '@tomtom-international/web-sdk-services';

interface TomTomMapProps {
  userLocation?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
  onRouteCalculated?: (distance: string, duration: string) => void;
}

const TOMTOM_API_KEY = 'iA54SRddlkPve4SnJ18SpJQPe91ZQZNu';

export const TomTomMap: React.FC<TomTomMapProps> = ({
  userLocation = { lat: -7.9666, lng: 112.6326 },
  destination,
  onLocationUpdate,
  onRouteCalculated
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<tt.Map | null>(null);
  const [userMarker, setUserMarker] = useState<tt.Marker | null>(null);
  const [destinationMarker, setDestinationMarker] = useState<tt.Marker | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [evStations, setEvStations] = useState<any[]>([]);
  const [currentRoute, setCurrentRoute] = useState<any>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const mapInstance = tt.map({
      key: TOMTOM_API_KEY,
      container: mapRef.current,
      center: [userLocation.lng, userLocation.lat],
      zoom: 15,
      style: 'tomtom://vector/1/basic-main'
    });

    // Add user location marker
    const userMarkerElement = document.createElement('div');
    userMarkerElement.innerHTML = `
      <div style="
        width: 20px;
        height: 20px;
        background-color: #3b82f6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `;

    const userMarkerInstance = new tt.Marker({ element: userMarkerElement })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(mapInstance);

    setMap(mapInstance);
    setUserMarker(userMarkerInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Update user location
  useEffect(() => {
    if (!map || !userMarker) return;

    userMarker.setLngLat([userLocation.lng, userLocation.lat]);
    if (!destination) {
      map.setCenter([userLocation.lng, userLocation.lat]);
    }
  }, [userLocation, map, userMarker, destination]);

  // Add destination marker and route
  useEffect(() => {
    if (!map || !destination) return;

    // Remove existing destination marker
    if (destinationMarker) {
      destinationMarker.remove();
    }

    // Create destination marker
    const destMarkerElement = document.createElement('div');
    destMarkerElement.innerHTML = `
      <div style="
        width: 30px;
        height: 30px;
        background-color: #ef4444;
        border: 2px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `;

    const destMarkerInstance = new tt.Marker({ element: destMarkerElement })
      .setLngLat([destination.lng, destination.lat])
      .addTo(map);

    setDestinationMarker(destMarkerInstance);

    // Calculate route
    calculateRoute();
  }, [destination, map, userLocation]);

  const calculateRoute = async () => {
    if (!map || !destination) return;

    setLoading(true);
    try {
      const routeOptions = {
        key: TOMTOM_API_KEY,
        locations: `${userLocation.lng},${userLocation.lat}:${destination.lng},${destination.lat}`
      };

      const response = await ttapi.services.calculateRoute(routeOptions);
      
      if (response.routes && response.routes.length > 0) {
        const route = response.routes[0];
        setCurrentRoute(route);

        // Remove existing route
        if (map.getLayer('route')) {
          map.removeLayer('route');
          map.removeSource('route');
        }

        // Add route to map
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: route.legs[0].points
          }
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#f97316',
            'line-width': 4
          }
        });

        // Fit bounds to show route
        const bounds = new tt.LngLatBounds();
        bounds.extend([userLocation.lng, userLocation.lat]);
        bounds.extend([destination.lng, destination.lat]);
        map.fitBounds(bounds, { padding: 50 });

        // Callback with route info
        if (onRouteCalculated) {
          const distance = `${(route.summary.lengthInMeters / 1000).toFixed(1)} km`;
          const duration = `${Math.round(route.summary.travelTimeInSeconds / 60)} min`;
          onRouteCalculated(distance, duration);
        }
      }
    } catch (error) {
      console.error('Error calculating route:', error);
    } finally {
      setLoading(false);
    }
  };

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsTracking(true);
    setLoading(true);

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        if (onLocationUpdate) {
          onLocationUpdate(newLocation);
        }
        
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please check your browser settings.');
        setLoading(false);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  };

  const toggleTraffic = () => {
    if (!map) return;

    if (showTraffic) {
      // Remove traffic layer
      if (map.getLayer('traffic')) {
        map.removeLayer('traffic');
        map.removeSource('traffic');
      }
    } else {
      // Add traffic layer
      map.addSource('traffic', {
        type: 'vector',
        url: `https://api.tomtom.com/traffic/map/4/tile/flow/absolute/{z}/{x}/{y}.pbf?key=${TOMTOM_API_KEY}`
      });

      map.addLayer({
        id: 'traffic',
        type: 'line',
        source: 'traffic',
        'source-layer': 'Traffic flow',
        paint: {
          'line-color': [
            'case',
            ['<', ['get', 'speed_uncongested'], 0.5], '#ff0000',
            ['<', ['get', 'speed_uncongested'], 0.8], '#ffaa00',
            '#00ff00'
          ],
          'line-width': 3
        }
      });
    }

    setShowTraffic(!showTraffic);
  };

  const searchLocation = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const searchOptions = {
        key: TOMTOM_API_KEY,
        query: query,
        limit: 5,
        center: [userLocation.lng, userLocation.lat],
        radius: 50000
      };

      const response = await ttapi.services.fuzzySearch(searchOptions);
      setSearchResults(response.results || []);
    } catch (error) {
      console.error('Error searching location:', error);
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const findEVStations = async () => {
    setLoading(true);
    try {
      const searchOptions = {
        key: TOMTOM_API_KEY,
        query: 'electric vehicle charging station',
        center: [userLocation.lng, userLocation.lat],
        radius: 10000,
        limit: 10
      };

      const response = await ttapi.services.fuzzySearch(searchOptions);
      setEvStations(response.results || []);

      // Add EV station markers
      response.results?.forEach((station: any, index: number) => {
        const stationMarkerElement = document.createElement('div');
        stationMarkerElement.innerHTML = `
          <div style="
            width: 25px;
            height: 25px;
            background-color: #10b981;
            border: 2px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            font-size: 12px;
            color: white;
            font-weight: bold;
          ">⚡</div>
        `;

        new tt.Marker({ element: stationMarkerElement })
          .setLngLat([station.position.lon, station.position.lat])
          .setPopup(new tt.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-semibold">${station.poi?.name || 'EV Charging Station'}</h3>
              <p class="text-sm text-gray-600">${station.address?.freeformAddress || ''}</p>
            </div>
          `))
          .addTo(map!);
      });
    } catch (error) {
      console.error('Error finding EV stations:', error);
      alert('Unable to find EV charging stations.');
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await ttapi.services.reverseGeocode({
        key: TOMTOM_API_KEY,
        position: [lng, lat]
      });

      if (response.addresses && response.addresses.length > 0) {
        return response.addresses[0].address.freeformAddress;
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
    return 'Unknown location';
  };

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#07595A]"></div>
            <span className="text-gray-700">Loading...</span>
          </div>
        </div>
      )}

      {/* Control Panel */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 space-y-2 z-20 max-w-xs">
        {/* Search */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Cari lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation(searchQuery)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            onClick={() => searchLocation(searchQuery)}
            className="w-full bg-[#07595A] text-white py-2 px-3 rounded-md text-sm hover:bg-[#065658]"
          >
            Cari Lokasi
          </button>
        </div>

        {/* Control Buttons */}
        <div className="space-y-2">
          <button
            onClick={startLocationTracking}
            className={`w-full py-2 px-3 rounded-md text-sm ${
              isTracking 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isTracking ? 'Melacak Lokasi...' : 'Lacak Lokasi Saya'}
          </button>

          <button
            onClick={calculateRoute}
            disabled={!destination}
            className="w-full bg-blue-500 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-600 disabled:opacity-50"
          >
            Tampilkan Rute
          </button>

          <button
            onClick={toggleTraffic}
            className={`w-full py-2 px-3 rounded-md text-sm ${
              showTraffic 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showTraffic ? 'Sembunyikan Lalu Lintas' : 'Tampilkan Lalu Lintas'}
          </button>

          <button
            onClick={findEVStations}
            className="w-full bg-green-500 text-white py-2 px-3 rounded-md text-sm hover:bg-green-600"
          >
            Charger EV Terdekat
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-h-40 overflow-y-auto border-t pt-2">
            <h4 className="text-sm font-semibold mb-2">Hasil Pencarian:</h4>
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => {
                  const location = { lat: result.position.lat, lng: result.position.lon };
                  if (map) {
                    map.setCenter([location.lng, location.lat]);
                    map.setZoom(16);
                  }
                  setSearchResults([]);
                  setSearchQuery('');
                }}
                className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm border-b border-gray-100"
              >
                <div className="font-medium">{result.poi?.name || result.address?.freeformAddress}</div>
                <div className="text-gray-500 text-xs">{result.address?.freeformAddress}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Route Info */}
      {currentRoute && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-20">
          <h4 className="font-semibold text-sm mb-2">Informasi Rute</h4>
          <div className="text-sm space-y-1">
            <div>Jarak: {(currentRoute.summary.lengthInMeters / 1000).toFixed(1)} km</div>
            <div>Waktu: {Math.round(currentRoute.summary.travelTimeInSeconds / 60)} menit</div>
          </div>
        </div>
      )}
    </div>
  );
};
