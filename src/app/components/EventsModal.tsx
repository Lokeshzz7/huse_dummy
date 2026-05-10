import { useState } from 'react';
import { X, Trophy, Calendar, MapPin, Users, DollarSign, Clock, ExternalLink, Star, Zap, Flame, Award, Target, CheckCircle, Filter, Search, ChevronRight, Rocket, Plus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { SubmitEventModal } from './SubmitEventModal';

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

interface Event {
  id: number;
  title: string;
  type: 'hackathon' | 'competition' | 'workshop' | 'conference';
  organizer: string;
  date: string;
  endDate?: string;
  location: string;
  mode: 'online' | 'offline' | 'hybrid';
  prize: string;
  participants: number;
  maxParticipants: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  description: string;
  requirements: string[];
  registrationDeadline: string;
  featured: boolean;
  spotsLeft?: number;
  image: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Smart India Hackathon 2024',
    type: 'hackathon',
    organizer: 'Ministry of Education',
    date: 'Jan 15, 2025',
    endDate: 'Jan 17, 2025',
    location: 'Multiple Cities',
    mode: 'offline',
    prize: '₹1,00,000',
    participants: 2847,
    maxParticipants: 5000,
    difficulty: 'Advanced',
    tags: ['AI/ML', 'IoT', 'Web Dev', 'Social Impact'],
    description: 'India\'s largest hackathon solving real-world problems. Build innovative solutions for government and industry challenges.',
    requirements: ['Team of 6', 'College ID', 'Working Prototype'],
    registrationDeadline: 'Dec 31, 2024',
    featured: true,
    spotsLeft: 152,
    image: '🏆'
  },
  {
    id: 2,
    title: 'CodeForGood - TCS Hackathon',
    type: 'hackathon',
    organizer: 'Tata Consultancy Services',
    date: 'Jan 20, 2025',
    endDate: 'Jan 21, 2025',
    location: 'Online',
    mode: 'online',
    prize: '₹50,000 + Job Opportunity',
    participants: 1203,
    maxParticipants: 2000,
    difficulty: 'Intermediate',
    tags: ['Social Good', 'Full Stack', 'Mobile App'],
    description: 'Build technology solutions for NGOs and social organizations. Top performers get direct interview opportunities at TCS.',
    requirements: ['Individual or Team', 'GitHub Account', 'Video Demo'],
    registrationDeadline: 'Jan 10, 2025',
    featured: true,
    spotsLeft: 797,
    image: '💻'
  },
  {
    id: 3,
    title: 'UI/UX Design Challenge',
    type: 'competition',
    organizer: 'Figma India',
    date: 'Jan 25, 2025',
    location: 'Online',
    mode: 'online',
    prize: '₹30,000 + Swag',
    participants: 892,
    maxParticipants: 1500,
    difficulty: 'Beginner',
    tags: ['Design', 'UI/UX', 'Figma'],
    description: 'Redesign a popular Indian app. Showcase your design thinking and prototyping skills.',
    requirements: ['Solo Entry', 'Figma File', 'Design Rationale'],
    registrationDeadline: 'Jan 15, 2025',
    featured: false,
    image: '🎨'
  },
  {
    id: 4,
    title: 'Startup Pitch Competition',
    type: 'competition',
    organizer: 'IIT Bombay E-Cell',
    date: 'Feb 5, 2025',
    location: 'IIT Bombay, Mumbai',
    mode: 'offline',
    prize: '₹2,00,000 + Mentorship',
    participants: 156,
    maxParticipants: 200,
    difficulty: 'Advanced',
    tags: ['Startup', 'Business', 'Pitching'],
    description: 'Pitch your startup idea to top VCs and angel investors. Winners get seed funding and 6-month mentorship.',
    requirements: ['Working MVP', 'Pitch Deck', 'Team of 2-4'],
    registrationDeadline: 'Jan 25, 2025',
    featured: true,
    spotsLeft: 44,
    image: '🚀'
  },
  {
    id: 5,
    title: 'AWS Machine Learning Challenge',
    type: 'competition',
    organizer: 'Amazon Web Services',
    date: 'Feb 10, 2025',
    endDate: 'Feb 12, 2025',
    location: 'Online',
    mode: 'online',
    prize: '₹75,000 + AWS Credits',
    participants: 1567,
    maxParticipants: 3000,
    difficulty: 'Advanced',
    tags: ['ML', 'AI', 'Cloud', 'Data Science'],
    description: 'Build ML models using AWS services. Compete on accuracy, scalability, and innovation.',
    requirements: ['AWS Account', 'Jupyter Notebook', 'Model Documentation'],
    registrationDeadline: 'Feb 1, 2025',
    featured: true,
    image: '🤖'
  },
  {
    id: 6,
    title: 'React Workshop by Meta Engineers',
    type: 'workshop',
    organizer: 'Meta (Facebook)',
    date: 'Jan 18, 2025',
    location: 'Online',
    mode: 'online',
    prize: 'Certificate + Swag',
    participants: 2341,
    maxParticipants: 5000,
    difficulty: 'Intermediate',
    tags: ['React', 'Frontend', 'Web Dev'],
    description: 'Learn advanced React patterns from Meta engineers. Live coding session with Q&A.',
    requirements: ['Basic React Knowledge', 'Laptop', 'GitHub Account'],
    registrationDeadline: 'Jan 16, 2025',
    featured: false,
    image: '⚛️'
  },
  {
    id: 7,
    title: 'Blockchain Bootcamp',
    type: 'workshop',
    organizer: 'Polygon Labs',
    date: 'Jan 28, 2025',
    endDate: 'Jan 30, 2025',
    location: 'Bangalore',
    mode: 'hybrid',
    prize: 'NFT Certificate + MATIC Tokens',
    participants: 445,
    maxParticipants: 500,
    difficulty: 'Beginner',
    tags: ['Blockchain', 'Web3', 'Smart Contracts'],
    description: 'Learn blockchain development from scratch. Build your first dApp on Polygon.',
    requirements: ['Laptop', 'MetaMask Wallet'],
    registrationDeadline: 'Jan 22, 2025',
    featured: false,
    spotsLeft: 55,
    image: '🔗'
  },
  {
    id: 8,
    title: 'Google DevFest 2025',
    type: 'conference',
    organizer: 'Google Developer Groups',
    date: 'Feb 15, 2025',
    location: 'Multiple Cities',
    mode: 'hybrid',
    prize: 'Networking + Swag + Workshops',
    participants: 3892,
    maxParticipants: 10000,
    difficulty: 'Beginner',
    tags: ['Android', 'Cloud', 'AI', 'Web'],
    description: 'Annual developer conference by Google. Talks, workshops, and networking with Googlers.',
    requirements: ['Registration Only'],
    registrationDeadline: 'Feb 10, 2025',
    featured: true,
    image: '🎪'
  }
];

export function EventsModal({ isOpen, onClose, currentUser }: EventsModalProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Set<number>>(new Set());
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  if (!isOpen) return null;

  const filteredEvents = mockEvents.filter(event => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleRegister = (event: Event) => {
    setRegisteredEvents(new Set([...registeredEvents, event.id]));
    toast.success(`🎉 Successfully registered for ${event.title}!`);
    toast.info(`Check your email for event details and updates.`);
    
    // Add reputation points for registering
    if (currentUser) {
      const repGain = event.type === 'hackathon' ? 20 : event.type === 'competition' ? 15 : 10;
      toast.success(`+${repGain} reputation points!`);
    }
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hackathon': return <Zap className="w-4 h-4" />;
      case 'competition': return <Trophy className="w-4 h-4" />;
      case 'workshop': return <Target className="w-4 h-4" />;
      case 'conference': return <Users className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'Intermediate': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Advanced': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0F0F0F] border-2 border-purple-500/50 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 rounded-xl">
                <Trophy size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                  Events & Competitions
                </h3>
                <p className="text-gray-400 text-sm">Participate, compete, and earn reputation points</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all font-semibold"
              >
                <Plus size={20} />
                <Sparkles size={16} />
                Submit Event
              </button>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex gap-3 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, tags, or organizers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border border-purple-500/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'hackathon', 'competition', 'workshop', 'conference'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                    selectedType === type
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-black/50 border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              // Event Detail View
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to events
                </button>

                <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-purple-500/30 rounded-2xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="text-6xl">{selectedEvent.image}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white text-3xl font-bold">{selectedEvent.title}</h3>
                          {selectedEvent.featured && (
                            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400">Organized by {selectedEvent.organizer}</p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-lg border ${getDifficultyColor(selectedEvent.difficulty)} font-medium text-sm`}>
                      {selectedEvent.difficulty}
                    </div>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-black/40 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-medium">Date</span>
                      </div>
                      <p className="text-white font-bold text-sm">{selectedEvent.date}</p>
                      {selectedEvent.endDate && (
                        <p className="text-gray-400 text-xs">to {selectedEvent.endDate}</p>
                      )}
                    </div>

                    <div className="bg-black/40 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-cyan-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs font-medium">Location</span>
                      </div>
                      <p className="text-white font-bold text-sm">{selectedEvent.location}</p>
                      <p className="text-gray-400 text-xs capitalize">{selectedEvent.mode}</p>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-amber-400 mb-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs font-medium">Prize Pool</span>
                      </div>
                      <p className="text-white font-bold text-sm">{selectedEvent.prize}</p>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-400 mb-2">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-medium">Participants</span>
                      </div>
                      <p className="text-white font-bold text-sm">{selectedEvent.participants}</p>
                      {selectedEvent.spotsLeft && (
                        <p className="text-green-400 text-xs">{selectedEvent.spotsLeft} spots left</p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-black/40 rounded-xl p-5 mb-6">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-400" />
                      About This Event
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
                  </div>

                  {/* Requirements */}
                  <div className="bg-black/40 rounded-xl p-5 mb-6">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {selectedEvent.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedEvent.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Registration Deadline */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Clock className="w-5 h-5" />
                      <span className="font-bold">Registration Deadline: {selectedEvent.registrationDeadline}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {registeredEvents.has(selectedEvent.id) ? (
                      <button
                        disabled
                        className="flex-1 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Registered Successfully
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(selectedEvent)}
                        className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:from-purple-600 hover:via-pink-600 hover:to-amber-600 text-white px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Rocket className="w-5 h-5" />
                        Register Now
                      </button>
                    )}
                    <button
                      className="px-6 py-4 bg-black/50 border border-purple-500/30 text-white rounded-xl hover:bg-black/70 transition-all flex items-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Website
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Events List View
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 transition-all cursor-pointer group"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{event.image}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-bold group-hover:text-purple-400 transition-colors">
                              {event.title}
                            </h4>
                            {event.featured && (
                              <Flame className="w-4 h-4 text-amber-400" />
                            )}
                          </div>
                          <p className="text-gray-400 text-xs">{event.organizer}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-lg bg-gradient-to-r ${getTypeColor(event.type)} flex items-center gap-1`}>
                        {getTypeIcon(event.type)}
                        <span className="text-white text-xs font-bold capitalize">{event.type}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3 text-purple-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {event.mode}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <DollarSign className="w-3 h-3 text-amber-400" />
                        {event.prize.split('+')[0]}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Users className="w-3 h-3 text-green-400" />
                        {event.participants} joined
                      </div>
                    </div>

                    {event.spotsLeft && event.spotsLeft < 100 && (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 mb-3">
                        <p className="text-amber-400 text-xs font-bold flex items-center gap-2">
                          <Zap className="w-3 h-3" />
                          Only {event.spotsLeft} spots left!
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {event.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                        {event.tags.length > 2 && (
                          <span className="px-2 py-1 text-gray-400 text-xs">
                            +{event.tags.length - 2}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h4 className="text-white font-bold text-xl mb-2">No Events Found</h4>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Submit Event Modal */}
      <SubmitEventModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        currentUser={currentUser}
      />
    </div>
  );
}