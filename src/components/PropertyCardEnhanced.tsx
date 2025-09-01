import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MapPin, BedDouble, Bath, Square, Camera, Star } from "lucide-react";
import { Link } from "react-router-dom";
import TrustBadge from "./TrustBadge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PropertyCardEnhancedProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    type: "sale" | "rent" | "short-stay";
    images: string[];
    bedrooms: number;
    bathrooms: number;
    area: string;
    verified: boolean;
    trustScore: number;
    featured?: boolean;
    agent: {
      name: string;
      verified: boolean;
      rating: number;
    };
    amenities?: string[];
    pricePerSqft?: string;
    yearBuilt?: number;
    virtual3D?: boolean;
    instantBooking?: boolean;
  };
  compact?: boolean;
  showTrustScore?: boolean;
}

export const PropertyCardEnhanced = ({ 
  property, 
  compact = false,
  showTrustScore = true 
}: PropertyCardEnhancedProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement share functionality
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "sale":
        return "bg-primary text-primary-foreground";
      case "rent":
        return "bg-blue-500 text-white";
      case "short-stay":
        return "bg-green-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-lg transition-all duration-300 group",
      property.featured && "ring-2 ring-primary/20",
      compact && "max-w-sm"
    )}>
      {/* Image Gallery */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[currentImageIndex] || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Overlays */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={getTypeColor(property.type)}>
            {property.type === "short-stay" ? "Short Stay" : property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Badge>
          {property.featured && (
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              Featured
            </Badge>
          )}
          {property.virtual3D && (
            <Badge variant="outline" className="bg-white/90 text-foreground">
              <Camera className="w-3 h-3 mr-1" />
              3D Tour
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleSave}
            className={cn(
              "p-2 rounded-full transition-colors",
              isSaved 
                ? "bg-primary text-primary-foreground" 
                : "bg-white/90 text-foreground hover:bg-white"
            )}
          >
            <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/90 text-foreground hover:bg-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {property.instantBooking && (
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-green-500 text-white">
              Instant Book
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Trust & Verification */}
          {showTrustScore && (
            <div className="flex items-center justify-between">
              <TrustBadge score={property.trustScore} verified={property.verified} size="sm" />
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{property.agent.rating}</span>
              </div>
            </div>
          )}

          {/* Title & Location */}
          <div>
            <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BedDouble className="w-4 h-4" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{property.area}</span>
            </div>
          </div>

          {/* Price & Additional Info */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-primary">{property.price}</div>
              {property.pricePerSqft && (
                <div className="text-xs text-muted-foreground">{property.pricePerSqft}/sqft</div>
              )}
            </div>
            {property.yearBuilt && (
              <div className="text-sm text-muted-foreground">
                Built {property.yearBuilt}
              </div>
            )}
          </div>

          {/* Agent Info */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-sm">
              <span className="text-muted-foreground">Listed by </span>
              <span className="font-medium">{property.agent.name}</span>
              {property.agent.verified && (
                <Badge variant="outline" className="ml-2 border-trust-high text-trust-high text-xs px-1 py-0">
                  Verified Agent
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Link to={`/property/${property.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            {property.type === "short-stay" ? (
              <Link to={`/book-short-stay?property=${property.id}`} className="flex-1">
                <Button className="w-full bg-gradient-primary">
                  Book Now
                </Button>
              </Link>
            ) : property.type === "rent" ? (
              <Link to={`/schedule-viewing?property=${property.id}`} className="flex-1">
                <Button className="w-full bg-gradient-primary">
                  Schedule Viewing
                </Button>
              </Link>
            ) : (
              <Link to={`/contact-agent?property=${property.id}`} className="flex-1">
                <Button className="w-full bg-gradient-primary">
                  Contact Agent
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCardEnhanced;