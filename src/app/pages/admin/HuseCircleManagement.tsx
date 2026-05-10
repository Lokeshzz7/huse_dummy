import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, GraduationCap, CheckCircle, XCircle, Clock, 
  Search, Filter, Eye, Award, Target, TrendingUp,
  UserCheck, AlertTriangle, Calendar, Briefcase, MapPin,
  Mail, Phone, FileText, X, Linkedin, Globe, Building
} from 'lucide-react';
import { toast } from 'sonner';
import { EventManagement } from './EventManagement';

export function HuseCircleManagement() {
  const [activeSection, setActiveSection] = useState<'students' | 'challenges' | 'events' | 'graduations' | 'recruiters'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showManageJobsModal, setShowManageJobsModal] = useState(false);
  const [showAddChallengeModal, setShowAddChallengeModal] = useState(false);

  // Mock data - replace with real data
  const [pendingStudents, setPendingStudents] = useState([
    { id: 1, name: 'Rahul Kumar', email: 'rahul@college.edu', college: 'IIT Delhi', status: 'pending_verification', submitted: '2 hours ago' },
    { id: 2, name: 'Priya Sharma', email: 'priya@university.edu', college: 'BITS Pilani', status: 'pending_verification', submitted: '5 hours ago' },
    { id: 3, name: 'Arjun Patel', email: 'arjun@college.ac.in', college: 'NIT Trichy', status: 'pending_verification', submitted: '1 day ago' },
  ]);

  const [pendingGraduations, setPendingGraduations] = useState([
    { id: 1, name: 'Sneha Reddy', reputation: 32500, tier: 'Contributor', projects: 8, readyDate: '2024-01-15' },
    { id: 2, name: 'Vikram Singh', reputation: 28900, tier: 'Contributor', projects: 6, readyDate: '2024-01-18' },
  ]);

  const [activeRecruiters, setActiveRecruiters] = useState([
    { id: 1, company: 'Tech Corp', recruiter: 'John Doe', activeJobs: 5, status: 'verified', joined: '2023-12-01' },
    { id: 2, company: 'StartupX', recruiter: 'Jane Smith', activeJobs: 3, status: 'verified', joined: '2023-12-10' },
    { id: 3, company: 'InnovateLabs', recruiter: 'Mike Johnson', activeJobs: 2, status: 'pending', joined: '2024-01-10' },
  ]);

  const handleApproveStudent = (studentId: number) => {
    const student = pendingStudents.find(s => s.id === studentId);
    setPendingStudents(pendingStudents.filter(s => s.id !== studentId));
    toast.success(`${student?.name} has been approved and can now access HUSE Circle!`, {
      description: 'Welcome email sent to the student.'
    });
  };

  const handleRejectStudent = (studentId: number) => {
    const student = pendingStudents.find(s => s.id === studentId);
    setPendingStudents(pendingStudents.filter(s => s.id !== studentId));
    toast.error(`${student?.name}'s application has been rejected.`, {
      description: 'Rejection email sent with feedback.'
    });
  };

  const handleGraduateToDofracto = (studentId: number) => {
    const student = pendingGraduations.find(s => s.id === studentId);
    setPendingGraduations(pendingGraduations.filter(s => s.id !== studentId));
    toast.success(`🎓 ${student?.name} has graduated to Dofracto!`, {
      description: `Congratulations email sent. They now have access to the Unified Builders Hub.`
    });
  };

  const handleVerifyRecruiter = (recruiterId: number) => {
    const recruiter = activeRecruiters.find(r => r.id === recruiterId);
    setActiveRecruiters(activeRecruiters.map(r => 
      r.id === recruiterId ? { ...r, status: 'verified' } : r
    ));
    toast.success(`${recruiter?.company} has been verified!`, {
      description: 'They can now post jobs on HUSE Circle.'
    });
  };

  const handleRejectRecruiter = (recruiterId: number) => {
    const recruiter = activeRecruiters.find(r => r.id === recruiterId);
    setActiveRecruiters(activeRecruiters.filter(r => r.id !== recruiterId));
    toast.error(`${recruiter?.company}'s application has been rejected.`);
  };

  const handleViewDetails = (type: string, id: number) => {
    const item = type === 'student' ? pendingStudents.find(s => s.id === id) :
                 type === 'graduation' ? pendingGraduations.find(s => s.id === id) :
                 type === 'recruiter' ? activeRecruiters.find(r => r.id === id) : null;
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleManageJobs = (recruiterId: number) => {
    const recruiter = activeRecruiters.find(r => r.id === recruiterId);
    setSelectedItem(recruiter);
    setShowManageJobsModal(true);
  };

  const handleAddChallenge = () => {
    setShowAddChallengeModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'students', label: 'Student Verification', icon: UserCheck, count: pendingStudents.length },
          { id: 'challenges', label: 'Challenge Management', icon: Target, count: 0 },
          { id: 'events', label: 'Event Approvals', icon: Calendar, count: 0 },
          { id: 'graduations', label: 'Graduation Approvals', icon: GraduationCap, count: pendingGraduations.length },
          { id: 'recruiters', label: 'Recruiter Management', icon: Briefcase, count: 1 },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap relative ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <section.icon size={16} />
            {section.label}
            {section.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeSection === section.id ? 'bg-white/20' : 'bg-purple-500/20 text-purple-400'
              }`}>
                {section.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Student Verification */}
      {activeSection === 'students' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Student Verification</h3>
              <p className="text-sm text-gray-400">Review and approve student registrations</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} className="text-gray-400" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-bold text-gray-400 mb-2">Filters</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="bg-white/5 border border-white/10 rounded-lg" />
                  <label className="text-sm text-gray-400">Pending Verification</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="bg-white/5 border border-white/10 rounded-lg" />
                  <label className="text-sm text-gray-400">Submitted in Last 24 Hours</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="bg-white/5 border border-white/10 rounded-lg" />
                  <label className="text-sm text-gray-400">From IIT Delhi</label>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {pendingStudents.map((student) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{student.name}</h4>
                      <p className="text-sm text-gray-400">{student.email}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <GraduationCap size={14} />
                          {student.college}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={14} />
                          {student.submitted}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" onClick={() => handleViewDetails('student', student.id)}>
                      <Eye size={16} className="text-gray-400" />
                    </button>
                    <button className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2" onClick={() => handleApproveStudent(student.id)}>
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2" onClick={() => handleRejectStudent(student.id)}>
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Challenge Management */}
      {activeSection === 'challenges' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Challenge Management</h3>
              <p className="text-sm text-gray-400">Add, edit, or remove challenges for students</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2" onClick={handleAddChallenge}>
              <Target size={16} />
              Add New Challenge
            </button>
          </div>
          <div className="text-center py-12 text-gray-400">
            <Target size={48} className="mx-auto mb-4 opacity-50" />
            <p>Challenge management is handled in the Events tab</p>
          </div>
        </div>
      )}

      {/* Event Approvals */}
      {activeSection === 'events' && (
        <EventManagement />
      )}

      {/* Graduation Approvals */}
      {activeSection === 'graduations' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Graduation Approvals</h3>
              <p className="text-sm text-gray-400">Approve students ready to graduate to Dofracto platform</p>
            </div>
          </div>

          <div className="space-y-3">
            {pendingGraduations.map((student) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <GraduationCap className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        {student.name}
                        <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400">
                          {student.tier} Tier
                        </span>
                      </h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Award size={14} />
                          {student.reputation.toLocaleString()} Rep
                        </span>
                        <span className="text-sm text-gray-400">
                          {student.projects} Projects Completed
                        </span>
                        <span className="text-sm text-gray-500">
                          Ready: {student.readyDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2" onClick={() => handleGraduateToDofracto(student.id)}>
                      <CheckCircle size={16} />
                      Graduate to Dofracto
                    </button>
                    <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all" onClick={() => handleViewDetails('graduation', student.id)}>
                      Review
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recruiter Management */}
      {activeSection === 'recruiters' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Recruiter Management</h3>
              <p className="text-sm text-gray-400">Manage recruiters and their job postings</p>
            </div>
          </div>

          <div className="space-y-3">
            {activeRecruiters.map((recruiter) => (
              <div
                key={recruiter.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Briefcase className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        {recruiter.company}
                        {recruiter.status === 'verified' && (
                          <CheckCircle size={16} className="text-green-400" />
                        )}
                        {recruiter.status === 'pending' && (
                          <Clock size={16} className="text-yellow-400" />
                        )}
                      </h4>
                      <p className="text-sm text-gray-400">{recruiter.recruiter}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500">
                          {recruiter.activeJobs} Active Jobs
                        </span>
                        <span className="text-sm text-gray-500">
                          Joined: {recruiter.joined}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {recruiter.status === 'pending' && (
                      <>
                        <button className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all" onClick={() => handleVerifyRecruiter(recruiter.id)}>
                          Verify
                        </button>
                        <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all" onClick={() => handleRejectRecruiter(recruiter.id)}>
                          Reject
                        </button>
                      </>
                    )}
                    {recruiter.status === 'verified' && (
                      <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all" onClick={() => handleManageJobs(recruiter.id)}>
                        Manage Jobs
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Details</h3>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setShowDetailModal(false)}>
                <X size={16} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              {selectedItem && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedItem.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{selectedItem.name}</h4>
                      <p className="text-sm text-gray-400">{selectedItem.email}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <GraduationCap size={14} />
                          {selectedItem.college}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={14} />
                          {selectedItem.submitted}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail size={16} className="text-gray-400" />
                    <p className="text-sm text-gray-400">{selectedItem.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={16} className="text-gray-400" />
                    <p className="text-sm text-gray-400">123-456-7890</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <FileText size={16} className="text-gray-400" />
                    <p className="text-sm text-gray-400">Resume.pdf</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manage Jobs Modal */}
      {showManageJobsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Manage Jobs</h3>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setShowManageJobsModal(false)}>
                <X size={16} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              {selectedItem && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Briefcase className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        {selectedItem.company}
                        {selectedItem.status === 'verified' && (
                          <CheckCircle size={16} className="text-green-400" />
                        )}
                        {selectedItem.status === 'pending' && (
                          <Clock size={16} className="text-yellow-400" />
                        )}
                      </h4>
                      <p className="text-sm text-gray-400">{selectedItem.recruiter}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500">
                          {selectedItem.activeJobs} Active Jobs
                        </span>
                        <span className="text-sm text-gray-500">
                          Joined: {selectedItem.joined}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail size={16} className="text-gray-400" />
                    <p className="text-sm text-gray-400">recruiter@company.com</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={16} className="text-gray-400" />
                    <p className="text-sm text-gray-400">123-456-7890</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <FileText size={16} className="text-gray-400" />
                    <p className="text-sm text-gray-400">Company Profile.pdf</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Challenge Modal */}
      {showAddChallengeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Add New Challenge</h3>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setShowAddChallengeModal(false)}>
                <X size={16} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Target size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Challenge Title"
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <Calendar size={16} className="text-gray-400" />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <Globe size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Website"
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <Building size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Organizer"
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <Linkedin size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="LinkedIn"
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <FileText size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Description"
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                <CheckCircle size={16} />
                Add Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}