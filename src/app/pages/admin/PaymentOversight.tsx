import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle,
  AlertCircle, Eye, Download, Search, Filter, CreditCard,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { toast } from 'sonner';

export function PaymentOversight() {
  const [activeSection, setActiveSection] = useState<'overview' | 'transactions' | 'subscriptions' | 'payouts'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const stats = [
    { label: 'Total Revenue (This Month)', value: '₹12.4L', change: '+24%', trend: 'up', icon: TrendingUp },
    { label: 'Pending Payouts', value: '₹3.2L', change: '45 pending', trend: 'neutral', icon: Clock },
    { label: 'Active Subscriptions', value: '234', change: '+12', trend: 'up', icon: CreditCard },
    { label: 'Failed Transactions', value: '12', change: '-3', trend: 'down', icon: AlertCircle },
  ];

  const recentTransactions = [
    { id: 1, user: 'Amit Sharma', type: 'Contributor Subscription', amount: '₹499', status: 'completed', platform: 'Dofracto', time: '2 mins ago' },
    { id: 2, user: 'TechVenture AI', type: 'Business Owner Plan', amount: '₹15,000', status: 'completed', platform: 'Dofracto', time: '1 hour ago' },
    { id: 3, user: 'Creative Studios', type: 'Quote Payment', amount: '₹8,500', status: 'pending', platform: 'Quotify', time: '3 hours ago' },
    { id: 4, user: 'Priya Sharma', type: 'Contributor Subscription', amount: '₹499', status: 'failed', platform: 'Dofracto', time: '5 hours ago' },
  ];

  const subscriptions = [
    { id: 1, user: 'Rajesh Kumar', plan: 'Contributor', amount: '₹499/year', status: 'active', nextBilling: '2024-12-20', platform: 'Dofracto' },
    { id: 2, user: 'InnovateLabs', plan: 'Business Owner', amount: '₹15,000/year', status: 'active', nextBilling: '2024-11-15', platform: 'Dofracto' },
    { id: 3, user: 'Sneha Reddy', plan: 'Contributor', amount: '₹499/year', status: 'expiring_soon', nextBilling: '2024-01-25', platform: 'Dofracto' },
  ];

  const pendingPayouts = [
    { id: 1, provider: 'DevMasters', service: 'Mobile App Development', amount: '₹45,000', client: 'TechCorp', status: 'pending_release', date: '2024-01-15' },
    { id: 2, provider: 'Creative Studios', service: 'Logo Design', amount: '₹8,500', client: 'StartupX', status: 'pending_release', date: '2024-01-18' },
  ];

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'transactions', label: 'All Transactions', icon: DollarSign },
          { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
          { id: 'payouts', label: 'Payouts', icon: ArrowUpRight },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <section.icon size={16} />
            {section.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    stat.trend === 'up' ? 'bg-green-500/20' : 
                    stat.trend === 'down' ? 'bg-red-500/20' : 
                    'bg-yellow-500/20'
                  }`}>
                    <stat.icon size={20} className={
                      stat.trend === 'up' ? 'text-green-400' : 
                      stat.trend === 'down' ? 'text-red-400' : 
                      'text-yellow-400'
                    } />
                  </div>
                  <span className={`text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-green-400' : 
                    stat.trend === 'down' ? 'text-red-400' : 
                    'text-gray-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Revenue Chart Placeholder */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Revenue Trend (Last 30 Days)</h3>
            <div className="h-64 bg-gradient-to-t from-green-500/10 to-transparent rounded-xl flex items-center justify-center border border-green-500/20">
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>
        </div>
      )}

      {/* All Transactions */}
      {activeSection === 'transactions' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">All Transactions</h3>
              <p className="text-sm text-gray-400">Monitor all payment activities across platforms</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                />
              </div>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                <Filter size={18} className="text-gray-400" />
              </button>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                <Download size={18} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-green-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.status === 'completed' ? 'bg-green-500/20' :
                      transaction.status === 'pending' ? 'bg-yellow-500/20' :
                      'bg-red-500/20'
                    }`}>
                      {transaction.status === 'completed' && <CheckCircle className="text-green-400" size={20} />}
                      {transaction.status === 'pending' && <Clock className="text-yellow-400" size={20} />}
                      {transaction.status === 'failed' && <AlertCircle className="text-red-400" size={20} />}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{transaction.user}</h4>
                      <p className="text-sm text-gray-400">{transaction.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-white font-semibold">{transaction.amount}</p>
                      <p className="text-xs text-gray-500">{transaction.platform}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.status.toUpperCase()}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{transaction.time}</p>
                    </div>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                      <Eye size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subscriptions */}
      {activeSection === 'subscriptions' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Active Subscriptions</h3>
              <p className="text-sm text-gray-400">Manage Contributor and Business Owner subscriptions</p>
            </div>
          </div>

          <div className="space-y-3">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`border rounded-xl p-4 ${
                  sub.status === 'expiring_soon' 
                    ? 'bg-yellow-500/10 border-yellow-500/20' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <CreditCard className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        {sub.user}
                        <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400">
                          {sub.plan}
                        </span>
                      </h4>
                      <p className="text-sm text-gray-400">{sub.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-white font-semibold">{sub.amount}</p>
                      <p className="text-xs text-gray-500">Next billing: {sub.nextBilling}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      sub.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {sub.status === 'active' ? 'Active' : 'Expiring Soon'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payouts */}
      {activeSection === 'payouts' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Pending Payouts (Quotify)</h3>
              <p className="text-sm text-gray-400">Approve payouts to service providers</p>
            </div>
          </div>

          <div className="space-y-3">
            {pendingPayouts.map((payout) => (
              <div
                key={payout.id}
                className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{payout.provider}</h4>
                      <p className="text-sm text-gray-400 mt-1">Service: {payout.service}</p>
                      <p className="text-sm text-gray-400">Client: {payout.client}</p>
                      <p className="text-xs text-gray-500 mt-2">Due date: {payout.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{payout.amount}</p>
                      <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-400">
                        Pending Release
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all">
                      Release Payout
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}