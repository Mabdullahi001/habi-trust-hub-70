import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  score: number;
  verified?: boolean;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export const TrustBadge = ({ score, verified = false, size = "md", showIcon = true, className }: TrustBadgeProps) => {
  const getTrustLevel = (score: number) => {
    if (score >= 80) return "high";
    if (score >= 60) return "medium";
    return "low";
  };

  const getTrustColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-trust-high text-white";
      case "medium":
        return "bg-trust-medium text-white";
      case "low":
        return "bg-trust-low text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTrustIcon = (level: string) => {
    switch (level) {
      case "high":
        return CheckCircle;
      case "medium":
        return AlertTriangle;
      case "low":
        return XCircle;
      default:
        return Shield;
    }
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  const trustLevel = getTrustLevel(score);
  const TrustIcon = getTrustIcon(trustLevel);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Badge className={cn(getTrustColor(trustLevel), sizeClasses[size])}>
        {showIcon && <TrustIcon className={cn(iconSizes[size], "mr-1")} />}
        {score}% Trust
      </Badge>
      {verified && (
        <Badge variant="outline" className={cn("border-trust-high text-trust-high", sizeClasses[size])}>
          <Shield className={cn(iconSizes[size], "mr-1")} />
          Verified
        </Badge>
      )}
    </div>
  );
};

export default TrustBadge;