import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp, TrendingDown, Users, Building2, GraduationCap,
  DollarSign, Activity, Clock, Award, Target, Zap, Eye,
  Heart, MessageSquare, Share2, Download, Calendar,
  BarChart3, PieChart, LineChart as LineChartIcon, Loader2, RefreshCw
} from 'lucide-react';
import { adminAction } from '../../../lib/api';
import { toast } from 'sonner';

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [analyticsData, setAnalyticsData] = useState<Record<string, any> | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const data = await adminAction<Record<string, any>>({ action: 'get_analytics' });
      setAnalyticsData(data);
    } catch (e: any) {
      // silently fall back to mock data
      console.warn('[Analytics] Could not fetch real analytics:', e.message);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => { fetchAnalytics(); }, []);

  const overviewStats = [
    {
      label: 'Total Revenue',
      value: '₹12.4L',
      change: '+24.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Active Users',
      value: '10,234',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Total Contributions',
      value: '₹8.9L',
      change: '+18.7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Conversion Rate',
      value: '3.42%',
      change: '-2.1%',
      trend: 'down',
      icon: Target,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const platformStats = [
    {
      name: 'Dofracto',
      icon: Building2,
      users: 4567,
      growth: '+15.2%',
      revenue: '₹5.8L',
      engagement: '72%',
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'from-cyan-500/10 to-teal-500/10',
      borderColor: 'border-cyan-500/20'
    },
    {
      name: 'HUSE Circle',
      icon: GraduationCap,
      users: 3890,
      growth: '+22.8%',
      revenue: '₹3.2L',
      engagement: '85%',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      name: 'Quotify',
      icon: Award,
      users: 1777,
      growth: '+8.3%',
      revenue: '₹3.4L',
      engagement: '68%',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-500/10 to-orange-500/10',
      borderColor: 'border-amber-500/20'
    }
  ];

  const recentActivity = [
    { event: 'New Business Registration', platform: 'Dofracto', count: 12, time: 'Today' },
    { event: 'Student Projects Submitted', platform: 'HUSE Circle', count: 45, time: 'Today' },
    { event: 'Quotes Matched', platform: 'Quotify', count: 23, time: 'Today' },
    { event: 'Contributions Made', platform: 'Dofracto', count: 67, time: 'This week' },
    { event: 'Alumni Graduated', platform: 'HUSE Circle', count: 8, time: 'This week' }
  ];

  const topStartups = [
    { name: 'EcoTech Solutions', contributions: '₹2.4L', contributors: 145, growth: '+45%' },
    { name: 'HealthTrack Pro', contributions: '₹1.8L', contributors: 98, growth: '+32%' },
    { name: 'TravelMate AI', contributions: '₹1.2L', contributors: 87, growth: '+28%' },
    { name: 'SmartHome Innovations', contributions: '₹0.9L', contributors: 62, growth: '+18%' },
    { name: 'PetCare Plus', contributions: '₹0.7L', contributors: 45, growth: '+15%' }
  ];

  const engagementData = [
    { metric: 'Page Views', value: '234,567', change: '+12.5%' },
    { metric: 'Session Duration', value: '8m 32s', change: '+5.2%' },
    { metric: 'Bounce Rate', value: '32.4%', change: '-3.1%' },
    { metric: 'Return Visitors', value: '45.6%', change: '+8.7%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">Track performance across all platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button
            onClick={fetchAnalytics}
            disabled={analyticsLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 transition-all disabled:opacity-50"
            title="Refresh analytics from backend"
          >
            {analyticsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            <span className="text-sm font-medium">{analyticsData ? 'Refresh' : 'Load'}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
            <Download className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">Export Report</span>
          </button>
        </div>
      </div>

      {/* Live analytics snapshot */}
      {analyticsData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/5 border border-green-500/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Live from backend</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(analyticsData).slice(0, 8).map(([key, val]) => (
              <div key={key} className="bg-white/5 rounded-lg p-3">
                <p className="text-gray-400 text-xs capitalize">{key.replace(/_/g, ' ')}</p>
                <p className="text-white font-bold text-lg">{String(val)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity blur-xl rounded-2xl`} />
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Platform Performance */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Platform Performance</h3>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50"
          >
            <option value="All">All Platforms</option>
            <option value="Dofracto">Dofracto</option>
            <option value="HUSE Circle">HUSE Circle</option>
            <option value="Quotify">Quotify</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platformStats.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${platform.bgColor} border ${platform.borderColor} rounded-xl p-6`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${platform.color}`}>
                  <platform.icon size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{platform.name}</h4>
                  <p className="text-sm text-green-400">{platform.growth}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Active Users</span>
                  <span className="text-white font-semibold">{platform.users.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Revenue</span>
                  <span className="text-white font-semibold">{platform.revenue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Engagement</span>
                  <span className="text-white font-semibold">{platform.engagement}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${platform.color}`}
                    style={{ width: platform.engagement }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts and Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Startups */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Top Performing Startups</h3>
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="space-y-4">
            {topStartups.map((startup, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium">{startup.name}</div>
                    <div className="text-xs text-gray-400">{startup.contributors} contributors</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{startup.contributions}</div>
                  <div className="text-xs text-green-400">{startup.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex-1">
                  <div className="text-white font-medium mb-1">{activity.event}</div>
                  <div className="text-xs text-gray-400">{activity.platform}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-400">{activity.count}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Engagement Metrics</h3>
          <BarChart3 className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {engagementData.map((data, index) => (
            <div key={index} className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-sm text-gray-400 mb-2">{data.metric}</div>
              <div className="text-3xl font-bold text-white mb-2">{data.value}</div>
              <div className={`text-sm font-semibold ${
                data.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {data.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Revenue Trends</h3>
          <LineChartIcon className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="h-64 flex items-center justify-center border border-dashed border-white/20 rounded-xl">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Revenue chart visualization</p>
            <p className="text-sm text-gray-500 mt-2">Chart library integration coming soon</p>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Peak Activity</div>
              <div className="text-xl font-bold text-white">6:00 PM - 9:00 PM</div>
            </div>
          </div>
          <p className="text-sm text-gray-400">Most users are active during evening hours</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Conversion Goal</div>
              <div className="text-xl font-bold text-white">85% Achieved</div>
            </div>
          </div>
          <p className="text-sm text-gray-400">On track to meet monthly targets</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Top Category</div>
              <div className="text-xl font-bold text-white">CleanTech</div>
            </div>
          </div>
          <p className="text-sm text-gray-400">Highest engagement and contributions</p>
        </div>
      </div>
    </div>
  );
}
