
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User2, LogOut, Truck, CheckCircle, Clock } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { AnimatedButton } from "@/components/ui/animated-button";

interface Order {
  id: string;
  user_id: string;
  lokasi_jemput: string;
  tujuan: string;
  status: "waiting" | "accepted";
  driver_id?: string;
  userName?: string;
}

const DriverDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [driverName, setDriverName] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();
          if (userData && userData.role === "driver") {
            setDriverName(userData.name);
            
            // Listen to waiting orders
            const ordersQuery = query(
              collection(db, "orders"),
              where("status", "==", "waiting")
            );
            
            const ordersUnsubscribe = onSnapshot(ordersQuery, (snapshot) => {
              const ordersData: Order[] = [];
              snapshot.forEach((doc) => {
                ordersData.push({ id: doc.id, ...doc.data() } as Order);
              });
              setOrders(ordersData);
            });

            return () => ordersUnsubscribe();
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logout berhasil",
        description: "Sampai jumpa lagi!",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const acceptOrder = async (orderId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(db, "orders", orderId), {
        status: "accepted",
        driver_id: user.uid,
      });

      toast({
        title: "Order diterima",
        description: "Anda telah menerima order ini",
      });
    } catch (error) {
      console.error("Error accepting order:", error);
      toast({
        title: "Error",
        description: "Gagal menerima order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07595A] to-black">
      {/* Header */}
      <div className="bg-[#095155] px-6 py-6 flex justify-between items-center rounded-b-3xl">
        <div>
          <h1 className="text-white text-2xl font-semibold">Driver Dashboard</h1>
          <p className="text-white/80 text-sm">Halo, {driverName}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">
            <Truck className="text-[#095155] w-6 h-6" />
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <LogOut className="text-white w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">Order Tersedia</h2>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">Belum ada order tersedia</p>
            <p className="text-gray-400 text-sm">Order baru akan muncul di sini</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Order Baru</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Jemput di:</p>
                        <p className="font-medium">{order.lokasi_jemput}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tujuan:</p>
                        <p className="font-medium">{order.tujuan}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3 mr-1" />
                      Menunggu
                    </span>
                  </div>
                </div>
                
                <AnimatedButton
                  onClick={() => acceptOrder(order.id)}
                  className="w-full"
                  icon={<CheckCircle className="w-4 h-4" />}
                >
                  Terima Order
                </AnimatedButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
