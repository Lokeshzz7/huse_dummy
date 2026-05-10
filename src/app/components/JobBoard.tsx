import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase, MapPin, DollarSign, Clock, Building2, Globe,
  TrendingUp, Users, Filter, Search, Bookmark, Eye,
  CheckCircle, Calendar, Award, Target, Zap, Star,
  ChevronDown, ExternalLink, Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jobsDatabase, getJobsByPlatform, JobPosting } from '../data/jobsData';
import { JobApplicationModal } from './JobApplicationModal';
import { toast } from 'sonner';

interface JobBoardProps {
  currentUser: any;
  platform?: 'huse-circle' | 'dofracto';
}

export function JobBoard({ currentUser, platform = 'huse-circle' }: JobBoardProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Full-Time' | 'Internship' | 'Part-Time'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'Remote' | 'Hybrid' | 'On-site'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set([1, 5]));
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Get jobs for this platform
  const allJobs = getJobsByPlatform(platform);

  // Filter jobs
  const filteredJobs = allJobs.filter(job => {
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    if (filterType !== 'all' && job.type !== filterType) return false;
    if (filterMode !== 'all' && job.mode !== filterMode) return false;
    
    // Check tier requirement
    const tierLevels = { Bronze: 0, Silver: 1, Gold: 2, Platinum: 3 };
    const userLevel = tierLevels[currentUser.tier as keyof typeof tierLevels] || 0;
    const requiredLevel = job.tierRequirement ? tierLevels[job.tierRequirement as keyof typeof tierLevels] : 0;
    
    if (userLevel < requiredLevel) return false;
    
    return true;
  });

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
        toast.success('Job removed from saved');
      } else {
        newSet.add(jobId);
        toast.success('Job saved!');
      }
      return newSet;
    });
  };

  const handleApplyClick = (job: JobPosting) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Briefcase className="text-white" size={32} />
          </div>
          <h2 className="text-white text-[32px] font-bold mb-2 huse-gradient-purple" style={{ fontFamily: 'var(--font-display)' }}>
            Job Board
          </h2>
          <p className="text-gray-400 text-[14px]">
            {platform === 'huse-circle' ? 'Opportunities from verified recruiters' : 'Career opportunities for contributors'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="huse-glass rounded-[20px] p-4 text-center">
            <Briefcase className="text-blue-400 mx-auto mb-2" size={20} />
            <p className="text-blue-400 font-bold text-[20px]">{filteredJobs.length}</p>
            <p className="text-gray-500 text-[11px]">Available Jobs</p>
          </div>
          <div className="huse-glass rounded-[20px] p-4 text-center">
            <Bookmark className="text-amber-400 mx-auto mb-2" size={20} />
            <p className="text-amber-400 font-bold text-[20px]">{savedJobs.size}</p>
            <p className="text-gray-500 text-[11px]">Saved Jobs</p>
          </div>
          <div className="huse-glass rounded-[20px] p-4 text-center">
            <CheckCircle className="text-green-400 mx-auto mb-2" size={20} />
            <p className="text-green-400 font-bold text-[20px]">3</p>
            <p className="text-gray-500 text-[11px]">Applied</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, companies, skills..."
                className="w-full pl-11 pr-4 py-3 bg-[#1A1A1A]/60 backdrop-blur-xl border border-purple-500/20 rounded-[15px] text-white text-[13px] placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 rounded-[15px] font-medium transition-all flex items-center gap-2 text-[13px] ${
                showFilters
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'huse-glass text-gray-400 hover:text-white'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="huse-glass rounded-[20px] p-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-[12px] mb-2 block" style={{ fontFamily: 'var(--font-body)' }}>
                    Job Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white text-[13px] focus:border-purple-500/40 outline-none"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <option value="all">All Types</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-[12px] mb-2 block" style={{ fontFamily: 'var(--font-body)' }}>
                    Work Mode
                  </label>
                  <select
                    value={filterMode}
                    onChange={(e) => setFilterMode(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-purple-500/20 rounded-[12px] text-white text-[13px] focus:border-purple-500/40 outline-none"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <option value="all">All Modes</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job, index) => {
            const daysLeft = Math.ceil((new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            const isExpiringSoon = daysLeft <= 5;
            const isSaved = savedJobs.has(job.id);

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="huse-glass rounded-[25px] p-6 hover:border-purple-500/40 transition-all cursor-pointer group"
                onClick={() => handleApplyClick(job)}
              >
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="text-4xl flex-shrink-0">{job.companyLogo}</div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white font-bold text-[18px] group-hover:text-purple-400 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                            {job.title}
                          </h3>
                          {job.featured && (
                            <span className="px-2 py-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400 rounded-full text-[10px] font-bold">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                        <p className="text-purple-400 font-medium text-[14px] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                          {job.company}
                        </p>

                        {/* Job Details */}
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-gray-400 mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            <span>{job.location}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <Briefcase size={12} />
                            <span>{job.type}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <Globe size={12} />
                            <span>{job.mode}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <DollarSign size={12} />
                            <span>{job.salary}</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.slice(0, 5).map((skill, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px] font-medium"
                              style={{ fontFamily: 'var(--font-body)' }}
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 5 && (
                            <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-full text-[10px]">
                              +{job.skills.length - 5} more
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-[11px] text-gray-500" style={{ fontFamily: 'var(--font-body)' }}>
                            <div className="flex items-center gap-1">
                              <Users size={11} />
                              <span>{job.applicationsCount} applicants</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock size={11} />
                              <span className={isExpiringSoon ? 'text-red-400 font-bold' : ''}>
                                {daysLeft}d left
                              </span>
                            </div>
                            <span>•</span>
                            <span>Posted {job.postedAt}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaveJob(job.id);
                              }}
                              className={`p-2 rounded-[10px] transition-all ${
                                isSaved
                                  ? 'bg-amber-500/20 text-amber-400'
                                  : 'bg-[#0F0F0F] text-gray-500 hover:text-white'
                              }`}
                            >
                              <Bookmark size={14} className={isSaved ? 'fill-amber-400' : ''} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApplyClick(job);
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-[10px] text-[12px] font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Briefcase className="text-purple-400" size={32} />
            </div>
            <h3 className="text-white text-[20px] font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              No jobs found
            </h3>
            <p className="text-gray-400 text-[13px]" style={{ fontFamily: 'var(--font-body)' }}>
              Try adjusting your filters or check back later
            </p>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          isOpen={showApplicationModal}
          job={selectedJob}
          currentUser={currentUser}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedJob(null);
          }}
        />
      )}
    </>
  );
}
