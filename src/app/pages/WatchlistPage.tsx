import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, User, LayoutDashboard, LogOut, Building2, 
  Star, MapPin, TrendingUp, Users, X, ChevronDown,
  Search, SlidersHorizontal, Sparkles, Heart, ArrowUpRight, DollarSign
} from 'lucide-react';
import { Footer } from '../components/Footer';

// Mock watchlist data
const mockWatchlist = [
  {
    id: 1,
    name: 'SmartHome Innovations',
    logo: '🏠',
    tagline: 'IoT solutions for modern Indian homes',
    location: 'Mumbai, India',
    stage: 'Pre-Seed',
    fundingGoal: 900000,
    currentFunding: 450000,
    contributors: 51,
    category: 'IoT',
    rating: 4.6,
    trendingScore: 85,
    recentUpdate: 'Just launched in 2 new cities',
    addedDate: '2 days ago'
  },
  {
    id: 2,
    name: 'TravelMate AI',
    logo: '✈️',
    tagline: 'AI-powered travel planning and booking',
    location: 'Goa, India',
    stage: 'Seed',
    fundingGoal: 1800000,
    currentFunding: 1200000,
    contributors: 94,
    category: 'Travel',
    rating: 4.8,
    trendingScore: 92,
    recentUpdate: 'Raised ₹2L in last 48 hours',
    addedDate: '5 days ago'
  },
  {
    id: 3,
    name: 'PetCare Plus',
    logo: '🐾',
    tagline: 'Complete healthcare solutions for pets',
    location: 'Bangalore, India',
    stage: 'Pre-Seed',
    fundingGoal: 700000,
    currentFunding: 280000,
    contributors: 38,
    category: 'Pet Care',
    rating: 4.7,
    trendingScore: 78,
    recentUpdate: 'Looking for veterinary consultants',
    addedDate: '1 week ago'
  },
  {
    id: 4,
    name: 'CleanTech Energy',
    logo: '⚡',
    tagline: 'Renewable energy for urban households',
    location: 'Delhi, India',
    stage: 'Seed',
    fundingGoal: 2500000,
    currentFunding: 1625000,
    contributors: 103,
    category: 'CleanTech',
    rating: 4.8,
    trendingScore: 88,
    recentUpdate: 'Achieved carbon neutrality',
    addedDate: '2 weeks ago'
  }
];

export function WatchlistPage() {
  const navigate = useNavigate();
  const [contributorUser, setContributorUser] = useState<any>(null);
  const [notifications] = useState(5);
  const [watchlist, setWatchlist] = useState(mockWatchlist);

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

  const removeFromWatchlist = (id: number) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

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
                  onClick={() => navigate('/dofracto/builder/hub')}
                  className="px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <Building2 className="w-4 h-4" />
                  Builders Hub
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/dofracto/notifications')}
                  className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-full flex items-center justify-center text-xs font-bold">
                      {notifications}
                    </span>
                  )}
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
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
            <Heart className="w-10 h-10 text-pink-400 fill-pink-400" />
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              My Watchlist
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Track businesses you're interested in • {watchlist.length} businesses saved
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-5 border border-pink-500/20">
            <p className="text-sm text-gray-400 mb-1">Businesses Tracked</p>
            <p className="text-3xl font-bold text-white">{watchlist.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-5 border border-green-500/20">
            <p className="text-sm text-gray-400 mb-1">Total Contributors</p>
            <p className="text-3xl font-bold text-white">
              {watchlist.reduce((sum, b) => sum + b.contributors, 0)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-xl p-5 border border-cyan-500/20">
            <p className="text-sm text-gray-400 mb-1">Avg Funding Progress</p>
            <p className="text-3xl font-bold text-white">
              {Math.round(watchlist.reduce((sum, b) => sum + (b.currentFunding / b.fundingGoal), 0) / watchlist.length * 100)}%
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-5 border border-amber-500/20">
            <p className="text-sm text-gray-400 mb-1">Avg Rating</p>
            <p className="text-3xl font-bold text-white flex items-center gap-2">
              <Star className="w-7 h-7 fill-amber-400 text-amber-400" />
              {(watchlist.reduce((sum, b) => sum + b.rating, 0) / watchlist.length).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Watchlist Grid */}
        <div className="space-y-4">
          <AnimatePresence>
            {watchlist.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left - Business Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-5xl">{business.logo}</div>
                        <div>
                          <h3 className="font-bold text-xl mb-1 group-hover:text-cyan-400 transition-colors">
                            {business.name}
                          </h3>
                          <p className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                            <MapPin className="w-3 h-3" />
                            {business.location}
                          </p>
                          <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
                            {business.category}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromWatchlist(business.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-all group/remove"
                        title="Remove from watchlist"
                      >
                        <X className="w-5 h-5 text-gray-400 group-hover/remove:text-red-400" />
                      </button>
                    </div>

                    <p className="text-gray-400 mb-4">{business.tagline}</p>

                    {/* Recent Update Alert */}
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-4 flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-amber-400 font-medium mb-1">Recent Update</p>
                        <p className="text-sm text-gray-300">{business.recentUpdate}</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Stage</p>
                        <p className="text-sm font-bold text-cyan-400">{business.stage}</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Contributors</p>
                        <p className="text-sm font-bold text-white flex items-center justify-center gap-1">
                          <Users className="w-3 h-3" />
                          {business.contributors}
                        </p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Rating</p>
                        <p className="text-sm font-bold text-amber-400 flex items-center justify-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {business.rating}
                        </p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Trending</p>
                        <p className="text-sm font-bold text-green-400">{business.trendingScore}%</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">
                      Added to watchlist {business.addedDate}
                    </p>
                  </div>

                  {/* Right - Funding Info & Actions */}
                  <div className="md:w-80 flex flex-col justify-between">
                    {/* Funding Progress */}
                    <div className="bg-black/30 rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-400">Funding Progress</span>
                        <span className="text-lg font-bold text-cyan-400">
                          {Math.round((business.currentFunding / business.fundingGoal) * 100)}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden mb-3">
                        <div 
                          className="h-full bg-gradient-to-r from-[#24c6dc] to-[#05997F]"
                          style={{ width: `${(business.currentFunding / business.fundingGoal) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Raised</p>
                          <p className="text-sm font-bold text-white">
                            ₹{(business.currentFunding / 100000).toFixed(1)}L
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Goal</p>
                          <p className="text-sm font-bold text-white">
                            ₹{(business.fundingGoal / 100000).toFixed(1)}L
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button 
                        onClick={() => navigate(`/dofracto/business/${business.id}`)}
                        className="w-full py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                      >
                        View Business
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Contribute Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {watchlist.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl font-bold mb-2">Your watchlist is empty</h3>
            <p className="text-gray-400 mb-6">
              Start tracking businesses you're interested in
            </p>
            <button
              onClick={() => navigate('/dofracto/discover')}
              className="px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all inline-flex items-center gap-2"
            >
              <Building2 className="w-5 h-5" />
              Discover Businesses
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}