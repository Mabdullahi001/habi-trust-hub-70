import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  Camera,
  FileText,
  Phone,
  Mail,
  CreditCard,
  Building,
  User,
  Award,
  TrendingUp
} from "lucide-react";

interface TrustItem {
  id: string;
  title: string;
  description: string;
  status: 'verified' | 'pending' | 'failed' | 'not_started';
  points: number;
  action?: string;
}

const trustItems: TrustItem[] = [
  {
    id: "email",
    title: "Email Verification",
    description: "Verify your email address to secure your account",
    status: "verified",
    points: 15,
  },
  {
    id: "phone", 
    title: "Phone Verification",
    description: "Add and verify your phone number",
    status: "verified",
    points: 15,
  },
  {
    id: "id",
    title: "Government ID",
    description: "Upload a valid government-issued ID document",
    status: "pending",
    points: 25,
    action: "Upload ID"
  },
  {
    id: "address",
    title: "Address Verification",
    description: "Verify your residential address with utility bill",
    status: "not_started",
    points: 20,
    action: "Upload Document"
  },
  {
    id: "income",
    title: "Income Verification",
    description: "Provide proof of income for higher trust score",
    status: "not_started",
    points: 25,
    action: "Upload Payslip"
  }
];

export default function DashboardTrust() {
  const [userRole] = useState<'buyer' | 'seller' | 'agent' | 'admin'>("buyer");
  const [trustScore] = useState(87);
  
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    trustScore: 87
  };

  const handleSearch = (query: string) => {
    console.log("Searching trust center:", query);
  };

  const verifiedItems = trustItems.filter(item => item.status === 'verified');
  const pendingItems = trustItems.filter(item => item.status === 'pending');
  const remainingPoints = trustItems
    .filter(item => item.status !== 'verified')
    .reduce((sum, item) => sum + item.points, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-5 w-5 text-trust-high" />;
      case 'pending': return <Clock className="h-5 w-5 text-trust-medium" />;
      case 'failed': return <XCircle className="h-5 w-5 text-destructive" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-trust-high/10 border-trust-high/20';
      case 'pending': return 'bg-trust-medium/10 border-trust-medium/20';
      case 'failed': return 'bg-destructive/10 border-destructive/20';
      default: return 'bg-muted/10 border-muted/20';
    }
  };

  const getTrustLevel = (score: number) => {
    if (score >= 90) return { level: "Excellent", color: "text-trust-high" };
    if (score >= 70) return { level: "Good", color: "text-trust-medium" };
    if (score >= 50) return { level: "Fair", color: "text-trust-medium" };
    return { level: "Poor", color: "text-destructive" };
  };

  const trustLevel = getTrustLevel(trustScore);

  return (
    <DashboardLayout
      userRole={userRole}
      user={user}
      onSearch={handleSearch}
      searchPlaceholder="Search verification items..."
      showAddButton={false}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trust Center</h1>
            <p className="text-muted-foreground">
              Build trust with the community and unlock more features
            </p>
          </div>
        </div>

        {/* Trust Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Your Trust Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                  <Progress 
                    value={trustScore} 
                    className="w-32 h-32 rotate-[-90deg]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{trustScore}%</div>
                      <div className={`text-sm font-medium ${trustLevel.color}`}>
                        {trustLevel.level}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  You're {100 - trustScore}% away from reaching 100% trust score
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-trust-high">{verifiedItems.length}</div>
                  <div className="text-sm text-muted-foreground">Verified</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-trust-medium">{pendingItems.length}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">+{remainingPoints}</div>
                  <div className="text-sm text-muted-foreground">Available Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-trust-high/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-trust-high" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Priority Support</div>
                    <div className="text-muted-foreground">Score 80+</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-trust-high/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-trust-high" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Featured Listings</div>
                    <div className="text-muted-foreground">Score 90+</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 bg-muted/10 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Premium Access</div>
                    <div className="text-muted-foreground">Score 95+</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="verification" className="space-y-6">
          <TabsList>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="verification" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {trustItems.map((item) => (
                <Card key={item.id} className={`${getStatusColor(item.status)} border`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        {getStatusIcon(item.status)}
                        <div>
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              +{item.points} points
                            </Badge>
                            <Badge 
                              variant={
                                item.status === 'verified' ? 'default' :
                                item.status === 'pending' ? 'secondary' :
                                'outline'
                              }
                              className="text-xs"
                            >
                              {item.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.status === 'verified' && (
                          <Button variant="outline" size="sm" disabled>
                            Verified
                          </Button>
                        )}
                        {item.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            View Status
                          </Button>
                        )}
                        {(item.status === 'not_started' || item.status === 'failed') && item.action && (
                          <Button size="sm">
                            {item.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trust Score History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <div className="font-medium">Email Verified</div>
                      <div className="text-sm text-muted-foreground">January 15, 2024</div>
                    </div>
                    <Badge className="bg-trust-high text-white">+15 points</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <div className="font-medium">Phone Verified</div>
                      <div className="text-sm text-muted-foreground">January 10, 2024</div>
                    </div>
                    <Badge className="bg-trust-high text-white">+15 points</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <div className="font-medium">Account Created</div>
                      <div className="text-sm text-muted-foreground">January 8, 2024</div>
                    </div>
                    <Badge className="bg-primary text-white">+10 points</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Show Trust Score</div>
                    <div className="text-sm text-muted-foreground">
                      Display your trust score on your public profile
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Verification Badges</div>
                    <div className="text-sm text-muted-foreground">
                      Show verification badges on listings and messages
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Trust Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified about trust score changes
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}