
import { Link } from "react-router-dom";

interface Food {
  id: number;
  name: string;
  price: number;
  restaurant: string;
  image: string;
}

interface PopularFoodCardProps {
  food: Food;
}

const PopularFoodCard = ({ food }: PopularFoodCardProps) => {
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
    <Link to={`/food/${food.id}`} className="block">
      <div className="habisin-card hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-video rounded-xl overflow-hidden mb-2">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-medium text-sm line-clamp-1">{food.name}</h3>
        <p className="text-xs text-muted-foreground">{food.restaurant}</p>
        <p className="text-habisin-dark font-semibold text-sm mt-1">
          {formatPrice(food.price)}
        </p>
      </div>
    </Link>
  );
};

export default PopularFoodCard;
