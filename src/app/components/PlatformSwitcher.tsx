import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Rocket, MessageSquare, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEcosystem } from '../context/EcosystemContext';

interface Platform {
  id: 'huse' | 'dofracto' | 'quotify';
  name: string;
  icon: any;
  color: string;
  gradient: string;
  path: string;
  description: string;
  badge?: string;
}

const platforms: Platform[] = [
  {
    id: 'huse',
    name: 'HUSE Circle',
    icon: GraduationCap,
    color: 'purple',
    gradient: 'from-purple-500 via-pink-500 to-amber-500',
    path: '/husecircle/student/platform',
    description: 'Student Incubator',
    badge: 'Students'
  },
  {
    id: 'dofracto',
    name: 'Dofracto',
    icon: Rocket,
    color: 'cyan',
    gradient: 'from-cyan-500 via-teal-500 to-blue-500',
    path: '/dofracto',
    description: 'Startup Accelerator',
    badge: 'Startups'
  },
  {
    id: 'quotify',
    name: 'Quotify',
    icon: MessageSquare,
    color: 'blue',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    path: '/quotify',
    description: 'Quote Platform',
    badge: 'Services'
  }
];

export function PlatformSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useEcosystem();

  // Determine current platform based on route
  const getCurrentPlatform = (): Platform | null => {
    if (location.pathname.includes('huse')) return platforms[0];
    if (location.pathname.includes('dofracto')) return platforms[1];
    if (location.pathname.includes('quotify')) return platforms[2];
    // If on OpportunityFeed or other cross-platform pages, return null
    return null;
  };

  const currentPlatform = getCurrentPlatform();
  // For display purposes, show "All Platforms" when not on a specific platform
  const displayPlatform = currentPlatform || {
    id: 'all' as any,
    name: 'All Platforms',
    icon: Sparkles,
    gradient: 'from-cyan-500 via-purple-500 to-pink-500',
    description: 'Cross-Platform View'
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePlatformSwitch = (platform: Platform) => {
    setIsOpen(false);
    navigate(platform.path);
    
    // Analytics or tracking could go here
    console.log(`🔄 Platform Switch: ${currentPlatform?.name} → ${platform.name}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Platform Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 group"
      >
        <div className={`p-2 rounded-lg bg-gradient-to-br ${displayPlatform.gradient} shadow-lg`}>
          <displayPlatform.icon size={18} className="text-white" />
        </div>
        
        <div className="flex flex-col items-start">
          <div className="text-sm text-gray-400">Current Platform</div>
          <div className="text-[15px] font-semibold text-white">{displayPlatform.name}</div>
        </div>

        <ChevronDown 
          size={18} 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-[#0F0F0F]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Sparkles size={16} className="text-cyan-400" />
                <span>Switch Between Platforms</span>
              </div>
            </div>

            {/* Platform List */}
            <div className="p-2">
              {platforms.map((platform) => {
                const isActive = platform.id === currentPlatform?.id;
                const Icon = platform.icon;

                return (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformSwitch(platform)}
                    disabled={isActive}
                    className={`
                      w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-white/10 cursor-not-allowed' 
                        : 'hover:bg-white/5 cursor-pointer group'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div className={`
                      p-2.5 rounded-lg bg-gradient-to-br ${platform.gradient} 
                      ${!isActive && 'group-hover:scale-110 transition-transform duration-300'}
                    `}>
                      <Icon size={20} className="text-white" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-semibold text-white">
                          {platform.name}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-400 rounded-full">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{platform.description}</span>
                    </div>

                    {/* Arrow */}
                    {!isActive && (
                      <ArrowRight 
                        size={18} 
                        className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" 
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer - Ecosystem Info */}
            <div className="px-4 py-3 border-t border-white/10 bg-gradient-to-r from-cyan-500/5 to-purple-500/5">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {platforms.map((p) => (
                    <div 
                      key={p.id}
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${p.gradient} border-2 border-[#0F0F0F] flex items-center justify-center`}
                    >
                      <p.icon size={12} className="text-white" />
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">
                    All platforms connected in the <span className="text-cyan-400 font-semibold">HUSE Ecosystem</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}