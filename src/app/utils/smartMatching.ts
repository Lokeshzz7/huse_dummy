/**
 * SMART MATCHING ALGORITHM
 * AI-powered provider matching for Quotify quote requests
 * 
 * Analyzes request details and ranks providers based on:
 * - Skill relevance
 * - Past experience (category)
 * - Reputation score
 * - Response rate
 * - Availability
 */

export interface Provider {
  id: string;
  name: string;
  type: 'startup' | 'student';
  skills: string[];
  categories: string[];
  reputation: number;
  completedProjects: number;
  responseRate: number;
  avgResponseTime: number; // in hours
  rating: number;
  isHuseAlumni?: boolean;
  college?: string;
  avatar?: string;
  logo?: string;
}

export interface MatchResult {
  provider: Provider;
  matchScore: number; // 0-100
  matchReasons: string[];
  skillMatches: string[];
  categoryMatch: boolean;
  tier: 'excellent' | 'good' | 'fair';
}

export interface QuoteRequestData {
  category: string;
  title: string;
  description: string;
  budget?: string;
  timeline?: string;
  tier: 'standard' | 'premium' | 'enterprise'; // ₹149/₹399/₹999
}

/**
 * Extract keywords and skills from request text
 */
function extractSkills(text: string): string[] {
  const skillKeywords = [
    // Web Development
    'react', 'vue', 'angular', 'javascript', 'typescript', 'node', 'express',
    'next.js', 'html', 'css', 'tailwind', 'bootstrap', 'web development',
    'frontend', 'backend', 'full stack', 'fullstack',
    
    // Mobile
    'mobile', 'ios', 'android', 'react native', 'flutter', 'swift', 'kotlin',
    'app development', 'mobile app',
    
    // Design
    'design', 'ui', 'ux', 'figma', 'sketch', 'adobe xd', 'photoshop',
    'illustrator', 'branding', 'logo', 'graphic design', 'web design',
    
    // Marketing
    'marketing', 'seo', 'sem', 'social media', 'content', 'copywriting',
    'email marketing', 'digital marketing', 'ads', 'advertising',
    
    // Data & AI
    'data', 'analytics', 'python', 'machine learning', 'ai', 'data science',
    'sql', 'database', 'business intelligence',
    
    // Business
    'business', 'consulting', 'strategy', 'finance', 'accounting',
    'legal', 'contracts', 'compliance',
    
    // Other
    'video', 'photography', 'editing', 'animation', '3d', 'modeling',
    'translation', 'writing', 'content creation', 'blockchain', 'web3'
  ];

  const lowerText = text.toLowerCase();
  const found: string[] = [];

  skillKeywords.forEach(skill => {
    if (lowerText.includes(skill)) {
      found.push(skill);
    }
  });

  return [...new Set(found)]; // Remove duplicates
}

/**
 * Calculate match score between request and provider
 */
function calculateMatchScore(request: QuoteRequestData, provider: Provider): number {
  let score = 0;
  const weights = {
    skillMatch: 40,
    categoryMatch: 25,
    reputation: 15,
    responseRate: 10,
    experienceLevel: 10
  };

  // 1. Skill Matching (40 points)
  const requestSkills = extractSkills(`${request.title} ${request.description}`);
  const providerSkillsLower = provider.skills.map(s => s.toLowerCase());
  const matchedSkills = requestSkills.filter(reqSkill => 
    providerSkillsLower.some(provSkill => 
      provSkill.includes(reqSkill) || reqSkill.includes(provSkill)
    )
  );
  
  if (requestSkills.length > 0) {
    const skillMatchRatio = matchedSkills.length / requestSkills.length;
    score += skillMatchRatio * weights.skillMatch;
  }

  // 2. Category Match (25 points)
  const categoryMatch = provider.categories.some(cat => 
    cat.toLowerCase().includes(request.category.toLowerCase()) ||
    request.category.toLowerCase().includes(cat.toLowerCase())
  );
  if (categoryMatch) {
    score += weights.categoryMatch;
  }

  // 3. Reputation Score (15 points)
  // Normalize reputation (assume 0-1000 scale)
  const reputationScore = Math.min(provider.reputation / 1000, 1);
  score += reputationScore * weights.reputation;

  // 4. Response Rate (10 points)
  score += provider.responseRate * weights.responseRate;

  // 5. Experience Level (10 points)
  const experienceScore = Math.min(provider.completedProjects / 50, 1);
  score += experienceScore * weights.experienceLevel;

  // Bonus: HUSE Alumni badge (+5 points)
  if (provider.isHuseAlumni) {
    score += 5;
  }

  // Bonus: High rating (+5 points if 4.5+)
  if (provider.rating >= 4.5) {
    score += 5;
  }

  return Math.min(Math.round(score), 100);
}

/**
 * Determine match tier based on score
 */
function getMatchTier(score: number): 'excellent' | 'good' | 'fair' {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  return 'fair';
}

/**
 * Generate human-readable match reasons
 */
function generateMatchReasons(
  request: QuoteRequestData,
  provider: Provider,
  matchScore: number,
  skillMatches: string[]
): string[] {
  const reasons: string[] = [];

  // Skill matches
  if (skillMatches.length > 0) {
    reasons.push(`Matches ${skillMatches.length} key skills: ${skillMatches.slice(0, 3).join(', ')}`);
  }

  // Category expertise
  const categoryMatch = provider.categories.some(cat => 
    cat.toLowerCase().includes(request.category.toLowerCase())
  );
  if (categoryMatch) {
    reasons.push(`Expert in ${request.category}`);
  }

  // High reputation
  if (provider.reputation >= 800) {
    reasons.push('Top-rated provider (Reputation: ' + provider.reputation + ')');
  }

  // Fast response
  if (provider.avgResponseTime <= 2) {
    reasons.push('Responds within 2 hours on average');
  }

  // Completed projects
  if (provider.completedProjects >= 20) {
    reasons.push(`${provider.completedProjects}+ successful projects`);
  }

  // HUSE Alumni
  if (provider.isHuseAlumni) {
    reasons.push(`HUSE Circle Alumni (${provider.college})`);
  }

  // High rating
  if (provider.rating >= 4.7) {
    reasons.push(`${provider.rating}★ client rating`);
  }

  // Response rate
  if (provider.responseRate >= 0.9) {
    reasons.push('95%+ response rate');
  }

  return reasons.slice(0, 4); // Max 4 reasons
}

/**
 * Main function: Match providers to a quote request
 */
export function matchProvidersToRequest(
  request: QuoteRequestData,
  providers: Provider[],
  maxResults: number = 10
): MatchResult[] {
  const results: MatchResult[] = [];

  providers.forEach(provider => {
    const matchScore = calculateMatchScore(request, provider);
    const requestSkills = extractSkills(`${request.title} ${request.description}`);
    const providerSkillsLower = provider.skills.map(s => s.toLowerCase());
    
    const skillMatches = requestSkills.filter(reqSkill => 
      providerSkillsLower.some(provSkill => 
        provSkill.includes(reqSkill) || reqSkill.includes(provSkill)
      )
    );

    const categoryMatch = provider.categories.some(cat => 
      cat.toLowerCase().includes(request.category.toLowerCase())
    );

    const matchReasons = generateMatchReasons(request, provider, matchScore, skillMatches);

    results.push({
      provider,
      matchScore,
      matchReasons,
      skillMatches,
      categoryMatch,
      tier: getMatchTier(matchScore)
    });
  });

  // Sort by match score (highest first)
  results.sort((a, b) => b.matchScore - a.matchScore);

  // Filter minimum threshold (40+ score) and return top results
  return results
    .filter(r => r.matchScore >= 40)
    .slice(0, maxResults);
}

/**
 * Get tier-based recommendations
 * Higher tiers show more providers with better filtering
 */
export function getTierBasedMatches(
  request: QuoteRequestData,
  providers: Provider[]
): MatchResult[] {
  const allMatches = matchProvidersToRequest(request, providers, 50);

  switch (request.tier) {
    case 'enterprise': // ₹999 - 8h response
      // Show top 10, minimum 70% match
      return allMatches.filter(m => m.matchScore >= 70).slice(0, 10);
    
    case 'premium': // ₹399 - 24h response
      // Show top 8, minimum 60% match
      return allMatches.filter(m => m.matchScore >= 60).slice(0, 8);
    
    case 'standard': // ₹149 - 48h response
      // Show top 5, minimum 50% match
      return allMatches.filter(m => m.matchScore >= 50).slice(0, 5);
    
    default:
      return allMatches.slice(0, 5);
  }
}

/**
 * For providers: Calculate match score for a specific request
 * (Shows them how well they match when viewing opportunities)
 */
export function calculateProviderMatchForRequest(
  provider: Provider,
  request: QuoteRequestData
): MatchResult {
  const matchScore = calculateMatchScore(request, provider);
  const requestSkills = extractSkills(`${request.title} ${request.description}`);
  const providerSkillsLower = provider.skills.map(s => s.toLowerCase());
  
  const skillMatches = requestSkills.filter(reqSkill => 
    providerSkillsLower.some(provSkill => 
      provSkill.includes(reqSkill) || reqSkill.includes(provSkill)
    )
  );

  const categoryMatch = provider.categories.some(cat => 
    cat.toLowerCase().includes(request.category.toLowerCase())
  );

  const matchReasons = generateMatchReasons(request, provider, matchScore, skillMatches);

  return {
    provider,
    matchScore,
    matchReasons,
    skillMatches,
    categoryMatch,
    tier: getMatchTier(matchScore)
  };
}
