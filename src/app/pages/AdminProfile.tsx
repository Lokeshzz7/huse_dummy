import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Shield,
  Bell,
  Globe,
  Upload,
  Save,
  Eye,
  EyeOff,
  Camera,
  Activity,
  Clock,
  MapPin,
  Phone,
  Building2,
  Calendar,
  Edit3,
  Check,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

export function AdminProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  // Profile data
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@dofracto.com',
    phone: '+1 (555) 123-4567',
    role: 'Platform Administrator',
    department: 'Operations',
    location: 'San Francisco, CA',
    timezone: 'UTC-8 (Pacific Time)',
    bio: 'Platform administrator managing Dofracto business directory and networking services.',
    joinedDate: 'January 15, 2024'
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: false,
    newUserAlerts: true,
    systemUpdates: true
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profile Updated Successfully!\n\nYour profile information has been saved.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Error: New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Error: Password must be at least 8 characters long!');
      return;
    }
    alert('Password Changed Successfully!\n\nYour password has been updated.');
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const recentActivity = [
    { action: 'Added new business listing', time: '2 hours ago', icon: Building2 },
    { action: 'Updated theme settings', time: '5 hours ago', icon: Edit3 },
    { action: 'Approved 3 new users', time: '1 day ago', icon: User },
    { action: 'Modified platform settings', time: '2 days ago', icon: Activity },
    { action: 'Generated monthly report', time: '3 days ago', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#111] border-b border-[#24c6dc]/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </div>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6"
            >
              <div className="text-center">
                {/* Avatar */}
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] flex items-center justify-center text-white text-4xl overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{profileData.firstName[0]}{profileData.lastName[0]}</span>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-[#24c6dc] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#05997F] transition-all">
                      <Camera className="w-5 h-5 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Name & Role */}
                <h2 className="text-white text-2xl mb-1">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-[#24c6dc] mb-2">{profileData.role}</p>
                <p className="text-gray-400 text-sm mb-4">{profileData.email}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#24c6dc]/20">
                  <div>
                    <p className="text-white text-xl">248</p>
                    <p className="text-gray-400 text-xs">Actions</p>
                  </div>
                  <div>
                    <p className="text-white text-xl">45</p>
                    <p className="text-gray-400 text-xs">Days Active</p>
                  </div>
                  <div>
                    <p className="text-white text-xl">12</p>
                    <p className="text-gray-400 text-xs">Reports</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6"
            >
              <h3 className="text-white mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm">{profileData.department}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{profileData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Joined {profileData.joinedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{profileData.timezone}</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6"
            >
              <h3 className="text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#24c6dc]" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-[#24c6dc]/10 last:border-0">
                    <activity.icon className="w-4 h-4 text-[#24c6dc] mt-1" />
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-[#24c6dc]" />
                <h3 className="text-white text-xl">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Department</label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] disabled:opacity-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-2 text-sm">Bio</label>
                  <textarea
                    rows={3}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] disabled:opacity-50"
                  />
                </div>
              </div>
            </motion.div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-[#24c6dc]" />
                <h3 className="text-white text-xl">Security</h3>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Current Password</label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      value={passwordData.oldPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                      className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-[#24c6dc]/20">
                <label className="flex items-center justify-between">
                  <span className="text-gray-400">Two-Factor Authentication</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#24c6dc]">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                  </button>
                </label>
              </div>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-[#24c6dc]" />
                <h3 className="text-white text-xl">Notification Preferences</h3>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Email Notifications</p>
                    <p className="text-gray-400 text-sm">Receive notifications via email</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, emailNotifications: !notifications.emailNotifications })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.emailNotifications ? 'bg-[#24c6dc]' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Push Notifications</p>
                    <p className="text-gray-400 text-sm">Receive push notifications on your device</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, pushNotifications: !notifications.pushNotifications })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.pushNotifications ? 'bg-[#24c6dc]' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Weekly Reports</p>
                    <p className="text-gray-400 text-sm">Get weekly activity reports</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, weeklyReport: !notifications.weeklyReport })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.weeklyReport ? 'bg-[#24c6dc]' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">New User Alerts</p>
                    <p className="text-gray-400 text-sm">Get notified when new users register</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, newUserAlerts: !notifications.newUserAlerts })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.newUserAlerts ? 'bg-[#24c6dc]' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.newUserAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">System Updates</p>
                    <p className="text-gray-400 text-sm">Receive system update notifications</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, systemUpdates: !notifications.systemUpdates })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.systemUpdates ? 'bg-[#24c6dc]' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.systemUpdates ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#111] border border-red-500/20 rounded-xl p-6"
            >
              <h3 className="text-red-400 mb-4">Danger Zone</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Deactivate Account</p>
                    <p className="text-gray-400 text-sm">Temporarily disable your admin account</p>
                  </div>
                  <button className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:border-red-500 transition-all text-sm">
                    Deactivate
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
