import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Contributor' | 'Business Owner';
export type Platform = 'HUSE Circle' | 'Dofracto' | 'Quotify';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: string; // 'student', 'recruiter', 'contributor', 'business'
  tier: UserTier;
  platform: Platform;
  reputation: number;
  credits: number;
  joinedDate: string;
  originPlatform: Platform; // Where they started
  isGraduated?: boolean; // If they graduated from HUSE Circle to Dofracto
  skills: string[];
  completedProjects: number;
  rating?: number;
  // Payment status for premium tiers
  isContributorPaid?: boolean;
  isBusinessOwnerPaid?: boolean;
  contributorSubscriptionDate?: string;
  businessOwnerSubscriptionDate?: string;
}

interface EcosystemContextType {
  userProfile: UserProfile | null;
  currentUser: UserProfile | null; // Alias for userProfile for backward compatibility
  setUserProfile: (profile: UserProfile | null) => void;
  updateReputation: (points: number) => void;
  updateCredits: (credits: number) => void;
  upgradeTier: (newTier: UserTier) => void;
  graduateToContributor: (isPaid: boolean) => void;
  upgradeToBusinessOwner: (isPaid: boolean) => void;
  getRecommendedPlatform: () => Platform;
  canAccessPlatform: (platform: Platform) => boolean;
  isEligibleForGraduation: () => boolean;
  logout: () => void;
}

const EcosystemContext = createContext<EcosystemContextType | undefined>(undefined);

export function EcosystemProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('ecosystemUserProfile');
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  });

  // Save to localStorage whenever profile changes
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('ecosystemUserProfile', JSON.stringify(userProfile));
    } else {
      localStorage.removeItem('ecosystemUserProfile');
    }
  }, [userProfile]);

  const updateReputation = (points: number) => {
    if (!userProfile) return;
    
    const newReputation = userProfile.reputation + points;
    let newTier = userProfile.tier;

    // Auto-upgrade tier based on reputation
    if (!userProfile.isContributorPaid && !userProfile.isBusinessOwnerPaid) {
      if (newReputation >= 100000) {
        newTier = 'Contributor';
      } else if (newReputation >= 30000) {
        newTier = 'Platinum';
      } else if (newReputation >= 5000) {
        newTier = 'Gold';
      } else if (newReputation >= 1000) {
        newTier = 'Silver';
      } else {
        newTier = 'Bronze';
      }
    }

    setUserProfile({
      ...userProfile,
      reputation: newReputation,
      tier: newTier,
    });
  };

  const updateCredits = (credits: number) => {
    if (!userProfile) return;
    setUserProfile({
      ...userProfile,
      credits: userProfile.credits + credits,
    });
  };

  const upgradeTier = (newTier: UserTier) => {
    if (!userProfile) return;
    setUserProfile({
      ...userProfile,
      tier: newTier,
    });
  };

  const graduateToContributor = (isPaid: boolean) => {
    if (!userProfile) return;
    
    setUserProfile({
      ...userProfile,
      tier: 'Contributor',
      platform: 'Dofracto',
      isGraduated: userProfile.originPlatform === 'HUSE Circle',
      isContributorPaid: isPaid,
      contributorSubscriptionDate: isPaid ? new Date().toISOString() : undefined,
    });
  };

  const upgradeToBusinessOwner = (isPaid: boolean) => {
    if (!userProfile) return;
    
    // Calculate if they have enough reputation (300000+)
    const hasReputation = userProfile.reputation >= 300000;
    
    setUserProfile({
      ...userProfile,
      tier: 'Business Owner',
      platform: 'Dofracto',
      isBusinessOwnerPaid: isPaid,
      businessOwnerSubscriptionDate: isPaid || hasReputation ? new Date().toISOString() : undefined,
    });
  };

  const getRecommendedPlatform = (): Platform => {
    if (!userProfile) return 'HUSE Circle';
    
    const tier = userProfile.tier;
    
    // Routing logic based on tier
    if (tier === 'Business Owner') {
      return 'Dofracto'; // Business Portal Dashboard
    } else if (tier === 'Contributor') {
      return 'Dofracto'; // Unified Builders Hub
    } else if (['Bronze', 'Silver', 'Gold', 'Platinum'].includes(tier)) {
      return 'HUSE Circle'; // Student incubator
    }
    
    return 'HUSE Circle';
  };

  const canAccessPlatform = (platform: Platform): boolean => {
    if (!userProfile) return false;
    
    // Everyone can access Quotify if they have an account
    if (platform === 'Quotify') return true;
    
    // HUSE Circle is for Bronze-Platinum students
    if (platform === 'HUSE Circle') {
      return ['Bronze', 'Silver', 'Gold', 'Platinum'].includes(userProfile.tier);
    }
    
    // Dofracto is for Contributors and Business Owners
    if (platform === 'Dofracto') {
      return ['Contributor', 'Business Owner'].includes(userProfile.tier);
    }
    
    return false;
  };

  const isEligibleForGraduation = (): boolean => {
    if (!userProfile) return false;
    
    // Can graduate if:
    // 1. Currently on HUSE Circle (Bronze-Platinum)
    // 2. Have enough reputation (100000+) OR willing to pay
    // 3. Not already graduated
    
    const isStudent = ['Bronze', 'Silver', 'Gold', 'Platinum'].includes(userProfile.tier);
    const hasReputation = userProfile.reputation >= 100000;
    const notGraduated = !userProfile.isGraduated;
    
    return isStudent && notGraduated && (hasReputation || true); // true allows paid graduation
  };

  const logout = () => {
    setUserProfile(null);
  };

  return (
    <EcosystemContext.Provider
      value={{
        userProfile,
        currentUser: userProfile, // Alias for backward compatibility
        setUserProfile,
        updateReputation,
        updateCredits,
        upgradeTier,
        graduateToContributor,
        upgradeToBusinessOwner,
        getRecommendedPlatform,
        canAccessPlatform,
        isEligibleForGraduation,
        logout,
      }}
    >
      {children}
    </EcosystemContext.Provider>
  );
}

export function useEcosystem() {
  const context = useContext(EcosystemContext);
  if (!context) {
    throw new Error('useEcosystem must be used within EcosystemProvider');
  }
  return context;
}