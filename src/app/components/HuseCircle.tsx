import { motion } from 'motion/react';
import { 
  GraduationCap, Briefcase, ShoppingBag, Trophy, 
  Target, Zap, Award, Shield, Users, 
  School, Star, BookOpen, Code, Rocket,
  Eye, CheckCircle, Lock, Flame, Building2, UserCheck, LogIn
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RecruitersModal } from './RecruitersModal';
import { PaymentModal } from './PaymentModal';
import { LoginModal } from './LoginModal';

const pillars = [
  {
    icon: Rocket,
    title: 'House Feed & Portfolio',
    subtitle: 'Build in public, get recruited',
    description: 'Your college is your house. Post projects, get feedback, build portfolio.',
    features: [
      'Post projects & achievements',
      'Visible to verified recruiters',
      'Build portfolio automatically',
      'Get feedback from peers'
    ],
    color: 'from-purple-500 to-pink-500',
    badge: 'Showcase'
  },
  {
    icon: Briefcase,
    title: 'Gigs Board',
    subtitle: 'Gamified freelancing',
    description: 'High-rep students can post gigs. Build reputation to unlock posting.',
    features: [
      'Only 500+ Rep can post gigs',
      'Earn money + reputation',
      'Verified opportunities',
      'Safe transactions'
    ],
    color: 'from-green-500 to-emerald-500',
    badge: 'Earn'
  },
  {
    icon: ShoppingBag,
    title: 'Student Marketplace',
    subtitle: 'Buy & sell within your college',
    description: 'Books, notes, electronics, art - safe marketplace for students.',
    features: [
      'Used books & notes',
      'Electronics & gadgets',
      'Student art & services',
      'Campus-only deals'
    ],
    color: 'from-blue-500 to-cyan-500',
    badge: 'Trade'
  },
  {
    icon: Trophy,
    title: 'Leaderboard & Events',
    subtitle: 'Compete, collaborate, celebrate',
    description: 'House rankings, challenges, hackathons, and networking events.',
    features: [
      'House vs House rankings',
      'Challenges & hackathons',
      'Networking events',
      'Tier system (Bronze to Platinum)'
    ],
    color: 'from-amber-500 to-orange-500',
    badge: 'Compete'
  }
];

const colleges = [
  { name: 'IIT Bombay', students: 8234, emoji: '🏛️' },
  { name: 'IIT Delhi', students: 7891, emoji: '🎓' },
  { name: 'BITS Pilani', students: 6543, emoji: '🏫' },
  { name: 'NIT Trichy', students: 5432, emoji: '🎯' },
  { name: 'IIIT Hyderabad', students: 4321, emoji: '💻' },
  { name: 'VIT Vellore', students: 3890, emoji: '📚' }
];

const topRecruiters = [
  { name: 'Sarah Johnson', initials: 'SJ', title: 'Senior Tech Recruiter', company: 'TechVenture AI', color: 'from-blue-500 to-cyan-500', status: 'Actively recruiting' },
  { name: 'Rahul Mehta', initials: 'RM', title: 'Talent Acquisition Lead', company: 'InnovateLabs', color: 'from-purple-500 to-pink-500', status: 'Actively recruiting' },
  { name: 'Emily Chen', initials: 'EC', title: 'Head of Engineering Hiring', company: 'CloudScale Systems', color: 'from-green-500 to-emerald-500', status: 'Actively recruiting' },
  { name: 'Arjun Patel', initials: 'AP', title: 'Campus Recruitment Manager', company: 'DataFlow Analytics', color: 'from-amber-500 to-orange-500', status: 'Actively recruiting' },
  { name: 'Priya Sharma', initials: 'PS', title: 'Technical Recruiter', company: 'QuantumSoft', color: 'from-indigo-500 to-purple-500', status: 'Actively recruiting' },
  { name: 'Michael Brown', initials: 'MB', title: 'Hiring Manager', company: 'NexGen Solutions', color: 'from-teal-500 to-cyan-500', status: 'Actively recruiting' },
  { name: 'Anjali Gupta', initials: 'AG', title: 'People & Culture Lead', company: 'ByteCraft Studios', color: 'from-rose-500 to-pink-500', status: 'Actively recruiting' },
  { name: 'David Kim', initials: 'DK', title: 'Talent Partner', company: 'FutureStack Tech', color: 'from-violet-500 to-purple-500', status: 'Actively recruiting' }
];

const stats = [
  { value: '35+', label: 'College Houses' },
  { value: '12K+', label: 'Active Students' },
  { value: '450+', label: 'Companies Watching' },
  { value: '₹2.5L+', label: 'Earned by Students' }
];

const howItWorks = [
  {
    step: '01',
    title: 'Join Your House',
    description: 'Sign up with your college email. Get verified and join your college\'s house.',
    icon: School
  },
  {
    step: '02',
    title: 'Build & Post',
    description: 'Share projects, complete gigs, help peers. Everything adds to your portfolio.',
    icon: Code
  },
  {
    step: '03',
    title: 'Earn Reputation',
    description: 'Get upvoted, complete work, help others. Climb the leaderboard and unlock features.',
    icon: Zap
  },
  {
    step: '04',
    title: 'Get Recruited',
    description: 'Recruiters browse by college. Your work speaks louder than your resume.',
    icon: Target
  }
];

export function HuseCircle() {
  const navigate = useNavigate();
  const [isRecruitersModalOpen, setRecruitersModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <section id="huse-circle" className="relative py-32 bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-pink-500 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-6 py-2.5 mb-8">
            <GraduationCap className="text-purple-400" size={20} />
            <span className="text-purple-400 font-medium">For College Students Only</span>
          </div>
          <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-6 leading-tight">
            Welcome to <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">HUSE Circle</span>
          </h2>
          <p className="text-gray-400 text-[18px] max-w-3xl mx-auto leading-relaxed">
            The college builder network where your projects become your portfolio, 
            your house becomes your community, and your reputation unlocks opportunities.
            <br />
            <span className="text-purple-400 font-medium mt-2 inline-block">Build. Share. Get Placed.</span>
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-[#111] border border-purple-500/20 rounded-[20px] hover:border-purple-500/40 transition-all"
            >
              <div className="text-[36px] md:text-[44px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
                {stat.value}
              </div>
              <div className="text-gray-400 text-[15px]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Key Concept */}
        <motion.div
          className="mb-32 p-10 md:p-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-[25px] max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-purple-500/20 flex items-center justify-center border-2 border-purple-500">
                <School className="text-purple-400" size={28} />
              </div>
              <h3 className="text-white font-bold text-[20px] mb-3">Your College = Your House</h3>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                Each college is a "house". Only students from your college can post in your house feed.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-500/20 flex items-center justify-center border-2 border-amber-500">
                <Eye className="text-amber-400" size={28} />
              </div>
              <h3 className="text-white font-bold text-[20px] mb-3">Recruiters are Watching</h3>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                Everything you post is visible to verified recruiters. Build your placement portfolio in real-time.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500">
                <Zap className="text-green-400" size={28} />
              </div>
              <h3 className="text-white font-bold text-[20px] mb-3">Gamified Reputation</h3>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                Earn reputation by posting, helping peers, completing gigs. High rep = unlock posting gigs & perks.
              </p>
            </div>
          </div>
        </motion.div>

        {/* The Four Pillars */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[32px] md:text-[40px] font-bold text-white mb-4 leading-tight">
            Four Ways to <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Build Your Future</span>
          </h3>
          <p className="text-gray-400 text-[17px] mb-16 max-w-2xl mx-auto leading-relaxed">
            HUSE Circle isn't just one thing — it's a complete ecosystem for college builders
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                className="group bg-[#111] border border-purple-500/20 rounded-[25px] p-8 hover:border-purple-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-[20px] bg-gradient-to-br ${pillar.color} p-0.5`}>
                    <div className="w-full h-full bg-[#111] rounded-[18px] flex items-center justify-center">
                      <Icon className="text-white" size={28} />
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${pillar.color} text-white text-[12px] font-bold`}>
                    {pillar.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-white text-[24px] font-bold mb-2">
                  {pillar.title}
                </h3>
                <p className={`text-[14px] font-medium mb-3 bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent`}>
                  {pillar.subtitle}
                </p>
                <p className="text-gray-400 text-[15px] mb-6 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {pillar.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-[14px]">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Top College Houses */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-[32px] md:text-[40px] font-bold text-white mb-3">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Top Houses</span>
            </h3>
            <p className="text-gray-400 text-[16px]">
              Join the most active college communities
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {colleges.map((college, index) => (
              <motion.div
                key={index}
                className="bg-[#111] border border-purple-500/20 rounded-[20px] p-6 text-center hover:border-purple-500/40 transition-all cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-[48px] mb-3 group-hover:scale-110 transition-transform">
                  {college.emoji}
                </div>
                <h4 className="text-white font-bold text-[14px] mb-2">{college.name}</h4>
                <p className="text-purple-400 text-[12px] font-medium">{college.students.toLocaleString()} students</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-[14px]">
              + 29 more colleges • <span className="text-purple-400 cursor-pointer hover:text-purple-300">View all houses</span>
            </p>
          </div>
        </motion.div>

        {/* Top Recruiters Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-[32px] md:text-[40px] font-bold text-white mb-3">
              Recruiters from <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Top Companies</span> Are Here
            </h3>
            <p className="text-gray-400 text-[16px]">
              Get discovered by verified recruiters actively looking for talent
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topRecruiters.map((recruiter, index) => (
              <motion.div
                key={index}
                className="group relative bg-[#111] border border-purple-500/20 rounded-[20px] p-5 hover:border-purple-500/40 transition-all cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${recruiter.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Profile Photo - Avatar with Initials */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${recruiter.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                    <span className="text-white font-bold text-[18px]">{recruiter.initials}</span>
                  </div>
                  
                  {/* Recruiter Name */}
                  <h4 className="text-white font-bold text-[15px] mb-1">{recruiter.name}</h4>
                  
                  {/* Job Title */}
                  <p className={`text-[12px] font-medium mb-2 bg-gradient-to-r ${recruiter.color} bg-clip-text text-transparent`}>
                    {recruiter.title}
                  </p>
                  
                  {/* Company Name */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <Building2 className="text-purple-400" size={14} />
                    <span className="text-gray-300 text-[12px] font-medium">
                      {recruiter.company}
                    </span>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-[11px] font-bold">
                      {recruiter.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-[14px]">
              + 200 more companies actively recruiting • <span className="text-purple-400 cursor-pointer hover:text-purple-300" onClick={() => setRecruitersModalOpen(true)}>Browse all companies</span>
            </p>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-[32px] md:text-[40px] font-bold text-white mb-3">
              How It <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Works</span>
            </h3>
            <p className="text-gray-400 text-[16px]">
              From signup to placement in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="bg-[#111] border border-purple-500/20 rounded-[20px] p-6 hover:border-purple-500/40 transition-all h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mb-4">
                      {step.step}
                    </div>
                    <Icon className="text-purple-400 mb-4" size={32} />
                    <h4 className="text-white font-bold text-[18px] mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-[14px] leading-relaxed">{step.description}</p>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Gamification Explained */}
        <motion.div
          className="mb-20 p-8 bg-[#111] border border-purple-500/20 rounded-[25px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Trophy className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-[24px] mb-2">Gamified Reputation System</h3>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                Earn reputation through meaningful contributions. High rep unlocks special privileges.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold text-[16px] mb-4 flex items-center gap-2">
                <Zap className="text-purple-400" size={18} />
                Earn Rep By:
              </h4>
              <div className="space-y-2 text-[14px] mb-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Star className="text-amber-400" size={14} />
                  <span>Posting quality projects <span className="text-purple-400 font-bold">+10 Rep</span></span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Star className="text-amber-400" size={14} />
                  <span>Getting upvoted <span className="text-purple-400 font-bold">+5 Rep/upvote</span></span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Star className="text-amber-400" size={14} />
                  <span>Completing gigs <span className="text-purple-400 font-bold">+50 Rep</span></span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Star className="text-amber-400" size={14} />
                  <span>Helping peers <span className="text-purple-400 font-bold">+15 Rep</span></span>
                </div>
              </div>
              <button
                onClick={() => navigate('/reputation-guide')}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-[14px] font-medium group"
              >
                <Eye size={16} />
                <span>View Full Reputation Guide</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div>
              <h4 className="text-white font-bold text-[16px] mb-4 flex items-center gap-2">
                <Lock className="text-amber-400" size={18} />
                Unlock at:
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-gray-400/10 to-gray-300/10 border border-gray-400/20 rounded-[12px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 font-bold text-[14px]">500+ Rep</span>
                    <span className="text-[10px] px-2 py-0.5 bg-gray-400/20 text-gray-300 rounded-full font-bold">Silver Tier</span>
                  </div>
                  <p className="text-gray-400 text-[12px]">Direct messaging, networking events access</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-[12px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-amber-400 font-bold text-[14px]">2000+ Rep</span>
                    <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full font-bold">Gold Tier</span>
                  </div>
                  <p className="text-gray-400 text-[12px]">Post gigs, job board access, mentorship opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-[32px] md:text-[40px] font-bold text-white mb-3">
              Simple <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Pricing</span>
            </h3>
            <p className="text-gray-400 text-[16px]">
              No subscriptions, no hidden fees, just one simple payment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Pricing */}
            <motion.div
              className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-[25px] p-8 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Popular Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
                  <Flame size={12} />
                  MOST POPULAR
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="text-purple-400" size={28} />
                  <h4 className="text-white font-bold text-[24px]">For Students</h4>
                </div>
                <p className="text-gray-300 text-[14px]">
                  Build your placement portfolio and get recruited
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-white font-bold text-[48px]">₹199</span>
                  <span className="text-gray-400 text-[16px]">one-time</span>
                </div>
                <p className="text-purple-400 font-bold text-[14px]">
                  Access till you graduate 🎓
                </p>
                <p className="text-gray-400 text-[12px] mt-1">
                  That's less than 2 movie tickets for your entire college journey
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Complete access to your House Feed</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Post unlimited projects & achievements</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Visible to 200+ verified recruiters</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Access to Gigs Board & Marketplace</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Participate in challenges & events</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Gamified reputation system</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Automatic portfolio building</span>
                </div>
              </div>

              <button
                onClick={() => setPaymentModalOpen(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-[15px] font-bold text-[16px] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
              >
                Join Your House
              </button>
            </motion.div>

            {/* Recruiter Pricing */}
            <motion.div
              className="relative bg-[#111] border-2 border-blue-500/30 rounded-[25px] p-8 overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="text-blue-400" size={28} />
                  <h4 className="text-white font-bold text-[24px]">For Recruiters</h4>
                </div>
                <p className="text-gray-300 text-[14px]">
                  Access top student talent from 35+ colleges
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-white font-bold text-[32px]">Join as Recruiter</span>
                </div>
                <p className="text-blue-400 font-bold text-[14px]">
                  Application & verification required
                </p>
                <p className="text-gray-400 text-[12px] mt-1">
                  We verify all recruiters to ensure student safety
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Browse student portfolios by college</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Access to 12,000+ verified students</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Post job openings & internships</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Filter by skills, projects & reputation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Direct messaging with students</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Participate in campus events</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-200 text-[14px]">Company profile on platform</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/recruiter-login')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-[15px] font-bold text-[16px] transition-all"
              >
                Apply Now
              </button>

              <p className="text-gray-500 text-[11px] text-center mt-3">
                Approval typically takes 24-48 hours
              </p>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[13px] text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="text-green-400" size={16} />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={16} />
              <span>College email verification required</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-green-400" size={16} />
              <span>12,000+ students already joined</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recruiters Modal */}
      <RecruitersModal isOpen={isRecruitersModalOpen} onClose={() => setRecruitersModalOpen(false)} />
      {/* Payment Modal */}
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
    </section>
  );
}