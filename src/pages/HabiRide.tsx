
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";

const HabiRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  
  return (
    <div className="min-h-screen bg-habisin-dark relative">
      {/* Header */}
      <div className="px-4 py-4 flex items-center">
        <Link to="/" className="mr-3">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>
        <h1 className="text-white text-2xl font-semibold">HabiRide Service</h1>
      </div>
      
      {/* Form area */}
      <div className="px-4 pt-6 pb-4">
        {/* Set pickup location */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="flex items-center px-4 py-4">
            <div className="w-6 mr-3 flex justify-center">
              <div className="w-3 h-3 bg-habisin-dark rounded-full"></div>
            </div>
            <input
              type="text"
              placeholder="Set pickup location"
              className="flex-1 outline-none text-gray-800"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
        </div>
        
        {/* Set destination */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center px-4 py-4">
            <div className="w-6 mr-3 flex justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <input
              type="text"
              placeholder="Set destination"
              className="flex-1 outline-none text-gray-800"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Map area (placeholder) */}
      <div className="flex-1 h-[50vh] bg-gray-100 relative flex items-center justify-center">
        <div className="h-16 w-16 bg-habisin-dark rounded-full flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12L16 16M12 12L8 16M12 12V6M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Book ride button */}
      <div className="absolute bottom-8 left-0 right-0 px-4">
        <button 
          className="bg-habisin-dark text-white w-full py-4 rounded-full font-medium text-lg"
          disabled={!pickup || !destination}
        >
          Book Your Ride Now
        </button>
      </div>
    </div>
  );
};

export default HabiRide;
