
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User2, Bike, Utensils, LogOut } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "../components/layout/MainLayout";
import PopularFoodCard from "../components/food/PopularFoodCard";

// Sample popular food data
const popularFoods = [
  {
    id: 1,
    name: "Burger",
    price: 30000,
    restaurant: "Delicious Bites",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&h=200"
  },
  {
    id: 2,
    name: "Fried Chicken",
    price: 25000,
    restaurant: "Taste Corner",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&h=200"
  },
  {
    id: 3,
    name: "Pizza",
    price: 35000,
    restaurant: "Food Lovers",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&h=200"
  },
  {
    id: 4,
    name: "Salad",
    price: 20000,
    restaurant: "Healthy Eats",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&h=200"
  },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();
          if (userData) {
            setUserName(userData.name);
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

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-habisin-dark px-6 py-6 flex justify-between items-center rounded-b-3xl">
          <div>
            <h1 className="text-white text-2xl font-semibold">habisin</h1>
            <p className="text-white/80 text-sm">Halo, {userName}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <User2 className="text-habisin-dark w-6 h-6" />
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
          <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
          <p className="text-gray-700 mb-6">Choose a service</p>

          {/* Service Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link
              to="/habiride"
              className="bg-habisin-dark text-white flex flex-col items-center justify-center p-6 rounded-xl"
            >
              <Bike className="w-8 h-8 mb-2" />
              <span className="text-lg font-medium">HabiRide</span>
            </Link>
            
            <Link
              to="/habifood"
              className="bg-habisin-dark text-white flex flex-col items-center justify-center p-6 rounded-xl"
            >
              <Utensils className="w-8 h-8 mb-2" />
              <span className="text-lg font-medium">HabiFood</span>
            </Link>
          </div>

          {/* Popular Items */}
          <div>
            <h2 className="text-xl font-bold mb-4">Popular Items</h2>
            <div className="grid grid-cols-2 gap-4">
              {popularFoods.map(food => (
                <PopularFoodCard key={food.id} food={food} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDashboard;
