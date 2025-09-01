import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star, 
  Heart,
  Eye,
  CheckCircle
} from "lucide-react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    type: string;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
    trustScore: number;
    isVerified: boolean;
    rating: number;
    reviews: number;
    agent: {
      name: string;
      verified: boolean;
    };
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-trust-high";
    if (score >= 60) return "text-trust-medium";
    return "text-trust-low";
  };

  const getTrustScoreBg = (score: number) => {
    if (score >= 80) return "bg-trust-high/10 border-trust-high/20";
    if (score >= 60) return "bg-trust-medium/10 border-trust-medium/20";
    return "bg-trust-low/10 border-trust-low/20";
  };

  return (
    <Card className="group overflow-hidden hover:shadow-strong transition-all duration-300 border-0 bg-white">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Elements */}
        <div className="absolute top-4 left-4 flex gap-2">
          {property.isVerified && (
            <Badge className="bg-trust-high text-white border-0">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          <Badge className={`border ${getTrustScoreBg(property.trustScore)}`}>
            <span className={getTrustScoreColor(property.trustScore)}>
              Trust: {property.trustScore}
            </span>
          </Badge>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-black/70 text-white border-0">
            {property.type}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="text-2xl font-bold text-primary">
            {property.price}
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.beds}
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.baths}
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              {property.sqft} sqft
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
            <div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">
                  {property.agent.name}
                </span>
                {property.agent.verified && (
                  <CheckCircle className="w-3 h-3 ml-1 text-trust-high" />
                )}
              </div>
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                <span className="text-xs text-gray-600">
                  {property.rating} ({property.reviews})
                </span>
              </div>
            </div>
          </div>

          <Button size="sm" className="bg-gradient-primary">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;