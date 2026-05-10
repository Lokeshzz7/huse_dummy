// Shared student data for HUSE Circle ecosystem
// Used by: RecruiterDashboard, StudentPortfolio, HuseCirclePlatform

import { calculateTier } from '../utils/tierSystem';

export interface Student {
  id: number;
  name: string;
  avatar: string;
  college: string;
  collegeId: string;
  year: string;
  branch: string;
  reputation: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'; // Auto-calculated from reputation
  verified: boolean;
  skills: string[];
  bio: string;
  projects: number;
  gigs: number;
  cgpa: number;
  location: string;
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
  recentWork: Array<{
    title: string;
    tech: string[];
    views: number;
  }>;
  availability: string;
  detailedProjects?: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    tech: string[];
    views: number;
    likes: number;
    github?: string;
    live?: string;
    featured?: boolean;
  }>;
  achievements?: Array<{
    id: number;
    title: string;
    date: string;
    description: string;
    icon: string;
    color: string;
  }>;
  experience?: Array<{
    id: number;
    company: string;
    role: string;
    duration: string;
    description: string;
    logo: string;
  }>;
  skillLevels?: Array<{
    name: string;
    level: number;
  }>;
}

export const studentsDatabase: Student[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: '👩‍💻',
    college: 'IIT Bombay',
    collegeId: 'iit-bombay',
    year: '4th Year',
    branch: 'Computer Science',
    reputation: 1200,
    tier: calculateTier(1200), // Auto-calculated: Silver tier
    verified: true,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    bio: 'Full-stack developer passionate about building scalable applications. 3x hackathon winner with experience in React, Node.js, and cloud technologies.',
    projects: 12,
    gigs: 8,
    cgpa: 9.2,
    location: 'Mumbai, India',
    contact: {
      email: 'priya.sharma@iitb.ac.in',
      phone: '+91 98765 43210',
      github: 'https://github.com/priya',
      linkedin: 'https://linkedin.com/in/priya'
    },
    recentWork: [
      { title: 'E-Commerce Platform', tech: ['React', 'Node.js'], views: 1200 },
      { title: 'AI Chatbot', tech: ['Python', 'TensorFlow'], views: 890 }
    ],
    availability: 'Available from May 2025',
    skillLevels: [
      { name: 'React', level: 95 },
      { name: 'Node.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'AWS', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'Docker', level: 80 },
      { name: 'GraphQL', level: 78 },
      { name: 'Python', level: 75 }
    ],
    detailedProjects: [
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with real-time inventory management, payment integration, and admin dashboard.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=450&fit=crop',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        views: 1200,
        likes: 89,
        github: 'https://github.com/priya/ecommerce',
        live: 'https://demo-ecommerce.vercel.app',
        featured: true
      },
      {
        id: 2,
        title: 'AI Chatbot Assistant',
        description: 'Intelligent chatbot using GPT API for customer support with sentiment analysis and multi-language support.',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop',
        tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
        views: 890,
        likes: 67,
        github: 'https://github.com/priya/ai-chatbot',
        featured: true
      },
      {
        id: 3,
        title: 'Task Management System',
        description: 'Collaborative task management tool with real-time updates, team chat, and analytics dashboard.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop',
        tech: ['React', 'Firebase', 'TypeScript', 'Material-UI'],
        views: 645,
        likes: 45,
        github: 'https://github.com/priya/task-manager'
      },
      {
        id: 4,
        title: 'Social Media Analytics',
        description: 'Analytics dashboard for tracking social media metrics across multiple platforms with AI-powered insights.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
        tech: ['Next.js', 'D3.js', 'PostgreSQL', 'AWS'],
        views: 534,
        likes: 38,
        live: 'https://analytics-demo.vercel.app'
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Smart India Hackathon Winner',
        date: 'Dec 2024',
        description: 'First place in national hackathon with 500+ teams',
        icon: '🏆',
        color: 'from-amber-500 to-yellow-500'
      },
      {
        id: 2,
        title: 'Google Summer of Code',
        date: 'Summer 2024',
        description: 'Contributed to open-source project for React ecosystem',
        icon: '💻',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 3,
        title: 'Best Student Developer Award',
        date: 'Nov 2024',
        description: 'Recognized by college for outstanding projects',
        icon: '⭐',
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 4,
        title: 'Published Research Paper',
        date: 'Oct 2024',
        description: 'Paper on ML optimization published in IEEE conference',
        icon: '📄',
        color: 'from-green-500 to-emerald-500'
      }
    ],
    experience: [
      {
        id: 1,
        company: 'TechCorp India',
        role: 'Full-Stack Development Intern',
        duration: 'May 2024 - Aug 2024',
        description: 'Built microservices architecture and improved API performance by 40%',
        logo: '🚀'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        role: 'Frontend Developer',
        duration: 'Jan 2024 - Apr 2024',
        description: 'Developed responsive web applications using React and TypeScript',
        logo: '💼'
      },
      {
        id: 3,
        company: 'Freelance Projects',
        role: 'Independent Developer',
        duration: '2023 - Present',
        description: 'Completed 15+ client projects with 5-star ratings',
        logo: '⭐'
      }
    ]
  },
  {
    id: 2,
    name: 'Rahul Verma',
    avatar: '👨‍🔬',
    college: 'IIT Bombay',
    collegeId: 'iit-bombay',
    year: '3rd Year',
    branch: 'Computer Science',
    reputation: 980,
    tier: calculateTier(980), // Auto-calculated: Silver tier
    verified: true,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
    bio: 'ML enthusiast with research papers in computer vision. Google Summer of Code participant.',
    projects: 8,
    gigs: 6,
    cgpa: 9.0,
    location: 'Mumbai, India',
    contact: {
      email: 'rahul.verma@iitb.ac.in',
      phone: '+91 98765 43211',
      github: 'https://github.com/rahul',
      linkedin: 'https://linkedin.com/in/rahul'
    },
    recentWork: [
      { title: 'Image Classification Model', tech: ['Python', 'PyTorch'], views: 2100 },
      { title: 'NLP Sentiment Analyzer', tech: ['Python', 'NLTK'], views: 1450 }
    ],
    availability: 'Available for internships',
    skillLevels: [
      { name: 'Python', level: 95 },
      { name: 'TensorFlow', level: 90 },
      { name: 'PyTorch', level: 88 },
      { name: 'Machine Learning', level: 92 },
      { name: 'Data Science', level: 87 },
      { name: 'Computer Vision', level: 85 }
    ],
    detailedProjects: [
      {
        id: 1,
        title: 'Image Classification Model',
        description: 'Deep learning model for multi-class image classification with 94% accuracy on ImageNet dataset.',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop',
        tech: ['Python', 'PyTorch', 'CNN', 'Transfer Learning'],
        views: 2100,
        likes: 156,
        github: 'https://github.com/rahul/image-classifier',
        featured: true
      },
      {
        id: 2,
        title: 'NLP Sentiment Analyzer',
        description: 'Natural language processing tool for sentiment analysis across multiple languages.',
        image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=450&fit=crop',
        tech: ['Python', 'NLTK', 'BERT', 'FastAPI'],
        views: 1450,
        likes: 98,
        github: 'https://github.com/rahul/sentiment-analyzer'
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Google Summer of Code',
        date: 'Summer 2024',
        description: 'Selected for GSoC, contributed to TensorFlow project',
        icon: '💻',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 2,
        title: 'Research Paper Published',
        date: 'Nov 2024',
        description: 'Paper on computer vision published in ACM conference',
        icon: '📄',
        color: 'from-green-500 to-emerald-500'
      }
    ],
    experience: [
      {
        id: 1,
        company: 'AI Research Lab',
        role: 'ML Research Intern',
        duration: 'Jun 2024 - Aug 2024',
        description: 'Worked on computer vision models for autonomous vehicles',
        logo: '🤖'
      }
    ]
  },
  {
    id: 3,
    name: 'Sneha Patel',
    avatar: '👩‍🎨',
    college: 'BITS Pilani',
    collegeId: 'bits-pilani',
    year: '2nd Year',
    branch: 'Design',
    reputation: 645,
    tier: calculateTier(645), // Auto-calculated: Silver tier
    verified: false,
    skills: ['Figma', 'UI/UX Design', 'Adobe XD', 'Prototyping'],
    bio: 'Product designer focused on creating delightful user experiences. Design thinking advocate.',
    projects: 15,
    gigs: 4,
    cgpa: 8.7,
    location: 'Pilani, India',
    contact: {
      email: 'sneha.patel@pilani.bits-pilani.ac.in',
      phone: '+91 98765 43212',
      github: 'https://github.com/sneha',
      linkedin: 'https://linkedin.com/in/sneha'
    },
    recentWork: [
      { title: 'Mobile Banking App UI', tech: ['Figma', 'Design Systems'], views: 980 },
      { title: 'SaaS Dashboard Redesign', tech: ['Figma', 'User Research'], views: 756 }
    ],
    availability: 'Available from June 2025',
    skillLevels: [
      { name: 'Figma', level: 95 },
      { name: 'UI/UX Design', level: 92 },
      { name: 'Adobe XD', level: 85 },
      { name: 'Prototyping', level: 88 },
      { name: 'Design Systems', level: 80 }
    ],
    detailedProjects: [
      {
        id: 1,
        title: 'Mobile Banking App UI',
        description: 'Complete UI/UX redesign of mobile banking application focusing on accessibility and ease of use.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop',
        tech: ['Figma', 'Design Systems', 'User Research'],
        views: 980,
        likes: 72,
        featured: true
      },
      {
        id: 2,
        title: 'SaaS Dashboard Redesign',
        description: 'Modern dashboard design with focus on data visualization and user workflows.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
        tech: ['Figma', 'User Research', 'Wireframing'],
        views: 756,
        likes: 54
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Design Hackathon Winner',
        date: 'Oct 2024',
        description: 'Won first place in national design thinking hackathon',
        icon: '🎨',
        color: 'from-pink-500 to-rose-500'
      }
    ],
    experience: [
      {
        id: 1,
        company: 'Design Studio',
        role: 'UI/UX Design Intern',
        duration: 'May 2024 - Jul 2024',
        description: 'Created designs for 5+ client projects',
        logo: '🎨'
      }
    ]
  },
  {
    id: 4,
    name: 'Arjun Kumar',
    avatar: '👨‍💻',
    college: 'IIT Delhi',
    collegeId: 'iit-delhi',
    year: '3rd Year',
    branch: 'Computer Science',
    reputation: 847,
    tier: calculateTier(847), // Auto-calculated: Silver tier
    verified: true,
    skills: ['React', 'Next.js', 'TypeScript', 'GraphQL'],
    bio: 'Frontend engineer with a keen eye for performance optimization and accessibility.',
    projects: 10,
    gigs: 7,
    cgpa: 8.9,
    location: 'Delhi, India',
    contact: {
      email: 'arjun.kumar@iitd.ac.in',
      phone: '+91 98765 43213',
      github: 'https://github.com/arjun',
      linkedin: 'https://linkedin.com/in/arjun'
    },
    recentWork: [
      { title: 'Real-time Collaboration Tool', tech: ['React', 'WebSockets'], views: 1340 },
      { title: 'Component Library', tech: ['React', 'Storybook'], views: 890 }
    ],
    availability: 'Open to opportunities',
    skillLevels: [
      { name: 'React', level: 93 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 91 },
      { name: 'GraphQL', level: 85 },
      { name: 'Performance Optimization', level: 88 }
    ],
    detailedProjects: [
      {
        id: 1,
        title: 'Real-time Collaboration Tool',
        description: 'Collaborative workspace with real-time updates using WebSockets and React.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop',
        tech: ['React', 'WebSockets', 'Node.js', 'Redis'],
        views: 1340,
        likes: 95,
        github: 'https://github.com/arjun/collab-tool',
        live: 'https://collab-demo.vercel.app',
        featured: true
      },
      {
        id: 2,
        title: 'Component Library',
        description: 'Reusable React component library with Storybook documentation.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
        tech: ['React', 'Storybook', 'TypeScript', 'CSS-in-JS'],
        views: 890,
        likes: 67,
        github: 'https://github.com/arjun/component-lib'
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Frontend Excellence Award',
        date: 'Sep 2024',
        description: 'Recognized for outstanding frontend development skills',
        icon: '⚡',
        color: 'from-cyan-500 to-blue-500'
      }
    ],
    experience: [
      {
        id: 1,
        company: 'Tech Startup',
        role: 'Frontend Developer Intern',
        duration: 'Jun 2024 - Aug 2024',
        description: 'Built performant React applications with focus on accessibility',
        logo: '💻'
      }
    ]
  }
];

// Helper function to get student by ID
export const getStudentById = (id: number): Student | undefined => {
  return studentsDatabase.find(student => student.id === id);
};

// Helper function to get students by college
export const getStudentsByCollege = (collegeId: string): Student[] => {
  return studentsDatabase.filter(student => student.collegeId === collegeId);
};

// Helper function to get students by tier
export const getStudentsByTier = (tier: string): Student[] => {
  return studentsDatabase.filter(student => student.tier === tier);
};