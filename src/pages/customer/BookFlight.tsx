
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookFlight = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    flights, 
    getFlightById, 
    getAirportById, 
    getAirplaneById,
    createBooking,
    walletBalance
  } = useData();

  const [passengers, setPassengers] = useState("1");
  const [totalPrice, setTotalPrice] = useState(0);
  const [flight, setFlight] = useState(getFlightById(flightId || ""));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Book Flight - FireWings";
    
    if (!flight) {
      navigate("/customer/flights");
      return;
    }
    
    setTotalPrice(flight.price * parseInt(passengers));
  }, [flight, passengers, navigate]);

  const calculateDuration = (departureTime: string, arrivalTime: string) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const durationMs = arrival.getTime() - departure.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const handlePassengerChange = (value: string) => {
    const passengerCount = parseInt(value);
    setPassengers(value);
    
    if (flight) {
      setTotalPrice(flight.price * passengerCount);
    }
  };

  const handleBookFlight = async () => {
    if (!flight || !user) return;
    
    setLoading(true);
    
    const bookingData = {
      userId: user.email,
      flightId: flight.id,
      passengerCount: parseInt(passengers),
      totalAmount: totalPrice
    };
    
    const success = createBooking(bookingData);
    
    setLoading(false);
    
    if (success) {
      navigate("/customer/bookings");
    }
  };

  if (!flight) {
    return (
      <CustomerLayout title="Book Flight">
        <div className="text-center py-10">
          <p className="text-muted-foreground">Flight not found.</p>
          <Button className="mt-4" onClick={() => navigate("/customer/flights")}>
            Browse Flights
          </Button>
        </div>
      </CustomerLayout>
    );
  }

  const departureAirport = getAirportById(flight.departureAirportId);
  const arrivalAirport = getAirportById(flight.arrivalAirportId);
  const airplane = getAirplaneById(flight.airplaneId);
  const insufficientFunds = totalPrice > walletBalance;

  return (
    <CustomerLayout title="Book Flight">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Flight Details</CardTitle>
              <CardDescription>
                Flight {flight.flightNumber} • {
                  departureAirport && arrivalAirport ? (
                    `${departureAirport.city} to ${arrivalAirport.city}`
                  ) : "Unknown route"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Departure</p>
                  <p className="text-xl font-semibold">
                    {departureAirport?.code || "???"} 
                    <span className="text-lg text-muted-foreground"> {departureAirport?.city || ""}</span>
                  </p>
                  <p className="text-sm">
                    {new Date(flight.departureTime).toLocaleString()}
                  </p>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    {calculateDuration(flight.departureTime, flight.arrivalTime)}
                  </div>
                  <div className="relative w-24 md:w-32">
                    <div className="border-t border-dashed border-gray-300 w-full absolute top-1/2"></div>
                    <div className="bg-white px-2 absolute -right-2 top-1/2 transform -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Arrival</p>
                  <p className="text-xl font-semibold">
                    {arrivalAirport?.code || "???"} 
                    <span className="text-lg text-muted-foreground"> {arrivalAirport?.city || ""}</span>
                  </p>
                  <p className="text-sm">
                    {new Date(flight.arrivalTime).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Aircraft</p>
                    <p>{airplane?.model || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Flight Number</p>
                    <p>{flight.flightNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price per person</p>
                    <p className="text-lg font-bold">₹{flight.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>
                Please provide passenger and payment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input id="email" type="email" value={user?.email || ""} readOnly />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passengers">Number of Passengers</Label>
                <Select 
                  value={passengers} 
                  onValueChange={handlePassengerChange}
                >
                  <SelectTrigger id="passengers">
                    <SelectValue placeholder="Select number of passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: Math.min(flight.availableSeats, 10) }, (_, i) => i + 1).map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {value} {value === 1 ? "passenger" : "passengers"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Price</span>
                  <span className="text-xl font-bold">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">Your wallet balance</span>
                  <span className={`font-medium ${insufficientFunds ? 'text-destructive' : ''}`}>
                    ₹{walletBalance.toLocaleString()}
                  </span>
                </div>
                {insufficientFunds && (
                  <p className="text-destructive text-sm mt-2">
                    Insufficient funds. Please add money to your wallet.
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate("/customer/flights")}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleBookFlight}
                disabled={loading || parseInt(passengers) < 1 || insufficientFunds}
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default BookFlight;
