import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Building2, MapPin, Globe, Users, DollarSign, 
  Calendar, Tag, FileText, Save, Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface Business {
  id: number;
  name: string;
  logo: string;
  category: string;
  description: string;
  location: string;
  website: string;
  teamSize: string;
  revenue: string;
  founded: string;
  stage: string;
}

interface EditBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: Business;
  onSave: (updatedBusiness: Business) => void;
}

export function EditBusinessModal({
  isOpen,
  onClose,
  business,
  onSave
}: EditBusinessModalProps) {
  const [formData, setFormData] = useState<Business>(business);

  const handleSave = () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error('Business name is required');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Business description is required');
      return;
    }

    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    onSave(formData);
    toast.success('Business updated successfully!');
    onClose();
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
                  Edit Business
                </h2>
                <p className="text-gray-400 text-sm">
                  Update your business information
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto space-y-5">
              {/* Business Logo */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Business Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-[#111] border border-gray-800 flex items-center justify-center text-4xl">
                    {formData.logo}
                  </div>
                  <button className="px-4 py-2 bg-[#24c6dc]/10 border border-[#24c6dc]/30 rounded-lg text-[#24c6dc] hover:bg-[#24c6dc]/20 transition-all flex items-center gap-2 text-sm">
                    <ImageIcon className="w-4 h-4" />
                    Change Logo
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Click to upload a new logo (emoji or image)</p>
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Business Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., TechVenture AI"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                  />
                </div>
              </div>

              {/* Category & Stage */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2 text-sm">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#24c6dc]/50 appearance-none"
                    >
                      <option value="AI/ML">AI/ML</option>
                      <option value="SaaS">SaaS</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="FinTech">FinTech</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="EdTech">EdTech</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm">
                    Stage
                  </label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#24c6dc]/50 appearance-none"
                  >
                    <option value="Idea">Idea</option>
                    <option value="MVP">MVP</option>
                    <option value="Early Stage">Early Stage</option>
                    <option value="Growth">Growth</option>
                    <option value="Scale">Scale</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Description <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your business..."
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50 resize-none"
                  />
                </div>
              </div>

              {/* Location & Website */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2 text-sm">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Bangalore, India"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                    />
                  </div>
                </div>
              </div>

              {/* Team Size & Revenue */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2 text-sm">
                    Team Size
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#24c6dc]/50 appearance-none"
                    >
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm">
                    Annual Revenue
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#24c6dc]/50 appearance-none"
                    >
                      <option value="Pre-revenue">Pre-revenue</option>
                      <option value="$0-$100K">$0-$100K</option>
                      <option value="$100K-$1M">$100K-$1M</option>
                      <option value="$1M-$10M">$1M-$10M</option>
                      <option value="$10M+">$10M+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Founded Year */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Founded Year
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.founded}
                    onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                    placeholder="e.g., 2023"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#24c6dc]/50"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-lg text-white font-medium hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
