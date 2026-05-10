import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Rocket, Users, Briefcase, Building2, TrendingUp, 
  Award, Crown, Shield, CheckCircle, ArrowRight, Sparkles,
  Code, Target, DollarSign, Star, GraduationCap, Zap
} from 'lucide-react';

interface AlumniPathSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPath: (path: 'contributor' | 'business-owner') => void;
  userName: string;
}

export function AlumniPathSelectionModal({ 
  isOpen, 
  onClose, 
  onSelectPath,
  userName 
}: AlumniPathSelectionModalProps) {
  const [selectedPath, setSelectedPath] = useState<'contributor' | 'business-owner' | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const paths = [
    {
      id: 'contributor' as const,
      title: 'Dofracto Contributor',
      subtitle: 'Join Startups & Build Products',
      icon: Code,
      color: 'from-cyan-500 to-blue-500',
      bgGlow: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500/30',
      description: 'Work with exciting startups, contribute to real products, and gain experience before starting your own venture.',
      benefits: [
        'Access to 50+ startup opportunities',
        'Equity & revenue-sharing positions',
        'Mentorship from founders',
        'Build your network in the ecosystem',
        'Flexible contribution models'
      ],
      examples: [
        {
          name: 'Priya Sharma',
          role: 'Full-Stack Developer at PayFlow',
          achievement: 'Earned ₹2.5L + 0.5% equity in 6 months',
          avatar: '👩‍💻'
        },
        {
          name: 'Rahul Verma',
          role: 'Product Designer at EcoMart',
          achievement: 'Now co-founder after 1 year contribution',
          avatar: '🎨'
        }
      ],
      idealFor: [
        'Want to gain more startup experience',
        'Interested in working with multiple ventures',
        'Building skills before entrepreneurship',
        'Exploring different industries'
      ]
    },
    {
      id: 'startup' as const,
      title: 'Startup Founder',
      subtitle: 'Launch Your Startup',
      icon: Rocket,
      color: 'from-purple-500 to-pink-500',
      bgGlow: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
      description: 'Take the leap and build your own startup with full access to Dofracto\'s accelerator resources and community.',
      benefits: [
        'Full startup accelerator program',
        'Funding opportunities & supporter network',
        'Free tools & resources for 1 year',
        'Dedicated mentor assignments',
        'Access to contributor talent pool'
      ],
      examples: [
        {
          name: 'Arjun Patel',
          role: 'Founder of SkillBridge AI',
          achievement: 'Raised ₹50L seed in first 3 months',
          avatar: '🚀'
        },
        {
          name: 'Sneha Reddy',
          role: 'Co-founder of HealthTrack',
          achievement: '10K users, profitable in 8 months',
          avatar: '⚡'
        }
      ],
      idealFor: [
        'Have a validated business idea/MVP',
        'Ready to commit full-time',
        'Want to raise funding',
        'Build and scale a team'
      ]
    }
  ];

  const handleConfirm = () => {
    if (selectedPath) {
      onSelectPath(selectedPath);
      setShowConfirmation(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#0F0F0F] rounded-2xl border border-white/10 shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#0F0F0F]/95 backdrop-blur-xl border-b border-white/10 px-8 py-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <GraduationCap className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Congratulations, {userName}! 🎉
                    </h2>
                    <p className="text-gray-400 text-sm">
                      You've reached Platinum tier on HUSE Circle
                    </p>
                  </div>
                </div>
                
                {/* Alumni Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mt-3">
                  <Crown className="text-amber-400" size={16} />
                  <span className="text-amber-400 font-semibold text-sm">
                    HUSE Circle Alumni - 1 Year Free Dofracto Access
                  </span>
                  <Sparkles className="text-amber-400" size={16} />
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
              <p className="text-white text-sm leading-relaxed">
                <Sparkles className="inline text-cyan-400 mr-2" size={16} />
                Welcome to <span className="font-bold text-cyan-400">Dofracto</span> - the startup accelerator! 
                Choose your path to continue your journey. You can switch paths anytime.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {paths.map((path) => {
                const Icon = path.icon;
                const isSelected = selectedPath === path.id;

                return (
                  <motion.div
                    key={path.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedPath(path.id)}
                    className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all ${
                      isSelected
                        ? `${path.borderColor} bg-gradient-to-br ${path.bgGlow}`
                        : 'border-white/10 bg-[#1A1A1A] hover:border-white/20'
                    }`}
                  >
                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center border-2 border-[#0F0F0F]"
                      >
                        <CheckCircle className="text-white" size={18} />
                      </motion.div>
                    )}

                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center shrink-0`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {path.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {path.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                      {path.description}
                    </p>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                        <Award className="text-cyan-400" size={16} />
                        What You Get
                      </h4>
                      <ul className="space-y-2">
                        {path.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                            <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={14} />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                        <Star className="text-amber-400" size={16} />
                        Success Stories
                      </h4>
                      <div className="space-y-3">
                        {path.examples.map((example, idx) => (
                          <div key={idx} className="p-3 bg-black/30 rounded-lg border border-white/5">
                            <div className="flex items-start gap-3">
                              <div className="text-2xl">{example.avatar}</div>
                              <div className="flex-1">
                                <p className="text-white font-medium text-sm">{example.name}</p>
                                <p className="text-gray-400 text-xs mb-1">{example.role}</p>
                                <p className="text-cyan-400 text-xs font-medium">
                                  {example.achievement}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ideal For */}
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                        <Target className="text-purple-400" size={16} />
                        Ideal If You
                      </h4>
                      <ul className="space-y-1.5">
                        {path.idealFor.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-400 text-xs">
                            <ArrowRight className="text-gray-500 shrink-0 mt-0.5" size={12} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div className="text-sm text-gray-400">
                <Shield className="inline text-cyan-400 mr-2" size={16} />
                You can switch paths anytime from your settings
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
                >
                  Decide Later
                </button>
                <button
                  onClick={() => setShowConfirmation(true)}
                  disabled={!selectedPath}
                  className={`px-8 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    selectedPath
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Confirmation Dialog */}
        <AnimatePresence>
          {showConfirmation && selectedPath && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowConfirmation(false)}
              />
              
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative bg-[#1A1A1A] rounded-xl border border-white/10 p-8 max-w-md mx-4"
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${paths.find(p => p.id === selectedPath)?.color} flex items-center justify-center mx-auto mb-4`}>
                    {selectedPath === 'contributor' ? (
                      <Code className="text-white" size={32} />
                    ) : (
                      <Rocket className="text-white" size={32} />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Start as {paths.find(p => p.id === selectedPath)?.title}?
                  </h3>
                  <p className="text-gray-400 text-sm">
                    You'll get 1 year free access with your HUSE Alumni badge. You can switch paths anytime.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}