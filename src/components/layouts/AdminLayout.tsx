
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { title: "Dashboard", path: "/admin" },
    { title: "Manage Flights", path: "/admin/flights" },
    { title: "View Bookings", path: "/admin/bookings" },
    { title: "Manage Airplanes", path: "/admin/airplanes" },
    { title: "Manage Airports", path: "/admin/airports" },
    { title: "View Reviews", path: "/admin/reviews" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-20 flex flex-col flex-grow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-firewings firewings-shadow">
            {title}
          </h1>
          <NavigationMenu className="max-w-full w-full justify-start bg-white/80 backdrop-blur-sm rounded-lg shadow overflow-x-auto">
            <NavigationMenuList className="p-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.path}>
                  <Link to={link.path} legacyBehavior passHref>
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

export default AdminLayout;
