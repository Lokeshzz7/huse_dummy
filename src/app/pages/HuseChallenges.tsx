import { motion } from 'motion/react';
import { 
  Trophy, Star, Target, Zap, CheckCircle, Lock, 
  Flame, Calendar, Clock, Award, TrendingUp, 
  Code, Palette, PenTool, Lightbulb, Users,
  Upload, MessageSquare, Heart, Briefcase, 
  Mail, UserPlus, Eye, BookOpen, ArrowLeft,
  Crown, Gift, Sparkles, Medal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

interface Challenge {
  id: string;
  title: string;
  description: string;
  rep: number;
  icon: any;
  progress?: number;
  total?: number;
  completed?: boolean;
  locked?: boolean;
  badge?: string;
  action?: () => void;
}

const onboardingChallenges: Challenge[] = [
  {
    id: 'complete-profile',
    title: 'Complete Your Profile',
    description: 'Add profile picture, bio, skills, and college info',
    rep: 100,
    icon: UserPlus,
    progress: 3,
    total: 4,
    completed: false
  },
  {
    id: 'first-project',
    title: 'Upload Your First Project',
    description: 'Showcase your work to the Proof Portfolio',
    rep: 50,
    icon: Upload,
    progress: 0,
    total: 1,
    completed: false
  },
  {
    id: 'join-house',
    title: 'Join Your First House',
    description: 'Connect with students who share your interests',
    rep: 25,
    icon: Users,
    progress: 0,
    total: 1,
    completed: false
  },
  {
    id: 'introduce-yourself',
    title: 'Introduce Yourself',
    description: 'Post an introduction in the community feed',
    rep: 25,
    icon: MessageSquare,
    progress: 0,
    total: 1,
    completed: false
  },
  {
    id: 'verify-email',
    title: 'Verify College Email',
    description: 'Confirm your student status with .edu email',
    rep: 50,
    icon: Mail,
    progress: 1,
    total: 1,
    completed: true,
    badge: 'Verified'
  },
  {
    id: 'connect-students',
    title: 'Connect with 5 Students',
    description: 'Build your network and make connections',
    rep: 50,
    icon: Users,
    progress: 2,
    total: 5,
    completed: false
  }
];

const dailyChallenges: Challenge[] = [
  {
    id: 'browse-feed',
    title: 'Browse House Feed',
    description: 'Spend 5 minutes exploring community posts',
    rep: 5,
    icon: Eye,
    progress: 3,
    total: 5,
    completed: false
  },
  {
    id: 'upvote-projects',
    title: 'Upvote 3 Projects',
    description: 'Support your peers by upvoting their work',
    rep: 10,
    icon: Star,
    progress: 1,
    total: 3,
    completed: false
  },
  {
    id: 'comment-posts',
    title: 'Comment on 2 Posts',
    description: 'Engage with the community through comments',
    rep: 10,
    icon: MessageSquare,
    progress: 0,
    total: 2,
    completed: false
  },
  {
    id: 'check-opportunities',
    title: 'Check Opportunity Feed',
    description: 'Explore today\'s gigs and opportunities',
    rep: 5,
    icon: Briefcase,
    progress: 1,
    total: 1,
    completed: true
  }
];

const weeklyChallenges: Challenge[] = [
  {
    id: 'post-project',
    title: 'Post a New Project',
    description: 'Share your latest work with the community',
    rep: 100,
    icon: Upload,
    progress: 0,
    total: 1,
    completed: false
  },
  {
    id: 'complete-gig',
    title: 'Complete a Gig',
    description: 'Finish a gig from the marketplace',
    rep: 150,
    icon: CheckCircle,
    progress: 0,
    total: 1,
    completed: false
  },
  {
    id: 'help-peers',
    title: 'Help 3 Peers',
    description: 'Provide verified help to fellow students',
    rep: 75,
    icon: Heart,
    progress: 1,
    total: 3,
    completed: false
  },
  {
    id: 'attend-event',
    title: 'Attend a House Event',
    description: 'Join a workshop or community event',
    rep: 100,
    icon: Calendar,
    progress: 0,
    total: 1,
    completed: false
  },
  {
    id: 'get-upvotes',
    title: 'Get 20 Upvotes',
    description: 'Receive 20 upvotes on your content',
    rep: 50,
    icon: TrendingUp,
    progress: 8,
    total: 20,
    completed: false
  }
];

const skillChallenges: Challenge[] = [
  {
    id: 'code-warrior',
    title: 'Code Warrior',
    description: 'Complete 5 coding challenges or upload 5 code projects',
    rep: 250,
    icon: Code,
    progress: 2,
    total: 5,
    completed: false,
    badge: 'Code Warrior'
  },
  {
    id: 'designer-path',
    title: 'Designer\'s Path',
    description: 'Upload 3 design projects (UI/UX, Graphics, etc.)',
    rep: 200,
    icon: Palette,
    progress: 0,
    total: 3,
    completed: false,
    badge: 'Master Designer'
  },
  {
    id: 'content-creator',
    title: 'Content Creator',
    description: 'Write 2 blog posts or tutorials',
    rep: 150,
    icon: PenTool,
    progress: 0,
    total: 2,
    completed: false,
    badge: 'Content King'
  },
  {
    id: 'entrepreneur',
    title: 'Startup Visionary',
    description: 'Pitch a startup idea in the community',
    rep: 100,
    icon: Lightbulb,
    progress: 0,
    total: 1,
    completed: false,
    badge: 'Visionary'
  }
];

const verificationChallenges: Challenge[] = [
  {
    id: 'get-peer-reviewed',
    title: 'Get Peer Reviewed',
    description: 'Earn your first Peer Review badge on a project',
    rep: 200,
    icon: Users,
    progress: 0,
    total: 1,
    completed: false,
    badge: 'Peer Reviewed'
  },
  {
    id: 'get-client-rated',
    title: 'Get Client Rated',
    description: 'Complete a gig and earn a Client Rating badge',
    rep: 300,
    icon: Briefcase,
    progress: 0,
    total: 1,
    completed: false,
    badge: 'Client Rated'
  },
  {
    id: 'recruiter-endorsed',
    title: 'Recruiter Endorsed',
    description: 'Get endorsed by a recruiter on the platform',
    rep: 500,
    icon: Award,
    progress: 0,
    total: 1,
    completed: false,
    locked: true,
    badge: 'Recruiter Endorsed'
  },
  {
    id: 'mentor-confirmed',
    title: 'Mentor Confirmed',
    description: 'Get your project confirmed by a mentor',
    rep: 250,
    icon: BookOpen,
    progress: 0,
    total: 1,
    completed: false,
    badge: 'Mentor Confirmed'
  },
  {
    id: 'all-five-badges',
    title: 'Full Verification',
    description: 'Earn all 5 verification badges on a single project',
    rep: 1000,
    icon: Crown,
    progress: 0,
    total: 5,
    completed: false,
    locked: true,
    badge: 'Fully Verified'
  }
];

const milestoneChallenges: Challenge[] = [
  {
    id: 'reach-silver',
    title: 'Reach Silver Tier',
    description: 'Accumulate 500 reputation points to unlock Silver benefits',
    rep: 100,
    icon: Medal,
    progress: 342,
    total: 500,
    completed: false,
    badge: 'Silver Badge'
  },
  {
    id: 'reach-gold',
    title: 'Reach Gold Tier',
    description: 'Accumulate 2,000 reputation points to unlock Gold benefits',
    rep: 250,
    icon: Crown,
    progress: 342,
    total: 2000,
    completed: false,
    locked: true,
    badge: 'Gold Badge'
  },
  {
    id: 'reach-platinum',
    title: 'Reach Platinum Tier',
    description: 'Accumulate 8,000 reputation points to unlock Platinum benefits',
    rep: 500,
    icon: Sparkles,
    progress: 342,
    total: 8000,
    completed: false,
    locked: true,
    badge: 'Platinum Badge'
  },
  {
    id: 'profile-views',
    title: '100 Profile Views',
    description: 'Get 100 views on your profile',
    rep: 50,
    icon: Eye,
    progress: 67,
    total: 100,
    completed: false
  },
  {
    id: 'earn-money',
    title: 'Earn ₹5,000 from Gigs',
    description: 'Complete gigs worth ₹5,000 total',
    rep: 500,
    icon: Gift,
    progress: 1200,
    total: 5000,
    completed: false
  },
  {
    id: 'get-recruited',
    title: 'Get Recruited',
    description: 'Get hired through the platform',
    rep: 1000,
    icon: Trophy,
    progress: 0,
    total: 1,
    completed: false,
    locked: true,
    badge: 'Recruited'
  }
];

const streakChallenges: Challenge[] = [
  {
    id: 'week-streak',
    title: '7-Day Login Streak',
    description: 'Log in for 7 consecutive days',
    rep: 50,
    icon: Flame,
    progress: 4,
    total: 7,
    completed: false
  },
  {
    id: 'month-streak',
    title: '30-Day Active Streak',
    description: 'Stay active for 30 consecutive days',
    rep: 200,
    icon: Flame,
    progress: 4,
    total: 30,
    completed: false,
    locked: true
  },
  {
    id: 'weekly-posts',
    title: 'Monthly Contributor',
    description: 'Post every week for a month (4 weeks)',
    rep: 300,
    icon: Calendar,
    progress: 1,
    total: 4,
    completed: false
  }
];

interface ChallengeCategoryProps {
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  challenges: Challenge[];
  badgeColor: string;
}

function ChallengeCategory({ title, subtitle, icon: Icon, color, challenges, badgeColor }: ChallengeCategoryProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-[15px] bg-gradient-to-r ${color} flex items-center justify-center`}>
          <Icon className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-white font-bold text-[24px]">{title}</h2>
          <p className="text-gray-400 text-[14px]">{subtitle}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {challenges.map((challenge, index) => {
          const ChallengeIcon = challenge.icon;
          const progressPercent = challenge.total ? (challenge.progress! / challenge.total) * 100 : 0;
          
          return (
            <motion.div
              key={challenge.id}
              className={`relative bg-[#1a1a1a]/80 backdrop-blur-md border rounded-[20px] p-6 transition-all ${
                challenge.completed 
                  ? 'border-green-500/40 bg-green-500/5' 
                  : challenge.locked 
                    ? 'border-gray-700/40 opacity-60' 
                    : 'border-purple-500/20 hover:border-purple-500/40'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {challenge.locked && (
                <div className="absolute top-4 right-4">
                  <Lock className="text-gray-500" size={20} />
                </div>
              )}

              {challenge.completed && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="text-green-400" size={24} />
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-[12px] bg-gradient-to-r ${color} p-0.5 flex-shrink-0`}>
                  <div className="w-full h-full bg-[#1a1a1a] rounded-[10px] flex items-center justify-center">
                    <ChallengeIcon className="text-white" size={20} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-[16px]">{challenge.title}</h3>
                    {challenge.badge && (
                      <span className={`text-[10px] px-2 py-0.5 bg-gradient-to-r ${badgeColor} rounded-full font-bold text-white`}>
                        {challenge.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-[13px] leading-relaxed">{challenge.description}</p>
                </div>
              </div>

              {/* Progress Bar */}
              {challenge.total && challenge.total > 1 && !challenge.completed && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-[12px]">
                      Progress: {challenge.progress}/{challenge.total}
                    </span>
                    <span className="text-purple-400 text-[12px] font-bold">
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </div>
                </div>
              )}

              {/* Reward & CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-amber-400" size={16} />
                  <span className="text-amber-400 font-bold text-[14px]">+{challenge.rep} Rep</span>
                </div>
                {!challenge.completed && !challenge.locked && (
                  <button 
                    onClick={challenge.action}
                    className={`px-4 py-2 bg-gradient-to-r ${color} text-white rounded-[10px] text-[13px] font-bold hover:shadow-lg transition-all`}
                  >
                    Start Challenge
                  </button>
                )}
                {challenge.completed && (
                  <span className="text-green-400 text-[13px] font-bold">Completed ✓</span>
                )}
                {challenge.locked && (
                  <span className="text-gray-500 text-[13px] font-bold">Locked</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function HuseChallenges() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'completed'>('all');

  // Challenge action handlers
  const handleChallengeAction = (challengeId: string) => {
    switch (challengeId) {
      // Onboarding Challenges
      case 'complete-profile':
        toast.success('Opening profile editor...', {
          description: 'Complete all fields to earn +100 Rep!'
        });
        // In a real app, this would open a profile edit modal or navigate to profile settings
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      case 'first-project':
        toast.success('Opening project upload...', {
          description: 'Upload your first project to earn +50 Rep!'
        });
        // This would open the AddProjectModal
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      case 'join-house':
        toast.success('Redirecting to House selection...', {
          description: 'Join your college house to earn +25 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      case 'introduce-yourself':
        toast.success('Opening community feed...', {
          description: 'Post an introduction to earn +25 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      case 'connect-students':
        toast.success('Opening leaderboard...', {
          description: 'Connect with 5 students to earn +50 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      // Daily Challenges
      case 'browse-feed':
        toast.success('Opening House Feed...', {
          description: 'Browse for 5 minutes to earn +5 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;
      
      case 'upvote-projects':
        toast.success('Opening Portfolio section...', {
          description: 'Upvote 3 projects to earn +10 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;
      
      case 'comment-posts':
        toast.success('Opening House Feed...', {
          description: 'Comment on 2 posts to earn +10 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      // Weekly Challenges
      case 'post-project':
        toast.success('Opening project upload...', {
          description: 'Share your work to earn +100 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;
      
      case 'complete-gig':
        toast.success('Opening Gigs Board...', {
          description: 'Complete a gig to earn +150 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;
      
      case 'help-peers':
        toast.success('Opening House Feed...', {
          description: 'Help 3 peers to earn +75 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;
      
      case 'attend-event':
        toast.info('Events calendar coming soon!', {
          description: 'Check back later for upcoming workshops and events.'
        });
        break;
      
      case 'get-upvotes':
        toast.info('Keep sharing quality content!', {
          description: 'You need 12 more upvotes to complete this challenge.'
        });
        break;

      // Skill-Based Challenges
      case 'code-warrior':
        toast.success('Opening Portfolio section...', {
          description: 'Upload 3 more code projects to earn +250 Rep & Code Warrior badge!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      case 'designer-path':
        toast.success('Opening Portfolio section...', {
          description: 'Upload 3 design projects to earn +200 Rep & Master Designer badge!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      case 'content-creator':
        toast.success('Opening House Feed...', {
          description: 'Write 2 blog posts/tutorials to earn +150 Rep & Content King badge!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;
      
      case 'entrepreneur':
        toast.success('Opening House Feed...', {
          description: 'Share your startup idea to earn +100 Rep & Visionary badge!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      // Verification Challenges
      case 'get-peer-reviewed':
        toast.success('Opening Proof Portfolio...', {
          description: 'Request peer review on your project to earn +200 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      case 'get-client-rated':
        toast.success('Opening Gigs Board...', {
          description: 'Complete a gig and get rated to earn +300 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      case 'recruiter-endorsed':
        toast.info('Keep building your portfolio!', {
          description: 'Recruiters can endorse your verified projects.'
        });
        break;

      case 'mentor-confirmed':
        toast.success('Opening Proof Portfolio...', {
          description: 'Request mentor confirmation to earn +250 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      case 'all-five-badges':
        toast.info('Ultimate achievement!', {
          description: 'Earn all 5 verification badges on one project for +1000 Rep!'
        });
        break;

      // Milestone Challenges
      case 'reach-silver':
        toast.info('Keep completing challenges!', {
          description: 'You need 158 more Rep to reach Silver tier (500 Rep total).'
        });
        navigate('/reputation-guide');
        break;

      case 'reach-gold':
        toast.info('Build your reputation!', {
          description: 'You need 1,658 more Rep to reach Gold tier (2,000 Rep total).'
        });
        navigate('/reputation-guide');
        break;

      case 'reach-platinum':
        toast.info('Keep pushing forward!', {
          description: 'You need 7,658 more Rep to reach Platinum tier (8,000 Rep total).'
        });
        navigate('/reputation-guide');
        break;
      
      case 'profile-views':
        toast.info('Boost your profile visibility!', {
          description: 'Share your profile and engage with the community. 33 more views to go!'
        });
        break;
      
      case 'earn-money':
        toast.success('Opening Gigs Board...', {
          description: 'Complete more gigs to reach ₹5,000 total earnings!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      // Streak Challenges
      case 'week-streak':
        toast.success('Great job! 🔥', {
          description: 'Keep logging in daily! 3 more days to complete this streak.'
        });
        break;
      
      case 'weekly-posts':
        toast.success('Opening House Feed...', {
          description: 'Post weekly content to earn +300 Rep!'
        });
        setTimeout(() => navigate('/huse-circle-platform'), 1500);
        break;

      default:
        toast.info('Challenge starting soon!', {
          description: 'This challenge will be available shortly.'
        });
    }
  };

  // Add action handlers to challenges
  const onboardingChallengesWithActions = onboardingChallenges.map(c => ({
    ...c,
    action: () => handleChallengeAction(c.id)
  }));

  const dailyChallengesWithActions = dailyChallenges.map(c => ({
    ...c,
    action: () => handleChallengeAction(c.id)
  }));

  const weeklyChallengesWithActions = weeklyChallenges.map(c => ({
    ...c,
    action: () => handleChallengeAction(c.id)
  }));

  const skillChallengesWithActions = skillChallenges.map(c => ({
    ...c,
    action: () => handleChallengeAction(c.id)
  }));

  const milestoneChallengesWithActions = milestoneChallenges.map(c => ({
    ...c,
    action: () => handleChallengeAction(c.id)
  }));

  const streakChallengesWithActions = streakChallenges.map(c => ({
    ...c,
    action: () => handleChallengeAction(c.id)
  }));

  const verificationChallengesWithActions = verificationChallenges.map(c => ({
    ...c,
    action: () => handleChallengeAction(c.id)
  }));

  // Calculate total stats
  const allChallenges = [
    ...onboardingChallenges,
    ...dailyChallenges,
    ...weeklyChallenges,
    ...skillChallenges,
    ...milestoneChallenges,
    ...streakChallenges
  ];
  
  const completedCount = allChallenges.filter(c => c.completed).length;
  const totalRep = allChallenges.reduce((sum, c) => c.completed ? sum + c.rep : sum, 0);
  const availableCount = allChallenges.filter(c => !c.completed && !c.locked).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-purple-500/20 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/huse-circle-platform')}
                className="w-10 h-10 rounded-[12px] bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 flex items-center justify-center transition-all"
              >
                <ArrowLeft className="text-purple-400" size={20} />
              </button>
              <div>
                <h1 className="text-[24px] font-bold text-white">Challenges</h1>
                <p className="text-gray-400 text-[14px]">Complete challenges to earn reputation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <motion.div
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-[20px] p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="text-amber-400" size={24} />
              <span className="text-gray-400 text-[14px]">Total Rep Earned</span>
            </div>
            <p className="text-[32px] font-bold text-white">{totalRep}</p>
            <p className="text-purple-400 text-[12px]">From {completedCount} completed challenges</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-[20px] p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Target className="text-green-400" size={24} />
              <span className="text-gray-400 text-[14px]">Available Challenges</span>
            </div>
            <p className="text-[32px] font-bold text-white">{availableCount}</p>
            <p className="text-green-400 text-[12px]">Ready to complete</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-[20px] p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Flame className="text-orange-400" size={24} />
              <span className="text-gray-400 text-[14px]">Current Streak</span>
            </div>
            <p className="text-[32px] font-bold text-white">4 Days</p>
            <p className="text-cyan-400 text-[12px]">Keep going! 🔥</p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-6 py-3 rounded-[12px] font-medium text-[14px] transition-all whitespace-nowrap ${
              selectedTab === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-purple-500/20'
            }`}
          >
            All Challenges
          </button>
          <button
            onClick={() => setSelectedTab('active')}
            className={`px-6 py-3 rounded-[12px] font-medium text-[14px] transition-all whitespace-nowrap ${
              selectedTab === 'active'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-purple-500/20'
            }`}
          >
            Active ({availableCount})
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`px-6 py-3 rounded-[12px] font-medium text-[14px] transition-all whitespace-nowrap ${
              selectedTab === 'completed'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-purple-500/20'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Challenge Categories */}
        <ChallengeCategory
          title="🚀 Onboarding Challenges"
          subtitle="Get started and learn the platform"
          icon={Target}
          color="from-purple-500 to-pink-500"
          badgeColor="from-purple-500 to-pink-500"
          challenges={onboardingChallengesWithActions}
        />

        <ChallengeCategory
          title="📅 Daily Challenges"
          subtitle="Reset every 24 hours"
          icon={Clock}
          color="from-blue-500 to-cyan-500"
          badgeColor="from-blue-500 to-cyan-500"
          challenges={dailyChallengesWithActions}
        />

        <ChallengeCategory
          title="📆 Weekly Challenges"
          subtitle="Bigger rewards, reset every week"
          icon={Calendar}
          color="from-green-500 to-emerald-500"
          badgeColor="from-green-500 to-emerald-500"
          challenges={weeklyChallengesWithActions}
        />

        <ChallengeCategory
          title="🎯 Skill-Based Challenges"
          subtitle="Master your craft and earn badges"
          icon={Award}
          color="from-orange-500 to-amber-500"
          badgeColor="from-orange-500 to-amber-500"
          challenges={skillChallengesWithActions}
        />

        <ChallengeCategory
          title="✅ Verification Challenges"
          subtitle="Earn badges through external validation"
          icon={CheckCircle}
          color="from-blue-500 to-purple-500"
          badgeColor="from-blue-500 to-purple-500"
          challenges={verificationChallengesWithActions}
        />

        <ChallengeCategory
          title="🏆 Milestone Challenges"
          subtitle="Long-term goals with massive rewards"
          icon={Crown}
          color="from-amber-500 to-yellow-500"
          badgeColor="from-amber-500 to-yellow-500"
          challenges={milestoneChallengesWithActions}
        />

        <ChallengeCategory
          title="🔥 Streak Challenges"
          subtitle="Build consistency and stay active"
          icon={Flame}
          color="from-red-500 to-orange-500"
          badgeColor="from-red-500 to-orange-500"
          challenges={streakChallengesWithActions}
        />

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-purple-500/30 rounded-[25px] p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Trophy className="text-amber-400 mx-auto mb-4" size={48} />
          <h3 className="text-[28px] font-bold text-white mb-3">
            Keep Building Your <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Reputation</span>!
          </h3>
          <p className="text-gray-400 text-[16px] mb-6 max-w-2xl mx-auto">
            Every challenge you complete brings you closer to unlocking new tiers and opportunities. Start with the easy ones!
          </p>
          <button
            onClick={() => navigate('/reputation-guide')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-[15px] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all font-bold text-[16px]"
          >
            View Full Reputation Guide
          </button>
        </motion.div>
      </div>
    </div>
  );
}