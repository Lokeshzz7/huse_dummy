import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, Shield, AlertCircle, CheckCircle, Crown } from 'lucide-react';
import { motion } from 'motion/react';


export function SuperAdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { login, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    alert('Super Admin password reset requires maximum security verification.\n\nPlease contact the HUSE system administrator.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const user = await login({ email, password, platform: 'huse' });
      if (user) {
        if (user.role === 'admin') {
          setSuccess(true);
          setTimeout(() => {
            navigate('/super-admin-dashboard');
          }, 500);
        } else {
          await logout();
          setError('Invalid credentials. Super Admin access denied.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-primary pt-[70px] flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#24c6dc] rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#B66FDE] rounded-full blur-[150px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[500px] relative z-10"
      >
        {/* Super Admin Badge */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(36, 198, 220, 0.3)',
                '0 0 40px rgba(182, 111, 222, 0.4)',
                '0 0 20px rgba(36, 198, 220, 0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-gradient-to-r from-[#24c6dc] via-[#B66FDE] to-[#3B82F6] p-[2px] rounded-full"
          >
            <div className="bg-theme-elevated rounded-full px-6 py-3 flex items-center gap-2">
              <Crown className="w-6 h-6 text-[#FFD700]" />
              <span className="text-theme-primary font-semibold">HUSE Super Admin</span>
            </div>
          </motion.div>
        </div>


        {/* Login Card */}
        <div className="bg-theme-card border border-theme-accent rounded-2xl p-8 shadow-theme-strong backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-theme-primary mb-2">Super Admin Portal</h1>
            <p className="text-theme-tertiary">
              Manage entire HUSE ecosystem
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-theme-muted">
              <Shield className="w-4 h-4" />
              <span>Dofracto • HUSE Circle • Quotify</span>
            </div>
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
              <p className="text-green-400 text-sm">Login successful! Redirecting to Super Admin Dashboard...</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="admin-email" className="block text-theme-primary font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="superadmin@huse.com"
                  required
                  className="w-full bg-theme-secondary border border-theme-accent rounded-lg pl-12 pr-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] focus:ring-2 focus:ring-[#24c6dc]/20 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="admin-password" className="block text-theme-primary font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                <input
                  id="admin-password"
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

            <button
              type="submit"
              disabled={success || loading}
              className="w-full bg-gradient-to-r from-[#24c6dc] via-[#B66FDE] to-[#3B82F6] text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : (success ? 'Signing In...' : 'Access Super Admin Portal')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-theme-secondary"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-theme-card text-theme-muted">Maximum Security Access</span>
            </div>
          </div>

          {/* Other Portals */}
          <div className="space-y-2">
            <p className="text-center text-theme-tertiary text-sm mb-3">Access other portals:</p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/business-portal-login"
                className="text-center py-2 px-3 bg-theme-secondary border border-theme-secondary rounded-lg text-theme-secondary hover:border-[#24c6dc] hover:text-[#24c6dc] transition-all text-sm"
              >
                Business Portal
              </Link>
              <Link
                to="/user-login"
                className="text-center py-2 px-3 bg-theme-secondary border border-theme-secondary rounded-lg text-theme-secondary hover:border-[#24c6dc] hover:text-[#24c6dc] transition-all text-sm"
              >
                User Login
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-r from-[#24c6dc]/10 to-[#B66FDE]/10 border border-theme-accent rounded-lg p-4 text-center"
        >
          <p className="text-theme-tertiary text-sm">
            🔒 Super Admin portal controls all three HUSE platforms with highest security
          </p>
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
