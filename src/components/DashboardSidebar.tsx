import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Home,
  Building,
  Users,
  Shield,
  DollarSign,
  MessageSquare,
  Settings,
  BarChart3,
  MapPin,
  FileText,
  Calendar,
  Bell,
  LogOut
} from "lucide-react";

interface DashboardSidebarProps {
  userRole?: 'buyer' | 'seller' | 'agent' | 'admin';
  user?: {
    name: string;
    email: string;
    avatar: string;
    trustScore: number;
  };
}

export function DashboardSidebar({ 
  userRole = 'buyer',
  user = {
    name: "John Doe",
    email: "john@example.com", 
    avatar: "/placeholder.svg",
    trustScore: 87
  }
}: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  // Role-based navigation items
  const getNavigationItems = () => {
    const commonItems = [
      { title: "Dashboard", url: "/dashboard", icon: Home },
      { title: "Properties", url: "/dashboard/properties", icon: Building },
      { title: "Messages", url: "/dashboard/messages", icon: MessageSquare },
      { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
      { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
    ];

    const roleSpecificItems = {
      buyer: [
        { title: "Saved Properties", url: "/dashboard/saved", icon: Building },
        { title: "My Listings", url: "/dashboard/listings", icon: FileText },
        { title: "Trust Score", url: "/dashboard/trust", icon: Shield },
      ],
      seller: [
        { title: "My Listings", url: "/dashboard/listings", icon: FileText },
        { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
        { title: "Payments", url: "/dashboard/payments", icon: DollarSign },
      ],
      agent: [
        { title: "Clients", url: "/dashboard/clients", icon: Users },
        { title: "Listings", url: "/dashboard/agent-listings", icon: Building },
        { title: "Commission", url: "/dashboard/commission", icon: DollarSign },
        { title: "Performance", url: "/dashboard/performance", icon: BarChart3 },
      ],
      admin: [
        { title: "Listings", url: "/admin/listings", icon: FileText },
        { title: "Inquiries", url: "/admin/inquiries", icon: MessageSquare },
        { title: "Users", url: "/admin/users", icon: Users },
        { title: "Reports", url: "/admin/reports", icon: BarChart3 },
        { title: "System", url: "/admin/system", icon: Settings },
      ]
    };

    return [...commonItems, ...roleSpecificItems[userRole]];
  };

  const navigationItems = getNavigationItems();
  const isExpanded = navigationItems.some((item) => isActive(item.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive';
      case 'agent': return 'bg-trust-medium';
      case 'seller': return 'bg-primary';
      default: return 'bg-trust-high';
    }
  };

  const getRoleLabel = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} border-r border-sidebar-border bg-sidebar`}
    >
      <SidebarContent className="flex flex-col h-full">
        {/* User Profile Section */}
        {!collapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className={`${getRoleColor(userRole)} text-white text-xs`}>
                {getRoleLabel(userRole)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Trust: {user.trustScore}%
              </Badge>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/80">
              {!collapsed && "Navigation"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={({ isActive }) => `
                          flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                          ${getNavCls({ isActive })}
                        `}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span className="truncate">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink 
                  to="/dashboard/settings" 
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${getNavCls({ isActive })}
                  `}
                >
                  <Settings className="h-4 w-4" />
                  {!collapsed && <span>Settings</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-3 py-2 h-auto text-sidebar-foreground hover:bg-sidebar-accent/50"
                  onClick={() => {
                    // Handle logout - would redirect to signin
                    window.location.href = '/signin';
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  {!collapsed && <span>Logout</span>}
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}