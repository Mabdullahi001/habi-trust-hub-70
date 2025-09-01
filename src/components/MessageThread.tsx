import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Image, Phone, Video, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  type: "text" | "image" | "file";
  read: boolean;
}

interface MessageThreadProps {
  conversation: {
    id: string;
    participant: {
      name: string;
      avatar?: string;
      role: string;
      online: boolean;
      verified: boolean;
    };
    property?: {
      title: string;
      image?: string;
    };
    messages: Message[];
  };
  currentUserId: string;
}

export const MessageThread = ({ conversation, currentUserId }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Handle message sending logic here
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      {/* Header */}
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {conversation.participant.online && (
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{conversation.participant.name}</h3>
                {conversation.participant.verified && (
                  <Badge variant="outline" className="border-trust-high text-trust-high text-xs px-1 py-0">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="capitalize">{conversation.participant.role}</span>
                {conversation.participant.online && <span>• Online</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {conversation.property && (
          <div className="bg-secondary p-3 rounded-lg mt-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-subtle rounded"></div>
              <div>
                <p className="font-medium text-sm">Discussing Property</p>
                <p className="text-xs text-muted-foreground">{conversation.property.title}</p>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {conversation.messages.map((message) => {
              const isCurrentUser = message.senderId === currentUserId;
              return (
                <div key={message.id} className={cn("flex gap-3", isCurrentUser && "flex-row-reverse")}>
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                      <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("flex flex-col max-w-[70%]", isCurrentUser && "items-end")}>
                    <div className={cn(
                      "rounded-lg px-3 py-2 text-sm",
                      isCurrentUser 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-secondary-foreground"
                    )}>
                      {message.content}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      {isCurrentUser && (
                        <div className={cn(
                          "text-xs",
                          message.read ? "text-trust-high" : "text-muted-foreground"
                        )}>
                          {message.read ? "Read" : "Sent"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                  <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="bg-secondary rounded-lg px-3 py-2 text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <Image className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="absolute right-1 top-1 h-8 w-8 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MessageThread;