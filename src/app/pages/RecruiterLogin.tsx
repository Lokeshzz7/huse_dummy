import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Mail, Lock, Eye, EyeOff, 
  User, Phone, Globe, MapPin, Users,
  Briefcase, ArrowRight, CheckCircle, 
  Shield, Star, TrendingUp, Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function RecruiterLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    employeeCount: '',
    industry: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check demo credentials
    setTimeout(() => {
      if (loginForm.email === 'recruiter@company.com' && loginForm.password === 'demo123') {
        toast.success('Welcome back! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/recruiter-dashboard');
        }, 1000);
      } else {
        toast.error('Invalid credentials. Use demo credentials to login.');
        setLoading(false);
      }
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (signupForm.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success('Account created successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/recruiter-dashboard');
      }, 1000);
    }, 1500);
  };

  const benefits = [
    { icon: Users, text: 'Browse 12,000+ verified college students' },
    { icon: Star, text: 'Filter by skills, reputation, and college' },
    { icon: Shield, text: 'Direct access to student portfolios & projects' },
    { icon: TrendingUp, text: 'Real-time student activity and achievements' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/10 rounded-full" />
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate('/huse-circle')}
          className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40 rounded-[12px] transition-all"
        >
          <Home size={16} />
          <span className="text-[13px]">Back to HUSE Circle</span>
        </button>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block"
          >
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6">
                <Building2 className="text-white" size={32} />
              </div>
              <h1 className="text-white text-[42px] font-bold mb-4">
                Recruiter <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Portal</span>
              </h1>
              <p className="text-gray-400 text-[18px] leading-relaxed mb-8">
                Access India's most talented college students. Browse verified portfolios, 
                view real projects, and connect with tomorrow's tech leaders.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-[#1A1A1A]/50 border border-purple-500/20 rounded-[15px]"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-purple-400" size={20} />
                    </div>
                    <p className="text-gray-300 text-[15px] pt-2">{benefit.text}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-[20px]">
              <p className="text-purple-400 text-[14px] font-medium mb-2">Trusted by 450+ Companies</p>
              <div className="flex items-center gap-4 text-gray-400 text-[13px]">
                <div className="flex items-center gap-1">
                  <CheckCircle className="text-green-400" size={14} />
                  <span>Microsoft</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="text-green-400" size={14} />
                  <span>Google</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="text-green-400" size={14} />
                  <span>Amazon</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login/Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Demo Credentials Banner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-[15px]">
              <div className="flex items-start gap-3">
                <Shield className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-amber-400 font-bold text-[14px] mb-1">Demo Credentials</p>
                  <p className="text-gray-400 text-[12px] mb-2">Use these credentials to explore the recruiter dashboard:</p>
                  <div className="bg-[#1A1A1A] rounded-[10px] p-3 font-mono text-[12px] space-y-1">
                    <div className="text-gray-300">
                      <span className="text-purple-400">Email:</span> recruiter@company.com
                    </div>
                    <div className="text-gray-300">
                      <span className="text-purple-400">Password:</span> demo123
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-purple-500/20 rounded-[25px] p-8">
              {/* Toggle Buttons */}
              <div className="flex gap-2 mb-8 p-1 bg-[#0F0F0F] rounded-[15px]">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 px-6 py-3 rounded-[12px] font-medium transition-all ${
                    isLogin
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 px-6 py-3 rounded-[12px] font-medium transition-all ${
                    !isLogin
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isLogin ? (
                  // Login Form
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleLogin}
                    className="space-y-5"
                  >
                    <div>
                      <label className="text-gray-400 text-[13px] mb-2 block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                          type="email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          placeholder="recruiter@company.com"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-[13px] mb-2 block">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          placeholder="Enter your password"
                          required
                          className="w-full pl-12 pr-12 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
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

                    <div className="flex items-center justify-between text-[13px]">
                      <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                        <input type="checkbox" className="accent-purple-500" />
                        <span>Remember me</span>
                      </label>
                      <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors">
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-[12px] font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? 'Logging in...' : 'Login to Dashboard'}
                      {!loading && <ArrowRight size={18} />}
                    </button>
                  </motion.form>
                ) : (
                  // Signup Form
                  <motion.form
                    key="signup"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSignup}
                    className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-[13px] mb-2 block">Company Name *</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type="text"
                            value={signupForm.companyName}
                            onChange={(e) => setSignupForm({ ...signupForm, companyName: e.target.value })}
                            placeholder="Acme Corp"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-[13px] mb-2 block">Contact Person *</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type="text"
                            value={signupForm.contactPerson}
                            onChange={(e) => setSignupForm({ ...signupForm, contactPerson: e.target.value })}
                            placeholder="John Doe"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-[13px] mb-2 block">Company Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                          type="email"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                          placeholder="hr@company.com"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-[13px] mb-2 block">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type="tel"
                            value={signupForm.phone}
                            onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-[13px] mb-2 block">Website</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type="url"
                            value={signupForm.website}
                            onChange={(e) => setSignupForm({ ...signupForm, website: e.target.value })}
                            placeholder="www.company.com"
                            className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-[13px] mb-2 block">Location *</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type="text"
                            value={signupForm.location}
                            onChange={(e) => setSignupForm({ ...signupForm, location: e.target.value })}
                            placeholder="Mumbai, India"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-[13px] mb-2 block">Company Size *</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <select
                            value={signupForm.employeeCount}
                            onChange={(e) => setSignupForm({ ...signupForm, employeeCount: e.target.value })}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white focus:border-purple-500/40 outline-none transition-all"
                          >
                            <option value="">Select size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-500">201-500 employees</option>
                            <option value="500+">500+ employees</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-[13px] mb-2 block">Industry *</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <select
                          value={signupForm.industry}
                          onChange={(e) => setSignupForm({ ...signupForm, industry: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white focus:border-purple-500/40 outline-none transition-all"
                        >
                          <option value="">Select industry</option>
                          <option value="Technology">Technology</option>
                          <option value="Finance">Finance</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Consulting">Consulting</option>
                          <option value="Education">Education</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-[13px] mb-2 block">Password *</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                            placeholder="Min. 6 characters"
                            required
                            className="w-full pl-12 pr-12 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
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

                      <div>
                        <label className="text-gray-400 text-[13px] mb-2 block">Confirm Password *</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={signupForm.confirmPassword}
                            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                            placeholder="Re-enter password"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-[13px]">
                      <input type="checkbox" required className="accent-purple-500 mt-1" />
                      <label className="text-gray-400">
                        I agree to the <span className="text-purple-400 cursor-pointer hover:text-purple-300">Terms of Service</span> and <span className="text-purple-400 cursor-pointer hover:text-purple-300">Privacy Policy</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-[12px] font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? 'Creating Account...' : 'Create Recruiter Account'}
                      {!loading && <ArrowRight size={18} />}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0F0F0F;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(59, 130, 246), rgb(168, 85, 247));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(37, 99, 235), rgb(147, 51, 234));
        }
      `}</style>
    </div>
  );
}
