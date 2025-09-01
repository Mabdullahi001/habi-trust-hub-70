import PropertyCard from "./PropertyCard";

const PropertyListings = () => {
  // Sample data - in real app this would come from API
  const properties = [
    {
      id: "1",
      title: "Modern Downtown Apartment",
      location: "Victoria Island, Lagos",
      price: "₦2.5M/month",
      type: "Apartment",
      beds: 3,
      baths: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      trustScore: 95,
      isVerified: true,
      rating: 4.8,
      reviews: 24,
      agent: {
        name: "Sarah Johnson",
        verified: true
      }
    },
    {
      id: "2",
      title: "Luxury Family Home",
      location: "Ikoyi, Lagos",
      price: "₦85M",
      type: "House",
      beds: 5,
      baths: 4,
      sqft: 2800,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      trustScore: 88,
      isVerified: true,
      rating: 4.9,
      reviews: 18,
      agent: {
        name: "Michael Chen",
        verified: true
      }
    },
    {
      id: "3",
      title: "Beachfront Short Stay",
      location: "Lekki, Lagos",
      price: "₦35K/night",
      type: "Villa",
      beds: 4,
      baths: 3,
      sqft: 2200,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      trustScore: 92,
      isVerified: true,
      rating: 4.7,
      reviews: 56,
      agent: {
        name: "Emma Rodriguez",
        verified: true
      }
    },
    {
      id: "4",
      title: "Cozy Studio Space",
      location: "Yaba, Lagos",
      price: "₦850K/month",
      type: "Studio",
      beds: 1,
      baths: 1,
      sqft: 600,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      trustScore: 78,
      isVerified: true,
      rating: 4.5,
      reviews: 12,
      agent: {
        name: "David Park",
        verified: false
      }
    },
    {
      id: "5",
      title: "Executive Penthouse",
      location: "Banana Island, Lagos",
      price: "₦150M",
      type: "Penthouse",
      beds: 6,
      baths: 5,
      sqft: 3500,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      trustScore: 97,
      isVerified: true,
      rating: 5.0,
      reviews: 8,
      agent: {
        name: "Lisa Thompson",
        verified: true
      }
    },
    {
      id: "6",
      title: "Garden Townhouse",
      location: "Gbagada, Lagos",
      price: "₦45M",
      type: "Townhouse",
      beds: 4,
      baths: 3,
      sqft: 1800,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      trustScore: 85,
      isVerified: true,
      rating: 4.6,
      reviews: 31,
      agent: {
        name: "James Wilson",
        verified: true
      }
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover verified, AI-secured properties with blockchain authenticity guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;