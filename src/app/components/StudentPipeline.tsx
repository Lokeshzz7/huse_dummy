import { motion } from 'motion/react';
import { GraduationCap, Rocket, Award, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function StudentPipeline() {
  const navigate = useNavigate();

  const stages = [
    {
      icon: GraduationCap,
      title: 'Build in HUSE Circle',
      description: 'Start in your college house. Complete freelance gigs, build projects, earn reputation points.',
      color: '#8B5CF6',
      features: [
        'Gain real-world experience',
        'Build your portfolio',
        'Earn reputation points',
        'Compete on leaderboards'
      ]
    },
    {
      icon: Award,
      title: 'Establish Credibility',
      description: 'High-reputation unlocks opportunities. Your work becomes your placement portfolio.',
      color: '#F59E0B',
      features: [
        'Get noticed by recruiters',
        'Post premium gigs',
        'Mentor newcomers',
        'Win college competitions'
      ]
    },
    {
      icon: Rocket,
      title: 'Launch on Dofracto',
      description: 'Graduate your best projects to Dofracto. Seek community support and collaboration.',
      color: '#24c6dc',
      features: [
        'HUSE Circle Alumni badge',
        'Reputation boost',
        'Access to builders',
        'Community backing'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Scale & Give Back',
      description: 'Successful founders post opportunities back to HUSE Circle, completing the loop.',
      color: '#05997F',
      features: [
        'Hire from your college',
        'Offer internships',
        'Share equity with builders',
        'Mentor next generation'
      ]
    }
  ];

  return (
    <section className="relative py-24 bg-[#111] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#24c6dc] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#24c6dc]/20 border border-[#8B5CF6]/30 mb-6">
            <Zap className="text-[#8B5CF6]" size={20} />
            <span className="text-white font-bold">The Student-to-Startup Pipeline</span>
          </div>
          <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-6">
            Your Journey from <span className="text-[#8B5CF6]">Student</span> to <span className="text-[#24c6dc]">Founder</span>
          </h2>
          <p className="text-gray-400 text-[18px] max-w-3xl mx-auto">
            HUSE Circle is the incubator. Dofracto is the accelerator. 
            One unified ecosystem supporting your entire entrepreneurial journey.
          </p>
        </motion.div>

        {/* Pipeline Stages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Connection Arrow (desktop) */}
              {index < stages.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 z-20">
                  <ArrowRight className="text-gray-600" size={24} />
                </div>
              )}

              <div 
                className="relative h-full bg-[#0a0a0a] border rounded-[20px] p-6 hover:scale-105 transition-all duration-300"
                style={{
                  borderColor: `${stage.color}30`
                }}
              >
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{
                    background: `${stage.color}20`
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#111] border-2 flex items-center justify-center text-white font-bold text-[14px]"
                    style={{ borderColor: stage.color }}
                  >
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-[15px] flex items-center justify-center mb-4"
                    style={{
                      background: `${stage.color}20`,
                      border: `1px solid ${stage.color}40`
                    }}
                  >
                    <stage.icon style={{ color: stage.color }} size={32} />
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-[20px] font-bold mb-3">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-[14px] mb-4 leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {stage.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-gray-500 text-[13px]">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: stage.color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cross-Platform Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 border border-[#8B5CF6]/30 rounded-[20px] p-6">
            <Users className="text-[#8B5CF6] mb-4" size={32} />
            <h3 className="text-white text-[18px] font-bold mb-2">Unified Reputation</h3>
            <p className="text-gray-400 text-[14px]">
              Your HUSE Circle reputation transfers to Dofracto, giving student founders a head start in the startup ecosystem.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 border border-[#F59E0B]/30 rounded-[20px] p-6">
            <Award className="text-[#F59E0B] mb-4" size={32} />
            <h3 className="text-white text-[18px] font-bold mb-2">Alumni Badges</h3>
            <p className="text-gray-400 text-[14px]">
              Startups born from HUSE Circle projects get special "HUSE Circle Alumni" badges, showcasing student innovation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#24c6dc]/10 to-[#05997F]/5 border border-[#24c6dc]/30 rounded-[20px] p-6">
            <Rocket className="text-[#24c6dc] mb-4" size={32} />
            <h3 className="text-white text-[18px] font-bold mb-2">Opportunity Loop</h3>
            <p className="text-gray-400 text-[14px]">
              Dofracto startups post gigs on HUSE Circle, creating a closed-loop ecosystem of opportunity and growth.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            onClick={() => navigate('/husecircle')}
            className="group bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white px-8 py-4 rounded-[15px] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all flex items-center gap-2"
          >
            Start in HUSE Circle
            <GraduationCap className="group-hover:scale-110 transition-transform" size={20} />
          </button>
          <button
            onClick={() => navigate('/dofracto/discover')}
            className="group bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-8 py-4 rounded-[15px] hover:shadow-[0_0_30px_rgba(36,198,220,0.5)] transition-all flex items-center gap-2"
          >
            Launch on Dofracto
            <Rocket className="group-hover:scale-110 transition-transform" size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
