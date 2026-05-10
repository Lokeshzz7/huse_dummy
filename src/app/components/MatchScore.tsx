import { motion } from 'motion/react';
import { Target, CheckCircle, TrendingUp, Star, Zap, Award } from 'lucide-react';
import { MatchResult } from '../utils/smartMatching';

interface MatchScoreProps {
  matchResult: MatchResult;
  showDetails?: boolean;
  compact?: boolean;
}

export function MatchScore({ matchResult, showDetails = true, compact = false }: MatchScoreProps) {
  const { matchScore, tier, matchReasons, skillMatches } = matchResult;

  // Color scheme based on tier
  const tierColors = {
    excellent: {
      bg: 'from-[#05997F]/20 to-[#24c6dc]/20',
      border: '#05997F',
      text: '#05997F',
      label: 'Excellent Match'
    },
    good: {
      bg: 'from-[#8B5CF6]/20 to-[#24c6dc]/20',
      border: '#8B5CF6',
      text: '#8B5CF6',
      label: 'Good Match'
    },
    fair: {
      bg: 'from-[#F59E0B]/20 to-[#8B5CF6]/20',
      border: '#F59E0B',
      text: '#F59E0B',
      label: 'Fair Match'
    }
  };

  const colors = tierColors[tier];

  // Compact badge view
  if (compact) {
    return (
      <div 
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{
          background: `linear-gradient(135deg, ${colors.border}20, ${colors.border}10)`,
          border: `1px solid ${colors.border}40`,
          color: colors.text
        }}
      >
        <Target className="w-3.5 h-3.5" />
        <span>{matchScore}% Match</span>
      </div>
    );
  }

  // Full card view
  return (
    <motion.div
      className="bg-gradient-to-br border rounded-[15px] p-4"
      style={{
        backgroundImage: `linear-gradient(135deg, ${colors.bg})`,
        borderColor: `${colors.border}40`
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: `${colors.border}30` }}
          >
            {tier === 'excellent' && <Award className="w-5 h-5" style={{ color: colors.text }} />}
            {tier === 'good' && <TrendingUp className="w-5 h-5" style={{ color: colors.text }} />}
            {tier === 'fair' && <Target className="w-5 h-5" style={{ color: colors.text }} />}
          </div>
          <div>
            <div className="text-white font-bold text-sm">{colors.label}</div>
            <div className="text-gray-400 text-xs">AI-Powered Analysis</div>
          </div>
        </div>

        {/* Score Badge */}
        <div className="text-right">
          <div 
            className="text-2xl font-bold mb-0.5"
            style={{ color: colors.text }}
          >
            {matchScore}%
          </div>
          <div className="text-xs text-gray-400">Match Score</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full"
          style={{ background: colors.border }}
          initial={{ width: 0 }}
          animate={{ width: `${matchScore}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {showDetails && (
        <>
          {/* Skill Matches */}
          {skillMatches.length > 0 && (
            <div className="mb-3">
              <div className="text-white text-xs font-bold mb-2 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" style={{ color: colors.text }} />
                Matched Skills
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skillMatches.slice(0, 5).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-md text-xs font-medium capitalize"
                    style={{
                      background: `${colors.border}20`,
                      color: colors.text,
                      border: `1px solid ${colors.border}30`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Match Reasons */}
          {matchReasons.length > 0 && (
            <div>
              <div className="text-white text-xs font-bold mb-2 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" style={{ color: colors.text }} />
                Why This Match
              </div>
              <ul className="space-y-1.5">
                {matchReasons.map((reason, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-gray-300 flex items-start gap-2"
                  >
                    <span 
                      className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: colors.text }}
                    />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

interface MatchScoreListProps {
  matches: MatchResult[];
  title?: string;
  maxShow?: number;
}

export function MatchScoreList({ matches, title = 'Top Matched Providers', maxShow = 5 }: MatchScoreListProps) {
  const displayMatches = matches.slice(0, maxShow);

  if (displayMatches.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Target className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p>No matching providers found</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-[#24c6dc]" />
        {title}
      </h3>

      <div className="space-y-4">
        {displayMatches.map((match, idx) => (
          <motion.div
            key={match.provider.id}
            className="bg-[#0a0a0a] border border-white/10 rounded-[20px] p-5 hover:border-[#24c6dc]/30 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              {/* Provider Info */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  {match.provider.logo || match.provider.avatar || '👤'}
                </div>
                <div>
                  <div className="text-white font-bold text-base mb-0.5">
                    {match.provider.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="capitalize">{match.provider.type}</span>
                    {match.provider.isHuseAlumni && (
                      <>
                        <span>•</span>
                        <span className="text-[#8B5CF6]">HUSE Alumni</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="text-xs text-white">{match.provider.rating}</span>
                    </div>
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-xs text-gray-400">
                      {match.provider.completedProjects} projects
                    </span>
                  </div>
                </div>
              </div>

              {/* Match Score Badge */}
              <MatchScore matchResult={match} showDetails={false} compact={true} />
            </div>

            {/* Match Details */}
            <div className="grid md:grid-cols-2 gap-3">
              <MatchScore matchResult={match} showDetails={true} compact={false} />

              {/* Quick Stats */}
              <div className="bg-white/5 rounded-[12px] p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Response Time</span>
                  <span className="text-white font-bold">{match.provider.avgResponseTime}h avg</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Response Rate</span>
                  <span className="text-white font-bold">{Math.round(match.provider.responseRate * 100)}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Reputation</span>
                  <span className="text-[#24c6dc] font-bold">{match.provider.reputation}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
