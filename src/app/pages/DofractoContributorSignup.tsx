import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Mail, Lock, User, Phone, GraduationCap, 
  ArrowRight, CheckCircle, Eye, EyeOff,
  Sparkles, Shield, Clock, Gift
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';

export function DofractoContributorSignup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAlumni = searchParams.get('alumni') === 'true';
  const plan = searchParams.get('plan') || 'annual';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isAlumni: isAlumni,
    alumniEmail: '',
    alumniId: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    if (formData.isAlumni && !formData.alumniEmail) {
      toast.error('Please provide your HUSE Circle alumni email');
      return;
    }

    // Success
    toast.success('Account created successfully!');

    // Redirect based on alumni status
    if (formData.isAlumni) {
      // Alumni - Free access
      setTimeout(() => {
        toast.success('🎓 Alumni status verified! Welcome to Dofracto.');
        navigate('/dofracto-builders-hub');
      }, 1500);
    } else {
      // Regular user - Start trial
      setTimeout(() => {
        toast.success('🎉 Your 7-day free trial has started!');
        navigate('/dofracto-builders-hub?trial=true');
      }, 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-full mb-6">
              {formData.isAlumni ? (
                <>
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium">HUSE Circle Alumni - FREE Access</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 text-sm font-medium">7-Day Free Trial</span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Create Your Account
            </h1>
            <p className="text-xl text-gray-400">
              {formData.isAlumni 
                ? 'Verify your alumni status and get FREE lifetime access'
                : 'Start your journey with Dofracto - No credit card required'
              }
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                    className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="w-full pl-12 pr-12 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="w-full pl-12 pr-12 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Alumni Checkbox */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAlumni}
                    onChange={(e) => setFormData({ ...formData, isAlumni: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-purple-500/30 bg-black/30 text-purple-500 focus:ring-purple-500/50"
                  />
                  <div>
                    <div className="text-white font-medium flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-400" />
                      I'm a HUSE Circle Alumni
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Get FREE lifetime access to Dofracto by verifying your alumni status
                    </p>
                  </div>
                </label>
              </div>

              {/* Alumni Verification Fields */}
              {formData.isAlumni && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 bg-purple-500/5 border border-purple-500/20 rounded-xl p-6"
                >
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    Alumni Verification
                  </h3>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">
                      HUSE Circle Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="alumniEmail"
                      value={formData.alumniEmail}
                      onChange={handleChange}
                      placeholder="your.name@husecircle.edu"
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                      required={formData.isAlumni}
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Student ID (Optional)
                    </label>
                    <input
                      type="text"
                      name="alumniId"
                      value={formData.alumniId}
                      onChange={handleChange}
                      placeholder="HC2024XXXX"
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                    <p className="text-sm text-purple-300">
                      ℹ️ We'll verify your alumni status within 24 hours. You'll receive an email confirmation.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Terms & Conditions */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/10 bg-black/30 text-cyan-500 focus:ring-cyan-500/50"
                  />
                  <div className="text-sm text-gray-400">
                    I agree to the{' '}
                    <button type="button" className="text-cyan-400 hover:underline">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button type="button" className="text-cyan-400 hover:underline">
                      Privacy Policy
                    </button>
                  </div>
                </label>
              </div>

              {/* Trial Info */}
              {!formData.isAlumni && (
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium mb-1">7-Day Free Trial</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>✓ Full access to browse all startups</li>
                        <li>✓ Company names hidden during trial</li>
                        <li>✓ Cannot contribute or bookmark</li>
                        <li>✓ No credit card required</li>
                        <li>✓ Cancel anytime</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {formData.isAlumni ? 'Create Account - FREE' : 'Start Free Trial'}
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Login Link */}
              <div className="text-center text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/dofracto-builder-login')}
                  className="text-cyan-400 hover:underline font-medium"
                >
                  Sign In
                </button>
              </div>
            </form>
          </motion.div>

          {/* Pricing Summary */}
          {!formData.isAlumni && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">After Your Trial</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${plan === 'annual' ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-white/5 border-white/10'}`}>
                    <div className="text-sm text-gray-400 mb-1">Annual Plan</div>
                    <div className="text-2xl font-bold text-white">₹399</div>
                    <div className="text-xs text-gray-500">₹33/month</div>
                  </div>
                  <div className={`p-4 rounded-xl border ${plan === 'monthly' ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-white/5 border-white/10'}`}>
                    <div className="text-sm text-gray-400 mb-1">Monthly Plan</div>
                    <div className="text-2xl font-bold text-white">₹49</div>
                    <div className="text-xs text-gray-500">per month</div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  You'll be prompted to choose a plan after your 7-day trial ends
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
