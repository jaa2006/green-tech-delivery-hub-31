
import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Bike } from "lucide-react";
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
      <div className="pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome, {userName}!</h1>
            <p className="text-muted-foreground">Choose a service</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <span className="font-bold text-lg">{userName[0]}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-8">
          <Link
            to="/habiride"
            className="habisin-button bg-habisin-dark hover:bg-habisin-dark/90 flex items-center justify-center gap-3 h-20"
          >
            <Car className="h-6 w-6" />
            <span className="text-lg font-semibold">HabiRide</span>
          </Link>
          <Link
            to="/habifood"
            className="habisin-button bg-habisin-light hover:bg-habisin-light/90 flex items-center justify-center gap-3 h-20"
          >
            <span role="img" aria-label="food" className="text-2xl">🍔</span>
            <span className="text-lg font-semibold">HabiFood</span>
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Popular Picks</h2>
          <div className="grid grid-cols-2 gap-4">
            {popularFoods.map(food => (
              <PopularFoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
