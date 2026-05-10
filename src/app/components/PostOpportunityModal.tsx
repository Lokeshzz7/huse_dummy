import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Briefcase, DollarSign, Users, Clock, Target, Calendar,
  Zap, Shield, AlertCircle, CheckCircle, GraduationCap,
  Sparkles, TrendingUp, Award, Plus, Minus, Info
} from 'lucide-react';
import { toast } from 'sonner';

interface PostOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  onSubmit: (opportunity: OpportunityData) => void;
}

export interface OpportunityData {
  type: 'freelance' | 'equity' | 'revenue-share' | 'advisory' | 'community-support' | 'internship';
  title: string;
  description: string;
  skills: string[];
  commitment: string;
  budget?: number;
  equity?: string;
  revenueShare?: string;
  timeline: string;
  category: string;
  location: string;
  requirements: string[];
  benefits: string[];
  isPaidInternship?: boolean; // For internship type
  // Visibility controls
  visibleTo: 'dofracto-only' | 'huse-circle-only' | 'both';
  // Auto-calculated based on type
  allowCapitalRaising: boolean;
  huseCircleEligible: boolean;
  huseTierRequired?: 'bronze' | 'silver' | 'gold' | 'platinum'; // NEW: Tier requirement
}

export function PostOpportunityModal({
  isOpen,
  onClose,
  businessName,
  onSubmit
}: PostOpportunityModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OpportunityData>({
    type: 'freelance',
    title: '',
    description: '',
    skills: [],
    commitment: '',
    timeline: '',
    category: '',
    location: 'Remote',
    requirements: [''],
    benefits: [''],
    visibleTo: 'both',
    allowCapitalRaising: false,
    huseCircleEligible: true
  });

  const [skillInput, setSkillInput] = useState('');

  // Define which opportunity types are eligible for HUSE Circle
  const opportunityTypes = [
    {
      value: 'freelance',
      label: 'Freelance / Paid Gig',
      icon: Briefcase,
      color: '#24c6dc',
      huseEligible: true,
      capitalRaising: false,
      tierRequired: 'bronze',
      description: 'Paid project work with clear deliverables and timeline',
      platforms: ['Dofracto Contributors', 'HUSE Circle (All Tiers)']
    },
    {
      value: 'internship',
      label: 'Internship (Paid/Unpaid)',
      icon: GraduationCap,
      color: '#FF9900',
      huseEligible: true,
      capitalRaising: false,
      tierRequired: 'bronze',
      description: 'Internship opportunities - can be paid or unpaid',
      platforms: ['Dofracto Contributors', 'HUSE Circle (All Tiers)']
    },
    {
      value: 'equity',
      label: 'Work for Equity',
      icon: TrendingUp,
      color: '#8B5CF6',
      huseEligible: true,
      capitalRaising: true,
      tierRequired: 'gold',
      description: 'Equity-based compensation for long-term contributors',
      platforms: ['Dofracto Contributors', 'HUSE Circle (Gold Tier+)']
    },
    {
      value: 'revenue-share',
      label: 'Revenue Share Partnership',
      icon: DollarSign,
      color: '#F59E0B',
      huseEligible: true,
      capitalRaising: true,
      tierRequired: 'gold',
      description: 'Share in company revenue based on contribution',
      platforms: ['Dofracto Contributors', 'HUSE Circle (Gold Tier+)']
    },
    {
      value: 'advisory',
      label: 'Advisory / Mentorship',
      icon: Award,
      color: '#05997F',
      huseEligible: false,
      capitalRaising: false,
      tierRequired: null,
      description: 'Strategic advisory role with compensation',
      platforms: ['Dofracto Contributors Only']
    },
    {
      value: 'community-support',
      label: 'Community Support Campaign',
      icon: Sparkles,
      color: '#EC4899',
      huseEligible: false,
      capitalRaising: true,
      tierRequired: null,
      description: 'Raise capital from community supporters',
      platforms: ['Dofracto Platform Only']
    }
  ];

  const categories = [
    'Web Development', 'Mobile App Development', 'Design & Branding',
    'Marketing & SEO', 'Content Creation', 'Business Consulting',
    'Data & Analytics', 'AI & Machine Learning', 'Product Management',
    'Sales & Business Development', 'Customer Support', 'Other'
  ];

  const handleTypeChange = (type: OpportunityData['type']) => {
    const typeConfig = opportunityTypes.find(t => t.value === type);
    
    setFormData({
      ...formData,
      type,
      allowCapitalRaising: typeConfig?.capitalRaising || false,
      huseCircleEligible: typeConfig?.huseEligible || false,
      // Auto-set visibility based on eligibility
      visibleTo: typeConfig?.huseEligible ? 'both' : 'dofracto-only'
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const handleArrayChange = (field: 'requirements' | 'benefits', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'requirements' | 'benefits') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field: 'requirements' | 'benefits', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.skills.length === 0) {
      toast.error('Please add at least one required skill');
      return;
    }

    // PROTECTIVE MEASURE: Double-check HUSE Circle eligibility
    if (formData.allowCapitalRaising && formData.visibleTo !== 'dofracto-only') {
      toast.error('⚠️ Capital-raising opportunities cannot be posted to HUSE Circle');
      return;
    }

    // Success
    onSubmit(formData);
    
    const platformText = formData.huseCircleEligible 
      ? 'Dofracto Contributors and HUSE Circle Students' 
      : 'Dofracto Contributors only';
    
    toast.success('Opportunity Posted!', {
      description: `Your ${formData.type} opportunity has been posted to ${platformText}`
    });

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'freelance',
      title: '',
      description: '',
      skills: [],
      commitment: '',
      timeline: '',
      category: '',
      location: 'Remote',
      requirements: [''],
      benefits: [''],
      visibleTo: 'both',
      allowCapitalRaising: false,
      huseCircleEligible: true
    });
    setStep(1);
  };

  const selectedType = opportunityTypes.find(t => t.value === formData.type);

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
            className="bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[25px] max-w-4xl w-full my-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Post New Opportunity
                </h2>
                <p className="text-gray-400 text-sm">
                  Connect with talent across the ecosystem • Step {step} of 3
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
              {/* STEP 1: Opportunity Type */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-white text-lg font-bold mb-2">Select Opportunity Type</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Choose what type of engagement you're offering
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {opportunityTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleTypeChange(type.value as OpportunityData['type'])}
                        className={`p-5 rounded-xl border-2 transition-all text-left ${
                          formData.type === type.value
                            ? 'border-[#24c6dc] bg-[#24c6dc]/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ background: `${type.color}20`, border: `1px solid ${type.color}40` }}
                          >
                            <type.icon size={20} style={{ color: type.color }} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-bold text-sm mb-1">{type.label}</h4>
                            <p className="text-gray-400 text-xs leading-relaxed">
                              {type.description}
                            </p>
                          </div>
                        </div>

                        {/* Platform badges */}
                        <div className="flex flex-wrap gap-2">
                          {type.platforms.map((platform, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-md text-xs font-medium"
                              style={{
                                background: platform.includes('HUSE') 
                                  ? '#8B5CF620' 
                                  : '#24c6dc20',
                                color: platform.includes('HUSE') 
                                  ? '#8B5CF6' 
                                  : '#24c6dc',
                                border: `1px solid ${platform.includes('HUSE') ? '#8B5CF630' : '#24c6dc30'}`
                              }}
                            >
                              {platform.includes('HUSE') && <GraduationCap className="w-3 h-3 inline mr-1" />}
                              {platform}
                            </span>
                          ))}
                        </div>

                        {/* Warning for capital-raising */}
                        {type.capitalRaising && type.tierRequired === 'gold' && (
                          <div className="mt-3 flex items-start gap-2 p-2 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <Award className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                            <p className="text-purple-400 text-xs">
                              Requires Gold Tier on HUSE Circle to access
                            </p>
                          </div>
                        )}
                        {type.capitalRaising && !type.tierRequired && (
                          <div className="mt-3 flex items-start gap-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <Shield className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <p className="text-yellow-400 text-xs">
                              Protected: Dofracto Platform Only
                            </p>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-blue-400 font-bold mb-1">Ecosystem Protection</p>
                      <p className="text-gray-400">
                        <strong>Freelance & Internships</strong> go to all tiers. 
                        <strong> Equity/Revenue-share</strong> requires Gold Tier on HUSE Circle. 
                        <strong> Advisory roles</strong> are Dofracto-only.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Basic Details */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-white text-lg font-bold mb-2">Opportunity Details</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Provide clear information about the role or project
                    </p>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Opportunity Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Senior React Developer for SaaS Platform"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#24c6dc]/50"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the opportunity, responsibilities, and what you're looking for..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 resize-none"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Required Skills <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        placeholder="Type skill and press Enter"
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                      />
                      <button
                        onClick={addSkill}
                        className="px-4 py-2 bg-[#24c6dc]/20 border border-[#24c6dc]/40 rounded-lg text-[#24c6dc] hover:bg-[#24c6dc]/30 transition-all"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#24c6dc]/20 border border-[#24c6dc]/40 rounded-full text-[#24c6dc] text-sm flex items-center gap-2"
                        >
                          {skill}
                          <button onClick={() => removeSkill(skill)}>
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Compensation based on type */}
                  {formData.type === 'freelance' && (
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Budget (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.budget || ''}
                        onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                        placeholder="e.g. 50000"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                      />
                    </div>
                  )}

                  {formData.type === 'internship' && (
                    <div className="space-y-4">
                      {/* Paid/Unpaid Toggle */}
                      <div>
                        <label className="block text-white font-medium mb-3 text-sm">
                          Internship Type <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, isPaidInternship: true })}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.isPaidInternship
                                ? 'border-[#24c6dc] bg-[#24c6dc]/10'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                          >
                            <DollarSign className={`w-6 h-6 mx-auto mb-2 ${formData.isPaidInternship ? 'text-[#24c6dc]' : 'text-gray-400'}`} />
                            <p className={`text-sm font-bold ${formData.isPaidInternship ? 'text-white' : 'text-gray-400'}`}>
                              Paid Internship
                            </p>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, isPaidInternship: false, budget: undefined })}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.isPaidInternship === false
                                ? 'border-[#24c6dc] bg-[#24c6dc]/10'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                          >
                            <GraduationCap className={`w-6 h-6 mx-auto mb-2 ${formData.isPaidInternship === false ? 'text-[#24c6dc]' : 'text-gray-400'}`} />
                            <p className={`text-sm font-bold ${formData.isPaidInternship === false ? 'text-white' : 'text-gray-400'}`}>
                              Unpaid Internship
                            </p>
                          </button>
                        </div>
                      </div>

                      {/* Stipend field if paid */}
                      {formData.isPaidInternship && (
                        <div>
                          <label className="block text-white font-medium mb-2 text-sm">
                            Monthly Stipend (₹)
                          </label>
                          <input
                            type="number"
                            value={formData.budget || ''}
                            onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                            placeholder="e.g. 15000"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {formData.type === 'equity' && (
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Equity Offered (%)
                      </label>
                      <input
                        type="text"
                        value={formData.equity || ''}
                        onChange={(e) => setFormData({ ...formData, equity: e.target.value })}
                        placeholder="e.g. 0.5-1%"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                      />
                    </div>
                  )}

                  {formData.type === 'revenue-share' && (
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Revenue Share (%)
                      </label>
                      <input
                        type="text"
                        value={formData.revenueShare || ''}
                        onChange={(e) => setFormData({ ...formData, revenueShare: e.target.value })}
                        placeholder="e.g. 5-10%"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                      />
                    </div>
                  )}

                  {/* Commitment & Timeline */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Time Commitment
                      </label>
                      <input
                        type="text"
                        value={formData.commitment}
                        onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
                        placeholder="e.g. 20 hrs/week"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Timeline
                      </label>
                      <input
                        type="text"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        placeholder="e.g. 3 months"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Remote / City"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Requirements & Benefits */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-white text-lg font-bold mb-2">Additional Details</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Define requirements and benefits for candidates
                    </p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Requirements
                    </label>
                    {formData.requirements.map((req, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => handleArrayChange('requirements', idx, e.target.value)}
                          placeholder="e.g. 3+ years experience with React"
                          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                        />
                        {formData.requirements.length > 1 && (
                          <button
                            onClick={() => removeArrayItem('requirements', idx)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Minus size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem('requirements')}
                      className="text-[#24c6dc] text-sm flex items-center gap-1 hover:text-[#05997F] transition-colors"
                    >
                      <Plus size={16} /> Add requirement
                    </button>
                  </div>

                  {/* Benefits */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Benefits & Perks
                    </label>
                    {formData.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => handleArrayChange('benefits', idx, e.target.value)}
                          placeholder="e.g. Flexible working hours"
                          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                        />
                        {formData.benefits.length > 1 && (
                          <button
                            onClick={() => removeArrayItem('benefits', idx)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Minus size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem('benefits')}
                      className="text-[#24c6dc] text-sm flex items-center gap-1 hover:text-[#05997F] transition-colors"
                    >
                      <Plus size={16} /> Add benefit
                    </button>
                  </div>

                  {/* Visibility Summary */}
                  <div className="bg-gradient-to-r from-[#24c6dc]/10 to-[#8B5CF6]/10 border border-[#24c6dc]/30 rounded-xl p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#24c6dc]/20 border border-[#24c6dc]/40 flex items-center justify-center flex-shrink-0">
                        {selectedType && <selectedType.icon size={20} style={{ color: selectedType.color }} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold mb-1">Posting Summary</h4>
                        <p className="text-gray-400 text-sm">
                          {formData.title || 'Untitled Opportunity'} • {selectedType?.label}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Visible to:</span>
                        <span className="text-white font-bold">
                          {formData.huseCircleEligible 
                            ? 'Dofracto + HUSE Circle' 
                            : 'Dofracto Contributors Only'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Capital Raising:</span>
                        <span className={`font-bold ${formData.allowCapitalRaising ? 'text-yellow-400' : 'text-green-400'}`}>
                          {formData.allowCapitalRaising ? 'Yes (Protected)' : 'No'}
                        </span>
                      </div>
                      {formData.huseCircleEligible && (
                        <div className="flex items-center gap-2 mt-3 p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-xs">
                            This opportunity is safe for HUSE Circle students
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-white/10">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6 py-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Sparkles size={18} />
                    Post Opportunity
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