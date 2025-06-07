
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MapPin, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LocationPicker from './LocationPicker';

interface DestinationConfirmContainerProps {
  destination: string;
  destinationAddress: string;
  pickupLocation: { lat: number; lng: number; address: string };
  onDestinationChange: (location: { lat: number; lng: number; address: string }) => void;
  onPickupLocationChange: (location: { lat: number; lng: number; address: string }) => void;
  onConfirmDestination: () => void;
  remainingQuota?: number;
}

const DestinationConfirmContainer: React.FC<DestinationConfirmContainerProps> = ({
  destination,
  destinationAddress,
  pickupLocation,
  onDestinationChange,
  onPickupLocationChange,
  onConfirmDestination,
  remainingQuota = 5
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingDestination, setIsEditingDestination] = useState(false);

  return (
    <div className="bg-white rounded-t-3xl shadow-lg overflow-hidden">
      {/* Header - Always visible */}
      <div 
        className="p-4 bg-[#07595A] flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold text-white">Konfirmasi Perjalanan</h2>
        <div className="text-white">
          {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Pickup Location */}
          <div>
            <LocationPicker
              label="Lokasi Jemput"
              placeholder="Lokasi penjemputan..."
              initialLocation={pickupLocation}
              onLocationSelect={onPickupLocationChange}
            />
          </div>

          {/* Destination */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Tujuan</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingDestination(!isEditingDestination)}
                className="text-[#07595A] hover:text-[#064d4e] p-1 h-auto"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                {isEditingDestination ? 'Selesai' : 'Edit'}
              </Button>
            </div>
            
            {isEditingDestination ? (
              <LocationPicker
                placeholder="Masukkan tujuan..."
                initialLocation={{ lat: 0, lng: 0, address: destinationAddress }}
                onLocationSelect={(location) => {
                  onDestinationChange(location);
                  setIsEditingDestination(false);
                }}
              />
            ) : (
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-[#07595A] rounded-full flex items-center justify-center mt-1">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{destination}</h4>
                  <p className="text-sm text-gray-600 mt-1">{destinationAddress}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quota Info */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
            <span className="text-sm text-gray-700">Kuota harian tersisa</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900">{remainingQuota}</span>
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">!</span>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <Button
            onClick={onConfirmDestination}
            className="w-full bg-[#07595A] hover:bg-[#064d4e] text-white py-3 rounded-xl font-medium text-base"
          >
            Konfirmasi Perjalanan
          </Button>
        </div>
      )}
    </div>
  );
};

export default DestinationConfirmContainer;
