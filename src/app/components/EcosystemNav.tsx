// EcosystemNav - Unified Navigation Component for all platforms
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Menu, X, ChevronDown, LogOut, User, Settings,
  Bell, MessageSquare, Briefcase, DollarSign, GraduationCap,
  Rocket, TrendingUp, Award, Search, Grid
} from 'lucide-react';

interface EcosystemNavProps {
  platform: 'huse' | 'dofracto' | 'quotify' | 'recruiter' | 'landing';
  user?: {
    name: string;
    avatar: string;
    tier?: string;
    reputation?: number;
    role?: 'student' | 'contributor' | 'recruiter' | 'business' | 'client' | 'provider';
  };
  showPlatformSwitcher?: boolean;
}

export function EcosystemNav({ platform, user, showPlatformSwitcher = true }: EcosystemNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPlatformMenu, setShowPlatformMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const platformMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (platformMenuRef.current && !platformMenuRef.current.contains(event.target as Node)) {
        setShowPlatformMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const platforms = [
    {
      id: 'huse',
      name: 'HUSE Circle',
      icon: '🎓',
      description: 'Student Incubator',
      color: 'from-purple-500 to-pink-500',
      route: '/husecircle/student/platform',
      loginRoute: '/husecircle/student/login'
    },
    {
      id: 'dofracto',
      name: 'Dofracto',
      icon: '🚀',
      description: 'Startup Accelerator',
      color: 'from-cyan-500 to-blue-500',
      route: '/dofracto',
      loginRoute: '/dofracto/builder/login'
    },
    {
      id: 'quotify',
      name: 'Quotify',
      icon: '💰',
      description: 'Quote Marketplace',
      color: 'from-green-500 to-emerald-500',
      route: '/quotify/dashboard',
      loginRoute: '/quotify/login'
    },
    {
      id: 'recruiter',
      name: 'Recruiter Portal',
      icon: '👔',
      description: 'Hire Talent',
      color: 'from-amber-500 to-orange-500',
      route: '/recruiter/dashboard',
      loginRoute: '/recruiter/login'
    }
  ];

  const currentPlatform = platforms.find(p => p.id === platform);

  const getNavLinks = () => {
    switch (platform) {
      case 'huse':
        return [
          { label: 'Dashboard', icon: Home, route: '/husecircle/student/platform' },
          { label: 'Jobs', icon: Briefcase, route: '/husecircle/student/platform' },
          { label: 'Portfolio', icon: Award, route: '/husecircle/student/platform' },
          { label: 'Chat', icon: MessageSquare, route: '/husecircle/student/chats' }
        ];
      case 'dofracto':
        return [
          { label: 'Home', icon: Home, route: '/dofracto' },
          { label: 'Opportunities', icon: TrendingUp, route: '/dofracto/builder/opportunities' },
          { label: 'Discover', icon: Search, route: '/dofracto/discover' },
          { label: 'Builders Hub', icon: Rocket, route: '/dofracto/builder/hub' }
        ];
      case 'quotify':
        return [
          { label: 'Dashboard', icon: Home, route: '/quotify/dashboard' },
          { label: 'New Request', icon: DollarSign, route: '/quotify/new-request' },
          { label: 'Browse', icon: Search, route: '/quotify/dashboard' }
        ];
      case 'recruiter':
        return [
          { label: 'Dashboard', icon: Home, route: '/recruiter/dashboard' },
          { label: 'Messages', icon: MessageSquare, route: '/recruiter/messages' },
          { label: 'Job Postings', icon: Briefcase, route: '/recruiter/jobs' }
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    // Clear any auth state here
    localStorage.removeItem('user');
    navigate('/');
  };

  const getPlatformStyles = () => {
    switch (platform) {
      case 'huse':
        return {
          bg: 'bg-[#0A0A0A]/80',
          border: 'border-purple-500/20',
          gradient: 'from-purple-500/10 to-pink-500/10',
          accent: 'text-purple-400',
          hover: 'hover:bg-purple-500/10'
        };
      case 'dofracto':
        return {
          bg: 'bg-[#0F0F0F]/80',
          border: 'border-cyan-500/20',
          gradient: 'from-cyan-500/10 to-blue-500/10',
          accent: 'text-cyan-400',
          hover: 'hover:bg-cyan-500/10'
        };
      case 'quotify':
        return {
          bg: 'bg-white/80',
          border: 'border-blue-500/20',
          gradient: 'from-blue-500/10 to-green-500/10',
          accent: 'text-blue-600',
          hover: 'hover:bg-blue-500/10'
        };
      case 'recruiter':
        return {
          bg: 'bg-[#0A0A0A]/80',
          border: 'border-amber-500/20',
          gradient: 'from-amber-500/10 to-orange-500/10',
          accent: 'text-amber-400',
          hover: 'hover:bg-amber-500/10'
        };
      default:
        return {
          bg: 'bg-black/80',
          border: 'border-gray-700',
          gradient: 'from-gray-500/10 to-gray-700/10',
          accent: 'text-gray-400',
          hover: 'hover:bg-gray-700'
        };
    }
  };

  const styles = getPlatformStyles();

  return (
    <nav className={`sticky top-0 z-50 ${styles.bg} backdrop-blur-xl border-b ${styles.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Switcher */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="text-2xl">🌐</div>
              <span className={`text-xl font-bold ${platform === 'quotify' ? 'text-gray-900' : 'text-white'} hidden sm:block`}>
                HUSE
              </span>
            </Link>

            {showPlatformSwitcher && currentPlatform && (
              <div className="relative" ref={platformMenuRef}>
                <button
                  onClick={() => setShowPlatformMenu(!showPlatformMenu)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${styles.hover} transition-all border ${styles.border}`}
                >
                  <span className="text-xl">{currentPlatform.icon}</span>
                  <span className={`font-medium hidden sm:block ${platform === 'quotify' ? 'text-gray-900' : 'text-white'}`}>
                    {currentPlatform.name}
                  </span>
                  <ChevronDown size={16} className={styles.accent} />
                </button>

                <AnimatePresence>
                  {showPlatformMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute top-full left-0 mt-2 w-72 ${styles.bg} backdrop-blur-xl border ${styles.border} rounded-xl shadow-2xl overflow-hidden`}
                    >
                      <div className="p-2">
                        {platforms.map((p) => (
                          <Link
                            key={p.id}
                            to={user ? p.route : p.loginRoute}
                            onClick={() => setShowPlatformMenu(false)}
                            className={`flex items-center gap-3 p-3 rounded-lg ${styles.hover} transition-all group`}
                          >
                            <span className="text-2xl">{p.icon}</span>
                            <div className="flex-1">
                              <p className={`font-bold ${platform === 'quotify' ? 'text-gray-900' : 'text-white'} group-hover:${styles.accent}`}>
                                {p.name}
                              </p>
                              <p className={`text-xs ${platform === 'quotify' ? 'text-gray-600' : 'text-gray-400'}`}>
                                {p.description}
                              </p>
                            </div>
                            {p.id === platform && (
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${p.color}`} />
                            )}
                          </Link>
                        ))}
                      </div>
                      <div className={`border-t ${styles.border} p-3 bg-gradient-to-r ${styles.gradient}`}>
                        <Link
                          to="/"
                          onClick={() => setShowPlatformMenu(false)}
                          className={`flex items-center gap-2 ${styles.accent} ${styles.hover} p-2 rounded-lg transition-all`}
                        >
                          <Grid size={16} />
                          <span className="text-sm font-medium">View All Platforms</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={`${link.label}-${index}`}
                to={link.route}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${styles.hover} transition-all ${
                  location.pathname === link.route ? `bg-gradient-to-r ${styles.gradient}` : ''
                }`}
              >
                <link.icon size={18} className={styles.accent} />
                <span className={`text-sm font-medium ${platform === 'quotify' ? 'text-gray-900' : 'text-white'}`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Notifications */}
                <button className={`p-2 rounded-lg ${styles.hover} transition-all relative`}>
                  <Bell size={20} className={styles.accent} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${styles.hover} transition-all border ${styles.border}`}
                  >
                    <span className="text-xl">{user.avatar}</span>
                    <div className="hidden sm:block text-left">
                      <p className={`text-sm font-medium ${platform === 'quotify' ? 'text-gray-900' : 'text-white'}`}>
                        {user.name}
                      </p>
                      {user.tier && (
                        <p className={`text-xs ${styles.accent}`}>{user.tier} Tier</p>
                      )}
                    </div>
                    <ChevronDown size={16} className={styles.accent} />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full right-0 mt-2 w-64 ${styles.bg} backdrop-blur-xl border ${styles.border} rounded-xl shadow-2xl overflow-hidden`}
                      >
                        <div className={`p-4 bg-gradient-to-r ${styles.gradient} border-b ${styles.border}`}>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{user.avatar}</span>
                            <div>
                              <p className={`font-bold ${platform === 'quotify' ? 'text-gray-900' : 'text-white'}`}>
                                {user.name}
                              </p>
                              <p className={`text-xs ${platform === 'quotify' ? 'text-gray-600' : 'text-gray-400'}`}>
                                {user.role || 'User'}
                              </p>
                            </div>
                          </div>
                          {user.reputation !== undefined && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span className={platform === 'quotify' ? 'text-gray-600' : 'text-gray-400'}>
                                  Reputation
                                </span>
                                <span className={styles.accent}>{user.reputation}</span>
                              </div>
                              <div className={`w-full h-1 ${platform === 'quotify' ? 'bg-gray-200' : 'bg-gray-700'} rounded-full overflow-hidden`}>
                                <div
                                  className={`h-full bg-gradient-to-r ${currentPlatform?.color || 'from-gray-500 to-gray-600'}`}
                                  style={{ width: `${Math.min((user.reputation / 2000) * 100, 100)}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              // Navigate to profile
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg ${styles.hover} transition-all`}
                          >
                            <User size={18} className={styles.accent} />
                            <span className={`text-sm ${platform === 'quotify' ? 'text-gray-900' : 'text-white'}`}>
                              View Profile
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              // Navigate to settings
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg ${styles.hover} transition-all`}
                          >
                            <Settings size={18} className={styles.accent} />
                            <span className={`text-sm ${platform === 'quotify' ? 'text-gray-900' : 'text-white'}`}>
                              Settings
                            </span>
                          </button>
                          <div className={`border-t ${styles.border} my-2`} />
                          <button
                            onClick={handleLogout}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 transition-all`}
                          >
                            <LogOut size={18} className="text-red-400" />
                            <span className={`text-sm ${platform === 'quotify' ? 'text-gray-900' : 'text-white'}`}>
                              Logout
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <Link
                to={currentPlatform?.loginRoute || '/husecircle/student/login'}
                className={`px-4 py-2 rounded-lg bg-gradient-to-r ${currentPlatform?.color || 'from-blue-500 to-purple-500'} text-white font-medium hover:shadow-lg transition-all`}
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`md:hidden p-2 rounded-lg ${styles.hover} transition-all`}
            >
              {showMobileMenu ? (
                <X size={24} className={styles.accent} />
              ) : (
                <Menu size={24} className={styles.accent} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-700 py-4"
            >
              {navLinks.map((link, index) => (
                <Link
                  key={`mobile-${link.label}-${index}`}
                  to={link.route}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 ${styles.hover} transition-all`}
                >
                  <link.icon size={18} className={styles.accent} />
                  <span className={`text-sm font-medium ${platform === 'quotify' ? 'text-gray-900' : 'text-white'}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}