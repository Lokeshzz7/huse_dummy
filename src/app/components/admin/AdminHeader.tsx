import { Link, useNavigate } from 'react-router-dom';
import { Shield, Bell, LogOut, Crown, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function AdminHeader() {
  const navigate = useNavigate();
  const [notifications] = useState(8);
  const adminUser = JSON.parse(localStorage.getItem('superAdminUser') || '{"name": "Super Admin", "email": "superadmin@huse.com"}');

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('superAdminUser');
    navigate('/super-admin-login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-red-500/20">
      <div className="max-w-[1600px] mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* Left - Logo & Badge */}
        <div className="flex items-center gap-4">
          <Link to="/super-admin-dashboard" className="flex items-center gap-3">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.4)',
                  '0 0 30px rgba(239, 68, 68, 0.6)',
                  '0 0 20px rgba(239, 68, 68, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg"
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                SUPER ADMIN
              </h1>
              <p className="text-[10px] text-gray-500 -mt-1">HUSE Ecosystem Control</p>
            </div>
          </Link>

          {/* Platform Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full">
            <Crown className="w-3 h-3 text-amber-400" />
            <span className="text-xs text-gray-400">Full Access</span>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {notifications}
              </span>
            )}
          </button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">{adminUser.name}</p>
              <p className="text-xs text-gray-500">{adminUser.email}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
