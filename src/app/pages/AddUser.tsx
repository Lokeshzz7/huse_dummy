import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, UserPlus, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function AddUser() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Determine dashboard route based on user type
  const userType = localStorage.getItem('userType');
  const dashboardRoute = userType === 'superadmin' ? '/admin/super/dashboard' : '/admin/dashboard';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: '',
    department: '',
    position: '',
    company: '',
    avatar: null as File | null,
    sendWelcomeEmail: true,
    requirePasswordChange: true,
    huseCircleAccess: false,
    adminAccess: false
  });

  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear password error when user types
    if (name === 'password' || name === 'confirmPassword') {
      setErrors(prev => ({ ...prev, password: '', confirmPassword: '' }));
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate required fields
    const newErrors: typeof errors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.role) newErrors.role = 'Role is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      setIsSubmitting(false);
      toast.error('Invalid email format');
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      setIsSubmitting(false);
      toast.error('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long' }));
      setIsSubmitting(false);
      toast.error('Password must be at least 8 characters');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // In a real application, this would send data to the backend
      console.log('User Data:', formData);
      
      // Show success toast
      toast.success(
        `User "${formData.firstName} ${formData.lastName}" created successfully!`,
        {
          description: formData.sendWelcomeEmail 
            ? `Welcome email sent to ${formData.email}` 
            : 'No welcome email was sent',
        }
      );
      
      setIsSubmitting(false);
      
      // Navigate back to appropriate dashboard
      setTimeout(() => {
        navigate(dashboardRoute);
      }, 1000);
    }, 1500);
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
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl">Add New User</h1>
              <p className="text-gray-400">Create a new user account on Dofracto</p>
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
          {/* Personal Information */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-2">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                )}
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
                  placeholder="user@example.com"
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
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
            </div>
          </div>

          {/* Account Credentials */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Account Credentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    required
                    className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#24c6dc]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-gray-500 text-xs mt-1">Minimum 8 characters</p>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-2">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  required
                  className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none placeholder:text-gray-600 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-[#24c6dc]/30 focus:border-[#24c6dc]'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">
                  Role <span className="text-red-400">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                >
                  <option value="">Select a role</option>
                  <option value="user">User</option>
                  <option value="premium">Premium Member</option>
                  <option value="startup">Startup Founder</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-red-400 text-xs mt-1">{errors.role}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Marketing, Sales"
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g., Manager, Director"
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Profile Picture</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <label className="block border-2 border-dashed border-[#24c6dc]/30 rounded-lg p-8 text-center cursor-pointer hover:border-[#24c6dc] transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400 mb-2">Click to upload avatar</p>
                  <p className="text-gray-500 text-sm">PNG, JPG up to 5MB</p>
                </label>
              </div>
              
              {avatarPreview && (
                <div className="relative">
                  <div className="w-40 h-40 bg-black border border-[#24c6dc]/30 rounded-full overflow-hidden">
                    <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarPreview('');
                      setFormData(prev => ({ ...prev, avatar: null }));
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Permissions & Settings */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Permissions & Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-black border border-[#24c6dc]/30 rounded-lg cursor-pointer hover:border-[#24c6dc] transition-all">
                <div>
                  <p className="text-white">Send Welcome Email</p>
                  <p className="text-gray-400 text-sm">Send account credentials to user's email</p>
                </div>
                <input
                  type="checkbox"
                  name="sendWelcomeEmail"
                  checked={formData.sendWelcomeEmail}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-[#24c6dc]"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-black border border-[#24c6dc]/30 rounded-lg cursor-pointer hover:border-[#24c6dc] transition-all">
                <div>
                  <p className="text-white">Require Password Change</p>
                  <p className="text-gray-400 text-sm">User must change password on first login</p>
                </div>
                <input
                  type="checkbox"
                  name="requirePasswordChange"
                  checked={formData.requirePasswordChange}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-[#24c6dc]"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-black border border-[#24c6dc]/30 rounded-lg cursor-pointer hover:border-[#24c6dc] transition-all">
                <div>
                  <p className="text-white">HUSE Circle Access</p>
                  <p className="text-gray-400 text-sm">Grant access to premium HUSE Circle features</p>
                </div>
                <input
                  type="checkbox"
                  name="huseCircleAccess"
                  checked={formData.huseCircleAccess}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-[#24c6dc]"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-black border border-[#24c6dc]/30 rounded-lg cursor-pointer hover:border-[#24c6dc] transition-all">
                <div>
                  <p className="text-white">Admin Access</p>
                  <p className="text-gray-400 text-sm">Grant administrative privileges (use with caution)</p>
                </div>
                <input
                  type="checkbox"
                  name="adminAccess"
                  checked={formData.adminAccess}
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
              {isSubmitting ? (
                <CheckCircle className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Create User
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}