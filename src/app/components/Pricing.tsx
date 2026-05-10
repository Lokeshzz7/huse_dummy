import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: '0',
    period: 'Free Forever',
    description: 'Perfect for getting started',
    features: [
      'Basic business listing',
      'Up to 5 product listings',
      'Standard analytics',
      'Email support',
      'Community access'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Professional',
    price: '49',
    period: 'per month',
    description: 'Best for growing businesses',
    features: [
      'Premium business listing',
      'Unlimited product listings',
      'Advanced analytics & insights',
      'Priority support',
      'HUSE Circle access',
      'Featured placement',
      'Custom branding'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'Contact us',
    description: 'For large organizations',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'White-label options',
      'Advanced security',
      'SLA guarantee'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export function Pricing() {
  const navigate = useNavigate();

  const handlePlanClick = (planName: string) => {
    if (planName === 'Enterprise') {
      navigate('/contact');
    } else {
      navigate('/user-login');
    }
  };

  return (
    <section className="relative py-24 bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#24c6dc] rounded-full blur-[128px]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#05997F] rounded-full blur-[128px]" />
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
            Simple, <span className="text-[#24c6dc]">Transparent</span> Pricing
          </h2>
          <p className="text-gray-400 text-[18px] max-w-2xl mx-auto">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-[#111] rounded-[30px] p-8 border-2 transition-all duration-300 ${
                plan.popular 
                  ? 'border-[#24c6dc] shadow-[0_0_40px_rgba(36,198,220,0.2)]' 
                  : 'border-[#24c6dc]/20 hover:border-[#24c6dc]/50'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Sparkles size={16} />
                    <span className="font-bold">Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-white text-[28px] font-bold mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-[14px] mb-6">
                  {plan.description}
                </p>
                <div className="mb-2">
                  {plan.price === 'Custom' ? (
                    <div className="text-[48px] font-bold text-white">
                      {plan.price}
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-[24px] text-[#24c6dc]">$</span>
                      <span className="text-[48px] font-bold text-white">{plan.price}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-[14px]">{plan.period}</p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-[#05997F]/20">
                      <Check className="text-[#05997F]" size={16} />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button 
                onClick={() => handlePlanClick(plan.name)}
                className={`w-full py-4 rounded-[15px] font-bold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white hover:shadow-[0_0_30px_rgba(36,198,220,0.5)]'
                    : 'bg-[#0a0a0a] text-white border-2 border-[#24c6dc]/30 hover:bg-[#24c6dc]/10 hover:border-[#24c6dc]'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400">
            All plans include access to our support team. Need a custom solution?{' '}
            <button 
              onClick={() => navigate('/contact')}
              className="text-[#24c6dc] hover:underline"
            >
              Contact us
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}