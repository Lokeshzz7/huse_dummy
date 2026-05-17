import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Copy, Check, UserPlus, Building2, Crown, 
  GraduationCap, ArrowRight, Mail, Lock,
  Shield, Star, Zap, FileText
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';

export function DemoCredentials() {
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contributorAccounts = [
    {
      email: 'akhil.sharma@gmail.com',
      password: 'demo123',
      name: 'Akhil Sharma',
      role: 'Tech Contributor',
      reputation: 3500,
      tier: 'Gold',
      avatar: '👨‍💻',
      description: 'Senior developer with expertise in fintech startups'
    },
    {
      email: 'priya.singh@gmail.com',
      password: 'demo123',
      name: 'Priya Singh',
      role: 'Marketing Builder',
      reputation: 1200,
      tier: 'Silver',
      avatar: '👩‍💼',
      description: 'Digital marketing specialist focused on SaaS growth'
    },
    {
      email: 'rohan.patel@gmail.com',
      password: 'demo123',
      name: 'Rohan Patel',
      role: 'Design Contributor',
      reputation: 14000,
      tier: 'Platinum',
      avatar: '🎨',
      description: 'UI/UX designer with product design experience'
    }
  ];

  const businessAccounts = [
    {
      email: 'business@dofracto.com',
      password: 'business123',
      name: 'PayFlow (FinTech Startup)',
      type: 'Business Portal',
      stage: 'Seed',
      avatar: '💳',
      description: 'Payment solutions startup with active campaigns'
    }
  ];

  const adminAccounts = [
    {
      email: 'admin@dofracto.com',
      password: 'admin123',
      name: 'Dofracto Admin',
      type: 'Platform Admin',
      avatar: '⚙️',
      description: 'Full admin access to manage platform'
    }
  ];

  const quotifyAccounts = [
    {
      email: 'client@quotify.com',
      password: 'demo123',
      name: 'Sarah Chen',
      role: 'Client',
      company: 'TechStart Inc.',
      avatar: '👩‍💼',
      description: 'Request quotes from ecosystem partners'
    },
    {
      email: 'provider@quotify.com',
      password: 'demo123',
      name: 'Mike Chen',
      role: 'Service Provider',
      company: 'QuotePro Services',
      tier: 'Platinum',
      reputation: 12000,
      avatar: '⚡',
      description: 'Submit quotes and earn reputation'
    }
  ];

  const huseAccounts = [
    {
      email: 'bronze@huse.in',
      password: 'demo123',
      name: 'Rohit Gupta',
      role: 'Student',
      college: 'BITS Pilani',
      tier: 'Bronze',
      reputation: 350,
      year: '2nd Year',
      avatar: '🎓',
      description: 'New student learning and building foundational skills'
    },
    {
      email: 'arjun@iitb.ac.in',
      password: 'demo123',
      name: 'Arjun Kumar',
      role: 'Student',
      college: 'IIT Bombay',
      tier: 'Silver',
      reputation: 1200,
      year: '3rd Year',
      avatar: '👨‍💻',
      description: 'CS student building projects and gaining experience'
    },
    {
      email: 'gold@huse.in',
      password: 'demo123',
      name: 'Neha Joshi',
      role: 'Student',
      college: 'IIT Kanpur',
      tier: 'Gold',
      reputation: 5500,
      year: '4th Year',
      avatar: '⭐',
      description: 'Experienced student with access to premium features'
    },
    {
      email: 'sarah@iitm.ac.in',
      password: 'demo123',
      name: 'Sarah Chen',
      role: 'Student',
      college: 'IIT Madras',
      tier: 'Platinum',
      reputation: 15000,
      year: '4th Year',
      avatar: '💎',
      description: 'Top performer with access to all premium features'
    },
    {
      email: 'contributor@huse.in',
      password: 'demo123',
      name: 'Aditya Patel',
      role: 'Alumni',
      college: 'IIT Bombay',
      tier: 'Contributor',
      reputation: 45000,
      year: 'Alumni',
      avatar: '💼',
      description: 'Paid contributor with unlimited quote submissions'
    },
    {
      email: 'business@huse.in',
      password: 'demo123',
      name: 'Kavya Reddy',
      role: 'Business Owner',
      college: 'IIT Alumni',
      tier: 'Business Owner',
      reputation: 180000,
      year: 'Alumni',
      avatar: '🚀',
      description: 'Enterprise tier with custom pricing and priority access'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-full mb-6">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Demo Credentials</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Test the Platform
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Use these demo accounts to explore Dofracto's features without signing up
            </p>
          </motion.div>

          {/* Quick Access Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto"
          >
            <button
              onClick={() => navigate('/husecircle/student/login')}
              className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all group"
            >
              <GraduationCap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-bold">HUSE Circle</div>
              <div className="text-sm text-gray-400">6 tiers</div>
            </button>

            <button
              onClick={() => navigate('/dofracto/builder/login')}
              className="p-4 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-xl hover:border-cyan-500/50 transition-all group"
            >
              <UserPlus className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-white font-bold">Contributor</div>
              <div className="text-sm text-gray-400">3 accounts</div>
            </button>

            <button
              onClick={() => navigate('/business/login')}
              className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl hover:border-blue-500/50 transition-all group"
            >
              <Building2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-bold">Business</div>
              <div className="text-sm text-gray-400">1 account</div>
            </button>

            <button
              onClick={() => navigate('/admin/login')}
              className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl hover:border-amber-500/50 transition-all group"
            >
              <Crown className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-white font-bold">Admin</div>
              <div className="text-sm text-gray-400">1 account</div>
            </button>
          </motion.div>

          {/* Contributor Accounts */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <UserPlus className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold text-white">Contributor Accounts</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {contributorAccounts.map((account, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all"
                  >
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-3">{account.avatar}</div>
                      <h3 className="text-xl font-bold text-white mb-1">{account.name}</h3>
                      <div className="text-sm text-gray-400 mb-2">{account.role}</div>
                      <div className="flex items-center justify-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          account.tier === 'Platinum' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                          account.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {account.tier}
                        </span>
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-medium">
                          {account.reputation} rep
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 text-center mb-6">
                      {account.description}
                    </p>

                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.email, `email-${index}`)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedField === `email-${index}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono break-all">{account.email}</div>
                      </div>

                      <div className="bg-black/30 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Lock className="w-4 h-4" />
                            <span>Password</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.password, `pass-${index}`)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedField === `pass-${index}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono">{account.password}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/dofracto/builder/login')}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      Login as {account.name.split(' ')[0]}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Business Accounts */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-cyan-400" />
                <h2 className="text-3xl font-bold text-white">Business Account</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                {businessAccounts.map((account, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">{account.avatar}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{account.name}</h3>
                      <div className="text-sm text-gray-400 mb-3">{account.type}</div>
                      <span className="px-4 py-1.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-sm font-medium">
                        {account.stage} Stage
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 text-center mb-6">
                      {account.description}
                    </p>

                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.email, 'business-email')}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedField === 'business-email' ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono">{account.email}</div>
                      </div>

                      <div className="bg-black/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Lock className="w-4 h-4" />
                            <span>Password</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.password, 'business-pass')}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedField === 'business-pass' ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono">{account.password}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/business/login')}
                      className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      Login to Business Portal
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Admin Account */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-6 h-6 text-amber-400" />
                <h2 className="text-3xl font-bold text-white">Admin Account</h2>
              </div>

              <div className="max-w-2xl">
                {adminAccounts.map((account, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-500/30 transition-all"
                  >
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">{account.avatar}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{account.name}</h3>
                      <div className="text-sm text-gray-400 mb-3">{account.type}</div>
                      <span className="px-4 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-sm font-medium">
                        Full Access
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 text-center mb-6">
                      {account.description}
                    </p>

                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.email, 'admin-email')}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedField === 'admin-email' ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono">{account.email}</div>
                      </div>

                      <div className="bg-black/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Lock className="w-4 h-4" />
                            <span>Password</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.password, 'admin-pass')}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedField === 'admin-pass' ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono">{account.password}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/admin/login')}
                      className="w-full mt-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      Login to Admin Panel
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* HUSE Circle Accounts */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold text-white">HUSE Circle Accounts</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {huseAccounts.map((account, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all"
                  >
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-3">{account.avatar}</div>
                      <h3 className="text-xl font-bold text-white mb-1">{account.name}</h3>
                      <div className="text-sm text-gray-400 mb-2">{account.college}</div>
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          account.tier === 'Business Owner' ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300 border border-purple-400/50' :
                          account.tier === 'Contributor' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          account.tier === 'Platinum' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                          account.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          account.tier === 'Silver' ? 'bg-gray-400/20 text-gray-300 border border-gray-400/30' :
                          'bg-orange-700/20 text-orange-400 border border-orange-700/30'
                        }`}>
                          {account.tier}
                        </span>
                        <span className="px-3 py-1 bg-pink-500/20 text-pink-400 border border-pink-500/30 rounded-full text-xs font-medium">
                          {account.reputation.toLocaleString()} rep
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{account.year} • {account.role}</div>
                    </div>

                    <p className="text-sm text-gray-500 text-center mb-6">
                      {account.description}
                    </p>

                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.email, `huse-email-${index}`)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedField === `huse-email-${index}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono break-all">{account.email}</div>
                      </div>

                      <div className="bg-black/30 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Lock className="w-4 h-4" />
                            <span>Password</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.password, `huse-pass-${index}`)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedField === `huse-pass-${index}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono">{account.password}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/husecircle/student/login')}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      Login as {account.name.split(' ')[0]}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Quotify Accounts */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-blue-400" />
                <h2 className="text-3xl font-bold text-white">Quotify Accounts</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                {quotifyAccounts.map((account, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
                  >
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-3">{account.avatar}</div>
                      <h3 className="text-xl font-bold text-white mb-1">{account.name}</h3>
                      <div className="text-sm text-gray-400 mb-2">{account.role}</div>
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {account.tier && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            {account.tier}
                          </span>
                        )}
                        {account.reputation && (
                          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-medium">
                            {account.reputation} rep
                          </span>
                        )}
                      </div>
                      {account.company && (
                        <div className="text-xs text-gray-500 mt-2">{account.company}</div>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 text-center mb-6">
                      {account.description}
                    </p>

                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.email, `quotify-email-${index}`)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedField === `quotify-email-${index}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono break-all">{account.email}</div>
                      </div>

                      <div className="bg-black/30 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Lock className="w-4 h-4" />
                            <span>Password</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.password, `quotify-pass-${index}`)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedField === `quotify-pass-${index}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono">{account.password}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/quotify/login')}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      Login as {account.name.split(' ')[0]}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center"
          >
            <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Quick Testing</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These demo accounts are pre-configured with realistic data. Feel free to explore all features, 
              make changes, and test the platform. All changes are temporary and reset automatically.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}