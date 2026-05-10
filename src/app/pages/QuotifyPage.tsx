import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AmbientBackground } from '../components/AmbientBackground';
import { useEcosystem } from '../context/EcosystemContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  FileText, Clock, Users, Zap, CheckCircle, ArrowRight,
  MessageSquare, DollarSign, Star, TrendingUp, Shield,
  Sparkles, Bell, Send, Upload, Calendar, X, Mail, Lock,
  Eye, EyeOff, AlertCircle, LogIn, Building2, GraduationCap
} from 'lucide-react';

export function QuotifyPage() {
  const { submitQuoteRequest, currentUser, startups } = useEcosystem();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in to Quotify
    const quotifyUser = localStorage.getItem('quotifyUser');
    if (quotifyUser) {
      setIsLoggedIn(true);
    }
  }, []);

  // Demo accounts for Quotify users
  const demoAccounts = [
    {
      email: 'sarah.johnson@company.com',
      password: 'demo123',
      name: 'Sarah Johnson',
      role: 'Startup Founder',
      company: 'TechStart Inc.',
      quotesRequested: 12,
      avatar: '👩‍💼'
    },
    {
      email: 'mike.chen@startup.com',
      password: 'demo123',
      name: 'Mike Chen',
      role: 'Product Manager',
      company: 'InnovateCo',
      quotesRequested: 8,
      avatar: '👨‍💻'
    },
    {
      email: 'priya.kumar@enterprise.com',
      password: 'demo123',
      name: 'Priya Kumar',
      role: 'Marketing Director',
      company: 'GrowthHub',
      quotesRequested: 15,
      avatar: '👩‍🎨'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    const account = demoAccounts.find(
      acc => acc.email === email && acc.password === password
    );

    setTimeout(() => {
      if (account) {
        localStorage.setItem('quotifyUser', JSON.stringify(account));
        setIsLoggingIn(false);
        setIsLoggedIn(true);
        setShowLoginModal(false);
        toast.success(`Welcome back, ${account.name}!`);
        navigate('/quotify/dashboard');
      } else {
        setLoginError('Invalid credentials. Try a demo account below.');
        setIsLoggingIn(false);
      }
    }, 1000);
  };

  const handleDemoLogin = (account: any) => {
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      localStorage.setItem('quotifyUser', JSON.stringify(account));
      setIsLoggingIn(false);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      toast.success(`Welcome back, ${account.name}!`);
      navigate('/quotify/dashboard');
    }, 800);
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    title: '',
    description: '',
    budget: '',
    timeline: '',
    files: null as File[] | null
  });

  const categories = [
    'Web Development',
    'Mobile App Development',
    'Design & Branding',
    'Marketing & SEO',
    'Content Creation',
    'Business Consulting',
    'Legal Services',
    'Accounting & Finance',
    'Construction & Renovation',
    'IT Support',
    'Event Management',
    'Photography & Video',
    'Translation Services',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!isLoggedIn) {
      setShowLoginModal(true);
      toast.error('Please login to submit a quote request');
      return;
    }
    
    setIsSubmitting(true);
    
    // Submit using ecosystem context
    submitQuoteRequest(formData);
    
    // Show success message
    setShowSuccess(true);
    setIsSubmitting(false);
    
    // Reset form
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        title: '',
        description: '',
        budget: '',
        timeline: '',
        files: null
      });
      setShowSuccess(false);
      
      // Show toast with ecosystem confirmation
      toast.success('Quote Request Submitted!', {
        description: `Your request has been sent to ${startups.length}+ Dofracto Startups and 50+ HUSE Circle Students. Expect quotes within 24-48 hours!`,
        duration: 5000
      });
      
      // Redirect to dashboard
      navigate('/quotify/dashboard');
    }, 2000);
  };

  const stats = [
    { icon: Users, label: 'Active Partners', value: '500+', color: '#24c6dc' },
    { icon: Clock, label: 'Avg Response Time', value: '12h', color: '#05997F' },
    { icon: MessageSquare, label: 'Quotes Delivered', value: '5K+', color: '#8B5CF6' },
    { icon: Star, label: 'Success Rate', value: '95%', color: '#F59E0B' }
  ];

  const howItWorks = [
    {
      step: 1,
      icon: FileText,
      title: 'Submit Your Request',
      description: 'Fill out the simple form with your project details, budget, and timeline.',
      color: '#24c6dc'
    },
    {
      step: 2,
      icon: Bell,
      title: 'We Alert Partners',
      description: 'Our ecosystem (Dofracto startups & HUSE Circle students) gets notified instantly.',
      color: '#8B5CF6'
    },
    {
      step: 3,
      icon: MessageSquare,
      title: 'Receive Quotes',
      description: 'Get multiple competitive quotes from verified partners within 24-48 hours.',
      color: '#05997F'
    },
    {
      step: 4,
      icon: CheckCircle,
      title: 'Choose & Connect',
      description: 'Compare proposals, review profiles, and connect with your ideal partner.',
      color: '#F59E0B'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: '24-48 hour response time guaranteed',
      color: '#24c6dc'
    },
    {
      icon: Users,
      title: 'Verified Partners',
      description: 'All quotes from ecosystem-verified businesses',
      color: '#8B5CF6'
    },
    {
      icon: DollarSign,
      title: 'Competitive Pricing',
      description: 'Multiple quotes ensure best value',
      color: '#05997F'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Backed by reputation systems',
      color: '#F59E0B'
    }
  ];

  return (
    <div className="min-h-screen bg-[#111] relative">
      <AmbientBackground />
      <Header />

      <main className="pt-[100px] pb-24">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#24c6dc]/20 to-[#8B5CF6]/20 border border-[#24c6dc]/30 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="text-[#24c6dc]" size={20} />
              <span className="text-white font-bold">Powered by HUSE Ecosystem</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-[48px] md:text-[72px] font-bold text-white mb-6">
              Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24c6dc] to-[#8B5CF6]">Multiple Quotes</span><br />
              in 8-48 Hours
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-[18px] md:text-[20px] max-w-3xl mx-auto mb-8">
              Connect with our ecosystem of verified startups and talented students. 
              Submit your request once, receive competitive quotes from multiple partners.
            </p>

            {/* NEW: AI Smart Matching Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#05997F]/20 to-[#24c6dc]/20 border border-[#05997F]/40 mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Sparkles className="text-[#05997F] animate-pulse" size={20} />
              <span className="text-white font-bold">NEW: AI-Powered Smart Matching</span>
              <span className="px-2 py-0.5 rounded-full bg-[#05997F]/30 text-[#05997F] text-xs font-bold">BETA</span>
            </motion.div>

            {/* Login Portal Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto mb-12"
            >
              {/* USER LOGIN PORTAL - Centered Featured Card */}
              <div className="bg-gradient-to-br from-[#24c6dc]/10 to-[#8B5CF6]/10 border-2 border-[#24c6dc]/30 rounded-[25px] p-10 text-center hover:border-[#24c6dc]/50 transition-all shadow-lg shadow-[#24c6dc]/10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#24c6dc]/30">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-[28px] font-bold text-white mb-2">Get Started with Quotify</h3>
                  <p className="text-gray-400 text-[16px] max-w-xl mx-auto">
                    Looking for services? Login to submit requests, receive competitive quotes from our ecosystem partners, and manage your projects all in one place.
                  </p>
                </div>
                
                {/* Benefits Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-[#24c6dc]/30 text-sm text-gray-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#24c6dc]" />
                    8-48h Response
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-[#8B5CF6]/30 text-sm text-gray-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#8B5CF6]" />
                    500+ Partners
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-[#05997F]/30 text-sm text-gray-300 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#05997F]" />
                    Verified Providers
                  </div>
                </div>

                {isLoggedIn ? (
                  <button
                    onClick={() => navigate('/quotify/dashboard')}
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#24c6dc] to-[#8B5CF6] text-white font-bold text-[18px] hover:shadow-lg hover:shadow-[#24c6dc]/40 transition-all group"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#24c6dc] to-[#8B5CF6] text-white font-bold text-[18px] hover:shadow-lg hover:shadow-[#24c6dc]/40 transition-all group"
                  >
                    <LogIn className="w-6 h-6" />
                    <span>Login / Get Started</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                
                {/* Additional Info */}
                <p className="text-gray-500 text-sm mt-6">
                  Free to submit requests • Pay only when you hire
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="relative max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-4">
              How <span className="text-[#24c6dc]">Quotify</span> Works
            </h2>
            <p className="text-gray-400 text-[18px] max-w-2xl mx-auto">
              Simple, fast, and connected to our entire ecosystem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Connection Line (desktop) */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-gradient-to-r from-current to-transparent opacity-30"
                    style={{ color: item.color }}
                  />
                )}

                <div 
                  className="bg-[#0a0a0a] border rounded-[20px] p-6 h-full hover:scale-105 transition-all duration-300"
                  style={{ borderColor: `${item.color}30` }}
                >
                  {/* Step Number */}
                  <div 
                    className="absolute -top-3 -left-3 w-10 h-10 rounded-full border-2 bg-[#111] flex items-center justify-center text-white font-bold"
                    style={{ borderColor: item.color }}
                  >
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-[15px] flex items-center justify-center mb-4"
                    style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                  >
                    <item.icon style={{ color: item.color }} size={32} />
                  </div>

                  {/* Content */}
                  <h3 className="text-white text-[20px] font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quote Request Form */}
        <section className="relative max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-4">
              What Our <span className="text-[#24c6dc]">Clients Say</span>
            </h2>
            <p className="text-gray-400 text-[18px] max-w-2xl mx-auto">
              Real results from businesses who found their perfect partners through Quotify
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <motion.div
              className="bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-[#24c6dc]/30 rounded-[20px] p-6 hover:border-[#24c6dc]/50 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 text-[15px] leading-relaxed mb-6">
                "Posted my web app development request on Friday evening. By Monday morning, I had <span className="text-[#24c6dc] font-bold">12 competitive quotes</span> from both established startups and talented students. Ended up hiring a HUSE Circle team who delivered beyond expectations!"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#24c6dc]/30 to-[#8B5CF6]/30 flex items-center justify-center text-2xl">
                  👨‍💼
                </div>
                <div>
                  <div className="text-white font-bold text-[14px]">Rahul Sharma</div>
                  <div className="text-gray-500 text-[12px]">CEO, TechVenture Labs</div>
                </div>
              </div>

              {/* Result Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#24c6dc]/10 border border-[#24c6dc]/30">
                <Clock className="w-4 h-4 text-[#24c6dc]" />
                <span className="text-[#24c6dc] text-xs font-bold">Got 12 quotes in 36 hours</span>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              className="bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-[#8B5CF6]/30 rounded-[20px] p-6 hover:border-[#8B5CF6]/50 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 text-[15px] leading-relaxed mb-6">
                "As a small business owner, I was worried about costs. Quotify connected me with <span className="text-[#8B5CF6] font-bold">8 Dofracto startups</span> offering amazing rates. I saved 40% compared to traditional agencies and got professional results. Game changer!"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6]/30 to-[#EC4899]/30 flex items-center justify-center text-2xl">
                  👩‍💼
                </div>
                <div>
                  <div className="text-white font-bold text-[14px]">Priya Malhotra</div>
                  <div className="text-gray-500 text-[12px]">Founder, Bloom Boutique</div>
                </div>
              </div>

              {/* Result Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
                <DollarSign className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-[#8B5CF6] text-xs font-bold">Saved 40% on project costs</span>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              className="bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-[#05997F]/30 rounded-[20px] p-6 hover:border-[#05997F]/50 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 text-[15px] leading-relaxed mb-6">
                "Needed urgent branding work for a product launch. Used the <span className="text-[#05997F] font-bold">₹999 Enterprise plan</span> and had 6 proposals within 8 hours! The quality from HUSE Circle's Platinum students was incredible. Will definitely use again."
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#05997F]/30 to-[#24c6dc]/30 flex items-center justify-center text-2xl">
                  👨‍💻
                </div>
                <div>
                  <div className="text-white font-bold text-[14px]">Arjun Kapoor</div>
                  <div className="text-gray-500 text-[12px]">Product Lead, NexGen AI</div>
                </div>
              </div>

              {/* Result Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#05997F]/10 border border-[#05997F]/30">
                <Zap className="w-4 h-4 text-[#05997F]" />
                <span className="text-[#05997F] text-xs font-bold">6 quotes in 8 hours</span>
              </div>
            </motion.div>
          </div>

          {/* Trust Stats Bar */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-[#24c6dc] text-[32px] font-bold mb-1">5,000+</div>
              <div className="text-gray-400 text-[12px]">Quotes Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-[#8B5CF6] text-[32px] font-bold mb-1">95%</div>
              <div className="text-gray-400 text-[12px]">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-[#05997F] text-[32px] font-bold mb-1">12h</div>
              <div className="text-gray-400 text-[12px]">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-[#F59E0B] text-[32px] font-bold mb-1">4.9/5</div>
              <div className="text-gray-400 text-[12px]">Client Rating</div>
            </div>
          </motion.div>
        </section>

        {/* Benefits */}
        <section className="relative max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-4">
              Why Choose <span className="text-[#8B5CF6]">Quotify</span>
            </h2>
            <p className="text-gray-400 text-[18px] max-w-2xl mx-auto">
              Connected to our entire ecosystem of verified partners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-[#0a0a0a] border rounded-[20px] p-6 hover:scale-105 transition-all duration-300"
                style={{ borderColor: `${benefit.color}30` }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div 
                  className="w-16 h-16 rounded-[15px] flex items-center justify-center mb-4"
                  style={{ background: `${benefit.color}20`, border: `1px solid ${benefit.color}40` }}
                >
                  <benefit.icon style={{ color: benefit.color }} size={32} />
                </div>
                <h3 className="text-white text-[20px] font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-400 text-[14px]">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ecosystem Connection */}
        <section className="relative max-w-6xl mx-auto px-6">
          <motion.div
            className="bg-gradient-to-r from-[#24c6dc]/10 via-[#8B5CF6]/10 to-[#EC4899]/10 border border-[#24c6dc]/30 rounded-[25px] p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="text-[#F59E0B] mx-auto mb-4" size={48} />
            <h2 className="text-white text-[32px] md:text-[40px] font-bold mb-4">
              Powered by Our Ecosystem
            </h2>
            <p className="text-gray-400 text-[18px] mb-8 max-w-3xl mx-auto">
              Your quote request reaches <span className="text-[#24c6dc] font-bold">500+ Dofracto startups</span> and{' '}
              <span className="text-[#8B5CF6] font-bold">2,000+ HUSE Circle students</span> across multiple colleges.
              Get the best talent and competitive pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#24c6dc]/20 to-[#05997F]/20 border border-[#24c6dc]/40">
                <TrendingUp className="text-[#24c6dc]" size={20} />
                <span className="text-white font-bold">Dofracto Startups</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/20 border border-[#8B5CF6]/40">
                <Users className="text-[#8B5CF6]" size={20} />
                <span className="text-white font-bold">HUSE Circle Students</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              className="bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[25px] p-8 md:p-12 max-w-2xl w-full my-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-2">
                    Login to Quotify
                  </h2>
                  <p className="text-gray-400 text-[14px]">
                    Access your dashboard and manage quote requests
                  </p>
                </div>
                <button
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setShowLoginModal(false)}
                >
                  <X size={24} className="text-gray-400 hover:text-white" />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-white font-medium mb-2 text-[14px]">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[#111] border border-[#24c6dc]/30 rounded-[12px] text-white placeholder-gray-500 focus:border-[#24c6dc] focus:outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-[14px]">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-[#111] border border-[#24c6dc]/30 rounded-[12px] text-white placeholder-gray-500 focus:border-[#24c6dc] focus:outline-none transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#24c6dc] transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{loginError}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white py-3.5 rounded-[12px] font-bold text-[16px] hover:shadow-[0_0_30px_rgba(36,198,220,0.5)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <LogIn className="group-hover:translate-x-1 transition-transform" size={20} />
                    </>
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-sm text-gray-500">Quick Demo Login</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              <div className="space-y-3">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDemoLogin(account)}
                    disabled={isLoggingIn}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#24c6dc]/30 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{account.avatar}</div>
                        <div>
                          <div className="font-bold text-white mb-0.5">{account.name}</div>
                          <div className="text-sm text-gray-400">
                            {account.role} • {account.company}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#24c6dc] group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-center text-gray-500 text-xs mt-6">
                By logging in, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}