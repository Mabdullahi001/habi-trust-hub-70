import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Shield, Zap, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern real estate properties" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-white/20">
            <Shield className="w-4 h-4 text-trust-high" />
            <span className="text-sm font-medium">Blockchain-Verified Properties</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Real Estate
            <span className="block bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Built on Trust
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            AI-powered fraud detection, blockchain verification, and escrow-secured payments. 
            Experience the future of property transactions.
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-strong max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input 
                  placeholder="Search by location, property type, or agent..."
                  className="h-12 text-lg border-none bg-transparent"
                />
              </div>
              <Select>
                <SelectTrigger className="h-12 border-none bg-transparent">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="short-stay">Short Stay</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg" className="h-12 bg-gradient-primary text-white font-semibold">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <Shield className="w-8 h-8 text-trust-high" />
              <div className="text-left">
                <div className="font-semibold">Property Passport™</div>
                <div className="text-sm text-gray-300">Blockchain Verified</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <Zap className="w-8 h-8 text-yellow-400" />
              <div className="text-left">
                <div className="font-semibold">AI Fraud Detection</div>
                <div className="text-sm text-gray-300">Real-time Protection</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <Award className="w-8 h-8 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Escrow Secured</div>
                <div className="text-sm text-gray-300">Protected Payments</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full animate-float"></div>
      <div className="absolute bottom-32 right-16 w-12 h-12 bg-trust-high/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-8 w-8 h-8 bg-yellow-400/40 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default HeroSection;