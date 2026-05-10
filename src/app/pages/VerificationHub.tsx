import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Shield, Users, Briefcase, EyeOff, Award, GraduationCap,
  ArrowLeft, ExternalLink, CheckCircle, Clock, Filter, Search
} from 'lucide-react';
import { VERIFICATION_BADGES, type BadgeType, getVerificationQueue, type VerificationHubItem } from '../utils/verificationBadges';
import { getContextualButtons } from '../utils/linkTypes';
import { PeerReviewModal } from '../components/PeerReviewModal';
import { BlindDropVotingModal } from '../components/BlindDropVotingModal';

export function VerificationHub() {
  const navigate = useNavigate();
  const [selectedBadgeType, setSelectedBadgeType] = useState<BadgeType>('peer_reviewed');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPeerReviewModal, setShowPeerReviewModal] = useState(false);
  const [showBlindVotingModal, setShowBlindVotingModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<VerificationHubItem | null>(null);

  // Mock user skills for filtering
  const userSkills = ['React', 'TypeScript', 'Node.js', 'UI/UX Design'];

  // Mock verification queue items
  const mockItems: VerificationHubItem[] = [
    {
      projectId: '1',
      projectTitle: 'E-Commerce Platform - Full Stack',
      projectDescription: 'Built a complete e-commerce platform with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.',
      studentName: 'Priya Sharma',
      studentAvatar: '👩‍💻',
      skillTags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      linkTypes: ['github', 'live'],
      requestedBadges: ['peer_reviewed', 'client_rated'],
      pendingBadges: ['peer_reviewed'],
      earnedBadges: [],
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      projectId: '2',
      projectTitle: 'Marketing Campaign Dashboard',
      projectDescription: 'Designed and built an analytics dashboard for tracking marketing campaign performance. Includes real-time metrics, custom reports, and data visualization.',
      studentName: 'Rahul Kumar',
      studentAvatar: '🧑‍💼',
      skillTags: ['React', 'TypeScript', 'Data Visualization', 'UI/UX Design'],
      linkTypes: ['github', 'live', 'figma'],
      requestedBadges: ['peer_reviewed', 'mentor_confirmed'],
      pendingBadges: [],
      earnedBadges: ['peer_reviewed'],
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      projectId: '3',
      projectTitle: 'Mobile App for Campus Events',
      projectDescription: 'Built a React Native mobile app for discovering and managing campus events. Features push notifications, calendar integration, and social sharing.',
      studentName: 'Ananya Patel',
      studentAvatar: '👩‍🎨',
      skillTags: ['React Native', 'TypeScript', 'Firebase', 'UI/UX Design'],
      linkTypes: ['github', 'video', 'figma'],
      requestedBadges: ['peer_reviewed', 'blind_verified'],
      pendingBadges: ['peer_reviewed'],
      earnedBadges: [],
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];

  const queue = getVerificationQueue(mockItems, userSkills, selectedBadgeType);

  const filteredQueue = queue.filter(item =>
    item.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.projectDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const badgeIcons: Record<BadgeType, any> = {
    peer_reviewed: Users,
    client_rated: Briefcase,
    blind_verified: EyeOff,
    recruiter_endorsed: Award,
    mentor_confirmed: GraduationCap
  };

  const handleReview = (item: VerificationHubItem) => {
    setSelectedProject(item);

    if (selectedBadgeType === 'peer_reviewed') {
      setShowPeerReviewModal(true);
    } else if (selectedBadgeType === 'blind_verified') {
      setShowBlindVotingModal(true);
    } else {
      // Other badge types would have their own flows
      console.log('Reviewing for badge type:', selectedBadgeType);
    }
  };

  const handleSubmitPeerReview = (rating: number, feedback: string) => {
    console.log('Peer review submitted:', { rating, feedback, projectId: selectedProject?.projectId });
    // In real implementation, this would call an API
  };

  const handleSubmitBlindVotes = (rankings: string[]) => {
    console.log('Blind votes submitted:', rankings);
    // In real implementation, this would call an API
  };

  return (
    <div className="min-h-screen bg-[#050505]" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/huse-circle-platform')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <Shield className="text-purple-400" size={24} />
                <div>
                  <h1 className="text-white text-xl font-bold">Verification Hub</h1>
                  <p className="text-white/60 text-xs">Where projects meet their verifiers</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block text-sm text-white/60">
              +{VERIFICATION_BADGES[selectedBadgeType].repEarned} Rep per review
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 relative z-10">
        <div className="max-w-7xl mx-auto p-6">
          {/* Badge Type Selector */}
          <div className="mb-8">
            <h2 className="text-white text-lg font-bold mb-4">Select Verification Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {(Object.keys(VERIFICATION_BADGES) as BadgeType[]).map((badgeType) => {
                const badge = VERIFICATION_BADGES[badgeType];
                const Icon = badgeIcons[badgeType];
                const isSelected = selectedBadgeType === badgeType;

                return (
                  <button
                    key={badgeType}
                    onClick={() => setSelectedBadgeType(badgeType)}
                    className={`p-4 rounded-xl border transition-all ${
                      isSelected
                        ? `bg-gradient-to-r ${badge.gradient} bg-opacity-20 border-white/30`
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${badge.color} mb-2`} />
                    <p className="text-white font-semibold text-sm">{badge.label}</p>
                    <p className="text-white/60 text-xs mt-1">+{badge.repEarned} Rep</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Badge Info */}
          <div className={`mb-6 p-6 bg-gradient-to-r ${VERIFICATION_BADGES[selectedBadgeType].gradient} bg-opacity-10 border border-white/20 rounded-xl`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 bg-white/10 rounded-lg`}>
                {(() => {
                  const Icon = badgeIcons[selectedBadgeType];
                  return Icon ? <Icon className={`w-6 h-6 ${VERIFICATION_BADGES[selectedBadgeType].color}`} /> : null;
                })()}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-2">{VERIFICATION_BADGES[selectedBadgeType].label}</h3>
                <p className="text-white/80 mb-4">{VERIFICATION_BADGES[selectedBadgeType].howToEarn}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-xs text-white/50 uppercase mb-2">Requirements</p>
                    <ul className="space-y-1">
                      {VERIFICATION_BADGES[selectedBadgeType].requirements.map((req, idx) => (
                        <li key={idx} className="text-xs text-white/70 flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-xs text-white/50 uppercase mb-2">Cannot Be Faked</p>
                    <p className="text-xs text-white/70">{VERIFICATION_BADGES[selectedBadgeType].cannotBeFaked}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-purple-500/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-purple-500/40"
            />
          </div>

          {/* Verification Queue */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">
                {filteredQueue.length} Project{filteredQueue.length !== 1 ? 's' : ''} Awaiting Verification
              </h2>
            </div>

            {filteredQueue.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">No Projects in Queue</h3>
                <p className="text-white/60">
                  {selectedBadgeType === 'peer_reviewed' || selectedBadgeType === 'mentor_confirmed'
                    ? 'No projects matching your skills need verification right now'
                    : 'No projects requesting this verification type at the moment'}
                </p>
              </div>
            ) : (
              filteredQueue.map((item) => {
                const contextualButtons = getContextualButtons(item.linkTypes);

                return (
                  <motion.div
                    key={item.projectId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all"
                  >
                    {/* Student Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl border border-purple-500/20">
                        {item.studentAvatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{item.projectTitle}</h3>
                        <p className="text-sm text-white/60 mb-2">by {item.studentName}</p>
                        <p className="text-sm text-white/70">{item.projectDescription}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/40">Submitted</p>
                        <p className="text-sm text-white/70">{new Date(item.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.skillTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            userSkills.includes(tag)
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-white/5 text-white/60 border border-white/10'
                          }`}
                        >
                          {tag}
                          {userSkills.includes(tag) && ' ✓'}
                        </span>
                      ))}
                    </div>

                    {/* Project Links */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {contextualButtons.map((button, idx) => (
                        <a
                          key={idx}
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                        >
                          {button.label}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>

                    {/* Badges Status */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        {item.earnedBadges.length > 0 && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-white/70">{item.earnedBadges.length} Earned</span>
                          </div>
                        )}
                        {item.pendingBadges.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-white/70">{item.pendingBadges.length} Pending</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleReview(item)}
                        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        {selectedBadgeType === 'blind_verified' ? 'Vote' : 'Review'} Project
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                          +{VERIFICATION_BADGES[selectedBadgeType].repEarned} Rep
                        </span>
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedProject && (
        <>
          <PeerReviewModal
            isOpen={showPeerReviewModal}
            onClose={() => {
              setShowPeerReviewModal(false);
              setSelectedProject(null);
            }}
            projectTitle={selectedProject.projectTitle}
            projectDescription={selectedProject.projectDescription}
            studentName={selectedProject.studentName}
            onSubmitReview={handleSubmitPeerReview}
          />

          <BlindDropVotingModal
            isOpen={showBlindVotingModal}
            onClose={() => {
              setShowBlindVotingModal(false);
              setSelectedProject(null);
            }}
            submissions={[
              {
                id: '1',
                title: 'Submission A',
                description: 'A creative solution to the prompt'
              },
              {
                id: '2',
                title: 'Submission B',
                description: 'An innovative approach'
              },
              {
                id: '3',
                title: 'Submission C',
                description: 'A thoughtful implementation'
              },
              {
                id: '4',
                title: 'Submission D',
                description: 'A unique perspective'
              },
              {
                id: '5',
                title: 'Submission E',
                description: 'A well-executed concept'
              }
            ]}
            promptTitle="Build a landing page for a SaaS product"
            onSubmitVotes={handleSubmitBlindVotes}
          />
        </>
      )}
    </div>
  );
}
