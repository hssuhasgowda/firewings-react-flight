
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Header from "@/components/Header";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface CustomerLayoutProps {
  children: React.ReactNode;
  title: string;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, title }) => {
  const { user } = useAuth();
  const { walletBalance } = useData();
  const location = useLocation();

  const navLinks = [
    { title: "Dashboard", path: "/customer" },
    { title: "Available Flights", path: "/customer/flights" },
    { title: "My Bookings", path: "/customer/bookings" },
    { title: "Wallet", path: "/customer/wallet" },
    { title: "Submit Review", path: "/customer/review" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-20 flex flex-col flex-grow">
        <div className="mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-firewings firewings-shadow">
              {title}
            </h1>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow px-4 py-2 text-right">
              <p className="text-sm text-gray-500">Wallet Balance</p>
              <p className="text-xl font-semibold">₹{walletBalance.toLocaleString()}</p>
            </div>
          </div>
          
          <NavigationMenu className="max-w-full w-full justify-start bg-white/80 backdrop-blur-sm rounded-lg shadow overflow-x-auto">
            <NavigationMenuList className="p-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.path}>
                  <Link to={link.path}>
                    <NavigationMenuLink 
                      className={navigationMenuTriggerStyle({
                        className: location.pathname === link.path 
                          ? "bg-primary/10 text-primary" 
                          : ""
                      })}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-6 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
