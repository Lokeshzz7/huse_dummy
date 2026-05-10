import { Crown, Award } from 'lucide-react';

interface TierBadgeProps {
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function TierBadge({ tier, size = 'md', showIcon = false, className = '' }: TierBadgeProps) {
  const sizes = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-3 py-1 text-[11px]',
    lg: 'px-4 py-1.5 text-[12px]'
  };

  const colors = {
    Bronze: 'bg-gradient-to-r from-orange-700 to-orange-900 text-white border-orange-500/30',
    Silver: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white border-gray-400/30',
    Gold: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-amber-500/30',
    Platinum: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500/30'
  };

  const Icon = tier === 'Platinum' || tier === 'Gold' ? Crown : Award;

  return (
    <span 
      className={`inline-flex items-center gap-1 ${sizes[size]} ${colors[tier]} rounded-full font-bold border ${className}`}
    >
      {showIcon && <Icon size={size === 'sm' ? 10 : size === 'md' ? 12 : 14} />}
      {tier}
    </span>
  );
}

interface TierProgressBarProps {
  currentRep: number;
  currentTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  className?: string;
}

export function TierProgressBar({ currentRep, currentTier, className = '' }: TierProgressBarProps) {
  const getTierProgress = () => {
    if (currentRep >= 100000) return { current: 100000, next: 100000, percentage: 100, nextTier: 'Contributor (Graduate to Dofracto)', repNeeded: 0 };
    if (currentRep >= 30000) return { current: currentRep, next: 100000, percentage: ((currentRep - 30000) / 70000) * 100, nextTier: 'Contributor', repNeeded: 100000 - currentRep };
    if (currentRep >= 5000) return { current: currentRep, next: 30000, percentage: ((currentRep - 5000) / 25000) * 100, nextTier: 'Platinum', repNeeded: 30000 - currentRep };
    if (currentRep >= 1000) return { current: currentRep, next: 5000, percentage: ((currentRep - 1000) / 4000) * 100, nextTier: 'Gold', repNeeded: 5000 - currentRep };
    return { current: currentRep, next: 1000, percentage: (currentRep / 1000) * 100, nextTier: 'Silver', repNeeded: 1000 - currentRep };
  };

  const progress = getTierProgress();

  if (currentTier === 'Platinum') {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-gray-400">Progress to {progress.nextTier}</span>
        <span className="text-purple-400 font-bold">{progress.repNeeded} Rep needed</span>
      </div>
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
    </div>
  );
}