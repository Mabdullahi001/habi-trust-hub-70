import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2, Calendar, Home, Heart } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "property" | "appointment" | "system" | "favorite";
  time: string;
  read: boolean;
  image?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Property Match",
      message: "A new 3-bedroom apartment in Lagos Island matches your search criteria.",
      type: "property",
      time: "2 hours ago",
      read: false,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "2",
      title: "Viewing Reminder",
      message: "Your property viewing is scheduled for tomorrow at 2:00 PM.",
      type: "appointment",
      time: "5 hours ago",
      read: false
    },
    {
      id: "3",
      title: "Property Added to Favorites",
      message: "The luxury villa in Ikoyi has been added to your favorites.",
      type: "favorite",
      time: "1 day ago",
      read: true,
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "4",
      title: "System Update",
      message: "New features have been added to improve your property search experience.",
      type: "system",
      time: "2 days ago",
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "property": return <Home className="h-5 w-5" />;
      case "appointment": return <Calendar className="h-5 w-5" />;
      case "favorite": return <Heart className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "property": return "bg-blue-100 text-blue-800";
      case "appointment": return "bg-green-100 text-green-800";
      case "favorite": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "All caught up!"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>

          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Woman using laptop for notifications"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground">No notifications</h3>
                <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`transition-all ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {notification.image && (
                        <img 
                          src={notification.image} 
                          alt=""
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className={getNotificationColor(notification.type)}>
                                {getNotificationIcon(notification.type)}
                                <span className="ml-1 capitalize">{notification.type}</span>
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                            
                            <h3 className="font-semibold text-foreground mb-1">
                              {notification.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.time}
                            </p>
                          </div>
                          
                          <div className="flex gap-2 flex-shrink-0">
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;