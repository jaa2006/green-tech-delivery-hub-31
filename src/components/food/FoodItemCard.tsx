
import { Link } from "react-router-dom";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface FoodItemCardProps {
  item: FoodItem;
}

const FoodItemCard = ({ item }: FoodItemCardProps) => {
  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/food/${item.id}`}>
      <div className="habisin-card flex gap-4 hover:shadow-lg transition-shadow duration-300">
        {/* Food image */}
        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover" 
          />
        </div>
        
        {/* Food info */}
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{item.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
          <p className="font-bold text-habisin-dark">{formatPrice(item.price)}</p>
        </div>
      </div>
    </Link>
  );
};

export default FoodItemCard;
