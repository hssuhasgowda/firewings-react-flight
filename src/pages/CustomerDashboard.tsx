
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plane,
  CreditCard,
  Map,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const CustomerDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Set document title when component mounts
    document.title = "My Dashboard - FireWings";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto pt-24 pb-10 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}. Ready for your next adventure?
          </p>
        </div>
        
        {/* Search Flight Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search for Flights</CardTitle>
            <CardDescription>
              Find your next destination with FireWings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-3 h-4 w-4 text-gray-400 rotate-45" />
                  <Input className="pl-10" placeholder="Departure City" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-3 h-4 w-4 text-gray-400 -rotate-45" />
                  <Input className="pl-10" placeholder="Arrival City" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input className="pl-10" type="date" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Return</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input className="pl-10" type="date" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-4">
            <Button className="bg-gradient-firewings hover:opacity-90 transition-opacity flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Flights
            </Button>
          </CardFooter>
        </Card>
        
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plane className="h-5 w-5 text-firewings-purple" />
                Total Flights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
              <p className="text-xs text-muted-foreground mt-1">
                2 flights this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Map className="h-5 w-5 text-firewings-blue" />
                Miles Traveled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">24,385</p>
              <p className="text-xs text-muted-foreground mt-1">
                Equivalent to 0.98 times around the Earth
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="h-5 w-5 text-amber-500" />
                Rewards Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">4,650</p>
              <p className="text-xs text-muted-foreground mt-1">
                Next tier at 5,000 points
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Flights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upcoming Flights</CardTitle>
            <CardDescription>
              Your scheduled journeys with FireWings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  flightNumber: "FW-1234",
                  from: "New York (JFK)",
                  to: "Los Angeles (LAX)",
                  departureDate: "April 15, 2025",
                  departureTime: "08:30 AM",
                  status: "Confirmed"
                },
                {
                  flightNumber: "FW-5678",
                  from: "Los Angeles (LAX)",
                  to: "New York (JFK)",
                  departureDate: "April 22, 2025",
                  departureTime: "06:15 PM",
                  status: "Pending"
                }
              ].map((flight, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <span className="text-xs text-muted-foreground">Flight</span>
                      <h4 className="text-lg font-semibold">{flight.flightNumber}</h4>
                    </div>
                    <div>
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${flight.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                      `}>
                        {flight.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Plane className="h-4 w-4 text-firewings-purple" />
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-medium">{flight.from}</div>
                          <div className="text-xs text-muted-foreground">From</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-1 flex justify-center">
                      <div className="h-0.5 w-full bg-gray-200 self-center relative">
                        <ChevronRight className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Plane className="h-4 w-4 text-firewings-blue" />
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-medium">{flight.to}</div>
                          <div className="text-xs text-muted-foreground">To</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="ml-2 text-sm">{flight.departureDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="ml-2 text-sm">{flight.departureTime}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex justify-end">
                    <Button variant="outline" className="mr-2">View Details</Button>
                    <Button className="bg-gradient-firewings hover:opacity-90 transition-opacity">
                      Check In
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Link 
              to="#" 
              className="text-sm text-primary hover:underline flex items-center"
            >
              View all flights
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>
        
        {/* Quick Access Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "My Bookings",
              description: "View and manage your reservations",
              icon: <Calendar className="h-6 w-6" />,
              color: "bg-blue-100 text-blue-700"
            },
            {
              title: "Flight Status",
              description: "Check the status of any FireWings flight",
              icon: <Plane className="h-6 w-6" />,
              color: "bg-purple-100 text-purple-700"
            },
            {
              title: "Payment Methods",
              description: "Manage your cards and payment options",
              icon: <CreditCard className="h-6 w-6" />,
              color: "bg-green-100 text-green-700"
            },
            {
              title: "Rewards Program",
              description: "Check your points and redeem rewards",
              icon: <Award className="h-6 w-6" />,
              color: "bg-amber-100 text-amber-700"
            }
          ].map((item, index) => (
            <Card key={index} className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`rounded-full p-3 mb-4 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
