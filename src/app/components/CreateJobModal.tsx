import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Briefcase, MapPin, DollarSign, Globe, Building2,
  Users, Calendar, Award, Target, Plus, Trash2, ChevronDown,
  CheckCircle, AlertCircle, Sparkles, Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { JobType, JobMode, ExperienceLevel } from '../data/jobsData';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: any) => void;
}

export function CreateJobModal({ isOpen, onClose, onSubmit }: CreateJobModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    company: 'TechCorp India', // Pre-filled with recruiter company
    companyLogo: '🚀',
    location: '',
    type: 'Full-Time' as JobType,
    mode: 'Hybrid' as JobMode,
    salary: '',
    experience: 'Entry Level' as ExperienceLevel,
    description: '',
    responsibilities: [''],
    requirements: [''],
    skills: [''],
    benefits: [''],
    deadline: '',
    openings: 1,
    visibleTo: ['huse-circle'] as ('huse-circle' | 'dofracto')[],
    tierRequirement: 'Bronze' as 'Bronze' | 'Silver' | 'Gold' | 'Platinum',
    minCGPA: 6.0,
    featured: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const jobTypes: JobType[] = ['Full-Time', 'Internship', 'Part-Time', 'Contract', 'Freelance'];
  const jobModes: JobMode[] = ['Remote', 'Hybrid', 'On-site'];
  const experienceLevels: ExperienceLevel[] = ['Student', 'Entry Level', 'Mid Level', 'Senior Level'];
  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];

  const companyLogos = ['🚀', '💼', '🏢', '💡', '⚡', '🎯', '🔥', '✨', '🌟', '💻', '🤖', '🎨', '📱', '☁️', '🧠'];

  const handleAddItem = (field: 'responsibilities' | 'requirements' | 'skills' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveItem = (field: 'responsibilities' | 'requirements' | 'skills' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleUpdateItem = (field: 'responsibilities' | 'requirements' | 'skills' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const togglePlatform = (platform: 'huse-circle' | 'dofracto') => {
    setFormData(prev => {
      const newVisibleTo = prev.visibleTo.includes(platform)
        ? prev.visibleTo.filter(p => p !== platform)
        : [...prev.visibleTo, platform];
      
      // Must have at least one platform selected
      if (newVisibleTo.length === 0) {
        toast.error('Job must be visible on at least one platform');
        return prev;
      }
      
      return { ...prev, visibleTo: newVisibleTo };
    });
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary range is required';
    if (!formData.deadline) newErrors.deadline = 'Application deadline is required';
    if (formData.openings < 1) newErrors.openings = 'At least 1 opening required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    
    const validResponsibilities = formData.responsibilities.filter(r => r.trim());
    if (validResponsibilities.length === 0) newErrors.responsibilities = 'At least one responsibility required';
    
    const validRequirements = formData.requirements.filter(r => r.trim());
    if (validRequirements.length === 0) newErrors.requirements = 'At least one requirement required';
    
    const validSkills = formData.skills.filter(s => s.trim());
    if (validSkills.length === 0) newErrors.skills = 'At least one skill required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = () => {
    if (!validateStep2()) return;

    // Clean up empty items
    const cleanedData = {
      ...formData,
      responsibilities: formData.responsibilities.filter(r => r.trim()),
      requirements: formData.requirements.filter(r => r.trim()),
      skills: formData.skills.filter(s => s.trim()),
      benefits: formData.benefits.filter(b => b.trim())
    };

    onSubmit(cleanedData);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: 'TechCorp India',
      companyLogo: '🚀',
      location: '',
      type: 'Full-Time',
      mode: 'Hybrid',
      salary: '',
      experience: 'Entry Level',
      description: '',
      responsibilities: [''],
      requirements: [''],
      skills: [''],
      benefits: [''],
      deadline: '',
      openings: 1,
      visibleTo: ['huse-circle'],
      tierRequirement: 'Bronze',
      minCGPA: 6.0,
      featured: false
    });
    setStep(1);
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#0F0F0F] border border-purple-500/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Briefcase className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold">Post New Job</h2>
                <p className="text-gray-400 text-sm">Fill in the details to create a job posting</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`flex-1 h-2 rounded-full transition-all ${
                  step >= s ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700'
                }`} />
                {s < 3 && <ChevronDown className="text-gray-600 rotate-[-90deg]" size={16} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span className={step >= 1 ? 'text-purple-400' : 'text-gray-500'}>Basic Info</span>
            <span className={step >= 2 ? 'text-purple-400' : 'text-gray-500'}>Details</span>
            <span className={step >= 3 ? 'text-purple-400' : 'text-gray-500'}>Settings</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Job Title */}
                <div>
                  <label className="text-white font-bold text-sm mb-2 block">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Senior Full-Stack Developer"
                    className={`w-full px-4 py-3 bg-[#1A1A1A] border ${
                      errors.title ? 'border-red-500' : 'border-purple-500/20'
                    } rounded-xl text-white placeholder-gray-600 focus:border-purple-500/40 outline-none`}
                  />
                  {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                </div>

                {/* Company & Logo */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-bold text-sm mb-2 block">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-white font-bold text-sm mb-2 block">
                      Company Logo
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {companyLogos.map((logo) => (
                        <button
                          key={logo}
                          onClick={() => setFormData({ ...formData, companyLogo: logo })}
                          className={`text-3xl p-2 rounded-xl transition-all flex-shrink-0 ${
                            formData.companyLogo === logo
                              ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-purple-500'
                              : 'bg-[#1A1A1A] border border-purple-500/20 hover:border-purple-500/40'
                          }`}
                        >
                          {logo}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-bold text-sm mb-2 block">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Bangalore, India"
                      className={`w-full px-4 py-3 bg-[#1A1A1A] border ${
                        errors.location ? 'border-red-500' : 'border-purple-500/20'
                      } rounded-xl text-white placeholder-gray-600 focus:border-purple-500/40 outline-none`}
                    />
                    {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location}</p>}
                  </div>
                  <div>
                    <label className="text-white font-bold text-sm mb-2 block">
                      Job Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as JobType })}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                    >
                      {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mode & Experience */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-bold text-sm mb-2 block">
                      Work Mode *
                    </label>
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value as JobMode })}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                    >
                      {jobModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-white font-bold text-sm mb-2 block">
                      Experience Level *
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value as ExperienceLevel })}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                    >
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Salary & Openings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-bold text-sm mb-2 block">
                      Salary Range *
                    </label>
                    <input
                      type="text"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder="e.g. ₹8-12 LPA"
                      className={`w-full px-4 py-3 bg-[#1A1A1A] border ${
                        errors.salary ? 'border-red-500' : 'border-purple-500/20'
                      } rounded-xl text-white placeholder-gray-600 focus:border-purple-500/40 outline-none`}
                    />
                    {errors.salary && <p className="text-red-400 text-xs mt-1">{errors.salary}</p>}
                  </div>
                  <div>
                    <label className="text-white font-bold text-sm mb-2 block">
                      Number of Openings *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.openings}
                      onChange={(e) => setFormData({ ...formData, openings: parseInt(e.target.value) || 1 })}
                      className={`w-full px-4 py-3 bg-[#1A1A1A] border ${
                        errors.openings ? 'border-red-500' : 'border-purple-500/20'
                      } rounded-xl text-white focus:border-purple-500/40 outline-none`}
                    />
                    {errors.openings && <p className="text-red-400 text-xs mt-1">{errors.openings}</p>}
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label className="text-white font-bold text-sm mb-2 block">
                    Application Deadline *
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 bg-[#1A1A1A] border ${
                      errors.deadline ? 'border-red-500' : 'border-purple-500/20'
                    } rounded-xl text-white focus:border-purple-500/40 outline-none`}
                  />
                  {errors.deadline && <p className="text-red-400 text-xs mt-1">{errors.deadline}</p>}
                </div>
              </motion.div>
            )}

            {/* Step 2: Job Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Description */}
                <div>
                  <label className="text-white font-bold text-sm mb-2 block">
                    Job Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the role, company culture, and what makes this opportunity exciting..."
                    rows={4}
                    className={`w-full px-4 py-3 bg-[#1A1A1A] border ${
                      errors.description ? 'border-red-500' : 'border-purple-500/20'
                    } rounded-xl text-white placeholder-gray-600 focus:border-purple-500/40 outline-none resize-none`}
                  />
                  {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Responsibilities */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-bold text-sm">
                      Responsibilities *
                    </label>
                    <button
                      onClick={() => handleAddItem('responsibilities')}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-all"
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                  {formData.responsibilities.map((resp, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => handleUpdateItem('responsibilities', index, e.target.value)}
                        placeholder="e.g. Develop and maintain web applications"
                        className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 rounded-lg text-white text-sm placeholder-gray-600 focus:border-purple-500/40 outline-none"
                      />
                      {formData.responsibilities.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem('responsibilities', index)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {errors.responsibilities && <p className="text-red-400 text-xs mt-1">{errors.responsibilities}</p>}
                </div>

                {/* Requirements */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-bold text-sm">
                      Requirements *
                    </label>
                    <button
                      onClick={() => handleAddItem('requirements')}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-all"
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleUpdateItem('requirements', index, e.target.value)}
                        placeholder="e.g. Bachelor's degree in Computer Science"
                        className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 rounded-lg text-white text-sm placeholder-gray-600 focus:border-purple-500/40 outline-none"
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem('requirements', index)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {errors.requirements && <p className="text-red-400 text-xs mt-1">{errors.requirements}</p>}
                </div>

                {/* Skills */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-bold text-sm">
                      Required Skills *
                    </label>
                    <button
                      onClick={() => handleAddItem('skills')}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-all"
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleUpdateItem('skills', index, e.target.value)}
                        placeholder="e.g. React, Node.js, TypeScript"
                        className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 rounded-lg text-white text-sm placeholder-gray-600 focus:border-purple-500/40 outline-none"
                      />
                      {formData.skills.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem('skills', index)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {errors.skills && <p className="text-red-400 text-xs mt-1">{errors.skills}</p>}
                </div>

                {/* Benefits */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-bold text-sm">
                      Benefits (Optional)
                    </label>
                    <button
                      onClick={() => handleAddItem('benefits')}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-all"
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleUpdateItem('benefits', index, e.target.value)}
                        placeholder="e.g. Health insurance, Flexible work hours"
                        className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 rounded-lg text-white text-sm placeholder-gray-600 focus:border-purple-500/40 outline-none"
                      />
                      <button
                        onClick={() => handleRemoveItem('benefits', index)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Visibility & Settings */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Platform Visibility */}
                <div>
                  <label className="text-white font-bold text-sm mb-3 block">
                    Platform Visibility *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => togglePlatform('huse-circle')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.visibleTo.includes('huse-circle')
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-[#1A1A1A] border-purple-500/20 text-gray-400 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🎓</span>
                        {formData.visibleTo.includes('huse-circle') && (
                          <CheckCircle className="text-purple-400" size={20} />
                        )}
                      </div>
                      <p className="font-bold">HUSE Circle</p>
                      <p className="text-xs text-gray-500">Student Network</p>
                    </button>

                    <button
                      onClick={() => togglePlatform('dofracto')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.visibleTo.includes('dofracto')
                          ? 'bg-cyan-500/20 border-cyan-500 text-white'
                          : 'bg-[#1A1A1A] border-purple-500/20 text-gray-400 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🚀</span>
                        {formData.visibleTo.includes('dofracto') && (
                          <CheckCircle className="text-cyan-400" size={20} />
                        )}
                      </div>
                      <p className="font-bold">Dofracto</p>
                      <p className="text-xs text-gray-500">Contributors</p>
                    </button>
                  </div>
                </div>

                {/* Tier Requirement */}
                {formData.visibleTo.includes('huse-circle') && (
                  <div>
                    <label className="text-white font-bold text-sm mb-2 block">
                      Minimum Tier Requirement (HUSE Circle)
                    </label>
                    <select
                      value={formData.tierRequirement}
                      onChange={(e) => setFormData({ ...formData, tierRequirement: e.target.value as any })}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                    >
                      {tiers.map(tier => (
                        <option key={tier} value={tier}>{tier}</option>
                      ))}
                    </select>
                    <p className="text-gray-500 text-xs mt-1">
                      Students below this tier won't see this job posting
                    </p>
                  </div>
                )}

                {/* Min CGPA */}
                {formData.visibleTo.includes('huse-circle') && (
                  <div>
                    <label className="text-white font-bold text-sm mb-2 block">
                      Minimum CGPA (HUSE Circle)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={formData.minCGPA}
                      onChange={(e) => setFormData({ ...formData, minCGPA: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Filter students by minimum CGPA requirement
                    </p>
                  </div>
                )}

                {/* Featured */}
                <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="text-amber-400" size={18} />
                        <label className="text-white font-bold text-sm">
                          Featured Job Posting
                        </label>
                      </div>
                      <p className="text-gray-400 text-xs mb-3">
                        Make your job stand out with a featured badge and higher visibility
                      </p>
                      <button
                        onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.featured
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
                            : 'bg-[#1A1A1A] border border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                        }`}
                      >
                        {formData.featured ? '⭐ Featured' : 'Make Featured'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-[#1A1A1A] border border-purple-500/20 rounded-xl p-4">
                  <p className="text-gray-400 text-xs mb-3">Job Preview:</p>
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{formData.companyLogo}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold">{formData.title || 'Job Title'}</h3>
                      <p className="text-purple-400 text-sm">{formData.company}</p>
                      <div className="flex gap-3 text-xs text-gray-500 mt-2">
                        <span>📍 {formData.location || 'Location'}</span>
                        <span>💼 {formData.type}</span>
                        <span>💰 {formData.salary || 'Salary'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-purple-500/20 bg-[#0F0F0F]">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else onClose();
              }}
              className="px-6 py-3 bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40 rounded-xl font-medium transition-all"
            >
              {step > 1 ? 'Back' : 'Cancel'}
            </button>

            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">Step {step} of 3</span>
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  <CheckCircle size={20} />
                  Publish Job
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
