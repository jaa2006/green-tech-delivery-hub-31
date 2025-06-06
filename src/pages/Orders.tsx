
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const Orders = () => {
  // Sample orders data
  const orders = [
    {
      id: "ORD-001",
      items: ["Burger Deluxe", "French Fries"],
      restaurant: "Burger King",
      total: 75000,
      status: "delivered",
      date: "2024-01-15",
      time: "14:30"
    },
    {
      id: "ORD-002",
      items: ["Nasi Goreng Special"],
      restaurant: "Warung Padang",
      total: 35000,
      status: "preparing",
      date: "2024-01-15",
      time: "13:15"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-400";
      case "preparing":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "preparing":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-[#07595A] to-black">
        <div className="bg-[#07595A] px-6 py-6 flex items-center rounded-b-3xl">
          <Link to="/" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-white text-2xl font-semibold">My Orders</h1>
        </div>

        <div className="p-6 pb-24">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h2 className="text-xl font-semibold text-white mb-2">No Orders Yet</h2>
              <p className="text-gray-300 text-center mb-6">You haven't placed any orders yet</p>
              <Link to="/habifood" className="habisin-button">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="habisin-card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-white">{order.id}</h3>
                      <p className="text-gray-300 text-sm">{order.restaurant}</p>
                      <p className="text-gray-400 text-xs">{order.date} • {order.time}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium capitalize">{order.status}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-300 text-sm mb-1">Items:</p>
                    <p className="text-white">{order.items.join(", ")}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-600">
                    <span className="text-gray-300">Total</span>
                    <span className="font-bold text-white">{formatPrice(order.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Orders;
