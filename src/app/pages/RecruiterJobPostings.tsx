import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Plus, Search, Filter, Briefcase, MapPin, Calendar,
  DollarSign, Users, Eye, Edit3, Trash2, X, Check, Clock,
  TrendingUp, Star, CheckCircle, XCircle, UserCheck, Send,
  Building2, Globe, Award, Target, Zap, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { jobsDatabase, JobPosting, JobApplication } from '../data/jobsData';
import { CreateJobModal } from '../components/CreateJobModal';

export function RecruiterJobPostings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'closed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [myJobsState, setMyJobsState] = useState<JobPosting[]>(
    jobsDatabase.filter(job => job.postedBy === 'Rajesh Sharma')
  );

  // Filter jobs by recruiter (mock - in real app would filter by logged-in recruiter)
  const myJobs = myJobsState;

  const stats = {
    totalJobs: myJobs.length,
    activeJobs: myJobs.filter(job => new Date(job.deadline) > new Date()).length,
    totalApplications: myJobs.reduce((sum, job) => sum + job.applicationsCount, 0),
    shortlisted: myJobs.reduce((sum, job) => 
      sum + (job.applications?.filter(app => app.status === 'shortlisted').length || 0), 0
    )
  };

  const filteredJobs = myJobs.filter(job => {
    if (activeTab === 'active' && new Date(job.deadline) < new Date()) return false;
    if (activeTab === 'closed' && new Date(job.deadline) > new Date()) return false;
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleApplicationStatus = (jobId: number, applicationId: number, newStatus: JobApplication['status']) => {
    toast.success(`Application ${newStatus}!`);
  };

  const handleJobCreated = (jobData: any) => {
    // Create new job object with ID
    const newJob: JobPosting = {
      ...jobData,
      id: Math.max(...jobsDatabase.map(j => j.id)) + 1,
      postedBy: 'Rajesh Sharma', // Current recruiter
      postedAt: 'Just now',
      applicationsCount: 0,
      applications: []
    };

    // Add to state
    setMyJobsState([newJob, ...myJobsState]);
    toast.success(`🎉 Job posted successfully! Now visible to ${jobData.visibleTo.map((p: string) => p === 'huse-circle' ? 'HUSE Circle' : 'Dofracto').join(' & ')}`);
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/recruiter/dashboard')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
              <div>
                <h1 className="text-white text-2xl font-bold">Job Postings</h1>
                <p className="text-gray-400 text-sm">Manage your job listings and applications</p>
              </div>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <Plus size={20} />
              Post New Job
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="text-blue-400" size={32} />
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Briefcase className="text-blue-400" size={20} />
              </div>
            </div>
            <p className="text-blue-400 text-3xl font-bold mb-1">{stats.totalJobs}</p>
            <p className="text-gray-400 text-sm">Total Job Postings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="text-green-400" size={32} />
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={20} />
              </div>
            </div>
            <p className="text-green-400 text-3xl font-bold mb-1">{stats.activeJobs}</p>
            <p className="text-gray-400 text-sm">Active Postings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="text-purple-400" size={32} />
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Users className="text-purple-400" size={20} />
              </div>
            </div>
            <p className="text-purple-400 text-3xl font-bold mb-1">{stats.totalApplications}</p>
            <p className="text-gray-400 text-sm">Total Applications</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Star className="text-amber-400" size={32} />
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Star className="text-amber-400" size={20} />
              </div>
            </div>
            <p className="text-amber-400 text-3xl font-bold mb-1">{stats.shortlisted}</p>
            <p className="text-gray-400 text-sm">Shortlisted Candidates</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search job postings..."
              className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-xl text-white placeholder-gray-600 focus:border-purple-500/40 outline-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
              }`}
            >
              All ({myJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'active'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
              }`}
            >
              Active ({stats.activeJobs})
            </button>
            <button
              onClick={() => setActiveTab('closed')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'closed'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
              }`}
            >
              Closed
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job, index) => {
            const isActive = new Date(job.deadline) > new Date();
            const daysLeft = Math.ceil((new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#1A1A1A] border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start gap-6">
                  {/* Company Logo */}
                  <div className="text-5xl">{job.companyLogo}</div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white text-xl font-bold">{job.title}</h3>
                          {job.featured && (
                            <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold">
                              ⭐ Featured
                            </span>
                          )}
                          {isActive ? (
                            <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-xs font-bold">
                              ✓ Active
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-gray-500/20 border border-gray-500/30 text-gray-400 rounded-full text-xs font-bold">
                              Closed
                            </span>
                          )}
                        </div>
                        <p className="text-purple-400 font-medium mb-2">{job.company}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>{job.location}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-2">
                            <Briefcase size={14} />
                            <span>{job.type}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-2">
                            <Globe size={14} />
                            <span>{job.mode}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-2">
                            <DollarSign size={14} />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-[#0F0F0F] rounded-xl">
                      <div className="text-center">
                        <Users className="text-purple-400 mx-auto mb-1" size={20} />
                        <p className="text-purple-400 font-bold text-lg">{job.applicationsCount}</p>
                        <p className="text-gray-500 text-xs">Applications</p>
                      </div>
                      <div className="text-center">
                        <Star className="text-amber-400 mx-auto mb-1" size={20} />
                        <p className="text-amber-400 font-bold text-lg">
                          {job.applications?.filter(app => app.status === 'shortlisted').length || 0}
                        </p>
                        <p className="text-gray-500 text-xs">Shortlisted</p>
                      </div>
                      <div className="text-center">
                        <Target className="text-green-400 mx-auto mb-1" size={20} />
                        <p className="text-green-400 font-bold text-lg">{job.openings}</p>
                        <p className="text-gray-500 text-xs">Openings</p>
                      </div>
                      <div className="text-center">
                        <Clock className="text-blue-400 mx-auto mb-1" size={20} />
                        <p className={`font-bold text-lg ${daysLeft < 5 ? 'text-red-400' : 'text-blue-400'}`}>
                          {isActive ? `${daysLeft}d` : 'Ended'}
                        </p>
                        <p className="text-gray-500 text-xs">{isActive ? 'Days Left' : ''}</p>
                      </div>
                    </div>

                    {/* Visibility Pills */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-500 text-xs">Visible to:</span>
                      {job.visibleTo.includes('huse-circle') && (
                        <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-full text-xs font-medium">
                          🎓 HUSE Circle
                        </span>
                      )}
                      {job.visibleTo.includes('dofracto') && (
                        <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-medium">
                          🚀 Dofracto
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowApplicationsModal(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                      >
                        <Users size={16} />
                        View Applications ({job.applicationsCount})
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40 rounded-lg text-sm transition-all">
                        <Edit3 size={16} />
                        Edit
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40 rounded-lg text-sm transition-all">
                        <Eye size={16} />
                        Preview
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-red-500/20 text-red-400 hover:text-red-300 hover:border-red-500/40 rounded-lg text-sm transition-all">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Briefcase className="text-purple-400" size={40} />
            </div>
            <h3 className="text-white text-2xl font-bold mb-2">No job postings found</h3>
            <p className="text-gray-400 mb-6">Start by creating your first job posting</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Post Your First Job
            </button>
          </div>
        )}
      </main>

      {/* Applications Modal */}
      <AnimatePresence>
        {showApplicationsModal && selectedJob && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowApplicationsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0F0F0F] border border-purple-500/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-white text-2xl font-bold mb-2">Applications</h2>
                    <p className="text-gray-400">{selectedJob.title} - {selectedJob.applicationsCount} total applications</p>
                  </div>
                  <button
                    onClick={() => setShowApplicationsModal(false)}
                    className="p-2 text-gray-500 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Applications List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedJob.applications && selectedJob.applications.length > 0 ? (
                  selectedJob.applications.map((application) => (
                    <motion.div
                      key={application.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#1A1A1A] border border-purple-500/20 rounded-2xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{application.applicantAvatar}</div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-white font-bold text-lg mb-1">{application.applicantName}</h3>
                              {application.applicantCollege && (
                                <p className="text-purple-400 text-sm mb-2">{application.applicantCollege}</p>
                              )}
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span className={`px-2 py-1 rounded-full ${
                                  application.applicantPlatform === 'huse-circle'
                                    ? 'bg-purple-500/20 text-purple-400'
                                    : 'bg-cyan-500/20 text-cyan-400'
                                }`}>
                                  {application.applicantPlatform === 'huse-circle' ? '🎓 HUSE Circle' : '🚀 Dofracto'}
                                </span>
                                <span>Applied {application.appliedAt}</span>
                              </div>
                            </div>

                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              application.status === 'shortlisted' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              application.status === 'reviewing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                              application.status === 'rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                              application.status === 'hired' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                              'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </div>

                          <div className="mb-4">
                            <p className="text-gray-400 text-sm italic">"{application.coverLetter}"</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/husecircle/student/portfolio/${application.applicantId}`)}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                            >
                              <Eye size={14} />
                              View Profile
                            </button>
                            
                            {application.status !== 'shortlisted' && (
                              <button
                                onClick={() => handleApplicationStatus(selectedJob.id, application.id, 'shortlisted')}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 rounded-lg text-sm font-medium transition-all"
                              >
                                <CheckCircle size={14} />
                                Shortlist
                              </button>
                            )}
                            
                            {application.status !== 'rejected' && (
                              <button
                                onClick={() => handleApplicationStatus(selectedJob.id, application.id, 'rejected')}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 rounded-lg text-sm font-medium transition-all"
                              >
                                <XCircle size={14} />
                                Reject
                              </button>
                            )}

                            <button className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40 rounded-lg text-sm transition-all">
                              <Send size={14} />
                              Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Users className="text-gray-500 mx-auto mb-4" size={48} />
                    <p className="text-gray-400">No applications yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Job Modal */}
      <CreateJobModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleJobCreated}
      />
    </div>
  );
}