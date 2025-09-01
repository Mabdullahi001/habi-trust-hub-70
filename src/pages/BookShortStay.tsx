import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  Wifi, 
  Car, 
  CreditCard,
  CheckCircle,
  Clock,
  Phone,
  Mail
} from "lucide-react";

const BookShortStay = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock property data - in real app, this would come from props/params
  const property = {
    id: "1",
    title: "Executive Suite Downtown",
    location: "Downtown Business District",
    pricePerNight: 150,
    rating: 4.9,
    reviews: 127,
    amenities: ["WiFi", "Parking", "Kitchen", "24/7 Support"],
    images: ["/placeholder.svg"],
    description: "Luxury executive suite perfect for business travelers with premium amenities."
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotalNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  const calculateTotal = () => {
    const nights = calculateTotalNights();
    const subtotal = nights * property.pricePerNight;
    const taxes = subtotal * 0.12; // 12% tax
    const cleaningFee = 25;
    return {
      nights,
      subtotal,
      taxes,
      cleaningFee,
      total: subtotal + taxes + cleaningFee
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.guests || 
        !bookingData.firstName || !bookingData.lastName || !bookingData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Booking Confirmed!",
        description: "Your short stay booking has been confirmed. Check your email for details.",
      });

      // Navigate to confirmation or dashboard
      navigate("/");
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pricing = calculateTotal();

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate(-1)}
                  className="mb-4"
                >
                  ← Back to Listings
                </Button>
                <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Booking</h1>
                <p className="text-muted-foreground">Fill in your details to confirm your stay</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Stay Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Stay Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="checkIn">Check-in Date</Label>
                        <Input
                          id="checkIn"
                          type="date"
                          value={bookingData.checkIn}
                          onChange={(e) => handleInputChange("checkIn", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkOut">Check-out Date</Label>
                        <Input
                          id="checkOut"
                          type="date"
                          value={bookingData.checkOut}
                          onChange={(e) => handleInputChange("checkOut", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Select value={bookingData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select guests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3 Guests</SelectItem>
                            <SelectItem value="4">4 Guests</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Guest Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Guest Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={bookingData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={bookingData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <Input
                        id="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        placeholder="Any special requests or requirements..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processing Booking...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Confirm Booking - ${pricing.total.toFixed(2)}
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Property Summary & Pricing */}
            <div className="space-y-6">
              {/* Property Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="h-48 bg-gradient-subtle rounded-lg mb-4"></div>
                  <CardTitle className="text-xl">{property.title}</CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1">{property.rating} ({property.reviews} reviews)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Amenities */}
                  <div>
                    <h4 className="font-medium mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div>
                    <h4 className="font-medium mb-3">Pricing Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>${property.pricePerNight}/night × {pricing.nights} nights</span>
                        <span>${pricing.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning fee</span>
                        <span>${pricing.cleaningFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & fees</span>
                        <span>${pricing.taxes.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium text-base">
                        <span>Total</span>
                        <span>${pricing.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Host Contact */}
                  <div>
                    <h4 className="font-medium mb-2">Host Contact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>host@shortstay.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookShortStay;