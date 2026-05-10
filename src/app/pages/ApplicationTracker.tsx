import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase, Calendar, Clock, CheckCircle, XCircle, AlertCircle,
  TrendingUp, Eye, Filter, Search, ArrowRight, Edit, Trash2,
  FileText, Phone, Video, MapPin, DollarSign, Send, ChevronDown,
  Star, Award, Activity, Bell, Download, ExternalLink, Plus, X
} from 'lucide-react';
import { useApplications, ApplicationStatus } from '../context/ApplicationContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function ApplicationTracker() {
  const navigate = useNavigate();
  const { 
    applications, 
    getApplicationStats, 
    updateApplicationStatus,
    withdrawApplication,
    addApplicationNote,
    getApplicationsByStatus 
  } = useApplications();

  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');

  const stats = getApplicationStats();

  const statusConfig: Record<ApplicationStatus, { 
    label: string; 
    color: string; 
    bgColor: string; 
    icon: any;
  }> = {
    'draft': { label: 'Draft', color: 'text-gray-400', bgColor: 'bg-gray-500/10', icon: FileText },
    'submitted': { label: 'Submitted', color: 'text-blue-400', bgColor: 'bg-blue-500/10', icon: Send },
    'under-review': { label: 'Under Review', color: 'text-purple-400', bgColor: 'bg-purple-500/10', icon: Eye },
    'interview': { label: 'Interview', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10', icon: Video },
    'assessment': { label: 'Assessment', color: 'text-amber-400', bgColor: 'bg-amber-500/10', icon: FileText },
    'offer': { label: 'Offer', color: 'text-green-400', bgColor: 'bg-green-500/10', icon: Award },
    'accepted': { label: 'Accepted', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', icon: CheckCircle },
    'rejected': { label: 'Rejected', color: 'text-red-400', bgColor: 'bg-red-500/10', icon: XCircle },
    'withdrawn': { label: 'Withdrawn', color: 'text-orange-400', bgColor: 'bg-orange-500/10', icon: AlertCircle }
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesSearch = 
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedApplication = selectedApp ? applications.find(a => a.id === selectedApp) : null;

  const handleAddNote = () => {
    if (selectedApp && noteText.trim()) {
      addApplicationNote(selectedApp, noteText);
      setNoteText('');
      setShowNoteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pb-20">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Application Tracker</h1>
              <p className="text-gray-400">Track all your job applications in one place</p>
            </div>
            <button
              onClick={() => navigate('/huse-circle-platform')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <Briefcase className="text-blue-400" size={24} />
              <TrendingUp className="text-green-400" size={16} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Applications</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <Activity className="text-purple-400" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.active}</div>
            <div className="text-sm text-gray-400">Active</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <Video className="text-cyan-400" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.interviews}</div>
            <div className="text-sm text-gray-400">Interviews</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <Award className="text-green-400" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.offers}</div>
            <div className="text-sm text-gray-400">Offers</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <XCircle className="text-red-400" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.rejected}</div>
            <div className="text-sm text-gray-400">Rejected</div>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title or company..."
              className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedStatus === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
              }`}
            >
              All ({applications.length})
            </button>
            {(Object.keys(statusConfig) as ApplicationStatus[]).map((status) => {
              const count = getApplicationsByStatus(status).length;
              if (count === 0) return null;
              
              const config = statusConfig[status];
              const Icon = config.icon;
              
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedStatus === status
                      ? `${config.bgColor} ${config.color} border border-${config.color.replace('text-', '')}/30`
                      : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {config.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Briefcase className="text-purple-400" size={40} />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">No applications found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery ? 'Try adjusting your search query' : 'Start applying to jobs to track them here'}
              </p>
              <button
                onClick={() => navigate('/huse-circle-platform')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl"
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            filteredApplications.map((app, index) => {
              const config = statusConfig[app.status];
              const Icon = config.icon;

              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#1A1A1A] border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all cursor-pointer"
                  onClick={() => setSelectedApp(app.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-4xl">{app.companyLogo}</div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-1">{app.jobTitle}</h3>
                        <p className="text-gray-400 text-sm mb-3">{app.company}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color} border border-${config.color.replace('text-', '')}/20`}>
                            <Icon size={14} />
                            {config.label}
                          </span>
                          
                          <span className="flex items-center gap-1 text-gray-500 text-xs">
                            <Calendar size={12} />
                            Applied {new Date(app.appliedDate).toLocaleDateString()}
                          </span>
                          
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">
                            {app.platform.toUpperCase()}
                          </span>
                        </div>

                        {/* Timeline Preview */}
                        <div className="flex items-center gap-2">
                          {app.timeline.slice(-3).map((event, i) => (
                            <div key={event.id} className="flex items-center gap-2">
                              <div className="text-xs">{event.icon}</div>
                              {i < Math.min(2, app.timeline.length - 1) && (
                                <ArrowRight size={12} className="text-gray-600" />
                              )}
                            </div>
                          ))}
                          {app.timeline.length > 3 && (
                            <span className="text-xs text-gray-500">+{app.timeline.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedApp(app.id);
                      }}
                      className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg text-sm hover:bg-purple-500/20 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApplication && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0F0F0F] border border-purple-500/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#0F0F0F] border-b border-purple-500/20 p-6 flex items-start justify-between z-10">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{selectedApplication.companyLogo}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedApplication.jobTitle}</h2>
                    <p className="text-gray-400">{selectedApplication.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="text-gray-400" size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Current Status */}
                <div>
                  <h3 className="text-white font-bold mb-3">Current Status</h3>
                  <div className={`${statusConfig[selectedApplication.status].bgColor} border border-${statusConfig[selectedApplication.status].color.replace('text-', '')}/20 rounded-xl p-4`}>
                    <div className="flex items-center gap-3">
                      {React.createElement(statusConfig[selectedApplication.status].icon, {
                        className: statusConfig[selectedApplication.status].color,
                        size: 24
                      })}
                      <div>
                        <p className={`font-bold ${statusConfig[selectedApplication.status].color}`}>
                          {statusConfig[selectedApplication.status].label}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Last updated: {selectedApplication.timeline[selectedApplication.timeline.length - 1]?.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-white font-bold mb-4">Application Timeline</h3>
                  <div className="space-y-4">
                    {selectedApplication.timeline.map((event, index) => (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-lg">
                            {event.icon}
                          </div>
                          {index < selectedApplication.timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-purple-500/20 my-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <p className="text-white font-medium">{event.title}</p>
                          <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                          <p className="text-gray-600 text-xs mt-2">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interview Details */}
                {selectedApplication.interviewDate && (
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                    <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <Video size={18} />
                      Interview Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-white">
                        <span className="text-gray-400">Type:</span> {selectedApplication.interviewType}
                      </p>
                      <p className="text-white">
                        <span className="text-gray-400">Date:</span> {selectedApplication.interviewDate}
                      </p>
                      {selectedApplication.interviewNotes && (
                        <p className="text-white">
                          <span className="text-gray-400">Notes:</span> {selectedApplication.interviewNotes}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Offer Details */}
                {selectedApplication.offerAmount && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                      <Award size={18} />
                      Offer Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-white text-lg font-bold">
                        ${selectedApplication.offerAmount.toLocaleString()}
                      </p>
                      {selectedApplication.offerDeadline && (
                        <p className="text-white">
                          <span className="text-gray-400">Deadline:</span> {selectedApplication.offerDeadline}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Recruiter Contact */}
                {selectedApplication.recruiterName && (
                  <div>
                    <h4 className="text-white font-bold mb-3">Contact Information</h4>
                    <div className="bg-[#1A1A1A] border border-purple-500/20 rounded-xl p-4 space-y-2">
                      <p className="text-white font-medium">{selectedApplication.recruiterName}</p>
                      {selectedApplication.recruiterEmail && (
                        <p className="text-gray-400 text-sm flex items-center gap-2">
                          <Send size={14} />
                          {selectedApplication.recruiterEmail}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedApplication.notes && (
                  <div>
                    <h4 className="text-white font-bold mb-3">Notes</h4>
                    <div className="bg-[#1A1A1A] border border-purple-500/20 rounded-xl p-4">
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">{selectedApplication.notes}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowNoteModal(true);
                    }}
                    className="flex-1 px-4 py-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/20 transition-all"
                  >
                    Add Note
                  </button>
                  {selectedApplication.status !== 'withdrawn' && selectedApplication.status !== 'rejected' && (
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to withdraw this application?')) {
                          withdrawApplication(selectedApplication.id);
                          setSelectedApp(null);
                        }
                      }}
                      className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Note Modal */}
      <AnimatePresence>
        {showNoteModal && selectedApp && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowNoteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0F0F0F] border border-purple-500/30 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-white font-bold text-lg mb-4">Add Note</h3>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add any notes about this application..."
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                rows={4}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 text-gray-400 rounded-xl hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  disabled={!noteText.trim()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Add Note
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
