import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, DollarSign, FileText, Clock, Briefcase, Award,
  CheckCircle, AlertCircle, Paperclip, Calendar, Plus, Minus
} from 'lucide-react';
import { toast } from 'sonner';

interface SubmitQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteRequest: {
    id: number;
    serviceType: string;
    requesterName: string;
    budget: string;
    description: string;
  };
  onSubmit: (quoteData: QuoteSubmissionData) => void;
}

export interface QuoteSubmissionData {
  quotedPrice: number;
  proposal: string;
  timeline: string;
  deliverables: string[];
  whyChooseUs: string;
  termsAndConditions: string;
  portfolioLinks: string[];
  experienceYears?: number;
  guarantees?: string;
}

export function SubmitQuoteModal({
  isOpen,
  onClose,
  quoteRequest,
  onSubmit
}: SubmitQuoteModalProps) {
  const [formData, setFormData] = useState<QuoteSubmissionData>({
    quotedPrice: 0,
    proposal: '',
    timeline: '',
    deliverables: [''],
    whyChooseUs: '',
    termsAndConditions: '',
    portfolioLinks: [''],
    experienceYears: undefined,
    guarantees: ''
  });

  const [step, setStep] = useState(1);

  const handleDeliverableChange = (index: number, value: string) => {
    const newDeliverables = [...formData.deliverables];
    newDeliverables[index] = value;
    setFormData({ ...formData, deliverables: newDeliverables });
  };

  const addDeliverable = () => {
    setFormData({ ...formData, deliverables: [...formData.deliverables, ''] });
  };

  const removeDeliverable = (index: number) => {
    setFormData({
      ...formData,
      deliverables: formData.deliverables.filter((_, i) => i !== index)
    });
  };

  const handlePortfolioLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.portfolioLinks];
    newLinks[index] = value;
    setFormData({ ...formData, portfolioLinks: newLinks });
  };

  const addPortfolioLink = () => {
    setFormData({ ...formData, portfolioLinks: [...formData.portfolioLinks, ''] });
  };

  const removePortfolioLink = (index: number) => {
    setFormData({
      ...formData,
      portfolioLinks: formData.portfolioLinks.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.quotedPrice || formData.quotedPrice <= 0) {
      toast.error('Please enter a valid quoted price');
      return;
    }

    if (!formData.proposal.trim()) {
      toast.error('Please provide a proposal description');
      return;
    }

    if (!formData.whyChooseUs.trim()) {
      toast.error('Please explain why the client should choose you');
      return;
    }

    if (!formData.timeline.trim()) {
      toast.error('Please provide an estimated timeline');
      return;
    }

    const validDeliverables = formData.deliverables.filter(d => d.trim());
    if (validDeliverables.length === 0) {
      toast.error('Please add at least one deliverable');
      return;
    }

    // Submit the quote
    onSubmit({
      ...formData,
      deliverables: validDeliverables,
      portfolioLinks: formData.portfolioLinks.filter(link => link.trim())
    });

    toast.success('Quote Submitted Successfully!', {
      description: `Your quote for ${quoteRequest.serviceType} has been sent to ${quoteRequest.requesterName}`
    });

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      quotedPrice: 0,
      proposal: '',
      timeline: '',
      deliverables: [''],
      whyChooseUs: '',
      termsAndConditions: '',
      portfolioLinks: [''],
      experienceYears: undefined,
      guarantees: ''
    });
    setStep(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[25px] max-w-3xl w-full my-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Submit Your Quote
                </h2>
                <p className="text-gray-400 text-sm">
                  For: {quoteRequest.serviceType} • Step {step} of 3
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 pt-4">
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-1.5 rounded-full transition-all ${
                      s <= step ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F]' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              {/* STEP 1: Pricing & Timeline */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-white text-lg font-bold mb-2">Pricing & Timeline</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Provide your pricing and estimated delivery time
                    </p>
                  </div>

                  {/* Client Budget Reference */}
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-purple-400 font-bold text-sm mb-1">Client's Budget Range</p>
                        <p className="text-white font-bold">{quoteRequest.budget}</p>
                        <p className="text-gray-400 text-xs mt-1">Use this as a reference for your quote</p>
                      </div>
                    </div>
                  </div>

                  {/* Quoted Price */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Your Quoted Price <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                      <input
                        type="number"
                        value={formData.quotedPrice || ''}
                        onChange={(e) => setFormData({ ...formData, quotedPrice: Number(e.target.value) })}
                        placeholder="50000"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter the total project cost</p>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Estimated Timeline <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        placeholder="e.g., 4-6 weeks"
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                      />
                    </div>
                  </div>

                  {/* Experience Years (Optional) */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Years of Experience (Optional)
                    </label>
                    <input
                      type="number"
                      value={formData.experienceYears || ''}
                      onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) || undefined })}
                      placeholder="e.g., 5"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Proposal & Why Choose Us */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-white text-lg font-bold mb-2">Your Proposal</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Explain your approach and why you're the best fit
                    </p>
                  </div>

                  {/* Project Description Reference */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-blue-400 font-bold text-sm mb-1">Client's Requirements</p>
                        <p className="text-gray-300 text-sm">{quoteRequest.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Proposal */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Project Proposal <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={formData.proposal}
                      onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                      placeholder="Describe your approach, methodology, and how you plan to execute this project..."
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 resize-none"
                    />
                  </div>

                  {/* Why Choose Us */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Why Should They Choose You? <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={formData.whyChooseUs}
                      onChange={(e) => setFormData({ ...formData, whyChooseUs: e.target.value })}
                      placeholder="Highlight your unique strengths, past successes, expertise, and what sets you apart from competitors..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 resize-none"
                    />
                  </div>

                  {/* Guarantees (Optional) */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Guarantees / Warranties (Optional)
                    </label>
                    <textarea
                      value={formData.guarantees || ''}
                      onChange={(e) => setFormData({ ...formData, guarantees: e.target.value })}
                      placeholder="e.g., Free revisions, money-back guarantee, post-launch support..."
                      rows={2}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Deliverables & Portfolio */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-white text-lg font-bold mb-2">Deliverables & Portfolio</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      List what you'll deliver and showcase your work
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Project Deliverables <span className="text-red-400">*</span>
                    </label>
                    <div className="space-y-2">
                      {formData.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="relative flex-1">
                            <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={deliverable}
                              onChange={(e) => handleDeliverableChange(index, e.target.value)}
                              placeholder="e.g., Fully functional mobile app"
                              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                            />
                          </div>
                          {formData.deliverables.length > 1 && (
                            <button
                              onClick={() => removeDeliverable(index)}
                              className="px-3 py-2.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addDeliverable}
                        className="w-full px-4 py-2.5 bg-[#24c6dc]/10 border border-[#24c6dc]/30 rounded-lg text-[#24c6dc] hover:bg-[#24c6dc]/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Deliverable
                      </button>
                    </div>
                  </div>

                  {/* Portfolio Links */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Portfolio Links (Optional)
                    </label>
                    <div className="space-y-2">
                      {formData.portfolioLinks.map((link, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="relative flex-1">
                            <Paperclip className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="url"
                              value={link}
                              onChange={(e) => handlePortfolioLinkChange(index, e.target.value)}
                              placeholder="https://portfolio.com/project"
                              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                            />
                          </div>
                          {formData.portfolioLinks.length > 1 && (
                            <button
                              onClick={() => removePortfolioLink(index)}
                              className="px-3 py-2.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addPortfolioLink}
                        className="w-full px-4 py-2.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Portfolio Link
                      </button>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Terms & Conditions (Optional)
                    </label>
                    <textarea
                      value={formData.termsAndConditions}
                      onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.value })}
                      placeholder="Specify payment terms, revision policy, cancellation terms, etc..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 resize-none"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-green-400 font-bold mb-1">Ready to Submit</p>
                      <p className="text-gray-400">
                        Review all details before submitting. The client will receive your quote and can accept or negotiate.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-2">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                
                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-lg text-white font-medium hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-lg text-white font-medium hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Submit Quote
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
