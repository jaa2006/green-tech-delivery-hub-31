import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User2, Bike, Utensils } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import MainLayout from "../components/layout/MainLayout";
import PopularFoodCard from "../components/food/PopularFoodCard";
import { IllustratedLoginButton } from "@/components/ui/illustrated-login-button";

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

const Index = () => {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem("has_seen_onboarding");
    
    if (!hasSeenOnboarding) {
      navigate("/onboarding");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const roleDoc = await getDoc(doc(db, "users", user.uid));
          const role = roleDoc.data()?.role;

          if (role === "user") {
            navigate("/user-dashboard");
          } else if (role === "driver") {
            navigate("/driver-dashboard");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#095155] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#095155] px-6 py-6 flex justify-between items-center rounded-b-3xl">
        <h1 className="text-white text-2xl font-semibold">habisin</h1>
        <div className="bg-white p-2 rounded-full">
          <User2 className="text-[#095155] w-6 h-6" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Selamat Datang!</h2>
        <p className="text-gray-700 mb-6">Pilih cara masuk</p>

        {/* 3D Illustrated Login Options */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Link to="/login-user">
            <IllustratedLoginButton 
              characterImage="/lovable-uploads/6afe9b4e-5522-415f-bc48-c4d7447f2617.png"
              variant="user"
            >
              Masuk Sebagai User
            </IllustratedLoginButton>
          </Link>
          
          <Link to="/login-driver">
            <IllustratedLoginButton 
              characterImage="/lovable-uploads/45a59870-fa09-4389-ad40-18b7d43fbb08.png"
              variant="driver"
            >
              Masuk Sebagai Driver
            </IllustratedLoginButton>
          </Link>
        </div>

        {/* Service Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-300 text-gray-500 flex flex-col items-center justify-center p-6 rounded-xl opacity-50">
            <Bike className="w-8 h-8 mb-2" />
            <span className="text-lg font-medium">HabiRide</span>
            <span className="text-xs">Login dulu</span>
          </div>
          
          <div className="bg-gray-300 text-gray-500 flex flex-col items-center justify-center p-6 rounded-xl opacity-50">
            <Utensils className="w-8 h-8 mb-2" />
            <span className="text-lg font-medium">HabiFood</span>
            <span className="text-xs">Login dulu</span>
          </div>
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
  );
};

export default Index;
