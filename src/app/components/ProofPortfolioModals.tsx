import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Plus, Link as LinkIcon, Shield, Users, Briefcase, EyeOff,
  Award, GraduationCap, CheckCircle, AlertCircle, Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { VERIFICATION_BADGES, type BadgeType } from '../utils/verificationBadges';
import { LINK_TYPES } from '../utils/linkTypes';
import { ALL_SKILL_TAGS, SKILL_CATEGORIES } from '../utils/skillTags';
import { REP_SOURCES } from '../utils/tierSystem';

// Add Project Modal for Proof Portfolio
export function ProofPortfolioAddProjectModal({ show, onClose, onAdd }: any) {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [links, setLinks] = useState<Array<{ type: string; url: string }>>([]);
  const [newLinkType, setNewLinkType] = useState('github');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const handleAddLink = () => {
    if (!newLinkUrl) {
      toast.error('Please enter a URL');
      return;
    }
    setLinks([...links, { type: newLinkType, url: newLinkUrl }]);
    setNewLinkUrl('');
    toast.success('Link added');
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      if (selectedSkills.length >= 6) {
        toast.error('Maximum 6 skills allowed');
        return;
      }
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = () => {
    console.log('Submit clicked - validating form...');
    if (!projectTitle || !projectDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (links.length === 0) {
      toast.error('Add at least one project link');
      return;
    }

    if (selectedSkills.length === 0) {
      toast.error('Select at least one skill tag');
      return;
    }

    // Auto-select project emoji based on skills
    const getProjectEmoji = () => {
      const firstSkill = selectedSkills[0];
      if (['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript'].includes(firstSkill)) return '💻';
      if (['UI/UX Design', 'Graphic Design', 'Figma'].includes(firstSkill)) return '🎨';
      if (['Market Research', 'Business Strategy', 'Financial Modeling'].includes(firstSkill)) return '📊';
      if (['Content Writing', 'Copywriting', 'SEO'].includes(firstSkill)) return '✍️';
      if (['Legal Research', 'Contract Drafting'].includes(firstSkill)) return '⚖️';
      if (['Financial Analysis', 'Accounting'].includes(firstSkill)) return '💰';
      if (['Public Speaking', 'Event Management'].includes(firstSkill)) return '🎤';
      if (['Academic Writing', 'Research'].includes(firstSkill)) return '📚';
      return '💼';
    };

    const newProject = {
      id: Date.now(),
      title: projectTitle,
      description: projectDescription,
      tech: selectedSkills,
      image: getProjectEmoji(),
      links: links,
      likes: 0,
      views: 0,
      recruitersViewed: 0,
      verificationBadges: [],
      pendingBadges: [],
      proofScore: 0,
      reputationEarned: REP_SOURCES.POST_PROJECT
    };

    console.log('Adding new project:', newProject);
    onAdd(newProject);
    toast.success(`Project added! +${REP_SOURCES.POST_PROJECT} Rep • ${selectedSkills.length} skills tagged`);

    // Reset form
    setProjectTitle('');
    setProjectDescription('');
    setSelectedSkills([]);
    setLinks([]);
    setNewLinkUrl('');
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-purple-500/30 rounded-2xl p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-2xl font-bold flex items-center gap-2">
                  <Shield className="text-purple-400" />
                  Add a project to your Proof Portfolio
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Earn reputation by getting your work verified
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Project Title */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="E-Commerce Platform - Full Stack"
                  className="w-full bg-[#1A1A1A] border border-purple-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/40"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe what you built, the problem it solves, and your role..."
                  rows={4}
                  className="w-full bg-[#1A1A1A] border border-purple-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/40 resize-none"
                />
              </div>

              {/* Links Section */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Project Links * (GitHub, Live Site, Figma, etc.)
                </label>

                {/* Added Links */}
                {links.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {links.map((link, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <LinkIcon size={14} className="text-purple-400" />
                        <span className="text-xs text-gray-400 capitalize">{link.type}:</span>
                        <span className="text-xs text-white flex-1 truncate">{link.url}</span>
                        <button
                          onClick={() => handleRemoveLink(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Link Form */}
                <div className="flex gap-2">
                  <select
                    value={newLinkType}
                    onChange={(e) => setNewLinkType(e.target.value)}
                    className="bg-[#1A1A1A] border border-purple-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/40"
                  >
                    <optgroup label="Code & Tech">
                      <option value="github">GitHub Repository</option>
                      <option value="live">Live Website/App</option>
                    </optgroup>
                    <optgroup label="Design">
                      <option value="figma">Figma Design File</option>
                      <option value="behance">Behance / Dribbble</option>
                    </optgroup>
                    <optgroup label="Media & Content">
                      <option value="video">Demo Video / YouTube</option>
                      <option value="presentation">Presentation / Slides</option>
                      <option value="document">Document / Report</option>
                      <option value="portfolio">Portfolio Website</option>
                    </optgroup>
                    <optgroup label="Research & Writing">
                      <option value="article">Published Article</option>
                      <option value="research">Research Paper</option>
                      <option value="case_study">Case Study</option>
                    </optgroup>
                    <optgroup label="Social & Community">
                      <option value="linkedin">LinkedIn Post</option>
                      <option value="medium">Medium Article</option>
                      <option value="social">Social Media Campaign</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option value="spreadsheet">Spreadsheet / Data</option>
                      <option value="other">Other Link</option>
                    </optgroup>
                  </select>
                  <input
                    type="url"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-[#1A1A1A] border border-purple-500/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/40"
                  />
                  <button
                    onClick={handleAddLink}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Skill Tags */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Skill Tags * (Select up to 6)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Choose skills that match your project. Reviewers with these skills will verify your work.
                </p>

                {/* Category-based skill selection - All 90 skills */}
                <div className="max-h-96 overflow-y-auto p-4 bg-[#1A1A1A] border border-purple-500/20 rounded-lg space-y-4">
                  {Object.entries(SKILL_CATEGORIES).map(([categoryName, category]) => {
                    const categoryColors: Record<string, string> = {
                      blue: 'bg-blue-400',
                      pink: 'bg-pink-400',
                      purple: 'bg-purple-400',
                      green: 'bg-green-400',
                      gray: 'bg-gray-400',
                      yellow: 'bg-yellow-400',
                      cyan: 'bg-cyan-400',
                      indigo: 'bg-indigo-400'
                    };

                    return (
                      <div key={categoryName}>
                        <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${categoryColors[category.color] || 'bg-gray-400'}`}></span>
                          {categoryName}
                        </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.tags.map((skill) => (
                          <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              selectedSkills.includes(skill)
                                ? 'bg-purple-500 text-white border-2 border-purple-400'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/30'
                            }`}
                          >
                            {skill}
                            {selectedSkills.includes(skill) && ' ✓'}
                          </button>
                        ))}
                      </div>
                    </div>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedSkills.length}/6 skills selected • All categories supported (Tech, Design, Business, Marketing, Legal, Finance, Leadership, Research)
                </p>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm text-white font-semibold mb-1">For ALL Students (Tech + Non-Tech)</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• <strong>+{REP_SOURCES.POST_PROJECT} Rep</strong> for posting this project</li>
                      <li>• Request verification to earn <strong>+{REP_SOURCES.BLIND_VERIFIED} to +{REP_SOURCES.RECRUITER_ENDORSED} Rep</strong> per badge</li>
                      <li>• Works for code, design, business, content, research, and more!</li>
                      <li>• Projects with high proof scores get seen by more recruiters</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Add to Proof Portfolio
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Request Verification Modal
export function ProofPortfolioRequestVerificationModal({ show, onClose, project }: any) {
  const [selectedBadges, setSelectedBadges] = useState<BadgeType[]>([]);

  const toggleBadge = (badgeType: BadgeType) => {
    if (selectedBadges.includes(badgeType)) {
      setSelectedBadges(selectedBadges.filter(b => b !== badgeType));
    } else {
      setSelectedBadges([...selectedBadges, badgeType]);
    }
  };

  const handleSubmit = () => {
    if (selectedBadges.length === 0) {
      toast.error('Select at least one verification type');
      return;
    }

    toast.success(`Verification requested for ${selectedBadges.length} badge(s)!`);
    onClose();
  };

  const badgeIcons: Record<BadgeType, any> = {
    peer_reviewed: Users,
    client_rated: Briefcase,
    blind_verified: EyeOff,
    recruiter_endorsed: Award,
    mentor_confirmed: GraduationCap
  };

  if (!project) return null;

  // Filter out already earned or pending badges
  const availableBadges = (Object.keys(VERIFICATION_BADGES) as BadgeType[]).filter(
    badgeType => !project.verificationBadges.includes(badgeType) && !project.pendingBadges.includes(badgeType)
  );

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-purple-500/30 rounded-2xl p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-2xl font-bold">Request Verification</h3>
                <p className="text-gray-400 text-sm mt-1">
                  For project: <strong>{project.title}</strong>
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Info */}
            <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-white">
                <strong>How does this work?</strong>
              </p>
              <p className="text-xs text-gray-300 mt-2">
                Select which verification badges you want to earn. Each badge has specific requirements and reviewers. Your project will be added to the verification queue where qualified reviewers can validate your work.
              </p>
            </div>

            {/* Badge Selection */}
            <div className="space-y-4 mb-6">
              {availableBadges.map((badgeType) => {
                const badge = VERIFICATION_BADGES[badgeType];
                const Icon = badgeIcons[badgeType];
                const isSelected = selectedBadges.includes(badgeType);

                return (
                  <button
                    key={badgeType}
                    onClick={() => toggleBadge(badgeType)}
                    className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? `bg-gradient-to-r ${badge.gradient} bg-opacity-20 border-white/40`
                        : 'bg-white/5 border-white/10 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-white/5'}`}>
                        <Icon className={`w-6 h-6 ${badge.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-bold text-lg">{badge.label}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full font-semibold">
                              +{badge.repEarned} Rep
                            </span>
                            {isSelected && <CheckCircle className="text-green-400" size={20} />}
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">{badge.howToEarn}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="text-xs">
                            <p className="text-gray-500 uppercase tracking-wider mb-1">Requirements</p>
                            <ul className="space-y-1">
                              {badge.requirements.slice(0, 3).map((req, idx) => (
                                <li key={idx} className="text-gray-400 flex items-start gap-1">
                                  <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="text-xs">
                            <p className="text-gray-500 uppercase tracking-wider mb-1">Cannot Be Faked</p>
                            <p className="text-gray-400">{badge.cannotBeFaked}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {availableBadges.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-white font-semibold mb-2">All Badges Earned or Pending!</p>
                <p className="text-gray-400 text-sm">This project has all available verification badges.</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedBadges.length === 0}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Request {selectedBadges.length} Verification{selectedBadges.length !== 1 ? 's' : ''}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
