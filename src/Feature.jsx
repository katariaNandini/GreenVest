import React from 'react';
import { 
  BarChart3, 
  Leaf, 
  LineChart,
  Newspaper,
  Users
} from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon }) => (
  <div className="p-6 border border-gray-700 rounded-lg bg-gray-900 shadow-sm 
                  hover:shadow-lg transition-all duration-300 hover:scale-105 
                  hover:border-green-500/50 group">
    <div className="flex items-center mb-4">
      <div className="p-2 bg-green-900/50 rounded-lg group-hover:bg-green-900/70 
                      transition-all duration-300">
        <Icon className="h-6 w-6 text-green-400 group-hover:text-green-300" />
      </div>
    </div>
    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-green-400 
                   transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
      {description}
    </p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Leaf,
      title: "Sustainability Score System",
      description: "Track and measure the environmental impact of your investments with our comprehensive sustainability scoring system."
    },
    {
      icon: BarChart3,
      title: "Portfolio Carbon Footprint Analysis",
      description: "Monitor and analyze the carbon footprint of your investment portfolio with detailed metrics and insights."
    },
    {
      icon: LineChart,
      title: "Green Mutual Fund Suggestions",
      description: "Discover and compare eco-friendly mutual funds tailored to your investment goals and sustainability preferences."
    },
    {
      icon: Newspaper,
      title: "Live Green Investment News",
      description: "Stay informed with real-time updates on sustainable investments, market trends, and environmental policies."
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with like-minded investors, share insights, and learn from others committed to sustainable investing."
    }
  ];

  return (
    <div className="w-screen bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 mt-6 
                         bg-gradient-to-r from-green-400 to-green-600 
                         bg-clip-text text-transparent">
            Sustainable Investment Features
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Empowering your journey towards sustainable investing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 
                        sm:gap-8 md:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
