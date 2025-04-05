
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
import { WalletCards, PlaneTakeoff, CalendarCheck, Coins, MessageSquare, LayoutDashboard } from "lucide-react";

interface CustomerLayoutProps {
  children: React.ReactNode;
  title: string;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, title }) => {
  const { user } = useAuth();
  const { walletBalance } = useData();
  const location = useLocation();

  const navLinks = [
    { title: "Dashboard", path: "/customer", icon: <LayoutDashboard className="w-4 h-4" /> },
    { title: "Available Flights", path: "/customer/flights", icon: <PlaneTakeoff className="w-4 h-4" /> },
    { title: "My Bookings", path: "/customer/bookings", icon: <CalendarCheck className="w-4 h-4" /> },
    { title: "Wallet", path: "/customer/wallet", icon: <Coins className="w-4 h-4" /> },
    { title: "Submit Review", path: "/customer/review", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 flex flex-col flex-grow">
        <div className="mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-firewings firewings-shadow">
              {title}
            </h1>
            <div className="glass-card rounded-xl shadow-md px-6 py-3 flex items-center gap-3">
              <WalletCards className="text-primary h-5 w-5" />
              <div>
                <p className="text-xs text-gray-500">Wallet Balance</p>
                <p className="text-xl font-semibold">₹{walletBalance.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <NavigationMenu className="max-w-full w-full justify-start glass-card rounded-xl shadow-md overflow-x-auto">
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
                      <span className="flex items-center gap-2">
                        {link.icon}
                        {link.title}
                      </span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="glass-card rounded-xl shadow-md p-6 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
