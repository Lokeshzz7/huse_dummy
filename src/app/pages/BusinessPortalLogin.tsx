import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Building2, AlertCircle, CheckCircle, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

// Demo business credentials
const BUSINESS_CREDENTIALS = {
  email: 'business@dofracto.com',
  password: 'business123'
};

export function BusinessPortalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    alert('Business account password reset.\n\nPlease contact Dofracto support or check your registered email.\n\nDemo credentials: business@dofracto.com / business123');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate credentials
    if (email === BUSINESS_CREDENTIALS.email && password === BUSINESS_CREDENTIALS.password) {
      setSuccess(true);
      // Store login state
      localStorage.setItem('userType', 'business');
      localStorage.setItem('userEmail', email);
      
      // Navigate to business dashboard
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 500);
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
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
        className="w-full max-w-[500px] relative z-10"
      >
        {/* Business Portal Badge */}
        <div className="flex justify-center mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] p-[2px] rounded-full"
          >
            <div className="bg-theme-elevated rounded-full px-6 py-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#24c6dc]" />
              <span className="text-theme-primary font-semibold">Dofracto Business Portal</span>
              <Rocket className="w-5 h-5 text-[#05997F]" />
            </div>
          </motion.div>
        </div>

        {/* Demo Credentials Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 bg-[#05997F]/10 border border-[#05997F]/30 rounded-xl p-4"
        >
          <p className="text-[#05997F] font-medium mb-2">📝 Demo Business Credentials:</p>
          <div className="space-y-1 text-theme-primary text-sm font-mono">
            <p>Email: <span className="text-[#24c6dc]">{BUSINESS_CREDENTIALS.email}</span></p>
            <p>Password: <span className="text-[#24c6dc]">{BUSINESS_CREDENTIALS.password}</span></p>
          </div>
        </motion.div>

        {/* Login Card */}
        <div className="bg-theme-card border border-theme-accent rounded-2xl p-8 shadow-theme-strong backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-theme-primary mb-2">Business Portal</h1>
            <p className="text-theme-tertiary">
              List and manage your business on Dofracto
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-green-400 text-sm">Login successful! Redirecting to your dashboard...</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="business-email" className="block text-theme-primary font-medium mb-2">
                Business Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                <input
                  id="business-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="business@company.com"
                  required
                  className="w-full bg-theme-secondary border border-theme-accent rounded-lg pl-12 pr-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] focus:ring-2 focus:ring-[#24c6dc]/20 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="business-password" className="block text-theme-primary font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                <input
                  id="business-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-theme-accent bg-theme-secondary text-[#24c6dc] focus:ring-[#24c6dc] focus:ring-offset-0"
                />
                <span className="text-theme-secondary text-sm">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#24c6dc] hover:text-[#05997F] transition-colors text-sm"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={success}
              className="w-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {success ? 'Signing In...' : 'Sign In to Business Portal'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-theme-secondary"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-theme-card text-theme-muted">or</span>
            </div>
          </div>

          {/* Sign Up CTA */}
          <div className="text-center">
            <p className="text-theme-tertiary text-sm mb-3">
              Don't have a business account?
            </p>
            <Link
              to="/business/register"
              className="inline-flex items-center gap-2 text-[#24c6dc] hover:text-[#05997F] transition-colors font-medium"
            >
              <Building2 className="w-4 h-4" />
              Register Your Business
            </Link>
          </div>

          {/* Other Logins */}
          <div className="mt-6 pt-6 border-t border-theme-secondary">
            <p className="text-center text-theme-muted text-sm mb-3">Access other portals:</p>
            <div className="flex gap-2">
              <Link
                to="/dofracto/builder/login"
                className="flex-1 text-center py-2 px-3 bg-theme-secondary border border-theme-secondary rounded-lg text-theme-secondary hover:border-[#24c6dc] hover:text-[#24c6dc] transition-all text-sm"
              >
                Contributors
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-r from-[#24c6dc]/10 to-[#05997F]/10 border border-theme-accent rounded-lg p-4"
        >
          <p className="text-theme-primary font-medium mb-2 text-center">✨ Business Portal Benefits</p>
          <ul className="space-y-1 text-theme-tertiary text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#24c6dc]" />
              List your business and opportunities
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#24c6dc]" />
              Connect with talented contributors
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#24c6dc]" />
              Manage applications and collaborations
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#24c6dc]" />
              Access growth analytics and insights
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