import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, Rocket, TrendingUp, Users, Award, 
  Zap, Shield, Star, ArrowRight, Sparkles,
  Building2, Heart, Briefcase, Target,
  DollarSign, Eye, MessageSquare, BarChart3,
  Megaphone, Crown, Gift, Calculator
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function BusinessPricing() {
  const navigate = useNavigate();
  const [campaignAmount, setCampaignAmount] = useState(50000);

  const features = [
    { icon: Eye, text: 'Access to 5,000+ potential contributors', color: 'from-cyan-500 to-teal-500' },
    { icon: Heart, text: 'Launch community support campaigns', color: 'from-pink-500 to-rose-500' },
    { icon: Users, text: 'Recruit talent from HUSE Circle', color: 'from-purple-500 to-indigo-500' },
    { icon: Briefcase, text: 'Post unlimited job opportunities', color: 'from-blue-500 to-cyan-500' },
    { icon: MessageSquare, text: 'Direct messaging with contributors', color: 'from-green-500 to-emerald-500' },
    { icon: BarChart3, text: 'Analytics & insights dashboard', color: 'from-yellow-500 to-orange-500' },
    { icon: Megaphone, text: 'Featured placement opportunities', color: 'from-red-500 to-pink-500' },
    { icon: Target, text: 'Quotify integration for sales', color: 'from-violet-500 to-purple-500' },
  ];

  const benefits = [
    {
      title: 'Raise Funds',
      description: 'Launch community support campaigns and raise ₹5L-50L from contributors',
      value: '₹50L+',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Find Talent',
      description: 'Recruit skilled developers, designers, and marketers from HUSE Circle',
      value: '10,000+',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Get Customers',
      description: 'Receive quote requests from Quotify and convert them to customers',
      value: '500+',
      icon: Target,
      color: 'from-cyan-500 to-teal-500'
    },
  ];

  const comparisonFeatures = [
    { feature: 'Business Profile Listing', free: false, paid: true },
    { feature: 'Access to Contributors', free: false, paid: true },
    { feature: 'Community Support Campaigns', free: false, paid: true },
    { feature: 'Post Job Opportunities', free: 'Limited', paid: 'Unlimited' },
    { feature: 'Direct Messaging', free: false, paid: true },
    { feature: 'Analytics Dashboard', free: false, paid: true },
    { feature: 'Featured Placement', free: false, paid: true },
    { feature: 'Priority Support', free: false, paid: true },
    { feature: 'Quotify Integration', free: false, paid: true },
    { feature: 'HUSE Circle Recruitment', free: false, paid: true },
  ];

  const testimonials = [
    {
      name: 'Amit Kumar',
      role: 'Founder, PayFlow',
      company: '💳',
      text: 'Raised ₹35L in 3 months and hired 2 amazing developers from HUSE Circle. Best decision for our startup!',
      stats: { raised: '₹35L', hires: '2', roi: '700%' }
    },
    {
      name: 'Sneha Mehta',
      role: 'CEO, EcoMart',
      company: '🌱',
      text: 'Got 50+ quote requests from Quotify in the first month. Converted 12 to paying customers. Worth every rupee!',
      stats: { quotes: '50+', customers: '12', revenue: '₹18L' }
    },
  ];

  const roiCalculation = {
    campaignRaise: Math.floor(campaignAmount * 10),
    recruitmentSavings: 50000,
    quotifyRevenue: Math.floor(campaignAmount * 3),
    totalReturn: Math.floor((campaignAmount * 10) + 50000 + (campaignAmount * 3))
  };

  // ROI calculation based on value, not subscription cost
  const roi = Math.floor((roiCalculation.totalReturn / campaignAmount) * 100);

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
              <Crown className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">For Startups & Businesses</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Grow Your Startup with
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Community Power
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Access 5,000+ contributors, raise funds through campaigns, recruit top talent from HUSE Circle, and get customers via Quotify.
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-white text-sm">5,000+ Contributors</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">₹50Cr+ Raised</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-white text-sm">200+ Success Stories</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ROI Calculator */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl font-bold text-white">ROI Calculator</h2>
            </div>
            
            <p className="text-gray-400 mb-8">
              See your potential return on investment with Dofracto
            </p>

            <div className="mb-8">
              <label className="text-white font-medium mb-3 block">
                Expected Campaign Raise: ₹{(campaignAmount / 1000).toFixed(0)}K
              </label>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={campaignAmount}
                onChange={(e) => setCampaignAmount(parseInt(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>₹10K</span>
                <span>₹50L</span>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-black/30 rounded-xl p-6 border border-cyan-500/20">
                <div className="text-sm text-gray-400 mb-2">Campaign Raise</div>
                <div className="text-2xl font-bold text-green-400">
                  +₹{(roiCalculation.campaignRaise / 1000).toFixed(0)}K
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-6 border border-cyan-500/20">
                <div className="text-sm text-gray-400 mb-2">Recruitment Savings</div>
                <div className="text-2xl font-bold text-purple-400">
                  +₹{(roiCalculation.recruitmentSavings / 1000).toFixed(0)}K
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-6 border border-cyan-500/20">
                <div className="text-sm text-gray-400 mb-2">Quotify Revenue</div>
                <div className="text-2xl font-bold text-cyan-400">
                  +₹{(roiCalculation.quotifyRevenue / 1000).toFixed(0)}K
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl p-6 border-2 border-cyan-500/50">
                <div className="text-sm text-gray-400 mb-2">Total ROI</div>
                <div className="text-3xl font-bold text-white">
                  {roi}x
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-green-400 text-center">
                <span className="font-bold">Total Value: ₹{(roiCalculation.totalReturn / 100000).toFixed(1)}L</span> from just ₹4,999 subscription!
              </p>
            </div>
          </motion.div>
        </section>

        {/* Pricing Card */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border-2 border-cyan-500/50 rounded-3xl p-12 text-center relative shadow-2xl shadow-cyan-500/20"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full">
              <span className="text-white font-bold flex items-center gap-2">
                <Star className="w-5 h-5" />
                Business Plan
              </span>
            </div>

            <div className="mt-4 mb-8">
              <div className="text-6xl font-bold text-white mb-3">₹4,999</div>
              <div className="text-xl text-gray-400 mb-2">/year</div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">Average ROI: 1000%+</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/business-portal-register')}
              className="w-full max-w-md mx-auto py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all mb-8 flex items-center justify-center gap-2"
            >
              List Your Business Now
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-3 text-left bg-black/20 p-4 rounded-xl border border-white/10">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Benefits */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">How Dofracto Helps You Grow</h2>
            <p className="text-xl text-gray-400">Three powerful ways to accelerate your startup</p>
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
                  <div className="text-3xl font-bold text-white mb-3">{benefit.value}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Pay for Dofracto?</h2>
            <p className="text-xl text-gray-400">See what you get with a business account</p>
          </motion.div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left p-6 text-gray-400 font-medium">Feature</th>
                  <th className="text-center p-6 text-gray-400 font-medium">Without Dofracto</th>
                  <th className="text-center p-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full">
                      <Star className="w-4 h-4 text-white" />
                      <span className="text-white font-bold">With Dofracto</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((item, index) => (
                  <tr key={index} className="border-t border-white/5">
                    <td className="p-6 text-white">{item.feature}</td>
                    <td className="p-6 text-center">
                      {typeof item.free === 'boolean' ? (
                        item.free ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <div className="w-5 h-5 mx-auto text-red-400">✕</div>
                        )
                      ) : (
                        <span className="text-yellow-400">{item.free}</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {typeof item.paid === 'boolean' ? (
                        item.paid ? (
                          <Check className="w-5 h-5 text-cyan-400 mx-auto" />
                        ) : (
                          <div className="w-5 h-5 mx-auto text-red-400">✕</div>
                        )
                      ) : (
                        <span className="text-cyan-400 font-bold">{item.paid}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-xl text-gray-400">See how businesses are growing with Dofracto</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{testimonial.company}</div>
                  <div>
                    <div className="text-white font-bold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex gap-4">
                  {Object.entries(testimonial.stats).map(([key, value]) => (
                    <div key={key} className="bg-black/30 rounded-lg px-4 py-2">
                      <div className="text-cyan-400 font-bold">{value}</div>
                      <div className="text-gray-500 text-xs capitalize">{key}</div>
                    </div>
                  ))}
                </div>
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
            <Rocket className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Grow Your Startup?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join 200+ startups raising funds, hiring talent, and getting customers through Dofracto
            </p>
            <button
              onClick={() => navigate('/business-portal-register')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all inline-flex items-center gap-2"
            >
              List Your Business - ₹4,999/year
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-gray-500 text-sm mt-4">
              One-time annual payment. Cancel anytime.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}