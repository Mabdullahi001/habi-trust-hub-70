import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  DollarSign, 
  Image, 
  FileText,
  Brain,
  TrendingUp,
  Clock
} from "lucide-react";

interface FraudAnalysis {
  overall: {
    riskLevel: "low" | "medium" | "high";
    confidence: number;
    status: "safe" | "warning" | "danger";
  };
  checks: Array<{
    type: "image" | "price" | "description" | "ownership" | "location";
    name: string;
    status: "pass" | "flag" | "fail";
    confidence: number;
    details: string;
  }>;
  recommendations?: string[];
}

interface AIFraudDetectionProps {
  propertyId: string;
  analysis?: FraudAnalysis;
  isAnalyzing?: boolean;
}

export const AIFraudDetection = ({ 
  propertyId, 
  isAnalyzing = false,
  analysis = {
    overall: {
      riskLevel: "low",
      confidence: 94,
      status: "safe"
    },
    checks: [
      {
        type: "image",
        name: "Image Authenticity",
        status: "pass",
        confidence: 96,
        details: "All images appear authentic with no signs of manipulation"
      },
      {
        type: "price",
        name: "Price Analysis",
        status: "pass",
        confidence: 89,
        details: "Price is within expected range for similar properties in the area"
      },
      {
        type: "description",
        name: "Description Verification",
        status: "flag",
        confidence: 78,
        details: "Some claims require verification - property features may be exaggerated"
      },
      {
        type: "ownership",
        name: "Ownership Verification",
        status: "pass",
        confidence: 98,
        details: "Ownership documents verified through blockchain records"
      },
      {
        type: "location",
        name: "Location Validation",
        status: "pass",
        confidence: 95,
        details: "Property location confirmed through satellite imagery and government records"
      }
    ],
    recommendations: [
      "Request additional verification for property features mentioned in description",
      "Consider scheduling a physical inspection before proceeding",
      "All major fraud indicators show green - property appears legitimate"
    ]
  }
}: AIFraudDetectionProps) => {
  const getOverallStatusColor = () => {
    switch (analysis.overall.status) {
      case "safe": return "text-green-600 bg-green-50 border-green-200";
      case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "danger": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getOverallIcon = () => {
    switch (analysis.overall.status) {
      case "safe": return <CheckCircle className="h-5 w-5" />;
      case "warning": return <AlertTriangle className="h-5 w-5" />;
      case "danger": return <AlertTriangle className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const getCheckIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-4 w-4" />;
      case "price": return <DollarSign className="h-4 w-4" />;
      case "description": return <FileText className="h-4 w-4" />;
      case "ownership": return <Shield className="h-4 w-4" />;
      case "location": return <Eye className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getCheckStatusColor = (status: string) => {
    switch (status) {
      case "pass": return "text-green-600 bg-green-50 border-green-200";
      case "flag": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "fail": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary animate-pulse" />
            AI Fraud Detection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto"></div>
            <p className="text-sm text-muted-foreground">
              Analyzing property for potential fraud indicators...
            </p>
            <Progress value={65} className="h-2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Fraud Detection
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time analysis powered by machine learning algorithms
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Risk Assessment */}
        <div className={`p-4 rounded-lg border ${getOverallStatusColor()}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {getOverallIcon()}
              <span className="font-semibold">
                {analysis.overall.status.toUpperCase()} - {analysis.overall.riskLevel.toUpperCase()} RISK
              </span>
            </div>
            <Badge variant="outline">
              {analysis.overall.confidence}% Confidence
            </Badge>
          </div>
          <p className="text-sm">
            AI analysis indicates this property has a {analysis.overall.riskLevel} fraud risk level.
          </p>
        </div>

        {/* Detailed Checks */}
        <div className="space-y-3">
          <h3 className="font-semibold">Detailed Analysis</h3>
          {analysis.checks.map((check, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getCheckIcon(check.type)}
                  <span className="font-medium">{check.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {check.confidence}%
                  </span>
                  <Badge 
                    variant="outline" 
                    className={getCheckStatusColor(check.status)}
                  >
                    {check.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{check.details}</p>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">AI Recommendations</h3>
            <div className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analysis Metadata */}
        <div className="flex items-center justify-between pt-4 border-t text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Last updated: 2 minutes ago
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Analysis v2.1
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Re-analyze Property
          </Button>
          <Button variant="outline" className="flex-1">
            Report Issue
          </Button>
          <Button className="flex-1">
            View Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};