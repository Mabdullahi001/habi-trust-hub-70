import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Home, 
  Search, 
  Shield, 
  User, 
  Bell,
  LogIn
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-soft">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Habi360</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/buy" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Buy
            </Link>
            <Link to="/rent" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Rent
            </Link>
            <Link to="/short-stay" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Short Stay
            </Link>
            <Link to="/agents" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Agents
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Properties
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Admin
            </Link>
            <Link to="/agent-dashboard" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Agent Dashboard
            </Link>
            <div className="flex items-center gap-2 text-trust-high">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Link to="/notifications">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link to="/join">
              <Button size="sm" className="bg-gradient-primary">
                <User className="w-4 h-4 mr-2" />
                Join
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/buy" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">
                Buy
              </Link>
              <Link to="/rent" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">
                Rent
              </Link>
              <Link to="/short-stay" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">
                Short Stay
              </Link>
              <Link to="/agents" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">
                Agents
              </Link>
              <Link to="/properties" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">
                Properties
              </Link>
              <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">
                Admin
              </Link>
              <Link to="/agent-dashboard" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">
                Agent Dashboard
              </Link>
              <Link to="/notifications" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">
                Notifications
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                <Link to="/signin" className="flex-1 mr-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/join" className="flex-1">
                  <Button size="sm" className="w-full bg-gradient-primary">
                    Join
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;