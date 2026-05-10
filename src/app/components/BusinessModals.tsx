import { X } from 'lucide-react';

// Add Photo Modal
export function AddPhotoModal({
  show,
  onClose,
  onAdd
}: {
  show: boolean;
  onClose: () => void;
  onAdd: (data: { url: string; caption: string }) => void;
}) {
  const [formData, setFormData] = React.useState({ url: '', caption: '' });

  const handleSubmit = () => {
    if (formData.url && formData.caption) {
      onAdd(formData);
      setFormData({ url: '', caption: '' });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-[#24c6dc]/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-bold">Add Photo</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Caption</label>
            <input
              type="text"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="e.g., Modern office space"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
            >
              Add Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add Team Member Modal
export function AddTeamMemberModal({
  show,
  onClose,
  onAdd
}: {
  show: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; role: string; avatar: string; linkedin: string }) => void;
}) {
  const [formData, setFormData] = React.useState({ name: '', role: '', avatar: '', linkedin: '' });

  const handleSubmit = () => {
    if (formData.name && formData.role) {
      onAdd({
        ...formData,
        avatar: formData.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      });
      setFormData({ name: '', role: '', avatar: '', linkedin: '' });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-[#24c6dc]/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-bold">Add Team Member</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Role *</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="e.g., Senior Developer"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Avatar URL (optional)</label>
            <input
              type="url"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">LinkedIn URL (optional)</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add Service Modal
export function AddServiceModal({
  show,
  onClose,
  onAdd
}: {
  show: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; description: string; price: string; icon: string }) => void;
}) {
  const [formData, setFormData] = React.useState({ name: '', description: '', price: '', icon: '💼' });

  const handleSubmit = () => {
    if (formData.name && formData.description && formData.price) {
      onAdd(formData);
      setFormData({ name: '', description: '', price: '', icon: '💼' });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-[#24c6dc]/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-bold">Add Service/Product</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Service Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="e.g., Web Development"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Description *</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="Brief description of the service"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Pricing *</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="e.g., $500/mo or Custom pricing"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Icon (emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="💼"
              maxLength={2}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
            >
              Add Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add Update Modal
export function AddUpdateModal({
  show,
  onClose,
  onAdd
}: {
  show: boolean;
  onClose: () => void;
  onAdd: (data: { title: string; content: string; category: string }) => void;
}) {
  const [formData, setFormData] = React.useState({ title: '', content: '', category: 'Company News' });

  const handleSubmit = () => {
    if (formData.title && formData.content) {
      onAdd(formData);
      setFormData({ title: '', content: '', category: 'Company News' });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-[#24c6dc]/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-bold">Add Update</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="e.g., New Product Launch"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="Write your announcement or update..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
            >
              Add Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add Position Modal
export function AddPositionModal({
  show,
  onClose,
  onAdd
}: {
  show: boolean;
  onClose: () => void;
  onAdd: (data: { title: string; type: string; location: string; description: string; tags: string[] }) => void;
}) {
  const [formData, setFormData] = React.useState({ title: '', type: 'Full-time', location: '', description: '', tags: '' });

  const handleSubmit = () => {
    if (formData.title && formData.location && formData.description) {
      onAdd({
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      });
      setFormData({ title: '', type: 'Full-time', location: '', description: '', tags: '' });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-[#24c6dc]/30 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-bold">Add Position</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Position Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="e.g., Senior Developer"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="e.g., Remote or San Francisco, CA"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Description *</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="Brief job description..."
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Skills/Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
              placeholder="React, Node.js, TypeScript"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
            >
              Add Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';