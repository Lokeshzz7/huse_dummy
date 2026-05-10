import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { supabase, supabaseKey, supabaseUrl } from '../../../lib/supabase';
import { toast } from 'sonner';
import { ArrowRight, Loader2, FileText, UploadCloud, CreditCard } from 'lucide-react';

export function Step3DocumentPayment({ onNext }: { onNext: () => void }) {
  const { user } = useAuth();
  
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const graduatingYear = user?.graduating_year || new Date().getFullYear() + 4; // fallback

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const monthsLeft = (graduatingYear - currentYear) * 12 - currentMonth;

  const price = monthsLeft >= 12 ? 499 :
    monthsLeft >= 3 ? Math.round((499 / 12) * monthsLeft) :
    Math.round((499 / 12) * 3);

  const monthsCovered = Math.max(monthsLeft, 3);
  const planType = monthsLeft >= 12 ? 'student_annual' :
    monthsLeft >= 3 ? 'student_prorated' : 'student_minimum';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const loadRazorpay = () => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please upload a verification document');
      return;
    }
    if (!user?.id) return;

    setLoading(true);

    try {
      // Step A: Upload Verification Document
      const formData = new FormData();
      formData.append('file', file);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      const res = await fetch(`${supabaseUrl}/functions/v1/upload-verification-doc`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: formData,
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || 'Failed to upload document');

      // Step B & C: Create Razorpay Order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
        body: { plan_type: planType, amount: price, months_covered: monthsCovered }
      });

      if (orderError) throw orderError;
      if (!orderData?.success) throw new Error(orderData?.error || 'Failed to create payment order');

      // Step D: Open Razorpay Checkout
      const isLoaded = await loadRazorpay();
      if (!isLoaded) throw new Error('Razorpay SDK failed to load');

      const options = {
        key: orderData.data.key_id,
        amount: orderData.data.amount * 100,
        currency: orderData.data.currency,
        name: 'HUSE Circle',
        description: 'Student Membership',
        order_id: orderData.data.order_id,
        handler: function (response: any) {
          // Razorpay returns razorpay_payment_id, razorpay_order_id, razorpay_signature
          toast.success('Payment successful!');
          onNext(); // Move to next step
        },
        prefill: {
          email: user.email,
          contact: '' // phone not readily available in user context, could fetch from DB if needed
        },
        theme: {
          color: '#A855F7'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        toast.error(response.error.description || 'Payment failed');
      });
      rzp.open();

    } catch (e: any) {
      toast.error(e.message || 'An error occurred during payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-[28px] font-bold text-white mb-2">Student Verification</h2>
        <p className="text-gray-400">Upload your ID card and complete your membership.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Document Upload */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/png, application/pdf"
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              {file ? <FileText size={24} /> : <UploadCloud size={24} />}
            </div>
            {file ? (
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-gray-500 text-xs">Click to change file</p>
              </div>
            ) : (
              <div>
                <p className="text-white font-medium">Upload College ID / Fee Receipt</p>
                <p className="text-gray-500 text-xs mt-1">JPEG, PNG, PDF up to 5MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Subscription Plan Summary */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <CreditCard size={18} className="text-purple-400" />
              Membership Plan
            </h3>
            <span className="text-purple-400 text-sm font-medium">{monthsCovered} Months Access</span>
          </div>
          
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-gray-400 text-sm">Valid till Graduation ({graduatingYear})</span>
            <span className="text-2xl font-bold text-white">₹{price}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            One-time payment covering your remaining academic duration. 
            Includes full access to HUSE Circle features.
          </p>
        </div>

        <button 
          type="submit" 
          disabled={loading || !file}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Pay ₹{price} & Proceed <ArrowRight className="w-5 h-5" /></>}
        </button>

      </form>
    </motion.div>
  );
}
