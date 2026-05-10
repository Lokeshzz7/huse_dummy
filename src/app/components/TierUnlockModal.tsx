import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Lock, 
  Unlock,
  MessageSquare, 
  Briefcase,
  Rocket,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Crown,
  Star,
  Zap,
  ArrowRight
} from 'lucide-react';

interface TierUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  userTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  attemptedFeature?: string;
}

const tierBenefits = {
  Bronze: {
    icon: Award,
    color: 'from-orange-700 to-orange-900',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10',
    repRange: '0-199 Rep',
    unlocked: [
      { icon: Users, label: 'Access HUSE Feed', desc: 'View all posts and updates' },
      { icon: Briefcase, label: 'Apply for Projects', desc: 'Apply to open project opportunities' },
      { icon: Star, label: 'Build Portfolio', desc: 'Showcase your work' },
      { icon: TrendingUp, label: 'Earn Reputation', desc: 'Complete tasks to level up' }
    ],
    locked: [
      { icon: MessageSquare, label: 'Direct Messaging', desc: 'Unlock at Gold tier', requiredTier: 'Gold' },
      { icon: Briefcase, label: 'Post Gigs', desc: 'Unlock at Platinum tier', requiredTier: 'Platinum' },
      { icon: Rocket, label: 'Dofracto Launchpad', desc: 'Unlock at Platinum tier', requiredTier: 'Platinum' }
    ]
  },
  Silver: {
    icon: Award,
    color: 'from-gray-400 to-gray-600',
    textColor: 'text-gray-300',
    borderColor: 'border-gray-500/30',
    bgColor: 'bg-gray-500/10',
    repRange: '200-499 Rep',
    unlocked: [
      { icon: Users, label: 'Access HUSE Feed', desc: 'View all posts and updates' },
      { icon: Briefcase, label: 'Apply for Projects', desc: 'Apply to open project opportunities' },
      { icon: Star, label: 'Build Portfolio', desc: 'Showcase your work' },
      { icon: TrendingUp, label: 'Earn Reputation', desc: 'Complete tasks to level up' }
    ],
    locked: [
      { icon: MessageSquare, label: 'Direct Messaging', desc: 'Unlock at Gold tier (need 500+ Rep)', requiredTier: 'Gold' },
      { icon: Briefcase, label: 'Post Gigs', desc: 'Unlock at Platinum tier', requiredTier: 'Platinum' },
      { icon: Rocket, label: 'Dofracto Launchpad', desc: 'Unlock at Platinum tier', requiredTier: 'Platinum' }
    ]
  },
  Gold: {
    icon: Crown,
    color: 'from-amber-500 to-yellow-500',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
    repRange: '500-999 Rep',
    unlocked: [
      { icon: Users, label: 'Access HUSE Feed', desc: 'View all posts and updates' },
      { icon: Briefcase, label: 'Apply for Projects', desc: 'Apply to open project opportunities' },
      { icon: Star, label: 'Build Portfolio', desc: 'Showcase your work' },
      { icon: TrendingUp, label: 'Earn Reputation', desc: 'Complete tasks to level up' },
      { icon: MessageSquare, label: 'Direct Messaging', desc: 'Chat with fellow members' },
      { icon: Sparkles, label: 'Gold Badge', desc: 'Special profile badge' }
    ],
    locked: [
      { icon: Briefcase, label: 'Post Gigs', desc: 'Unlock at Platinum tier (need 1000+ Rep)', requiredTier: 'Platinum' },
      { icon: Rocket, label: 'Dofracto Launchpad', desc: 'Qualified for startup acceleration', requiredTier: 'Platinum' }
    ]
  },
  Platinum: {
    icon: Crown,
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    repRange: '1000+ Rep',
    unlocked: [
      { icon: Users, label: 'Access HUSE Feed', desc: 'View all posts and updates' },
      { icon: Briefcase, label: 'Apply for Projects', desc: 'Apply to open project opportunities' },
      { icon: Star, label: 'Build Portfolio', desc: 'Showcase your work' },
      { icon: TrendingUp, label: 'Earn Reputation', desc: 'Complete tasks to level up' },
      { icon: MessageSquare, label: 'Direct Messaging', desc: 'Chat with fellow members' },
      { icon: Briefcase, label: 'Post Gigs', desc: 'Create job postings for others' },
      { icon: Rocket, label: 'Dofracto Launchpad', desc: 'Qualified for startup acceleration' },
      { icon: Crown, label: 'Platinum Badge', desc: 'Elite profile badge' },
      { icon: Zap, label: 'Priority Support', desc: 'Faster response times' }
    ],
    locked: []
  }
};

export function TierUnlockModal({ isOpen, onClose, userTier, attemptedFeature }: TierUnlockModalProps) {
  // Safety check: Only show modal for Bronze, Silver, Gold, Platinum tiers
  // Contributor and Startup tiers should not see this modal
  const currentTierData = tierBenefits[userTier];
  
  // If tierData doesn't exist (e.g., Contributor or Startup), don't render
  if (!currentTierData) {
    return null;
  }
  
  const Icon = currentTierData.icon;

  const getNextTier = () => {
    const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'] as const;
    const currentIndex = tiers.indexOf(userTier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const nextTier = getNextTier();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-[101]"
          >
            <div className="bg-[#0F0F0F] border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className={`p-6 border-b border-purple-500/20 bg-gradient-to-r ${currentTierData.color}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${currentTierData.bgColor} border ${currentTierData.borderColor}`}>
                      <Icon className={`w-8 h-8 ${currentTierData.textColor}`} />
                    </div>
                    <div>
                      <h2 className="text-white text-2xl font-bold mb-1">
                        {userTier} Tier
                      </h2>
                      <p className="text-gray-300 text-sm">{currentTierData.repRange}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {attemptedFeature && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-400 font-bold text-sm mb-1">Feature Locked</p>
                        <p className="text-red-300 text-sm">
                          {attemptedFeature} requires a higher tier. Keep earning reputation to unlock!
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Unlocked Features */}
                <div className="mb-8">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <Unlock className="w-5 h-5 text-green-400" />
                    Unlocked Features
                  </h3>
                  <div className="space-y-3">
                    {currentTierData.unlocked.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                        >
                          <div className="p-2 rounded-lg bg-green-500/20">
                            <FeatureIcon className="w-5 h-5 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm mb-1">{feature.label}</p>
                            <p className="text-gray-400 text-xs">{feature.desc}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <Unlock className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Locked Features */}
                {currentTierData.locked.length > 0 && (
                  <div>
                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-red-400" />
                      Locked Features
                    </h3>
                    <div className="space-y-3">
                      {currentTierData.locked.map((feature, index) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg opacity-60"
                          >
                            <div className="p-2 rounded-lg bg-red-500/20">
                              <FeatureIcon className="w-5 h-5 text-red-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium text-sm mb-1">{feature.label}</p>
                              <p className="text-gray-400 text-xs">{feature.desc}</p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                <Lock className="w-3 h-3 text-red-400" />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Upgrade CTA */}
                {nextTier && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-purple-500/20">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold mb-2">Want to unlock more features?</h4>
                        <p className="text-gray-400 text-sm mb-4">
                          Reach {nextTier} tier to unlock {tierBenefits[nextTier].unlocked.length - currentTierData.unlocked.length} more features including {tierBenefits[nextTier].unlocked[tierBenefits[nextTier].unlocked.length - 1].label.toLowerCase()}.
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ 
                                width: userTier === 'Bronze' ? '25%' : 
                                       userTier === 'Silver' ? '50%' : 
                                       userTier === 'Gold' ? '75%' : '100%' 
                              }}
                            />
                          </div>
                          <span className={tierBenefits[nextTier].textColor}>
                            {nextTier}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-purple-500/20 bg-[#0A0A0A]">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-gray-400 text-sm">
                    Complete projects and help others to earn reputation
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    Got it
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}