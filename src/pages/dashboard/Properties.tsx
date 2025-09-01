import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building, 
  Heart, 
  Eye, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Filter,
  Grid,
  List,
  Star,
  DollarSign,
  Calendar,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Modern Villa in Lekki",
    location: "Lekki Phase 1, Lagos",
    price: "$750,000",
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: "/placeholder.svg",
    status: "for-sale",
    saved: true,
    views: 245,
    inquiries: 12,
    rating: 4.8,
    agent: "Sarah Johnson",
    dateAdded: "2024-01-15"
  },
  {
    id: 2,
    title: "Luxury Apartment",
    location: "Victoria Island, Lagos",
    price: "$450,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: "/placeholder.svg",
    status: "for-sale",
    saved: false,
    views: 189,
    inquiries: 8,
    rating: 4.6,
    agent: "Michael Chen",
    dateAdded: "2024-01-10"
  },
  {
    id: 3,
    title: "Family House",
    location: "Surulere, Lagos",
    price: "$320,000",
    beds: 3,
    baths: 2,
    sqft: 1600,
    image: "/placeholder.svg",
    status: "for-rent",
    saved: true,
    views: 156,
    inquiries: 6,
    rating: 4.4,
    agent: "Ada Williams",
    dateAdded: "2024-01-08"
  }
];

export default function DashboardProperties() {
  const [userRole] = useState<'buyer' | 'seller' | 'agent' | 'admin'>("buyer");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    trustScore: 87
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddNew = () => {
    if (userRole === 'seller' || userRole === 'agent') {
      window.location.href = '/dashboard/add-listing';
    } else {
      window.location.href = '/buy';
    }
  };

  const getPageTitle = () => {
    switch (userRole) {
      case 'buyer': return 'Browse Properties';
      case 'seller': return 'My Listings';
      case 'agent': return 'Property Portfolio';
      case 'admin': return 'All Properties';
      default: return 'Properties';
    }
  };

  const getAddButtonText = () => {
    switch (userRole) {
      case 'seller': return 'Add Listing';
      case 'agent': return 'Add Property';
      case 'admin': return 'Add Property';
      default: return 'Search More';
    }
  };

  const filteredProperties = mockProperties.filter(property => {
    if (filterStatus !== 'all' && property.status !== filterStatus) return false;
    if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const PropertyCard = ({ property }: { property: typeof mockProperties[0] }) => (
    <Card className="overflow-hidden hover:shadow-medium transition-shadow">
      <div className="relative h-48 bg-gradient-to-br from-secondary to-muted">
        <div className="absolute top-4 left-4">
          <Badge variant={property.status === 'for-sale' ? 'default' : 'secondary'}>
            {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm">
            <Heart className={`h-4 w-4 ${property.saved ? 'fill-primary text-primary' : 'text-white'}`} />
          </Button>
        </div>
        {userRole !== 'buyer' && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              <Eye className="h-3 w-3 mr-1" />
              {property.views}
            </Badge>
            <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              <BarChart3 className="h-3 w-3 mr-1" />
              {property.inquiries}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{property.title}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {property.location}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {property.beds}
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {property.baths}
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              {property.sqft} sqft
            </div>
          </div>

          {(userRole === 'seller' || userRole === 'agent') && (
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                {property.rating}
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Agent: {property.agent}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">{property.price}</span>
            <div className="flex gap-2">
              {userRole === 'buyer' && (
                <Button size="sm" variant="outline">Save</Button>
              )}
              <Link to={`/property/${property.id}`}>
                <Button size="sm">
                  {userRole === 'buyer' ? 'View Details' : 'Manage'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout
      userRole={userRole}
      user={user}
      onSearch={handleSearch}
      searchPlaceholder="Search properties, locations..."
      showAddButton={true}
      onAddNew={handleAddNew}
      addButtonText={getAddButtonText()}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="for-sale">For Sale</SelectItem>
              <SelectItem value="for-rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Stats for sellers/agents */}
        {(userRole === 'seller' || userRole === 'agent' || userRole === 'admin') && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Building className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Properties</p>
                    <p className="text-2xl font-bold">{filteredProperties.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Eye className="h-8 w-8 text-trust-medium" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">
                      {filteredProperties.reduce((sum, p) => sum + p.views, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-trust-high" />
                  <div>
                    <p className="text-sm text-muted-foreground">Inquiries</p>
                    <p className="text-2xl font-bold">
                      {filteredProperties.reduce((sum, p) => sum + p.inquiries, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Price</p>
                    <p className="text-2xl font-bold">$507K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Properties Grid */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={handleAddNew}>
                {userRole === 'buyer' ? 'Browse All Properties' : 'Add New Property'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}