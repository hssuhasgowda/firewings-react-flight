
import { useState, useEffect } from "react";
import { useData, Airport } from "@/contexts/DataContext";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

const ManageAirports = () => {
  const { airports, addAirport, updateAirport, deleteAirport } = useData();

  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAirport, setCurrentAirport] = useState<Airport | null>(null);
  
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  
  useEffect(() => {
    document.title = "Manage Airports - FireWings Admin";
  }, []);

  const resetForm = () => {
    setName("");
    setCode("");
    setCity("");
    setCountry("");
    setEditMode(false);
    setCurrentAirport(null);
  };

  const handleOpenDialog = () => {
    resetForm();
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    resetForm();
  };

  const handleEditAirport = (airport: Airport) => {
    setCurrentAirport(airport);
    setName(airport.name);
    setCode(airport.code);
    setCity(airport.city);
    setCountry(airport.country);
    setEditMode(true);
    setShowDialog(true);
  };

  const validateForm = () => {
    if (!name || name.trim() === "") {
      toast({ title: "Error", description: "Airport name is required", variant: "destructive" });
      return false;
    }
    
    if (!code || code.trim() === "") {
      toast({ title: "Error", description: "Airport code is required", variant: "destructive" });
      return false;
    }
    
    if (code.length !== 3) {
      toast({ title: "Error", description: "Airport code must be exactly 3 characters", variant: "destructive" });
      return false;
    }
    
    const codeExists = airports.some(
      a => a.code.toLowerCase() === code.toUpperCase() && 
      (!editMode || (currentAirport && a.id !== currentAirport.id))
    );
    
    if (codeExists) {
      toast({ title: "Error", description: "Airport code already exists", variant: "destructive" });
      return false;
    }
    
    if (!city || city.trim() === "") {
      toast({ title: "Error", description: "City is required", variant: "destructive" });
      return false;
    }
    
    if (!country || country.trim() === "") {
      toast({ title: "Error", description: "Country is required", variant: "destructive" });
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const airportData = {
      name,
      code: code.toUpperCase(),
      city,
      country
    };
    
    if (editMode && currentAirport) {
      updateAirport({
        ...currentAirport,
        ...airportData
      });
    } else {
      addAirport(airportData);
    }
    
    handleCloseDialog();
  };

  const handleDeleteAirport = (id: string) => {
    if (window.confirm("Are you sure you want to delete this airport?")) {
      deleteAirport(id);
    }
  };

  return (
    <AdminLayout title="Manage Airports">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Airport List</h2>
          <Button onClick={handleOpenDialog}>Add New Airport</Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {airports.map((airport) => (
              <TableRow key={airport.id}>
                <TableCell className="font-medium">{airport.code}</TableCell>
                <TableCell>{airport.name}</TableCell>
                <TableCell>{airport.city}</TableCell>
                <TableCell>{airport.country}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditAirport(airport)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteAirport(airport.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {airports.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No airports found. Add a new airport to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editMode ? "Edit Airport" : "Add New Airport"}</DialogTitle>
              <DialogDescription>
                {editMode ? "Update airport details below" : "Enter the details for the new airport"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="e.g., Indira Gandhi International Airport"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="code">Airport Code (3 letters)</Label>
                <Input 
                  id="code" 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  placeholder="e.g., DEL"
                  maxLength={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  placeholder="e.g., New Delhi"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country" 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)} 
                  placeholder="e.g., India"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSubmit}>{editMode ? "Update" : "Add"} Airport</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ManageAirports;
