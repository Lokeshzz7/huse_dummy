import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, Mail, Lock, Eye, EyeOff, 
  CheckCircle, AlertCircle, ArrowRight, Sparkles,
  School, Zap
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function HuseCircleLogin() {
  const navigate = useNavigate();
  const { login, signUp, signInWithGoogle, isLoading: authLoading, logout } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const user = await signUp({ email, password, platform: 'huse' });
        if (user) {
          navigate('/onboarding');
        }
      } else {
        const user = await login({ email, password, platform: 'huse' });
        if (user) {
          if (user.role === 'admin') {
            await logout();
            setError('Admins must log in through the Super Admin portal.');
          } else if (user.user_status === 'pending_verification') {
            navigate('/onboarding');
          } else {
            navigate('/huse-circle-platform');
          }
        }
      }
    } catch (e: any) {
      setError(e.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithGoogle();
      // Google redirect happens natively
    } catch (e: any) {
      setError(e.message || 'Google Auth failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <motion.div
              className="w-20 h-20 mx-auto md:mx-0 mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              <GraduationCap className="text-white" size={40} />
            </motion.div>

            <h1 className="text-[48px] md:text-[56px] font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              Welcome to HUSE Circle
            </h1>
            <p className="text-gray-400 text-[18px] mb-8">
              Your college builder network. Where projects become portfolios.
            </p>

            {/* Benefits */}
            <div className="space-y-3 text-left hidden md:block">
              {[
                { icon: Sparkles, text: 'Build your placement portfolio' },
                { icon: Zap, text: 'Earn reputation & unlock gigs' },
                { icon: School, text: 'Connect with your housemates' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <item.icon className="text-purple-400" size={16} />
                  </div>
                  <span className="text-[14px]">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#0F0F0F] border border-purple-500/20 rounded-[25px] p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-white text-[28px] font-bold mb-2">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
              <p className="text-gray-400 text-[14px]">Access your builder profile</p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4 mb-6">
              <div>
                <label className="text-gray-400 text-[13px] mb-2 block">College Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.name@college.ac.in"
                    className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-[13px] mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignUp ? 'Create a secure password' : 'Enter your password'}
                    className="w-full pl-12 pr-12 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-[12px] text-red-400 text-[13px]"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: error.replace(/(Forgot \/ Set Password)/g, '<a href="/auth/recover" class="underline font-medium">$1</a>') }} />
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-[12px] font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-purple-500/20" /></div>
              <div className="relative flex justify-center text-[12px]">
                <span className="px-4 bg-[#0F0F0F] text-gray-500">Or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full mb-6 px-6 py-3 bg-[#1A1A1A] border border-purple-500/20 text-white rounded-[12px] font-medium hover:border-purple-500/40 transition-all flex items-center justify-center gap-3"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>

            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-400 hover:text-purple-300 text-[13px] transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign in →' : 'New student? Create account →'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}