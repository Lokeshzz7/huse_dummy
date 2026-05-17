import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { uploadDoc, apiPost } from '../../../lib/api';
import { toast } from 'sonner';
import { ArrowRight, Loader2, FileText, UploadCloud, CreditCard, AlertCircle } from 'lucide-react';

export function Step3DocumentPayment({ onNext, showReuploadBanner }: { onNext: () => void; showReuploadBanner?: boolean }) {
  const { user, updateUser } = useAuth();
  
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<'id_card' | 'admission_letter'>('id_card');
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
      // Step A: Upload Verification Document via backend API (Multipart)
      const uploadResult = await uploadDoc(file, documentType);
      console.log('Document uploaded:', uploadResult);

      // Step B: Create Razorpay Order via backend
      const orderData = await apiPost<any>('/payments/create-order', { 
        plan_type: planType, 
        amount: price, 
        months_covered: monthsCovered 
      });

      const res = await loadRazorpay();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Huse Circle',
        description: `Student Subscription (${monthsCovered} months)`,
        order_id: orderData.order_id,
        handler: async function (response: any) {
          console.log('Payment successful. Proceeding to finalize onboarding...');
          
          try {
            // STEP C: Finalize Onboarding with academic data (POST /auth/onboard)
            // Pull data from user state (populated in Step 1)
            const onboardingPayload = {
              college_id: user.college_id,
              degree_program_id: (user as any).degree_program_id,
              department: (user as any).department,
              current_year_of_study: (user as any).current_year_of_study,
              joining_year: (user as any).joining_year,
              dob: (user as any).dob
            };

            console.log('Finalizing onboarding with payload:', onboardingPayload);
            await apiPost<any>('/auth/onboard', onboardingPayload);

            // Finalize onboarding and move to pending_review
            updateUser({
              onboarding_step: 'pending_review'
            });

            toast.success('Onboarding complete! Your profile is under review.');
            onNext();
          } catch (error: any) {
            console.error('Onboarding finalization failed', error);
            toast.error('Payment succeeded but profile update failed. Please contact support.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: (user as any).mobile || ''
        },
        theme: { color: '#A855F7' },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (err: any) {
      console.error('Step 3 Error:', err);
      toast.error(err.message || 'Verification process failed');
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
        {showReuploadBanner && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-red-400 font-bold text-sm">Document Rejected</p>
              <p className="text-red-400/80 text-xs">Your previous document was rejected. Please upload a clear, valid college ID or admission letter.</p>
            </div>
          </div>
        )}

        {/* Document Type */}
        <div className="space-y-3">
          <label className="text-sm text-gray-400">Document Type</label>
          <div className="grid grid-cols-2 gap-3">
            {([
              { value: 'id_card', label: 'College ID Card' },
              { value: 'admission_letter', label: 'Admission Letter' },
            ] as const).map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setDocumentType(value)}
                className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                  documentType === value
                    ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                    : 'border-gray-800 bg-[#1A1A1A] text-gray-400 hover:border-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

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
