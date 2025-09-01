import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PropertyListings from "@/components/PropertyListings";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PropertyListings />
      <Footer />
    </div>
  );
};

export default Index;
