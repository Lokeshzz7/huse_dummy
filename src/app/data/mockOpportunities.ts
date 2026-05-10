export const mockOpportunities = [
  {
    id: '1',
    title: 'Full Stack Developer Intern',
    type: 'internship' as const,
    description: 'Looking for a talented full stack developer to join our AI startup. Work on cutting-edge AI solutions.',
    compensation: '₹15,000 - ₹25,000/month',
    location: 'Remote',
    duration: '3-6 months',
    postedDate: '2024-12-15',
    status: 'active' as const,
    views: 245,
    businessName: 'TechVenture AI',
    requirements: [
      'React.js and Node.js experience',
      'Understanding of REST APIs',
      'Git version control',
      'Good communication skills'
    ],
    applicants: [
      {
        id: 'a1',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        platform: 'HUSE Circle' as const,
        tier: 'Silver',
        avatar: 'RS',
        skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
        experience: 'Computer Science Student',
        appliedDate: '3 days ago',
        status: 'pending' as const,
        coverLetter: 'I am a passionate full-stack developer with hands-on experience in MERN stack. I have built several projects including an e-commerce platform and a task management app. I am eager to learn and contribute to your AI startup.'
      },
      {
        id: 'a2',
        name: 'Priya Patel',
        email: 'priya.patel@email.com',
        platform: 'Dofracto' as const,
        tier: 'Gold',
        avatar: 'PP',
        skills: ['React', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL'],
        experience: 'Full Stack Developer',
        appliedDate: '5 days ago',
        status: 'shortlisted' as const,
        reputation: 12500,
        completedProjects: 8,
        rating: 4.9,
        coverLetter: 'With over 8 completed projects on Dofracto and a 4.9 rating, I bring proven expertise in full-stack development. My experience with AI/ML integration makes me a perfect fit for your startup.'
      },
      {
        id: 'a3',
        name: 'Amit Kumar',
        email: 'amit.kumar@email.com',
        platform: 'HUSE Circle' as const,
        tier: 'Bronze',
        avatar: 'AK',
        skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git'],
        experience: 'Aspiring Full Stack Developer',
        appliedDate: '1 week ago',
        status: 'rejected' as const,
        coverLetter: 'I am currently learning web development and have built a few personal projects. I am very enthusiastic about joining your team and learning from experienced developers.'
      }
    ]
  },
  {
    id: '2',
    title: 'UI/UX Designer - Equity Based',
    type: 'equity' as const,
    description: 'Join our sustainability startup as a UI/UX designer. Offering equity compensation for the right candidate.',
    compensation: '2-5% Equity + Revenue Share',
    location: 'Hybrid - Bangalore',
    duration: 'Long-term',
    postedDate: '2024-12-10',
    status: 'active' as const,
    views: 178,
    businessName: 'EcoSolutions',
    requirements: [
      'Proficiency in Figma and Adobe XD',
      '2+ years of UI/UX experience',
      'Portfolio showcasing previous work',
      'Understanding of sustainable design principles'
    ],
    applicants: [
      {
        id: 'a4',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@email.com',
        platform: 'Dofracto' as const,
        tier: 'Platinum',
        avatar: 'SR',
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
        experience: 'Senior UI/UX Designer',
        appliedDate: '2 days ago',
        status: 'shortlisted' as const,
        reputation: 45000,
        completedProjects: 15,
        rating: 4.8,
        coverLetter: 'With 15 successfully completed design projects on Dofracto, I have extensive experience in creating user-centric designs. I am passionate about sustainability and would love to contribute to your mission.'
      },
      {
        id: 'a5',
        name: 'Vikram Singh',
        email: 'vikram.singh@email.com',
        platform: 'Dofracto' as const,
        tier: 'Gold',
        avatar: 'VS',
        skills: ['Figma', 'UI Design', 'UX Research', 'Wireframing'],
        experience: 'UI/UX Designer',
        appliedDate: '4 days ago',
        status: 'pending' as const,
        reputation: 18000,
        completedProjects: 10,
        rating: 4.7,
        coverLetter: 'I have been working as a UI/UX designer for the past 3 years with a focus on sustainable and eco-friendly design solutions. My portfolio includes work for several green startups.'
      }
    ]
  },
  {
    id: '3',
    title: 'Marketing Advisor/Mentor',
    type: 'advisor' as const,
    description: 'Seeking an experienced marketing advisor to guide our fintech startup strategy.',
    compensation: '₹50,000 - ₹75,000 + 1% Equity',
    location: 'Remote',
    duration: '6-12 months',
    postedDate: '2024-12-12',
    status: 'active' as const,
    views: 98,
    businessName: 'FinTech Pro',
    requirements: [
      '5+ years in digital marketing',
      'Experience in fintech industry',
      'Track record of successful campaigns',
      'Mentoring experience'
    ],
    applicants: [
      {
        id: 'a6',
        name: 'Anjali Mehta',
        email: 'anjali.mehta@email.com',
        platform: 'Dofracto' as const,
        tier: 'Contributor',
        avatar: 'AM',
        skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Brand Building', 'Growth Hacking'],
        experience: 'Marketing Strategist',
        appliedDate: '1 day ago',
        status: 'accepted' as const,
        reputation: 75000,
        completedProjects: 22,
        rating: 5.0,
        coverLetter: 'With over 22 successful marketing projects and a perfect 5.0 rating, I have helped multiple fintech startups achieve their growth targets. I would be honored to mentor your team and drive strategic initiatives.'
      }
    ]
  },
  {
    id: '4',
    title: 'Frontend Developer - Freelance Project',
    type: 'freelance' as const,
    description: 'Need a frontend developer to build a responsive landing page for our product launch.',
    compensation: '₹40,000 - ₹60,000 (Project-based)',
    location: 'Remote',
    duration: '2-4 weeks',
    postedDate: '2024-12-18',
    status: 'active' as const,
    views: 312,
    businessName: 'TechVenture AI',
    requirements: [
      'React.js expertise',
      'Tailwind CSS',
      'Responsive design',
      'Animation libraries (Framer Motion preferred)'
    ],
    applicants: [
      {
        id: 'a7',
        name: 'Rohan Verma',
        email: 'rohan.verma@email.com',
        platform: 'Dofracto' as const,
        tier: 'Gold',
        avatar: 'RV',
        skills: ['React', 'Tailwind CSS', 'Framer Motion', 'Next.js', 'TypeScript'],
        experience: 'Frontend Developer',
        appliedDate: '2 hours ago',
        status: 'pending' as const,
        reputation: 22000,
        completedProjects: 12,
        rating: 4.8,
        coverLetter: 'I specialize in building beautiful, responsive landing pages with smooth animations. Check out my portfolio for similar projects I have completed.'
      },
      {
        id: 'a8',
        name: 'Kavya Nair',
        email: 'kavya.nair@email.com',
        platform: 'HUSE Circle' as const,
        tier: 'Gold',
        avatar: 'KN',
        skills: ['React', 'Tailwind', 'JavaScript', 'CSS3', 'HTML5'],
        experience: 'Frontend Development Student',
        appliedDate: '6 hours ago',
        status: 'pending' as const,
        coverLetter: 'As a HUSE Circle Gold tier member, I have built multiple landing pages for student projects and local businesses. I am proficient in React and Tailwind CSS and would love to work on this project.'
      },
      {
        id: 'a9',
        name: 'Arjun Desai',
        email: 'arjun.desai@email.com',
        platform: 'Dofracto' as const,
        tier: 'Platinum',
        avatar: 'AD',
        skills: ['React', 'Next.js', 'Tailwind', 'Motion', 'GSAP', 'Three.js'],
        experience: 'Senior Frontend Developer',
        appliedDate: '1 day ago',
        status: 'shortlisted' as const,
        reputation: 58000,
        completedProjects: 18,
        rating: 4.9,
        coverLetter: 'I have extensive experience creating high-performance, visually stunning landing pages. My expertise in advanced animation libraries will help create an exceptional product launch page.'
      }
    ]
  },
  {
    id: '5',
    title: 'Backend Engineer - Full Time',
    type: 'fulltime' as const,
    description: 'Looking for a backend engineer to join our core team. Competitive salary and benefits.',
    compensation: '₹8-15 LPA + ESOP',
    location: 'Bangalore (On-site)',
    duration: 'Permanent',
    postedDate: '2024-12-05',
    status: 'active' as const,
    views: 445,
    businessName: 'TechVenture AI',
    requirements: [
      'Node.js and Python expertise',
      'Database design (SQL & NoSQL)',
      'Microservices architecture',
      'AWS/GCP experience',
      '3+ years of experience'
    ],
    applicants: [
      {
        id: 'a10',
        name: 'Karthik Iyer',
        email: 'karthik.iyer@email.com',
        platform: 'Dofracto' as const,
        tier: 'Contributor',
        avatar: 'KI',
        skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'],
        experience: 'Backend Engineer',
        appliedDate: '2 weeks ago',
        status: 'shortlisted' as const,
        reputation: 110000,
        completedProjects: 25,
        rating: 4.9,
        coverLetter: 'With 5 years of backend development experience and 25 completed projects on Dofracto, I bring deep expertise in scalable architecture. I am excited about the opportunity to join your core team.'
      },
      {
        id: 'a11',
        name: 'Meera Krishnan',
        email: 'meera.k@email.com',
        platform: 'Dofracto' as const,
        tier: 'Gold',
        avatar: 'MK',
        skills: ['Node.js', 'Express', 'MySQL', 'Redis', 'AWS'],
        experience: 'Backend Developer',
        appliedDate: '1 week ago',
        status: 'pending' as const,
        reputation: 19500,
        completedProjects: 11,
        rating: 4.7,
        coverLetter: 'I have been working as a backend developer for 3+ years with experience in building RESTful APIs and microservices. I am looking for a full-time opportunity with a growing startup.'
      }
    ]
  }
];
