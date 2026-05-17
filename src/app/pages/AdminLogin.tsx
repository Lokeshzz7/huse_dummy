import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

// Dummy admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@dofracto.com',
  password: 'admin123'
};

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    alert('Admin password reset requires additional security verification.\nPlease contact the system administrator.\n\nDemo credentials: admin@dofracto.com / admin123');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setSuccess(true);
      // Store login state (in real app, use proper auth)
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('userEmail', email);
      
      // Navigate to admin dashboard
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 500);
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-[70px] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[500px]"
      >
        {/* Admin Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] p-[2px] rounded-full">
            <div className="bg-[#111] rounded-full px-6 py-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#24c6dc]" />
              <span className="text-white">Admin Portal</span>
            </div>
          </div>
        </div>

        {/* Demo Credentials Notice */}
        <div className="mb-4 bg-[#05997F]/10 border border-[#05997F]/30 rounded-lg p-4">
          <p className="text-[#05997F] text-sm mb-2">📝 Demo Credentials:</p>
          <div className="space-y-1 text-white text-sm font-mono">
            <p>Email: <span className="text-[#24c6dc]">{ADMIN_CREDENTIALS.email}</span></p>
            <p>Password: <span className="text-[#24c6dc]">{ADMIN_CREDENTIALS.password}</span></p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#111] border border-[#24c6dc]/20 rounded-2xl p-8">
          <h1 className="text-white text-center mb-2">Admin Login</h1>
          <p className="text-gray-400 text-center mb-8">
            Access your administrative dashboard
          </p>

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
              <p className="text-green-400 text-sm">Login successful! Redirecting...</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="admin-email" className="block text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dofracto.com"
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#24c6dc] transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="admin-password" className="block text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg pl-12 pr-12 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#24c6dc] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#24c6dc] transition-colors"
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
                  className="w-4 h-4 rounded border-[#24c6dc]/30 bg-black text-[#24c6dc] focus:ring-[#24c6dc] focus:ring-offset-0"
                />
                <span className="text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#24c6dc] hover:text-[#05997F] transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={success}
              className="w-full bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {success ? 'Signing In...' : 'Sign In to Admin Portal'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#24c6dc]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#111] text-gray-400">Admin Access Only</span>
            </div>
          </div>

          {/* Switch to User Login */}
          <p className="text-center text-gray-400">
            Not an admin?{' '}
            <Link
              to="/user/login"
              className="text-[#24c6dc] hover:text-[#05997F] transition-colors"
            >
              Login as User
            </Link>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-[#24c6dc]/10 border border-[#24c6dc]/20 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">
            🔒 Admin portal is protected with advanced security measures
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-gray-400 hover:text-[#24c6dc] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}