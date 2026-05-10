import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import {
  Bell, Check, X, Trash2, Star, DollarSign, TrendingUp,
  Award, MessageSquare, Calendar, Clock, Filter, Search,
  CheckCircle, AlertCircle, Info, Gift, Zap, LogOut,
  Building2, LayoutDashboard
} from 'lucide-react';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'payment',
    title: 'Payment Received',
    message: 'You received ₹40,000 from FinTrack Pro for completed work',
    businessName: 'FinTrack Pro',
    businessLogo: '💰',
    timestamp: '2 hours ago',
    read: false,
    actionable: true
  },
  {
    id: 2,
    type: 'milestone',
    title: 'Milestone Achieved',
    message: 'TechVenture AI reached ₹2.5Cr revenue this quarter!',
    businessName: 'TechVenture AI',
    businessLogo: '🤖',
    timestamp: '5 hours ago',
    read: false,
    actionable: false
  },
  {
    id: 3,
    type: 'message',
    title: 'New Message',
    message: 'EcoGreen Solutions sent you a message about the UI design project',
    businessName: 'EcoGreen Solutions',
    businessLogo: '🌱',
    timestamp: '1 day ago',
    read: false,
    actionable: true
  },
  {
    id: 4,
    type: 'update',
    title: 'Business Update',
    message: 'FoodHub Delivery expanded to 3 new cities!',
    businessName: 'FoodHub Delivery',
    businessLogo: '🍔',
    timestamp: '1 day ago',
    read: true,
    actionable: false
  },
  {
    id: 5,
    type: 'earnings',
    title: 'Earnings Update',
    message: 'Your contribution to TechVenture AI generated ₹550 in earnings',
    businessName: 'TechVenture AI',
    businessLogo: '🤖',
    timestamp: '2 days ago',
    read: true,
    actionable: false
  },
  {
    id: 6,
    type: 'opportunity',
    title: 'New Opportunity',
    message: 'A business matching your skills is seeking UI/UX designers',
    businessName: 'System',
    businessLogo: '🎯',
    timestamp: '3 days ago',
    read: true,
    actionable: true
  },
  {
    id: 7,
    type: 'milestone',
    title: 'Contribution Milestone',
    message: 'Congratulations! You\'ve contributed to 5 businesses',
    businessName: 'System',
    businessLogo: '🎉',
    timestamp: '4 days ago',
    read: true,
    actionable: false
  },
  {
    id: 8,
    type: 'feedback',
    title: 'Feedback Received',
    message: 'EcoGreen Solutions rated your work 5★',
    businessName: 'EcoGreen Solutions',
    businessLogo: '🌱',
    timestamp: '5 days ago',
    read: true,
    actionable: true
  }
];

export function NotificationsPage() {
  const navigate = useNavigate();
  const [contributorUser, setContributorUser] = useState<any>(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    const storedUser = localStorage.getItem('dofractoBuilderUser');
    if (storedUser) {
      setContributorUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dofractoBuilderUser');
    setContributorUser(null);
    navigate('/dofracto-builder-login');
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment': return DollarSign;
      case 'milestone': return TrendingUp;
      case 'message': return MessageSquare;
      case 'update': return Bell;
      case 'earnings': return DollarSign;
      case 'opportunity': return AlertCircle;
      case 'feedback': return CheckCircle;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'payment': return 'from-green-500 to-emerald-500';
      case 'milestone': return 'from-purple-500 to-pink-500';
      case 'message': return 'from-blue-500 to-indigo-500';
      case 'update': return 'from-cyan-500 to-teal-500';
      case 'earnings': return 'from-green-500 to-emerald-500';
      case 'opportunity': return 'from-amber-500 to-orange-500';
      case 'feedback': return 'from-pink-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
    }
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
                  onClick={() => navigate('/dofracto-builders-hub')}
                  className="px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <Building2 className="w-4 h-4" />
                  Builders Hub
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {unreadCount}
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
      <main className="max-w-[900px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
            <Bell className="w-10 h-10 text-cyan-400" />
            <span className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] bg-clip-text text-transparent">
              Notifications
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Stay updated with your contributions and opportunities
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6 bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'unread'
                  ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredNotifications.map((notification, index) => {
              const Icon = getNotificationIcon(notification.type);
              const colorClass = getNotificationColor(notification.type);

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-5 border transition-all cursor-pointer group ${
                    notification.read 
                      ? 'border-white/10 hover:border-white/20' 
                      : 'border-cyan-500/30 hover:border-cyan-500/50'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          {notification.businessLogo} {notification.businessName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {notification.actionable && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                        View Details →
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-2xl font-bold mb-2">No notifications</h3>
            <p className="text-gray-400">
              {filter === 'unread' 
                ? "You're all caught up!" 
                : "You don't have any notifications yet"
              }
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}