import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft, Car } from "lucide-react";
import { collection, addDoc, onSnapshot, query, where, serverTimestamp, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMapTracking } from "@/hooks/useMapTracking";
import "@/styles/map.css";

const HabiRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [driverLocation, setDriverLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  
  const { currentUser } = useAuth();
  
  // Initialize map tracking when there's an active order with a driver
  const mapInstance = useMapTracking({
    driverId: activeOrder?.driverId || null,
    enabled: !!activeOrder?.driverId
  });
  
  // Listen for user's active orders
  useEffect(() => {
    if (!currentUser) return;
    
    const userId = currentUser.uid;
    const ordersRef = collection(db, "orders");
    const activeOrdersQuery = query(
      ordersRef,
      where("userId", "==", userId),
      where("status", "in", ["pending", "accepted", "on_the_way"])
    );
    
    const unsubscribe = onSnapshot(activeOrdersQuery, (snapshot) => {
      if (!snapshot.empty) {
        const orderData = snapshot.docs[0].data();
        const orderId = snapshot.docs[0].id;
        setActiveOrder({ id: orderId, ...orderData });
        setShowOrderStatus(true);
        
        // If order has a driver assigned, listen for driver location
        if (orderData.driverId) {
          listenToDriverLocation(orderData.driverId);
        }
      } else {
        setActiveOrder(null);
        setShowOrderStatus(false);
        setDriverLocation(null);
      }
    }, (error) => {
      console.error("Error fetching active orders:", error);
      toast({
        title: "Error",
        description: "Failed to fetch your active orders",
        variant: "destructive",
      });
    });
    
    return () => unsubscribe();
  }, [currentUser]);
  
  // Function to listen for driver location updates
  const listenToDriverLocation = (driverId: string) => {
    const driverLocationRef = doc(db, "driver_locations", driverId);
    
    return onSnapshot(driverLocationRef, (snapshot) => {
      if (snapshot.exists()) {
        const locationData = snapshot.data();
        setDriverLocation({
          lat: locationData.lat,
          lng: locationData.lng
        });
      }
    }, (error) => {
      console.error("Error fetching driver location:", error);
    });
  };
  
  // Function to book a ride
  const bookRide = async () => {
    if (!pickup || !destination) return;
    
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a ride",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, we'd use a geocoding API to convert addresses to coordinates
      // For this example, we'll use dummy coordinates
      const pickupLocation = {
        lat: 37.7749 + (Math.random() - 0.5) * 0.1,
        lng: -122.4194 + (Math.random() - 0.5) * 0.1
      };
      
      const destinationLocation = {
        lat: 37.7749 + (Math.random() - 0.5) * 0.1,
        lng: -122.4194 + (Math.random() - 0.5) * 0.1
      };
      
      // Create new order in Firestore
      await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        driverId: null,
        status: "pending",
        pickupLocation,
        destination: destinationLocation,
        pickupAddress: pickup,
        destinationAddress: destination,
        createdAt: serverTimestamp(),
      });
      
      toast({
        title: "Ride Requested",
        description: "Your ride request has been submitted successfully!",
      });
      
      // Reset form
      setPickup("");
      setDestination("");
      
    } catch (error) {
      console.error("Error booking ride:", error);
      toast({
        title: "Error",
        description: "Failed to book your ride. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to display status in a user-friendly way
  const formatStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Searching for driver...";
      case "accepted":
        return "Driver accepted your ride";
      case "on_the_way":
        return "Driver is on the way";
      case "done":
        return "Ride completed";
      default:
        return "Unknown status";
    }
  };
  
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
        
        {/* Map area */}
        <div className="h-[40vh] bg-gray-100 rounded-xl mb-8 relative">
          {activeOrder?.driverId ? (
            <div id="map" className="w-full h-full rounded-xl"></div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="h-16 w-16 bg-habisin-dark rounded-full flex items-center justify-center">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
          )}
          
          {/* Display driver location info if available */}
          {driverLocation && (
            <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md">
              <p className="text-xs font-medium">Driver location:</p>
              <p className="text-xs">Lat: {driverLocation.lat.toFixed(4)}</p>
              <p className="text-xs">Lng: {driverLocation.lng.toFixed(4)}</p>
            </div>
          )}
        </div>
        
        {/* Book ride button */}
        <button 
          className="bg-habisin-dark text-white w-full py-4 rounded-xl font-medium text-lg"
          disabled={!pickup || !destination || loading || activeOrder !== null}
          onClick={bookRide}
        >
          {loading ? "Processing..." : activeOrder ? "Ride in progress" : "Book Ride"}
        </button>
      </div>
      
      {/* Order Status Dialog */}
      <Dialog open={showOrderStatus} onOpenChange={setShowOrderStatus}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ride Status</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {activeOrder && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-habisin-dark"></div>
                  <p className="text-sm font-medium">{activeOrder.pickupAddress}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="text-sm font-medium">{activeOrder.destinationAddress}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-medium">Status: <span className="text-habisin-dark">{formatStatus(activeOrder.status)}</span></p>
                  {driverLocation && (
                    <p className="text-sm mt-2">
                      Driver is {Math.floor(Math.random() * 10) + 1} minutes away
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HabiRide;
