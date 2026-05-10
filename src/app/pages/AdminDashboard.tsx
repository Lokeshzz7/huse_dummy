import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Search,
  Bell,
  User,
  LogOut,
  CheckCircle,
  Plus,
  Eye,
  TrendingUp,
  Users,
  Briefcase,
  ShoppingBag,
  Rocket,
  Shield,
  Zap,
  Edit,
  Trash2,
  Heart,
  Settings,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  Download,
  ExternalLink,
  Pause,
  Play,
  Archive
} from 'lucide-react';
import { motion } from 'motion/react';
import logo from 'figma:asset/c5f0bab53a945965073dbcdefa0862c09d9e3ef8.png';
import { PostOpportunityModal, OpportunityData } from '../components/PostOpportunityModal';
import { SubmitQuoteModal, QuoteSubmissionData } from '../components/SubmitQuoteModal';
import { ViewQuoteDetailsModal } from '../components/ViewQuoteDetailsModal';
import { EditBusinessModal } from '../components/EditBusinessModal';
import { ViewApplicantsModal } from '../components/ViewApplicantsModal';
import { OpportunityDetailsModal } from '../components/OpportunityDetailsModal';
import { MessageModal } from '../components/MessageModal';
import { toast } from 'sonner';

type TabType = 'my-businesses' | 'quote-marketplace' | 'opportunities';

interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  logo: string;
  opportunitiesPosted: number;
  totalApplicants: number;
  followers: number;
  activeOpportunities: number;
  views: number;
  status: 'active' | 'draft' | 'pending';
}

interface Opportunity {
  id: number;
  businessId: number;
  businessName: string;
  title: string;
  type: 'Freelance Gig' | 'Equity Role' | 'Community Support';
  status: 'active' | 'paused' | 'closed';
  contributionReceived: number;
  contributionGoal: number;
  applicants: number;
  activeWorkers: {
    name: string;
    avatar: string;
    role: string;
    progress: number;
  }[];
  postedDate: string;
  platform: 'HUSE Circle' | 'Dofracto' | 'Both';
  quoteAccepted?: boolean;
}

interface QuoteRequest {
  id: number;
  requesterName: string;
  requesterAvatar: string;
  serviceType: string;
  budget: string;
  description: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  receivedDate: string;
  platform: string;
}

interface Notification {
  id: number;
  type: 'application' | 'quote' | 'contribution' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function StartupDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('my-businesses');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPostOpportunityModal, setShowPostOpportunityModal] = useState(false);
  const [showSubmitQuoteModal, setShowSubmitQuoteModal] = useState(false);
  const [selectedQuoteRequest, setSelectedQuoteRequest] = useState<QuoteRequest | null>(null);
  const [showViewQuoteModal, setShowViewQuoteModal] = useState(false);
  const [showEditBusinessModal, setShowEditBusinessModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showOpportunityDetailsModal, setShowOpportunityDetailsModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState<{ name: string; avatar: string; context?: string } | null>(null);
  const [isKYCVerified, setIsKYCVerified] = useState(true);
  const navigate = useNavigate();

  // Notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'application',
      title: 'New Application',
      message: 'Sarah Chen applied for "UI/UX Designer" role',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'quote',
      title: 'Quote Accepted',
      message: 'Your quote for "Mobile App Development" was accepted',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'contribution',
      title: 'New Contribution',
      message: 'Received ₹5,000 for "AI Analytics Platform"',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'system',
      title: 'KYC Verified',
      message: 'Your business account has been verified',
      time: '2 days ago',
      read: true
    }
  ];

  // Opportunities data
  const opportunities: Opportunity[] = [
    {
      id: 1,
      businessId: 1,
      businessName: 'TechVenture AI',
      title: 'Full Stack Developer for MVP',
      type: 'Freelance Gig',
      status: 'active',
      contributionReceived: 45000,
      contributionGoal: 80000,
      applicants: 12,
      activeWorkers: [
        { name: 'Rahul Kumar', avatar: '👨‍💻', role: 'Lead Developer', progress: 75 },
        { name: 'Priya Singh', avatar: '👩‍💻', role: 'Frontend Dev', progress: 60 }
      ],
      postedDate: '2024-01-15',
      platform: 'Both',
      quoteAccepted: false
    },
    {
      id: 2,
      businessId: 1,
      businessName: 'TechVenture AI',
      title: 'UI/UX Designer',
      type: 'Equity Role',
      status: 'active',
      contributionReceived: 25000,
      contributionGoal: 50000,
      applicants: 8,
      activeWorkers: [
        { name: 'Sarah Chen', avatar: '👩‍🎨', role: 'UX Designer', progress: 85 }
      ],
      postedDate: '2024-01-20',
      platform: 'Dofracto',
      quoteAccepted: true
    },
    {
      id: 3,
      businessId: 2,
      businessName: 'EcoSolutions',
      title: 'Marketing Campaign Manager',
      type: 'Community Support',
      status: 'active',
      contributionReceived: 15000,
      contributionGoal: 30000,
      applicants: 5,
      activeWorkers: [],
      postedDate: '2024-01-25',
      platform: 'HUSE Circle',
      quoteAccepted: false
    }
  ];

  // Mock Applicants data
  const mockApplicants = [
    {
      id: 1,
      name: 'Rahul Kumar',
      avatar: '👨‍💻',
      title: 'Full Stack Developer',
      location: 'Bangalore, India',
      experience: '5 years',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
      rating: 4.8,
      appliedDate: '2024-01-28',
      status: 'pending' as const,
      email: 'rahul.kumar@example.com',
      phone: '+91 98765 43210',
      portfolio: 'https://rahulkumar.dev',
      coverLetter: 'I am passionate about building scalable web applications and have extensive experience with the MERN stack. I would love to contribute to your project and help bring your vision to life.'
    },
    {
      id: 2,
      name: 'Priya Singh',
      avatar: '👩‍💻',
      title: 'Frontend Developer',
      location: 'Mumbai, India',
      experience: '3 years',
      skills: ['React', 'Vue.js', 'CSS', 'JavaScript', 'Figma'],
      rating: 4.9,
      appliedDate: '2024-01-27',
      status: 'shortlisted' as const,
      email: 'priya.singh@example.com',
      portfolio: 'https://priyasingh.com',
      coverLetter: 'With my strong background in creating beautiful and responsive user interfaces, I can help deliver an exceptional user experience for your MVP.'
    },
    {
      id: 3,
      name: 'Arjun Mehta',
      avatar: '🧑‍💻',
      title: 'Backend Developer',
      location: 'Delhi, India',
      experience: '4 years',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Redis'],
      rating: 4.7,
      appliedDate: '2024-01-26',
      status: 'pending' as const,
      email: 'arjun.mehta@example.com',
      phone: '+91 98123 45678',
      coverLetter: 'I specialize in building robust backend systems and APIs. I have worked on multiple MVP projects and understand the importance of rapid development without compromising code quality.'
    },
    {
      id: 4,
      name: 'Sarah Chen',
      avatar: '👩‍🎨',
      title: 'UI/UX Designer',
      location: 'Pune, India',
      experience: '6 years',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
      rating: 5.0,
      appliedDate: '2024-01-25',
      status: 'accepted' as const,
      email: 'sarah.chen@example.com',
      portfolio: 'https://sarahchen.design',
      coverLetter: 'I am an experienced UI/UX designer with a track record of creating user-centric designs that drive engagement. I would be thrilled to work on your project and deliver exceptional design solutions.'
    },
    {
      id: 5,
      name: 'Vikram Rao',
      avatar: '🧑‍💼',
      title: 'Product Manager',
      location: 'Hyderabad, India',
      experience: '7 years',
      skills: ['Product Strategy', 'Agile', 'Roadmapping', 'User Research', 'Analytics'],
      rating: 4.6,
      appliedDate: '2024-01-24',
      status: 'rejected' as const,
      email: 'vikram.rao@example.com',
      coverLetter: 'With my extensive experience in product management, I can help define and execute a clear product strategy that aligns with your business goals.'
    }
  ];

  // Quote Requests data
  const quoteRequests: QuoteRequest[] = [
    {
      id: 1,
      requesterName: 'Amit Sharma',
      requesterAvatar: '👨‍💼',
      serviceType: 'Mobile App Development',
      budget: '₹50,000 - ₹80,000',
      description: 'Need a mobile app for delivery service with real-time tracking',
      status: 'pending',
      receivedDate: '2024-01-28',
      platform: 'Quotify'
    },
    {
      id: 2,
      requesterName: 'Neha Patel',
      requesterAvatar: '👩‍💼',
      serviceType: 'Brand Identity Design',
      budget: '₹30,000 - ₹50,000',
      description: 'Complete brand identity package for sustainable fashion startup',
      status: 'accepted',
      receivedDate: '2024-01-26',
      platform: 'Quotify'
    },
    {
      id: 3,
      requesterName: 'Karthik Reddy',
      requesterAvatar: '👨‍💻',
      serviceType: 'Data Analytics Dashboard',
      budget: '₹60,000 - ₹100,000',
      description: 'Custom analytics dashboard for e-commerce platform',
      status: 'pending',
      receivedDate: '2024-01-27',
      platform: 'Quotify'
    }
  ];

  // Demo data
  const businesses: Business[] = [
    {
      id: 1,
      name: 'TechVenture AI',
      category: 'Technology',
      description: 'AI-powered analytics platform for businesses',
      logo: '🚀',
      opportunitiesPosted: 5,
      totalApplicants: 28,
      followers: 150,
      activeOpportunities: 3,
      views: 1543,
      status: 'active'
    },
    {
      id: 2,
      name: 'EcoSolutions',
      category: 'Sustainability',
      description: 'Sustainable packaging solutions for e-commerce',
      logo: '🌱',
      opportunitiesPosted: 3,
      totalApplicants: 15,
      followers: 100,
      activeOpportunities: 2,
      views: 828,
      status: 'active'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const totalListings = businesses.length;
  const totalApplications = businesses.reduce((sum, b) => sum + b.totalApplicants, 0);
  const totalViews = businesses.reduce((sum, b) => sum + b.views, 0);
  const growthRate = '+24%';

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#111] border-b border-[#24c6dc]/20 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-[70px] flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Startup Portal</h1>
                <p className="text-xs text-gray-400">Dofracto</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-[500px] mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg pl-12 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#24c6dc] transition-colors"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* KYC Status Badge */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-500 text-sm font-medium">KYC Verified</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-[#24c6dc] transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-96 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold text-white">Notifications</h3>
                    <p className="text-xs text-gray-400 mt-1">{notifications.filter(n => !n.read).length} unread</p>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-800 hover:bg-[#24c6dc]/5 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-[#24c6dc]/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notification.type === 'application' ? 'bg-green-500/10' :
                            notification.type === 'quote' ? 'bg-blue-500/10' :
                            notification.type === 'contribution' ? 'bg-purple-500/10' :
                            'bg-gray-500/10'
                          }`}>
                            {notification.type === 'application' && <Users className="w-4 h-4 text-green-500" />}
                            {notification.type === 'quote' && <MessageSquare className="w-4 h-4 text-blue-500" />}
                            {notification.type === 'contribution' && <DollarSign className="w-4 h-4 text-purple-500" />}
                            {notification.type === 'system' && <Shield className="w-4 h-4 text-gray-500" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{notification.title}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#24c6dc] rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 border-t border-gray-800">
                    <button className="w-full text-[#24c6dc] text-sm font-medium hover:text-[#05997F] transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>

              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Business Account</p>
                        <p className="text-xs text-gray-400">business@techventure.ai</p>
                      </div>
                    </div>
                    
                    {/* KYC Toggle */}
                    <div className="bg-[#0a0a0a] rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">KYC Status (Demo)</span>
                        <button
                          onClick={() => {
                            setIsKYCVerified(!isKYCVerified);
                            toast.info(isKYCVerified ? 'KYC verification disabled (demo)' : 'KYC verification enabled (demo)');
                          }}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            isKYCVerified ? 'bg-green-500' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              isKYCVerified ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          ></span>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">Toggle to preview restricted access</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      toast.info('Settings page coming soon!');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left flex items-center gap-2 text-gray-300 hover:bg-[#24c6dc]/10 hover:text-[#24c6dc] transition-colors border-b border-gray-800"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  
                  <button
                    onClick={() => {
                      toast.info('Billing page coming soon!');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left flex items-center gap-2 text-gray-300 hover:bg-[#24c6dc]/10 hover:text-[#24c6dc] transition-colors border-b border-gray-800"
                  >
                    <CreditCard className="w-4 h-4" />
                    Billing
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left flex items-center gap-2 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back! 👋</h2>
          <p className="text-gray-400">Manage your business listings and connect with talented contributors.</p>
        </div>

        {/* KYC Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-500" />
                <h3 className="text-xl font-bold text-white">KYC Verified ✓ Active</h3>
              </div>
              <p className="text-gray-300 mb-4">You're fully verified. You have access to all features including the Quote Marketplace.</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Post freelance gigs to both platforms</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Clear explain/revenue-share (Dofracto only)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Protected filtering for student safety</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="bg-green-500/20 rounded-full p-3">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Connect with Talent Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#24c6dc]/10 to-[#05997F]/10 border border-[#24c6dc]/30 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#24c6dc]" />
                <h3 className="text-xl font-bold text-white">Connect with Talent</h3>
              </div>
              <p className="text-gray-300 mb-1">
                Post opportunities to <span className="text-[#24c6dc] font-medium">Dofracto Contributors</span> and{' '}
                <span className="text-purple-400 font-medium">HUSE Circle Students</span>.
              </p>
              <p className="text-gray-400 text-sm">Hire for gigs, equity roles, or raise community support.</p>
            </div>
            
            <button
              onClick={() => setShowPostOpportunityModal(true)}
              className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all"
            >
              <Plus className="w-5 h-5" />
              Post Opportunity ✨
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#111] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#24c6dc]/10 rounded-lg">
                <Building2 className="w-6 h-6 text-[#24c6dc]" />
              </div>
              <span className="text-3xl font-bold text-white">{totalListings}</span>
            </div>
            <p className="text-gray-400 text-sm">Active Listings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#111] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-3xl font-bold text-white">{totalApplications}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Applications</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#111] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Eye className="w-6 h-6 text-purple-500" />
              </div>
              <span className="text-3xl font-bold text-white">{totalViews}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Views</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[#111] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-3xl font-bold text-white">{growthRate}</span>
            </div>
            <p className="text-gray-400 text-sm">Growth Rate</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-6 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('my-businesses')}
            className={`px-4 py-3 font-medium transition-all relative ${
              activeTab === 'my-businesses'
                ? 'text-[#24c6dc]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              My Businesses
            </div>
            {activeTab === 'my-businesses' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#24c6dc]"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('quote-marketplace')}
            className={`px-4 py-3 font-medium transition-all relative ${
              activeTab === 'quote-marketplace'
                ? 'text-[#24c6dc]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Quote Marketplace
              <span className="bg-[#24c6dc]/20 text-[#24c6dc] text-xs px-2 py-0.5 rounded-full">New</span>
            </div>
            {activeTab === 'quote-marketplace' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#24c6dc]"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-3 font-medium transition-all relative ${
              activeTab === 'opportunities'
                ? 'text-[#24c6dc]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Opportunities
              <span className="bg-[#24c6dc]/20 text-[#24c6dc] text-xs px-2 py-0.5 rounded-full">New</span>
            </div>
            {activeTab === 'opportunities' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#24c6dc]"
              />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'my-businesses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Your Business Listings</h3>
                <p className="text-gray-400">Manage and monitor your business profiles</p>
              </div>
              <button
                onClick={() => navigate('/add-business')}
                className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Business
              </button>
            </div>

            {/* Business Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {businesses.map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-[#24c6dc]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#24c6dc]/20 to-[#05997F]/20 flex items-center justify-center text-3xl flex-shrink-0">
                      {business.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{business.name}</h4>
                          <span className="text-sm text-gray-400">{business.category}</span>
                        </div>
                        <span className="bg-green-500/10 text-green-500 text-xs px-3 py-1 rounded-full">
                          {business.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{business.description}</p>
                      
                      {/* Stats Grid - 2x2 */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="w-3.5 h-3.5 text-[#24c6dc]" />
                            <span className="text-xs text-gray-400">Opportunities</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-white">{business.opportunitiesPosted}</span>
                            <span className="text-xs text-gray-500">posted</span>
                          </div>
                        </div>
                        
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-xs text-gray-400">Applicants</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-white">{business.totalApplicants}</span>
                            <span className="text-xs text-gray-500">total</span>
                          </div>
                        </div>
                        
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Heart className="w-3.5 h-3.5 text-pink-500" />
                            <span className="text-xs text-gray-400">Followers</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-white">{business.followers}</span>
                            <span className="text-xs text-gray-500">watching</span>
                          </div>
                        </div>
                        
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-3.5 h-3.5 text-yellow-500" />
                            <span className="text-xs text-gray-400">Active Now</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-white">{business.activeOpportunities}</span>
                            <span className="text-xs text-gray-500">live</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedBusiness(business);
                            setShowEditBusinessModal(true);
                          }}
                          className="flex-1 bg-[#24c6dc]/10 text-[#24c6dc] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#24c6dc]/20 transition-all flex items-center justify-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this business? This action cannot be undone.')) {
                              toast.success('Business deleted successfully');
                            }
                          }}
                          className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {businesses.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No businesses yet</h3>
                <p className="text-gray-400 mb-6">Get started by adding your first business listing</p>
                <button
                  onClick={() => navigate('/add-business')}
                  className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Business
                </button>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'quote-marketplace' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Quote Marketplace</h3>
                <p className="text-gray-400">Manage quote requests from Quotify users</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-purple-500/10 text-purple-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                  {quoteRequests.filter(q => q.status === 'pending').length} Pending
                </span>
                <button
                  onClick={() => navigate('/quotify')}
                  className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Quotify
                </button>
              </div>
            </div>

            {/* Quote Request Cards */}
            <div className="space-y-4">
              {quoteRequests.map((quote, index) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-[#24c6dc]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Requester Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                      {quote.requesterAvatar}
                    </div>

                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{quote.serviceType}</h4>
                          <p className="text-sm text-gray-400">Requested by {quote.requesterName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            quote.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                            quote.status === 'accepted' ? 'bg-green-500/10 text-green-500' :
                            quote.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                            'bg-blue-500/10 text-blue-500'
                          }`}>
                            {quote.status}
                          </span>
                          <span className="bg-purple-500/10 text-purple-500 px-2 py-1 rounded text-xs font-medium">
                            {quote.platform}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-4">{quote.description}</p>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-gray-400">Budget Range</span>
                          </div>
                          <p className="text-sm font-medium text-white">{quote.budget}</p>
                        </div>
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-xs text-gray-400">Received</span>
                          </div>
                          <p className="text-sm font-medium text-white">{new Date(quote.receivedDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {quote.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => {
                                setSelectedQuoteRequest(quote);
                                setShowSubmitQuoteModal(true);
                              }}
                              className="flex-1 bg-[#24c6dc]/10 text-[#24c6dc] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#24c6dc]/20 transition-all flex items-center justify-center gap-2"
                            >
                              <FileText className="w-4 h-4" />
                              Submit Quote
                            </button>
                            <button
                              onClick={() => {
                                setSelectedQuoteRequest(quote);
                                setShowViewQuoteModal(true);
                              }}
                              className="flex-1 bg-purple-500/10 text-purple-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-500/20 transition-all flex items-center justify-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button 
                              onClick={() => {
                                setMessageRecipient({
                                  name: quote.requesterName,
                                  avatar: quote.requesterAvatar,
                                  context: `Quote Request: ${quote.serviceType}`
                                });
                                setShowMessageModal(true);
                              }}
                              className="px-4 py-2 bg-gray-500/10 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-500/20 transition-all"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </>
                        ) : quote.status === 'accepted' ? (
                          <>
                            <button
                              onClick={() => {
                                setSelectedQuoteRequest(quote);
                                setShowViewQuoteModal(true);
                              }}
                              className="flex-1 bg-[#24c6dc]/10 text-[#24c6dc] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#24c6dc]/20 transition-all flex items-center justify-center gap-2"
                            >
                              <FileText className="w-4 h-4" />
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                setMessageRecipient({
                                  name: quote.requesterName,
                                  avatar: quote.requesterAvatar,
                                  context: `Quote: ${quote.serviceType}`
                                });
                                setShowMessageModal(true);
                              }}
                              className="flex-1 bg-green-500/10 text-green-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-all flex items-center justify-center gap-2"
                            >
                              <MessageSquare className="w-4 h-4" />
                              Message Client
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedQuoteRequest(quote);
                              setShowViewQuoteModal(true);
                            }}
                            className="flex-1 bg-[#24c6dc]/10 text-[#24c6dc] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#24c6dc]/20 transition-all flex items-center justify-center gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {quoteRequests.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No quote requests yet</h3>
                <p className="text-gray-400 mb-6">Quote requests from Quotify will appear here</p>
                <button
                  onClick={() => navigate('/quotify')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Quotify
                </button>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'opportunities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Opportunities Dashboard</h3>
                <p className="text-gray-400">Track and manage all your posted opportunities</p>
              </div>
              <button
                onClick={() => setShowPostOpportunityModal(true)}
                className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all"
              >
                <Plus className="w-5 h-5" />
                Post New Opportunity
              </button>
            </div>

            {/* Opportunity Cards */}
            <div className="space-y-6">
              {opportunities.map((opp, index) => (
                <motion.div
                  key={opp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-[#24c6dc]/50 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-white">{opp.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          opp.status === 'active' ? 'bg-green-500/10 text-green-500' :
                          opp.status === 'paused' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-gray-500/10 text-gray-500'
                        }`}>
                          {opp.status}
                        </span>
                        <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-xs font-medium">
                          {opp.type}
                        </span>
                        {opp.quoteAccepted && (
                          <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Quote Accepted
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{opp.businessName} • Posted on {new Date(opp.postedDate).toLocaleDateString()}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          opp.platform === 'Both' ? 'bg-gradient-to-r from-[#24c6dc]/20 to-purple-500/20 text-[#24c6dc]' :
                          opp.platform === 'Dofracto' ? 'bg-[#24c6dc]/10 text-[#24c6dc]' :
                          'bg-purple-500/10 text-purple-400'
                        }`}>
                          📢 {opp.platform}
                        </span>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                      {opp.status === 'active' ? (
                        <button
                          onClick={() => toast.info('Opportunity paused')}
                          className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition-all"
                          title="Pause"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => toast.success('Opportunity resumed')}
                          className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-all"
                          title="Resume"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => toast.info('Edit opportunity')}
                        className="p-2 bg-[#24c6dc]/10 text-[#24c6dc] rounded-lg hover:bg-[#24c6dc]/20 transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toast.info('Archived')}
                        className="p-2 bg-gray-500/10 text-gray-400 rounded-lg hover:bg-gray-500/20 transition-all"
                        title="Archive"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Community Contribution Progress */}
                  {opp.type === 'Community Support' && (
                    <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-500" />
                          <span className="text-sm font-medium text-white">Community Contributions</span>
                        </div>
                        <span className="text-sm font-bold text-green-500">
                          ₹{opp.contributionReceived.toLocaleString()} / ₹{opp.contributionGoal.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                          style={{ width: `${(opp.contributionReceived / opp.contributionGoal) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {Math.round((opp.contributionReceived / opp.contributionGoal) * 100)}% funded
                      </p>
                    </div>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-[#1a1a1a] rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-xs text-gray-400">Applicants</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{opp.applicants}</p>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs text-gray-400">Active Workers</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{opp.activeWorkers.length}</p>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-gray-400">Avg Progress</span>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {opp.activeWorkers.length > 0
                          ? Math.round(opp.activeWorkers.reduce((sum, w) => sum + w.progress, 0) / opp.activeWorkers.length)
                          : 0}%
                      </p>
                    </div>
                  </div>

                  {/* Active Workers */}
                  {opp.activeWorkers.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-[#24c6dc]" />
                        <h5 className="text-sm font-medium text-white">Active Contributors</h5>
                      </div>
                      <div className="space-y-3">
                        {opp.activeWorkers.map((worker, idx) => (
                          <div key={idx} className="bg-[#1a1a1a] rounded-lg p-3">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-lg">
                                {worker.avatar}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">{worker.name}</p>
                                <p className="text-xs text-gray-400">{worker.role}</p>
                              </div>
                              <span className="text-sm font-bold text-[#24c6dc]">{worker.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] transition-all duration-500"
                                style={{ width: `${worker.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-800">
                    <button
                      onClick={() => {
                        setSelectedOpportunity(opp);
                        setShowApplicantsModal(true);
                      }}
                      className="flex-1 bg-blue-500/10 text-blue-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      View Applicants ({opp.applicants})
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOpportunity(opp);
                        setShowOpportunityDetailsModal(true);
                      }}
                      className="flex-1 bg-[#24c6dc]/10 text-[#24c6dc] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#24c6dc]/20 transition-all flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      View Details
                    </button>
                    <button
                      onClick={() => toast.info('Generating report')}
                      className="px-4 py-2 bg-purple-500/10 text-purple-500 rounded-lg text-sm font-medium hover:bg-purple-500/20 transition-all"
                      title="Download Report"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {opportunities.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No opportunities posted yet</h3>
                <p className="text-gray-400 mb-6">Start by posting your first opportunity to connect with talent</p>
                <button
                  onClick={() => setShowPostOpportunityModal(true)}
                  className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Post Your First Opportunity
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Post Opportunity Modal */}
      <PostOpportunityModal
        isOpen={showPostOpportunityModal}
        onClose={() => setShowPostOpportunityModal(false)}
        businessName="TechVenture AI"
        onSubmit={(data: OpportunityData) => {
          console.log('Posted opportunity:', data);
          toast.success('Opportunity posted successfully! 🎉');
          setShowPostOpportunityModal(false);
        }}
      />

      {/* Submit Quote Modal */}
      {selectedQuoteRequest && (
        <SubmitQuoteModal
          isOpen={showSubmitQuoteModal}
          onClose={() => {
            setShowSubmitQuoteModal(false);
            setSelectedQuoteRequest(null);
          }}
          quoteRequest={{
            id: selectedQuoteRequest.id,
            serviceType: selectedQuoteRequest.serviceType,
            requesterName: selectedQuoteRequest.requesterName,
            budget: selectedQuoteRequest.budget,
            description: selectedQuoteRequest.description
          }}
          onSubmit={(quoteData: QuoteSubmissionData) => {
            console.log('Quote submitted:', quoteData);
            // Here you would typically send this to your backend
            setShowSubmitQuoteModal(false);
            setSelectedQuoteRequest(null);
          }}
        />
      )}

      {/* View Quote Details Modal */}
      {selectedQuoteRequest && (
        <ViewQuoteDetailsModal
          isOpen={showViewQuoteModal}
          onClose={() => {
            setShowViewQuoteModal(false);
            setSelectedQuoteRequest(null);
          }}
          quote={selectedQuoteRequest}
          onSubmitQuote={() => {
            setShowViewQuoteModal(false);
            setShowSubmitQuoteModal(true);
          }}
          onMessage={() => {
            setMessageRecipient({
              name: selectedQuoteRequest.requesterName,
              avatar: selectedQuoteRequest.requesterAvatar,
              context: `Quote Request: ${selectedQuoteRequest.serviceType}`
            });
            setShowViewQuoteModal(false);
            setShowMessageModal(true);
          }}
        />
      )}

      {/* Edit Business Modal */}
      {selectedBusiness && (
        <EditBusinessModal
          isOpen={showEditBusinessModal}
          onClose={() => {
            setShowEditBusinessModal(false);
            setSelectedBusiness(null);
          }}
          business={selectedBusiness}
          onSave={(updatedBusiness) => {
            console.log('Business updated:', updatedBusiness);
            // Here you would update the business in your state/backend
            setShowEditBusinessModal(false);
            setSelectedBusiness(null);
          }}
        />
      )}

      {/* View Applicants Modal */}
      {selectedOpportunity && (
        <ViewApplicantsModal
          isOpen={showApplicantsModal}
          onClose={() => {
            setShowApplicantsModal(false);
            setSelectedOpportunity(null);
          }}
          opportunityTitle={selectedOpportunity.title}
          applicants={mockApplicants}
        />
      )}

      {/* Opportunity Details Modal */}
      {selectedOpportunity && (
        <OpportunityDetailsModal
          isOpen={showOpportunityDetailsModal}
          onClose={() => {
            setShowOpportunityDetailsModal(false);
            setSelectedOpportunity(null);
          }}
          opportunity={{
            ...selectedOpportunity,
            location: 'Remote / Bangalore',
            salary: '₹5L - ₹8L',
            posted: new Date(selectedOpportunity.postedDate).toLocaleDateString(),
            description: 'We are looking for a talented full stack developer to help us build our MVP. You will work closely with the founding team to bring our vision to life.',
            requirements: [
              '3+ years of experience with React and Node.js',
              'Strong understanding of MongoDB and RESTful APIs',
              'Experience with TypeScript and modern web development practices',
              'Good communication skills and ability to work independently'
            ],
            responsibilities: [
              'Design and develop scalable web applications',
              'Collaborate with the team to define product features',
              'Write clean, maintainable, and well-documented code',
              'Participate in code reviews and provide constructive feedback'
            ],
            benefits: [
              'Flexible working hours',
              'Remote work option',
              'Health insurance',
              'Learning & development budget',
              'Equity options',
              'Quarterly team offsites'
            ],
            duration: '6 months',
            workMode: 'Hybrid',
            experienceLevel: 'Mid-Senior Level'
          }}
        />
      )}

      {/* Message Modal */}
      {messageRecipient && (
        <MessageModal
          isOpen={showMessageModal}
          onClose={() => {
            setShowMessageModal(false);
            setMessageRecipient(null);
          }}
          recipientName={messageRecipient.name}
          recipientAvatar={messageRecipient.avatar}
          context={messageRecipient.context}
        />
      )}
    </div>
  );
}