
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Motor, Bell } from "lucide-react";

// Import pages
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
  </QueryClientProvider>
);

export default App;
