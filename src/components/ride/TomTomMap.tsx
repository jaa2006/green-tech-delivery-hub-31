
import React, { useEffect, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as services from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const TomTomMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = tt.map({
      key: "iA54SRddlkPve4SnJ18SpJQPe91ZQZNu",
      container: mapRef.current,
      center: [106.8272, -6.1751],
      zoom: 13,
    });

    // Tambahkan marker
    const marker = new tt.Marker().setLngLat([106.8272, -6.1751]).addTo(map);

    // Contoh: Search tempat
    services.services
      .fuzzySearch({
        key: "iA54SRddlkPve4SnJ18SpJQPe91ZQZNu",
        query: "Restoran",
        center: { lat: -6.1751, lon: 106.8272 },
        radius: 5000,
        limit: 5,
      })
      .then((res) => {
        console.log("Hasil Pencarian:", res);
      })
      .catch((error) => {
        console.error("Error dalam pencarian:", error);
      });

    // Cleanup function
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div>
      <h2>Peta HabiRide</h2>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default TomTomMap;
