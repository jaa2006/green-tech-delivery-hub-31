
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, ArrowLeft, Star } from "lucide-react";
import RestaurantCard from "../components/food/RestaurantCard";

// Sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "Ayam Geprek Pak Gembus",
    rating: 4.8,
    estimatedTime: "15-20",
    cuisineType: "Indonesian",
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 2,
    name: "Burger King",
    rating: 4.3,
    estimatedTime: "20-30",
    cuisineType: "Fast Food",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 3,
    name: "Sushi Tei",
    rating: 4.6,
    estimatedTime: "25-35",
    cuisineType: "Japanese",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 4,
    name: "Padang Sederhana",
    rating: 4.7,
    estimatedTime: "10-20",
    cuisineType: "Indonesian",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 5,
    name: "Pizza Hut",
    rating: 4.2,
    estimatedTime: "30-40",
    cuisineType: "Italian",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300&h=200"
  },
];

// Food categories
const categories = [
  "All",
  "Indonesian",
  "Japanese",
  "Fast Food", 
  "Italian",
  "Healthy",
  "Dessert",
  "Beverages"
];

const HabiFood = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deliveryAddress] = useState("Jl. Sudirman No. 12");

  // Filter restaurants based on search and category
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || restaurant.cuisineType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mobile-container bg-background">
      <div className="pt-4 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">HabiFood</h1>
        </div>

        {/* Delivery address */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-4 w-4 text-habisin-dark" />
          <span className="text-sm">Delivery to: {deliveryAddress}</span>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search restaurants or food"
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-habisin-dark/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="mb-6 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 pb-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-habisin-dark text-white"
                    : "bg-muted text-foreground"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurant list */}
        <div className="space-y-4">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No restaurants found. Try changing your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabiFood;
