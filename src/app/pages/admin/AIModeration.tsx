import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, Eye, 
  Flag, Bot, TrendingUp, Users, FileText, MessageSquare,
  Search, Filter, Download, RefreshCw, Settings, Zap,
  Target, Activity, BarChart3, Lock, Unlock, Trash2,
  ThumbsUp, ThumbsDown, Clock, Calendar, Mail, Phone,
  Globe, ExternalLink, AlertOctagon, Ban, UserCheck
} from 'lucide-react';
import { toast } from 'sonner';

export function AIModeration() {
  const [activeSection, setActiveSection] = useState<'flags' | 'fraud' | 'verified' | 'insights' | 'settings'>('flags');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'posts' | 'submissions' | 'comments' | 'profiles'>('all');

  // AI-flagged content for review
  const [flaggedContent, setFlaggedContent] = useState([
    {
      id: 1,
      type: 'submission',
      user: 'Ravi Kumar',
      title: 'Full-Stack MERN App - Build a Social Network',
      reason: 'Potential plagiarism detected',
      confidence: 92,
      details: 'Code similarity: 87% match with GitHub repo "social-app-template"',
      platform: 'HUSE Circle',
      timestamp: '15 mins ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      type: 'post',
      user: 'Spam Account 123',
      title: 'Get rich quick! Invest now!',
      reason: 'Spam/Scam detected',
      confidence: 98,
      details: 'Contains prohibited keywords: "get rich quick", "guaranteed returns", multiple external links',
      platform: 'Dofracto',
      timestamp: '1 hour ago',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 3,
      type: 'comment',
      user: 'Angry User',
      title: 'Comment on "AI in Healthcare" event',
      reason: 'Toxic language detected',
      confidence: 85,
      details: 'Contains offensive language and personal attacks',
      platform: 'HUSE Circle',
      timestamp: '2 hours ago',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'quote',
      user: 'Fake Requester',
      title: 'Quote Request: Build 100 apps for ₹500',
      reason: 'Unrealistic pricing/requirements',
      confidence: 76,
      details: 'Price anomaly detected: Expected ₹50K-100K for scope, requested quote: ₹500',
      platform: 'Quotify',
      timestamp: '3 hours ago',
      status: 'pending',
      priority: 'medium'
    },
  ]);

  // Fraud detection alerts
  const [fraudAlerts, setFraudAlerts] = useState([
    {
      id: 1,
      type: 'bot',
      user: 'bot_account_456',
      email: 'fake123@tempmail.com',
      reason: 'Bot account detected',
      confidence: 94,
      details: 'Registered 15 accounts in 10 minutes from same IP, disposable email domain',
      actions: ['Mass signup', 'Same IP (192.168.1.1)', 'Disposable email'],
      timestamp: '30 mins ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'reputation',
      user: 'Cheater Pro',
      email: 'cheater@example.com',
      reason: 'Reputation gaming detected',
      confidence: 89,
      details: 'Gained 5000 rep in 2 hours (normal: 200-500/day), suspicious pattern detected',
      actions: ['Rapid rep gain', 'Multiple challenge completions (10 in 1 hour)', 'Copy-paste submissions'],
      timestamp: '2 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'multi-account',
      user: 'Duplicate User',
      email: 'user1@gmail.com, user2@gmail.com',
      reason: 'Multiple accounts detected',
      confidence: 82,
      details: 'Same device fingerprint, similar activity patterns, linked phone numbers',
      actions: ['2 accounts', 'Same device', 'Created within 24 hours'],
      timestamp: '5 hours ago',
      status: 'pending'
    },
  ]);

  // Auto-verified items log
  const [autoVerified, setAutoVerified] = useState([
    {
      id: 1,
      type: 'submission',
      user: 'Sneha Patel',
      title: 'Chrome Extension - Productivity Timer',
      reason: 'Code quality check passed',
      confidence: 95,
      details: 'Clean code, no plagiarism, functional demo, meets all requirements',
      timestamp: '10 mins ago'
    },
    {
      id: 2,
      type: 'recruiter',
      user: 'Google India',
      title: 'Company verification',
      reason: 'Domain verified: google.com',
      confidence: 99,
      details: 'Email domain verified, LinkedIn profile matches, company database match',
      timestamp: '45 mins ago'
    },
    {
      id: 3,
      type: 'event',
      user: 'Tech Conference 2025',
      title: 'Event registration verification',
      reason: 'Bulk verification completed',
      confidence: 91,
      details: '156 students verified automatically (all meet eligibility criteria)',
      timestamp: '2 hours ago'
    },
  ]);

  // AI insights and analytics
  const aiInsights = [
    {
      title: 'Content Quality Improving',
      metric: '+15%',
      description: 'AI-flagged content decreased this week',
      trend: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Fraud Prevention',
      metric: '47 accounts',
      description: 'Bot accounts blocked automatically',
      trend: 'positive',
      icon: Shield
    },
    {
      title: 'Auto-Verifications',
      metric: '892 items',
      description: 'Verified automatically this month',
      trend: 'neutral',
      icon: CheckCircle
    },
    {
      title: 'Response Time',
      metric: '2.3 mins',
      description: 'Average AI detection time',
      trend: 'positive',
      icon: Zap
    },
  ];

  // AI Settings
  const [aiSettings, setAiSettings] = useState({
    contentModeration: {
      enabled: true,
      autoFlag: true,
      confidenceThreshold: 75,
      categories: {
        spam: true,
        plagiarism: true,
        toxicity: true,
        scams: true
      }
    },
    fraudDetection: {
      enabled: true,
      autoBlock: false, // Never auto-block, only flag
      confidenceThreshold: 85,
      checks: {
        botAccounts: true,
        multipleAccounts: true,
        reputationGaming: true,
        suspiciousActivity: true
      }
    },
    autoVerification: {
      enabled: true,
      autoApprove: true,
      confidenceThreshold: 90,
      categories: {
        submissions: true,
        recruiters: true,
        events: true,
        projects: true
      }
    }
  });

  const handleApproveContent = (id: number) => {
    const item = flaggedContent.find(f => f.id === id);
    setFlaggedContent(flaggedContent.filter(f => f.id !== id));
    toast.success('Content approved!', {
      description: `"${item?.title}" has been approved and published.`
    });
  };

  const handleRejectContent = (id: number) => {
    const item = flaggedContent.find(f => f.id === id);
    setFlaggedContent(flaggedContent.filter(f => f.id !== id));
    toast.success('Content removed!', {
      description: `"${item?.title}" has been removed from the platform.`
    });
  };

  const handleBanUser = (id: number) => {
    const alert = fraudAlerts.find(f => f.id === id);
    setFraudAlerts(fraudAlerts.filter(f => f.id !== id));
    toast.success('User banned!', {
      description: `${alert?.user} has been permanently banned.`
    });
  };

  const handleDismissAlert = (id: number) => {
    const alert = fraudAlerts.find(f => f.id === id);
    setFraudAlerts(fraudAlerts.filter(f => f.id !== id));
    toast.info('Alert dismissed', {
      description: `${alert?.user} marked as safe.`
    });
  };

  const handleRefresh = () => {
    toast.success('AI data refreshed!', {
      description: 'Fetching latest AI detections...'
    });
  };

  const handleExport = () => {
    toast.success('Exporting AI logs...', {
      description: 'CSV file will download shortly'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-red-400';
    if (confidence >= 75) return 'text-orange-400';
    return 'text-yellow-400';
  };

  return (
    <div className="space-y-6">
      {/* AI Header Banner */}
      <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Bot className="text-white" size={28} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              AI-Powered Moderation System
              <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                <Activity size={12} />
                ACTIVE
              </span>
            </h2>
            <p className="text-gray-400 mb-4">
              Intelligent system that automatically detects spam, fraud, plagiarism, and policy violations. AI flags suspicious content and activity for your review—you make the final decisions.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                <Shield className="text-purple-400" size={16} />
                <span className="text-sm text-gray-300">Content Protected</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                <Zap className="text-cyan-400" size={16} />
                <span className="text-sm text-gray-300">Real-time Detection</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-sm text-gray-300">Auto-Verification Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'flags', label: 'Content Flags', icon: Flag, badge: flaggedContent.length },
          { id: 'fraud', label: 'Fraud Alerts', icon: AlertOctagon, badge: fraudAlerts.length },
          { id: 'verified', label: 'Auto-Verified', icon: CheckCircle, badge: autoVerified.length },
          { id: 'insights', label: 'AI Insights', icon: BarChart3 },
          { id: 'settings', label: 'AI Settings', icon: Settings },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <section.icon size={16} />
            {section.label}
            {section.badge !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeSection === section.id 
                  ? 'bg-white/20' 
                  : section.badge > 0 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-white/10 text-gray-500'
              }`}>
                {section.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content Flags Section */}
      {activeSection === 'flags' && (
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-orange-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-white font-semibold mb-1">AI-Flagged Content Requires Your Review</h4>
                <p className="text-sm text-gray-400">
                  These items were automatically detected by AI for potential policy violations. Review each item and approve or remove based on your judgment.
                </p>
              </div>
            </div>
          </div>

          {/* Flagged Content List */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">AI Content Flags</h3>
                <p className="text-sm text-gray-400">{flaggedContent.length} items pending review</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleRefresh}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={18} className="text-gray-400" />
                </button>
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm text-gray-400"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search flagged content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Flagged Items */}
            <div className="space-y-4">
              {flaggedContent.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto text-green-400 mb-4" size={48} />
                  <p className="text-xl font-semibold text-white mb-2">All Clear!</p>
                  <p className="text-gray-400">No flagged content at the moment.</p>
                </div>
              ) : (
                flaggedContent.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        item.priority === 'critical' ? 'bg-red-500/20' :
                        item.priority === 'high' ? 'bg-orange-500/20' :
                        'bg-yellow-500/20'
                      }`}>
                        <Flag className={
                          item.priority === 'critical' ? 'text-red-400' :
                          item.priority === 'high' ? 'text-orange-400' :
                          'text-yellow-400'
                        } size={24} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-semibold">{item.title}</h4>
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getPriorityColor(item.priority)}`}>
                                {item.priority.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400">By {item.user} • {item.platform}</p>
                          </div>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
                            <div className="flex-1">
                              <p className="text-red-400 font-semibold text-sm mb-1">{item.reason}</p>
                              <p className="text-xs text-gray-400">{item.details}</p>
                            </div>
                            <div className={`text-sm font-bold ${getConfidenceColor(item.confidence)}`}>
                              {item.confidence}% confidence
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock size={12} />
                              {item.timestamp}
                            </span>
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                              {item.type}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApproveContent(item.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all font-medium text-sm"
                            >
                              <ThumbsUp size={16} />
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectContent(item.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all font-medium text-sm"
                            >
                              <ThumbsDown size={16} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fraud Alerts Section */}
      {activeSection === 'fraud' && (
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertOctagon className="text-red-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-white font-semibold mb-1">Fraud Detection Alerts</h4>
                <p className="text-sm text-gray-400">
                  AI has detected suspicious accounts and activity patterns. Investigate each alert and take appropriate action (ban, warn, or dismiss).
                </p>
              </div>
            </div>
          </div>

          {/* Fraud Alerts List */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Fraud & Security Alerts</h3>
                <p className="text-sm text-gray-400">{fraudAlerts.length} suspicious accounts detected</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleRefresh}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={18} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {fraudAlerts.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="mx-auto text-green-400 mb-4" size={48} />
                  <p className="text-xl font-semibold text-white mb-2">Platform Secure!</p>
                  <p className="text-gray-400">No fraud alerts detected.</p>
                </div>
              ) : (
                fraudAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Ban className="text-red-400" size={24} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-semibold">{alert.user}</h4>
                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${getConfidenceColor(alert.confidence)}`}>
                                {alert.confidence}% match
                              </span>
                            </div>
                            <p className="text-sm text-gray-400">{alert.email}</p>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
                          <p className="text-red-400 font-semibold text-sm mb-1">{alert.reason}</p>
                          <p className="text-xs text-gray-400 mb-3">{alert.details}</p>
                          <div className="flex flex-wrap gap-2">
                            {alert.actions.map((action, idx) => (
                              <span key={idx} className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs font-medium">
                                {action}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} />
                            {alert.timestamp}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDismissAlert(alert.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all font-medium text-sm"
                            >
                              <XCircle size={16} />
                              Dismiss
                            </button>
                            <button
                              onClick={() => handleBanUser(alert.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all font-medium text-sm"
                            >
                              <Ban size={16} />
                              Ban User
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auto-Verified Section */}
      {activeSection === 'verified' && (
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-white font-semibold mb-1">Auto-Verification Log</h4>
                <p className="text-sm text-gray-400">
                  Items that AI automatically verified and approved based on quality checks, domain verification, and eligibility criteria. No admin action needed.
                </p>
              </div>
            </div>
          </div>

          {/* Auto-Verified List */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Auto-Verified Items</h3>
                <p className="text-sm text-gray-400">{autoVerified.length} items verified automatically</p>
              </div>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm text-gray-400"
              >
                <Download size={16} />
                Export Log
              </button>
            </div>

            <div className="space-y-3">
              {autoVerified.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-green-400" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold">{item.title}</h4>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-bold">
                          {item.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">By {item.user}</p>
                      <div className="bg-white/5 border border-white/10 rounded p-2 mb-2">
                        <p className="text-xs text-gray-400">{item.details}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                          {item.type}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {item.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Section */}
      {activeSection === 'insights' && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${
                    insight.trend === 'positive' ? 'from-green-500 to-emerald-500' : 'from-gray-500 to-gray-600'
                  }`}>
                    <insight.icon size={24} className="text-white" />
                  </div>
                  {insight.trend === 'positive' && (
                    <TrendingUp className="text-green-400" size={20} />
                  )}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{insight.metric}</div>
                <div className="text-sm text-gray-400">{insight.title}</div>
                <p className="text-xs text-gray-500 mt-2">{insight.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Platform Health */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">AI Performance Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Detection Accuracy</span>
                  <span className="text-sm font-semibold text-white">94.2%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '94.2%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">False Positive Rate</span>
                  <span className="text-sm font-semibold text-white">3.8%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '3.8%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Auto-Approval Rate</span>
                  <span className="text-sm font-semibold text-white">87.5%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '87.5%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Settings Section */}
      {activeSection === 'settings' && (
        <div className="space-y-6">
          {/* Warning Banner */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-white font-semibold mb-1">Configuration Warning</h4>
                <p className="text-sm text-gray-400">
                  Changing AI settings affects platform-wide moderation. Lowering confidence thresholds may increase false positives. Always test changes carefully.
                </p>
              </div>
            </div>
          </div>

          {/* Content Moderation Settings */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Content Moderation</h3>
                <p className="text-sm text-gray-400">Configure AI content detection settings</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiSettings.contentModeration.enabled}
                  onChange={(e) => {
                    setAiSettings({
                      ...aiSettings,
                      contentModeration: {
                        ...aiSettings.contentModeration,
                        enabled: e.target.checked
                      }
                    });
                    toast.success(e.target.checked ? 'Content moderation enabled' : 'Content moderation disabled');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-500"></div>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Confidence Threshold: {aiSettings.contentModeration.confidenceThreshold}%</label>
                <input
                  type="range"
                  min="50"
                  max="99"
                  value={aiSettings.contentModeration.confidenceThreshold}
                  onChange={(e) => setAiSettings({
                    ...aiSettings,
                    contentModeration: {
                      ...aiSettings.contentModeration,
                      confidenceThreshold: parseInt(e.target.value)
                    }
                  })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Higher = fewer flags, more accuracy</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(aiSettings.contentModeration.categories).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setAiSettings({
                        ...aiSettings,
                        contentModeration: {
                          ...aiSettings.contentModeration,
                          categories: {
                            ...aiSettings.contentModeration.categories,
                            [key]: e.target.checked
                          }
                        }
                      })}
                      className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-white capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Fraud Detection Settings */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Fraud Detection</h3>
                <p className="text-sm text-gray-400">Configure AI fraud detection settings</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiSettings.fraudDetection.enabled}
                  onChange={(e) => {
                    setAiSettings({
                      ...aiSettings,
                      fraudDetection: {
                        ...aiSettings.fraudDetection,
                        enabled: e.target.checked
                      }
                    });
                    toast.success(e.target.checked ? 'Fraud detection enabled' : 'Fraud detection disabled');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-500"></div>
              </label>
            </div>

            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="text-red-400" size={16} />
                  <span className="text-sm font-semibold text-red-400">Auto-Block Disabled (Safety Feature)</span>
                </div>
                <p className="text-xs text-gray-400">AI will flag suspicious accounts but never auto-ban. Admin approval required for all bans.</p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Confidence Threshold: {aiSettings.fraudDetection.confidenceThreshold}%</label>
                <input
                  type="range"
                  min="50"
                  max="99"
                  value={aiSettings.fraudDetection.confidenceThreshold}
                  onChange={(e) => setAiSettings({
                    ...aiSettings,
                    fraudDetection: {
                      ...aiSettings.fraudDetection,
                      confidenceThreshold: parseInt(e.target.value)
                    }
                  })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(aiSettings.fraudDetection.checks).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setAiSettings({
                        ...aiSettings,
                        fraudDetection: {
                          ...aiSettings.fraudDetection,
                          checks: {
                            ...aiSettings.fraudDetection.checks,
                            [key]: e.target.checked
                          }
                        }
                      })}
                      className="w-4 h-4 text-red-500 bg-white/10 border-white/20 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Auto-Verification Settings */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Auto-Verification</h3>
                <p className="text-sm text-gray-400">Configure AI auto-approval settings</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiSettings.autoVerification.enabled}
                  onChange={(e) => {
                    setAiSettings({
                      ...aiSettings,
                      autoVerification: {
                        ...aiSettings.autoVerification,
                        enabled: e.target.checked
                      }
                    });
                    toast.success(e.target.checked ? 'Auto-verification enabled' : 'Auto-verification disabled');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-500"></div>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Confidence Threshold: {aiSettings.autoVerification.confidenceThreshold}%</label>
                <input
                  type="range"
                  min="80"
                  max="99"
                  value={aiSettings.autoVerification.confidenceThreshold}
                  onChange={(e) => setAiSettings({
                    ...aiSettings,
                    autoVerification: {
                      ...aiSettings.autoVerification,
                      confidenceThreshold: parseInt(e.target.value)
                    }
                  })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 80% required for auto-approval</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(aiSettings.autoVerification.categories).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setAiSettings({
                        ...aiSettings,
                        autoVerification: {
                          ...aiSettings.autoVerification,
                          categories: {
                            ...aiSettings.autoVerification.categories,
                            [key]: e.target.checked
                          }
                        }
                      })}
                      className="w-4 h-4 text-green-500 bg-white/10 border-white/20 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-white capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => toast.success('AI settings saved successfully!')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all font-semibold flex items-center gap-2"
            >
              <CheckCircle size={18} />
              Save AI Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
