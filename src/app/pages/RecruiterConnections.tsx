import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, Search, ArrowLeft, TrendingUp, Mail, Linkedin, Calendar, Sparkles, Briefcase } from 'lucide-react';
import { PremiumContactCard } from '../components/contact/PremiumContactCard';

interface Connection {
  id: string;
  type: 'email' | 'linkedin' | 'calendar';
  withUser: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  context?: string;
  timestamp: string;
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  role: string;
  college: string;
  skills: string[];
  email: string;
  linkedinUrl?: string;
  calendarUrl?: string;
  verified: boolean;
  lastContact?: string;
}

export function RecruiterConnections() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      avatar: '👩‍💻',
      role: 'Full Stack Developer',
      college: 'IIT Bombay',
      skills: ['React', 'Node.js', 'AWS'],
      email: 'priya.sharma@iitb.ac.in',
      linkedinUrl: 'https://linkedin.com/in/priyasharma',
      calendarUrl: 'https://calendly.com/priyasharma',
      verified: true,
      lastContact: '2 days ago'
    },
    {
      id: '2',
      name: 'Rahul Kumar',
      avatar: '🧑‍💼',
      role: 'Backend Developer',
      college: 'NIT Trichy',
      skills: ['Python', 'Django', 'PostgreSQL'],
      email: 'rahul.kumar@nitt.edu',
      linkedinUrl: 'https://linkedin.com/in/rahulkumar',
      verified: true,
      lastContact: '1 week ago'
    },
    {
      id: '3',
      name: 'Ananya Desai',
      avatar: '👩‍🎨',
      role: 'UI/UX Designer',
      college: 'BITS Pilani',
      skills: ['Figma', 'Adobe XD', 'User Research'],
      email: 'ananya.desai@pilani.bits-pilani.ac.in',
      linkedinUrl: 'https://linkedin.com/in/ananyadesai',
      calendarUrl: 'https://calendly.com/ananyadesai',
      verified: false,
      lastContact: '2 weeks ago'
    },
    {
      id: '4',
      name: 'Vikram Singh',
      avatar: '🧑‍💻',
      role: 'Data Scientist',
      college: 'IIT Delhi',
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      email: 'vikram.singh@iitd.ac.in',
      linkedinUrl: 'https://linkedin.com/in/vikramsingh',
      verified: true,
      lastContact: '3 weeks ago'
    },
    {
      id: '5',
      name: 'Meera Patel',
      avatar: '👩‍🔬',
      role: 'DevOps Engineer',
      college: 'VIT Vellore',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      email: 'meera.patel@vitstudent.ac.in',
      linkedinUrl: 'https://linkedin.com/in/meerapatel',
      calendarUrl: 'https://calendly.com/meerapatel',
      verified: true,
      lastContact: '1 month ago'
    }
  ]);

  const [recentConnections] = useState<Connection[]>([
    {
      id: '1',
      type: 'email',
      withUser: {
        id: students[0].id,
        name: students[0].name,
        avatar: students[0].avatar,
        role: students[0].role,
      },
      context: 'Interview Request',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      type: 'linkedin',
      withUser: {
        id: students[1].id,
        name: students[1].name,
        avatar: students[1].avatar,
        role: students[1].role,
      },
      context: 'Profile Review',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      type: 'calendar',
      withUser: {
        id: students[2].id,
        name: students[2].name,
        avatar: students[2].avatar,
        role: students[2].role,
      },
      context: 'Technical Interview',
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);

  const selectedStudentData = students.find(s => s.id === selectedStudent);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const iconMap = {
    email: Mail,
    linkedin: Linkedin,
    calendar: Calendar,
  };

  const actionText = {
    email: 'Sent professional email',
    linkedin: 'Connected on LinkedIn',
    calendar: 'Scheduled meeting',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/recruiter-dashboard')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <Briefcase className="text-blue-400" size={24} />
                <h1 className="text-white text-xl font-bold">Candidate Connections</h1>
              </div>
            </div>
            <div className="hidden md:block text-sm text-white/60">
              Connect via LinkedIn & Email
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 relative z-10">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Candidates List */}
            <div className="lg:col-span-1 space-y-4">
              {/* Info Banner */}
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  Professional Recruitment
                </h3>
                <p className="text-sm text-white/70 mb-3">
                  Connect with talented candidates via LinkedIn and professional email.
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-300 bg-blue-500/10 px-3 py-2 rounded-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>Select a candidate to view contact options</span>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0F0F0F] border border-blue-500/20 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/40"
                />
              </div>

              {/* Candidate List */}
              <div className="space-y-2">
                {filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-blue-500/10 transition-colors rounded-xl border ${
                      selectedStudent === student.id
                        ? 'bg-blue-500/10 border-blue-500/30'
                        : 'bg-[#0F0F0F]/40 border-blue-500/10'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-2xl border border-blue-500/20">
                      {student.avatar}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">
                        {student.name}
                      </h4>
                      <p className="text-gray-400 text-xs truncate">{student.role}</p>
                      <p className="text-gray-500 text-xs truncate">{student.college}</p>
                      {student.lastContact && (
                        <p className="text-gray-600 text-xs mt-1">Last: {student.lastContact}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Details */}
            <div className="lg:col-span-2 space-y-6">
              {selectedStudentData ? (
                <>
                  <PremiumContactCard
                    user={{
                      id: selectedStudentData.id,
                      name: selectedStudentData.name,
                      email: selectedStudentData.email,
                      linkedinUrl: selectedStudentData.linkedinUrl,
                      calendarUrl: selectedStudentData.calendarUrl,
                      role: `${selectedStudentData.role} • ${selectedStudentData.college}`,
                      avatar: selectedStudentData.avatar,
                    }}
                    context={{
                      type: 'recruitment',
                    }}
                    platform="huse"
                  />

                  {/* Skills */}
                  <div className="bg-[#0F0F0F]/40 border border-blue-500/20 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudentData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recent Connections Timeline */}
                  {recentConnections.length > 0 && (
                    <div className="bg-[#0F0F0F]/40 border border-blue-500/20 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-bold text-white">Recent Connections</h3>
                      </div>
                      <div className="space-y-3">
                        {recentConnections.map((connection) => {
                          const Icon = iconMap[connection.type];
                          return (
                            <motion.div
                              key={connection.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
                            >
                              <div className="p-2 rounded-lg bg-white/10 text-blue-400">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-medium">
                                  {actionText[connection.type]} to{' '}
                                  <span className="font-bold">{connection.withUser.name}</span>
                                </p>
                                <p className="text-sm text-white/60">{connection.withUser.role}</p>
                                {connection.context && (
                                  <p className="text-xs text-white/50 mt-1">Re: {connection.context}</p>
                                )}
                              </div>
                              <span className="text-xs text-white/50 whitespace-nowrap">
                                {formatTimeAgo(connection.timestamp)}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px] bg-[#0F0F0F]/40 border border-blue-500/20 rounded-2xl">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-bold mb-2">Select a Candidate</h3>
                    <p className="text-gray-400">Choose a candidate from the left to view their contact details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
