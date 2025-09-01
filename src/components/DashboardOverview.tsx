import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Heart,
  MessageSquare,
  MapPin,
  Calendar,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

interface DashboardOverviewProps {
  userRole?: 'buyer' | 'seller' | 'agent' | 'admin';
  userName?: string;
}

export function DashboardOverview({ 
  userRole = 'buyer',
  userName = "John"
}: DashboardOverviewProps) {
  
  // Role-based stats and data
  const getStatsData = () => {
    switch (userRole) {
      case 'buyer':
        return [
          { title: "Saved Properties", value: "12", icon: Heart, color: "text-primary" },
          { title: "Viewed Today", value: "8", icon: Eye, color: "text-trust-medium" },
          { title: "Messages", value: "5", icon: MessageSquare, color: "text-trust-high" },
          { title: "Trust Score", value: "87%", icon: BarChart3, color: "text-trust-high" },
        ];
      case 'seller':
        return [
          { title: "Active Listings", value: "6", icon: Building, color: "text-primary" },
          { title: "Total Views", value: "342", icon: Eye, color: "text-trust-medium" },
          { title: "Inquiries", value: "28", icon: MessageSquare, color: "text-trust-high" },
          { title: "Revenue", value: "$45K", icon: DollarSign, color: "text-primary" },
        ];
      case 'agent':
        return [
          { title: "Active Clients", value: "24", icon: Users, color: "text-primary" },
          { title: "Properties Listed", value: "18", icon: Building, color: "text-trust-medium" },
          { title: "Commission", value: "$12K", icon: DollarSign, color: "text-trust-high" },
          { title: "Success Rate", value: "94%", icon: TrendingUp, color: "text-primary" },
        ];
      case 'admin':
        return [
          { title: "Total Users", value: "1,247", icon: Users, color: "text-primary" },
          { title: "Properties", value: "3,856", icon: Building, color: "text-trust-medium" },
          { title: "Transactions", value: "289", icon: DollarSign, color: "text-trust-high" },
          { title: "System Health", value: "99%", icon: BarChart3, color: "text-primary" },
        ];
      default:
        return [];
    }
  };

  const getChartData = () => {
    switch (userRole) {
      case 'buyer':
        return {
          title: "Property Search Activity",
          data: [
            { month: "Jan", value: 15 },
            { month: "Feb", value: 23 },
            { month: "Mar", value: 34 },
            { month: "Apr", value: 28 },
            { month: "May", value: 41 },
            { month: "Jun", value: 52 },
          ]
        };
      case 'seller':
        return {
          title: "Revenue Analytics",
          data: [
            { month: "Jan", value: 8500 },
            { month: "Feb", value: 12300 },
            { month: "Mar", value: 9800 },
            { month: "Apr", value: 15600 },
            { month: "May", value: 11200 },
            { month: "Jun", value: 18900 },
          ]
        };
      case 'agent':
        return {
          title: "Commission Tracking",
          data: [
            { month: "Jan", value: 2400 },
            { month: "Feb", value: 3100 },
            { month: "Mar", value: 2800 },
            { month: "Apr", value: 3900 },
            { month: "May", value: 3200 },
            { month: "Jun", value: 4100 },
          ]
        };
      case 'admin':
        return {
          title: "Platform Growth",
          data: [
            { month: "Jan", value: 1100 },
            { month: "Feb", value: 1150 },
            { month: "Mar", value: 1200 },
            { month: "Apr", value: 1180 },
            { month: "May", value: 1220 },
            { month: "Jun", value: 1247 },
          ]
        };
      default:
        return { title: "", data: [] };
    }
  };

  const getRecentActivity = () => {
    switch (userRole) {
      case 'buyer':
        return [
          { action: "Viewed", item: "Modern Villa in Lekki", time: "2 hours ago", type: "property" },
          { action: "Saved", item: "Luxury Apartment in VI", time: "1 day ago", type: "property" },
          { action: "Messaged", item: "Agent Sarah", time: "2 days ago", type: "message" },
          { action: "Scheduled", item: "Property Viewing", time: "3 days ago", type: "calendar" },
        ];
      case 'seller':
        return [
          { action: "Listed", item: "3BR Apartment", time: "1 hour ago", type: "property" },
          { action: "Received", item: "Inquiry from buyer", time: "3 hours ago", type: "message" },
          { action: "Updated", item: "Property photos", time: "1 day ago", type: "property" },
          { action: "Sold", item: "Villa in Ikoyi", time: "2 days ago", type: "transaction" },
        ];
      case 'agent':
        return [
          { action: "Signed", item: "New client contract", time: "30 min ago", type: "client" },
          { action: "Scheduled", item: "Property viewing", time: "2 hours ago", type: "calendar" },
          { action: "Closed", item: "Deal in Victoria Island", time: "1 day ago", type: "transaction" },
          { action: "Added", item: "New listing", time: "2 days ago", type: "property" },
        ];
      case 'admin':
        return [
          { action: "Verified", item: "Agent credentials", time: "15 min ago", type: "verification" },
          { action: "Resolved", item: "User dispute", time: "1 hour ago", type: "support" },
          { action: "Updated", item: "System security", time: "4 hours ago", type: "system" },
          { action: "Reviewed", item: "Property listings", time: "1 day ago", type: "moderation" },
        ];
      default:
        return [];
    }
  };

  const getWelcomeMessage = () => {
    const greetings = {
      buyer: `Hello 👋 ${userName}! Ready to find your dream property?`,
      seller: `Welcome back ${userName}! Let's boost your property sales.`,
      agent: `Good day ${userName}! Time to grow your client portfolio.`,
      admin: `Dashboard Control ${userName}! System status looks great.`
    };
    return greetings[userRole];
  };

  const statsData = getStatsData();
  const chartData = getChartData();
  const recentActivity = getRecentActivity();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {getWelcomeMessage()}
          </h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {userRole === 'buyer' ? 'Search Properties' : 
           userRole === 'seller' ? 'Add Listing' :
           userRole === 'agent' ? 'Add Client' : 'Create Report'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {chartData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.data.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.month}</span>
                  <div className="flex items-center gap-3 flex-1 mx-4">
                    <Progress 
                      value={(item.value / Math.max(...chartData.data.map(d => d.value))) * 100} 
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground min-w-16 text-right">
                      {typeof item.value === 'number' && item.value > 1000 
                        ? `${(item.value / 1000).toFixed(1)}K` 
                        : item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    <span className="text-primary">{activity.action}</span> {activity.item}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Location Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Property Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-secondary to-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-primary mx-auto" />
              <p className="text-muted-foreground">Interactive map will be displayed here</p>
              <p className="text-sm text-muted-foreground">
                {userRole === 'buyer' ? 'Explore properties in your preferred areas' :
                 userRole === 'seller' ? 'Track your listings across the city' :
                 userRole === 'agent' ? 'Manage properties across all locations' :
                 'Monitor platform activity citywide'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}