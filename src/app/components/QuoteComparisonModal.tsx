import { motion, AnimatePresence } from 'motion/react';
import {
  X, Star, DollarSign, Clock, Award, CheckCircle,
  Building2, GraduationCap, MessageSquare, User, ArrowRight
} from 'lucide-react';

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
}

interface QuoteComparisonModalProps {
  quotes: Quote[];
  isOpen: boolean;
  onClose: () => void;
  onSelectQuote: (quote: Quote) => void;
  onViewProfile: (providerId: string) => void;
}

export function QuoteComparisonModal({
  quotes,
  isOpen,
  onClose,
  onSelectQuote,
  onViewProfile
}: QuoteComparisonModalProps) {
  if (quotes.length === 0) return null;

  const parsePrice = (price: string) => {
    const match = price.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, '')) : 0;
  };

  const parseTimeline = (timeline: string) => {
    const match = timeline.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const bestPrice = Math.min(...quotes.map(q => parsePrice(q.price)));
  const bestTimeline = Math.min(...quotes.map(q => parseTimeline(q.timeline)));
  const bestRating = Math.max(...quotes.map(q => q.rating));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Compare Quotes</h2>
                <p className="text-gray-400 text-sm">
                  Side-by-side comparison of {quotes.length} quotes
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto p-6">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${quotes.length}, minmax(300px, 1fr))` }}>
                {quotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4 hover:border-cyan-500/30 transition-all"
                  >
                    {/* Provider Info */}
                    <div className="text-center pb-4 border-b border-white/10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-3xl mx-auto mb-3">
                        {quote.providerAvatar}
                      </div>
                      <h3 className="font-bold text-white mb-1">{quote.providerName}</h3>
                      <p className="text-sm text-gray-400 mb-2">{quote.company}</p>
                      {quote.providerType === 'business' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs">
                          <Building2 className="w-3 h-3" />
                          Dofracto
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs">
                          <GraduationCap className="w-3 h-3" />
                          HUSE Platinum
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Price
                        </span>
                        {parsePrice(quote.price) === bestPrice && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-xs font-medium">
                            Best Price
                          </span>
                        )}
                      </div>
                      <div className={`text-2xl font-bold ${
                        parsePrice(quote.price) === bestPrice ? 'text-green-400' : 'text-white'
                      }`}>
                        {quote.price}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Timeline
                        </span>
                        {parseTimeline(quote.timeline) === bestTimeline && (
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-xs font-medium">
                            Fastest
                          </span>
                        )}
                      </div>
                      <div className={`text-xl font-bold ${
                        parseTimeline(quote.timeline) === bestTimeline ? 'text-blue-400' : 'text-white'
                      }`}>
                        {quote.timeline}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Rating
                        </span>
                        {quote.rating === bestRating && (
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-xs font-medium">
                            Top Rated
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xl font-bold ${
                          quote.rating === bestRating ? 'text-amber-400' : 'text-white'
                        }`}>
                          {quote.rating}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.round(quote.rating)
                                  ? 'text-amber-400 fill-current'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">({quote.reviewCount} reviews)</p>
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400 flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Experience
                      </div>
                      <p className="text-sm text-white">{quote.experience}</p>
                    </div>

                    {/* Proposal Preview */}
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400 flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        Proposal
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-3">
                        {quote.proposal}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <button
                        onClick={() => onViewProfile(quote.providerId)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm"
                      >
                        <User className="w-4 h-4" />
                        View Profile
                      </button>
                      <button
                        onClick={() => onSelectQuote(quote)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Select Quote
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  💡 Tip: Consider not just price, but also rating, timeline, and experience when choosing
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
