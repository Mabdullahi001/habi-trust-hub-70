import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Wifi, 
  Shield, 
  Camera,
  Calendar,
  Phone,
  Mail,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock property data - in real app, this would come from API
  const property = {
    id: id || "1",
    title: "Luxury 4-Bedroom Duplex in Lekki",
    location: "Lekki Phase 1, Lagos",
    price: "₦85,000,000",
    monthlyRent: "₦1,200,000",
    type: "For Sale",
    beds: 4,
    baths: 3,
    sqft: 3200,
    parking: 2,
    yearBuilt: 2022,
    description: "Experience luxury living in this stunning 4-bedroom duplex located in the prestigious Lekki Phase 1. This modern home features contemporary design, spacious rooms, and premium finishes throughout. Perfect for families seeking comfort and elegance in one of Lagos' most desirable neighborhoods.",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Swimming Pool",
      "24/7 Security",
      "Generator",
      "Fitted Kitchen",
      "En-suite Bathrooms",
      "Parking Space",
      "Garden",
      "Air Conditioning"
    ],
    amenities: [
      { icon: <Wifi className="h-5 w-5" />, name: "High-Speed Internet" },
      { icon: <Shield className="h-5 w-5" />, name: "24/7 Security" },
      { icon: <Car className="h-5 w-5" />, name: "2 Parking Spaces" },
      { icon: <Camera className="h-5 w-5" />, name: "CCTV Surveillance" }
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "+234 801 234 5678",
      email: "sarah@habi360.com",
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    trustScore: 95,
    isVerified: true
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited 
        ? "Property removed from your favorites list" 
        : "Property added to your favorites list"
    });
  };

  const handleShare = () => {
    navigator.share?.({
      title: property.title,
      text: property.description,
      url: window.location.href
    }) || toast({
      title: "Link copied to clipboard",
      description: "Property link has been copied to your clipboard"
    });
  };

  const handleScheduleViewing = () => {
    navigate("/schedule-viewing", { state: { property } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Image Gallery */}
          <div className="relative mb-8">
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
              <img 
                src={property.images[currentImageIndex]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-md text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>

              {/* Trust Score Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Shield className="h-3 w-3 mr-1" />
                  Trust Score: {property.trustScore}%
                </Badge>
              </div>

              {/* Verification Badge */}
              {property.isVerified && (
                <div className="absolute top-4 left-4 mt-10">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Verified Property
                  </Badge>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Property Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{property.location}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {property.price}
                      {property.monthlyRent && (
                        <span className="text-sm text-muted-foreground ml-2">
                          or {property.monthlyRent}/month
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleFavorite}>
                      <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.sqft} sqft</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="h-4 w-4" />
                    <span>{property.parking} Parking</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Property Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="text-primary">{amenity.icon}</div>
                      <span className="text-sm">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Agent */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Contact Agent</h3>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={property.agent.image} 
                      alt={property.agent.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{property.agent.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        <span>{property.agent.rating}</span>
                        <span>({property.agent.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" onClick={handleScheduleViewing}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Viewing
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Agent
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Property Information</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property Type</span>
                      <span>Duplex</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year Built</span>
                      <span>{property.yearBuilt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Listing Type</span>
                      <span>{property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property ID</span>
                      <span>HAB{property.id.padStart(6, '0')}</span>
                    </div>
                  </div>
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

export default ViewDetails;