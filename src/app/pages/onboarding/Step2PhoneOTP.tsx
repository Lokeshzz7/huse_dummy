import { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';
import { ArrowRight, Loader2, Phone } from 'lucide-react';

export function Step2PhoneOTP({ onNext }: { onNext: () => void }) {
  const { updateUser } = useAuth();
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('phone-otp', {
        body: { phone, action: 'send' }
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Failed to send OTP');

      toast.success('OTP sent successfully');
      setStep('verify');
    } catch (e: any) {
      toast.error(e.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      toast.error('Please enter the 4-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('phone-otp', {
        body: { phone, action: 'verify', otp: otpValue }
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Invalid OTP');

      toast.success('Phone verified successfully!');
      updateUser({ phone_verified: true });
      onNext();
    } catch (e: any) {
      toast.error(e.message || 'Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 text-center"
    >
      <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 mb-6">
        <Phone className="w-8 h-8" />
      </div>

      {step === 'input' ? (
        <>
          <h2 className="text-[28px] font-bold text-white mb-2">Verify Phone Number</h2>
          <p className="text-gray-400 mb-8">We will send you an OTP to verify your number.</p>

          <form onSubmit={handleSendOTP} className="space-y-5">
            <div className="space-y-2 text-left max-w-sm mx-auto">
              <label className="text-sm text-gray-400">10-Digit Mobile Number</label>
              <div className="flex bg-[#1A1A1A] border border-gray-800 rounded-xl overflow-hidden focus-within:border-purple-500 transition-colors">
                <span className="px-4 py-3 bg-[#222] text-gray-400 border-r border-gray-800">+91</span>
                <input 
                  required
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-transparent px-4 py-3 text-white focus:outline-none"
                  placeholder="9876543210"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || phone.length !== 10}
              className="w-full max-w-sm mx-auto mt-6 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send OTP'}
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-[28px] font-bold text-white mb-2">Enter OTP</h2>
          <p className="text-gray-400 mb-8">Enter the 4-digit code sent to +91 {phone}</p>

          <form onSubmit={handleVerifyOTP} className="space-y-8">
            <div className="flex justify-center gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-14 h-16 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white text-center text-2xl font-bold focus:outline-none focus:border-purple-500 transition-colors"
                />
              ))}
            </div>

            <button 
              type="submit" 
              disabled={loading || otp.join('').length !== 4}
              className="w-full max-w-sm mx-auto px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Verify <ArrowRight className="w-5 h-5" /></>}
            </button>
            
            <button
              type="button"
              onClick={() => setStep('input')}
              className="text-sm text-gray-500 hover:text-white"
            >
              Change Phone Number
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}
