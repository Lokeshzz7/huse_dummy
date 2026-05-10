import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, Search, ArrowLeft, TrendingUp, Mail, Linkedin, Calendar, Sparkles, FileText, Star } from 'lucide-react';
import { PremiumContactCard } from '../components/contact/PremiumContactCard';

interface Connection {
  id: string;
  type: 'email' | 'linkedin' | 'calendar';
  withUser: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  context?: string;
  timestamp: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  specialty?: string;
  email: string;
  linkedinUrl?: string;
  calendarUrl?: string;
  tier: string;
  reputationScore: number;
  completedProjects: number;
  verified: boolean;
  lastContact?: string;
}

export function QuotifyConnections() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Ananya Patel',
      avatar: '👩‍🎨',
      role: 'UI/UX Designer',
      specialty: 'Mobile App Design',
      email: 'ananya.patel@design.com',
      linkedinUrl: 'https://linkedin.com/in/ananyapatel',
      calendarUrl: 'https://calendly.com/ananyapatel',
      tier: 'Gold',
      reputationScore: 4.8,
      completedProjects: 45,
      verified: true,
      lastContact: '2 days ago'
    },
    {
      id: '2',
      name: 'Rohan Sharma',
      avatar: '🧑‍💻',
      role: 'Full Stack Developer',
      specialty: 'E-commerce Solutions',
      email: 'rohan.sharma@dev.io',
      linkedinUrl: 'https://linkedin.com/in/rohansharma',
      calendarUrl: 'https://calendly.com/rohansharma',
      tier: 'Platinum',
      reputationScore: 4.9,
      completedProjects: 78,
      verified: true,
      lastContact: '5 days ago'
    },
    {
      id: '3',
      name: 'Priya Menon',
      avatar: '👩‍💼',
      role: 'Digital Marketing Expert',
      specialty: 'SEO & Content Strategy',
      email: 'priya.menon@marketing.co',
      linkedinUrl: 'https://linkedin.com/in/priyamenon',
      tier: 'Silver',
      reputationScore: 4.6,
      completedProjects: 32,
      verified: true,
      lastContact: '1 week ago'
    },
    {
      id: '4',
      name: 'Vikram Iyer',
      avatar: '🧑‍🔧',
      role: 'DevOps Engineer',
      specialty: 'Cloud Infrastructure',
      email: 'vikram.iyer@cloud.dev',
      linkedinUrl: 'https://linkedin.com/in/vikramiyer',
      calendarUrl: 'https://calendly.com/vikramiyer',
      tier: 'Diamond',
      reputationScore: 5.0,
      completedProjects: 120,
      verified: true,
      lastContact: '2 weeks ago'
    },
    {
      id: '5',
      name: 'Sneha Kapoor',
      avatar: '👩‍🎨',
      role: 'Brand Designer',
      specialty: 'Logo & Brand Identity',
      email: 'sneha.kapoor@brand.studio',
      linkedinUrl: 'https://linkedin.com/in/snehakapoor',
      tier: 'Bronze',
      reputationScore: 4.3,
      completedProjects: 18,
      verified: false,
      lastContact: '3 weeks ago'
    },
    {
      id: '6',
      name: 'Arjun Reddy',
      avatar: '🧑‍💻',
      role: 'Mobile App Developer',
      specialty: 'React Native & Flutter',
      email: 'arjun.reddy@apps.dev',
      linkedinUrl: 'https://linkedin.com/in/arjunreddy',
      calendarUrl: 'https://calendly.com/arjunreddy',
      tier: 'Gold',
      reputationScore: 4.7,
      completedProjects: 56,
      verified: true,
      lastContact: '1 month ago'
    }
  ]);

  const [recentConnections] = useState<Connection[]>([
    {
      id: '1',
      type: 'email',
      withUser: {
        id: contacts[0].id,
        name: contacts[0].name,
        avatar: contacts[0].avatar,
        role: contacts[0].role,
      },
      context: 'Quote Request - Website Redesign',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      type: 'linkedin',
      withUser: {
        id: contacts[1].id,
        name: contacts[1].name,
        avatar: contacts[1].avatar,
        role: contacts[1].role,
      },
      context: 'Service Inquiry',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      type: 'calendar',
      withUser: {
        id: contacts[2].id,
        name: contacts[2].name,
        avatar: contacts[2].avatar,
        role: contacts[2].role,
      },
      context: 'Project Discussion',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.specialty && contact.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      Bronze: 'text-amber-600',
      Silver: 'text-gray-400',
      Gold: 'text-yellow-400',
      Platinum: 'text-purple-400',
      Diamond: 'text-cyan-400',
      Elite: 'text-pink-400',
    };
    return colors[tier] || 'text-gray-400';
  };

  const getTierGradient = (tier: string) => {
    const gradients: Record<string, string> = {
      Bronze: 'from-amber-600/20 to-amber-800/20',
      Silver: 'from-gray-400/20 to-gray-600/20',
      Gold: 'from-yellow-400/20 to-yellow-600/20',
      Platinum: 'from-purple-400/20 to-purple-600/20',
      Diamond: 'from-cyan-400/20 to-cyan-600/20',
      Elite: 'from-pink-400/20 to-pink-600/20',
    };
    return gradients[tier] || 'from-gray-400/20 to-gray-600/20';
  };

  const iconMap = {
    email: Mail,
    linkedin: Linkedin,
    calendar: Calendar,
  };

  const actionText = {
    email: 'Sent quote via email',
    linkedin: 'Connected on LinkedIn',
    calendar: 'Scheduled consultation',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/quotify/dashboard')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <FileText className="text-blue-400" size={24} />
                <h1 className="text-white text-xl font-bold">Service Provider Connections</h1>
              </div>
            </div>
            <div className="hidden md:block text-sm text-white/60">
              Connect via LinkedIn & Email
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 relative z-10">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Service Providers List */}
            <div className="lg:col-span-1 space-y-4">
              {/* Info Banner */}
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Professional Quote System
                </h3>
                <p className="text-sm text-white/70 mb-3">
                  Connect with verified service providers via professional channels.
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-300 bg-blue-500/10 px-3 py-2 rounded-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>Select a provider to view contact options</span>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0F0F0F] border border-blue-500/20 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/40"
                />
              </div>

              {/* Provider List */}
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-blue-500/10 transition-colors rounded-xl border ${
                      selectedContact === contact.id
                        ? 'bg-blue-500/10 border-blue-500/30'
                        : 'bg-[#0F0F0F]/40 border-blue-500/10'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getTierGradient(contact.tier)} flex items-center justify-center text-2xl border border-blue-500/20`}>
                      {contact.avatar}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-bold text-sm truncate">
                          {contact.name}
                        </h4>
                        <span className={`text-xs font-semibold ${getTierColor(contact.tier)}`}>
                          {contact.tier}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs truncate">{contact.role}</p>
                      {contact.specialty && (
                        <p className="text-gray-500 text-xs truncate">{contact.specialty}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-white/60">{contact.reputationScore}/5.0</span>
                        <span className="text-xs text-white/40">• {contact.completedProjects} projects</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Provider Details */}
            <div className="lg:col-span-2 space-y-6">
              {selectedContactData ? (
                <>
                  <PremiumContactCard
                    user={{
                      id: selectedContactData.id,
                      name: selectedContactData.name,
                      email: selectedContactData.email,
                      linkedinUrl: selectedContactData.linkedinUrl,
                      calendarUrl: selectedContactData.calendarUrl,
                      role: selectedContactData.specialty
                        ? `${selectedContactData.role} • ${selectedContactData.specialty}`
                        : selectedContactData.role,
                      avatar: selectedContactData.avatar,
                      tier: selectedContactData.tier,
                      reputationScore: selectedContactData.reputationScore,
                    }}
                    context={{
                      type: 'quote_request',
                      projectName: 'Website Development Project'
                    }}
                    platform="quotify"
                  />

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#0F0F0F]/40 border border-blue-500/20 rounded-xl p-4 text-center">
                      <div className={`text-2xl font-bold ${getTierColor(selectedContactData.tier)}`}>
                        {selectedContactData.tier}
                      </div>
                      <div className="text-xs text-white/60 mt-1">Tier Status</div>
                    </div>
                    <div className="bg-[#0F0F0F]/40 border border-blue-500/20 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400" />
                        {selectedContactData.reputationScore}
                      </div>
                      <div className="text-xs text-white/60 mt-1">Rating</div>
                    </div>
                    <div className="bg-[#0F0F0F]/40 border border-blue-500/20 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {selectedContactData.completedProjects}
                      </div>
                      <div className="text-xs text-white/60 mt-1">Completed</div>
                    </div>
                  </div>

                  {/* Recent Connections Timeline */}
                  {recentConnections.length > 0 && (
                    <div className="bg-[#0F0F0F]/40 border border-blue-500/20 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-bold text-white">Recent Connections</h3>
                      </div>
                      <div className="space-y-3">
                        {recentConnections.map((connection) => {
                          const Icon = iconMap[connection.type];
                          return (
                            <motion.div
                              key={connection.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
                            >
                              <div className="p-2 rounded-lg bg-white/10 text-blue-400">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-medium">
                                  {actionText[connection.type]} to{' '}
                                  <span className="font-bold">{connection.withUser.name}</span>
                                </p>
                                <p className="text-sm text-white/60">{connection.withUser.role}</p>
                                {connection.context && (
                                  <p className="text-xs text-white/50 mt-1">Re: {connection.context}</p>
                                )}
                              </div>
                              <span className="text-xs text-white/50 whitespace-nowrap">
                                {formatTimeAgo(connection.timestamp)}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px] bg-[#0F0F0F]/40 border border-blue-500/20 rounded-2xl">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-bold mb-2">Select a Service Provider</h3>
                    <p className="text-gray-400">Choose a provider from the left to view their contact details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
