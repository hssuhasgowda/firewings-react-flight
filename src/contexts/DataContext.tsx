
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

// Defining types
export type Airport = {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
};

export type Airplane = {
  id: string;
  model: string;
  capacity: number;
  manufacturer: string;
};

export type Flight = {
  id: string;
  flightNumber: string;
  departureAirportId: string;
  arrivalAirportId: string;
  departureTime: string;
  arrivalTime: string;
  airplaneId: string;
  price: number;
  availableSeats: number;
};

export type Booking = {
  id: string;
  userId: string;
  flightId: string;
  bookingDate: string;
  passengerCount: number;
  totalAmount: number;
  status: "confirmed" | "cancelled" | "pending";
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  flightId: string;
  rating: number;
  comment: string;
  date: string;
};

export type WalletTransaction = {
  id: string;
  userId: string;
  amount: number;
  type: "credit" | "debit";
  description: string;
  date: string;
};

type DataContextType = {
  airports: Airport[];
  airplanes: Airplane[];
  flights: Flight[];
  bookings: Booking[];
  reviews: Review[];
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  
  // Airport CRUD
  addAirport: (airport: Omit<Airport, "id">) => void;
  updateAirport: (airport: Airport) => void;
  deleteAirport: (id: string) => void;
  
  // Airplane CRUD
  addAirplane: (airplane: Omit<Airplane, "id">) => void;
  updateAirplane: (airplane: Airplane) => void;
  deleteAirplane: (id: string) => void;
  
  // Flight CRUD
  addFlight: (flight: Omit<Flight, "id">) => void;
  updateFlight: (flight: Flight) => void;
  deleteFlight: (id: string) => void;
  
  // Booking operations
  createBooking: (booking: Omit<Booking, "id" | "bookingDate" | "status">) => boolean;
  cancelBooking: (id: string) => void;
  
  // Review operations
  addReview: (review: Omit<Review, "id" | "date">) => void;
  
  // Wallet operations
  addFunds: (amount: number) => void;
  deductFunds: (amount: number) => boolean;
  
  // Helper functions
  getAirportById: (id: string) => Airport | undefined;
  getAirplaneById: (id: string) => Airplane | undefined;
  getFlightById: (id: string) => Flight | undefined;
  getBookingById: (id: string) => Booking | undefined;
};

// Mock data
const initialAirports: Airport[] = [
  { id: "1", name: "Indira Gandhi International Airport", code: "DEL", city: "New Delhi", country: "India" },
  { id: "2", name: "Chhatrapati Shivaji Maharaj International Airport", code: "BOM", city: "Mumbai", country: "India" },
  { id: "3", name: "Chennai International Airport", code: "MAA", city: "Chennai", country: "India" },
  { id: "4", name: "Kempegowda International Airport", code: "BLR", city: "Bangalore", country: "India" },
];

const initialAirplanes: Airplane[] = [
  { id: "1", model: "Boeing 737", capacity: 180, manufacturer: "Boeing" },
  { id: "2", model: "Airbus A320", capacity: 150, manufacturer: "Airbus" },
  { id: "3", model: "Boeing 787 Dreamliner", capacity: 250, manufacturer: "Boeing" },
];

const initialFlights: Flight[] = [
  { 
    id: "1", 
    flightNumber: "FW101", 
    departureAirportId: "1", 
    arrivalAirportId: "2", 
    departureTime: "2025-05-10T08:00:00", 
    arrivalTime: "2025-05-10T10:00:00", 
    airplaneId: "1", 
    price: 5000, 
    availableSeats: 150 
  },
  { 
    id: "2", 
    flightNumber: "FW102", 
    departureAirportId: "2", 
    arrivalAirportId: "3", 
    departureTime: "2025-05-12T09:30:00", 
    arrivalTime: "2025-05-12T11:30:00", 
    airplaneId: "2", 
    price: 4500, 
    availableSeats: 120 
  },
  { 
    id: "3", 
    flightNumber: "FW103", 
    departureAirportId: "1", 
    arrivalAirportId: "4", 
    departureTime: "2025-05-15T14:00:00", 
    arrivalTime: "2025-05-15T16:30:00", 
    airplaneId: "3", 
    price: 6000, 
    availableSeats: 200 
  },
];

const initialBookings: Booking[] = [
  { 
    id: "1", 
    userId: "user@gmail.com", 
    flightId: "1", 
    bookingDate: "2025-04-01T12:00:00", 
    passengerCount: 2, 
    totalAmount: 10000, 
    status: "confirmed" 
  }
];

const initialReviews: Review[] = [
  { 
    id: "1", 
    userId: "user@gmail.com", 
    userName: "Regular User", 
    flightId: "1", 
    rating: 4, 
    comment: "Great service and on-time departure!", 
    date: "2025-04-02T15:30:00" 
  }
];

const initialWalletTransactions: WalletTransaction[] = [
  { 
    id: "1", 
    userId: "user@gmail.com", 
    amount: 20000, 
    type: "credit", 
    description: "Initial deposit", 
    date: "2025-04-01T10:00:00" 
  },
  { 
    id: "2", 
    userId: "user@gmail.com", 
    amount: 10000, 
    type: "debit", 
    description: "Booking for Flight FW101", 
    date: "2025-04-01T12:00:00" 
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [airports, setAirports] = useState<Airport[]>(initialAirports);
  const [airplanes, setAirplanes] = useState<Airplane[]>(initialAirplanes);
  const [flights, setFlights] = useState<Flight[]>(initialFlights);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(initialWalletTransactions);
  const [walletBalance, setWalletBalance] = useState<number>(10000); // ₹10,000

  // Generate a random ID
  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Airport CRUD operations
  const addAirport = (airport: Omit<Airport, "id">) => {
    const newAirport = { ...airport, id: generateId() };
    setAirports([...airports, newAirport]);
    toast({ title: "Success", description: "Airport added successfully" });
  };

  const updateAirport = (airport: Airport) => {
    setAirports(airports.map(a => a.id === airport.id ? airport : a));
    toast({ title: "Success", description: "Airport updated successfully" });
  };

  const deleteAirport = (id: string) => {
    // Check if airport is used in any flights
    const usedInFlight = flights.some(
      f => f.departureAirportId === id || f.arrivalAirportId === id
    );
    
    if (usedInFlight) {
      toast({ 
        title: "Error", 
        description: "Cannot delete airport as it is used in existing flights", 
        variant: "destructive" 
      });
      return;
    }
    
    setAirports(airports.filter(a => a.id !== id));
    toast({ title: "Success", description: "Airport deleted successfully" });
  };

  // Airplane CRUD operations
  const addAirplane = (airplane: Omit<Airplane, "id">) => {
    const newAirplane = { ...airplane, id: generateId() };
    setAirplanes([...airplanes, newAirplane]);
    toast({ title: "Success", description: "Airplane added successfully" });
  };

  const updateAirplane = (airplane: Airplane) => {
    setAirplanes(airplanes.map(a => a.id === airplane.id ? airplane : a));
    toast({ title: "Success", description: "Airplane updated successfully" });
  };

  const deleteAirplane = (id: string) => {
    // Check if airplane is used in any flights
    const usedInFlight = flights.some(f => f.airplaneId === id);
    
    if (usedInFlight) {
      toast({ 
        title: "Error", 
        description: "Cannot delete airplane as it is used in existing flights", 
        variant: "destructive" 
      });
      return;
    }
    
    setAirplanes(airplanes.filter(a => a.id !== id));
    toast({ title: "Success", description: "Airplane deleted successfully" });
  };

  // Flight CRUD operations
  const addFlight = (flight: Omit<Flight, "id">) => {
    const newFlight = { ...flight, id: generateId() };
    setFlights([...flights, newFlight]);
    toast({ title: "Success", description: "Flight added successfully" });
  };

  const updateFlight = (flight: Flight) => {
    setFlights(flights.map(f => f.id === flight.id ? flight : f));
    toast({ title: "Success", description: "Flight updated successfully" });
  };

  const deleteFlight = (id: string) => {
    // Check if flight has bookings
    const hasBookings = bookings.some(b => b.flightId === id && b.status !== "cancelled");
    
    if (hasBookings) {
      toast({ 
        title: "Error", 
        description: "Cannot delete flight as it has active bookings", 
        variant: "destructive" 
      });
      return;
    }
    
    setFlights(flights.filter(f => f.id !== id));
    toast({ title: "Success", description: "Flight deleted successfully" });
  };

  // Booking operations
  const createBooking = (booking: Omit<Booking, "id" | "bookingDate" | "status">) => {
    // Check available seats
    const flight = flights.find(f => f.id === booking.flightId);
    
    if (!flight) {
      toast({ 
        title: "Error", 
        description: "Flight not found", 
        variant: "destructive" 
      });
      return false;
    }
    
    if (flight.availableSeats < booking.passengerCount) {
      toast({ 
        title: "Error", 
        description: "Not enough seats available", 
        variant: "destructive" 
      });
      return false;
    }
    
    // Check wallet balance
    const totalAmount = flight.price * booking.passengerCount;
    
    if (walletBalance < totalAmount) {
      toast({ 
        title: "Error", 
        description: "Insufficient funds in wallet", 
        variant: "destructive" 
      });
      return false;
    }
    
    // Deduct from wallet
    setWalletBalance(prevBalance => prevBalance - totalAmount);
    
    // Add wallet transaction
    const transactionId = generateId();
    const newTransaction: WalletTransaction = {
      id: transactionId,
      userId: booking.userId,
      amount: totalAmount,
      type: "debit",
      description: `Booking for Flight ${flight.flightNumber}`,
      date: new Date().toISOString(),
    };
    
    setWalletTransactions([...walletTransactions, newTransaction]);
    
    // Create booking
    const bookingId = generateId();
    const newBooking: Booking = {
      id: bookingId,
      userId: booking.userId,
      flightId: booking.flightId,
      bookingDate: new Date().toISOString(),
      passengerCount: booking.passengerCount,
      totalAmount,
      status: "confirmed"
    };
    
    setBookings([...bookings, newBooking]);
    
    // Update flight seats
    setFlights(flights.map(f => {
      if (f.id === booking.flightId) {
        return {
          ...f,
          availableSeats: f.availableSeats - booking.passengerCount
        };
      }
      return f;
    }));
    
    toast({ 
      title: "Success", 
      description: "Flight booked successfully" 
    });
    
    return true;
  };

  const cancelBooking = (id: string) => {
    const booking = bookings.find(b => b.id === id);
    
    if (!booking) {
      toast({ 
        title: "Error", 
        description: "Booking not found", 
        variant: "destructive" 
      });
      return;
    }
    
    if (booking.status === "cancelled") {
      toast({ 
        title: "Error", 
        description: "Booking is already cancelled", 
        variant: "destructive" 
      });
      return;
    }
    
    // Update booking status
    setBookings(bookings.map(b => {
      if (b.id === id) {
        return { ...b, status: "cancelled" };
      }
      return b;
    }));
    
    // Refund to wallet (80% of total amount)
    const refundAmount = booking.totalAmount * 0.8;
    setWalletBalance(prevBalance => prevBalance + refundAmount);
    
    // Add wallet transaction
    const transactionId = generateId();
    const newTransaction: WalletTransaction = {
      id: transactionId,
      userId: booking.userId,
      amount: refundAmount,
      type: "credit",
      description: "Refund for cancelled booking (80%)",
      date: new Date().toISOString(),
    };
    
    setWalletTransactions([...walletTransactions, newTransaction]);
    
    // Update flight seats
    setFlights(flights.map(f => {
      if (f.id === booking.flightId) {
        return {
          ...f,
          availableSeats: f.availableSeats + booking.passengerCount
        };
      }
      return f;
    }));
    
    toast({ 
      title: "Success", 
      description: `Booking cancelled successfully. ₹${refundAmount.toFixed(2)} refunded to wallet.` 
    });
  };

  // Review operations
  const addReview = (review: Omit<Review, "id" | "date">) => {
    const newReview = { 
      ...review, 
      id: generateId(),
      date: new Date().toISOString()
    };
    
    setReviews([...reviews, newReview]);
    
    toast({ 
      title: "Success", 
      description: "Review submitted successfully" 
    });
  };

  // Wallet operations
  const addFunds = (amount: number) => {
    setWalletBalance(prevBalance => prevBalance + amount);
    
    // Add wallet transaction
    const transactionId = generateId();
    const newTransaction: WalletTransaction = {
      id: transactionId,
      userId: "user@gmail.com", // In a real app, this would be the logged-in user's ID
      amount: amount,
      type: "credit",
      description: "Funds added to wallet",
      date: new Date().toISOString(),
    };
    
    setWalletTransactions([...walletTransactions, newTransaction]);
    
    toast({ 
      title: "Success", 
      description: `₹${amount.toFixed(2)} added to wallet successfully` 
    });
  };

  const deductFunds = (amount: number) => {
    if (walletBalance < amount) {
      toast({ 
        title: "Error", 
        description: "Insufficient funds in wallet", 
        variant: "destructive" 
      });
      return false;
    }
    
    setWalletBalance(prevBalance => prevBalance - amount);
    
    // Add wallet transaction
    const transactionId = generateId();
    const newTransaction: WalletTransaction = {
      id: transactionId,
      userId: "user@gmail.com", // In a real app, this would be the logged-in user's ID
      amount: amount,
      type: "debit",
      description: "Funds deducted from wallet",
      date: new Date().toISOString(),
    };
    
    setWalletTransactions([...walletTransactions, newTransaction]);
    
    toast({ 
      title: "Success", 
      description: `₹${amount.toFixed(2)} deducted from wallet` 
    });
    
    return true;
  };

  // Helper functions
  const getAirportById = (id: string): Airport | undefined => {
    return airports.find(airport => airport.id === id);
  };

  const getAirplaneById = (id: string): Airplane | undefined => {
    return airplanes.find(airplane => airplane.id === id);
  };

  const getFlightById = (id: string): Flight | undefined => {
    return flights.find(flight => flight.id === id);
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <DataContext.Provider value={{
      airports,
      airplanes,
      flights,
      bookings,
      reviews,
      walletBalance,
      walletTransactions,
      addAirport,
      updateAirport,
      deleteAirport,
      addAirplane,
      updateAirplane,
      deleteAirplane,
      addFlight,
      updateFlight,
      deleteFlight,
      createBooking,
      cancelBooking,
      addReview,
      addFunds,
      deductFunds,
      getAirportById,
      getAirplaneById,
      getFlightById,
      getBookingById,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
