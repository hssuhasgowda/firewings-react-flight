
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MyBookings = () => {
  const { user } = useAuth();
  const { 
    bookings, 
    flights, 
    getFlightById, 
    getAirportById,
    cancelBooking
  } = useData();
  
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "My Bookings - FireWings";
  }, []);

  // Filter bookings for the current user
  const userBookings = bookings
    .filter(booking => booking.userId === user?.email)
    .filter(booking => statusFilter === "all" || booking.status === statusFilter)
    .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());

  const handleCancelBooking = (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }
    
    setLoading(true);
    cancelBooking(bookingId);
    setLoading(false);
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <CustomerLayout title="My Bookings">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-semibold">Your Bookings</h2>
          <div className="w-48">
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking Date</TableHead>
                <TableHead>Flight</TableHead>
                <TableHead>Journey</TableHead>
                <TableHead>Passengers</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBookings.map((booking) => {
                const flight = getFlightById(booking.flightId);
                const departureAirport = flight ? getAirportById(flight.departureAirportId) : null;
                const arrivalAirport = flight ? getAirportById(flight.arrivalAirportId) : null;
                
                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      {formatDateTime(booking.bookingDate)}
                    </TableCell>
                    <TableCell>
                      {flight ? flight.flightNumber : "Unknown"}
                    </TableCell>
                    <TableCell>
                      {departureAirport && arrivalAirport ? (
                        <>
                          {departureAirport.code} → {arrivalAirport.code}
                          <div className="text-xs text-muted-foreground">
                            {new Date(flight!.departureTime).toLocaleDateString()}
                          </div>
                        </>
                      ) : (
                        "Unknown"
                      )}
                    </TableCell>
                    <TableCell>{booking.passengerCount}</TableCell>
                    <TableCell className="font-medium">₹{booking.totalAmount.toLocaleString()}</TableCell>
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
                      <div className="flex flex-col space-y-2">
                        {booking.status === "confirmed" && (
                          <>
                            <Link to={`/customer/ticket/${booking.id}`}>
                              <Button size="sm" variant="outline" className="w-full">
                                View Ticket
                              </Button>
                            </Link>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => handleCancelBooking(booking.id)}
                              disabled={loading}
                              className="w-full"
                            >
                              Cancel
                            </Button>
                            <Link to={`/customer/rebook/${booking.id}`}>
                              <Button size="sm" variant="outline" className="w-full">
                                Rebook
                              </Button>
                            </Link>
                          </>
                        )}
                        {booking.status === "cancelled" && (
                          <Link to={`/customer/flights`}>
                            <Button size="sm" variant="outline" className="w-full">
                              Book New
                            </Button>
                          </Link>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {userBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                    No bookings found.
                    {statusFilter !== "all" && (
                      <span className="block mt-2">Try changing your filter.</span>
                    )}
                    {statusFilter === "all" && (
                      <div className="mt-4">
                        <Link to="/customer/flights">
                          <Button>Browse Flights</Button>
                        </Link>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default MyBookings;
