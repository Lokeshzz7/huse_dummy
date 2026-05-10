import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Rocket, MessageSquare, ArrowRight, 
  TrendingUp, Users, Award, Zap, Target, Heart,
  Building2, Briefcase, DollarSign, Star, CheckCircle,
  Sparkles, Crown, Globe, Shield, Lightbulb
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export function HuseEcosystemIntro() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.3) setCurrentStep(0);
      else if (latest < 0.6) setCurrentStep(1);
      else setCurrentStep(2);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const platforms = [
    {
      name: 'HUSE Circle',
      tagline: 'Where Innovation Begins',
      description: 'Student incubator transforming dorm room ideas into viable MVPs',
      icon: GraduationCap,
      color: 'from-[#8B5CF6] via-[#D946EF] to-[#EC4899]',
      bgGlow: 'from-purple-500/20 to-pink-500/20',
      features: ['Student Projects', 'College Verification', 'MVP Building', 'Skill Development'],
      path: '/huse-circle',
      emoji: '🎓',
      userTypes: ['Students', 'Startups', 'Recruiters']
    },
    {
      name: 'Dofracto',
      tagline: 'Where Startups Scale',
      description: 'Accelerator connecting real startups with contributors and capital',
      icon: Rocket,
      color: 'from-[#24c6dc] to-[#05997F]',
      bgGlow: 'from-cyan-500/20 to-teal-500/20',
      features: ['Business Listings', 'Community Support', 'Contributor Matching', 'Growth Tools'],
      path: '/dofracto',
      emoji: '🚀',
      userTypes: ['Businesses', 'Contributors']
    },
    {
      name: 'Quotify',
      tagline: 'Where Services Connect',
      description: 'Quote platform linking users with ecosystem talent and services',
      icon: MessageSquare,
      color: 'from-[#F59E0B] to-[#EF4444]',
      bgGlow: 'from-amber-500/20 to-red-500/20',
      features: ['Service Requests', 'Quote System', 'Ecosystem Partners', 'Instant Matching'],
      path: '/quotify',
      emoji: '💬',
      userTypes: ['Users', 'Service Providers']
    }
  ];

  const journeySteps = [
    {
      stage: 'Student',
      platform: 'HUSE Circle',
      icon: GraduationCap,
      color: 'purple',
      description: 'Start your journey in college',
      actions: ['Join as student', 'Build your MVP', 'Gain HUSE Alumni badge']
    },
    {
      stage: 'Graduate',
      platform: 'Dofracto',
      icon: Rocket,
      color: 'cyan',
      description: 'Launch your real startup',
      actions: ['List your business', 'Get contributors', 'Earn reputation']
    },
    {
      stage: 'Earn',
      platform: 'Quotify',
      icon: DollarSign,
      color: 'amber',
      description: 'Provide services & grow',
      actions: ['Offer services', 'Get quotes', 'Build network']
    }
  ];

  const stats = [
    { label: 'Active Students', value: '2,547', icon: Users },
    { label: 'Businesses Launched', value: '326', icon: Rocket },
    { label: 'Services Fulfilled', value: '1,892', icon: CheckCircle },
    { label: 'Community Members', value: '5,000+', icon: Heart }
  ];

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-white overflow-hidden">
      {/* Fixed Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#111]/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-6 h-[80px] flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#24c6dc] to-[#F59E0B] bg-clip-text text-transparent">
              HUSE Ecosystem
            </span>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/intro')}
              className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[80px]">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Introducing the HUSE Ecosystem</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              Dorm Room
            </span>
            <br />
            to{' '}
            <span className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] bg-clip-text text-transparent">
              Boardroom
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A complete ecosystem connecting students, startups, and service seekers
            through three powerful platforms working in perfect harmony.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById('platforms-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2"
            >
              Explore Ecosystem
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/intro')}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-medium text-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Globe className="w-5 h-5" />
              View Platform
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-12 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/50 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-20 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Follow the path from student innovator to successful entrepreneur
            </p>
          </motion.div>

          <div className="relative">
            {/* Journey Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-amber-500 hidden md:block" />

            <div className="grid md:grid-cols-3 gap-8">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                const colorMap: any = {
                  purple: 'from-purple-500 to-pink-500',
                  cyan: 'from-cyan-500 to-teal-500',
                  amber: 'from-amber-500 to-orange-500'
                };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    {/* Number Badge */}
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${colorMap[step.color]} flex items-center justify-center text-2xl font-bold shadow-lg relative z-10`}>
                      {index + 1}
                    </div>

                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10">
                      <Icon className={`w-10 h-10 mx-auto mb-4 text-${step.color}-400`} />
                      <h3 className="text-2xl font-bold mb-2">{step.stage}</h3>
                      <p className={`text-sm font-medium mb-3 bg-gradient-to-r ${colorMap[step.color]} bg-clip-text text-transparent`}>
                        {step.platform}
                      </p>
                      <p className="text-gray-400 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.actions.map((action, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Three Platforms Section */}
      <section id="platforms-section" className="py-20 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Three Platforms,{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                One Ecosystem
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Seamlessly connected to support your entire entrepreneurial journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all h-full">
                    {/* Icon & Emoji */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-5xl">{platform.emoji}</span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                      {platform.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{platform.tagline}</p>
                    <p className="text-gray-300 mb-6">{platform.description}</p>

                    {/* User Types */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {platform.userTypes.map((type, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                          {type}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {platform.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <Zap className={`w-4 h-4 flex-shrink-0 bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => navigate(platform.path)}
                      className={`w-full py-3 rounded-xl font-medium bg-gradient-to-r ${platform.color} hover:shadow-lg transition-all flex items-center justify-center gap-2 group/btn`}
                    >
                      Explore {platform.name}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Features */}
      <section className="py-20 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powered by{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Integration
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Cross-platform features that make the ecosystem truly powerful
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: 'HUSE Circle Alumni Badge',
                description: 'Carry your student achievements across all platforms',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: TrendingUp,
                title: 'Unified Reputation System',
                description: 'Build credibility that follows you everywhere',
                color: 'from-cyan-500 to-teal-500'
              },
              {
                icon: Zap,
                title: 'Automated Workflows',
                description: 'Seamless transitions between platforms',
                color: 'from-amber-500 to-orange-500'
              },
              {
                icon: Shield,
                title: 'Legally Compliant',
                description: 'Community support campaigns, not equity investment',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Users,
                title: 'Real-Time Data Flow',
                description: 'All platforms stay synchronized instantly',
                color: 'from-blue-500 to-indigo-500'
              },
              {
                icon: Target,
                title: 'Opportunity Loops',
                description: 'Get matched with perfect opportunities automatically',
                color: 'from-pink-500 to-rose-500'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Crown className="w-16 h-16 mx-auto mb-6 text-amber-400" />
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Start Your{' '}
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
                Journey?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of students, startups, and professionals building the future together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/huse-circle')}
                className="px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2"
              >
                <GraduationCap className="w-5 h-5" />
                Start as Student
              </button>
              <button
                onClick={() => navigate('/dofracto')}
                className="px-8 py-4 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Launch Startup
              </button>
              <button
                onClick={() => navigate('/quotify')}
                className="px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Find Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#24c6dc] via-[#B66FDE] to-[#3B82F6] bg-clip-text text-transparent mb-2">
                HUSE
              </h3>
              <p className="text-gray-400 text-sm">From Dorm Room to Boardroom</p>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/huse-circle')} className="text-gray-400 hover:text-purple-400 transition-colors">
                HUSE Circle
              </button>
              <button onClick={() => navigate('/dofracto')} className="text-gray-400 hover:text-cyan-400 transition-colors">
                Dofracto
              </button>
              <button onClick={() => navigate('/quotify')} className="text-gray-400 hover:text-amber-400 transition-colors">
                Quotify
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            © 2024 HUSE Ecosystem. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}