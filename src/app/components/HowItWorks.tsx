import { motion } from 'motion/react';
import { UserPlus, FileText, Rocket, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up in minutes and set up your business profile with our easy onboarding process.'
  },
  {
    icon: FileText,
    number: '02',
    title: 'Build Your Listing',
    description: 'Add your business details, services, and showcase what makes you unique.'
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Connect & Grow',
    description: 'Start connecting with potential clients and partners in your industry.'
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'Track Success',
    description: 'Monitor your growth with analytics and insights to optimize your presence.'
  }
];

export function HowItWorks() {
  return (
    <section className="relative py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-4">
            How It <span className="text-[#24c6dc]">Works</span>
          </h2>
          <p className="text-gray-400 text-[18px] max-w-2xl mx-auto">
            Get started with Dofracto in four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Connection Line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#24c6dc] to-transparent" />
              )}

              <div className="relative bg-[#0a0a0a] rounded-[20px] border border-[#24c6dc]/20 p-8 hover:border-[#24c6dc]/50 transition-all duration-300 group">
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center font-bold text-white shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="inline-flex p-4 rounded-[15px] bg-[#24c6dc]/10 mb-6 group-hover:bg-[#24c6dc]/20 transition-all">
                  <step.icon className="text-[#24c6dc]" size={32} />
                </div>

                {/* Content */}
                <h3 className="text-white text-[22px] font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
