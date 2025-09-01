import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardSidebar } from "./DashboardSidebar";
import { Search, Plus, Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: 'buyer' | 'seller' | 'agent' | 'admin';
  user?: {
    name: string;
    email: string;
    avatar: string;
    trustScore: number;
  };
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  showAddButton?: boolean;
  onAddNew?: () => void;
  addButtonText?: string;
}

export function DashboardLayout({ 
  children, 
  userRole = 'buyer',
  user,
  onSearch,
  searchPlaceholder = "Search properties, locations, agents...",
  showAddButton = false,
  onAddNew,
  addButtonText = "Add New"
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar userRole={userRole} user={user} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="h-full px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Menu className="h-4 w-4" />
                </Button>
                
                {/* Search Bar */}
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={searchPlaceholder}
                    className="pl-9 bg-background/50"
                    onChange={(e) => onSearch?.(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {showAddButton && (
                  <Button onClick={onAddNew} className="gap-2">
                    <Plus className="h-4 w-4" />
                    {addButtonText}
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}