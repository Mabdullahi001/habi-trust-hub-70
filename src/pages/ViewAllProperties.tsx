import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MapPin, 
  SlidersHorizontal, 
  Grid3X3, 
  List,
  ChevronDown,
  X
} from "lucide-react";

const ViewAllProperties = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Mock properties data
  const properties = [
    {
      id: "1",
      title: "Luxury 4-Bedroom Duplex",
      location: "Lekki Phase 1, Lagos",
      price: "₦85,000,000",
      type: "For Sale",
      beds: 4,
      baths: 3,
      sqft: 3200,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      trustScore: 95,
      isVerified: true,
      rating: 4.8,
      reviews: 24,
      agent: {
        name: "Sarah Johnson",
        verified: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      }
    },
    {
      id: "2",
      title: "Modern 3-Bedroom Apartment",
      location: "Victoria Island, Lagos",
      price: "₦65,000,000",
      type: "For Sale",
      beds: 3,
      baths: 2,
      sqft: 2100,
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      trustScore: 88,
      isVerified: true,
      rating: 4.6,
      reviews: 18,
        agent: {
        name: "John Smith",
        verified: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      }
    },
    {
      id: "3",
      title: "Spacious 5-Bedroom Villa",
      location: "Ikoyi, Lagos",
      price: "₦120,000,000",
      type: "For Sale",
      beds: 5,
      baths: 4,
      sqft: 4500,
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      trustScore: 92,
      isVerified: true,
      rating: 4.9,
      reviews: 31,
      agent: {
        name: "Emma Wilson",
        verified: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      }
    },
    {
      id: "4",
      title: "Cozy 2-Bedroom Flat",
      location: "Surulere, Lagos",
      price: "₦35,000,000",
      type: "For Rent",
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      trustScore: 85,
      isVerified: false,
      rating: 4.3,
      reviews: 12,
      agent: {
        name: "David Brown",
        verified: false,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      }
    },
    {
      id: "5",
      title: "Executive 4-Bedroom Terrace",
      location: "Ajah, Lagos",
      price: "₦55,000,000",
      type: "For Sale",
      beds: 4,
      baths: 3,
      sqft: 2800,
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      trustScore: 90,
      isVerified: true,
      rating: 4.7,
      reviews: 22,
      agent: {
        name: "Lisa Johnson",
        verified: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      }
    },
    {
      id: "6",
      title: "Luxury Penthouse",
      location: "Banana Island, Lagos",
      price: "₦200,000,000",
      type: "For Sale",
      beds: 4,
      baths: 4,
      sqft: 3800,
      image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      trustScore: 98,
      isVerified: true,
      rating: 5.0,
      reviews: 45,
      agent: {
        name: "Michael Chen",
        verified: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      }
    }
  ];

  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const applyFilters = () => {
    let filtered = properties;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(property => {
      const price = parseInt(property.price.replace(/[₦,]/g, ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Bedrooms filter
    if (bedrooms) {
      filtered = filtered.filter(property => 
        property.beds.toString() === bedrooms
      );
    }

    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 100000000]);
    setSelectedType("");
    setSelectedLocation("");
    setBedrooms("");
    setActiveFilters([]);
    setFilteredProperties(properties);
  };

  const formatPrice = (price: number) => {
    return `₦${(price / 1000000).toFixed(0)}M`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">All Properties</h1>
          <p className="text-muted-foreground">
            Discover your perfect home from our extensive collection
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-8">
          <img 
            src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Properties overview"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                {/* Search */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <Label>Price Range</Label>
                    <div className="px-3 py-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={200000000}
                        step={5000000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lekki">Lekki</SelectItem>
                        <SelectItem value="victoria-island">Victoria Island</SelectItem>
                        <SelectItem value="ikoyi">Ikoyi</SelectItem>
                        <SelectItem value="surulere">Surulere</SelectItem>
                        <SelectItem value="ajah">Ajah</SelectItem>
                        <SelectItem value="banana-island">Banana Island</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <Label htmlFor="type">Property Type</Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="terrace">Terrace</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4 Bedrooms</SelectItem>
                        <SelectItem value="5">5+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={applyFilters} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <p className="text-muted-foreground">
                  {filteredProperties.length} properties found
                </p>
                
                {/* Active Filters */}
                {activeFilters.length > 0 && (
                  <div className="flex gap-2">
                    {activeFilters.map((filter, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer">
                        {filter}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                {/* View Mode Toggle */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort */}
                <Select defaultValue="newest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Properties Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div key={property.id} onClick={() => handlePropertyClick(property.id)}>
                    <PropertyCard property={property} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No properties found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                  <Button onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Load More */}
            {filteredProperties.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Properties
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewAllProperties;