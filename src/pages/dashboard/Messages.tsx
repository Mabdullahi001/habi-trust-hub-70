import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  Star,
  Clock,
  CheckCheck,
  User,
  Building,
  Calendar
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  read: boolean;
  isOwn?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  property?: string;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    role: "Agent",
    lastMessage: "The villa viewing is confirmed for tomorrow at 2 PM",
    timestamp: "1h ago",
    unread: 2,
    online: true,
    property: "Modern Villa in Lekki"
  },
  {
    id: "2", 
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    role: "Seller",
    lastMessage: "I can reduce the price by 5% for quick sale",
    timestamp: "3h ago",
    unread: 0,
    online: false,
    property: "Luxury Apartment VI"
  },
  {
    id: "3",
    name: "Ada Williams",
    avatar: "/placeholder.svg", 
    role: "Agent",
    lastMessage: "Documents are ready for review",
    timestamp: "1d ago",
    unread: 1,
    online: true,
    property: "Family House Surulere"
  },
  {
    id: "4",
    name: "Habi360 Support",
    avatar: "/placeholder.svg",
    role: "Support",
    lastMessage: "Welcome to Habi360! How can we help you today?",
    timestamp: "2d ago", 
    unread: 0,
    online: true
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    avatar: "/placeholder.svg",
    content: "Hi! I saw you're interested in the Modern Villa in Lekki. Would you like to schedule a viewing?",
    timestamp: "2h ago",
    read: true
  },
  {
    id: "2", 
    sender: "You",
    avatar: "/placeholder.svg",
    content: "Yes, I'm very interested. What times are available this week?",
    timestamp: "1h ago",
    read: true,
    isOwn: true
  },
  {
    id: "3",
    sender: "Sarah Johnson", 
    avatar: "/placeholder.svg",
    content: "Great! I have slots available tomorrow at 2 PM or Thursday at 10 AM. Both work for you?",
    timestamp: "1h ago",
    read: true
  },
  {
    id: "4",
    sender: "You",
    avatar: "/placeholder.svg", 
    content: "Tomorrow at 2 PM works perfectly. Should I bring any documents?",
    timestamp: "45m ago",
    read: true,
    isOwn: true
  },
  {
    id: "5",
    sender: "Sarah Johnson",
    avatar: "/placeholder.svg",
    content: "Perfect! Just bring a valid ID. I'll send you the exact address and my contact details.",
    timestamp: "30m ago", 
    read: false
  },
  {
    id: "6",
    sender: "Sarah Johnson",
    avatar: "/placeholder.svg",
    content: "The villa viewing is confirmed for tomorrow at 2 PM. Address: 15 Admiralty Way, Lekki Phase 1. My phone: +234 901 234 5678",
    timestamp: "1m ago",
    read: false
  }
];

export default function DashboardMessages() {
  const [userRole] = useState<'buyer' | 'seller' | 'agent' | 'admin'>("buyer");
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    trustScore: 87
  };

  const currentConversation = mockConversations.find(c => c.id === selectedConversation);
  const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unread, 0);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'agent': return 'bg-trust-medium';
      case 'seller': return 'bg-primary';
      case 'buyer': return 'bg-trust-high';
      case 'support': return 'bg-accent';
      default: return 'bg-secondary';
    }
  };

  return (
    <DashboardLayout
      userRole={userRole}
      user={user}
      onSearch={handleSearch}
      searchPlaceholder="Search conversations..."
      showAddButton={userRole === 'agent'}
      onAddNew={() => console.log("Start new conversation")}
      addButtonText="New Chat"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">
              {totalUnread > 0 ? `${totalUnread} unread messages` : "All caught up!"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-primary/10 border-r-2 border-primary' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-trust-high rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">{conversation.name}</span>
                            <Badge variant="outline" className={`${getRoleColor(conversation.role)} text-white text-xs`}>
                              {conversation.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                            {conversation.unread > 0 && (
                              <Badge variant="default" className="h-5 w-5 p-0 text-xs rounded-full">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-1">
                          {conversation.lastMessage}
                        </p>
                        {conversation.property && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Building className="h-3 w-3" />
                            <span className="truncate">{conversation.property}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={currentConversation.avatar} alt={currentConversation.name} />
                          <AvatarFallback>{currentConversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {currentConversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-trust-high rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{currentConversation.name}</span>
                          <Badge variant="outline" className={`${getRoleColor(currentConversation.role)} text-white text-xs`}>
                            {currentConversation.role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            {currentConversation.online ? (
                              <>
                                <div className="w-2 h-2 bg-trust-high rounded-full"></div>
                                <span>Online</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3" />
                                <span>Last seen {currentConversation.timestamp}</span>
                              </>
                            )}
                          </div>
                          {currentConversation.property && (
                            <>
                              <span>•</span>
                              <Building className="h-3 w-3" />
                              <span className="truncate">{currentConversation.property}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Video className="h-4 w-4" />
                        Video
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <Separator />

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}>
                        {!message.isOwn && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.avatar} alt={message.sender} />
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-[70%] ${message.isOwn ? 'text-right' : ''}`}>
                          <div className={`p-3 rounded-lg ${
                            message.isOwn 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <span>{message.timestamp}</span>
                            {message.isOwn && (
                              <CheckCheck className={`h-3 w-3 ${message.read ? 'text-trust-high' : 'text-muted-foreground'}`} />
                            )}
                          </div>
                        </div>
                        {message.isOwn && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt="You" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>

                <Separator />

                {/* Message Input */}
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[40px] max-h-[120px]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}