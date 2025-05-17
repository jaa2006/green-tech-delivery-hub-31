
import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, ClipboardList, User } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { 
      path: "/", 
      label: "Home", 
      icon: <Home className="h-6 w-6" /> 
    },
    { 
      path: "/search", 
      label: "Search", 
      icon: <Search className="h-6 w-6" /> 
    },
    { 
      path: "/orders", 
      label: "Orders", 
      icon: <ClipboardList className="h-6 w-6" /> 
    },
    { 
      path: "/profile", 
      label: "Profile", 
      icon: <User className="h-6 w-6" /> 
    }
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <div className="mobile-container pb-20">
        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-card border-t border-border py-2 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `bottom-nav-item ${isActive ? 'active' : ''}`
              }
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
