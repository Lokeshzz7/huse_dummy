import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { apiPost } from '../../../lib/api';
import { toast } from 'sonner';
import { Loader2, Sparkles, X, Plus } from 'lucide-react';

const AVATAR_STYLES = [
  'adventurer', 'avataaars', 'big-ears', 'bottts', 
  'croodles', 'fun-emoji', 'icons', 'identicon', 
  'lorelei', 'micah', 'miniavs', 'personas', 
  'pixel-art', 'rings', 'shapes', 'thumbs'
];

export function Step4AvatarSkills({ onComplete }: { onComplete: () => void }) {
  const { user, updateUser } = useAuth();
  
  const [avatarStyle, setAvatarStyle] = useState(user?.avatar_style || 'adventurer');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [loading, setLoading] = useState(false);

  // Re-generate DiceBear avatar URL on the fly
  const avatarUrl = user?.id ? `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${user.id}` : '';

  const handleAddSkill = () => {
    const skill = currentSkill.trim();
    if (skill && !skills.includes(skill) && skills.length < 10) {
      setSkills([...skills, skill]);
      setCurrentSkill('');
    } else if (skills.length >= 10) {
      toast.error('Maximum 10 skills allowed');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setLoading(true);

    try {
      // 1. Backend update for profile fields
      await apiPost(`/users/${user.id}/update`, { bio, skills });

      // 2. Supabase update for avatar_style (not in backend schema)
      const { error: supabaseError } = await supabase
        .from('users')
        .update({ 
          avatar_style: avatarStyle
        })
        .eq('id', user.id);

      if (supabaseError) throw supabaseError;

      updateUser({
        avatar_style: avatarStyle,
        skills,
        bio,
        onboarding_step: 'upload_doc' // Move to Payment Step
      });
      
      toast.success('Profile details saved!');
      onComplete();
    } catch (e: any) {
      toast.error(e.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-[28px] font-bold text-white mb-2">Complete Profile</h2>
        <p className="text-gray-400">Choose your avatar and highlight your skills.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Avatar Selection */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 rounded-full border-4 border-purple-500/30 overflow-hidden bg-[#1A1A1A] p-2">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-contain rounded-full" />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-800 animate-pulse" />
            )}
          </div>
          
          <div className="w-full max-w-sm">
            <label className="text-sm text-gray-400 block mb-2 text-center">Avatar Style</label>
            <select 
              value={avatarStyle}
              onChange={(e) => setAvatarStyle(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none text-center"
            >
              {AVATAR_STYLES.map(style => (
                <option key={style} value={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Bio (Max 300 chars)</label>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 300))}
            rows={3}
            className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
            placeholder="Building cool stuff at HUSE..."
          />
          <div className="text-right text-xs text-gray-500">{bio.length}/300</div>
        </div>

        <div className="space-y-3">
          <label className="text-sm text-gray-400">Skills (Max 10)</label>
          <div className="flex gap-2">
            <input 
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="e.g. React, Python, UI/UX"
            />
            <button 
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-3 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-colors border border-purple-500/30"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <AnimatePresence>
              {skills.map(skill => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 px-3 py-1.5 rounded-full text-sm"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {skills.length === 0 && (
              <span className="text-gray-600 text-sm py-1.5">No skills added yet</span>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Finish Profile <Sparkles className="w-5 h-5" /></>}
        </button>

      </form>
    </motion.div>
  );
}
