import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEcosystem } from '../context/EcosystemContext';
import { GraduationCap, Award, Star, TrendingUp, Sparkles, CheckCircle, ArrowRight, CreditCard, Trophy, Target, Zap } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export function GraduationPage() {
  const navigate = useNavigate();
  const { userProfile, graduateToContributor, isEligibleForGraduation } = useEcosystem();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'paid'>('free');

  if (!userProfile || !isEligibleForGraduation()) {
    navigate('/');
    return null;
  }

  const canGraduateFree = userProfile.reputation >= 100000;

  const handleGraduation = (isPaid: boolean) => {
    // Celebrate with confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    graduateToContributor(isPaid);
    toast.success('🎉 Congratulations! You\'ve graduated to Dofracto!');
    
    setTimeout(() => {
      navigate('/dofracto/builder/hub');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Header */}
      <header className="border-b border-theme-accent bg-theme-elevated">
        <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-theme-primary">Graduation Portal</h1>
              <p className="text-xs text-theme-muted">HUSE Circle → Dofracto</p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-theme-secondary hover:text-theme-primary transition-colors"
          >
            ← Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6]/20 to-[#24c6dc]/20 border border-[#8B5CF6]/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-sm font-medium text-theme-primary">Congratulations on your journey!</span>
          </div>
          
          <h1 className="text-5xl font-bold text-theme-primary mb-4">
            Ready to Graduate? 🎓
          </h1>
          <p className="text-xl text-theme-tertiary max-w-2xl mx-auto">
            You've built your skills on HUSE Circle. Now it's time to join Dofracto and work on real projects, earn money, and build your startup.
          </p>
        </motion.div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-theme-card border border-theme-accent rounded-xl p-6">
            <Trophy className="w-8 h-8 text-[#8B5CF6] mb-3" />
            <p className="text-2xl font-bold text-theme-primary">{userProfile.tier}</p>
            <p className="text-sm text-theme-tertiary">Current Tier</p>
          </div>
          <div className="bg-theme-card border border-theme-accent rounded-xl p-6">
            <Star className="w-8 h-8 text-yellow-500 mb-3" />
            <p className="text-2xl font-bold text-theme-primary">{userProfile.reputation.toLocaleString()}</p>
            <p className="text-sm text-theme-tertiary">Reputation Points</p>
          </div>
          <div className="bg-theme-card border border-theme-accent rounded-xl p-6">
            <Target className="w-8 h-8 text-[#24c6dc] mb-3" />
            <p className="text-2xl font-bold text-theme-primary">{userProfile.completedProjects}</p>
            <p className="text-sm text-theme-tertiary">Projects Completed</p>
          </div>
          <div className="bg-theme-card border border-theme-accent rounded-xl p-6">
            <TrendingUp className="w-8 h-8 text-green-500 mb-3" />
            <p className="text-2xl font-bold text-theme-primary">Ready</p>
            <p className="text-sm text-theme-tertiary">Graduation Status</p>
          </div>
        </motion.div>

        {/* Graduation Plans */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Free Graduation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => canGraduateFree && setSelectedPlan('free')}
            className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedPlan === 'free' && canGraduateFree
                ? 'border-green-500 bg-green-500/5'
                : canGraduateFree
                ? 'border-theme-accent bg-theme-card hover:border-green-500/50'
                : 'border-theme-secondary bg-theme-tertiary opacity-50 cursor-not-allowed'
            }`}
          >
            {canGraduateFree && selectedPlan === 'free' && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-theme-primary">Earned Graduation</h3>
                <p className="text-theme-tertiary">Free - You've earned it!</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-theme-tertiary">Reputation Required</span>
                <span className="text-sm font-semibold text-theme-primary">
                  {userProfile.reputation.toLocaleString()} / 100,000
                </span>
              </div>
              <div className="w-full bg-theme-tertiary rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                  style={{ width: `${Math.min((userProfile.reputation / 100000) * 100, 100)}%` }}
                />
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-theme-secondary">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Full access to Dofracto Unified Builders Hub</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-theme-secondary">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Work on real paid projects</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-theme-secondary">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Access to Quote Marketplace</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-theme-secondary">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Graduate badge on your profile</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-theme-secondary">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Build and launch your startup</span>
              </li>
            </ul>

            {canGraduateFree ? (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-500 font-medium">✓ You're eligible for free graduation!</p>
              </div>
            ) : (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-500 font-medium">
                  Need {(100000 - userProfile.reputation).toLocaleString()} more reputation points
                </p>
              </div>
            )}
          </motion.div>

          {/* Paid Graduation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setSelectedPlan('paid')}
            className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedPlan === 'paid'
                ? 'border-[#24c6dc] bg-[#24c6dc]/5'
                : 'border-theme-accent bg-theme-card hover:border-[#24c6dc]/50'
            }`}
          >
            {selectedPlan === 'paid' && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#24c6dc] rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            )}

            <div className="absolute top-6 right-6">
              <Sparkles className="w-6 h-6 text-[#24c6dc] animate-pulse" />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-theme-primary">Fast Track</h3>
                <p className="text-theme-tertiary">₹499/year subscription</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-bold text-theme-primary mb-2">
                ₹499
                <span className="text-lg text-theme-tertiary font-normal">/year</span>
              </div>
              <p className="text-sm text-theme-tertiary">Skip the wait, graduate today</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-theme-secondary">
                <CheckCircle className="w-5 h-5 text-[#24c6dc] mt-0.5" />
                <span>Everything in Free Graduation</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-theme-secondary">
                <CheckCircle className="w-5 h-5 text-[#24c6dc] mt-0.5" />
                <span>Instant access - No reputation required</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-theme-secondary">
                <CheckCircle className="w-5 h-5 text-[#24c6dc] mt-0.5" />
                <span>Priority support from Dofracto team</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-theme-secondary">
                <CheckCircle className="w-5 h-5 text-[#24c6dc] mt-0.5" />
                <span>Exclusive Contributor badge</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-theme-secondary">
                <CheckCircle className="w-5 h-5 text-[#24c6dc] mt-0.5" />
                <span>Early access to new features</span>
              </li>
            </ul>

            <div className="p-3 bg-[#24c6dc]/10 border border-[#24c6dc]/30 rounded-lg">
              <p className="text-sm text-[#24c6dc] font-medium">⚡ Graduate instantly, no waiting required</p>
            </div>
          </motion.div>
        </div>

        {/* What Happens After Graduation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-[#8B5CF6]/10 via-[#24c6dc]/10 to-[#05997F]/10 border border-[#24c6dc]/30 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-theme-primary mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-[#24c6dc]" />
            What Happens After Graduation?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#24c6dc]/20 flex items-center justify-center mb-3">
                <span className="font-bold text-[#24c6dc]">1</span>
              </div>
              <h4 className="font-semibold text-theme-primary mb-2">Access Dofracto Hub</h4>
              <p className="text-sm text-theme-tertiary">
                Instantly unlock the Unified Builders Hub with access to real client projects and opportunities.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#24c6dc]/20 flex items-center justify-center mb-3">
                <span className="font-bold text-[#24c6dc]">2</span>
              </div>
              <h4 className="font-semibold text-theme-primary mb-2">Start Earning</h4>
              <p className="text-sm text-theme-tertiary">
                Work on paid projects, submit quotes, and build your professional reputation.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#24c6dc]/20 flex items-center justify-center mb-3">
                <span className="font-bold text-[#24c6dc]">3</span>
              </div>
              <h4 className="font-semibold text-theme-primary mb-2">Launch Your Startup</h4>
              <p className="text-sm text-theme-tertiary">
                Use Dofracto's accelerator tools to turn your MVP into a real business.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => handleGraduation(selectedPlan === 'paid')}
            disabled={selectedPlan === 'free' && !canGraduateFree}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#24c6dc]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {selectedPlan === 'paid' ? (
              <>
                <CreditCard className="w-5 h-5" />
                Pay ₹499 & Graduate Now
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                <Trophy className="w-5 h-5" />
                Graduate for Free
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          {selectedPlan === 'free' && !canGraduateFree && (
            <p className="mt-4 text-sm text-yellow-500">
              You need {(100000 - userProfile.reputation).toLocaleString()} more reputation points to graduate for free
            </p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
