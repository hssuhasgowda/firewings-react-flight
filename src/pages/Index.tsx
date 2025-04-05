
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Plane, 
  Shield, 
  Award, 
  Clock, 
  CheckCircle,
  MapPin
} from "lucide-react";

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "FireWings - Take Flight with Comfort";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 -z-10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="firewings-shadow absolute top-1/4 left-1/5 w-64 h-64 bg-firewings-purple/5 rounded-full blur-3xl"></div>
          <div className="firewings-shadow absolute bottom-1/4 right-1/5 w-96 h-96 bg-firewings-blue/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-firewings firewings-shadow">
                  Take Flight
                </span> <br />
                with FireWings
              </h1>
              <p className="text-xl mb-8 text-gray-700 max-w-lg">
                Experience unparalleled comfort and service as you soar through the skies with the most reliable airline in the industry.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-firewings hover:opacity-90 transition-opacity" 
                  asChild
                >
                  <Link to={isAuthenticated ? (user?.role === "admin" ? "/admin" : "/customer") : "/login"}>
                    {isAuthenticated ? "Go to Dashboard" : "Book a Flight"}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="#features">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-firewings-purple mr-2" />
                  <span className="text-sm font-medium">100% Secure Booking</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-firewings-blue mr-2" />
                  <span className="text-sm font-medium">24/7 Customer Support</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-sm font-medium">#1 Airline 2025</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3"
                  alt="FireWings Airplane" 
                  className="rounded-lg shadow-xl max-w-full h-auto animate-float" 
                  style={{ maxHeight: "400px" }}
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 firewings-shadow">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <Plane className="h-8 w-8 text-firewings-purple" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Next Flight</p>
                      <p className="font-bold">NYC → LAX</p>
                      <p className="text-xs text-gray-500">Departing in 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FireWings</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We strive to provide the best flying experience with premium services and unmatched comfort.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Plane className="h-10 w-10" />,
                title: "Modern Fleet",
                description: "Experience travel in our state-of-the-art aircraft, designed for maximum comfort and efficiency."
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Safety First",
                description: "Your safety is our top priority with industry-leading standards and protocols."
              },
              {
                icon: <Clock className="h-10 w-10" />,
                title: "On-Time Performance",
                description: "We respect your time with our industry-leading on-time arrival and departure rates."
              },
              {
                icon: <Award className="h-10 w-10" />,
                title: "Premium Services",
                description: "From gourmet dining to entertainment options, enjoy premium services throughout your journey."
              },
              {
                icon: <MapPin className="h-10 w-10" />,
                title: "Global Destinations",
                description: "Fly to over 150 destinations worldwide with convenient connections."
              },
              {
                icon: <CheckCircle className="h-10 w-10" />,
                title: "Easy Booking",
                description: "Our simple booking system makes planning your trip quick and hassle-free."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-firewings-purple to-firewings-blue p-3 rounded-lg inline-block mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Flight?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied passengers who choose FireWings for their travel needs. Book your flight today and experience the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-firewings hover:opacity-90 transition-opacity"
                asChild
              >
                <Link to={isAuthenticated ? (user?.role === "admin" ? "/admin" : "/customer") : "/login"}>
                  {isAuthenticated ? "Go to Dashboard" : "Book Now"}
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                asChild
              >
                <Link to={isAuthenticated ? "#" : "/register"}>
                  {isAuthenticated ? "View Flights" : "Create Account"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-firewings-purple-light to-firewings-blue-light">
                  FireWings
                </span>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/5611/5611044.png" 
                  alt="FireWings Logo" 
                  className="w-6 h-6 ml-2" 
                />
              </h3>
              <p className="text-gray-400 mb-4">
                Taking you higher with comfort, safety, and reliability.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" 
                    alt="WhatsApp" 
                    className="w-6 h-6" 
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/733/733547.png" 
                    alt="Facebook" 
                    className="w-6 h-6" 
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3125/3125713.png" 
                    alt="Flight" 
                    className="w-6 h-6" 
                  />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Register</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <address className="not-italic text-gray-400">
                <p>1234 Airport Boulevard</p>
                <p>New York, NY 10001</p>
                <p className="mt-2">Email: info@firewings.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </address>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} FireWings Airlines. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
