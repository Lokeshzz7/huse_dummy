import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, Filter, MapPin, Star, TrendingUp,
  Users, Briefcase, Code, Award, Eye,
  Bookmark, Mail, Phone, MessageCircle, 
  Download, ExternalLink, ChevronDown, X,
  Building2, Calendar, GraduationCap, CheckCircle,
  Zap, Heart, Share2, BarChart3, Target,
  GitBranch, Package, Layers, LogOut, User, Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { studentsDatabase } from '../data/studentsData';
import { EcosystemNav } from '../components/EcosystemNav';
import { useAuth } from '../context/AuthContext';

export function RecruiterDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minReputation, setMinReputation] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedStudents, setSavedStudents] = useState<Set<number>>(new Set());
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const colleges = [
    'All Colleges', 'IIT Bombay', 'IIT Delhi', 'BITS Pilani', 
    'NIT Trichy', 'IIIT Hyderabad', 'VIT Vellore'
  ];

  const skills = [
    'React', 'Node.js', 'Python', 'Machine Learning', 
    'UI/UX Design', 'DevOps', 'Mobile Dev', 'Data Science'
  ];

  // Use shared student database
  const students = studentsDatabase;

  const filteredStudents = students.filter(student => {
    if (searchQuery && !student.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !student.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    if (selectedCollege !== 'all' && student.college !== selectedCollege) return false;
    if (selectedYear !== 'all' && student.year !== selectedYear) return false;
    if (selectedSkills.length > 0 && !selectedSkills.some(s => student.skills.includes(s))) return false;
    if (student.reputation < minReputation) return false;
    if (showSavedOnly && !savedStudents.has(student.id)) return false;
    return true;
  });

  const toggleSaveStudent = (id: number) => {
    setSavedStudents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#050505] relative">
        {/* Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-purple-500/20">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Building2 className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-white text-[20px] font-bold">Recruiter Portal</h1>
                  <p className="text-gray-500 text-[12px]">Browse verified college talent</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/recruiter-job-postings')}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-[10px] transition-all hover:shadow-lg"
                >
                  <Briefcase size={16} />
                  <span className="text-[13px]">My Jobs</span>
                </button>
                <button 
                  onClick={() => setShowSavedOnly(!showSavedOnly)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[10px] transition-all ${
                    showSavedOnly 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white' 
                      : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40'
                  }`}
                >
                  <Bookmark size={16} className={showSavedOnly ? 'fill-white' : ''} />
                  <span className="text-[13px]">{showSavedOnly ? 'Showing Saved' : 'Saved'} ({savedStudents.size})</span>
                </button>
                <button 
                  onClick={() => navigate('/recruiter-messages')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40 rounded-[10px] transition-all"
                >
                  <MessageCircle size={16} />
                  <span className="text-[13px]">Messages</span>
                </button>
                <button 
                  onClick={() => navigate('/recruiter-notifications')}
                  className="relative flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40 rounded-[10px] transition-all"
                >
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">3</div>
                  <Users size={16} />
                  <span className="text-[13px]">Notifications</span>
                </button>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[10px] hover:shadow-lg transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-[13px]">
                      RS
                    </div>
                    <span className="text-white text-[13px] font-medium">Rajesh Sharma</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-white transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileDropdown && (
                    <>
                      {/* Click outside to close */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowProfileDropdown(false)}
                      />
                      
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-[#1A1A1A] border border-purple-500/30 rounded-xl overflow-hidden shadow-2xl z-50"
                      >
                        {/* Profile Info */}
                        <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              RS
                            </div>
                            <div>
                              <p className="text-white font-bold text-[14px]">Rajesh Sharma</p>
                              <p className="text-gray-400 text-[11px]">TechCorp India</p>
                            </div>
                          </div>
                          <div className="text-[10px] text-gray-500">
                            recruiter@techcorp.in
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <button
                            onClick={() => {
                              navigate('/recruiter-profile');
                              setShowProfileDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all text-[13px]"
                          >
                            <User size={16} />
                            <span>My Profile</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              navigate('/recruiter-profile');
                              setShowProfileDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all text-[13px]"
                          >
                            <Settings size={16} />
                            <span>Settings</span>
                          </button>

                          <div className="h-px bg-purple-500/20 my-2" />

                          <button
                            onClick={() => {
                              navigate('/huse-circle');
                              setShowProfileDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all text-[13px] font-medium"
                          >
                            <LogOut size={16} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto px-6 py-8">
          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, skills, college..."
                  className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 rounded-[12px] font-medium transition-all flex items-center gap-2 ${
                  showFilters
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
                }`}
              >
                <Filter size={18} />
                Filters
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#1A1A1A] border border-purple-500/20 rounded-[15px] p-6"
              >
                <div className="grid md:grid-cols-4 gap-6">
                  {/* College */}
                  <div>
                    <label className="text-gray-400 text-[13px] mb-2 block">College</label>
                    <select
                      value={selectedCollege}
                      onChange={(e) => setSelectedCollege(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0F0F0F] border border-purple-500/20 rounded-[10px] text-white text-[13px] focus:border-purple-500/40 outline-none"
                    >
                      <option value="all">All Colleges</option>
                      {colleges.slice(1).map((college) => (
                        <option key={college} value={college}>{college}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="text-gray-400 text-[13px] mb-2 block">Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0F0F0F] border border-purple-500/20 rounded-[10px] text-white text-[13px] focus:border-purple-500/40 outline-none"
                    >
                      <option value="all">All Years</option>
                      <option value="4th Year">4th Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="2nd Year">2nd Year</option>
                    </select>
                  </div>

                  {/* Min Reputation */}
                  <div>
                    <label className="text-gray-400 text-[13px] mb-2 block">
                      Min Reputation: {minReputation}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      step="50"
                      value={minReputation}
                      onChange={(e) => setMinReputation(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Results */}
                  <div className="flex items-end">
                    <div className="text-center w-full">
                      <p className="text-gray-500 text-[12px] mb-1">Results</p>
                      <p className="text-white text-[24px] font-bold">{filteredStudents.length}</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-4">
                  <label className="text-gray-400 text-[13px] mb-2 block">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all ${
                          selectedSkills.includes(skill)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            : 'bg-[#0F0F0F] border border-purple-500/20 text-gray-400 hover:text-white'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedCollege !== 'all' || selectedYear !== 'all' || selectedSkills.length > 0 || minReputation > 0) && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setSelectedCollege('all');
                        setSelectedYear('all');
                        setSelectedSkills([]);
                        setMinReputation(0);
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white text-[13px] transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Students Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#1A1A1A] border border-purple-500/20 rounded-[20px] p-6 hover:border-purple-500/40 transition-all cursor-pointer"
                onClick={() => setSelectedStudent(student)}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="text-[56px]">{student.avatar}</div>
                    {student.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-[18px] mb-1">{student.name}</h3>
                    <p className="text-purple-400 text-[13px] mb-1">{student.year} • {student.branch}</p>
                    <div className="flex items-center gap-2 text-[11px]">
                      <GraduationCap size={12} className="text-gray-500" />
                      <span className="text-gray-500">{student.college}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveStudent(student.id);
                    }}
                    className={`p-2 rounded-[10px] transition-all ${
                      savedStudents.has(student.id)
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-[#0F0F0F] text-gray-500 hover:text-white'
                    }`}
                  >
                    <Bookmark size={16} className={savedStudents.has(student.id) ? 'fill-amber-400' : ''} />
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-purple-500/10">
                  <div className="text-center">
                    <p className="text-amber-400 font-bold text-[16px]">{student.reputation}</p>
                    <p className="text-gray-600 text-[10px]">Reputation</p>
                  </div>
                  <div className="text-center">
                    <p className="text-purple-400 font-bold text-[16px]">{student.projects}</p>
                    <p className="text-gray-600 text-[10px]">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-400 font-bold text-[16px]">{student.cgpa}</p>
                    <p className="text-gray-600 text-[10px]">CGPA</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-400 text-[13px] mb-4 line-clamp-2">{student.bio}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {student.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px]">
                      {skill}
                    </span>
                  ))}
                  {student.skills.length > 3 && (
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full text-[10px]">
                      +{student.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Tier Badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    student.tier === 'Platinum' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400' :
                    student.tier === 'Gold' ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400' :
                    'bg-gradient-to-r from-gray-500/20 to-gray-400/20 border border-gray-500/30 text-gray-400'
                  }`}>
                    {student.tier} Tier
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStudent(student);
                    }}
                    className="text-purple-400 hover:text-purple-300 text-[12px] font-medium transition-colors"
                  >
                    View Profile →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Users className="text-purple-400" size={32} />
              </div>
              <h3 className="text-white text-[20px] font-bold mb-2">No students found</h3>
              <p className="text-gray-400 text-[14px]">Try adjusting your filters</p>
            </div>
          )}
        </main>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0F0F0F] border border-purple-500/30 rounded-[25px] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#0F0F0F] border-b border-purple-500/20 p-6 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="text-[72px]">{selectedStudent.avatar}</div>
                    {selectedStudent.verified && (
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-[#0F0F0F] flex items-center justify-center">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-white text-[28px] font-bold mb-1">{selectedStudent.name}</h2>
                    <p className="text-purple-400 text-[15px] mb-2">{selectedStudent.year} • {selectedStudent.branch}</p>
                    <div className="flex items-center gap-2 text-[13px]">
                      <GraduationCap size={14} className="text-gray-500" />
                      <span className="text-gray-400">{selectedStudent.college}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-white font-bold text-[16px] mb-2">About</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed">{selectedStudent.bio}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-[#1A1A1A] border border-purple-500/10 rounded-[12px] p-4 text-center">
                    <Zap className="text-amber-400 mx-auto mb-2" size={20} />
                    <p className="text-amber-400 font-bold text-[18px]">{selectedStudent.reputation}</p>
                    <p className="text-gray-600 text-[11px]">Reputation</p>
                  </div>
                  <div className="bg-[#1A1A1A] border border-purple-500/10 rounded-[12px] p-4 text-center">
                    <Code className="text-purple-400 mx-auto mb-2" size={20} />
                    <p className="text-purple-400 font-bold text-[18px]">{selectedStudent.projects}</p>
                    <p className="text-gray-600 text-[11px]">Projects</p>
                  </div>
                  <div className="bg-[#1A1A1A] border border-purple-500/10 rounded-[12px] p-4 text-center">
                    <Briefcase className="text-green-400 mx-auto mb-2" size={20} />
                    <p className="text-green-400 font-bold text-[18px]">{selectedStudent.gigs}</p>
                    <p className="text-gray-600 text-[11px]">Gigs Done</p>
                  </div>
                  <div className="bg-[#1A1A1A] border border-purple-500/10 rounded-[12px] p-4 text-center">
                    <Award className="text-blue-400 mx-auto mb-2" size={20} />
                    <p className="text-blue-400 font-bold text-[18px]">{selectedStudent.cgpa}</p>
                    <p className="text-gray-600 text-[11px]">CGPA</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-white font-bold text-[16px] mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.skills.map((skill: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[13px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Work */}
                <div>
                  <h3 className="text-white font-bold text-[16px] mb-3">Recent Work</h3>
                  <div className="space-y-3">
                    {selectedStudent.recentWork.map((work: any, i: number) => (
                      <div key={i} className="bg-[#1A1A1A] border border-purple-500/10 rounded-[12px] p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-medium text-[14px]">{work.title}</h4>
                          <div className="flex items-center gap-1 text-gray-500 text-[12px]">
                            <Eye size={12} />
                            <span>{work.views}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {work.tech.map((t: string, j: number) => (
                            <span key={j} className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-[12px] p-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <Calendar size={16} />
                    <span className="font-medium text-[14px]">{selectedStudent.availability}</span>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`mailto:${selectedStudent.contact.email}`}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-[12px] font-medium hover:shadow-lg transition-all"
                  >
                    <Mail size={18} />
                    Send Email
                  </a>
                  <a
                    href={selectedStudent.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1A1A] border border-purple-500/20 text-white hover:border-purple-500/40 rounded-[12px] font-medium transition-all"
                  >
                    <ExternalLink size={18} />
                    LinkedIn
                  </a>
                </div>

                {/* View Full Portfolio Button */}
                <button
                  onClick={() => {
                    navigate(`/huse-circle-platform/portfolio/${selectedStudent.id}`);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-[12px] font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all text-[15px]"
                >
                  <Eye size={18} />
                  View Full Portfolio on HUSE Circle
                </button>

                {/* Download Resume */}
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40 rounded-[12px] transition-all">
                  <Download size={18} />
                  <span>Download Portfolio PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}