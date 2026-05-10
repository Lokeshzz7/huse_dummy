import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useEcosystem } from '../../context/EcosystemContext';
import { GraduationCap, Award, Building2, Quote, ArrowRight, Lock, CheckCircle, Star, Sparkles } from 'lucide-react';

interface PlatformSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlatformSwitcher({ isOpen, onClose }: PlatformSwitcherProps) {
  const navigate = useNavigate();
  const { userProfile, canAccessPlatform, getRecommendedPlatform, isEligibleForGraduation } = useEcosystem();

  const platforms = [
    {
      id: 'huse',
      name: 'HUSE Circle',
      description: 'Student incubator for learning and building MVPs',
      icon: GraduationCap,
      color: 'from-[#8B5CF6] to-[#D946EF]',
      route: '/huse-circle',
      requiredTiers: ['Bronze', 'Silver', 'Gold', 'Platinum'],
      features: ['Learn Skills', 'Build Projects', 'Earn Reputation', 'Graduate to Dofracto'],
    },
    {
      id: 'dofracto',
      name: 'Dofracto',
      description: 'Startup accelerator for real businesses',
      icon: Award,
      color: 'from-[#24c6dc] to-[#05997F]',
      route: '/unified-builders-hub',
      requiredTiers: ['Contributor', 'Startup'],
      features: ['Real Projects', 'Earn Money', 'Build Startups', 'Access Business Portal'],
    },
    {
      id: 'quotify',
      name: 'Quotify',
      description: 'Quote marketplace for all ecosystem members',
      icon: Quote,
      color: 'from-[#3B82F6] to-[#8B5CF6]',
      route: '/quote-marketplace',
      requiredTiers: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Contributor', 'Startup'],
      features: ['Request Quotes', 'Submit Quotes', 'Earn Credits', 'Connect Ecosystem'],
    },
  ];

  const handlePlatformClick = (route: string, platformId: string) => {
    if (platformId === 'huse' && canAccessPlatform('HUSE Circle')) {
      navigate(route);
      onClose();
    } else if (platformId === 'dofracto' && canAccessPlatform('Dofracto')) {
      // Navigate based on tier
      if (userProfile?.tier === 'Startup') {
        navigate('/business-portal');
      } else {
        navigate('/unified-builders-hub');
      }
      onClose();
    } else if (platformId === 'quotify') {
      navigate(route);
      onClose();
    }
  };

  const getPlatformStatus = (platformId: string) => {
    if (platformId === 'huse') {
      return canAccessPlatform('HUSE Circle');
    } else if (platformId === 'dofracto') {
      return canAccessPlatform('Dofracto');
    } else if (platformId === 'quotify') {
      return true; // Everyone can access
    }
    return false;
  };

  const recommended = getRecommendedPlatform();

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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-4xl bg-theme-card border border-theme-accent rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#8B5CF6]/20 via-[#24c6dc]/20 to-[#05997F]/20 border-b border-theme-accent p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-[#24c6dc]" />
                  <h2 className="text-2xl font-bold text-theme-primary">Ecosystem Navigator</h2>
                </div>
                <p className="text-theme-tertiary">Navigate between HUSE Circle, Dofracto, and Quotify platforms</p>
                
                {/* User Info */}
                {userProfile && (
                  <div className="mt-4 flex items-center gap-4 p-3 bg-theme-secondary rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center">
                      <span className="text-white font-bold">{userProfile.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-theme-primary">{userProfile.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-theme-tertiary">{userProfile.tier}</span>
                        <span className="text-xs text-theme-muted">•</span>
                        <span className="text-sm text-theme-tertiary">{userProfile.reputation} Rep</span>
                      </div>
                    </div>
                    {isEligibleForGraduation() && (
                      <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                        ✨ Eligible for Graduation
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Platforms Grid */}
              <div className="p-6 grid md:grid-cols-3 gap-4">
                {platforms.map((platform, index) => {
                  const Icon = platform.icon;
                  const canAccess = getPlatformStatus(platform.id);
                  const isRecommended = 
                    (recommended === 'HUSE Circle' && platform.id === 'huse') ||
                    (recommended === 'Dofracto' && platform.id === 'dofracto') ||
                    (recommended === 'Quotify' && platform.id === 'quotify');

                  return (
                    <motion.button
                      key={platform.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => canAccess && handlePlatformClick(platform.route, platform.id)}
                      disabled={!canAccess}
                      className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                        canAccess
                          ? 'bg-theme-secondary border-theme-accent hover:border-[#24c6dc] hover:shadow-lg cursor-pointer'
                          : 'bg-theme-tertiary border-theme-secondary opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {/* Recommended Badge */}
                      {isRecommended && canAccess && (
                        <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-full text-xs font-medium shadow-lg">
                          Recommended
                        </div>
                      )}

                      {/* Lock Icon for inaccessible platforms */}
                      {!canAccess && (
                        <div className="absolute top-4 right-4">
                          <Lock className="w-5 h-5 text-theme-muted" />
                        </div>
                      )}

                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="font-bold text-theme-primary mb-2">{platform.name}</h3>
                      <p className="text-sm text-theme-tertiary mb-4">{platform.description}</p>

                      {/* Features */}
                      <ul className="space-y-1.5 mb-4">
                        {platform.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-theme-muted">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Access Status */}
                      {canAccess ? (
                        <div className="flex items-center gap-2 text-sm text-[#24c6dc] font-medium">
                          <span>Open Platform</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="text-sm text-theme-muted">
                          Required: {platform.requiredTiers.join(', ')}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Graduation CTA */}
              {isEligibleForGraduation() && (
                <div className="p-6 border-t border-theme-accent bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Star className="w-8 h-8 text-green-500" />
                      <div>
                        <h4 className="font-bold text-theme-primary">Ready to Graduate?</h4>
                        <p className="text-sm text-theme-tertiary">Move from HUSE Circle to Dofracto and access real opportunities</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/graduation');
                        onClose();
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all font-medium"
                    >
                      Graduate Now →
                    </button>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="p-4 border-t border-theme-accent bg-theme-secondary">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-theme-tertiary text-theme-primary rounded-lg hover:bg-theme-card transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
