import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AmbientBackground } from '../components/AmbientBackground';
import { useEcosystem } from '../context/EcosystemContext';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  ArrowLeft, Star, MapPin, Users, DollarSign, TrendingUp,
  Heart, Share2, Bookmark, Mail, Phone, Globe, Calendar,
  Award, Target, Zap, CheckCircle, ExternalLink, GraduationCap,
  Sparkles, Clock, BadgeCheck
} from 'lucide-react';

export function StartupDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isInterested, setIsInterested] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock startup data - in real app, fetch based on ID
  const startup = {
    name: 'TechVision Solutions',
    tagline: 'Leading software development and IT consulting firm',
    category: 'Technology',
    stage: 'Growth',
    founded: '2019',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviews: 234,
    team: 45,
    funding: '$2.5M',
    revenue: '$5M ARR',
    logo: '🚀',
    isHuseAlumni: true, // HUSE Circle Alumni badge
    huseCollege: 'MIT',
    description: 'TechVision Solutions is a cutting-edge software development and IT consulting firm that specializes in building scalable enterprise solutions. We partner with startups and established businesses to transform their digital presence through innovative technology.',
    // Community Support Campaign
    communityCampaign: {
      goal: 50000,
      current: 32500,
      supporters: 127,
      daysLeft: 23,
      tiers: [
        {
          name: 'Early Believer',
          amount: 100,
          perks: ['Early product access', 'Monthly updates', 'Supporter badge'],
          available: 50,
          claimed: 32
        },
        {
          name: 'Community Champion',
          amount: 500,
          perks: ['Beta testing access', 'Quarterly founder Q&A', 'Product credits ($100)', 'Exclusive merchandise'],
          available: 25,
          claimed: 15
        },
        {
          name: 'Launch Partner',
          amount: 1000,
          perks: ['Priority support', 'Product credits ($500)', 'Your logo on our website', 'Annual strategy session'],
          available: 10,
          claimed: 7
        }
      ]
    },
    highlights: [
      'Served 100+ clients globally',
      '95% client retention rate',
      'Award-winning development team',
      'ISO 9001 certified'
    ],
    services: [
      'Custom Software Development',
      'Cloud Solutions',
      'Mobile App Development',
      'DevOps & Infrastructure',
      'AI/ML Integration',
      'Cybersecurity'
    ],
    opportunities: [
      {
        type: 'Equity',
        title: 'Senior React Developer',
        equity: '0.5-1%',
        commitment: 'Part-time (20hrs/week)'
      },
      {
        type: 'Revenue Share',
        title: 'Marketing Lead',
        share: '5% of revenue generated',
        commitment: 'Full-time'
      },
      {
        type: 'Advisory',
        title: 'Technical Advisor',
        equity: '0.25%',
        commitment: '5hrs/month'
      }
    ],
    team_members: [
      { name: 'Alex Chen', role: 'CEO & Co-founder', avatar: '👨‍💼' },
      { name: 'Sarah Johnson', role: 'CTO', avatar: '👩‍💻' },
      { name: 'Michael Brown', role: 'Head of Product', avatar: '👨‍🎨' }
    ],
    metrics: [
      { label: 'Monthly Active Users', value: '50K+' },
      { label: 'Growth Rate', value: '+35% MoM' },
      { label: 'Customer Satisfaction', value: '4.8/5.0' },
      { label: 'Team Size', value: '45 people' }
    ],
    contact: {
      email: 'hello@techvision.co',
      phone: '+1 (555) 123-4567',
      website: 'https://techvision.co'
    }
  };

  return (
    <div className="min-h-screen bg-[#111] relative">
      <AmbientBackground />
      <Header />
      
      <main className="pt-[100px] pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft size={20} />
            <span>Back to Listings</span>
          </motion.button>

          {/* Header Section */}
          <motion.div
            className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-[25px] p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="w-32 h-32 rounded-[20px] bg-gradient-to-br from-[#24c6dc]/20 to-[#05997F]/20 flex items-center justify-center text-[64px] border border-[#24c6dc]/30 flex-shrink-0">
                {startup.logo}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-white text-[36px] font-bold mb-2">{startup.name}</h1>
                    <p className="text-gray-400 text-[18px] mb-4">{startup.tagline}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-3 rounded-[12px] border transition-all ${
                        isBookmarked
                          ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                          : 'border-[#24c6dc]/30 text-gray-400 hover:text-white hover:border-[#24c6dc]'
                      }`}
                    >
                      <Bookmark size={20} className={isBookmarked ? 'fill-amber-500' : ''} />
                    </button>
                    <button className="p-3 rounded-[12px] border border-[#24c6dc]/30 text-gray-400 hover:text-white hover:border-[#24c6dc] transition-all">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="px-4 py-2 rounded-full bg-[#05997F]/20 text-[#05997F] border border-[#05997F]/30">
                    {startup.category}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-[#24c6dc]/20 text-[#24c6dc] border border-[#24c6dc]/30">
                    {startup.stage} Stage
                  </span>
                  {startup.isHuseAlumni && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/20 border border-[#8B5CF6]/40 group relative cursor-pointer">
                      <GraduationCap size={16} className="text-[#8B5CF6]" />
                      <span className="text-[#8B5CF6] font-bold">HUSE Circle Alumni</span>
                      <Sparkles size={14} className="text-[#EC4899]" />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#0a0a0a] border border-[#8B5CF6]/40 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        <p className="text-white text-[12px]">Born from {startup.huseCollege} innovation</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                    <Star size={16} className="fill-amber-500" />
                    <span>{startup.rating} ({startup.reviews} reviews)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} className="text-[#24c6dc]" />
                    <span className="text-[14px]">{startup.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} className="text-[#05997F]" />
                    <span className="text-[14px]">Founded {startup.founded}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={16} className="text-[#24c6dc]" />
                    <span className="text-[14px]">{startup.team} team members</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <DollarSign size={16} className="text-[#05997F]" />
                    <span className="text-[14px]">{startup.funding} raised</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                // Check if user is logged in
                const storedUser = localStorage.getItem('dofractoBuilderUser');
                
                if (storedUser) {
                  // User is logged in - add to watchlist
                  setIsInterested(true);
                  toast.success('Added to your watchlist! 💚', {
                    description: 'You can view all saved startups in your Builders Hub'
                  });
                  // Optionally navigate to watchlist after a short delay
                  setTimeout(() => navigate('/watchlist'), 1500);
                } else {
                  // User not logged in - navigate to Dofracto Builder Login
                  setIsInterested(true);
                  toast.info('Login to express interest', {
                    description: 'Create an account to track startups and contribute'
                  });
                  navigate('/dofracto-builder-login');
                }
              }}
              className="w-full mt-6 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-8 py-4 rounded-[15px] hover:shadow-[0_0_30px_rgba(36,198,220,0.5)] transition-all font-bold flex items-center justify-center gap-2"
            >
              Express Interest
              <Heart size={20} className={isInterested ? 'fill-white' : ''} />
            </button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* About */}
              <motion.div
                className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-[20px] p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-white text-[24px] font-bold mb-4 flex items-center gap-2">
                  <Zap className="text-[#24c6dc]" />
                  About
                </h2>
                <p className="text-gray-400 text-[16px] leading-relaxed">
                  {startup.description}
                </p>
              </motion.div>

              {/* Highlights */}
              <motion.div
                className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-[20px] p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-white text-[24px] font-bold mb-4 flex items-center gap-2">
                  <Award className="text-[#05997F]" />
                  Highlights
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {startup.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-[12px] bg-[#05997F]/10 border border-[#05997F]/20">
                      <CheckCircle size={20} className="text-[#05997F]" />
                      <span className="text-gray-300 text-[14px]">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Services */}
              <motion.div
                className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-[20px] p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-white text-[24px] font-bold mb-4 flex items-center gap-2">
                  <Target className="text-[#24c6dc]" />
                  Services
                </h2>
                <div className="flex flex-wrap gap-2">
                  {startup.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-[#24c6dc]/10 text-[#24c6dc] border border-[#24c6dc]/30 text-[14px]"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Community Support Campaign */}
              <motion.div
                className="bg-gradient-to-br from-[#8B5CF6]/10 via-[#0a0a0a] to-[#EC4899]/10 border border-[#8B5CF6]/30 rounded-[20px] p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-[24px] font-bold flex items-center gap-2">
                    <Sparkles className="text-[#8B5CF6]" />
                    Community Support Campaign
                  </h2>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40">
                    <Clock size={16} className="text-[#F59E0B]" />
                    <span className="text-[#F59E0B] font-bold text-[14px]">{startup.communityCampaign.daysLeft} days left</span>
                  </div>
                </div>

                <p className="text-gray-400 text-[14px] mb-6">
                  Join our community of early supporters and be part of our journey from day one. 
                  Gain exclusive access, perks, and updates as we build the future together.
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold text-[18px]">
                      ${startup.communityCampaign.current.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-[14px]">
                      of ${startup.communityCampaign.goal.toLocaleString()} goal
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#111] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B]"
                      initial={{ width: 0 }}
                      animate={{ width: `${(startup.communityCampaign.current / startup.communityCampaign.goal) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2 text-[#8B5CF6]">
                      <Users size={16} />
                      <span className="font-bold text-[14px]">{startup.communityCampaign.supporters} supporters</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F59E0B]">
                      <BadgeCheck size={16} />
                      <span className="font-bold text-[14px]">
                        {Math.round((startup.communityCampaign.current / startup.communityCampaign.goal) * 100)}% backed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Support Tiers */}
                <div className="space-y-4">
                  <h3 className="text-white font-bold text-[16px] mb-3">Supporter Benefits</h3>
                  {startup.communityCampaign.tiers.map((tier, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-[15px] bg-[#0a0a0a] border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-white font-bold text-[16px]">{tier.name}</h4>
                          <p className="text-[#8B5CF6] font-bold text-[20px]">${tier.amount}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 text-[12px]">Available</p>
                          <p className="text-gray-300 text-[14px] font-bold">
                            {tier.available - tier.claimed} of {tier.available}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {tier.perks.map((perk, pIndex) => (
                          <li key={pIndex} className="flex items-center gap-2 text-gray-400 text-[13px]">
                            <CheckCircle size={14} className="text-[#8B5CF6]" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          const storedUser = localStorage.getItem('dofractoBuilderUser');
                          if (storedUser) {
                            toast.success('Support tier selected! 🎉', {
                              description: 'Proceeding to contribution details...'
                            });
                            // Navigate to contribute/checkout page in future
                          } else {
                            toast.info('Login to become a supporter', {
                              description: 'Create an account to support this startup'
                            });
                            navigate('/dofracto-builder-login');
                          }
                        }}
                        className="w-full py-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-[10px] hover:shadow-lg transition-all text-[14px] font-bold"
                        disabled={tier.claimed >= tier.available}
                      >
                        {tier.claimed >= tier.available ? 'Sold Out' : 'Become a Supporter'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Legal Disclaimer */}
                <div className="mt-6 p-4 rounded-[12px] bg-[#111] border border-gray-700/30">
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    <strong className="text-gray-400">Important:</strong> This is not an investment opportunity. 
                    You are supporting a project and receiving perks/benefits in return. No equity, securities, 
                    or financial returns are offered. All contributions are non-refundable.
                  </p>
                </div>
              </motion.div>

              {/* Opportunities */}
              <motion.div
                className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-[20px] p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-white text-[24px] font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="text-[#05997F]" />
                  Participation Opportunities
                </h2>
                <div className="space-y-4">
                  {startup.opportunities.map((opp, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-[15px] bg-gradient-to-br from-[#24c6dc]/5 to-[#05997F]/5 border border-[#24c6dc]/20 hover:border-[#24c6dc]/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="px-3 py-1 rounded-full bg-[#05997F]/20 text-[#05997F] text-[12px] font-bold">
                            {opp.type}
                          </span>
                          <h3 className="text-white text-[18px] font-bold mt-2">{opp.title}</h3>
                        </div>
                        <button
                          onClick={() => {
                            const storedUser = localStorage.getItem('dofractoBuilderUser');
                            if (storedUser) {
                              toast.success('Application started! 📝', {
                                description: 'Complete your application details to proceed'
                              });
                              // Navigate to application form in future
                            } else {
                              toast.info('Login to apply for this opportunity', {
                                description: 'Create an account to join this startup'
                              });
                              navigate('/dofracto-builder-login');
                            }
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-[10px] hover:shadow-lg transition-all text-[14px]"
                        >
                          Apply
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[14px]">
                        <div>
                          <p className="text-gray-500 mb-1">Reward</p>
                          <p className="text-[#24c6dc] font-bold">{opp.equity || opp.share}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Commitment</p>
                          <p className="text-gray-300">{opp.commitment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metrics */}
              <motion.div
                className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-[20px] p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-white text-[20px] font-bold mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  {startup.metrics.map((metric, index) => (
                    <div key={index}>
                      <p className="text-gray-500 text-[12px] mb-1">{metric.label}</p>
                      <p className="text-white text-[20px] font-bold">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Team */}
              <motion.div
                className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-[20px] p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white text-[20px] font-bold mb-4">Team</h3>
                <div className="space-y-4">
                  {startup.team_members.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-[40px]">{member.avatar}</div>
                      <div>
                        <p className="text-white font-bold text-[14px]">{member.name}</p>
                        <p className="text-gray-500 text-[12px]">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-[20px] p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-white text-[20px] font-bold mb-4">Contact</h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${startup.contact.email}`}
                    className="flex items-center gap-3 p-3 rounded-[12px] bg-[#24c6dc]/10 border border-[#24c6dc]/20 hover:border-[#24c6dc]/40 transition-all group"
                  >
                    <Mail size={18} className="text-[#24c6dc]" />
                    <span className="text-gray-300 text-[14px] group-hover:text-white">{startup.contact.email}</span>
                  </a>
                  <a
                    href={`tel:${startup.contact.phone}`}
                    className="flex items-center gap-3 p-3 rounded-[12px] bg-[#05997F]/10 border border-[#05997F]/20 hover:border-[#05997F]/40 transition-all group"
                  >
                    <Phone size={18} className="text-[#05997F]" />
                    <span className="text-gray-300 text-[14px] group-hover:text-white">{startup.contact.phone}</span>
                  </a>
                  <a
                    href={startup.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-[12px] bg-[#24c6dc]/10 border border-[#24c6dc]/20 hover:border-[#24c6dc]/40 transition-all group"
                  >
                    <Globe size={18} className="text-[#24c6dc]" />
                    <span className="text-gray-300 text-[14px] group-hover:text-white">Visit Website</span>
                    <ExternalLink size={14} className="text-gray-500 ml-auto" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}