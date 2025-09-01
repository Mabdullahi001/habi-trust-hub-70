import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: {
    id: string;
    author: {
      name: string;
      avatar?: string;
      verified: boolean;
    };
    rating: number;
    title: string;
    content: string;
    date: string;
    helpful: number;
    property?: string;
    type: "agent" | "property" | "service";
  };
  compact?: boolean;
}

export const ReviewCard = ({ review, compact = false }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
        )}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className={cn("hover:shadow-md transition-shadow", compact && "p-0")}>
      <CardHeader className={cn("pb-2", compact && "p-4 pb-2")}>
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.author.avatar} alt={review.author.name} />
            <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm truncate">{review.author.name}</h4>
              {review.author.verified && (
                <Badge variant="outline" className="border-trust-high text-trust-high text-xs px-1 py-0">
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(review.rating)}
              </div>
              <span className={cn("text-sm font-medium", getRatingColor(review.rating))}>
                {review.rating}.0
              </span>
              <span className="text-xs text-muted-foreground">• {review.date}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn("pt-0", compact && "px-4 pb-4")}>
        <div className="space-y-3">
          {review.title && (
            <h5 className="font-medium text-sm leading-tight">{review.title}</h5>
          )}
          <p className={cn(
            "text-sm text-muted-foreground leading-relaxed",
            compact && "line-clamp-3"
          )}>
            {review.content}
          </p>
          {review.property && (
            <div className="text-xs text-muted-foreground">
              Property: <span className="font-medium">{review.property}</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                <span>{review.helpful}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {review.type}
              </Badge>
            </div>
            {!compact && (
              <div className="flex items-center gap-2">
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Helpful
                </button>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Report
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;