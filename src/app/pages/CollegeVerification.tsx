import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, CheckCircle, AlertCircle, ArrowRight, 
  GraduationCap, Shield, Sparkles, School
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CollegeVerification() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const colleges = [
    { id: 'iit-bombay', name: 'IIT Bombay', domain: '@iitb.ac.in', emoji: '🏛️' },
    { id: 'iit-delhi', name: 'IIT Delhi', domain: '@iitd.ac.in', emoji: '🎓' },
    { id: 'bits-pilani', name: 'BITS Pilani', domain: '@pilani.bits-pilani.ac.in', emoji: '🏫' },
    { id: 'nit-trichy', name: 'NIT Trichy', domain: '@nitt.edu', emoji: '🎯' },
    { id: 'iiit-hyderabad', name: 'IIIT Hyderabad', domain: '@iiit.ac.in', emoji: '💻' },
    { id: 'vit-vellore', name: 'VIT Vellore', domain: '@vit.ac.in', emoji: '📚' }
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate email domain
    const college = colleges.find(c => email.endsWith(c.domain.substring(1)));
    
    if (!college) {
      setError('Please use your official college email address');
      setLoading(false);
      return;
    }

    setSelectedCollege(college.name);
    
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 2000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      setLoading(false);
      return;
    }

    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      
      // Redirect to platform after 2 seconds
      setTimeout(() => {
        navigate('/husecircle/student/platform');
      }, 2000);
    }, 2000);
  };

  return (
    <>
      <div className="min-h-screen bg-[#050505] relative flex items-center justify-center p-4">
        {/* Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <GraduationCap className="text-white" size={32} />
            </div>
            <h1 className="text-white text-[32px] font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              HUSE Circle
            </h1>
            <p className="text-gray-400 text-[14px]">College Builder Network</p>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Email Verification */}
            {step === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#0F0F0F] border border-purple-500/20 rounded-[25px] p-8"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Mail className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-white text-[24px] font-bold mb-2">Verify Your College</h2>
                  <p className="text-gray-400 text-[14px]">
                    Enter your official college email to join your house
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-[13px] mb-2 block">College Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.name@college.ac.in"
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-purple-500/20 rounded-[12px] text-white placeholder-gray-600 focus:border-purple-500/40 outline-none transition-all"
                      required
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-[12px] text-red-400 text-[13px]">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Supported Colleges */}
                  <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-[12px]">
                    <p className="text-gray-400 text-[12px] mb-3">Supported Colleges:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {colleges.map((college) => (
                        <div key={college.id} className="flex items-center gap-2 text-[11px]">
                          <span>{college.emoji}</span>
                          <span className="text-gray-500">{college.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-[12px] font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending OTP...' : 'Send Verification Code'}
                    <ArrowRight size={18} />
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-gray-500">
                  <Shield size={14} />
                  <span>Your email is secure and never shared</span>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/husecircle/student/login')}
                    className="text-purple-400 hover:text-purple-300 text-[13px] transition-colors"
                  >
                    Already have an account? Demo Login →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#0F0F0F] border border-purple-500/20 rounded-[25px] p-8"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Mail className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-white text-[24px] font-bold mb-2">Enter Verification Code</h2>
                  <p className="text-gray-400 text-[14px]">
                    We sent a 6-digit code to<br />
                    <span className="text-purple-400 font-medium">{email}</span>
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-14 bg-[#1A1A1A] border border-purple-500/20 rounded-[12px] text-white text-center text-[24px] font-bold focus:border-purple-500/40 outline-none transition-all"
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-[12px] text-red-400 text-[13px]">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-[12px] font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify & Continue'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="w-full text-gray-400 hover:text-white text-[13px] transition-colors"
                  >
                    Use different email
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0F0F0F] border border-green-500/20 rounded-[25px] p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
                >
                  <CheckCircle className="text-white" size={40} />
                </motion.div>

                <h2 className="text-white text-[28px] font-bold mb-2">Welcome to {selectedCollege}!</h2>
                <p className="text-gray-400 text-[15px] mb-6">
                  Your house awaits. Let's start building.
                </p>

                <div className="flex items-center justify-center gap-2 text-purple-400 text-[14px]">
                  <Sparkles size={16} />
                  <span>Redirecting to your house...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}