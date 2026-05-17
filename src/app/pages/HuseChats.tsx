import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MessageSquare,
  Send,
  Search,
  MoreVertical,
  ArrowLeft,
  CheckCircle,
  Paperclip,
  Smile,
  Phone,
  Info
} from 'lucide-react';
import { VoiceCallModal } from '../components/VoiceCallModal';
import { AttachmentModal } from '../components/AttachmentModal';
import { EmojiPickerModal } from '../components/EmojiPickerModal';
import { UserInfoModal } from '../components/UserInfoModal';
import { toast } from 'sonner';

interface Chat {
  id: number;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
    status: 'online' | 'offline';
  };
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

interface Message {
  id: number;
  sender: 'me' | 'them';
  content: string;
  time: string;
  read: boolean;
}

export function HuseChats() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  
  // Modal states
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      user: {
        name: 'Priya Sharma',
        avatar: '👩‍💻',
        verified: true,
        status: 'online'
      },
      lastMessage: 'Sure! I can help with that project',
      time: '2m ago',
      unread: 2,
      messages: [
        { id: 1, sender: 'them', content: 'Hey! I saw your project on the feed', time: '10:30 AM', read: true },
        { id: 2, sender: 'me', content: 'Thanks! Let me know if you have any questions', time: '10:32 AM', read: true },
        { id: 3, sender: 'them', content: 'Can we collaborate on something similar?', time: '10:35 AM', read: true },
        { id: 4, sender: 'them', content: 'Sure! I can help with that project', time: '10:40 AM', read: false }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Rahul Singh',
        avatar: '🧑‍💼',
        verified: true,
        status: 'online'
      },
      lastMessage: 'The hackathon is next week!',
      time: '15m ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', content: 'Are you participating in the hackathon?', time: '9:00 AM', read: true },
        { id: 2, sender: 'me', content: 'Yes! Looking for team members', time: '9:05 AM', read: true },
        { id: 3, sender: 'them', content: 'The hackathon is next week!', time: '9:10 AM', read: true }
      ]
    },
    {
      id: 3,
      user: {
        name: 'Ananya Patel',
        avatar: '👩‍🎨',
        verified: false,
        status: 'offline'
      },
      lastMessage: 'Thanks for the notes!',
      time: '1h ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', content: 'Do you have notes for DSA?', time: 'Yesterday', read: true },
        { id: 2, sender: 'me', content: 'Yes, I can share them', time: 'Yesterday', read: true },
        { id: 3, sender: 'them', content: 'Thanks for the notes!', time: '8:00 AM', read: true }
      ]
    },
    {
      id: 4,
      user: {
        name: 'Vikram Mehta',
        avatar: '🧑‍💻',
        verified: true,
        status: 'offline'
      },
      lastMessage: 'I\'ll review the code tonight',
      time: '3h ago',
      unread: 1,
      messages: [
        { id: 1, sender: 'me', content: 'Can you review my PR?', time: '2:00 PM', read: true },
        { id: 2, sender: 'them', content: 'I\'ll review the code tonight', time: '2:30 PM', read: false }
      ]
    },
    {
      id: 5,
      user: {
        name: 'Sneha Iyer',
        avatar: '👩‍🔬',
        verified: true,
        status: 'offline'
      },
      lastMessage: 'See you at the lab tomorrow',
      time: '1 day ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', content: 'Are you coming to the lab?', time: 'Yesterday', read: true },
        { id: 2, sender: 'me', content: 'Yes, around 2 PM', time: 'Yesterday', read: true },
        { id: 3, sender: 'them', content: 'See you at the lab tomorrow', time: 'Yesterday', read: true }
      ]
    }
  ]);

  const selectedChatData = chats.find(c => c.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      const updatedChats = chats.map(chat => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: chat.messages.length + 1,
                sender: 'me' as const,
                content: newMessage,
                time: 'Just now',
                read: false
              }
            ],
            lastMessage: newMessage,
            time: 'Just now'
          };
        }
        return chat;
      });
      setChats(updatedChats);
      setNewMessage('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const handleAttachmentSend = (files: File[]) => {
    if (selectedChat) {
      const updatedChats = chats.map(chat => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: chat.messages.length + 1,
                sender: 'me' as const,
                content: `📎 Sent ${files.length} file${files.length > 1 ? 's' : ''}: ${files.map(f => f.name).join(', ')}`,
                time: 'Just now',
                read: false
              }
            ],
            lastMessage: `📎 ${files.length} file${files.length > 1 ? 's' : ''}`,
            time: 'Just now'
          };
        }
        return chat;
      });
      setChats(updatedChats);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <MessageSquare className="text-purple-400" size={24} />
                <h1 className="text-white text-xl font-bold">Messages</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 relative z-10">
        <div className="max-w-7xl mx-auto h-[calc(100vh-80px)]">
          <div className="grid grid-cols-12 h-full">
            {/* Chats List */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-purple-500/20 bg-[#0F0F0F]/40 backdrop-blur-sm overflow-y-auto">
              {/* Search */}
              <div className="p-4 border-b border-purple-500/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black border border-purple-500/20 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/40"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div>
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-purple-500/10 transition-colors border-b border-purple-500/5 ${
                      selectedChat === chat.id ? 'bg-purple-500/10' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl border border-purple-500/20">
                        {chat.user.avatar}
                      </div>
                      {chat.user.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0F0F0F]"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <h4 className="text-white font-bold text-sm truncate">
                            {chat.user.name}
                          </h4>
                          {chat.user.verified && (
                            <CheckCircle size={12} className="text-green-400 flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-gray-500 text-xs flex-shrink-0">
                          {chat.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm truncate">
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 ml-2">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col bg-[#050505]">
              {selectedChatData ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-purple-500/20 bg-[#0F0F0F]/40 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-xl border border-purple-500/20">
                            {selectedChatData.user.avatar}
                          </div>
                          {selectedChatData.user.status === 'online' && (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0F0F0F]"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h3 className="text-white font-bold">
                              {selectedChatData.user.name}
                            </h3>
                            {selectedChatData.user.verified && (
                              <CheckCircle size={14} className="text-green-400" />
                            )}
                          </div>
                          <p className="text-gray-500 text-xs">
                            {selectedChatData.user.status === 'online' ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setShowVoiceCall(true)}
                          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/10 transition-colors"
                        >
                          <Phone size={20} />
                        </button>
                        <button 
                          onClick={() => setShowUserInfo(true)}
                          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/10 transition-colors"
                        >
                          <Info size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedChatData.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : ''}`}>
                          <div
                            className={`px-4 py-2.5 rounded-2xl ${
                              message.sender === 'me'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-[#1A1A1A] text-white border border-purple-500/20'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 px-2 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-gray-600 text-xs">{message.time}</span>
                            {message.sender === 'me' && message.read && (
                              <CheckCircle size={12} className="text-purple-400" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-purple-500/20 bg-[#0F0F0F]/40 backdrop-blur-sm">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setShowAttachment(true)}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/10 transition-colors"
                      >
                        <Paperclip size={20} />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="w-full bg-black border border-purple-500/20 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-purple-500/40"
                        />
                        <button
                          type="button"
                          onClick={() => setShowEmojiPicker(true)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/10 transition-colors"
                        >
                          <Smile size={20} />
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={20} />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-bold mb-2">Select a chat</h3>
                    <p className="text-gray-400">Choose a conversation from the left to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedChatData && (
        <>
          <VoiceCallModal
            isOpen={showVoiceCall}
            onClose={() => setShowVoiceCall(false)}
            userName={selectedChatData.user.name}
            userAvatar={selectedChatData.user.avatar}
          />

          <UserInfoModal
            isOpen={showUserInfo}
            onClose={() => setShowUserInfo(false)}
            user={selectedChatData.user}
          />
        </>
      )}

      <AttachmentModal
        isOpen={showAttachment}
        onClose={() => setShowAttachment(false)}
        onSend={handleAttachmentSend}
      />

      <EmojiPickerModal
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onSelect={handleEmojiSelect}
      />
    </div>
  );
}