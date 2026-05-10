import { motion, AnimatePresence } from 'motion/react';
import {
  X, DollarSign, Clock, User, Calendar, MapPin, Building2,
  FileText, Tag, AlertCircle, CheckCircle, MessageSquare
} from 'lucide-react';

interface QuoteRequest {
  id: number;
  serviceType: string;
  requesterName: string;
  requesterAvatar: string;
  budget: string;
  description: string;
  status: string;
  platform: string;
  receivedDate: string;
  category?: string;
  location?: string;
  urgency?: string;
  preferredStartDate?: string;
  attachments?: string[];
}

interface ViewQuoteDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: QuoteRequest;
  onSubmitQuote?: () => void;
  onMessage?: () => void;
}

export function ViewQuoteDetailsModal({
  isOpen,
  onClose,
  quote,
  onSubmitQuote,
  onMessage
}: ViewQuoteDetailsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[25px] max-w-3xl w-full my-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl">
                  {quote.requesterAvatar}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {quote.serviceType}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Requested by {quote.requesterName}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  quote.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30' :
                  quote.status === 'accepted' ? 'bg-green-500/10 text-green-500 border border-green-500/30' :
                  quote.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/30' :
                  'bg-blue-500/10 text-blue-500 border border-blue-500/30'
                }`}>
                  {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                </span>
                <span className="bg-purple-500/10 text-purple-500 border border-purple-500/30 px-3 py-2 rounded-full text-sm font-medium">
                  {quote.platform}
                </span>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-400">Budget Range</span>
                  </div>
                  <p className="text-lg font-bold text-white">{quote.budget}</p>
                </div>

                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-400">Received Date</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {new Date(quote.receivedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                {quote.preferredStartDate && (
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <span className="text-sm text-gray-400">Preferred Start</span>
                    </div>
                    <p className="text-lg font-bold text-white">{quote.preferredStartDate}</p>
                  </div>
                )}

                {quote.urgency && (
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      <span className="text-sm text-gray-400">Urgency</span>
                    </div>
                    <p className="text-lg font-bold text-white">{quote.urgency}</p>
                  </div>
                )}

                {quote.location && (
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-gray-400">Location</span>
                    </div>
                    <p className="text-lg font-bold text-white">{quote.location}</p>
                  </div>
                )}

                {quote.category && (
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-5 h-5 text-cyan-500" />
                      <span className="text-sm text-gray-400">Category</span>
                    </div>
                    <p className="text-lg font-bold text-white">{quote.category}</p>
                  </div>
                )}
              </div>

              {/* Project Description */}
              <div className="mb-6">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#24c6dc]" />
                  Project Description
                </h3>
                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {quote.description}
                  </p>
                </div>
              </div>

              {/* Requester Information */}
              <div className="mb-6">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-500" />
                  About the Requester
                </h3>
                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-xl">
                      {quote.requesterAvatar}
                    </div>
                    <div>
                      <p className="text-white font-medium">{quote.requesterName}</p>
                      <p className="text-gray-400 text-sm">Active on {quote.platform}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attachments (if any) */}
              {quote.attachments && quote.attachments.length > 0 && (
                <div>
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Attachments
                  </h3>
                  <div className="space-y-2">
                    {quote.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="bg-[#111] border border-gray-800 rounded-xl p-3 flex items-center justify-between hover:border-[#24c6dc]/50 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-500" />
                          </div>
                          <span className="text-gray-300 text-sm">{attachment}</span>
                        </div>
                        <button className="text-[#24c6dc] text-sm hover:underline">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-all"
              >
                Close
              </button>
              
              <div className="flex gap-3">
                {onMessage && (
                  <button
                    onClick={onMessage}
                    className="px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-all flex items-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Message
                  </button>
                )}
                
                {onSubmitQuote && quote.status === 'pending' && (
                  <button
                    onClick={onSubmitQuote}
                    className="px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-lg text-white font-medium hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Submit Quote
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
