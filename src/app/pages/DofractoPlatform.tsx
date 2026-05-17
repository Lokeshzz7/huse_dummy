import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, TrendingUp, Users, Target, Zap, Award,
  BarChart3, DollarSign, MessageCircle, Heart,
  Eye, Share2, ExternalLink, Search, Filter,
  MapPin, Calendar, Tag, ArrowRight, Sparkles,
  Building2, Globe, Link as LinkIcon, Star,
  ChevronDown, Plus, Bookmark, ThumbsUp,
  CheckCircle, ShieldCheck, Briefcase, UserPlus,
  TrendingDown, Activity, Clock, Gift, GraduationCap,
  Lock, Crown
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { AlumniPathSelectionModal } from '../components/AlumniPathSelectionModal';
import { toast } from 'sonner';

export function DofractoPlatform() {
  const navigate = useNavigate();
  const [randomStartups, setRandomStartups] = useState<any[]>([]);
  const [showAlumniPathModal, setShowAlumniPathModal] = useState(false);
  const { user } = useAuth();

  // Check if user is a Platinum HUSE alumni visiting for the first time
  useEffect(() => {
    if (user && user.tier === 'Platinum' && user.role === 'student') {
      // Check if they've already selected a path (in real app, this would be in user profile)
      const hasSelectedPath = localStorage.getItem(`dofracto_path_selected_${user.email}`);
      if (!hasSelectedPath) {
        // Show the path selection modal
        setShowAlumniPathModal(true);
      }
    }
  }, [user]);

  const handlePathSelection = (path: 'contributor' | 'business-owner') => {
    if (user) {
      // In a real app, this would save to the backend
      localStorage.setItem(`dofracto_path_selected_${user.email}`, path);
      localStorage.setItem(`dofracto_path_${user.email}`, path);
      
      const pathName = path === 'contributor' ? 'Contributor' : 'Business Owner';
      toast.success(
        `Welcome to Dofracto as a ${pathName}!`,
        {
          description: '🎉 You have 1 year free access with your HUSE Alumni badge'
        }
      );
    }
    setShowAlumniPathModal(false);
  };

  // All startups database
  const allStartups = [
    {
      id: '1',
      name: 'PayFlow',
      tagline: 'Next-gen payment solutions for SMEs',
      description: 'Making payments seamless for small businesses across India with innovative fintech solutions.',
      category: 'FinTech',
      stage: 'Seed' as const,
      funding: '$2.5M',
      supporters: 234,
      logo: '💳',
      banner: 'from-blue-500 to-cyan-500',
      tags: ['Payments', 'B2B', 'SaaS'],
      metrics: {
        revenue: '$50K MRR',
        users: '1,200',
        growth: '+45%'
      }
    },
    {
      id: '2',
      name: 'EcoMart',
      tagline: 'Sustainable products marketplace',
      description: 'Connecting eco-conscious consumers with sustainable brands across categories.',
      category: 'E-Commerce',
      stage: 'Series A' as const,
      funding: '$8M',
      supporters: 567,
      logo: '🌱',
      banner: 'from-green-500 to-emerald-500',
      tags: ['Sustainability', 'Marketplace', 'B2C'],
      metrics: {
        revenue: '$200K MRR',
        users: '15,000',
        growth: '+89%'
      }
    },
    {
      id: '3',
      name: 'DevTools Pro',
      tagline: 'Developer productivity suite',
      description: 'All-in-one toolkit for modern developers to build, test, and deploy faster.',
      category: 'SaaS',
      stage: 'Growth' as const,
      funding: '$15M',
      supporters: 891,
      logo: '🛠️',
      banner: 'from-amber-500 to-yellow-500',
      tags: ['DevTools', 'B2B', 'SaaS'],
      metrics: {
        revenue: '$450K MRR',
        users: '25,000',
        growth: '+56%'
      }
    },
    {
      id: '4',
      name: 'HealthHub',
      tagline: 'Telemedicine for rural India',
      description: 'Bringing quality healthcare to rural areas through telemedicine and AI diagnostics.',
      category: 'HealthTech',
      stage: 'Seed' as const,
      funding: '$3M',
      supporters: 432,
      logo: '🏥',
      banner: 'from-red-500 to-pink-500',
      tags: ['Healthcare', 'AI', 'Social Impact'],
      metrics: {
        revenue: '$80K MRR',
        users: '8,500',
        growth: '+120%'
      }
    },
    {
      id: '5',
      name: 'EduLearn',
      tagline: 'Personalized learning platform',
      description: 'AI-powered personalized education for K-12 students across India.',
      category: 'EdTech',
      stage: 'Series A' as const,
      funding: '$10M',
      supporters: 1234,
      logo: '📚',
      banner: 'from-purple-500 to-indigo-500',
      tags: ['Education', 'AI', 'K-12'],
      metrics: {
        revenue: '$300K MRR',
        users: '50,000',
        growth: '+95%'
      }
    },
    {
      id: '6',
      name: 'FarmTech',
      tagline: 'Smart farming solutions',
      description: 'IoT and AI solutions to help farmers maximize yield and reduce costs.',
      category: 'AgriTech',
      stage: 'Seed' as const,
      funding: '$2M',
      supporters: 345,
      logo: '🌾',
      banner: 'from-lime-500 to-green-500',
      tags: ['Agriculture', 'IoT', 'AI'],
      metrics: {
        revenue: '$60K MRR',
        users: '3,400',
        growth: '+78%'
      }
    }
  ];

  // Select 3 random startups on component mount
  useEffect(() => {
    const shuffled = [...allStartups].sort(() => 0.5 - Math.random());
    setRandomStartups(shuffled.slice(0, 3));
  }, []);

  const stats = [
    { label: 'Active Startups', value: '200+', icon: Rocket, color: 'text-cyan-400' },
    { label: 'Total Raised', value: '₹50Cr+', icon: DollarSign, color: 'text-green-400' },
    { label: 'Contributors', value: '5,000+', icon: Users, color: 'text-purple-400' },
    { label: 'Success Stories', value: '120+', icon: Award, color: 'text-amber-400' },
  ];

  const features = [
    {
      icon: Rocket,
      title: 'Discover 200+ Startups',
      description: 'Access verified startups across all industries and growth stages',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Heart,
      title: 'Support Campaigns',
      description: 'Contribute to community support campaigns and earn returns',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: TrendingUp,
      title: 'Track Performance',
      description: 'Real-time analytics on startup metrics and your contributions',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Network & Connect',
      description: 'Join a community of 5,000+ contributors and founders',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Businesses',
      description: 'All startups are verified and vetted by our team',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      icon: Briefcase,
      title: 'Opportunity Access',
      description: 'Get exclusive opportunities from startups and earn via Quotify',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#24c6dc] rounded-full blur-[200px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#05997F] rounded-full blur-[200px]"
        />
      </div>

      {/* Removed EcosystemNav - Clean landing page without cross-platform navigation */}

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-[#24c6dc]/30 mb-6"
              >
                <Rocket className="w-5 h-5 text-[#24c6dc]" />
                <span className="text-sm text-gray-300">Startup Accelerator Platform</span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] bg-clip-text text-transparent">
                  Dofracto
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
                Discover innovative startups, support their journey, and connect with the next generation of entrepreneurs
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#24c6dc]/30 transition-all duration-300"
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Startups Section */}
        <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Featured Startups
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Get a preview of innovative startups on Dofracto. Unlock access to 200+ verified businesses.
              </p>
              
              {/* Lock Banner */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-full">
                <Lock className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-medium">Preview Mode - Join to Access Full Platform</span>
              </div>
            </motion.div>

            {/* Startup Cards Grid - Only 3 Random Startups */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {randomStartups.map((startup, index) => (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#24c6dc]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#24c6dc]/20"
                >
                  {/* Banner */}
                  <div className={`h-32 bg-gradient-to-br ${startup.banner} relative`}>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Logo & Info */}
                    <div className="flex items-start gap-3 mb-4 -mt-14">
                      <div className="w-16 h-16 bg-black border-4 border-white/10 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                        {startup.logo}
                      </div>
                      <div className="flex-1 mt-12">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-white text-lg">{startup.name}</h3>
                          <span className="px-2 py-0.5 bg-[#24c6dc]/20 border border-[#24c6dc] rounded-full text-[10px] text-[#24c6dc] font-medium">
                            {startup.stage}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{startup.tagline}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {startup.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {startup.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-white/5 rounded-xl">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Revenue</div>
                        <div className="text-sm font-bold text-white">{startup.metrics.revenue}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Users</div>
                        <div className="text-sm font-bold text-white">{startup.metrics.users}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Growth</div>
                        <div className="text-sm font-bold text-green-400">{startup.metrics.growth}</div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{startup.supporters}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{startup.funding}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/dofracto/startup/${startup.id}`)}
                        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all duration-300 group"
                      >
                        View
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Unlock Access CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-3xl p-8 text-center">
                <Lock className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  Want to See More?
                </h3>
                <p className="text-xl text-gray-400 mb-8">
                  Unlock access to 200+ verified startups, support campaigns, and exclusive opportunities
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {/* Contributor CTA */}
                  <div className="bg-black/40 border border-purple-500/30 rounded-2xl p-6">
                    <UserPlus className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">For Contributors</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Discover startups, support campaigns, and earn through contributions
                    </p>
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-white mb-1">₹499</div>
                      <div className="text-gray-400 text-sm">per year</div>
                      <div className="text-purple-400 text-xs font-medium mt-1">7-Day Free Trial</div>
                    </div>
                    <button
                      onClick={() => navigate('/dofracto/pricing/contributor')}
                      className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Start Free Trial
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Business CTA */}
                  <div className="bg-black/40 border border-cyan-500/30 rounded-2xl p-6">
                    <Crown className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">For Businesses</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      List your startup, raise funds, recruit talent, and get customers
                    </p>
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-white mb-1">Custom Pricing</div>
                      <div className="text-gray-400 text-sm mb-2">Tailored to your business needs</div>
                      <div className="flex items-center justify-center gap-1 text-green-400 text-xs font-medium">
                        <Sparkles className="w-3 h-3" />
                        Or earn with 300,000+ reputation
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/business/register')}
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-gray-500 text-xs text-center mt-2">
                      Custom plans available
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-gray-500 text-sm">
                    🎓 <span className="text-purple-400 font-medium">HUSE Circle Alumni?</span> Get FREE lifetime access!{' '}
                    <button
                      onClick={() => navigate('/dofracto/pricing/contributor')}
                      className="text-cyan-400 hover:underline font-medium"
                    >
                      Claim Now →
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Choose Dofracto?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Everything you need to discover, support, and grow with startups
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#24c6dc]/50 transition-all duration-300"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 mb-6`}>
                    <feature.icon className="w-8 h-8 text-[#24c6dc]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HUSE Circle Integration */}
        <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#B66FDE]/20 via-[#24c6dc]/20 to-[#05997F]/20 rounded-3xl blur-3xl" />
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
                <GraduationCap className="w-16 h-16 text-[#B66FDE] mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Student-to-Startup Pipeline
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                  Graduated from HUSE Circle? Launch your startup on Dofracto with special alumni benefits, recognition, and FREE lifetime access.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/husecircle')}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#B66FDE] to-[#E8C4FF] text-white font-semibold hover:shadow-lg hover:shadow-[#B66FDE]/30 transition-all duration-300"
                  >
                    Visit HUSE Circle
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    Learn About Ecosystem
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-3xl blur-3xl opacity-20" />
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Join the Revolution?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Whether you're building the next big thing or supporting innovation, Dofracto is your platform
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/dofracto/pricing/contributor/business')}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white font-semibold hover:shadow-xl hover:shadow-[#24c6dc]/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Building2 className="w-5 h-5" />
                    I'm a Startup
                  </button>
                  <button
                    onClick={() => navigate('/dofracto/pricing/contributor')}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    I'm a Contributor
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      
      {/* Alumni Path Selection Modal */}
      <AlumniPathSelectionModal
        isOpen={showAlumniPathModal}
        onClose={() => setShowAlumniPathModal(false)}
        onSelectPath={handlePathSelection}
        userName={user?.name || 'Alumni'}
      />
    </div>
  );
}