import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechVision Inc.',
    content: 'Dofracto has transformed how we connect with clients. The platform is intuitive, powerful, and has significantly increased our visibility in the market.',
    rating: 5,
    image: '🏢'
  },
  {
    name: 'Michael Chen',
    role: 'Founder, HealthCare Plus',
    content: 'The HUSE Circle has been invaluable for networking. I\'ve made connections that have directly contributed to our business growth.',
    rating: 5,
    image: '⚕️'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Director, FinanceHub',
    content: 'Best decision we made this year. The analytics and insights have helped us understand our market better and optimize our approach.',
    rating: 5,
    image: '💼'
  }
];

export function Testimonials() {
  return (
    <section className="relative py-24 bg-[#111]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#05997F] rounded-full blur-[128px]" />
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
            What Our <span className="text-[#24c6dc]">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-[18px] max-w-2xl mx-auto">
            Don't just take our word for it - hear from businesses that are thriving on Dofracto
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative bg-[#0a0a0a] rounded-[20px] border border-[#24c6dc]/20 p-8 hover:border-[#24c6dc]/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 text-[#24c6dc]/10" size={48} />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center text-[24px]">
                  {testimonial.image}
                </div>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-gray-400 text-[14px]">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
