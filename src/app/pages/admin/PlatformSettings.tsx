import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Settings, Save, RefreshCw, Bell, Shield, DollarSign,
  Users, Building2, GraduationCap, Award, Zap, Lock,
  Unlock, Eye, EyeOff, Globe, Mail, Server, Database,
  Key, AlertCircle, Check, X, Plus, Trash2, Edit
} from 'lucide-react';
import { toast } from 'sonner';

export function PlatformSettings() {
  const [activeSection, setActiveSection] = useState<'general' | 'dofracto' | 'huse' | 'quotify' | 'security' | 'notifications'>('general');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoApproval, setAutoApproval] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Dofracto Settings
  const [dofractoSettings, setDofractoSettings] = useState({
    contributorPrice: 499,
    businessPrice: '', // Custom pricing for Business Owners - use empty string instead of null
    trialDays: 7,
    minContribution: 100,
    maxContribution: 100000,
    featuredFee: 2999,
    allowPublicBrowsing: true
  });

  // HUSE Circle Settings
  const [huseSettings, setHuseSettings] = useState({
    verificationRequired: true,
    minProjectSubmissions: 3,
    alumniGraduationCriteria: 5,
    maxTeamSize: 6,
    allowGuestPosts: false
  });

  // Quotify Settings
  const [quotifySettings, setQuotifySettings] = useState({
    platformFee: 10,
    minQuoteValue: 500,
    maxQuoteValue: 500000,
    autoMatchThreshold: 80,
    requireEscrow: true
  });

  const handleSaveSettings = (section: string) => {
    toast.success(`${section} settings saved successfully!`);
  };

  const sections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'dofracto', label: 'Dofracto', icon: Building2 },
    { id: 'huse', label: 'HUSE Circle', icon: GraduationCap },
    { id: 'quotify', label: 'Quotify', icon: Award },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Platform Settings</h2>
          <p className="text-gray-400">Configure settings across all platforms</p>
        </div>
        <button
          onClick={() => toast.info('Backup created successfully')}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
        >
          <Database className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-white">Backup Settings</span>
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-2 sticky top-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">General Settings</h3>
                </div>

                {/* Maintenance Mode */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/20">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Maintenance Mode</div>
                        <div className="text-sm text-gray-400">Disable public access to all platforms</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMaintenanceMode(!maintenanceMode);
                        toast.info(maintenanceMode ? 'Maintenance mode disabled' : 'Maintenance mode enabled');
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        maintenanceMode ? 'bg-amber-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {maintenanceMode && (
                    <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <p className="text-sm text-amber-400">⚠️ All platforms are currently in maintenance mode</p>
                    </div>
                  )}
                </div>

                {/* Auto Approval */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/20">
                        <Check className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Auto Approval</div>
                        <div className="text-sm text-gray-400">Automatically approve low-risk content</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setAutoApproval(!autoApproval);
                        toast.info(autoApproval ? 'Auto approval disabled' : 'Auto approval enabled');
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        autoApproval ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          autoApproval ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Platform Name */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="HUSE Ecosystem"
                    className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                {/* Support Email */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Support Email</label>
                  <input
                    type="email"
                    defaultValue="support@huse.com"
                    className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={() => handleSaveSettings('General')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all font-medium"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            )}

            {/* Dofracto Settings */}
            {activeSection === 'dofracto' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Dofracto Settings</h3>
                    <p className="text-sm text-gray-400">Configure startup accelerator platform</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                  <h4 className="font-semibold text-white mb-4">Subscription Pricing</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Builder/Contributor (Annual)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                        <input
                          type="number"
                          value={dofractoSettings.contributorPrice}
                          onChange={(e) => setDofractoSettings({...dofractoSettings, contributorPrice: Number(e.target.value)})}
                          className="w-full pl-8 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Business (Annual)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                        <input
                          type="number"
                          value={dofractoSettings.businessPrice}
                          onChange={(e) => setDofractoSettings({...dofractoSettings, businessPrice: e.target.value})}
                          className="w-full pl-8 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Trial Period (Days)</label>
                    <input
                      type="number"
                      value={dofractoSettings.trialDays}
                      onChange={(e) => setDofractoSettings({...dofractoSettings, trialDays: Number(e.target.value)})}
                      className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                {/* Contribution Limits */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                  <h4 className="font-semibold text-white mb-4">Contribution Limits</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Minimum (₹)</label>
                      <input
                        type="number"
                        value={dofractoSettings.minContribution}
                        onChange={(e) => setDofractoSettings({...dofractoSettings, minContribution: Number(e.target.value)})}
                        className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Maximum (₹)</label>
                      <input
                        type="number"
                        value={dofractoSettings.maxContribution}
                        onChange={(e) => setDofractoSettings({...dofractoSettings, maxContribution: Number(e.target.value)})}
                        className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature Settings */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20">
                        <Eye className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Allow Public Browsing</div>
                        <div className="text-sm text-gray-400">Let non-subscribers view business listings</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setDofractoSettings({...dofractoSettings, allowPublicBrowsing: !dofractoSettings.allowPublicBrowsing})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        dofractoSettings.allowPublicBrowsing ? 'bg-cyan-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          dofractoSettings.allowPublicBrowsing ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleSaveSettings('Dofracto')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all font-medium"
                >
                  <Save className="w-5 h-5" />
                  Save Dofracto Settings
                </button>
              </div>
            )}

            {/* HUSE Circle Settings */}
            {activeSection === 'huse' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">HUSE Circle Settings</h3>
                    <p className="text-sm text-gray-400">Configure student incubator platform</p>
                  </div>
                </div>

                {/* Verification */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <Shield className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">College Verification Required</div>
                        <div className="text-sm text-gray-400">Students must verify college enrollment</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setHuseSettings({...huseSettings, verificationRequired: !huseSettings.verificationRequired})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        huseSettings.verificationRequired ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          huseSettings.verificationRequired ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Project Requirements */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                  <h4 className="font-semibold text-white mb-4">Project Requirements</h4>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Min Projects for Alumni Badge</label>
                    <input
                      type="number"
                      value={huseSettings.alumniGraduationCriteria}
                      onChange={(e) => setHuseSettings({...huseSettings, alumniGraduationCriteria: Number(e.target.value)})}
                      className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Maximum Team Size</label>
                    <input
                      type="number"
                      value={huseSettings.maxTeamSize}
                      onChange={(e) => setHuseSettings({...huseSettings, maxTeamSize: Number(e.target.value)})}
                      className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSaveSettings('HUSE Circle')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium"
                >
                  <Save className="w-5 h-5" />
                  Save HUSE Settings
                </button>
              </div>
            )}

            {/* Quotify Settings */}
            {activeSection === 'quotify' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Quotify Settings</h3>
                    <p className="text-sm text-gray-400">Configure quote matching platform</p>
                  </div>
                </div>

                {/* Platform Fee */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <label className="block text-sm text-gray-400 mb-2">Platform Fee (%)</label>
                  <input
                    type="number"
                    value={quotifySettings.platformFee}
                    onChange={(e) => setQuotifySettings({...quotifySettings, platformFee: Number(e.target.value)})}
                    className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-xs text-gray-500 mt-2">Fee charged on successful quote matches</p>
                </div>

                {/* Quote Limits */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                  <h4 className="font-semibold text-white mb-4">Quote Value Limits</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Minimum (₹)</label>
                      <input
                        type="number"
                        value={quotifySettings.minQuoteValue}
                        onChange={(e) => setQuotifySettings({...quotifySettings, minQuoteValue: Number(e.target.value)})}
                        className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Maximum (₹)</label>
                      <input
                        type="number"
                        value={quotifySettings.maxQuoteValue}
                        onChange={(e) => setQuotifySettings({...quotifySettings, maxQuoteValue: Number(e.target.value)})}
                        className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Auto Matching */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <label className="block text-sm text-gray-400 mb-2">Auto-Match Threshold (%)</label>
                  <input
                    type="number"
                    value={quotifySettings.autoMatchThreshold}
                    onChange={(e) => setQuotifySettings({...quotifySettings, autoMatchThreshold: Number(e.target.value)})}
                    className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-xs text-gray-500 mt-2">Minimum match score for auto-suggestions</p>
                </div>

                <button
                  onClick={() => handleSaveSettings('Quotify')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all font-medium"
                >
                  <Save className="w-5 h-5" />
                  Save Quotify Settings
                </button>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-rose-500">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Security Settings</h3>
                    <p className="text-sm text-gray-400">Manage security and access control</p>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-red-400 mb-1">Security Notice</div>
                      <p className="text-sm text-gray-400">These settings affect platform security. Changes should be made carefully.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="text-center py-12">
                    <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Advanced security settings</p>
                    <p className="text-sm text-gray-500">Two-factor authentication, API keys, and access logs</p>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Notification Settings</h3>
                    <p className="text-sm text-gray-400">Configure notification preferences</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Email Notifications</div>
                      <div className="text-sm text-gray-400">Send email updates to users</div>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        emailNotifications ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleSaveSettings('Notifications')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium"
                >
                  <Save className="w-5 h-5" />
                  Save Notification Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}