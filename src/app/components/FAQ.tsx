import { motion } from 'motion/react';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    question: 'What is Dofracto?',
    answer: 'Dofracto is a startup discovery and collaboration ecosystem that connects founders, builders, and early supporters. Unlike traditional funding platforms, we enable direct participation through skill contribution, ownership discussions, and transparent collaboration — not pooled funds or securities.'
  },
  {
    question: 'How is Dofracto different from funding platforms?',
    answer: 'Dofracto is NOT a funding platform. We don\'t facilitate fund transfers, securities issuance, or equity crowdfunding. Instead, we enable discovery, contribution, and direct discussions between startups and participants. All ownership terms are discussed directly and finalized outside our platform.'
  },
  {
    question: 'What is the HUSE Circle?',
    answer: 'HUSE Circle is our talent network built on 4 pillars: Talent Network (discover builders by work, not resumes), Work Engine (complete gigs and earn reputation), Trusted Marketplace (verified commerce), and The Club (events, challenges, leaderboards). It\'s where your work speaks and opportunities unlock.'
  },
  {
    question: 'How does skill-for-ownership work?',
    answer: 'Startups on Dofracto can reward verified contributions (design, development, marketing, etc.) with ownership-based participation. Terms are optional, mutually agreed, and documented independently between you and the startup — Dofracto simply facilitates the discovery and discussion.'
  },
  {
    question: 'Is Dofracto regulated or audited?',
    answer: 'No. Dofracto is a neutral platform for discovery and collaboration. We do not audit startups, guarantee outcomes, or act as a broker. All participation decisions are the user\'s responsibility under applicable laws. We provide verification tools, but final due diligence is yours.'
  },
  {
    question: 'Can I contribute skills and get paid too?',
    answer: 'Absolutely! In HUSE Circle\'s Work Engine, you can complete both paid gigs and reputation-based work. Builders earn money, reputation points, and access to higher tiers — creating a complete ecosystem for talent growth.'
  },
  {
    question: 'What kind of startups are listed?',
    answer: 'Startups at all stages — Idea, MVP, or Revenue. Each listing shows the problem/solution, current stage, participation requirements (capital range, skills needed, advisory support), and progress updates. You discover by alignment, not just pitch decks.'
  },
  {
    question: 'How do I get started?',
    answer: 'Sign up to explore startups or join HUSE Circle to build your talent profile. If you\'re a founder, list your startup with participation requirements. For builders, complete tasks to earn reputation and unlock opportunities. It\'s free to start!'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-4">
            Frequently Asked <span className="text-[#24c6dc]">Questions</span>
          </h2>
          <p className="text-gray-400 text-[18px]">
            Everything you need to know about Dofracto
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[#111] rounded-[20px] border border-[#24c6dc]/20 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[#24c6dc]/5 transition-colors"
              >
                <span className="text-white text-[18px] font-bold pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 p-1 rounded-full bg-[#24c6dc]/10 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  {openIndex === index ? (
                    <Minus className="text-[#24c6dc]" size={20} />
                  ) : (
                    <Plus className="text-[#24c6dc]" size={20} />
                  )}
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12 p-8 bg-[#111] rounded-[20px] border border-[#24c6dc]/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-300 mb-4">
            Still have questions?
          </p>
          <p className="text-gray-400 mb-6">
            Our team is here to help you get started
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-8 py-3 rounded-[15px] hover:shadow-[0_0_20px_rgba(36,198,220,0.4)] transition-all"
          >
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}