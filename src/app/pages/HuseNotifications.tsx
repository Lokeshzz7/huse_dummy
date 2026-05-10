import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Bell,
  X,
  Check,
  Heart,
  MessageCircle,
  Users,
  Award,
  Briefcase,
  ShoppingBag,
  Star,
  TrendingUp,
  CheckCircle,
  Trash2,
  Filter,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';

type NotificationType = 'like' | 'comment' | 'follow' | 'achievement' | 'gig' | 'marketplace' | 'reputation' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
  actionUrl?: string;
}

export function HuseNotifications() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'like',
      title: 'New Like on Your Post',
      message: 'Priya Sharma liked your post about React best practices',
      time: '2 min ago',
      read: false,
      avatar: '👩‍💻',
      actionUrl: '/huse-circle-platform'
    },
    {
      id: 2,
      type: 'comment',
      title: 'New Comment',
      message: 'Rahul commented: "Great project! Can you share the GitHub link?"',
      time: '15 min ago',
      read: false,
      avatar: '🧑‍💼',
      actionUrl: '/huse-circle-platform'
    },
    {
      id: 3,
      type: 'achievement',
      title: '🏆 Achievement Unlocked!',
      message: 'You earned the "Rising Star" badge for gaining 500+ reputation',
      time: '1 hour ago',
      read: false,
      avatar: '🏆'
    },
    {
      id: 4,
      type: 'gig',
      title: 'New Gig Match',
      message: 'A new gig matching your skills was posted: "React Developer Needed"',
      time: '2 hours ago',
      read: true,
      avatar: '💼',
      actionUrl: '/huse-circle-platform?tab=gigs'
    },
    {
      id: 5,
      type: 'marketplace',
      title: 'Item Interest',
      message: 'Someone is interested in your "Data Structures Book"',
      time: '3 hours ago',
      read: true,
      avatar: '📚',
      actionUrl: '/huse-circle-platform?tab=marketplace'
    },
    {
      id: 6,
      type: 'reputation',
      title: 'Reputation Update',
      message: 'You gained +25 reputation points from completing a gig',
      time: '5 hours ago',
      read: true,
      avatar: '⚡'
    },
    {
      id: 7,
      type: 'follow',
      title: 'New Follower',
      message: 'Amit Kumar started following you',
      time: '1 day ago',
      read: true,
      avatar: '👨‍💻'
    },
    {
      id: 8,
      type: 'system',
      title: 'Welcome to HUSE Circle!',
      message: 'Complete your profile to unlock all features and start building',
      time: '2 days ago',
      read: true,
      avatar: '🎓'
    }
  ]);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-pink-400" />;
      case 'comment': return <MessageCircle className="w-5 h-5 text-purple-400" />;
      case 'follow': return <Users className="w-5 h-5 text-blue-400" />;
      case 'achievement': return <Award className="w-5 h-5 text-amber-400" />;
      case 'gig': return <Briefcase className="w-5 h-5 text-green-400" />;
      case 'marketplace': return <ShoppingBag className="w-5 h-5 text-pink-400" />;
      case 'reputation': return <TrendingUp className="w-5 h-5 text-amber-400" />;
      case 'system': return <Star className="w-5 h-5 text-purple-400" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#050505]" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/huse-circle-platform')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <Bell className="text-purple-400" size={24} />
                <div>
                  <h1 className="text-white text-xl font-bold">Notifications</h1>
                  <p className="text-gray-400 text-xs">
                    {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                  </p>
                </div>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                <CheckCircle size={16} />
                Mark all read
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:text-white'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                filter === 'unread'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:text-white'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">No {filter} notifications</h3>
                <p className="text-gray-400">You're all caught up! 🎉</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative group ${
                    notification.read ? 'opacity-70' : ''
                  }`}
                >
                  <div
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.actionUrl) {
                        navigate(notification.actionUrl);
                      }
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      notification.read
                        ? 'bg-[#0F0F0F]/40 border-purple-500/10 hover:border-purple-500/20'
                        : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar/Icon */}
                      <div className="flex-shrink-0">
                        {notification.avatar ? (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl border border-purple-500/20">
                            {notification.avatar}
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/20">
                            {getIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-white font-bold text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-gray-600 text-xs">{notification.time}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
                            title="Mark as read"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
