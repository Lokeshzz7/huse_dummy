import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Building2, UserCheck, Filter } from 'lucide-react';

interface RecruitersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const allRecruiters = [
  { name: 'Sarah Johnson', initials: 'SJ', title: 'Senior Tech Recruiter', company: 'TechVenture AI', color: 'from-blue-500 to-cyan-500', status: 'Actively recruiting' },
  { name: 'Rahul Mehta', initials: 'RM', title: 'Talent Acquisition Lead', company: 'InnovateLabs', color: 'from-purple-500 to-pink-500', status: 'Actively recruiting' },
  { name: 'Emily Chen', initials: 'EC', title: 'Head of Engineering Hiring', company: 'CloudScale Systems', color: 'from-green-500 to-emerald-500', status: 'Actively recruiting' },
  { name: 'Arjun Patel', initials: 'AP', title: 'Campus Recruitment Manager', company: 'DataFlow Analytics', color: 'from-amber-500 to-orange-500', status: 'Actively recruiting' },
  { name: 'Priya Sharma', initials: 'PS', title: 'Technical Recruiter', company: 'QuantumSoft', color: 'from-indigo-500 to-purple-500', status: 'Actively recruiting' },
  { name: 'Michael Brown', initials: 'MB', title: 'Hiring Manager', company: 'NexGen Solutions', color: 'from-teal-500 to-cyan-500', status: 'Actively recruiting' },
  { name: 'Anjali Gupta', initials: 'AG', title: 'People & Culture Lead', company: 'ByteCraft Studios', color: 'from-rose-500 to-pink-500', status: 'Actively recruiting' },
  { name: 'David Kim', initials: 'DK', title: 'Talent Partner', company: 'FutureStack Tech', color: 'from-violet-500 to-purple-500', status: 'Actively recruiting' },
  { name: 'Sneha Reddy', initials: 'SR', title: 'Senior Recruiter', company: 'CodeCraft Inc', color: 'from-orange-500 to-red-500', status: 'Actively recruiting' },
  { name: 'James Wilson', initials: 'JW', title: 'Talent Acquisition Specialist', company: 'DevStream Labs', color: 'from-cyan-500 to-blue-500', status: 'Actively recruiting' },
  { name: 'Kavya Nair', initials: 'KN', title: 'HR Manager', company: 'TechPioneers', color: 'from-pink-500 to-purple-500', status: 'Actively recruiting' },
  { name: 'Robert Taylor', initials: 'RT', title: 'Campus Hiring Lead', company: 'InnoTech Solutions', color: 'from-emerald-500 to-teal-500', status: 'Actively recruiting' },
  { name: 'Divya Iyer', initials: 'DI', title: 'Recruitment Manager', company: 'NextWave Tech', color: 'from-yellow-500 to-amber-500', status: 'Actively recruiting' },
  { name: 'Chris Anderson', initials: 'CA', title: 'Tech Talent Scout', company: 'FutureBuild Inc', color: 'from-indigo-500 to-blue-500', status: 'Actively recruiting' },
  { name: 'Neha Kapoor', initials: 'NK', title: 'Senior Talent Partner', company: 'CloudWorks', color: 'from-violet-500 to-indigo-500', status: 'Actively recruiting' },
  { name: 'Daniel Lee', initials: 'DL', title: 'Recruitment Lead', company: 'SmartSystems', color: 'from-teal-500 to-green-500', status: 'Actively recruiting' },
  { name: 'Aarti Singh', initials: 'AS', title: 'HR Business Partner', company: 'TechGrowth', color: 'from-rose-500 to-red-500', status: 'Actively recruiting' },
  { name: 'Matthew White', initials: 'MW', title: 'Senior Hiring Manager', company: 'CodeNinjas', color: 'from-blue-500 to-indigo-500', status: 'Actively recruiting' },
  { name: 'Riya Desai', initials: 'RD', title: 'Talent Acquisition Head', company: 'DataDrive Inc', color: 'from-purple-500 to-violet-500', status: 'Actively recruiting' },
  { name: 'Kevin Martinez', initials: 'KM', title: 'Campus Relations Manager', company: 'WebScale Solutions', color: 'from-cyan-500 to-teal-500', status: 'Actively recruiting' },
  { name: 'Pooja Rao', initials: 'PR', title: 'Technical Recruiter', company: 'AI Ventures', color: 'from-amber-500 to-yellow-500', status: 'Actively recruiting' },
  { name: 'Andrew Harris', initials: 'AH', title: 'Talent Director', company: 'BuildTech', color: 'from-green-500 to-cyan-500', status: 'Actively recruiting' },
  { name: 'Shreya Menon', initials: 'SM', title: 'Engineering Recruiter', company: 'DevForge Labs', color: 'from-pink-500 to-rose-500', status: 'Actively recruiting' },
  { name: 'Brian Clark', initials: 'BC', title: 'Hiring Specialist', company: 'TechHub Inc', color: 'from-indigo-500 to-purple-500', status: 'Actively recruiting' }
];

export function RecruitersModal({ isOpen, onClose }: RecruitersModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompany, setFilterCompany] = useState('all');

  // Get unique companies for filter
  const companies = ['all', ...Array.from(new Set(allRecruiters.map(r => r.company)))];

  // Filter recruiters based on search and company filter
  const filteredRecruiters = allRecruiters.filter(recruiter => {
    const matchesSearch = 
      recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCompany = filterCompany === 'all' || recruiter.company === filterCompany;
    
    return matchesSearch && matchesCompany;
  });

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
            <div className="w-full max-w-6xl max-h-[90vh] bg-[#0a0a0a] border border-purple-500/30 rounded-[25px] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-[28px] font-bold text-white mb-2">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        All Recruiters
                      </span>
                    </h2>
                    <p className="text-gray-400 text-[14px]">
                      {filteredRecruiters.length} verified recruiters actively looking for talent
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Search by name, company, or role..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#111] border border-purple-500/30 rounded-[12px] pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <select
                      value={filterCompany}
                      onChange={(e) => setFilterCompany(e.target.value)}
                      className="bg-[#111] border border-purple-500/30 rounded-[12px] pl-10 pr-8 py-3 text-white focus:outline-none focus:border-purple-500 transition-all appearance-none cursor-pointer min-w-[200px]"
                    >
                      <option value="all">All Companies</option>
                      {companies.slice(1).map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Recruiters Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredRecruiters.map((recruiter, index) => (
                    <motion.div
                      key={index}
                      className="group relative bg-[#111] border border-purple-500/20 rounded-[20px] p-5 hover:border-purple-500/40 transition-all cursor-pointer overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      whileHover={{ y: -5 }}
                    >
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${recruiter.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      
                      <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Profile Photo - Avatar with Initials */}
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${recruiter.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                          <span className="text-white font-bold text-[18px]">{recruiter.initials}</span>
                        </div>
                        
                        {/* Recruiter Name */}
                        <h4 className="text-white font-bold text-[14px] mb-1">{recruiter.name}</h4>
                        
                        {/* Job Title */}
                        <p className={`text-[11px] font-medium mb-2 bg-gradient-to-r ${recruiter.color} bg-clip-text text-transparent min-h-[32px] flex items-center`}>
                          {recruiter.title}
                        </p>
                        
                        {/* Company Name */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <Building2 className="text-purple-400" size={12} />
                          <span className="text-gray-300 text-[11px] font-medium">
                            {recruiter.company}
                          </span>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-[10px] font-bold">
                            Active
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* No Results */}
                {filteredRecruiters.length === 0 && (
                  <div className="text-center py-12">
                    <UserCheck className="w-16 h-16 text-purple-400/30 mx-auto mb-4" />
                    <p className="text-gray-400 text-[16px]">No recruiters found matching your search</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilterCompany('all');
                      }}
                      className="mt-4 text-purple-400 hover:text-purple-300 transition-colors text-[14px]"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
