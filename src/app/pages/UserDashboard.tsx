import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Building2,
  Users,
  TrendingUp,
  Star,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  Plus,
  Eye,
  BarChart3,
  Calendar,
  Crown,
  ArrowRight
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AmbientBackground } from '../components/AmbientBackground';

type TabType = 'overview' | 'listings' | 'analytics' | 'messages' | 'settings';

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userType = localStorage.getItem('userType');
    const email = localStorage.getItem('userEmail');
    
    if (userType !== 'user' || !email) {
      navigate('/user/login');
      return;
    }
    
    setUserEmail(email);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#111] relative">
      <AmbientBackground />
      <Header />
      
      <main className="pt-[70px] pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#24c6dc]/20 to-[#05997F]/20 border border-[#24c6dc]/30 rounded-2xl p-8 mb-8 mt-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-white text-3xl mb-2">Welcome back! 👋</h1>
                <p className="text-gray-400">{userEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-3 rounded-lg hover:bg-red-500/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            <TabButton
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Overview"
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            />
            <TabButton
              icon={<Building2 className="w-4 h-4" />}
              label="My Listings"
              active={activeTab === 'listings'}
              onClick={() => setActiveTab('listings')}
            />
            <TabButton
              icon={<BarChart3 className="w-4 h-4" />}
              label="Analytics"
              active={activeTab === 'analytics'}
              onClick={() => setActiveTab('analytics')}
            />
            <TabButton
              icon={<MessageCircle className="w-4 h-4" />}
              label="Messages"
              active={activeTab === 'messages'}
              onClick={() => setActiveTab('messages')}
            />
            <TabButton
              icon={<Settings className="w-4 h-4" />}
              label="Settings"
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            />
          </div>

          {/* Content Area */}
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'listings' && <ListingsTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'messages' && <MessagesTab />}
          {activeTab === 'settings' && <SettingsTab userEmail={userEmail} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function TabButton({ icon, label, active, onClick }: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
        active
          ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white shadow-lg'
          : 'bg-[#0a0a0a] border border-[#24c6dc]/30 text-gray-400 hover:text-white hover:border-[#24c6dc]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function OverviewTab() {
  const stats = [
    { label: 'Total Views', value: '2,847', icon: Eye, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Listings', value: '3', icon: Building2, color: 'from-[#24c6dc] to-[#05997F]' },
    { label: 'Messages', value: '12', icon: MessageCircle, color: 'from-purple-500 to-pink-500' },
    { label: 'Rating', value: '4.8', icon: Star, color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-xl p-6">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-white text-3xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/dofracto/discover"
              className="flex items-center justify-between bg-[#111] border border-[#24c6dc]/30 rounded-lg p-4 hover:border-[#24c6dc] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-[#24c6dc]" />
                <span className="text-white">Create New Listing</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#24c6dc] group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              to="/husecircle/student/platform"
              className="flex items-center justify-between bg-[#111] border border-[#24c6dc]/30 rounded-lg p-4 hover:border-[#24c6dc] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-[#05997F]" />
                <span className="text-white">Join HUSE Circle</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#24c6dc] group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-between bg-[#111] border border-[#24c6dc]/30 rounded-lg p-4 hover:border-[#24c6dc] transition-all group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#24c6dc]" />
                <span className="text-white">Contact Support</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#24c6dc] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <ActivityItem text="New message received" time="5 min ago" />
            <ActivityItem text="Listing viewed 15 times" time="1 hour ago" />
            <ActivityItem text="Profile updated successfully" time="2 hours ago" />
            <ActivityItem text="New connection request" time="1 day ago" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-[#24c6dc]/10 last:border-0">
      <div className="w-2 h-2 rounded-full bg-[#24c6dc] mt-2"></div>
      <div className="flex-1">
        <p className="text-white text-sm">{text}</p>
        <p className="text-gray-500 text-xs mt-1">{time}</p>
      </div>
    </div>
  );
}

function ListingsTab() {
  const listings = [
    { id: 1, name: 'My Tech Business', category: 'Technology', views: 1234, status: 'Active' },
    { id: 2, name: 'Consulting Services', category: 'Services', views: 856, status: 'Active' },
    { id: 3, name: 'E-commerce Store', category: 'Retail', views: 2103, status: 'Pending' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl">My Business Listings</h2>
        <button className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Listing
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white text-xl mb-1">{listing.name}</h3>
                <p className="text-gray-400">{listing.category}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm ${
                listing.status === 'Active'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {listing.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <Eye className="w-4 h-4" />
                <span>{listing.views} views</span>
              </div>
              <div className="flex gap-2">
                <button className="bg-[#111] border border-[#24c6dc]/30 text-[#24c6dc] px-4 py-2 rounded-lg hover:border-[#24c6dc] transition-all">
                  Edit
                </button>
                <button className="bg-[#111] border border-[#24c6dc]/30 text-white px-4 py-2 rounded-lg hover:border-[#24c6dc] transition-all">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AnalyticsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-white text-2xl">Analytics & Insights</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Views Over Time</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {[45, 67, 89, 123, 156, 134, 178].map((height, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-[#24c6dc] to-[#05997F] rounded-t-lg" style={{ height: `${height}px` }} />
            ))}
          </div>
          <div className="flex justify-between text-gray-400 text-sm mt-4">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Top Performing Listings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#24c6dc]/10">
              <span className="text-white">My Tech Business</span>
              <span className="text-[#24c6dc]">1,234 views</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-[#24c6dc]/10">
              <span className="text-white">E-commerce Store</span>
              <span className="text-[#24c6dc]">2,103 views</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Consulting Services</span>
              <span className="text-[#24c6dc]">856 views</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MessagesTab() {
  const messages = [
    { id: 1, from: 'John Doe', subject: 'Interested in your services', preview: 'Hi, I saw your business listing and I\'m interested...', time: '2h ago', unread: true },
    { id: 2, from: 'Jane Smith', subject: 'Partnership opportunity', preview: 'We would like to discuss a potential partnership...', time: '1d ago', unread: true },
    { id: 3, from: 'Mike Johnson', subject: 'Thanks for the collaboration', preview: 'Just wanted to thank you for the great work...', time: '3d ago', unread: false }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-white text-2xl">Messages</h2>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-[#0a0a0a] border rounded-xl p-6 cursor-pointer hover:border-[#24c6dc] transition-all ${
              message.unread ? 'border-[#24c6dc]/50' : 'border-[#24c6dc]/20'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] flex items-center justify-center text-white">
                  {message.from.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-bold">{message.from}</h3>
                  <p className="text-[#24c6dc] text-sm">{message.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {message.unread && (
                  <span className="w-2 h-2 rounded-full bg-[#24c6dc]"></span>
                )}
                <span className="text-gray-400 text-sm">{message.time}</span>
              </div>
            </div>
            <p className="text-gray-400 ml-13">{message.preview}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SettingsTab({ userEmail }: { userEmail: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-white text-2xl">Account Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={userEmail}
                disabled
                className="w-full bg-[#111] border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Display Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-[#111] border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full bg-[#111] border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#24c6dc]/20 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Preferences</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-400">Email Notifications</span>
              <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-400">Marketing Emails</span>
              <input type="checkbox" className="w-12 h-6 rounded-full" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-400">SMS Notifications</span>
              <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full" />
            </label>
            <div className="pt-4 border-t border-[#24c6dc]/20">
              <h4 className="text-white mb-3">Change Password</h4>
              <input
                type="password"
                placeholder="Current Password"
                className="w-full bg-[#111] border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] mb-3"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full bg-[#111] border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] mb-3"
              />
              <button className="w-full bg-[#111] border border-[#24c6dc]/30 text-white px-6 py-3 rounded-lg hover:border-[#24c6dc] transition-all">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}