import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "./DashboardLayout";
import { 
  Users, 
  Home, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Ban
} from "lucide-react";

interface PlatformStats {
  totalUsers: number;
  activeAgents: number;
  totalProperties: number;
  verifiedProperties: number;
  fraudAlerts: number;
  pendingVerifications: number;
  totalTransactions: string;
  platformRevenue: string;
}

interface AdminDashboardProps {
  platformStats?: PlatformStats;
}

export const AdminDashboard = ({
  platformStats = {
    totalUsers: 15749,
    activeAgents: 1247,
    totalProperties: 8932,
    verifiedProperties: 7845,
    fraudAlerts: 23,
    pendingVerifications: 156,
    totalTransactions: "₦12.8B",
    platformRevenue: "₦640M"
  }
}: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@email.com", role: "buyer", status: "active", joinDate: "2024-08-20" },
    { id: 2, name: "Jane Smith", email: "jane@email.com", role: "agent", status: "pending", joinDate: "2024-08-19" },
    { id: 3, name: "Mike Johnson", email: "mike@email.com", role: "seller", status: "active", joinDate: "2024-08-18" },
  ];

  const fraudAlerts = [
    { id: 1, type: "Fake Images", property: "Luxury Villa, VI", severity: "high", status: "investigating" },
    { id: 2, type: "Price Manipulation", property: "2BR Apartment, Lekki", severity: "medium", status: "resolved" },
    { id: 3, type: "Duplicate Listing", property: "Office Space, Ikeja", severity: "low", status: "pending" },
  ];

  const pendingVerifications = [
    { id: 1, type: "Agent KYC", name: "Sarah Wilson", submitted: "2 hours ago", priority: "high" },
    { id: 2, type: "Property Passport", name: "Luxury Apartment", submitted: "5 hours ago", priority: "medium" },
    { id: 3, type: "User Identity", name: "David Brown", submitted: "1 day ago", priority: "low" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "suspended": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout 
      userRole="admin"
      user={{
        name: "Admin User",
        email: "admin@realty.com",
        avatar: "/placeholder.svg",
        trustScore: 100
      }}
      searchPlaceholder="Search users, properties, reports..."
      showAddButton={true}
      addButtonText="Quick Action"
      onAddNew={() => {/* Handle quick action */}}
    >
      <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card/60 backdrop-blur-sm rounded-2xl border shadow-soft">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Platform management and oversight
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="destructive" className="gap-2 px-4 py-2 text-sm font-medium shadow-medium">
            <AlertTriangle className="h-4 w-4" />
            {platformStats.fraudAlerts} Active Alerts
          </Badge>
          <Button className="shadow-medium hover:shadow-strong transition-all duration-300 bg-gradient-primary border-0">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="group hover:shadow-strong transition-all duration-300 border-0 shadow-soft bg-gradient-to-br from-card via-card to-accent/20">
          <CardContent className="pt-8 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-foreground">{platformStats.totalUsers.toLocaleString()}</div>
                <span className="text-sm font-medium text-muted-foreground">Total Users</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-primary">{platformStats.activeAgents}</span> active agents
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-strong transition-all duration-300 border-0 shadow-soft bg-gradient-to-br from-card via-card to-trust-high/10">
          <CardContent className="pt-8 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-trust-high/10 group-hover:bg-trust-high/20 transition-colors">
                <Home className="h-6 w-6 text-trust-high" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-foreground">{platformStats.totalProperties.toLocaleString()}</div>
                <span className="text-sm font-medium text-muted-foreground">Properties</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-trust-high">{platformStats.verifiedProperties.toLocaleString()}</span> verified
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-strong transition-all duration-300 border-0 shadow-soft bg-gradient-to-br from-card via-card to-trust-medium/10">
          <CardContent className="pt-8 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-trust-medium/10 group-hover:bg-trust-medium/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-trust-medium" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-foreground">{platformStats.platformRevenue}</div>
                <span className="text-sm font-medium text-muted-foreground">Revenue</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-trust-medium">{platformStats.totalTransactions}</span> total volume
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-strong transition-all duration-300 border-0 shadow-soft bg-gradient-to-br from-card via-card to-destructive/10">
          <CardContent className="pt-8 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-foreground">{platformStats.fraudAlerts}</div>
                <span className="text-sm font-medium text-muted-foreground">Security Alerts</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Active fraud monitoring
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-card/60 backdrop-blur-sm p-2 h-14 rounded-2xl shadow-soft border-0">
          <TabsTrigger value="overview" className="rounded-xl font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-medium">Overview</TabsTrigger>
          <TabsTrigger value="listings" className="rounded-xl font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-medium">Listings</TabsTrigger>
          <TabsTrigger value="inquiries" className="rounded-xl font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-medium">Inquiries</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-medium">Users</TabsTrigger>
          <TabsTrigger value="properties" className="rounded-xl font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-medium">Properties</TabsTrigger>
          <TabsTrigger value="verification" className="rounded-xl font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-medium">Verification</TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-medium">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent User Registrations */}
            <Card className="border-0 shadow-soft bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  Recent User Registrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-medium transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email} • <span className="capitalize font-medium">{user.role}</span> • {user.joinDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(user.status)}
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Eye className="h-3 w-3 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Fraud Alerts */}
            <Card className="border-0 shadow-soft bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  Active Fraud Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fraudAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-medium transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-destructive/10">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{alert.type}</div>
                        <div className="text-sm text-muted-foreground">{alert.property}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`px-3 py-1 rounded-lg font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </Badge>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        Investigate
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Pending Verifications */}
          <Card className="border-0 shadow-soft bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-trust-medium/10">
                  <Clock className="h-5 w-5 text-trust-medium" />
                </div>
                Pending Verifications 
                <Badge variant="secondary" className="ml-2 px-3 py-1 rounded-lg">
                  {platformStats.pendingVerifications}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingVerifications.map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-4 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-medium transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-trust-medium/10">
                      <Clock className="h-4 w-4 text-trust-medium" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{verification.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {verification.name} • Submitted {verification.submitted}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={verification.priority === "high" ? "destructive" : "secondary"} className="px-3 py-1 rounded-lg font-medium">
                      {verification.priority}
                    </Badge>
                    <Button size="sm" className="rounded-lg bg-gradient-primary border-0">Review</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pending Listings</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                12 Pending Approval
              </Badge>
              <Button>Bulk Actions</Button>
            </div>
          </div>
          
          <div className="grid gap-4">
            {[
              {
                id: 1,
                title: "Luxury 3BR Apartment",
                location: "Victoria Island, Lagos",
                price: "₦45,000,000",
                submittedBy: "John Doe",
                submittedAt: "2 hours ago",
                status: "pending",
                images: 8,
                documents: 5
              },
              {
                id: 2,
                title: "Modern 2BR Flat",
                location: "Lekki Phase 1, Lagos",
                price: "₦28,000,000",
                submittedBy: "Jane Smith", 
                submittedAt: "5 hours ago",
                status: "under_review",
                images: 12,
                documents: 7
              },
              {
                id: 3,
                title: "4BR Duplex with Pool",
                location: "Ikeja GRA, Lagos",
                price: "₦62,000,000",
                submittedBy: "Mike Johnson",
                submittedAt: "1 day ago",
                status: "needs_documents",
                images: 15,
                documents: 3
              }
            ].map((listing) => (
              <Card key={listing.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-24 h-20 bg-secondary rounded-lg flex items-center justify-center">
                        <Home className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{listing.title}</div>
                        <div className="text-muted-foreground text-sm">{listing.location}</div>
                        <div className="font-bold text-primary text-lg mt-1">{listing.price}</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Submitted by {listing.submittedBy} • {listing.submittedAt}
                        </div>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                          <span>{listing.images} images</span>
                          <span>{listing.documents} documents</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge 
                        variant={listing.status === "pending" ? "secondary" : 
                                listing.status === "under_review" ? "default" : "destructive"}
                      >
                        {listing.status.replace("_", " ")}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Customer Inquiries</h3>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">
                8 Urgent
              </Badge>
              <Button>Mark All Read</Button>
            </div>
          </div>
          
          <div className="grid gap-4">
            {[
              {
                id: 1,
                subject: "Property Verification Issue",
                from: "sarah.wilson@email.com",
                message: "I submitted my property documents 3 days ago but haven't received any feedback. Could you please check the status?",
                priority: "high",
                received: "2 hours ago",
                status: "unread",
                category: "verification"
              },
              {
                id: 2,
                subject: "Payment Gateway Error",
                from: "mike.jones@email.com", 
                message: "I'm trying to complete payment for property booking but getting error 'Payment failed - invalid card details' even though my card is valid.",
                priority: "urgent",
                received: "4 hours ago",
                status: "in_progress",
                category: "payment"
              },
              {
                id: 3,
                subject: "Agent Misconduct Report",
                from: "lisa.brown@email.com",
                message: "I want to report unprofessional behavior from agent John Smith. He was rude during property viewing and provided false information.",
                priority: "high",
                received: "6 hours ago",
                status: "unread",
                category: "complaint"
              },
              {
                id: 4,
                subject: "Feature Request - Virtual Tours",
                from: "david.clark@email.com",
                message: "Could you add 360° virtual tour functionality? This would be very helpful for international buyers.",
                priority: "low",
                received: "1 day ago",
                status: "read",
                category: "feature"
              }
            ].map((inquiry) => (
              <Card key={inquiry.id} className={inquiry.status === "unread" ? "border-primary/50" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        inquiry.status === "unread" ? "bg-primary" : "bg-muted"
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-semibold">{inquiry.subject}</div>
                          <Badge 
                            variant={inquiry.priority === "urgent" ? "destructive" : 
                                    inquiry.priority === "high" ? "destructive" : "secondary"}
                          >
                            {inquiry.priority}
                          </Badge>
                          <Badge variant="outline">
                            {inquiry.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          From: {inquiry.from} • {inquiry.received}
                        </div>
                        <div className="text-sm text-foreground">
                          {inquiry.message}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        Reply
                      </Button>
                      <Button size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">User Management</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>Export Users</Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground">
                          Role: {user.role} • Joined: {user.joinDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(user.status)}
                      <span className="text-sm capitalize">{user.status}</span>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Property Management</h3>
            <Button>Verify Properties</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {platformStats.verifiedProperties.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Verified Properties</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {(platformStats.totalProperties - platformStats.verifiedProperties).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Pending Verification</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-red-600">23</div>
                <div className="text-sm text-muted-foreground">Flagged Properties</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[1, 2, 3].map((property) => (
                  <div key={property} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-secondary rounded-lg"></div>
                      <div>
                        <div className="font-medium">Modern 3BR Apartment</div>
                        <div className="text-sm text-muted-foreground">Victoria Island, Lagos</div>
                        <div className="text-xs text-muted-foreground">Listed by: John Agent</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Verified</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" variant="outline">
                        <Ban className="h-3 w-3 mr-1" />
                        Flag
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <h3 className="text-lg font-semibold">Verification Queue</h3>
          
          <div className="grid gap-4">
            {pendingVerifications.map((verification) => (
              <Card key={verification.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <div className="font-medium">{verification.type}</div>
                        <div className="text-sm text-muted-foreground">{verification.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Submitted {verification.submitted}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={verification.priority === "high" ? "destructive" : "secondary"}>
                        {verification.priority} priority
                      </Badge>
                      <Button size="sm" variant="outline">
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <h3 className="text-lg font-semibold">Security Monitoring</h3>
          
          <div className="grid gap-4">
            {fraudAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        alert.severity === "high" ? "bg-red-100" : 
                        alert.severity === "medium" ? "bg-yellow-100" : "bg-green-100"
                      }`}>
                        <AlertTriangle className={`h-5 w-5 ${
                          alert.severity === "high" ? "text-red-600" : 
                          alert.severity === "medium" ? "text-yellow-600" : "text-green-600"
                        }`} />
                      </div>
                      <div>
                        <div className="font-medium">{alert.type}</div>
                        <div className="text-sm text-muted-foreground">{alert.property}</div>
                        <div className="text-xs text-muted-foreground">
                          Status: {alert.status}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity} risk
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        Take Action
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h3 className="text-lg font-semibold">Platform Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-primary/5 via-secondary to-primary/5 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-primary/5 via-secondary to-primary/5 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </DashboardLayout>
  );
};