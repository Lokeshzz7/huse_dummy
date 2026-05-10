import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Sparkles, Zap, Trophy, 
  Rocket, Star, Award, CheckCircle
} from 'lucide-react';

export function HuseCircleLoading() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'welcome' | 'loading' | 'ready'>('welcome');
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: GraduationCap, text: 'Preparing your house...', color: 'from-purple-500 to-pink-500' },
    { icon: Sparkles, text: 'Loading student profiles...', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, text: 'Calculating reputation scores...', color: 'from-amber-500 to-orange-500' },
    { icon: Trophy, text: 'Setting up leaderboards...', color: 'from-green-500 to-emerald-500' },
    { icon: Rocket, text: 'Initializing gigs board...', color: 'from-pink-500 to-purple-500' }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Welcome stage - 1.5 seconds
    const welcomeTimer = setTimeout(() => {
      setStage('loading');
    }, 1500);

    return () => clearTimeout(welcomeTimer);
  }, []);

  useEffect(() => {
    if (stage === 'loading') {
      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setStage('ready');
            // Navigate after showing "Ready"
            setTimeout(() => {
              navigate('/college-verification');
            }, 1500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      // Step changes
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(stepInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
      };
    }
  }, [stage, navigate]);

  return (
    <div className="min-h-screen bg-[#050505] relative flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        {/* Orbiting particles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full"
          animate={{
            x: [0, 100, 0, -100, 0],
            y: [0, -100, 0, 100, 0],
            scale: [1, 1.5, 1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-500 rounded-full"
          animate={{
            x: [0, -80, 0, 80, 0],
            y: [0, 80, 0, -80, 0],
            scale: [1, 2, 1, 2, 1],
            opacity: [0.2, 0.7, 0.2, 0.7, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-amber-500 rounded-full"
          animate={{
            x: [0, 120, 0, -120, 0],
            y: [0, -120, 0, 120, 0],
            scale: [1, 1.8, 1, 1.8, 1],
            opacity: [0.4, 0.9, 0.4, 0.9, 0.4]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {/* Welcome Stage */}
          {stage === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <motion.div
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center relative"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                    '0 0 60px rgba(168, 85, 247, 0.6)',
                    '0 0 20px rgba(168, 85, 247, 0.3)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <GraduationCap className="text-white" size={64} />
                
                {/* Sparkle effects */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Sparkles className="text-amber-400" size={24} />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, -180, -360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                >
                  <Star className="text-pink-400" size={20} />
                </motion.div>
              </motion.div>

              {/* Welcome Text */}
              <motion.h1
                className="text-[56px] font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-display)' }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                Welcome to HUSE Circle
              </motion.h1>
              <motion.p
                className="text-gray-400 text-[20px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Your college builder network awaits
              </motion.p>
            </motion.div>
          )}

          {/* Loading Stage */}
          {stage === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Central Icon Animation */}
              <div className="relative">
                <motion.div
                  className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={index}
                        className="absolute"
                        animate={{
                          opacity: currentStep === index ? 1 : 0,
                          scale: currentStep === index ? 1 : 0.5
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="text-white" size={40} />
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Orbiting circles */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      width: 140 + i * 40,
                      height: 140 + i * 40,
                      marginLeft: -(70 + i * 20),
                      marginTop: -(70 + i * 20)
                    }}
                    animate={{
                      rotate: i % 2 === 0 ? 360 : -360
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    <div className={`w-full h-full border-2 border-dashed rounded-full ${
                      i === 0 ? 'border-purple-500/30' :
                      i === 1 ? 'border-pink-500/30' :
                      'border-amber-500/30'
                    }`} />
                  </motion.div>
                ))}
              </div>

              {/* Current Step Text */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="min-h-[60px] flex items-center justify-center"
              >
                <p className={`text-[20px] font-medium bg-gradient-to-r ${steps[currentStep].color} bg-clip-text text-transparent`}>
                  {steps[currentStep].text}
                </p>
              </motion.div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-gray-500 text-[14px]">{progress}%</p>
              </div>

              {/* Loading Steps */}
              <div className="flex justify-center gap-2">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentStep ? 'bg-purple-500' : 'bg-gray-700'
                    }`}
                    animate={{
                      scale: index === currentStep ? [1, 1.5, 1] : 1
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: index === currentStep ? Infinity : 0
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Ready Stage */}
          {stage === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(34, 197, 94, 0.5)',
                    '0 0 80px rgba(34, 197, 94, 0.8)',
                    '0 0 30px rgba(34, 197, 94, 0.5)'
                  ]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                >
                  <CheckCircle className="text-white" size={64} />
                </motion.div>
              </motion.div>

              <motion.h2
                className="text-[48px] font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                You're All Set!
              </motion.h2>
              <motion.p
                className="text-gray-400 text-[18px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Redirecting to verification...
              </motion.p>

              {/* Success particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * 30 * Math.PI) / 180) * 150,
                    y: Math.sin((i * 30 * Math.PI) / 180) * 150,
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Badge */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2 px-6 py-3 bg-[#0F0F0F]/80 backdrop-blur-xl border border-purple-500/20 rounded-full">
          <Award className="text-amber-400" size={16} />
          <span className="text-gray-400 text-[13px]">College Builder Network</span>
        </div>
      </motion.div>
    </div>
  );
}