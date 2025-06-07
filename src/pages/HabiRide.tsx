
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Car } from "lucide-react";
import { collection, addDoc, onSnapshot, query, where, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { ModernMapComponent } from "@/components/ride/ModernMapComponent";
import RideBottomSheet from "@/components/ride/RideBottomSheet";
import EmergencyButton from "@/components/ride/EmergencyButton";
import DestinationConfirmContainer from "@/components/ride/DestinationConfirmContainer";

const HabiRide = () => {
  const [rideState, setRideState] = useState<'destination' | 'driver_coming' | 'driver_arrived'>('destination');
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [driverLocation, setDriverLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [pickupLocation, setPickupLocation] = useState({
    lat: -7.9666,
    lng: 112.6326,
    address: "Lokasi Anda"
  });
  const [destinationLocation, setDestinationLocation] = useState({
    lat: -7.9566,
    lng: 112.6146,
    address: "Universitas Brawijaya, Jl. Veteran, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145"
  });
  
  const { currentUser } = useAuth();
  
  // Simulate driver location for demo
  useEffect(() => {
    if (rideState === 'driver_coming' || rideState === 'driver_arrived') {
      setDriverLocation({
        lat: -6.2098 + (Math.random() - 0.5) * 0.01,
        lng: 106.8446 + (Math.random() - 0.5) * 0.01
      });
    }
  }, [rideState]);
  
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
        
        // Update ride state based on order status
        switch (orderData.status) {
          case "pending":
            setRideState('destination');
            break;
          case "accepted":
            setRideState('driver_coming');
            break;
          case "on_the_way":
            setRideState('driver_arrived');
            break;
        }
      } else {
        setActiveOrder(null);
        setRideState('destination');
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
  
  const handleConfirmDestination = async () => {
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
      await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        driverId: null,
        status: "pending",
        pickupLocation,
        destination: destinationLocation,
        pickupAddress: pickupLocation.address,
        destinationAddress: destinationLocation.address,
        createdAt: serverTimestamp(),
      });
      
      toast({
        title: "Tujuan Dikonfirmasi",
        description: "Mencari driver terdekat...",
      });
      
      // Simulate driver acceptance after 3 seconds
      setTimeout(() => {
        setRideState('driver_coming');
      }, 3000);
      
    } catch (error) {
      console.error("Error booking ride:", error);
      toast({
        title: "Error",
        description: "Failed to confirm destination. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = () => {
    toast({
      title: "Pesanan Dikonfirmasi",
      description: "Driver sedang dalam perjalanan ke lokasi Anda",
    });
    setRideState('driver_arrived');
  };

  const handleCancel = async () => {
    if (!activeOrder) return;
    
    try {
      setLoading(true);
      await deleteDoc(doc(db, "orders", activeOrder.id));
      toast({
        title: "Pesanan dibatalkan",
        description: "Pesanan Anda telah dibatalkan",
      });
      setRideState('destination');
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast({
        title: "Gagal membatalkan pesanan",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleArrivedAtPickup = () => {
    toast({
      title: "Perjalanan Dimulai",
      description: "Selamat menikmati perjalanan Anda!",
    });
  };

  const handleEditDestination = () => {
    toast({
      title: "Edit Tujuan",
      description: "Fitur edit tujuan akan segera tersedia",
    });
  };

  return (
    <div className="min-h-screen bg-[#07595A] flex flex-col">
      {/* Header - Same style as home page */}
      <div className="bg-[#07595A] px-6 py-4 flex justify-between items-center shadow-lg relative z-10">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          <div>
            <h1 className="text-white text-2xl font-bold">HabiRide</h1>
            <p className="text-white/80 text-sm">Transportasi Cepat & Aman</p>
          </div>
        </div>
        <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
          <Car className="text-white w-6 h-6" />
        </div>
      </div>
      
      {/* Map Container - Full height when container is hidden */}
      <div className="flex-1 relative">
        <ModernMapComponent 
          driverLocation={driverLocation}
          userLocation={pickupLocation}
          showRoute={rideState !== 'destination'}
        />
        
        {/* Emergency Button */}
        <EmergencyButton />
        
        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0">
          {rideState === 'destination' ? (
            <DestinationConfirmContainer
              destination="Universitas Brawijaya"
              destinationAddress={destinationLocation.address}
              pickupLocation={pickupLocation}
              onDestinationChange={(location) => setDestinationLocation(location)}
              onPickupLocationChange={(location) => setPickupLocation(location)}
              onConfirmDestination={handleConfirmDestination}
              remainingQuota={5}
            />
          ) : (
            <RideBottomSheet
              state={rideState}
              destination="Universitas Brawijaya"
              destinationAddress={destinationLocation.address}
              onConfirmOrder={() => {
                toast({
                  title: "Pesanan Dikonfirmasi",
                  description: "Driver sedang dalam perjalanan ke lokasi Anda",
                });
                setRideState('driver_arrived');
              }}
              onCancel={async () => {
                if (!activeOrder) return;
                
                try {
                  setLoading(true);
                  await deleteDoc(doc(db, "orders", activeOrder.id));
                  toast({
                    title: "Pesanan dibatalkan",
                    description: "Pesanan Anda telah dibatalkan",
                  });
                  setRideState('destination');
                } catch (error) {
                  console.error("Error cancelling order:", error);
                  toast({
                    title: "Gagal membatalkan pesanan",
                    description: "Terjadi kesalahan. Silakan coba lagi.",
                    variant: "destructive",
                  });
                } finally {
                  setLoading(false);
                }
              }}
              onArrivedAtPickup={() => {
                toast({
                  title: "Perjalanan Dimulai",
                  description: "Selamat menikmati perjalanan Anda!",
                });
              }}
              onEditDestination={() => {
                toast({
                  title: "Edit Tujuan",
                  description: "Fitur edit tujuan akan segera tersedia",
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HabiRide;
