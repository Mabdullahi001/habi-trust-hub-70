import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield, Clock, CheckCircle, AlertTriangle, ExternalLink, FileText } from "lucide-react";

interface PropertyPassportProps {
  propertyId: string;
  isVerified?: boolean;
  trustScore?: number;
  blockchainHash?: string;
  verificationDate?: string;
  ownershipHistory?: Array<{
    owner: string;
    period: string;
    verified: boolean;
  }>;
}

export const PropertyPassport = ({ 
  propertyId, 
  isVerified = false, 
  trustScore = 85,
  blockchainHash = "0x1a2b3c4d5e6f...",
  verificationDate = "2024-08-15",
  ownershipHistory = [
    { owner: "John Smith", period: "2020-2024", verified: true },
    { owner: "Sarah Johnson", period: "2018-2020", verified: true },
  ]
}: PropertyPassportProps) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Property Passport™
          </CardTitle>
          <Badge variant={isVerified ? "default" : "secondary"} className="gap-1">
            {isVerified ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <AlertTriangle className="h-3 w-3" />
            )}
            {isVerified ? "Verified" : "Pending"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Trust Score */}
        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
          <div>
            <h3 className="font-semibold">Trust Score</h3>
            <p className="text-sm text-muted-foreground">Blockchain-verified authenticity</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{trustScore}/100</div>
            <div className="text-xs text-muted-foreground">Updated today</div>
          </div>
        </div>

        <Separator />

        {/* Blockchain Details */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blockchain Certificate
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Property ID:</span>
              <span className="font-mono">{propertyId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blockchain Hash:</span>
              <span className="font-mono text-xs">{blockchainHash}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network:</span>
              <span>Polygon</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Verified Date:</span>
              <span>{verificationDate}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Ownership History */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Ownership History
          </h3>
          <div className="space-y-2">
            {ownershipHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{record.owner}</div>
                  <div className="text-sm text-muted-foreground">{record.period}</div>
                </div>
                <Badge variant={record.verified ? "default" : "secondary"} className="gap-1">
                  {record.verified ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <AlertTriangle className="h-3 w-3" />
                  )}
                  {record.verified ? "Verified" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Blockchain
          </Button>
          <Button variant="outline" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Download Certificate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};