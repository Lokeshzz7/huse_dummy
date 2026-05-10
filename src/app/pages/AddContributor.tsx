import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Award, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function AddContributor() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const userType = localStorage.getItem('userType');
  const dashboardRoute = userType === 'superadmin' ? '/super-admin-dashboard' : '/admin-dashboard';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    expertise: '',
    experience: '',
    linkedIn: '',
    github: '',
    portfolio: '',
    avatar: null as File | null,
    sendWelcomeEmail: true,
    requirePasswordChange: true,
    grantFullAccess: true
  });

  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
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
    
    const newErrors: any = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast.error('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prev: any) => ({ ...prev, email: 'Please enter a valid email address' }));
      setIsSubmitting(false);
      toast.error('Invalid email format');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev: any) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      setIsSubmitting(false);
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setErrors((prev: any) => ({ ...prev, password: 'Password must be at least 8 characters long' }));
      setIsSubmitting(false);
      toast.error('Password must be at least 8 characters');
      return;
    }

    setTimeout(() => {
      console.log('Contributor Data:', formData);
      
      toast.success(
        `Contributor "${formData.firstName} ${formData.lastName}" added successfully!`,
        {
          description: 'Full Builder/Contributor access granted',
        }
      );
      
      setIsSubmitting(false);
      
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
            className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl">Add New Contributor</h1>
              <p className="text-gray-400">Create a contributor/builder account for Dofracto</p>
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
          <div className="bg-[#111] border border-amber-500/20 rounded-xl p-6">
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
                  className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none placeholder:text-gray-600 ${
                    errors.firstName ? 'border-red-500' : 'border-amber-500/30 focus:border-amber-500'
                  }`}
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
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
                  className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none placeholder:text-gray-600 ${
                    errors.lastName ? 'border-red-500' : 'border-amber-500/30 focus:border-amber-500'
                  }`}
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
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
                  placeholder="contributor@example.com"
                  required
                  className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none placeholder:text-gray-600 ${
                    errors.email ? 'border-red-500' : 'border-amber-500/30 focus:border-amber-500'
                  }`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Account Credentials */}
          <div className="bg-[#111] border border-amber-500/20 rounded-xl p-6">
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
                    className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none placeholder:text-gray-600 pr-12 ${
                      errors.password ? 'border-red-500' : 'border-amber-500/30 focus:border-amber-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                <p className="text-gray-500 text-xs mt-1">Minimum 8 characters</p>
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
                    errors.confirmPassword ? 'border-red-500' : 'border-amber-500/30 focus:border-amber-500'
                  }`}
                />
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-[#111] border border-amber-500/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Area of Expertise</label>
                <select
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="">Select expertise</option>
                  <option value="frontend">Frontend Development</option>
                  <option value="backend">Backend Development</option>
                  <option value="fullstack">Full-Stack Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="devops">DevOps</option>
                  <option value="design">UI/UX Design</option>
                  <option value="data">Data Science/ML</option>
                  <option value="blockchain">Blockchain</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Years of Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">GitHub Profile</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username"
                  className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 placeholder:text-gray-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-2">Portfolio Website</label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="bg-[#111] border border-amber-500/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Profile Picture</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <label className="block border-2 border-dashed border-amber-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-amber-500 transition-all">
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
                  <div className="w-40 h-40 bg-black border border-amber-500/30 rounded-full overflow-hidden">
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

          {/* Settings */}
          <div className="bg-[#111] border border-amber-500/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-black border border-amber-500/30 rounded-lg cursor-pointer hover:border-amber-500 transition-all">
                <div>
                  <p className="text-white">Send Welcome Email</p>
                  <p className="text-gray-400 text-sm">Send account credentials to contributor's email</p>
                </div>
                <input
                  type="checkbox"
                  name="sendWelcomeEmail"
                  checked={formData.sendWelcomeEmail}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-amber-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-black border border-amber-500/30 rounded-lg cursor-pointer hover:border-amber-500 transition-all">
                <div>
                  <p className="text-white">Require Password Change</p>
                  <p className="text-gray-400 text-sm">Contributor must change password on first login</p>
                </div>
                <input
                  type="checkbox"
                  name="requirePasswordChange"
                  checked={formData.requirePasswordChange}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-amber-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-black border border-amber-500/30 rounded-lg cursor-pointer hover:border-amber-500 transition-all">
                <div>
                  <p className="text-white">Grant Full Access</p>
                  <p className="text-gray-400 text-sm">Access to Unified Builders Hub & all Dofracto features</p>
                </div>
                <input
                  type="checkbox"
                  name="grantFullAccess"
                  checked={formData.grantFullAccess}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-amber-500"
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 bg-black border border-amber-500/30 text-white rounded-lg hover:border-amber-500 transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Contributor
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
