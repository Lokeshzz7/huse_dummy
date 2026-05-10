import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface EditBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: {
    id: string;
    name: string;
    category: string;
    description: string;
    status: 'active' | 'pending' | 'draft';
  };
  onSave: (updatedBusiness: any) => void;
}

export function EditBusinessModal({ isOpen, onClose, business, onSave }: EditBusinessModalProps) {
  const [formData, setFormData] = useState({
    name: business.name,
    category: business.category,
    description: business.description,
    status: business.status,
    website: 'www.example.com',
    email: 'contact@example.com',
    phone: '+91 9876543210',
    location: 'Bangalore, India',
    fundingGoal: '10,00,000'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...business, ...formData });
    toast.success('Business updated successfully!');
    onClose();
  };

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-3xl bg-theme-card border border-theme-accent rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-theme-card border-b border-theme-secondary p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-[#24c6dc]/20 to-[#05997F]/20 rounded-lg">
                    <Building2 className="w-6 h-6 text-[#24c6dc]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-theme-primary">Edit Business</h2>
                    <p className="text-sm text-theme-tertiary">Update your business information</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-theme-secondary rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-theme-muted" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-theme-primary font-medium mb-2 text-sm">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] transition-all"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-theme-primary font-medium mb-2 text-sm">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all"
                        >
                          <option>Artificial Intelligence</option>
                          <option>Technology</option>
                          <option>Finance</option>
                          <option>Healthcare</option>
                          <option>E-commerce</option>
                          <option>Education</option>
                          <option>Sustainability</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-theme-primary font-medium mb-2 text-sm">
                          Status
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                          className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all"
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-theme-primary font-medium mb-2 text-sm">
                        Description *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your business..."
                        className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] transition-all resize-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-theme-primary font-medium mb-2 text-sm">
                        Website
                      </label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="www.example.com"
                        className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-theme-primary font-medium mb-2 text-sm">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@example.com"
                        className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-theme-primary font-medium mb-2 text-sm">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-theme-primary font-medium mb-2 text-sm">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Bangalore, India"
                        className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Funding Information */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-4">Funding Goals</h3>
                  <div>
                    <label className="block text-theme-primary font-medium mb-2 text-sm">
                      Funding Goal (₹)
                    </label>
                    <input
                      type="text"
                      value={formData.fundingGoal}
                      onChange={(e) => setFormData({ ...formData, fundingGoal: e.target.value })}
                      placeholder="10,00,000"
                      className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] transition-all"
                    />
                    <p className="text-xs text-theme-muted mt-1">
                      Set your capital raising goal through community contributions
                    </p>
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-4">Business Logo</h3>
                  <div className="border-2 border-dashed border-theme-accent rounded-lg p-6 text-center hover:border-[#24c6dc] transition-all cursor-pointer">
                    <Upload className="w-8 h-8 text-theme-muted mx-auto mb-2" />
                    <p className="text-sm text-theme-primary mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-theme-muted">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </form>

              {/* Footer */}
              <div className="sticky bottom-0 bg-theme-card border-t border-theme-secondary p-6 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-theme-secondary text-theme-primary rounded-lg hover:bg-theme-tertiary transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
