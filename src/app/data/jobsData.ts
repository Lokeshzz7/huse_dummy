// Shared job postings data for ecosystem
// Used by: RecruiterJobPostings, HuseCirclePlatform, DofractoPlatform

export type JobType = 'Full-Time' | 'Internship' | 'Part-Time' | 'Contract' | 'Freelance';
export type JobMode = 'Remote' | 'Hybrid' | 'On-site';
export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Student';

export interface JobApplication {
  id: number;
  applicantId: number;
  applicantName: string;
  applicantAvatar: string;
  applicantCollege?: string;
  applicantPlatform: 'huse-circle' | 'dofracto';
  appliedAt: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  coverLetter: string;
  resume?: string;
}

export interface JobPosting {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: JobType;
  mode: JobMode;
  salary: string;
  experience: ExperienceLevel;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedBy: string;
  postedAt: string;
  deadline: string;
  openings: number;
  applicationsCount: number;
  applications?: JobApplication[];
  featured?: boolean;
  visibleTo: ('huse-circle' | 'dofracto')[];
  tierRequirement?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  minCGPA?: number;
}

export const jobsDatabase: JobPosting[] = [
  {
    id: 1,
    title: 'Full-Stack Developer',
    company: 'TechCorp India',
    companyLogo: '🚀',
    location: 'Bangalore, India',
    type: 'Full-Time',
    mode: 'Hybrid',
    salary: '₹8-12 LPA',
    experience: 'Entry Level',
    description: 'Join our dynamic team as a Full-Stack Developer and work on cutting-edge web applications. You\'ll be building scalable solutions using modern technologies and contributing to products used by millions of users.',
    responsibilities: [
      'Develop and maintain web applications using React and Node.js',
      'Collaborate with cross-functional teams to define and ship new features',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and technical discussions',
      'Optimize applications for maximum speed and scalability'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong knowledge of React, Node.js, and JavaScript/TypeScript',
      'Experience with REST APIs and database design',
      'Good understanding of Git and version control',
      'Excellent problem-solving and communication skills'
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'REST APIs', 'Git'],
    benefits: [
      'Competitive salary with performance bonuses',
      'Health insurance for you and family',
      'Flexible work hours and hybrid model',
      'Learning and development budget',
      'Annual team retreats'
    ],
    postedBy: 'Rajesh Sharma',
    postedAt: '2 days ago',
    deadline: '2025-01-15',
    openings: 5,
    applicationsCount: 47,
    featured: true,
    visibleTo: ['huse-circle', 'dofracto'],
    tierRequirement: 'Silver',
    minCGPA: 7.0,
    applications: [
      {
        id: 1,
        applicantId: 1,
        applicantName: 'Priya Sharma',
        applicantAvatar: '👩‍💻',
        applicantCollege: 'IIT Bombay',
        applicantPlatform: 'huse-circle',
        appliedAt: '1 day ago',
        status: 'shortlisted',
        coverLetter: 'I am excited to apply for the Full-Stack Developer position. With my experience in React and Node.js, I believe I can contribute effectively to your team.'
      },
      {
        id: 2,
        applicantId: 4,
        applicantName: 'Arjun Kumar',
        applicantAvatar: '👨‍💻',
        applicantCollege: 'IIT Delhi',
        applicantPlatform: 'huse-circle',
        appliedAt: '2 days ago',
        status: 'reviewing',
        coverLetter: 'I have built several full-stack applications and would love to bring my skills to TechCorp.'
      }
    ]
  },
  {
    id: 2,
    title: 'Machine Learning Engineer',
    company: 'AI Solutions Pvt Ltd',
    companyLogo: '🤖',
    location: 'Hyderabad, India',
    type: 'Full-Time',
    mode: 'Remote',
    salary: '₹10-15 LPA',
    experience: 'Entry Level',
    description: 'We\'re looking for a passionate ML Engineer to join our AI research team. You\'ll work on state-of-the-art machine learning models and deploy them at scale.',
    responsibilities: [
      'Design and implement machine learning models',
      'Work with large datasets for training and validation',
      'Deploy ML models to production environments',
      'Collaborate with data scientists and engineers',
      'Stay updated with latest ML research and techniques'
    ],
    requirements: [
      'Strong foundation in Machine Learning and Deep Learning',
      'Experience with Python, TensorFlow/PyTorch',
      'Understanding of MLOps and deployment pipelines',
      'Knowledge of cloud platforms (AWS/GCP)',
      'Published research papers or projects (preferred)'
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'AWS'],
    benefits: [
      'Fully remote work',
      'Stock options',
      'Conference and research paper budget',
      'Latest hardware and tools',
      'Mentorship from industry experts'
    ],
    postedBy: 'Dr. Ananya Krishnan',
    postedAt: '1 week ago',
    deadline: '2025-01-20',
    openings: 3,
    applicationsCount: 32,
    featured: true,
    visibleTo: ['huse-circle', 'dofracto'],
    tierRequirement: 'Gold',
    minCGPA: 7.5,
    applications: [
      {
        id: 3,
        applicantId: 2,
        applicantName: 'Rahul Verma',
        applicantAvatar: '👨‍🔬',
        applicantCollege: 'IIT Bombay',
        applicantPlatform: 'huse-circle',
        appliedAt: '3 days ago',
        status: 'shortlisted',
        coverLetter: 'As a Google Summer of Code participant with published research in computer vision, I am eager to contribute to your ML team.'
      }
    ]
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'DesignHub Studios',
    companyLogo: '🎨',
    location: 'Mumbai, India',
    type: 'Full-Time',
    mode: 'Hybrid',
    salary: '₹6-10 LPA',
    experience: 'Entry Level',
    description: 'Join our creative team and design beautiful, user-centric interfaces for web and mobile applications. We value creativity, user research, and attention to detail.',
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with developers to implement designs',
      'Maintain and evolve design systems',
      'Present design concepts to stakeholders'
    ],
    requirements: [
      'Strong portfolio showcasing UI/UX work',
      'Proficiency in Figma, Adobe XD, or Sketch',
      'Understanding of design principles and user psychology',
      'Experience with prototyping tools',
      'Good communication and presentation skills'
    ],
    skills: ['Figma', 'Adobe XD', 'UI/UX Design', 'Prototyping', 'User Research', 'Design Systems'],
    benefits: [
      'Creative and collaborative work environment',
      'Design tools and software licenses',
      'Flexible work schedule',
      'Health and wellness benefits',
      'Professional development opportunities'
    ],
    postedBy: 'Meera Iyer',
    postedAt: '3 days ago',
    deadline: '2025-01-18',
    openings: 2,
    applicationsCount: 28,
    featured: false,
    visibleTo: ['huse-circle', 'dofracto'],
    tierRequirement: 'Bronze',
    minCGPA: 6.5,
    applications: [
      {
        id: 4,
        applicantId: 3,
        applicantName: 'Sneha Patel',
        applicantAvatar: '👩‍🎨',
        applicantCollege: 'BITS Pilani',
        applicantPlatform: 'huse-circle',
        appliedAt: '1 day ago',
        status: 'pending',
        coverLetter: 'I have designed 15+ projects and won a design hackathon. I would love to bring my creativity to DesignHub.'
      }
    ]
  },
  {
    id: 4,
    title: 'Backend Developer Intern',
    company: 'StartupXYZ',
    companyLogo: '💼',
    location: 'Delhi, India',
    type: 'Internship',
    mode: 'On-site',
    salary: '₹25-30k/month',
    experience: 'Student',
    description: 'Looking for enthusiastic backend developers to join our team as interns. Great learning opportunity with hands-on experience in building scalable APIs.',
    responsibilities: [
      'Develop RESTful APIs using Node.js/Python',
      'Work with databases (SQL/NoSQL)',
      'Write unit tests and documentation',
      'Collaborate with senior developers',
      'Participate in daily standups and sprint planning'
    ],
    requirements: [
      'Currently pursuing Bachelor\'s in CS or related field',
      'Basic knowledge of backend technologies',
      'Understanding of databases and APIs',
      'Eagerness to learn and grow',
      'Available for 3-6 month internship'
    ],
    skills: ['Node.js', 'Python', 'SQL', 'REST APIs', 'Git'],
    benefits: [
      'Hands-on learning experience',
      'Mentorship from experienced developers',
      'Certificate of completion',
      'Potential for full-time offer',
      'Flexible internship hours'
    ],
    postedBy: 'Karan Malhotra',
    postedAt: '5 days ago',
    deadline: '2025-01-10',
    openings: 10,
    applicationsCount: 89,
    featured: false,
    visibleTo: ['huse-circle'],
    tierRequirement: 'Bronze',
    minCGPA: 6.0
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    companyLogo: '☁️',
    location: 'Pune, India',
    type: 'Full-Time',
    mode: 'Remote',
    salary: '₹9-14 LPA',
    experience: 'Mid Level',
    description: 'Join our infrastructure team and help build and maintain scalable cloud solutions. Work with cutting-edge DevOps tools and practices.',
    responsibilities: [
      'Manage and optimize cloud infrastructure (AWS/Azure)',
      'Implement CI/CD pipelines',
      'Monitor system performance and troubleshoot issues',
      'Automate deployment processes',
      'Ensure security and compliance'
    ],
    requirements: [
      'Experience with cloud platforms (AWS/Azure/GCP)',
      'Strong knowledge of Docker and Kubernetes',
      'Proficiency in scripting (Bash/Python)',
      'Understanding of CI/CD tools (Jenkins/GitLab CI)',
      'Good problem-solving skills'
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Python'],
    benefits: [
      'Fully remote position',
      'Cloud certifications support',
      'Latest tools and technologies',
      'Performance bonuses',
      'Work-life balance'
    ],
    postedBy: 'Vikram Rao',
    postedAt: '1 week ago',
    deadline: '2025-01-25',
    openings: 4,
    applicationsCount: 41,
    featured: true,
    visibleTo: ['dofracto'],
    tierRequirement: 'Gold'
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'InnovateTech',
    companyLogo: '💡',
    location: 'Bangalore, India',
    type: 'Full-Time',
    mode: 'Hybrid',
    salary: '₹12-18 LPA',
    experience: 'Entry Level',
    description: 'Looking for an analytical and strategic product manager to drive product vision and execution. Work closely with engineering and design teams.',
    responsibilities: [
      'Define product roadmap and strategy',
      'Gather and prioritize product requirements',
      'Work with engineering team on execution',
      'Analyze metrics and user feedback',
      'Present product updates to stakeholders'
    ],
    requirements: [
      'Bachelor\'s degree in any field',
      'Strong analytical and problem-solving skills',
      'Understanding of product development lifecycle',
      'Excellent communication skills',
      'Experience with product management tools'
    ],
    skills: ['Product Management', 'Analytics', 'JIRA', 'Agile', 'User Research', 'Data Analysis'],
    benefits: [
      'Competitive salary and equity',
      'Work on innovative products',
      'Leadership development program',
      'Health and wellness benefits',
      'Quarterly team offsites'
    ],
    postedBy: 'Priya Menon',
    postedAt: '4 days ago',
    deadline: '2025-01-22',
    openings: 2,
    applicationsCount: 35,
    featured: false,
    visibleTo: ['huse-circle', 'dofracto'],
    tierRequirement: 'Gold',
    minCGPA: 7.0
  },
  {
    id: 7,
    title: 'Data Scientist',
    company: 'Analytics Pro',
    companyLogo: '📊',
    location: 'Chennai, India',
    type: 'Full-Time',
    mode: 'Hybrid',
    salary: '₹8-13 LPA',
    experience: 'Entry Level',
    description: 'Join our data science team and work on solving complex business problems using data-driven approaches and machine learning.',
    responsibilities: [
      'Analyze large datasets to extract insights',
      'Build predictive models and algorithms',
      'Create data visualizations and reports',
      'Collaborate with business teams',
      'Present findings to stakeholders'
    ],
    requirements: [
      'Strong foundation in statistics and mathematics',
      'Experience with Python and data science libraries',
      'Knowledge of SQL and databases',
      'Understanding of machine learning algorithms',
      'Good communication skills'
    ],
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Tableau'],
    benefits: [
      'Work on real-world data problems',
      'Access to cutting-edge tools',
      'Continuous learning opportunities',
      'Health insurance',
      'Performance bonuses'
    ],
    postedBy: 'Suresh Kumar',
    postedAt: '6 days ago',
    deadline: '2025-01-28',
    openings: 3,
    applicationsCount: 52,
    featured: false,
    visibleTo: ['huse-circle', 'dofracto'],
    tierRequirement: 'Silver',
    minCGPA: 7.0
  },
  {
    id: 8,
    title: 'Mobile App Developer',
    company: 'AppBuilders Inc',
    companyLogo: '📱',
    location: 'Noida, India',
    type: 'Full-Time',
    mode: 'On-site',
    salary: '₹7-11 LPA',
    experience: 'Entry Level',
    description: 'Build beautiful and performant mobile applications for iOS and Android. Work with React Native and native technologies.',
    responsibilities: [
      'Develop mobile applications for iOS and Android',
      'Implement responsive UI/UX designs',
      'Integrate with backend APIs',
      'Optimize app performance',
      'Fix bugs and improve app stability'
    ],
    requirements: [
      'Experience with React Native or Flutter',
      'Knowledge of mobile app architecture',
      'Understanding of iOS/Android development',
      'Familiarity with mobile UI/UX principles',
      'Strong debugging skills'
    ],
    skills: ['React Native', 'Flutter', 'JavaScript', 'iOS', 'Android', 'Firebase'],
    benefits: [
      'Latest mobile devices for testing',
      'Competitive compensation',
      'Learning and certification support',
      'Health benefits',
      'Team events and activities'
    ],
    postedBy: 'Neha Singh',
    postedAt: '1 week ago',
    deadline: '2025-01-30',
    openings: 4,
    applicationsCount: 38,
    featured: false,
    visibleTo: ['huse-circle', 'dofracto'],
    tierRequirement: 'Silver',
    minCGPA: 6.5
  }
];

// Helper functions
export const getJobById = (id: number): JobPosting | undefined => {
  return jobsDatabase.find(job => job.id === id);
};

export const getJobsByCompany = (company: string): JobPosting[] => {
  return jobsDatabase.filter(job => job.company === company);
};

export const getJobsByPlatform = (platform: 'huse-circle' | 'dofracto'): JobPosting[] => {
  return jobsDatabase.filter(job => job.visibleTo.includes(platform));
};

export const getFeaturedJobs = (): JobPosting[] => {
  return jobsDatabase.filter(job => job.featured);
};

export const getJobsByType = (type: JobType): JobPosting[] => {
  return jobsDatabase.filter(job => job.type === type);
};
