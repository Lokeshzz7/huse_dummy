import { useState } from 'react';
import { Mail, Linkedin, Calendar, ExternalLink, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface PremiumContactCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    linkedinUrl?: string;
    calendarUrl?: string;
    role: string;
    avatar?: string;
    tier?: string;
    reputationScore?: number;
  };
  context?: {
    type: 'quote_request' | 'mentorship' | 'recruitment' | 'investment' | 'collaboration';
    projectName?: string;
    projectId?: string;
    additionalInfo?: Record<string, any>;
  };
  platform: 'huse' | 'dofracto' | 'quotify';
}

export function PremiumContactCard({ user, context, platform }: PremiumContactCardProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [connectionTracked, setConnectionTracked] = useState(false);

  const platformStyles = {
    huse: {
      gradient: 'from-purple-500/20 via-pink-500/20 to-yellow-500/20',
      iconColor: 'text-purple-400',
      accentColor: 'border-purple-500/30',
      glowColor: 'shadow-purple-500/50',
    },
    dofracto: {
      gradient: 'from-cyan-500/10 via-teal-500/10 to-cyan-500/10',
      iconColor: 'text-cyan-400',
      accentColor: 'border-cyan-500/30',
      glowColor: 'shadow-cyan-500/50',
    },
    quotify: {
      gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20',
      iconColor: 'text-blue-400',
      accentColor: 'border-blue-500/30',
      glowColor: 'shadow-blue-500/50',
    },
  };

  const styles = platformStyles[platform];

  const generateEmail = () => {
    const templates = {
      quote_request: {
        subject: `Quote for ${context?.projectName} - Professional Inquiry`,
        body: `Hi ${user.name},\n\nI came across your profile on Quotify and would like to discuss the "${context?.projectName}" project.\n\n[Add your message here]\n\nBest regards,`,
      },
      recruitment: {
        subject: `Opportunity Discussion - ${user.name}`,
        body: `Hi ${user.name},\n\nI reviewed your profile on HUSE Circle and was impressed by your background.\n\nI'd love to discuss potential opportunities.\n\nBest regards,`,
      },
      mentorship: {
        subject: `Mentorship Inquiry - HUSE Circle`,
        body: `Hi ${user.name},\n\nI'm reaching out through HUSE Circle to explore mentorship opportunities.\n\n[Add your message here]\n\nBest regards,`,
      },
      investment: {
        subject: `Community Support Inquiry - ${context?.projectName}`,
        body: `Hi ${user.name},\n\nYour campaign on Dofracto caught my attention, and I'd like to learn more about ${context?.projectName}.\n\nBest regards,`,
      },
      collaboration: {
        subject: `Collaboration Opportunity`,
        body: `Hi ${user.name},\n\nI'd like to explore collaboration opportunities.\n\n[Add your message here]\n\nBest regards,`,
      },
    };

    const template = templates[context?.type || 'collaboration'];
    return {
      mailto: `mailto:${user.email}?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(template.body)}`,
      subject: template.subject,
      body: template.body,
    };
  };

  const trackConnection = async (type: 'email' | 'linkedin' | 'calendar') => {
    try {
      // Metadata tracking only - no message content
      console.log('Connection tracked:', {
        toUserId: user.id,
        type,
        context: context?.type,
        projectId: context?.projectId,
        timestamp: new Date().toISOString(),
      });
      setConnectionTracked(true);
      setTimeout(() => setConnectionTracked(false), 3000);
    } catch (error) {
      console.error('Failed to track connection:', error);
    }
  };

  const handleEmailClick = () => {
    const email = generateEmail();
    window.open(email.mailto, '_blank');
    trackConnection('email');
  };

  const handleLinkedInClick = () => {
    if (user.linkedinUrl) {
      window.open(user.linkedinUrl, '_blank');
      trackConnection('linkedin');
    }
  };

  const handleCalendarClick = () => {
    if (user.calendarUrl) {
      window.open(user.calendarUrl, '_blank');
      trackConnection('calendar');
    }
  };

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(user.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${styles.gradient}
        backdrop-blur-xl border ${styles.accentColor}
        p-6 transition-all duration-500
        hover:${styles.glowColor} hover:shadow-2xl
      `}
    >
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            {user.avatar ? (
              <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl">
                {user.avatar}
              </div>
            ) : (
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${styles.gradient} flex items-center justify-center text-2xl font-bold text-white border-2 border-white/20`}>
                {user.name.charAt(0)}
              </div>
            )}
            {connectionTracked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-black"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{user.name}</h3>
            <p className="text-sm text-white/70">{user.role}</p>
            {user.tier && (
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${styles.iconColor} bg-white/10`}>
                {user.tier} Tier
              </span>
            )}
            {user.reputationScore && (
              <span className="ml-2 text-sm text-white/70">⭐ {user.reputationScore}/5.0</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px bg-gradient-to-r ${styles.gradient}`} />

        {/* Contact Methods */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-white/50 font-semibold">
            Professional Connection
          </p>

          {/* Email */}
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEmailClick}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl
              bg-white/5 backdrop-blur-sm border border-white/10
              hover:bg-white/10 hover:border-white/20
              transition-all duration-300 group
            `}
          >
            <div className={`p-2 rounded-lg bg-white/10 ${styles.iconColor} group-hover:scale-110 transition-transform`}>
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-white">Send Professional Email</p>
              <p className="text-xs text-white/60">{user.email}</p>
            </div>
            <div
              onClick={handleCopyEmail}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              {copiedEmail ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-white/60" />
              )}
            </div>
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
          </motion.button>

          {/* LinkedIn */}
          {user.linkedinUrl && (
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLinkedInClick}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl
                bg-white/5 backdrop-blur-sm border border-white/10
                hover:bg-white/10 hover:border-white/20
                transition-all duration-300 group
              `}
            >
              <div className={`p-2 rounded-lg bg-white/10 ${styles.iconColor} group-hover:scale-110 transition-transform`}>
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-white">Connect on LinkedIn</p>
                <p className="text-xs text-white/60">Verify professional background</p>
              </div>
              <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
            </motion.button>
          )}

          {/* Calendar */}
          {user.calendarUrl && (
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalendarClick}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl
                bg-white/5 backdrop-blur-sm border border-white/10
                hover:bg-white/10 hover:border-white/20
                transition-all duration-300 group
              `}
            >
              <div className={`p-2 rounded-lg bg-white/10 ${styles.iconColor} group-hover:scale-110 transition-transform`}>
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-white">Schedule Meeting</p>
                <p className="text-xs text-white/60">Book a time that works for you</p>
              </div>
              <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
            </motion.button>
          )}
        </div>

        {/* Context Info */}
        {context && (
          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 mb-1">Connection Context:</p>
            <p className="text-sm text-white font-medium">
              {context.type === 'quote_request' && `Quote for: ${context.projectName}`}
              {context.type === 'recruitment' && 'Recruitment Opportunity'}
              {context.type === 'mentorship' && 'Mentorship Request'}
              {context.type === 'investment' && `Community Support: ${context.projectName}`}
              {context.type === 'collaboration' && 'Collaboration Inquiry'}
            </p>
          </div>
        )}
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${styles.gradient} blur-3xl animate-pulse`} />
        <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br ${styles.gradient} blur-3xl animate-pulse`} style={{ animationDelay: '75ms' }} />
      </div>
    </motion.div>
  );
}
