import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Plus, Clock, CheckCircle, XCircle, Eye,
  MessageSquare, DollarSign, Star, TrendingUp, Users,
  Search, Filter, Bell, Settings, LogOut, Menu, X,
  Calendar, Award, Shield, Zap, ArrowRight
} from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { EcosystemNav } from '../../components/EcosystemNav';
import { toast } from 'sonner';

interface QuoteRequest {
  id: number;
  title: string;
  category: string;
  budget: string;
  status: 'pending' | 'matched' | 'in-progress' | 'completed' | 'cancelled';
  quotesReceived: number;
  datePosted: string;
  deadline: string;
  description: string;
}

const mockQuoteRequests: QuoteRequest[] = [
  {
    id: 1,
    title: 'E-commerce Website Development',
    category: 'Web Development',
    budget: '$5,000 - $10,000',
    status: 'matched',
    quotesReceived: 12,
    datePosted: '2024-12-15',
    deadline: '2024-12-30',
    description: 'Need a full-stack e-commerce platform with payment integration...'
  },
  {
    id: 2,
    title: 'Mobile App Design',
    category: 'Design & Branding',
    budget: '$2,000 - $5,000',
    status: 'pending',
    quotesReceived: 5,
    datePosted: '2024-12-18',
    deadline: '2024-12-25',
    description: 'Looking for UI/UX designer for fitness tracking app...'
  },
  {
    id: 3,
    title: 'SEO & Marketing Campaign',
    category: 'Marketing & SEO',
    budget: '$3,000 - $7,000',
    status: 'in-progress',
    quotesReceived: 8,
    datePosted: '2024-12-10',
    deadline: '2024-12-20',
    description: 'Comprehensive SEO strategy and social media marketing...'
  }
];

export function QuotifyDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(mockQuoteRequests);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'matched' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    // Check if user is logged in to Quotify
    const quotifyUser = localStorage.getItem('quotifyUser');
    if (!quotifyUser) {
      navigate('/quotify/login');
      return;
    }
    setUser(JSON.parse(quotifyUser));
  }, [navigate]);

  if (!user) {
    return null; // Will redirect
  }

  const handleLogout = () => {
    localStorage.removeItem('quotifyUser');
    navigate('/quotify/login');
    toast.success('Logged out successfully');
  };

  const filteredRequests = quoteRequests.filter(request => {
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const stats = [
    {
      label: 'Active Requests',
      value: quoteRequests.filter(q => q.status === 'pending' || q.status === 'matched').length,
      change: '+2 this week',
      icon: FileText,
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20'
    },
    {
      label: 'Total Quotes',
      value: quoteRequests.reduce((acc, q) => acc + q.quotesReceived, 0),
      change: '+15 today',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      label: 'Completed',
      value: quoteRequests.filter(q => q.status === 'completed').length,
      change: '100% success',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      label: 'Total Spent',
      value: '$12,500',
      change: 'Avg $4,166',
      icon: DollarSign,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: Clock, label: 'Pending' },
      matched: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Users, label: 'Matched' },
      'in-progress': { color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: Zap, label: 'In Progress' },
      completed: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle, label: 'Completed' },
      cancelled: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle, label: 'Cancelled' }
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      <div className="pt-[80px] pb-20">
        {/* Top Bar */}
        <div className="bg-[#111] border-b border-white/10 sticky top-[80px] z-40 backdrop-blur-xl">
          <div className="max-w-[1440px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{user.avatar}</div>
                <div>
                  <h1 className="text-xl font-bold text-white">{user.name}</h1>
                  <p className="text-sm text-gray-400">{user.role} • {user.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button 
                  onClick={() => navigate('/quotify/settings')}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5 text-gray-400 hover:text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">Quote Requests</h2>
              <button
                onClick={() => navigate('/quotify/new-request')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New Request</span>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search requests..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                <Filter className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All Requests', count: quoteRequests.length },
              { id: 'pending', label: 'Pending', count: quoteRequests.filter(q => q.status === 'pending').length },
              { id: 'matched', label: 'Matched', count: quoteRequests.filter(q => q.status === 'matched').length },
              { id: 'in-progress', label: 'In Progress', count: quoteRequests.filter(q => q.status === 'in-progress').length },
              { id: 'completed', label: 'Completed', count: quoteRequests.filter(q => q.status === 'completed').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
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
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{request.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Posted {new Date(request.datePosted).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span className="text-cyan-400">{request.category}</span>
                          <span>•</span>
                          <span className="text-green-400">{request.budget}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 ml-14">{request.description}</p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                      <span className="text-white font-medium">{request.quotesReceived}</span>
                      <span className="text-gray-400">quotes received</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-gray-400">Deadline:</span>
                      <span className="text-white">{new Date(request.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/quotify/request/${request.id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View Details</span>
                    </button>
                    {request.quotesReceived > 0 && (
                      <button
                        onClick={() => navigate(`/quotify/request/${request.id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                      >
                        <span className="text-sm font-medium">View Quotes</span>
                        <ArrowRight className="w-4 h-4" />
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
              <h3 className="text-xl font-bold text-white mb-2">No quote requests found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery ? 'Try adjusting your search' : 'Create your first quote request to get started'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => navigate('/quotify/new-request')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Create Quote Request</span>
                </button>
              )}
            </div>
          )}

          {/* Quick Tips */}
          <div className="mt-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Pro Tips for Better Quotes</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Provide detailed project descriptions to get accurate quotes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Set realistic budgets and timelines for better matches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Review provider profiles and ratings before selecting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Use escrow service for secure payments and milestone tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}