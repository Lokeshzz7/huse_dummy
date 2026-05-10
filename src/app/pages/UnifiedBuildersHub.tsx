import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Rocket, TrendingUp, Users, Target, Zap, Award,
  BarChart3, DollarSign, MessageCircle, Heart,
  Eye, Share2, ExternalLink, Search, Filter,
  MapPin, Calendar, Tag, Sparkles, Building2,
  Globe, Link as LinkIcon, Star, ChevronDown,
  Plus, Bookmark, ThumbsUp, CheckCircle, ShieldCheck,
  Briefcase, UserPlus, Activity, Clock, Gift,
  GraduationCap, Bell, Settings, Edit3, ChevronRight,
  LogOut, Menu, Home, X, Send, TrendingDown,
  Code, Lightbulb, Brain, Package, Layers,
  Lock, Crown, Timer, ArrowRight, AlertCircle,
  LayoutDashboard, FileText, CreditCard, User,
  Palette, Shield, HelpCircle, Mail
} from 'lucide-react';
import { toast } from 'sonner';
import { jobsDatabase } from '../data/jobsData';

type ViewMode = 'discover' | 'dashboard' | 'opportunities';

export function UnifiedBuildersHub() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('discover');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showContributionDetail, setShowContributionDetail] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Application & Quote Modals
  const [showJobApplicationModal, setShowJobApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);

  // Trial Logic
  const isTrialParam = searchParams.get('trial') === 'true';
  const [isOnTrial, setIsOnTrial] = useState(false);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(7);
  const [trialHoursRemaining, setTrialHoursRemaining] = useState(0);

  // Check user status on mount
  useEffect(() => {
    const userDataStr = localStorage.getItem('dofractoBuilderUser');
    const trialStartStr = localStorage.getItem('trialStartDate');
    
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      
      // Check if user is alumni (free access)
      if (userData.tier === 'Alumni' || userData.isAlumni) {
        setIsOnTrial(false);
        return;
      }

      // Check if user has paid subscription
      const isPaid = localStorage.getItem('isPaidSubscriber') === 'true';
      if (isPaid) {
        setIsOnTrial(false);
        return;
      }
    }

    // Check trial status
    if (isTrialParam || trialStartStr) {
      setIsOnTrial(true);
      
      // Set trial start date if not exists
      if (!trialStartStr) {
        const now = new Date();
        localStorage.setItem('trialStartDate', now.toISOString());
      }

      // Calculate days remaining
      const startDate = new Date(trialStartStr || new Date());
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7);
      
      const now = new Date();
      const timeRemaining = endDate.getTime() - now.getTime();
      const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setTrialDaysRemaining(Math.max(0, daysRemaining));
      setTrialHoursRemaining(Math.max(0, hoursRemaining));
    }
  }, [isTrialParam]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user data
  const getUserData = () => {
    const userDataStr = localStorage.getItem('dofractoBuilderUser');
    if (userDataStr) {
      return JSON.parse(userDataStr);
    }
    return {
      name: 'Guest User',
      email: 'guest@example.com',
      role: 'Contributor',
      reputation: 0,
      tier: 'Trial',
      avatar: '👤'
    };
  };

  const currentUser = getUserData();

  const handleLogout = () => {
    localStorage.removeItem('dofractoBuilderUser');
    localStorage.removeItem('trialStartDate');
    localStorage.removeItem('isPaidSubscriber');
    toast.success('Logged out successfully');
    navigate('/dofracto');
  };

  const handleLockedAction = () => {
    toast.error('Upgrade to access this feature', {
      description: 'Start your subscription to contribute and bookmark startups',
      action: {
        label: 'Upgrade',
        onClick: () => navigate('/dofracto/pricing')
      }
    });
  };

  const categories = ['all', 'fintech', 'ecommerce', 'healthtech', 'edtech', 'saas', 'blockchain', 'ai/ml'];
  const stages = ['all', 'idea', 'mvp', 'seed', 'series-a', 'growth'];

  const allStartups = [
    {
      id: 1,
      name: 'PayFlow',
      logo: '💳',
      tagline: 'Next-gen payment solutions for SMEs',
      description: 'Making payments seamless for small businesses across India with innovative fintech solutions.',
      category: 'FinTech',
      stage: 'Seed',
      funding: '$2.5M',
      supporters: 234,
      trend: '+15%',
      banner: 'from-blue-500 to-cyan-500',
      tags: ['Payments', 'B2B', 'SaaS'],
      metrics: {
        revenue: '$50K MRR',
        users: '1,200',
        growth: '+45%'
      },
      contact: {
        email: 'founders@payflow.io',
        phone: '+91 98765 43210'
      },
      huseAlumni: true,
      verified: true
    },
    {
      id: 2,
      name: 'EcoMart',
      logo: '🌱',
      tagline: 'Sustainable products marketplace',
      description: 'Connecting eco-conscious consumers with sustainable brands across categories.',
      category: 'E-Commerce',
      stage: 'Series A',
      funding: '$8M',
      supporters: 567,
      trend: '+28%',
      banner: 'from-green-500 to-emerald-500',
      tags: ['Sustainability', 'Marketplace', 'B2C'],
      metrics: {
        revenue: '$200K MRR',
        users: '15,000',
        growth: '+89%'
      },
      contact: {
        email: 'team@ecomart.in',
        phone: '+91 98765 43211'
      },
      verified: true
    },
    {
      id: 3,
      name: 'DevTools Pro',
      logo: '🛠️',
      tagline: 'Developer productivity suite',
      description: 'All-in-one toolkit for modern developers to build, test, and deploy faster.',
      category: 'SaaS',
      stage: 'Growth',
      funding: '$15M',
      supporters: 891,
      trend: '+42%',
      banner: 'from-amber-500 to-yellow-500',
      tags: ['DevTools', 'B2B', 'SaaS'],
      metrics: {
        revenue: '$450K MRR',
        users: '25,000',
        growth: '+56%'
      },
      contact: {
        email: 'hello@devtools.pro',
        phone: '+91 98765 43212'
      },
      huseAlumni: true,
      verified: true
    },
    {
      id: 4,
      name: 'HealthHub',
      logo: '🏥',
      tagline: 'Telemedicine for rural India',
      description: 'Bringing quality healthcare to rural areas through telemedicine and AI diagnostics.',
      category: 'HealthTech',
      stage: 'Seed',
      funding: '$3M',
      supporters: 432,
      trend: '+35%',
      banner: 'from-red-500 to-pink-500',
      tags: ['Healthcare', 'AI', 'Social Impact'],
      metrics: {
        revenue: '$80K MRR',
        users: '8,500',
        growth: '+120%'
      },
      contact: {
        email: 'contact@healthhub.in',
        phone: '+91 98765 43213'
      },
      verified: true
    },
    {
      id: 5,
      name: 'EduLearn',
      logo: '📚',
      tagline: 'Personalized learning platform',
      description: 'AI-powered personalized education for K-12 students across India.',
      category: 'EdTech',
      stage: 'Series A',
      funding: '$10M',
      supporters: 1234,
      trend: '+52%',
      banner: 'from-purple-500 to-indigo-500',
      tags: ['Education', 'AI', 'K-12'],
      metrics: {
        revenue: '$300K MRR',
        users: '50,000',
        growth: '+95%'
      },
      contact: {
        email: 'info@edulearn.com',
        phone: '+91 98765 43214'
      },
      huseAlumni: true,
      verified: true
    },
    {
      id: 6,
      name: 'FarmTech',
      logo: '🌾',
      tagline: 'Smart farming solutions',
      description: 'IoT and AI solutions to help farmers maximize yield and reduce costs.',
      category: 'AgriTech',
      stage: 'Seed',
      funding: '$2M',
      supporters: 345,
      trend: '+18%',
      banner: 'from-lime-500 to-green-500',
      tags: ['Agriculture', 'IoT', 'AI'],
      metrics: {
        revenue: '$60K MRR',
        users: '3,400',
        growth: '+78%'
      },
      contact: {
        email: 'support@farmtech.ag',
        phone: '+91 98765 43215'
      },
      verified: true
    }
  ];

  // Mock contributions for dashboard (NO INVESTMENT TERMS)
  const mockContributions = [
    {
      id: 1,
      businessName: 'PayFlow',
      businessLogo: '💳',
      contributionType: 'Community Support',
      supportAmount: 50000,
      contributionDate: 'Nov 15, 2024',
      status: 'Active',
      impactScore: 92,
      valueCreated: '5.5K',
      lastUpdate: '2 days ago'
    },
    {
      id: 2,
      businessName: 'EcoMart',
      businessLogo: '🌱',
      contributionType: 'Work Contribution',
      workType: 'UI/UX Design',
      hoursContributed: 120,
      contributionDate: 'Oct 20, 2024',
      status: 'In Progress',
      completionRate: 75,
      impactScore: 85
    },
    {
      id: 3,
      businessName: 'DevTools Pro',
      businessLogo: '🛠️',
      contributionType: 'Community Support',
      supportAmount: 30000,
      contributionDate: 'Sep 10, 2024',
      status: 'Active',
      impactScore: 78,
      valueCreated: '3.2K'
    }
  ];

  // Notifications data
  const notifications = [
    {
      id: 1,
      type: 'update',
      title: 'PayFlow posted an update',
      description: 'Q4 Revenue Update: We hit ₹2.5Cr in revenue!',
      time: '2 hours ago',
      read: false,
      icon: '💳'
    },
    {
      id: 2,
      type: 'milestone',
      title: 'EcoMart achieved a milestone',
      description: 'Reached 15,000 active users',
      time: '1 day ago',
      read: false,
      icon: '🌱'
    },
    {
      id: 3,
      type: 'opportunity',
      title: 'New opportunity on Quotify',
      description: 'Frontend Developer needed for HealthHub',
      time: '2 days ago',
      read: true,
      icon: '💼'
    }
  ];

  const stats = [
    { label: 'Total Contributions', value: isOnTrial ? '0' : '12', icon: Heart, color: 'text-pink-400' },
    { label: 'Active Campaigns', value: isOnTrial ? '0' : '5', icon: Activity, color: 'text-cyan-400' },
    { label: 'Reputation Score', value: currentUser.reputation || '0', icon: Award, color: 'text-amber-400' },
    { label: 'Watchlist', value: isOnTrial ? '0' : '8', icon: Bookmark, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Trial Banner */}
      <AnimatePresence>
        {isOnTrial && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border-b border-amber-500/30 backdrop-blur-sm sticky top-0 z-50"
          >
            <div className="max-w-[1440px] mx-auto px-6 py-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Timer className="w-6 h-6 text-amber-400 animate-pulse" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">Free Trial Active</span>
                      <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-sm font-medium">
                        {trialDaysRemaining}d {trialHoursRemaining}h remaining
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Browse all startups • Company names hidden • Upgrade to contribute
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/dofracto/pricing')}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2"
                  >
                    <Crown className="w-4 h-4" />
                    Upgrade Now - ₹399/year
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <button onClick={() => navigate('/dofracto')} className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Dofracto</div>
                  <div className="text-xs text-gray-500">Builders Hub</div>
                </div>
              </button>

            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                >
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-96 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <h3 className="font-bold text-white">Notifications</h3>
                        <button className="text-xs text-cyan-400 hover:underline">
                          Mark all read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer ${
                              !notif.read ? 'bg-cyan-500/5' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-2xl flex-shrink-0">{notif.icon}</div>
                              <div className="flex-1">
                                <div className="font-medium text-white text-sm mb-1">
                                  {notif.title}
                                </div>
                                <div className="text-xs text-gray-400 mb-2">
                                  {notif.description}
                                </div>
                                <div className="text-xs text-gray-500">{notif.time}</div>
                              </div>
                              {!notif.read && (
                                <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-2" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-white/10">
                        <button className="w-full py-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="text-2xl">{currentUser.avatar}</div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-white">{currentUser.name}</div>
                    <div className="text-xs text-gray-500">{currentUser.tier}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <div className="text-sm font-medium text-white">{currentUser.name}</div>
                        <div className="text-xs text-gray-500">{currentUser.email}</div>
                        <div className="mt-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium inline-block">
                          {currentUser.tier} • {currentUser.reputation} Rep
                        </div>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={() => {
                            setShowSettings(true);
                            setShowProfileDropdown(false);
                          }}
                          className="w-full px-4 py-2 rounded-xl hover:bg-white/5 transition-all text-left flex items-center gap-3 text-gray-300"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                        <button
                          onClick={() => {
                            setShowSubscriptionModal(true);
                            setShowProfileDropdown(false);
                          }}
                          className="w-full px-4 py-2 rounded-xl hover:bg-white/5 transition-all text-left flex items-center gap-3 text-gray-300"
                        >
                          <Crown className="w-4 h-4" />
                          {isOnTrial ? 'Upgrade Plan' : 'Manage Subscription'}
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 rounded-xl hover:bg-red-500/10 transition-all text-left flex items-center gap-3 text-red-400"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* View Toggle */}
        <div className="mb-6 flex items-center gap-3 bg-black/50 p-2 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('discover')}
            className={`flex-1 px-6 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              viewMode === 'discover'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span className="hidden sm:inline">Discover</span>
          </button>
          <button
            onClick={() => setViewMode('opportunities')}
            className={`flex-1 px-6 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              viewMode === 'opportunities'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Opportunities</span>
          </button>
          <button
            onClick={() => setViewMode('dashboard')}
            className={`flex-1 px-6 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              viewMode === 'dashboard'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
        </div>

        {/* Content based on view mode */}
        <AnimatePresence mode="wait">
          {viewMode === 'discover' ? (
            <motion.div
              key="discover"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Search & Filters */}
              <div className="mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="md:col-span-1">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search startups..."
                        className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-black">
                          {cat === 'all' ? 'All Categories' : cat.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Stage Filter */}
                  <div className="relative">
                    <select
                      value={filterStage}
                      onChange={(e) => setFilterStage(e.target.value)}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                    >
                      {stages.map(stage => (
                        <option key={stage} value={stage} className="bg-black">
                          {stage === 'all' ? 'All Stages' : stage.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Startups Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allStartups.map((startup, index) => (
                  <motion.div
                    key={startup.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group"
                  >
                    {/* Banner */}
                    <div className={`h-32 bg-gradient-to-br ${startup.banner} relative`}>
                      {startup.huseAlumni && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-purple-500/90 backdrop-blur-sm rounded-full flex items-center gap-1">
                          <GraduationCap className="w-4 h-4 text-white" />
                          <span className="text-xs text-white font-medium">HUSE Alumni</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={isOnTrial ? handleLockedAction : undefined}
                          className={`w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all ${
                            isOnTrial ? 'cursor-not-allowed opacity-50' : ''
                          }`}
                        >
                          {isOnTrial ? <Lock className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Logo & Info */}
                      <div className="flex items-start gap-3 mb-4 -mt-14">
                        <div className="w-16 h-16 bg-black border-4 border-white/10 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                          {startup.logo}
                        </div>
                        <div className="flex-1 mt-12">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-bold text-white text-lg ${isOnTrial ? 'blur-sm select-none' : ''}`}>
                              {isOnTrial ? '████████' : startup.name}
                            </h3>
                            {startup.verified && (
                              <ShieldCheck className="w-4 h-4 text-cyan-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{startup.tagline}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {startup.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {startup.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-white/5 rounded-xl">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Revenue</div>
                          <div className="text-sm font-bold text-white">{startup.metrics.revenue}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Users</div>
                          <div className="text-sm font-bold text-white">{startup.metrics.users}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Growth</div>
                          <div className="text-sm font-bold text-green-400">{startup.metrics.growth}</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/startup/${startup.id}`)}
                          className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={isOnTrial ? handleLockedAction : undefined}
                          className={`p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all ${
                            isOnTrial ? 'cursor-not-allowed opacity-50' : ''
                          }`}
                        >
                          {isOnTrial ? <Lock className="w-5 h-5 text-gray-400" /> : <Heart className="w-5 h-5 text-pink-400" />}
                        </button>
                      </div>

                      {/* Trial Warning */}
                      {isOnTrial && (
                        <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                          <p className="text-xs text-amber-400 flex items-center gap-2">
                            <Lock className="w-3 h-3" />
                            Upgrade to view contact details and contribute
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : viewMode === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all"
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Trial Message or Contributions */}
              {isOnTrial ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-3xl p-12 text-center"
                >
                  <Lock className="w-20 h-20 text-amber-400 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Your Dashboard is Waiting
                  </h2>
                  <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                    Upgrade to start contributing, track your campaigns, and build your reputation on Dofracto
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate('/dofracto/pricing')}
                      className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <Crown className="w-5 h-5" />
                      Upgrade to Pro - ₹399/year
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('discover')}
                      className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                    >
                      Continue Exploring
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Active Contributions */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-cyan-400" />
                      Active Contributions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {mockContributions.map((contribution) => (
                        <div
                          key={contribution.id}
                          className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl">{contribution.businessLogo}</div>
                              <div>
                                <h3 className="font-bold text-white">{contribution.businessName}</h3>
                                <span className="text-sm text-gray-400">{contribution.contributionType}</span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              contribution.status === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {contribution.status}
                            </span>
                          </div>

                          {contribution.contributionType === 'Community Support' ? (
                            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-black/30 rounded-xl">
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Support</div>
                                <div className="text-sm font-bold text-white">₹{contribution.supportAmount?.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Value Created</div>
                                <div className="text-sm font-bold text-green-400">₹{contribution.valueCreated}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Impact</div>
                                <div className="text-sm font-bold text-cyan-400">{contribution.impactScore}/100</div>
                              </div>
                            </div>
                          ) : (
                            <div className="mb-4 p-4 bg-black/30 rounded-xl">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-400">{contribution.workType}</span>
                                <span className="text-sm font-bold text-cyan-400">{contribution.completionRate}%</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all"
                                  style={{ width: `${contribution.completionRate}%` }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>Started: {contribution.contributionDate}</span>
                            <button 
                              onClick={() => setShowContributionDetail(contribution)}
                              className="text-cyan-400 hover:underline font-medium"
                            >
                              View Details →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <button 
                      onClick={() => setViewMode('discover')}
                      className="p-6 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-2xl hover:border-cyan-500/50 transition-all text-left group"
                    >
                      <Rocket className="w-10 h-10 text-cyan-400 mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">Discover More</h3>
                      <p className="text-sm text-gray-400">Explore new startups to support</p>
                    </button>
                    <button 
                      onClick={() => setViewMode('opportunities')}
                      className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl hover:border-purple-500/50 transition-all text-left group"
                    >
                      <Briefcase className="w-10 h-10 text-purple-400 mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">Opportunities</h3>
                      <p className="text-sm text-gray-400">Browse jobs and service requests</p>
                    </button>
                    <button 
                      onClick={() => navigate('/reputation')}
                      className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl hover:border-amber-500/50 transition-all text-left group"
                    >
                      <Award className="w-10 h-10 text-amber-400 mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">Reputation</h3>
                      <p className="text-sm text-gray-400">Build your contributor profile</p>
                    </button>
                  </div>


                </>
              )}
            </motion.div>
          ) : viewMode === 'opportunities' ? (
            <motion.div
              key="opportunities"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Opportunities Hero */}
              <div className="mb-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-3xl p-8 text-center">
                <Briefcase className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-white mb-2">Find Your Next Opportunity</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Discover jobs, gigs, and service requests from across the HUSE Ecosystem
                </p>
              </div>

              {/* Career Opportunities from HUSE Circle */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Career Opportunities</h2>
                      <p className="text-sm text-gray-400">Full-time jobs and internships from HUSE Circle recruiters</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/recruiter-job-postings')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-xl text-gray-300 hover:text-white transition-all"
                  >
                    <span className="text-sm font-medium">View All</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {jobsDatabase.filter(job => job.visibleTo.includes('dofracto')).length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {jobsDatabase
                      .filter(job => job.visibleTo.includes('dofracto'))
                      .slice(0, 6)
                      .map((job, index) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-purple-500/30 rounded-xl p-6 transition-all group cursor-pointer"
                          onClick={() => {
                            toast.success(`Opening ${job.title} details...`);
                          }}
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
                              {job.companyLogo}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-white text-base mb-1 truncate group-hover:text-purple-400 transition-colors">
                                {job.title}
                              </h3>
                              <p className="text-sm text-gray-400 truncate">{job.company}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-semibold text-emerald-300">
                              {job.type}
                            </span>
                            <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-semibold text-blue-300">
                              {job.mode}
                            </span>
                            {job.featured && (
                              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs font-semibold text-purple-300 flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="space-y-2.5 mb-5">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <DollarSign className="w-4 h-4 flex-shrink-0" />
                              <span className="font-semibold text-green-400">{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Users className="w-4 h-4 flex-shrink-0" />
                              <span>{job.applicationsCount} applicants</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-5">
                            {job.skills.slice(0, 4).map((skill, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 4 && (
                              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400">
                                +{job.skills.length - 4}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-xs text-gray-500 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {job.postedAt}
                            </span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedJob(job);
                                setShowJobApplicationModal(true);
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 group-hover:scale-105 shadow-lg shadow-purple-500/20"
                            >
                              Apply Now
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}</div>
                ) : (
                  <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl">
                    <Building2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No career opportunities available</p>
                    <p className="text-sm text-gray-500 mt-2">Check back soon for new job postings!</p>
                  </div>
                )}
              </div>

              {/* Quotify Service Opportunities */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Quotify Gigs & Services</h2>
                      <p className="text-sm text-gray-400">Freelance projects and service requests from businesses</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/opportunity-feed')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-xl text-gray-300 hover:text-white transition-all"
                  >
                    <span className="text-sm font-medium">View All</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    {
                      id: 1,
                      title: 'Logo & Brand Identity Design',
                      company: 'StartupHub Ventures',
                      type: 'Design',
                      budget: '₹30,000 - ₹50,000',
                      description: 'Looking for a creative designer to develop complete brand identity including logo, color palette, and brand guidelines.',
                      skills: ['Brand Identity', 'Logo Design', 'Adobe Illustrator'],
                      postedAt: '1 day ago',
                      urgent: true
                    },
                    {
                      id: 2,
                      title: 'React Native Mobile App Development',
                      company: 'FitLife Health',
                      type: 'Development',
                      budget: '₹80,000',
                      description: 'Need an experienced React Native developer to build a fitness tracking mobile app with backend integration.',
                      skills: ['React Native', 'Firebase', 'REST APIs'],
                      postedAt: '3 days ago',
                      urgent: false
                    },
                    {
                      id: 3,
                      title: 'Social Media Marketing Campaign',
                      company: 'EcoProducts India',
                      type: 'Marketing',
                      budget: '₹25,000/month',
                      description: 'Looking for a social media expert to manage our Instagram and LinkedIn accounts and run targeted campaigns.',
                      skills: ['Social Media', 'Content Creation', 'Analytics'],
                      postedAt: '5 days ago',
                      urgent: false
                    },
                    {
                      id: 4,
                      title: 'SEO Optimization & Content Strategy',
                      company: 'Digital Growth Agency',
                      type: 'Marketing',
                      budget: '₹40,000',
                      description: 'Need SEO expert to optimize website, create content strategy, and improve search rankings.',
                      skills: ['SEO', 'Content Strategy', 'Google Analytics'],
                      postedAt: '2 days ago',
                      urgent: true
                    },
                    {
                      id: 5,
                      title: 'UI/UX Design for SaaS Dashboard',
                      company: 'DataViz Pro',
                      type: 'Design',
                      budget: '₹60,000',
                      description: 'Looking for talented UI/UX designer to redesign our analytics dashboard with modern interface.',
                      skills: ['Figma', 'UI/UX', 'Design Systems'],
                      postedAt: '4 days ago',
                      urgent: false
                    },
                    {
                      id: 6,
                      title: 'WordPress Website Development',
                      company: 'Local Business Hub',
                      type: 'Development',
                      budget: '₹35,000',
                      description: 'Need WordPress developer to create a professional business website with e-commerce functionality.',
                      skills: ['WordPress', 'WooCommerce', 'PHP'],
                      postedAt: '1 week ago',
                      urgent: false
                    }
                  ].map((opp, index) => (
                    <motion.div
                      key={opp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-500/30 rounded-xl p-6 transition-all group cursor-pointer"
                      onClick={() => {
                        toast.success(`Opening ${opp.title} details...`);
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-base mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                            {opp.title}
                          </h3>
                          <p className="text-sm text-gray-400">{opp.company}</p>
                        </div>
                        {opp.urgent && (
                          <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-md text-[10px] font-semibold text-red-300 ml-2">
                            URGENT
                          </span>
                        )}
                      </div>
                      <div className="mb-4">
                        <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-xs font-semibold text-cyan-300">
                          {opp.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {opp.description}
                      </p>
                      <div className="flex items-center gap-2 mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <span className="font-bold text-green-400">{opp.budget}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {opp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-xs text-gray-500 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {opp.postedAt}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOpportunity(opp);
                            setShowQuoteModal(true);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 group-hover:scale-105 shadow-lg shadow-cyan-500/20"
                        >
                          Submit Quote
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Banner */}
              <div className="bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-amber-500/10 border border-white/20 rounded-3xl p-10 text-center">
                <Sparkles className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Can't Find What You're Looking For?</h3>
                <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                  Explore the full ecosystem opportunity feed with advanced filters and more options
                </p>
                <button
                  onClick={() => navigate('/opportunity-feed')}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold transition-all inline-flex items-center gap-2 shadow-xl shadow-amber-500/20"
                >
                  Browse All Opportunities
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-all"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile Settings */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-bold text-white">Profile Information</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Display Name</label>
                      <input
                        type="text"
                        defaultValue={currentUser.name}
                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Email</label>
                      <input
                        type="email"
                        defaultValue={currentUser.email}
                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-5 h-5 text-purple-400" />
                    <h3 className="font-bold text-white">Notifications</h3>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-300">Email notifications</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-300">Startup updates</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-300">New opportunities</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                  </div>
                </div>

                {/* Privacy */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-white">Privacy</h3>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-300">Show profile publicly</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-300">Show contribution history</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    toast.success('Settings saved!');
                    setShowSettings(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showSubscriptionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSubscriptionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border border-white/10 rounded-3xl p-8 max-w-lg w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Subscription</h2>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-all"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {isOnTrial ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Upgrade to Pro</h3>
                  <p className="text-gray-400 mb-6">
                    Get full access to all features and start contributing to startups
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                    <div className="text-4xl font-bold text-white mb-2">₹399<span className="text-lg text-gray-400">/year</span></div>
                    <div className="text-sm text-gray-400">7-day free trial included</div>
                  </div>
                  <button
                    onClick={() => navigate('/dofracto/pricing')}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all mb-3"
                  >
                    Upgrade Now
                  </button>
                  <button
                    onClick={() => setShowSubscriptionModal(false)}
                    className="w-full py-3 text-gray-400 hover:text-white transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              ) : (
                <div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="font-bold text-white mb-2">Pro Plan Active</div>
                    <div className="text-sm text-gray-400">Renews on Jan 15, 2025</div>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">
                      Update Payment Method
                    </button>
                    <button className="w-full py-3 text-red-400 hover:text-red-300 transition-colors">
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contribution Detail Modal */}
      <AnimatePresence>
        {showContributionDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContributionDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{showContributionDetail.businessLogo}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{showContributionDetail.businessName}</h2>
                    <span className="text-sm text-gray-400">{showContributionDetail.contributionType}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowContributionDetail(null)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-all"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Status */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-4">Contribution Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Status</div>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        showContributionDetail.status === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {showContributionDetail.status}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Start Date</div>
                      <div className="text-white font-medium">{showContributionDetail.contributionDate}</div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                {showContributionDetail.contributionType === 'Community Support' ? (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-4">Impact Metrics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Support Amount</div>
                        <div className="text-xl font-bold text-white">₹{showContributionDetail.supportAmount?.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Value Created</div>
                        <div className="text-xl font-bold text-green-400">₹{showContributionDetail.valueCreated}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Impact Score</div>
                        <div className="text-xl font-bold text-cyan-400">{showContributionDetail.impactScore}/100</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-4">Work Progress</h3>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">{showContributionDetail.workType}</span>
                        <span className="font-bold text-cyan-400">{showContributionDetail.completionRate}%</span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-teal-500"
                          style={{ width: `${showContributionDetail.completionRate}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {showContributionDetail.hoursContributed} hours contributed
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                    Contact Team
                  </button>
                  <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">
                    Share Update
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Job Application Modal */}
      <AnimatePresence>
        {showJobApplicationModal && selectedJob && (
          <JobApplicationModal
            job={selectedJob}
            onClose={() => {
              setShowJobApplicationModal(false);
              setSelectedJob(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Quote Submission Modal */}
      <AnimatePresence>
        {showQuoteModal && selectedOpportunity && (
          <QuoteSubmissionModal
            opportunity={selectedOpportunity}
            onClose={() => {
              setShowQuoteModal(false);
              setSelectedOpportunity(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Job Application Modal Component
function JobApplicationModal({ job, onClose }: { job: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    resumeUrl: '',
    coverLetter: '',
    yearsOfExperience: '',
    availability: 'immediate'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Store application in localStorage
      const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      applications.push({
        ...formData,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        appliedAt: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('jobApplications', JSON.stringify(applications));

      toast.success(`Application submitted for ${job.title}!`);
      toast.info('The recruiter will review your application shortly');
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-white/10 p-6 backdrop-blur-xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Apply for Position</h2>
              <p className="text-gray-400">{job.title} at {job.company}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Personal Information */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-all"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Portfolio/LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-all"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Resume URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                required
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-all"
                placeholder="Link to Google Drive, Dropbox, etc."
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Years of Experience <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-all"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Availability <span className="text-red-400">*</span>
              </label>
              <select
                required
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500/50 focus:outline-none transition-all"
              >
                <option value="immediate">Immediate</option>
                <option value="2weeks">2 Weeks Notice</option>
                <option value="1month">1 Month Notice</option>
                <option value="negotiable">Negotiable</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Cover Letter <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-all resize-none"
              placeholder="Tell us why you're a great fit for this role..."
            />
            <p className="text-xs text-gray-500 mt-2">
              Minimum 100 characters ({formData.coverLetter.length}/100)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || formData.coverLetter.length < 100}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Quote Submission Modal Component
function QuoteSubmissionModal({ opportunity, onClose }: { opportunity: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    proposedBudget: '',
    deliveryTimeline: '',
    approach: '',
    portfolioSamples: '',
    relevantExperience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Store quote in localStorage
      const quotes = JSON.parse(localStorage.getItem('submittedQuotes') || '[]');
      quotes.push({
        ...formData,
        opportunityId: opportunity.id,
        opportunityTitle: opportunity.title,
        company: opportunity.company,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('submittedQuotes', JSON.stringify(quotes));

      toast.success(`Quote submitted for ${opportunity.title}!`);
      toast.info('The business owner will review your quote and contact you');
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border-b border-white/10 p-6 backdrop-blur-xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Submit Your Quote</h2>
              <p className="text-gray-400">{opportunity.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-500">{opportunity.company}</span>
                <span className="text-gray-600">•</span>
                <span className="text-sm font-semibold text-green-400">{opportunity.budget}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Contact Information */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          {/* Quote Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Your Proposed Budget <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                <input
                  type="text"
                  required
                  value={formData.proposedBudget}
                  onChange={(e) => setFormData({ ...formData, proposedBudget: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                  placeholder="35,000"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Client's budget: {opportunity.budget}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Delivery Timeline <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.deliveryTimeline}
                onChange={(e) => setFormData({ ...formData, deliveryTimeline: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                placeholder="e.g., 2-3 weeks"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Your Approach & Methodology <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              value={formData.approach}
              onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all resize-none"
              placeholder="Describe how you plan to complete this project..."
            />
            <p className="text-xs text-gray-500 mt-2">
              Minimum 150 characters ({formData.approach.length}/150)
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Portfolio Samples <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              required
              value={formData.portfolioSamples}
              onChange={(e) => setFormData({ ...formData, portfolioSamples: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="Link to your portfolio or relevant work samples"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Relevant Experience <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              value={formData.relevantExperience}
              onChange={(e) => setFormData({ ...formData, relevantExperience: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all resize-none"
              placeholder="List relevant projects or experience related to this opportunity..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || formData.approach.length < 150}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Quote
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
