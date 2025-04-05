
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const RebookFlight = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    flights, 
    bookings, 
    getBookingById,
    getFlightById, 
    getAirportById, 
    getAirplaneById,
    cancelBooking,
    createBooking
  } = useData();
  
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Rebook Flight - FireWings";
    
    // Check if booking exists and belongs to current user
    const booking = getBookingById(bookingId || "");
    if (!booking || booking.userId !== user?.email || booking.status !== "confirmed") {
      navigate("/customer/bookings");
      return;
    }
  }, [bookingId, user, navigate, getBookingById]);

  const booking = getBookingById(bookingId || "");
  const currentFlight = booking ? getFlightById(booking.flightId) : null;
  
  // Get alternative flights from the same departure to same arrival
  const alternativeFlights = currentFlight ? flights.filter(flight => 
    flight.id !== currentFlight.id && 
    flight.departureAirportId === currentFlight.departureAirportId && 
    flight.arrivalAirportId === currentFlight.arrivalAirportId &&
    new Date(flight.departureTime) > new Date() &&
    flight.availableSeats >= (booking?.passengerCount || 1)
  ) : [];

  const handleRebookFlight = async () => {
    if (!booking || !user || !selectedFlightId) return;
    
    setLoading(true);
    
    try {
      // First cancel the existing booking
      cancelBooking(booking.id);
      
      // Create a new booking for the selected flight
      const success = createBooking({
        userId: user.email,
        flightId: selectedFlightId,
        passengerCount: booking.passengerCount,
        totalAmount: booking.totalAmount // Keep the same amount
      });
      
      if (success) {
        toast({
          title: "Flight rebooked successfully",
          description: "Your booking has been successfully changed to a new flight."
        });
        navigate("/customer/bookings");
      }
    } catch (error) {
      toast({
        title: "Error rebooking flight",
        description: "An error occurred while rebooking your flight.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = (departureTime: string, arrivalTime: string) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const durationMs = arrival.getTime() - departure.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  if (!booking || !currentFlight) {
    return (
      <CustomerLayout title="Rebook Flight">
        <div className="text-center py-10">
          <p className="text-muted-foreground">Booking not found or access denied.</p>
          <Button className="mt-4" onClick={() => navigate("/customer/bookings")}>
            Back to Bookings
          </Button>
        </div>
      </CustomerLayout>
    );
  }

  const departureAirport = getAirportById(currentFlight.departureAirportId);
  const arrivalAirport = getAirportById(currentFlight.arrivalAirportId);

  return (
    <CustomerLayout title="Rebook Flight">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Booking</CardTitle>
              <CardDescription>
                Your current flight details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Flight Number</p>
                    <p className="font-semibold">{currentFlight.flightNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Journey</p>
                    <p className="font-semibold">
                      {departureAirport?.city || "Unknown"} to {arrivalAirport?.city || "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p className="font-semibold">
                      {new Date(currentFlight.departureTime).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Passengers</p>
                    <p className="font-semibold">{booking.passengerCount}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Select New Flight</CardTitle>
              <CardDescription>
                Choose a new flight for your journey from {departureAirport?.city} to {arrivalAirport?.city}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alternativeFlights.length > 0 ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Alternative Flight</Label>
                    <Select 
                      value={selectedFlightId} 
                      onValueChange={setSelectedFlightId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a flight" />
                      </SelectTrigger>
                      <SelectContent>
                        {alternativeFlights.map((flight) => (
                          <SelectItem key={flight.id} value={flight.id}>
                            {flight.flightNumber} - {new Date(flight.departureTime).toLocaleDateString()} at {
                              new Date(flight.departureTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            }
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedFlightId && (
                    <div className="border rounded-md p-4">
                      {(() => {
                        const selectedFlight = getFlightById(selectedFlightId);
                        if (!selectedFlight) return null;
                        
                        const airplane = getAirplaneById(selectedFlight.airplaneId);
                        
                        return (
                          <>
                            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Flight Number</p>
                                <p className="font-medium">{selectedFlight.flightNumber}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Aircraft</p>
                                <p className="font-medium">{airplane?.model || "Unknown"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Duration</p>
                                <p className="font-medium">
                                  {calculateDuration(selectedFlight.departureTime, selectedFlight.arrivalTime)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-center">
                              <div className="text-center">
                                <p className="text-lg font-bold">{departureAirport?.code || "???"}</p>
                                <p className="text-sm">
                                  {new Date(selectedFlight.departureTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(selectedFlight.departureTime).toLocaleDateString()}
                                </p>
                              </div>
                              
                              <div className="my-2 md:mx-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary"
                                >
                                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                                </svg>
                              </div>
                              
                              <div className="text-center">
                                <p className="text-lg font-bold">{arrivalAirport?.code || "???"}</p>
                                <p className="text-sm">
                                  {new Date(selectedFlight.arrivalTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(selectedFlight.arrivalTime).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t">
                              <div className="flex justify-between">
                                <span className="font-medium">Original booking amount</span>
                                <span className="font-semibold">₹{booking.totalAmount.toLocaleString()}</span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-2">
                                * Rebooking will keep the same amount as your original booking
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md">
                  <p className="font-medium">No alternative flights are available</p>
                  <p className="text-sm mt-1">
                    There are no other flights from {departureAirport?.city} to {arrivalAirport?.city} with enough available seats.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate("/customer/bookings")}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRebookFlight}
                disabled={loading || !selectedFlightId || alternativeFlights.length === 0}
              >
                {loading ? "Rebooking..." : "Confirm Rebooking"}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="text-sm text-muted-foreground text-center">
            <p>
              Note: Rebooking will automatically cancel your current booking and create a new booking for the selected flight.
              There are no additional charges for rebooking in this demo.
            </p>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default RebookFlight;
