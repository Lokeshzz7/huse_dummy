// Comprehensive CTA Routes Mapping for HUSE Ecosystem
// This file ensures all buttons lead somewhere meaningful

export interface CTARoute {
  label: string;
  route: string;
  requiresAuth?: boolean;
  requiresTier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  external?: boolean;
  modal?: string;
}

// ===== LANDING PAGE CTAs =====
export const landingCTAs = {
  getStarted: '/huse-ecosystem-intro',
  exploreHuse: '/huse-circle',
  exploreDofracto: '/dofracto',
  exploreQuotify: '/quotify',
  viewDemo: '/demo-credentials',
  contactUs: '/contact',
  login: '/huse-circle-login',
  signup: '/huse-circle-login'
};

// ===== HUSE CIRCLE CTAs =====
export const huseCTAs = {
  // Auth
  login: '/huse-circle-login',
  signup: '/huse-circle-login',
  verifyCollege: '/college-verification',
  
  // Main Actions
  dashboard: '/huse-circle-platform',
  myProgress: '/huse-circle-platform?tab=dashboard',
  portfolio: '/huse-circle-platform?tab=portfolio',
  jobs: '/huse-circle-platform?tab=jobs',
  gigs: '/huse-circle-platform?tab=gigs',
  marketplace: '/huse-circle-platform?tab=marketplace',
  quotes: '/huse-circle-platform?tab=quotes',
  leaderboard: '/huse-circle-platform?tab=leaderboard',
  houseFeed: '/huse-circle-platform?tab=feed',
  
  // Additional Pages
  chat: '/huse-chats',
  notifications: '/huse-notifications',
  studentPortfolio: (id: number) => `/huse-circle-platform/portfolio/${id}`,
  
  // Modals
  addProject: 'modal:addProject',
  postGig: 'modal:postGig',
  applyGig: 'modal:applyGig',
  sellItem: 'modal:sellItem',
  createPost: 'modal:createPost',
  editProfile: 'modal:editProfile',
  settings: 'modal:settings',
  graduateToDofracto: 'modal:graduate',
  
  // Progression Actions
  earnReputation: '/huse-circle-platform?tab=dashboard',
  viewBenefits: '/huse-circle-platform?tab=dashboard',
  upgradeTier: '/huse-circle-platform?tab=dashboard'
};

// ===== DOFRACTO CTAs =====
export const dofractoCTAs = {
  // Auth
  builderLogin: '/dofracto-builder-login',
  businessLogin: '/dofracto-business-login',
  contributorSignup: '/dofracto-contributor-signup',
  businessSignup: '/business-portal-register',
  
  // Main Actions
  home: '/dofracto',
  buildersHub: '/dofracto-builders-hub',
  opportunities: '/dofracto-opportunities',
  discover: '/dofracto/discover',
  allBusinessListings: '/all-business-listings',
  
  // Pricing
  contributorPricing: '/dofracto/pricing',
  businessPricing: '/dofracto/business-pricing',
  
  // Individual Pages
  startupDetail: (id: string) => `/startup/${id}`,
  businessDetail: (name: string) => `/business/${name}`,
  
  // Actions
  watchlist: '/watchlist',
  reputation: '/reputation',
  notifications: '/notifications',
  opportunityFeed: '/opportunity-feed',
  
  // Modals
  postOpportunity: 'modal:postOpportunity',
  applyToOpportunity: 'modal:applyOpportunity',
  messageStartup: 'modal:message',
  joinTeam: 'modal:joinTeam'
};

// ===== QUOTIFY CTAs =====
export const quotifyCTAs = {
  // Auth
  login: '/quotify-login',
  signup: '/quotify-login',
  
  // Main Actions
  landing: '/quotify',
  dashboard: '/quotify/dashboard',
  newRequest: '/quotify/new-request',
  matchResults: '/quotify/match-results',
  
  // Individual Pages
  quoteDetail: (id: string) => `/quotify/request/${id}`,
  submitQuote: (id: string) => `/quotify/submit-quote/${id}`,
  providerProfile: (id: string) => `/quotify/provider/${id}`,
  settings: '/quotify/settings',
  
  // Modals
  compareQuotes: 'modal:compareQuotes',
  paymentEscrow: 'modal:paymentEscrow',
  submitReview: 'modal:submitReview',
  contactProvider: 'modal:contactProvider'
};

// ===== RECRUITER CTAs =====
export const recruiterCTAs = {
  // Auth
  login: '/recruiter-login',
  signup: '/recruiter-login',
  
  // Main Actions
  dashboard: '/recruiter-dashboard',
  profile: '/recruiter-profile',
  messages: '/recruiter-messages',
  notifications: '/recruiter-notifications',
  jobPostings: '/recruiter-job-postings',
  
  // Actions
  browseStudents: '/recruiter-dashboard',
  postJob: 'modal:createJob',
  saveStudent: 'action:saveStudent',
  contactStudent: 'modal:contactStudent',
  viewPortfolio: (id: number) => `/huse-circle-platform/portfolio/${id}`,
  
  // Filters
  filterByTier: 'filter:tier',
  filterByCollege: 'filter:college',
  filterBySkills: 'filter:skills'
};

// ===== ADMIN CTAs =====
export const adminCTAs = {
  // Auth
  adminLogin: '/admin-login',
  superAdminLogin: '/super-admin-login',
  userLogin: '/user-login',
  businessPortalLogin: '/business-portal-login',
  
  // Dashboards
  adminDashboard: '/admin-dashboard',
  superAdminDashboard: '/super-admin-dashboard',
  userDashboard: '/user-dashboard',
  businessDashboard: '/business-dashboard',
  businessPortalDashboard: '/business-portal-dashboard',
  
  // Management
  addBusiness: '/add-business',
  addUser: '/add-user',
  adminProfile: '/admin-profile',
  adminNotifications: '/admin-notifications',
  
  // Utility
  themePreview: '/theme-preview'
};

// ===== UTILITY CTAs =====
export const utilityCTAs = {
  home: '/',
  intro: '/intro',
  ecosystemIntro: '/huse-ecosystem-intro',
  contact: '/contact',
  demoCredentials: '/demo-credentials',
  
  // External Links
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  discord: 'https://discord.com'
};

// ===== HELPER FUNCTIONS =====

/**
 * Get the appropriate route based on user authentication
 */
export function getAuthenticatedRoute(route: string, isAuthenticated: boolean, loginRoute: string): string {
  if (!isAuthenticated && route !== loginRoute) {
    return loginRoute;
  }
  return route;
}

/**
 * Check if user has required tier for action
 */
export function checkTierAccess(
  userTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum',
  requiredTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
): boolean {
  const tierLevels = { Bronze: 0, Silver: 1, Gold: 2, Platinum: 3 };
  return tierLevels[userTier] >= tierLevels[requiredTier];
}

/**
 * Navigate to CTA route with tier checking
 */
export function navigateToCTA(
  route: string,
  navigate: (path: string) => void,
  user?: {
    tier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    authenticated?: boolean;
  },
  requiredTier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum',
  onTierRestricted?: () => void
) {
  // Handle modal routes
  if (route.startsWith('modal:')) {
    const modalName = route.replace('modal:', '');
    console.log(`Opening modal: ${modalName}`);
    return;
  }

  // Handle action routes
  if (route.startsWith('action:')) {
    const actionName = route.replace('action:', '');
    console.log(`Executing action: ${actionName}`);
    return;
  }

  // Handle filter routes
  if (route.startsWith('filter:')) {
    const filterName = route.replace('filter:', '');
    console.log(`Applying filter: ${filterName}`);
    return;
  }

  // Check tier access
  if (requiredTier && user?.tier && !checkTierAccess(user.tier, requiredTier)) {
    if (onTierRestricted) {
      onTierRestricted();
    }
    return;
  }

  // Handle external links
  if (route.startsWith('http')) {
    window.open(route, '_blank');
    return;
  }

  // Navigate
  navigate(route);
}

// ===== COMPLETE CTA MAP =====
export const allCTAs = {
  landing: landingCTAs,
  huse: huseCTAs,
  dofracto: dofractoCTAs,
  quotify: quotifyCTAs,
  recruiter: recruiterCTAs,
  admin: adminCTAs,
  utility: utilityCTAs
};

// ===== QUICK ACCESS FUNCTIONS =====
export const quickNav = {
  // Platform Homes
  toHuseCircle: () => huseCTAs.dashboard,
  toDofracto: () => dofractoCTAs.home,
  toQuotify: () => quotifyCTAs.dashboard,
  toRecruiter: () => recruiterCTAs.dashboard,
  
  // Common Actions
  toLogin: (platform: 'huse' | 'dofracto' | 'quotify' | 'recruiter') => {
    switch (platform) {
      case 'huse': return huseCTAs.login;
      case 'dofracto': return dofractoCTAs.builderLogin;
      case 'quotify': return quotifyCTAs.login;
      case 'recruiter': return recruiterCTAs.login;
    }
  },
  
  toDashboard: (platform: 'huse' | 'dofracto' | 'quotify' | 'recruiter') => {
    switch (platform) {
      case 'huse': return huseCTAs.dashboard;
      case 'dofracto': return dofractoCTAs.buildersHub;
      case 'quotify': return quotifyCTAs.dashboard;
      case 'recruiter': return recruiterCTAs.dashboard;
    }
  }
};

export default allCTAs;
