import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Paperclip, Smile } from 'lucide-react';
import { toast } from 'sonner';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientAvatar: string;
  context?: string; // e.g., "Quote Request: Web Development"
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

export function MessageModal({
  isOpen,
  onClose,
  recipientName,
  recipientAvatar,
  context
}: MessageModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm interested in your quote request.",
      sender: 'me',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      text: "Great! I'd love to discuss the project details with you.",
      sender: 'them',
      timestamp: '10:32 AM'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };

    setMessages([...messages, message]);
    setNewMessage('');
    toast.success('Message sent!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#0a0a0a] border border-[#24c6dc]/30 rounded-[25px] max-w-2xl w-full h-[600px] flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl">
                  {recipientAvatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {recipientName}
                  </h2>
                  {context && (
                    <p className="text-sm text-gray-400">{context}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'me'
                        ? 'bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white'
                        : 'bg-[#111] border border-gray-800 text-gray-300'
                    }`}
                  >
                    <p className="text-sm mb-1">{message.text}</p>
                    <p className={`text-xs ${
                      message.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-end gap-3">
                <div className="flex-1 bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type your message..."
                    rows={3}
                    className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none"
                  />
                  <div className="px-4 py-2 border-t border-gray-800 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toast.info('Attachment feature coming soon')}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        title="Attach file"
                      >
                        <Paperclip className="w-5 h-5 text-gray-400" />
                      </button>
                      <button
                        onClick={() => toast.info('Emoji picker coming soon')}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        title="Add emoji"
                      >
                        <Smile className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Press Enter to send</p>
                  </div>
                </div>
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="px-6 py-4 bg-gradient-to-r from-[#24c6dc] to-[#05997F] rounded-xl text-white font-medium hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
