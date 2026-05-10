import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Search, Filter, Download, Upload, Plus, Edit, Trash2,
  Lock, Unlock, Mail, Phone, MapPin, Calendar, Shield, Award,
  Eye, UserCheck, UserX, MoreVertical, X, Check, AlertCircle,
  Building2, GraduationCap, Star, TrendingUp, DollarSign, UserPlus
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  platform: 'Dofracto' | 'HUSE Circle' | 'Quotify' | 'All';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastActive: string;
  contributions: number;
  reputation: number;
  avatar: string;
  phone?: string;
  location?: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    role: 'Builder',
    platform: 'Dofracto',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
    contributions: 12,
    reputation: 4.8,
    avatar: '👨‍💼',
    phone: '+91 98765 43210',
    location: 'Mumbai, India'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'Student',
    platform: 'HUSE Circle',
    status: 'active',
    joinDate: '2024-02-20',
    lastActive: '1 day ago',
    contributions: 8,
    reputation: 4.5,
    avatar: '👩‍🎓',
    phone: '+91 87654 32109',
    location: 'Delhi, India'
  },
  {
    id: 3,
    name: 'Amit Patel',
    email: 'amit@startup.com',
    role: 'Business Owner',
    platform: 'Dofracto',
    status: 'active',
    joinDate: '2024-03-10',
    lastActive: '5 mins ago',
    contributions: 25,
    reputation: 4.9,
    avatar: '🚀',
    phone: '+91 76543 21098',
    location: 'Bangalore, India'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    email: 'sneha@quotify.com',
    role: 'Service Provider',
    platform: 'Quotify',
    status: 'active',
    joinDate: '2024-01-05',
    lastActive: '3 hours ago',
    contributions: 45,
    reputation: 5.0,
    avatar: '💼',
    phone: '+91 65432 10987',
    location: 'Hyderabad, India'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    role: 'Alumni',
    platform: 'All',
    status: 'active',
    joinDate: '2023-11-20',
    lastActive: '1 hour ago',
    contributions: 67,
    reputation: 4.9,
    avatar: '🎓',
    phone: '+91 54321 09876',
    location: 'Pune, India'
  },
  {
    id: 6,
    name: 'Anjali Gupta',
    email: 'anjali@student.com',
    role: 'Student',
    platform: 'HUSE Circle',
    status: 'pending',
    joinDate: '2024-12-15',
    lastActive: 'Never',
    contributions: 0,
    reputation: 0,
    avatar: '👩‍💻',
    phone: '+91 43210 98765',
    location: 'Chennai, India'
  },
  {
    id: 7,
    name: 'Rohan Mehta',
    email: 'rohan@suspended.com',
    role: 'Builder',
    platform: 'Dofracto',
    status: 'suspended',
    joinDate: '2024-05-12',
    lastActive: '2 weeks ago',
    contributions: 3,
    reputation: 2.1,
    avatar: '⚠️',
    phone: '+91 32109 87654',
    location: 'Kolkata, India'
  }
];

export function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddUserMenu, setShowAddUserMenu] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = filterPlatform === 'All' || user.platform === filterPlatform;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    pending: users.filter(u => u.status === 'pending').length,
  };

  const handleSuspendUser = (userId: number) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: 'suspended' as const } : u
    ));
    toast.success('User suspended successfully');
  };

  const handleActivateUser = (userId: number) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: 'active' as const } : u
    ));
    toast.success('User activated successfully');
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast.success('User deleted successfully');
      setShowUserModal(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Dofracto': return <Building2 className="w-4 h-4" />;
      case 'HUSE Circle': return <GraduationCap className="w-4 h-4" />;
      case 'Quotify': return <Star className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Dofracto': return 'from-cyan-500 to-teal-500';
      case 'HUSE Circle': return 'from-purple-500 to-pink-500';
      case 'Quotify': return 'from-amber-500 to-orange-500';
      default: return 'from-blue-500 to-indigo-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
          <p className="text-gray-400">Manage users across all platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.info('Export feature coming soon')}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
          >
            <Download className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-white">Export</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowAddUserMenu(!showAddUserMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              <Plus className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Add User</span>
            </button>
            <AnimatePresence>
              {showAddUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-gray-900 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                >
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        navigate('/add-student');
                        setShowAddUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      <GraduationCap className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">Add Student</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/add-business');
                        setShowAddUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm">Add Business</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/add-recruiter');
                        setShowAddUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      <Users className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Add Recruiter</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/add-contributor');
                        setShowAddUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">Add Contributor</span>
                    </button>
                    <div className="border-t border-white/10 my-1"></div>
                    <button
                      onClick={() => {
                        navigate('/add-user');
                        setShowAddUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      <UserPlus className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">Add General User</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-sm text-gray-400">Total Users</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <UserCheck className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.active}</span>
          </div>
          <p className="text-sm text-gray-400">Active Users</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <UserX className="w-8 h-8 text-red-400" />
            <span className="text-2xl font-bold text-white">{stats.suspended}</span>
          </div>
          <p className="text-sm text-gray-400">Suspended</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-amber-400" />
            <span className="text-2xl font-bold text-white">{stats.pending}</span>
          </div>
          <p className="text-sm text-gray-400">Pending</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-all ${
              showFilters 
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm text-gray-400 mb-2">Platform</label>
                <select
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="All">All Platforms</option>
                  <option value="Dofracto">Dofracto</option>
                  <option value="HUSE Circle">HUSE Circle</option>
                  <option value="Quotify">Quotify</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="All">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Reputation</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{user.avatar}</div>
                      <div>
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r ${getPlatformColor(user.platform)} bg-opacity-10 rounded-full`}>
                      {getPlatformIcon(user.platform)}
                      <span className="text-xs font-medium text-white">{user.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">{user.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      user.status === 'suspended' ? 'bg-red-500/20 text-red-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {user.status === 'active' && <Check className="w-3 h-3" />}
                      {user.status === 'suspended' && <X className="w-3 h-3" />}
                      {user.status === 'pending' && <AlertCircle className="w-3 h-3" />}
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{user.lastActive}</div>
                    <div className="text-xs text-gray-500">{user.contributions} contributions</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-white">{user.reputation.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleSuspendUser(user.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Suspend User"
                        >
                          <Lock className="w-4 h-4 text-red-400" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivateUser(user.id)}
                          className="p-2 hover:bg-green-500/10 rounded-lg transition-colors"
                          title="Activate User"
                        >
                          <Unlock className="w-4 h-4 text-green-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No users found matching your criteria</p>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">User Details</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* User Info */}
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{selectedUser.avatar}</div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white mb-1">{selectedUser.name}</h4>
                    <p className="text-gray-400 mb-3">{selectedUser.email}</p>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r ${getPlatformColor(selectedUser.platform)} bg-opacity-10 rounded-full`}>
                        {getPlatformIcon(selectedUser.platform)}
                        <span className="text-xs font-medium text-white">{selectedUser.platform}</span>
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        selectedUser.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        selectedUser.status === 'suspended' ? 'bg-red-500/20 text-red-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-2xl font-bold text-white">{selectedUser.reputation}</span>
                    </div>
                    <p className="text-xs text-gray-400">Reputation</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{selectedUser.contributions}</div>
                    <p className="text-xs text-gray-400">Contributions</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{selectedUser.role}</div>
                    <p className="text-xs text-gray-400">Role</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-white">Contact Information</h5>
                  {selectedUser.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{selectedUser.phone}</span>
                    </div>
                  )}
                  {selectedUser.location && (
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{selectedUser.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Joined {selectedUser.joinDate}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => toast.info('Edit feature coming soon')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit User</span>
                  </button>
                  {selectedUser.status === 'active' ? (
                    <button
                      onClick={() => {
                        handleSuspendUser(selectedUser.id);
                        setShowUserModal(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition-all"
                    >
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-medium">Suspend</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleActivateUser(selectedUser.id);
                        setShowUserModal(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 rounded-lg transition-all"
                    >
                      <Unlock className="w-4 h-4" />
                      <span className="text-sm font-medium">Activate</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}