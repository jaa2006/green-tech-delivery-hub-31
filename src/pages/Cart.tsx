
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-white">
          <div className="bg-habisin-dark px-4 py-4 flex items-center">
            <Link to="/" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-white" />
            </Link>
            <h1 className="text-white text-2xl font-semibold">Keranjang</h1>
          </div>
          
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Keranjang Kosong</h2>
            <p className="text-gray-500 text-center mb-6">Belum ada produk yang ditambahkan ke keranjang</p>
            <Link to="/habifood" className="habisin-button">
              Mulai Belanja
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        <div className="bg-habisin-dark px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-white" />
            </Link>
            <h1 className="text-white text-2xl font-semibold">Keranjang</h1>
          </div>
          <button 
            onClick={clearCart}
            className="text-white text-sm"
          >
            Hapus Semua
          </button>
        </div>

        <div className="p-4 pb-32">
          {items.map((item) => (
            <div key={item.id} className="habisin-card mb-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.restaurant}</p>
                  <p className="font-bold text-habisin-dark">{formatPrice(item.price)}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-habisin-dark text-white flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="habisin-card mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold text-habisin-dark">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <Link 
              to="/checkout" 
              className="habisin-button block"
            >
              Lanjut ke Pembayaran
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
