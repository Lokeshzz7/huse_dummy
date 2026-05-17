import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Target, Zap, TrendingUp, ArrowRight, CheckCircle,
  Users, Clock, Star, Award, Sparkles, ArrowLeft
} from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { MatchScoreList } from '../../components/MatchScore';
import { getAllProviders } from '../../data/mockProviders';
import { getTierBasedMatches, QuoteRequestData } from '../../utils/smartMatching';
import { toast } from 'sonner';

export function SmartMatchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [requestData, setRequestData] = useState<QuoteRequestData | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const quotifyUser = localStorage.getItem('quotifyUser');
    if (!quotifyUser) {
      toast.error('Please login to view results');
      navigate('/quotify/login');
      return;
    }
    setUser(JSON.parse(quotifyUser));

    // Get request data from navigation state
    const request = location.state?.request;
    if (!request) {
      toast.error('No request data found');
      navigate('/quotify/dashboard');
      return;
    }

    setRequestData(request);

    // Run smart matching
    const allProviders = getAllProviders();
    const matchResults = getTierBasedMatches(request, allProviders);
    setMatches(matchResults);

    // Log for demo purposes
    console.log('🤖 Smart Matching Results:', {
      request,
      totalProviders: allProviders.length,
      matchedProviders: matchResults.length,
      topMatch: matchResults[0]
    });
  }, [navigate, location]);

  if (!user || !requestData) {
    return null;
  }

  const tierInfo = {
    standard: {
      color: '#F59E0B',
      label: 'Standard',
      price: '₹149',
      responseTime: '48h',
      matches: 5
    },
    premium: {
      color: '#8B5CF6',
      label: 'Premium',
      price: '₹399',
      responseTime: '24h',
      matches: 8
    },
    enterprise: {
      color: '#05997F',
      label: 'Enterprise',
      price: '₹999',
      responseTime: '8h',
      matches: 10
    }
  };

  const currentTier = tierInfo[requestData.tier];

  return (
    <div className="min-h-screen bg-[#111] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#24c6dc]/5 via-transparent to-[#8B5CF6]/5" />
      <Header />

      <main className="relative pt-[120px] pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/quotify/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>

          {/* Success Banner */}
          <motion.div
            className="bg-gradient-to-r from-[#05997F]/20 to-[#24c6dc]/20 border border-[#05997F]/30 rounded-[20px] p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#05997F]/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-[#05997F]" />
              </div>
              <div className="flex-1">
                <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
                  Quote Request Submitted Successfully! 🎉
                </h1>
                <p className="text-gray-300 text-base mb-4">
                  Your request for "<span className="text-white font-bold">{requestData.title}</span>" has been received. 
                  Our AI has analyzed your needs and matched you with the best providers.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                    <span className="text-gray-400">Plan: </span>
                    <span className="text-white font-bold" style={{ color: currentTier.color }}>
                      {currentTier.label} ({currentTier.price})
                    </span>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                    <span className="text-gray-400">Response Time: </span>
                    <span className="text-white font-bold">{currentTier.responseTime}</span>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                    <span className="text-gray-400">Category: </span>
                    <span className="text-white font-bold">{requestData.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Matching Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#24c6dc]/20 to-[#8B5CF6]/20 border border-[#24c6dc]/30 mb-4">
              <Sparkles className="text-[#24c6dc]" size={20} />
              <span className="text-white font-bold">AI-Powered Smart Matching</span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24c6dc] to-[#8B5CF6]">
                Top Matched
              </span> Providers
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Based on your requirements, our AI analyzed <span className="text-white font-bold">500+ providers</span> and 
              found <span className="text-[#24c6dc] font-bold">{matches.length} excellent matches</span> with 
              the skills and experience you need.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-[#24c6dc]/10 to-[#05997F]/10 border border-[#24c6dc]/30 rounded-[15px] p-5 text-center">
              <Users className="w-8 h-8 text-[#24c6dc] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{matches.length}</div>
              <div className="text-xs text-gray-400">Matched Providers</div>
            </div>
            <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#EC4899]/10 border border-[#8B5CF6]/30 rounded-[15px] p-5 text-center">
              <Target className="w-8 h-8 text-[#8B5CF6] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {matches[0] ? matches[0].matchScore : 0}%
              </div>
              <div className="text-xs text-gray-400">Best Match Score</div>
            </div>
            <div className="bg-gradient-to-br from-[#05997F]/10 to-[#24c6dc]/10 border border-[#05997F]/30 rounded-[15px] p-5 text-center">
              <Clock className="w-8 h-8 text-[#05997F] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{currentTier.responseTime}</div>
              <div className="text-xs text-gray-400">Expected Response</div>
            </div>
            <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#8B5CF6]/10 border border-[#F59E0B]/30 rounded-[15px] p-5 text-center">
              <Award className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {matches.filter(m => m.tier === 'excellent').length}
              </div>
              <div className="text-xs text-gray-400">Excellent Matches</div>
            </div>
          </motion.div>

          {/* Match Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <MatchScoreList
              matches={matches}
              title={`Top ${matches.length} Matched Providers for Your Request`}
              maxShow={currentTier.matches}
            />
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            className="bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-white/10 rounded-[20px] p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#24c6dc]" />
              What Happens Next?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#24c6dc]/20 border border-[#24c6dc]/30 flex items-center justify-center flex-shrink-0 text-[#24c6dc] font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Providers Notified</h4>
                  <p className="text-gray-400 text-sm">
                    All matched providers have been automatically notified about your request.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center flex-shrink-0 text-[#8B5CF6] font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Receive Quotes</h4>
                  <p className="text-gray-400 text-sm">
                    Expect competitive quotes within {currentTier.responseTime} from interested providers.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#05997F]/20 border border-[#05997F]/30 flex items-center justify-center flex-shrink-0 text-[#05997F] font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Compare & Choose</h4>
                  <p className="text-gray-400 text-sm">
                    Review all quotes, compare proposals, and select your ideal provider.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/quotify/dashboard')}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white font-bold hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/quotify/new-request')}
                  className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#05997F]" />
                <span>Verified Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#24c6dc]" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#F59E0B]" />
                <span>95% Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
