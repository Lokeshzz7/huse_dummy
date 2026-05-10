import { motion } from 'motion/react';
import { 
  Trophy, Star, Code, Users, Briefcase, ShoppingBag, 
  Award, GraduationCap, Rocket, Target, Zap, BookOpen,
  MessageSquare, Gift, CheckCircle, TrendingUp, DollarSign,
  Lightbulb, Heart, Handshake, Building2, Presentation,
  GitBranch, FileText, BarChart3, Crown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const studentEarningMethods = [
  {
    category: 'Content & Portfolio',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    methods: [
      { action: 'Posting a project/portfolio piece', rep: '+10 Rep', icon: FileText },
      { action: 'Getting an upvote on your project', rep: '+5 Rep/upvote', icon: Star },
      { action: 'Getting featured in House Feed', rep: '+50 Rep', icon: Award },
      { action: 'Winning a house challenge/hackathon', rep: '+100 Rep', icon: Trophy }
    ]
  },
  {
    category: 'Gigs & Services',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    methods: [
      { action: 'Completing a gig successfully', rep: '+50 Rep', icon: CheckCircle },
      { action: 'Getting a 5-star review on a gig', rep: '+25 Rep', icon: Star },
      { action: 'Client repeat hire bonus', rep: '+30 Rep', icon: Handshake }
    ]
  },
  {
    category: 'Community & Helping',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    methods: [
      { action: 'Helping a peer (verified by peer)', rep: '+15 Rep', icon: Heart },
      { action: 'Mentoring a junior student', rep: '+20 Rep', icon: GraduationCap },
      { action: 'Contributing to house discussions', rep: '+5 Rep', icon: MessageSquare }
    ]
  },
  {
    category: 'Marketplace',
    icon: ShoppingBag,
    color: 'from-orange-500 to-amber-500',
    methods: [
      { action: 'Successful marketplace transaction', rep: '+10 Rep', icon: DollarSign },
      { action: 'Getting positive feedback', rep: '+5 Rep', icon: Star }
    ]
  },
  {
    category: 'Academic & Achievements',
    icon: BookOpen,
    color: 'from-violet-500 to-purple-500',
    methods: [
      { action: 'Uploading verified certificates', rep: '+20 Rep', icon: Award },
      { action: 'Getting recruited through the platform', rep: '+200 Rep', icon: Target }
    ]
  }
];

const contributorEarningMethods = [
  {
    category: 'Startup Building',
    icon: Rocket,
    color: 'from-cyan-500 to-teal-500',
    methods: [
      { action: 'Launching an MVP on the platform', rep: '+500 Rep', icon: Rocket },
      { action: 'Getting user traction milestones', rep: '+100-500 Rep', icon: TrendingUp },
      { action: 'Publishing a case study', rep: '+150 Rep', icon: FileText },
      { action: 'Open-sourcing a project', rep: '+200 Rep', icon: GitBranch }
    ]
  },
  {
    category: 'Quotify Services',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    methods: [
      { action: 'Completing a quote/project', rep: '+100 Rep', icon: CheckCircle },
      { action: 'Exceptional client review (5-star)', rep: '+75 Rep', icon: Star },
      { action: 'Repeat client bonus', rep: '+100 Rep', icon: Handshake },
      { action: 'High-value project completion (₹50K+)', rep: '+250 Rep', icon: DollarSign }
    ]
  },
  {
    category: 'Collaboration & Ecosystem',
    icon: Users,
    color: 'from-blue-500 to-indigo-500',
    methods: [
      { action: 'Collaborating with other Contributors', rep: '+150 Rep', icon: Users },
      { action: 'Hosting a workshop/masterclass', rep: '+200 Rep', icon: Presentation },
      { action: 'Contributing to ecosystem projects', rep: '+100 Rep', icon: GitBranch },
      { action: 'Publishing technical content/tutorials', rep: '+75 Rep', icon: BookOpen }
    ]
  },
  {
    category: 'Support & Mentorship',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    methods: [
      { action: 'Providing contributed capital to other startups', rep: '+500 Rep/₹10K', icon: Gift },
      { action: 'Mentoring HUSE Circle students', rep: '+100 Rep/month', icon: GraduationCap },
      { action: 'Speaking at ecosystem events', rep: '+300 Rep', icon: Presentation }
    ]
  },
  {
    category: 'Business Milestones',
    icon: BarChart3,
    color: 'from-amber-500 to-yellow-500',
    methods: [
      { action: 'Reaching revenue milestones', rep: '+1000 Rep/₹1L ARR', icon: TrendingUp },
      { action: 'Getting user/customer milestones', rep: '+500 Rep/1000 users', icon: Target }
    ]
  }
];

const tierInfo = [
  { name: 'Bronze', range: '0-999 Rep', color: 'from-orange-700 to-orange-600', platform: 'HUSE Circle' },
  { name: 'Silver', range: '1,000-4,999 Rep', color: 'from-gray-400 to-gray-300', platform: 'HUSE Circle' },
  { name: 'Gold', range: '5,000-29,999 Rep', color: 'from-amber-500 to-yellow-500', platform: 'HUSE Circle' },
  { name: 'Platinum', range: '30,000-99,999 Rep', color: 'from-blue-400 to-cyan-400', platform: 'HUSE Circle' },
  { name: 'Contributor', range: '100,000+ Rep OR ₹499/year', color: 'from-purple-500 to-pink-500', platform: 'Dofracto UBH' },
  { name: 'Startup', range: '300,000+ Rep OR Custom', color: 'from-cyan-500 to-teal-500', platform: 'Dofracto Startup' }
];

export function ReputationGuide() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-full px-6 py-2 mb-6">
            <Trophy className="text-amber-400" size={20} />
            <span className="text-purple-400 font-medium">Complete Reputation Guide</span>
          </div>
          <h1 className="text-[48px] md:text-[64px] font-bold text-white mb-4">
            How to <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">Earn Reputation</span>
          </h1>
          <p className="text-gray-400 text-[18px] max-w-3xl mx-auto leading-relaxed">
            Your reputation is your currency in the ecosystem. Here's exactly how Students and Contributors earn rep to unlock new opportunities.
          </p>
        </motion.div>

        {/* Tier System Overview */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center text-[32px] font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">6-Tier Reputation System</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {tierInfo.map((tier, index) => (
              <motion.div
                key={index}
                className="bg-[#111] border border-purple-500/20 rounded-[20px] p-6 hover:border-purple-500/40 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${tier.color} text-white font-bold text-[14px] mb-3`}>
                  {tier.name}
                </div>
                <p className="text-white font-medium text-[16px] mb-2">{tier.range}</p>
                <p className="text-gray-400 text-[13px]">Routes to: <span className="text-purple-400">{tier.platform}</span></p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Students Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <GraduationCap className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-[36px] font-bold text-white">
                Students <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">(HUSE Circle)</span>
              </h2>
              <p className="text-gray-400 text-[16px]">Bronze → Silver → Gold → Platinum Tiers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentEarningMethods.map((category, catIndex) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={catIndex}
                  className="bg-[#111] border border-purple-500/20 rounded-[20px] p-6 hover:border-purple-500/40 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-[15px] bg-gradient-to-r ${category.color} p-0.5`}>
                      <div className="w-full h-full bg-[#111] rounded-[13px] flex items-center justify-center">
                        <CategoryIcon className="text-white" size={20} />
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-[18px]">{category.category}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.methods.map((method, methodIndex) => {
                      const MethodIcon = method.icon;
                      return (
                        <div key={methodIndex} className="space-y-1">
                          <div className="flex items-start gap-2">
                            <MethodIcon className={`text-purple-400 flex-shrink-0 mt-0.5`} size={16} />
                            <p className="text-gray-300 text-[14px] leading-relaxed">{method.action}</p>
                          </div>
                          <div className={`ml-6 inline-block px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white font-bold text-[12px]`}>
                            {method.rep}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Student Key Points */}
          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-[20px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-[18px] mb-4 flex items-center gap-2">
              <Lightbulb className="text-amber-400" size={20} />
              Student Focus Areas
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-[14px]">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span>Learning and skill-building activities</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span>Smaller gigs and helping peers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span>Portfolio building and showcasing work</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span>Community participation and collaboration</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-20">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <Zap className="text-cyan-400" size={24} />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        </div>

        {/* Contributors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
              <Rocket className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-[36px] font-bold text-white">
                Contributors <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">(Dofracto)</span>
              </h2>
              <p className="text-gray-400 text-[16px]">Contributor → Startup Tiers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributorEarningMethods.map((category, catIndex) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={catIndex}
                  className="bg-[#111] border border-cyan-500/20 rounded-[20px] p-6 hover:border-cyan-500/40 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-[15px] bg-gradient-to-r ${category.color} p-0.5`}>
                      <div className="w-full h-full bg-[#111] rounded-[13px] flex items-center justify-center">
                        <CategoryIcon className="text-white" size={20} />
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-[18px]">{category.category}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.methods.map((method, methodIndex) => {
                      const MethodIcon = method.icon;
                      return (
                        <div key={methodIndex} className="space-y-1">
                          <div className="flex items-start gap-2">
                            <MethodIcon className={`text-cyan-400 flex-shrink-0 mt-0.5`} size={16} />
                            <p className="text-gray-300 text-[14px] leading-relaxed">{method.action}</p>
                          </div>
                          <div className={`ml-6 inline-block px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white font-bold text-[12px]`}>
                            {method.rep}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contributor Key Points */}
          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-[20px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-[18px] mb-4 flex items-center gap-2">
              <Crown className="text-cyan-400" size={20} />
              Contributor Focus Areas
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-[14px]">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span>Real startup traction and metrics</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span>Professional client work and services</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span>High-value projects and deliverables</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span>Ecosystem contribution and mentorship</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span>Supporting other builders financially</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span>Achieving business milestones</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-teal-500/10 border border-purple-500/30 rounded-[25px] p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[32px] md:text-[40px] font-bold text-white mb-4">
            Ready to Start <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">Building Rep</span>?
          </h3>
          <p className="text-gray-400 text-[18px] mb-8 max-w-2xl mx-auto">
            The higher your reputation, the more opportunities you unlock. Start earning today!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/huse-circle-loading')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-[15px] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all w-full sm:w-auto font-bold text-[18px]"
            >
              Join as Student
            </button>
            <button 
              onClick={() => navigate('/dofracto/pricing')}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-[15px] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all w-full sm:w-auto font-bold text-[18px]"
            >
              Join as Contributor
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}