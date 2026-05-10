// Comprehensive Skill Tags for All Students (Not Just Tech)
// Updated: May 2, 2026 - Non-Tech Student Support

export interface SkillCategory {
  name: string;
  tags: string[];
  color: string;
  icon: string;
}

// 90 tags across 8 categories
export const SKILL_CATEGORIES: Record<string, SkillCategory> = {
  'Engineering & Development': {
    name: 'Engineering & Development',
    tags: [
      'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
      'Java', 'C++', 'Go', 'Rust', 'Swift',
      'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes',
      'Machine Learning', 'Data Engineering', 'DevOps', 'Cybersecurity', 'Blockchain'
    ],
    color: 'blue',
    icon: 'code'
  },
  'Design': {
    name: 'Design',
    tags: [
      'UI/UX Design', 'Graphic Design', 'Figma', 'Adobe Creative Suite', 'Motion Graphics',
      '3D Modeling', 'Product Design', 'Brand Identity', 'Illustration', 'Typography',
      'Design Research', 'Prototyping'
    ],
    color: 'pink',
    icon: 'palette'
  },
  'Business & Management': {
    name: 'Business & Management',
    tags: [
      'Market Research', 'Business Strategy', 'Financial Modeling', 'Operations Management',
      'Project Management', 'Supply Chain', 'Consulting', 'Entrepreneurship',
      'Business Development', 'Product Management', 'Agile/Scrum', 'Data Analysis (Excel)',
      'Risk Assessment', 'Competitive Analysis', 'Business Plan Writing'
    ],
    color: 'purple',
    icon: 'briefcase'
  },
  'Marketing & Content': {
    name: 'Marketing & Content',
    tags: [
      'Content Writing', 'Copywriting', 'SEO', 'Social Media Marketing', 'Email Marketing',
      'Brand Strategy', 'Public Relations', 'Video Editing', 'Photography', 'Podcasting',
      'Community Building', 'Growth Hacking', 'Influencer Marketing', 'Analytics & Reporting'
    ],
    color: 'green',
    icon: 'megaphone'
  },
  'Legal & Policy': {
    name: 'Legal & Policy',
    tags: [
      'Legal Research', 'Contract Drafting', 'Regulatory Compliance', 'Policy Analysis',
      'Intellectual Property', 'Dispute Resolution'
    ],
    color: 'gray',
    icon: 'scale'
  },
  'Finance & Economics': {
    name: 'Finance & Economics',
    tags: [
      'Financial Analysis', 'Accounting', 'Investment Research', 'Valuation',
      'Econometrics', 'Budgeting & Forecasting', 'Tax Planning', 'Audit'
    ],
    color: 'yellow',
    icon: 'dollar-sign'
  },
  'Communication & Leadership': {
    name: 'Communication & Leadership',
    tags: [
      'Public Speaking', 'Event Management', 'Team Leadership', 'Negotiation',
      'Workshop Facilitation', 'Cross-cultural Communication', 'Mentoring', 'Stakeholder Management'
    ],
    color: 'cyan',
    icon: 'users'
  },
  'Research & Academia': {
    name: 'Research & Academia',
    tags: [
      'Academic Writing', 'Quantitative Research', 'Qualitative Research', 'Survey Design',
      'Statistical Analysis (SPSS/R)', 'Literature Review', 'Thesis Writing'
    ],
    color: 'indigo',
    icon: 'book-open'
  }
};

// Flatten all tags for searching
export const ALL_SKILL_TAGS = Object.values(SKILL_CATEGORIES).flatMap(category => category.tags);

// Get category for a specific tag
export function getCategoryForTag(tag: string): string | null {
  for (const [categoryName, category] of Object.entries(SKILL_CATEGORIES)) {
    if (category.tags.includes(tag)) {
      return categoryName;
    }
  }
  return null;
}

// Get color for a tag
export function getColorForTag(tag: string): string {
  const category = getCategoryForTag(tag);
  return category ? SKILL_CATEGORIES[category].color : 'gray';
}

// Talent Board category filters
export const TALENT_BOARD_FILTERS = [
  { id: 'all', label: 'All Students', categories: [] },
  { id: 'engineering', label: 'Engineering', categories: ['Engineering & Development'] },
  { id: 'design', label: 'Design', categories: ['Design'] },
  { id: 'business', label: 'Business', categories: ['Business & Management', 'Finance & Economics', 'Legal & Policy'] },
  { id: 'content', label: 'Content & Media', categories: ['Marketing & Content', 'Communication & Leadership'] },
  { id: 'research', label: 'Research', categories: ['Research & Academia'] }
];

// Match students to talent board filters
export function matchesFilter(studentTags: string[], filterId: string): boolean {
  if (filterId === 'all') return true;

  const filter = TALENT_BOARD_FILTERS.find(f => f.id === filterId);
  if (!filter || filter.categories.length === 0) return true;

  return studentTags.some(tag => {
    const category = getCategoryForTag(tag);
    return category && filter.categories.includes(category);
  });
}
