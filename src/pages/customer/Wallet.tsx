
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Wallet = () => {
  const { user } = useAuth();
  const { walletBalance, walletTransactions, addFunds } = useData();
  
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "My Wallet - FireWings";
  }, []);

  const handleAddFunds = () => {
    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }
    
    setLoading(true);
    addFunds(parsedAmount);
    setAmount("");
    setLoading(false);
  };

  // Filter transactions for the current user
  const userTransactions = walletTransactions
    .filter(transaction => transaction.userId === user?.email)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <CustomerLayout title="My Wallet">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Your recent wallet transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {formatDateTime(transaction.date)}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <span 
                          className={`px-2 py-1 rounded text-xs ${
                            transaction.type === "credit" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.type === "credit" ? "Credit" : "Debit"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <span className={transaction.type === "credit" ? "text-green-600" : "text-red-600"}>
                          {transaction.type === "credit" ? "+" : "-"}
                          ₹{transaction.amount.toLocaleString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {userTransactions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Balance</CardTitle>
                <CardDescription>
                  Your available wallet balance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">₹{walletBalance.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Use your balance to book flights and other services
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Add Funds</CardTitle>
                <CardDescription>
                  Add money to your wallet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      min="1"
                      step="100"
                      placeholder="Enter amount"
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)} 
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    {[1000, 2000, 5000].map((quickAmount) => (
                      <Button 
                        key={quickAmount} 
                        variant="outline" 
                        size="sm"
                        onClick={() => setAmount(quickAmount.toString())}
                      >
                        ₹{quickAmount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleAddFunds}
                  disabled={loading || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}
                >
                  {loading ? "Processing..." : "Add Funds"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Wallet;
