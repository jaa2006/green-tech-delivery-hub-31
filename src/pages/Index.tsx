
import { useState } from "react";
import { Link } from "react-router-dom";
import { User2, Bike, Utensils } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import PopularFoodCard from "../components/food/PopularFoodCard";

// Sample popular food data
const popularFoods = [
  {
    id: 1,
    name: "Burger Deluxe",
    price: 45000,
    restaurant: "Burger King",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&h=200"
  },
  {
    id: 2,
    name: "Nasi Goreng Special",
    price: 35000,
    restaurant: "Warung Padang",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&h=200"
  },
  {
    id: 3,
    name: "Ayam Bakar",
    price: 28000,
    restaurant: "Ayam Geprek",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&h=200"
  },
  {
    id: 4,
    name: "Mie Goreng",
    price: 22000,
    restaurant: "Mie Gacoan",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=300&h=200"
  },
];

const Index = () => {
  const [userName] = useState("Budi");

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-habisin-dark px-4 py-5 flex justify-between items-center rounded-b-3xl shadow-md">
          <h1 className="text-white text-2xl font-semibold">habisin</h1>
          <div className="bg-white p-2 rounded-full">
            <User2 className="text-habisin-dark w-6 h-6" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-1">Welcome, {userName}!</h2>
          <p className="text-gray-700 mb-6">Choose a service</p>

          {/* Service Buttons */}
          <div className="grid grid-cols-2 gap-4 my-8">
            <Link
              to="/habiride"
              className="bg-habisin-dark text-white flex flex-col items-center justify-center p-6 rounded-xl shadow-md hover:bg-habisin-dark/90 transition-colors"
            >
              <Bike className="w-8 h-8 mb-2" />
              <span className="text-lg font-semibold">HabiRide</span>
            </Link>
            
            <Link
              to="/habifood"
              className="bg-habisin-light text-white flex flex-col items-center justify-center p-6 rounded-xl shadow-md hover:bg-habisin-light/90 transition-colors"
            >
              <Utensils className="w-8 h-8 mb-2" />
              <span className="text-lg font-semibold">HabiFood</span>
            </Link>
          </div>

          {/* Popular Picks */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Popular Picks</h2>
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

export default Index;
