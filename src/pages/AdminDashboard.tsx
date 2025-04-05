
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Users,
  Plane,
  BarChart3,
  Calendar,
  Settings,
  AlertCircle
} from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Set document title when component mounts
    document.title = "Admin Dashboard - FireWings";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto pt-24 pb-10 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}. Here's what's happening with FireWings today.
          </p>
        </div>
        
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-firewings-purple" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,248</p>
              <p className="text-xs text-muted-foreground mt-1">
                +8% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plane className="h-5 w-5 text-firewings-blue" />
                Active Flights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">42</p>
              <p className="text-xs text-muted-foreground mt-1">
                6 arriving within 2 hours
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-green-500" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$246,389</p>
              <p className="text-xs text-muted-foreground mt-1">
                +12.4% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
              <p className="text-xs text-muted-foreground mt-1">
                2 require immediate attention
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin Tools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest system events and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "New Registration",
                    description: "John Doe registered a new account",
                    time: "Just now",
                    icon: <Users className="h-5 w-5" />
                  },
                  {
                    title: "Flight Scheduled",
                    description: "Flight FW-345 scheduled for tomorrow",
                    time: "2 hours ago",
                    icon: <Plane className="h-5 w-5" />
                  },
                  {
                    title: "System Update",
                    description: "System maintenance scheduled for tonight",
                    time: "4 hours ago",
                    icon: <Settings className="h-5 w-5" />
                  },
                  {
                    title: "Flight Canceled",
                    description: "Flight FW-112 has been canceled due to weather",
                    time: "Yesterday",
                    icon: <AlertCircle className="h-5 w-5" />
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 hover:bg-muted/50 rounded-md transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>
                Scheduled events and tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Staff Meeting",
                    date: "Today, 3:00 PM",
                    priority: "High",
                  },
                  {
                    title: "System Maintenance",
                    date: "Tomorrow, 1:00 AM",
                    priority: "Medium",
                  },
                  {
                    title: "Quarterly Review",
                    date: "Apr 10, 10:00 AM",
                    priority: "Medium",
                  },
                  {
                    title: "Update Flight Schedules",
                    date: "Apr 12, 9:00 AM",
                    priority: "Low",
                  }
                ].map((task, index) => (
                  <div key={index} className="flex items-center gap-3 p-2">
                    <div className="flex-shrink-0">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.date}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span 
                        className={`
                          inline-flex items-center px-2 py-1 text-xs rounded-full
                          ${
                            task.priority === "High" 
                              ? "bg-red-100 text-red-800" 
                              : task.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-green-100 text-green-800"
                          }
                        `}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
