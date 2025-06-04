
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

// Import pages
import SplashScreen from "./pages/SplashScreen";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import LoginUser from "./pages/LoginUser";
import LoginDriver from "./pages/LoginDriver";
import RegisterUser from "./pages/RegisterUser";
import RegisterDriver from "./pages/RegisterDriver";
import UserDashboard from "./pages/UserDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import HabiRide from "./pages/HabiRide";
import HabiFood from "./pages/HabiFood";
import Restaurant from "./pages/Restaurant";
import FoodDetail from "./pages/FoodDetail";
import Search from "./pages/Search";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Index />} />
              <Route path="/login-user" element={<LoginUser />} />
              <Route path="/login-driver" element={<LoginDriver />} />
              <Route path="/register-user" element={<RegisterUser />} />
              <Route path="/register-driver" element={<RegisterDriver />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/driver-dashboard" element={<DriverDashboard />} />
              <Route path="/habiride" element={<HabiRide />} />
              <Route path="/habifood" element={<HabiFood />} />
              <Route path="/restaurant/:id" element={<Restaurant />} />
              <Route path="/food/:id" element={<FoodDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
