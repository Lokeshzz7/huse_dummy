import { useState } from 'react';
import { X, Upload, Link as LinkIcon, Plus, DollarSign, Calendar, Tag, Bell, Lock, Eye, Globe, Moon, Sun, Palette, Shield, User, Mail, Phone, MapPin, Briefcase, Code } from 'lucide-react';
import { GraduationCap, Rocket, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';

// Add Project Modal
export function AddProjectModal({ show, onClose, onAdd }: { show: boolean; onClose: () => void; onAdd: (project: any) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    github: '',
    live: '',
    image: '💼'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      onAdd({
        id: Date.now(),
        ...formData,
        tech: formData.tech.split(',').map(t => t.trim()).filter(t => t),
        likes: 0,
        views: 0,
        recruitersViewed: 0
      });
      setFormData({ title: '', description: '', tech: '', github: '', live: '', image: '💼' });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0F0F0F] border border-purple-500/30 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-2xl font-bold huse-gradient-text">Add Project</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Project Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g., E-Commerce Platform"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Description *</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="Describe your project..."
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Technologies (comma-separated) *</label>
            <input
              type="text"
              value={formData.tech}
              onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="React, Node.js, MongoDB"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2 text-sm">GitHub URL</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Live URL</label>
              <input
                type="url"
                value={formData.live}
                onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="https://myproject.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Project Icon (Emoji)</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="💼"
              maxLength={2}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Post Gig Modal
export function PostGigModal({ show, onClose, onAdd, currentUser }: { show: boolean; onClose: () => void; onAdd: (gig: any) => void; currentUser: any }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    duration: '',
    skills: '',
    difficulty: 'Medium',
    repRequired: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.budget) {
      onAdd({
        id: Date.now(),
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        postedBy: {
          name: currentUser.name,
          avatar: currentUser.avatar,
          verified: currentUser.verified,
          reputation: currentUser.reputation
        },
        applications: 0,
        postedAt: 'Just now'
      });
      setFormData({ title: '', description: '', budget: '', duration: '', skills: '', difficulty: 'Medium', repRequired: 0 });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0F0F0F] border border-purple-500/30 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-2xl font-bold huse-gradient-text">Post a Gig</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Gig Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g., Build a Landing Page"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Description *</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="Describe what you need..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Budget *</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="₹5,000 - ₹10,000"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Duration *</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="3 days"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Required Skills (comma-separated) *</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="React, Tailwind, Figma"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Difficulty *</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Min. Reputation Required</label>
              <input
                type="number"
                value={formData.repRequired}
                onChange={(e) => setFormData({ ...formData, repRequired: parseInt(e.target.value) || 0 })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="0"
                min="0"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Post Gig
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Apply for Gig Modal
export function ApplyGigModal({ show, onClose, gig, onSubmit }: { show: boolean; onClose: () => void; gig: any; onSubmit: () => void }) {
  const [proposal, setProposal] = useState('');
  const [timeline, setTimeline] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (proposal && timeline) {
      onSubmit();
      setProposal('');
      setTimeline('');
      setPortfolioLink('');
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0F0F0F] border border-purple-500/30 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-2xl font-bold huse-gradient-text">Apply for Gig</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Gig Info */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-6">
          <h4 className="text-white font-bold mb-2">{gig?.title}</h4>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <DollarSign size={14} className="text-green-400" />
              {gig?.budget}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-purple-400" />
              {gig?.duration}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Your Proposal *</label>
            <textarea
              rows={5}
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="Explain how you'll complete this gig and why you're the best fit..."
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Estimated Timeline *</label>
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g., 2-3 days"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Portfolio/Work Sample Link (optional)</label>
            <input
              type="url"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="https://yourportfolio.com"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Sell Item Modal
export function SellItemModal({ show, onClose, onAdd, currentUser }: { show: boolean; onClose: () => void; onAdd: (item: any) => void; currentUser: any }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'other',
    condition: 'Like New',
    location: '',
    image: '📦'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.price) {
      onAdd({
        id: Date.now(),
        ...formData,
        seller: {
          name: currentUser.name,
          avatar: currentUser.avatar,
          verified: currentUser.verified,
          year: currentUser.year
        },
        interestedCount: 0,
        postedAt: 'Just now'
      });
      setFormData({ title: '', description: '', price: '', originalPrice: '', category: 'other', condition: 'Like New', location: '', image: '📦' });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0F0F0F] border border-purple-500/30 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-2xl font-bold huse-gradient-text">Sell an Item</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Item Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g., Data Structures Textbook"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Description *</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="Describe your item..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Price *</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="₹500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Original Price (optional)</label>
              <input
                type="text"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="₹800"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="books">Books</option>
                <option value="electronics">Electronics</option>
                <option value="notes">Notes</option>
                <option value="art">Art</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Condition *</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Custom Order">Custom Order</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Location/Hostel *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g., Hostel 4, Room 302"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Item Icon (Emoji)</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="📦"
              maxLength={2}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              List Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Contact Seller Modal
export function ContactSellerModal({ show, onClose, item }: { show: boolean; onClose: () => void; item: any }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      alert(`✅ Message sent to ${item?.seller?.name}!\n\nYour message: "${message}"\n\nThey will be notified and can respond via chat.`);
      setMessage('');
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0F0F0F] border border-purple-500/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-bold huse-gradient-text">Contact Seller</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Seller Info */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{item?.seller?.avatar}</div>
            <div>
              <h4 className="text-white font-bold">{item?.seller?.name}</h4>
              <p className="text-gray-400 text-sm">{item?.seller?.year}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-purple-500/20">
            <p className="text-white text-sm font-bold">{item?.title}</p>
            <p className="text-purple-400 text-sm">{item?.price}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Your Message *</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="Hi! I'm interested in this item. Is it still available?"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Settings Modal
export function SettingsModal({ show, onClose, currentUser }: { show: boolean; onClose: () => void; currentUser: any }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    gigAlerts: true,
    marketplaceAlerts: false,
    projectUpdates: true,
    weeklyDigest: true,
    profileVisibility: 'everyone',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    allowGigInvites: true,
    theme: 'dark',
    language: 'en'
  });

  const handleSave = () => {
    alert('✅ Settings saved successfully!');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0F0F0F] border border-purple-500/30 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-2xl font-bold huse-gradient-text">Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="text-purple-400" size={20} />
              <h4 className="text-white font-bold">Notification Preferences</h4>
            </div>
            <div className="space-y-3">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser notifications' },
                { key: 'gigAlerts', label: 'Gig Alerts', desc: 'New gig opportunities' },
                { key: 'marketplaceAlerts', label: 'Marketplace Alerts', desc: 'New items in marketplace' },
                { key: 'projectUpdates', label: 'Project Updates', desc: 'Updates on your projects' },
                { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of weekly activity' }
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-3 bg-black/30 rounded-lg cursor-pointer hover:bg-black/50 transition-all">
                  <div>
                    <div className="text-white text-sm font-medium">{item.label}</div>
                    <div className="text-gray-500 text-xs">{item.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                    className="w-5 h-5 accent-purple-500"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-purple-400" size={20} />
              <h4 className="text-white font-bold">Privacy & Security</h4>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Profile Visibility</label>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="everyone">Everyone</option>
                  <option value="college">My College Only</option>
                  <option value="connections">Connections Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              
              {[
                { key: 'showEmail', label: 'Show Email on Profile', desc: 'Let others see your email' },
                { key: 'showPhone', label: 'Show Phone on Profile', desc: 'Let others see your phone' },
                { key: 'allowMessages', label: 'Allow Direct Messages', desc: 'Anyone can message you' },
                { key: 'allowGigInvites', label: 'Allow Gig Invites', desc: 'Receive gig invitations' }
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-3 bg-black/30 rounded-lg cursor-pointer hover:bg-black/50 transition-all">
                  <div>
                    <div className="text-white text-sm font-medium">{item.label}</div>
                    <div className="text-gray-500 text-xs">{item.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                    className="w-5 h-5 accent-purple-500"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="text-purple-400" size={20} />
              <h4 className="text-white font-bold">Appearance</h4>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// Edit Profile Modal
export function EditProfileModal({ show, onClose, currentUser }: { show: boolean; onClose: () => void; currentUser: any }) {
  const [formData, setFormData] = useState({
    name: currentUser.name,
    bio: 'Passionate about building innovative solutions. Love coding, design, and entrepreneurship.',
    email: 'arjun.kumar@iitb.ac.in',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    college: currentUser.college,
    year: currentUser.year,
    branch: currentUser.branch,
    skills: 'React, Node.js, Python, UI/UX Design',
    interests: 'Web Development, AI/ML, Startups',
    github: 'github.com/arjunkumar',
    linkedin: 'linkedin.com/in/arjunkumar',
    portfolio: 'arjunkumar.dev',
    twitter: '@arjun_kumar',
    avatar: currentUser.avatar
  });

  const handleSave = () => {
    alert('✅ Profile updated successfully!');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0F0F0F] border border-purple-500/30 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-2xl font-bold huse-gradient-text">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Avatar & Basic Info */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <User className="text-purple-400" size={20} />
              <h4 className="text-white font-bold">Basic Information</h4>
            </div>
            
            <div className="flex items-center gap-6 mb-4 pb-4 border-b border-purple-500/20">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl">
                  {formData.avatar}
                </div>
                <button className="absolute bottom-0 right-0 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition-all">
                  <Upload size={16} />
                </button>
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-2">Choose your avatar emoji</p>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="👨‍💻"
                  maxLength={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-black border border-purple-500/30 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-400 mb-2 text-sm">Bio</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="Tell others about yourself..."
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-purple-400" size={20} />
              <h4 className="text-white font-bold">Contact Information</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-purple-400" size={20} />
              <h4 className="text-white font-bold">Academic Information</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">College</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  disabled
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Branch</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <Code className="text-purple-400" size={20} />
              <h4 className="text-white font-bold">Skills & Interests</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  placeholder="React, Python, Design..."
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Interests (comma-separated)</label>
                <input
                  type="text"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  placeholder="Web Dev, AI/ML, Startups..."
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-purple-400" size={20} />
              <h4 className="text-white font-bold">Social Links</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">GitHub</label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  placeholder="github.com/username"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">LinkedIn</label>
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  placeholder="linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Portfolio</label>
                <input
                  type="text"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  placeholder="yourportfolio.com"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Twitter</label>
                <input
                  type="text"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  placeholder="@username"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}