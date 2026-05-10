import { Facebook, Twitter, Linkedin, Instagram, Mail, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const footerLinks = {
  product: [
    { label: 'HUSE Circle', href: '/huse-circle' },
    { label: 'Dofracto', href: '/dofracto' },
    { label: 'Quotify', href: '/quotify' },
    { label: 'Challenges & Events', href: '/huse-circle#challenges' },
    { label: 'Reputation System', href: '/huse-circle#reputation' }
  ],
  company: [
    { label: 'About Ecosystem', href: '/#about' },
    { label: 'Student-to-Startup Pipeline', href: '/#pipeline' },
    { label: 'Success Stories', href: '/#success-stories' },
    { label: 'Careers', href: '/#careers' },
    { label: 'Blog', href: '/#blog' }
  ],
  support: [
    { label: 'Help Center', href: '/#help' },
    { label: 'Community Guidelines', href: '/#guidelines' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Platform Status', href: '/#status' },
    { label: 'FAQs', href: '/#faqs' }
  ]
};

export function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [adminClicks, setAdminClicks] = useState(0);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription
      console.log('Subscribed:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleAdminAccess = () => {
    setAdminClicks(prev => prev + 1);
    if (adminClicks + 1 >= 5) {
      navigate('/super-admin-login');
      setAdminClicks(0);
    }
  };

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-[#24c6dc]/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#24c6dc] via-[#B66FDE] to-[#3B82F6] bg-clip-text text-transparent mb-4">
              HUSE Ecosystem
            </h2>
            <p className="text-gray-400 mb-6 max-w-sm">
              From Dorm Room to Boardroom. Empowering students on HUSE Circle, accelerating startups on Dofracto, and connecting everyone on Quotify—one powerful ecosystem.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[10px] bg-[#111] border border-[#24c6dc]/20 text-gray-400 hover:text-[#24c6dc] hover:border-[#24c6dc]/50 transition-all"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[10px] bg-[#111] border border-[#24c6dc]/20 text-gray-400 hover:text-[#24c6dc] hover:border-[#24c6dc]/50 transition-all"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[10px] bg-[#111] border border-[#24c6dc]/20 text-gray-400 hover:text-[#24c6dc] hover:border-[#24c6dc]/50 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[10px] bg-[#111] border border-[#24c6dc]/20 text-gray-400 hover:text-[#24c6dc] hover:border-[#24c6dc]/50 transition-all"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-[#24c6dc] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-[#24c6dc] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-[#24c6dc] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-b border-[#24c6dc]/20 py-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white text-[24px] font-bold mb-2">
              Join the Ecosystem
            </h3>
            <p className="text-gray-400 mb-6">
              Get updates on new challenges, events, and opportunities across HUSE Circle, Dofracto, and Quotify
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#111] border border-[#24c6dc]/30 rounded-[10px] pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:border-[#24c6dc] focus:outline-none transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-[10px] hover:shadow-[0_0_20px_rgba(36,198,220,0.4)] transition-all"
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p className="text-center">&copy; {new Date().getFullYear()} HUSE. All rights reserved.</p>
          {/* Hidden Admin Access - Click 5 times */}
          <button
            onClick={handleAdminAccess}
            className="mt-2 text-[10px] text-gray-700 hover:text-gray-600 transition-colors"
            title="Admin Access"
          >
            •
          </button>
          {adminClicks > 0 && adminClicks < 5 && (
            <p className="text-xs text-gray-600 mt-1">
              {5 - adminClicks} more clicks for admin access
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}