import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, Eye, Users, DollarSign, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: {
    id: string;
    name: string;
    views: number;
    applications: number;
    capitalRaised?: number;
  };
}

export function AnalyticsModal({ isOpen, onClose, business }: AnalyticsModalProps) {
  const analyticsData = [
    { label: 'Mon', views: 45, applications: 3 },
    { label: 'Tue', views: 52, applications: 5 },
    { label: 'Wed', views: 38, applications: 2 },
    { label: 'Thu', views: 67, applications: 8 },
    { label: 'Fri', views: 89, applications: 12 },
    { label: 'Sat', views: 72, applications: 6 },
    { label: 'Sun', views: 61, applications: 7 },
  ];

  const maxViews = Math.max(...analyticsData.map(d => d.views));

  const metrics = [
    {
      label: 'Total Views',
      value: business.views,
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'text-[#24c6dc]',
      bgColor: 'bg-[#24c6dc]/10'
    },
    {
      label: 'Applications',
      value: business.applications,
      change: '+8.3%',
      trend: 'up',
      icon: Users,
      color: 'text-[#05997F]',
      bgColor: 'bg-[#05997F]/10'
    },
    {
      label: 'Capital Raised',
      value: `₹${business.capitalRaised ? (business.capitalRaised / 100000).toFixed(1) + 'L' : '0'}`,
      change: '+24.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Conversion Rate',
      value: '18.5%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-[#B66FDE]',
      bgColor: 'bg-[#B66FDE]/10'
    }
  ];

  const topSources = [
    { name: 'Dofracto Contributors', percentage: 65, color: '#24c6dc' },
    { name: 'HUSE Circle', percentage: 25, color: '#8B5CF6' },
    { name: 'Direct Traffic', percentage: 10, color: '#05997F' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-5xl bg-theme-card border border-theme-accent rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-theme-card border-b border-theme-secondary p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-theme-primary mb-1">Analytics Dashboard</h2>
                  <p className="text-sm text-theme-tertiary">{business.name}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-theme-secondary rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-theme-muted" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Metrics Grid */}
                <div className="grid md:grid-cols-4 gap-4">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-theme-secondary border border-theme-accent rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 ${metric.bgColor} rounded-lg`}>
                          <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-semibold ${
                          metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {metric.trend === 'up' ? (
                            <ArrowUp className="w-3 h-3" />
                          ) : (
                            <ArrowDown className="w-3 h-3" />
                          )}
                          {metric.change}
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-theme-primary mb-1">{metric.value}</p>
                      <p className="text-xs text-theme-tertiary">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Views Chart */}
                <div className="bg-theme-secondary border border-theme-accent rounded-xl p-6">
                  <h3 className="font-bold text-theme-primary mb-6">Weekly Views & Applications</h3>
                  <div className="space-y-4">
                    {analyticsData.map((data, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-theme-tertiary w-12">{data.label}</span>
                          <div className="flex-1 mx-4 flex gap-2">
                            <div className="flex-1 bg-theme-tertiary rounded-full h-6 overflow-hidden relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(data.views / maxViews) * 100}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="h-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] flex items-center justify-end pr-2"
                              >
                                <span className="text-xs text-white font-semibold">{data.views}</span>
                              </motion.div>
                            </div>
                            <div className="w-16 bg-theme-tertiary rounded-full h-6 overflow-hidden relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(data.applications / 12) * 100}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#B66FDE] flex items-center justify-center"
                              >
                                <span className="text-xs text-white font-semibold">{data.applications}</span>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 mt-6 pt-4 border-t border-theme-accent">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#24c6dc] to-[#05997F]"></div>
                      <span className="text-xs text-theme-tertiary">Views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#B66FDE]"></div>
                      <span className="text-xs text-theme-tertiary">Applications</span>
                    </div>
                  </div>
                </div>

                {/* Traffic Sources */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-theme-secondary border border-theme-accent rounded-xl p-6">
                    <h3 className="font-bold text-theme-primary mb-4">Traffic Sources</h3>
                    <div className="space-y-3">
                      {topSources.map((source, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-theme-primary">{source.name}</span>
                            <span className="text-sm font-semibold text-theme-primary">{source.percentage}%</span>
                          </div>
                          <div className="w-full bg-theme-tertiary rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${source.percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                              className="h-full"
                              style={{ backgroundColor: source.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Capital Raised Progress */}
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                    <h3 className="font-bold text-theme-primary mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      Capital Raised Progress
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-3xl font-bold text-green-500">
                            ₹{business.capitalRaised?.toLocaleString('en-IN') || '0'}
                          </span>
                          <span className="text-sm text-theme-tertiary">/ ₹10,00,000</span>
                        </div>
                        <div className="w-full bg-theme-tertiary rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((business.capitalRaised || 0) / 1000000) * 100}%` }}
                            transition={{ duration: 1.5 }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-green-500/20">
                        <div>
                          <p className="text-xs text-theme-muted mb-1">Contributors</p>
                          <p className="text-xl font-bold text-theme-primary">127</p>
                        </div>
                        <div>
                          <p className="text-xs text-theme-muted mb-1">Avg. Contribution</p>
                          <p className="text-xl font-bold text-theme-primary">₹3,937</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Period Selector */}
                <div className="flex items-center justify-center gap-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg text-sm font-medium">
                    Last 7 Days
                  </button>
                  <button className="px-4 py-2 bg-theme-secondary text-theme-primary rounded-lg text-sm hover:bg-theme-tertiary transition-all">
                    Last 30 Days
                  </button>
                  <button className="px-4 py-2 bg-theme-secondary text-theme-primary rounded-lg text-sm hover:bg-theme-tertiary transition-all">
                    Last 3 Months
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-theme-card border-t border-theme-secondary p-6">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all font-medium"
                >
                  Close Analytics
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
