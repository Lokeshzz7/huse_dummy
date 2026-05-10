import { useState, useRef, useEffect } from 'react';
import { Bell, X, Check, ExternalLink } from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function NotificationBell() {
  const { notifications, markNotificationRead, currentUser } = useEcosystem();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!currentUser) return null;

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    markNotificationRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
      setIsOpen(false);
    }
  };

  const markAllAsRead = () => {
    notifications.forEach(n => {
      if (!n.read) markNotificationRead(n.id);
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-[12px] border border-[#24c6dc]/30 text-gray-400 hover:text-white hover:border-[#24c6dc] transition-all"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#EC4899] to-[#F59E0B] rounded-full flex items-center justify-center text-white text-[10px] font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-[380px] max-h-[500px] bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[20px] shadow-2xl z-50 overflow-hidden"
            style={{ backdropFilter: 'blur(20px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#24c6dc]/20">
              <div>
                <h3 className="text-white font-bold text-[16px]">Notifications</h3>
                <p className="text-gray-500 text-[12px]">
                  {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[#24c6dc] hover:text-white text-[12px] flex items-center gap-1 transition-colors"
                >
                  <Check size={14} />
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell size={48} className="text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 text-[14px]">No notifications yet</p>
                  <p className="text-gray-600 text-[12px] mt-1">
                    We'll notify you when something happens!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#24c6dc]/10">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 hover:bg-[#24c6dc]/5 transition-all cursor-pointer ${
                        !notification.read ? 'bg-[#24c6dc]/5' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#24c6dc]/20 to-[#05997F]/20 flex items-center justify-center text-[20px] border border-[#24c6dc]/30">
                          {notification.icon || '🔔'}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-white text-[14px] font-bold">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-[#EC4899] rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-gray-400 text-[13px] mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-gray-600 text-[11px]">
                              {getTimeAgo(notification.createdAt)}
                            </span>
                            {notification.link && (
                              <div className="flex items-center gap-1 text-[#24c6dc] text-[11px]">
                                <ExternalLink size={10} />
                                <span>View</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-[#24c6dc]/20 text-center">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    // Could navigate to a full notifications page
                  }}
                  className="text-[#24c6dc] hover:text-white text-[12px] font-bold transition-colors"
                >
                  View All Notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
