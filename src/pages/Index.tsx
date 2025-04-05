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
  MapPin,
  Star,
  Users,
  Globe,
  Phone
} from "lucide-react";

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "FireWings - Take Flight with Comfort";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section with Airplane Background */}
      <section className="airplane-hero-bg">
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                <span className="text-yellow-400">
                  Take Flight
                </span> <br />
                with FireWings
              </h1>
              <p className="text-xl mb-8 text-gray-100 max-w-lg drop-shadow-md">
                Experience unparalleled comfort and service as you soar through the skies with the most reliable airline in the industry.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold shadow-lg" 
                  asChild
                >
                  <Link to={isAuthenticated ? (user?.role === "admin" ? "/admin" : "/customer") : "/login"}>
                    {isAuthenticated ? "Go to Dashboard" : "Book a Flight"}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-white/20 text-white border-white/40 shadow-sm hover:bg-white/30" asChild>
                  <Link to="#features">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-white">100% Secure Booking</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-white">24/7 Customer Support</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-white">#1 Airline 2025</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="glass-card rounded-xl p-6 shadow-2xl max-w-md">
                <h3 className="text-2xl font-bold mb-4 text-white">Quick Search</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">From</label>
                    <input type="text" className="w-full p-2 rounded-md" placeholder="Departure City" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">To</label>
                    <input type="text" className="w-full p-2 rounded-md" placeholder="Arrival City" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Departure</label>
                      <input type="date" className="w-full p-2 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Return</label>
                      <input type="date" className="w-full p-2 rounded-md" />
                    </div>
                  </div>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold">
                    Search Flights
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
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
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow card-hover">
                <CardContent className="p-6">
                  <div className="fw-header p-3 rounded-lg inline-block mb-4 text-white">
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
      
      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Plane className="h-8 w-8" />, value: "500+", label: "Daily Flights" },
              { icon: <Users className="h-8 w-8" />, value: "2M+", label: "Happy Customers" },
              { icon: <Globe className="h-8 w-8" />, value: "150+", label: "Destinations" },
              { icon: <Award className="h-8 w-8" />, value: "25+", label: "Years of Service" },
            ].map((stat, index) => (
              <div key={index} className="glass-card rounded-xl shadow-md p-6 text-center card-hover">
                <div className="inline-flex items-center justify-center p-3 fw-header rounded-full text-white mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 relative">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="firewings-shadow absolute top-1/4 left-1/3 w-96 h-96 bg-firewings-purple/5 rounded-full blur-3xl"></div>
          <div className="firewings-shadow absolute bottom-1/4 right-1/3 w-80 h-80 bg-firewings-blue/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Ready to Take Flight?</h2>
            <p className="text-xl text-gray-700 mb-8 text-center">
              Join thousands of satisfied passengers who choose FireWings for their travel needs. Book your flight today and experience the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold shadow-lg" 
                asChild
              >
                <Link to={isAuthenticated ? (user?.role === "admin" ? "/admin" : "/customer") : "/login"}>
                  {isAuthenticated ? "Go to Dashboard" : "Book Now"}
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="shadow-sm border-gray-400"
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
      <footer className="bg-gradient-night text-white py-16">
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
              <p className="text-gray-300 mb-4">
                Taking you higher with comfort, safety, and reliability.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform transition-transform">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" 
                    alt="WhatsApp" 
                    className="w-6 h-6" 
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform transition-transform">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/733/733547.png" 
                    alt="Facebook" 
                    className="w-6 h-6" 
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform transition-transform">
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
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block transition-transform">Home</Link></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block transition-transform">Login</Link></li>
                <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block transition-transform">Register</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block transition-transform">Contact Us</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block transition-transform">FAQs</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block transition-transform">Terms of Service</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block transition-transform">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <address className="not-italic text-gray-300 space-y-2">
                <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> 1234 Airport Boulevard</p>
                <p>New York, NY 10001</p>
                <p className="flex items-center mt-2"><Globe className="w-4 h-4 mr-2" /> info@firewings.com</p>
                <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +1 (555) 123-4567</p>
              </address>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} FireWings Airlines. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
