import { useState, useEffect } from 'react';
import { X, Clock, Star, AlertCircle, CheckCircle, Users } from 'lucide-react';
import { toast } from 'sonner';

interface PeerReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectDescription: string;
  studentName: string;
  onSubmitReview: (rating: number, feedback: string) => void;
}

export function PeerReviewModal({
  isOpen,
  onClose,
  projectTitle,
  projectDescription,
  studentName,
  onSubmitReview
}: PeerReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [startTime] = useState(Date.now());

  const MIN_REVIEW_TIME = 120; // 2 minutes in seconds
  const MIN_FEEDBACK_LENGTH = 50;

  // Timer effect
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeElapsed(elapsed);

      // Enable submit after 2 minutes
      if (elapsed >= MIN_REVIEW_TIME) {
        setCanSubmit(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, startTime]);

  const handleSubmit = () => {
    // Validation
    if (!canSubmit) {
      toast.error('Please spend at least 2 minutes reviewing the project');
      return;
    }

    if (rating === 0) {
      toast.error('Please provide a rating (1-5 stars)');
      return;
    }

    if (feedback.length < MIN_FEEDBACK_LENGTH) {
      toast.error(`Feedback must be at least ${MIN_FEEDBACK_LENGTH} characters`);
      return;
    }

    // Submit review
    onSubmitReview(rating, feedback);
    toast.success('Review submitted! +50 Rep earned');

    // Reset and close
    setRating(0);
    setFeedback('');
    setTimeElapsed(0);
    setCanSubmit(false);
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timeRemaining = Math.max(0, MIN_REVIEW_TIME - timeElapsed);
  const feedbackValid = feedback.length >= MIN_FEEDBACK_LENGTH;
  const ratingValid = rating > 0;
  const allValid = canSubmit && feedbackValid && ratingValid;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0F0F0F] border-2 border-blue-500/50 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold">Peer Review</h3>
              <p className="text-gray-400 text-sm">Earn +50 Rep for thoughtful feedback</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Timer Warning */}
        <div className={`mb-6 p-4 rounded-xl border ${
          canSubmit
            ? 'bg-green-500/10 border-green-500/30'
            : 'bg-yellow-500/10 border-yellow-500/30'
        }`}>
          <div className="flex items-center gap-3">
            <Clock className={canSubmit ? 'text-green-400' : 'text-yellow-400'} size={20} />
            <div className="flex-1">
              <p className={`font-bold ${canSubmit ? 'text-green-400' : 'text-yellow-400'}`}>
                {canSubmit ? '✓ Minimum time reached' : 'Minimum 2 minutes required'}
              </p>
              <p className="text-white/60 text-sm">
                {canSubmit
                  ? 'Submit button is now unlocked'
                  : `Time remaining: ${formatTime(timeRemaining)}`}
              </p>
            </div>
            <div className={`text-2xl font-bold ${canSubmit ? 'text-green-400' : 'text-yellow-400'}`}>
              {formatTime(timeElapsed)}
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="mb-6 p-6 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-xs text-white/50 uppercase mb-2">Project by {studentName}</p>
          <h4 className="text-white font-bold text-lg mb-3">{projectTitle}</h4>
          <p className="text-white/70 text-sm">{projectDescription}</p>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-white font-bold mb-3">
            Rating (1-5 stars) *
          </label>
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={40}
                  className={`${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-white/60">
            {rating === 0 && 'Select a rating'}
            {rating === 1 && '1 star - Needs significant improvement'}
            {rating === 2 && '2 stars - Below expectations'}
            {rating === 3 && '3 stars - Meets expectations'}
            {rating === 4 && '4 stars - Good work'}
            {rating === 5 && '5 stars - Excellent work'}
          </p>
        </div>

        {/* Feedback */}
        <div className="mb-6">
          <label className="block text-white font-bold mb-2">
            Written Feedback (minimum {MIN_FEEDBACK_LENGTH} characters) *
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
            className="w-full bg-black border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Provide constructive feedback on the project. What did they do well? What could be improved? Be specific and helpful."
          />
          <div className="flex items-center justify-between mt-2">
            <p className={`text-sm ${
              feedbackValid ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {feedback.length} / {MIN_FEEDBACK_LENGTH} characters
              {feedbackValid && ' ✓'}
            </p>
          </div>
        </div>

        {/* Public Warning */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-400 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="text-white font-bold text-sm mb-1">Your Review is Public</p>
              <p className="text-white/70 text-sm">
                Your feedback will be displayed on the project card with your name attached.
                This prevents anonymous rubber-stamping and encourages thoughtful reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!allValid}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
              allValid
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle size={20} />
            Submit Review (+50 Rep)
          </button>
        </div>

        {/* Validation Messages */}
        {!allValid && (
          <div className="mt-4 space-y-2">
            {!canSubmit && (
              <p className="text-sm text-yellow-400 flex items-center gap-2">
                <Clock size={14} />
                Wait {formatTime(timeRemaining)} to unlock submit
              </p>
            )}
            {!ratingValid && (
              <p className="text-sm text-yellow-400 flex items-center gap-2">
                <Star size={14} />
                Please provide a rating
              </p>
            )}
            {!feedbackValid && (
              <p className="text-sm text-yellow-400 flex items-center gap-2">
                <AlertCircle size={14} />
                Feedback needs {MIN_FEEDBACK_LENGTH - feedback.length} more characters
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
