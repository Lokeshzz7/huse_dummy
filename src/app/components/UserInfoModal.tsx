import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Link as LinkIcon,
  Github,
  Linkedin,
  Globe,
  MessageSquare,
  UserMinus,
  Flag,
  Search,
  Trophy
} from 'lucide-react';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
    status: 'online' | 'offline';
  };
}

export function UserInfoModal({ isOpen, onClose, user }: UserInfoModalProps) {
  // Mock user data - in a real app, this would come from an API
  const userDetails = {
    bio: 'Full-stack developer passionate about building innovative solutions. Love working on React, Node.js, and cloud technologies.',
    email: 'user@husecircle.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    joinedDate: 'January 2024',
    role: 'Computer Science Student',
    university: 'IIT Bangalore',
    year: '3rd Year',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'TypeScript'],
    achievements: [
      { icon: Trophy, label: 'Top Contributor', color: 'text-yellow-400' },
      { icon: Award, label: '5 Projects Completed', color: 'text-purple-400' },
      { icon: Star, label: '4.9 Rating', color: 'text-cyan-400' }
    ],
    socialLinks: [
      { icon: Github, label: 'GitHub', url: 'github.com/user' },
      { icon: Linkedin, label: 'LinkedIn', url: 'linkedin.com/in/user' },
      { icon: Globe, label: 'Portfolio', url: 'user.dev' }
    ],
    stats: [
      { label: 'Projects', value: '12' },
      { label: 'Contributions', value: '48' },
      { label: 'Followers', value: '156' },
      { label: 'Following', value: '89' }
    ]
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 100 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-[101]"
          >
            <div className="h-full bg-[#0F0F0F] border-l border-purple-500/20 shadow-2xl overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 p-6 border-b border-purple-500/20 bg-[#0F0F0F]/80 backdrop-blur-xl z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-xl font-bold">User Info</h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Profile Section */}
              <div className="p-6 border-b border-purple-500/10">
                <div className="text-center mb-4">
                  <div className="relative inline-block mb-3">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-5xl border-4 border-purple-500/20">
                      {user.avatar}
                    </div>
                    {user.status === 'online' && (
                      <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0F0F0F]"></div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-white text-2xl font-bold">{user.name}</h3>
                    {user.verified && (
                      <CheckCircle size={20} className="text-green-400" />
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{userDetails.bio}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {userDetails.stats.map((stat, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-2">
                        <p className="text-white font-bold">{stat.value}</p>
                        <p className="text-gray-500 text-xs">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <MessageSquare size={16} />
                      Message
                    </button>
                    <button className="px-4 py-2.5 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                      <Search size={16} />
                      View Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="p-6 border-b border-purple-500/10">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  Achievements
                </h4>
                <div className="space-y-2">
                  {userDetails.achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-purple-500/10">
                        <Icon className={`w-5 h-5 ${achievement.color}`} />
                        <span className="text-white text-sm">{achievement.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Skills */}
              <div className="p-6 border-b border-purple-500/10">
                <h4 className="text-white font-bold mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {userDetails.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="p-6 border-b border-purple-500/10">
                <h4 className="text-white font-bold mb-3">About</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white text-sm">{userDetails.university}</p>
                      <p className="text-gray-500 text-xs">{userDetails.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">{userDetails.role}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">{userDetails.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">Joined {userDetails.joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="p-6 border-b border-purple-500/10">
                <h4 className="text-white font-bold mb-3">Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">{userDetails.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">{userDetails.phone}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 border-b border-purple-500/10">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-purple-400" />
                  Social Links
                </h4>
                <div className="space-y-2">
                  {userDetails.socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={index}
                        href={`https://${link.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors group"
                      >
                        <Icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                        <div className="flex-1">
                          <p className="text-white text-sm group-hover:text-purple-300 transition-colors">{link.label}</p>
                          <p className="text-gray-500 text-xs">{link.url}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 space-y-3">
                <button className="w-full px-4 py-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <UserMinus size={18} />
                  Block User
                </button>
                <button className="w-full px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
                  <Flag size={18} />
                  Report User
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}