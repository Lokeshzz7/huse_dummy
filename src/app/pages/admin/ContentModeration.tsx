import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle, CheckCircle, XCircle, Clock, Eye, Flag,
  MessageSquare, Building2, GraduationCap, FileText, Image,
  Video, Link as LinkIcon, MoreVertical, Filter, Search,
  ThumbsUp, ThumbsDown, Shield, Users, TrendingUp, X
} from 'lucide-react';
import { toast } from 'sonner';

interface ContentItem {
  id: number;
  type: 'startup' | 'project' | 'quote' | 'comment' | 'post';
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  platform: 'Dofracto' | 'HUSE Circle' | 'Quotify';
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  submittedDate: string;
  flags: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  thumbnail?: string;
}

const mockContent: ContentItem[] = [
  {
    id: 1,
    type: 'startup',
    title: 'EcoTech Solutions',
    description: 'Revolutionary green energy solutions for urban homes. We are developing solar panels with 40% higher efficiency...',
    author: 'Amit Kumar',
    authorAvatar: '🚀',
    platform: 'Dofracto',
    status: 'pending',
    submittedDate: '2 hours ago',
    flags: 0,
    priority: 'high',
    category: 'CleanTech',
    thumbnail: '⚡'
  },
  {
    id: 2,
    type: 'project',
    title: 'AI-Powered Study Assistant',
    description: 'Mobile app that helps students with personalized learning paths using machine learning algorithms...',
    author: 'Priya Sharma',
    authorAvatar: '👩‍🎓',
    platform: 'HUSE Circle',
    status: 'pending',
    submittedDate: '5 hours ago',
    flags: 0,
    priority: 'medium',
    category: 'EdTech',
    thumbnail: '🤖'
  },
  {
    id: 3,
    type: 'quote',
    title: 'Website Development Request',
    description: 'Looking for a full-stack developer to build an e-commerce platform with payment integration...',
    author: 'Rajesh Patel',
    authorAvatar: '💼',
    platform: 'Quotify',
    status: 'flagged',
    submittedDate: '1 day ago',
    flags: 3,
    priority: 'urgent',
    category: 'Web Development'
  },
  {
    id: 4,
    type: 'comment',
    title: 'Comment on "TravelMate AI"',
    description: 'This is a scam! They are just copying another startup. Don\'t invest here!!!',
    author: 'Anonymous User',
    authorAvatar: '⚠️',
    platform: 'Dofracto',
    status: 'flagged',
    submittedDate: '3 hours ago',
    flags: 8,
    priority: 'urgent',
    category: 'Spam'
  },
  {
    id: 5,
    type: 'startup',
    title: 'HealthTrack Pro',
    description: 'Comprehensive health monitoring platform with AI-powered diagnostics and telemedicine features...',
    author: 'Dr. Sneha Reddy',
    authorAvatar: '🏥',
    platform: 'Dofracto',
    status: 'approved',
    submittedDate: '2 days ago',
    flags: 0,
    priority: 'low',
    category: 'HealthTech',
    thumbnail: '💊'
  },
  {
    id: 6,
    type: 'project',
    title: 'Smart Campus System',
    description: 'IoT-based campus management system for attendance, library, and facility booking...',
    author: 'Vikram Singh',
    authorAvatar: '🎓',
    platform: 'HUSE Circle',
    status: 'rejected',
    submittedDate: '1 week ago',
    flags: 0,
    priority: 'low',
    category: 'IoT'
  }
];

export function ContentModeration() {
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [filterStatus, setFilterStatus] = useState<string>('pending');
  const [filterPlatform, setFilterPlatform] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesPlatform = filterPlatform === 'All' || item.platform === filterPlatform;
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesStatus && matchesPlatform && matchesType;
  });

  const stats = {
    pending: content.filter(c => c.status === 'pending').length,
    flagged: content.filter(c => c.status === 'flagged').length,
    approved: content.filter(c => c.status === 'approved').length,
    rejected: content.filter(c => c.status === 'rejected').length,
  };

  const handleApprove = (id: number) => {
    setContent(prev => prev.map(item =>
      item.id === id ? { ...item, status: 'approved' as const } : item
    ));
    toast.success('Content approved successfully');
    setShowDetailModal(false);
  };

  const handleReject = (id: number) => {
    setContent(prev => prev.map(item =>
      item.id === id ? { ...item, status: 'rejected' as const } : item
    ));
    toast.success('Content rejected');
    setShowDetailModal(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'startup': return <Building2 className="w-4 h-4" />;
      case 'project': return <GraduationCap className="w-4 h-4" />;
      case 'quote': return <FileText className="w-4 h-4" />;
      case 'comment': return <MessageSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            Pending Review
          </span>
        );
      case 'flagged':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">
            <Flag className="w-3 h-3" />
            Flagged
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Content Moderation</h2>
          <p className="text-gray-400">Review and moderate content across platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.info('Auto-moderation settings coming soon')}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
          >
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-white">Auto-Moderate</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-amber-400" />
            <span className="text-2xl font-bold text-white">{stats.pending}</span>
          </div>
          <p className="text-sm text-gray-400">Pending Review</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <Flag className="w-8 h-8 text-red-400" />
            <span className="text-2xl font-bold text-white">{stats.flagged}</span>
          </div>
          <p className="text-sm text-gray-400">Flagged Content</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.approved}</span>
          </div>
          <p className="text-sm text-gray-400">Approved</p>
        </div>
        <div className="bg-gradient-to-br from-gray-500/10 to-slate-500/10 border border-gray-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-8 h-8 text-gray-400" />
            <span className="text-2xl font-bold text-white">{stats.rejected}</span>
          </div>
          <p className="text-sm text-gray-400">Rejected</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search content..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="All">All Platforms</option>
            <option value="Dofracto">Dofracto</option>
            <option value="HUSE Circle">HUSE Circle</option>
            <option value="Quotify">Quotify</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="All">All Types</option>
            <option value="startup">Startups</option>
            <option value="project">Projects</option>
            <option value="quote">Quotes</option>
            <option value="comment">Comments</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white/5 backdrop-blur-sm border rounded-xl p-6 hover:border-cyan-500/30 transition-all ${
              item.priority === 'urgent' ? 'border-red-500/30' : 'border-white/10'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Thumbnail */}
              <div className="text-5xl">{item.thumbnail || '📄'}</div>

              {/* Content Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(item.type)}
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      {item.flags > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs">
                          <Flag className="w-3 h-3" />
                          {item.flags}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-2xl">{item.authorAvatar}</span>
                        <span className="text-gray-300">{item.author}</span>
                      </div>
                      <span className="text-gray-600">•</span>
                      <span className="text-sm text-gray-400">{item.platform}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-sm text-gray-400">{item.submittedDate}</span>
                      {item.category && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className="text-sm text-cyan-400">{item.category}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(item.status)}
                    <span className={`px-3 py-1 border rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowDetailModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Review</span>
                    </button>
                    {(item.status === 'pending' || item.status === 'flagged') && (
                      <>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 rounded-lg transition-all"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition-all"
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span className="text-sm">Reject</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center">
          <CheckCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No content to moderate</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Review Content</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Content Header */}
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{selectedItem.thumbnail || '📄'}</div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h4>
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      {getStatusBadge(selectedItem.status)}
                      <span className={`px-3 py-1 border rounded-full text-xs font-medium ${getPriorityColor(selectedItem.priority)}`}>
                        {selectedItem.priority.toUpperCase()} PRIORITY
                      </span>
                      {selectedItem.flags > 0 && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-medium">
                          <Flag className="w-3 h-3" />
                          {selectedItem.flags} Flags
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Author</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{selectedItem.authorAvatar}</span>
                      <span className="text-white font-medium">{selectedItem.author}</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Platform</p>
                    <p className="text-white font-medium">{selectedItem.platform}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Type</p>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(selectedItem.type)}
                      <span className="text-white font-medium capitalize">{selectedItem.type}</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Submitted</p>
                    <p className="text-white font-medium">{selectedItem.submittedDate}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">Description</h5>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-300 leading-relaxed">{selectedItem.description}</p>
                  </div>
                </div>

                {/* Actions */}
                {(selectedItem.status === 'pending' || selectedItem.status === 'flagged') && (
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => handleApprove(selectedItem.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 rounded-lg transition-all font-medium"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Approve Content</span>
                    </button>
                    <button
                      onClick={() => handleReject(selectedItem.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition-all font-medium"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Reject Content</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
