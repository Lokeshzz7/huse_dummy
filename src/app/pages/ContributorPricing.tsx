import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, Rocket, TrendingUp, Users, Award, 
  Zap, Shield, Star, ArrowRight, Sparkles,
  Building2, Heart, Briefcase, GraduationCap,
  DollarSign, Clock, Target, Gift
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function ContributorPricing() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);

  const features = [
    { icon: Building2, text: 'Access 200+ verified startups', color: 'from-cyan-500 to-teal-500' },
    { icon: Heart, text: 'Support community campaigns', color: 'from-pink-500 to-rose-500' },
    { icon: TrendingUp, text: 'Track your contributions & earnings', color: 'from-green-500 to-emerald-500' },
    { icon: Briefcase, text: 'Priority access to opportunities', color: 'from-purple-500 to-indigo-500' },
    { icon: DollarSign, text: 'Earn from work & contributions', color: 'from-yellow-500 to-orange-500' },
    { icon: Users, text: 'Connect with startup community', color: 'from-blue-500 to-cyan-500' },
    { icon: Shield, text: 'Verified businesses only', color: 'from-gray-500 to-slate-500' },
    { icon: Zap, text: 'Real-time updates & analytics', color: 'from-violet-500 to-purple-500' },
  ];

  const benefits = [
    {
      title: 'Discover & Support',
      description: 'Browse 200+ curated startups across all stages and categories',
      icon: Rocket,
      color: 'from-cyan-500 to-teal-500'
    },
    {
      title: 'Contribute & Earn',
      description: 'Support with money or skills, track returns and get paid for work',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Network & Grow',
      description: 'Connect with founders, mentors, and fellow contributors',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const faqs = [
    {
      q: 'What happens during the 7-day trial?',
      a: 'You get full access to browse all startups, but company names and contact details are hidden. You cannot contribute or bookmark during trial.'
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes! You can cancel your subscription anytime. No questions asked.'
    },
    {
      q: 'Is this a one-time payment?',
      a: 'No, it\'s an annual subscription. You\'ll be charged ₹499 every year to maintain access.'
    },
    {
      q: 'I\'m a HUSE Circle Alumni. Do I need to pay?',
      a: 'No! HUSE Circle Alumni get FREE access for 1 year to Dofracto. Just verify your alumni status during signup.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept UPI, Credit/Debit Cards, Net Banking, and Wallets via Razorpay.'
    },
    {
      q: 'Is my contribution safe?',
      a: 'Dofracto uses \"Community Support Campaigns\" which are legally compliant. However, all contributions carry risk. Support responsibly.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Join 5,000+ Contributors</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Discover, Support & Earn from
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Startups
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Access 200+ verified startups, support with money or skills, track your contributions, and earn from your work.
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-white text-sm">7-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-white text-sm">Cancel Anytime</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* HUSE Circle Alumni - FREE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-3xl p-8 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <span className="text-white text-sm font-bold flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  For Alumni
                </span>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">HUSE Circle Alumni</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">FREE</span>
                  <span className="text-gray-400 ml-2">for 1 year</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Graduated from HUSE Circle? Get free access for your first year!
                </p>

                <button 
                  onClick={() => navigate('/dofracto/builder/signup?alumni=true')}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all mb-6"
                >
                  Claim Free Access
                </button>

                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Full platform access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">No payment for 1 year</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Alumni badge</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Priority support</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Annual Plan - POPULAR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border-2 border-cyan-500/50 rounded-3xl p-8 relative transform scale-105 shadow-2xl shadow-cyan-500/20"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full">
                <span className="text-white text-sm font-bold flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </span>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">Annual Access</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">₹499</span>
                  <span className="text-gray-400 ml-2">/year</span>
                </div>
                <p className="text-cyan-400 text-sm font-medium mb-2">
                  Just ₹41.58/month
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  Best value for serious contributors
                </p>

                <button 
                  onClick={() => navigate('/dofracto/builder/signup')}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all mb-2"
                >
                  Start 7-Day Free Trial
                </button>
                <p className="text-xs text-gray-500 mb-6">No credit card required</p>

                <div className="space-y-3 text-left">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">What You Get</h2>
            <p className="text-xl text-gray-400">Everything you need to discover, support, and grow with startups</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Social Proof */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Join the Ecosystem</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">200+</div>
                <div className="text-gray-400">Verified Startups</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">5,000+</div>
                <div className="text-gray-400">Active Contributors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">₹50Cr+</div>
                <div className="text-gray-400">Community Support</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">1,500+</div>
                <div className="text-gray-400">Success Stories</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">Everything you need to know</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all"
              >
                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-3xl p-12"
          >
            <Gift className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Start Your 7-Day Free Trial
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              No credit card required. Cancel anytime. Full access to explore.
            </p>
            <button
              onClick={() => navigate('/dofracto/builder/signup')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all inline-flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}