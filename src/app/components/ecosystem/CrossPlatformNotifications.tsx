import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Award, GraduationCap, Quote, Briefcase, DollarSign, Star, MessageSquare, TrendingUp } from 'lucide-react';

interface Notification {
  id: string;
  type: 'opportunity' | 'quote' | 'graduation' | 'project' | 'payment' | 'message' | 'achievement';
  platform: 'HUSE Circle' | 'Dofracto' | 'Quotify';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface CrossPlatformNotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CrossPlatformNotifications({ isOpen, onClose }: CrossPlatformNotificationsProps) {
  // Mock notifications showing ecosystem interconnection
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'opportunity',
      platform: 'Dofracto',
      title: 'New Project Opportunity',
      message: 'TechVenture AI posted a Full Stack Developer position. Your skills match!',
      timestamp: '5 min ago',
      read: false,
      actionUrl: '/opportunities',
    },
    {
      id: '2',
      type: 'quote',
      platform: 'Quotify',
      title: 'Quote Request Received',
      message: 'EcoSolutions requested a quote for "Website Redesign". Respond to earn credits.',
      timestamp: '1 hour ago',
      read: false,
      actionUrl: '/quote-marketplace',
    },
    {
      id: '3',
      type: 'graduation',
      platform: 'HUSE Circle',
      title: 'Eligible for Graduation! 🎓',
      message: 'Congratulations! You\'ve reached 100,000 reputation. Graduate to Dofracto now!',
      timestamp: '2 hours ago',
      read: false,
      actionUrl: '/husecircle/student/graduation',
    },
    {
      id: '4',
      type: 'achievement',
      platform: 'HUSE Circle',
      title: 'Tier Upgrade: Gold!',
      message: 'You\'ve been promoted to Gold tier. New opportunities unlocked.',
      timestamp: '1 day ago',
      read: true,
    },
    {
      id: '5',
      type: 'payment',
      platform: 'Dofracto',
      title: 'Payment Received',
      message: 'You received ₹25,000 for "E-commerce Platform Development"',
      timestamp: '2 days ago',
      read: true,
      actionUrl: '/earnings',
    },
    {
      id: '6',
      type: 'message',
      platform: 'Quotify',
      title: 'New Message',
      message: 'Startup founder from FinTech Pro sent you a message about your quote.',
      timestamp: '3 days ago',
      read: true,
      actionUrl: '/messages',
    },
    {
      id: '7',
      type: 'project',
      platform: 'Dofracto',
      title: 'Project Milestone Completed',
      message: 'Great work! You completed the UI Design milestone for EcoSolutions.',
      timestamp: '5 days ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    const icons = {
      opportunity: Briefcase,
      quote: Quote,
      graduation: GraduationCap,
      project: Star,
      payment: DollarSign,
      message: MessageSquare,
      achievement: TrendingUp,
    };
    return icons[type as keyof typeof icons] || Bell;
  };

  const getNotificationColor = (type: string) => {
    const colors = {
      opportunity: 'from-[#24c6dc] to-[#05997F]',
      quote: 'from-[#3B82F6] to-[#8B5CF6]',
      graduation: 'from-[#8B5CF6] to-[#D946EF]',
      project: 'from-yellow-500 to-orange-500',
      payment: 'from-green-500 to-emerald-500',
      message: 'from-blue-500 to-cyan-500',
      achievement: 'from-purple-500 to-pink-500',
    };
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getPlatformBadge = (platform: string) => {
    const badges = {
      'HUSE Circle': { color: 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30', icon: GraduationCap },
      'Dofracto': { color: 'bg-[#24c6dc]/10 text-[#24c6dc] border-[#24c6dc]/30', icon: Award },
      'Quotify': { color: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30', icon: Quote },
    };
    const badge = badges[platform as keyof typeof badges];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {platform}
      </span>
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-theme-card border-l border-theme-accent shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-theme-secondary border-b border-theme-accent p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#24c6dc]" />
                  <h2 className="font-bold text-theme-primary">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-xs font-medium">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-theme-tertiary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-theme-muted" />
                </button>
              </div>
              <p className="text-sm text-theme-tertiary">Updates from across the ecosystem</p>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type);
                const gradient = getNotificationColor(notification.type);

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      notification.read
                        ? 'bg-theme-secondary border-theme-accent'
                        : 'bg-theme-tertiary border-[#24c6dc]/30 hover:border-[#24c6dc]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-theme-primary text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#24c6dc] rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                        
                        <p className="text-sm text-theme-tertiary mb-2 line-clamp-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          {getPlatformBadge(notification.platform)}
                          <span className="text-xs text-theme-muted">{notification.timestamp}</span>
                        </div>

                        {notification.actionUrl && !notification.read && (
                          <button className="mt-2 text-xs text-[#24c6dc] hover:underline font-medium">
                            View Details →
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-theme-accent bg-theme-secondary">
              <button
                className="w-full px-4 py-2 text-sm text-theme-secondary hover:text-theme-primary transition-colors"
              >
                Mark all as read
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
