import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Upload, 
  Camera, 
  Shield, 
  FileText,
  User,
  CreditCard,
  MapPin
} from "lucide-react";

interface KYCVerificationProps {
  currentStep?: number;
  verificationStatus?: "pending" | "in-progress" | "completed" | "failed";
}

export const KYCVerification = ({ 
  currentStep = 0, 
  verificationStatus = "pending" 
}: KYCVerificationProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const steps = [
    { id: 1, title: "Basic Information", icon: User, completed: currentStep > 1 },
    { id: 2, title: "Identity Verification", icon: FileText, completed: currentStep > 2 },
    { id: 3, title: "Address Verification", icon: MapPin, completed: currentStep > 3 },
    { id: 4, title: "Financial Verification", icon: CreditCard, completed: currentStep > 4 },
  ];

  const getStatusColor = () => {
    switch (verificationStatus) {
      case "completed": return "text-green-600 bg-green-50 border-green-200";
      case "in-progress": return "text-blue-600 bg-blue-50 border-blue-200";
      case "failed": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case "completed": return <CheckCircle className="h-5 w-5" />;
      case "in-progress": return <Clock className="h-5 w-5" />;
      case "failed": return <AlertTriangle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const handleDocumentUpload = (docType: string) => {
    setUploadedDocs([...uploadedDocs, docType]);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            KYC Verification
          </CardTitle>
          <Badge className={`gap-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            {verificationStatus.replace("-", " ").toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Complete your identity verification to access all platform features
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Indicator */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>Verification Progress</span>
            <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div className={`p-2 rounded-full border-2 ${
                  step.completed ? "border-primary bg-primary text-primary-foreground" :
                  currentStep === step.id ? "border-primary bg-primary/10 text-primary" :
                  "border-muted bg-muted text-muted-foreground"
                }`}>
                  <step.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-center max-w-20">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Forms */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Legal Name</Label>
                <Input id="fullName" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" placeholder="Nigerian" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" placeholder="+234 801 234 5678" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="identity" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID Document Upload */}
              <div className="space-y-4">
                <Label>Government-Issued ID</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center space-y-4">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Upload ID Document</p>
                    <p className="text-xs text-muted-foreground">
                      National ID, Passport, or Driver's License
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDocumentUpload("id")}
                    disabled={uploadedDocs.includes("id")}
                  >
                    {uploadedDocs.includes("id") ? "Uploaded" : "Choose File"}
                  </Button>
                </div>
              </div>

              {/* Selfie Verification */}
              <div className="space-y-4">
                <Label>Selfie Verification</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center space-y-4">
                  <Camera className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Take Selfie</p>
                    <p className="text-xs text-muted-foreground">
                      Hold your ID next to your face
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => handleDocumentUpload("selfie")}
                    disabled={uploadedDocs.includes("selfie")}
                  >
                    {uploadedDocs.includes("selfie") ? "Captured" : "Take Photo"}
                  </Button>
                </div>
              </div>
            </div>

            {/* ID Number */}
            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input id="idNumber" placeholder="Enter your ID number" />
            </div>
          </TabsContent>

          <TabsContent value="address" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main Street" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Lagos" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Lagos State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" placeholder="100001" />
                </div>
              </div>

              {/* Proof of Address */}
              <div className="space-y-2">
                <Label>Proof of Address</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center space-y-4">
                  <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Upload Proof of Address</p>
                    <p className="text-xs text-muted-foreground">
                      Utility bill, bank statement, or rental agreement (not older than 3 months)
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => handleDocumentUpload("address")}
                    disabled={uploadedDocs.includes("address")}
                  >
                    {uploadedDocs.includes("address") ? "Uploaded" : "Choose File"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" placeholder="Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer</Label>
                  <Input id="employer" placeholder="Tech Company Ltd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Monthly Income Range</Label>
                  <Input id="income" placeholder="₦500,000 - ₦1,000,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sourceOfFunds">Source of Funds</Label>
                  <Input id="sourceOfFunds" placeholder="Salary" />
                </div>
              </div>

              {/* Bank Verification */}
              <div className="space-y-2">
                <Label>Bank Statement</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center space-y-4">
                  <CreditCard className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Upload Bank Statement</p>
                    <p className="text-xs text-muted-foreground">
                      Last 3 months bank statement for income verification
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => handleDocumentUpload("bank")}
                    disabled={uploadedDocs.includes("bank")}
                  >
                    {uploadedDocs.includes("bank") ? "Uploaded" : "Choose File"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Zero Knowledge Privacy Notice */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-blue-900">Zero-Knowledge Privacy</h4>
              <p className="text-sm text-blue-800">
                Your sensitive data is encrypted and verified using zero-knowledge proofs. 
                We verify your identity without storing your personal information.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1">
            Save Progress
          </Button>
          <Button className="flex-1">
            Continue Verification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};