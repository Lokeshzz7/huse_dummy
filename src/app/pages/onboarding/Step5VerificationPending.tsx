import { motion } from 'motion/react';
import { Clock, ShieldCheck, Mail, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function Step5VerificationPending() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/husecircle/student/login');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-[#111] border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full -ml-16 -mb-16" />

        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-purple-500/30">
            <Clock className="w-10 h-10 text-purple-400 animate-pulse" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Verification Pending
          </h2>
          
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Great job, <span className="text-purple-400 font-semibold">{user?.name}</span>! Your documents and payment have been received. 
            Our admins are now reviewing your profile to ensure everything is in order.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <ShieldCheck className="w-5 h-5 text-green-400 mb-2" />
              <h4 className="text-white font-semibold text-sm mb-1">Status</h4>
              <p className="text-gray-500 text-xs">Under Review</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <Mail className="w-5 h-5 text-blue-400 mb-2" />
              <h4 className="text-white font-semibold text-sm mb-1">Notification</h4>
              <p className="text-gray-500 text-xs">Email will be sent</p>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mb-10">
            <p className="text-sm text-purple-300 italic">
              "Verification typically takes 24-48 hours. Once approved, you'll get full access to the HUSE Circle network, Gigs, and Marketplace."
            </p>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleLogout}
              className="px-10 py-4 bg-white/5 text-gray-300 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" /> Sign Out from HUSE Circle
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-8 text-sm flex items-center justify-center gap-2">
        Need help? Contact <a href="mailto:support@huse.in" className="text-purple-400 hover:underline">support@huse.in</a>
      </p>
    </motion.div>
  );
}
