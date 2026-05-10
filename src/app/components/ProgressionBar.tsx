import { motion } from 'motion/react';
import { ArrowRight, Lock, Unlock, Zap, TrendingUp, Award, Crown, CheckCircle } from 'lucide-react';
import { getTierInfo, getReputationNeededForNextTier, TierLevel } from '../utils/tierSystem';
import { useNavigate } from 'react-router-dom';

interface ProgressionBarProps {
  reputation: number;
  userType?: 'student' | 'contributor' | 'founder';
  compact?: boolean;
}

export function ProgressionBar({ reputation, userType = 'student', compact = false }: ProgressionBarProps) {
  const tierInfo = getTierInfo(reputation);
  const repNeeded = getReputationNeededForNextTier(reputation);

  const userTypeConfig = {
    student: {
      icon: '🎓',
      label: 'Student',
      nextStep: 'Contributor',
      nextStepIcon: '🚀'
    },
    contributor: {
      icon: '🚀',
      label: 'Contributor',
      nextStep: 'Founder',
      nextStepIcon: '👑'
    },
    founder: {
      icon: '👑',
      label: 'Founder',
      nextStep: 'Ecosystem Leader',
      nextStepIcon: '⭐'
    }
  };

  const config = userTypeConfig[userType];

  const tierIcons = {
    Bronze: '🥉',
    Silver: '🥈',
    Gold: '🥇',
    Platinum: '💎',
    Contributor: '💼',
    'Startup': '🚀'
  };

  const navigate = useNavigate();

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{tierIcons[tierInfo.level]}</span>
            <div>
              <p className="text-white font-bold text-sm">{tierInfo.level} Tier</p>
              <p className="text-gray-400 text-xs">{reputation} reputation points</p>
            </div>
          </div>
          {tierInfo.nextTier && (
            <div className="text-right">
              <p className="text-gray-500 text-xs">Next: {tierInfo.nextTier}</p>
              <p className="text-purple-400 text-xs font-bold">+{repNeeded} rep</p>
            </div>
          )}
        </div>
        
        {tierInfo.nextTier && (
          <div className="space-y-1">
            <div className="w-full bg-[#1A1A1A] rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${tierInfo.progressToNext}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
            <p className="text-xs text-gray-500 text-right">{Math.round(tierInfo.progressToNext)}% to {tierInfo.nextTier}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
      {/* User Type Progression */}
      <div className="mb-6">
        <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">Your Journey</p>
        <div className="flex items-center gap-4">
          {/* Current Status */}
          <div className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 border-2 border-blue-400">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{config.icon}</span>
              <div>
                <p className="text-white font-bold">You are here</p>
                <p className="text-blue-100 text-sm">{config.label}</p>
              </div>
              <CheckCircle className="text-white ml-auto" size={20} />
            </div>
          </div>

          <ArrowRight className="text-purple-400 flex-shrink-0" size={24} />

          {/* Next Step */}
          <div className="flex-1 bg-[#1A1A1A] border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl opacity-50">{config.nextStepIcon}</span>
              <div>
                <p className="text-gray-400 font-medium">Next Step</p>
                <p className="text-purple-400 text-sm font-bold">{config.nextStep}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Progression */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{tierIcons[tierInfo.level]}</span>
            <div>
              <p className="text-white font-bold text-lg">{tierInfo.level} Tier</p>
              <p className="text-gray-400 text-sm">{reputation} reputation points</p>
            </div>
          </div>
          {tierInfo.nextTier && (
            <div className="text-right">
              <p className="text-gray-500 text-sm">Next Tier: {tierInfo.nextTier}</p>
              <p className="text-purple-400 font-bold">+{repNeeded} reputation needed</p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {tierInfo.nextTier && (
          <div className="space-y-2">
            <div className="w-full bg-[#1A1A1A] rounded-full h-3 overflow-hidden border border-purple-500/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${tierInfo.progressToNext}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </motion.div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">{tierInfo.level} ({tierInfo.minReputation}+)</span>
              <span className="text-purple-400 font-bold">{Math.round(tierInfo.progressToNext)}% complete</span>
              <span className="text-gray-500">{tierInfo.nextTier} ({tierInfo.nextTier === 'Silver' ? '1000' : tierInfo.nextTier === 'Gold' ? '5000' : '30000'}+)</span>
            </div>
          </div>
        )}

        {/* Max Tier Message */}
        {!tierInfo.nextTier && (
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 mt-3">
            <div className="flex items-center gap-3">
              <Crown className="text-blue-400" size={24} />
              <div>
                <p className="text-white font-bold">Maximum Tier Achieved! 🎉</p>
                <p className="text-gray-400 text-sm">You've unlocked all platform benefits</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* All Tiers Overview */}
      <div>
        <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">Tier System (6 Tiers)</p>
        <div className="grid grid-cols-3 gap-3">
          {(['Bronze', 'Silver', 'Gold', 'Platinum', 'Contributor', 'Startup'] as TierLevel[]).map((tier) => {
            const thresholds = {
              'Bronze': 0,
              'Silver': 1000,
              'Gold': 5000,
              'Platinum': 30000,
              'Contributor': 100000,
              'Startup': 300000
            };
            const isUnlocked = reputation >= thresholds[tier];
            const isCurrent = tierInfo.level === tier;

            return (
              <div
                key={tier}
                className={`relative p-3 rounded-lg border-2 transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-purple-500 scale-105'
                    : isUnlocked
                    ? 'bg-[#1A1A1A] border-green-500/30'
                    : 'bg-[#0F0F0F] border-gray-700/30 opacity-50'
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-2 border-[#0F0F0F]">
                    <Zap size={12} className="text-white" />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl mb-1">{tierIcons[tier]}</div>
                  <p className={`text-xs font-bold mb-1 ${isCurrent ? 'text-white' : isUnlocked ? 'text-green-400' : 'text-gray-600'}`}>
                    {tier}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {thresholds[tier] >= 1000 
                      ? `${(thresholds[tier] / 1000).toLocaleString()}K+` 
                      : `${thresholds[tier]}+`} rep
                  </p>
                  {isUnlocked ? (
                    <Unlock className="text-green-400 mx-auto mt-1" size={12} />
                  ) : (
                    <Lock className="text-gray-600 mx-auto mt-1" size={12} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Tier Benefits Preview */}
      {tierInfo.nextTier && (
        <div className="mt-6 bg-[#1A1A1A] border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-purple-400" size={18} />
            <p className="text-white font-bold text-sm">Unlock at {tierInfo.nextTier} Tier:</p>
          </div>
          <div className="space-y-2">
            {tierInfo.nextTier && (
              <>
                {tierInfo.nextTier === 'Silver' && (
                  <>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-purple-400" />
                      <span>Access to Part-Time jobs</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-purple-400" />
                      <span>Priority in job applications</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-purple-400" />
                      <span>Featured portfolio option</span>
                    </div>
                  </>
                )}
                {tierInfo.nextTier === 'Gold' && (
                  <>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-amber-400" />
                      <span>Access to Equity opportunities</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-amber-400" />
                      <span>Access to Revenue-sharing deals</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-amber-400" />
                      <span>Direct recruiter contact</span>
                    </div>
                  </>
                )}
                {tierInfo.nextTier === 'Platinum' && (
                  <>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-blue-400" />
                      <span>Access to Advisory positions</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-blue-400" />
                      <span>Exclusive startup opportunities</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-blue-400" />
                      <span>VIP support</span>
                    </div>
                  </>
                )}
                {tierInfo.nextTier === 'Contributor' && (
                  <>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-purple-400" />
                      <span>10 Quotify quotes/week</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-purple-400" />
                      <span>Invest in Dofracto startups</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-purple-400" />
                      <span>Mentor students & post internships</span>
                    </div>
                  </>
                )}
                {tierInfo.nextTier === 'Startup' && (
                  <>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-amber-400" />
                      <span>Unlimited Quotify requests</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-amber-400" />
                      <span>Receive funding from Contributors</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={14} className="text-amber-400" />
                      <span>Hire students for equity/revenue share</span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => navigate('/huse-circle-platform/challenges')}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
        >
          Earn More Reputation
        </button>
        <button 
          onClick={() => navigate('/reputation-guide')}
          className="px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white rounded-lg text-sm transition-all"
        >
          View All Benefits
        </button>
      </div>
    </div>
  );
}