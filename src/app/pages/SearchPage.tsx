import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, X, TrendingUp, Clock, Filter, ArrowRight,
  User, Briefcase, Target, MessageSquare, FileText, Rocket,
  MapPin, Tag, Calendar, Star, ExternalLink, UserPlus
} from 'lucide-react';
import { useSearch, SearchCategory } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../../lib/api';
import { toast } from 'sonner';

const CATEGORY_CONFIG = {
  all: { icon: Search, label: 'All', color: 'purple' },
  students: { icon: User, label: 'Students', color: 'pink' },
  startups: { icon: Rocket, label: 'Startups', color: 'cyan' },
  jobs: { icon: Briefcase, label: 'Jobs', color: 'blue' },
  opportunities: { icon: Target, label: 'Opportunities', color: 'green' },
  quotes: { icon: MessageSquare, label: 'Quotes', color: 'yellow' },
  posts: { icon: FileText, label: 'Posts', color: 'orange' },
  projects: { icon: Star, label: 'Projects', color: 'red' }
};

export function SearchPage() {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedCategory,
    setSelectedCategory,
    performSearch,
    clearSearch,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    popularSearches
  } = useSearch();

  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (localQuery) {
        performSearch(localQuery, selectedCategory);
        setSearchQuery(localQuery);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [localQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setLocalQuery(query);
    if (query.trim()) {
      addRecentSearch(query);
    }
  };

  const handleCategoryChange = (category: SearchCategory) => {
    setSelectedCategory(category);
    if (localQuery) {
      performSearch(localQuery, category);
    }
  };

  const handleResultClick = (url: string) => {
    navigate(url);
  };

  const handleConnect = async (studentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await apiPost('/connections/request', { toUserId: studentId });
      toast.success('Connection request sent!');
    } catch (err: any) {
      toast.error('Failed to connect: ' + err.message);
    }
  };

  const getPlatformBadgeColor = (platform?: string) => {
    switch (platform) {
      case 'huse': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'dofracto': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'quotify': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryIcon = (type: SearchCategory) => {
    const Icon = CATEGORY_CONFIG[type].icon;
    return <Icon size={18} />;
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowRight className="rotate-180" size={20} />
            <span>Back</span>
          </button>

          <h1 className="text-3xl font-bold text-white mb-2">Search Ecosystem</h1>
          <p className="text-gray-400">
            Search across HUSE Circle, Dofracto, and Quotify
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for students, startups, jobs, opportunities..."
              className="w-full pl-12 pr-12 py-4 bg-white/5 border border-purple-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              autoFocus
            />
            {localQuery && (
              <button
                onClick={() => {
                  setLocalQuery('');
                  clearSearch();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="text-gray-400" size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {(Object.keys(CATEGORY_CONFIG) as SearchCategory[]).map((category) => {
              const config = CATEGORY_CONFIG[category];
              const Icon = config.icon;
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{config.label}</span>
                  {isActive && searchResults.length > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                      {searchResults.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div>
          {!localQuery ? (
            /* Empty State - Show Recent & Popular */
            <div className="space-y-8">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white font-bold flex items-center gap-2">
                      <Clock size={20} className="text-purple-400" />
                      Recent Searches
                    </h2>
                    <button
                      onClick={clearRecentSearches}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {recentSearches.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(query)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all flex items-center gap-2 group"
                      >
                        <Clock size={14} className="text-gray-500 group-hover:text-purple-400" />
                        {query}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <h2 className="text-white font-bold mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-cyan-400" />
                  Popular Searches
                </h2>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(query)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/30 rounded-xl text-gray-300 hover:text-white transition-all flex items-center gap-2 group"
                    >
                      <TrendingUp size={14} className="text-cyan-400" />
                      {query}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h2 className="text-white font-bold mb-4">Quick Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <QuickLinkCard
                    icon={User}
                    title="Browse Students"
                    description="Discover talented students"
                    onClick={() => {
                      setSelectedCategory('students');
                      handleSearch('student');
                    }}
                    gradient="from-purple-500 to-pink-500"
                  />
                  <QuickLinkCard
                    icon={Rocket}
                    title="Explore Startups"
                    description="Find innovative startups"
                    onClick={() => {
                      setSelectedCategory('startups');
                      handleSearch('startup');
                    }}
                    gradient="from-cyan-500 to-blue-500"
                  />
                  <QuickLinkCard
                    icon={Briefcase}
                    title="Find Jobs"
                    description="Search open positions"
                    onClick={() => {
                      setSelectedCategory('jobs');
                      handleSearch('job');
                    }}
                    gradient="from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            </div>
          ) : isSearching ? (
            /* Loading State */
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                <span className="text-gray-400">Searching...</span>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            /* No Results */
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="text-gray-500" size={40} />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                Try different keywords or browse popular searches above
              </p>
              <button
                onClick={() => {
                  setLocalQuery('');
                  clearSearch();
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all"
              >
                Clear Search
              </button>
            </div>
          ) : (
            /* Search Results */
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Found <span className="text-white font-bold">{searchResults.length}</span> results
                  {selectedCategory !== 'all' && (
                    <span> in <span className="text-purple-400">{CATEGORY_CONFIG[selectedCategory].label}</span></span>
                  )}
                </p>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleResultClick(result.url)}
                      className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-2xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon/Image */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                          {result.image}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-white font-bold group-hover:text-purple-400 transition-colors">
                              {result.title}
                            </h3>
                            {getCategoryIcon(result.type)}
                          </div>

                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {result.description}
                          </p>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            {/* Platform Badge */}
                            {result.metadata?.platform && (
                              <span className={`px-3 py-1 rounded-full border font-medium ${getPlatformBadgeColor(result.metadata.platform)}`}>
                                {result.metadata.platform.toUpperCase()}
                              </span>
                            )}

                            {/* Author */}
                            {result.metadata?.author && (
                              <span className="text-gray-500 flex items-center gap-1">
                                <User size={12} />
                                {result.metadata.author}
                              </span>
                            )}

                            {/* Location */}
                            {result.metadata?.location && (
                              <span className="text-gray-500 flex items-center gap-1">
                                <MapPin size={12} />
                                {result.metadata.location}
                              </span>
                            )}

                            {/* Salary */}
                            {result.metadata?.salary && (
                              <span className="text-green-400 flex items-center gap-1">
                                💰 {result.metadata.salary}
                              </span>
                            )}

                            {/* Date */}
                            {result.metadata?.date && (
                              <span className="text-gray-500 flex items-center gap-1">
                                <Calendar size={12} />
                                {result.metadata.date}
                              </span>
                            )}

                            {/* Reputation */}
                            {result.metadata?.reputation && (
                              <span className="text-yellow-400 flex items-center gap-1">
                                <Star size={12} fill="currentColor" />
                                {result.metadata.reputation}
                              </span>
                            )}

                            {/* Tags */}
                            {result.metadata?.tags && result.metadata.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-lg"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          {result.type === 'students' && (
                            <button 
                              onClick={(e) => handleConnect(result.id, e)}
                              className="mt-4 px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-all flex items-center gap-2"
                            >
                              <UserPlus size={16} />
                              Connect
                            </button>
                          )}
                        </div>

                        {/* Arrow */}
                        <ExternalLink className="text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0" size={20} />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuickLinkCard({
  icon: Icon,
  title,
  description,
  onClick,
  gradient
}: {
  icon: any;
  title: string;
  description: string;
  onClick: () => void;
  gradient: string;
}) {
  return (
    <button
      onClick={onClick}
      className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-2xl transition-all text-left group"
    >
      <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </button>
  );
}
