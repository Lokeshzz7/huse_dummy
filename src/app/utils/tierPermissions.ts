export type TierLevel = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Contributor' | 'Business Owner';

export interface TierFeatures {
  canAccessFeed: boolean;
  canApplyForProjects: boolean;
  canMessage: boolean;
  canPostGigs: boolean;
  canAccessDofractoLaunchpad: boolean;
}

const tierLevels: Record<TierLevel, number> = {
  Bronze: 0,
  Silver: 1,
  Gold: 2,
  Platinum: 3,
  Contributor: 4,
  'Business Owner': 5
};

export const getTierFeatures = (tier: TierLevel): TierFeatures => {
  const level = tierLevels[tier];
  
  return {
    canAccessFeed: level >= 0, // Bronze and above
    canApplyForProjects: level >= 0, // Bronze and above
    canMessage: level >= 2, // Gold and above
    canPostGigs: level >= 3, // Platinum only
    canAccessDofractoLaunchpad: level >= 3 // Platinum only
  };
};

export const checkTierPermission = (userTier: TierLevel, requiredTier: TierLevel): boolean => {
  return tierLevels[userTier] >= tierLevels[requiredTier];
};

export const getMinimumRepForTier = (tier: TierLevel): number => {
  switch (tier) {
    case 'Bronze': return 0;
    case 'Silver': return 1000;
    case 'Gold': return 5000;
    case 'Platinum': return 30000;
    case 'Contributor': return 100000;
    case 'Business Owner': return 300000;
    default: return 0;
  }
};

export const getTierFromReputation = (reputation: number): TierLevel => {
  if (reputation >= 300000) return 'Business Owner';
  if (reputation >= 100000) return 'Contributor';
  if (reputation >= 30000) return 'Platinum';
  if (reputation >= 5000) return 'Gold';
  if (reputation >= 1000) return 'Silver';
  return 'Bronze';
};

export const getNextTier = (currentTier: TierLevel): TierLevel | null => {
  const tiers: TierLevel[] = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Contributor', 'Business Owner'];
  const currentIndex = tiers.indexOf(currentTier);
  return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
};

export const getRepNeededForNextTier = (currentRep: number, currentTier: TierLevel): number => {
  const nextTier = getNextTier(currentTier);
  if (!nextTier) return 0;
  
  const requiredRep = getMinimumRepForTier(nextTier);
  return Math.max(0, requiredRep - currentRep);
};