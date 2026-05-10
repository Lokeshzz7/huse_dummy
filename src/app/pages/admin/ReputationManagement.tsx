import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, TrendingUp, TrendingDown, Search, Filter,
  Eye, Plus, Minus, AlertTriangle, CheckCircle, History,
  Trophy, Target, Users, Calendar, Download, RefreshCw,
  Zap, BookOpen, Star, Gift, XCircle, MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

export function ReputationManagement() {
  const [activeSection, setActiveSection] = useState<'activity' | 'manual' | 'leaderboard'>('activity');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'challenges' | 'events' | 'endorsements' | 'milestones'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Automatic reputation activity log
  const [reputationActivity, setReputationActivity] = useState([
    { 
      id: 1, 
      user: 'Rahul Kumar', 
      action: 'Challenge Completed', 
      challenge: 'Build a Full-Stack MERN App',
      amount: 1500, 
      type: 'challenge',
      platform: 'HUSE Circle',
      tier: 'Gold',
      date: '5 minutes ago',
      automatic: true
    },
    { 
      id: 2, 
      user: 'Priya Sharma', 
      action: 'Event Participation', 
      challenge: 'Tech Talk: AI in Healthcare',
      amount: 500, 
      type: 'event',
      platform: 'HUSE Circle',
      tier: 'Silver',
      date: '15 minutes ago',
      automatic: true
    },
    { 
      id: 3, 
      user: 'Sneha Reddy', 
      action: 'Recruiter Endorsement', 
      challenge: 'Endorsed by Tech Corp',
      amount: 2000, 
      type: 'endorsement',
      platform: 'HUSE Circle',
      tier: 'Platinum',
      date: '1 hour ago',
      automatic: true
    },
    { 
      id: 4, 
      user: 'Vikram Singh', 
      action: 'Milestone Achieved', 
      challenge: 'Completed 10 Challenges',
      amount: 3000, 
      type: 'milestone',
      platform: 'HUSE Circle',
      tier: 'Platinum',
      date: '2 hours ago',
      automatic: true
    },
    { 
      id: 5, 
      user: 'Arjun Patel', 
      action: 'Challenge Completed', 
      challenge: 'Create a Chrome Extension',
      amount: 1200, 
      type: 'challenge',
      platform: 'HUSE Circle',
      tier: 'Gold',
      date: '3 hours ago',
      automatic: true
    },
    { 
      id: 6, 
      user: 'Neha Gupta', 
      action: 'Project Submission', 
      challenge: 'AI Chatbot Project',
      amount: 1800, 
      type: 'challenge',
      platform: 'HUSE Circle',
      tier: 'Silver',
      date: '5 hours ago',
      automatic: true
    },
    { 
      id: 7, 
      user: 'Amit Sharma', 
      action: 'Manual Adjustment', 
      challenge: 'Exceptional community contribution',
      amount: 500, 
      type: 'manual',
      platform: 'HUSE Circle',
      tier: 'Bronze',
      date: '1 day ago',
      automatic: false
    },
    { 
      id: 8, 
      user: 'Sonia Patel', 
      action: 'Event Winner', 
      challenge: 'Hackathon Winner - First Place',
      amount: 5000, 
      type: 'event',
      platform: 'HUSE Circle',
      tier: 'Platinum',
      date: '2 days ago',
      automatic: true
    },
  ]);

  const topUsers = [
    { rank: 1, name: 'Sneha Patel', reputation: 342000, tier: 'Business Owner', platform: 'Dofracto', growth: '+15K this month' },
    { rank: 2, name: 'Rajesh Kumar', reputation: 156000, tier: 'Business Owner', platform: 'Dofracto', growth: '+8K this month' },
    { rank: 3, name: 'Arjun Gupta', reputation: 89000, tier: 'Contributor', platform: 'HUSE Circle', growth: '+12K this month' },
    { rank: 4, name: 'Neha Sharma', reputation: 45000, tier: 'Contributor', platform: 'HUSE Circle', growth: '+5K this month' },
    { rank: 5, name: 'Vikram Singh', reputation: 28000, tier: 'Contributor', platform: 'HUSE Circle', growth: '+3K this month' },
  ];

  const [manualAdjustment, setManualAdjustment] = useState({
    userId: '',
    amount: '',
    reason: '',
    type: 'add' as 'add' | 'subtract'
  });

  const handleApplyAdjustment = () => {
    if (!manualAdjustment.userId || !manualAdjustment.amount || !manualAdjustment.reason) {
      toast.error('Please fill in all fields!', {
        description: 'User ID, amount, and reason are required for manual adjustments.'
      });
      return;
    }

    const adjustment = {
      id: reputationActivity.length + 1,
      user: manualAdjustment.userId,
      action: manualAdjustment.type === 'add' ? 'Manual Bonus' : 'Manual Penalty',
      challenge: manualAdjustment.reason,
      amount: manualAdjustment.type === 'add' ? +parseInt(manualAdjustment.amount) : -parseInt(manualAdjustment.amount),
      type: 'manual',
      platform: 'Admin',
      tier: 'N/A',
      date: 'Just now',
      automatic: false
    };

    setReputationActivity([adjustment, ...reputationActivity]);

    toast.success(`Manual reputation ${manualAdjustment.type === 'add' ? 'bonus' : 'penalty'} applied!`, {
      description: `${manualAdjustment.type === 'add' ? '+' : '-'}${manualAdjustment.amount} rep to ${manualAdjustment.userId}`
    });

    // Reset form
    setManualAdjustment({
      userId: '',
      amount: '',
      reason: '',
      type: 'add'
    });
  };

  const handleCancelAdjustment = () => {
    setManualAdjustment({
      userId: '',
      amount: '',
      reason: '',
      type: 'add'
    });
    toast.info('Manual adjustment cancelled');
  };

  const handleRefresh = () => {
    toast.success('Activity feed refreshed!', {
      description: 'Showing latest reputation changes'
    });
  };

  const handleExport = () => {
    toast.success('Exporting reputation data...', {
      description: 'CSV file will download shortly'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'challenge':
        return <Target className="text-purple-400" size={20} />;
      case 'event':
        return <Calendar className="text-blue-400" size={20} />;
      case 'endorsement':
        return <Star className="text-yellow-400" size={20} />;
      case 'milestone':
        return <Trophy className="text-amber-400" size={20} />;
      case 'manual':
        return <AlertTriangle className="text-orange-400" size={20} />;
      default:
        return <Award className="text-gray-400" size={20} />;
    }
  };

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'challenge':
        return 'bg-purple-500/20 border-purple-500/30';
      case 'event':
        return 'bg-blue-500/20 border-blue-500/30';
      case 'endorsement':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'milestone':
        return 'bg-amber-500/20 border-amber-500/30';
      case 'manual':
        return 'bg-orange-500/20 border-orange-500/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  const filteredActivities = reputationActivity
    .filter((activity) => {
      if (filterType === 'all') return true;
      if (filterType === 'challenges') return activity.type === 'challenge';
      if (filterType === 'events') return activity.type === 'event';
      if (filterType === 'endorsements') return activity.type === 'endorsement';
      if (filterType === 'milestones') return activity.type === 'milestone';
      return true;
    })
    .filter((activity) =>
      activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.challenge.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'activity', label: 'Automatic Activity', icon: Zap, badge: reputationActivity.filter(a => a.automatic).length },
          { id: 'manual', label: 'Manual Adjustments', icon: AlertTriangle },
          { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <section.icon size={16} />
            {section.label}
            {section.badge && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeSection === section.id ? 'bg-white/20' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {section.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Automatic Activity Feed */}
      {activeSection === 'activity' && (
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="text-white" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">Automatic Reputation System</h4>
                <p className="text-sm text-gray-400">
                  Students automatically earn reputation when they complete challenges, participate in events, receive endorsements, and achieve milestones. This is a real-time log of all reputation changes across the ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Live Reputation Activity</h3>
                <p className="text-sm text-gray-400">Real-time feed of all reputation changes</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleRefresh}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={18} className="text-gray-400" />
                </button>
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm text-gray-400"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by user or activity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 border rounded-lg transition-colors ${
                  showFilters ? 'bg-amber-500/20 border-amber-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <Filter size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Filter Tags */}
            {showFilters && (
              <div className="mb-6 flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Activities', icon: Zap },
                  { id: 'challenges', label: 'Challenges', icon: Target },
                  { id: 'events', label: 'Events', icon: Calendar },
                  { id: 'endorsements', label: 'Endorsements', icon: Star },
                  { id: 'milestones', label: 'Milestones', icon: Trophy },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setFilterType(filter.id as any)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filterType === filter.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <filter.icon size={14} />
                    {filter.label}
                  </button>
                ))}
              </div>
            )}

            {/* Activity List */}
            <div className="space-y-3">
              {filteredActivities.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-gray-600" size={32} />
                  </div>
                  <p className="text-gray-400">No activities found</p>
                  <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search query</p>
                </div>
              ) : (
                filteredActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border rounded-xl p-4 ${getActivityBgColor(activity.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'challenge' ? 'bg-purple-500/20' :
                          activity.type === 'event' ? 'bg-blue-500/20' :
                          activity.type === 'endorsement' ? 'bg-yellow-500/20' :
                          activity.type === 'milestone' ? 'bg-amber-500/20' :
                          'bg-orange-500/20'
                        }`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-semibold">{activity.user}</h4>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              activity.amount > 0 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {activity.amount > 0 ? '+' : ''}{activity.amount} Rep
                            </span>
                            {!activity.automatic && (
                              <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded text-xs font-semibold">
                                MANUAL
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{activity.action}</p>
                          <div className="mt-2 p-2 bg-white/5 rounded border border-white/10">
                            <p className="text-xs text-gray-400">
                              {activity.challenge}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">{activity.platform}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              activity.tier === 'Business Owner' ? 'bg-amber-500/20 text-amber-400' :
                              activity.tier === 'Contributor' ? 'bg-purple-500/20 text-purple-400' :
                              activity.tier === 'Platinum' ? 'bg-blue-500/20 text-blue-400' :
                              activity.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                              activity.tier === 'Silver' ? 'bg-gray-400/20 text-gray-400' :
                              'bg-orange-600/20 text-orange-400'
                            }`}>
                              {activity.tier}
                            </span>
                            <span className="text-xs text-gray-500">{activity.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {activity.automatic && (
                          <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <CheckCircle className="text-green-400" size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manual Adjustments */}
      {activeSection === 'manual' && (
        <div className="space-y-6">
          {/* Warning Banner */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="text-white" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">Manual Adjustments - Use with Caution</h4>
                <p className="text-sm text-gray-400">
                  Manual adjustments should ONLY be used for special cases like corrections, bonuses for exceptional contributions, or penalties for violations. The reputation system is designed to be automatic. All manual adjustments are permanently logged and auditable.
                </p>
              </div>
            </div>
          </div>

          {/* Adjustment Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <Award className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Manual Reputation Adjustment</h3>
                <p className="text-sm text-gray-400">Add or subtract reputation with justification</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">User Email / ID *</label>
                <input
                  type="text"
                  placeholder="user@example.com"
                  value={manualAdjustment.userId}
                  onChange={(e) => setManualAdjustment({ ...manualAdjustment, userId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Adjustment Type *</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setManualAdjustment({ ...manualAdjustment, type: 'add' })}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      manualAdjustment.type === 'add'
                        ? 'bg-green-500/20 border-2 border-green-500/30 text-green-400'
                        : 'bg-white/5 border border-white/10 text-gray-400'
                    }`}
                  >
                    <Plus size={16} />
                    Add Bonus
                  </button>
                  <button
                    onClick={() => setManualAdjustment({ ...manualAdjustment, type: 'subtract' })}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      manualAdjustment.type === 'subtract'
                        ? 'bg-red-500/20 border-2 border-red-500/30 text-red-400'
                        : 'bg-white/5 border border-white/10 text-gray-400'
                    }`}
                  >
                    <Minus size={16} />
                    Subtract Penalty
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Amount *</label>
                <input
                  type="number"
                  placeholder="500"
                  value={manualAdjustment.amount}
                  onChange={(e) => setManualAdjustment({ ...manualAdjustment, amount: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Justification (Required) *</label>
                <input
                  type="text"
                  placeholder="e.g., Exceptional community contribution"
                  value={manualAdjustment.reason}
                  onChange={(e) => setManualAdjustment({ ...manualAdjustment, reason: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleApplyAdjustment}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
              >
                <CheckCircle size={18} />
                Apply Manual Adjustment
              </button>
              <button
                onClick={handleCancelAdjustment}
                className="px-6 py-2.5 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all font-medium"
              >
                Cancel
              </button>
              <div className="ml-auto flex items-center gap-2 text-yellow-400 text-sm">
                <AlertTriangle size={16} />
                <span>All adjustments are permanently logged</span>
              </div>
            </div>
          </div>

          {/* Recent Manual Adjustments */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Recent Manual Adjustments</h3>
                <p className="text-sm text-gray-400">History of all manual reputation changes</p>
              </div>
            </div>

            <div className="space-y-3">
              {reputationActivity
                .filter((activity) => !activity.automatic)
                .map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                          <AlertTriangle className="text-orange-400" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-semibold">{activity.user}</h4>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              activity.amount > 0 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {activity.amount > 0 ? '+' : ''}{activity.amount} Rep
                            </span>
                            <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded text-xs font-semibold">
                              MANUAL
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{activity.action}</p>
                          <div className="mt-2 p-2 bg-white/5 rounded border border-white/10">
                            <p className="text-xs text-gray-400">
                              <strong>Justification:</strong> {activity.challenge}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">By: superadmin@ecosystem.com</span>
                            <span className="text-xs text-gray-500">{activity.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              {reputationActivity.filter((activity) => !activity.automatic).length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto text-green-400 mb-2" size={32} />
                  <p className="text-gray-400">No manual adjustments yet</p>
                  <p className="text-sm text-gray-500 mt-1">The system is running automatically as intended</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {activeSection === 'leaderboard' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Reputation Leaderboard</h3>
              <p className="text-sm text-gray-400">Top users across all platforms</p>
            </div>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm text-gray-400"
            >
              <Download size={16} />
              Export
            </button>
          </div>

          <div className="space-y-2">
            {topUsers.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border transition-all ${
                  user.rank === 1 
                    ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30' 
                    : user.rank === 2 
                    ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30'
                    : user.rank === 3
                    ? 'bg-gradient-to-r from-orange-600/20 to-orange-700/20 border-orange-600/30'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    user.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white' :
                    user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                    user.rank === 3 ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' :
                    'bg-white/10 text-gray-400'
                  }`}>
                    #{user.rank}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      {user.name}
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        user.tier === 'Business Owner' ? 'bg-amber-500/20 text-amber-400' :
                        user.tier === 'Contributor' ? 'bg-purple-500/20 text-purple-400' :
                        user.tier === 'Platinum' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {user.tier}
                      </span>
                    </h4>
                    <p className="text-sm text-gray-400">{user.platform}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{user.reputation.toLocaleString()}</p>
                    <p className="text-xs text-green-400 flex items-center gap-1 justify-end">
                      <TrendingUp size={12} />
                      {user.growth}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
