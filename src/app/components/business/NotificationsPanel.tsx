import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, CheckCircle, AlertCircle, Users, DollarSign, Briefcase, Clock } from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'contribution';
  title: string;
  message: string;
  time: string;
  read: boolean;
  amount?: number;
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'contribution',
      title: 'New Contribution Received',
      message: 'John Doe contributed ₹25,000 to TechVenture AI',
      time: '5 minutes ago',
      read: false,
      amount: 25000
    },
    {
      id: '2',
      type: 'success',
      title: 'Application Received',
      message: 'Sarah Johnson applied for Senior Developer role',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'contribution',
      title: 'Capital Milestone Reached',
      message: 'EcoSolutions reached ₹5L in contributions!',
      time: '3 hours ago',
      read: true,
      amount: 500000
    },
    {
      id: '4',
      type: 'info',
      title: 'Profile View Milestone',
      message: 'Your business listing reached 1,000 views',
      time: '1 day ago',
      read: true
    },
    {
      id: '5',
      type: 'warning',
      title: 'KYC Verification Pending',
      message: 'Complete your KYC to unlock Quote Marketplace',
      time: '2 days ago',
      read: true
    }
  ];

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info':
        return <Bell className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'contribution':
        return <DollarSign className="w-5 h-5 text-[#24c6dc]" />;
    }
  };

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
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-theme-elevated border-l border-theme-accent shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-theme-secondary">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bell className="w-6 h-6 text-[#24c6dc]" />
                  <h2 className="text-xl font-bold text-theme-primary">Notifications</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-theme-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-theme-muted" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-theme-tertiary">
                  {notifications.filter(n => !n.read).length} unread
                </span>
                <button className="text-sm text-[#24c6dc] hover:underline ml-auto">
                  Mark all as read
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 border-b border-theme-secondary hover:bg-theme-secondary transition-all cursor-pointer ${
                    !notification.read ? 'bg-[#24c6dc]/5' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-theme-primary text-sm">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-[#24c6dc] rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-theme-tertiary mb-1">
                        {notification.message}
                      </p>
                      {notification.amount && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#24c6dc]/10 border border-[#24c6dc]/30 rounded-md text-xs text-[#24c6dc] font-semibold mb-1">
                          <DollarSign className="w-3 h-3" />
                          ₹{notification.amount.toLocaleString('en-IN')}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs text-theme-muted">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-theme-secondary">
              <button className="w-full px-4 py-2 bg-theme-secondary text-theme-primary rounded-lg hover:bg-theme-tertiary transition-all text-sm font-medium">
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
