import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Briefcase, Calendar, DollarSign, MapPin, Users, Eye, TrendingUp, Filter, Search, CheckCircle, XCircle, Clock, Award, GraduationCap, Star } from 'lucide-react';
import { toast } from 'sonner';

interface Applicant {
  id: string;
  name: string;
  email: string;
  platform: 'Dofracto' | 'HUSE Circle';
  tier: string;
  avatar: string;
  skills: string[];
  experience: string;
  portfolio?: string;
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
  reputation?: number;
  completedProjects?: number;
  rating?: number;
  coverLetter: string;
}

interface Opportunity {
  id: string;
  title: string;
  type: 'internship' | 'equity' | 'advisor' | 'freelance' | 'fulltime';
  description: string;
  compensation: string;
  location: string;
  duration: string;
  postedDate: string;
  status: 'active' | 'closed' | 'draft';
  views: number;
  applicants: Applicant[];
  requirements: string[];
  businessName: string;
}

interface OpportunityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity;
  onViewApplicant: (applicant: Applicant) => void;
  onUpdateApplicantStatus: (applicantId: string, status: Applicant['status']) => void;
}

export function OpportunityDetailModal({ 
  isOpen, 
  onClose, 
  opportunity, 
  onViewApplicant,
  onUpdateApplicantStatus 
}: OpportunityDetailModalProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | Applicant['status']>('all');
  const [filterPlatform, setFilterPlatform] = useState<'all' | 'Dofracto' | 'HUSE Circle'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getTypeColor = (type: string) => {
    const colors = {
      internship: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
      equity: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
      advisor: 'bg-green-500/10 text-green-500 border-green-500/30',
      freelance: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
      fulltime: 'bg-[#24c6dc]/10 text-[#24c6dc] border-[#24c6dc]/30',
    };
    return colors[type as keyof typeof colors];
  };

  const getStatusBadge = (status: Applicant['status']) => {
    const styles = {
      pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/30', icon: Clock },
      shortlisted: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30', icon: Star },
      accepted: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30', icon: CheckCircle },
      rejected: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30', icon: XCircle },
    };
    const style = styles[status];
    const Icon = style.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${style.bg} ${style.text} ${style.border}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPlatformBadge = (platform: string) => {
    return platform === 'Dofracto' ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#24c6dc]/10 text-[#24c6dc] border border-[#24c6dc]/30">
        <Award className="w-3 h-3" />
        Dofracto
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30">
        <GraduationCap className="w-3 h-3" />
        HUSE Circle
      </span>
    );
  };

  const filteredApplicants = opportunity.applicants.filter(applicant => {
    const matchesStatus = filterStatus === 'all' || applicant.status === filterStatus;
    const matchesPlatform = filterPlatform === 'all' || applicant.platform === filterPlatform;
    const matchesSearch = applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         applicant.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesPlatform && matchesSearch;
  });

  const statusCounts = {
    all: opportunity.applicants.length,
    pending: opportunity.applicants.filter(a => a.status === 'pending').length,
    shortlisted: opportunity.applicants.filter(a => a.status === 'shortlisted').length,
    accepted: opportunity.applicants.filter(a => a.status === 'accepted').length,
    rejected: opportunity.applicants.filter(a => a.status === 'rejected').length,
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
            <div className="w-full max-w-6xl h-[90vh] bg-theme-card border border-theme-accent rounded-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-theme-secondary border-b border-theme-accent p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-gradient-to-br from-[#24c6dc]/20 to-[#05997F]/20 rounded-lg">
                        <Briefcase className="w-6 h-6 text-[#24c6dc]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-theme-primary">{opportunity.title}</h2>
                        <p className="text-sm text-theme-tertiary">{opportunity.businessName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${getTypeColor(opportunity.type)}`}>
                        {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${
                        opportunity.status === 'active' 
                          ? 'bg-green-500/10 text-green-500 border-green-500/30' 
                          : 'bg-gray-500/10 text-gray-500 border-gray-500/30'
                      }`}>
                        {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-theme-tertiary rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-theme-muted" />
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-theme-card border border-theme-accent rounded-lg p-3">
                    <Eye className="w-5 h-5 text-[#24c6dc] mb-1" />
                    <p className="text-xl font-bold text-theme-primary">{opportunity.views}</p>
                    <p className="text-xs text-theme-tertiary">Views</p>
                  </div>
                  <div className="bg-theme-card border border-theme-accent rounded-lg p-3">
                    <Users className="w-5 h-5 text-[#05997F] mb-1" />
                    <p className="text-xl font-bold text-theme-primary">{opportunity.applicants.length}</p>
                    <p className="text-xs text-theme-tertiary">Applicants</p>
                  </div>
                  <div className="bg-theme-card border border-theme-accent rounded-lg p-3">
                    <Star className="w-5 h-5 text-blue-500 mb-1" />
                    <p className="text-xl font-bold text-theme-primary">{statusCounts.shortlisted}</p>
                    <p className="text-xs text-theme-tertiary">Shortlisted</p>
                  </div>
                  <div className="bg-theme-card border border-theme-accent rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mb-1" />
                    <p className="text-xl font-bold text-theme-primary">{statusCounts.accepted}</p>
                    <p className="text-xs text-theme-tertiary">Accepted</p>
                  </div>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="p-4 border-b border-theme-accent bg-theme-secondary">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search applicants..."
                        className="w-full bg-theme-tertiary border border-theme-accent rounded-lg pl-10 pr-4 py-2 text-sm text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] transition-all"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-theme-muted" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="bg-theme-tertiary border border-theme-accent rounded-lg px-3 py-2 text-sm text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all"
                    >
                      <option value="all">All Status ({statusCounts.all})</option>
                      <option value="pending">Pending ({statusCounts.pending})</option>
                      <option value="shortlisted">Shortlisted ({statusCounts.shortlisted})</option>
                      <option value="accepted">Accepted ({statusCounts.accepted})</option>
                      <option value="rejected">Rejected ({statusCounts.rejected})</option>
                    </select>
                  </div>

                  {/* Platform Filter */}
                  <select
                    value={filterPlatform}
                    onChange={(e) => setFilterPlatform(e.target.value as any)}
                    className="bg-theme-tertiary border border-theme-accent rounded-lg px-3 py-2 text-sm text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all"
                  >
                    <option value="all">All Platforms</option>
                    <option value="Dofracto">Dofracto</option>
                    <option value="HUSE Circle">HUSE Circle</option>
                  </select>
                </div>
              </div>

              {/* Applicants List */}
              <div className="flex-1 overflow-y-auto p-6">
                {filteredApplicants.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-theme-muted mx-auto mb-4" />
                    <p className="text-theme-tertiary">No applicants found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredApplicants.map((applicant, index) => (
                      <motion.div
                        key={applicant.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-theme-secondary border border-theme-accent rounded-xl p-4 hover:border-[#24c6dc] transition-all"
                      >
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold">{applicant.avatar}</span>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="font-semibold text-theme-primary">{applicant.name}</h4>
                                <p className="text-sm text-theme-tertiary">{applicant.email}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getPlatformBadge(applicant.platform)}
                                {getStatusBadge(applicant.status)}
                              </div>
                            </div>

                            {/* Stats for Dofracto users */}
                            {applicant.platform === 'Dofracto' && (
                              <div className="flex items-center gap-4 text-xs text-theme-tertiary mb-2">
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  {applicant.rating?.toFixed(1)} rating
                                </span>
                                <span className="flex items-center gap-1">
                                  <Award className="w-3 h-3" />
                                  {applicant.reputation} Rep
                                </span>
                                <span className="flex items-center gap-1">
                                  <Briefcase className="w-3 h-3" />
                                  {applicant.completedProjects} projects
                                </span>
                              </div>
                            )}

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {applicant.skills.slice(0, 5).map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-theme-tertiary text-theme-primary rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                              {applicant.skills.length > 5 && (
                                <span className="px-2 py-1 bg-theme-tertiary text-theme-muted rounded text-xs">
                                  +{applicant.skills.length - 5} more
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-theme-tertiary mb-3 line-clamp-2">{applicant.coverLetter}</p>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onViewApplicant(applicant)}
                                className="px-3 py-1.5 bg-theme-tertiary text-theme-primary rounded-lg text-sm hover:bg-theme-card transition-all"
                              >
                                View Profile
                              </button>
                              {applicant.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => {
                                      onUpdateApplicantStatus(applicant.id, 'shortlisted');
                                      toast.success('Applicant shortlisted');
                                    }}
                                    className="px-3 py-1.5 bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded-lg text-sm hover:bg-blue-500/20 transition-all"
                                  >
                                    Shortlist
                                  </button>
                                  <button
                                    onClick={() => {
                                      onUpdateApplicantStatus(applicant.id, 'accepted');
                                      toast.success('Applicant accepted');
                                    }}
                                    className="px-3 py-1.5 bg-green-500/10 text-green-500 border border-green-500/30 rounded-lg text-sm hover:bg-green-500/20 transition-all"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => {
                                      onUpdateApplicantStatus(applicant.id, 'rejected');
                                      toast.success('Applicant rejected');
                                    }}
                                    className="px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/20 transition-all"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {applicant.status === 'shortlisted' && (
                                <>
                                  <button
                                    onClick={() => {
                                      onUpdateApplicantStatus(applicant.id, 'accepted');
                                      toast.success('Applicant accepted');
                                    }}
                                    className="px-3 py-1.5 bg-green-500/10 text-green-500 border border-green-500/30 rounded-lg text-sm hover:bg-green-500/20 transition-all"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => {
                                      onUpdateApplicantStatus(applicant.id, 'rejected');
                                      toast.success('Applicant rejected');
                                    }}
                                    className="px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/20 transition-all"
                                  >
                                    Reject
                                  </button>
                                </>
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
              <div className="p-4 border-t border-theme-accent bg-theme-secondary">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
