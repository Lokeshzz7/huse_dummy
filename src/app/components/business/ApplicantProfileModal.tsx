import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Star, Briefcase, GraduationCap, MapPin, Mail, Phone, Globe, Github, Linkedin, Calendar, TrendingUp, CheckCircle, DollarSign, Clock, Download } from 'lucide-react';

interface ApplicantProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: {
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
  };
  onUpdateStatus: (status: 'pending' | 'shortlisted' | 'accepted' | 'rejected') => void;
}

export function ApplicantProfileModal({ isOpen, onClose, applicant, onUpdateStatus }: ApplicantProfileModalProps) {
  // Mock detailed profile data
  const profileData = {
    phone: '+91 9876543210',
    location: 'Bangalore, India',
    website: 'www.portfolio.com',
    github: 'github.com/user',
    linkedin: 'linkedin.com/in/user',
    bio: 'Passionate developer with expertise in full-stack development. Love building scalable applications and contributing to open source.',
    education: [
      {
        degree: 'B.Tech in Computer Science',
        institution: 'IIT Bombay',
        year: '2020 - 2024',
        grade: '8.5 CGPA'
      }
    ],
    workExperience: [
      {
        title: 'Full Stack Developer',
        company: 'Tech Startup',
        duration: 'Jan 2023 - Present',
        description: 'Built and maintained web applications using React and Node.js'
      },
      {
        title: 'Software Intern',
        company: 'MNC Corp',
        duration: 'Jun 2022 - Dec 2022',
        description: 'Worked on mobile app development with React Native'
      }
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Built a full-featured e-commerce platform with payment integration',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'github.com/project1'
      },
      {
        name: 'Task Management App',
        description: 'Collaborative task management tool with real-time updates',
        tech: ['Next.js', 'Firebase', 'Tailwind'],
        link: 'github.com/project2'
      },
      {
        name: 'AI Chatbot',
        description: 'Intelligent chatbot using OpenAI API for customer support',
        tech: ['Python', 'OpenAI', 'Flask'],
        link: 'github.com/project3'
      }
    ],
    achievements: [
      'Won 1st place in National Hackathon 2023',
      'Open source contributor to React ecosystem',
      'Published 5 technical articles on Medium'
    ],
    contributions: applicant.platform === 'Dofracto' ? {
      totalEarned: '₹2,45,000',
      projectsCompleted: applicant.completedProjects || 12,
      avgRating: applicant.rating || 4.8,
      reviews: [
        {
          project: 'Website Redesign',
          client: 'TechVenture AI',
          rating: 5,
          comment: 'Excellent work! Delivered ahead of schedule and exceeded expectations.',
          date: '2 weeks ago'
        },
        {
          project: 'Mobile App Development',
          client: 'EcoSolutions',
          rating: 4.5,
          comment: 'Great communication and quality work. Would hire again.',
          date: '1 month ago'
        }
      ]
    } : null
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/30', icon: Clock },
      shortlisted: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30', icon: Star },
      accepted: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30', icon: CheckCircle },
      rejected: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30', icon: X },
    };
    const style = styles[status as keyof typeof styles];
    const Icon = style.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${style.bg} ${style.text} ${style.border}`}>
        <Icon className="w-4 h-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
            <div className="w-full max-w-5xl h-[90vh] bg-theme-card border border-theme-accent rounded-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#24c6dc]/20 to-[#05997F]/20 border-b border-theme-accent p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{applicant.avatar}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-theme-primary mb-1">{applicant.name}</h2>
                      <p className="text-theme-tertiary mb-2">{applicant.experience}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${
                          applicant.platform === 'Dofracto'
                            ? 'bg-[#24c6dc]/10 text-[#24c6dc] border-[#24c6dc]/30'
                            : 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30'
                        }`}>
                          {applicant.platform === 'Dofracto' ? <Award className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                          {applicant.platform} • {applicant.tier}
                        </span>
                        {getStatusBadge(applicant.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-theme-tertiary">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Applied {applicant.appliedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-theme-secondary rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-theme-muted" />
                  </button>
                </div>

                {/* Dofracto Stats */}
                {applicant.platform === 'Dofracto' && profileData.contributions && (
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-theme-card border border-theme-accent rounded-lg p-3">
                      <Star className="w-5 h-5 text-yellow-500 mb-1" />
                      <p className="text-xl font-bold text-theme-primary">{profileData.contributions.avgRating}</p>
                      <p className="text-xs text-theme-tertiary">Avg Rating</p>
                    </div>
                    <div className="bg-theme-card border border-theme-accent rounded-lg p-3">
                      <Briefcase className="w-5 h-5 text-[#24c6dc] mb-1" />
                      <p className="text-xl font-bold text-theme-primary">{profileData.contributions.projectsCompleted}</p>
                      <p className="text-xs text-theme-tertiary">Projects</p>
                    </div>
                    <div className="bg-theme-card border border-theme-accent rounded-lg p-3">
                      <Award className="w-5 h-5 text-[#05997F] mb-1" />
                      <p className="text-xl font-bold text-theme-primary">{applicant.reputation}</p>
                      <p className="text-xs text-theme-tertiary">Reputation</p>
                    </div>
                    <div className="bg-theme-card border border-theme-accent rounded-lg p-3">
                      <DollarSign className="w-5 h-5 text-green-500 mb-1" />
                      <p className="text-xl font-bold text-theme-primary">{profileData.contributions.totalEarned}</p>
                      <p className="text-xs text-theme-tertiary">Total Earned</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Contact Info */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-3">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-theme-tertiary">
                      <Mail className="w-4 h-4 text-[#24c6dc]" />
                      <a href={`mailto:${applicant.email}`} className="hover:text-[#24c6dc]">{applicant.email}</a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-theme-tertiary">
                      <Phone className="w-4 h-4 text-[#24c6dc]" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-theme-tertiary">
                      <MapPin className="w-4 h-4 text-[#24c6dc]" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-theme-tertiary">
                      <Globe className="w-4 h-4 text-[#24c6dc]" />
                      <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#24c6dc]">
                        {profileData.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-theme-tertiary">
                      <Github className="w-4 h-4 text-[#24c6dc]" />
                      <a href={`https://${profileData.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#24c6dc]">
                        {profileData.github}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-theme-tertiary">
                      <Linkedin className="w-4 h-4 text-[#24c6dc]" />
                      <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#24c6dc]">
                        {profileData.linkedin}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-3">Cover Letter</h3>
                  <div className="bg-theme-secondary border border-theme-accent rounded-lg p-4">
                    <p className="text-theme-tertiary text-sm leading-relaxed">{applicant.coverLetter}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-theme-secondary border border-theme-accent text-theme-primary rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-3">Education</h3>
                  <div className="space-y-3">
                    {profileData.education.map((edu, i) => (
                      <div key={i} className="bg-theme-secondary border border-theme-accent rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-theme-primary">{edu.degree}</h4>
                            <p className="text-sm text-theme-tertiary">{edu.institution}</p>
                          </div>
                          <span className="text-xs text-theme-muted">{edu.year}</span>
                        </div>
                        <p className="text-sm text-theme-tertiary">Grade: {edu.grade}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-3">Work Experience</h3>
                  <div className="space-y-3">
                    {profileData.workExperience.map((work, i) => (
                      <div key={i} className="bg-theme-secondary border border-theme-accent rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-theme-primary">{work.title}</h4>
                            <p className="text-sm text-theme-tertiary">{work.company}</p>
                          </div>
                          <span className="text-xs text-theme-muted">{work.duration}</span>
                        </div>
                        <p className="text-sm text-theme-tertiary">{work.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-3">Projects</h3>
                  <div className="space-y-3">
                    {profileData.projects.map((project, i) => (
                      <div key={i} className="bg-theme-secondary border border-theme-accent rounded-lg p-4">
                        <h4 className="font-semibold text-theme-primary mb-2">{project.name}</h4>
                        <p className="text-sm text-theme-tertiary mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.tech.map((tech, j) => (
                            <span key={j} className="px-2 py-1 bg-theme-tertiary text-theme-primary rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#24c6dc] hover:underline">
                          View Project →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dofracto Reviews */}
                {applicant.platform === 'Dofracto' && profileData.contributions && (
                  <div>
                    <h3 className="font-bold text-theme-primary mb-3">Client Reviews</h3>
                    <div className="space-y-3">
                      {profileData.contributions.reviews.map((review, i) => (
                        <div key={i} className="bg-theme-secondary border border-theme-accent rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-theme-primary">{review.project}</h4>
                              <p className="text-sm text-theme-tertiary">{review.client}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-semibold text-theme-primary">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-theme-tertiary mb-2">{review.comment}</p>
                          <span className="text-xs text-theme-muted">{review.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-3">Achievements</h3>
                  <ul className="space-y-2">
                    {profileData.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-theme-tertiary">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-theme-accent bg-theme-secondary">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      // Download resume logic
                      alert('Resume download functionality');
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-theme-tertiary text-theme-primary rounded-lg hover:bg-theme-card transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </button>
                  <div className="flex-1"></div>
                  {applicant.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          onUpdateStatus('rejected');
                          onClose();
                        }}
                        className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all font-medium"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          onUpdateStatus('shortlisted');
                          onClose();
                        }}
                        className="px-6 py-3 bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all font-medium"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => {
                          onUpdateStatus('accepted');
                          onClose();
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all font-medium"
                      >
                        Accept
                      </button>
                    </>
                  )}
                  {applicant.status === 'shortlisted' && (
                    <>
                      <button
                        onClick={() => {
                          onUpdateStatus('rejected');
                          onClose();
                        }}
                        className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all font-medium"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          onUpdateStatus('accepted');
                          onClose();
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all font-medium"
                      >
                        Accept
                      </button>
                    </>
                  )}
                  {(applicant.status === 'accepted' || applicant.status === 'rejected') && (
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all font-medium"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
