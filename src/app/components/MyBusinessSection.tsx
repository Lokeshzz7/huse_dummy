import { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle,
  Shield,
  Edit3,
  Save,
  Eye,
  Mail,
  TrendingUp,
  Activity,
  Image,
  Users,
  Megaphone,
  Target,
  Award,
  X,
  Plus,
  Calendar,
  Tag,
  MapPin,
  Linkedin,
  Trash2
} from 'lucide-react';

type KYCStatus = 'not-started' | 'pending' | 'approved' | 'rejected';
type TabType = 'dashboard' | 'kyc' | 'listings' | 'settings';

export function MyBusinessSection({ 
  kycStatus, 
  setActiveTab 
}: { 
  kycStatus: KYCStatus;
  setActiveTab: (tab: TabType) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [businessData, setBusinessData] = useState({
    name: 'Tech Solutions Inc.',
    industry: 'technology',
    description: 'We provide cutting-edge technology solutions for businesses of all sizes. Our team of expert developers and consultants help companies transform their digital presence and streamline operations.',
    website: 'https://techsolutions.com',
    email: 'contact@techsolutions.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Boulevard, San Francisco, CA 94105',
    founded: '2018',
    teamSize: '25-50',
    linkedin: 'https://linkedin.com/company/techsolutions',
    twitter: '@techsolutions'
  });

  // Photos state
  const [photos, setPhotos] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', caption: 'Modern office space' },
    { id: 2, url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600', caption: 'Team collaboration' },
    { id: 3, url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600', caption: 'Team meeting' },
    { id: 4, url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600', caption: 'Development team' },
  ]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ url: '', caption: '' });

  // Team state
  const [team, setTeam] = useState([
    { id: 1, name: 'John Smith', role: 'CEO & Founder', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', linkedin: 'https://linkedin.com/in/johnsmith' },
    { id: 2, name: 'Sarah Johnson', role: 'CTO', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', linkedin: 'https://linkedin.com/in/sarahjohnson' },
    { id: 3, name: 'Michael Chen', role: 'Head of Product', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', linkedin: 'https://linkedin.com/in/michaelchen' },
    { id: 4, name: 'Emily Davis', role: 'Lead Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', linkedin: 'https://linkedin.com/in/emilydavis' },
  ]);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '', avatar: '', linkedin: '' });

  // Services state
  const [services, setServices] = useState([
    { id: 1, name: 'Cloud Infrastructure Solutions', description: 'Scalable cloud services for growing businesses', price: 'Starting at $500/mo', icon: '☁️' },
    { id: 2, name: 'Custom Software Development', description: 'Tailored software solutions for your needs', price: 'Custom pricing', icon: '💻' },
    { id: 3, name: 'IT Consulting', description: 'Expert technology consulting services', price: '$150/hour', icon: '🎯' },
    { id: 4, name: 'Cybersecurity Services', description: 'Protect your business with our security solutions', price: 'Starting at $1000/mo', icon: '🔒' },
  ]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newService, setNewService] = useState({ name: '', description: '', price: '', icon: '💼' });

  // Updates state
  const [updates, setUpdates] = useState([
    { id: 1, title: 'New AI-Powered Feature Launch', content: 'We\'re excited to announce our latest AI integration that will transform how you manage your infrastructure.', date: '2024-01-15', category: 'Product Launch' },
    { id: 2, title: 'Expanded to East Coast', content: 'Opening our new office in New York City to better serve our growing client base.', date: '2024-01-10', category: 'Company News' },
    { id: 3, title: 'Partnership with TechCorp', content: 'Strategic partnership announced to deliver enhanced cloud solutions to enterprise clients.', date: '2024-01-05', category: 'Partnership' },
  ]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ title: '', content: '', category: 'Company News' });

  // Requirements/Positions state
  const [requirements, setRequirements] = useState([
    { id: 1, title: 'Senior Full Stack Developer', type: 'Full-time', location: 'San Francisco, CA', description: 'Looking for an experienced developer with React and Node.js expertise', tags: ['React', 'Node.js', 'TypeScript'] },
    { id: 2, title: 'Product Designer', type: 'Contract', location: 'Remote', description: 'Seeking a creative product designer to join our team', tags: ['Figma', 'UI/UX', 'Design Systems'] },
    { id: 3, title: 'Partnership Opportunities', type: 'Partnership', location: 'Flexible', description: 'Open to strategic partnerships with complementary businesses', tags: ['B2B', 'SaaS', 'Cloud'] },
  ]);
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [newPosition, setNewPosition] = useState({ title: '', type: 'Full-time', location: '', description: '', tags: '' });

  if (kycStatus !== 'approved') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <h2 className="text-white text-2xl">My Business</h2>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-8 text-center">
          <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-white text-xl mb-2">KYC Verification Required</h3>
          <p className="text-gray-400 mb-6">
            You need to complete KYC verification before you can list your business on Dofracto.
          </p>
          <button 
            onClick={() => setActiveTab('kyc')}
            className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all inline-flex items-center gap-2"
          >
            <Shield className="w-5 h-5" />
            Complete KYC Verification
          </button>
        </div>
      </motion.div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setBusinessData({
      ...businessData,
      [field]: value
    });
  };

  const handleSave = () => {
    setEditMode(false);
    alert('✅ Business listing updated successfully!\\n\\nYour changes have been saved and are now live on Dofracto.');
  };

  // Photo handlers
  const handleAddPhoto = () => {
    if (newPhoto.url && newPhoto.caption) {
      setPhotos([...photos, { id: Date.now(), ...newPhoto }]);
      setNewPhoto({ url: '', caption: '' });
      setShowPhotoModal(false);
    }
  };

  const handleRemovePhoto = (id: number) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  // Team handlers
  const handleAddTeamMember = () => {
    if (newTeamMember.name && newTeamMember.role) {
      setTeam([...team, { 
        id: Date.now(), 
        ...newTeamMember,
        avatar: newTeamMember.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      }]);
      setNewTeamMember({ name: '', role: '', avatar: '', linkedin: '' });
      setShowTeamModal(false);
    }
  };

  const handleRemoveTeamMember = (id: number) => {
    setTeam(team.filter(m => m.id !== id));
  };

  // Service handlers
  const handleAddService = () => {
    if (newService.name && newService.description && newService.price) {
      setServices([...services, { id: Date.now(), ...newService }]);
      setNewService({ name: '', description: '', price: '', icon: '💼' });
      setShowServiceModal(false);
    }
  };

  const handleRemoveService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  // Update handlers
  const handleAddUpdate = () => {
    if (newUpdate.title && newUpdate.content) {
      setUpdates([{ id: Date.now(), ...newUpdate, date: new Date().toISOString().split('T')[0] }, ...updates]);
      setNewUpdate({ title: '', content: '', category: 'Company News' });
      setShowUpdateModal(false);
    }
  };

  const handleRemoveUpdate = (id: number) => {
    setUpdates(updates.filter(u => u.id !== id));
  };

  // Position handlers
  const handleAddPosition = () => {
    if (newPosition.title && newPosition.location && newPosition.description) {
      setRequirements([...requirements, { 
        id: Date.now(), 
        ...newPosition, 
        tags: newPosition.tags.split(',').map(t => t.trim()).filter(t => t)
      }]);
      setNewPosition({ title: '', type: 'Full-time', location: '', description: '', tags: '' });
      setShowPositionModal(false);
    }
  };

  const handleRemovePosition = (id: number) => {
    setRequirements(requirements.filter(r => r.id !== id));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl mb-1">My Business</h2>
            <p className="text-gray-400 text-sm">Manage your business presence on Dofracto</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">Live</span>
            </div>
            <button
              onClick={() => editMode ? handleSave() : setEditMode(true)}
              className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all flex items-center gap-2"
            >
              {editMode ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit3 className="w-4 h-4" /> Edit Listing</>}
            </button>
          </div>
        </div>

        {/* Business Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-5 h-5 text-[#24c6dc]" />
              <span className="text-gray-400 text-sm">Profile Views</span>
            </div>
            <p className="text-white text-3xl mb-1">234</p>
            <p className="text-green-400 text-sm">+12% this week</p>
          </div>
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-[#24c6dc]" />
              <span className="text-gray-400 text-sm">Inquiries</span>
            </div>
            <p className="text-white text-3xl mb-1">18</p>
            <p className="text-green-400 text-sm">+5 new this week</p>
          </div>
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-[#24c6dc]" />
              <span className="text-gray-400 text-sm">Engagement</span>
            </div>
            <p className="text-white text-3xl mb-1">87%</p>
            <p className="text-green-400 text-sm">Above average</p>
          </div>
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-[#24c6dc]" />
              <span className="text-gray-400 text-sm">Ranking</span>
            </div>
            <p className="text-white text-3xl mb-1">#12</p>
            <p className="text-gray-400 text-sm">in Technology</p>
          </div>
        </div>

        {/* Business Profile Card */}
        <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#24c6dc]/10">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center text-white text-3xl font-bold">
              T
            </div>
            <div className="flex-1">
              {editMode ? (
                <input
                  type="text"
                  value={businessData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-2 text-white text-xl font-bold focus:outline-none focus:border-[#24c6dc] mb-2"
                />
              ) : (
                <h3 className="text-white text-2xl font-bold mb-1">{businessData.name}</h3>
              )}
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <span className="text-gray-400 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  San Francisco, CA
                </span>
                <span className="text-gray-400">Founded {businessData.founded}</span>
                <span className="text-gray-400">{businessData.teamSize} employees</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-white font-bold mb-4">Basic Information</h4>
              
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Industry</label>
                {editMode ? (
                  <select
                    value={businessData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] [&>option]:bg-gray-900 [&>option]:text-white"
                  >
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="retail">Retail</option>
                  </select>
                ) : (
                  <p className="text-white capitalize">{businessData.industry}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Business Description</label>
                {editMode ? (
                  <textarea
                    rows={5}
                    value={businessData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  />
                ) : (
                  <p className="text-white">{businessData.description}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Company Size</label>
                {editMode ? (
                  <select
                    value={businessData.teamSize}
                    onChange={(e) => handleInputChange('teamSize', e.target.value)}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] [&>option]:bg-gray-900 [&>option]:text-white"
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="11-25">11-25 employees</option>
                    <option value="25-50">25-50 employees</option>
                    <option value="50-100">50-100 employees</option>
                    <option value="100+">100+ employees</option>
                  </select>
                ) : (
                  <p className="text-white">{businessData.teamSize} employees</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-white font-bold mb-4">Contact Information</h4>
              
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Website</label>
                {editMode ? (
                  <input
                    type="url"
                    value={businessData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  />
                ) : (
                  <a href={businessData.website} target="_blank" rel="noopener noreferrer" className="text-[#24c6dc] hover:text-[#05997F]">
                    {businessData.website}
                  </a>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Contact Email</label>
                {editMode ? (
                  <input
                    type="email"
                    value={businessData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  />
                ) : (
                  <p className="text-white">{businessData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Phone Number</label>
                {editMode ? (
                  <input
                    type="tel"
                    value={businessData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  />
                ) : (
                  <p className="text-white">{businessData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Business Address</label>
                {editMode ? (
                  <input
                    type="text"
                    value={businessData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  />
                ) : (
                  <p className="text-white">{businessData.address}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">LinkedIn</label>
                {editMode ? (
                  <input
                    type="url"
                    value={businessData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  />
                ) : (
                  <a href={businessData.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#24c6dc] hover:text-[#05997F]">
                    {businessData.linkedin}
                  </a>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Twitter</label>
                {editMode ? (
                  <input
                    type="text"
                    value={businessData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  />
                ) : (
                  <p className="text-white">{businessData.twitter}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Business Gallery */}
        <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Image className="w-5 h-5 text-[#24c6dc]" />
              Business Gallery
            </h3>
            {editMode && (
              <button 
                onClick={() => setShowPhotoModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Photos
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img 
                  src={photo.url} 
                  alt={photo.caption}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <p className="text-white text-sm text-center px-2">{photo.caption}</p>
                </div>
                {editMode && (
                  <button 
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-[#24c6dc]" />
              Team Members
            </h3>
            {editMode && (
              <button 
                onClick={() => setShowTeamModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member) => (
              <div key={member.id} className="bg-black border border-[#24c6dc]/20 rounded-xl p-4 text-center relative group">
                {editMode && (
                  <button 
                    onClick={() => handleRemoveTeamMember(member.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="text-white font-bold mb-1">{member.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{member.role}</p>
                {member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#24c6dc] hover:text-[#05997F] text-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Services & Products */}
        <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-[#24c6dc]" />
              Services & Products
            </h3>
            {editMode && (
              <button 
                onClick={() => setShowServiceModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id} className="bg-black border border-[#24c6dc]/20 rounded-xl p-5 relative group">
                {editMode && (
                  <button 
                    onClick={() => handleRemoveService(service.id)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold mb-2">{service.name}</h4>
                    <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                    <p className="text-[#24c6dc] font-bold">{service.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Updates */}
        <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#24c6dc]" />
              Latest Updates
            </h3>
            {editMode && (
              <button 
                onClick={() => setShowUpdateModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Update
              </button>
            )}
          </div>
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className="bg-black border border-[#24c6dc]/20 rounded-xl p-5 relative group">
                {editMode && (
                  <button 
                    onClick={() => handleRemoveUpdate(update.id)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#24c6dc]/10 border border-[#24c6dc]/30 text-[#24c6dc] px-3 py-1 rounded-full text-xs">
                      {update.category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <h4 className="text-white font-bold mb-2">{update.title}</h4>
                <p className="text-gray-400 text-sm">{update.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions & Opportunities */}
        <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-[#24c6dc]" />
              Open Positions & Opportunities
            </h3>
            {editMode && (
              <button 
                onClick={() => setShowPositionModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Position
              </button>
            )}
          </div>
          <div className="space-y-4">
            {requirements.map((req) => (
              <div key={req.id} className="bg-black border border-[#24c6dc]/20 rounded-xl p-5 relative group">
                {editMode && (
                  <button 
                    onClick={() => handleRemovePosition(req.id)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-bold text-lg">{req.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    req.type === 'Full-time' ? 'bg-green-500/10 border border-green-500/30 text-green-400' :
                    req.type === 'Contract' ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400' :
                    'bg-purple-500/10 border border-purple-500/30 text-purple-400'
                  }`}>
                    {req.type}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {req.location}
                </p>
                <p className="text-gray-300 text-sm mb-4">{req.description}</p>
                <div className="flex flex-wrap gap-2">
                  {req.tags.map((tag, index) => (
                    <span key={index} className="bg-[#24c6dc]/10 text-[#24c6dc] px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      {showPhotoModal && (
        <Modal title="Add Photo" onClose={() => setShowPhotoModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Image URL *</label>
              <input
                type="url"
                value={newPhoto.url}
                onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Caption *</label>
              <input
                type="text"
                value={newPhoto.caption}
                onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="e.g., Modern office space"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPhoto}
                className="flex-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
              >
                Add Photo
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showTeamModal && (
        <Modal title="Add Team Member" onClose={() => setShowTeamModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Name *</label>
              <input
                type="text"
                value={newTeamMember.name}
                onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Role *</label>
              <input
                type="text"
                value={newTeamMember.role}
                onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="e.g., Senior Developer"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Avatar URL (optional)</label>
              <input
                type="url"
                value={newTeamMember.avatar}
                onChange={(e) => setNewTeamMember({ ...newTeamMember, avatar: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">LinkedIn URL (optional)</label>
              <input
                type="url"
                value={newTeamMember.linkedin}
                onChange={(e) => setNewTeamMember({ ...newTeamMember, linkedin: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowTeamModal(false)}
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTeamMember}
                className="flex-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
              >
                Add Member
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showServiceModal && (
        <Modal title="Add Service/Product" onClose={() => setShowServiceModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Service Name *</label>
              <input
                type="text"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="e.g., Web Development"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Description *</label>
              <textarea
                rows={3}
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="Brief description of the service"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Pricing *</label>
              <input
                type="text"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="e.g., $500/mo or Custom pricing"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Icon (emoji)</label>
              <input
                type="text"
                value={newService.icon}
                onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="💼"
                maxLength={2}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowServiceModal(false)}
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddService}
                className="flex-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
              >
                Add Service
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showUpdateModal && (
        <Modal title="Add Update" onClose={() => setShowUpdateModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Title *</label>
              <input
                type="text"
                value={newUpdate.title}
                onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="e.g., New Product Launch"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Category *</label>
              <select
                value={newUpdate.category}
                onChange={(e) => setNewUpdate({ ...newUpdate, category: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] [&>option]:bg-gray-900 [&>option]:text-white"
              >
                <option value="Company News">Company News</option>
                <option value="Product Launch">Product Launch</option>
                <option value="Partnership">Partnership</option>
                <option value="Achievement">Achievement</option>
                <option value="Event">Event</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Content *</label>
              <textarea
                rows={4}
                value={newUpdate.content}
                onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="Write your announcement or update..."
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUpdate}
                className="flex-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
              >
                Add Update
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showPositionModal && (
        <Modal title="Add Position" onClose={() => setShowPositionModal(false)}>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
              <label className="block text-gray-400 mb-2">Position Title *</label>
              <input
                type="text"
                value={newPosition.title}
                onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="e.g., Senior Developer"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Type *</label>
              <select
                value={newPosition.type}
                onChange={(e) => setNewPosition({ ...newPosition, type: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] [&>option]:bg-gray-900 [&>option]:text-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Location *</label>
              <input
                type="text"
                value={newPosition.location}
                onChange={(e) => setNewPosition({ ...newPosition, location: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="e.g., Remote or San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Description *</label>
              <textarea
                rows={3}
                value={newPosition.description}
                onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="Brief job description..."
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Skills/Tags (comma-separated)</label>
              <input
                type="text"
                value={newPosition.tags}
                onChange={(e) => setNewPosition({ ...newPosition, tags: e.target.value })}
                className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                placeholder="React, Node.js, TypeScript"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowPositionModal(false)}
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPosition}
                className="flex-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
              >
                Add Position
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

// Modal Component
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-[#24c6dc]/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}