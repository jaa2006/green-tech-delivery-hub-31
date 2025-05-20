
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Import pages
import SplashScreen from "./pages/SplashScreen";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import HabiRide from "./pages/HabiRide";
import HabiFood from "./pages/HabiFood";
import Restaurant from "./pages/Restaurant";
import FoodDetail from "./pages/FoodDetail";
import Search from "./pages/Search";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Index />} />
            <Route path="/habiride" element={<HabiRide />} />
            <Route path="/habifood" element={<HabiFood />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/food/:id" element={<FoodDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
