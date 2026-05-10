import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Building2, GraduationCap, BarChart3, Settings, 
  Shield, Activity, TrendingUp, AlertCircle, CheckCircle,
  XCircle, Clock, DollarSign, Eye, Edit, Trash2, Plus,
  Search, Filter, Download, Upload, RefreshCw, Lock,
  Unlock, UserCheck, UserX, Zap, Target, Award, Bell,
  Flag, LogOut, Crown, FileText, Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { UserManagement } from './admin/UserManagement';
import { ContentModeration } from './admin/ContentModeration';
import { AnalyticsDashboard } from './admin/AnalyticsDashboard';
import { PlatformSettings } from './admin/PlatformSettings';
import { EventManagement } from './admin/EventManagement';
import { HuseCircleManagement } from './admin/HuseCircleManagement';
import { DofractoManagement } from './admin/DofractoManagement';
import { QuotifyManagement } from './admin/QuotifyManagement';
import { PaymentOversight } from './admin/PaymentOversight';
import { ReputationManagement } from './admin/ReputationManagement';
import { AIModeration } from './admin/AIModeration';
import { useAuth } from '../context/AuthContext';
import { AdminVerificationQueue } from './AdminVerificationQueue';

export function SuperAdminDashboard() {
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'huse' | 'dofracto' | 'quotify' | 'payments' | 'reputation' | 'users' | 'moderation' | 'ai' | 'analytics' | 'settings'>('overview');

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== 'admin') {
        navigate('/huse-circle-login');
      }
    }
  }, [user, isLoading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/huse-circle-login');
  };

  if (isLoading || !user || user.role !== 'admin') {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>;
  }

  const stats = [
    { label: 'Total Users', value: '10,234', change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Startups', value: '1,456', change: '+8%', icon: Building2, color: 'from-purple-500 to-pink-500' },
    { label: 'HUSE Students', value: '5,678', change: '+15%', icon: GraduationCap, color: 'from-amber-500 to-orange-500' },
    { label: 'Revenue', value: '₹12.4L', change: '+24%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
  ];

  const recentActivity = [
    { type: 'signup', user: 'John Doe', action: 'Registered on HUSE Circle', time: '2 mins ago', status: 'success' },
    { type: 'verification', user: 'TechStart Inc.', action: 'Business verified on Dofracto', time: '15 mins ago', status: 'success' },
    { type: 'quote', user: 'Sarah Wilson', action: 'New quote request on Quotify', time: '1 hour ago', status: 'pending' },
    { type: 'alert', user: 'System', action: 'Database backup completed', time: '2 hours ago', status: 'info' },
    { type: 'graduation', user: 'Alex Chen', action: 'Graduated to Dofracto', time: '3 hours ago', status: 'success' },
  ];

  const platformHealth = [
    { name: 'HUSE Circle', status: 'operational', uptime: '99.98%', users: 5678, color: 'text-green-400' },
    { name: 'Dofracto', status: 'operational', uptime: '99.95%', users: 1456, color: 'text-green-400' },
    { name: 'Quotify', status: 'operational', uptime: '99.99%', users: 3100, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="bg-[#111] border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-[70px] sm:h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-amber-500/10 border border-cyan-500/20 rounded-xl">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent hidden sm:inline">
                Super Admin Portal
              </span>
              <span className="text-base font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent sm:hidden">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <div className="text-2xl">🛡️</div>
              <div>
                <p className="text-sm font-medium text-white">{user.email}</p>
                <p className="text-xs text-gray-400">Super Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-500/10 border border-white/10 rounded-lg transition-all group"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="pt-4 sm:pt-6 pb-20">\n        {/* Stats Grid */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">{stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-2xl" 
                     style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <stat.icon size={20} className="text-white sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-green-400 text-xs sm:text-sm font-semibold">{stat.change}</span>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'overview', label: 'Overview', icon: Activity, shortLabel: 'Overview' },
              { id: 'verification', label: 'Verification', icon: Shield, shortLabel: 'Verify' },
              { id: 'huse', label: 'HUSE Circle', icon: FileText, shortLabel: 'HUSE' },
              { id: 'dofracto', label: 'Dofracto', icon: FileText, shortLabel: 'Dofracto' },
              { id: 'quotify', label: 'Quotify', icon: FileText, shortLabel: 'Quotify' },
              { id: 'payments', label: 'Payments', icon: FileText, shortLabel: 'Payments' },
              { id: 'reputation', label: 'Reputation', icon: FileText, shortLabel: 'Reputation' },
              { id: 'users', label: 'Users', icon: Users, shortLabel: 'Users' },
              { id: 'moderation', label: 'Moderation', icon: Flag, shortLabel: 'Moderate' },
              { id: 'ai', label: 'AI Moderation', icon: Bot, shortLabel: 'AI' },
              { id: 'analytics', label: 'Analytics', icon: BarChart3, shortLabel: 'Analytics' },
              { id: 'settings', label: 'Settings', icon: Settings, shortLabel: 'Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <tab.icon size={18} className="flex-shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Platform Health */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Platform Health</h3>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <RefreshCw size={18} className="text-gray-400" />
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {platformHealth.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${platform.color} animate-pulse`} />
                        <div>
                          <div className="text-white font-semibold">{platform.name}</div>
                          <div className="text-sm text-gray-400">{platform.users.toLocaleString()} active users</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-semibold">{platform.uptime}</div>
                        <div className="text-xs text-gray-500">uptime</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                  <button 
                    onClick={() => navigate('/admin-notifications')} 
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'success' ? 'bg-green-500/20' :
                        activity.status === 'pending' ? 'bg-yellow-500/20' :
                        'bg-blue-500/20'
                      }`}>
                        {activity.status === 'success' && <CheckCircle size={16} className="text-green-400" />}
                        {activity.status === 'pending' && <Clock size={16} className="text-yellow-400" />}
                        {activity.status === 'info' && <AlertCircle size={16} className="text-blue-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-semibold truncate">{activity.user}</div>
                        <div className="text-xs text-gray-400">{activity.action}</div>
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Verification Tab */}
          {activeTab === 'verification' && <AdminVerificationQueue />}

          {/* HUSE Circle Management Tab */}
          {activeTab === 'huse' && <HuseCircleManagement />}

          {/* Dofracto Management Tab */}
          {activeTab === 'dofracto' && <DofractoManagement />}

          {/* Quotify Management Tab */}
          {activeTab === 'quotify' && <QuotifyManagement />}

          {/* Payment Oversight Tab */}
          {activeTab === 'payments' && <PaymentOversight />}

          {/* Reputation Management Tab */}
          {activeTab === 'reputation' && <ReputationManagement />}

          {/* User Management Tab */}
          {activeTab === 'users' && <UserManagement />}

          {/* Content Moderation Tab */}
          {activeTab === 'moderation' && <ContentModeration />}

          {/* AI Moderation Tab */}
          {activeTab === 'ai' && <AIModeration />}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && <AnalyticsDashboard />}

          {/* Settings Tab */}
          {activeTab === 'settings' && <PlatformSettings />}
        </div>
      </div>

      <Footer />
    </div>
  );
}