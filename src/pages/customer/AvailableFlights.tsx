
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const AvailableFlights = () => {
  const { flights, airports, getAirportById, getAirplaneById } = useData();
  
  const [departureAirportId, setDepartureAirportId] = useState("");
  const [arrivalAirportId, setArrivalAirportId] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    document.title = "Available Flights - FireWings";
  }, []);

  // Filter flights based on search criteria
  const filteredFlights = flights.filter(flight => {
    let match = true;
    
    if (departureAirportId && flight.departureAirportId !== departureAirportId) {
      match = false;
    }
    
    if (arrivalAirportId && flight.arrivalAirportId !== arrivalAirportId) {
      match = false;
    }
    
    if (searchDate) {
      const flightDate = new Date(flight.departureTime).toISOString().split('T')[0];
      if (flightDate !== searchDate) {
        match = false;
      }
    }
    
    return match;
  });

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  const calculateDuration = (departureTime: string, arrivalTime: string) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const durationMs = arrival.getTime() - departure.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <CustomerLayout title="Available Flights">
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Search Flights</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departureAirport">From</Label>
              <Select 
                value={departureAirportId} 
                onValueChange={setDepartureAirportId}
              >
                <SelectTrigger id="departureAirport">
                  <SelectValue placeholder="Select departure airport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Airports</SelectItem>
                  {airports.map((airport) => (
                    <SelectItem key={airport.id} value={airport.id}>
                      {airport.city} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="arrivalAirport">To</Label>
              <Select 
                value={arrivalAirportId} 
                onValueChange={setArrivalAirportId}
              >
                <SelectTrigger id="arrivalAirport">
                  <SelectValue placeholder="Select arrival airport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Airports</SelectItem>
                  {airports.map((airport) => (
                    <SelectItem key={airport.id} value={airport.id}>
                      {airport.city} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={searchDate} 
                onChange={(e) => setSearchDate(e.target.value)} 
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => {
                  setDepartureAirportId("");
                  setArrivalAirportId("");
                  setSearchDate("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredFlights.length > 0 ? (
            filteredFlights.map(flight => {
              const departureAirport = getAirportById(flight.departureAirportId);
              const arrivalAirport = getAirportById(flight.arrivalAirportId);
              const airplane = getAirplaneById(flight.airplaneId);
              
              return (
                <Card key={flight.id} className="overflow-hidden border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-grow p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Flight Number</p>
                            <p className="font-medium">{flight.flightNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Aircraft</p>
                            <p className="font-medium">{airplane?.model || "Unknown"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-medium">{calculateDuration(flight.departureTime, flight.arrivalTime)}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between items-center">
                          <div className="flex flex-col items-center md:items-start">
                            <p className="text-lg font-bold">{departureAirport?.code || "???"}</p>
                            <p className="text-xs text-muted-foreground">{departureAirport?.city || "Unknown"}</p>
                            <p className="text-sm">
                              {new Date(flight.departureTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          
                          <div className="flex-grow mx-4 my-2 md:my-0 flex flex-col items-center">
                            <div className="relative w-full flex items-center justify-center">
                              <div className="border-t border-dashed border-gray-300 w-full absolute"></div>
                              <div className="bg-white px-2 z-10 rounded-full">
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
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(flight.departureTime).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-center md:items-end">
                            <p className="text-lg font-bold">{arrivalAirport?.code || "???"}</p>
                            <p className="text-xs text-muted-foreground">{arrivalAirport?.city || "Unknown"}</p>
                            <p className="text-sm">
                              {new Date(flight.arrivalTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 flex flex-row md:flex-col justify-between md:justify-center items-center border-t md:border-t-0 md:border-l">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Price per person</p>
                          <p className="text-2xl font-bold text-primary">₹{flight.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{flight.availableSeats} seats left</p>
                        </div>
                        <div className="mt-0 md:mt-4">
                          <Link to={`/customer/book/${flight.id}`}>
                            <Button>Book Now</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No flights found matching your criteria.</p>
              <p className="mt-2 text-sm">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default AvailableFlights;
