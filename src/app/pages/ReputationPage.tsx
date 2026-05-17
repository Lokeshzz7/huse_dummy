import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import {
  Award, Star, Trophy, Target, CheckCircle, Users, Clock,
  MessageSquare, Zap, ThumbsUp, Sparkles, ArrowUpRight,
  Bell, LogOut, Building2, LayoutDashboard, ArrowLeft, Info
} from 'lucide-react';

// Mock reputation data
const reputationData = {
  overallScore: 4.7,
  totalRatings: 127,
  rank: 'Gold Contributor',
  rankIcon: '🏆',
  nextRank: 'Platinum Contributor',
  pointsToNextRank: 450,
  totalPoints: 32000,
  badges: [
    {
      id: 1,
      name: 'Early Adopter',
      icon: '🌟',
      description: 'One of the first 100 contributors',
      earnedDate: 'Nov 2024',
      rarity: 'Rare'
    },
    {
      id: 2,
      name: 'Multi-Contributor',
      icon: '🎯',
      description: 'Contributed to 5+ businesses',
      earnedDate: 'Dec 2024',
      rarity: 'Common'
    },
    {
      id: 3,
      name: 'Design Master',
      icon: '🎨',
      description: 'Completed 10+ design projects',
      earnedDate: 'Dec 2024',
      rarity: 'Uncommon'
    },
    {
      id: 4,
      name: 'Fast Responder',
      icon: '⚡',
      description: 'Average response time under 2 hours',
      earnedDate: 'Dec 2024',
      rarity: 'Uncommon'
    },
    {
      id: 5,
      name: 'Community Favorite',
      icon: '❤️',
      description: 'Received 50+ positive reviews',
      earnedDate: 'Dec 2024',
      rarity: 'Rare'
    },
    {
      id: 6,
      name: 'Quality Champion',
      icon: '✨',
      description: 'Maintained 4.5+ rating across all projects',
      earnedDate: 'Dec 2024',
      rarity: 'Epic'
    }
  ],
  reviews: [
    {
      id: 1,
      businessName: 'EcoGreen Solutions',
      businessLogo: '🌱',
      rating: 5,
      comment: 'Exceptional UI/UX work! Delivered ahead of schedule and exceeded expectations.',
      reviewer: 'Founder',
      date: '5 days ago',
      projectType: 'UI/UX Design'
    },
    {
      id: 2,
      businessName: 'FinTrack Pro',
      businessLogo: '💰',
      rating: 5,
      comment: 'Outstanding frontend development skills. Very professional and communicative.',
      reviewer: 'CTO',
      date: '1 week ago',
      projectType: 'Frontend Development'
    },
    {
      id: 3,
      businessName: 'TechVenture AI',
      businessLogo: '🤖',
      rating: 4,
      comment: 'Great contribution! Minor delays but quality work overall.',
      reviewer: 'Product Manager',
      date: '2 weeks ago',
      projectType: 'Financial Contribution'
    },
    {
      id: 4,
      businessName: 'HealthCare Connect',
      businessLogo: '🏥',
      rating: 5,
      comment: 'Incredible attention to detail. Would definitely work with again!',
      reviewer: 'CEO',
      date: '3 weeks ago',
      projectType: 'Product Design'
    }
  ],
  skills: [
    { name: 'UI/UX Design', endorsements: 45, verified: true },
    { name: 'Frontend Development', endorsements: 38, verified: true },
    { name: 'Product Strategy', endorsements: 22, verified: false },
    { name: 'Mobile Design', endorsements: 31, verified: true },
    { name: 'Branding', endorsements: 18, verified: false },
    { name: 'React/TypeScript', endorsements: 42, verified: true }
  ],
  stats: {
    totalProjects: 14,
    completedOnTime: 12,
    repeatClients: 4,
    avgResponseTime: '1.5 hours',
    totalEarnings: 185000
  }
};

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Common': return 'from-gray-500 to-gray-600';
    case 'Uncommon': return 'from-green-500 to-emerald-500';
    case 'Rare': return 'from-blue-500 to-indigo-500';
    case 'Epic': return 'from-purple-500 to-pink-500';
    case 'Legendary': return 'from-amber-500 to-orange-500';
    default: return 'from-gray-500 to-gray-600';
  }
};

export function ReputationPage() {
  const navigate = useNavigate();
  const [contributorUser, setContributorUser] = useState<any>(null);
  const [notifications] = useState(5);

  useEffect(() => {
    const storedUser = localStorage.getItem('dofractoBuilderUser');
    if (storedUser) {
      setContributorUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dofractoBuilderUser');
    setContributorUser(null);
    navigate('/dofracto/builder/login');
  };

  const progressToNextRank = (reputationData.totalPoints % 1000) / 10;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="bg-[#111] border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-6 h-[80px] flex items-center justify-between">
          <button 
            onClick={() => navigate('/dofracto')}
            className="flex items-center group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-[#24c6dc] to-[#05997F] bg-clip-text text-transparent">
              Dofracto
            </span>
          </button>

          {contributorUser && (
            <>
              <div className="hidden md:flex items-center gap-3 bg-black/50 p-2 rounded-xl border border-white/10">
                <button
                  onClick={() => navigate('/dofracto/builder/hub')}
                  className="px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <Building2 className="w-4 h-4" />
                  Builders Hub
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/dofracto/notifications')}
                  className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-full flex items-center justify-center text-xs font-bold">
                      {notifications}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl">{contributorUser.avatar}</div>
                  <div className="hidden md:block">
                    <p className="font-medium">{contributorUser.name}</p>
                    <p className="text-xs text-gray-400">{contributorUser.role}</p>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="ml-2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
            <Award className="w-10 h-10 text-amber-400" />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              My Reputation
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Your credibility and achievements in the Dofracto ecosystem
          </p>
        </div>

        {/* Tier System Note */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-amber-500/10 border border-white/20 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
              <Info className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  HUSE Circle → Dofracto Progression
                </span>
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Your reputation progression flows seamlessly across the HUSE ecosystem, from student to contributor to startup founder:
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-lg text-orange-300 font-semibold">
                  Bronze
                </span>
                <span className="text-gray-500">→</span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30 rounded-lg text-gray-300 font-semibold">
                  Silver
                </span>
                <span className="text-gray-500">→</span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-lg text-amber-300 font-semibold">
                  Gold
                </span>
                <span className="text-gray-500">→</span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg text-cyan-300 font-semibold">
                  Platinum
                </span>
                <span className="text-gray-500">→</span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-purple-300 font-semibold">
                  Contributor Tiers
                </span>
                <span className="text-gray-500">→</span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 font-semibold">
                  Startup Tiers
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                After Platinum on HUSE Circle, unlock Contributor tiers to earn through the ecosystem. Top contributors can graduate to Startup tiers and build their own ventures.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-8 border border-amber-500/30 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-6xl">{reputationData.rankIcon}</span>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                          {reputationData.rank}
                        </h2>
                        <p className="text-gray-400">Rank #{Math.floor(Math.random() * 100) + 1} out of 2,547 contributors</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
                      <span className="text-5xl font-bold">{reputationData.overallScore}</span>
                    </div>
                    <p className="text-sm text-gray-400">Based on {reputationData.totalRatings} ratings</p>
                  </div>
                </div>

                {/* Progress to Next Rank */}
                <div className="bg-black/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Progress to {reputationData.nextRank}</span>
                    <span className="text-sm font-bold text-cyan-400">
                      {reputationData.pointsToNextRank} points needed
                    </span>
                  </div>
                  <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-400"
                      style={{ width: `${progressToNextRank}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {reputationData.totalPoints.toLocaleString()} / {(Math.floor(reputationData.totalPoints / 1000) + 1) * 1000} points
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Performance Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-xl p-5 border border-cyan-500/20">
                <Target className="w-8 h-8 text-cyan-400 mb-3" />
                <p className="text-2xl font-bold">{reputationData.stats.totalProjects}</p>
                <p className="text-sm text-gray-400">Total Projects</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-5 border border-green-500/20">
                <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
                <p className="text-2xl font-bold">{Math.round((reputationData.stats.completedOnTime / reputationData.stats.totalProjects) * 100)}%</p>
                <p className="text-sm text-gray-400">On-Time Delivery</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-5 border border-purple-500/20">
                <Users className="w-8 h-8 text-purple-400 mb-3" />
                <p className="text-2xl font-bold">{reputationData.stats.repeatClients}</p>
                <p className="text-sm text-gray-400">Repeat Clients</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-5 border border-amber-500/20">
                <Clock className="w-8 h-8 text-amber-400 mb-3" />
                <p className="text-2xl font-bold">{reputationData.stats.avgResponseTime}</p>
                <p className="text-sm text-gray-400">Avg Response</p>
              </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10"
            >
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                Recent Reviews ({reputationData.reviews.length})
              </h3>
              <div className="space-y-4">
                {reputationData.reviews.map(review => (
                  <div key={review.id} className="bg-black/30 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{review.businessLogo}</span>
                        <div>
                          <h4 className="font-bold text-white">{review.businessName}</h4>
                          <p className="text-xs text-gray-400">{review.projectType} • {review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">"{review.comment}"</p>
                    <p className="text-xs text-gray-500">— {review.reviewer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Badges & Skills */}
          <div className="space-y-6">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10"
            >
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Badges ({reputationData.badges.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {reputationData.badges.map(badge => (
                  <div
                    key={badge.id}
                    className={`bg-gradient-to-br ${getRarityColor(badge.rarity)} p-4 rounded-xl text-center group cursor-pointer hover:scale-105 transition-transform`}
                    title={badge.description}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <p className="font-bold text-sm text-white mb-1">{badge.name}</p>
                    <p className="text-xs text-white/70">{badge.rarity}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills & Endorsements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10"
            >
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Skills & Endorsements
              </h3>
              <div className="space-y-3">
                {reputationData.skills.map((skill, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{skill.name}</span>
                        {skill.verified && (
                          <CheckCircle className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-gray-400" />
                        <span className="text-sm font-bold text-gray-300">{skill.endorsements}</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-teal-400"
                        style={{ width: `${(skill.endorsements / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Share Profile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl p-6 border border-cyan-500/20"
            >
              <Sparkles className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-bold text-lg mb-2">Share Your Profile</h3>
              <p className="text-sm text-gray-400 mb-4">
                Show off your achievements and attract more opportunities
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2">
                Share Profile
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}