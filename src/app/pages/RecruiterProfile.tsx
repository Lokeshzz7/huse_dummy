import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Building2, Mail, Phone, Globe, MapPin, Users,
  Briefcase, Target, Edit3, Save, X, Camera, CheckCircle,
  Linkedin, Twitter, Instagram, Award, TrendingUp, Eye,
  Calendar, DollarSign, Code, Palette, Megaphone, Coffee
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function RecruiterProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'company' | 'preferences'>('profile');

  const [profileData, setProfileData] = useState({
    // Personal Info
    name: 'Rajesh Sharma',
    role: 'Senior Talent Acquisition Manager',
    email: 'rajesh.sharma@techcorp.com',
    phone: '+91 98765 12345',
    avatar: '👨‍💼',
    
    // Company Info
    company: 'TechCorp India',
    companyLogo: '🚀',
    industry: 'Technology',
    companySize: '500-1000 employees',
    location: 'Bangalore, India',
    website: 'https://techcorp.com',
    description: 'Leading technology company building innovative solutions for the future. We\'re passionate about hiring top talent from premier institutions.',
    founded: '2015',
    
    // Social Links
    linkedin: 'https://linkedin.com/company/techcorp',
    twitter: 'https://twitter.com/techcorp',
    instagram: 'https://instagram.com/techcorp',
    
    // Preferences
    lookingFor: ['Full-Stack Developers', 'ML Engineers', 'UI/UX Designers', 'DevOps Engineers'],
    preferredColleges: ['IIT Bombay', 'IIT Delhi', 'BITS Pilani', 'IIIT Hyderabad'],
    minCGPA: 7.5,
    experienceLevel: 'Entry Level / Internship',
    workMode: 'Hybrid',
    
    // Stats
    stats: {
      studentsContacted: 127,
      activeJobs: 8,
      hires: 23,
      profileViews: 456
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'E-commerce', 'Education',
    'Consulting', 'Manufacturing', 'Real Estate', 'Media', 'Automotive'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', 
    '201-500 employees', '500-1000 employees', '1000+ employees'
  ];

  const roles = [
    'Full-Stack Developers', 'Frontend Developers', 'Backend Developers',
    'ML Engineers', 'Data Scientists', 'UI/UX Designers', 
    'DevOps Engineers', 'Product Managers', 'Business Analysts'
  ];

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/recruiter/dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            
            {isEditing ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white rounded-[10px] transition-all flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-[10px] font-medium hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-[10px] font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 relative">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-purple-500/20 rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar & Company Logo */}
            <div className="flex gap-4">
              <div className="relative group">
                <div className="text-[100px]">{profileData.avatar}</div>
                {isEditing && (
                  <button className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={32} />
                  </button>
                )}
              </div>
              <div className="relative group">
                <div className="text-[100px]">{profileData.companyLogo}</div>
                {isEditing && (
                  <button className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={32} />
                  </button>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{profileData.name}</h1>
                  <p className="text-purple-400 text-xl mb-3">{profileData.role}</p>
                  <p className="text-blue-400 text-lg font-medium mb-4">{profileData.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail size={18} />
                      <span>{profileData.email}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Phone size={18} />
                      <span>{profileData.phone}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span>{profileData.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 px-4 py-2 rounded-xl">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={18} />
                    <span className="font-bold">Verified Recruiter</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-black/30 rounded-xl p-4 text-center">
                  <Users className="text-blue-400 mx-auto mb-2" size={24} />
                  <p className="text-blue-400 font-bold text-2xl">{profileData.stats.studentsContacted}</p>
                  <p className="text-gray-500 text-xs">Students Contacted</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 text-center">
                  <Briefcase className="text-purple-400 mx-auto mb-2" size={24} />
                  <p className="text-purple-400 font-bold text-2xl">{profileData.stats.activeJobs}</p>
                  <p className="text-gray-500 text-xs">Active Jobs</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 text-center">
                  <Award className="text-amber-400 mx-auto mb-2" size={24} />
                  <p className="text-amber-400 font-bold text-2xl">{profileData.stats.hires}</p>
                  <p className="text-gray-500 text-xs">Successful Hires</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 text-center">
                  <Eye className="text-green-400 mx-auto mb-2" size={24} />
                  <p className="text-green-400 font-bold text-2xl">{profileData.stats.profileViews}</p>
                  <p className="text-gray-500 text-xs">Profile Views</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'company'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
            }`}
          >
            Company Details
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'preferences'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-[#1A1A1A] border border-purple-500/20 text-gray-400 hover:text-white'
            }`}
          >
            Hiring Preferences
          </button>
        </div>

        {/* Personal Info Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1A1A] border border-purple-500/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Role/Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.role}
                    onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.role}</p>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.phone}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-gray-400 text-sm mb-2 block">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                />
              ) : (
                <p className="text-white text-lg">{profileData.location}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Company Tab */}
        {activeTab === 'company' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1A1A] border border-purple-500/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Company Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Company Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.company}</p>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Industry</label>
                {isEditing ? (
                  <select
                    value={profileData.industry}
                    onChange={(e) => setProfileData({...profileData, industry: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                  >
                    {industries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-white text-lg">{profileData.industry}</p>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Company Size</label>
                {isEditing ? (
                  <select
                    value={profileData.companySize}
                    onChange={(e) => setProfileData({...profileData, companySize: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                  >
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-white text-lg">{profileData.companySize}</p>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Founded</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.founded}
                    onChange={(e) => setProfileData({...profileData, founded: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.founded}</p>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                  />
                ) : (
                  <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-lg hover:underline">
                    {profileData.website}
                  </a>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">Company Description</label>
              {isEditing ? (
                <textarea
                  value={profileData.description}
                  onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none resize-none"
                />
              ) : (
                <p className="text-white text-lg leading-relaxed">{profileData.description}</p>
              )}
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-3 block">Social Links</label>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl p-4">
                  <Linkedin className="text-blue-400" size={24} />
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.linkedin}
                      onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                      className="flex-1 bg-transparent text-white outline-none"
                      placeholder="LinkedIn URL"
                    />
                  ) : (
                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                      LinkedIn
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl p-4">
                  <Twitter className="text-cyan-400" size={24} />
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.twitter}
                      onChange={(e) => setProfileData({...profileData, twitter: e.target.value})}
                      className="flex-1 bg-transparent text-white outline-none"
                      placeholder="Twitter URL"
                    />
                  ) : (
                    <a href={profileData.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                      Twitter
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl p-4">
                  <Instagram className="text-pink-400" size={24} />
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.instagram}
                      onChange={(e) => setProfileData({...profileData, instagram: e.target.value})}
                      className="flex-1 bg-transparent text-white outline-none"
                      placeholder="Instagram URL"
                    />
                  ) : (
                    <a href={profileData.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1A1A] border border-purple-500/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Hiring Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-gray-400 text-sm mb-3 block">Looking For (Roles)</label>
                <div className="flex flex-wrap gap-2">
                  {roles.map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        if (isEditing) {
                          if (profileData.lookingFor.includes(role)) {
                            setProfileData({
                              ...profileData,
                              lookingFor: profileData.lookingFor.filter(r => r !== role)
                            });
                          } else {
                            setProfileData({
                              ...profileData,
                              lookingFor: [...profileData.lookingFor, role]
                            });
                          }
                        }
                      }}
                      disabled={!isEditing}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        profileData.lookingFor.includes(role)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-[#0F0F0F] border border-purple-500/20 text-gray-400'
                      } ${isEditing ? 'cursor-pointer hover:border-purple-500/40' : 'cursor-default'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-3 block">Preferred Colleges</label>
                <div className="flex flex-wrap gap-2">
                  {['IIT Bombay', 'IIT Delhi', 'BITS Pilani', 'NIT Trichy', 'IIIT Hyderabad', 'IIT Madras', 'IIT Kanpur'].map(college => (
                    <button
                      key={college}
                      onClick={() => {
                        if (isEditing) {
                          if (profileData.preferredColleges.includes(college)) {
                            setProfileData({
                              ...profileData,
                              preferredColleges: profileData.preferredColleges.filter(c => c !== college)
                            });
                          } else {
                            setProfileData({
                              ...profileData,
                              preferredColleges: [...profileData.preferredColleges, college]
                            });
                          }
                        }
                      }}
                      disabled={!isEditing}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        profileData.preferredColleges.includes(college)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-[#0F0F0F] border border-purple-500/20 text-gray-400'
                      } ${isEditing ? 'cursor-pointer hover:border-purple-500/40' : 'cursor-default'}`}
                    >
                      {college}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Minimum CGPA</label>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={profileData.minCGPA}
                      onChange={(e) => setProfileData({...profileData, minCGPA: parseFloat(e.target.value)})}
                      className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                    />
                  ) : (
                    <p className="text-white text-lg">{profileData.minCGPA}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Experience Level</label>
                  {isEditing ? (
                    <select
                      value={profileData.experienceLevel}
                      onChange={(e) => setProfileData({...profileData, experienceLevel: e.target.value})}
                      className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                    >
                      <option>Entry Level / Internship</option>
                      <option>1-2 years</option>
                      <option>2-5 years</option>
                      <option>5+ years</option>
                    </select>
                  ) : (
                    <p className="text-white text-lg">{profileData.experienceLevel}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Work Mode</label>
                  {isEditing ? (
                    <select
                      value={profileData.workMode}
                      onChange={(e) => setProfileData({...profileData, workMode: e.target.value})}
                      className="w-full px-4 py-3 bg-[#0F0F0F] border border-purple-500/20 rounded-xl text-white focus:border-purple-500/40 outline-none"
                    >
                      <option>Remote</option>
                      <option>Hybrid</option>
                      <option>On-site</option>
                    </select>
                  ) : (
                    <p className="text-white text-lg">{profileData.workMode}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
