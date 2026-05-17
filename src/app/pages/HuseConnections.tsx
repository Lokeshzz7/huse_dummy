import { useState, useEffect } from 'react';
import { apiGet } from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, Search, ArrowLeft, TrendingUp, Mail, Linkedin, Calendar, Sparkles } from 'lucide-react';
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
  email: string;
  linkedinUrl?: string;
  calendarUrl?: string;
  verified: boolean;
  lastContact?: string;
}

export function HuseConnections() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  // Contacts and recent connections from backend
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [recentConnections, setRecentConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await apiGet<any[]>('/connections');
        // Map backend data to Contact/Connection interface
        const mappedContacts: Contact[] = data.map(c => ({
          id: c.withUser.id.toString(),
          name: c.withUser.name,
          avatar: c.withUser.avatar || '👤',
          role: c.withUser.bio || 'Student',
          email: c.withUser.email,
          linkedinUrl: c.withUser.linkedin,
          calendarUrl: c.withUser.calendly,
          verified: c.withUser.is_verified,
          lastContact: 'Active'
        }));
        setContacts(mappedContacts);
        
        const mappedRecent: Connection[] = data.map(c => ({
          id: c.id.toString(),
          type: (c.type as any) || 'email',
          withUser: {
            id: c.withUser.id.toString(),
            name: c.withUser.name,
            avatar: c.withUser.avatar || '👤',
            role: c.withUser.bio || 'Student'
          },
          context: c.context,
          timestamp: c.created_at || new Date().toISOString()
        }));
        setRecentConnections(mappedRecent);

      } catch (err) {
        console.error('Failed to fetch connections:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
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

  const iconMap = {
    email: Mail,
    linkedin: Linkedin,
    calendar: Calendar,
  };

  const actionText = {
    email: 'Sent professional email',
    linkedin: 'Connected on LinkedIn',
    calendar: 'Scheduled meeting',
  };

  return (
    <div className="min-h-screen bg-[#050505]" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/husecircle/student/platform')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <Users className="text-purple-400" size={24} />
                <h1 className="text-white text-xl font-bold">Professional Connections</h1>
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
            {/* Contacts List */}
            <div className="lg:col-span-1 space-y-4">
              {/* Info Banner */}
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Premium Professional Connection
                </h3>
                <p className="text-sm text-white/70 mb-3">
                  Connect directly via LinkedIn and professional email for more effective communication.
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-500/10 px-3 py-2 rounded-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>Click on any contact to see connection options</span>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0F0F0F] border border-purple-500/20 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/40"
                />
              </div>

              {/* Contact List */}
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-purple-500/10 transition-colors rounded-xl border ${
                      selectedContact === contact.id
                        ? 'bg-purple-500/10 border-purple-500/30'
                        : 'bg-[#0F0F0F]/40 border-purple-500/10'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl border border-purple-500/20">
                      {contact.avatar}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">
                        {contact.name}
                      </h4>
                      <p className="text-gray-400 text-xs truncate">{contact.role}</p>
                      {contact.lastContact && (
                        <p className="text-gray-600 text-xs mt-1">Last: {contact.lastContact}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
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
                      role: selectedContactData.role,
                      avatar: selectedContactData.avatar,
                    }}
                    context={{
                      type: 'collaboration',
                    }}
                    platform="huse"
                  />

                  {/* Recent Connections Timeline */}
                  {recentConnections.length > 0 && (
                    <div className="bg-[#0F0F0F]/40 border border-purple-500/20 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
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
                              <div className="p-2 rounded-lg bg-white/10 text-purple-400">
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
                <div className="flex items-center justify-center h-full min-h-[400px] bg-[#0F0F0F]/40 border border-purple-500/20 rounded-2xl">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-bold mb-2">Select a Contact</h3>
                    <p className="text-gray-400">Choose someone from the left to view their contact details</p>
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
