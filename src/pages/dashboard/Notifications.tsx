import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  Building,
  Shield,
  Star,
  Clock,
  Check,
  X,
  Settings as SettingsIcon,
  Mail,
  Smartphone
} from "lucide-react";

interface Notification {
  id: string;
  type: 'message' | 'viewing' | 'payment' | 'property' | 'trust' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  priority: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New Message from Sarah Johnson",
    message: "The villa viewing is confirmed for tomorrow at 2 PM. Please bring a valid ID.",
    timestamp: "2 minutes ago",
    read: false,
    priority: "high",
    action: { label: "Reply", href: "/dashboard/messages" }
  },
  {
    id: "2",
    type: "viewing", 
    title: "Viewing Reminder",
    message: "Your property viewing at Modern Villa, Lekki is scheduled for tomorrow at 2:00 PM",
    timestamp: "1 hour ago",
    read: false,
    priority: "high",
    action: { label: "View Details", href: "/dashboard/calendar" }
  },
  {
    id: "3",
    type: "property",
    title: "New Property Match",
    message: "We found 3 new properties matching your preferences in Lekki area",
    timestamp: "3 hours ago", 
    read: true,
    priority: "medium",
    action: { label: "View Properties", href: "/dashboard/properties" }
  },
  {
    id: "4",
    type: "payment",
    title: "Payment Confirmation",
    message: "Your escrow payment of $25,000 has been successfully processed",
    timestamp: "1 day ago",
    read: true,
    priority: "high",
    action: { label: "View Receipt", href: "/dashboard/payments" }
  },
  {
    id: "5",
    type: "trust",
    title: "Trust Score Updated",
    message: "Congratulations! Your trust score has increased to 87%",
    timestamp: "2 days ago",
    read: true,
    priority: "medium",
    action: { label: "View Trust Center", href: "/dashboard/trust" }
  },
  {
    id: "6",
    type: "system",
    title: "Welcome to Habi360",
    message: "Complete your profile verification to unlock all features",
    timestamp: "3 days ago",
    read: true,
    priority: "low",
    action: { label: "Complete Profile", href: "/dashboard/settings" }
  }
];

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface NotificationPreferences {
  messages: NotificationSettings;
  viewings: NotificationSettings;
  payments: NotificationSettings;
  properties: NotificationSettings;
  trust: NotificationSettings;
  marketing: NotificationSettings;
}

export default function DashboardNotifications() {
  const [userRole] = useState<'buyer' | 'seller' | 'agent' | 'admin'>("buyer");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    messages: { email: true, push: true, sms: false },
    viewings: { email: true, push: true, sms: true },
    payments: { email: true, push: true, sms: true },
    properties: { email: true, push: false, sms: false },
    trust: { email: true, push: false, sms: false },
    marketing: { email: false, push: false, sms: false }
  });
  
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    trustScore: 87
  };

  const handleSearch = (query: string) => {
    console.log("Searching notifications:", query);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const updatePreference = (
    category: keyof NotificationPreferences, 
    type: keyof NotificationSettings, 
    value: boolean
  ) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value
      }
    }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'viewing': return Calendar;
      case 'payment': return DollarSign;
      case 'property': return Building;
      case 'trust': return Shield;
      case 'system': return Bell;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-trust-medium bg-trust-medium/5';
      case 'low': return 'border-l-muted bg-muted/5';
      default: return 'border-l-muted';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout
      userRole={userRole}
      user={user}
      onSearch={handleSearch}
      searchPlaceholder="Search notifications..."
      showAddButton={false}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 
                ? `${unreadCount} unread notifications` 
                : "All caught up!"
              }
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({notifications.length})
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filter === 'read' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('read')}
              >
                Read ({notifications.length - unreadCount})
              </Button>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                
                return (
                  <Card 
                    key={notification.id} 
                    className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'message' ? 'bg-primary/10 text-primary' :
                          notification.type === 'viewing' ? 'bg-trust-medium/10 text-trust-medium' :
                          notification.type === 'payment' ? 'bg-trust-high/10 text-trust-high' :
                          notification.type === 'property' ? 'bg-accent/10 text-accent-foreground' :
                          notification.type === 'trust' ? 'bg-trust-high/10 text-trust-high' :
                          'bg-secondary/10 text-secondary-foreground'
                        }`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold">{notification.title}</h4>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Badge variant="default" className="h-2 w-2 p-0 rounded-full bg-primary">
                                </Badge>
                              )}
                              <span className="text-sm text-muted-foreground">
                                {notification.timestamp}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center gap-2">
                            {notification.action && (
                              <Button size="sm" variant="outline">
                                {notification.action.label}
                              </Button>
                            )}
                            {!notification.read && (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredNotifications.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {filter === 'unread' ? 'No unread notifications' : 'No notifications found'}
                    </h3>
                    <p className="text-muted-foreground">
                      {filter === 'unread' 
                        ? "You're all caught up! Check back later for updates."
                        : "Try adjusting your filter to see more notifications."
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(preferences).map(([category, settings]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-semibold capitalize">{category.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="grid grid-cols-3 gap-4 pl-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Email</span>
                        </div>
                        <Switch
                          checked={settings.email}
                          onCheckedChange={(checked) => 
                            updatePreference(category as keyof NotificationPreferences, 'email', checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Push</span>
                        </div>
                        <Switch
                          checked={settings.push}
                          onCheckedChange={(checked) => 
                            updatePreference(category as keyof NotificationPreferences, 'push', checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">SMS</span>
                        </div>
                        <Switch
                          checked={settings.sms}
                          onCheckedChange={(checked) => 
                            updatePreference(category as keyof NotificationPreferences, 'sms', checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}