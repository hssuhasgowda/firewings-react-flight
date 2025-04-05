
import { useState, useEffect } from "react";
import { useData, Airplane } from "@/contexts/DataContext";
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

const ManageAirplanes = () => {
  const { airplanes, addAirplane, updateAirplane, deleteAirplane } = useData();

  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAirplane, setCurrentAirplane] = useState<Airplane | null>(null);
  
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  
  useEffect(() => {
    document.title = "Manage Airplanes - FireWings Admin";
  }, []);

  const resetForm = () => {
    setModel("");
    setCapacity("");
    setManufacturer("");
    setEditMode(false);
    setCurrentAirplane(null);
  };

  const handleOpenDialog = () => {
    resetForm();
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    resetForm();
  };

  const handleEditAirplane = (airplane: Airplane) => {
    setCurrentAirplane(airplane);
    setModel(airplane.model);
    setCapacity(airplane.capacity.toString());
    setManufacturer(airplane.manufacturer);
    setEditMode(true);
    setShowDialog(true);
  };

  const validateForm = () => {
    if (!model || model.trim() === "") {
      toast({ title: "Error", description: "Model name is required", variant: "destructive" });
      return false;
    }
    
    if (!capacity || isNaN(Number(capacity)) || Number(capacity) <= 0) {
      toast({ title: "Error", description: "Capacity must be a positive number", variant: "destructive" });
      return false;
    }
    
    if (!manufacturer || manufacturer.trim() === "") {
      toast({ title: "Error", description: "Manufacturer name is required", variant: "destructive" });
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const airplaneData = {
      model,
      capacity: Number(capacity),
      manufacturer
    };
    
    if (editMode && currentAirplane) {
      updateAirplane({
        ...currentAirplane,
        ...airplaneData
      });
    } else {
      addAirplane(airplaneData);
    }
    
    handleCloseDialog();
  };

  const handleDeleteAirplane = (id: string) => {
    if (window.confirm("Are you sure you want to delete this airplane?")) {
      deleteAirplane(id);
    }
  };

  return (
    <AdminLayout title="Manage Airplanes">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Airplane List</h2>
          <Button onClick={handleOpenDialog}>Add New Airplane</Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {airplanes.map((airplane) => (
              <TableRow key={airplane.id}>
                <TableCell className="font-medium">{airplane.model}</TableCell>
                <TableCell>{airplane.manufacturer}</TableCell>
                <TableCell>{airplane.capacity} passengers</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditAirplane(airplane)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteAirplane(airplane.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {airplanes.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                  No airplanes found. Add a new airplane to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editMode ? "Edit Airplane" : "Add New Airplane"}</DialogTitle>
              <DialogDescription>
                {editMode ? "Update airplane details below" : "Enter the details for the new airplane"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input 
                  id="model" 
                  value={model} 
                  onChange={(e) => setModel(e.target.value)} 
                  placeholder="e.g., Boeing 737"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input 
                  id="manufacturer" 
                  value={manufacturer} 
                  onChange={(e) => setManufacturer(e.target.value)} 
                  placeholder="e.g., Boeing"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (Passengers)</Label>
                <Input 
                  id="capacity" 
                  type="number" 
                  min="1"
                  value={capacity} 
                  onChange={(e) => setCapacity(e.target.value)} 
                  placeholder="e.g., 180"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSubmit}>{editMode ? "Update" : "Add"} Airplane</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ManageAirplanes;
