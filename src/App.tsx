import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import ShortStay from "./pages/ShortStay";
import Agents from "./pages/Agents";
import Join from "./pages/Join";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { AgentDashboard } from "./components/AgentDashboard";
import DashboardProperties from "./pages/dashboard/Properties";
import DashboardMessages from "./pages/dashboard/Messages";
import DashboardCalendar from "./pages/dashboard/Calendar";
import DashboardNotifications from "./pages/dashboard/Notifications";
import DashboardTrust from "./pages/dashboard/Trust";
import DashboardSettings from "./pages/dashboard/Settings";
import DashboardListings from "./pages/dashboard/Listings";
import ScheduleViewing from "./pages/ScheduleViewing";
import BookShortStay from "./pages/BookShortStay";
import ViewDetails from "./pages/ViewDetails";
import ViewAllProperties from "./pages/ViewAllProperties";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/short-stay" element={<ShortStay />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/join" element={<Join />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/properties" element={<DashboardProperties />} />
          <Route path="/dashboard/messages" element={<DashboardMessages />} />
          <Route path="/dashboard/calendar" element={<DashboardCalendar />} />
          <Route path="/dashboard/notifications" element={<DashboardNotifications />} />
          <Route path="/dashboard/saved" element={<DashboardProperties />} />
          <Route path="/dashboard/listings" element={<DashboardListings />} />
          <Route path="/dashboard/trust" element={<DashboardTrust />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/schedule-viewing" element={<ScheduleViewing />} />
          <Route path="/book-short-stay" element={<BookShortStay />} />
          <Route path="/property/:id" element={<ViewDetails />} />
          <Route path="/properties" element={<ViewAllProperties />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
