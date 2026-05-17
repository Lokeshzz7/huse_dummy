import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, GraduationCap, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function AddStudent() {
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
    college: '',
    degree: '',
    major: '',
    year: '',
    studentId: '',
    avatar: null as File | null,
    verificationDocument: null as File | null,
    sendWelcomeEmail: true,
    requirePasswordChange: true,
    autoApprove: false
  });

  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    college?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, verificationDocument: file }));
      toast.success(`Document "${file.name}" uploaded`);
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
    if (!formData.college) newErrors.college = 'College is required';
    
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
      console.log('Student Data:', formData);
      
      toast.success(
        `Student "${formData.firstName} ${formData.lastName}" added successfully!`,
        {
          description: formData.autoApprove 
            ? 'Account approved and ready for use' 
            : 'Account pending verification',
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
            className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl">Add New Student</h1>
              <p className="text-gray-400">Create a new student account on HUSE Circle</p>
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
          <div className="bg-[#111] border border-purple-500/20 rounded-xl p-6">
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
                    errors.firstName ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
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
                    errors.lastName ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
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
                  placeholder="student@college.edu"
                  required
                  className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none placeholder:text-gray-600 ${
                    errors.email ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
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
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Account Credentials */}
          <div className="bg-[#111] border border-purple-500/20 rounded-xl p-6">
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
                      errors.password ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400"
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
                    errors.confirmPassword ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                  }`}
                />
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-[#111] border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Academic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">
                  College/University <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="e.g., MIT, Stanford"
                  required
                  className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none placeholder:text-gray-600 ${
                    errors.college ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                  }`}
                />
                {errors.college && <p className="text-red-400 text-xs mt-1">{errors.college}</p>}
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Degree</label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select degree</option>
                  <option value="associate">Associate's</option>
                  <option value="bachelor">Bachelor's</option>
                  <option value="master">Master's</option>
                  <option value="phd">Ph.D.</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Major/Field of Study</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Year of Study</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5+">5+ Year</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-2">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="University student ID"
                  className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Profile Picture & Verification */}
          <div className="bg-[#111] border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Profile Picture & Verification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-3">Profile Picture</label>
                <label className="block border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm mb-1">Click to upload</p>
                  <p className="text-gray-500 text-xs">PNG, JPG up to 5MB</p>
                </label>
                {avatarPreview && (
                  <div className="relative mt-4">
                    <div className="w-32 h-32 bg-black border border-purple-500/30 rounded-full overflow-hidden mx-auto">
                      <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAvatarPreview('');
                        setFormData(prev => ({ ...prev, avatar: null }));
                      }}
                      className="absolute top-0 right-1/2 translate-x-16 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-3">Verification Document</label>
                <label className="block border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-all">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleDocumentUpload}
                    className="hidden"
                  />
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm mb-1">Student ID or proof of enrollment</p>
                  <p className="text-gray-500 text-xs">PDF, JPG, PNG up to 10MB</p>
                </label>
                {formData.verificationDocument && (
                  <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">Document uploaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-[#111] border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-white text-xl mb-6">Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-black border border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-500 transition-all">
                <div>
                  <p className="text-white">Send Welcome Email</p>
                  <p className="text-gray-400 text-sm">Send account credentials to student's email</p>
                </div>
                <input
                  type="checkbox"
                  name="sendWelcomeEmail"
                  checked={formData.sendWelcomeEmail}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-purple-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-black border border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-500 transition-all">
                <div>
                  <p className="text-white">Require Password Change</p>
                  <p className="text-gray-400 text-sm">Student must change password on first login</p>
                </div>
                <input
                  type="checkbox"
                  name="requirePasswordChange"
                  checked={formData.requirePasswordChange}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-purple-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-black border border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-500 transition-all">
                <div>
                  <p className="text-white">Auto-Approve Account</p>
                  <p className="text-gray-400 text-sm">Skip verification and approve immediately</p>
                </div>
                <input
                  type="checkbox"
                  name="autoApprove"
                  checked={formData.autoApprove}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded accent-purple-500"
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 bg-black border border-purple-500/30 text-white rounded-lg hover:border-purple-500 transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Student
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
