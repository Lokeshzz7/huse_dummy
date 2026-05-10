import { useState } from 'react';
import { X, Copy, Check, Mail, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EmailComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    name: string;
    email: string;
  };
  template: {
    subject: string;
    body: string;
  };
  platform: 'huse' | 'dofracto' | 'quotify';
}

export function EmailComposerModal({
  isOpen,
  onClose,
  recipient,
  template,
  platform,
}: EmailComposerModalProps) {
  const [copied, setCopied] = useState<'subject' | 'body' | 'all' | null>(null);

  const platformColors = {
    huse: 'from-purple-500 to-pink-500',
    dofracto: 'from-cyan-500 to-teal-500',
    quotify: 'from-blue-500 to-indigo-500',
  };

  const handleCopy = async (type: 'subject' | 'body' | 'all') => {
    const text = type === 'all'
      ? `Subject: ${template.subject}\n\n${template.body}`
      : type === 'subject'
      ? template.subject
      : template.body;

    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleOpenEmail = () => {
    const mailto = `mailto:${recipient.email}?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(template.body)}`;
    window.open(mailto, '_blank');
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className={`bg-gradient-to-r ${platformColors[platform]} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Email Preview</h2>
                      <p className="text-sm text-white/80">To: {recipient.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Subject */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-white/70">Subject</label>
                    <button
                      onClick={() => handleCopy('subject')}
                      className="flex items-center gap-1 text-xs text-white/60 hover:text-white/90 transition-colors"
                    >
                      {copied === 'subject' ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-white">{template.subject}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-white/70">Message</label>
                    <button
                      onClick={() => handleCopy('body')}
                      className="flex items-center gap-1 text-xs text-white/60 hover:text-white/90 transition-colors"
                    >
                      {copied === 'body' ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <pre className="text-white whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {template.body}
                    </pre>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-200">
                    💡 <strong>Tip:</strong> This will open in your default email client (Gmail, Outlook, etc.) with everything pre-filled. You can edit before sending.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleCopy('all')}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
                >
                  {copied === 'all' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy All
                    </>
                  )}
                </button>

                <button
                  onClick={handleOpenEmail}
                  className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${platformColors[platform]} rounded-lg text-white font-semibold hover:shadow-lg hover:scale-105 transition-all`}
                >
                  <Mail className="w-5 h-5" />
                  Open in Email
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
