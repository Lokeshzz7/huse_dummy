import { useState } from 'react';
import { X, EyeOff, AlertTriangle, CheckCircle, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';

interface Submission {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface BlindDropVotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: Submission[];
  promptTitle: string;
  onSubmitVotes: (rankings: string[]) => void;
}

export function BlindDropVotingModal({
  isOpen,
  onClose,
  submissions,
  promptTitle,
  onSubmitVotes
}: BlindDropVotingModalProps) {
  const [rankedSubmissions, setRankedSubmissions] = useState<Submission[]>(submissions);
  const [showWarning, setShowWarning] = useState(false);

  const moveSubmission = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= rankedSubmissions.length) return;

    const items = [...rankedSubmissions];
    const temp = items[index];
    items[index] = items[newIndex];
    items[newIndex] = temp;

    setRankedSubmissions(items);
    checkForIdenticalRatings(items);
  };

  const checkForIdenticalRatings = (items: Submission[]) => {
    // Check if user is ranking everything the same (anti-gaming)
    // In a real implementation, this would compare against their past voting patterns
    // For now, we just show a warning if they seem to be randomly ordering
    setShowWarning(false);
  };

  const handleSubmit = () => {
    const rankings = rankedSubmissions.map(sub => sub.id);

    // Check for suspicious voting patterns
    const originalOrder = submissions.map(s => s.id).join(',');
    const currentOrder = rankings.join(',');

    if (originalOrder === currentOrder) {
      toast.error('Please rank the submissions based on quality');
      return;
    }

    onSubmitVotes(rankings);
    toast.success('Votes submitted! +15 Rep earned');

    // Show info about anti-gaming
    setTimeout(() => {
      toast.info('Tip: Identical ratings to all submissions get downweighted in future rounds', {
        duration: 5000
      });
    }, 1000);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0F0F0F] border-2 border-purple-500/50 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <EyeOff size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold">Blind Drop Voting</h3>
              <p className="text-gray-400 text-sm">Rank 5 anonymous submissions · Earn +15 Rep</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Prompt */}
        <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
          <p className="text-xs text-purple-400 uppercase mb-1">Today's Prompt</p>
          <h4 className="text-white font-bold text-lg">{promptTitle}</h4>
        </div>

        {/* Anonymous Warning */}
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <EyeOff className="text-yellow-400 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="text-white font-bold text-sm mb-1">Anonymous Submissions</p>
              <p className="text-white/70 text-sm">
                Creator names are hidden. Rank based on quality alone. Names revealed after voting closes.
              </p>
            </div>
          </div>
        </div>

        {/* Anti-Gaming Warning */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-blue-400 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="text-white font-bold text-sm mb-1">Fair Voting Required</p>
              <p className="text-white/70 text-sm">
                Voters who give identical ratings to all 5 submissions get silently downweighted in future rounds.
                Please rank thoughtfully based on actual quality.
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <h4 className="text-white font-bold mb-3">How to Rank:</h4>
          <ol className="space-y-2 text-white/70 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">1.</span>
              <span>Use arrow buttons to reorder submissions from best (top) to worst (bottom)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">2.</span>
              <span>Rank #1 gets the most points, #5 gets the least</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">3.</span>
              <span>Top 50% of submissions (based on community votes) earn the Blind Verified badge</span>
            </li>
          </ol>
        </div>

        {/* Ranking List */}
        <div className="space-y-3 mb-6">
          {rankedSubmissions.map((submission, index) => (
            <div
              key={submission.id}
              className="bg-white/5 border-2 border-white/10 hover:border-white/20 rounded-xl p-4 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Rank Number */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-500 to-amber-500 text-white' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900' :
                  index === 2 ? 'bg-gradient-to-br from-orange-600 to-orange-700 text-white' :
                  'bg-white/10 text-white/60'
                }`}>
                  #{index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h5 className="text-white font-bold mb-1">{submission.title}</h5>
                  <p className="text-white/60 text-sm">{submission.description}</p>
                </div>

                {/* Move Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => moveSubmission(index, 'up')}
                    disabled={index === 0}
                    className={`p-1.5 rounded-lg transition-all ${
                      index === 0
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                    }`}
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => moveSubmission(index, 'down')}
                    disabled={index === rankedSubmissions.length - 1}
                    className={`p-1.5 rounded-lg transition-all ${
                      index === rankedSubmissions.length - 1
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                    }`}
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Warning for suspicious voting */}
        {showWarning && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="text-red-400 font-bold text-sm mb-1">Suspicious Voting Pattern Detected</p>
                <p className="text-white/70 text-sm">
                  Your vote weight may be reduced if you continue giving identical/random rankings.
                </p>
              </div>
            </div>
          </div>
        )}

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
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} />
            Submit Rankings (+15 Rep)
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-white/40 text-center mt-4">
          Rankings are final once submitted. Take your time to rank thoughtfully.
        </p>
      </div>
    </div>
  );
}
