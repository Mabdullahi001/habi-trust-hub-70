import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Maximize, VolumeX, Volume2 } from "lucide-react";

interface VRTourViewerProps {
  propertyId: string;
  tourUrl?: string;
  isAR?: boolean;
  rooms?: Array<{
    name: string;
    thumbnail: string;
    duration: string;
  }>;
}

export const VRTourViewer = ({ 
  propertyId, 
  tourUrl = "/placeholder-360.jpg",
  isAR = false,
  rooms = [
    { name: "Living Room", thumbnail: "/placeholder.svg", duration: "2:30" },
    { name: "Master Bedroom", thumbnail: "/placeholder.svg", duration: "1:45" },
    { name: "Kitchen", thumbnail: "/placeholder.svg", duration: "2:00" },
    { name: "Bathroom", thumbnail: "/placeholder.svg", duration: "1:15" },
  ]
}: VRTourViewerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {isAR ? "AR Experience" : "360° Virtual Tour"}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">HD Quality</Badge>
            {isAR && <Badge variant="outline">AR Compatible</Badge>}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main VR Viewer */}
        <div className="relative aspect-video bg-gradient-to-br from-secondary via-background to-secondary rounded-lg overflow-hidden">
          <img 
            src={tourUrl} 
            alt="360° Property View" 
            className="w-full h-full object-cover"
          />
          
          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button
              size="lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-background/90 hover:bg-background text-foreground"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
          </div>

          {/* Control Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-background/90 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Room Navigation */}
        <div className="space-y-2">
          <h3 className="font-semibold">Tour Rooms ({rooms.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {rooms.map((room, index) => (
              <button
                key={index}
                onClick={() => setCurrentRoom(index)}
                className={`p-2 rounded-lg border transition-all ${
                  currentRoom === index 
                    ? "border-primary bg-primary/10" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img 
                  src={room.thumbnail} 
                  alt={room.name}
                  className="w-full aspect-video object-cover rounded mb-2"
                />
                <div className="text-sm font-medium">{room.name}</div>
                <div className="text-xs text-muted-foreground">{room.duration}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {isAR && (
            <Button className="flex-1">
              Launch AR Experience
            </Button>
          )}
          <Button variant="outline" className="flex-1">
            Share Tour
          </Button>
          <Button variant="outline" className="flex-1">
            Download Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};