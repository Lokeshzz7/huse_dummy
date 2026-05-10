import { motion } from 'motion/react';
import svgPaths from "../../imports/svg-zo5hcw23ut";

interface SectionTransitionProps {
  position?: 'left' | 'right' | 'center';
  color?: 'cyan' | 'green';
}

export function SectionTransition({ position = 'center', color = 'cyan' }: SectionTransitionProps) {
  const colorMap = {
    cyan: '#24c6dc',
    green: '#05997F'
  };

  const positionMap = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center'
  };

  return (
    <div className={`relative h-32 flex items-center ${positionMap[position]} overflow-hidden`}>
      {/* Flowing line */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${colorMap[color]}, transparent)`
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Animated flow particles */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg className="w-12 h-12" fill="none" viewBox="0 0 25 25">
            <path d={svgPaths.p3367c070} fill={colorMap[color]} opacity="0.6" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 flex items-center justify-around opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: colorMap[color] }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}