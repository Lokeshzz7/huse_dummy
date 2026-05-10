import { Provider } from '../utils/smartMatching';

/**
 * Mock Provider Database for Smart Matching
 * Combines Dofracto Startups + HUSE Circle Students
 */

export const MOCK_PROVIDERS: Provider[] = [
  // ===== DOFRACTO STARTUPS =====
  {
    id: 'startup-1',
    name: 'TechVision Solutions',
    type: 'startup',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Web Development', 'Mobile App Development', 'Cloud Architecture'],
    categories: ['Web Development', 'Mobile App Development', 'IT Support'],
    reputation: 920,
    completedProjects: 47,
    responseRate: 0.95,
    avgResponseTime: 2,
    rating: 4.8,
    isHuseAlumni: true,
    college: 'MIT',
    logo: '🚀'
  },
  {
    id: 'startup-2',
    name: 'DesignCraft Studio',
    type: 'startup',
    skills: ['Figma', 'UI/UX', 'Branding', 'Logo Design', 'Web Design', 'Mobile Design', 'Adobe XD', 'Photoshop'],
    categories: ['Design & Branding', 'Web Development'],
    reputation: 875,
    completedProjects: 62,
    responseRate: 0.92,
    avgResponseTime: 3,
    rating: 4.9,
    isHuseAlumni: true,
    college: 'Stanford',
    logo: '🎨'
  },
  {
    id: 'startup-3',
    name: 'DataInsight AI',
    type: 'startup',
    skills: ['Python', 'Machine Learning', 'Data Analytics', 'SQL', 'Business Intelligence', 'AI', 'Data Science'],
    categories: ['Business Consulting', 'IT Support'],
    reputation: 910,
    completedProjects: 34,
    responseRate: 0.88,
    avgResponseTime: 4,
    rating: 4.7,
    isHuseAlumni: false,
    logo: '📊'
  },
  {
    id: 'startup-4',
    name: 'MarketBoost Agency',
    type: 'startup',
    skills: ['SEO', 'SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Google Ads', 'Facebook Ads'],
    categories: ['Marketing & SEO', 'Content Creation'],
    reputation: 850,
    completedProjects: 78,
    responseRate: 0.94,
    avgResponseTime: 2,
    rating: 4.6,
    isHuseAlumni: true,
    college: 'UC Berkeley',
    logo: '📈'
  },
  {
    id: 'startup-5',
    name: 'MobileFirst Apps',
    type: 'startup',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile App Development', 'Swift', 'Kotlin'],
    categories: ['Mobile App Development', 'Web Development'],
    reputation: 895,
    completedProjects: 41,
    responseRate: 0.90,
    avgResponseTime: 3,
    rating: 4.8,
    isHuseAlumni: false,
    logo: '📱'
  },
  {
    id: 'startup-6',
    name: 'CloudOps Pro',
    type: 'startup',
    skills: ['AWS', 'Azure', 'DevOps', 'Docker', 'Kubernetes', 'Cloud Architecture', 'CI/CD'],
    categories: ['IT Support', 'Business Consulting'],
    reputation: 880,
    completedProjects: 29,
    responseRate: 0.87,
    avgResponseTime: 5,
    rating: 4.7,
    isHuseAlumni: true,
    college: 'MIT',
    logo: '☁️'
  },
  {
    id: 'startup-7',
    name: 'ContentKings',
    type: 'startup',
    skills: ['Content Writing', 'Copywriting', 'Blog Writing', 'Technical Writing', 'SEO Content', 'Social Media Content'],
    categories: ['Content Creation', 'Marketing & SEO'],
    reputation: 820,
    completedProjects: 95,
    responseRate: 0.96,
    avgResponseTime: 1,
    rating: 4.5,
    isHuseAlumni: false,
    logo: '✍️'
  },
  {
    id: 'startup-8',
    name: 'VideoVerse Productions',
    type: 'startup',
    skills: ['Video Editing', 'Photography', 'Animation', '3D Modeling', 'Motion Graphics', 'After Effects'],
    categories: ['Photography & Video', 'Content Creation'],
    reputation: 865,
    completedProjects: 52,
    responseRate: 0.89,
    avgResponseTime: 4,
    rating: 4.9,
    isHuseAlumni: true,
    college: 'Stanford',
    logo: '🎬'
  },

  // ===== HUSE CIRCLE STUDENTS =====
  {
    id: 'student-1',
    name: 'Alex Chen',
    type: 'student',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Frontend Development', 'Web Design'],
    categories: ['Web Development', 'Design & Branding'],
    reputation: 850,
    completedProjects: 12,
    responseRate: 0.93,
    avgResponseTime: 3,
    rating: 4.8,
    college: 'MIT',
    avatar: '👨‍💻'
  },
  {
    id: 'student-2',
    name: 'Priya Sharma',
    type: 'student',
    skills: ['Figma', 'UI/UX', 'Adobe XD', 'Prototyping', 'User Research', 'Mobile Design'],
    categories: ['Design & Branding', 'Mobile App Development'],
    reputation: 780,
    completedProjects: 18,
    responseRate: 0.91,
    avgResponseTime: 4,
    rating: 4.7,
    college: 'Stanford',
    avatar: '👩‍🎨'
  },
  {
    id: 'student-3',
    name: 'Marcus Johnson',
    type: 'student',
    skills: ['Python', 'Django', 'Flask', 'Backend Development', 'API Development', 'Database Design'],
    categories: ['Web Development', 'IT Support'],
    reputation: 820,
    completedProjects: 15,
    responseRate: 0.88,
    avgResponseTime: 5,
    rating: 4.6,
    college: 'UC Berkeley',
    avatar: '👨‍💼'
  },
  {
    id: 'student-4',
    name: 'Sofia Rodriguez',
    type: 'student',
    skills: ['Content Writing', 'Social Media Marketing', 'Copywriting', 'SEO', 'Instagram Marketing'],
    categories: ['Content Creation', 'Marketing & SEO'],
    reputation: 760,
    completedProjects: 22,
    responseRate: 0.95,
    avgResponseTime: 2,
    rating: 4.9,
    college: 'Harvard',
    avatar: '👩‍💻'
  },
  {
    id: 'student-5',
    name: 'Raj Patel',
    type: 'student',
    skills: ['React Native', 'Mobile App Development', 'Firebase', 'JavaScript', 'App Design'],
    categories: ['Mobile App Development', 'Web Development'],
    reputation: 890,
    completedProjects: 10,
    responseRate: 0.90,
    avgResponseTime: 3,
    rating: 4.8,
    college: 'MIT',
    avatar: '👨‍🔧'
  },
  {
    id: 'student-6',
    name: 'Emma Wilson',
    type: 'student',
    skills: ['Video Editing', 'Photography', 'Photoshop', 'Lightroom', 'Social Media Content'],
    categories: ['Photography & Video', 'Content Creation'],
    reputation: 740,
    completedProjects: 25,
    responseRate: 0.92,
    avgResponseTime: 4,
    rating: 4.7,
    college: 'Yale',
    avatar: '👩‍🎤'
  },
  {
    id: 'student-7',
    name: 'David Kim',
    type: 'student',
    skills: ['Full Stack', 'Node.js', 'Express', 'MongoDB', 'React', 'Web Development'],
    categories: ['Web Development', 'IT Support'],
    reputation: 810,
    completedProjects: 14,
    responseRate: 0.87,
    avgResponseTime: 5,
    rating: 4.6,
    college: 'Stanford',
    avatar: '👨‍💻'
  },
  {
    id: 'student-8',
    name: 'Aisha Mohammed',
    type: 'student',
    skills: ['UI/UX', 'Figma', 'Sketch', 'Branding', 'Logo Design', 'Graphic Design'],
    categories: ['Design & Branding', 'Web Development'],
    reputation: 870,
    completedProjects: 19,
    responseRate: 0.94,
    avgResponseTime: 2,
    rating: 4.9,
    college: 'MIT',
    avatar: '👩‍🎨'
  },
  {
    id: 'student-9',
    name: 'Carlos Garcia',
    type: 'student',
    skills: ['WordPress', 'PHP', 'Web Design', 'SEO', 'E-commerce', 'WooCommerce'],
    categories: ['Web Development', 'Marketing & SEO'],
    reputation: 750,
    completedProjects: 21,
    responseRate: 0.89,
    avgResponseTime: 4,
    rating: 4.5,
    college: 'UC Berkeley',
    avatar: '👨‍💼'
  },
  {
    id: 'student-10',
    name: 'Yuki Tanaka',
    type: 'student',
    skills: ['Data Analytics', 'Excel', 'SQL', 'Python', 'Data Visualization', 'Business Intelligence'],
    categories: ['Business Consulting', 'IT Support'],
    reputation: 800,
    completedProjects: 16,
    responseRate: 0.91,
    avgResponseTime: 3,
    rating: 4.7,
    college: 'Harvard',
    avatar: '👩‍💼'
  },
  {
    id: 'student-11',
    name: 'Liam O\'Connor',
    type: 'student',
    skills: ['Flutter', 'Dart', 'Mobile App Development', 'Firebase', 'UI Design'],
    categories: ['Mobile App Development'],
    reputation: 830,
    completedProjects: 11,
    responseRate: 0.88,
    avgResponseTime: 4,
    rating: 4.8,
    college: 'Stanford',
    avatar: '👨‍💻'
  },
  {
    id: 'student-12',
    name: 'Zara Ali',
    type: 'student',
    skills: ['Digital Marketing', 'Google Ads', 'Facebook Ads', 'Email Marketing', 'Analytics'],
    categories: ['Marketing & SEO', 'Content Creation'],
    reputation: 770,
    completedProjects: 20,
    responseRate: 0.93,
    avgResponseTime: 3,
    rating: 4.6,
    college: 'Yale',
    avatar: '👩‍💼'
  }
];

/**
 * Get all providers (for matching engine)
 */
export function getAllProviders(): Provider[] {
  return MOCK_PROVIDERS;
}

/**
 * Get providers by type
 */
export function getProvidersByType(type: 'startup' | 'student'): Provider[] {
  return MOCK_PROVIDERS.filter(p => p.type === type);
}

/**
 * Get provider by ID
 */
export function getProviderById(id: string): Provider | undefined {
  return MOCK_PROVIDERS.find(p => p.id === id);
}

/**
 * Get top providers by reputation
 */
export function getTopProviders(limit: number = 10): Provider[] {
  return [...MOCK_PROVIDERS]
    .sort((a, b) => b.reputation - a.reputation)
    .slice(0, limit);
}
