
import { useState, useEffect } from "react";
import { User as UserIcon, CreditCard, LogOut, Moon, Sun, ShoppingBag, Bell, Car, Edit, Loader2 } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Profile = () => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const { currentUser, logout, loading } = useAuth();
  const [userData, setUserData] = useState<{ fullName: string, email: string, photoURL?: string }>({
    fullName: "",
    email: "",
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhotoURL, setEditPhotoURL] = useState("");
  const [updating, setUpdating] = useState(false);
  
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({ 
            fullName: data.fullName || currentUser.email?.split('@')[0] || "Guest", 
            email: data.email || currentUser.email || "",
            photoURL: data.photoURL || currentUser.photoURL || ""
          });
          setEditName(data.fullName || currentUser.email?.split('@')[0] || "");
          setEditPhotoURL(data.photoURL || currentUser.photoURL || "");
        } else {
          // If no document exists, use email name as fallback
          setUserData({ 
            fullName: currentUser.email?.split('@')[0] || "Guest",
            email: currentUser.email || "",
          });
          setEditName(currentUser.email?.split('@')[0] || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      }
    };
    
    fetchUserData();
  }, [currentUser, toast]);
  
  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle("dark");
    toast({
      title: darkMode ? "Light Mode Enabled" : "Dark Mode Enabled",
      description: "Your display preferences have been updated.",
    });
  };
  
  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!currentUser) return;
    
    setUpdating(true);
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        fullName: editName,
        photoURL: editPhotoURL,
        updatedAt: new Date(),
      });
      
      // Update local state
      setUserData(prev => ({
        ...prev,
        fullName: editName,
        photoURL: editPhotoURL
      }));
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <Loader2 className="h-8 w-8 animate-spin text-habisin-dark" />
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="pt-8 px-6 pb-4">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        
        {/* User info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 mb-6 relative">
          <Avatar className="h-16 w-16">
            {userData.photoURL ? (
              <AvatarImage src={userData.photoURL} alt={userData.fullName} />
            ) : (
              <AvatarFallback className="bg-habisin-dark text-white">
                {userData.fullName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">{userData.fullName}</h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
          
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                className="absolute right-4 top-4 p-2 h-auto" 
                size="icon"
              >
                <Edit className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input 
                    id="name" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Profile Photo URL</Label>
                  <Input 
                    id="photo" 
                    value={editPhotoURL} 
                    onChange={(e) => setEditPhotoURL(e.target.value)}
                    placeholder="https://example.com/photo.jpg" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a URL to an image for your profile picture
                  </p>
                </div>
                <Button 
                  onClick={handleUpdateProfile} 
                  className="w-full"
                  disabled={updating}
                >
                  {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
