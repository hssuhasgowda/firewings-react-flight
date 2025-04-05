
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SubmitReview = () => {
  const { user } = useAuth();
  const { flights, bookings, getFlightById, addReview } = useData();
  
  const [flightId, setFlightId] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Submit Review - FireWings";
  }, []);

  // Get user's booked flights
  const userBookings = bookings.filter(
    booking => booking.userId === user?.email && booking.status === "confirmed"
  );
  
  const userFlightIds = [...new Set(userBookings.map(booking => booking.flightId))];
  const userFlights = userFlightIds.map(id => getFlightById(id)).filter(Boolean);

  const handleSubmitReview = () => {
    if (!user || !flightId || !comment.trim()) return;
    
    setLoading(true);
    
    const reviewData = {
      userId: user.email,
      userName: user.name,
      flightId: flightId,
      rating: parseInt(rating),
      comment: comment.trim()
    };
    
    addReview(reviewData);
    
    // Reset form
    setFlightId("");
    setRating("5");
    setComment("");
    
    setLoading(false);
  };

  // Star Rating component
  const StarRating = () => {
    const stars = 5;
    
    return (
      <div className="flex space-x-1">
        {Array.from({ length: stars }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`text-2xl focus:outline-none ${
              index < parseInt(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating((index + 1).toString())}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <CustomerLayout title="Submit Review">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Rate Your Flight Experience</CardTitle>
            <CardDescription>
              Share your feedback about your journey with FireWings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Flight</label>
              <Select 
                value={flightId} 
                onValueChange={setFlightId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a flight you've taken" />
                </SelectTrigger>
                <SelectContent>
                  {userFlights.map((flight) => (
                    flight && (
                      <SelectItem key={flight.id} value={flight.id}>
                        {flight.flightNumber}
                      </SelectItem>
                    )
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Rate Your Experience</label>
              <StarRating />
              <p className="text-sm text-muted-foreground">
                {rating === "1" && "Poor - Did not meet expectations"}
                {rating === "2" && "Below Average - Needs improvement"}
                {rating === "3" && "Average - Met basic expectations"}
                {rating === "4" && "Good - Above average experience"}
                {rating === "5" && "Excellent - Exceeded expectations"}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="comment">Comments</label>
              <Textarea 
                id="comment"
                placeholder="Please share your experience with our service..."
                className="min-h-[120px]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleSubmitReview}
              disabled={loading || !flightId || !comment.trim()}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Your feedback helps us improve our services for all passengers.
          </p>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default SubmitReview;
