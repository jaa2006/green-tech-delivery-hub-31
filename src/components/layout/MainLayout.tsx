
import { ReactNode, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, ClipboardList, User, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getTotalItems } = useCart();

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!currentUser && location.pathname !== "/auth" && location.pathname !== "/splash") {
      navigate("/auth");
    }
  }, [currentUser, location.pathname, navigate]);

  // If no user and not on auth or splash page, return null to avoid flash of content
  if (!currentUser && location.pathname !== "/auth" && location.pathname !== "/splash") {
    return null;
  }

  const navItems = [
    { 
      path: "/", 
      label: "Home", 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      path: "/search", 
      label: "Search", 
      icon: <Search className="h-5 w-5" /> 
    },
    { 
      path: "/cart", 
      label: "Cart", 
      icon: (
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </div>
          )}
        </div>
      )
    },
    { 
      path: "/orders", 
      label: "Orders", 
      icon: <ClipboardList className="h-5 w-5" /> 
    },
    { 
      path: "/profile", 
      label: "Profile", 
      icon: <User className="h-5 w-5" /> 
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="mobile-container">
        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-6 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center pt-1 ${isActive ? 'text-habisin-dark font-medium' : 'text-gray-500'}`
              }
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
