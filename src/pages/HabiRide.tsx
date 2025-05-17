
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft, Car } from "lucide-react";

const HabiRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-habisin-dark px-4 py-4 flex justify-between items-center rounded-b-3xl">
        <div className="flex items-center">
          <Link to="/" className="mr-3">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-white text-2xl font-semibold">HabiRide</h1>
        </div>
        <div className="bg-white p-2 rounded-full">
          <Car className="text-habisin-dark w-6 h-6" />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Book a Ride</h2>
        <p className="text-gray-700 mb-6">Select your route details</p>
        
        {/* Form area */}
        <div className="mb-8">
          {/* Set pickup location */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
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
        <div className="h-[40vh] bg-gray-100 rounded-xl mb-8 relative flex items-center justify-center">
          <div className="h-16 w-16 bg-habisin-dark rounded-full flex items-center justify-center">
            <MapPin className="h-8 w-8 text-white" />
          </div>
        </div>
        
        {/* Book ride button */}
        <button 
          className="bg-habisin-dark text-white w-full py-4 rounded-xl font-medium text-lg"
          disabled={!pickup || !destination}
        >
          Book Ride
        </button>
      </div>
    </div>
  );
};

export default HabiRide;
