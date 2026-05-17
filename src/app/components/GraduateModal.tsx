import { useState } from 'react';
import { X, GraduationCap, Rocket, Sparkles, TrendingUp, CheckCircle, Code, Award, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

// Graduate Modal - Transition from HUSE Circle to Dofracto Contributor
export function GraduateModal({ isOpen, onClose, studentId, studentName, college }: {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  college: string;
}) {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [wantsStartupLaunchpad, setWantsStartupLaunchpad] = useState<boolean | null>(null);
  const [projectIdea, setProjectIdea] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [teamSize, setTeamSize] = useState('solo');

  const handleGraduate = () => {
    // Update user to Contributor tier (NOT Business Owner)
    if (user) {
      updateUser({
        ...user,
        role: 'contributor',
        tier: 'Contributor', // Set to Contributor tier
        platform: 'dofracto',
        isHuseAlumni: true,
        huseCollege: college,
        reputation: (user.reputation || 0) + 200 // +200 reputation boost
      });
    }

    // Show success messages
    toast.success(`🎓 Congratulations ${studentName}!`);
    toast.success('Welcome to Dofracto as a Contributor!');
    if (wantsStartupLaunchpad && projectIdea) {
      toast.info('Your startup idea has been saved to the Launchpad!');
    }
    toast.info('Redirecting to Builders Hub...');

    // Close modal
    onClose();

    // Navigate to Unified Builders Hub (Contributor platform)
    setTimeout(() => {
      navigate('/dofracto/builder/hub');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0F0F0F] border-2 border-cyan-500/50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 via-cyan-500 to-blue-500 rounded-xl">
              <GraduationCap size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Become a Contributor
              </h3>
              <p className="text-gray-400 text-sm">Graduate from HUSE Circle · Earn & Build on Dofracto</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                step >= num 
                  ? 'bg-cyan-500 border-cyan-500 text-white' 
                  : 'bg-transparent border-gray-600 text-gray-600'
              }`}>
                {step > num ? <CheckCircle size={20} /> : num}
              </div>
              {num < 3 && (
                <div className={`h-1 flex-1 mx-2 rounded ${
                  step > num ? 'bg-cyan-500' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {step === 1 && (
            <>
              <div className="bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Sparkles className="text-cyan-400 mt-1" size={24} />
                  <div>
                    <h4 className="text-white font-bold mb-2">Congratulations, {studentName}!</h4>
                    <p className="text-gray-300 text-sm">
                      You've reached Platinum tier at {college}! Graduate to Dofracto as a <span className="text-cyan-400 font-bold">Contributor</span> - earn money, build real products, and gain experience before starting your own venture.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-black/40 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="text-purple-400" size={20} />
                      <span className="text-white font-bold">HUSE Circle</span>
                    </div>
                    <p className="text-gray-400 text-xs">Student · Building Skills & Portfolio</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 border-2 border-cyan-500/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="text-cyan-400" size={20} />
                      <span className="text-white font-bold">Contributor</span>
                    </div>
                    <p className="text-gray-400 text-xs">Earn & Build · Join Startups (Correct tier!)</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-cyan-500/20 rounded-xl p-5">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Award className="text-cyan-400" size={20} />
                  As a Contributor, you get:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="text-green-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-white text-sm font-medium">Work with Real Startups</p>
                      <p className="text-gray-400 text-xs">Earn money + equity while building products</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Code className="text-cyan-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-white text-sm font-medium">Unlimited Quotify Quotes</p>
                      <p className="text-gray-400 text-xs">Submit 10 quotes per week (vs 3/week for Platinum)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-purple-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-white text-sm font-medium">Mentor Students & Build Network</p>
                      <p className="text-gray-400 text-xs">Give back to HUSE Circle and grow your reputation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Rocket className="text-amber-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-white text-sm font-medium">Future: Business Owner Tier</p>
                      <p className="text-gray-400 text-xs">When ready, launch your own startup with full support</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Lightbulb className="text-amber-400 mt-1" size={24} />
                  <div>
                    <h4 className="text-white font-bold mb-2">Startup Launchpad (Optional)</h4>
                    <p className="text-gray-400 text-sm">
                      Have a startup idea you want to pursue later? Save it to your Launchpad! You can work as a Contributor now and launch your startup when you're ready.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setWantsStartupLaunchpad(true)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      wantsStartupLaunchpad === true
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-gray-700 bg-black/20 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        wantsStartupLaunchpad === true ? 'border-amber-500' : 'border-gray-600'
                      }`}>
                        {wantsStartupLaunchpad === true && (
                          <div className="w-3 h-3 rounded-full bg-amber-500" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold text-sm">Yes, save my idea</p>
                        <p className="text-gray-400 text-xs">I'll build it in the future</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setWantsStartupLaunchpad(false)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      wantsStartupLaunchpad === false
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-gray-700 bg-black/20 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        wantsStartupLaunchpad === false ? 'border-cyan-500' : 'border-gray-600'
                      }`}>
                        {wantsStartupLaunchpad === false && (
                          <div className="w-3 h-3 rounded-full bg-cyan-500" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold text-sm">Skip for now</p>
                        <p className="text-gray-400 text-xs">Just be a Contributor</p>
                      </div>
                    </div>
                  </button>
                </div>

                {wantsStartupLaunchpad === true && (
                  <div className="space-y-4 mt-6 p-6 bg-black/40 rounded-xl border border-amber-500/20">
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">Startup Name</label>
                      <input
                        type="text"
                        value={projectIdea}
                        onChange={(e) => setProjectIdea(e.target.value)}
                        className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                        placeholder="e.g., EduTech Platform, FinTech App, SaaS Tool..."
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">Brief Description</label>
                      <textarea
                        rows={3}
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                        placeholder="What problem are you solving?"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">Planned Team Size</label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="solo">Solo Founder</option>
                        <option value="2-3">2-3 Co-founders</option>
                        <option value="4-5">4-5 Team Members</option>
                        <option value="5+">5+ Team Members</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/50 rounded-xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full mb-4">
                  <Code size={40} className="text-white" />
                </div>
                <h4 className="text-white text-2xl font-bold mb-3">Ready to Become a Contributor!</h4>
                <p className="text-gray-300 mb-6">
                  Start earning, building real products, and growing your experience on Dofracto.
                </p>

                <div className="bg-black/40 rounded-xl p-6 mb-6">
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-400" size={20} />
                      <span className="text-white">New Tier: <span className="text-cyan-400 font-bold">Contributor</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-400" size={20} />
                      <span className="text-white">HUSE Alumni Badge: <span className="text-cyan-400 font-bold">{college}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-400" size={20} />
                      <span className="text-white">Reputation Boost: <span className="text-cyan-400 font-bold">+200 Rep</span></span>
                    </div>
                    {wantsStartupLaunchpad && projectIdea && (
                      <>
                        <div className="my-3 border-t border-gray-700" />
                        <div className="flex items-center gap-3">
                          <Lightbulb className="text-amber-400" size={20} />
                          <span className="text-white">Startup Idea Saved: <span className="text-amber-400 font-bold">{projectIdea}</span></span>
                        </div>
                        <p className="text-gray-400 text-xs pl-8">Access from Launchpad when ready to become Business Owner</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6">
                  <p className="text-cyan-400 text-sm font-medium">
                    🎁 As a HUSE Circle Alumni, you get 1 year FREE Contributor access!
                  </p>
                </div>

                <p className="text-gray-400 text-sm">
                  Click below to complete your graduation and access the Builders Hub!
                </p>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all font-medium"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={step === 2 && wantsStartupLaunchpad === null}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 2 ? 'Review & Confirm' : 'Next Step'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGraduate}
              className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-2xl transition-all font-bold flex items-center justify-center gap-2"
            >
              <Code size={20} />
              Become a Contributor
            </button>
          )}
        </div>
      </div>
    </div>
  );
}