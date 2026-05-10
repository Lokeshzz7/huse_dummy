import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Check, TrendingUp, DollarSign, Users, BarChart3, Send, Rocket } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface StartupApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentReputation: number;
  onUnlock?: (method: 'merit' | 'application') => void;
}

export function StartupApplicationModal({ isOpen, onClose, currentReputation, onUnlock }: StartupApplicationModalProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    teamSize: '',
    revenue: '',
    useCase: [] as string[],
    challenges: '',
    quoteVolume: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const repNeeded = Math.max(0, 300000 - currentReputation);
  const canUnlockByMerit = currentReputation >= 300000;

  const useCases = [
    { id: 'clients', label: 'Get Clients via Quotify' },
    { id: 'funding', label: 'Raise Capital from Contributors' },
    { id: 'talent', label: 'Hire Student Talent' },
    { id: 'all', label: 'All of the Above' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.teamSize || !formData.revenue) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Application submitted! Our team will contact you within 24 hours. 🎉');
    
    setIsSubmitting(false);
    onClose();
  };

  const handleMeritUnlock = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Congratulations! You\'ve earned Startup tier for FREE (1 year)! 🏆');
    onUnlock?.('merit');
    setIsSubmitting(false);
    onClose();
  };

  const toggleUseCase = (id: string) => {
    setFormData(prev => ({
      ...prev,
      useCase: prev.useCase.includes(id) 
        ? prev.useCase.filter(c => c !== id)
        : [...prev.useCase, id]
    }));
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
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-purple-500/30 rounded-[30px] shadow-2xl"
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Building2 className="text-white" size={40} />
              </div>
              <h2 className="text-white text-[36px] font-bold mb-3 huse-gradient-gold" style={{ fontFamily: 'var(--font-display)' }}>
                Startup Tier
              </h2>
              <p className="text-gray-400 text-[16px] max-w-2xl mx-auto">
                Get unlimited clients, receive funding from contributors, and hire top student talent
              </p>
            </div>

            <div className="px-8 py-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Merit Path */}
                <motion.div
                  whileHover={{ scale: canUnlockByMerit ? 1.02 : 1 }}
                  className={`p-6 rounded-[20px] ${
                    canUnlockByMerit 
                      ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 cursor-pointer' 
                      : 'bg-white/5 border border-white/10'
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
                      <p className={`text-[14px] ${canUnlockByMerit ? 'text-green-400' : 'text-gray-400'}`}>300,000 Reputation</p>
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-white/5 rounded-[12px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-[12px]">Your Reputation</span>
                      <span className={`font-bold text-[16px] ${canUnlockByMerit ? 'text-green-400' : 'text-purple-400'}`}>
                        {currentReputation.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (currentReputation / 300000) * 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${canUnlockByMerit ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
                      />
                    </div>
                    {!canUnlockByMerit && (
                      <p className="text-amber-400 text-[12px] font-bold mt-2">{repNeeded.toLocaleString()} more needed</p>
                    )}
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className={`flex items-center gap-2 text-[14px] ${canUnlockByMerit ? 'text-green-400' : 'text-gray-500'}`}>
                      <Check size={16} />
                      <span>🎁 FREE for 1 year</span>
                    </div>
                    <div className={`flex items-center gap-2 text-[14px] ${canUnlockByMerit ? 'text-green-400' : 'text-gray-500'}`}>
                      <Check size={16} />
                      <span>Self-made entrepreneur badge</span>
                    </div>
                    <div className={`flex items-center gap-2 text-[14px] ${canUnlockByMerit ? 'text-green-400' : 'text-gray-500'}`}>
                      <Check size={16} />
                      <span>All premium features included</span>
                    </div>
                  </div>

                  <button
                    onClick={handleMeritUnlock}
                    disabled={!canUnlockByMerit || isSubmitting}
                    className={`w-full py-4 px-6 font-bold rounded-[12px] transition-all ${
                      canUnlockByMerit
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/30'
                        : 'bg-white/5 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {canUnlockByMerit ? (isSubmitting ? 'Unlocking...' : '🏆 Unlock for FREE') : '🔒 Keep Grinding'}
                  </button>
                </motion.div>

                {/* Contact Sales Path */}
                <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40 rounded-[20px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Rocket size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-[20px]" style={{ fontFamily: 'var(--font-display)' }}>For Startups</h3>
                      <p className="text-purple-400 text-[14px]">Custom Pricing</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>Unlimited Quotify requests</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>Receive funding from Contributors</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>Hire students for equity/internships</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>Advanced analytics dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>Custom branding options</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-[14px]">
                      <Check size={16} />
                      <span>Priority support</span>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-[12px] mb-4">
                    <p className="text-amber-400 text-[13px] font-bold">💡 Pricing based on your needs</p>
                    <p className="text-gray-400 text-[12px] mt-1">We'll create a custom plan for your company size and goals</p>
                  </div>

                  <p className="text-gray-400 text-[13px] text-center mb-4">Fill the form below to apply →</p>
                </div>
              </div>

              {/* Application Form */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-[20px]">
                <h4 className="text-white font-bold text-[18px] mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <Building2 size={20} className="text-purple-400" />
                  Startup Application Form
                </h4>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Company Name */}
                    <div>
                      <label className="block text-gray-400 text-[14px] mb-2">Company Name *</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g., TechCorp India"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-[12px] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                        required
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-gray-400 text-[14px] mb-2">Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yourcompany.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-[12px] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>

                    {/* Team Size */}
                    <div>
                      <label className="block text-gray-400 text-[14px] mb-2">Team Size *</label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-[12px] text-white focus:outline-none focus:border-purple-500/50"
                        required
                      >
                        <option value="">Select team size</option>
                        <option value="1-5">1-5 people</option>
                        <option value="6-20">6-20 people</option>
                        <option value="20-50">20-50 people</option>
                        <option value="50+">50+ people</option>
                      </select>
                    </div>

                    {/* Annual Revenue */}
                    <div>
                      <label className="block text-gray-400 text-[14px] mb-2">Annual Revenue *</label>
                      <select
                        value={formData.revenue}
                        onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-[12px] text-white focus:outline-none focus:border-purple-500/50"
                        required
                      >
                        <option value="">Select revenue range</option>
                        <option value="0-10L">₹0 - ₹10 Lakhs</option>
                        <option value="10L-1Cr">₹10 Lakhs - ₹1 Crore</option>
                        <option value="1Cr-10Cr">₹1 Crore - ₹10 Crores</option>
                        <option value="10Cr+">₹10 Crores+</option>
                      </select>
                    </div>
                  </div>

                  {/* Use Case */}
                  <div>
                    <label className="block text-gray-400 text-[14px] mb-3">What do you want to use the platform for?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {useCases.map(useCase => (
                        <button
                          key={useCase.id}
                          type="button"
                          onClick={() => toggleUseCase(useCase.id)}
                          className={`p-3 rounded-[12px] text-[14px] font-medium transition-all ${
                            formData.useCase.includes(useCase.id)
                              ? 'bg-purple-500/20 border-2 border-purple-500/50 text-purple-400'
                              : 'bg-white/5 border border-white/10 text-gray-400 hover:border-white/20'
                          }`}
                        >
                          {formData.useCase.includes(useCase.id) && <Check size={14} className="inline mr-1" />}
                          {useCase.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expected Quote Volume */}
                  <div>
                    <label className="block text-gray-400 text-[14px] mb-2">Expected Quote Volume (per month)</label>
                    <select
                      value={formData.quoteVolume}
                      onChange={(e) => setFormData({ ...formData, quoteVolume: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-[12px] text-white focus:outline-none focus:border-purple-500/50"
                    >
                      <option value="">Select expected volume</option>
                      <option value="0-10">0-10 quotes/month</option>
                      <option value="10-50">10-50 quotes/month</option>
                      <option value="50-100">50-100 quotes/month</option>
                      <option value="100+">100+ quotes/month</option>
                    </select>
                  </div>

                  {/* Challenges */}
                  <div>
                    <label className="block text-gray-400 text-[14px] mb-2">Current Challenges</label>
                    <textarea
                      value={formData.challenges}
                      onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                      placeholder="Tell us about your current challenges in finding clients, raising capital, or hiring talent..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-[12px] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-[12px] hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : (
                      <>
                        <Send size={20} />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-[12px]">
                    Our team will review your application and contact you within 24 hours
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
