import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Shield, Users, Briefcase, EyeOff, Award, GraduationCap,
  ExternalLink, Plus, CheckCircle, Clock, AlertCircle
} from 'lucide-react';
import { VERIFICATION_BADGES, type BadgeType, calculateBadgeRep, calculateProofScore } from '../utils/verificationBadges';
import { LINK_TYPES, getContextualButtons } from '../utils/linkTypes';

interface PeerReview {
  reviewerName: string;
  reviewerTier: string;
  rating: number;
  feedback: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  skillTags: string[];
  linkTypes: Array<{ type: string; url: string }>;
  earnedBadges: BadgeType[];
  pendingBadges: BadgeType[];
  createdAt: Date;
  reputationEarned: number;
  peerReviews?: PeerReview[];
}

interface ProofPortfolioProps {
  projects: Project[];
  userTier: string;
  onRequestVerification: (projectId: string, badgeType: BadgeType) => void;
  onAddProject: () => void;
}

export function ProofPortfolio({ projects, userTier, onRequestVerification, onAddProject }: ProofPortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const badgeIcons: Record<BadgeType, any> = {
    peer_reviewed: Users,
    client_rated: Briefcase,
    blind_verified: EyeOff,
    recruiter_endorsed: Award,
    mentor_confirmed: GraduationCap
  };

  // Calculate total stats
  const totalRep = projects.reduce((sum, p) => sum + p.reputationEarned, 0);
  const totalBadges = projects.reduce((sum, p) => sum + p.earnedBadges.length, 0);
  const verifiedProjects = projects.filter(p => p.earnedBadges.length > 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-purple-400" />
            Proof Portfolio
          </h2>
          <p className="text-white/60 text-sm mt-1">
            Projects earn rep through verification, not just posting
          </p>
        </div>
        <button
          onClick={onAddProject}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalRep.toLocaleString()}</p>
              <p className="text-sm text-white/60">Rep Earned</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalBadges}</p>
              <p className="text-sm text-white/60">Verification Badges</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Award className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{verifiedProjects}/{projects.length}</p>
              <p className="text-sm text-white/60">Verified Projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List - Horizontal Cards */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
            <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white text-xl font-bold mb-2">No Projects Yet</h3>
            <p className="text-white/60 mb-6">
              Add your first project to start building your Proof Portfolio
            </p>
            <button
              onClick={onAddProject}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            >
              Add Your First Project
            </button>
          </div>
        ) : (
          projects.map((project) => {
            const proofScore = calculateProofScore(
              project.linkTypes.map(l => l.type),
              project.earnedBadges
            );
            const contextualButtons = getContextualButtons(project.linkTypes.map(l => l.type));

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all"
              >
                {/* Horizontal Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Side - Project Info */}
                  <div className="flex-1 space-y-4">
                    {/* Project Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-white/70 text-sm mb-3">{project.description}</p>

                        {/* Skill Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.skillTags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Proof Score */}
                      <div className="text-right ml-4">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          proofScore.level === 'verified' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          proofScore.level === 'high' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          proofScore.level === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {proofScore.level === 'verified' ? '✓ Verified' :
                           proofScore.level === 'high' ? 'High Proof' :
                           proofScore.level === 'medium' ? 'Medium Proof' :
                           'Low Proof'}
                        </div>
                        <p className="text-xs text-white/40 mt-1">Score: {proofScore.score}</p>
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex flex-wrap gap-2">
                      {contextualButtons.map((button, idx) => {
                        const link = project.linkTypes.find(l => l.type === button.linkTypeId);
                        if (!link) return null;

                        return (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                          >
                            {button.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        );
                      })}
                    </div>

                    {/* Rep Earned */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <p className="text-sm text-white/60">
                        Posted {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-semibold text-purple-400">
                        +{project.reputationEarned} Rep Earned
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Peer Reviews */}
                  {project.peerReviews && project.peerReviews.length > 0 && (
                    <div className="lg:w-80 space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-blue-400" />
                        <p className="text-sm font-bold text-white">Peer Reviews</p>
                      </div>
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {project.peerReviews.map((review, idx) => (
                          <div
                            key={idx}
                            className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-white font-semibold text-sm">{review.reviewerName}</p>
                                <p className="text-blue-400 text-xs">{review.reviewerTier}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, starIdx) => (
                                  <Award
                                    key={starIdx}
                                    className={`w-3 h-3 ${
                                      starIdx < review.rating
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-white/70 text-xs leading-relaxed">{review.feedback}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Badges Section - Below the horizontal layout */}
                {(project.earnedBadges.length > 0 || project.pendingBadges.length > 0) && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    {/* Earned Badges */}
                    {project.earnedBadges.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-4 h-4 text-green-400" />
                          <p className="text-sm font-bold text-white uppercase tracking-wider">Verification Badges</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project.earnedBadges.map((badgeType) => {
                            const badge = VERIFICATION_BADGES[badgeType];
                            const Icon = badgeIcons[badgeType];
                            return (
                              <div
                                key={badgeType}
                                className={`relative overflow-hidden bg-gradient-to-br ${badge.gradient} bg-opacity-10 border-2 border-white/20 rounded-xl p-4 hover:border-white/30 transition-all`}
                              >
                                <div className="absolute top-2 right-2">
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className={`p-2 bg-white/10 rounded-lg flex-shrink-0`}>
                                    <Icon className={`w-5 h-5 ${badge.color}`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-white font-bold text-sm mb-1">{badge.label}</p>
                                    <p className="text-white/60 text-xs line-clamp-2 mb-2">
                                      {badge.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs font-bold text-green-400">
                                        +{badge.repEarned} Rep
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Pending Badges */}
                    {project.pendingBadges.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <p className="text-sm font-bold text-white uppercase tracking-wider">Pending Verification</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project.pendingBadges.map((badgeType) => {
                            const badge = VERIFICATION_BADGES[badgeType];
                            const Icon = badgeIcons[badgeType];
                            return (
                              <div
                                key={badgeType}
                                className="relative overflow-hidden bg-yellow-500/5 border-2 border-yellow-500/30 rounded-xl p-4 hover:border-yellow-500/50 transition-all"
                              >
                                <div className="absolute top-2 right-2">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-yellow-500/10 rounded-lg flex-shrink-0">
                                    <Icon className="w-5 h-5 text-yellow-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-white font-bold text-sm mb-1">{badge.label}</p>
                                    <p className="text-white/60 text-xs">
                                      Awaiting review...
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Request Verification */}
                    {project.earnedBadges.length + project.pendingBadges.length < 5 && (
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-white/80 mb-2">
                              <strong>Request verification</strong> to earn more rep
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {(Object.keys(VERIFICATION_BADGES) as BadgeType[]).map((badgeType) => {
                                if (project.earnedBadges.includes(badgeType) || project.pendingBadges.includes(badgeType)) {
                                  return null;
                                }

                                const badge = VERIFICATION_BADGES[badgeType];
                                return (
                                  <button
                                    key={badgeType}
                                    onClick={() => onRequestVerification(project.id, badgeType)}
                                    className="px-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-xs text-white hover:bg-white/10 transition-colors"
                                  >
                                    Request {badge.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
