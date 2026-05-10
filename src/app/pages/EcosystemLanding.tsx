import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Rocket, GraduationCap, FileText, ArrowRight, Sparkles, Users, TrendingUp, Zap, Award, Briefcase, DollarSign, MessageSquare } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function EcosystemLanding() {
  const navigate = useNavigate();

  const platforms = [
    {
      id: 'dofracto',
      name: 'Dofracto',
      tagline: 'Business Accelerator',
      description: 'Businesses showcase opportunities, contributors discover and collaborate on exciting ventures.',
      icon: Rocket,
      gradient: 'from-[#24c6dc] via-[#1da3b8] to-[#05997F]',
      iconColor: 'text-[#24c6dc]',
      borderColor: 'border-[#24c6dc]/30',
      glowColor: 'shadow-[#24c6dc]/20',
      hoverGlow: 'hover:shadow-[#24c6dc]/40',
      route: '/dofracto',
      features: ['Business Listings', 'Contributor Network', 'Collaboration Tools', 'Growth Analytics'],
    },
    {
      id: 'huse-circle',
      name: 'HUSE Circle',
      tagline: 'Innovation Hub',
      description: 'Students learn and build, startups find talent and grow, recruiters discover top talent.',
      icon: GraduationCap,
      gradient: 'from-[#B66FDE] via-[#D4A5F5] to-[#E8C4FF]',
      iconColor: 'text-[#B66FDE]',
      borderColor: 'border-[#B66FDE]/30',
      glowColor: 'shadow-[#B66FDE]/20',
      hoverGlow: 'hover:shadow-[#B66FDE]/40',
      route: '/huse-circle',
      features: ['Student Programs', 'Startup Support', 'Recruiter Access', 'Skill Development'],
    },
    {
      id: 'quotify',
      name: 'Quotify',
      tagline: 'Service Marketplace',
      description: 'Request quotes for any service from verified ecosystem partners and professionals.',
      icon: FileText,
      gradient: 'from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]',
      iconColor: 'text-[#3B82F6]',
      borderColor: 'border-[#3B82F6]/30',
      glowColor: 'shadow-[#3B82F6]/20',
      hoverGlow: 'hover:shadow-[#3B82F6]/40',
      route: '/quotify',
      features: ['Request Services', 'Compare Quotes', 'Verified Partners', 'Secure Transactions'],
    },
  ];

  const pipelineSteps = [
    { title: 'Learn & Collaborate', platform: 'HUSE Circle', color: '#B66FDE' },
    { title: 'Build & Grow', platform: 'Dofracto', color: '#24c6dc' },
    { title: 'Connect & Earn', platform: 'Quotify', color: '#3B82F6' },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden smooth-edges">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#24c6dc] rounded-full blur-[200px] animate-float"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#B66FDE] rounded-full blur-[200px] animate-float"
          style={{ animationDelay: '2s' }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-[#3B82F6] rounded-full blur-[180px]"
        />

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Animated Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
              >
                <Sparkles className="w-5 h-5 text-[#24c6dc]" />
                <span className="text-sm text-gray-300">The Triangular Innovation Ecosystem</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Welcome to{' '}
                </span>
                <span className="bg-gradient-to-r from-[#24c6dc] via-[#B66FDE] to-[#3B82F6] bg-clip-text text-transparent">
                  HUSE
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12"
              >
                From Dorm Room to Boardroom - Three integrated platforms connecting students, businesses, and service seekers.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button
                  onClick={() => navigate('/huse-circle')}
                  className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white font-semibold hover:shadow-xl hover:shadow-[#24c6dc]/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Explore Platforms
                </button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {[
                { icon: Users, label: 'Active Students & Startups', value: '10,000+' },
                { icon: TrendingUp, label: 'Successful Launches', value: '500+' },
                { icon: Zap, label: 'Quote Requests Processed', value: '2,000+' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#24c6dc]/20 to-[#B66FDE]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-[#24c6dc] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Platform Cards */}
        <section id="platforms" className="py-20 px-6">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Three Platforms, One Ecosystem
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Each platform serves a unique purpose in your entrepreneurial journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${platform.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                  
                  {/* Card */}
                  <div className={`relative bg-black/40 backdrop-blur-sm border ${platform.borderColor} rounded-3xl p-8 h-full hover:border-opacity-60 transition-all duration-300 ${platform.glowColor} shadow-xl ${platform.hoverGlow} hover:shadow-2xl`}>
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${platform.gradient} bg-opacity-10 mb-6`}>
                      <platform.icon className={`w-8 h-8 ${platform.iconColor}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
                    <p className={`${platform.iconColor} font-semibold mb-4`}>{platform.tagline}</p>
                    <p className="text-gray-400 mb-6">{platform.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {platform.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${platform.gradient}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => navigate(platform.route)}
                      className={`w-full py-3 rounded-xl bg-gradient-to-r ${platform.gradient} text-white font-semibold hover:shadow-lg ${platform.hoverGlow} transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group/btn`}
                    >
                      Explore {platform.name}
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pipeline Visualization */}
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
                Your Journey Through HUSE
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A seamless pipeline from student to successful entrepreneur
              </p>
            </motion.div>

            {/* Desktop Pipeline */}
            <div className="hidden md:block">
              <div className="relative max-w-5xl mx-auto">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#B66FDE] via-[#24c6dc] to-[#3B82F6] rounded-full -translate-y-1/2" />

                <div className="grid grid-cols-3 gap-8 relative z-10">
                  {pipelineSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="relative"
                    >
                      {/* Number Badge */}
                      <div
                        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: step.color }}
                      >
                        {index + 1}
                      </div>

                      {/* Card */}
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all duration-300 mt-6">
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-400 mb-4">{step.platform}</p>
                        
                        {index < pipelineSteps.length - 1 && (
                          <div className="absolute top-1/2 -right-4 w-8 flex justify-center items-center">
                            <ArrowRight className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Pipeline */}
            <div className="md:hidden space-y-6 max-w-md mx-auto">
              {pipelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4">
                    {/* Number */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                      style={{ backgroundColor: step.color }}
                    >
                      {index + 1}
                    </div>

                    {/* Card */}
                    <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                      <h3 className="font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-400">{step.platform}</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  {index < pipelineSteps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="w-6 h-6 text-gray-500 rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Benefits */}
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
                Ecosystem Benefits
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                When platforms work together, magic happens
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Single Sign-On', desc: 'One account across all platforms', icon: Users },
                { title: 'Unified Reputation', desc: 'Build credibility everywhere', icon: TrendingUp },
                { title: 'Automated Workflows', desc: 'Seamless transitions between stages', icon: Zap },
                { title: 'Alumni Network', desc: 'Stay connected as you grow', icon: Sparkles },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
                >
                  <benefit.icon className="w-8 h-8 text-[#24c6dc] mb-4" />
                  <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#24c6dc] via-[#B66FDE] to-[#3B82F6] rounded-3xl blur-3xl opacity-20" />
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Live Ecosystem Activity
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                  See what's happening across the HUSE ecosystem right now
                </p>
                
                {/* Live Activity Feed */}
                <div className="space-y-3 max-w-2xl mx-auto">
                  {[
                    {
                      platform: 'HUSE Circle',
                      color: 'from-[#B66FDE] to-[#E8C4FF]',
                      icon: Award,
                      text: 'Priya Sharma just unlocked Platinum Tier',
                      time: '2m ago',
                      bgColor: 'bg-[#B66FDE]/10',
                      borderColor: 'border-[#B66FDE]/30'
                    },
                    {
                      platform: 'Dofracto',
                      color: 'from-[#24c6dc] to-[#05997F]',
                      icon: DollarSign,
                      text: 'TechStart Solutions raised ₹15L in community support',
                      time: '5m ago',
                      bgColor: 'bg-[#24c6dc]/10',
                      borderColor: 'border-[#24c6dc]/30'
                    },
                    {
                      platform: 'Quotify',
                      color: 'from-[#3B82F6] to-[#8B5CF6]',
                      icon: MessageSquare,
                      text: 'New quote request: Full-Stack Mobile App Development',
                      time: '8m ago',
                      bgColor: 'bg-[#3B82F6]/10',
                      borderColor: 'border-[#3B82F6]/30'
                    },
                    {
                      platform: 'HUSE Circle',
                      color: 'from-[#B66FDE] to-[#E8C4FF]',
                      icon: Briefcase,
                      text: 'Rahul Verma completed a Machine Learning gig',
                      time: '12m ago',
                      bgColor: 'bg-[#B66FDE]/10',
                      borderColor: 'border-[#B66FDE]/30'
                    },
                    {
                      platform: 'Dofracto',
                      color: 'from-[#24c6dc] to-[#05997F]',
                      icon: Rocket,
                      text: 'GreenEnergy Co. listed a new business opportunity',
                      time: '15m ago',
                      bgColor: 'bg-[#24c6dc]/10',
                      borderColor: 'border-[#24c6dc]/30'
                    },
                    {
                      platform: 'HUSE Circle',
                      color: 'from-[#B66FDE] to-[#E8C4FF]',
                      icon: Users,
                      text: 'Google recruiter viewed 12 student profiles',
                      time: '18m ago',
                      bgColor: 'bg-[#B66FDE]/10',
                      borderColor: 'border-[#B66FDE]/30'
                    },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex items-start gap-4 p-4 ${activity.bgColor} border ${activity.borderColor} rounded-xl hover:scale-[1.02] transition-all duration-300`}
                    >
                      {/* Icon */}
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${activity.color} flex-shrink-0`}>
                        <activity.icon className="w-5 h-5 text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 text-left">
                        <p className="text-white text-sm mb-1">{activity.text}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${activity.color} text-white font-medium`}>
                            {activity.platform}
                          </span>
                          <span className="text-[11px] text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                      
                      {/* Pulse indicator */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                        className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* View All Activity Link */}
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-6 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 mx-auto"
                >
                  <span>Real-time updates from across the ecosystem</span>
                  <Zap className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}