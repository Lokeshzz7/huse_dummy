import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, DollarSign, Clock, Calendar, Eye, Send,
  Filter, Search, TrendingUp, Star, CheckCircle,
  AlertCircle, Briefcase, Target, Award, Zap, Crown,
  X, User, Mail, Phone, MapPin, ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface QuoteRequest {
  id: number;
  title: string;
  category: string;
  description: string;
  budget: string;
  timeline: string;
  deadline: string;
  postedBy: string;
  postedDate: string;
  quotesReceived: number;
  status: 'open' | 'in-review' | 'closed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requirements: string[];
}

const mockQuoteRequests: QuoteRequest[] = [
  {
    id: 1,
    title: 'E-commerce Website Development',
    category: 'Web Development',
    description: 'Need a full-stack e-commerce platform with payment integration, user authentication, product catalog, and admin dashboard.',
    budget: '$5,000 - $10,000',
    timeline: '2-3 months',
    deadline: '2024-12-25',
    postedBy: 'Sarah Johnson',
    postedDate: '2024-12-15',
    quotesReceived: 8,
    status: 'open',
    difficulty: 'advanced',
    requirements: ['React/Next.js', 'Payment Gateway', 'Admin Panel', 'Responsive Design']
  },
  {
    id: 2,
    title: 'Mobile App UI/UX Design',
    category: 'Design & Branding',
    description: 'Looking for a talented designer to create UI/UX for a fitness tracking mobile app. Need complete design system and prototypes.',
    budget: '$2,000 - $5,000',
    timeline: '1 month',
    deadline: '2024-12-30',
    postedBy: 'Mike Chen',
    postedDate: '2024-12-18',
    quotesReceived: 12,
    status: 'open',
    difficulty: 'intermediate',
    requirements: ['Figma', 'Mobile Design', 'Design System', 'Prototyping']
  },
  {
    id: 3,
    title: 'Social Media Marketing Campaign',
    category: 'Marketing & SEO',
    description: 'Need comprehensive social media strategy and content creation for product launch. Instagram, LinkedIn, Twitter focus.',
    budget: '$1,000 - $3,000',
    timeline: '1-2 months',
    deadline: '2024-12-28',
    postedBy: 'Priya Kumar',
    postedDate: '2024-12-16',
    quotesReceived: 15,
    status: 'open',
    difficulty: 'beginner',
    requirements: ['Social Media', 'Content Creation', 'Analytics', 'Strategy']
  },
  {
    id: 4,
    title: 'Business Logo & Brand Identity',
    category: 'Design & Branding',
    description: 'Startup needs complete brand identity including logo, color palette, typography, and brand guidelines.',
    budget: '$500 - $1,500',
    timeline: '2 weeks',
    deadline: '2024-12-26',
    postedBy: 'Alex Thompson',
    postedDate: '2024-12-17',
    quotesReceived: 20,
    status: 'open',
    difficulty: 'beginner',
    requirements: ['Illustrator', 'Branding', 'Logo Design', 'Brand Guidelines']
  },
  {
    id: 5,
    title: 'AI Chatbot Development',
    category: 'Web Development',
    description: 'Build an intelligent chatbot using GPT API for customer support. Needs to integrate with existing website.',
    budget: '$3,000 - $7,000',
    timeline: '1-2 months',
    deadline: '2024-12-31',
    postedBy: 'David Lee',
    postedDate: '2024-12-14',
    quotesReceived: 6,
    status: 'open',
    difficulty: 'advanced',
    requirements: ['Python/Node.js', 'AI/ML', 'API Integration', 'NLP']
  }
];

interface QuoteMarketplaceProps {
  userType: 'business' | 'student';
  userTier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Contributor' | 'Business Owner';
}

export function QuoteMarketplace({ userType, userTier }: QuoteMarketplaceProps) {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<QuoteRequest[]>(mockQuoteRequests);
  const [filteredRequests, setFilteredRequests] = useState<QuoteRequest[]>(mockQuoteRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);

  // Filter for students: Platinum, Contributor, and Business Owner tiers can access
  const canAccessQuotes = userTier === 'Platinum' || userTier === 'Contributor' || userTier === 'Business Owner';
  
  useEffect(() => {
    if (userType === 'student' && !canAccessQuotes) {
      toast.error('Quote opportunities are only available for Platinum tier students and above');
    }
  }, [userType, userTier, canAccessQuotes]);

  useEffect(() => {
    let filtered = requests;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(req =>
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(req => req.category === selectedCategory);
    }

    // Difficulty filter (for students)
    if (userType === 'student' && selectedDifficulty !== 'all') {
      filtered = filtered.filter(req => req.difficulty === selectedDifficulty);
    }

    setFilteredRequests(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty, requests, userType]);

  const categories = [
    'Web Development',
    'Mobile App Development',
    'Design & Branding',
    'Marketing & SEO',
    'Content Creation',
    'Business Consulting'
  ];

  const getDifficultyBadge = (difficulty: string) => {
    const badges = {
      beginner: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Beginner' },
      intermediate: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Intermediate' },
      advanced: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Advanced' }
    };
    const badge = badges[difficulty as keyof typeof badges];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      open: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Open' },
      'in-review': { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'In Review' },
      closed: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Closed' }
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const handleSubmitQuote = (requestId: number) => {
    // Navigate to quote submission form
    navigate(`/quotify/submit-quote/${requestId}`);
  };

  // Check if student has access
  if (userType === 'student' && !canAccessQuotes) {
    return (
      <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Platinum Tier or Higher Required</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Quote opportunities and earning through Quotify are exclusive to Platinum tier students and above (Platinum, Contributor, Business Owner).
            Upgrade your tier to access this feature!
          </p>
          <button
            onClick={() => navigate('/huse-circle-platform')}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            Upgrade to Platinum
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {userType === 'business' ? 'Quote Marketplace' : 'Earning Opportunities'}
          </h2>
          <p className="text-gray-400">
            {userType === 'business' 
              ? 'Browse and submit quotes for client projects'
              : 'Find projects to work on and earn money'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-cyan-400">Available</span>
          </div>
          <div className="text-2xl font-bold text-white">{filteredRequests.filter(r => r.status === 'open').length}</div>
          <div className="text-xs text-gray-400">Open requests</div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-purple-400">Hot</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {filteredRequests.filter(r => r.quotesReceived < 10).length}
          </div>
          <div className="text-xs text-gray-400">Low competition</div>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">Value</span>
          </div>
          <div className="text-2xl font-bold text-white">$25K+</div>
          <div className="text-xs text-gray-400">Total budget</div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="text-xs text-amber-400">Success</span>
          </div>
          <div className="text-2xl font-bold text-white">87%</div>
          <div className="text-xs text-gray-400">Win rate</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search requests..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Difficulty Filter (for students) */}
          {userType === 'student' && (
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          )}
        </div>
      </div>

      {/* Quote Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">{request.title}</h3>
                      {getStatusBadge(request.status)}
                      {userType === 'student' && getDifficultyBadge(request.difficulty)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Posted {new Date(request.postedDate).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="text-cyan-400">{request.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {request.quotesReceived} quotes
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{request.description}</p>
                    
                    {/* Requirements */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {request.requirements.map((req, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">{request.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-400">Timeline:</span>
                  <span className="text-white">{request.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-gray-400">Deadline:</span>
                  <span className="text-white">{new Date(request.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedRequest(request)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View Details</span>
                </button>
                {request.status === 'open' && (
                  <button
                    onClick={() => handleSubmitQuote(request.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-sm font-medium">Submit Quote</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No requests found</h3>
          <p className="text-gray-400">Try adjusting your filters</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRequest(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
                {/* Header */}
                <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 p-6 flex items-start justify-between z-10">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-white">{selectedRequest.title}</h2>
                        {getStatusBadge(selectedRequest.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Posted {new Date(selectedRequest.postedDate).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="text-cyan-400">{selectedRequest.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {selectedRequest.quotesReceived} quotes received
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Quick Info Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">Budget</span>
                      </div>
                      <p className="text-white font-bold text-lg">{selectedRequest.budget}</p>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-amber-400" />
                        <span className="text-xs text-amber-400 font-medium">Timeline</span>
                      </div>
                      <p className="text-white font-bold text-lg">{selectedRequest.timeline}</p>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-xs text-red-400 font-medium">Deadline</span>
                      </div>
                      <p className="text-white font-bold text-lg">
                        {new Date(selectedRequest.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-white font-bold text-lg">Project Description</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{selectedRequest.description}</p>
                  </div>

                  {/* Requirements & Skills */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-white font-bold text-lg">Requirements & Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedRequest.requirements.map((req, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-lg text-sm text-cyan-300 font-medium"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty Level (for students) */}
                  {userType === 'student' && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-white font-bold text-lg">Difficulty Level</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        {getDifficultyBadge(selectedRequest.difficulty)}
                        <span className="text-gray-400 text-sm">
                          {selectedRequest.difficulty === 'beginner' && 'Perfect for students just starting out'}
                          {selectedRequest.difficulty === 'intermediate' && 'Requires some experience and portfolio'}
                          {selectedRequest.difficulty === 'advanced' && 'Best suited for experienced contributors'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Client Information */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-white font-bold text-lg">Client Information</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold">
                          {selectedRequest.postedBy.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{selectedRequest.postedBy}</p>
                          <p className="text-gray-400 text-sm">Project Owner</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Mail className="w-4 h-4" />
                          <span>Contact via platform</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>Location: Remote</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Competition Stats */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      <h3 className="text-white font-bold text-lg">Competition Insights</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Quotes Received</p>
                        <p className="text-white font-bold text-2xl">{selectedRequest.quotesReceived}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Competition</p>
                        <p className={`font-bold text-2xl ${
                          selectedRequest.quotesReceived < 10 ? 'text-green-400' :
                          selectedRequest.quotesReceived < 20 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {selectedRequest.quotesReceived < 10 ? 'Low' :
                           selectedRequest.quotesReceived < 20 ? 'Medium' : 'High'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Your Chances</p>
                        <p className={`font-bold text-2xl ${
                          selectedRequest.quotesReceived < 10 ? 'text-green-400' :
                          selectedRequest.quotesReceived < 20 ? 'text-yellow-400' : 'text-orange-400'
                        }`}>
                          {selectedRequest.quotesReceived < 10 ? 'High' :
                           selectedRequest.quotesReceived < 20 ? 'Good' : 'Fair'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4">
                    {selectedRequest.status === 'open' ? (
                      <>
                        <button
                          onClick={() => {
                            setSelectedRequest(null);
                            handleSubmitQuote(selectedRequest.id);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all font-bold"
                        >
                          <Send className="w-5 h-5" />
                          Submit Your Quote
                        </button>
                        <button
                          onClick={() => {
                            toast.success('Request saved to your bookmarks!');
                          }}
                          className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                        >
                          <Star className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <div className="flex-1 text-center py-4 bg-gray-500/10 border border-gray-500/20 rounded-xl">
                        <p className="text-gray-400 font-medium">This request is no longer accepting quotes</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}