import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function BusinessPortalRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    email: '',
    phone: '',
    contactPerson: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const categories = [
    'Technology',
    'Finance',
    'Healthcare',
    'E-commerce',
    'Education',
    'Real Estate',
    'Manufacturing',
    'Consulting',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Registration logic here
      alert('Business registration successful!\n\nYour account is being reviewed and will be activated within 24 hours.');
      navigate('/business-portal-login');
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-theme-primary pt-[70px] flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#24c6dc] rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#05997F] rounded-full blur-[150px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[600px] relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] mb-4"
          >
            <Building2 className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-theme-primary mb-2">Register Your Business</h1>
          <p className="text-theme-tertiary">Join Dofracto and connect with talented contributors</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#24c6dc] text-white' : 'bg-theme-secondary text-theme-muted'}`}>
              1
            </div>
            <span className="text-sm text-theme-secondary">Business Info</span>
          </div>
          <div className="w-12 h-0.5 bg-theme-secondary" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#24c6dc] text-white' : 'bg-theme-secondary text-theme-muted'}`}>
              2
            </div>
            <span className="text-sm text-theme-secondary">Account Details</span>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-theme-card border border-theme-accent rounded-2xl p-8 shadow-theme-strong backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                {/* Step 1: Business Information */}
                <div>
                  <label className="block text-theme-primary font-medium mb-2">
                    Business Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => updateField('businessName', e.target.value)}
                      placeholder="Your Company Name"
                      required
                      className="w-full bg-theme-secondary border border-theme-accent rounded-lg pl-12 pr-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] focus:ring-2 focus:ring-[#24c6dc]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-theme-primary font-medium mb-2">
                    Business Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    required
                    className="w-full bg-theme-secondary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary focus:outline-none focus:border-[#24c6dc] focus:ring-2 focus:ring-[#24c6dc]/20 transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-theme-primary font-medium mb-2">
                    Contact Person Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => updateField('contactPerson', e.target.value)}
                      placeholder="Full Name"
                      required
                      className="w-full bg-theme-secondary border border-theme-accent rounded-lg pl-12 pr-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] focus:ring-2 focus:ring-[#24c6dc]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-theme-primary font-medium mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="w-full bg-theme-secondary border border-theme-accent rounded-lg pl-12 pr-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] focus:ring-2 focus:ring-[#24c6dc]/20 transition-all"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Account Details */}
                <div>
                  <label className="block text-theme-primary font-medium mb-2">
                    Business Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="contact@company.com"
                      required
                      className="w-full bg-theme-secondary border border-theme-accent rounded-lg pl-12 pr-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] focus:ring-2 focus:ring-[#24c6dc]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-theme-primary font-medium mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      placeholder="Create a strong password"
                      required
                      className="w-full bg-theme-secondary border border-theme-accent rounded-lg pl-12 pr-12 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] focus:ring-2 focus:ring-[#24c6dc]/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-[#24c6dc] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-theme-primary font-medium mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                      required
                      className="w-full bg-theme-secondary border border-theme-accent rounded-lg pl-12 pr-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] focus:ring-2 focus:ring-[#24c6dc]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => updateField('agreeTerms', e.target.checked)}
                      required
                      className="mt-1 w-4 h-4 rounded border-theme-accent bg-theme-secondary text-[#24c6dc] focus:ring-[#24c6dc] focus:ring-offset-0"
                    />
                    <span className="text-sm text-theme-secondary">
                      I agree to the{' '}
                      <Link to="/terms" className="text-[#24c6dc] hover:text-[#05997F]">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-[#24c6dc] hover:text-[#05997F]">Privacy Policy</Link>
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-theme-secondary text-theme-primary rounded-lg hover:bg-theme-tertiary transition-all"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all flex items-center justify-center gap-2"
              >
                {step === 1 ? (
                  <>
                    Next Step
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Complete Registration
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Already have account */}
          <div className="mt-6 pt-6 border-t border-theme-secondary text-center">
            <p className="text-theme-tertiary text-sm">
              Already have an account?{' '}
              <Link
                to="/business-portal-login"
                className="text-[#24c6dc] hover:text-[#05997F] transition-colors font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-r from-[#24c6dc]/10 to-[#05997F]/10 border border-theme-accent rounded-lg p-6"
        >
          <h3 className="text-theme-primary font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#24c6dc]" />
            Why Register on Dofracto?
          </h3>
          <ul className="space-y-2 text-theme-tertiary text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#24c6dc] mt-1">•</span>
              <span>Access to a network of talented contributors and builders</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#24c6dc] mt-1">•</span>
              <span>Showcase your business opportunities to the right audience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#24c6dc] mt-1">•</span>
              <span>Growth analytics and insights to track your success</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#24c6dc] mt-1">•</span>
              <span>Integrated with HUSE Circle for student talent discovery</span>
            </li>
          </ul>
        </motion.div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-theme-tertiary hover:text-[#24c6dc] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
