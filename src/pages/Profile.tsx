
import { useState } from "react";
import { User, CreditCard, LogOut, Moon, Sun, ShoppingBag, Bell, Car } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  
  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle("dark");
    toast({
      title: darkMode ? "Light Mode Enabled" : "Dark Mode Enabled",
      description: "Your display preferences have been updated.",
    });
  };
  
  // Simulate logout
  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out successfully.",
    });
  };
  
  return (
    <MainLayout>
      <div className="pt-8 px-6 pb-4">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        
        {/* User info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-habisin-dark flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Budi Santoso</h2>
            <p className="text-sm text-gray-500">budi.santoso@email.com</p>
          </div>
        </div>
        
        {/* Order history */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Order History</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-habisin-dark" />
                </div>
                <div>
                  <h3 className="font-medium">Delicious Bites</h3>
                  <p className="text-xs text-gray-500">May 15, 2025 • Rp 45,000</p>
                </div>
              </div>
              <span className="text-xs py-1 px-2 bg-green-100 text-green-800 rounded-full">Delivered</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Car className="h-5 w-5 text-habisin-dark" />
                </div>
                <div>
                  <h3 className="font-medium">HabiRide</h3>
                  <p className="text-xs text-gray-500">May 14, 2025 • Rp 25,000</p>
                </div>
              </div>
              <span className="text-xs py-1 px-2 bg-green-100 text-green-800 rounded-full">Completed</span>
            </div>
          </div>
        </div>
        
        {/* Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Settings</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {darkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                <span>Dark Mode</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={handleToggleDarkMode} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
        
        {/* Logout button */}
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 border-destructive text-destructive hover:bg-destructive/10 rounded-xl py-6"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </MainLayout>
  );
};

export default Profile;
