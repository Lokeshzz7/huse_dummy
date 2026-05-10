import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, CheckCircle, XCircle, Clock, Search, 
  Filter, Eye, MessageSquare, AlertTriangle, Shield,
  DollarSign, Star, Users, Tag, X, Mail, Phone
} from 'lucide-react';
import { toast } from 'sonner';

export function QuotifyManagement() {
  const [activeSection, setActiveSection] = useState<'requests' | 'providers' | 'disputes' | 'categories'>('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Mock data
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, title: 'Logo Design for Startup', requester: 'TechVenture AI', budget: '₹5K-10K', quotes: 8, status: 'flagged', reason: 'High budget variance', submitted: '2 hours ago' },
    { id: 2, title: 'Mobile App Development', requester: 'EcoSolutions', budget: '₹50K-1L', quotes: 3, status: 'pending_review', reason: null, submitted: '1 day ago' },
  ]);

  const [pendingProviders, setPendingProviders] = useState([
    { id: 1, name: 'Creative Studios', owner: 'Rahul Kumar', services: ['Design', 'Branding'], reputation: 0, status: 'pending_verification', applied: '3 hours ago' },
    { id: 2, name: 'DevMasters', owner: 'Priya Sharma', services: ['Development', 'UI/UX'], reputation: 0, status: 'pending_verification', applied: '1 day ago' },
  ]);

  const [activeDisputes, setActiveDisputes] = useState([
    { id: 1, request: 'Website Redesign', provider: 'WebPro Agency', client: 'TechCorp', issue: 'Delayed delivery', amount: '₹25K', status: 'under_review', filed: '2 days ago' },
  ]);

  const categories = [
    { id: 1, name: 'Design & Branding', icon: '🎨', providers: 45, requests: 120, status: 'active' },
    { id: 2, name: 'Development', icon: '💻', providers: 67, requests: 200, status: 'active' },
    { id: 3, name: 'Marketing', icon: '📱', providers: 34, requests: 89, status: 'active' },
    { id: 4, name: 'Content Writing', icon: '✍️', providers: 23, requests: 56, status: 'active' },
  ];

  const handleApproveRequest = (requestId: number) => {
    const request = pendingRequests.find(r => r.id === requestId);
    setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
    toast.success(`Quote request "${request?.title}" has been approved!`, {
      description: 'It is now live and visible to service providers.'
    });
  };

  const handleRemoveRequest = (requestId: number) => {
    const request = pendingRequests.find(r => r.id === requestId);
    setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
    toast.error(`Quote request "${request?.title}" has been removed.`, {
      description: 'The requester has been notified.'
    });
  };

  const handleApproveProvider = (providerId: number) => {
    const provider = pendingProviders.find(p => p.id === providerId);
    setPendingProviders(pendingProviders.filter(p => p.id !== providerId));
    toast.success(`${provider?.name} has been verified as a service provider!`, {
      description: 'They can now submit quotes on Quotify.'
    });
  };

  const handleRejectProvider = (providerId: number) => {
    const provider = pendingProviders.find(p => p.id === providerId);
    setPendingProviders(pendingProviders.filter(p => p.id !== providerId));
    toast.error(`${provider?.name}'s application has been rejected.`);
  };

  const handleResolveDisputeRefund = (disputeId: number) => {
    const dispute = activeDisputes.find(d => d.id === disputeId);
    setActiveDisputes(activeDisputes.filter(d => d.id !== disputeId));
    toast.success(`Dispute resolved in favor of ${dispute?.client}`, {
      description: `Refund of ${dispute?.amount} processed.`
    });
  };

  const handleResolveDisputePayProvider = (disputeId: number) => {
    const dispute = activeDisputes.find(d => d.id === disputeId);
    setActiveDisputes(activeDisputes.filter(d => d.id !== disputeId));
    toast.success(`Dispute resolved in favor of ${dispute?.provider}`, {
      description: `Payment of ${dispute?.amount} released to provider.`
    });
  };

  const handleContactParties = (disputeId: number) => {
    toast.info('Opening communication channel with both parties...');
  };

  const handleViewDetails = (type: string, id: number) => {
    const item = type === 'request' ? pendingRequests.find(r => r.id === id) :
                 type === 'provider' ? pendingProviders.find(p => p.id === id) :
                 type === 'category' ? categories.find(c => c.id === id) : null;
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleAddCategory = () => {
    setShowAddCategoryModal(true);
  };

  const handleExportData = () => {
    setShowExportModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'requests', label: 'Quote Request Moderation', icon: FileText, count: pendingRequests.filter(r => r.status === 'flagged').length },
          { id: 'providers', label: 'Provider Approvals', icon: Users, count: pendingProviders.length },
          { id: 'disputes', label: 'Dispute Resolution', icon: AlertTriangle, count: activeDisputes.length },
          { id: 'categories', label: 'Category Management', icon: Tag, count: 0 },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap relative ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <section.icon size={16} />
            {section.label}
            {section.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeSection === section.id ? 'bg-white/20' : 'bg-red-500/20 text-red-400'
              }`}>
                {section.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Quote Request Moderation */}
      {activeSection === 'requests' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Quote Request Moderation</h3>
              <p className="text-sm text-gray-400">Review flagged or suspicious quote requests</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="text-gray-400" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-bold text-gray-400 mb-2">Filters</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <label className="text-sm text-gray-400">Flagged</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <label className="text-sm text-gray-400">Pending Review</label>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border rounded-xl p-4 ${
                  request.status === 'flagged' 
                    ? 'bg-red-500/10 border-red-500/20' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      request.status === 'flagged' 
                        ? 'bg-gradient-to-br from-red-500 to-orange-500' 
                        : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                    }`}>
                      <FileText className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-semibold">{request.title}</h4>
                        {request.status === 'flagged' && (
                          <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 flex items-center gap-1">
                            <AlertTriangle size={12} />
                            Flagged
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">Requested by: {request.requester}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <DollarSign size={14} />
                          {request.budget}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <MessageSquare size={14} />
                          {request.quotes} Quotes
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={14} />
                          {request.submitted}
                        </span>
                      </div>
                      {request.reason && (
                        <div className="mt-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-xs text-red-400 flex items-center gap-2">
                            <AlertTriangle size={12} />
                            <strong>Flagged Reason:</strong> {request.reason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => handleViewDetails('request', request.id)}
                    >
                      <Eye size={16} className="text-gray-400" />
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2"
                      onClick={() => handleApproveRequest(request.id)}
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
                      onClick={() => handleRemoveRequest(request.id)}
                    >
                      <XCircle size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Provider Approvals */}
      {activeSection === 'providers' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Service Provider Approvals</h3>
              <p className="text-sm text-gray-400">Review and approve new service providers</p>
            </div>
          </div>

          <div className="space-y-3">
            {pendingProviders.map((provider) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                      {provider.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{provider.name}</h4>
                      <p className="text-sm text-gray-400">Owner: {provider.owner}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {provider.services.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400">
                            {service}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 mt-2 block">
                        Applied: {provider.applied}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => handleViewDetails('provider', provider.id)}
                    >
                      <Eye size={16} className="text-gray-400" />
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2"
                      onClick={() => handleApproveProvider(provider.id)}
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
                      onClick={() => handleRejectProvider(provider.id)}
                    >
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

      {/* Dispute Resolution */}
      {activeSection === 'disputes' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Dispute Resolution</h3>
              <p className="text-sm text-gray-400">Handle disputes between clients and providers</p>
            </div>
          </div>

          <div className="space-y-3">
            {activeDisputes.map((dispute) => (
              <motion.div
                key={dispute.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <AlertTriangle className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        {dispute.request}
                        <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 rounded text-xs text-orange-400">
                          {dispute.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-400">
                          <strong>Provider:</strong> {dispute.provider}
                        </p>
                        <p className="text-sm text-gray-400">
                          <strong>Client:</strong> {dispute.client}
                        </p>
                        <p className="text-sm text-gray-400">
                          <strong>Issue:</strong> {dispute.issue}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-sm text-orange-400 font-semibold">
                          Amount: {dispute.amount}
                        </span>
                        <span className="text-xs text-gray-500">
                          Filed: {dispute.filed}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all text-sm"
                      onClick={() => handleResolveDisputeRefund(dispute.id)}
                    >
                      Resolve - Refund Client
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm"
                      onClick={() => handleResolveDisputePayProvider(dispute.id)}
                    >
                      Resolve - Pay Provider
                    </button>
                    <button
                      className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all text-sm"
                      onClick={() => handleContactParties(dispute.id)}
                    >
                      Contact Parties
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Category Management */}
      {activeSection === 'categories' && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Service Category Management</h3>
              <p className="text-sm text-gray-400">Manage service categories and subcategories</p>
            </div>
            <button
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              onClick={handleAddCategory}
            >
              <Tag size={16} />
              Add Category
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <h4 className="text-white font-semibold">{category.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-400">
                          {category.providers} Providers
                        </span>
                        <span className="text-sm text-gray-400">
                          {category.requests} Requests
                        </span>
                      </div>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400">
                        Active
                      </span>
                    </div>
                  </div>
                  <button
                    className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => handleViewDetails('category', category.id)}
                  >
                    <Eye size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="text-gray-400" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedItem.name?.charAt(0) || selectedItem.title?.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white"> {selectedItem.name || selectedItem.title}</h4>
                  <p className="text-gray-400 mt-1">
                    {selectedItem.owner || selectedItem.requester || 'Service Category'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-white flex items-center gap-2">
                    <Mail size={16} />
                    contact@example.com
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="text-white flex items-center gap-2">
                    <Phone size={16} />
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {selectedItem.services && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-500 mb-2">Services Offered</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.services.map((service: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.budget && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-500 mb-1">Budget Range</p>
                  <p className="text-white text-lg font-semibold">{selectedItem.budget}</p>
                </div>
              )}

              {selectedItem.quotes !== undefined && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-500 mb-1">Total Quotes Received</p>
                  <p className="text-white text-lg font-semibold">{selectedItem.quotes}</p>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-gray-500 mb-2">Additional Notes</p>
                <p className="text-gray-400 text-sm">All verification documents have been reviewed and approved. No issues found.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-white font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  toast.success('Action performed successfully!');
                }}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:shadow-lg transition-all text-white font-medium"
              >
                Take Action
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Add New Category</h3>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="text-gray-400" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g., Web Development"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Icon/Emoji</label>
                <input
                  type="text"
                  placeholder="e.g., 💻"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of this category..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddCategoryModal(false);
                  toast.success('Category added successfully!');
                }}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:shadow-lg transition-all text-white font-medium"
              >
                Add Category
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Contact Parties Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Contact Both Parties</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="text-gray-400" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Dispute resolution..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message to both parties..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowContactModal(false);
                  toast.success('Message sent to both parties!');
                }}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:shadow-lg transition-all text-white font-medium"
              >
                Send Message
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}