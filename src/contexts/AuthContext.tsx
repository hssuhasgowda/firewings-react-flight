
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

type User = {
  email: string;
  role: "admin" | "user";
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static user credentials as specified
const USERS = [
  { email: "admin@gmail.com", password: "admin123", role: "admin", name: "Admin User" },
  { email: "user@gmail.com", password: "user123", role: "user", name: "Regular User" },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("firewings_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const foundUser = USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        email: foundUser.email,
        role: foundUser.role as "admin" | "user",
        name: foundUser.name,
      };
      setUser(userData);
      localStorage.setItem("firewings_user", JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
      
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Check if user already exists
    if (USERS.some((user) => user.email === email)) {
      toast({
        title: "Registration failed",
        description: "This email is already registered. Please use another email.",
        variant: "destructive",
      });
      return false;
    }
    
    // In a real app, we would save this user to a database
    // For this demo, we'll just show a success message
    toast({
      title: "Registration successful",
      description: "Your account has been created! You can now login.",
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("firewings_user");
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
