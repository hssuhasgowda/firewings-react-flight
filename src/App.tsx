
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import NotFound from "./pages/NotFound";

// Admin Routes
import ManageFlights from "./pages/admin/ManageFlights";
import ViewBookings from "./pages/admin/ViewBookings";
import ManageAirplanes from "./pages/admin/ManageAirplanes";
import ManageAirports from "./pages/admin/ManageAirports";
import ViewReviews from "./pages/admin/ViewReviews";

// Customer Routes
import AvailableFlights from "./pages/customer/AvailableFlights";
import BookFlight from "./pages/customer/BookFlight";
import Wallet from "./pages/customer/Wallet";
import SubmitReview from "./pages/customer/SubmitReview";
import MyBookings from "./pages/customer/MyBookings";
import DownloadTicket from "./pages/customer/DownloadTicket";
import RebookFlight from "./pages/customer/RebookFlight";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <DataProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/flights" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <ManageFlights />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/bookings" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <ViewBookings />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/airplanes" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <ManageAirplanes />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/airports" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <ManageAirports />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/reviews" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <ViewReviews />
                  </ProtectedRoute>
                }
              />
              
              {/* Customer Routes */}
              <Route 
                path="/customer" 
                element={
                  <ProtectedRoute allowedRole="user">
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/customer/flights" 
                element={
                  <ProtectedRoute allowedRole="user">
                    <AvailableFlights />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/customer/book/:flightId" 
                element={
                  <ProtectedRoute allowedRole="user">
                    <BookFlight />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/customer/wallet" 
                element={
                  <ProtectedRoute allowedRole="user">
                    <Wallet />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/customer/review" 
                element={
                  <ProtectedRoute allowedRole="user">
                    <SubmitReview />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/customer/bookings" 
                element={
                  <ProtectedRoute allowedRole="user">
                    <MyBookings />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/customer/ticket/:bookingId" 
                element={
                  <ProtectedRoute allowedRole="user">
                    <DownloadTicket />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/customer/rebook/:bookingId" 
                element={
                  <ProtectedRoute allowedRole="user">
                    <RebookFlight />
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
