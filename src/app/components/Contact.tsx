import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#24c6dc] rounded-full blur-[128px]" />
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
            Get in <span className="text-[#24c6dc]">Touch</span>
          </h2>
          <p className="text-gray-400 text-[18px] max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-[28px] font-bold text-white mb-6">
                Contact Information
              </h3>
              <p className="text-gray-400 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-[15px] bg-[#24c6dc]/10">
                  <Mail className="text-[#24c6dc]" size={24} />
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Email</div>
                  <div className="text-gray-400">support@dofracto.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-[15px] bg-[#24c6dc]/10">
                  <Phone className="text-[#24c6dc]" size={24} />
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Phone</div>
                  <div className="text-gray-400">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-[15px] bg-[#24c6dc]/10">
                  <MapPin className="text-[#24c6dc]" size={24} />
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Office</div>
                  <div className="text-gray-400">123 Business Ave, Tech City, TC 12345</div>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="pt-8 border-t border-[#24c6dc]/20">
              <div className="text-gray-400 mb-4">Trusted by leading businesses</div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-[10px] bg-[#111] border border-[#24c6dc]/20 text-white">
                  24/7 Support
                </div>
                <div className="px-4 py-2 rounded-[10px] bg-[#111] border border-[#24c6dc]/20 text-white">
                  Fast Response
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-[#111] rounded-[20px] border border-[#24c6dc]/20 p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[10px] px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#24c6dc] focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[10px] px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#24c6dc] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[10px] px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#24c6dc] focus:outline-none transition-colors"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[10px] px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#24c6dc] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-8 py-4 rounded-[15px] hover:shadow-[0_0_30px_rgba(36,198,220,0.5)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message'}
                  {!isSubmitting && !submitted && <Send className="group-hover:translate-x-1 transition-transform" size={20} />}
                </button>
                
                {submitted && (
                  <div className="text-center text-green-400 text-sm mt-2">
                    Thank you! We'll get back to you within 24 hours.
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}