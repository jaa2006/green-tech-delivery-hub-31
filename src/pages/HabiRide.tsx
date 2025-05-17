
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft, Motor } from "lucide-react";
import { Button } from "@/components/ui/button";

const HabiRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  
  // Calculate estimated price based on some criteria
  const estimatedPrice = pickup && destination ? Math.floor(Math.random() * (50000 - 15000) + 15000) : 0;
  
  // Calculate estimated time (in minutes)
  const estimatedTime = pickup && destination ? Math.floor(Math.random() * (30 - 5) + 5) : 0;
  
  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const recentLocations = [
    "Jl. Sudirman No. 12",
    "Mall Grand Indonesia",
    "Apartemen Taman Anggrek",
    "Kota Kasablanka"
  ];

  return (
    <div className="mobile-container bg-background">
      <div className="py-4">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">HabiRide</h1>
        </div>
        
        {/* Map background (simulated) */}
        <div className="relative h-48 bg-gradient-to-b from-green-50 to-blue-50 rounded-2xl mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80')] opacity-30 bg-center bg-no-repeat bg-cover"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-2 rounded-full shadow-lg">
              <Motor className="h-8 w-8 text-habisin-dark" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Pickup location */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 rounded-full bg-habisin-dark flex items-center justify-center">
                <MapPin className="h-3 w-3 text-white" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Pickup location"
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-habisin-dark/20"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
          
          {/* Destination */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 rounded-full bg-gray-400 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-white" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Destination"
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-habisin-dark/20"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          
          {/* Recent locations */}
          {(pickup === "" || destination === "") && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Recent locations:</h3>
              <div className="space-y-2">
                {recentLocations.map((location, index) => (
                  <div 
                    key={index}
                    onClick={() => pickup === "" ? setPickup(location) : setDestination(location)}
                    className="p-2 rounded-lg hover:bg-muted cursor-pointer flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{location}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Estimated info (only show if both fields are filled) */}
          {pickup && destination && (
            <div className="mt-6 habisin-card">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Estimated Price:</span>
                <span className="text-habisin-dark font-bold">{formatPrice(estimatedPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Estimated Time:</span>
                <span className="font-bold">{estimatedTime} minutes</span>
              </div>
            </div>
          )}

          {/* Book ride button */}
          <Button 
            disabled={!pickup || !destination}
            className={`w-full mt-6 py-6 text-lg font-medium rounded-2xl ${
              pickup && destination 
                ? "bg-habisin-dark hover:bg-habisin-dark/90" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            onClick={() => {
              if (pickup && destination) {
                alert("Booking your ride... This would be connected to a real booking flow in a production app.");
              }
            }}
          >
            Book Ride Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HabiRide;
