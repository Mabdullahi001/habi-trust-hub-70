import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign, 
  FileText, 
  Users,
  Lock,
  RefreshCw
} from "lucide-react";

interface EscrowDetails {
  id: string;
  amount: string;
  currency: string;
  status: "pending" | "funded" | "released" | "disputed" | "refunded";
  buyer: { name: string; verified: boolean };
  seller: { name: string; verified: boolean };
  property: { title: string; id: string };
  conditions: string[];
  timeline: Array<{
    date: string;
    status: string;
    description: string;
  }>;
}

interface EscrowPaymentProps {
  escrowId?: string;
  amount?: string;
  currency?: string;
  userRole?: "buyer" | "seller" | "admin";
  escrowDetails?: EscrowDetails;
}

export const EscrowPayment = ({ 
  escrowId = "ESC-2024-001",
  amount = "250,000",
  currency = "₦",
  userRole = "buyer",
  escrowDetails = {
    id: "ESC-2024-001",
    amount: "250,000",
    currency: "₦",
    status: "funded",
    buyer: { name: "John Doe", verified: true },
    seller: { name: "Property Holdings Ltd", verified: true },
    property: { title: "3BR Apartment in Victoria Island", id: "PROP-001" },
    conditions: [
      "Property inspection completed satisfactorily",
      "All legal documents verified",
      "Property title transfer completed",
      "Keys handed over to buyer"
    ],
    timeline: [
      { date: "2024-08-20", status: "created", description: "Escrow account created" },
      { date: "2024-08-20", status: "funded", description: "Buyer deposited funds" },
      { date: "2024-08-21", status: "inspection", description: "Property inspection scheduled" },
    ]
  }
}: EscrowPaymentProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "released": return "text-green-600 bg-green-50 border-green-200";
      case "funded": return "text-blue-600 bg-blue-50 border-blue-200";
      case "disputed": return "text-red-600 bg-red-50 border-red-200";
      case "pending": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "released": return <CheckCircle className="h-4 w-4" />;
      case "funded": return <Shield className="h-4 w-4" />;
      case "disputed": return <AlertTriangle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getProgressValue = () => {
    switch (escrowDetails.status) {
      case "pending": return 25;
      case "funded": return 50;
      case "released": return 100;
      case "disputed": return 75;
      default: return 0;
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Escrow Payment
          </CardTitle>
          <Badge className={`gap-2 ${getStatusColor(escrowDetails.status)}`}>
            {getStatusIcon(escrowDetails.status)}
            {escrowDetails.status.toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Secure transaction protection for {escrowDetails.property.title}
        </p>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Transaction Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Amount</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {escrowDetails.currency}{escrowDetails.amount}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Security</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">Funds Protected</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Parties</span>
                  </div>
                  <div className="text-sm">Both Verified</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Transaction Progress</span>
                <span>{getProgressValue()}% Complete</span>
              </div>
              <Progress value={getProgressValue()} className="h-2" />
            </div>

            {/* Parties Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold">Buyer</h3>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{escrowDetails.buyer.name}</div>
                    <div className="text-sm text-muted-foreground">Buyer</div>
                  </div>
                  {escrowDetails.buyer.verified && (
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Seller</h3>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{escrowDetails.seller.name}</div>
                    <div className="text-sm text-muted-foreground">Seller</div>
                  </div>
                  {escrowDetails.seller.verified && (
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            {escrowDetails.status === "pending" && userRole === "buyer" ? (
              /* Payment Form for Buyers */
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Secure Escrow Protection</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Your funds will be held securely until all conditions are met. 
                    Only then will they be released to the seller.
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["card", "bank", "crypto"].map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`p-4 border rounded-lg text-left transition-all ${
                          paymentMethod === method ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard className="h-4 w-4" />
                          <span className="font-medium capitalize">{method} Transfer</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {method === "card" && "Visa, Mastercard accepted"}
                          {method === "bank" && "Direct bank transfer"}
                          {method === "crypto" && "USDC, USDT supported"}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </div>
                  </div>
                )}

                <Button className="w-full" size="lg">
                  Fund Escrow - {currency}{amount}
                </Button>
              </div>
            ) : (
              /* Payment Status for Other Users */
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  {getStatusIcon(escrowDetails.status)}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    {escrowDetails.status === "funded" ? "Funds Secured" : "Payment Processing"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {escrowDetails.status === "funded" 
                      ? "Funds are safely held in escrow until all conditions are met"
                      : "Waiting for buyer to complete payment"
                    }
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="conditions" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Release Conditions</h3>
              <p className="text-sm text-muted-foreground">
                All conditions must be met before funds are released to the seller
              </p>
              
              {escrowDetails.conditions.map((condition, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="mt-0.5">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{condition}</div>
                  </div>
                  <Badge variant="outline">Required</Badge>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold">Dispute Resolution</h3>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium">Dispute Process</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  If any issues arise, either party can initiate a dispute resolution process.
                </p>
                <Button variant="outline" size="sm">
                  Report Issue
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <div className="space-y-4">
              {escrowDetails.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    {index < escrowDetails.timeline.length - 1 && (
                      <div className="w-0.5 h-8 bg-border mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium capitalize">{event.status}</span>
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};