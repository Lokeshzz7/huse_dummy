import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Trophy, Calendar, MapPin, Users, DollarSign, 
  ExternalLink, Star, Send, AlertCircle, CheckCircle,
  Sparkles, Plus
} from 'lucide-react';
import { toast } from 'sonner';

interface SubmitEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

export function SubmitEventModal({ isOpen, onClose, currentUser }: SubmitEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'hackathon' as 'hackathon' | 'competition' | 'workshop' | 'conference',
    organizer: '',
    date: '',
    endDate: '',
    location: '',
    mode: 'online' as 'online' | 'offline' | 'hybrid',
    prize: '',
    maxParticipants: '',
    difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    tags: [] as string[],
    description: '',
    requirements: [] as string[],
    registrationDeadline: '',
    registrationLink: '',
    image: '🏆'
  });

  const [tagInput, setTagInput] = useState('');
  const [reqInput, setReqInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate registration link
    try {
      new URL(formData.registrationLink);
    } catch {
      toast.error('Please enter a valid registration link URL');
      return;
    }

    // Submit event
    toast.success('Event submitted for review!', {
      description: 'You will earn +25 Rep once approved by admin'
    });

    // Reset form
    setFormData({
      title: '',
      type: 'hackathon',
      organizer: '',
      date: '',
      endDate: '',
      location: '',
      mode: 'online',
      prize: '',
      maxParticipants: '',
      difficulty: 'Beginner',
      tags: [],
      description: '',
      requirements: [],
      registrationDeadline: '',
      registrationLink: '',
      image: '🏆'
    });

    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== index) });
  };

  const addRequirement = () => {
    if (reqInput.trim() && !formData.requirements.includes(reqInput.trim())) {
      setFormData({ ...formData, requirements: [...formData.requirements, reqInput.trim()] });
      setReqInput('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData({ ...formData, requirements: formData.requirements.filter((_, i) => i !== index) });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hackathon': return 'from-purple-500 to-pink-500';
      case 'competition': return 'from-amber-500 to-orange-500';
      case 'workshop': return 'from-blue-500 to-cyan-500';
      case 'conference': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#111] border border-purple-500/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#111] border-b border-purple-500/20 p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-white text-2xl font-bold flex items-center gap-2">
                <Sparkles className="text-amber-400" size={28} />
                Submit Event Suggestion
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Earn <span className="text-amber-400 font-bold">+25 Rep</span> when your event is approved!
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="text-gray-400" size={24} />
            </button>
          </div>

          {/* Info Banner */}
          <div className="p-6 pt-4">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-purple-300 mb-1">Submission Guidelines:</p>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Only suggest legitimate events (hackathons, competitions, workshops, conferences)</li>
                    <li>• Provide accurate details and valid registration links</li>
                    <li>• Your submission will be reviewed by admins within 24-48 hours</li>
                    <li>• Approved events earn you <span className="text-amber-400 font-bold">+25 Rep</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Event Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Smart India Hackathon 2024"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Organizer <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Ministry of Education"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Event Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="hackathon">Hackathon</option>
                    <option value="competition">Competition</option>
                    <option value="workshop">Workshop</option>
                    <option value="conference">Conference</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Event Mode <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Start Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Jan 15, 2025"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    End Date (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Jan 17, 2025"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Location <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Multiple Cities / Online"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Prize Pool <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.prize}
                    onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="₹1,00,000"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Max Participants <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Difficulty Level <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Registration Deadline <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.registrationDeadline}
                    onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Dec 31, 2024"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">
                    Event Emoji <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-4xl text-center"
                    placeholder="🏆"
                    maxLength={2}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">
                  Registration Link <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="url"
                    required
                    value={formData.registrationLink}
                    onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="https://event-website.com/register"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 h-32 resize-none"
                  placeholder="Brief description of the event, what participants can expect, and why it's worth attending..."
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">
                  Tags (Press Enter to add)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="AI/ML, Web Dev, IoT..."
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg text-sm flex items-center gap-2"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(idx)}
                        className="text-red-400 hover:text-red-300 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">
                  Requirements (Press Enter to add)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={reqInput}
                    onChange={(e) => setReqInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addRequirement();
                      }
                    }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Team of 4, College ID, Laptop..."
                  />
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm bg-white/5 px-3 py-2 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span className="flex-1">{req}</span>
                      <button
                        type="button"
                        onClick={() => removeRequirement(idx)}
                        className="text-red-400 hover:text-red-300 text-xs font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-6 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Submit Event for Review
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-amber-200">
                  Your submission will be reviewed by our admin team. If approved, the event will be listed in the Events section and you'll receive <span className="font-bold">+25 Rep</span> as a reward!
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
