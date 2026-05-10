import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Check,
  Trash2,
  Filter,
  Search,
  Building2,
  Users,
  Settings,
  TrendingUp,
  Crown,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Edit3
} from 'lucide-react';
import { motion } from 'motion/react';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
}

export function AdminNotifications() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | NotificationType>('all');
  
  // Check if user is super admin - get from localStorage
  const getDashboardRoute = () => {
    // Check for super admin
    const isSuperAdmin = localStorage.getItem('userType') === 'super-admin';
    if (isSuperAdmin) {
      return '/super-admin-dashboard';
    }
    // Check if user came from business portal
    const businessUser = localStorage.getItem('dofractoBusinessUser');
    if (businessUser) {
      return '/admin-dashboard';
    }
    // Default to admin dashboard
    return '/admin-dashboard';
  };

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'info',
      title: 'New business listing',
      message: 'Tech Solutions Inc. has been added to the business directory',
      time: '5 min ago',
      read: false,
      icon: Building2
    },
    {
      id: 2,
      type: 'success',
      title: 'User joined HUSE Circle',
      message: 'John Doe is now a premium member of HUSE Circle',
      time: '1 hour ago',
      read: false,
      icon: Crown
    },
    {
      id: 3,
      type: 'info',
      title: 'System update',
      message: 'Platform updated to version 2.1.0 with new features',
      time: '3 hours ago',
      read: true,
      icon: Info
    },
    {
      id: 4,
      type: 'success',
      title: 'New user registration',
      message: 'Sarah Johnson registered and verified their email',
      time: '5 hours ago',
      read: true,
      icon: Users
    },
    {
      id: 5,
      type: 'warning',
      title: 'Business listing pending review',
      message: 'Green Energy Solutions requires admin approval',
      time: '6 hours ago',
      read: false,
      icon: AlertCircle
    },
    {
      id: 6,
      type: 'success',
      title: 'Theme settings updated',
      message: 'Platform theme colors have been successfully updated',
      time: '8 hours ago',
      read: true,
      icon: Settings
    },
    {
      id: 7,
      type: 'info',
      title: 'Content manager activity',
      message: 'Homepage content was edited by admin',
      time: '12 hours ago',
      read: true,
      icon: Edit3
    },
    {
      id: 8,
      type: 'success',
      title: 'Revenue milestone reached',
      message: 'Platform revenue exceeded $50,000 this month',
      time: '1 day ago',
      read: true,
      icon: TrendingUp
    },
    {
      id: 9,
      type: 'warning',
      title: 'Server maintenance scheduled',
      message: 'Scheduled maintenance on Dec 20, 2024 at 2:00 AM',
      time: '1 day ago',
      read: false,
      icon: AlertCircle
    },
    {
      id: 10,
      type: 'info',
      title: 'HUSE Circle member added',
      message: 'Michael Chen joined the premium membership tier',
      time: '2 days ago',
      read: true,
      icon: Crown
    },
    {
      id: 11,
      type: 'error',
      title: 'Failed payment notification',
      message: 'Payment failed for user subscription - requires attention',
      time: '2 days ago',
      read: false,
      icon: XCircle
    },
    {
      id: 12,
      type: 'success',
      title: 'Business verified',
      message: 'Digital Marketing Agency has been verified',
      time: '3 days ago',
      read: true,
      icon: CheckCircle
    }
  ]);

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'error':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      default:
        return 'text-[#24c6dc] bg-[#24c6dc]/10 border-[#24c6dc]/30';
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
      case 'error':
        return XCircle;
      default:
        return Info;
    }
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this notification?')) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  const handleClearAll = () => {
    if (confirm('Clear all notifications?\n\nThis action cannot be undone.')) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    // Filter by search query
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    const matchesFilter = filterType === 'all' 
      ? true 
      : filterType === 'unread' 
        ? !notification.read 
        : notification.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#111] border-b border-[#24c6dc]/20 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(getDashboardRoute())}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-[#24c6dc]" />
              <div>
                <h1 className="text-white text-xl">Notifications</h1>
                <p className="text-gray-400 text-sm">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="bg-black border border-[#24c6dc]/30 text-white px-4 py-2 rounded-lg hover:border-[#24c6dc] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              Mark All Read
            </button>
            <button
              onClick={handleClearAll}
              disabled={notifications.length === 0}
              className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:border-red-500 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6 sticky top-24"
            >
              <h3 className="text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#24c6dc]" />
                Filters
              </h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    filterType === 'all'
                      ? 'bg-gradient-to-r from-[#24c6dc]/20 to-[#05997F]/20 text-[#24c6dc] border border-[#24c6dc]/30'
                      : 'text-gray-400 hover:text-white hover:bg-[#24c6dc]/10'
                  }`}
                >
                  All Notifications
                  <span className="float-right text-xs bg-white/10 px-2 py-1 rounded">
                    {notifications.length}
                  </span>
                </button>
                
                <button
                  onClick={() => setFilterType('unread')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    filterType === 'unread'
                      ? 'bg-gradient-to-r from-[#24c6dc]/20 to-[#05997F]/20 text-[#24c6dc] border border-[#24c6dc]/30'
                      : 'text-gray-400 hover:text-white hover:bg-[#24c6dc]/10'
                  }`}
                >
                  Unread
                  <span className="float-right text-xs bg-white/10 px-2 py-1 rounded">
                    {unreadCount}
                  </span>
                </button>

                <div className="border-t border-[#24c6dc]/20 my-4"></div>

                <button
                  onClick={() => setFilterType('info')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    filterType === 'info'
                      ? 'bg-gradient-to-r from-[#24c6dc]/20 to-[#05997F]/20 text-[#24c6dc] border border-[#24c6dc]/30'
                      : 'text-gray-400 hover:text-white hover:bg-[#24c6dc]/10'
                  }`}
                >
                  <Info className="w-4 h-4 inline mr-2" />
                  Info
                  <span className="float-right text-xs bg-white/10 px-2 py-1 rounded">
                    {notifications.filter(n => n.type === 'info').length}
                  </span>
                </button>

                <button
                  onClick={() => setFilterType('success')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    filterType === 'success'
                      ? 'bg-gradient-to-r from-[#24c6dc]/20 to-[#05997F]/20 text-[#24c6dc] border border-[#24c6dc]/30'
                      : 'text-gray-400 hover:text-white hover:bg-[#24c6dc]/10'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Success
                  <span className="float-right text-xs bg-white/10 px-2 py-1 rounded">
                    {notifications.filter(n => n.type === 'success').length}
                  </span>
                </button>

                <button
                  onClick={() => setFilterType('warning')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    filterType === 'warning'
                      ? 'bg-gradient-to-r from-[#24c6dc]/20 to-[#05997F]/20 text-[#24c6dc] border border-[#24c6dc]/30'
                      : 'text-gray-400 hover:text-white hover:bg-[#24c6dc]/10'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Warning
                  <span className="float-right text-xs bg-white/10 px-2 py-1 rounded">
                    {notifications.filter(n => n.type === 'warning').length}
                  </span>
                </button>

                <button
                  onClick={() => setFilterType('error')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    filterType === 'error'
                      ? 'bg-gradient-to-r from-[#24c6dc]/20 to-[#05997F]/20 text-[#24c6dc] border border-[#24c6dc]/30'
                      : 'text-gray-400 hover:text-white hover:bg-[#24c6dc]/10'
                  }`}
                >
                  <XCircle className="w-4 h-4 inline mr-2" />
                  Error
                  <span className="float-right text-xs bg-white/10 px-2 py-1 rounded">
                    {notifications.filter(n => n.type === 'error').length}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
                />
              </div>
            </motion.div>

            {/* Notifications */}
            {filteredNotifications.length > 0 ? (
              <div className="space-y-3">
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-[#111] border rounded-xl p-6 transition-all hover:border-[#24c6dc]/50 ${
                      notification.read ? 'border-[#24c6dc]/20' : 'border-[#24c6dc]/40'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getNotificationColor(notification.type)}`}>
                        <notification.icon className="w-6 h-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-white">{notification.title}</h3>
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-[#24c6dc]"></span>
                            )}
                          </div>
                          <span className="text-gray-500 text-sm whitespace-nowrap">{notification.time}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{notification.message}</p>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-[#24c6dc] hover:text-[#05997F] text-sm flex items-center gap-1 transition-colors"
                            >
                              <Check className="w-4 h-4" />
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="text-red-400 hover:text-red-500 text-sm flex items-center gap-1 transition-colors ml-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-12 text-center"
              >
                <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-xl mb-2">No notifications found</h3>
                <p className="text-gray-400">
                  {searchQuery 
                    ? 'Try adjusting your search or filters' 
                    : 'You\'re all caught up! No notifications to display.'}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}