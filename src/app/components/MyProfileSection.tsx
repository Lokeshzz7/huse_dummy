import { useState } from 'react';
import { motion } from 'motion/react';
import {
  User, Mail, Phone, Building2, MapPin, Globe, Linkedin,
  Upload, Save, Edit3, CheckCircle, Briefcase, FileText,
  Shield, Award, Calendar, Tag
} from 'lucide-react';
import { toast } from 'sonner';

export interface BusinessProfile {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  
  // Company Info
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  linkedinUrl?: string;
  location: string;
  industry: string;
  companySize: string;
  founded: string;
  
  // Bio
  bio: string;
  
  // Verification
  isVerified: boolean;
  verificationDate?: string;
}

interface MyProfileSectionProps {
  businessProfile: BusinessProfile;
  setBusinessProfile: (profile: BusinessProfile) => void;
}

export function MyProfileSection({ businessProfile, setBusinessProfile }: MyProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BusinessProfile>(businessProfile);

  const handleSave = () => {
    // Validation
    if (!formData.name || !formData.email || !formData.companyName) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setBusinessProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(businessProfile);
    setIsEditing(false);
  };

  const handleImageUpload = (field: 'avatar' | 'companyLogo') => {
    // Simulate file upload
    const fakeImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      field === 'avatar' ? formData.name : formData.companyName
    )}&size=200&background=24c6dc&color=fff`;
    
    setFormData({ ...formData, [field]: fakeImageUrl });
    toast.success(`${field === 'avatar' ? 'Profile' : 'Company'} photo uploaded!`);
  };

  const industryCategoriesOptions = [
    'Technology', 'E-commerce', 'Healthcare', 'Education', 'Finance',
    'Real Estate', 'Manufacturing', 'Retail', 'Food & Beverage',
    'Media & Entertainment', 'Consulting', 'Other'
  ];

  const companySizeOptions = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your business profile and account settings</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Overview Card */}
      <div className="bg-gradient-to-br from-[#24c6dc]/10 to-[#05997F]/10 border border-[#24c6dc]/30 rounded-2xl p-8">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
              {formData.avatar ? (
                <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" />
              ) : (
                formData.name.charAt(0).toUpperCase()
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => handleImageUpload('avatar')}
                className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Upload className="w-6 h-6 text-white" />
              </button>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">{businessProfile.name}</h2>
              {businessProfile.isVerified && (
                <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-xs font-bold">Verified</span>
                </div>
              )}
            </div>
            <p className="text-[#24c6dc] font-bold mb-1">{businessProfile.companyName}</p>
            <p className="text-gray-400 text-sm mb-4">{businessProfile.email}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              {businessProfile.location && (
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {businessProfile.location}
                </div>
              )}
              {businessProfile.industry && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Tag className="w-4 h-4" />
                  {businessProfile.industry}
                </div>
              )}
              {businessProfile.founded && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  Founded {businessProfile.founded}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Sections */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#24c6dc]/20 border border-[#24c6dc]/40 flex items-center justify-center">
              <User className="w-5 h-5 text-[#24c6dc]" />
            </div>
            <h3 className="text-white text-lg font-bold">Personal Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#24c6dc]/20 border border-[#24c6dc]/40 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#24c6dc]" />
            </div>
            <h3 className="text-white text-lg font-bold">Company Information</h3>
          </div>

          <div className="space-y-4">
            {/* Company Logo */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Company Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  {formData.companyLogo ? (
                    <img src={formData.companyLogo} alt={formData.companyName} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => handleImageUpload('companyLogo')}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[#24c6dc]/50 rounded-lg transition-all text-sm flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Upload Logo
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Company Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Industry</label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Industry</option>
                {industryCategoriesOptions.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Company Size</label>
              <select
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Company Size</option>
                {companySizeOptions.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#24c6dc]/20 border border-[#24c6dc]/40 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#24c6dc]" />
          </div>
          <h3 className="text-white text-lg font-bold">Additional Details</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={!isEditing}
                placeholder="e.g. Bangalore, India"
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Founded Year</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.founded}
                onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                disabled={!isEditing}
                placeholder="e.g. 2020"
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.companyWebsite}
                onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                disabled={!isEditing}
                placeholder="https://yourcompany.com"
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">LinkedIn</label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                disabled={!isEditing}
                placeholder="https://linkedin.com/in/..."
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Company Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
            placeholder="Tell us about your company..."
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>
      </motion.div>

      {/* Verification Status */}
      {businessProfile.isVerified && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold mb-1 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Verified Business Account
              </h3>
              <p className="text-gray-400 text-sm">
                Your business has been verified on {businessProfile.verificationDate || 'the platform'}. 
                This badge helps build trust with the ecosystem.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}