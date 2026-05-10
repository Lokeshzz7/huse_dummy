import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Send, MoreVertical, Phone, Paperclip, Smile,
  ArrowLeft, CheckCheck, Check, Circle, Clock, Image as ImageIcon,
  Plus, X, User, Trash2, Archive, Star, FileText
} from 'lucide-react';
import { useMessaging } from '../context/MessagingContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { VoiceCallModal } from '../components/VoiceCallModal';
import { AttachmentModal } from '../components/AttachmentModal';
import { EmojiPickerModal } from '../components/EmojiPickerModal';

export function MessagingPage() {
  const navigate = useNavigate();
  const {
    conversations,
    messages: allMessages,
    getMessages,
    sendMessage,
    markAsRead,
    getUnreadCount,
    searchConversations,
    deleteConversation
  } = useMessaging();

  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConversationOptions, setShowConversationOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Modal states
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const selectedConversation = selectedConversationId 
    ? conversations.find(c => c.id === selectedConversationId)
    : null;

  const currentMessages = selectedConversationId ? getMessages(selectedConversationId) : [];

  const filteredConversations = searchQuery
    ? searchConversations(searchQuery)
    : conversations;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentMessages]);

  // Mark conversation as read when selected
  useEffect(() => {
    if (selectedConversationId) {
      markAsRead(selectedConversationId);
    }
  }, [selectedConversationId]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversationId) return;

    sendMessage(selectedConversationId, messageInput);
    setMessageInput('');
    setAttachedFile(null);
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleDeleteConversation = () => {
    if (selectedConversationId) {
      if (confirm('Are you sure you want to delete this conversation?')) {
        deleteConversation(selectedConversationId);
        setSelectedConversationId(null);
        setShowConversationOptions(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="flex w-full max-w-7xl mx-auto relative z-10">
        {/* Conversations List */}
        <div className={`${selectedConversationId ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-96 border-r border-purple-500/20 bg-[#0A0A0A]`}>
          {/* Header */}
          <div className="p-4 border-b border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
                >
                  <ArrowLeft className="text-gray-400" size={20} />
                </button>
                <h1 className="text-white text-xl font-bold">Messages</h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  {getUnreadCount() > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      {getUnreadCount()}
                    </span>
                  )}
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Plus className="text-purple-400" size={20} />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Send className="text-purple-400" size={32} />
                </div>
                <h3 className="text-white font-bold mb-2">No conversations</h3>
                <p className="text-gray-400 text-sm">Start a conversation to get connected</p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const participant = conv.participants[0];
                const isSelected = selectedConversationId === conv.id;

                return (
                  <motion.div
                    key={conv.id}
                    whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.05)' }}
                    onClick={() => setSelectedConversationId(conv.id)}
                    className={`p-4 cursor-pointer border-b border-white/5 transition-colors ${
                      isSelected ? 'bg-purple-500/10' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                          {participant.avatar}
                        </div>
                        {participant.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0A0A0A]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-white font-semibold truncate">{participant.name}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                            {conv.lastMessage && formatTime(conv.lastMessage.timestamp)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'text-white font-medium' : 'text-gray-400'}`}>
                            {conv.lastMessage?.senderId === 'current-user' && (
                              <span className="mr-1">You: </span>
                            )}
                            {conv.lastMessage?.content || 'No messages yet'}
                          </p>
                          {conv.unreadCount > 0 && (
                            <span className="flex-shrink-0 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>

                        {/* Platform badge */}
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          participant.platform === 'huse' ? 'bg-purple-500/20 text-purple-400' :
                          participant.platform === 'dofracto' ? 'bg-cyan-500/20 text-cyan-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {participant.platform.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className={`${selectedConversationId ? 'flex' : 'hidden lg:flex'} flex-col flex-1 bg-[#050505]`}>
            {/* Chat Header */}
            <div className="p-4 border-b border-purple-500/20 bg-[#0A0A0A]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConversationId(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
                  >
                    <ArrowLeft className="text-gray-400" size={20} />
                  </button>

                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                      {selectedConversation.participants[0].avatar}
                    </div>
                    {selectedConversation.participants[0].online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0A0A0A]" />
                    )}
                  </div>

                  <div>
                    <h2 className="text-white font-bold">{selectedConversation.participants[0].name}</h2>
                    <p className="text-xs text-gray-400">
                      {selectedConversation.participants[0].online ? 'Online' : 
                       selectedConversation.participants[0].lastSeen ? `Last seen ${selectedConversation.participants[0].lastSeen}` : 'Offline'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowVoiceCall(true)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Phone className="text-gray-400 hover:text-white" size={20} />
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => setShowConversationOptions(!showConversationOptions)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <MoreVertical className="text-gray-400 hover:text-white" size={20} />
                    </button>

                    <AnimatePresence>
                      {showConversationOptions && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 top-full mt-2 w-48 bg-[#1A1A1A] border border-purple-500/20 rounded-xl overflow-hidden shadow-xl z-50"
                        >
                          <button className="w-full px-4 py-3 text-left text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                            <Star size={16} />
                            <span className="text-sm">Star Conversation</span>
                          </button>
                          <button className="w-full px-4 py-3 text-left text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                            <Archive size={16} />
                            <span className="text-sm">Archive</span>
                          </button>
                          <button 
                            onClick={handleDeleteConversation}
                            className="w-full px-4 py-3 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            <span className="text-sm">Delete</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {currentMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Send className="text-purple-400" size={32} />
                    </div>
                    <h3 className="text-white font-bold mb-2">Start the conversation</h3>
                    <p className="text-gray-400 text-sm">Send a message to get started</p>
                  </div>
                </div>
              ) : (
                <>
                  {currentMessages.map((message, index) => {
                    const isOwn = message.senderId === 'current-user';
                    const showAvatar = index === 0 || currentMessages[index - 1].senderId !== message.senderId;
                    const showTimestamp = index === currentMessages.length - 1 || 
                      currentMessages[index + 1].senderId !== message.senderId;

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          {showAvatar && !isOwn && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">
                              {message.senderAvatar}
                            </div>
                          )}
                          {!showAvatar && !isOwn && <div className="w-8" />}
                        </div>

                        {/* Message */}
                        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                          <div className={`px-4 py-2 rounded-2xl ${
                            isOwn 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm' 
                              : 'bg-white/5 text-white rounded-bl-sm'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                          </div>
                          {showTimestamp && (
                            <div className="flex items-center gap-1 mt-1 px-2">
                              <span className="text-xs text-gray-500">
                                {formatTime(message.timestamp)}
                              </span>
                              {isOwn && (
                                message.read ? 
                                  <CheckCheck className="text-blue-400" size={14} /> :
                                  <Check className="text-gray-500" size={14} />
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-purple-500/20 bg-[#0A0A0A]">
              {/* Attachment Preview */}
              {attachedFile && (
                <div className="mb-3 p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-sm text-white font-medium">{attachedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(attachedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeAttachment}
                    className="p-1 hover:bg-white/5 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              )}
              
              <div className="flex items-end gap-2">
                <button 
                  onClick={() => setShowAttachment(true)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Paperclip className="text-gray-400 hover:text-white" size={20} />
                </button>
                <button 
                  onClick={() => setShowAttachment(true)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ImageIcon className="text-gray-400 hover:text-white" size={20} />
                </button>

                <div className="flex-1 relative">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none max-h-32"
                  />
                </div>

                <button 
                  onClick={() => setShowEmojiPicker(true)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Smile className="text-gray-400 hover:text-white" size={20} />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl transition-all transform hover:scale-105"
                >
                  <Send className="text-white" size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex flex-1 items-center justify-center bg-[#050505]">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Send className="text-white" size={48} />
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">Select a Conversation</h2>
              <p className="text-gray-400">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedConversation && (
        <VoiceCallModal
          isOpen={showVoiceCall}
          onClose={() => setShowVoiceCall(false)}
          userName={selectedConversation.participants[0].name}
          userAvatar={selectedConversation.participants[0].avatar}
        />
      )}

      <AttachmentModal
        isOpen={showAttachment}
        onClose={() => setShowAttachment(false)}
        onAttach={handleAttachment}
      />

      <EmojiPickerModal
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onSelectEmoji={handleEmojiSelect}
      />
    </div>
  );
}