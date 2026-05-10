import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type SearchCategory = 'all' | 'students' | 'startups' | 'jobs' | 'opportunities' | 'quotes' | 'posts' | 'projects';

export interface SearchResult {
  id: string;
  type: SearchCategory;
  title: string;
  description: string;
  image?: string;
  url: string;
  metadata?: {
    author?: string;
    platform?: 'huse' | 'dofracto' | 'quotify';
    tags?: string[];
    date?: string;
    location?: string;
    salary?: string;
    tier?: string;
    status?: string;
    reputation?: number;
  };
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  selectedCategory: SearchCategory;
  setSelectedCategory: (category: SearchCategory) => void;
  performSearch: (query: string, category?: SearchCategory) => void;
  clearSearch: () => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  popularSearches: string[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Mock data for search results
const MOCK_SEARCH_DATA: SearchResult[] = [
  // Students
  {
    id: 'student-1',
    type: 'students',
    title: 'Priya Sharma',
    description: 'Full-stack developer specializing in React and Node.js. Built 5+ MVPs.',
    image: '👩‍💻',
    url: '/huse-circle-platform/portfolio/student-1',
    metadata: {
      platform: 'huse',
      tier: 'Gold',
      tags: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      location: 'IIT Bombay',
      reputation: 850
    }
  },
  {
    id: 'student-2',
    type: 'students',
    title: 'Rahul Verma',
    description: 'UI/UX Designer with expertise in Figma and design systems.',
    image: '👨‍🎨',
    url: '/huse-circle-platform/portfolio/student-2',
    metadata: {
      platform: 'huse',
      tier: 'Platinum',
      tags: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
      location: 'IIT Delhi',
      reputation: 1200
    }
  },
  {
    id: 'student-3',
    type: 'students',
    title: 'Ananya Patel',
    description: 'AI/ML enthusiast building intelligent applications.',
    image: '👩‍🔬',
    url: '/huse-circle-platform/portfolio/student-3',
    metadata: {
      platform: 'huse',
      tier: 'Gold',
      tags: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science'],
      location: 'BITS Pilani',
      reputation: 920
    }
  },
  // Startups
  {
    id: 'startup-1',
    type: 'startups',
    title: 'TechVision AI',
    description: 'Building next-generation AI solutions for enterprise automation',
    image: '🚀',
    url: '/startup/techvision',
    metadata: {
      platform: 'dofracto',
      tags: ['AI', 'SaaS', 'Enterprise', 'Automation'],
      location: 'Bangalore',
      status: 'Seed Stage'
    }
  },
  {
    id: 'startup-2',
    type: 'startups',
    title: 'HealthSync',
    description: 'Digital health platform connecting patients with healthcare providers',
    image: '🏥',
    url: '/startup/healthsync',
    metadata: {
      platform: 'dofracto',
      tags: ['HealthTech', 'Telemedicine', 'Mobile App'],
      location: 'Mumbai',
      status: 'Series A'
    }
  },
  {
    id: 'startup-3',
    type: 'startups',
    title: 'EduLearn Pro',
    description: 'Interactive learning platform with AI-powered personalization',
    image: '📚',
    url: '/startup/edulearn',
    metadata: {
      platform: 'dofracto',
      tags: ['EdTech', 'AI', 'E-learning'],
      location: 'Delhi',
      status: 'Pre-Seed'
    }
  },
  // Jobs
  {
    id: 'job-1',
    type: 'jobs',
    title: 'Frontend Developer Intern',
    description: 'Looking for React developers to join our growing team',
    image: '💼',
    url: '/huse-circle-platform?tab=jobs',
    metadata: {
      platform: 'huse',
      author: 'TechCorp',
      salary: '₹15,000 - ₹25,000/month',
      location: 'Remote',
      tags: ['React', 'JavaScript', 'CSS']
    }
  },
  {
    id: 'job-2',
    type: 'jobs',
    title: 'Product Designer',
    description: 'Design beautiful and intuitive user experiences',
    image: '🎨',
    url: '/huse-circle-platform?tab=jobs',
    metadata: {
      platform: 'huse',
      author: 'DesignStudio',
      salary: '₹30,000 - ₹50,000/month',
      location: 'Bangalore',
      tags: ['Figma', 'UI/UX', 'Product Design']
    }
  },
  // Opportunities
  {
    id: 'opp-1',
    type: 'opportunities',
    title: 'Full-stack Development - Equity Based',
    description: 'Join our founding team and get equity. Building a fintech platform.',
    image: '🎯',
    url: '/dofracto-opportunities',
    metadata: {
      platform: 'dofracto',
      author: 'FinTech Startup',
      tags: ['Equity', 'Full-stack', 'Fintech'],
      location: 'Hybrid'
    }
  },
  {
    id: 'opp-2',
    type: 'opportunities',
    title: 'Marketing Co-founder',
    description: 'Looking for a marketing expert to lead growth strategy',
    image: '📈',
    url: '/dofracto-opportunities',
    metadata: {
      platform: 'dofracto',
      author: 'GrowthCo',
      tags: ['Marketing', 'Co-founder', 'Equity'],
      location: 'Remote'
    }
  },
  // Quote Requests
  {
    id: 'quote-1',
    type: 'quotes',
    title: 'Need a mobile app developer',
    description: 'Looking to build an e-commerce mobile app for Android and iOS',
    image: '📱',
    url: '/quotify/request/quote-1',
    metadata: {
      platform: 'quotify',
      author: 'Fashion Retailer',
      tags: ['Mobile App', 'React Native', 'E-commerce'],
      date: '2 days ago',
      status: 'Open'
    }
  },
  {
    id: 'quote-2',
    type: 'quotes',
    title: 'Website redesign needed',
    description: 'Complete redesign of corporate website with modern UI/UX',
    image: '🌐',
    url: '/quotify/request/quote-2',
    metadata: {
      platform: 'quotify',
      author: 'Corporate Solutions',
      tags: ['Web Design', 'UI/UX', 'Branding'],
      date: '1 week ago',
      status: 'In Progress'
    }
  },
  // Posts
  {
    id: 'post-1',
    type: 'posts',
    title: 'Just launched my first SaaS product!',
    description: 'After 6 months of hard work, finally launched my project management tool',
    image: '🎉',
    url: '/huse-circle-platform?tab=feed',
    metadata: {
      platform: 'huse',
      author: 'Raj Kumar',
      tags: ['Launch', 'SaaS', 'Milestone'],
      date: '3 hours ago'
    }
  },
  {
    id: 'post-2',
    type: 'posts',
    title: 'Looking for feedback on my portfolio',
    description: 'Built my portfolio website using Next.js and Tailwind. Would love your thoughts!',
    image: '💬',
    url: '/huse-circle-platform?tab=feed',
    metadata: {
      platform: 'huse',
      author: 'Sarah Chen',
      tags: ['Portfolio', 'Next.js', 'Feedback'],
      date: '1 day ago'
    }
  },
  // Projects
  {
    id: 'project-1',
    type: 'projects',
    title: 'AI Chatbot Builder',
    description: 'No-code platform for creating AI-powered chatbots',
    image: '🤖',
    url: '/huse-circle-platform?tab=portfolio',
    metadata: {
      platform: 'huse',
      author: 'Dev Team',
      tags: ['AI', 'Chatbot', 'No-code', 'SaaS'],
      date: '2 weeks ago'
    }
  },
  {
    id: 'project-2',
    type: 'projects',
    title: 'Fitness Tracking App',
    description: 'Mobile app for tracking workouts, nutrition, and health metrics',
    image: '💪',
    url: '/huse-circle-platform?tab=portfolio',
    metadata: {
      platform: 'huse',
      author: 'Health Enthusiasts',
      tags: ['Mobile', 'Health', 'React Native', 'Firebase'],
      date: '1 month ago'
    }
  }
];

const POPULAR_SEARCHES = [
  'React developer',
  'UI/UX designer',
  'Frontend internship',
  'Startup opportunities',
  'AI projects',
  'Mobile app development',
  'Full-stack jobs',
  'Equity opportunities'
];

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('huse_recent_searches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load recent searches:', error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('huse_recent_searches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  const performSearch = (query: string, category: SearchCategory = 'all') => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API delay
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      
      let filtered = MOCK_SEARCH_DATA.filter(item => {
        // Category filter
        if (category !== 'all' && item.type !== category) {
          return false;
        }

        // Text search
        const matchesTitle = item.title.toLowerCase().includes(lowerQuery);
        const matchesDescription = item.description.toLowerCase().includes(lowerQuery);
        const matchesTags = item.metadata?.tags?.some(tag => 
          tag.toLowerCase().includes(lowerQuery)
        );
        const matchesAuthor = item.metadata?.author?.toLowerCase().includes(lowerQuery);
        const matchesLocation = item.metadata?.location?.toLowerCase().includes(lowerQuery);

        return matchesTitle || matchesDescription || matchesTags || matchesAuthor || matchesLocation;
      });

      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedCategory('all');
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    
    setRecentSearches(prev => {
      const updated = [query, ...prev.filter(q => q !== query)].slice(0, 10);
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('huse_recent_searches');
  };

  const value: SearchContextType = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedCategory,
    setSelectedCategory,
    performSearch,
    clearSearch,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    popularSearches: POPULAR_SEARCHES
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
