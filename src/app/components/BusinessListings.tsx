import { motion } from 'motion/react';
import { Search, MapPin, Star, ArrowRight, GraduationCap, Sparkles, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Services'
];

const featuredBusinesses = [
  {
    name: 'TechVision Solutions',
    category: 'Technology',
    rating: 4.8,
    reviews: 234,
    location: 'San Francisco, CA',
    description: 'Leading software development and IT consulting firm',
    isHuseAlumni: true,
    huseCollege: 'MIT',
    communityCampaign: {
      supporters: 127,
      goalPercentage: 65
    }
  },
  {
    name: 'HealthCare Plus',
    category: 'Healthcare',
    rating: 4.9,
    reviews: 412,
    location: 'New York, NY',
    description: 'Comprehensive healthcare services and medical consulting',
    communityCampaign: {
      supporters: 89,
      goalPercentage: 45
    }
  },
  {
    name: 'FinanceHub',
    category: 'Finance',
    rating: 4.7,
    reviews: 189,
    location: 'London, UK',
    description: 'Expert financial advisory and support services',
    isHuseAlumni: true,
    huseCollege: 'Stanford',
    communityCampaign: {
      supporters: 203,
      goalPercentage: 87
    }
  }
];

export function BusinessListings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    console.log('Selected category:', category);
  };

  const handleViewDetails = (businessName: string) => {
    console.log('Viewing details for:', businessName);
    // Navigate to business detail page or show modal
    navigate(`/business/${businessName}`);
  };

  return (
    <section id="business-listings" className="relative py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-4">
            Explore <span className="text-[#05997F]">Business Listings</span>
          </h2>
          <p className="text-gray-400 text-[18px] max-w-2xl mx-auto">
            Discover and connect with verified businesses across various industries
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative bg-[#0a0a0a] rounded-[20px] border border-[#24c6dc]/30 p-2 flex items-center gap-2">
            <Search className="text-[#24c6dc] ml-4" size={24} />
            <input 
              type="text" 
              placeholder="Search for businesses, services, or industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-transparent text-white placeholder:text-gray-500 outline-none px-2 py-3"
            />
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-8 py-3 rounded-[15px] hover:shadow-[0_0_20px_rgba(36,198,220,0.4)] transition-all"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <button 
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2 rounded-full border transition-all ${
                selectedCategory === category
                  ? 'bg-[#24c6dc]/20 border-[#24c6dc] text-[#24c6dc]'
                  : 'bg-[#0a0a0a] border-[#24c6dc]/30 text-white hover:border-[#24c6dc] hover:bg-[#24c6dc]/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Businesses */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBusinesses.map((business, index) => (
            <motion.div
              key={index}
              className="group bg-[#0a0a0a] rounded-[20px] border border-[#24c6dc]/20 overflow-hidden hover:border-[#24c6dc]/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Business Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-[#24c6dc]/20 to-[#05997F]/20 flex items-center justify-center relative">
                <div className="text-[48px] font-bold text-white/20">
                  {business.name.charAt(0)}
                </div>
                {/* HUSE Circle Alumni Badge */}
                {business.isHuseAlumni && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-[11px] font-bold">
                    <GraduationCap size={12} />
                    <span>HUSE Alumni</span>
                    <Sparkles size={10} />
                  </div>
                )}
                {/* Community Backed Badge */}
                {business.communityCampaign && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a0a0a]/90 border border-[#F59E0B]/40 text-[#F59E0B] text-[11px] font-bold backdrop-blur-sm">
                    <Users size={12} />
                    <span>{business.communityCampaign.supporters}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white text-[20px] font-bold">
                      {business.name}
                    </h3>
                    {business.isHuseAlumni && (
                      <p className="text-[#8B5CF6] text-[11px] mt-1">Born from {business.huseCollege} innovation</p>
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#05997F]/20 text-[#05997F] text-[12px]">
                    {business.category}
                  </span>
                </div>

                <p className="text-gray-400 text-[14px] mb-4">
                  {business.description}
                </p>

                {/* Community Campaign Progress */}
                {business.communityCampaign && (
                  <div className="mb-4 p-3 rounded-[10px] bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 border border-[#8B5CF6]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#8B5CF6] text-[12px] font-bold">Community Support</span>
                      <span className="text-white text-[12px] font-bold">{business.communityCampaign.goalPercentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#111] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                        style={{ width: `${business.communityCampaign.goalPercentage}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4 text-[14px]">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                    <span className="text-white font-bold">{business.rating}</span>
                    <span className="text-gray-400">({business.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <MapPin size={16} />
                    <span>{business.location}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleViewDetails(business.name)}
                  className="w-full py-2 rounded-[10px] bg-[#111] border border-[#24c6dc]/30 text-white hover:bg-[#24c6dc]/10 hover:border-[#24c6dc] transition-all flex items-center justify-center gap-2 group"
                >
                  View Details
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button 
            onClick={() => navigate('/all-business-listings')}
            className="bg-transparent text-white px-8 py-4 rounded-[15px] border-2 border-[#24c6dc] hover:bg-[#24c6dc]/10 transition-all inline-flex items-center gap-2"
          >
            View All Businesses
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}