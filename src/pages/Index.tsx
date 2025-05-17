
import { useState } from "react";
import { Link } from "react-router-dom";
import { User2, Bike, Utensils } from "lucide-react";
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

const Index = () => {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* Header */}
        <div className="bg-habisin-dark px-4 py-4 flex justify-between items-center rounded-b-3xl">
          <h1 className="text-white text-2xl font-semibold">habisin</h1>
          <div className="bg-white p-2 rounded-full">
            <User2 className="text-habisin-dark w-6 h-6" />
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
                <Link to={`/food/${food.id}`} key={food.id} className="block">
                  <div className="overflow-hidden rounded-xl mb-2">
                    <img 
                      src={food.image} 
                      alt={food.name}
                      className="w-full h-32 object-cover" 
                    />
                  </div>
                  <h3 className="font-medium text-base">{food.name}</h3>
                  <p className="text-sm text-gray-500">IDR {food.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
