import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Phone, FileText, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Step1Academic } from './Step1Academic';
import { Step2PhoneOTP } from './Step2PhoneOTP';
import { Step3DocumentPayment } from './Step3DocumentPayment';
import { Step4AvatarSkills } from './Step4AvatarSkills';
import { Step5VerificationPending } from './Step5VerificationPending';

export function HuseOnboarding() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showReuploadBanner, setShowReuploadBanner] = useState(false);

  // If user is already active, redirect them
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/husecircle/student/login');
      } else if (user.user_status === 'active' || user.onboarding_step === 'done') {
        navigate('/husecircle/student/platform');
      } else {
        // Updated Step Map: Now Avatar/Skills comes BEFORE Payment
        const stepMap: Record<string, number> = {
          complete_profile: 1,
          verify_phone: 2,
          profile_setup: 3, // Avatar first
          upload_doc: 4,     // Payment last
          pending_review: 5,
          reupload_doc: 4,
        };
        
        setCurrentStep(stepMap[user.onboarding_step || ''] || 1);
        setShowReuploadBanner(user.onboarding_step === 'reupload_doc');
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loading...</div>;
  }

  const steps = [
    { num: 1, label: 'Academic', icon: GraduationCap },
    { num: 2, label: 'Phone', icon: Phone },
    { num: 3, label: 'Profile', icon: User },
    { num: 4, label: 'Payment', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-[#050505] relative flex flex-col items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Progress Bar Header - Hide if on Step 5 (Pending) */}
        {currentStep < 5 && (
          <div className="mb-10">
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-800 -z-10" />
              <motion.div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 -z-10"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep >= step.num;
                const isCurrent = currentStep === step.num;
                
                return (
                  <div key={step.num} className="flex flex-col items-center gap-2">
                    <motion.div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
                          : 'bg-[#1A1A1A] text-gray-500 border border-gray-800'
                      }`}
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
                    >
                      <Icon size={20} />
                    </motion.div>
                    <span className={`text-[12px] font-medium ${isActive ? 'text-purple-300' : 'text-gray-600'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className={`bg-[#0F0F0F] border border-purple-500/20 rounded-[25px] p-6 md:p-10 shadow-2xl relative overflow-hidden ${currentStep === 5 ? 'border-none bg-transparent shadow-none !p-0' : ''}`}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && <Step1Academic key="step1" onNext={() => setCurrentStep(2)} />}
            {currentStep === 2 && <Step2PhoneOTP key="step2" onNext={() => setCurrentStep(3)} />}
            {currentStep === 3 && <Step4AvatarSkills key="step3" onComplete={() => setCurrentStep(4)} />}
            {currentStep === 4 && <Step3DocumentPayment key="step4" onNext={() => setCurrentStep(5)} showReuploadBanner={showReuploadBanner} />}
            {currentStep === 5 && <Step5VerificationPending key="step5" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
