import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Send, Briefcase, DollarSign, FileText, Upload, Link as LinkIcon,
  CheckCircle, AlertCircle, User, Mail, Phone, MapPin
} from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';
import { JobPosting } from '../data/jobsData';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobPosting;
  currentUser: any;
}

export function JobApplicationModal({ isOpen, onClose, job, currentUser }: JobApplicationModalProps) {
  const navigate = useNavigate();
  const { createApplication } = useApplications();
  
  const [formData, setFormData] = useState({
    coverLetter: '',
    expectedSalary: '',
    portfolio: '',
    resume: '',
    phoneNumber: '',
    availability: 'immediate',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create application
    createApplication({
      jobId: job.id.toString(),
      jobTitle: job.title,
      company: job.company,
      companyLogo: job.companyLogo || '🏢',
      status: 'submitted',
      platform: 'huse',
      coverLetter: formData.coverLetter,
      portfolio: formData.portfolio,
      resume: formData.resume,
      expectedSalary: formData.expectedSalary ? parseInt(formData.expectedSalary) : undefined,
      notes: formData.additionalInfo
    });

    setIsSubmitting(false);
    onClose();

    // Show success with option to track
    toast.success('Application Submitted!', {
      description: 'Click here to track your application',
      action: {
        label: 'Track',
        onClick: () => navigate('/application-tracker')
      },
      duration: 5000
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0F0F0F] border border-purple-500/30 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0F0F0F] border-b border-purple-500/20 p-6 flex items-start justify-between z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                  <Briefcase className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Apply for {job.title}</h2>
                  <p className="text-gray-400">{job.company} • {job.location}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="text-gray-400 hover:text-white" size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* User Info Section */}
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <User size={18} />
                  Your Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Name</p>
                    <p className="text-white font-medium">{currentUser.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">College</p>
                    <p className="text-white font-medium">{currentUser.college}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Year</p>
                    <p className="text-white font-medium">{currentUser.year}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Tier</p>
                    <p className="text-white font-medium">{currentUser.tier}</p>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Cover Letter *
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us why you're a great fit for this role..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 100 characters</p>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Expected Salary (₹/month)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="number"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      placeholder="50000"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Portfolio & Resume Links */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Portfolio URL
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Resume URL
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="url"
                      name="resume"
                      value={formData.resume}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/resume.pdf"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Availability *
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                >
                  <option value="immediate">Immediate</option>
                  <option value="2-weeks">2 Weeks Notice</option>
                  <option value="1-month">1 Month Notice</option>
                  <option value="after-graduation">After Graduation</option>
                </select>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Anything else you'd like to share..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                />
              </div>

              {/* Important Note */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
                <AlertCircle className="text-blue-400 flex-shrink-0" size={20} />
                <div className="text-sm text-blue-300">
                  <p className="font-semibold mb-1">Before you apply:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-blue-300/80">
                    <li>Make sure your profile is complete and up-to-date</li>
                    <li>Double-check all information for accuracy</li>
                    <li>Your application will be tracked in the Application Tracker</li>
                  </ul>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || formData.coverLetter.length < 100}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
