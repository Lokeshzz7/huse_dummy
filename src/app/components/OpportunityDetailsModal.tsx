import { motion, AnimatePresence } from 'motion/react';
import {
  X, Briefcase, MapPin, DollarSign, Clock, Users, 
  Calendar, Tag, FileText, CheckCircle, Building2, Award
} from 'lucide-react';

interface Opportunity {
  id: number;
  title: string;
  type: string;
  location: string;
  salary: string;
  posted: string;
  applicants: number;
  status: string;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  duration?: string;
  workMode?: string;
  experienceLevel?: string;
}

interface OpportunityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity;
}

export function OpportunityDetailsModal({
  isOpen,
  onClose,
  opportunity
}: OpportunityDetailsModalProps) {
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
                <h2 className="text-2xl font-bold text-white mb-2">
                  {opportunity.title}
                </h2>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    opportunity.status === 'active' ? 'bg-green-500/10 text-green-500 border border-green-500/30' :
                    opportunity.status === 'paused' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30' :
                    'bg-gray-500/10 text-gray-500 border border-gray-500/30'
                  }`}>
                    {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                  </span>
                  <span className="px-3 py-1 bg-[#24c6dc]/10 text-[#24c6dc] rounded-full text-xs font-medium border border-[#24c6dc]/30">
                    {opportunity.type}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              {/* Key Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-400">Location</span>
                  </div>
                  <p className="text-lg font-bold text-white">{opportunity.location}</p>
                </div>

                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-400">Compensation</span>
                  </div>
                  <p className="text-lg font-bold text-white">{opportunity.salary}</p>
                </div>

                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-400">Applicants</span>
                  </div>
                  <p className="text-lg font-bold text-white">{opportunity.applicants} Applied</p>
                </div>

                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-400">Posted</span>
                  </div>
                  <p className="text-lg font-bold text-white">{opportunity.posted}</p>
                </div>

                {opportunity.duration && (
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-cyan-500" />
                      <span className="text-sm text-gray-400">Duration</span>
                    </div>
                    <p className="text-lg font-bold text-white">{opportunity.duration}</p>
                  </div>
                )}

                {opportunity.workMode && (
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-pink-500" />
                      <span className="text-sm text-gray-400">Work Mode</span>
                    </div>
                    <p className="text-lg font-bold text-white">{opportunity.workMode}</p>
                  </div>
                )}

                {opportunity.experienceLevel && (
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4 col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-gray-400">Experience Level</span>
                    </div>
                    <p className="text-lg font-bold text-white">{opportunity.experienceLevel}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {opportunity.description && (
                <div className="mb-6">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#24c6dc]" />
                    About the Role
                  </h3>
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {opportunity.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Responsibilities */}
              {opportunity.responsibilities && opportunity.responsibilities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    Key Responsibilities
                  </h3>
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                    <ul className="space-y-2">
                      {opportunity.responsibilities.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Requirements */}
              {opportunity.requirements && opportunity.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-orange-500" />
                    Requirements
                  </h3>
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                    <ul className="space-y-2">
                      {opportunity.requirements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Benefits */}
              {opportunity.benefits && opportunity.benefits.length > 0 && (
                <div>
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Benefits & Perks
                  </h3>
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {opportunity.benefits.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-gray-300 bg-[#0a0a0a] border border-gray-800 rounded-lg p-3"
                        >
                          <CheckCircle className="w-4 h-4 text-[#24c6dc] flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
