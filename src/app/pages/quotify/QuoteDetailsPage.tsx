import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft, Calendar, DollarSign, Clock, User, FileText,
  Send, CheckCircle, Star, MessageSquare, Building2, Award,
  Shield, TrendingUp, Eye, AlertCircle, GitCompare
} from 'lucide-react';
import { QuoteComparisonModal } from '../../components/QuoteComparisonModal';
import { PaymentEscrowModal } from '../../components/PaymentEscrowModal';
import { toast } from 'sonner';

interface Quote {
  id: number;
  providerId: string;
  providerName: string;
  providerType: 'business' | 'student';
  providerAvatar: string;
  company?: string;
  rating: number;
  reviewCount: number;
  price: string;
  timeline: string;
  proposal: string;
  experience: string;
  portfolio: string[];
  submittedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  reputation: number; // Reputation score for ranking
}

const mockQuotes: Quote[] = [
  {
    id: 1,
    providerId: 'tech-startup-001',
    providerName: 'TechVenture AI',
    providerType: 'business',
    providerAvatar: '🚀',
    company: 'Dofracto Startup',
    rating: 4.8,
    reviewCount: 47,
    price: '$7,500',
    timeline: '2.5 months',
    proposal: 'We specialize in building scalable e-commerce platforms with cutting-edge technology. Our team will deliver a fully responsive, feature-rich platform with payment integration, admin dashboard, and customer analytics.',
    experience: '50+ e-commerce projects completed',
    portfolio: ['Project A', 'Project B', 'Project C'],
    submittedDate: '2024-12-18',
    status: 'pending',
    reputation: 450 // Added reputation score
  },
  {
    id: 2,
    providerId: 'dev-master-002',
    providerName: 'WebCraft Solutions',
    providerType: 'business',
    providerAvatar: '💻',
    company: 'Dofracto Startup',
    rating: 4.9,
    reviewCount: 62,
    price: '$6,800',
    timeline: '2 months',
    proposal: 'Our experienced team will create a modern e-commerce solution using React, Node.js, and Stripe. We focus on performance, security, and user experience.',
    experience: '5 years in web development',
    portfolio: ['Project X', 'Project Y'],
    submittedDate: '2024-12-18',
    status: 'pending',
    reputation: 320 // Added reputation score
  },
  {
    id: 3,
    providerId: 'student-platinum-003',
    providerName: 'Arjun Kumar',
    providerType: 'student',
    providerAvatar: '👨‍💻',
    company: 'IIT Bombay - Platinum Student',
    rating: 4.6,
    reviewCount: 12,
    price: '$4,500',
    timeline: '3 months',
    proposal: 'As a Platinum tier HUSE Circle student, I have successfully completed multiple e-commerce projects. I will build a fully functional platform with modern design and all requested features.',
    experience: '8 projects completed on HUSE Circle',
    portfolio: ['Student Project 1', 'Student Project 2'],
    submittedDate: '2024-12-19',
    status: 'pending',
    reputation: 180 // Added reputation score
  }
];

export function QuoteDetailsPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [quotes] = useState<Quote[]>(mockQuotes);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const request = {
    id: requestId,
    title: 'E-commerce Website Development',
    category: 'Web Development',
    description: 'Need a full-stack e-commerce platform with payment integration, user authentication, product catalog, and admin dashboard.',
    budget: '$5,000 - $10,000',
    timeline: '2-3 months',
    deadline: '2024-12-25',
    postedDate: '2024-12-15',
    status: 'open'
  };

  const handleAcceptQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowComparisonModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    toast.success('Project started! Check your dashboard for updates.');
    navigate('/quotify/dashboard');
  };

  // Helper to get anonymized provider display name
  const getProviderDisplayName = (quote: Quote) => {
    if (quote.isRevealed) {
      return quote.providerName;
    }
    const anonId = quote.anonymousId || `00${quote.id}`;
    const idNumber = anonId.split('-')[1] || anonId;
    if (quote.providerType === 'business') {
      return `Verified Business #${idNumber}`;
    }
    return `Platinum Student #${idNumber}`;
  };

  // Helper to get company/college display
  const getCompanyDisplay = (quote: Quote) => {
    if (quote.isRevealed) {
      return quote.company;
    }
    if (quote.providerType === 'business') {
      return 'Dofracto Verified Startup';
    }
    return 'HUSE Circle - Top University';
  };

  const getProviderBadge = (type: string) => {
    if (type === 'business') {
      return (
        <span className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs">
          <Building2 className="w-3 h-3" />
          Dofracto Business
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs">
        <Award className="w-3 h-3" />
        HUSE Platinum Student
      </span>
    );
  };

  // Helper to get reputation tier badge
  const getReputationTier = (rep: number) => {
    if (rep >= 500) return { tier: 'Platinum', color: 'text-amber-400', icon: '👑' };
    if (rep >= 201) return { tier: 'Gold', color: 'text-yellow-400', icon: '🥇' };
    if (rep >= 51) return { tier: 'Silver', color: 'text-gray-300', icon: '🥈' };
    return { tier: 'Bronze', color: 'text-orange-400', icon: '🥉' };
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/quotify/dashboard')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        {/* Request Details */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{request.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Posted {new Date(request.postedDate).toLocaleDateString()}
                </span>
                <span>•</span>
                <span className="text-cyan-400">{request.category}</span>
                <span>•</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs">
                  {quotes.length} Quotes Received
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-400 mb-6">{request.description}</p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-gray-400">Budget:</span>
              <span className="text-white font-medium">{request.budget}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-gray-400">Timeline:</span>
              <span className="text-white font-medium">{request.timeline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-gray-400">Deadline:</span>
              <span className="text-white font-medium">{new Date(request.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Quotes Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Received Quotes ({quotes.length})
          </h2>
          <button
            onClick={() => setShowComparisonModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <GitCompare className="w-4 h-4" />
            <span className="text-sm font-medium">Compare All Quotes</span>
          </button>
        </div>

        {/* Privacy Protection Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm mb-1">🔒 Your Privacy is Protected</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your contact information is <strong className="text-cyan-400">hidden from providers</strong> until you select one and complete payment. 
                All communication happens securely through the platform. Providers can see your project requirements but cannot contact you outside the platform.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quotes List */}
        <div className="space-y-6">
          {quotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl">
                    {quote.providerAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{quote.providerName}</h3>
                      {getProviderBadge(quote.providerType)}
                      <span className={`text-xs font-bold ${getReputationTier(quote.reputation).color}`}>
                        {getReputationTier(quote.reputation).icon} {getReputationTier(quote.reputation).tier}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{quote.company}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-white font-medium">{quote.rating}</span>
                        <span className="text-gray-400 text-sm">({quote.reviewCount} reviews)</span>
                      </div>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400 text-sm">{quote.experience}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400 text-sm">{quote.reputation} Rep</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">{quote.price}</div>
                  <div className="text-sm text-gray-400">Timeline: {quote.timeline}</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-bold mb-2">Proposal</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{quote.proposal}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Submitted {new Date(quote.submittedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/quotify/provider/${quote.providerId}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">View Profile</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">Message</span>
                  </button>
                  <button
                    onClick={() => handleAcceptQuote(quote)}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Accept Quote</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {quotes.length === 0 && (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No quotes yet</h3>
            <p className="text-gray-400">Quotes will appear here once providers respond to your request</p>
          </div>
        )}
      </div>

      {/* Comparison Modal */}
      <QuoteComparisonModal
        quotes={quotes}
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        onSelectQuote={handleAcceptQuote}
        onViewProfile={(providerId) => navigate(`/quotify/provider/${providerId}`)}
      />

      {/* Payment/Escrow Modal */}
      {selectedQuote && (
        <PaymentEscrowModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          quote={{
            providerName: selectedQuote.providerName,
            providerType: selectedQuote.providerType,
            providerAvatar: selectedQuote.providerAvatar,
            price: selectedQuote.price,
            timeline: selectedQuote.timeline,
            rating: selectedQuote.rating
          }}
          projectTitle={request.title}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}