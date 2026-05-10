import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { X, Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginType: 'student' | 'recruiter' | 'contributor' | 'business' | null;
  onSwitchToSignup?: () => void;
}

export function LoginModal({ isOpen, onClose, loginType, onSwitchToSignup }: LoginModalProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const platformConfig = {
    student: {
      title: 'Welcome Back, Student',
      subtitle: 'Login to your HUSE Circle account',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      loginRoute: '/huse-circle-loading',
      demoRoute: '/huse-circle-loading',
      demoLabel: 'Demo Student Account'
    },
    recruiter: {
      title: 'Welcome Back, Recruiter',
      subtitle: 'Login to access top student talent',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      loginRoute: '/recruiter-dashboard',
      demoRoute: '/recruiter-dashboard',
      demoLabel: 'Demo Recruiter Account'
    },
    contributor: {
      title: 'Welcome Back, Contributor',
      subtitle: 'Login to your Dofracto account',
      color: 'cyan',
      gradient: 'from-cyan-500 to-teal-500',
      loginRoute: '/dofracto-builders-hub',
      demoRoute: '/dofracto-builders-hub',
      demoLabel: 'Demo Contributor Account'
    },
    business: {
      title: 'Welcome Back, Startup Founder',
      subtitle: 'Login to your Dofracto startup portal',
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-500',
      loginRoute: '/business-portal-login',
      demoRoute: '/business-portal-login',
      demoLabel: 'Demo Startup Account'
    }
  };

  // Ensure we always have a valid config
  const config = loginType && platformConfig[loginType] ? platformConfig[loginType] : platformConfig.student;

  const handleLogin = async () => {
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      navigate(config.loginRoute);
    }, 1500);
  };

  const handleDemoLogin = (route: string) => {
    onClose();
    navigate(route);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && password) {
      handleLogin();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ pointerEvents: 'auto' }}
      />

      {/* Modal */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[101] p-3 sm:p-4"
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="bg-[#0a0a0a] border-2 border-white/20 rounded-[20px] sm:rounded-[25px] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className={`relative p-6 sm:p-8 bg-gradient-to-br ${config.gradient}`}>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors p-2"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center`}>
              <LogIn className="text-white" size={24} />
            </div>
            <h2 className="text-white font-bold text-[22px] sm:text-[28px] text-center mb-2">
              {config.title}
            </h2>
            <p className="text-gray-400 text-[13px] sm:text-[14px] text-center">
              {config.subtitle}
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <div className="space-y-4 sm:space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-gray-300 text-[13px] sm:text-[14px] font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="your.email@college.edu"
                    className="w-full bg-[#111] border border-white/10 rounded-[12px] pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-300 text-[14px] font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                    className="w-full bg-[#111] border border-white/10 rounded-[12px] pl-12 pr-12 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-[10px] p-3">
                  <p className="text-red-400 text-[13px]">{error}</p>
                </div>
              )}

              {/* Forgot Password */}
              <div className="text-right">
                <button className="text-purple-400 hover:text-purple-300 text-[13px] font-medium transition-colors">
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={!email || !password || isLoading}
                className={`w-full py-4 rounded-[15px] font-bold text-[16px] transition-all flex items-center justify-center gap-2 ${
                  email && password && !isLoading
                    ? `bg-gradient-to-r ${config.gradient} text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]`
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#0a0a0a] text-gray-500 text-[12px]">OR</span>
                </div>
              </div>

              {/* Demo Accounts */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-[12px] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 text-[12px] font-bold">DEV</span>
                  </div>
                  <h4 className="text-amber-400 font-bold text-[14px]">Demo Login (Testing)</h4>
                </div>
                <div className="space-y-2">
                  {loginType === 'student' ? (
                    <>
                      <button
                        onClick={() => handleDemoLogin('/huse-circle-loading')}
                        className="w-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 py-2.5 rounded-[10px] text-[13px] font-medium transition-all"
                      >
                        {config.demoLabel}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDemoLogin(config.demoRoute)}
                        className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 py-2.5 rounded-[10px] text-[13px] font-medium transition-all"
                      >
                        {config.demoLabel}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Switch to Signup */}
              {onSwitchToSignup && (
                <div className="text-center pt-2">
                  <p className="text-gray-400 text-[14px]">
                    Don't have an account?{' '}
                    <button
                      onClick={onSwitchToSignup}
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                      Sign up now
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>,
    document.body
  );
}