import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, User, MapPin, Briefcase, Star, Mail, Phone, 
  ExternalLink, CheckCircle, XCircle, MessageSquare, FileText, Award
} from 'lucide-react';
import { toast } from 'sonner';

interface Applicant {
  id: number;
  name: string;
  avatar: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  rating: number;
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'accepted';
  email: string;
  phone?: string;
  portfolio?: string;
  coverLetter?: string;
  resumeUrl?: string;
}

interface ViewApplicantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunityTitle: string;
  applicants: Applicant[];
}

export function ViewApplicantsModal({
  isOpen,
  onClose,
  opportunityTitle,
  applicants: initialApplicants
}: ViewApplicantsModalProps) {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'shortlisted' | 'rejected' | 'accepted'>('all');

  const filteredApplicants = filter === 'all' 
    ? applicants 
    : applicants.filter(a => a.status === filter);

  const updateApplicantStatus = (id: number, status: Applicant['status']) => {
    setApplicants(applicants.map(a => a.id === id ? { ...a, status } : a));
    toast.success(`Applicant ${status}!`);
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
            className="bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[25px] max-w-5xl w-full my-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Applicants
                </h2>
                <p className="text-gray-400 text-sm">
                  For: {opportunityTitle} • {filteredApplicants.length} {filter === 'all' ? 'total' : filter}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="p-6 border-b border-white/10">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { label: 'All', value: 'all', count: applicants.length },
                  { label: 'Pending', value: 'pending', count: applicants.filter(a => a.status === 'pending').length },
                  { label: 'Shortlisted', value: 'shortlisted', count: applicants.filter(a => a.status === 'shortlisted').length },
                  { label: 'Accepted', value: 'accepted', count: applicants.filter(a => a.status === 'accepted').length },
                  { label: 'Rejected', value: 'rejected', count: applicants.filter(a => a.status === 'rejected').length }
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setFilter(tab.value as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      filter === tab.value
                        ? 'bg-[#24c6dc]/20 text-[#24c6dc] border border-[#24c6dc]/30'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(100vh-350px)] overflow-y-auto">
              {filteredApplicants.length === 0 ? (
                <div className="text-center py-12">
                  <User className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No {filter === 'all' ? '' : filter} applicants found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredApplicants.map((applicant) => (
                    <motion.div
                      key={applicant.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#111] border border-gray-800 rounded-xl p-4 hover:border-[#24c6dc]/50 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                          {applicant.avatar}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-white font-bold text-lg mb-1">{applicant.name}</h3>
                              <p className="text-gray-400 text-sm mb-2">{applicant.title}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                applicant.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30' :
                                applicant.status === 'shortlisted' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/30' :
                                applicant.status === 'accepted' ? 'bg-green-500/10 text-green-500 border border-green-500/30' :
                                'bg-red-500/10 text-red-500 border border-red-500/30'
                              }`}>
                                {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                              </span>
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-3 gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-400">{applicant.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-400">{applicant.experience}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm text-gray-400">{applicant.rating}/5.0</span>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {applicant.skills.slice(0, 4).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-[#24c6dc]/10 text-[#24c6dc] rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                            {applicant.skills.length > 4 && (
                              <span className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs">
                                +{applicant.skills.length - 4} more
                              </span>
                            )}
                          </div>

                          {/* Cover Letter Preview */}
                          {applicant.coverLetter && (
                            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 mb-3">
                              <p className="text-xs text-gray-400 mb-1 font-medium">Cover Letter</p>
                              <p className="text-sm text-gray-300 line-clamp-2">{applicant.coverLetter}</p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2">
                            {applicant.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateApplicantStatus(applicant.id, 'shortlisted')}
                                  className="flex-1 min-w-[140px] bg-blue-500/10 text-blue-500 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                  <Award className="w-4 h-4" />
                                  Shortlist
                                </button>
                                <button
                                  onClick={() => updateApplicantStatus(applicant.id, 'rejected')}
                                  className="flex-1 min-w-[140px] bg-red-500/10 text-red-500 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Reject
                                </button>
                              </>
                            )}
                            
                            {applicant.status === 'shortlisted' && (
                              <button
                                onClick={() => updateApplicantStatus(applicant.id, 'accepted')}
                                className="flex-1 min-w-[140px] bg-green-500/10 text-green-500 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-all flex items-center justify-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Accept
                              </button>
                            )}

                            <button
                              onClick={() => setSelectedApplicant(applicant)}
                              className="flex-1 min-w-[140px] bg-[#24c6dc]/10 text-[#24c6dc] px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#24c6dc]/20 transition-all flex items-center justify-center gap-2"
                            >
                              <FileText className="w-4 h-4" />
                              View Details
                            </button>

                            <button
                              onClick={() => toast.info('Opening message thread')}
                              className="px-3 py-2 bg-purple-500/10 text-purple-500 rounded-lg text-sm font-medium hover:bg-purple-500/20 transition-all"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>

                            {applicant.email && (
                              <button
                                onClick={() => {
                                  window.location.href = `mailto:${applicant.email}`;
                                }}
                                className="px-3 py-2 bg-gray-500/10 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-500/20 transition-all"
                                title={applicant.email}
                              >
                                <Mail className="w-4 h-4" />
                              </button>
                            )}

                            {applicant.portfolio && (
                              <button
                                onClick={() => window.open(applicant.portfolio, '_blank')}
                                className="px-3 py-2 bg-gray-500/10 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-500/20 transition-all"
                                title="View Portfolio"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                {applicants.filter(a => a.status === 'accepted').length} accepted • 
                {' '}{applicants.filter(a => a.status === 'shortlisted').length} shortlisted • 
                {' '}{applicants.filter(a => a.status === 'pending').length} pending
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-lg text-white font-medium hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>

          {/* Applicant Details Modal */}
          {selectedApplicant && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApplicant(null)}
            >
              <motion.div
                className="bg-[#0a0a0a] border border-purple-500/30 rounded-[25px] max-w-2xl w-full"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Applicant Details</h3>
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="p-2 hover:bg-white/5 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-4xl">
                      {selectedApplicant.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl mb-1">{selectedApplicant.name}</h4>
                      <p className="text-gray-400 mb-2">{selectedApplicant.title}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {selectedApplicant.location}
                        </span>
                        <span className="text-gray-500 flex items-center gap-1">
                          <Briefcase className="w-4 h-4" /> {selectedApplicant.experience}
                        </span>
                        <span className="text-yellow-500 flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500" /> {selectedApplicant.rating}/5.0
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedApplicant.coverLetter && (
                    <div className="mb-6">
                      <h5 className="text-white font-bold mb-2">Cover Letter</h5>
                      <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                        <p className="text-gray-300 whitespace-pre-line">{selectedApplicant.coverLetter}</p>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h5 className="text-white font-bold mb-2">Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-[#24c6dc]/10 text-[#24c6dc] rounded-lg text-sm border border-[#24c6dc]/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-white font-bold mb-2">Contact Information</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{selectedApplicant.email}</span>
                      </div>
                      {selectedApplicant.phone && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{selectedApplicant.phone}</span>
                        </div>
                      )}
                      {selectedApplicant.portfolio && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <ExternalLink className="w-4 h-4" />
                          <a href={selectedApplicant.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm text-[#24c6dc] hover:underline">
                            {selectedApplicant.portfolio}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-white/10">
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="w-full py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-lg text-white font-medium"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
