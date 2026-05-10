import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Smile, Heart, ThumbsUp, Star, Zap } from 'lucide-react';

interface EmojiPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
  position?: { top: number; left: number };
}

const emojiCategories = [
  {
    name: 'Smileys',
    icon: Smile,
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
      '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
      '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
      '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮'
    ]
  },
  {
    name: 'Gestures',
    icon: ThumbsUp,
    emojis: [
      '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
      '👆', '👇', '☝️', '✋', '🤚', '🖐️', '🖖', '👋', '🤝', '👏',
      '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵'
    ]
  },
  {
    name: 'Hearts',
    icon: Heart,
    emojis: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
      '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '❤️‍🔥'
    ]
  },
  {
    name: 'Symbols',
    icon: Star,
    emojis: [
      '⭐', '🌟', '✨', '💫', '🔥', '💥', '💢', '💦', '💨', '🌈',
      '☀️', '⭐', '🌙', '☁️', '⛅', '⚡', '❄️', '🔥', '💧', '🌊'
    ]
  },
  {
    name: 'Popular',
    icon: Zap,
    emojis: [
      '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '⚽', '🏀',
      '🎮', '🎯', '🎲', '🎸', '🎵', '🎤', '🎧', '📱', '💻', '⌨️'
    ]
  }
];

export function EmojiPickerModal({ isOpen, onClose, onSelect, position }: EmojiPickerModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEmojiSelect = (emoji: string) => {
    onSelect(emoji);
    onClose();
  };

  const filteredEmojis = searchQuery
    ? emojiCategories.flatMap(cat => cat.emojis).filter(() => true) // In a real app, you'd filter by search
    : emojiCategories[selectedCategory].emojis;

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
            className="fixed inset-0 z-[90]"
          />

          {/* Emoji Picker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            style={position ? { 
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: 'translate(-50%, -100%) translateY(-10px)'
            } : undefined}
            className={`${!position ? 'fixed left-1/2 bottom-24 -translate-x-1/2' : ''} w-full max-w-md z-[91]`}
          >
            <div className="bg-[#0F0F0F] border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <Smile className="w-5 h-5 text-purple-400" />
                    Emoji Picker
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search emojis..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/50 border border-purple-500/20 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/40"
                  />
                </div>
              </div>

              {/* Categories */}
              {!searchQuery && (
                <div className="flex items-center gap-2 p-3 border-b border-purple-500/10 bg-black/30 overflow-x-auto">
                  {emojiCategories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(index)}
                        className={`flex-shrink-0 p-2.5 rounded-lg transition-all ${
                          selectedCategory === index
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                        title={category.name}
                      >
                        <Icon size={18} />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Emoji Grid */}
              <div className="p-4 h-72 overflow-y-auto">
                <div className="grid grid-cols-8 gap-2">
                  {filteredEmojis.map((emoji, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="text-2xl p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-purple-500/10 bg-black/30">
                <p className="text-gray-500 text-xs text-center">
                  Click an emoji to insert it
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
