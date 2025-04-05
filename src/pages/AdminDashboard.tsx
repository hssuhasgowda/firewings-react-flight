
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import AdminLayout from "@/components/layouts/AdminLayout";
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
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const AdminDashboard = () => {
  const { 
    flights, 
    bookings,
    airports,
    airplanes,
    reviews
  } = useData();

  useEffect(() => {
    document.title = "Admin Dashboard - FireWings";
  }, []);

  // Recent bookings
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
    .slice(0, 5);

  // Stats
  const activeFlights = flights.length;
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;
  const cancelledBookings = bookings.filter(b => b.status === "cancelled").length;
  const totalRevenue = bookings
    .filter(b => b.status === "confirmed")
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  // Data for pie chart
  const bookingStatusData = [
    { name: "Confirmed", value: confirmedBookings },
    { name: "Cancelled", value: cancelledBookings },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Flights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activeFlights}</p>
              <Link to="/admin/flights" className="text-sm text-primary hover:underline mt-2 inline-block">
                Manage Flights
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalBookings}</p>
              <Link to="/admin/bookings" className="text-sm text-primary hover:underline mt-2 inline-block">
                View All Bookings
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">
                From {confirmedBookings} confirmed bookings
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{airports.length}</p>
              <Link to="/admin/airports" className="text-sm text-primary hover:underline mt-2 inline-block">
                Manage Airports
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Booking Status Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Status</CardTitle>
              <CardDescription>Distribution of booking statuses</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {bookingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} bookings`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest 5 bookings in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id.slice(0, 5)}</TableCell>
                      <TableCell>
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </TableCell>
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
                    </TableRow>
                  ))}
                  {recentBookings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
