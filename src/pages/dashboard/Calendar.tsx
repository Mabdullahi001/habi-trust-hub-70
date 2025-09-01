import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Building,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  type: 'viewing' | 'meeting' | 'inspection' | 'closing' | 'call';
  date: Date;
  time: string;
  duration: string;
  location: string;
  client?: string;
  property?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Property Viewing",
    type: "viewing",
    date: new Date(2024, 0, 15),
    time: "2:00 PM",
    duration: "1 hour",
    location: "Modern Villa, Lekki Phase 1",
    client: "Sarah Johnson",
    property: "Modern Villa in Lekki",
    status: "confirmed",
    notes: "Bring ID and meet at main gate"
  },
  {
    id: "2", 
    title: "Client Meeting",
    type: "meeting",
    date: new Date(2024, 0, 16),
    time: "10:00 AM", 
    duration: "30 mins",
    location: "Habi360 Office, VI",
    client: "Michael Chen",
    status: "scheduled",
    notes: "Discuss financing options"
  },
  {
    id: "3",
    title: "Property Inspection",
    type: "inspection", 
    date: new Date(2024, 0, 18),
    time: "3:00 PM",
    duration: "2 hours",
    location: "Luxury Apartment, Victoria Island",
    client: "Ada Williams",
    property: "Luxury Apartment VI",
    status: "scheduled",
    notes: "Final walkthrough before closing"
  },
  {
    id: "4",
    title: "Follow-up Call",
    type: "call",
    date: new Date(2024, 0, 20),
    time: "11:00 AM",
    duration: "15 mins", 
    location: "Phone Call",
    client: "John Smith",
    status: "scheduled"
  }
];

export default function DashboardCalendar() {
  const [userRole] = useState<'buyer' | 'seller' | 'agent' | 'admin'>("buyer");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [filterType, setFilterType] = useState<string>('all');
  
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    trustScore: 87
  };

  const handleSearch = (query: string) => {
    console.log("Searching calendar:", query);
  };

  const handleAddEvent = () => {
    console.log("Add new event");
  };

  const getTodayEvents = () => {
    const today = new Date();
    return mockEvents.filter(event => 
      event.date.toDateString() === today.toDateString()
    );
  };

  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    return mockEvents.filter(event => 
      event.date.toDateString() === selectedDate.toDateString()
    );
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return mockEvents
      .filter(event => event.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'viewing': return 'bg-primary';
      case 'meeting': return 'bg-trust-medium';
      case 'inspection': return 'bg-trust-high';
      case 'closing': return 'bg-destructive';
      case 'call': return 'bg-accent';
      default: return 'bg-secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-trust-high';
      case 'scheduled': return 'bg-trust-medium';
      case 'completed': return 'bg-secondary';
      case 'cancelled': return 'bg-destructive';
      default: return 'bg-secondary';
    }
  };

  const EventCard = ({ event }: { event: CalendarEvent }) => (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge className={`${getEventTypeColor(event.type)} text-white text-xs`}>
              {event.type}
            </Badge>
            <Badge variant="outline" className={`${getStatusColor(event.status)} text-white text-xs`}>
              {event.status}
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">{event.time}</span>
        </div>
        
        <h4 className="font-semibold mb-2">{event.title}</h4>
        
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{event.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          {event.client && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{event.client}</span>
            </div>
          )}
          {event.property && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>{event.property}</span>
            </div>
          )}
        </div>
        
        {event.notes && (
          <div className="mt-2 p-2 bg-secondary rounded text-sm">
            <strong>Notes:</strong> {event.notes}
          </div>
        )}
        
        <div className="flex gap-2 mt-3">
          <Button size="sm" variant="outline">Edit</Button>
          {event.status === 'scheduled' && (
            <Button size="sm" variant="outline">Confirm</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const todayEvents = getTodayEvents();
  const selectedEvents = getSelectedDateEvents();
  const upcomingEvents = getUpcomingEvents();

  return (
    <DashboardLayout
      userRole={userRole}
      user={user}
      onSearch={handleSearch}
      searchPlaceholder="Search events, clients, properties..."
      showAddButton={true}
      onAddNew={handleAddEvent}
      addButtonText="Add Event"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">
              {todayEvents.length > 0 
                ? `${todayEvents.length} events today` 
                : "No events scheduled for today"
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('day')}
            >
              Day
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Today's Events</p>
                  <p className="text-2xl font-bold">{todayEvents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-trust-medium" />
                <div>
                  <p className="text-sm text-muted-foreground">Property Viewings</p>
                  <p className="text-2xl font-bold">
                    {mockEvents.filter(e => e.type === 'viewing').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-trust-high" />
                <div>
                  <p className="text-sm text-muted-foreground">Client Meetings</p>
                  <p className="text-2xl font-bold">
                    {mockEvents.filter(e => e.type === 'meeting').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">
                    {mockEvents.filter(e => {
                      const weekStart = new Date();
                      const weekEnd = new Date();
                      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                      weekEnd.setDate(weekEnd.getDate() + (6 - weekEnd.getDay()));
                      return e.date >= weekStart && e.date <= weekEnd;
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {selectedDate?.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              
              {selectedEvents.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-3">
                    Events for {selectedDate?.toLocaleDateString()}
                  </h4>
                  <div className="space-y-2">
                    {selectedEvents.map(event => (
                      <div key={event.id} className="p-3 bg-secondary rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={`${getEventTypeColor(event.type)} text-white text-xs`}>
                              {event.type}
                            </Badge>
                            <span className="font-medium">{event.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
                
                {upcomingEvents.length === 0 && (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">No upcoming events</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Schedule your next property viewing or client meeting
                    </p>
                    <Button onClick={handleAddEvent} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Event
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}