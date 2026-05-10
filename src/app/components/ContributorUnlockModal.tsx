import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Zap, TrendingUp, Users, Shield, CreditCard, Calendar } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ContributorUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentReputation: number;
  onUnlock: (method: 'merit' | 'payment') => void;
  isFreeAlumni?: boolean; // Platinum students get 1 year free
}

export function ContributorUnlockModal({ isOpen, onClose, currentReputation, onUnlock, isFreeAlumni = false }: ContributorUnlockModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'yearly'>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);

  const repNeeded = Math.max(0, 100000 - currentReputation);
  const canUnlockByMerit = currentReputation >= 100000;

  const handleUnlock = async (method: 'merit' | 'payment') => {
    setIsProcessing(true);
    
    // Simulate payment/verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (method === 'payment') {
      toast.success('Payment successful! Welcome to Contributor tier! 🎉');
    } else {
      toast.success('Congratulations! You\'ve unlocked Contributor tier through merit! 🏆');
    }
    
    onUnlock(method);
    setIsProcessing(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-purple-500/30 rounded-[30px] shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all z-10"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="p-8 pb-0 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="text-white" size={40} />
              </div>
              <h2 className="text-white text-[36px] font-bold mb-3 huse-gradient-gold" style={{ fontFamily: 'var(--font-display)' }}>
                Unlock Contributor Tier
              </h2>
              <p className="text-gray-400 text-[16px] max-w-2xl mx-auto">
                Join as a Contributor to earn from services, support startups, and mentor the next generation
              </p>
            </div>

            {/* Current Status */}
            {!isFreeAlumni && (
              <div className="px-8 py-6">
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-[20px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-[14px]">Your Reputation</span>
                    <span className="text-purple-400 font-bold text-[18px]">{currentReputation.toLocaleString()}</span>
                  </div>
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (currentReputation / 100000) * 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-500 text-[12px]">100,000 Rep Required</span>
                    {!canUnlockByMerit && (
                      <span className="text-amber-400 text-[12px] font-bold">{repNeeded.toLocaleString()} more needed</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Unlock Options */}
            <div className="px-8 pb-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Merit Path */}
                {isFreeAlumni ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/40 rounded-[20px] cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <Shield size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-[20px]" style={{ fontFamily: 'var(--font-display)' }}>Alumni Bonus</h3>
                        <p className="text-amber-400 text-[14px] font-bold">🎁 FREE for 1 Year</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-green-400 text-[14px]">
                        <Check size={16} />
                        <span>Platinum tier achievement reward</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400 text-[14px]">
                        <Check size={16} />
                        <span>₹499 value - completely free</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400 text-[14px]">
                        <Check size={16} />
                        <span>All Contributor benefits included</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400 text-[14px]">
                        <Check size={16} />
                        <span>After 1 year: ₹499/year or maintain 100K rep</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleUnlock('merit')}
                      disabled={isProcessing}
                      className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-[12px] hover:shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Activating...' : '🎁 Claim Free Access'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: canUnlockByMerit ? 1.02 : 1 }}
                    className={`p-6 rounded-[20px] ${
                      canUnlockByMerit 
                        ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 cursor-pointer' 
                        : 'bg-white/5 border border-white/10 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        canUnlockByMerit 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                          : 'bg-white/10'
                      }`}>
                        <TrendingUp size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-[20px]" style={{ fontFamily: 'var(--font-display)' }}>Earn It</h3>
                        <p className="text-gray-400 text-[14px]">100,000 Reputation</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className={`flex items-center gap-2 text-[14px] ${canUnlockByMerit ? 'text-green-400' : 'text-gray-500'}`}>
                        <Check size={16} />
                        <span>Unlock through merit</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[14px] ${canUnlockByMerit ? 'text-green-400' : 'text-gray-500'}`}>
                        <Check size={16} />
                        <span>Free forever (no subscription)</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[14px] ${canUnlockByMerit ? 'text-green-400' : 'text-gray-500'}`}>
                        <Check size={16} />
                        <span>Proven track record badge</span>
                      </div>
                      {!canUnlockByMerit && (
                        <div className="flex items-center gap-2 text-amber-400 text-[14px] font-bold">
                          <Zap size={16} />
                          <span>{repNeeded.toLocaleString()} more rep needed</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => canUnlockByMerit && handleUnlock('merit')}
                      disabled={!canUnlockByMerit || isProcessing}
                      className={`w-full py-4 px-6 font-bold rounded-[12px] transition-all ${
                        canUnlockByMerit
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/30'
                          : 'bg-white/5 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {canUnlockByMerit ? (isProcessing ? 'Unlocking...' : '🏆 Unlock with Merit') : '🔒 Keep Earning Rep'}
                    </button>
                  </motion.div>
                )}

                {/* Payment Path */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40 rounded-[20px] cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <CreditCard size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-[20px]" style={{ fontFamily: 'var(--font-display)' }}>Fast Track</h3>
                      <p className="text-purple-400 text-[14px] font-bold">₹499/year</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>Instant access to all features</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>Start with 32,000 reputation</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>10 Quotify quotes/week</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>Support Dofracto startups</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>Mentor students & post internships</span>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-white/5 rounded-[12px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-[12px]">Billing</span>
                      <span className="text-purple-400 text-[14px] font-bold">Yearly</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-[24px]">₹499</span>
                      <span className="text-gray-500 text-[12px]">₹41.58/month</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUnlock('payment')}
                    disabled={isProcessing}
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-[12px] hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? 'Processing...' : (
                      <>
                        <CreditCard size={20} />
                        <span>Unlock for ₹499/year</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-[11px] mt-3">
                    <Calendar size={12} className="inline mr-1" />
                    Auto-renews yearly • Cancel anytime
                  </p>
                </motion.div>
              </div>

              {/* Benefits Summary */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-[20px]">
                <h4 className="text-white font-bold text-[18px] mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <Users size={20} className="text-purple-400" />
                  What You Get as a Contributor
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-purple-400 font-bold text-[14px]">💼 Quotify</p>
                    <p className="text-gray-400 text-[12px]">Respond to 10 quote requests per week and earn from your services</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-purple-400 font-bold text-[14px]">🚀 Dofracto</p>
                    <p className="text-gray-400 text-[12px]">Support promising startups and get participation benefits</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-purple-400 font-bold text-[14px]">🎓 HUSE Circle</p>
                    <p className="text-gray-400 text-[12px]">Mentor students and post internship opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}