
import { useState, useEffect } from "react";
import { MapPin, Zap } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TrackingEnabledPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrackingEnabledPopup = ({ isOpen, onClose }: TrackingEnabledPopupProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xs mx-auto p-4 bg-white border border-gray-200 shadow-lg">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center relative">
            <MapPin className="h-6 w-6 text-blue-600" />
            <div className="absolute -top-1 -right-1">
              <Zap className="h-4 w-4 text-yellow-500" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Pelacakan Real-time Aktif!</h3>
            <p className="text-sm text-gray-600 mt-1">Lokasi Anda akan dibagikan secara real-time dengan driver</p>
          </div>
          <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
            Anda dapat menonaktifkan ini kapan saja di pengaturan privasi
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrackingEnabledPopup;
