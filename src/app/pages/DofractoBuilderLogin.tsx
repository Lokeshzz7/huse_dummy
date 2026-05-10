import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  UserPlus, Heart, Award, TrendingUp, Gift, Sparkles,
  Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle 
} from 'lucide-react';

export function DofractoBuilderLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Demo contributor/builder accounts
  const demoAccounts = [
    {
      email: 'akhil.sharma@gmail.com',
      password: 'demo123',
      name: 'Akhil Sharma',
      role: 'Tech Contributor',
      reputation: 3500,
      tier: 'Gold',
      avatar: '👨‍💻'
    },
    {
      email: 'priya.singh@gmail.com',
      password: 'demo123',
      name: 'Priya Singh',
      role: 'Marketing Builder',
      reputation: 1200,
      tier: 'Silver',
      avatar: '👩‍💼'
    },
    {
      email: 'rohan.patel@gmail.com',
      password: 'demo123',
      name: 'Rohan Patel',
      role: 'Design Contributor',
      reputation: 14000,
      tier: 'Platinum',
      avatar: '🎨'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const account = demoAccounts.find(
      acc => acc.email === email && acc.password === password
    );

    setTimeout(() => {
      if (account) {
        localStorage.setItem('dofractoBuilderUser', JSON.stringify(account));
        setLoading(false);
        toast.success('Welcome back!', {
          description: 'Successfully logged in as a Builder',
          duration: 3000
        });
        setTimeout(() => {
          navigate('/dofracto-builders-hub'); // Redirect to builders hub
        }, 1000);
      } else {
        setError('Invalid credentials. Try a demo account below.');
        setLoading(false);
      }
    }, 1500);
  };

  const handleDemoLogin = (account: any) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('dofractoBuilderUser', JSON.stringify(account));
      setLoading(false);
      toast.success('Welcome back!', {
        description: 'Successfully logged in as a Builder',
        duration: 3000
      });
      setTimeout(() => {
        navigate('/dofracto-builders-hub'); // Redirect to builders hub
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-12">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
                <UserPlus className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Join as Contributor
                </span>
              </h2>
              
              <p className="text-gray-400 text-lg mb-8">
                Discover startups, support their journey, build your reputation, and unlock opportunities on Dofracto.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Heart, text: 'Support innovative startups', color: 'text-pink-400' },
                  { icon: Award, text: 'Build reputation score', color: 'text-purple-400' },
                  { icon: TrendingUp, text: 'Track your impact', color: 'text-cyan-400' },
                  { icon: Gift, text: 'Unlock Quotify perks', color: 'text-amber-400' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Your reputation unlocks opportunities on Quotify</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Contributor Login</h1>
                <p className="text-gray-400">Access business listings</p>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-sm text-gray-500">Demo Accounts</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Demo Accounts */}
              <div className="space-y-3">
                {demoAccounts.map((account, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleDemoLogin(account)}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{account.avatar}</div>
                        <div>
                          <div className="font-bold text-white mb-1">{account.name}</div>
                          <div className="text-sm text-gray-400">
                            {account.role} • {account.tier} • {account.reputation} rep
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{account.email}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer Links */}
              <div className="mt-8 text-center space-y-3">
                <button
                  onClick={() => navigate('/dofracto-business-login')}
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Login as Business instead?
                </button>
                <div className="text-sm text-gray-500">
                  Don't have an account?{' '}
                  <button className="text-purple-400 hover:underline">
                    Sign Up Free
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => navigate('/dofracto')}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Dofracto
          </button>
        </motion.div>
      </div>
    </div>
  );
}