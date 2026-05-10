import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, Plus, Edit, Trash2, Eye, Search, Filter,
  Trophy, MapPin, Users, DollarSign, CheckCircle, XCircle,
  Clock, ExternalLink, Star, Zap, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

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
  registrationLink: string;
  featured: boolean;
  status: 'approved' | 'pending' | 'rejected';
  submittedBy?: string;
  submittedAt?: string;
  image: string;
}

export function EventManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [viewTab, setViewTab] = useState<'approved' | 'submissions'>('approved');

  // Mock data - approved events
  const [approvedEvents, setApprovedEvents] = useState<Event[]>([
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
      registrationLink: 'https://sih.gov.in',
      featured: true,
      status: 'approved',
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
      registrationLink: 'https://codeforgood.tcs.com',
      featured: true,
      status: 'approved',
      image: '💻'
    }
  ]);

  // Mock data - student submissions (pending approval)
  const [submissions, setSubmissions] = useState<Event[]>([
    {
      id: 101,
      title: 'Google Developer Student Clubs Workshop',
      type: 'workshop',
      organizer: 'Google DSC IIT Delhi',
      date: 'Jan 28, 2025',
      location: 'IIT Delhi',
      mode: 'offline',
      prize: 'Free',
      participants: 0,
      maxParticipants: 100,
      difficulty: 'Beginner',
      tags: ['Android', 'Flutter', 'Mobile Dev'],
      description: 'Hands-on workshop on building Android apps with Flutter. Learn from Google experts.',
      requirements: ['Laptop', 'Basic Programming Knowledge'],
      registrationDeadline: 'Jan 25, 2025',
      registrationLink: 'https://gdsc.iitd.ac.in/workshop',
      featured: false,
      status: 'pending',
      submittedBy: 'rahul@iitd.ac.in',
      submittedAt: '2 hours ago',
      image: '📱'
    },
    {
      id: 102,
      title: 'MLH Hackcon India',
      type: 'conference',
      organizer: 'Major League Hacking',
      date: 'Feb 5, 2025',
      endDate: 'Feb 7, 2025',
      location: 'Bangalore',
      mode: 'hybrid',
      prize: 'Free Pass',
      participants: 0,
      maxParticipants: 500,
      difficulty: 'Intermediate',
      tags: ['Conference', 'Networking', 'Hackathon'],
      description: 'Connect with hackathon organizers, sponsors, and fellow hackers from across India.',
      requirements: ['Student ID', 'Resume'],
      registrationDeadline: 'Jan 30, 2025',
      registrationLink: 'https://mlh.io/hackcon-india',
      featured: false,
      status: 'pending',
      submittedBy: 'priya@nitk.edu.in',
      submittedAt: '5 hours ago',
      image: '🌐'
    }
  ]);

  const handleDeleteEvent = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setApprovedEvents(approvedEvents.filter(e => e.id !== id));
      toast.success('Event deleted successfully');
    }
  };

  const handleApproveSubmission = (event: Event) => {
    // Move from submissions to approved events
    setSubmissions(submissions.filter(e => e.id !== event.id));
    setApprovedEvents([...approvedEvents, { ...event, status: 'approved' }]);
    toast.success(`Event "${event.title}" approved! +25 Rep awarded to ${event.submittedBy}`);
  };

  const handleRejectSubmission = (event: Event) => {
    if (confirm(`Reject "${event.title}"? The submitter will be notified.`)) {
      setSubmissions(submissions.filter(e => e.id !== event.id));
      toast.error(`Event "${event.title}" rejected`);
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

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'online': return 'bg-blue-500/20 text-blue-400';
      case 'offline': return 'bg-purple-500/20 text-purple-400';
      case 'hybrid': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl font-bold">Event Management</h2>
          <p className="text-gray-400 text-sm">Manage events and student submissions</p>
        </div>
        <button
          onClick={() => {
            setEditingEvent(null);
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all font-semibold"
        >
          <Plus size={20} />
          Add New Event
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="text-purple-400" size={24} />
            <span className="text-gray-400 text-sm">Total Events</span>
          </div>
          <p className="text-white text-3xl font-bold">{approvedEvents.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-amber-400" size={24} />
            <span className="text-gray-400 text-sm">Pending Review</span>
          </div>
          <p className="text-white text-3xl font-bold">{submissions.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Star className="text-cyan-400" size={24} />
            <span className="text-gray-400 text-sm">Featured Events</span>
          </div>
          <p className="text-white text-3xl font-bold">{approvedEvents.filter(e => e.featured).length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-green-400" size={24} />
            <span className="text-gray-400 text-sm">Total Participants</span>
          </div>
          <p className="text-white text-3xl font-bold">{approvedEvents.reduce((sum, e) => sum + e.participants, 0)}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setViewTab('approved')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            viewTab === 'approved'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          Approved Events ({approvedEvents.length})
        </button>
        <button
          onClick={() => setViewTab('submissions')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
            viewTab === 'submissions'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          Student Submissions ({submissions.length})
          {submissions.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {submissions.length}
            </span>
          )}
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      {/* Approved Events View */}
      {viewTab === 'approved' && (
        <div className="grid grid-cols-1 gap-4">
          {approvedEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{event.image}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-xl font-bold">{event.title}</h3>
                        {event.featured && (
                          <Star className="text-amber-400 fill-amber-400" size={18} />
                        )}
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${getTypeColor(event.type)}`}>
                          {event.type.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getModeColor(event.mode)}`}>
                          {event.mode}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">Organized by {event.organizer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingEvent(event);
                          setShowAddModal(true);
                        }}
                        className="p-2 hover:bg-blue-500/10 border border-white/10 rounded-lg transition-all group"
                      >
                        <Edit size={18} className="text-gray-400 group-hover:text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 hover:bg-red-500/10 border border-white/10 rounded-lg transition-all group"
                      >
                        <Trash2 size={18} className="text-gray-400 group-hover:text-red-400" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 text-sm">{event.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-purple-400" size={16} />
                      <span className="text-gray-300 text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-cyan-400" size={16} />
                      <span className="text-gray-300 text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="text-amber-400" size={16} />
                      <span className="text-gray-300 text-sm">{event.prize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="text-green-400" size={16} />
                      <span className="text-gray-300 text-sm">{event.participants} joined</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {event.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Student Submissions View */}
      {viewTab === 'submissions' && (
        <div className="grid grid-cols-1 gap-4">
          {submissions.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <CheckCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h4 className="text-white font-bold text-xl mb-2">No Pending Submissions</h4>
              <p className="text-gray-400">All student event submissions have been reviewed</p>
            </div>
          ) : (
            submissions.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/30 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{event.image}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white text-xl font-bold">{event.title}</h3>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${getTypeColor(event.type)}`}>
                            {event.type.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-400 flex items-center gap-1">
                            <Clock size={12} />
                            Pending Review
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">Organized by {event.organizer}</p>
                        <p className="text-amber-400 text-xs mt-1">
                          Submitted by {event.submittedBy} • {event.submittedAt}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 text-sm">{event.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-purple-400" size={16} />
                        <span className="text-gray-300 text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-cyan-400" size={16} />
                        <span className="text-gray-300 text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="text-amber-400" size={16} />
                        <span className="text-gray-300 text-sm">{event.prize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="text-blue-400" size={16} />
                        <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
                          View Link
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleApproveSubmission(event)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm"
                      >
                        <CheckCircle size={16} />
                        Approve Event (+25 Rep to submitter)
                      </button>
                      <button
                        onClick={() => handleRejectSubmission(event)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all font-semibold text-sm"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {showAddModal && (
        <AddEventModal
          event={editingEvent}
          onClose={() => {
            setShowAddModal(false);
            setEditingEvent(null);
          }}
          onSave={(event) => {
            if (editingEvent) {
              setApprovedEvents(approvedEvents.map(e => e.id === event.id ? event : e));
              toast.success('Event updated successfully');
            } else {
              setApprovedEvents([...approvedEvents, { ...event, id: Date.now(), status: 'approved' }]);
              toast.success('Event added successfully');
            }
            setShowAddModal(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
}

// Add/Edit Event Modal Component
interface AddEventModalProps {
  event: Event | null;
  onClose: () => void;
  onSave: (event: Event) => void;
}

function AddEventModal({ event, onClose, onSave }: AddEventModalProps) {
  const [formData, setFormData] = useState<Partial<Event>>(event || {
    title: '',
    type: 'hackathon',
    organizer: '',
    date: '',
    endDate: '',
    location: '',
    mode: 'online',
    prize: '',
    participants: 0,
    maxParticipants: 0,
    difficulty: 'Beginner',
    tags: [],
    description: '',
    requirements: [],
    registrationDeadline: '',
    registrationLink: '',
    featured: false,
    image: '🏆'
  });

  const [tagInput, setTagInput] = useState('');
  const [reqInput, setReqInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Event);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-[#111] border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-white text-2xl font-bold">
            {event ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <XCircle className="text-gray-400" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Event Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                placeholder="Smart India Hackathon"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Organizer *</label>
              <input
                type="text"
                required
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                placeholder="Ministry of Education"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Event Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
              >
                <option value="hackathon">Hackathon</option>
                <option value="competition">Competition</option>
                <option value="workshop">Workshop</option>
                <option value="conference">Conference</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Mode *</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value as any })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Start Date *</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                placeholder="Jan 15, 2025"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">End Date (Optional)</label>
              <input
                type="text"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                placeholder="Jan 17, 2025"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                placeholder="Multiple Cities / Online"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Prize Pool *</label>
              <input
                type="text"
                required
                value={formData.prize}
                onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                placeholder="₹1,00,000"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Max Participants *</label>
              <input
                type="number"
                required
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Difficulty *</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Registration Deadline *</label>
              <input
                type="text"
                required
                value={formData.registrationDeadline}
                onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                placeholder="Dec 31, 2024"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Event Emoji *</label>
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
            <label className="block text-gray-400 text-sm mb-2">Registration Link *</label>
            <input
              type="url"
              required
              value={formData.registrationLink}
              onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
              placeholder="https://event-website.com"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white h-24"
              placeholder="Event description..."
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (tagInput.trim()) {
                      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
                      setTagInput('');
                    }
                  }
                }}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="Add tag and press Enter"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm flex items-center gap-2">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tags: formData.tags?.filter((_, i) => i !== idx) })}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Requirements</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (reqInput.trim()) {
                      setFormData({ ...formData, requirements: [...(formData.requirements || []), reqInput.trim()] });
                      setReqInput('');
                    }
                  }
                }}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="Add requirement and press Enter"
              />
            </div>
            <div className="space-y-2">
              {formData.requirements?.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  {req}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, requirements: formData.requirements?.filter((_, i) => i !== idx) })}
                    className="ml-auto text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 rounded border-white/10"
            />
            <label htmlFor="featured" className="text-white flex items-center gap-2">
              <Star className="text-amber-400" size={18} />
              Feature this event (appears at the top)
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              {event ? 'Update Event' : 'Add Event'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
