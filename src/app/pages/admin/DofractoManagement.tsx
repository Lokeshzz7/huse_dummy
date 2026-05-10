import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Users, CheckCircle, XCircle, Clock, 
  Search, Filter, Eye, Award, TrendingUp, Crown,
  AlertTriangle, DollarSign, X, Mail, Phone, FileText, Rocket
} from 'lucide-react';
import { toast } from 'sonner';

export function DofractoManagement() {
  const [activeSection, setActiveSection] = useState<'startups' | 'contributors' | 'business-owners' | 'campaigns'>('startups');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [detailType, setDetailType] = useState<string>('');

  // Mock data
  const [pendingStartups, setPendingStartups] = useState([
    { id: 1, name: 'TechVenture AI', founder: 'Amit Sharma', stage: 'MVP', funding: '₹50L', status: 'pending_review', submitted: '1 day ago' },
    { id: 2, name: 'EcoSolutions', founder: 'Neha Gupta', stage: 'Pre-revenue', funding: '₹25L', status: 'pending_review', submitted: '3 days ago' },
  ]);

  const [pendingContributors, setPendingContributors] = useState([
    { id: 1, name: 'Rajesh Kumar', reputation: 105000, tier: 'Contributor', payment: '₹499/year', status: 'pending_payment', applied: '2 hours ago' },
    { id: 2, name: 'Sonia Patel', reputation: 98000, tier: 'Platinum', payment: 'Earned', status: 'pending_approval', applied: '1 day ago' },
  ]);

  const [pendingStartupOwners, setPendingStartupOwners] = useState([
    { id: 1, name: 'InnovateLabs', owner: 'Vikram Singh', reputation: 320000, tier: 'Startup', plan: 'Custom', status: 'pending_verification' },
  ]);

  const activeCampaigns = [
    { id: 1, startup: 'TechVenture AI', goal: '₹1Cr', raised: '₹45L', investors: 23, status: 'active', deadline: '15 days' },
    { id: 2, startup: 'HealthTech Plus', goal: '₹50L', raised: '₹50L', investors: 12, status: 'completed', deadline: 'Completed' },
  ];

  const handleApproveStartup = (startupId: number) => {
    const startup = pendingStartups.find(s => s.id === startupId);
    setPendingStartups(pendingStartups.filter(s => s.id !== startupId));
    toast.success(`🚀 ${startup?.name} has been approved!`, {
      description: 'They can now access the Dofracto Business Portal.'
    });
  };

  const handleRejectStartup = (startupId: number) => {
    const startup = pendingStartups.find(s => s.id === startupId);
    setPendingStartups(pendingStartups.filter(s => s.id !== startupId));
    toast.error(`${startup?.name}'s application has been rejected.`, {
      description: 'Feedback email sent to the founder.'
    });
  };

  const handleApproveContributor = (contributorId: number) => {
    const contributor = pendingContributors.find(c => c.id === contributorId);
    setPendingContributors(pendingContributors.filter(c => c.id !== contributorId));
    toast.success(`💼 ${contributor?.name} is now a Contributor!`, {
      description: 'They can now invest in startups and access 10 Quotify quotes/week.'
    });
  };

  const handleApproveBusinessOwner = (businessId: number) => {
    const business = pendingBusinessOwners.find(b => b.id === businessId);
    setPendingBusinessOwners(pendingBusinessOwners.filter(b => b.id !== businessId));
    toast.success(`👑 ${business?.name} is now a Business Owner!`, {
      description: 'They can now receive funding and access unlimited Quotify requests.'
    });
  };

  const handleApproveStartupOwner = (businessId: number) => {
    const business = pendingStartupOwners.find(b => b.id === businessId);
    setPendingStartupOwners(pendingStartupOwners.filter(b => b.id !== businessId));
    toast.success(`👑 ${business?.name} is now a Startup!`, {
      description: 'They can now receive funding and access unlimited Quotify requests.'
    });
  };

  const handleViewDetails = (type: string, id: number) => {
    const item = type === 'Startup' ? pendingStartups.find(s => s.id === id) :
                 type === 'Contributor' ? pendingContributors.find(c => c.id === id) :
                 type === 'Startup Owner' ? pendingStartupOwners.find(b => b.id === id) :
                 null;
    setSelectedItem(item);
    setDetailType(type);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'startups', label: 'Startup Approvals', icon: Building2, count: pendingStartups.length },
          { id: 'contributors', label: 'Contributor Approvals', icon: Users, count: pendingContributors.length },
          { id: 'business-owners', label: 'Business Owner Approvals', icon: Crown, count: pendingBusinessOwners.length },
          { id: 'campaigns', label: 'Funding Campaigns', icon: TrendingUp, count: 0 },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap relative ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <section.icon size={16} />
            {section.label}
            {section.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeSection === section.id ? 'bg-white/20' : 'bg-cyan-500/20 text-cyan-400'
              }`}>
                {section.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Startup Approvals */}
      {activeSection === 'startups' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Startup Approvals</h3>
              <p className="text-sm text-gray-400">Review and verify startup applications</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search startups..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} className="text-gray-400" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-bold text-gray-400 mb-2">Filters</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="bg-white/5 border border-white/10 rounded-lg" />
                  <label className="text-sm text-gray-400">Pending Review</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="bg-white/5 border border-white/10 rounded-lg" />
                  <label className="text-sm text-gray-400">Submitted in Last 7 Days</label>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {pendingStartups.map((startup) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Building2 className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{startup.name}</h4>
                      <p className="text-sm text-gray-400">Founder: {startup.founder}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Rocket size={14} />
                          {startup.stage}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <DollarSign size={14} />
                          Seeking {startup.funding}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={14} />
                          {startup.submitted}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" onClick={() => handleViewDetails('Startup', startup.id)}>
                      <Eye size={16} className="text-gray-400" />
                    </button>
                    <button className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2" onClick={() => handleApproveStartup(startup.id)}>
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2" onClick={() => handleRejectStartup(startup.id)}>
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Contributor Approvals */}
      {activeSection === 'contributors' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Contributor Approvals</h3>
              <p className="text-sm text-gray-400">Approve users upgrading to Contributor tier (100K+ Rep OR ₹499/year)</p>
            </div>
          </div>

          <div className="space-y-3">
            {pendingContributors.map((contributor) => (
              <motion.div
                key={contributor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {contributor.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        {contributor.name}
                        <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400">
                          {contributor.tier}
                        </span>
                      </h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Award size={14} />
                          {contributor.reputation.toLocaleString()} Rep
                        </span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <DollarSign size={14} />
                          {contributor.payment}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          contributor.status === 'pending_payment' 
                            ? 'bg-yellow-500/20 text-yellow-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {contributor.status === 'pending_payment' ? 'Payment Pending' : 'Ready for Approval'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {contributor.status === 'pending_approval' && (
                      <>
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2" onClick={() => handleApproveContributor(contributor.id)}>
                          <CheckCircle size={16} />
                          Approve Contributor
                        </button>
                        <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all" onClick={() => handleViewDetails('Contributor', contributor.id)}>
                          Review
                        </button>
                      </>
                    )}
                    {contributor.status === 'pending_payment' && (
                      <span className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-lg text-sm">
                        Awaiting Payment
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Business Owner Approvals */}
      {activeSection === 'business-owners' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Business Owner Approvals</h3>
              <p className="text-sm text-gray-400">Approve users upgrading to Business Owner tier (300K+ Rep OR Custom Pricing)</p>
            </div>
          </div>

          <div className="space-y-3">
            {pendingBusinessOwners.map((business) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        {business.name}
                        <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-400">
                          {business.tier}
                        </span>
                      </h4>
                      <p className="text-sm text-gray-400">Owner: {business.owner}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Award size={14} />
                          {business.reputation.toLocaleString()} Rep
                        </span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <DollarSign size={14} />
                          {business.plan} Plan
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2" onClick={() => handleApproveBusinessOwner(business.id)}>
                      <CheckCircle size={16} />
                      Approve Business Owner
                    </button>
                    <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all" onClick={() => handleViewDetails('Business Owner', business.id)}>
                      Review Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Funding Campaigns */}
      {activeSection === 'campaigns' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Funding Campaigns</h3>
              <p className="text-sm text-gray-400">Monitor and manage active funding campaigns</p>
            </div>
          </div>

          <div className="space-y-3">
            {activeCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className={`border rounded-xl p-4 ${
                  campaign.status === 'active' 
                    ? 'bg-cyan-500/10 border-cyan-500/20' 
                    : 'bg-green-500/10 border-green-500/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      {campaign.startup}
                      {campaign.status === 'completed' && (
                        <CheckCircle size={16} className="text-green-400" />
                      )}
                    </h4>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-400">
                        Goal: {campaign.goal}
                      </span>
                      <span className="text-sm text-cyan-400 font-semibold">
                        Raised: {campaign.raised}
                      </span>
                      <span className="text-sm text-gray-400">
                        {campaign.investors} Investors
                      </span>
                      <span className="text-sm text-gray-500">
                        {campaign.deadline}
                      </span>
                    </div>
                    <div className="mt-3 w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(parseInt(campaign.raised.replace(/\D/g, '')) / parseInt(campaign.goal.replace(/\D/g, ''))) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all" onClick={() => handleViewDetails('Campaign', campaign.id)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{detailType} Details</h3>
                <p className="text-sm text-gray-400">View detailed information about the {detailType.toLowerCase()}</p>
              </div>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setShowDetailModal(false)}>
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              {detailType === 'Startup' && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                        <Building2 className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{selectedItem?.name}</h4>
                        <p className="text-sm text-gray-400">Founder: {selectedItem?.founder}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Rocket size={14} />
                            {selectedItem?.stage}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <DollarSign size={14} />
                            Seeking {selectedItem?.funding}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={14} />
                            {selectedItem?.submitted}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" onClick={() => handleViewDetails('Startup', selectedItem?.id)}>
                        <Eye size={16} className="text-gray-400" />
                      </button>
                      <button className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2" onClick={() => handleApproveStartup(selectedItem?.id)}>
                        <CheckCircle size={16} />
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2" onClick={() => handleRejectStartup(selectedItem?.id)}>
                        <XCircle size={16} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {detailType === 'Contributor' && (
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedItem?.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold flex items-center gap-2">
                          {selectedItem?.name}
                          <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400">
                            {selectedItem?.tier}
                          </span>
                        </h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Award size={14} />
                            {selectedItem?.reputation.toLocaleString()} Rep
                          </span>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <DollarSign size={14} />
                            {selectedItem?.payment}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            selectedItem?.status === 'pending_payment' 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {selectedItem?.status === 'pending_payment' ? 'Payment Pending' : 'Ready for Approval'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedItem?.status === 'pending_approval' && (
                        <>
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2" onClick={() => handleApproveContributor(selectedItem?.id)}>
                            <CheckCircle size={16} />
                            Approve Contributor
                          </button>
                          <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all" onClick={() => handleViewDetails('Contributor', selectedItem?.id)}>
                            Review
                          </button>
                        </>
                      )}
                      {selectedItem?.status === 'pending_payment' && (
                        <span className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-lg text-sm">
                          Awaiting Payment
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {detailType === 'Business Owner' && (
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Crown className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold flex items-center gap-2">
                          {selectedItem?.name}
                          <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-400">
                            {selectedItem?.tier}
                          </span>
                        </h4>
                        <p className="text-sm text-gray-400">Owner: {selectedItem?.owner}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Award size={14} />
                            {selectedItem?.reputation.toLocaleString()} Rep
                          </span>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <DollarSign size={14} />
                            {selectedItem?.plan} Plan
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2" onClick={() => handleApproveBusinessOwner(selectedItem?.id)}>
                        <CheckCircle size={16} />
                        Approve Business Owner
                      </button>
                      <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all" onClick={() => handleViewDetails('Business Owner', selectedItem?.id)}>
                        Review Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {detailType === 'Campaign' && (
                <div
                  className={`border rounded-xl p-4 ${
                    selectedItem?.status === 'active' 
                      ? 'bg-cyan-500/10 border-cyan-500/20' 
                      : 'bg-green-500/10 border-green-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        {selectedItem?.startup}
                        {selectedItem?.status === 'completed' && (
                          <CheckCircle size={16} className="text-green-400" />
                        )}
                      </h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-400">
                          Goal: {selectedItem?.goal}
                        </span>
                        <span className="text-sm text-cyan-400 font-semibold">
                          Raised: {selectedItem?.raised}
                        </span>
                        <span className="text-sm text-gray-400">
                          {selectedItem?.investors} Investors
                        </span>
                        <span className="text-sm text-gray-500">
                          {selectedItem?.deadline}
                        </span>
                      </div>
                      <div className="mt-3 w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${(parseInt(selectedItem?.raised.replace(/\D/g, '')) / parseInt(selectedItem?.goal.replace(/\D/g, ''))) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all" onClick={() => handleViewDetails('Campaign', selectedItem?.id)}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}