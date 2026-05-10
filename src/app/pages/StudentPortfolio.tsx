import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft, Star, MapPin, Calendar, GraduationCap, CheckCircle,
  ExternalLink, Github, Linkedin, Mail, Phone, Award, Code,
  Briefcase, Eye, Heart, Share2, Download, TrendingUp,
  Zap, Target, Users, BookOpen, Trophy, MessageCircle, Shield
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { getStudentById } from '../data/studentsData';
import { ProofPortfolio } from '../components/ProofPortfolio';
import type { BadgeType } from '../utils/verificationBadges';

export function StudentPortfolio() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'achievements' | 'experience' | 'portfolio'>('projects');

  // Get student data from shared database
  const student = getStudentById(Number(studentId));

  // If student not found, show error
  if (!student) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Student Not Found</h1>
          <p className="text-gray-400 mb-6">The student profile you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const stats = {
    totalProjects: student.projects,
    gigsCompleted: student.gigs,
    totalViews: student.detailedProjects?.reduce((sum, p) => sum + p.views, 0) || 0,
    followers: Math.floor(student.reputation / 5)
  };

  // Mock Proof Portfolio projects
  const portfolioProjects = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL',
      skillTags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      linkTypes: [
        { type: 'github', url: 'https://github.com/example/ecommerce' },
        { type: 'live', url: 'https://ecommerce-demo.com' }
      ],
      earnedBadges: ['peer_reviewed', 'client_rated'] as BadgeType[],
      pendingBadges: [] as BadgeType[],
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      reputationEarned: 500,
      peerReviews: [
        {
          reviewerName: 'Rahul Verma',
          reviewerTier: 'Silver Tier',
          rating: 5,
          feedback: 'Excellent implementation of the payment system. The code is clean, well-documented, and follows best practices. The UI/UX is intuitive and responsive across all devices.'
        },
        {
          reviewerName: 'Priya Sharma',
          reviewerTier: 'Gold Tier',
          rating: 4,
          feedback: 'Great project overall! The architecture is solid and the feature set is impressive. Could improve on error handling in the checkout flow, but otherwise very well done.'
        },
        {
          reviewerName: 'Ankit Singh',
          reviewerTier: 'Bronze Tier',
          rating: 5,
          feedback: 'Really loved the admin dashboard integration. The real-time inventory updates work flawlessly. This is production-ready code!'
        }
      ]
    },
    {
      id: '2',
      title: 'Marketing Dashboard',
      description: 'Analytics dashboard for tracking campaign performance with real-time metrics',
      skillTags: ['React', 'TypeScript', 'Data Visualization'],
      linkTypes: [
        { type: 'github', url: 'https://github.com/example/dashboard' },
        { type: 'figma', url: 'https://figma.com/file/example' }
      ],
      earnedBadges: ['peer_reviewed'] as BadgeType[],
      pendingBadges: ['mentor_confirmed'] as BadgeType[],
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      reputationEarned: 200,
      peerReviews: [
        {
          reviewerName: 'Sneha Patel',
          reviewerTier: 'Gold Tier',
          rating: 4,
          feedback: 'Beautiful data visualizations! The charts are interactive and provide valuable insights. TypeScript implementation is solid and type-safe.'
        }
      ]
    }
  ];

  const handleRequestVerification = (projectId: string, badgeType: BadgeType) => {
    toast.success(`Verification requested for ${badgeType.replace('_', ' ')}`);
  };

  const handleAddProject = () => {
    toast.info('Add project modal would open here');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toast.success('Portfolio shared!')}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
              >
                <Share2 size={18} className="text-gray-400" />
              </button>
              <button
                onClick={() => toast.success('Portfolio downloaded!')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg transition-all"
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="text-[120px]">{student.avatar}</div>
              {student.verified && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center">
                  <CheckCircle size={20} className="text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{student.name}</h1>
                  <p className="text-purple-400 text-xl mb-3">{student.year} • {student.branch}</p>
                  <div className="flex items-center gap-4 text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={18} />
                      <span>{student.college}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span>{student.location}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-xl font-bold ${
                  student.tier === 'Platinum' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/40 text-blue-400' :
                  student.tier === 'Gold' ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-400' :
                  'bg-gradient-to-r from-gray-500/20 to-gray-400/20 border border-gray-500/40 text-gray-400'
                }`}>
                  {student.tier} Tier
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">{student.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-black/30 rounded-xl p-4 text-center">
                  <Zap className="text-amber-400 mx-auto mb-2" size={24} />
                  <p className="text-amber-400 font-bold text-2xl">{student.reputation}</p>
                  <p className="text-gray-500 text-xs">Reputation</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 text-center">
                  <Code className="text-purple-400 mx-auto mb-2" size={24} />
                  <p className="text-purple-400 font-bold text-2xl">{stats.totalProjects}</p>
                  <p className="text-gray-500 text-xs">Projects</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 text-center">
                  <Briefcase className="text-green-400 mx-auto mb-2" size={24} />
                  <p className="text-green-400 font-bold text-2xl">{stats.gigsCompleted}</p>
                  <p className="text-gray-500 text-xs">Gigs Done</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 text-center">
                  <Award className="text-blue-400 mx-auto mb-2" size={24} />
                  <p className="text-blue-400 font-bold text-2xl">{student.cgpa}</p>
                  <p className="text-gray-500 text-xs">CGPA</p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${student.contact.email}`}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  <Mail size={18} />
                  Contact Me
                </a>
                <a
                  href={student.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
                <a
                  href={student.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black border border-white/10 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Target className="text-purple-400" size={28} />
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(student.skillLevels || []).map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-purple-400 text-sm font-bold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 1 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            Projects ({student.projects})
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'portfolio'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <Shield size={16} />
            Proof Portfolio ({portfolioProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            Achievements ({student.achievements?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            Experience ({student.experience?.length || 0})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'portfolio' && (
          <ProofPortfolio
            projects={portfolioProjects}
            userTier={student.tier}
            onRequestVerification={handleRequestVerification}
            onAddProject={handleAddProject}
          />
        )}

        {activeTab === 'projects' && (
          <div className="grid md:grid-cols-2 gap-6">
            {student.detailedProjects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group"
              >
                {project.featured && (
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1 text-xs font-bold flex items-center gap-1">
                    <Star size={12} className="fill-white" />
                    Featured Project
                  </div>
                )}
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        {project.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={14} />
                        {project.likes}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                        >
                          <Github size={16} className="text-gray-400" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                        >
                          <ExternalLink size={16} className="text-gray-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 gap-6">
            {student.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${achievement.color}/10 border border-white/10 rounded-2xl p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{achievement.date}</p>
                    <p className="text-gray-300">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            {student.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                    {exp.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-purple-400 font-medium mb-2">{exp.company}</p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <Calendar size={14} />
                      {exp.duration}
                    </div>
                    <p className="text-gray-300">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}