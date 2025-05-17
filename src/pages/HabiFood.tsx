
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, ArrowLeft, Star } from "lucide-react";

// Sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "Delicious Bites",
    rating: 4.8,
    estimatedTime: "15-20",
    cuisineType: "Indonesian",
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 2,
    name: "Taste Corner",
    rating: 4.5,
    estimatedTime: "20-30",
    cuisineType: "Fast Food",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 3,
    name: "Food Lovers",
    rating: 4.7,
    estimatedTime: "25-35",
    cuisineType: "Japanese",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=300&h=200"
  },
];

const HabiFood = () => {
  const [deliveryAddress] = useState("Jl. Sudifrman No 12");

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-habisin-dark px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="mr-3">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-white text-2xl font-semibold">habifood</h1>
        </div>
        <div>
          <Search className="h-6 w-6 text-white" />
        </div>
      </div>
      
      {/* White content area */}
      <div className="bg-white rounded-t-3xl -mt-2 px-4 pt-6 pb-4">
        {/* Delivery address */}
        <div className="mb-4">
          <p className="text-sm font-medium">Delivery to</p>
          <div className="flex items-center">
            <p className="font-medium">{deliveryAddress}</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:outline-none"
          />
        </div>

        {/* Restaurants section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Restaurants</h2>
          <div className="space-y-4">
            {restaurants.map(restaurant => (
              <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="flex gap-3 items-center">
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{restaurant.name}</h3>
                  <div className="flex items-center mt-1">
                    <p className="font-medium mr-1">{restaurant.rating}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(restaurant.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabiFood;
