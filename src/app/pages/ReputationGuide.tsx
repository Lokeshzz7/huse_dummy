import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Star, Trophy, Zap, CheckCircle, TrendingUp } from 'lucide-react';

export function ReputationGuide() {
  const navigate = useNavigate();

  const tiers = [
    { name: 'Bronze', color: '#CD7F32', minRep: 0, maxRep: 499, icon: '🥉', description: 'Onboarding, learning platform' },
    { name: 'Silver', color: '#C0C0C0', minRep: 500, maxRep: 1999, icon: '🥈', description: 'Active participant, peer reviews' },
    { name: 'Gold', color: '#FFD700', minRep: 2000, maxRep: 7999, icon: '🥇', description: 'Proven work, recruiter visibility' },
    { name: 'Platinum', color: '#E5E4E2', minRep: 8000, maxRep: 24999, icon: '💎', description: 'Full year of work, public portfolio' },
    { name: 'Contributor', color: '#B9F2FF', minRep: 25000, maxRep: 99999, icon: '💠', description: 'Graduated, paid work, mentoring' },
    { name: 'Business Owner', color: '#FF6B6B', minRep: 100000, maxRep: Infinity, icon: '👑', description: 'Running real business' }
  ];

  const repSources = [
    { action: 'Peer Reviewed Badge', rep: '+200', icon: <CheckCircle className="w-5 h-5" /> },
    { action: 'Client Rated Badge', rep: '+300', icon: <Trophy className="w-5 h-5" /> },
    { action: 'Recruiter Endorsed Badge', rep: '+500', icon: <Award className="w-5 h-5" /> },
    { action: 'Mentor Confirmed Badge', rep: '+250', icon: <Award className="w-5 h-5" /> },
    { action: 'Complete Profile', rep: '+100', icon: <CheckCircle className="w-5 h-5" /> },
    { action: 'Post Project', rep: '+50', icon: <Trophy className="w-5 h-5" /> },
    { action: 'Complete Gig', rep: '+200', icon: <Star className="w-5 h-5" /> },
    { action: 'Daily Login Streak (30 days)', rep: '+150', icon: <Zap className="w-5 h-5" /> },
    { action: 'Get Recruited', rep: '+1000', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-bold text-white">Reputation System Guide</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Trophy className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-medium">Build Your Reputation</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Reputation System
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your reputation score reflects your contributions, achievements, and credibility in the HUSE ecosystem.
            Level up through challenges, projects, and verified accomplishments.
          </p>
        </motion.div>

        {/* Reputation Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Award className="w-7 h-7 text-purple-400" />
            Reputation Tiers
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all"
              >
                <div className="text-4xl mb-3">{tier.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
                <p className="text-gray-400 text-sm mb-3">
                  {tier.minRep} - {tier.maxRep === Infinity ? '∞' : tier.maxRep} Rep
                </p>
                <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: '100%',
                      background: `linear-gradient(90deg, ${tier.color}, ${tier.color}99)`
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to Earn Rep */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Star className="w-7 h-7 text-purple-400" />
            How to Earn Reputation
          </h3>
          <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden">
            {repSources.map((source, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-5 ${
                  index !== repSources.length - 1 ? 'border-b border-purple-500/10' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    {source.icon}
                  </div>
                  <span className="text-white font-medium">{source.action}</span>
                </div>
                <span className="text-green-400 font-bold text-lg">{source.rep}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Zap className="w-7 h-7 text-purple-400" />
            Benefits of Higher Reputation
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Priority Visibility',
                description: 'Your profile appears higher in recruiter searches'
              },
              {
                title: 'Exclusive Opportunities',
                description: 'Access to premium challenges and opportunities'
              },
              {
                title: 'Trust Badge',
                description: 'Display your tier badge on your profile'
              },
              {
                title: 'Better Quote Rates',
                description: 'Higher reputation = higher service rates on Quotify'
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all"
              >
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => navigate('/husecircle/student/platform')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
          >
            Start Building Reputation
          </button>
        </motion.div>
      </div>
    </div>
  );
}
