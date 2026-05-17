import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, User, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useEcosystem } from '../context/EcosystemContext';
import { toast } from 'sonner';

// Dummy user credentials - now mapped to ecosystem users
const USER_OPTIONS = [
  { email: 'alex@example.com', type: 'student' as const, name: 'Alex Chen (Student)' },
  { email: 'sarah@techvision.co', type: 'startup' as const, name: 'Sarah Johnson (Startup)' },
  { email: 'public@example.com', type: 'public' as const, name: 'Public User' }
];

export function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedType, setSelectedType] = useState<'student' | 'startup' | 'public'>('public');
  const navigate = useNavigate();
  const { login } = useEcosystem();

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email.\nThis is a demo - please use the provided credentials.');
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login would redirect to ${provider}'s authentication.\nThis is a demo feature.`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // For demo, password is always 'demo123'
    if (password !== 'demo123') {
      setError('Invalid credentials. Use password: demo123');
      return;
    }

    // Attempt login with ecosystem
    const user = await login(email, password, selectedType);
    
    if (user) {
      setSuccess(true);
      toast.success('Welcome back!', {
        description: `Logged in as ${user.name}`,
        duration: 3000
      });
      
      // Navigate based on user type
      setTimeout(() => {
        if (user.type === 'student') {
          navigate('/husecircle/student/platform');
        } else if (user.type === 'startup') {
          navigate('/dofracto/discover');
        } else {
          navigate('/quotify');
        }
      }, 1000);
    } else {
      setError('Invalid credentials. Please check your email and user type.');
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
        {/* User Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] p-[2px] rounded-full">
            <div className="bg-[#111] rounded-full px-6 py-2 flex items-center gap-2">
              <User className="w-5 h-5 text-[#24c6dc]" />
              <span className="text-white">User Portal</span>
            </div>
          </div>
        </div>

        {/* Demo Credentials Notice */}
        <div className="mb-4 bg-[#24c6dc]/10 border border-[#24c6dc]/30 rounded-lg p-4">
          <p className="text-[#24c6dc] text-sm mb-2">📝 Demo Credentials:</p>
          <div className="space-y-1 text-white text-sm font-mono">
            {USER_OPTIONS.map(user => (
              <div key={user.email} className="flex items-center justify-between">
                <p>
                  Email: <span className="text-[#05997F]">{user.email}</span>
                </p>
                <button
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('demo123');
                    setSelectedType(user.type);
                  }}
                  className="px-2 py-1 bg-[#05997F]/20 text-[#05997F] text-xs rounded hover:bg-[#05997F]/30 transition-colors"
                >
                  Fill
                </button>
              </div>
            ))}
            <p className="mt-2">Password: <span className="text-[#F59E0B]">demo123</span> (for all users)</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#111] border border-[#24c6dc]/20 rounded-2xl p-8">
          <h1 className="text-white text-center mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-center mb-8">
            Sign in to access your dashboard
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
              <label htmlFor="user-email" className="block text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="user-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#24c6dc] transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="user-password" className="block text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="user-password"
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
              {success ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#24c6dc]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#111] text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="bg-black border border-[#24c6dc]/30 text-white py-3 rounded-lg hover:border-[#24c6dc] transition-colors"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('LinkedIn')}
              className="bg-black border border-[#24c6dc]/30 text-white py-3 rounded-lg hover:border-[#24c6dc] transition-colors"
            >
              LinkedIn
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-[#24c6dc] hover:text-[#05997F] transition-colors"
            >
              Sign Up
            </Link>
          </p>

          {/* Admin Login Link */}
          <p className="text-center text-gray-400 mt-3">
            Admin?{' '}
            <Link
              to="/admin/login"
              className="text-[#24c6dc] hover:text-[#05997F] transition-colors"
            >
              Login Here
            </Link>
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