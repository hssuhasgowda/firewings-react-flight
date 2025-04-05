
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { 
    flights, 
    bookings, 
    getAirportById,
    getFlightById,
    reviews,
    walletBalance,
  } = useData();

  useEffect(() => {
    document.title = "Customer Dashboard - FireWings";
  }, []);

  // Filter for user bookings
  const userBookings = bookings.filter(
    booking => booking.userId === user?.email
  ).sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());

  const recentBookings = userBookings.slice(0, 3);
  const confirmedBookings = userBookings.filter(b => b.status === "confirmed").length;
  const totalSpent = userBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

  // Featured flights
  const featuredFlights = flights.slice(0, 3);

  return (
    <CustomerLayout title="My Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">My Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{userBookings.length}</p>
              <p className="text-sm text-muted-foreground">
                {confirmedBookings} active bookings
              </p>
              <Link to="/customer/bookings">
                <Button variant="outline" className="mt-4" size="sm">View All Bookings</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{walletBalance.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                Total spent: ₹{totalSpent.toLocaleString()}
              </p>
              <Link to="/customer/wallet">
                <Button variant="outline" className="mt-4" size="sm">Manage Wallet</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Available Flights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{flights.length}</p>
              <p className="text-sm text-muted-foreground">
                Book your next journey now
              </p>
              <Link to="/customer/flights">
                <Button variant="outline" className="mt-4" size="sm">View Flights</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Your latest travel plans</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flight</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.map((booking) => {
                    const flight = getFlightById(booking.flightId);
                    const departureAirport = flight ? getAirportById(flight.departureAirportId) : null;
                    const arrivalAirport = flight ? getAirportById(flight.arrivalAirportId) : null;
                    
                    return (
                      <TableRow key={booking.id}>
                        <TableCell>
                          {flight && departureAirport && arrivalAirport ? (
                            <div className="font-medium">
                              {departureAirport.code} → {arrivalAirport.code}
                            </div>
                          ) : (
                            "Unknown Flight"
                          )}
                        </TableCell>
                        <TableCell>
                          {flight ? new Date(flight.departureTime).toLocaleDateString() : "-"}
                        </TableCell>
                        <TableCell>
                          <span 
                            className={`px-2 py-1 rounded text-xs ${
                              booking.status === "confirmed" ? "bg-green-100 text-green-800" : 
                              booking.status === "cancelled" ? "bg-red-100 text-red-800" : 
                              "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {booking.status === "confirmed" && (
                            <div className="flex space-x-2">
                              <Link to={`/customer/ticket/${booking.id}`}>
                                <Button variant="outline" size="sm">Ticket</Button>
                              </Link>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {recentBookings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        You have no bookings yet.
                        <div className="mt-2">
                          <Link to="/customer/flights">
                            <Button size="sm">Browse Flights</Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Featured Flights</CardTitle>
              <CardDescription>Recommended destinations for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredFlights.map((flight) => {
                  const departureAirport = getAirportById(flight.departureAirportId);
                  const arrivalAirport = getAirportById(flight.arrivalAirportId);
                  
                  return (
                    <div key={flight.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                      <div>
                        <div className="font-medium">
                          {departureAirport?.city || "Unknown"} to {arrivalAirport?.city || "Unknown"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(flight.departureTime).toLocaleDateString()} • 
                          {flight.flightNumber}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{flight.price.toLocaleString()}</div>
                        <Link to={`/customer/book/${flight.id}`}>
                          <Button size="sm" className="mt-2">Book Now</Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
