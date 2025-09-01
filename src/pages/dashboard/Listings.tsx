import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus,
  Building,
  Eye, 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Calendar,
  DollarSign,
  Clock,
  Check,
  X,
  Edit,
  Trash2
} from "lucide-react";

// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: "Modern Villa in Lekki",
    location: "Lekki Phase 1, Lagos",
    price: "$750,000",
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: "/placeholder.svg",
    status: "approved",
    views: 245,
    inquiries: 12,
    dateCreated: "2024-01-15",
    lastUpdated: "2024-01-20"
  },
  {
    id: 2,
    title: "Luxury Apartment Downtown",
    location: "Victoria Island, Lagos",
    price: "$450,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: "/placeholder.svg",
    status: "pending",
    views: 0,
    inquiries: 0,
    dateCreated: "2024-01-22",
    lastUpdated: "2024-01-22"
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
    status: "rejected",
    views: 0,
    inquiries: 0,
    dateCreated: "2024-01-18",
    lastUpdated: "2024-01-21"
  }
];

export default function DashboardListings() {
  const [userRole] = useState<'buyer' | 'seller' | 'agent' | 'admin'>("buyer");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddListing, setShowAddListing] = useState(false);
  
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
    setShowAddListing(true);
  };

  const getPageTitle = () => {
    switch (userRole) {
      case 'buyer': return 'My Listings';
      case 'seller': return 'My Listings';
      case 'agent': return 'Agent Listings';
      case 'admin': return 'All Listings Management';
      default: return 'Listings';
    }
  };

  const filteredListings = mockListings.filter(listing => {
    if (activeTab !== 'all' && listing.status !== activeTab) return false;
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !listing.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-trust-high text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'rejected': return 'bg-destructive text-white';
      default: return 'bg-muted';
    }
  };

  const getTabCounts = () => {
    return {
      all: mockListings.length,
      approved: mockListings.filter(l => l.status === 'approved').length,
      pending: mockListings.filter(l => l.status === 'pending').length,
      rejected: mockListings.filter(l => l.status === 'rejected').length
    };
  };

  const counts = getTabCounts();

  const ListingCard = ({ listing }: { listing: typeof mockListings[0] }) => (
    <Card className="overflow-hidden hover:shadow-medium transition-shadow">
      <div className="relative h-48 bg-gradient-to-br from-secondary to-muted">
        <div className="absolute top-4 left-4">
          <Badge className={getStatusColor(listing.status)}>
            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
          </Badge>
        </div>
        {listing.status === 'approved' && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              <Eye className="h-3 w-3 mr-1" />
              {listing.views}
            </Badge>
            <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              <DollarSign className="h-3 w-3 mr-1" />
              {listing.inquiries}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{listing.title}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {listing.location}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {listing.beds}
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {listing.baths}
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              {listing.sqft} sqft
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Created: {new Date(listing.dateCreated).toLocaleDateString()}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">{listing.price}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
              {userRole === 'admin' && listing.status === 'pending' && (
                <>
                  <Button size="sm" variant="default">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button size="sm" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
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
      searchPlaceholder="Search your listings..."
      showAddButton={true}
      onAddNew={handleAddNew}
      addButtonText="Add Listing"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-2xl font-bold">{counts.all}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Check className="h-8 w-8 text-trust-high" />
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">{counts.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{counts.pending}</p>
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
                    {mockListings.filter(l => l.status === 'approved').reduce((sum, l) => sum + l.views, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for filtering */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({counts.approved})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({counts.rejected})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {filteredListings.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No listings found</h3>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === 'all' 
                      ? "You haven't created any listings yet"
                      : `No ${activeTab} listings found`
                    }
                  </p>
                  <Button onClick={handleAddNew}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Listing
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Add Listing Dialog */}
        <Dialog open={showAddListing} onOpenChange={setShowAddListing}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Listing</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Property Title</label>
                  <Input placeholder="e.g. Modern 3BR Apartment" />
                </div>
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <Input placeholder="e.g. $500,000" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="e.g. Victoria Island, Lagos" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Bedrooms</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Bathrooms</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Square Feet</label>
                  <Input placeholder="e.g. 1500" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Describe your property..."
                  rows={4}
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-sm">Approval Process</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your listing will be reviewed by our admin team for verification and compliance. 
                  This usually takes 1-2 business days. You'll be notified once it's approved.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddListing(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    setShowAddListing(false);
                    // Handle form submission
                  }}
                  className="flex-1"
                >
                  Submit for Review
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}