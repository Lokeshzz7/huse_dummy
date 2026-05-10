import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

// Application statuses with specific meanings
export type ApplicationStatus = 
  | 'draft'          // Started but not submitted
  | 'submitted'      // Application sent
  | 'under-review'   // Employer is reviewing
  | 'interview'      // Interview scheduled/completed
  | 'assessment'     // Technical/skills assessment stage
  | 'offer'          // Offer received
  | 'accepted'       // Accepted the offer
  | 'rejected'       // Application rejected
  | 'withdrawn';     // Applicant withdrew

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  appliedDate: string;
  status: ApplicationStatus;
  platform: 'huse' | 'dofracto' | 'recruiter';
  
  // Application details
  coverLetter?: string;
  resume?: string;
  portfolio?: string;
  expectedSalary?: number;
  
  // Tracking information
  timeline: ApplicationEvent[];
  notes?: string;
  
  // Interview details (if applicable)
  interviewDate?: string;
  interviewType?: 'phone' | 'video' | 'in-person' | 'technical';
  interviewNotes?: string;
  
  // Offer details (if applicable)
  offerAmount?: number;
  offerDeadline?: string;
  
  // Contact
  recruiterName?: string;
  recruiterEmail?: string;
  recruiterPhone?: string;
}

export interface ApplicationEvent {
  id: string;
  type: ApplicationStatus;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

interface ApplicationContextType {
  applications: JobApplication[];
  getApplication: (id: string) => JobApplication | undefined;
  createApplication: (application: Omit<JobApplication, 'id' | 'appliedDate' | 'timeline'>) => JobApplication;
  updateApplicationStatus: (id: string, status: ApplicationStatus, notes?: string) => void;
  withdrawApplication: (id: string, reason?: string) => void;
  addApplicationNote: (id: string, note: string) => void;
  addInterviewDetails: (id: string, details: { date: string; type: JobApplication['interviewType']; notes?: string }) => void;
  getApplicationsByStatus: (status: ApplicationStatus) => JobApplication[];
  getApplicationStats: () => {
    total: number;
    active: number;
    interviews: number;
    offers: number;
    rejected: number;
  };
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

// Mock applications data for demo
const MOCK_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Frontend Developer Intern',
    company: 'TechCorp',
    companyLogo: '💻',
    appliedDate: '2024-12-10',
    status: 'interview',
    platform: 'huse',
    coverLetter: 'Dear Hiring Manager...',
    expectedSalary: 50000,
    timeline: [
      {
        id: 'event-1',
        type: 'submitted',
        title: 'Application Submitted',
        description: 'Your application has been received',
        date: '2024-12-10',
        icon: '📤'
      },
      {
        id: 'event-2',
        type: 'under-review',
        title: 'Under Review',
        description: 'Recruiter is reviewing your profile',
        date: '2024-12-12',
        icon: '👀'
      },
      {
        id: 'event-3',
        type: 'interview',
        title: 'Interview Scheduled',
        description: 'Video interview on Dec 20, 2024',
        date: '2024-12-15',
        icon: '📹'
      }
    ],
    interviewDate: '2024-12-20',
    interviewType: 'video',
    recruiterName: 'Sarah Johnson',
    recruiterEmail: 'sarah@techcorp.com'
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'UI/UX Designer',
    company: 'DesignHub',
    companyLogo: '🎨',
    appliedDate: '2024-12-08',
    status: 'offer',
    platform: 'dofracto',
    timeline: [
      {
        id: 'event-4',
        type: 'submitted',
        title: 'Application Submitted',
        description: 'Your application has been received',
        date: '2024-12-08',
        icon: '📤'
      },
      {
        id: 'event-5',
        type: 'interview',
        title: 'Interview Completed',
        description: 'Successfully completed 2 rounds',
        date: '2024-12-14',
        icon: '✅'
      },
      {
        id: 'event-6',
        type: 'offer',
        title: 'Offer Received',
        description: 'Congratulations! You received an offer',
        date: '2024-12-18',
        icon: '🎉'
      }
    ],
    offerAmount: 65000,
    offerDeadline: '2024-12-25'
  },
  {
    id: 'app-3',
    jobId: 'job-3',
    jobTitle: 'Backend Developer',
    company: 'StartupX',
    companyLogo: '🚀',
    appliedDate: '2024-12-05',
    status: 'rejected',
    platform: 'recruiter',
    timeline: [
      {
        id: 'event-7',
        type: 'submitted',
        title: 'Application Submitted',
        description: 'Your application has been received',
        date: '2024-12-05',
        icon: '📤'
      },
      {
        id: 'event-8',
        type: 'rejected',
        title: 'Application Not Selected',
        description: 'Thank you for your interest',
        date: '2024-12-12',
        icon: '❌'
      }
    ]
  }
];

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  // Load applications from localStorage on mount
  useEffect(() => {
    const storedApps = localStorage.getItem('huse_applications');
    if (storedApps) {
      try {
        setApplications(JSON.parse(storedApps));
      } catch (error) {
        console.error('Failed to load applications:', error);
        setApplications(MOCK_APPLICATIONS);
      }
    } else {
      setApplications(MOCK_APPLICATIONS);
    }
  }, []);

  // Save applications to localStorage whenever they change
  useEffect(() => {
    if (applications.length > 0) {
      localStorage.setItem('huse_applications', JSON.stringify(applications));
    }
  }, [applications]);

  const getApplication = (id: string) => {
    return applications.find(app => app.id === id);
  };

  const createApplication = (application: Omit<JobApplication, 'id' | 'appliedDate' | 'timeline'>): JobApplication => {
    const newApplication: JobApplication = {
      ...application,
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      timeline: [
        {
          id: `event-${Date.now()}`,
          type: 'submitted',
          title: 'Application Submitted',
          description: 'Your application has been received and is being processed',
          date: new Date().toISOString().split('T')[0],
          icon: '📤'
        }
      ]
    };

    setApplications(prev => [newApplication, ...prev]);
    toast.success(`Application submitted for ${application.jobTitle}!`, {
      description: `We'll notify you when there's an update.`
    });

    return newApplication;
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus, notes?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        const eventTitles: Record<ApplicationStatus, string> = {
          'draft': 'Draft Saved',
          'submitted': 'Application Submitted',
          'under-review': 'Under Review',
          'interview': 'Interview Scheduled',
          'assessment': 'Assessment Stage',
          'offer': 'Offer Received',
          'accepted': 'Offer Accepted',
          'rejected': 'Application Not Selected',
          'withdrawn': 'Application Withdrawn'
        };

        const eventIcons: Record<ApplicationStatus, string> = {
          'draft': '📝',
          'submitted': '📤',
          'under-review': '👀',
          'interview': '📹',
          'assessment': '📊',
          'offer': '🎉',
          'accepted': '✅',
          'rejected': '❌',
          'withdrawn': '↩️'
        };

        const newEvent: ApplicationEvent = {
          id: `event-${Date.now()}`,
          type: status,
          title: eventTitles[status],
          description: notes || `Application status updated to ${status}`,
          date: new Date().toISOString().split('T')[0],
          icon: eventIcons[status]
        };

        toast.success(`Status Updated: ${eventTitles[status]}`, {
          description: `Application for ${app.jobTitle}`
        });

        return {
          ...app,
          status,
          timeline: [...app.timeline, newEvent],
          notes: notes ? `${app.notes || ''}\n${notes}`.trim() : app.notes
        };
      }
      return app;
    }));
  };

  const withdrawApplication = (id: string, reason?: string) => {
    updateApplicationStatus(id, 'withdrawn', reason || 'Application withdrawn by applicant');
  };

  const addApplicationNote = (id: string, note: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        const timestamp = new Date().toLocaleString();
        const newNote = `[${timestamp}] ${note}`;
        
        return {
          ...app,
          notes: app.notes ? `${app.notes}\n${newNote}` : newNote
        };
      }
      return app;
    }));

    toast.success('Note added successfully');
  };

  const addInterviewDetails = (
    id: string, 
    details: { date: string; type: JobApplication['interviewType']; notes?: string }
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        const event: ApplicationEvent = {
          id: `event-${Date.now()}`,
          type: 'interview',
          title: 'Interview Scheduled',
          description: `${details.type} interview on ${details.date}`,
          date: new Date().toISOString().split('T')[0],
          icon: '📅'
        };

        toast.success('Interview Scheduled!', {
          description: `${details.type} interview on ${details.date}`
        });

        return {
          ...app,
          status: 'interview',
          interviewDate: details.date,
          interviewType: details.type,
          interviewNotes: details.notes,
          timeline: [...app.timeline, event]
        };
      }
      return app;
    }));
  };

  const getApplicationsByStatus = (status: ApplicationStatus) => {
    return applications.filter(app => app.status === status);
  };

  const getApplicationStats = () => {
    return {
      total: applications.length,
      active: applications.filter(app => 
        ['submitted', 'under-review', 'interview', 'assessment'].includes(app.status)
      ).length,
      interviews: applications.filter(app => app.status === 'interview').length,
      offers: applications.filter(app => ['offer', 'accepted'].includes(app.status)).length,
      rejected: applications.filter(app => app.status === 'rejected').length
    };
  };

  const value: ApplicationContextType = {
    applications,
    getApplication,
    createApplication,
    updateApplicationStatus,
    withdrawApplication,
    addApplicationNote,
    addInterviewDetails,
    getApplicationsByStatus,
    getApplicationStats
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
}
