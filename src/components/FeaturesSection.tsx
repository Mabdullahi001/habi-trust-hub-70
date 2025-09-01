import { Shield, Zap, Lock, Eye, Brain, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Property Passport™",
      description: "Blockchain-backed verification with immutable ownership history and authenticity records.",
      color: "text-trust-high",
      bgColor: "bg-trust-high/10"
    },
    {
      icon: Brain,
      title: "AI Fraud Detection",
      description: "Real-time analysis of images, pricing, and content to catch suspicious listings instantly.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Lock,
      title: "Escrow-Secured Payments",
      description: "Funds held safely until transaction completion, protecting both buyers and sellers.",
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      icon: Eye,
      title: "Zero-Knowledge KYC",
      description: "Privacy-preserving identity verification without exposing sensitive personal data.",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Zap,
      title: "Dynamic Trust Scoring",
      description: "Composite trust scores (0-100) combining AI signals and blockchain verification data.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Globe,
      title: "GeoSmart Feeds",
      description: "Location-based personalized property recommendations using advanced geohash technology.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trust-First Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our cutting-edge platform combines AI, blockchain, and security innovations 
            to create the most trusted real estate experience in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-strong transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Stats */}
        <div className="mt-20 bg-white rounded-3xl p-8 shadow-medium">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-gray-600">Fraud Reduction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-trust-high mb-2">10K+</div>
              <div className="text-gray-600">Verified Properties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Trusted Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
              <div className="text-gray-600">AI Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;