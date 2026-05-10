// Auto-calculate tier based on reputation points
export type TierLevel = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Contributor' | 'Business Owner';

export interface TierInfo {
  level: TierLevel;
  minReputation: number;
  maxReputation: number;
  color: string;
  gradient: string;
  benefits: string[];
  nextTier?: TierLevel;
  progressToNext: number; // 0-100
}

// Updated Tier Thresholds - Final Specification (May 2, 2026)
// These numbers are calibrated for academic calendar:
// Active student should hit Platinum before graduation
export const TIER_THRESHOLDS = {
  Bronze: { min: 0, max: 499 },        // Weeks 1-2: Onboarding, learning platform
  Silver: { min: 500, max: 1999 },      // Month 1-2: Active participant, peer reviews
  Gold: { min: 2000, max: 7999 },       // Month 3-5: One semester of real work, visible to recruiters
  Platinum: { min: 8000, max: 24999 },  // Month 6-12: Full year of proven work, public portfolio
  Contributor: { min: 25000, max: 99999 }, // Year 2+: Graduated to Dofracto, paid work, mentoring
  'Business Owner': { min: 100000, max: Infinity } // Established builder, running real business
};

// Rep earning opportunities (aligned with anti-gaming system)
export const REP_SOURCES = {
  // Verification Badges (biggest earners - require external validation)
  PEER_REVIEWED: 200,
  CLIENT_RATED: 300,
  RECRUITER_ENDORSED: 500,
  MENTOR_CONFIRMED: 250,
  BLIND_VERIFIED: 150,
  PROJECT_GOES_LIVE: 25,

  // Daily Drop (community validation)
  DAILY_DROP_WIN_TOP_10: 300,
  DAILY_DROP_RUNNER_UP_11_30: 100,
  DAILY_DROP_OTHERS: 25,
  DAILY_DROP_GIVE_FEEDBACK: 15,
  MATTER_REVIEW: 50,

  // Engagement (smaller amounts)
  LOGIN_STREAK_30_DAYS: 150,
  COMPLETE_PROFILE: 100,
  LOGIN_STREAK_7_DAYS: 25,
  POST_PROJECT: 50,

  // Gigs & Outcomes (external validation)
  GET_RECRUITED: 1000,
  FIND_CLIENT: 500,
  COMPLETE_GIG: 200,
  COMPLETE_5_GIGS: 750
};

export const TIER_BENEFITS = {
  Bronze: [
    'HUSE Feed Access',
    'Apply for Gigs',
    'Basic portfolio features',
    'Community access'
  ],
  Silver: [
    'All Bronze benefits',
    'Direct Messaging',
    'Network with students',
    'Networking events access'
  ],
  Gold: [
    'All Silver benefits',
    'Post Gigs',
    'Job Board Access',
    'Advanced analytics',
    'Mentorship opportunities'
  ],
  Platinum: [
    'All Gold benefits',
    'Apply to Quotify quotes (3/week)',
    'Dofracto Launchpad access',
    'Premium visibility',
    '🎁 FREE 1-year Contributor upgrade'
  ],
  Contributor: [
    'All Platinum benefits',
    '10 Quotify quotes/week',
    'Support Dofracto startups',
    'Mentor students',
    'Post internship opportunities',
    'Verified Contributor badge',
    'Priority search ranking'
  ],
  'Business Owner': [
    'All Contributor benefits',
    'Unlimited Quotify requests',
    'Receive funding from Contributors',
    'Hire students (equity/revenue share)',
    'Advanced analytics dashboard',
    'Custom branding options',
    'Priority customer support'
  ]
};

export function calculateTier(reputation: number): TierLevel {
  if (reputation >= TIER_THRESHOLDS['Business Owner'].min) return 'Business Owner';
  if (reputation >= TIER_THRESHOLDS.Contributor.min) return 'Contributor';
  if (reputation >= TIER_THRESHOLDS.Platinum.min) return 'Platinum';
  if (reputation >= TIER_THRESHOLDS.Gold.min) return 'Gold';
  if (reputation >= TIER_THRESHOLDS.Silver.min) return 'Silver';
  return 'Bronze';
}

export function getTierInfo(reputation: number): TierInfo {
  const tier = calculateTier(reputation);
  const thresholds = TIER_THRESHOLDS[tier];
  
  let nextTier: TierLevel | undefined;
  let progressToNext = 0;
  
  if (tier === 'Bronze') {
    nextTier = 'Silver';
    progressToNext = (reputation / TIER_THRESHOLDS.Silver.min) * 100;
  } else if (tier === 'Silver') {
    nextTier = 'Gold';
    const range = TIER_THRESHOLDS.Gold.min - TIER_THRESHOLDS.Silver.min;
    const progress = reputation - TIER_THRESHOLDS.Silver.min;
    progressToNext = (progress / range) * 100;
  } else if (tier === 'Gold') {
    nextTier = 'Platinum';
    const range = TIER_THRESHOLDS.Platinum.min - TIER_THRESHOLDS.Gold.min;
    const progress = reputation - TIER_THRESHOLDS.Gold.min;
    progressToNext = (progress / range) * 100;
  } else if (tier === 'Platinum') {
    nextTier = 'Contributor';
    const range = TIER_THRESHOLDS.Contributor.min - TIER_THRESHOLDS.Platinum.min;
    const progress = reputation - TIER_THRESHOLDS.Platinum.min;
    progressToNext = (progress / range) * 100;
  } else if (tier === 'Contributor') {
    nextTier = 'Business Owner';
    const range = TIER_THRESHOLDS['Business Owner'].min - TIER_THRESHOLDS.Contributor.min;
    const progress = reputation - TIER_THRESHOLDS.Contributor.min;
    progressToNext = (progress / range) * 100;
  } else {
    // Business Owner - max tier
    progressToNext = 100;
  }
  
  const tierColors = {
    Bronze: 'text-orange-400',
    Silver: 'text-gray-300',
    Gold: 'text-amber-400',
    Platinum: 'text-blue-400',
    Contributor: 'text-purple-400',
    'Business Owner': 'text-amber-500'
  };
  
  const tierGradients = {
    Bronze: 'from-orange-700/20 to-orange-900/20 border-orange-500/30',
    Silver: 'from-gray-400/20 to-gray-300/20 border-gray-400/30',
    Gold: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30',
    Platinum: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    Contributor: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    'Business Owner': 'from-amber-500/20 to-orange-500/20 border-amber-500/30'
  };
  
  return {
    level: tier,
    minReputation: thresholds.min,
    maxReputation: thresholds.max,
    color: tierColors[tier],
    gradient: tierGradients[tier],
    benefits: TIER_BENEFITS[tier],
    nextTier,
    progressToNext: Math.min(progressToNext, 100)
  };
}

export function getReputationNeededForNextTier(reputation: number): number {
  const tier = calculateTier(reputation);
  
  if (tier === 'Bronze') return TIER_THRESHOLDS.Silver.min - reputation;
  if (tier === 'Silver') return TIER_THRESHOLDS.Gold.min - reputation;
  if (tier === 'Gold') return TIER_THRESHOLDS.Platinum.min - reputation;
  if (tier === 'Platinum') return TIER_THRESHOLDS.Contributor.min - reputation;
  if (tier === 'Contributor') return TIER_THRESHOLDS['Business Owner'].min - reputation;
  return 0; // Already at max tier
}