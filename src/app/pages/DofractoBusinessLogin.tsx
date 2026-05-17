import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Mail, Lock, Eye, EyeOff, 
  CheckCircle, AlertCircle, ArrowRight, Sparkles,
  Rocket, TrendingUp, Users, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DofractoBusinessLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Demo business accounts
  const demoAccounts = [
    {
      email: 'founder@payflow.com',
      password: 'demo123',
      name: 'PayFlow Inc.',
      founder: 'Rajesh Kumar',
      category: 'FinTech',
      stage: 'Seed',
      funding: '$2.5M'
    },
    {
      email: 'ceo@cloudsync.io',
      password: 'demo123',
      name: 'CloudSync',
      founder: 'Sarah Chen',
      category: 'SaaS',
      stage: 'Pre-Seed',
      funding: '$500K'
    },
    {
      email: 'admin@ecomart.com',
      password: 'demo123',
      name: 'EcoMart',
      founder: 'Amit Patel',
      category: 'E-Commerce',
      stage: 'Series A',
      funding: '$8M'
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
        localStorage.setItem('dofractoBusinessUser', JSON.stringify(account));
        setLoading(false);
        navigate('/admin/dashboard'); // Or create a business dashboard
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
      localStorage.setItem('dofractoBusinessUser', JSON.stringify(account));
      setLoading(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-4 pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#24c6dc]/10 rounded-full blur-[100px]"
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
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#05997F]/10 rounded-full blur-[100px]"
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
            <div className="bg-white/5 backdrop-blur-sm border border-[#24c6dc]/20 rounded-3xl p-12">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#24c6dc] to-[#05997F] mb-6">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] bg-clip-text text-transparent">
                  List Your Startup
                </span>
              </h2>
              
              <p className="text-gray-400 text-lg mb-8">
                Join the Dofracto ecosystem and accelerate your startup's growth with community support, mentorship, and exposure.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Rocket, text: 'Launch support campaigns', color: 'text-cyan-400' },
                  { icon: TrendingUp, text: 'Track growth analytics', color: 'text-green-400' },
                  { icon: Users, text: 'Connect with mentors', color: 'text-purple-400' },
                  { icon: Zap, text: 'Access HUSE Circle talent', color: 'text-amber-400' }
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

              <div className="mt-8 p-4 bg-[#24c6dc]/10 border border-[#24c6dc]/20 rounded-xl">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#24c6dc]" />
                  <span>HUSE Circle alumni get special recognition and benefits</span>
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
                <h1 className="text-3xl font-bold text-white mb-2">Business Login</h1>
                <p className="text-gray-400">Access your startup dashboard</p>
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
                    Business Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 transition-all"
                      placeholder="founder@yourstartup.com"
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 transition-all"
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
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white font-semibold hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#24c6dc]/30 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white mb-1">{account.name}</div>
                        <div className="text-sm text-gray-400">
                          {account.category} • {account.stage} • {account.funding}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{account.email}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#24c6dc] group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer Links */}
              <div className="mt-8 text-center space-y-3">
                <button
                  onClick={() => navigate('/dofracto/builder/login')}
                  className="text-sm text-gray-400 hover:text-[#24c6dc] transition-colors"
                >
                  Login as Contributor instead?
                </button>
                <div className="text-sm text-gray-500">
                  Don't have an account?{' '}
                  <button className="text-[#24c6dc] hover:underline">
                    Request Access
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