import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CTASection() {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-24 bg-[#111] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#24c6dc]/10 via-[#05997F]/10 to-[#24c6dc]/10 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#24c6dc] rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div 
          className="bg-gradient-to-r from-[#0a0a0a] to-[#111] border-2 border-[#24c6dc]/30 rounded-[40px] p-12 md:p-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <motion.div 
            className="inline-flex p-4 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] mb-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="text-white" size={32} />
          </motion.div>

          {/* Heading */}
          <motion.h2 
            className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Ready to Transform Your Business?
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-gray-400 text-[18px] md:text-[20px] mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join thousands of businesses already growing on Dofracto. Start your 14-day free trial today, no credit card required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button 
              onClick={() => navigate('/user/login')}
              className="group bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-10 py-5 rounded-[15px] hover:shadow-[0_0_40px_rgba(36,198,220,0.6)] transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Start Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-transparent text-white px-10 py-5 rounded-[15px] border-2 border-white/20 hover:bg-white/5 transition-all w-full sm:w-auto"
            >
              Schedule a Demo
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-[#24c6dc]/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-white/60 text-[14px]">✓ No credit card required</div>
            </div>
            <div className="text-center">
              <div className="text-white/60 text-[14px]">✓ 14-day free trial</div>
            </div>
            <div className="text-center">
              <div className="text-white/60 text-[14px]">✓ Cancel anytime</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}