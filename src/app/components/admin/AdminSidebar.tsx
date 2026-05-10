import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Flag, BarChart3, Settings,
  Building2, GraduationCap, MessageSquare, ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, count: null },
    { id: 'users', label: 'User Management', icon: Users, count: 10234 },
    { id: 'moderation', label: 'Content Moderation', icon: Flag, count: 12 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, count: null },
    { id: 'settings', label: 'Platform Settings', icon: Settings, count: null },
  ];

  const platformItems = [
    { id: 'dofracto', label: 'Dofracto', icon: Building2, count: 1456 },
    { id: 'huse', label: 'HUSE Circle', icon: GraduationCap, count: 5678 },
    { id: 'quotify', label: 'Quotify', icon: MessageSquare, count: 3100 },
  ];

  return (
    <aside className="fixed left-0 top-[70px] bottom-0 w-[280px] bg-[#0a0a0a] border-r border-white/10 overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Main Menu */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Main Menu
          </h3>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-red-400' : ''}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isActive
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-white/5 text-gray-500'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Platforms
          </h3>
          <div className="space-y-1">
            {platformItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-white/5 text-gray-500 rounded-full">
                      {item.count}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-400">All Systems Operational</span>
          </div>
          <p className="text-xs text-gray-400">
            Uptime: 99.98% • Last checked: 1 min ago
          </p>
        </div>
      </div>
    </aside>
  );
}
