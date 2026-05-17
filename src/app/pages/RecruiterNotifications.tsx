import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft, Bell, Check, Trash2, Filter, User, Briefcase,
  MessageCircle, Heart, Star, Calendar, Clock, Eye,
  CheckCircle, X, Mail, BookmarkCheck, TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Notification {
  id: number;
  type: 'application' | 'interest' | 'message' | 'profile_view' | 'saved' | 'reminder';
  title: string;
  description: string;
  studentName?: string;
  studentAvatar?: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export function RecruiterNotifications() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'unread' | 'application' | 'message'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'application',
      title: 'New Job Application',
      description: 'applied for Full-Stack Developer position',
      studentName: 'Priya Sharma',
      studentAvatar: '👩‍💻',
      timestamp: '5 minutes ago',
      read: false,
      actionUrl: '/husecircle/student/portfolio/1'
    },
    {
      id: 2,
      type: 'interest',
      title: 'Student Interested',
      description: 'saved your company and showed interest in opportunities',
      studentName: 'Rahul Verma',
      studentAvatar: '👨‍🔬',
      timestamp: '1 hour ago',
      read: false,
      actionUrl: '/husecircle/student/portfolio/2'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      description: 'sent you a message regarding the ML Engineer position',
      studentName: 'Arjun Kumar',
      studentAvatar: '👨‍💻',
      timestamp: '2 hours ago',
      read: false,
      actionUrl: '/recruiter/messages'
    },
    {
      id: 4,
      type: 'profile_view',
      title: 'Profile View',
      description: 'viewed your company profile',
      studentName: 'Sneha Patel',
      studentAvatar: '👩‍🎨',
      timestamp: '3 hours ago',
      read: true,
      actionUrl: '/husecircle/student/portfolio/3'
    },
    {
      id: 5,
      type: 'application',
      title: 'Job Application Update',
      description: 'updated their application for Backend Developer role',
      studentName: 'Vikram Singh',
      studentAvatar: '👨‍💼',
      timestamp: '5 hours ago',
      read: true
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Interview Reminder',
      description: 'Interview scheduled with Priya Sharma tomorrow at 10:00 AM',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 7,
      type: 'saved',
      title: 'Student Saved',
      description: 'saved your job posting for UI/UX Designer',
      studentName: 'Neha Reddy',
      studentAvatar: '👩‍🎨',
      timestamp: '2 days ago',
      read: true
    },
    {
      id: 8,
      type: 'application',
      title: 'New Application',
      description: 'applied for DevOps Engineer position',
      studentName: 'Aditya Kapoor',
      studentAvatar: '👨‍💻',
      timestamp: '2 days ago',
      read: true
    }
  ]);

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    if (filter === 'application') return notif.type === 'application';
    if (filter === 'message') return notif.type === 'message';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <Briefcase className="text-blue-400" size={20} />;
      case 'interest':
        return <Heart className="text-pink-400" size={20} />;
      case 'message':
        return <MessageCircle className="text-purple-400" size={20} />;
      case 'profile_view':
        return <Eye className="text-green-400" size={20} />;
      case 'saved':
        return <BookmarkCheck className="text-amber-400" size={20} />;
      case 'reminder':
        return <Clock className="text-orange-400" size={20} />;
      default:
        return <Bell className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/recruiter/dashboard')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
              <div>
                <h1 className="text-white text-2xl font-bold">Notifications</h1>
                <p className="text-gray-400 text-sm">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                <CheckCircle size={18} />
                Mark All Read
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 relative">
        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'unread'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('application')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'application'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setFilter('message')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'message'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
            }`}
          >
            Messages
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-[#1A1A1A] border rounded-2xl p-6 transition-all ${
                notification.read
                  ? 'border-purple-500/10'
                  : 'border-purple-500/30 bg-gradient-to-r from-blue-500/5 to-purple-500/5'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  notification.read ? 'bg-[#0F0F0F]' : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                }`}>
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {notification.studentAvatar && (
                        <div className="text-2xl">{notification.studentAvatar}</div>
                      )}
                      <div>
                        <h3 className={`font-bold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {notification.studentName && (
                            <span className="text-purple-400 font-medium">{notification.studentName} </span>
                          )}
                          {notification.description}
                        </p>
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock size={12} />
                      {notification.timestamp}
                    </div>

                    <div className="flex items-center gap-2">
                      {notification.actionUrl && (
                        <button
                          onClick={() => {
                            markAsRead(notification.id);
                            navigate(notification.actionUrl!);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all"
                        >
                          View
                        </button>
                      )}
                      
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 bg-[#0F0F0F] hover:bg-green-500/20 text-gray-400 hover:text-green-400 rounded-lg transition-all"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 bg-[#0F0F0F] hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Bell className="text-purple-400" size={32} />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">No notifications</h3>
            <p className="text-gray-400">You're all caught up!</p>
          </div>
        )}
      </main>
    </div>
  );
}
