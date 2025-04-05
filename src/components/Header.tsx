
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 floating-header transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-firewings firewings-shadow">
            FireWings
          </span>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/5611/5611044.png" 
            alt="FireWings Logo" 
            className="w-8 h-8 ml-2 animate-float" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link to={user.role === "admin" ? "/admin" : "/customer"} className="hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Button 
                variant="ghost" 
                onClick={logout}
                className="flex items-center gap-1"
              >
                <LogOut size={16} />
                Logout
              </Button>
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name}
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
              <Link to="/register" className="hover:text-primary transition-colors">Register</Link>
            </>
          )}
        </nav>

        {/* Social Icons - Always visible on desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <a 
            href="https://whatsapp.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-green-500 transition-colors"
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" 
              alt="WhatsApp" 
              className="w-6 h-6" 
            />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png" 
              alt="Facebook" 
              className="w-6 h-6" 
            />
          </a>
          <a 
            href="#" 
            className="text-gray-600 hover:text-primary transition-colors"
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3125/3125713.png" 
              alt="Flight" 
              className="w-6 h-6" 
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              {user ? (
                <>
                  <Link 
                    to={user.role === "admin" ? "/admin" : "/customer"} 
                    className="py-2 px-4 hover:bg-gray-100 rounded-md"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { logout(); toggleMenu(); }}
                    className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md text-left"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                  <div className="py-2 px-4 text-sm text-muted-foreground">
                    Welcome, {user.name}
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="py-2 px-4 hover:bg-gray-100 rounded-md"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="py-2 px-4 hover:bg-gray-100 rounded-md"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Social Icons - Mobile */}
            <div className="flex justify-start space-x-6 py-2 px-4 border-t">
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-500"
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" 
                  alt="WhatsApp" 
                  className="w-6 h-6" 
                />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png" 
                  alt="Facebook" 
                  className="w-6 h-6" 
                />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-primary"
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3125/3125713.png" 
                  alt="Flight" 
                  className="w-6 h-6" 
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
