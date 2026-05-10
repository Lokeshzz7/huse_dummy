import { useState } from 'react';
import { motion } from 'motion/react';

export function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-white text-2xl">Account Settings</h2>

      <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
        <h3 className="text-white mb-6">Profile Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="Startup Founder"
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="owner@business.com"
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+1 (555) 000-0000"
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
        <h3 className="text-white mb-6">Password & Security</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
        <h3 className="text-white mb-6">Notification Preferences</h3>
        <div className="space-y-4">
          <NotificationToggle label="Email notifications for new inquiries" defaultChecked />
          <NotificationToggle label="SMS alerts for important updates" defaultChecked />
          <NotificationToggle label="Weekly performance reports" />
          <NotificationToggle label="Marketing and promotional emails" />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all">
          Cancel
        </button>
        <button 
          onClick={() => alert('Settings saved successfully!')}
          className="px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
        >
          Save Changes
        </button>
      </div>
    </motion.div>
  );
}

function NotificationToggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#24c6dc]/10">
      <span className="text-white">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#24c6dc] peer-checked:to-[#05997F]"></div>
      </label>
    </div>
  );
}
