import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export function AddBusiness() {
  const navigate = useNavigate();
  
  // Determine dashboard route based on user type
  const userType = localStorage.getItem('userType');
  const dashboardRoute = userType === 'superadmin' ? '/super-admin-dashboard' : '/admin-dashboard';
  
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    description: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    logo: null as File | null,
    featured: false,
    huseCircle: false
  });

  const [logoPreview, setLogoPreview] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.businessName || !formData.category || !formData.email) {
      alert('Please fill in all required fields (Business Name, Category, Email)');
      return;
    }

    // In a real application, this would send data to the backend
    console.log('Business Data:', formData);
    alert(`Business "${formData.businessName}" has been successfully added!`);
    
    // Navigate back to admin dashboard
    navigate(dashboardRoute);
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate(dashboardRoute);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(dashboardRoute)}
            className="flex items-center gap-2 text-gray-400 hover:text-[#24c6dc] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#24c6dc] to-[#05997F] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl">Add New Business</h1>
              <p className="text-gray-400">Create a new business listing on Dofracto</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Basic Information */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-2">
                  Business Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter business name"
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                >
                  <option value="">Select a category</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="consulting">Consulting</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="business@example.com"
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Enter business description..."
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Location Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">State/Province</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">ZIP/Postal Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="ZIP Code"
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Business Logo</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <label className="block border-2 border-dashed border-[#24c6dc]/30 rounded-lg p-8 text-center cursor-pointer hover:border-[#24c6dc] transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400 mb-2">Click to upload logo</p>
                  <p className="text-gray-500 text-sm">PNG, JPG, SVG up to 5MB</p>
                </label>
              </div>
              
              {logoPreview && (
                <div className="relative">
                  <div className="w-48 h-48 bg-black border border-[#24c6dc]/30 rounded-lg p-4 flex items-center justify-center">
                    <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview('');
                      setFormData(prev => ({ ...prev, logo: null }));
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Options */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Additional Options</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-black border border-[#24c6dc]/30 rounded-lg cursor-pointer hover:border-[#24c6dc] transition-all">
                <div>
                  <p className="text-white">Featured Business</p>
                  <p className="text-gray-400 text-sm">Display this business in featured listings</p>
                </div>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-[#24c6dc]"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-black border border-[#24c6dc]/30 rounded-lg cursor-pointer hover:border-[#24c6dc] transition-all">
                <div>
                  <p className="text-white">HUSE Circle Member</p>
                  <p className="text-gray-400 text-sm">Add to premium HUSE Circle community</p>
                </div>
                <input
                  type="checkbox"
                  name="huseCircle"
                  checked={formData.huseCircle}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-[#24c6dc]"
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 bg-black border border-[#24c6dc]/30 text-white rounded-lg hover:border-[#24c6dc] transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Add Business
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}