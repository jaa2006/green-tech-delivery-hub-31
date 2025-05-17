
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample food data
const foodItems = [
  {
    id: "1",
    name: "Burger",
    price: 30000,
    restaurant: "Delicious Bites",
    restaurantId: 1,
    rating: 4.8,
    description: "Our signature burger with premium beef patty, fresh vegetables, and special sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600"
  },
];

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the food item based on the ID
  const food = foodItems.find(item => item.id === id) || foodItems[0];
  
  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${food.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-habisin-dark px-4 py-4 flex items-center">
        <Link to="/" className="mr-3">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>
      </div>
      
      {/* Food image */}
      <div className="h-64 bg-black">
        <img 
          src={food.image} 
          alt={food.name}
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Food details */}
      <div className="bg-white rounded-t-3xl -mt-6 px-6 pt-6 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{food.name}</h1>
          <div className="flex justify-between items-center mt-2">
            <p className="text-2xl font-bold">IDR {food.price.toLocaleString()}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-lg">Restaurant</h3>
            <div className="flex items-center justify-between mt-1">
              <Link to={`/restaurant/${food.restaurantId}`} className="text-habisin-dark">
                {food.restaurant}
              </Link>
              <div className="flex items-center">
                <p className="font-medium mr-1">{food.rating}</p>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-lg">Description</h3>
            <p className="mt-1 text-gray-700">{food.description}</p>
          </div>
        </div>
        
        {/* Add to cart button */}
        <button 
          onClick={addToCart}
          className="fixed bottom-6 left-6 right-6 bg-habisin-dark text-white py-4 rounded-full font-medium text-lg flex items-center justify-center"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodDetail;
