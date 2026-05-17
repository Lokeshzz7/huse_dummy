import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowRight, GraduationCap, Rocket, FileText, TrendingUp, Users, Zap, Award, Target, Brain, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function IntroPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.8]);

  // Auto-advance steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const platforms = [
    {
      id: 1,
      name: 'HUSE Circle',
      tagline: 'Innovation Hub',
      description: 'Where students learn and build skills, startups find talented contributors, and recruiters discover exceptional talent.',
      icon: GraduationCap,
      gradient: 'from-[#B66FDE] via-[#D4A5F5] to-[#E8C4FF]',
      iconColor: 'text-[#B66FDE]',
      features: ['Student Programs', 'Startup Support', 'Recruiter Portal', 'Skill Building'],
      stage: 'For Students, Startups & Recruiters',
    },
    {
      id: 2,
      name: 'Dofracto',
      tagline: 'Business Accelerator',
      description: 'Businesses showcase their opportunities while contributors discover and collaborate on exciting ventures.',
      icon: Rocket,
      gradient: 'from-[#24c6dc] via-[#1da3b8] to-[#05997F]',
      iconColor: 'text-[#24c6dc]',
      features: ['Business Listings', 'Contributor Discovery', 'Collaboration Tools', 'Growth Analytics'],
      stage: 'For Businesses & Contributors',
    },
    {
      id: 3,
      name: 'Quotify',
      tagline: 'Service Marketplace',
      description: 'Request quotes for any service from verified ecosystem partners and professional service providers.',
      icon: FileText,
      gradient: 'from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]',
      iconColor: 'text-[#3B82F6]',
      features: ['Request Services', 'Compare Quotes', 'Verified Partners', 'Secure Transactions'],
      stage: 'For Service Seekers',
    },
  ];

  const stats = [
    { value: '3', label: 'Integrated Platforms', icon: Target },
    { value: '∞', label: 'Opportunities', icon: TrendingUp },
    { value: '1', label: 'Unified Ecosystem', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-black dark:bg-black bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#24c6dc] rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#B66FDE] rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3B82F6] rounded-full blur-[150px]"
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#24c6dc] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(36,198,220,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(36,198,220,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          style={{ opacity, scale }}
          className="min-h-screen flex flex-col items-center justify-center px-6 relative"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-8"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute inset-0 blur-2xl opacity-50">
                <Sparkles className="w-24 h-24 text-[#24c6dc]" />
              </div>
              <Sparkles className="w-24 h-24 text-[#24c6dc] relative drop-shadow-[0_0_30px_rgba(36,198,220,0.5)]" />
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-6"
          >
            <motion.h1 className="text-7xl md:text-9xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#24c6dc] via-[#B66FDE] to-[#3B82F6] bg-clip-text text-transparent">
                HUSE
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-3xl text-theme-secondary font-light tracking-wide"
            >
              The Triangular Ecosystem
            </motion.p>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-12 max-w-3xl"
          >
            <p className="text-xl md:text-2xl text-theme-tertiary mb-4">
              From <span className="text-[#B66FDE] font-semibold">Dorm Room</span> to{' '}
              <span className="text-[#24c6dc] font-semibold">Boardroom</span>
            </p>
            <p className="text-theme-muted text-lg">
              A comprehensive student-to-startup pipeline connecting learning, launching, and earning
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-8 justify-center mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 px-6 py-4 bg-theme-glass rounded-2xl border border-theme-accent backdrop-blur-sm"
              >
                <stat.icon className="w-8 h-8 text-[#24c6dc] mb-2" />
                <span className="text-4xl font-bold text-theme-primary">{stat.value}</span>
                <span className="text-theme-tertiary text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-10 py-4 rounded-xl font-medium overflow-hidden shadow-lg shadow-[#24c6dc]/30 hover:shadow-2xl hover:shadow-[#24c6dc]/50 transition-all duration-300"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative z-10 flex items-center gap-2">
                Explore Ecosystem
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              onClick={() => navigate('/user/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-xl font-medium border-2 border-[#24c6dc]/50 text-theme-primary hover:bg-[#24c6dc]/10 transition-all duration-300"
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12"
          >
            <ChevronDown className="w-8 h-8 text-[#24c6dc] opacity-50" />
          </motion.div>
        </motion.section>

        {/* Platform Cards Section */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-theme-primary">
                Three Platforms,{' '}
                <span className="bg-gradient-to-r from-[#24c6dc] to-[#B66FDE] bg-clip-text text-transparent">
                  One Journey
                </span>
              </h2>
              <p className="text-xl text-theme-tertiary max-w-3xl mx-auto">
                Navigate your entrepreneurial path through our integrated ecosystem
              </p>
            </motion.div>

            {/* Platform Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="relative h-full bg-theme-glass rounded-3xl border border-theme-accent backdrop-blur-sm p-8 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    {/* Stage Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-theme-elevated rounded-full text-xs font-medium text-theme-tertiary border border-theme-secondary">
                        {platform.stage}
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mb-6"
                    >
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${platform.gradient} p-0.5`}>
                        <div className="w-full h-full rounded-2xl bg-theme-primary flex items-center justify-center">
                          <platform.icon className={`w-10 h-10 ${platform.iconColor}`} />
                        </div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-theme-primary mb-2">
                      {platform.name}
                    </h3>
                    <p className={`text-lg font-medium mb-4 bg-gradient-to-r ${platform.gradient} bg-clip-text text-transparent`}>
                      {platform.tagline}
                    </p>
                    <p className="text-theme-tertiary mb-6 leading-relaxed">
                      {platform.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {platform.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-theme-secondary">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${platform.gradient}`} />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Learn More Link */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className={`flex items-center gap-2 text-sm font-medium ${platform.iconColor} group-hover:gap-3 transition-all`}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Flow Section */}
        <section className="py-24 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-theme-primary">
                Your Success{' '}
                <span className="bg-gradient-to-r from-[#B66FDE] to-[#24c6dc] bg-clip-text text-transparent">
                  Pipeline
                </span>
              </h2>
              <p className="text-xl text-theme-tertiary">
                A seamless journey from student to successful entrepreneur
              </p>
            </motion.div>

            {/* Journey Steps */}
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#B66FDE] via-[#24c6dc] to-[#3B82F6] opacity-30 hidden md:block" />

              {/* Steps */}
              {[
                {
                  icon: Brain,
                  title: 'Learn & Experiment',
                  description: 'Build foundational skills and test ideas in HUSE Circle',
                  color: 'text-[#B66FDE]',
                  gradient: 'from-[#B66FDE] to-[#D4A5F5]',
                },
                {
                  icon: Rocket,
                  title: 'Launch & Grow',
                  description: 'Graduate to Dofracto with funding and mentorship',
                  color: 'text-[#24c6dc]',
                  gradient: 'from-[#24c6dc] to-[#05997F]',
                },
                {
                  icon: Award,
                  title: 'Earn & Scale',
                  description: 'Monetize through Quotify while scaling your business',
                  color: 'text-[#3B82F6]',
                  gradient: 'from-[#3B82F6] to-[#8B5CF6]',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className="text-2xl font-bold text-theme-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-theme-tertiary">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon Circle */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="relative"
                  >
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.gradient} p-0.5 shadow-lg`}>
                      <div className="w-full h-full rounded-full bg-theme-primary flex items-center justify-center">
                        <step.icon className={`w-12 h-12 ${step.color}`} />
                      </div>
                    </div>
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} blur-xl opacity-30`} />
                  </motion.div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative bg-theme-glass rounded-3xl border border-theme-accent backdrop-blur-sm p-12 overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#24c6dc]/10 via-[#B66FDE]/10 to-[#3B82F6]/10" />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="inline-block mb-6"
                >
                  <Users className="w-16 h-16 text-[#24c6dc]" />
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-theme-primary">
                  Ready to Start Your{' '}
                  <span className="bg-gradient-to-r from-[#24c6dc] to-[#B66FDE] bg-clip-text text-transparent">
                    Journey?
                  </span>
                </h2>

                <p className="text-xl text-theme-tertiary mb-8 max-w-2xl mx-auto">
                  Join thousands of students and entrepreneurs building their future in the HUSE ecosystem
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-10 py-4 rounded-xl font-medium overflow-hidden shadow-lg shadow-[#24c6dc]/30 hover:shadow-2xl hover:shadow-[#24c6dc]/50 transition-all duration-300"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Ecosystem
                      <Sparkles className="w-5 h-5" />
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => navigate('/husecircle/student/login')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 rounded-xl font-medium bg-gradient-to-r from-[#B66FDE] to-[#D4A5F5] text-white shadow-lg shadow-[#B66FDE]/30 hover:shadow-2xl hover:shadow-[#B66FDE]/50 transition-all duration-300"
                  >
                    Start as Student
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 px-6 border-t border-theme-secondary"
        >
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-theme-muted text-sm mb-4">
              © {new Date().getFullYear()} HUSE Ecosystem. All rights reserved.
            </p>
            <div className="flex gap-4 justify-center text-sm text-theme-tertiary">
              <button className="hover:text-[#24c6dc] transition-colors">Privacy</button>
              <span>•</span>
              <button className="hover:text-[#24c6dc] transition-colors">Terms</button>
              <span>•</span>
              <button onClick={() => navigate('/contact')} className="hover:text-[#24c6dc] transition-colors">
                Contact
              </button>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}