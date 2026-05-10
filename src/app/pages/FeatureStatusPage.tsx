import { motion } from 'motion/react';
import { 
  CheckCircle, AlertCircle, Circle, ArrowLeft,
  Navigation, Square, FileText, Lock, MessageSquare,
  CreditCard, Upload, RefreshCw, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeatureStatus {
  name: string;
  status: 'working' | 'mock' | 'partial' | 'not-implemented';
  description: string;
  icon: any;
  details: string[];
}

export function FeatureStatusPage() {
  const navigate = useNavigate();

  const features: FeatureStatus[] = [
    {
      name: 'Navigation (Within Platforms)',
      status: 'working',
      description: 'All routes and navigation working perfectly',
      icon: Navigation,
      details: [
        '50+ routes configured',
        'HUSE Circle: Feed, Jobs, Gigs, Marketplace, Portfolio, Opportunities',
        'Dofracto: Builders Hub, Opportunities, Business Listings, Startups',
        'Quotify: Dashboard, Requests, Matches, Provider Profiles',
        'Search functionality across all platforms',
        'Application tracker & messaging'
      ]
    },
    {
      name: 'Modals',
      status: 'working',
      description: 'All modals functional (some connected, some display-only)',
      icon: Square,
      details: [
        'Connected: AddProject, PostGig, ApplyGig, SellItem, Settings, EditProfile',
        'Connected: TierUnlock, Graduate, JobApplication modals',
        'Display: Opportunity details, Quote details, Profile views',
        'All modals properly close and manage state'
      ]
    },
    {
      name: 'Forms',
      status: 'working',
      description: 'All forms UI complete with validation',
      icon: FileText,
      details: [
        'Login forms: HUSE, Dofracto, Quotify, Recruiter, Admin',
        'Registration: College verification, Contributor signup',
        'Content creation: Projects, Gigs, Items, Quotes, Applications',
        'Settings & profile edit forms',
        'Form validation working, state management functional'
      ]
    },
    {
      name: 'Authentication State',
      status: 'mock',
      description: 'Mock authentication with localStorage persistence',
      icon: Lock,
      details: [
        'Mock user database in AuthContext',
        'Login/logout with localStorage persistence',
        'Role-based access: student, contributor, recruiter, business, client, provider',
        'Tier-based features: Bronze, Silver, Gold, Platinum',
        'Demo credentials at /demo-credentials',
        '7+ demo users available across all platforms'
      ]
    },
    {
      name: 'Real-time Messaging',
      status: 'mock',
      description: 'Messaging system with localStorage (simulated real-time)',
      icon: MessageSquare,
      details: [
        'Two-panel messaging interface at /messaging',
        'Conversation list with unread badges',
        'Send/receive messages (localStorage)',
        'Cross-platform communication (HUSE ↔ Dofracto ↔ Quotify)',
        'Tier-locked feature (unlocks at Gold)',
        'Message persistence across sessions'
      ]
    },
    {
      name: 'Payment Processing',
      status: 'mock',
      description: 'UI complete with simulated transactions',
      icon: CreditCard,
      details: [
        'Quotify credit system: ₹149, ₹399, ₹999 tiers',
        'Credit purchase flow UI complete',
        'Simulated payment confirmations',
        'Credit balance tracking',
        'Transaction history display',
        'No real payment processing'
      ]
    },
    {
      name: 'File Uploads',
      status: 'mock',
      description: 'Upload UI complete, files stored as mock data',
      icon: Upload,
      details: [
        'Project images in AddProjectModal',
        'Marketplace item images',
        'Portfolio files',
        'Profile pictures (emoji avatars)',
        'Resume uploads (filename only)',
        'UI displays properly, no actual file storage'
      ]
    },
    {
      name: 'Cross-Platform Switching',
      status: 'partial',
      description: 'Function exists but no UI switcher',
      icon: RefreshCw,
      details: [
        'switchPlatform() function available in AuthContext',
        'Users can log in to different platforms separately',
        'Each platform maintains independent state',
        'Missing: Unified platform switcher dropdown',
        'Workaround: Navigate via landing page and login separately'
      ]
    }
  ];

  const getStatusConfig = (status: FeatureStatus['status']) => {
    switch (status) {
      case 'working':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          label: 'WORKING'
        };
      case 'mock':
        return {
          icon: Info,
          color: 'text-cyan-400',
          bgColor: 'bg-cyan-500/10',
          borderColor: 'border-cyan-500/30',
          label: 'MOCK (Working as Intended)'
        };
      case 'partial':
        return {
          icon: AlertCircle,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          label: 'PARTIAL'
        };
      default:
        return {
          icon: Circle,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30',
          label: 'NOT IMPLEMENTED'
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            <span>Back to Ecosystem</span>
          </button>

          <h1 className="text-3xl font-bold text-white mb-2">Feature Status Dashboard</h1>
          <p className="text-gray-400">
            Complete overview of all platform features and their implementation status
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-green-400" size={24} />
              <span className="text-green-400 text-2xl font-bold">3</span>
            </div>
            <p className="text-gray-400 text-sm">Fully Working</p>
          </div>

          <div className="p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Info className="text-cyan-400" size={24} />
              <span className="text-cyan-400 text-2xl font-bold">4</span>
            </div>
            <p className="text-gray-400 text-sm">Mock (Intended)</p>
          </div>

          <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="text-yellow-400" size={24} />
              <span className="text-yellow-400 text-2xl font-bold">1</span>
            </div>
            <p className="text-gray-400 text-sm">Partial</p>
          </div>

          <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Circle className="text-purple-400" size={24} />
              <span className="text-purple-400 text-2xl font-bold">9</span>
            </div>
            <p className="text-gray-400 text-sm">Demo Users</p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          {features.map((feature, index) => {
            const config = getStatusConfig(feature.status);
            const StatusIcon = config.icon;
            const FeatureIcon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 bg-white/5 border ${config.borderColor} rounded-2xl`}
              >
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-14 h-14 ${config.bgColor} rounded-xl flex items-center justify-center`}>
                    <FeatureIcon className={config.color} size={28} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-white text-xl font-bold">{feature.name}</h3>
                      <div className={`flex items-center gap-2 px-3 py-1 ${config.bgColor} border ${config.borderColor} rounded-full`}>
                        <StatusIcon className={config.color} size={16} />
                        <span className={`text-xs font-bold ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4">{feature.description}</p>

                    {/* Details */}
                    <div className="space-y-2">
                      {feature.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="flex-shrink-0 text-purple-400 mt-0.5" size={16} />
                          <span className="text-gray-300 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Info className="text-purple-400" size={20} />
            Important Notes
          </h3>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>
              • <strong className="text-white">All features are working as intended</strong> for a frontend-only prototype
            </p>
            <p>
              • <strong className="text-purple-400">MOCK features</strong> use localStorage for persistence and simulate real backend behavior
            </p>
            <p>
              • No real backend, database, or external APIs are connected
            </p>
            <p>
              • This is a fully functional demonstration of the ecosystem's UI/UX and user flows
            </p>
            <p>
              • Demo credentials available at: <button onClick={() => navigate('/demo-credentials')} className="text-cyan-400 hover:text-cyan-300 underline">/demo-credentials</button>
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/demo-credentials')}
            className="p-4 bg-white/5 hover:bg-white/10 border border-purple-500/30 rounded-xl text-left transition-all group"
          >
            <Lock className="text-purple-400 mb-2" size={24} />
            <h4 className="text-white font-bold mb-1 group-hover:text-purple-400 transition-colors">
              Demo Credentials
            </h4>
            <p className="text-gray-400 text-sm">View all demo login credentials</p>
          </button>

          <button
            onClick={() => navigate('/search')}
            className="p-4 bg-white/5 hover:bg-white/10 border border-purple-500/30 rounded-xl text-left transition-all group"
          >
            <Navigation className="text-cyan-400 mb-2" size={24} />
            <h4 className="text-white font-bold mb-1 group-hover:text-cyan-400 transition-colors">
              Search Features
            </h4>
            <p className="text-gray-400 text-sm">Test the search functionality</p>
          </button>

          <button
            onClick={() => navigate('/huse-circle-platform')}
            className="p-4 bg-white/5 hover:bg-white/10 border border-purple-500/30 rounded-xl text-left transition-all group"
          >
            <MessageSquare className="text-pink-400 mb-2" size={24} />
            <h4 className="text-white font-bold mb-1 group-hover:text-pink-400 transition-colors">
              Try Messaging
            </h4>
            <p className="text-gray-400 text-sm">Test the messaging system (Gold tier+)</p>
          </button>
        </div>
      </div>
    </div>
  );
}