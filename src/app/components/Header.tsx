import { useState, useRef, useEffect } from 'react';
import { AvatarDisplay } from './AvatarDisplay';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogOut, LogIn } from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';
import { NotificationBell } from './NotificationBell';
import { LoginModal } from './LoginModal';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [mobileLoginDropdownOpen, setMobileLoginDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState<'student' | 'recruiter' | 'contributor' | 'business' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useEcosystem();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-premium ${ 
        scrolled 
          ? 'glass-premium shadow-premium-lg border-b border-white/10' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-[70px] sm:h-[80px] flex items-center justify-between">
        {/* Brand Name */}
        <Link to="/" className="flex items-center group">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#24c6dc] via-[#B66FDE] to-[#3B82F6] bg-clip-text text-transparent smooth-edges"
          >
            HUSE
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link 
            to="/dofracto"
            className="text-gray-300 hover:text-white transition-premium relative group smooth-edges"
          >
            <span className="relative z-10">Dofracto</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#24c6dc] to-[#05997F] group-hover:w-full transition-premium" />
          </Link>
          <Link 
            to="/huse-circle"
            className="text-gray-300 hover:text-white transition-premium relative group smooth-edges"
          >
            <span className="relative z-10">HUSE Circle</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#24c6dc] to-[#05997F] group-hover:w-full transition-premium" />
          </Link>
          <Link 
            to="/quotify"
            className="text-gray-300 hover:text-white transition-premium relative group smooth-edges"
          >
            <span className="relative z-10">Quotify</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#24c6dc] to-[#05997F] group-hover:w-full transition-premium" />
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Notification Bell (only if logged in) */}
          {currentUser && <NotificationBell />}
          
          {currentUser ? (
            /* User logged in - show profile */
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 px-4 py-2 rounded-[12px] border border-[#24c6dc]/30 glass-premium hover-glow-cyan transition-premium"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center text-white font-bold shadow-premium-glow-cyan">
                <AvatarDisplay avatar={currentUser.avatar} name={currentUser.name} />
              </div>
              <div className="text-left">
                <p className="text-white text-[14px] font-bold">{currentUser.name}</p>
                <p className="text-gray-500 text-[11px]">{currentUser.type}</p>
              </div>
              <button
                onClick={logout}
                className="ml-2 p-2 text-gray-400 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </motion.div>
          ) : (
            /* Not logged in - show login dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-5 py-2.5 rounded-[12px] font-medium text-[14px] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
              >
                <LogIn size={18} />
                Login
              </button>

              <AnimatePresence>
                {loginDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-[15px] overflow-hidden shadow-2xl"
                  >
                    {/* HUSE Circle Section */}
                    <div className="p-3 border-b border-white/10">
                      <p className="text-gray-500 text-[11px] font-bold uppercase mb-2 px-2">HUSE Circle</p>
                      <button
                        onClick={() => {
                          navigate('/huse-circle-login');
                          setLoginDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-purple-500/10 transition-all text-left group"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[14px]">
                          🎓
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-[14px] font-medium group-hover:text-purple-400 transition-colors">Student</p>
                          <p className="text-gray-500 text-[11px]">Build & get recruited</p>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLoginType('recruiter');
                          setLoginModalOpen(true);
                          setLoginDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-blue-500/10 transition-all text-left group mt-1"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-[14px]">
                          🏢
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-[14px] font-medium group-hover:text-blue-400 transition-colors">Recruiter</p>
                          <p className="text-gray-500 text-[11px]">Find top talent</p>
                        </div>
                      </button>
                    </div>

                    {/* Dofracto Section */}
                    <div className="p-3">
                      <p className="text-gray-500 text-[11px] font-bold uppercase mb-2 px-2">Dofracto</p>
                      <button
                        onClick={() => {
                          setSelectedLoginType('contributor');
                          setLoginModalOpen(true);
                          setLoginDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-cyan-500/10 transition-all text-left group"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-[14px]">
                          🛠️
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-[14px] font-medium group-hover:text-cyan-400 transition-colors">Contributor</p>
                          <p className="text-gray-500 text-[11px]">Join startup teams</p>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLoginType('business');
                          setLoginModalOpen(true);
                          setLoginDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-emerald-500/10 transition-all text-left group mt-1"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-[14px]">
                          🚀
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-[14px] font-medium group-hover:text-emerald-400 transition-colors">Startup</p>
                          <p className="text-gray-500 text-[11px]">Build your startup</p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="flex flex-col p-4 sm:p-6 gap-4 max-h-[calc(100vh-70px)] overflow-y-auto">
              {/* User Info or Login Section - Mobile */}
              {currentUser ? (
                <div className="flex items-center gap-3 p-4 rounded-[12px] border border-[#24c6dc]/30 bg-[#24c6dc]/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center text-white font-bold">
                    <AvatarDisplay avatar={currentUser.avatar} name={currentUser.name} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white text-[15px] font-bold">{currentUser.name}</p>
                    <p className="text-gray-400 text-[12px]">{currentUser.type}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="border border-white/10 rounded-[15px] overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 p-3 border-b border-white/10">
                    <p className="text-white font-bold text-[14px]">Login to HUSE</p>
                    <p className="text-gray-400 text-[11px]">Choose your platform</p>
                  </div>
                  
                  {/* HUSE Circle Section */}
                  <div className="p-3 border-b border-white/10">
                    <p className="text-gray-500 text-[10px] font-bold uppercase mb-2">HUSE Circle</p>
                    <button
                      onClick={() => {
                        navigate('/huse-circle-login');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-[10px] hover:bg-purple-500/10 transition-all text-left mb-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[14px]">
                        🎓
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-[14px] font-medium">Student</p>
                        <p className="text-gray-500 text-[10px]">Build your portfolio</p>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLoginType('recruiter');
                        setLoginModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-[10px] hover:bg-blue-500/10 transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-[14px]">
                        🏢
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-[14px] font-medium">Recruiter</p>
                        <p className="text-gray-500 text-[10px]">Find top talent</p>
                      </div>
                    </button>
                  </div>

                  {/* Dofracto Section */}
                  <div className="p-3">
                    <p className="text-gray-500 text-[10px] font-bold uppercase mb-2">Dofracto</p>
                    <button
                      onClick={() => {
                        setSelectedLoginType('contributor');
                        setLoginModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-[10px] hover:bg-cyan-500/10 transition-all text-left mb-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-[14px]">
                        🛠️
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-[14px] font-medium">Contributor</p>
                        <p className="text-gray-500 text-[10px]">Join startup teams</p>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLoginType('business');
                        setLoginModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-[10px] hover:bg-emerald-500/10 transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-[14px]">
                        🚀
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-[14px] font-medium">Startup</p>
                        <p className="text-gray-500 text-[10px]">Build your startup</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <Link 
                  to="/dofracto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-white hover:text-[#24c6dc] transition-colors p-3 rounded-lg hover:bg-white/5"
                >
                  <span className="text-[16px] font-medium">Dofracto</span>
                </Link>
                <Link 
                  to="/huse-circle"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-white hover:text-[#24c6dc] transition-colors p-3 rounded-lg hover:bg-white/5"
                >
                  <span className="text-[16px] font-medium">HUSE Circle</span>
                </Link>
                <Link 
                  to="/quotify"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-white hover:text-[#24c6dc] transition-colors p-3 rounded-lg hover:bg-white/5"
                >
                  <span className="text-[16px] font-medium">Quotify</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {loginModalOpen && (
          <LoginModal 
            isOpen={loginModalOpen} 
            onClose={() => setLoginModalOpen(false)} 
            loginType={selectedLoginType}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}