import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft, Search, Send, Paperclip, Smile, MoreVertical,
  Phone, Star, Archive, Trash2, CheckCircle, Clock, X, FileText, Ban, Flag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Message {
  id: number;
  text: string;
  sender: 'recruiter' | 'student';
  timestamp: string;
  read: boolean;
}

interface Chat {
  id: number;
  studentId: number;
  studentName: string;
  studentAvatar: string;
  studentCollege: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export function RecruiterMessages() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '💯', '✨', '👏', '🙌', '💪', '🚀', '⭐', '💡', '🎯', '📝', '✅', '❌', '⏰', '📱'];

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      studentId: 1,
      studentName: 'Priya Sharma',
      studentAvatar: '👩‍💻',
      studentCollege: 'IIT Bombay',
      lastMessage: 'Thank you for considering my application!',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          text: 'Hi! I saw your job posting for Full-Stack Developer position.',
          sender: 'student',
          timestamp: '10:30 AM',
          read: true
        },
        {
          id: 2,
          text: 'Hello Priya! Thanks for reaching out. I reviewed your profile and I\'m impressed!',
          sender: 'recruiter',
          timestamp: '10:32 AM',
          read: true
        },
        {
          id: 3,
          text: 'I have experience with React, Node.js, and AWS. Would love to discuss this opportunity.',
          sender: 'student',
          timestamp: '10:35 AM',
          read: true
        },
        {
          id: 4,
          text: 'Perfect! Your skills align well with what we\'re looking for. Are you available for a quick call tomorrow?',
          sender: 'recruiter',
          timestamp: '10:40 AM',
          read: true
        },
        {
          id: 5,
          text: 'Yes, I\'m available tomorrow afternoon. What time works for you?',
          sender: 'student',
          timestamp: '10:45 AM',
          read: true
        },
        {
          id: 6,
          text: 'How about 2:00 PM? I\'ll send you the meeting link.',
          sender: 'recruiter',
          timestamp: '10:48 AM',
          read: true
        },
        {
          id: 7,
          text: 'That works perfectly! Thank you for considering my application!',
          sender: 'student',
          timestamp: '10:50 AM',
          read: false
        }
      ]
    },
    {
      id: 2,
      studentId: 4,
      studentName: 'Arjun Kumar',
      studentAvatar: '👨‍💻',
      studentCollege: 'IIT Delhi',
      lastMessage: 'Looking forward to the interview!',
      timestamp: '1 hour ago',
      unread: 0,
      online: true,
      messages: [
        {
          id: 1,
          text: 'Hi, I applied for the Frontend Developer position last week.',
          sender: 'student',
          timestamp: 'Yesterday',
          read: true
        },
        {
          id: 2,
          text: 'Hi Arjun! Yes, I have your application. Your portfolio is excellent!',
          sender: 'recruiter',
          timestamp: 'Yesterday',
          read: true
        },
        {
          id: 3,
          text: 'Thank you! I\'m really excited about this opportunity.',
          sender: 'student',
          timestamp: '2 hours ago',
          read: true
        },
        {
          id: 4,
          text: 'We\'d like to schedule an interview. Are you available this Friday?',
          sender: 'recruiter',
          timestamp: '1 hour ago',
          read: true
        },
        {
          id: 5,
          text: 'Looking forward to the interview!',
          sender: 'student',
          timestamp: '1 hour ago',
          read: true
        }
      ]
    },
    {
      id: 3,
      studentId: 2,
      studentName: 'Rahul Verma',
      studentAvatar: '👨‍🔬',
      studentCollege: 'IIT Bombay',
      lastMessage: 'I have attached my research papers',
      timestamp: '3 hours ago',
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          text: 'Hello! I\'m interested in the ML Engineer position.',
          sender: 'student',
          timestamp: '5 hours ago',
          read: true
        },
        {
          id: 2,
          text: 'Great! Can you share some of your ML projects?',
          sender: 'recruiter',
          timestamp: '4 hours ago',
          read: true
        },
        {
          id: 3,
          text: 'I have attached my research papers',
          sender: 'student',
          timestamp: '3 hours ago',
          read: true
        }
      ]
    },
    {
      id: 4,
      studentId: 3,
      studentName: 'Sneha Patel',
      studentAvatar: '👩‍🎨',
      studentCollege: 'BITS Pilani',
      lastMessage: 'Here\'s my design portfolio link',
      timestamp: '1 day ago',
      unread: 1,
      online: false,
      messages: [
        {
          id: 1,
          text: 'Hi! I\'m a UI/UX Designer and I saw your posting.',
          sender: 'student',
          timestamp: '2 days ago',
          read: true
        },
        {
          id: 2,
          text: 'Hello Sneha! We\'re looking for designers. Can you share your portfolio?',
          sender: 'recruiter',
          timestamp: '1 day ago',
          read: true
        },
        {
          id: 3,
          text: 'Here\'s my design portfolio link',
          sender: 'student',
          timestamp: '1 day ago',
          read: false
        }
      ]
    }
  ]);

  const selectedChatData = chats.find(c => c.id === selectedChat);
  const filteredChats = chats.filter(chat =>
    chat.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'recruiter',
      timestamp: 'Just now',
      read: true
    };

    setChats(chats.map(chat =>
      chat.id === selectedChat
        ? {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: messageText,
            timestamp: 'Just now'
          }
        : chat
    ));

    setMessageText('');
    setAttachedFile(null);
    toast.success('Message sent!');
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      toast.success(`File "${file.name}" attached`);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStarChat = () => {
    toast.success('Conversation starred!');
    setShowMoreMenu(false);
  };

  const handleArchiveChat = () => {
    if (selectedChat) {
      setChats(chats.filter(chat => chat.id !== selectedChat));
      setSelectedChat(null);
      toast.success('Conversation archived!');
      setShowMoreMenu(false);
    }
  };

  const handleDeleteChat = () => {
    if (selectedChat) {
      setChats(chats.filter(chat => chat.id !== selectedChat));
      setSelectedChat(null);
      toast.success('Conversation deleted!');
      setShowMoreMenu(false);
    }
  };

  const handleBlockUser = () => {
    toast.success('User blocked successfully!');
    setShowMoreMenu(false);
  };

  const handleReportUser = () => {
    toast.success('User reported. We will review this case.');
    setShowMoreMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/recruiter-dashboard')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
              <h1 className="text-white text-2xl font-bold">Messages</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8 relative">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">
          {/* Chat List */}
          <div className="col-span-4 bg-[#1A1A1A] border border-purple-500/20 rounded-2xl overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-purple-500/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white text-sm placeholder-gray-600 focus:border-purple-500/40 outline-none"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 border-b border-purple-500/10 cursor-pointer transition-all ${
                    selectedChat === chat.id
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-4 border-l-purple-500'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="text-3xl">{chat.studentAvatar}</div>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#1A1A1A]" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-white font-bold text-sm">{chat.studentName}</h3>
                          <p className="text-gray-500 text-xs">{chat.studentCollege}</p>
                        </div>
                        <span className="text-gray-500 text-xs">{chat.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${chat.unread > 0 ? 'text-white font-medium' : 'text-gray-400'}`}>
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{chat.unread}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-8 bg-[#1A1A1A] border border-purple-500/20 rounded-2xl overflow-hidden flex flex-col">
            {selectedChatData ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-purple-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="text-4xl">{selectedChatData.studentAvatar}</div>
                      {selectedChatData.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#1A1A1A]" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">{selectedChatData.studentName}</h2>
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        {selectedChatData.studentCollege}
                        {selectedChatData.online && (
                          <>
                            <span>•</span>
                            <span className="text-green-400">Online</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/huse-circle-platform/portfolio/${selectedChatData.studentId}`)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => setShowMoreMenu(!showMoreMenu)}
                      className="p-2 bg-[#0F0F0F] hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {selectedChatData.messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex ${message.sender === 'recruiter' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.sender === 'recruiter' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.sender === 'recruiter'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-sm'
                              : 'bg-[#0F0F0F] text-white rounded-bl-sm'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        </div>
                        <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${message.sender === 'recruiter' ? 'justify-end' : 'justify-start'}`}>
                          <span>{message.timestamp}</span>
                          {message.sender === 'recruiter' && (
                            message.read ? <CheckCircle size={12} className="text-blue-400" /> : <Clock size={12} />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-purple-500/10">
                  <div className="flex items-end gap-3">
                    <button
                      onClick={handleFileAttach}
                      className="p-3 bg-[#0F0F0F] hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all"
                    >
                      <Paperclip size={20} />
                    </button>
                    <div className="flex-1 bg-[#0F0F0F] border border-purple-500/20 rounded-xl p-3">
                      <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                        rows={1}
                        className="w-full bg-transparent text-white placeholder-gray-600 outline-none resize-none"
                      />
                    </div>
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-3 bg-[#0F0F0F] hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all"
                    >
                      <Smile size={20} />
                    </button>
                    <button
                      onClick={sendMessage}
                      disabled={!messageText.trim()}
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-20 right-10 bg-[#0F0F0F] border border-purple-500/20 rounded-xl p-3">
                    <div className="grid grid-cols-5 gap-2">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleEmojiSelect(emoji)}
                          className="text-xl text-gray-400 hover:text-white transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* Attachment */}
                {attachedFile && (
                  <div className="absolute bottom-20 left-10 bg-[#0F0F0F] border border-purple-500/20 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <FileText size={20} />
                      <span className="text-gray-400">{attachedFile.name}</span>
                      <button
                        onClick={removeAttachment}
                        className="p-1 bg-red-500 rounded-full text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                )}

                {/* More Menu */}
                {showMoreMenu && (
                  <div className="absolute top-10 right-10 bg-[#0F0F0F] border border-purple-500/20 rounded-xl p-3">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleStarChat}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Star size={18} />
                        <span>Star Conversation</span>
                      </button>
                      <button
                        onClick={handleArchiveChat}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Archive size={18} />
                        <span>Archive Conversation</span>
                      </button>
                      <button
                        onClick={handleDeleteChat}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Trash2 size={18} />
                        <span>Delete Conversation</span>
                      </button>
                      <button
                        onClick={handleBlockUser}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Ban size={18} />
                        <span>Block User</span>
                      </button>
                      <button
                        onClick={handleReportUser}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Flag size={18} />
                        <span>Report User</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Send className="text-purple-400" size={32} />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">Select a conversation</h3>
                  <p className="text-gray-400">Choose a chat to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}