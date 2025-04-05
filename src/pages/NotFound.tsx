
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found - FireWings";
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-firewings firewings-shadow">
            404
          </h1>
          <p className="text-2xl text-gray-600 mb-8">Oops! This flight path doesn't exist</p>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/5611/5611044.png" 
            alt="FireWings Logo" 
            className="w-24 h-24 mx-auto mb-8 animate-float" 
          />
          <Button asChild className="bg-gradient-firewings hover:opacity-90 transition-opacity">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
