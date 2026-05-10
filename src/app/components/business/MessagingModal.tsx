import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Send, Search, Phone, MoreVertical, Paperclip, Smile, FileText, Star, Archive, BellOff, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { VoiceCallModal } from '../VoiceCallModal';
import { AttachmentModal } from '../AttachmentModal';
import { EmojiPickerModal } from '../EmojiPickerModal';

interface MessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'me' | 'them';
  content: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export function MessagingModal({ isOpen, onClose }: MessagingModalProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  
  // Modal states
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      lastMessage: 'Interested in the Senior Developer position',
      time: '5m ago',
      unread: 2,
      online: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'MC',
      lastMessage: 'Thank you for the opportunity!',
      time: '1h ago',
      unread: 0,
      online: true
    },
    {
      id: '3',
      name: 'Priya Sharma',
      avatar: 'PS',
      lastMessage: 'When can we schedule a call?',
      time: '3h ago',
      unread: 1,
      online: false
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      avatar: 'AR',
      lastMessage: 'I have some questions about the role',
      time: '1d ago',
      unread: 0,
      online: false
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'them',
      content: 'Hi! I\'m very interested in the Senior Developer position at TechVenture AI.',
      time: '10:30 AM'
    },
    {
      id: '2',
      sender: 'them',
      content: 'I have 5+ years of experience in React and Node.js. Would love to discuss this opportunity further.',
      time: '10:31 AM'
    },
    {
      id: '3',
      sender: 'me',
      content: 'Thanks for reaching out, Sarah! We\'d love to learn more about your experience.',
      time: '10:45 AM'
    },
    {
      id: '4',
      sender: 'me',
      content: 'Are you available for a quick call this week?',
      time: '10:45 AM'
    },
    {
      id: '5',
      sender: 'them',
      content: 'Yes, I\'m available! How about Thursday at 2 PM?',
      time: '10:50 AM'
    }
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput('');
      setAttachedFile(null);
      toast.success('Message sent!');
    }
  };

  const handleAttachment = (files: File[]) => {
    if (files.length > 0) {
      setAttachedFile(files[0]);
      toast.success(`File "${files[0].name}" attached`);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    toast.info('Attachment removed');
  };

  const handleStarConversation = () => {
    toast.success('Conversation starred!');
    setShowMoreOptions(false);
  };

  const handleArchiveConversation = () => {
    toast.success('Conversation archived!');
    setShowMoreOptions(false);
  };

  const handleMuteConversation = () => {
    toast.success('Notifications muted!');
    setShowMoreOptions(false);
  };

  const handleDeleteConversation = () => {
    if (confirm('Are you sure you want to delete this conversation?')) {
      toast.success('Conversation deleted!');
      setSelectedConversation(null);
      setShowMoreOptions(false);
    }
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-6xl h-[80vh] bg-theme-card border border-theme-accent rounded-2xl overflow-hidden flex">
              {/* Conversations List */}
              <div className="w-80 bg-theme-secondary border-r border-theme-accent flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-theme-accent">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-theme-primary flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-[#24c6dc]" />
                      Messages
                    </h3>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-theme-tertiary rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-theme-muted" />
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      className="w-full bg-theme-tertiary border border-theme-accent rounded-lg pl-10 pr-4 py-2 text-sm text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] transition-all"
                    />
                  </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-4 flex items-start gap-3 hover:bg-theme-tertiary transition-all border-l-2 ${
                        selectedConversation === conv.id
                          ? 'bg-theme-tertiary border-[#24c6dc]'
                          : 'border-transparent'
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center">
                          <span className="text-white font-semibold">{conv.avatar}</span>
                        </div>
                        {conv.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-theme-secondary rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-theme-primary text-sm truncate">
                            {conv.name}
                          </p>
                          <span className="text-xs text-theme-muted flex-shrink-0">{conv.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-theme-tertiary truncate">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <span className="ml-2 w-5 h-5 bg-[#24c6dc] text-white rounded-full text-xs flex items-center justify-center flex-shrink-0">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {currentConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-theme-accent flex items-center justify-between bg-theme-secondary">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">{currentConversation.avatar}</span>
                          </div>
                          {currentConversation.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-theme-secondary rounded-full"></span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-theme-primary">{currentConversation.name}</p>
                          <p className="text-xs text-theme-tertiary">
                            {currentConversation.online ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setShowVoiceCall(true)}
                          className="p-2 hover:bg-theme-tertiary rounded-lg transition-colors"
                        >
                          <Phone className="w-5 h-5 text-theme-secondary" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setShowMoreOptions(!showMoreOptions)}
                            className="p-2 hover:bg-theme-tertiary rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-5 h-5 text-theme-secondary" />
                          </button>

                          {/* More Options Dropdown */}
                          <AnimatePresence>
                            {showMoreOptions && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 top-full mt-2 w-56 bg-theme-card border border-theme-accent rounded-xl overflow-hidden shadow-2xl z-50"
                              >
                                <button
                                  onClick={handleStarConversation}
                                  className="w-full px-4 py-3 text-left text-theme-primary hover:bg-theme-secondary transition-colors flex items-center gap-3"
                                >
                                  <Star className="w-4 h-4 text-[#24c6dc]" />
                                  <span className="text-sm">Star Conversation</span>
                                </button>
                                <button
                                  onClick={handleArchiveConversation}
                                  className="w-full px-4 py-3 text-left text-theme-primary hover:bg-theme-secondary transition-colors flex items-center gap-3"
                                >
                                  <Archive className="w-4 h-4 text-[#24c6dc]" />
                                  <span className="text-sm">Archive</span>
                                </button>
                                <button
                                  onClick={handleMuteConversation}
                                  className="w-full px-4 py-3 text-left text-theme-primary hover:bg-theme-secondary transition-colors flex items-center gap-3"
                                >
                                  <BellOff className="w-4 h-4 text-[#24c6dc]" />
                                  <span className="text-sm">Mute Notifications</span>
                                </button>
                                <button
                                  onClick={handleDeleteConversation}
                                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3 border-t border-theme-accent"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="text-sm">Delete Conversation</span>
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-theme-primary">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] ${
                              message.sender === 'me'
                                ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white'
                                : 'bg-theme-card border border-theme-accent text-theme-primary'
                            } rounded-2xl px-4 py-3`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender === 'me' ? 'text-white/70' : 'text-theme-muted'
                              }`}
                            >
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-theme-accent bg-theme-secondary">
                      {/* Attachment Preview */}
                      {attachedFile && (
                        <div className="mb-3 p-3 bg-theme-tertiary border border-theme-accent rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#24c6dc]" />
                            <div>
                              <p className="text-sm text-theme-primary font-medium">{attachedFile.name}</p>
                              <p className="text-xs text-theme-muted">
                                {(attachedFile.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={removeAttachment}
                            className="p-1 hover:bg-theme-card rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-theme-muted" />
                          </button>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setShowAttachment(true)}
                          className="p-2 hover:bg-theme-tertiary rounded-lg transition-colors"
                        >
                          <Paperclip className="w-5 h-5 text-theme-secondary" />
                        </button>
                        <input
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a message..."
                          className="flex-1 bg-theme-tertiary border border-theme-accent rounded-lg px-4 py-3 text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[#24c6dc] transition-all"
                        />
                        <button 
                          onClick={() => setShowEmojiPicker(true)}
                          className="p-2 hover:bg-theme-tertiary rounded-lg transition-colors"
                        >
                          <Smile className="w-5 h-5 text-theme-secondary" />
                        </button>
                        <button
                          onClick={handleSendMessage}
                          className="p-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-theme-primary">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 text-theme-muted mx-auto mb-4" />
                      <p className="text-theme-tertiary">Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Voice Call Modal */}
          {currentConversation && (
            <VoiceCallModal
              isOpen={showVoiceCall}
              onClose={() => setShowVoiceCall(false)}
              userName={currentConversation.name}
              userAvatar={currentConversation.avatar}
            />
          )}

          {/* Attachment Modal */}
          <AttachmentModal
            isOpen={showAttachment}
            onClose={() => setShowAttachment(false)}
            onAttach={handleAttachment}
          />

          {/* Emoji Picker Modal */}
          <EmojiPickerModal
            isOpen={showEmojiPicker}
            onClose={() => setShowEmojiPicker(false)}
            onSelectEmoji={handleEmojiSelect}
          />
        </>
      )}
    </AnimatePresence>
  );
}