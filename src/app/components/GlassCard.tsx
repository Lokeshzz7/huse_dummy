import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  noPadding?: boolean;
  delay?: number;
}

export function GlassCard({ children, className = '', hover = true, noPadding = false, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={`
        relative group
        glass-premium
        rounded-[16px]
        ${!noPadding ? 'p-6' : ''}
        ${hover ? 'hover-lift hover-glow-cyan' : ''}
        transition-premium
        smooth-edges
        ${className}
      `}
    >
      {/* Premium shine effect on hover */}
      {hover && (
        <div className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-premium pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#24c6dc]/10 via-transparent to-[#05997F]/10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}