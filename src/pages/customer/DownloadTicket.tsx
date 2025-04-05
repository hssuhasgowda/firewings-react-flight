
import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadTicket = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    bookings, 
    getBookingById, 
    getFlightById, 
    getAirportById, 
    getAirplaneById 
  } = useData();
  
  const [loading, setLoading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Ticket - FireWings";
    
    // Check if booking exists and belongs to current user
    const booking = getBookingById(bookingId || "");
    if (!booking || booking.userId !== user?.email) {
      navigate("/customer/bookings");
      return;
    }
  }, [bookingId, user, navigate, getBookingById]);

  const booking = getBookingById(bookingId || "");
  const flight = booking ? getFlightById(booking.flightId) : null;
  const departureAirport = flight ? getAirportById(flight.departureAirportId) : null;
  const arrivalAirport = flight ? getAirportById(flight.arrivalAirportId) : null;
  const airplane = flight ? getAirplaneById(flight.airplaneId) : null;

  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return;
    
    setLoading(true);
    
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`FireWings_Ticket_${booking?.id.slice(0, 8)}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  if (!booking || !flight) {
    return (
      <CustomerLayout title="Ticket Not Found">
        <div className="text-center py-10">
          <p className="text-muted-foreground">Booking not found or access denied.</p>
          <Button className="mt-4" onClick={() => navigate("/customer/bookings")}>
            Back to Bookings
          </Button>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout title="Your Ticket">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button 
              onClick={handleDownloadPDF}
              disabled={loading}
            >
              {loading ? "Generating PDF..." : "Download Ticket (PDF)"}
            </Button>
          </div>
          
          <div ref={ticketRef} className="p-4 bg-white rounded-lg shadow">
            <div className="border-4 border-primary/20 rounded-lg overflow-hidden">
              <div className="bg-gradient-firewings text-white px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold">FireWings</h1>
                    <p>Boarding Pass</p>
                  </div>
                  <div>
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/5611/5611044.png" 
                      alt="FireWings Logo" 
                      className="w-12 h-12" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Passenger</p>
                    <p className="font-semibold">{user?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Flight</p>
                    <p className="font-semibold">{flight.flightNumber}</p>
                  </div>
                </div>
                
                <div className="my-6 flex flex-col md:flex-row justify-between items-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      {departureAirport?.code || "???"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {departureAirport?.city || "Unknown"}
                    </div>
                    <div className="text-md font-semibold mt-1">
                      {new Date(flight.departureTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(flight.departureTime).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="my-4 md:my-0">
                    <div className="relative w-full flex items-center justify-center">
                      <div className="border-t-2 border-dashed border-gray-300 w-24 md:w-32 absolute"></div>
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
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      {arrivalAirport?.code || "???"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {arrivalAirport?.city || "Unknown"}
                    </div>
                    <div className="text-md font-semibold mt-1">
                      {new Date(flight.arrivalTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(flight.arrivalTime).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6 border-t pt-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Booking ID</p>
                    <p className="font-medium">{booking.id.slice(0, 8)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Aircraft</p>
                    <p className="font-medium">{airplane?.model || "Unknown"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Passengers</p>
                    <p className="font-medium">{booking.passengerCount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="font-medium uppercase">{booking.status}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Date of Issue</p>
                    <p className="font-medium">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Amount Paid</p>
                    <p className="font-semibold">₹{booking.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 text-center text-xs text-muted-foreground">
                <p>Thank you for choosing FireWings! We wish you a pleasant journey.</p>
                <p>This is an electronic ticket. Please present a printed copy or digital version at check-in.</p>
              </div>
            </div>
          </div>
          
          <CardFooter className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={() => navigate("/customer/bookings")}
            >
              Back to Bookings
            </Button>
            <Button onClick={handleDownloadPDF} disabled={loading}>
              {loading ? "Generating PDF..." : "Download Ticket (PDF)"}
            </Button>
          </CardFooter>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default DownloadTicket;
