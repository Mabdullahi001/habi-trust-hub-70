import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardOverview } from "@/components/DashboardOverview";

const Dashboard = () => {
  const [userRole] = useState<'buyer' | 'seller' | 'agent' | 'admin'>("buyer");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock user data - in real app this would come from auth context
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    trustScore: 87
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Handle search logic here
    console.log("Searching for:", query);
  };

  const handleAddNew = () => {
    // Handle add new action based on user role
    const actions = {
      buyer: () => window.location.href = '/buy',
      seller: () => window.location.href = '/dashboard/add-listing',
      agent: () => window.location.href = '/dashboard/add-client',
      admin: () => window.location.href = '/dashboard/create-report'
    };
    actions[userRole]?.();
  };

  const getSearchPlaceholder = () => {
    const placeholders = {
      buyer: "Search properties, locations, agents...",
      seller: "Search your listings, analytics, buyers...",
      agent: "Search clients, properties, deals...",
      admin: "Search users, properties, reports..."
    };
    return placeholders[userRole];
  };

  const getAddButtonText = () => {
    const labels = {
      buyer: "Search Properties",
      seller: "Add Listing", 
      agent: "Add Client",
      admin: "Create Report"
    };
    return labels[userRole];
  };

  return (
    <DashboardLayout
      userRole={userRole}
      user={user}
      onSearch={handleSearch}
      searchPlaceholder={getSearchPlaceholder()}
      showAddButton={true}
      onAddNew={handleAddNew}
      addButtonText={getAddButtonText()}
    >
      <DashboardOverview 
        userRole={userRole} 
        userName={user.name.split(' ')[0]} 
      />
    </DashboardLayout>
  );
};

export default Dashboard;