import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Send, ThumbsUp, Award, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  providerAvatar: string;
  projectTitle: string;
  onSubmit: (review: {
    rating: number;
    comment: string;
    categories: {
      communication: number;
      quality: number;
      timeline: number;
      value: number;
    };
    wouldRecommend: boolean;
  }) => void;
}

export function ReviewSubmissionModal({
  isOpen,
  onClose,
  providerName,
  providerAvatar,
  projectTitle,
  onSubmit
}: ReviewSubmissionModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [categories, setCategories] = useState({
    communication: 0,
    quality: 0,
    timeline: 0,
    value: 0
  });
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (comment.trim().length < 20) {
      toast.error('Please write at least 20 characters in your review');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit({
        rating,
        comment,
        categories,
        wouldRecommend
      });
      toast.success('Review submitted successfully!');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const categoryLabels = {
    communication: 'Communication',
    quality: 'Quality of Work',
    timeline: 'Delivery Timeline',
    value: 'Value for Money'
  };

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
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl my-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Write a Review</h2>
                <p className="text-gray-400 text-sm">
                  Share your experience working with {providerName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Project Info */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl">
                    {providerAvatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{providerName}</h3>
                    <p className="text-sm text-gray-400">{projectTitle}</p>
                  </div>
                </div>
              </div>

              {/* Overall Rating */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Overall Rating <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= (hoveredRating || rating)
                              ? 'text-amber-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <span className="text-amber-400 font-medium">
                      {ratingLabels[rating - 1]}
                    </span>
                  )}
                </div>
              </div>

              {/* Category Ratings */}
              <div>
                <label className="block text-white font-medium mb-3">Rate by Category</label>
                <div className="space-y-3">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{label}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setCategories({ ...categories, [key]: star })}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= categories[key as keyof typeof categories]
                                  ? 'text-amber-400 fill-current'
                                  : 'text-gray-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Your Review <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none"
                  placeholder="Share details about your experience working with this provider. What went well? What could be improved?"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    Minimum 20 characters
                  </span>
                  <span className={`text-xs ${comment.length >= 20 ? 'text-green-400' : 'text-gray-400'}`}>
                    {comment.length} characters
                  </span>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => setWouldRecommend(!wouldRecommend)}
                    className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      wouldRecommend
                        ? 'bg-green-500 border-green-500'
                        : 'border-white/20'
                    }`}
                  >
                    {wouldRecommend && <ThumbsUp className="w-4 h-4 text-white" />}
                  </button>
                  <div>
                    <h4 className="text-white font-medium mb-1">Would you recommend this provider?</h4>
                    <p className="text-sm text-gray-400">
                      Your recommendation helps other users make informed decisions
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-cyan-400 font-medium mb-1">Tips for writing a helpful review</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Be specific about what you liked or didn't like</li>
                      <li>• Mention communication, quality, and timeliness</li>
                      <li>• Be honest but constructive</li>
                      <li>• Focus on facts and your personal experience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 p-6 border-t border-white/10">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all font-medium"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || rating === 0 || comment.length < 20}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
