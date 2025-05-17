
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Sample food data
const foodItems = [
  {
    id: "1",
    name: "Burger Deluxe",
    price: 45000,
    restaurant: "Burger King",
    restaurantId: 2,
    rating: 4.8,
    description: "Our signature burger with premium beef patty, fresh vegetables, and special sauce. Served with a side of crispy fries.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600"
  },
  {
    id: "2",
    name: "Nasi Goreng Special",
    price: 35000,
    restaurant: "Warung Padang",
    restaurantId: 4,
    rating: 4.7,
    description: "Traditional Indonesian fried rice with prawns, chicken, and vegetables. Served with a fried egg on top and prawn crackers.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600"
  },
  {
    id: "3",
    name: "Sushi Platter",
    price: 78000,
    restaurant: "Sushi Tei",
    restaurantId: 3,
    rating: 4.9,
    description: "Premium selection of fresh sushi including salmon, tuna, and tamago. Served with wasabi and pickled ginger.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600"
  },
  {
    id: "4",
    name: "Rendang Sapi",
    price: 55000,
    restaurant: "Padang Sederhana",
    restaurantId: 4,
    rating: 4.9,
    description: "Slow-cooked beef in rich coconut milk and spices. A traditional Padang dish famous for its tender texture and complex flavors.",
    image: "https://images.unsplash.com/photo-1539755530862-00f623c00f52?auto=format&fit=crop&w=600"
  },
];

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  
  // Find the food item based on the ID
  const food = foodItems.find(item => item.id === id);
  
  if (!food) {
    return <div className="p-8 text-center">Food item not found</div>;
  }
  
  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity}x ${food.name} added to your cart`,
    });
  };

  return (
    <div className="mobile-container pb-8">
      {/* Header with back button */}
      <div className="relative py-4">
        <div className="absolute left-0 top-4 z-10">
          <Link to="/habifood" className="p-2 bg-white/80 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      {/* Food image */}
      <div className="relative -mt-8 h-72 rounded-3xl overflow-hidden">
        <img 
          src={food.image} 
          alt={food.name}
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Food details */}
      <div className="mt-4">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{food.name}</h1>
          <div className="flex items-center gap-1 bg-habisin-dark/10 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">{food.rating}</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-bold text-habisin-dark">
            {formatPrice(food.price)}
          </p>
          <Link 
            to={`/restaurant/${food.restaurantId}`}
            className="text-sm text-habisin-light hover:underline"
          >
            by {food.restaurant}
          </Link>
        </div>
        
        {/* Description */}
        <div className="mt-6">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {food.description}
          </p>
        </div>
        
        {/* Quantity selector */}
        <div className="mt-8">
          <h3 className="font-medium mb-3">Quantity</h3>
          <div className="flex items-center">
            <button 
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-6 font-medium text-lg">{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Add to cart button */}
        <Button 
          onClick={addToCart}
          className="w-full mt-8 py-6 text-lg font-medium bg-habisin-light hover:bg-habisin-light/90 rounded-2xl"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart - {formatPrice(food.price * quantity)}
        </Button>
      </div>
    </div>
  );
};

export default FoodDetail;
