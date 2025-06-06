
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup today
    const lastShown = localStorage.getItem('promoPopupLastShown');
    const today = new Date().toDateString();
    
    if (lastShown !== today) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remember that user has seen the popup today
    localStorage.setItem('promoPopupLastShown', new Date().toDateString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm mx-auto p-0 bg-transparent border-none shadow-none">
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/89c18810-2f40-4279-85a3-a10a146ab390.png" 
              alt="First Launch Promo - Get 50% OFF" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoPopup;
