import { motion } from 'motion/react';
import { Rocket, Users, Briefcase, Shield, Target, TrendingUp, GraduationCap, Repeat } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Startup Discovery',
    description: 'Explore early-stage ventures by problem, stage, and participation needs — not just pitch decks.',
    color: 'from-[#24c6dc] to-[#514a9d]'
  },
  {
    icon: Briefcase,
    title: 'Skill-for-Ownership',
    description: 'Contribute your expertise and earn ownership. No fixed salaries, just aligned upside.',
    color: 'from-[#05997F] to-[#24c6dc]'
  },
  {
    icon: GraduationCap,
    title: 'Student Pipeline',
    description: 'Build in HUSE Circle, launch on Dofracto. One ecosystem from college to startup success.',
    color: 'from-[#8B5CF6] to-[#EC4899]',
    badge: 'New'
  },
  {
    icon: Target,
    title: 'Direct Participation',
    description: 'Engage directly with founders. Discuss terms, align on vision, and participate responsibly.',
    color: 'from-[#24c6dc] to-[#05997F]'
  },
  {
    icon: Repeat,
    title: 'Closed-Loop Ecosystem',
    description: 'Successful startups hire from HUSE Circle, creating a perpetual talent and opportunity cycle.',
    color: 'from-[#8B5CF6] to-[#24c6dc]',
    badge: 'New'
  },
  {
    icon: TrendingUp,
    title: 'Transparent Progress',
    description: 'Track startup milestones, team updates, and contribution history in real-time.',
    color: 'from-[#514a9d] to-[#24c6dc]'
  }
];

export function Features() {
  return (
    <section className="relative py-24 bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#24c6dc] rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#05997F] rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-4">
            Why Choose <span className="text-[#24c6dc]">Dofracto</span>
          </h2>
          <p className="text-gray-400 text-[18px] max-w-2xl mx-auto">
            A participation-first ecosystem where ownership is earned, not marketed
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-[#111] rounded-[20px] p-8 border border-[#24c6dc]/20 hover:border-[#24c6dc]/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-[15px] bg-gradient-to-br ${feature.color} mb-6`}>
                <feature.icon className="text-white" size={32} />
              </div>

              {/* Content */}
              <h3 className="text-white text-[24px] font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Badge */}
              {feature.badge && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-[#ec4899] text-white text-[10px] font-bold rounded-full">
                  {feature.badge}
                </div>
              )}

              {/* Hover effect */}
              <div className={`absolute inset-0 rounded-[20px] bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}