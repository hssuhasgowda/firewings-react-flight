
import { useState, useEffect } from "react";
import { useData } from "@/contexts/DataContext";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ViewReviews = () => {
  const { reviews, getFlightById } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "View Reviews - FireWings Admin";
  }, []);

  // Filter reviews based on search term
  const filteredReviews = reviews.filter(review => 
    review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stars rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        ))}
        <span className="ml-2 text-gray-600">{rating}/5</span>
      </div>
    );
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <AdminLayout title="View Reviews">
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          <div className="w-full md:w-64">
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map(review => {
              const flight = getFlightById(review.flightId);
              
              return (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{review.userName}</CardTitle>
                        <CardDescription>
                          {formatDateTime(review.date)} • 
                          Flight: {flight ? flight.flightNumber : "Unknown"}
                        </CardDescription>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No reviews found matching your search.</p>
            </div>
          )}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Rating Summary</CardTitle>
            <CardDescription>Overview of all customer ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
                
                return (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-20">
                      <span className="mr-2">{rating} stars</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-yellow-400 h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500 w-12">{percentage}%</span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium">
                Average Rating: {" "}
                <span className="text-yellow-500 font-bold">
                  {reviews.length > 0 
                    ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1) 
                    : "N/A"
                  }
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ViewReviews;
