// Verification Badge System - Anti-Gaming Proof Portfolio
// Updated: May 2, 2026

export type BadgeType = 'peer_reviewed' | 'client_rated' | 'blind_verified' | 'recruiter_endorsed' | 'mentor_confirmed';

export interface VerificationBadge {
  id: BadgeType;
  label: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  repEarned: number;
  requirements: string[];
  howToEarn: string;
  cannotBeFaked: string;
}

// 5 Verification Badge Types
export const VERIFICATION_BADGES: Record<BadgeType, VerificationBadge> = {
  peer_reviewed: {
    id: 'peer_reviewed',
    label: 'Peer Reviewed',
    description: '5 peers with matching skills validated this project',
    icon: 'users-check',
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-blue-600',
    repEarned: 50, // Reduced from 200 - earned per review given
    requirements: [
      'Spend minimum 2 minutes reviewing',
      'Write 50+ characters of feedback',
      'Give a 1-5 star rating',
      'Feedback displayed publicly with your name'
    ],
    howToEarn: 'Review projects in the Verification Hub. Earn +50 Rep per thorough review.',
    cannotBeFaked: 'Submit button unlocks after 2 minutes. Feedback is public with your name attached.'
  },
  client_rated: {
    id: 'client_rated',
    label: 'Client Rated',
    description: 'A paying client rated this work positively',
    icon: 'briefcase-check',
    color: 'text-green-400',
    gradient: 'from-green-500 to-green-600',
    repEarned: 300,
    requirements: [
      'Client must have verified email',
      'Client rated 4+ stars',
      'Client left a testimonial',
      'Payment confirmed (via gig or marketplace)'
    ],
    howToEarn: 'Complete a paid gig or marketplace transaction. Ask the client to rate your work.',
    cannotBeFaked: 'Requires verified client account and payment confirmation.'
  },
  blind_verified: {
    id: 'blind_verified',
    label: 'Blind Verified',
    description: 'Ranked in top 50% in anonymous community voting',
    icon: 'eye-off-check',
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-purple-600',
    repEarned: 15, // Reduced from 150 - earned per voting session
    requirements: [
      'Rank 5 anonymous submissions',
      'Voters who give identical ratings get downweighted',
      'Must complete full ranking (1-5)',
      'Identity hidden during voting'
    ],
    howToEarn: 'Vote in Blind Drop sessions. Earn +15 Rep per voting session completed.',
    cannotBeFaked: 'Submissions are anonymous. Identical ratings to all 5 get silently downweighted in future rounds.'
  },
  recruiter_endorsed: {
    id: 'recruiter_endorsed',
    label: 'Recruiter Endorsed',
    description: 'A verified recruiter endorsed this project',
    icon: 'badge-check',
    color: 'text-yellow-400',
    gradient: 'from-yellow-500 to-yellow-600',
    repEarned: 500,
    requirements: [
      'Recruiter has verified company email',
      'Recruiter is Gold tier or higher on platform',
      'Recruiter left endorsement comment',
      'Project is publicly visible on Talent Board'
    ],
    howToEarn: 'Be visible on the Talent Board (Gold tier+). Recruiters can endorse projects they find impressive.',
    cannotBeFaked: 'Only verified recruiters from real companies can endorse. They put their name on it.'
  },
  mentor_confirmed: {
    id: 'mentor_confirmed',
    label: 'Mentor Confirmed',
    description: 'A mentor verified skill growth in this project',
    icon: 'graduation-cap-check',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500 to-cyan-600',
    repEarned: 250,
    requirements: [
      'Mentor is Platinum tier or higher',
      'Mentor has matching skill tags',
      'Mentor confirmed skill progression',
      'Mentor-mentee relationship established on platform'
    ],
    howToEarn: 'Work with a mentor on the platform. When they verify you\'ve learned the skill, they confirm your project.',
    cannotBeFaked: 'Mentors must be Platinum+ with proven expertise. They confirm learning, not just output.'
  }
};

// Get all badges as array
export const ALL_BADGES = Object.values(VERIFICATION_BADGES);

// Get badge by type
export function getBadge(type: BadgeType): VerificationBadge {
  return VERIFICATION_BADGES[type];
}

// Check if user can earn more badges based on tier
export function canEarnMoreBadges(currentBadgeCount: number, tier: string): boolean {
  const limits: Record<string, number> = {
    'Bronze': 1,
    'Silver': 2,
    'Gold': 3,
    'Platinum': 5,
    'Contributor': 5,
    'Business Owner': 5
  };
  return currentBadgeCount < (limits[tier] || 0);
}

// Calculate total rep from badges on a project
export function calculateBadgeRep(badges: BadgeType[]): number {
  return badges.reduce((total, badgeType) => {
    return total + VERIFICATION_BADGES[badgeType].repEarned;
  }, 0);
}

// Verification request status
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export interface VerificationRequest {
  id: string;
  projectId: string;
  badgeType: BadgeType;
  status: VerificationStatus;
  requestedAt: Date;
  completedAt?: Date;
  reviewers?: string[]; // User IDs
  notes?: string;
}

// Verification Hub - where projects meet their verifiers
export interface VerificationHubItem {
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  studentName: string;
  studentAvatar: string;
  skillTags: string[];
  linkTypes: string[];
  requestedBadges: BadgeType[];
  pendingBadges: BadgeType[];
  earnedBadges: BadgeType[];
  submittedAt: Date;
}

// Get verification queue for reviewers
export function getVerificationQueue(
  items: VerificationHubItem[],
  reviewerSkills: string[],
  badgeType: BadgeType
): VerificationHubItem[] {
  return items.filter(item => {
    // Must be requesting this badge type
    if (!item.requestedBadges.includes(badgeType)) return false;

    // Must not already have this badge
    if (item.earnedBadges.includes(badgeType)) return false;

    // For peer review and mentor - must have matching skills
    if (badgeType === 'peer_reviewed' || badgeType === 'mentor_confirmed') {
      const hasMatchingSkill = item.skillTags.some(tag => reviewerSkills.includes(tag));
      if (!hasMatchingSkill) return false;
    }

    return true;
  });
}

// Proof weight scoring for projects
export function calculateProofScore(
  linkTypes: string[],
  badges: BadgeType[]
): { score: number; level: 'low' | 'medium' | 'high' | 'verified' } {
  let score = 0;

  // Link type weights (from linkTypes.ts)
  const linkWeights = {
    highest: 30, // github with ownership, live deployment
    high: 20,    // published article, research paper, behance
    medium: 10,  // document, presentation, video
    lower: 5     // social media, spreadsheet
  };

  // Badge weights
  const badgeWeights: Record<BadgeType, number> = {
    peer_reviewed: 40,
    client_rated: 60,
    blind_verified: 30,
    recruiter_endorsed: 100,
    mentor_confirmed: 50
  };

  // Add badge scores
  badges.forEach(badge => {
    score += badgeWeights[badge];
  });

  // Determine level
  if (score === 0) return { score, level: 'low' };
  if (score < 50) return { score, level: 'medium' };
  if (score < 150) return { score, level: 'high' };
  return { score, level: 'verified' };
}
