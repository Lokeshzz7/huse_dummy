import { useState, useRef, useEffect } from 'react';
import { AvatarDisplay } from '../components/AvatarDisplay';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Briefcase, ShoppingBag, Sparkles,
  Star, Award, TrendingUp, CheckCircle,
  Calendar, Trophy, Target, MessageCircle,
  Search, Filter, MapPin, Clock, DollarSign,
  Heart, Share2, ExternalLink, Send, Bell,
  ThumbsUp, Eye, Bookmark, Plus, Hash,
  Zap, Flame, Activity, TrendingDown,
  Code, Palette, Megaphone, Coffee, Rocket,
  UserPlus, Settings, Edit3, MoreHorizontal,
  Image, Video, Link as LinkIcon, Smile, X, ChevronRight,
  MessageSquare, Repeat2, Upload, Globe, Crown,
  BarChart3, Home, LogOut, Menu, ArrowRight,
  Package, Layers, Brain, Lightbulb, School,
  GraduationCap, Building2, ShieldCheck, Lock,
  BookOpen, Cpu, Wand2, Gift, ChevronDown, Shield, EyeOff
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AddProjectModal, PostGigModal, ApplyGigModal, SellItemModal, ContactSellerModal, SettingsModal, EditProfileModal } from '../components/HuseCircleModals';
import { ProofPortfolioAddProjectModal, ProofPortfolioRequestVerificationModal } from '../components/ProofPortfolioModals';
import { GraduateModal } from '../components/GraduateModal';
import { TierUnlockModal } from '../components/TierUnlockModal';
import { EventsModal } from '../components/EventsModal';
import { ContributorUnlockModal } from '../components/ContributorUnlockModal';
import { StartupApplicationModal } from '../components/StartupApplicationModal';
import { QuoteMarketplace } from './quotify/QuoteMarketplace';
import { JobBoard } from '../components/JobBoard';
import { ProgressionBar } from '../components/ProgressionBar';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { useMessaging } from '../context/MessagingContext';
import { TIER_THRESHOLDS, calculateTier } from '../utils/tierSystem';
import { VERIFICATION_BADGES, type BadgeType } from '../utils/verificationBadges';
import { LINK_TYPES, getContextualButtons } from '../utils/linkTypes';
import { SKILL_CATEGORIES, ALL_SKILL_TAGS } from '../utils/skillTags';
import { apiGet, apiPost } from '../../lib/api';

type Tab = 'feed' | 'portfolio' | 'gigs' | 'marketplace' | 'leaderboard' | 'quotes' | 'jobs' | 'dashboard';

// Mock colleges data
const colleges = [
  { id: 'iit-bombay', name: 'IIT Bombay', students: 8234, color: 'from-blue-500 to-cyan-500', emoji: '🏛️' },
  { id: 'iit-delhi', name: 'IIT Delhi', students: 7891, color: 'from-red-500 to-orange-500', emoji: '🎓' },
  { id: 'iit-madras', name: 'IIT Madras', students: 8521, color: 'from-indigo-500 to-purple-500', emoji: '⭐' },
  { id: 'bits-pilani', name: 'BITS Pilani', students: 6543, color: 'from-purple-500 to-pink-500', emoji: '🏫' },
  { id: 'nit-trichy', name: 'NIT Trichy', students: 5432, color: 'from-green-500 to-emerald-500', emoji: '🎯' },
  { id: 'iiit-hyderabad', name: 'IIIT Hyderabad', students: 4321, color: 'from-amber-500 to-yellow-500', emoji: '💻' },
];

export function HuseCirclePlatform() {
  const navigate = useNavigate();
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const { getUnreadCount } = useMessaging();
  const { user, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<Tab>('dashboard'); // Show progression first!
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(user?.college_id || 'iit-bombay'); // User's college
  const [viewMode, setViewMode] = useState<'my-house' | 'all-houses'>('my-house');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showTierModal, setShowTierModal] = useState(false);
  const [showGraduateModal, setShowGraduateModal] = useState(false);
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [showContributorModal, setShowContributorModal] = useState(false);
  const [showStartupModal, setShowStartupModal] = useState(false);
  const [attemptedFeature, setAttemptedFeature] = useState<string>('');

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/husecircle/student/login');
      return;
    }
  }, [user, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Current user data from AuthContext
  const currentUser = {
    name: user?.name || 'Guest',
    handle: user?.handle || '@guest',
    avatar: user?.avatar || '👤',
    college: user?.college_name || 'Unknown College',
    collegeId: user?.college_id || 'unknown',
    year: user?.current_year_of_study ? `${user.current_year_of_study} Year` : 'N/A',
    branch: user?.department || 'N/A',
    reputation: user?.reputation || 0,
    rank: 23, // This could be calculated from reputation
    verified: user?.verified || false,
    tier: user?.tier || 'Bronze',
    role: user?.role || 'student' as const
  };

  // Tier permission checking
  const checkTierPermission = (feature: string, requiredTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Contributor' | 'Startup') => {
    const tierLevels = { Bronze: 0, Silver: 1, Gold: 2, Platinum: 3, Contributor: 4, 'Startup': 5 };
    const userLevel = tierLevels[currentUser.tier as keyof typeof tierLevels] || 0;
    const requiredLevel = tierLevels[requiredTier];
    
    if (userLevel < requiredLevel) {
      setAttemptedFeature(feature);
      setShowTierModal(true);
      toast.error(`${feature} requires ${requiredTier} tier or higher`);
      return false;
    }
    return true;
  };

  const handleMessagingClick = () => {
    if (checkTierPermission('Direct Messaging', 'Gold')) {
      navigate('/husecircle/student/chats');
    }
  };

  const handlePostGigClick = () => {
    if (checkTierPermission('Post Gigs', 'Platinum')) {
      setActiveTab('gigs'); // Navigate to gigs tab where they can post
    }
  };

  const tabs = [
    { id: 'dashboard' as Tab, label: 'My Progress', icon: BarChart3 },
    { id: 'feed' as Tab, label: 'House Feed', icon: Activity, badge: 12 },
    { id: 'portfolio' as Tab, label: 'Proof Portfolio', icon: Shield },
    { id: 'jobs' as Tab, label: 'Job Board', icon: Building2, badge: 12 },
    { id: 'gigs' as Tab, label: 'Gigs Board', icon: Briefcase, badge: 8 },
    { id: 'marketplace' as Tab, label: 'Marketplace', icon: ShoppingBag, badge: 5 },
    { id: 'quotes' as Tab, label: 'Quote Opportunities', icon: DollarSign, badge: 7, tier: 'Platinum' },
    { id: 'leaderboard' as Tab, label: 'Leaderboard', icon: Trophy }
  ];

  return (
    <>
      {/* Using custom HUSE Circle header - EcosystemNav removed to maintain platform-specific design */}
      
      <div className="huse-platform min-h-screen bg-[#050505] relative" style={{ fontFamily: 'var(--font-body)' }}>
        {/* Custom Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] huse-animated-bg" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] huse-animated-bg" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] huse-animated-bg" style={{ animationDelay: '2s' }} />
        </div>

        {/* Custom Header for HUSE - keeping for house selector and view mode toggle */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-purple-500/20">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <GraduationCap className="text-white" size={20} />
                  </div>
                  <div>
                    <h1 className="text-[20px] font-bold huse-gradient-text leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                      HUSE Circle
                    </h1>
                    <p className="text-[10px] text-purple-400">College Builder Network</p>
                  </div>
                </div>

                {/* House Selector */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 huse-glass rounded-full">
                  <School className="text-purple-400" size={16} />
                  <span className="text-white text-[13px] font-medium">{currentUser.college}</span>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronDown size={16} />
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden lg:flex items-center gap-1 p-1 bg-[#1A1A1A] rounded-full">
                  <button
                    onClick={() => setViewMode('my-house')}
                    className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                      viewMode === 'my-house'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    My House
                  </button>
                  <button
                    onClick={() => setViewMode('all-houses')}
                    className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                      viewMode === 'all-houses'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    All Houses
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Reputation Display */}
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 huse-glass rounded-full">
                  <Zap className="text-amber-400" size={16} />
                  <span className="text-amber-400 font-bold text-[14px]">{currentUser.reputation}</span>
                  <span className="text-gray-500 text-[12px]">Rep</span>
                </div>

                {/* Challenges Button */}
                <button
                  onClick={() => navigate('/husecircle/student/platform/challenges')}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  title="Complete challenges to earn rep"
                >
                  <Target size={16} className="text-white" />
                  <span className="text-white font-medium text-[13px]">Challenges</span>
                </button>

                {/* Verification Hub Button */}
                <button
                  onClick={() => navigate('/husecircle/verify/hub')}
                  className="hidden lg:flex items-center gap-2 px-4 py-2 huse-glass border border-purple-500/20 hover:border-purple-500/40 rounded-full transition-all"
                  title="Review projects and earn rep"
                >
                  <Shield size={16} className="text-purple-400" />
                  <span className="text-white font-medium text-[13px]">Verify</span>
                </button>

                <button 
                  onClick={() => navigate('/search')}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Search"
                >
                  <Search size={20} />
                </button>
                <button 
                  onClick={() => navigate('/husecircle/student/notifications')}
                  className="relative p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
                </button>
                <button 
                  onClick={handleMessagingClick}
                  className="relative p-2 text-gray-400 hover:text-white transition-colors group"
                  title={currentUser.tier === 'Bronze' || currentUser.tier === 'Silver' ? 'Unlock at Gold tier' : 'Messages'}
                >
                  <MessageSquare size={20} />
                  {getUnreadCount() > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-purple-500 rounded-full flex items-center justify-center text-xs text-white font-bold px-1">
                      {getUnreadCount()}
                    </span>
                  )}
                  {(currentUser.tier === 'Bronze' || currentUser.tier === 'Silver') && (
                    <Lock size={10} className="absolute -bottom-1 -right-1 text-red-400" />
                  )}
                </button>
                <div ref={profileDropdownRef} className="relative">
                  <button 
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="relative group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-[18px] cursor-pointer hover:scale-110 transition-transform">
                      <AvatarDisplay avatar={currentUser.avatar} />
                    </div>
                    {currentUser.verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-[#0F0F0F] flex items-center justify-center">
                        <CheckCircle size={10} className="text-white" />
                      </div>
                    )}
                  </button>

                  {/* Profile Dropdown Menu */}
                  <AnimatePresence>
                    {showProfileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-72 huse-glass border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl"
                      >
                        {/* User Info Section */}
                        <div className="p-4 border-b border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-[24px]">
                              <AvatarDisplay avatar={currentUser.avatar} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-white font-bold text-[15px]">{currentUser.name}</h3>
                                {currentUser.verified && (
                                  <CheckCircle size={14} className="text-green-400" />
                                )}
                              </div>
                              <p className="text-purple-300 text-[12px]">{currentUser.handle}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <div className={`px-2 py-0.5 rounded-full ${
                                  currentUser.tier === 'Platinum' ? 'bg-blue-500/20' :
                                  currentUser.tier === 'Gold' ? 'bg-amber-500/20' :
                                  currentUser.tier === 'Silver' ? 'bg-gray-400/20' :
                                  'bg-orange-500/20'
                                }`}>
                                  <span className={`text-[10px] font-bold ${
                                    currentUser.tier === 'Platinum' ? 'text-blue-400' :
                                    currentUser.tier === 'Gold' ? 'text-amber-400' :
                                    currentUser.tier === 'Silver' ? 'text-gray-300' :
                                    'text-orange-400'
                                  }`}>{currentUser.tier}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Zap size={12} className="text-amber-400" />
                                  <span className="text-amber-400 text-[11px] font-bold">{currentUser.reputation}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setShowProfileDropdown(false);
                              setActiveTab('portfolio');
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all group"
                          >
                            <Rocket size={18} className="text-purple-400 group-hover:text-purple-300" />
                            <div className="flex-1 text-left">
                              <div className="text-[13px] font-medium">My Portfolio</div>
                              <div className="text-[11px] text-gray-500">View your projects</div>
                            </div>
                            <ChevronRight size={16} className="text-gray-600 group-hover:text-purple-400" />
                          </button>

                          <button
                            onClick={() => {
                              setShowProfileDropdown(false);
                              setShowSettingsModal(true);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all group"
                          >
                            <Settings size={18} className="text-purple-400 group-hover:text-purple-300" />
                            <div className="flex-1 text-left">
                              <div className="text-[13px] font-medium">Settings</div>
                              <div className="text-[11px] text-gray-500">Account preferences</div>
                            </div>
                            <ChevronRight size={16} className="text-gray-600 group-hover:text-purple-400" />
                          </button>

                          <button
                            onClick={() => {
                              setShowProfileDropdown(false);
                              setShowEditProfileModal(true);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all group"
                          >
                            <Edit3 size={18} className="text-purple-400 group-hover:text-purple-300" />
                            <div className="flex-1 text-left">
                              <div className="text-[13px] font-medium">Edit Profile</div>
                              <div className="text-[11px] text-gray-500">Update your info</div>
                            </div>
                            <ChevronRight size={16} className="text-gray-600 group-hover:text-purple-400" />
                          </button>

                          <div className="my-2 h-px bg-purple-500/20" />

                          <button
                            onClick={() => {
                              setShowProfileDropdown(false);
                              logout();
                              toast.success('Logged out successfully');
                              navigate('/husecircle/student/login');
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all group"
                          >
                            <LogOut size={18} />
                            <div className="flex-1 text-left">
                              <div className="text-[13px] font-medium">Logout</div>
                              <div className="text-[11px] text-red-500/70">Sign out of HUSE Circle</div>
                            </div>
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
        
        <main className="pt-[80px] pb-0">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Sidebar */}
              <div className="hidden lg:block lg:col-span-2 xl:col-span-2 h-screen sticky top-[80px] p-4 border-r border-purple-500/10 overflow-y-auto scrollbar-hide">
                <LeftSidebar 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  tabs={tabs}
                  currentUser={currentUser}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-7 xl:col-span-7 min-h-screen border-r border-purple-500/10">
                {/* Mobile Tab Navigation */}
                <div className="lg:hidden sticky top-[80px] z-40 bg-[#0F0F0F] border-b border-purple-500/10">
                  <div className="flex overflow-x-auto scrollbar-hide">
                    {tabs.map((tab: any) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-all relative ${
                            activeTab === tab.id
                              ? 'text-purple-400'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <Icon size={18} />
                          <span className="font-medium text-[13px]" style={{ fontFamily: 'var(--font-display)' }}>{tab.label}</span>
                          {tab.tier && (
                            <Crown size={14} className="text-amber-400" />
                          )}
                          {tab.badge && (
                            <span className="absolute top-2 right-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                              {tab.badge}
                            </span>
                          )}
                          {activeTab === tab.id && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'dashboard' && <ProgressionDashboard currentUser={currentUser} setActiveTab={setActiveTab} setShowGraduateModal={setShowGraduateModal} setShowEventsModal={setShowEventsModal} setShowContributorModal={setShowContributorModal} setShowStartupModal={setShowStartupModal} />}
                    {activeTab === 'feed' && <HouseFeed viewMode={viewMode} currentUser={currentUser} setShowPostModal={setShowPostModal} />}
                    {activeTab === 'portfolio' && <StudentPortfolio currentUser={currentUser} />}
                    {activeTab === 'jobs' && <JobBoard currentUser={currentUser} />}
                    {activeTab === 'gigs' && <GigsBoard currentUser={currentUser} />}
                    {activeTab === 'marketplace' && <StudentMarketplace currentUser={currentUser} />}
                    {activeTab === 'quotes' && <QuoteMarketplace userType="student" userTier={currentUser.tier} />}
                    {activeTab === 'leaderboard' && <HouseLeaderboard currentUser={currentUser} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Sidebar */}
              <div className="hidden xl:block xl:col-span-3 h-screen sticky top-[80px] p-4 overflow-y-auto scrollbar-hide">
                <RightSidebar currentUser={currentUser} />
              </div>
            </div>
          </div>
        </main>

        {/* Floating Action Button */}
        <button
          onClick={() => setShowPostModal(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center huse-glow-purple hover:scale-110 transition-all z-50 group"
        >
          <Plus className="text-white group-hover:rotate-90 transition-transform duration-300" size={28} />
        </button>

        {/* Post Modal */}
        {showPostModal && <PostModal onClose={() => setShowPostModal(false)} currentUser={currentUser} />}
        
        {/* Settings Modal */}
        <SettingsModal
          show={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          currentUser={currentUser}
        />
        
        {/* Edit Profile Modal */}
        <EditProfileModal
          show={showEditProfileModal}
          onClose={() => setShowEditProfileModal(false)}
          currentUser={currentUser}
        />
        
        {/* Tier Unlock Modal */}
        <TierUnlockModal
          isOpen={showTierModal}
          onClose={() => {
            setShowTierModal(false);
            setAttemptedFeature('');
          }}
          userTier={currentUser.tier as 'Bronze' | 'Silver' | 'Gold' | 'Platinum'}
          attemptedFeature={attemptedFeature}
        />
        
        {/* Graduate Modal */}
        <GraduateModal
          isOpen={showGraduateModal}
          onClose={() => setShowGraduateModal(false)}
          studentId={currentUser.handle}
          studentName={currentUser.name}
          college={currentUser.college}
        />
        
        {/* Events Modal */}
        <EventsModal
          isOpen={showEventsModal}
          onClose={() => setShowEventsModal(false)}
          currentUser={currentUser}
        />
        
        {/* Contributor Unlock Modal */}
        <ContributorUnlockModal
          isOpen={showContributorModal}
          onClose={() => setShowContributorModal(false)}
          currentReputation={currentUser.reputation}
          onUnlock={(method) => {
            toast.success(method === 'merit' ? '🏆 Contributor tier unlocked via merit!' : '🎉 Payment successful! Welcome to Contributor tier!');
            setShowContributorModal(false);
          }}
          isFreeAlumni={currentUser.tier === 'Platinum' && currentUser.reputation >= TIER_THRESHOLDS.Platinum.min}
        />
        
        {/* Startup Application Modal */}
        <StartupApplicationModal
          isOpen={showStartupModal}
          onClose={() => setShowStartupModal(false)}
          currentReputation={currentUser.reputation}
          onUnlock={(method) => {
            toast.success(method === 'merit' ? '👑 Startup tier unlocked! You earned it!' : '📧 Application submitted! We\'ll contact you within 24 hours.');
            setShowStartupModal(false);
          }}
        />
      </div>
    </>
  );
}

// Left Sidebar Component
function LeftSidebar({ activeTab, setActiveTab, tabs, currentUser }: any) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <div className="huse-glass rounded-[20px] p-4 huse-hover-lift">
        <div className="text-center mb-4">
          <div className="relative inline-block">
            <div 
              className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-[28px] cursor-pointer" 
              onClick={() => navigate('/user/dashboard')}
            >
              <AvatarDisplay avatar={currentUser.avatar} />
            </div>
            {currentUser.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-[#0F0F0F] flex items-center justify-center">
                <CheckCircle size={12} className="text-white" />
              </div>
            )}
          </div>
          <h3 className="text-white font-bold text-[14px] cursor-pointer hover:text-purple-400 transition-colors" style={{ fontFamily: 'var(--font-display)' }} onClick={() => navigate('/user/dashboard')}>
            {currentUser.name}
          </h3>
          <p className="text-purple-400 text-[11px] mb-1">{currentUser.handle}</p>
          <p className="text-gray-500 text-[10px]">{currentUser.year} • {currentUser.branch}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-purple-500/20">
          <div className="text-center p-2 rounded-[10px] bg-purple-500/10">
            <p className="huse-gradient-gold font-bold text-[16px]">{currentUser.reputation}</p>
            <p className="text-gray-500 text-[9px]">Reputation</p>
          </div>
          <div className="text-center p-2 rounded-[10px] bg-amber-500/10">
            <p className="text-amber-400 font-bold text-[16px]">#{currentUser.rank}</p>
            <p className="text-gray-500 text-[9px]">House Rank</p>
          </div>
        </div>

        {/* Tier Badge */}
        <div className="mt-3 text-center">
          <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] rounded-full font-bold">
            {currentUser.tier} Tier
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {tabs.map((tab: any) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[15px] transition-all relative group ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium text-[13px]" style={{ fontFamily: 'var(--font-display)' }}>{tab.label}</span>
              {tab.tier && (
                <Crown size={14} className="text-amber-400" />
              )}
              {tab.badge && (
                <span className="ml-auto w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="huse-glass rounded-[20px] p-4">
        <h4 className="text-white font-bold text-[12px] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <Activity size={14} className="text-purple-400" />
          This Week
        </h4>
        <div className="space-y-2 text-[11px]">
          <div className="flex items-center justify-between p-2 rounded-[10px] hover:bg-purple-500/10 transition-colors">
            <span className="text-gray-400">Posts</span>
            <span className="text-purple-400 font-bold">12</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-[10px] hover:bg-purple-500/10 transition-colors">
            <span className="text-gray-400">Rep Earned</span>
            <span className="text-amber-400 font-bold">+47</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-[10px] hover:bg-purple-500/10 transition-colors">
            <span className="text-gray-400">Gigs Completed</span>
            <span className="text-green-400 font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Back to Main Site */}
      <Link
        to="/"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40 rounded-[15px] transition-all"
      >
        <Home size={14} />
        <span className="text-[12px]" style={{ fontFamily: 'var(--font-display)' }}>Back to Main</span>
      </Link>
    </div>
  );
}

// Right Sidebar Component
function RightSidebar({ currentUser }: any) {
  const topHouses = [
    { name: 'IIT Bombay', students: 8234, posts: 2341, emoji: '🏛️', color: 'from-blue-500 to-cyan-500' },
    { name: 'IIT Delhi', students: 7891, posts: 2156, emoji: '🎓', color: 'from-red-500 to-orange-500' },
    { name: 'BITS Pilani', students: 6543, posts: 1987, emoji: '🏫', color: 'from-purple-500 to-pink-500' }
  ];

  const trendingSkills = [
    { skill: 'React.js', students: 342, trend: '+15%', color: 'text-blue-400' },
    { skill: 'Machine Learning', students: 289, trend: '+23%', color: 'text-purple-400' },
    { skill: 'UI/UX Design', students: 234, trend: '+12%', color: 'text-pink-400' },
    { skill: 'DevOps', students: 187, trend: '+8%', color: 'text-green-400' }
  ];

  const upcomingEvents = [
    { title: 'Hackathon 2024', date: 'Dec 25', participants: 234, emoji: '💻' },
    { title: 'Design Workshop', date: 'Dec 28', participants: 156, emoji: '🎨' },
    { title: 'Career Fair', date: 'Jan 5', participants: 567, emoji: '💼' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Houses */}
      <div className="huse-glass rounded-[20px] p-5 huse-hover-lift">
        <div className="flex items-center gap-2 mb-4">
          <School className="text-purple-400" size={18} />
          <h3 className="text-white font-bold text-[14px]" style={{ fontFamily: 'var(--font-display)' }}>Top Houses</h3>
        </div>
        
        <div className="space-y-3">
          {topHouses.map((house, i) => (
            <div key={i} className="group cursor-pointer hover:bg-purple-500/10 p-3 rounded-[12px] transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${house.color} flex items-center justify-center text-[20px]`}>
                  {house.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-[13px] truncate" style={{ fontFamily: 'var(--font-display)' }}>
                    {house.name}
                  </p>
                  <p className="text-gray-500 text-[10px]">{house.students.toLocaleString()} students</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 font-bold text-[12px]">{house.posts}</p>
                  <p className="text-gray-600 text-[9px]">posts</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Skills */}
      <div className="huse-glass rounded-[20px] p-5 huse-hover-lift">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-orange-500" size={18} />
          <h3 className="text-white font-bold text-[14px]" style={{ fontFamily: 'var(--font-display)' }}>Trending Skills</h3>
        </div>
        
        <div className="space-y-3">
          {trendingSkills.map((item, i) => (
            <div key={i} className="group cursor-pointer hover:bg-purple-500/10 p-2 rounded-[10px] transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${item.color} font-medium text-[12px]`}>{item.skill}</p>
                  <p className="text-gray-500 text-[10px]">{item.students} learning</p>
                </div>
                <div className="flex items-center gap-1 text-green-400 text-[10px] font-bold">
                  <TrendingUp size={10} />
                  <span>{item.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="huse-glass rounded-[20px] p-5 huse-hover-lift">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-amber-400" size={18} />
          <h3 className="text-white font-bold text-[14px]" style={{ fontFamily: 'var(--font-display)' }}>Upcoming</h3>
        </div>
        
        <div className="space-y-3">
          {upcomingEvents.map((event, i) => (
            <div key={i} className="group cursor-pointer hover:bg-purple-500/10 p-3 rounded-[12px] transition-all border border-purple-500/10">
              <div className="flex items-start gap-3">
                <div className="text-[24px]">{event.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-[12px] mb-1">{event.title}</p>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-purple-400">{event.date}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500">{event.participants} going</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-3 text-purple-400 text-[12px] hover:text-purple-300 transition-colors font-medium">
          View all events →
        </button>
      </div>

      {/* Recruiter Notice */}
      <div className="huse-glass rounded-[20px] p-5 border border-amber-500/20">
        <div className="flex items-start gap-3 mb-3">
          <Building2 className="text-amber-400" size={20} />
          <div>
            <h3 className="text-white font-bold text-[13px] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              Recruiters Watching
            </h3>
            <p className="text-gray-400 text-[10px] leading-relaxed">
              Your posts and projects are visible to verified recruiters. Build in public!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-amber-400">
          <Eye size={12} />
          <span>23 companies viewing this week</span>
        </div>
      </div>
    </div>
  );
}

// Progression Dashboard Component
function ProgressionDashboard({ currentUser, setActiveTab, setShowGraduateModal, setShowEventsModal, setShowContributorModal, setShowStartupModal }: any) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-3xl font-bold mb-2">Welcome back, {currentUser.name}! 👋</h2>
            <p className="text-gray-400">Track your progress and see where you're heading</p>
          </div>
          <div className="w-full h-full flex items-center justify-center "><AvatarDisplay avatar={currentUser.avatar} /></div>
        </div>
      </div>

      {/* Graduate to Dofracto CTA - Only show if Gold tier or higher */}
      {(currentUser.tier === 'Gold' || currentUser.tier === 'Platinum') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500">
                    <Rocket className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white text-2xl font-bold">Ready to Graduate? 🚀</h3>
                    <p className="text-cyan-400 text-sm">You've achieved {currentUser.tier} tier - Time to launch your startup!</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Transform your student project into a real startup on Dofracto. Get funding, mentorship, and access to our accelerator network.
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-green-400" size={16} />
                    <span className="text-gray-300">HUSE Alumni Badge</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-green-400" size={16} />
                    <span className="text-gray-300">+200 Reputation Boost</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-green-400" size={16} />
                    <span className="text-gray-300">Priority Features</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowGraduateModal(true)}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <GraduationCap size={20} />
                  Graduate to Dofracto
                  <Sparkles size={20} />
                </button>
              </div>

              <div className="hidden lg:block">
                <div className="text-8xl opacity-20">🎓</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Progression Bar - Full Version */}
      <ProgressionBar 
        reputation={currentUser.reputation}
        userType="student"
        compact={false}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-amber-400" size={20} />
            <p className="text-gray-400 text-sm">Reputation</p>
          </div>
          <p className="text-white text-2xl font-bold">{currentUser.reputation}</p>
          <p className="text-green-400 text-xs mt-1">+127 this month</p>
        </div>
        <div className="bg-[#1A1A1A] border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="text-purple-400" size={20} />
            <p className="text-gray-400 text-sm">Rank</p>
          </div>
          <p className="text-white text-2xl font-bold">#{currentUser.rank}</p>
          <p className="text-green-400 text-xs mt-1">↑ 3 positions</p>
        </div>
        <div className="bg-[#1A1A1A] border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="text-blue-400" size={20} />
            <p className="text-gray-400 text-sm">Projects</p>
          </div>
          <p className="text-white text-2xl font-bold">12</p>
          <p className="text-blue-400 text-xs mt-1">5 featured</p>
        </div>
        <div className="bg-[#1A1A1A] border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="text-green-400" size={20} />
            <p className="text-gray-400 text-sm">Gigs Done</p>
          </div>
          <p className="text-white text-2xl font-bold">8</p>
          <p className="text-green-400 text-xs mt-1">100% rating</p>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-[#1A1A1A] border border-purple-500/20 rounded-2xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Recommended Actions to Boost Your Progress</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Rocket size={20} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold mb-1">Add a New Project</h4>
                <p className="text-gray-400 text-sm mb-3">Showcase your latest work to earn +50 reputation</p>
                <button 
                  onClick={() => setActiveTab('portfolio')}
                  className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-all"
                >
                  Add Project
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Briefcase size={20} className="text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold mb-1">Complete a Gig</h4>
                <p className="text-gray-400 text-sm mb-3">Finish one gig to earn +100 reputation</p>
                <button 
                  onClick={() => setActiveTab('gigs')}
                  className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-all"
                >
                  Browse Gigs
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Trophy size={20} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold mb-1">Win a Competition</h4>
                <p className="text-gray-400 text-sm mb-3">Participate in hackathons for +200 reputation</p>
                <button 
                  onClick={() => setShowEventsModal(true)}
                  className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg text-sm hover:bg-amber-500/30 transition-all"
                >
                  View Events
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold mb-1">Engage with Community</h4>
                <p className="text-gray-400 text-sm mb-3">Post or comment to earn +10 reputation</p>
                <button 
                  onClick={() => setActiveTab('feed')}
                  className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-all"
                >
                  Engage Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unlock Next Tier - For Platinum Students */}
      {currentUser.tier === 'Platinum' && currentUser.reputation >= TIER_THRESHOLDS.Platinum.min && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-pink-500/20 border-2 border-amber-500/30 rounded-2xl p-8 relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Crown className="text-white" size={40} />
              </div>
              <h3 className="text-white text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                🎊 Congratulations! You've Reached Platinum! 🎊
              </h3>
              <p className="text-gray-300 text-lg">
                You're ready for the next level. Choose your path:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Contributor Path */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-500/50 rounded-2xl cursor-pointer"
                onClick={() => setShowContributorModal(true)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Zap size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-display)' }}>Contributor Tier</h4>
                    <p className="text-purple-300 text-sm font-bold">🎁 1 Year FREE (₹499 value)</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">
                  Perfect for: Freelancers, Supporters, Service Providers
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle size={16} />
                    <span>10 Quotify quotes/week</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle size={16} />
                    <span>Support Dofracto startups</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle size={16} />
                    <span>Mentor students</span>
                  </div>
                </div>

                <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                  🎁 Claim FREE Access
                </button>
              </motion.div>

              {/* Business Owner Path */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-amber-500/30 to-orange-500/30 border-2 border-amber-500/50 rounded-2xl cursor-pointer"
                onClick={() => setShowStartupModal(true)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Rocket size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-display)' }}>Startup Tier</h4>
                    <p className="text-amber-300 text-sm">Contact Sales</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">
                  Perfect for: Startup Founders, Companies
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle size={16} />
                    <span>Unlimited Quotify requests</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle size={16} />
                    <span>Receive funding from Contributors</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle size={16} />
                    <span>Hire students for equity</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-amber-400 text-sm font-bold text-center">
                    🏆 Earn 300,000 rep → Get FREE for 1 year!
                  </p>
                  <p className="text-gray-400 text-xs text-center">
                    (Need {(TIER_THRESHOLDS.Contributor.min - currentUser.reputation).toLocaleString()} more rep)
                  </p>
                  <button className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all">
                    Apply for Access
                  </button>
                </div>
              </motion.div>
            </div>

            <p className="text-center text-gray-400 text-sm mt-6">
              💡 Tip: Most students start with FREE Contributor, build revenue, then upgrade to Startup!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// House Feed Content
function HouseFeed({ viewMode, currentUser, setShowPostModal }: any) {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());

  const posts = [
    {
      id: 1,
      user: {
        name: 'Priya Sharma',
        handle: '@priya_cse',
        avatar: '👩‍💻',
        college: 'IIT Bombay',
        year: '4th Year',
        verified: true,
        reputation: 1200
      },
      time: '2h ago',
      content: '🚀 Just deployed my final year project! A real-time collaborative code editor built with React, Node.js, and WebSockets. Check it out!',
      type: 'project',
      tags: ['React', 'Node.js', 'WebSockets', 'UI/UX Design'],
      stats: { likes: 234, comments: 45, shares: 12, views: 1200 },
      projectLink: 'https://github.com/priya/code-editor',
      recruitersViewed: 12,
      verificationBadges: ['peer_reviewed', 'client_rated'],
      proofScore: 'verified'
    },
    {
      id: 2,
      user: {
        name: 'Rahul Verma',
        handle: '@rahul_ml',
        avatar: '👨‍🔬',
        college: 'IIT Bombay',
        year: '3rd Year',
        verified: true,
        reputation: 980
      },
      time: '5h ago',
      content: 'Won 1st prize in the Inter-IIT ML Hackathon! 🏆 Our model achieved 94% accuracy on image classification. Team work makes the dream work!',
      type: 'achievement',
      tags: ['Machine Learning', 'Python', 'Data Analysis', 'Research'],
      stats: { likes: 567, comments: 89, shares: 34, views: 2800 },
      recruitersViewed: 23,
      verificationBadges: ['blind_verified', 'mentor_confirmed'],
      proofScore: 'high'
    },
    {
      id: 3,
      user: {
        name: 'Sneha Patel',
        handle: '@sneha_design',
        avatar: '👩‍🎨',
        college: viewMode === 'all-houses' ? 'BITS Pilani' : 'IIT Bombay',
        year: '2nd Year',
        verified: false,
        reputation: 645
      },
      time: '8h ago',
      content: 'Redesigned our college fest app UI! Clean, minimal, and fully responsive. Would love feedback from fellow designers 🎨',
      type: 'showcase',
      tags: ['UI/UX Design', 'Figma', 'Mobile Design', 'Graphic Design'],
      stats: { likes: 342, comments: 56, shares: 18, views: 1500 },
      recruitersViewed: 8,
      verificationBadges: ['peer_reviewed'],
      proofScore: 'medium'
    },
    {
      id: 4,
      user: { 
        name: 'Arjun Kumar', 
        handle: '@arjun_dev', 
        avatar: '👨‍💻', 
        college: 'IIT Bombay',
        year: '3rd Year',
        verified: true,
        reputation: 847
      },
      time: '1d ago',
      content: 'Anyone interested in building a startup together? Looking for a co-founder with design skills. DM me! 💡',
      type: 'discussion',
      tags: ['Startup', 'CoFounder', 'Opportunity'],
      stats: { likes: 123, comments: 67, shares: 23, views: 890 },
      recruitersViewed: 5
    }
  ];

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen">
      {/* Create Post Section */}
      <div className="sticky top-[80px] lg:top-0 z-30 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-purple-500/10 p-5">
        <div className="flex items-center gap-3">
          <div className="w-full h-full flex items-center justify-center "><AvatarDisplay avatar={currentUser.avatar} /></div>
          <button
            onClick={() => setShowPostModal(true)}
            className="flex-1 text-left px-5 py-3 huse-glass rounded-full text-gray-500 hover:border-purple-500/40 transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Share your progress, {currentUser.name.split(' ')[0]}...
          </button>
        </div>
      </div>

      {/* Daily Drop Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="m-6 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <EyeOff className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-white font-bold text-lg">Daily Drop Challenge</h3>
              <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 font-medium">Earn Blind Verified Badge</span>
            </div>
            <p className="text-white/80 mb-3">
              <strong>Today's Prompt:</strong> Build a component that displays user statistics with smooth animations
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-400">⏰ 8 hours left</span>
              <span className="text-purple-400">23 submissions</span>
              <button className="ml-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-sm font-semibold hover:shadow-lg transition-all">
                Submit Your Work
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Posts Feed */}
      <div className="divide-y divide-purple-500/10">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="p-6 hover:bg-purple-500/5 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Post Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="relative">
                <div className="w-full h-full flex items-center justify-center "><AvatarDisplay avatar={post.user.avatar} /></div>
                {post.user.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-[#0F0F0F] flex items-center justify-center">
                    <CheckCircle size={12} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="text-white font-bold text-[15px]" style={{ fontFamily: 'var(--font-display)' }}>{post.user.name}</h4>
                  <span className="text-gray-500 text-[13px]">{post.user.handle}</span>
                  {viewMode === 'all-houses' && (
                    <>
                      <span className="text-gray-600">��</span>
                      <span className="text-purple-400 text-[12px]">{post.user.college}</span>
                    </>
                  )}
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-500 text-[13px]">{post.time}</span>
                </div>
                <p className="text-gray-500 text-[12px]">{post.user.year} • {post.user.reputation} Rep</p>
              </div>
              <button className="text-gray-500 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-white text-[15px] leading-relaxed mb-3">{post.content}</p>
              
              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-3">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-[12px] hover:bg-purple-500/20 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Verification Badges */}
              {(post as any).verificationBadges && (post as any).verificationBadges.length > 0 && (
                <div className="mb-3 flex items-center gap-2 flex-wrap">
                  {(post as any).verificationBadges.map((badgeType: string, i: number) => {
                    const badgeIcons: any = {
                      peer_reviewed: Users,
                      client_rated: Briefcase,
                      blind_verified: EyeOff,
                      recruiter_endorsed: Award,
                      mentor_confirmed: GraduationCap
                    };
                    const badgeColors: any = {
                      peer_reviewed: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
                      client_rated: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
                      blind_verified: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
                      recruiter_endorsed: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400',
                      mentor_confirmed: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-400'
                    };
                    const BadgeIcon = badgeIcons[badgeType];
                    return (
                      <div key={i} className={`flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r ${badgeColors[badgeType]} border rounded-lg`}>
                        <BadgeIcon size={12} />
                        <span className="text-[10px] font-semibold">Verified</span>
                      </div>
                    );
                  })}
                  <div className={`px-2 py-1 rounded-lg text-[10px] font-semibold ${
                    (post as any).proofScore === 'verified' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    (post as any).proofScore === 'high' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    (post as any).proofScore === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {(post as any).proofScore === 'verified' ? '✓ Verified Portfolio' :
                     (post as any).proofScore === 'high' ? 'High Proof' :
                     (post as any).proofScore === 'medium' ? 'Medium Proof' : 'Low Proof'}
                  </div>
                </div>
              )}

              {/* Project Link if exists */}
              {post.projectLink && (
                <a
                  href={post.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-[12px] bg-[#1A1A1A] border border-purple-500/20 hover:border-purple-500/40 transition-all group"
                >
                  <Code className="text-purple-400" size={18} />
                  <span className="text-gray-300 text-[13px] group-hover:text-white">View Project on GitHub</span>
                  <ExternalLink size={14} className="text-gray-500 ml-auto" />
                </a>
              )}

              {/* Recruiters Viewed */}
              {post.recruitersViewed > 0 && (
                <div className="mt-3 flex items-center gap-2 text-[11px] text-amber-400">
                  <Eye size={12} />
                  <span>{post.recruitersViewed} recruiters viewed this</span>
                </div>
              )}

              {/* Add to Portfolio Banner for Project Posts */}
              {post.type === 'project' && (
                <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="text-green-400" size={16} />
                    <span className="text-green-400 text-[12px] font-medium">
                      This project can be added to your Proof Portfolio for verification
                    </span>
                  </div>
                  <button className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-[12px] font-semibold hover:shadow-lg transition-all flex items-center gap-1">
                    Add to Portfolio
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-6 text-gray-500">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-2 hover:text-pink-400 transition-colors group ${
                  likedPosts.has(post.id) ? 'text-pink-400' : ''
                }`}
              >
                <Heart size={18} className={likedPosts.has(post.id) ? 'fill-pink-400' : ''} />
                <span className="text-[13px]">{post.stats.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                <MessageCircle size={18} />
                <span className="text-[13px]">{post.stats.comments}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                <Repeat2 size={18} />
                <span className="text-[13px]">{post.stats.shares}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Eye size={18} />
                <span className="text-[13px]">{post.stats.views}</span>
              </button>
              <button
                onClick={() => toggleBookmark(post.id)}
                className={`flex items-center gap-2 hover:text-amber-400 transition-colors ml-auto ${
                  bookmarkedPosts.has(post.id) ? 'text-amber-400' : ''
                }`}
              >
                <Bookmark size={18} className={bookmarkedPosts.has(post.id) ? 'fill-amber-400' : ''} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Student Portfolio Component
function StudentPortfolio({ currentUser }: any) {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showRequestVerificationModal, setShowRequestVerificationModal] = useState(false);
  const [selectedProjectForVerification, setSelectedProjectForVerification] = useState<any>(null);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-Commerce Platform - Full Stack',
      description: 'Built a complete e-commerce platform with React, Node.js, and MongoDB. Features include payment integration, admin dashboard, and real-time inventory management.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
      links: [
        { type: 'github', url: 'https://github.com/user/ecommerce' },
        { type: 'live', url: 'https://myshop.com' }
      ],
      likes: 234,
      views: 1200,
      recruitersViewed: 15,
      verificationBadges: ['peer_reviewed', 'client_rated'],
      pendingBadges: [],
      proofScore: 500,
      reputationEarned: 500,
      peerReviews: [
        {
          reviewerName: 'Rahul Verma',
          reviewerTier: 'Silver Tier',
          rating: 5,
          feedback: 'Excellent implementation of the payment system. The code is clean, well-documented, and follows best practices.'
        },
        {
          reviewerName: 'Priya Sharma',
          reviewerTier: 'Gold Tier',
          rating: 4,
          feedback: 'Great project overall! The architecture is solid and the feature set is impressive.'
        }
      ]
    },
    {
      id: 2,
      title: 'Mobile App for Campus Events',
      description: 'A React Native mobile app for discovering and managing college events. Features real-time notifications, event registration, and social sharing.',
      tech: ['React Native', 'Firebase', 'Redux'],
      image: '📱',
      links: [
        { type: 'github', url: 'https://github.com/user/campus-app' },
        { type: 'video', url: 'https://youtube.com/demo' }
      ],
      likes: 456,
      views: 2300,
      recruitersViewed: 28,
      verificationBadges: ['peer_reviewed', 'blind_verified'],
      pendingBadges: [],
      proofScore: 450,
      reputationEarned: 400,
      peerReviews: [
        {
          reviewerName: 'Sneha Patel',
          reviewerTier: 'Gold Tier',
          rating: 5,
          feedback: 'Beautiful UI/UX design! The app is smooth, intuitive, and the real-time features work flawlessly.'
        },
        {
          reviewerName: 'Arjun Kumar',
          reviewerTier: 'Silver Tier',
          rating: 5,
          feedback: 'Impressive work on the Firebase integration. Push notifications are reliable and the event feed is fast.'
        }
      ]
    },
    {
      id: 3,
      title: 'AI-Powered Study Assistant',
      description: 'Machine learning based study assistant that helps students with personalized learning paths, quiz generation, and progress tracking.',
      tech: ['Python', 'TensorFlow', 'Flask', 'React'],
      image: '🤖',
      links: [
        { type: 'github', url: 'https://github.com/user/study-ai' },
        { type: 'live', url: 'https://studyai.app' }
      ],
      likes: 189,
      views: 890,
      recruitersViewed: 8,
      verificationBadges: ['peer_reviewed'],
      pendingBadges: ['recruiter_endorsed'],
      proofScore: 250,
      reputationEarned: 200,
      peerReviews: [
        {
          reviewerName: 'Karthik Reddy',
          reviewerTier: 'Gold Tier',
          rating: 4,
          feedback: 'Great use of machine learning! The quiz generation feature is creative and the accuracy is impressive.'
        }
      ]
    }
  ]);

  const handleRequestVerification = (project: any) => {
    setSelectedProjectForVerification(project);
    setShowRequestVerificationModal(true);
  };

  const skills = [
    { name: 'React.js', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'Python', level: 92, category: 'Backend' },
    { name: 'TypeScript', level: 85, category: 'Languages' },
    { name: 'MongoDB', level: 80, category: 'Database' },
    { name: 'AWS', level: 75, category: 'Cloud' }
  ];

  const achievements = [
    { title: 'Inter-IIT Hackathon Winner', date: 'Nov 2024', icon: '🏆' },
    { title: 'Google Summer of Code', date: 'Summer 2024', icon: '🌟' },
    { title: 'ACM ICPC Regionalist', date: 'Oct 2024', icon: '💻' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Shield className="text-purple-400" size={32} />
          <h2 className="text-white text-[32px] font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Proof Portfolio
          </h2>
        </div>
        <p className="text-gray-400 text-[14px] mb-3">Projects earn rep through verification, not just posting</p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-purple-400 text-[13px]">
            <Shield size={16} />
            <span className="font-bold">{projects.reduce((sum, p) => sum + p.verificationBadges.length, 0)}</span>
            <span className="text-gray-500">Badges Earned</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400 text-[13px]">
            <Zap size={16} />
            <span className="font-bold">{projects.reduce((sum, p) => sum + p.reputationEarned, 0)}</span>
            <span className="text-gray-500">Rep from Proofs</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-[13px]">
            <Eye size={16} />
            <span>47 recruiters this month</span>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white text-[18px] font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
              <Code className="text-purple-400" size={18} />
              Verified Projects
            </h3>
            <p className="text-gray-500 text-[11px] mt-1">Scroll horizontally to view all projects →</p>
          </div>
          <button
            onClick={() => {
              console.log('Opening Add Project modal...');
              setShowAddProjectModal(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-[10px] text-[12px] font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={14} />
            Add Project
          </button>
        </div>

        {/* Proof Portfolio Modals */}
        <ProofPortfolioAddProjectModal
          show={showAddProjectModal}
          onClose={() => setShowAddProjectModal(false)}
          onAdd={(project: any) => setProjects([project, ...projects])}
        />

        <ProofPortfolioRequestVerificationModal
          show={showRequestVerificationModal}
          onClose={() => setShowRequestVerificationModal(false)}
          project={selectedProjectForVerification}
        />

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(168, 85, 247, 0.5) transparent'
        }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="huse-glass rounded-[20px] p-6 huse-hover-lift flex-shrink-0 w-[95vw] sm:w-[600px] md:w-[700px] lg:w-[900px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Horizontal Layout: Project Info (Left) | Peer Reviews (Right) */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Side - Project Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-[40px] flex-shrink-0">{project.image}</div>
                    <div className="flex-1 min-w-0">
                      {/* Title and Proof Score */}
                      <div className="mb-3">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="text-white font-bold text-[15px] flex-1 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            {project.title}
                          </h4>
                          <div className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex-shrink-0 ${
                            project.proofScore >= 150 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            project.proofScore >= 50 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            project.proofScore > 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}>
                            {project.proofScore >= 150 ? '✓ Verified' :
                             project.proofScore >= 50 ? 'High Proof' :
                             project.proofScore > 0 ? 'Medium Proof' : 'No Proof'}
                          </div>
                        </div>

                        <p className="text-gray-400 text-[12px] leading-relaxed mb-3">
                          {project.description}
                        </p>

                        {/* Skill Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-[10px]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Verification Badges */}
                      {project.verificationBadges.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1.5">
                            {project.verificationBadges.map((badgeType: string, i: number) => {
                              const badgeIcons: any = { peer_reviewed: Users, client_rated: Briefcase, blind_verified: EyeOff, recruiter_endorsed: Award, mentor_confirmed: GraduationCap };
                              const badgeColors: any = {
                                peer_reviewed: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
                                client_rated: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
                                blind_verified: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
                                recruiter_endorsed: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400',
                                mentor_confirmed: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-400'
                              };
                              const badgeLabels: any = {
                                peer_reviewed: 'Peer Reviewed',
                                client_rated: 'Client Rated',
                                blind_verified: 'Blind Verified',
                                recruiter_endorsed: 'Recruiter Endorsed',
                                mentor_confirmed: 'Mentor Confirmed'
                              };
                              const BadgeIcon = badgeIcons[badgeType];
                              return (
                                <div key={i} className={`flex items-center gap-1 px-2 py-1 bg-gradient-to-r ${badgeColors[badgeType]} border rounded-lg`}>
                                  <BadgeIcon size={11} />
                                  <span className="text-[9px] font-semibold">{badgeLabels[badgeType]}</span>
                                  <CheckCircle size={9} />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Pending Badges */}
                      {project.pendingBadges.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1.5">
                            {project.pendingBadges.map((badgeType: string, i: number) => (
                              <div key={i} className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400">
                                <Clock size={9} />
                                <span className="text-[9px] font-semibold">Pending Review</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Request Verification Button */}
                      {project.verificationBadges.length + project.pendingBadges.length < 5 && (
                        <button
                          onClick={() => handleRequestVerification(project)}
                          className="mb-3 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-[10px] font-semibold hover:bg-blue-500/20 transition-all flex items-center justify-center gap-1.5 w-full"
                        >
                          <Shield size={11} />
                          Request Verification
                        </button>
                      )}

                      {/* Stats and Links Combined */}
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        {/* Stats */}
                        <div className="flex items-center gap-3 text-[10px] text-gray-500">
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            <Zap size={11} className="text-purple-400" />
                            <span className="text-purple-400 font-bold">+{project.reputationEarned}</span>
                          </div>
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            <Eye size={11} />
                            <span>{project.views}</span>
                          </div>
                          <div className="flex items-center gap-1 text-amber-400 whitespace-nowrap">
                            <Building2 size={11} />
                            <span>{project.recruitersViewed}</span>
                          </div>
                        </div>

                        {/* Project Links */}
                        <div className="flex gap-2">
                          {project.links.map((link: any, i: number) => {
                            const linkIcons: any = {
                              github: Code,
                              live: ExternalLink,
                              video: Video
                            };
                            const linkLabels: any = {
                              github: 'View Code',
                              live: 'View App',
                              video: 'Demo'
                            };
                            const LinkIconComponent = linkIcons[link.type] || ExternalLink;
                            return (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-3 py-1.5 ${link.type === 'live' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-300 hover:text-white hover:border-purple-500/40'} rounded-[8px] text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap`}
                              >
                                <LinkIconComponent size={12} />
                                {linkLabels[link.type] || 'Link'}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Peer Reviews */}
                {project.peerReviews && project.peerReviews.length > 0 && (
                  <div className="lg:w-72 flex-shrink-0 lg:border-l lg:border-purple-500/20 lg:pl-5 pt-4 lg:pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="text-blue-400" size={13} />
                      <p className="text-white font-bold text-[11px] uppercase tracking-wider">Peer Reviews</p>
                    </div>
                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {project.peerReviews.map((review: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-blue-500/5 border border-blue-500/20 rounded-[10px] p-2.5"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-semibold text-[11px] truncate">{review.reviewerName}</p>
                              <p className="text-blue-400 text-[9px]">{review.reviewerTier}</p>
                            </div>
                            <div className="flex items-center gap-0.5 flex-shrink-0">
                              {[...Array(5)].map((_, starIdx) => (
                                <Star
                                  key={starIdx}
                                  size={10}
                                  className={`${
                                    starIdx < review.rating
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-400 text-[10px] leading-relaxed">{review.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-white text-[20px] font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <Zap className="text-amber-400" size={20} />
          Skills
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="huse-glass rounded-[15px] p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-[14px]">{skill.name}</span>
                <span className="text-purple-400 text-[12px] font-bold">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                />
              </div>
              <p className="text-gray-500 text-[10px] mt-1">{skill.category}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-white text-[20px] font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <Trophy className="text-amber-400" size={20} />
          Achievements
        </h3>

        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 p-4 huse-glass rounded-[15px] huse-hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-[40px]">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-[15px]" style={{ fontFamily: 'var(--font-display)' }}>
                  {achievement.title}
                </h4>
                <p className="text-gray-500 text-[12px]">{achievement.date}</p>
              </div>
              <CheckCircle className="text-green-400" size={20} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Gigs Board Component
function GigsBoard({ currentUser }: any) {
  const canPostGig = currentUser.tier === 'Platinum'; // Only Platinum tier can post gigs
  const [showPostGigModal, setShowPostGigModal] = useState(false);
  const [showApplyGigModal, setShowApplyGigModal] = useState(false);
  const [selectedGig, setSelectedGig] = useState<any>(null);
  const [showTierModal, setShowTierModal] = useState(false);
  const [gigs, setGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const data = await apiGet<any[]>('/gigs');
        const mapped = data.map(g => ({
          id: g.id,
          postedBy: {
            name: g.postedBy?.name || 'Startup Hub',
            avatar: g.postedBy?.avatar || '🚀',
            verified: !!g.postedBy?.is_verified,
            reputation: g.postedBy?.reputation || 1000
          },
          title: g.title,
          description: g.description,
          budget: g.budget,
          duration: g.duration,
          skills: g.skills || [],
          applications: g.applications_count || 0,
          postedAt: g.created_at ? new Date(g.created_at).toLocaleDateString() : 'Recently',
          difficulty: g.difficulty || 'Medium',
          repRequired: g.rep_required || 0
        }));
        setGigs(mapped);
      } catch (err) {
        console.error('Failed to fetch gigs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGigs();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-[32px] font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Gigs Board
            </h2>
            <p className="text-gray-400 text-[14px]">Earn money and reputation by completing gigs</p>
          </div>
          {canPostGig ? (
            <button 
              onClick={() => setShowPostGigModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-[12px] font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus size={18} />
              Post Gig
            </button>
          ) : (
            <div className="text-right">
              <button
                onClick={() => setShowTierModal(true)}
                className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-[10px] text-[12px] flex items-center gap-2 hover:bg-blue-500/20 transition-all cursor-pointer"
              >
                <Lock size={14} />
                <span>Need Platinum Tier to Post</span>
              </button>
              <p className="text-gray-500 text-[10px] mt-1">Current: {currentUser.tier} Tier</p>
            </div>
          )}
        </div>

        {/* Gamification Notice */}
        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-[15px] flex items-start gap-3">
          <ShieldCheck className="text-purple-400" size={20} />
          <div className="flex-1">
            <h4 className="text-white font-bold text-[14px] mb-1">Verified Gigs Only</h4>
            <p className="text-gray-400 text-[12px]">
              Only Platinum tier users ({TIER_THRESHOLDS.Platinum.min}+ reputation) can post gigs. This ensures quality and prevents spam.
            </p>
          </div>
        </div>
      </div>

      {/* Gigs List */}
      <div className="space-y-4">
        {gigs.map((gig, index) => (
          <motion.div
            key={gig.id}
            className="huse-glass rounded-[20px] p-6 huse-hover-lift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-full h-full flex items-center justify-center "><AvatarDisplay avatar={gig.postedBy.avatar} /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-bold text-[18px]" style={{ fontFamily: 'var(--font-display)' }}>
                    {gig.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    gig.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    gig.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {gig.difficulty}
                  </span>
                  {currentUser.reputation < gig.repRequired && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-[11px] font-bold flex items-center gap-1">
                      <Lock size={10} />
                      {gig.repRequired} Rep needed
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3 text-[12px]">
                  <span className="text-gray-400">{gig.postedBy.name}</span>
                  {gig.postedBy.verified && (
                    <CheckCircle size={12} className="text-green-400" />
                  )}
                  <span className="text-gray-600">•</span>
                  <span className="text-purple-400">{gig.postedBy.reputation} Rep</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-500">{gig.postedAt}</span>
                </div>

                <p className="text-gray-400 text-[14px] mb-4">{gig.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {gig.skills.map((skill: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-[13px] mb-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <DollarSign size={16} />
                    <span className="font-bold">{gig.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <Clock size={16} />
                    <span>{gig.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Users size={16} />
                    <span>{gig.applications} applications</span>
                  </div>
                </div>

                <button 
                  disabled={currentUser.reputation < gig.repRequired}
                  onClick={() => {
                    if (currentUser.reputation >= gig.repRequired) {
                      setSelectedGig(gig);
                      setShowApplyGigModal(true);
                    }
                  }}
                  className={`w-full px-6 py-3 rounded-[12px] font-medium transition-all ${
                    currentUser.reputation >= gig.repRequired
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentUser.reputation >= gig.repRequired ? 'Apply for Gig' : `Need ${gig.repRequired - currentUser.reputation} more Rep`}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Post Gig Modal */}
      <PostGigModal 
        show={showPostGigModal}
        onClose={() => setShowPostGigModal(false)}
        onAdd={(gig) => setGigs([gig, ...gigs])}
        currentUser={currentUser}
      />
      
      {/* Apply for Gig Modal */}
      <ApplyGigModal
        show={showApplyGigModal}
        onClose={() => {
          setShowApplyGigModal(false);
          setSelectedGig(null);
        }}
        gig={selectedGig}
        onSubmit={() => {
          alert('✅ Application submitted successfully!\\n\\nThe gig poster will review your proposal and get back to you.');
        }}
      />
      
      {/* Tier Unlock Modal */}
      <TierUnlockModal
        isOpen={showTierModal}
        onClose={() => setShowTierModal(false)}
        userTier={currentUser.tier as 'Bronze' | 'Silver' | 'Gold' | 'Platinum'}
        attemptedFeature="Post Gigs"
      />
    </div>
  );
}

// Student Marketplace Component
function StudentMarketplace({ currentUser }: any) {
  const [category, setCategory] = useState('all');
  const [showSellItemModal, setShowSellItemModal] = useState(false);
  const [showContactSellerModal, setShowContactSellerModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set());

  const categories = ['all', 'books', 'electronics', 'notes', 'art', 'other'];

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const data = await apiGet<any[]>('/marketplace');
        const mapped = data.map(i => ({
          id: i.id,
          seller: {
            name: i.seller?.name || 'Unknown',
            avatar: i.seller?.avatar || '👤',
            verified: !!i.seller?.is_verified,
            year: i.seller?.current_year_of_study ? `${i.seller.current_year_of_study} Year` : 'Student'
          },
          title: i.title,
          description: i.description,
          price: i.price,
          category: i.category || 'other',
          image: i.image || '📦',
          condition: i.condition || 'Good',
          location: i.location || 'Campus',
          postedAt: i.created_at ? new Date(i.created_at).toLocaleDateString() : 'Recently',
          interestedCount: i.interested_count || 0
        }));
        setItems(mapped);
      } catch (err) {
        console.error('Failed to fetch marketplace:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketplace();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-[32px] font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Student Marketplace
            </h2>
            <p className="text-gray-400 text-[14px]">Buy and sell within your college community</p>
          </div>
          <button 
            onClick={() => setShowSellItemModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-[12px] font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Sell Item
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all font-medium capitalize ${
                category === cat
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:text-white'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="huse-glass rounded-[20px] overflow-hidden huse-hover-lift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Image */}
            <div className="h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-[80px] border-b border-purple-500/20">
              {item.image}
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-[16px] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-[13px] line-clamp-2 mb-2">{item.description}</p>
                </div>
              </div>

              {/* Seller Info */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-purple-500/10">
                <div className="w-full h-full flex items-center justify-center "><AvatarDisplay avatar={item.seller.avatar} /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-white text-[12px] font-medium">{item.seller.name}</span>
                    {item.seller.verified && (
                      <CheckCircle size={10} className="text-green-400" />
                    )}
                  </div>
                  <span className="text-gray-500 text-[10px]">{item.seller.year}</span>
                </div>
              </div>

              {/* Price & Details */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-[12px]">
                <div>
                  <p className="text-gray-500 mb-1">Price</p>
                  <div className="flex items-center gap-2">
                    <p className="text-green-400 font-bold text-[18px]">{item.price}</p>
                    {item.originalPrice && (
                      <p className="text-gray-600 line-through text-[12px]">{item.originalPrice}</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Condition</p>
                  <p className="text-white font-medium">{item.condition}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Location</p>
                  <p className="text-purple-400">{item.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Posted</p>
                  <p className="text-gray-400">{item.postedAt}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedItem(item);
                    setShowContactSellerModal(true);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-[12px] font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  Contact Seller
                </button>
                <button 
                  onClick={() => {
                    const newSaved = new Set(savedItems);
                    if (newSaved.has(item.id)) {
                      newSaved.delete(item.id);
                    } else {
                      newSaved.add(item.id);
                    }
                    setSavedItems(newSaved);
                  }}
                  className={`px-4 py-3 bg-[#1A1A1A] border rounded-[12px] transition-all ${
                    savedItems.has(item.id)
                      ? 'border-purple-500 text-purple-400'
                      : 'border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40'
                  }`}
                >
                  <Bookmark size={18} className={savedItems.has(item.id) ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Interest Count */}
              <div className="mt-3 flex items-center justify-center gap-1 text-[11px] text-gray-500">
                <Users size={12} />
                <span>{item.interestedCount} people interested</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Sell Item Modal */}
      <SellItemModal 
        show={showSellItemModal}
        onClose={() => setShowSellItemModal(false)}
        onAdd={(item) => setItems([item, ...items])}
        currentUser={currentUser}
      />
      
      {/* Contact Seller Modal */}
      <ContactSellerModal
        show={showContactSellerModal}
        onClose={() => {
          setShowContactSellerModal(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
    </div>
  );
}

// House Leaderboard Component
function HouseLeaderboard({ currentUser }: any) {
  const [view, setView] = useState<'house' | 'global'>('house');
  const [showTierModal, setShowTierModal] = useState(false);
  const [showGraduateModal, setShowGraduateModal] = useState(false);
  const [showEventsModal, setShowEventsModal] = useState(false);

  const houseLeaderboard = [
    { rank: 1, name: 'Priya Sharma', handle: '@priya_cse', points: 1250, avatar: '👩‍💻', badge: '🏆', tier: 'Platinum', change: '+12', year: '4th Year' },
    { rank: 2, name: 'Rahul Verma', handle: '@rahul_ml', points: 980, avatar: '👨‍🔬', badge: '🥈', tier: 'Gold', change: '+8', year: '3rd Year' },
    { rank: 3, name: 'Arjun Kumar', handle: '@arjun_dev', points: 847, avatar: '👨‍💻', badge: '🥉', tier: 'Gold', change: '+5', year: '3rd Year' },
    { rank: 4, name: 'Sneha Patel', handle: '@sneha_design', points: 645, avatar: '👩‍🎨', badge: '', tier: 'Silver', change: '-2', year: '2nd Year' },
    { rank: 5, name: 'Vikram Singh', handle: '@vikram_fe', points: 534, avatar: '👨‍🔧', badge: '', tier: 'Silver', change: '+15', year: '3rd Year' },
    { rank: 6, name: 'Ananya Roy', handle: '@ananya_ui', points: 145, avatar: '👩‍🎨', badge: '', tier: 'Bronze', change: '+8', year: '1st Year' }
  ];
  
  // Calculate tier progress using new tier system
  const getTierProgress = () => {
    const rep = currentUser.reputation;
    if (rep >= TIER_THRESHOLDS.Contributor.min) return { current: rep, next: TIER_THRESHOLDS.Contributor.max, percentage: 100, nextTier: 'Contributor (Max)' };
    if (rep >= TIER_THRESHOLDS.Platinum.min) return { current: rep, next: TIER_THRESHOLDS.Contributor.min, percentage: ((rep - TIER_THRESHOLDS.Platinum.min) / (TIER_THRESHOLDS.Contributor.min - TIER_THRESHOLDS.Platinum.min)) * 100, nextTier: 'Contributor' };
    if (rep >= TIER_THRESHOLDS.Gold.min) return { current: rep, next: TIER_THRESHOLDS.Platinum.min, percentage: ((rep - TIER_THRESHOLDS.Gold.min) / (TIER_THRESHOLDS.Platinum.min - TIER_THRESHOLDS.Gold.min)) * 100, nextTier: 'Platinum' };
    if (rep >= TIER_THRESHOLDS.Silver.min) return { current: rep, next: TIER_THRESHOLDS.Gold.min, percentage: ((rep - TIER_THRESHOLDS.Silver.min) / (TIER_THRESHOLDS.Gold.min - TIER_THRESHOLDS.Silver.min)) * 100, nextTier: 'Gold' };
    return { current: rep, next: TIER_THRESHOLDS.Silver.min, percentage: (rep / TIER_THRESHOLDS.Silver.min) * 100, nextTier: 'Silver' };
  };

  const tierProgress = getTierProgress();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <Trophy className="text-white" size={32} />
        </div>
        <h2 className="text-white text-[32px] font-bold mb-2 huse-gradient-gold" style={{ fontFamily: 'var(--font-display)' }}>
          Leaderboard
        </h2>
        <p className="text-gray-400 text-[14px]">Compete with your housemates</p>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setView('house')}
          className={`px-6 py-3 rounded-[12px] font-medium transition-all ${
            view === 'house'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
              : 'bg-[#1A1A1A] text-gray-400 hover:text-white'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          My House ({currentUser.college})
        </button>
        <button
          onClick={() => setView('global')}
          className={`px-6 py-3 rounded-[12px] font-medium transition-all ${
            view === 'global'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
              : 'bg-[#1A1A1A] text-gray-400 hover:text-white'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          All Houses
        </button>
      </div>

      {/* Your Rank */}
      <motion.div
        className="mb-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-[25px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center mb-4">
          <p className="text-gray-400 text-[12px] mb-2">Your Rank</p>
          <p className="text-white text-[48px] font-bold huse-gradient-gold leading-none" style={{ fontFamily: 'var(--font-display)' }}>
            #{currentUser.rank}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div>
            <p className="text-amber-400 font-bold text-[20px]">{currentUser.reputation}</p>
            <p className="text-gray-500 text-[11px]">Reputation</p>
          </div>
          <div>
            <p className="text-purple-400 font-bold text-[20px]">{currentUser.tier}</p>
            <p className="text-gray-500 text-[11px]">Tier</p>
          </div>
          <div>
            <p className="text-green-400 font-bold text-[20px]">+47</p>
            <p className="text-gray-500 text-[11px]">This Week</p>
          </div>
        </div>
        
        {/* Tier Progress */}
        {currentUser.tier !== 'Platinum' && (
          <div className="pt-4 border-t border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-[11px]">Progress to {tierProgress.nextTier}</span>
              <span className="text-purple-400 text-[11px] font-bold">{tierProgress.next - currentUser.reputation} Rep needed</span>
            </div>
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${tierProgress.percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <button
              onClick={() => setShowTierModal(true)}
              className="mt-3 w-full py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[11px] rounded-lg transition-all flex items-center justify-center gap-1"
            >
              <Lock size={12} />
              View Tier Benefits
            </button>
          </div>
        )}
      </motion.div>

      {/* Leaderboard List */}
      <div className="huse-glass rounded-[25px] overflow-hidden">
        <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <h3 className="text-white text-[20px] font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            {view === 'house' ? `${currentUser.college} Top Builders` : 'Global Top Builders'}
          </h3>
        </div>

        <div className="divide-y divide-purple-500/10">
          {houseLeaderboard.map((user, index) => (
            <motion.div
              key={user.rank}
              className={`p-6 hover:bg-purple-500/5 transition-all ${
                user.rank <= 3 ? 'bg-gradient-to-r from-amber-500/5 to-transparent' : ''
              } ${user.handle === currentUser.handle ? 'border-2 border-purple-500/40' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[20px] ${
                  user.rank === 1 ? 'bg-gradient-to-br from-amber-500 to-yellow-500 text-white' :
                  user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                  user.rank === 3 ? 'bg-gradient-to-br from-orange-600 to-orange-700 text-white' :
                  'bg-purple-500/10 text-purple-400'
                }`} style={{ fontFamily: 'var(--font-display)' }}>
                  {user.badge || `#${user.rank}`}
                </div>

                {/* Avatar */}
                <div className="w-full h-full flex items-center justify-center "><AvatarDisplay avatar={user.avatar} /></div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-bold text-[16px]" style={{ fontFamily: 'var(--font-display)' }}>{user.name}</h4>
                    <span className={`px-2 py-0.5 text-[9px] rounded-full font-bold ${
                      user.tier === 'Platinum' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                      user.tier === 'Gold' ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white' :
                      user.tier === 'Silver' ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' :
                      'bg-gradient-to-r from-orange-700 to-orange-900 text-white'
                    }`}>
                      {user.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="text-gray-400">{user.handle}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500">{user.year}</span>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="huse-gradient-gold text-[24px] font-bold" style={{ fontFamily: 'var(--font-display)' }}>{user.points}</p>
                  <div className={`flex items-center gap-1 text-[11px] font-bold ${
                    user.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {user.change.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    <span>{user.change}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tier System Info */}
      <div className="mt-8 p-6 huse-glass rounded-[20px]">
        <h4 className="text-white font-bold text-[16px] mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <Award className="text-purple-400" size={20} />
          Tier System & Unlocks
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bronze Tier */}
          <div className="p-4 bg-gradient-to-br from-orange-700/10 to-orange-900/10 border border-orange-500/20 rounded-[12px]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-orange-400 font-bold text-[14px]">Bronze</p>
              <span className="text-[10px] px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full font-bold">0-999 Rep</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>HUSE Feed Access</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>Apply for Gigs</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <X size={12} />
                <span>Direct Messaging</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <X size={12} />
                <span>Post Gigs</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <X size={12} />
                <span>Job Board</span>
              </div>
            </div>
          </div>

          {/* Silver Tier */}
          <div className="p-4 bg-gradient-to-br from-gray-400/10 to-gray-600/10 border border-gray-400/20 rounded-[12px]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-300 font-bold text-[14px]">Silver</p>
              <span className="text-[10px] px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded-full font-bold">{TIER_THRESHOLDS.Silver.min}-{TIER_THRESHOLDS.Silver.max} Rep</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>HUSE Feed Access</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>Apply for Gigs</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>✨ Direct Messaging</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <X size={12} />
                <span>Post Gigs</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <X size={12} />
                <span>Job Board</span>
              </div>
            </div>
          </div>

          {/* Gold Tier */}
          <div className="p-4 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-[12px]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-amber-400 font-bold text-[14px]">Gold</p>
              <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full font-bold">{TIER_THRESHOLDS.Gold.min}-{TIER_THRESHOLDS.Gold.max} Rep</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>HUSE Feed Access</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>Apply for Gigs</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>Direct Messaging</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>✨ Post Gigs</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>✨ Job Board Access</span>
              </div>
            </div>
          </div>

          {/* Platinum Tier */}
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-[12px]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-400 font-bold text-[14px]">Platinum</p>
              <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full font-bold">{TIER_THRESHOLDS.Platinum.min}+ Rep</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>All Gold Features</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>✨ Quote Opportunities</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={12} />
                <span>🚀 Dofracto Launchpad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tier Unlock Modal */}
      <TierUnlockModal
        isOpen={showTierModal}
        onClose={() => setShowTierModal(false)}
        userTier={currentUser.tier as 'Bronze' | 'Silver' | 'Gold' | 'Platinum'}
      />

      {/* Graduate Modal */}
      <GraduateModal
        isOpen={showGraduateModal}
        onClose={() => setShowGraduateModal(false)}
        studentId={currentUser.collegeId}
        studentName={currentUser.name}
        college={currentUser.college}
      />

      {/* Events Modal */}
      <EventsModal
        isOpen={showEventsModal}
        onClose={() => setShowEventsModal(false)}
        currentUser={currentUser}
      />
    </div>
  );
}

// Post Modal Component
function PostModal({ onClose, currentUser }: any) {
  const [postContent, setPostContent] = useState('');
  const [selectedType, setSelectedType] = useState('update');

  const postTypes = [
    { id: 'update', label: 'Update', icon: MessageCircle, desc: 'Share progress' },
    { id: 'project', label: 'Project', icon: Rocket, desc: 'Showcase work' },
    { id: 'help', label: 'Help', icon: MessageSquare, desc: 'Ask question' },
    { id: 'achievement', label: 'Achievement', icon: Trophy, desc: 'Celebrate win' }
  ];

  const handlePost = async () => {
    try {
      await apiPost('/posts/create', {
        type: selectedType,
        content: postContent,
        title: postContent.slice(0, 50) + '...'
      });
      toast.success('Post created successfully!');
      onClose();
    } catch (e: any) {
      toast.error('Post failed: ' + e.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="huse-glass rounded-[25px] max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-purple-500/20">
          <h3 className="text-white font-bold text-[20px]" style={{ fontFamily: 'var(--font-display)' }}>Create Post</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* College Badge */}
        <div className="px-5 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <School className="text-purple-400" size={14} />
            <span className="text-purple-400 text-[12px] font-medium">Posting to {currentUser.college}</span>
          </div>
        </div>

        {/* Post Type Selector */}
        <div className="grid grid-cols-2 gap-2 p-5 border-b border-purple-500/20">
          {postTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-start gap-3 p-4 rounded-[12px] transition-all ${
                  selectedType === type.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500'
                    : 'bg-[#1A1A1A] border border-purple-500/10 hover:border-purple-500/30'
                }`}
              >
                <Icon size={20} className={selectedType === type.id ? 'text-purple-400' : 'text-gray-500'} />
                <div className="text-left">
                  <p className={`font-medium text-[14px] ${selectedType === type.id ? 'text-white' : 'text-gray-400'}`}>
                    {type.label}
                  </p>
                  <p className="text-[11px] text-gray-600">{type.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex gap-3 mb-4">
            <div className="w-full h-full flex items-center justify-center "><AvatarDisplay avatar={currentUser.avatar} /></div>
            <div className="flex-1">
              <p className="text-white font-bold text-[14px]" style={{ fontFamily: 'var(--font-display)' }}>{currentUser.name}</p>
              <p className="text-purple-400 text-[11px]">{currentUser.year} • {currentUser.branch}</p>
            </div>
          </div>

          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder={`What are you building, ${currentUser.name.split(' ')[0]}?`}
            className="w-full bg-transparent text-white text-[16px] placeholder-gray-600 resize-none outline-none min-h-[150px]"
            style={{ fontFamily: 'var(--font-body)' }}
          />

          {/* Media Attachments */}
          <div className="flex gap-2 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 rounded-[10px] text-gray-400 hover:text-white hover:border-purple-500/40 transition-all">
              <LinkIcon size={16} />
              <span className="text-[12px]">Link</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 rounded-[10px] text-gray-400 hover:text-white hover:border-purple-500/40 transition-all">
              <Code size={16} />
              <span className="text-[12px]">GitHub</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 rounded-[10px] text-gray-400 hover:text-white hover:border-purple-500/40 transition-all">
              <Hash size={16} />
              <span className="text-[12px]">Tag</span>
            </button>
          </div>

          {/* Dynamic Banner by Post Type */}
          {selectedType === 'project' && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-[12px] flex items-start gap-2">
              <Shield className="text-green-400" size={16} />
              <p className="text-green-400 text-[11px] leading-relaxed">
                This project can be added to your Proof Portfolio for verification
              </p>
            </div>
          )}
          {(selectedType === 'update' || selectedType === 'achievement') && (
            <div className="mt-4 p-3 bg-gray-500/10 border border-gray-500/20 rounded-[12px] flex items-start gap-2">
              <Eye className="text-gray-400" size={16} />
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Visible to your house
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 border-t border-purple-500/20">
          <p className="text-gray-500 text-[12px]">
            {postContent.length}/500 characters
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-white transition-all font-medium"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              disabled={postContent.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Post to House
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}