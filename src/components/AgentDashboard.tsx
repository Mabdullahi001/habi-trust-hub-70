import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "./DashboardLayout";
import { 
  TrendingUp, 
  Users, 
  Home, 
  DollarSign, 
  Star, 
  MessageSquare, 
  Calendar,
  Trophy,
  Target,
  Award,
  Eye,
  Phone,
  Mail
} from "lucide-react";
import { TrustBadge } from "./TrustBadge";

interface AgentStats {
  totalListings: number;
  activeListings: number;
  totalSales: number;
  revenue: string;
  trustScore: number;
  rating: number;
  reviews: number;
  badges: string[];
  rank: number;
  totalAgents: number;
}

interface AgentDashboardProps {
  agentData?: AgentStats;
  agentName?: string;
  agentId?: string;
}

export const AgentDashboard = ({
  agentData = {
    totalListings: 45,
    activeListings: 23,
    totalSales: 156,
    revenue: "₦425M",
    trustScore: 94,
    rating: 4.8,
    reviews: 127,
    badges: ["Verified Agent", "Top Performer", "Customer Choice"],
    rank: 3,
    totalAgents: 2847
  },
  agentName = "Sarah Johnson",
  agentId = "AGT-001"
}: AgentDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const recentInquiries = [
    { id: 1, property: "3BR Apartment, Victoria Island", client: "John Doe", time: "2 hours ago", status: "pending" },
    { id: 2, property: "4BR House, Lekki", client: "Jane Smith", time: "5 hours ago", status: "responded" },
    { id: 3, property: "2BR Condo, Ikoyi", client: "Mike Johnson", time: "1 day ago", status: "scheduled" },
  ];

  const upcomingViewings = [
    { id: 1, property: "Luxury Villa, Banana Island", client: "Alex Brown", time: "Today 2:00 PM", type: "physical" },
    { id: 2, property: "Modern Apartment, Victoria Island", client: "Lisa Wilson", time: "Tomorrow 10:00 AM", type: "virtual" },
    { id: 3, property: "Family House, Surulere", client: "David Lee", time: "Friday 3:00 PM", type: "physical" },
  ];

  const performanceMetrics = [
    { label: "Response Time", value: "< 2 hours", trend: "up", color: "text-green-600" },
    { label: "Conversion Rate", value: "23%", trend: "up", color: "text-green-600" },
    { label: "Client Satisfaction", value: "96%", trend: "stable", color: "text-blue-600" },
    { label: "Listing Views", value: "12.5K", trend: "up", color: "text-green-600" },
  ];

  return (
    <DashboardLayout 
      userRole="agent"
      user={{
        name: agentName,
        email: "agent@realty.com",
        avatar: "/placeholder.svg",
        trustScore: agentData.trustScore
      }}
      searchPlaceholder="Search clients, properties, inquiries..."
      showAddButton={true}
      addButtonText="Add Listing"
      onAddNew={() => {/* Handle add listing */}}
    >
      <div className="space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border border-border/40 rounded-3xl p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
          <div className="relative flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Agent Dashboard
              </h1>
              <p className="text-muted-foreground/80 text-lg">Welcome back, <span className="font-semibold text-foreground">{agentName}</span></p>
            </div>
            <div className="flex items-center gap-4">
              <TrustBadge score={agentData.trustScore} size="lg" />
              <Badge variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm border-primary/20 px-4 py-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-semibold">Rank #{agentData.rank}</span>
              </Badge>
            </div>
          </div>
        </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="relative pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">Active Listings</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {agentData.activeListings}
            </div>
            <div className="text-sm text-muted-foreground/70 mt-1">
              {agentData.totalListings} total listings
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="relative pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">Total Revenue</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {agentData.revenue}
            </div>
            <div className="text-sm text-muted-foreground/70 mt-1">
              {agentData.totalSales} completed sales
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="relative pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">Rating</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {agentData.rating}
            </div>
            <div className="text-sm text-muted-foreground/70 mt-1">
              {agentData.reviews} reviews
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="relative pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">Trust Score</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {agentData.trustScore}/100
            </div>
            <div className="text-sm text-muted-foreground/70 mt-1">Blockchain verified</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Inquiries */}
            <Card className="border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  Recent Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="group flex items-center justify-between p-4 border border-border/40 rounded-xl bg-gradient-to-r from-background/50 to-secondary/5 hover:shadow-md transition-all duration-300">
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">{inquiry.property}</div>
                      <div className="text-xs text-muted-foreground/80 mt-1">
                        {inquiry.client} • {inquiry.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={inquiry.status === "pending" ? "destructive" : "default"} className="capitalize">
                        {inquiry.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {inquiry.status === "pending" ? "Reply" : "View"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Viewings */}
            <Card className="border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  Upcoming Viewings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingViewings.map((viewing) => (
                  <div key={viewing.id} className="group flex items-center justify-between p-4 border border-border/40 rounded-xl bg-gradient-to-r from-background/50 to-secondary/5 hover:shadow-md transition-all duration-300">
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">{viewing.property}</div>
                      <div className="text-xs text-muted-foreground/80 mt-1">
                        {viewing.client} • {viewing.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={viewing.type === "virtual" ? "secondary" : "outline"} className="capitalize">
                        {viewing.type}
                      </Badge>
                      <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-gradient-to-br from-background/50 to-secondary/10 border border-border/30">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Property Listings</h3>
            <Button>Add New Listing</Button>
          </div>
          
          <div className="grid gap-4">
            {[1, 2, 3].map((listing) => (
              <Card key={listing}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-secondary rounded-lg"></div>
                      <div>
                        <div className="font-medium">Modern 3BR Apartment</div>
                        <div className="text-sm text-muted-foreground">Victoria Island, Lagos</div>
                        <div className="text-sm font-medium text-primary">₦15,000,000</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">24</div>
                        <div className="text-xs text-muted-foreground">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">3</div>
                        <div className="text-xs text-muted-foreground">Inquiries</div>
                      </div>
                      <Badge variant="default">Active</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <h3 className="text-lg font-semibold">Client Management</h3>
          <div className="grid gap-4">
            {[1, 2, 3, 4].map((client) => (
              <Card key={client}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-sm text-muted-foreground">Looking for 3BR apartment</div>
                        <div className="text-xs text-muted-foreground">Budget: ₦10M - ₦20M</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Active</Badge>
                      <Button size="sm" variant="outline">
                        <Mail className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Achievement Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievement Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {agentData.badges.map((badge, index) => (
                  <Badge key={index} variant="default" className="gap-1">
                    <Trophy className="h-3 w-3" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trust Score Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Trust Score Development</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Current Trust Score</span>
                <span className="font-bold">{agentData.trustScore}/100</span>
              </div>
              <Progress value={agentData.trustScore} className="h-3" />
              <div className="text-sm text-muted-foreground">
                You're in the top 5% of verified agents on the platform
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Position */}
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">#{agentData.rank}</div>
                <div className="text-sm text-muted-foreground">
                  out of {agentData.totalAgents.toLocaleString()} agents
                </div>
                <Badge variant="default" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Moving Up
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Agent ID</label>
                  <div className="text-sm text-muted-foreground">{agentId}</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Verification Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="default" className="gap-1">
                      <Star className="h-3 w-3" />
                      Fully Verified
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Specializations</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="secondary">Residential</Badge>
                    <Badge variant="secondary">Luxury Properties</Badge>
                    <Badge variant="secondary">Investment Properties</Badge>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Edit Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </DashboardLayout>
  );
};