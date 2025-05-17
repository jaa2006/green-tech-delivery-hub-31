
import { useState } from "react";
import { Clock, Package, Check } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample order data
const orders = [
  {
    id: "ORD12345",
    type: "food",
    restaurant: "Burger King",
    items: ["1x Burger Deluxe", "1x Fries", "1x Coke"],
    price: 65000,
    status: "ongoing",
    date: "May 17, 2025",
    estimatedDelivery: "15:45",
    driver: "Ahmad",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&h=150",
  },
  {
    id: "ORD12344",
    type: "ride",
    from: "Jl. Sudirman No. 12",
    to: "Mall Grand Indonesia",
    price: 25000,
    status: "completed",
    date: "May 16, 2025",
    driver: "Budi",
    image: null,
  },
  {
    id: "ORD12343",
    type: "food",
    restaurant: "Sushi Tei",
    items: ["1x Sushi Platter", "2x Green Tea"],
    price: 98000,
    status: "completed",
    date: "May 15, 2025",
    driver: "Diana",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=150&h=150",
  },
  {
    id: "ORD12342",
    type: "food",
    restaurant: "Padang Sederhana",
    items: ["1x Rendang Sapi", "2x Nasi", "1x Es Teh"],
    price: 75000,
    status: "completed",
    date: "May 14, 2025",
    driver: "Eko",
    image: "https://images.unsplash.com/photo-1539755530862-00f623c00f52?auto=format&fit=crop&w=150&h=150",
  },
];

// Format price to IDR
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  
  const ongoingOrders = orders.filter(order => order.status === "ongoing");
  const completedOrders = orders.filter(order => order.status === "completed");

  // Order status icon component
  const OrderStatusIcon = ({ type, status }: { type: string, status: string }) => {
    if (status === "ongoing") {
      return <Clock className="h-5 w-5 text-yellow-500" />;
    } else if (status === "completed") {
      return <Check className="h-5 w-5 text-green-500" />;
    } else {
      return <Package className="h-5 w-5 text-habisin-dark" />;
    }
  };

  return (
    <MainLayout>
      <div className="pt-8 pb-4">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger 
              value="ongoing" 
              className={`${activeTab === "ongoing" ? "data-[state=active]:bg-habisin-dark data-[state=active]:text-white" : ""}`}
              onClick={() => setActiveTab("ongoing")}
            >
              Ongoing
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className={`${activeTab === "completed" ? "data-[state=active]:bg-habisin-dark data-[state=active]:text-white" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ongoing">
            {ongoingOrders.length > 0 ? (
              <div className="space-y-4">
                {ongoingOrders.map(order => (
                  <div key={order.id} className="habisin-card">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <OrderStatusIcon type={order.type} status={order.status} />
                        <h3 className="font-medium">{order.type === "food" ? order.restaurant : "HabiRide"}</h3>
                      </div>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        {order.status === "ongoing" ? "On the way" : order.status}
                      </span>
                    </div>
                    
                    <div className="flex gap-4">
                      {order.image && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img src={order.image} alt={order.restaurant} className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        {order.type === "food" ? (
                          <div className="text-sm mb-2">
                            {order.items.map((item, i) => (
                              <div key={i}>{item}</div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm mb-2">
                            <div className="text-muted-foreground">From: {order.from}</div>
                            <div className="text-muted-foreground">To: {order.to}</div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-muted-foreground">{order.id} • {order.date}</div>
                          <div className="font-semibold text-habisin-dark">{formatPrice(order.price)}</div>
                        </div>
                        
                        {order.status === "ongoing" && order.type === "food" && (
                          <div className="mt-3 text-sm">
                            <div className="font-medium">Estimated Delivery: {order.estimatedDelivery}</div>
                            <div className="text-muted-foreground">Driver: {order.driver}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl font-medium mb-2">No ongoing orders</p>
                <p className="text-muted-foreground">Your ongoing orders will appear here</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedOrders.length > 0 ? (
              <div className="space-y-4">
                {completedOrders.map(order => (
                  <div key={order.id} className="habisin-card">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <OrderStatusIcon type={order.type} status={order.status} />
                        <h3 className="font-medium">{order.type === "food" ? order.restaurant : "HabiRide"}</h3>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                    
                    <div className="flex gap-4">
                      {order.image && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img src={order.image} alt={order.restaurant} className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        {order.type === "food" ? (
                          <div className="text-sm mb-2">
                            {order.items.map((item, i) => (
                              <div key={i}>{item}</div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm mb-2">
                            <div className="text-muted-foreground">From: {order.from}</div>
                            <div className="text-muted-foreground">To: {order.to}</div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-muted-foreground">{order.id} • {order.date}</div>
                          <div className="font-semibold text-habisin-dark">{formatPrice(order.price)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl font-medium mb-2">No completed orders</p>
                <p className="text-muted-foreground">Your order history will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Orders;
