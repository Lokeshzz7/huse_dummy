import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, User, Bell, Lock, CreditCard, Shield, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'billing'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

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
            <div className="w-full max-w-4xl bg-theme-card border border-theme-accent rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="bg-theme-card border-b border-theme-secondary p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-[#24c6dc]/20 to-[#05997F]/20 rounded-lg">
                    <Settings className="w-6 h-6 text-[#24c6dc]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-theme-primary">Settings</h2>
                    <p className="text-sm text-theme-tertiary">Manage your account preferences</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-theme-secondary rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-theme-muted" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto flex">
                {/* Sidebar */}
                <div className="w-56 bg-theme-secondary border-r border-theme-accent p-4">
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white'
                            : 'text-theme-secondary hover:bg-theme-tertiary'
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Settings Content */}
                <div className="flex-1 p-6">
                  {activeTab === 'profile' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-theme-primary mb-4">Profile Information</h3>
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-theme-primary font-medium mb-2 text-sm">
                                Company Name
                              </label>
                              <input
                                type="text"
                                defaultValue="Dofracto Business"
                                className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-theme-primary font-medium mb-2 text-sm">
                                Email
                              </label>
                              <input
                                type="email"
                                defaultValue="business@dofracto.com"
                                className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-theme-primary font-medium mb-2 text-sm">
                              Bio
                            </label>
                            <textarea
                              rows={4}
                              defaultValue="We're building the future of startup ecosystems."
                              className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all resize-none"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-theme-primary font-medium mb-2 text-sm">
                                Country
                              </label>
                              <select className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all">
                                <option>India</option>
                                <option>United States</option>
                                <option>United Kingdom</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-theme-primary font-medium mb-2 text-sm">
                                Time Zone
                              </label>
                              <select className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all">
                                <option>IST (UTC+5:30)</option>
                                <option>PST (UTC-8)</option>
                                <option>GMT (UTC+0)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <h3 className="font-bold text-theme-primary mb-4">Notification Preferences</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-theme-secondary rounded-lg">
                          <div>
                            <p className="font-medium text-theme-primary">New Applications</p>
                            <p className="text-sm text-theme-tertiary">Get notified when someone applies to your business</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-theme-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#24c6dc] peer-checked:to-[#05997F]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-theme-secondary rounded-lg">
                          <div>
                            <p className="font-medium text-theme-primary">Capital Contributions</p>
                            <p className="text-sm text-theme-tertiary">Get notified about new contributions</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-theme-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#24c6dc] peer-checked:to-[#05997F]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-theme-secondary rounded-lg">
                          <div>
                            <p className="font-medium text-theme-primary">Weekly Reports</p>
                            <p className="text-sm text-theme-tertiary">Receive weekly analytics summary</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-theme-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#24c6dc] peer-checked:to-[#05997F]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-theme-secondary rounded-lg">
                          <div>
                            <p className="font-medium text-theme-primary">Marketing Updates</p>
                            <p className="text-sm text-theme-tertiary">Stay updated with platform features</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-theme-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#24c6dc] peer-checked:to-[#05997F]"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <h3 className="font-bold text-theme-primary mb-4">Security Settings</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-theme-primary font-medium mb-2 text-sm">
                            Current Password
                          </label>
                          <input
                            type="password"
                            placeholder="Enter current password"
                            className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-theme-primary font-medium mb-2 text-sm">
                              New Password
                            </label>
                            <input
                              type="password"
                              placeholder="Enter new password"
                              className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-theme-primary font-medium mb-2 text-sm">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              placeholder="Confirm new password"
                              className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] transition-all"
                            />
                          </div>
                        </div>

                        <div className="bg-[#24c6dc]/10 border border-[#24c6dc]/30 rounded-lg p-4 mt-6">
                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-[#24c6dc] mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-theme-primary mb-1">Two-Factor Authentication</h4>
                              <p className="text-sm text-theme-tertiary mb-3">
                                Add an extra layer of security to your account
                              </p>
                              <button className="px-4 py-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                                Enable 2FA
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'billing' && (
                    <div className="space-y-6">
                      <h3 className="font-bold text-theme-primary mb-4">Billing & Subscription</h3>
                      
                      <div className="bg-gradient-to-r from-[#24c6dc]/10 to-[#05997F]/10 border border-[#24c6dc]/30 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-theme-primary mb-1">Startup Plan</h4>
                            <p className="text-theme-tertiary">Full access to all features</p>
                          </div>
                          <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-semibold">Active</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-theme-primary">Custom Pricing</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-theme-primary mb-3">Payment Method</h4>
                        <div className="bg-theme-secondary border border-theme-accent rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-theme-tertiary rounded-lg">
                              <CreditCard className="w-5 h-5 text-[#24c6dc]" />
                            </div>
                            <div>
                              <p className="font-medium text-theme-primary">•••• •••• •••• 4242</p>
                              <p className="text-sm text-theme-tertiary">Expires 12/25</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-theme-tertiary text-theme-primary rounded-lg text-sm hover:bg-theme-card transition-all">
                            Update
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-theme-primary mb-3">Billing History</h4>
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-theme-secondary border border-theme-accent rounded-lg p-4 flex items-center justify-between">
                              <div>
                                <p className="font-medium text-theme-primary">Startup Plan</p>
                                <p className="text-sm text-theme-tertiary">Dec {i}, 2024</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-theme-primary">₹4,999</p>
                                <button className="text-sm text-[#24c6dc] hover:underline">Download</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-theme-card border-t border-theme-secondary p-6 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-theme-secondary text-theme-primary rounded-lg hover:bg-theme-tertiary transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
