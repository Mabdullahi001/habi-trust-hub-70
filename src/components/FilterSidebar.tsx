import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Filter, MapPin, Home, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterState {
  location: string;
  propertyType: string[];
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  area: [number, number];
  amenities: string[];
  features: string[];
  trustScore: number;
  yearBuilt: [number, number];
  sortBy: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  className?: string;
}

export const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  className 
}: FilterSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const propertyTypes = [
    "Apartment", "House", "Condo", "Villa", "Townhouse", "Studio", "Duplex"
  ];

  const amenitiesList = [
    "Swimming Pool", "Gym", "Parking", "Garden", "Security", "Elevator",
    "Balcony", "Terrace", "Air Conditioning", "Heating", "Furnished"
  ];

  const featuresList = [
    "Verified Property", "Virtual Tour", "Instant Booking", "Pet Friendly",
    "Recently Renovated", "Waterfront", "Gated Community", "Near School"
  ];

  const updateFilters = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayValue = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters(key, newArray);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.location) count++;
    if (filters.propertyType.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.features.length > 0) count++;
    if (filters.trustScore > 0) count++;
    return count;
  };

  return (
    <Card className={cn("h-fit", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              disabled={getActiveFiltersCount() === 0}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              placeholder="Enter city, area, or address"
              value={filters.location}
              onChange={(e) => updateFilters("location", e.target.value)}
            />
          </div>

          <Separator />

          {/* Property Type */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Property Type
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={filters.propertyType.includes(type)}
                    onCheckedChange={() => toggleArrayValue("propertyType", type)}
                  />
                  <Label htmlFor={type} className="text-sm font-normal">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price Range
            </Label>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters("priceRange", value)}
                max={5000000}
                min={0}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${filters.priceRange[0].toLocaleString()}</span>
                <span>${filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Select value={filters.bedrooms} onValueChange={(value) => updateFilters("bedrooms", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Bathrooms</Label>
              <Select value={filters.bathrooms} onValueChange={(value) => updateFilters("bathrooms", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Square Footage */}
          <div className="space-y-3">
            <Label>Square Footage</Label>
            <div className="px-2">
              <Slider
                value={filters.area}
                onValueChange={(value) => updateFilters("area", value)}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{filters.area[0]} sqft</span>
                <span>{filters.area[1]} sqft</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Trust Score */}
          <div className="space-y-3">
            <Label>Minimum Trust Score</Label>
            <div className="px-2">
              <Slider
                value={[filters.trustScore]}
                onValueChange={(value) => updateFilters("trustScore", value[0])}
                max={100}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground mt-2">
                {filters.trustScore}% and above
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div className="space-y-3">
            <Label>Amenities</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => toggleArrayValue("amenities", amenity)}
                  />
                  <Label htmlFor={amenity} className="text-sm font-normal">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-3">
            <Label>Special Features</Label>
            <div className="space-y-2">
              {featuresList.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={filters.features.includes(feature)}
                    onCheckedChange={() => toggleArrayValue("features", feature)}
                  />
                  <Label htmlFor={feature} className="text-sm font-normal">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Sort By */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilters("sortBy", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="trust-score">Highest Trust Score</SelectItem>
                <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
                <SelectItem value="area">Largest Area</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default FilterSidebar;