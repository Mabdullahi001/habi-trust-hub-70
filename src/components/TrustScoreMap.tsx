import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, TrendingUp, TrendingDown, Shield, AlertTriangle, Info } from "lucide-react";

interface TrustDataPoint {
  id: string;
  location: string;
  trustScore: number;
  propertyCount: number;
  averagePrice: string;
  trend: "up" | "down" | "stable";
  riskLevel: "low" | "medium" | "high";
}

interface TrustScoreMapProps {
  mapData?: TrustDataPoint[];
  selectedLocation?: string;
}

export const TrustScoreMap = ({ 
  mapData = [
    { id: "1", location: "Victoria Island, Lagos", trustScore: 92, propertyCount: 156, averagePrice: "₦25M", trend: "up", riskLevel: "low" },
    { id: "2", location: "Ikoyi, Lagos", trustScore: 89, propertyCount: 203, averagePrice: "₦18M", trend: "up", riskLevel: "low" },
    { id: "3", location: "Lekki Phase 1", trustScore: 85, propertyCount: 342, averagePrice: "₦12M", trend: "stable", riskLevel: "low" },
    { id: "4", location: "Surulere, Lagos", trustScore: 78, propertyCount: 89, averagePrice: "₦8M", trend: "down", riskLevel: "medium" },
    { id: "5", location: "Ajah, Lagos", trustScore: 72, propertyCount: 234, averagePrice: "₦6M", trend: "up", riskLevel: "medium" },
    { id: "6", location: "Ikeja, Lagos", trustScore: 68, propertyCount: 167, averagePrice: "₦7M", trend: "stable", riskLevel: "medium" },
  ],
  selectedLocation = "Victoria Island, Lagos"
}: TrustScoreMapProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedArea, setSelectedArea] = useState(mapData[0]);

  const getTrustColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "low": return "default";
      case "medium": return "secondary";
      case "high": return "destructive";
      default: return "outline";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Trust Score Map
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time trust levels across different areas based on blockchain verification and AI analysis
        </p>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {/* Map Visualization Placeholder */}
            <div className="relative h-80 bg-gradient-to-br from-primary/5 via-secondary to-primary/5 rounded-lg border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 mx-auto text-primary" />
                  <p className="text-sm font-medium">Interactive Trust Map</p>
                  <p className="text-xs text-muted-foreground">Powered by Google Maps API</p>
                </div>
              </div>
              
              {/* Sample Trust Pins */}
              {mapData.slice(0, 3).map((point, index) => (
                <button
                  key={point.id}
                  onClick={() => setSelectedArea(point)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    point.id === selectedArea.id ? "scale-110" : ""
                  }`}
                  style={{
                    left: `${30 + index * 20}%`,
                    top: `${40 + index * 15}%`,
                  }}
                >
                  <div className={`px-2 py-1 rounded-full border-2 text-xs font-medium ${getTrustColor(point.trustScore)}`}>
                    {point.trustScore}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Area Details */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{selectedArea.location}</h3>
                  <Badge variant={getRiskBadgeVariant(selectedArea.riskLevel)}>
                    {selectedArea.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{selectedArea.trustScore}</div>
                    <div className="text-xs text-muted-foreground">Trust Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{selectedArea.propertyCount}</div>
                    <div className="text-xs text-muted-foreground">Properties</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{selectedArea.averagePrice}</div>
                    <div className="text-xs text-muted-foreground">Avg. Price</div>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    {selectedArea.trend === "up" ? (
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    ) : selectedArea.trend === "down" ? (
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    ) : (
                      <div className="h-6 w-6 bg-gray-400 rounded-full" />
                    )}
                    <div className="text-xs text-muted-foreground">Trend</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4">
            <div className="grid gap-2">
              {mapData.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area)}
                  className={`p-3 rounded-lg border text-left transition-all hover:border-primary/50 ${
                    area.id === selectedArea.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{area.location}</div>
                      <div className="text-sm text-muted-foreground">
                        {area.propertyCount} properties • {area.averagePrice} avg.
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        area.trustScore >= 85 ? "text-green-600" :
                        area.trustScore >= 70 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {area.trustScore}
                      </div>
                      <Badge variant={getRiskBadgeVariant(area.riskLevel)} className="text-xs">
                        {area.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <div className="text-sm text-muted-foreground">High Trust Areas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-primary">1,191</div>
                  <div className="text-sm text-muted-foreground">Verified Properties</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-yellow-600">12</div>
                  <div className="text-sm text-muted-foreground">Risk Alerts</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Info className="h-5 w-5 text-blue-600" />
              <div className="text-sm text-blue-800">
                Trust scores are updated in real-time based on blockchain verification, user reviews, and AI fraud detection.
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};