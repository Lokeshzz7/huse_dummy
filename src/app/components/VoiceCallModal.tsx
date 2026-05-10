import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X,
  PhoneOff
} from 'lucide-react';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userAvatar: string;
}

export function VoiceCallModal({ isOpen, onClose, userName, userAvatar }: VoiceCallModalProps) {
  const [callStatus, setCallStatus] = useState<'calling' | 'connected' | 'ended'>('calling');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCallStatus('calling');
      setDuration(0);
      setIsMuted(false);
      setIsSpeakerOn(true);
      return;
    }

    // Simulate call connection after 2 seconds
    const connectTimer = setTimeout(() => {
      setCallStatus('connected');
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, [isOpen]);

  useEffect(() => {
    if (callStatus !== 'connected') return;

    const interval = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleEndCall}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101]"
          >
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-8 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={handleEndCall}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              {/* User Info */}
              <div className="text-center mb-8">
                <motion.div
                  animate={callStatus === 'calling' ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-32 h-32 mx-auto mb-4"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-6xl border-4 border-purple-500/30">
                    {userAvatar}
                  </div>
                </motion.div>

                <h3 className="text-white text-2xl font-bold mb-2">{userName}</h3>
                
                {callStatus === 'calling' && (
                  <motion.p
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-purple-300"
                  >
                    Calling...
                  </motion.p>
                )}
                
                {callStatus === 'connected' && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-green-400 font-mono">{formatDuration(duration)}</p>
                  </div>
                )}
                
                {callStatus === 'ended' && (
                  <p className="text-red-400">Call Ended</p>
                )}
              </div>

              {/* Call Controls */}
              <div className="flex items-center justify-center gap-6">
                {/* Mute */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  disabled={callStatus !== 'connected'}
                  className={`p-4 rounded-full transition-all disabled:opacity-50 ${
                    isMuted
                      ? 'bg-red-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </button>

                {/* End Call */}
                <button
                  onClick={handleEndCall}
                  className="p-6 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all transform hover:scale-105"
                >
                  <PhoneOff size={28} />
                </button>

                {/* Speaker */}
                <button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  disabled={callStatus !== 'connected'}
                  className={`p-4 rounded-full transition-all disabled:opacity-50 ${
                    isSpeakerOn
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {isSpeakerOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
                </button>
              </div>

              {/* Call Status Indicator */}
              {callStatus === 'connected' && (
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ height: [8, 16, 8] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-1 bg-purple-400 rounded-full"
                    ></motion.div>
                    <motion.div
                      animate={{ height: [8, 16, 8] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                      className="w-1 bg-purple-400 rounded-full"
                    ></motion.div>
                    <motion.div
                      animate={{ height: [8, 16, 8] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                      className="w-1 bg-purple-400 rounded-full"
                    ></motion.div>
                  </div>
                  <span>Voice activity detected</span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
