
import { useState, useEffect } from "react";
import { useData, Flight } from "@/contexts/DataContext";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

const ManageFlights = () => {
  const { 
    flights, 
    airports, 
    airplanes, 
    getAirportById, 
    getAirplaneById,
    addFlight,
    updateFlight,
    deleteFlight 
  } = useData();

  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentFlight, setCurrentFlight] = useState<Flight | null>(null);
  
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirportId, setDepartureAirportId] = useState("");
  const [arrivalAirportId, setArrivalAirportId] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [airplaneId, setAirplaneId] = useState("");
  const [price, setPrice] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  
  useEffect(() => {
    document.title = "Manage Flights - FireWings Admin";
  }, []);

  const resetForm = () => {
    setFlightNumber("");
    setDepartureAirportId("");
    setArrivalAirportId("");
    setDepartureTime("");
    setArrivalTime("");
    setAirplaneId("");
    setPrice("");
    setAvailableSeats("");
    setEditMode(false);
    setCurrentFlight(null);
  };

  const handleOpenDialog = () => {
    resetForm();
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    resetForm();
  };

  const handleEditFlight = (flight: Flight) => {
    setCurrentFlight(flight);
    setFlightNumber(flight.flightNumber);
    setDepartureAirportId(flight.departureAirportId);
    setArrivalAirportId(flight.arrivalAirportId);
    setDepartureTime(flight.departureTime.slice(0, 16));
    setArrivalTime(flight.arrivalTime.slice(0, 16));
    setAirplaneId(flight.airplaneId);
    setPrice(flight.price.toString());
    setAvailableSeats(flight.availableSeats.toString());
    setEditMode(true);
    setShowDialog(true);
  };

  const validateForm = () => {
    if (!flightNumber || flightNumber.trim() === "") {
      toast({ title: "Error", description: "Flight number is required", variant: "destructive" });
      return false;
    }
    
    if (!departureAirportId) {
      toast({ title: "Error", description: "Departure airport is required", variant: "destructive" });
      return false;
    }
    
    if (!arrivalAirportId) {
      toast({ title: "Error", description: "Arrival airport is required", variant: "destructive" });
      return false;
    }
    
    if (departureAirportId === arrivalAirportId) {
      toast({ title: "Error", description: "Departure and arrival airports cannot be the same", variant: "destructive" });
      return false;
    }
    
    if (!departureTime) {
      toast({ title: "Error", description: "Departure time is required", variant: "destructive" });
      return false;
    }
    
    if (!arrivalTime) {
      toast({ title: "Error", description: "Arrival time is required", variant: "destructive" });
      return false;
    }
    
    if (new Date(departureTime) >= new Date(arrivalTime)) {
      toast({ title: "Error", description: "Arrival time must be after departure time", variant: "destructive" });
      return false;
    }
    
    if (!airplaneId) {
      toast({ title: "Error", description: "Airplane is required", variant: "destructive" });
      return false;
    }
    
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast({ title: "Error", description: "Price must be a positive number", variant: "destructive" });
      return false;
    }
    
    if (!availableSeats || isNaN(Number(availableSeats)) || Number(availableSeats) <= 0) {
      toast({ title: "Error", description: "Available seats must be a positive number", variant: "destructive" });
      return false;
    }
    
    const selectedAirplane = airplanes.find(a => a.id === airplaneId);
    if (selectedAirplane && Number(availableSeats) > selectedAirplane.capacity) {
      toast({ 
        title: "Error", 
        description: `Available seats cannot exceed airplane capacity (${selectedAirplane.capacity})`, 
        variant: "destructive" 
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const flightData = {
      flightNumber,
      departureAirportId,
      arrivalAirportId,
      departureTime: new Date(departureTime).toISOString(),
      arrivalTime: new Date(arrivalTime).toISOString(),
      airplaneId,
      price: Number(price),
      availableSeats: Number(availableSeats)
    };
    
    if (editMode && currentFlight) {
      updateFlight({
        ...currentFlight,
        ...flightData
      });
    } else {
      addFlight(flightData);
    }
    
    handleCloseDialog();
  };

  const handleDeleteFlight = (id: string) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      deleteFlight(id);
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  return (
    <AdminLayout title="Manage Flights">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Flight List</h2>
          <Button onClick={handleOpenDialog}>Add New Flight</Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flight Number</TableHead>
              <TableHead>From → To</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Aircraft</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Available Seats</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight) => {
              const departureAirport = getAirportById(flight.departureAirportId);
              const arrivalAirport = getAirportById(flight.arrivalAirportId);
              const airplane = getAirplaneById(flight.airplaneId);
              
              return (
                <TableRow key={flight.id}>
                  <TableCell className="font-medium">{flight.flightNumber}</TableCell>
                  <TableCell>
                    {departureAirport?.code || "Unknown"} → {arrivalAirport?.code || "Unknown"}
                  </TableCell>
                  <TableCell>{formatDateTime(flight.departureTime)}</TableCell>
                  <TableCell>{formatDateTime(flight.arrivalTime)}</TableCell>
                  <TableCell>{airplane?.model || "Unknown"}</TableCell>
                  <TableCell>₹{flight.price.toLocaleString()}</TableCell>
                  <TableCell>{flight.availableSeats}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditFlight(flight)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteFlight(flight.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {flights.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                  No flights found. Add a new flight to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editMode ? "Edit Flight" : "Add New Flight"}</DialogTitle>
              <DialogDescription>
                {editMode ? "Update flight details below" : "Enter the details for the new flight"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="flightNumber">Flight Number</Label>
                <Input 
                  id="flightNumber" 
                  value={flightNumber} 
                  onChange={(e) => setFlightNumber(e.target.value)} 
                  placeholder="e.g., FW101"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="airplaneId">Aircraft</Label>
                <Select 
                  value={airplaneId} 
                  onValueChange={setAirplaneId}
                >
                  <SelectTrigger id="airplaneId">
                    <SelectValue placeholder="Select Aircraft" />
                  </SelectTrigger>
                  <SelectContent>
                    {airplanes.map((airplane) => (
                      <SelectItem key={airplane.id} value={airplane.id}>
                        {airplane.model} (Capacity: {airplane.capacity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="departureAirportId">Departure Airport</Label>
                <Select 
                  value={departureAirportId} 
                  onValueChange={setDepartureAirportId}
                >
                  <SelectTrigger id="departureAirportId">
                    <SelectValue placeholder="Select Departure Airport" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.id} value={airport.id}>
                        {airport.name} ({airport.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="arrivalAirportId">Arrival Airport</Label>
                <Select 
                  value={arrivalAirportId} 
                  onValueChange={setArrivalAirportId}
                >
                  <SelectTrigger id="arrivalAirportId">
                    <SelectValue placeholder="Select Arrival Airport" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.id} value={airport.id}>
                        {airport.name} ({airport.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="departureTime">Departure Date & Time</Label>
                <Input 
                  id="departureTime" 
                  type="datetime-local" 
                  value={departureTime} 
                  onChange={(e) => setDepartureTime(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="arrivalTime">Arrival Date & Time</Label>
                <Input 
                  id="arrivalTime" 
                  type="datetime-local" 
                  value={arrivalTime} 
                  onChange={(e) => setArrivalTime(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  min="0"
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="e.g., 5000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="availableSeats">Available Seats</Label>
                <Input 
                  id="availableSeats" 
                  type="number" 
                  min="0"
                  value={availableSeats} 
                  onChange={(e) => setAvailableSeats(e.target.value)} 
                  placeholder="e.g., 150"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSubmit}>{editMode ? "Update" : "Add"} Flight</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ManageFlights;
