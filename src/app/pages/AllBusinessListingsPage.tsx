import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, LogOut, LayoutDashboard, Building2, Search,
  Filter, TrendingUp, MapPin, Calendar, Users,
  DollarSign, Clock, Star, ArrowUpRight, Heart,
  Briefcase, Target, Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { Footer } from '../components/Footer';

// Extended mock businesses data
const mockBusinesses = [
  {
    id: 1,
    name: 'TechVenture AI',
    logo: '🤖',
    tagline: 'Building the future of AI-powered automation',
    location: 'Bangalore, India',
    stage: 'Series A',
    fundingGoal: 5000000,
    currentFunding: 3250000,
    contributors: 127,
    category: 'Technology',
    founded: '2023',
    seeking: ['Financial Contributors', 'AI Engineers', 'Marketing'],
    highlights: ['50% revenue growth', 'Fortune 500 clients', 'Patent pending'],
    rating: 4.8
  },
  {
    id: 2,
    name: 'EcoGreen Solutions',
    logo: '🌱',
    tagline: 'Sustainable packaging for a greener tomorrow',
    location: 'Mumbai, India',
    stage: 'Seed',
    fundingGoal: 1500000,
    currentFunding: 875000,
    contributors: 64,
    category: 'Sustainability',
    founded: '2024',
    seeking: ['Financial Contributors', 'Supply Chain Experts', 'UI/UX Designers'],
    highlights: ['Carbon negative', '1M+ plastic bottles saved', 'B Corp certified'],
    rating: 4.9
  },
  {
    id: 3,
    name: 'FoodHub Delivery',
    logo: '🍔',
    tagline: 'Hyperlocal food delivery in 15 minutes',
    location: 'Delhi, India',
    stage: 'Series B',
    fundingGoal: 10000000,
    currentFunding: 7500000,
    contributors: 215,
    category: 'Food & Beverage',
    founded: '2022',
    seeking: ['Financial Contributors', 'Operations Managers', 'Mobile Developers'],
    highlights: ['15min avg delivery', '12 cities live', '10K+ orders/day'],
    rating: 4.6
  },
  {
    id: 4,
    name: 'FinTrack Pro',
    logo: '💰',
    tagline: 'Personal finance made simple for millennials',
    location: 'Pune, India',
    stage: 'Pre-Seed',
    fundingGoal: 800000,
    currentFunding: 320000,
    contributors: 42,
    category: 'Fintech',
    founded: '2024',
    seeking: ['Financial Contributors', 'Backend Engineers', 'Content Writers'],
    highlights: ['50K+ downloads', '4.7★ rating', 'RBI compliant'],
    rating: 4.7
  },
  {
    id: 5,
    name: 'HealthCare Connect',
    logo: '🏥',
    tagline: 'Connecting patients with doctors instantly',
    location: 'Chennai, India',
    stage: 'Seed',
    fundingGoal: 2000000,
    currentFunding: 1100000,
    contributors: 89,
    category: 'Healthcare',
    founded: '2023',
    seeking: ['Financial Contributors', 'Healthcare Consultants', 'Mobile Developers'],
    highlights: ['500+ doctors', '24/7 availability', 'ISO certified'],
    rating: 4.8
  },
  {
    id: 6,
    name: 'EduLearn Platform',
    logo: '📚',
    tagline: 'Interactive learning for K-12 students',
    location: 'Hyderabad, India',
    stage: 'Series A',
    fundingGoal: 4000000,
    currentFunding: 2800000,
    contributors: 156,
    category: 'EdTech',
    founded: '2022',
    seeking: ['Financial Contributors', 'Content Creators', 'Product Designers'],
    highlights: ['1M+ students', '95% satisfaction', 'Award winning'],
    rating: 4.9
  },
  {
    id: 7,
    name: 'FashionFusion',
    logo: '👗',
    tagline: 'Personalized fashion recommendations using AI',
    location: 'Bangalore, India',
    stage: 'Seed',
    fundingGoal: 1200000,
    currentFunding: 650000,
    contributors: 73,
    category: 'Fashion',
    founded: '2023',
    seeking: ['Financial Contributors', 'Fashion Stylists', 'ML Engineers'],
    highlights: ['AI-powered', '200+ brands', 'Celebrity endorsed'],
    rating: 4.5
  },
  {
    id: 8,
    name: 'SmartHome Innovations',
    logo: '🏠',
    tagline: 'IoT solutions for modern Indian homes',
    location: 'Mumbai, India',
    stage: 'Pre-Seed',
    fundingGoal: 900000,
    currentFunding: 450000,
    contributors: 51,
    category: 'IoT',
    founded: '2024',
    seeking: ['Financial Contributors', 'IoT Engineers', 'Product Managers'],
    highlights: ['5K+ installations', 'Energy efficient', 'Voice controlled'],
    rating: 4.6
  },
  {
    id: 9,
    name: 'TravelMate AI',
    logo: '✈️',
    tagline: 'AI-powered travel planning and booking',
    location: 'Goa, India',
    stage: 'Seed',
    fundingGoal: 1800000,
    currentFunding: 1200000,
    contributors: 94,
    category: 'Travel',
    founded: '2023',
    seeking: ['Financial Contributors', 'Travel Experts', 'App Developers'],
    highlights: ['50+ destinations', 'Instant booking', '4.8★ reviews'],
    rating: 4.8
  },
  {
    id: 10,
    name: 'AgroTech Solutions',
    logo: '🌾',
    tagline: 'Empowering farmers with technology',
    location: 'Indore, India',
    stage: 'Series A',
    fundingGoal: 3500000,
    currentFunding: 2450000,
    contributors: 112,
    category: 'AgriTech',
    founded: '2022',
    seeking: ['Financial Contributors', 'Agriculture Experts', 'Data Scientists'],
    highlights: ['10K+ farmers', '30% yield increase', 'Govt recognized'],
    rating: 4.9
  },
  {
    id: 11,
    name: 'PetCare Plus',
    logo: '🐾',
    tagline: 'Complete healthcare solutions for pets',
    location: 'Bangalore, India',
    stage: 'Pre-Seed',
    fundingGoal: 700000,
    currentFunding: 280000,
    contributors: 38,
    category: 'Pet Care',
    founded: '2024',
    seeking: ['Financial Contributors', 'Veterinarians', 'Customer Support'],
    highlights: ['24/7 vet support', '100+ vets', 'Pet insurance'],
    rating: 4.7
  },
  {
    id: 12,
    name: 'CleanTech Energy',
    logo: '⚡',
    tagline: 'Renewable energy for urban households',
    location: 'Delhi, India',
    stage: 'Seed',
    fundingGoal: 2500000,
    currentFunding: 1625000,
    contributors: 103,
    category: 'CleanTech',
    founded: '2023',
    seeking: ['Financial Contributors', 'Energy Consultants', 'Sales Team'],
    highlights: ['Solar powered', '40% savings', 'Zero emissions'],
    rating: 4.8
  }
];

const categories = ['All', 'Technology', 'Sustainability', 'Food & Beverage', 'Fintech', 'Healthcare', 'EdTech', 'Fashion', 'IoT', 'Travel', 'AgriTech', 'Pet Care', 'CleanTech'];
const stages = ['All', 'Pre-Seed', 'Seed', 'Series A', 'Series B'];

export function AllBusinessListingsPage() {
  const navigate = useNavigate();
  const [contributorUser, setContributorUser] = useState<any>(null);
  const [notifications] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'funding'>('trending');

  useEffect(() => {
    const storedUser = localStorage.getItem('dofractoBuilderUser');
    if (storedUser) {
      setContributorUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dofractoBuilderUser');
    setContributorUser(null);
    navigate('/dofracto/builder/login');
  };

  // Filter and sort businesses
  const filteredBusinesses = mockBusinesses
    .filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          business.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
      const matchesStage = selectedStage === 'All' || business.stage === selectedStage;
      return matchesSearch && matchesCategory && matchesStage;
    })
    .sort((a, b) => {
      if (sortBy === 'trending') return b.contributors - a.contributors;
      if (sortBy === 'funding') return (b.currentFunding / b.fundingGoal) - (a.currentFunding / a.fundingGoal);
      return 0; // newest - would use date if available
    });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="bg-[#111] border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-6 h-[80px] flex items-center justify-between">
          <button 
            onClick={() => navigate('/dofracto')}
            className="flex items-center group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-[#24c6dc] to-[#05997F] bg-clip-text text-transparent">
              Dofracto
            </span>
          </button>

          {contributorUser && (
            <>
              <div className="hidden md:flex items-center gap-3 bg-black/50 p-2 rounded-xl border border-white/10">
                <button
                  className="px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white shadow-lg shadow-cyan-500/30"
                >
                  <Building2 className="w-4 h-4" />
                  Business Listings
                </button>
                <button
                  onClick={() => navigate('/contributor-dashboard')}
                  className="px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl">{contributorUser.avatar}</div>
                  <div className="hidden md:block">
                    <p className="font-medium">{contributorUser.name}</p>
                    <p className="text-xs text-gray-400">{contributorUser.role}</p>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="ml-2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] bg-clip-text text-transparent">
            Discover Businesses
          </h1>
          <p className="text-gray-400 text-lg">
            Explore {mockBusinesses.length} innovative businesses seeking contributors
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search businesses by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-[#111]">{cat}</option>
                ))}
              </select>
            </div>

            {/* Stage Filter */}
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Stage:</span>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
              >
                {stages.map(stage => (
                  <option key={stage} value={stage} className="bg-[#111]">{stage}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-400">Sort by:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('trending')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === 'trending'
                      ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Trending
                </button>
                <button
                  onClick={() => setSortBy('newest')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === 'newest'
                      ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSortBy('funding')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === 'funding'
                      ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Funding %
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-medium">{filteredBusinesses.length}</span> businesses
          </p>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all group cursor-pointer"
              onClick={() => navigate(`/dofracto/business/${business.id}`)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{business.logo}</div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-cyan-400 transition-colors">
                      {business.name}
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {business.location}
                    </p>
                  </div>
                </div>
                <button 
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to watchlist logic
                  }}
                >
                  <Heart className="w-5 h-5 text-gray-400 hover:text-pink-400" />
                </button>
              </div>

              {/* Tagline */}
              <p className="text-sm text-gray-400 mb-4">{business.tagline}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-black/30 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500 mb-1">Stage</p>
                  <p className="text-sm font-bold text-cyan-400">{business.stage}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500 mb-1">Contributors</p>
                  <p className="text-sm font-bold text-white">{business.contributors}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500 mb-1">Rating</p>
                  <p className="text-sm font-bold text-amber-400 flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {business.rating}
                  </p>
                </div>
              </div>

              {/* Funding Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">Funding Progress</span>
                  <span className="text-xs font-medium text-cyan-400">
                    {Math.round((business.currentFunding / business.fundingGoal) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#24c6dc] to-[#05997F]"
                    style={{ width: `${(business.currentFunding / business.fundingGoal) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    ₹{(business.currentFunding / 100000).toFixed(1)}L raised
                  </span>
                  <span className="text-xs text-gray-500">
                    ₹{(business.fundingGoal / 100000).toFixed(1)}L goal
                  </span>
                </div>
              </div>

              {/* Seeking */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Currently Seeking:</p>
                <div className="flex flex-wrap gap-1">
                  {business.seeking.slice(0, 2).map((role, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
                      {role}
                    </span>
                  ))}
                  {business.seeking.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded-full">
                      +{business.seeking.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <button 
                className="w-full py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/dofracto/business/${business.id}`);
                }}
              >
                View Details
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBusinesses.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No businesses found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}