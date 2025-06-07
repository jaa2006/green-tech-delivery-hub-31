
import React, { useState, useEffect } from 'react';
import { MapPin, Crosshair, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number; address: string };
  placeholder?: string;
  label?: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  initialLocation,
  placeholder = "Masukkan alamat...",
  label = "Lokasi"
}) => {
  const [address, setAddress] = useState(initialLocation?.address || '');
  const [isLoadingGPS, setIsLoadingGPS] = useState(false);
  const [showGPSPermissionDialog, setShowGPSPermissionDialog] = useState(false);

  const requestGPSPermission = () => {
    setShowGPSPermissionDialog(true);
  };

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "GPS tidak tersedia",
        description: "Browser Anda tidak mendukung GPS",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingGPS(true);
    setShowGPSPermissionDialog(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Simulate reverse geocoding - in real app, use proper geocoding service
        const simulatedAddress = `Jl. Contoh No. ${Math.floor(Math.random() * 100)}, Malang`;
        
        setAddress(simulatedAddress);
        onLocationSelect({
          lat: latitude,
          lng: longitude,
          address: simulatedAddress
        });
        
        setIsLoadingGPS(false);
        toast({
          title: "Lokasi berhasil dideteksi",
          description: simulatedAddress,
        });
      },
      (error) => {
        setIsLoadingGPS(false);
        console.error('GPS Error:', error);
        
        if (error.code === error.PERMISSION_DENIED) {
          requestGPSPermission();
        } else {
          toast({
            title: "Gagal mendapatkan lokasi",
            description: "Pastikan GPS aktif dan coba lagi",
            variant: "destructive",
          });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    // Simulate geocoding for manual address input
    if (value.length > 5) {
      const simulatedLocation = {
        lat: -7.9666 + (Math.random() - 0.5) * 0.01,
        lng: 112.6326 + (Math.random() - 0.5) * 0.01,
        address: value
      };
      onLocationSelect(simulatedLocation);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder={placeholder}
            className="w-full"
          />
        </div>
        
        <Button
          onClick={handleUseCurrentLocation}
          disabled={isLoadingGPS}
          className="bg-[#07595A] hover:bg-[#064d4e] text-white px-3"
          size="sm"
        >
          {isLoadingGPS ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Crosshair className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* GPS Permission Dialog */}
      {showGPSPermissionDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Izinkan Akses GPS</h3>
                <p className="text-sm text-gray-600">Untuk mendeteksi lokasi Anda</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Habisin membutuhkan akses lokasi untuk memberikan layanan terbaik. 
              Silakan aktifkan GPS dan berikan izin akses lokasi.
            </p>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowGPSPermissionDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Nanti Saja
              </Button>
              <Button
                onClick={handleUseCurrentLocation}
                className="flex-1 bg-[#07595A] hover:bg-[#064d4e] text-white"
              >
                Coba Lagi
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
