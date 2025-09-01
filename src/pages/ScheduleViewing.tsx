import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  CheckCircle
} from "lucide-react";
import { format, addDays, isToday, isTomorrow } from "date-fns";
import { toast } from "@/hooks/use-toast";

const ScheduleViewing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [viewingType, setViewingType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default property if none provided
  const defaultProperty = {
    id: "1",
    title: "Luxury 4-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    price: "₦85,000,000",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    agent: {
      name: "Sarah Johnson",
      phone: "+234 801 234 5678",
      email: "sarah@habi360.com"
    }
  };

  const currentProperty = property || defaultProperty;

  // Available time slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !viewingType || !formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Viewing Scheduled Successfully!",
        description: `Your viewing has been scheduled for ${format(selectedDate, 'PPP')} at ${selectedTime}.`
      });

      // Navigate to confirmation or back to property
      navigate(`/property/${currentProperty.id}`, {
        state: { 
          showSuccessMessage: true,
          viewingDetails: {
            date: selectedDate,
            time: selectedTime,
            type: viewingType
          }
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule viewing. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDateDescription = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, 'EEEE');
  };

  // Disable past dates and weekends for this example
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Schedule Property Viewing</h1>
            <p className="text-muted-foreground">
              Book your viewing appointment and take the next step toward your dream home
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Schedule viewing"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Property Summary */}
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img 
                    src={currentProperty.image} 
                    alt={currentProperty.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  
                  <div>
                    <h3 className="font-semibold text-lg">{currentProperty.title}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{currentProperty.location}</span>
                    </div>
                    <p className="text-xl font-bold text-primary mt-2">
                      {currentProperty.price}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Agent Contact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{currentProperty.agent.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{currentProperty.agent.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{currentProperty.agent.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Schedule Your Viewing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Viewing Type */}
                    <div>
                      <Label htmlFor="viewing-type">Viewing Type *</Label>
                      <Select value={viewingType} onValueChange={setViewingType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select viewing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-person">In-Person Viewing</SelectItem>
                          <SelectItem value="virtual">Virtual Tour</SelectItem>
                          <SelectItem value="video-call">Video Call Viewing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Date Selection */}
                      <div>
                        <Label>Select Date *</Label>
                        <div className="border rounded-md p-3 mt-2">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            disabled={disabledDays}
                            className="w-full"
                            fromDate={new Date()}
                            toDate={addDays(new Date(), 30)}
                          />
                        </div>
                        {selectedDate && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Selected: {getDateDescription(selectedDate)}, {format(selectedDate, 'PPP')}
                          </p>
                        )}
                      </div>

                      {/* Time Selection */}
                      <div>
                        <Label>Select Time *</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className="justify-start"
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              {time}
                            </Button>
                          ))}
                        </div>
                        {selectedTime && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Selected time: {selectedTime}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Your Information</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Additional Message (Optional)</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Any specific requirements or questions?"
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    {selectedDate && selectedTime && viewingType && (
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Viewing Summary
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p><strong>Type:</strong> {viewingType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                          <p><strong>Date:</strong> {format(selectedDate, 'PPP')}</p>
                          <p><strong>Time:</strong> {selectedTime}</p>
                          <p><strong>Property:</strong> {currentProperty.title}</p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting || !selectedDate || !selectedTime || !viewingType}
                        className="flex-1"
                      >
                        {isSubmitting ? "Scheduling..." : "Schedule Viewing"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ScheduleViewing;