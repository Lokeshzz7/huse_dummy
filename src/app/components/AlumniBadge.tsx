import { GraduationCap, Award, Star, Trophy, Zap, Crown, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface AlumniBadgeProps {
  type?: 'alumni' | 'reputation' | 'achievement' | 'contribution';
  college?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  customBadge?: {
    name: string;
    icon: string;
    color: string;
  };
}

const badgeIcons = {
  alumni: GraduationCap,
  reputation: Star,
  achievement: Trophy,
  contribution: Zap
};

const badgeColors = {
  alumni: 'from-purple-500 via-pink-500 to-amber-500',
  reputation: 'from-amber-500 to-yellow-500',
  achievement: 'from-cyan-500 to-blue-500',
  contribution: 'from-green-500 to-emerald-500'
};

const badgeLabels = {
  alumni: 'HUSE Circle Alumni',
  reputation: 'Top Contributor',
  achievement: 'Achievement Unlocked',
  contribution: 'Community Star'
};

export function AlumniBadge({ 
  type = 'alumni', 
  college,
  size = 'md',
  showLabel = true,
  animated = true,
  customBadge
}: AlumniBadgeProps) {
  const Icon = customBadge ? Crown : badgeIcons[type];
  const gradient = customBadge?.color || badgeColors[type];
  const label = customBadge?.name || (college ? `${badgeLabels[type]} - ${college}` : badgeLabels[type]);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 24
  };

  const BadgeComponent = animated ? motion.div : 'div';
  const animationProps = animated ? {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: "spring", stiffness: 200, damping: 15 }
  } : {};

  return (
    <div className="inline-flex items-center gap-2">
      <BadgeComponent
        {...animationProps}
        className={`
          ${sizeClasses[size]} rounded-full bg-gradient-to-br ${gradient} 
          flex items-center justify-center shadow-lg relative group cursor-pointer
        `}
        title={label}
      >
        <Icon size={iconSizes[size]} className="text-white relative z-10" />
        
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
        
        {/* Sparkle effect on hover */}
        {animated && (
          <>
            <motion.div
              className="absolute -top-1 -right-1 text-yellow-300"
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles size={12} />
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-1 text-cyan-300"
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Sparkles size={10} />
            </motion.div>
          </>
        )}
      </BadgeComponent>

      {showLabel && (
        <div className="flex flex-col">
          <span className={`
            font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent
            ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}
          `}>
            {customBadge?.icon || '🎓'} {label}
          </span>
        </div>
      )}
    </div>
  );
}

// Badge Grid Component for displaying multiple badges
interface BadgeGridProps {
  badges: Array<{
    id: string;
    type: 'alumni' | 'reputation' | 'achievement' | 'contribution';
    name: string;
    description: string;
    icon: string;
    color: string;
    earnedAt: string;
  }>;
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="relative p-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            {/* Badge Icon */}
            <div className="flex flex-col items-center gap-3">
              <AlumniBadge
                type={badge.type}
                size="lg"
                showLabel={false}
                customBadge={{
                  name: badge.name,
                  icon: badge.icon,
                  color: badge.color
                }}
              />
              
              {/* Badge Info */}
              <div className="text-center">
                <div className="text-sm font-semibold text-white mb-1">
                  {badge.icon} {badge.name}
                </div>
                <div className="text-xs text-gray-400 line-clamp-2">
                  {badge.description}
                </div>
              </div>

              {/* Earned Date */}
              <div className="text-[10px] text-gray-500 mt-auto">
                Earned {new Date(badge.earnedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Verified Checkmark */}
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <ShieldCheck size={12} className="text-green-400" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Graduation Badge - Special badge for graduating to Dofracto
export function GraduationBadge({ college }: { college: string }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      className="relative inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-amber-500/20 border border-purple-500/30 rounded-full"
    >
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative flex items-center gap-2">
        <GraduationCap className="text-amber-400" size={20} />
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">HUSE Circle Alumni</span>
          <span className="text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
            {college}
          </span>
        </div>
        <Sparkles className="text-yellow-400 animate-pulse" size={16} />
      </div>
    </motion.div>
  );
}
