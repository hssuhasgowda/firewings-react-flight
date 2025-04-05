
import { useState, useEffect } from "react";
import { useData } from "@/contexts/DataContext";
import AdminLayout from "@/components/layouts/AdminLayout";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ViewBookings = () => {
  const {
    bookings,
    flights,
    getFlightById,
    getAirportById,
    getAirplaneById,
  } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = "View Bookings - FireWings Admin";
  }, []);

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(booking => 
    booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (bookingId: string) => {
    setSelectedBooking(bookingId);
  };

  const closeDetailsDialog = () => {
    setSelectedBooking(null);
  };

  const currentBooking = bookings.find(b => b.id === selectedBooking);
  const bookingFlight = currentBooking ? getFlightById(currentBooking.flightId) : null;
  const departureAirport = bookingFlight ? getAirportById(bookingFlight.departureAirportId) : null;
  const arrivalAirport = bookingFlight ? getAirportById(bookingFlight.arrivalAirportId) : null;
  const airplane = bookingFlight ? getAirplaneById(bookingFlight.airplaneId) : null;

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  return (
    <AdminLayout title="View Bookings">
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-2xl font-semibold">Booking List</h2>
          <div className="w-full md:w-64">
            <Input
              placeholder="Search by ID or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Flight</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Passengers</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => {
                const flight = getFlightById(booking.flightId);
                
                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id.slice(0, 8)}</TableCell>
                    <TableCell>{booking.userId}</TableCell>
                    <TableCell>{flight ? flight.flightNumber : "Unknown"}</TableCell>
                    <TableCell>{formatDateTime(booking.bookingDate)}</TableCell>
                    <TableCell>{booking.passengerCount}</TableCell>
                    <TableCell>₹{booking.totalAmount.toLocaleString()}</TableCell>
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(booking.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                    No bookings found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={!!selectedBooking} onOpenChange={closeDetailsDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Complete information about this booking
              </DialogDescription>
            </DialogHeader>
            
            {currentBooking && bookingFlight && (
              <div className="grid grid-cols-1 gap-4 py-4">
                <Card className="border-none shadow-none">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-lg">Booking Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Booking ID</Label>
                        <p>{currentBooking.id}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Status</Label>
                        <p>
                          <span 
                            className={`px-2 py-1 rounded text-xs ${
                              currentBooking.status === "confirmed" ? "bg-green-100 text-green-800" : 
                              currentBooking.status === "cancelled" ? "bg-red-100 text-red-800" : 
                              "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {currentBooking.status}
                          </span>
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">User</Label>
                        <p>{currentBooking.userId}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Booking Date</Label>
                        <p>{formatDateTime(currentBooking.bookingDate)}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Passengers</Label>
                        <p>{currentBooking.passengerCount}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Total Amount</Label>
                        <p className="font-semibold">₹{currentBooking.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-none">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-lg">Flight Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Flight Number</Label>
                        <p>{bookingFlight.flightNumber}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Aircraft</Label>
                        <p>{airplane ? airplane.model : "Unknown"}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">From</Label>
                        <p>
                          {departureAirport ? (
                            `${departureAirport.name} (${departureAirport.code})`
                          ) : (
                            "Unknown"
                          )}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">To</Label>
                        <p>
                          {arrivalAirport ? (
                            `${arrivalAirport.name} (${arrivalAirport.code})`
                          ) : (
                            "Unknown"
                          )}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Departure</Label>
                        <p>{formatDateTime(bookingFlight.departureTime)}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Arrival</Label>
                        <p>{formatDateTime(bookingFlight.arrivalTime)}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Price Per Seat</Label>
                        <p>₹{bookingFlight.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ViewBookings;
