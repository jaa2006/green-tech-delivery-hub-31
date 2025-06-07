
import React from 'react';
import { MapPin, Star, Package, Edit2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RideBottomSheetProps {
  state: 'destination' | 'driver_coming' | 'driver_arrived';
  destination?: string;
  destinationAddress?: string;
  driverName?: string;
  driverRating?: number;
  reviewCount?: number;
  remainingQuota?: number;
  onConfirmDestination?: () => void;
  onConfirmOrder?: () => void;
  onCancel?: () => void;
  onArrivedAtPickup?: () => void;
  onEditDestination?: () => void;
}

const RideBottomSheet: React.FC<RideBottomSheetProps> = ({
  state,
  destination = "Universitas Brawijaya",
  destinationAddress = "Jl. Veteran, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145",
  driverName = "Naksu Cahya Putri",
  driverRating = 4.5,
  reviewCount = 498,
  remainingQuota = 5,
  onConfirmDestination,
  onConfirmOrder,
  onCancel,
  onArrivedAtPickup,
  onEditDestination
}) => {
  const renderDestinationState = () => (
    <div className="p-6 bg-white rounded-t-3xl shadow-lg">
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Konfirmasi tujuan</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEditDestination}
            className="text-blue-600 hover:text-blue-700"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
            <MapPin className="h-4 w-4 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{destination}</h3>
            <p className="text-sm text-gray-600 mt-1">{destinationAddress}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-600">Kuota harian</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">Sisa {remainingQuota}</span>
          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-orange-600">!</span>
          </div>
        </div>
      </div>

      <Button
        onClick={onConfirmDestination}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium text-base"
      >
        Konfirmasi tujuan ini
      </Button>
    </div>
  );

  const renderDriverComingState = () => (
    <div className="p-6 bg-white rounded-t-3xl shadow-lg">
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
      
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">Dijemput oleh</div>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {driverName?.charAt(0) || 'N'}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{driverName}</h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{driverRating}</span>
              <span className="text-sm text-gray-600">({reviewCount})</span>
              <div className="flex items-center space-x-1 ml-2">
                <Package className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600">Berat badan: 120kg</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Phone className="h-4 w-4" />
            </div>
          </Button>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
            <MapPin className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{destination}</h4>
            <p className="text-sm text-gray-600 mt-1">{destinationAddress}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onConfirmOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium text-base"
        >
          Konfirmasi Pesanan
        </Button>
        
        <Button
          onClick={onCancel}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-xl font-medium text-base"
        >
          Batalkan
        </Button>
      </div>
    </div>
  );

  const renderDriverArrivedState = () => (
    <div className="p-6 bg-white rounded-t-3xl shadow-lg">
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
      
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">Dijemput oleh</div>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {driverName?.charAt(0) || 'N'}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{driverName}</h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{driverRating}</span>
              <span className="text-sm text-gray-600">({reviewCount})</span>
              <div className="flex items-center space-x-1 ml-2">
                <Package className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600">Berat badan: 120kg</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Phone className="h-4 w-4" />
            </div>
          </Button>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
            <MapPin className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{destination}</h4>
            <p className="text-sm text-gray-600 mt-1">{destinationAddress}</p>
          </div>
        </div>
      </div>

      <Button
        onClick={onArrivedAtPickup}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium text-base"
      >
        Tiba di titik jemput
      </Button>
    </div>
  );

  switch (state) {
    case 'destination':
      return renderDestinationState();
    case 'driver_coming':
      return renderDriverComingState();
    case 'driver_arrived':
      return renderDriverArrivedState();
    default:
      return renderDestinationState();
  }
};

export default RideBottomSheet;
