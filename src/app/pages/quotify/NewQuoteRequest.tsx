import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Upload, Calendar, DollarSign, Clock,
  AlertCircle, CheckCircle, Send, X, Plus, Minus,
  Zap, Crown, Shield, Star
} from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { toast } from 'sonner';

export function NewQuoteRequest() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium' | 'enterprise'>('standard');

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    budget: { min: '', max: '' },
    timeline: '',
    deadline: '',
    requirements: [''],
    deliverables: [''],
    files: [] as File[],
    preferredProviders: 'any',
    paymentMethod: 'escrow'
  });

  useEffect(() => {
    // Check if user is logged in
    const quotifyUser = localStorage.getItem('quotifyUser');
    if (!quotifyUser) {
      toast.error('Please login to submit a quote request');
      navigate('/quotify/login');
      return;
    }
    setUser(JSON.parse(quotifyUser));
  }, [navigate]);

  if (!user) {
    return null;
  }

  const categories = [
    'Web Development',
    'Mobile App Development',
    'Design & Branding',
    'Marketing & SEO',
    'Content Creation',
    'Business Consulting',
    'Legal Services',
    'Accounting & Finance',
    'Construction & Renovation',
    'IT Support',
    'Event Management',
    'Photography & Video',
    'Translation Services',
    'Other'
  ];

  const handleAddItem = (field: 'requirements' | 'deliverables') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const handleRemoveItem = (field: 'requirements' | 'deliverables', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const handleItemChange = (field: 'requirements' | 'deliverables', index: number, value: string) => {
    const newItems = [...formData[field]];
    newItems[index] = value;
    setFormData({
      ...formData,
      [field]: newItems
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({
        ...formData,
        files: [...formData.files, ...newFiles]
      });
      toast.success(`${newFiles.length} file(s) added`);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData({
      ...formData,
      files: formData.files.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const planPrices = {
        standard: '₹149',
        premium: '₹399',
        enterprise: '₹999'
      };
      
      // Prepare request data for smart matching
      const requestData = {
        category: formData.category,
        title: formData.title,
        description: formData.description,
        budget: `${formData.budget.min}-${formData.budget.max}`,
        timeline: formData.timeline,
        tier: selectedPlan
      };
      
      toast.success('Quote request submitted successfully!', {
        description: `Paid ${planPrices[selectedPlan]} - Running AI matching...`
      });
      setIsSubmitting(false);
      
      // Navigate to Smart Match Results with request data
      navigate('/quotify/match-results', { 
        state: { request: requestData }
      });
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">
          Service Category <span className="text-red-400">*</span>
        </label>
        <select
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">
          Project Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="E.g., E-commerce website with payment integration"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">
          Project Description <span className="text-red-400">*</span>
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={6}
          placeholder="Describe your project in detail. Include goals, features, target audience, etc."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
        />
        <p className="text-xs text-gray-400 mt-2">
          💡 Tip: More details help providers give accurate quotes
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Budget & Timeline</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-medium mb-2">
            Minimum Budget
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={formData.budget.min}
              onChange={(e) => setFormData({ ...formData, budget: { ...formData.budget, min: e.target.value } })}
              placeholder="5,000"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Maximum Budget
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={formData.budget.max}
              onChange={(e) => setFormData({ ...formData, budget: { ...formData.budget, max: e.target.value } })}
              placeholder="10,000"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">
          Expected Timeline
        </label>
        <select
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
        >
          <option value="">Select timeline</option>
          <option value="1-2 weeks">1-2 weeks</option>
          <option value="2-4 weeks">2-4 weeks</option>
          <option value="1-2 months">1-2 months</option>
          <option value="2-3 months">2-3 months</option>
          <option value="3-6 months">3-6 months</option>
          <option value="6+ months">6+ months</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">
          Project Deadline
        </label>
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Requirements & Deliverables</h3>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-white font-medium">
            Project Requirements
          </label>
          <button
            type="button"
            onClick={() => handleAddItem('requirements')}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Requirement
          </button>
        </div>
        <div className="space-y-2">
          {formData.requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleItemChange('requirements', index, e.target.value)}
                placeholder={`Requirement ${index + 1}`}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
              {formData.requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem('requirements', index)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-white font-medium">
            Expected Deliverables
          </label>
          <button
            type="button"
            onClick={() => handleAddItem('deliverables')}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Deliverable
          </button>
        </div>
        <div className="space-y-2">
          {formData.deliverables.map((del, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={del}
                onChange={(e) => handleItemChange('deliverables', index, e.target.value)}
                placeholder={`Deliverable ${index + 1}`}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
              {formData.deliverables.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem('deliverables', index)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">
          Attach Files (Optional)
        </label>
        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-all">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-400 mb-2">Drop files here or click to upload</p>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg cursor-pointer hover:bg-cyan-500/30 transition-all"
          >
            Choose Files
          </label>
        </div>
        {formData.files.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="text-white text-sm">{file.name}</span>
                  <span className="text-gray-400 text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Select Your Plan</h3>
        <p className="text-gray-400">Choose how you want to post your quote request</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Standard Plan */}
        <motion.button
          type="button"
          onClick={() => setSelectedPlan('standard')}
          whileHover={{ scale: 1.02 }}
          className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
            selectedPlan === 'standard'
              ? 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 border-white/10 hover:border-white/20'
          }`}
        >
          {selectedPlan === 'standard' && (
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-bold text-white">Standard</h4>
              <p className="text-xs text-gray-400">48h Response</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-white">₹149</span>
            </div>
            <p className="text-xs text-gray-400">Per request</p>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Standard visibility</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>48h response time</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>500+ providers</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Basic support</span>
            </li>
          </ul>
        </motion.button>

        {/* Premium Plan */}
        <motion.button
          type="button"
          onClick={() => setSelectedPlan('premium')}
          whileHover={{ scale: 1.02 }}
          className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
            selectedPlan === 'premium'
              ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
              : 'bg-white/5 border-white/10 hover:border-white/20'
          }`}
        >
          {selectedPlan === 'premium' && (
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white">
            POPULAR
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="font-bold text-white">Premium</h4>
              <p className="text-xs text-gray-400">24h Response</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-white">₹399</span>
            </div>
            <p className="text-xs text-gray-400">Per request</p>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-purple-400">Featured</strong> placement</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-purple-400">24h</strong> response time</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Priority notifications</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Premium support</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Higher quality quotes</span>
            </li>
          </ul>
        </motion.button>

        {/* Enterprise Plan */}
        <motion.button
          type="button"
          onClick={() => setSelectedPlan('enterprise')}
          whileHover={{ scale: 1.02 }}
          className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
            selectedPlan === 'enterprise'
              ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50 shadow-lg shadow-amber-500/20'
              : 'bg-white/5 border-white/10 hover:border-white/20'
          }`}
        >
          {selectedPlan === 'enterprise' && (
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white">Enterprise</h4>
              <p className="text-xs text-gray-400">8h Response</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-white">₹999</span>
            </div>
            <p className="text-xs text-gray-400">Per request</p>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-amber-400">Top</strong> placement</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-amber-400">8h</strong> guaranteed response</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>Instant notifications</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>Dedicated support</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>Quality guarantee</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>Elite providers only</span>
            </li>
          </ul>
        </motion.button>
      </div>

      {/* Benefits Banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-white mb-2">💳 One-Time Payment</h5>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pay only to post your request. There are <strong className="text-cyan-400">no additional fees</strong> to receive and review quotes. You only pay providers when you hire them through our secure escrow system.
            </p>
          </div>
        </div>
      </div>

      {/* Review Summary */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h4 className="font-bold text-white mb-4">📋 Request Summary</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400 block mb-1">Project:</span>
            <span className="text-white font-medium">{formData.title || 'Not specified'}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Category:</span>
            <span className="text-white font-medium">{formData.category || 'Not selected'}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Budget Range:</span>
            <span className="text-white font-medium">
              ${formData.budget.min || '0'} - ${formData.budget.max || '0'}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Timeline:</span>
            <span className="text-white font-medium">{formData.timeline || 'Not specified'}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Selected Plan:</span>
            <span className={`font-bold ${
              selectedPlan === 'standard' ? 'text-cyan-400' :
              selectedPlan === 'premium' ? 'text-purple-400' :
              'text-amber-400'
            }`}>
              {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} (₹{
                selectedPlan === 'standard' ? '149' :
                selectedPlan === 'premium' ? '399' :
                '999'
              })
            </span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Response Time:</span>
            <span className="text-white font-medium">
              {selectedPlan === 'standard' ? '48 hours' :
               selectedPlan === 'premium' ? '24 hours' :
               '8 hours'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Preferences</h3>
      </div>

      <div>
        <label className="block text-white font-medium mb-3">
          Preferred Provider Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: 'any', label: 'Any Provider', desc: 'Get quotes from all' },
            { value: 'startup', label: 'Dofracto Startups', desc: 'Established businesses' },
            { value: 'student', label: 'HUSE Students', desc: 'Talented students' }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, preferredProviders: option.value })}
              className={`p-4 border rounded-lg transition-all text-left ${
                formData.preferredProviders === option.value
                  ? 'bg-cyan-500/20 border-cyan-500/50'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="font-medium text-white mb-1">{option.label}</div>
              <div className="text-sm text-gray-400">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white font-medium mb-3">
          Payment Method
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: 'escrow', label: 'Escrow Payment', desc: 'Secure milestone-based payment' },
            { value: 'direct', label: 'Direct Payment', desc: 'Pay directly to provider' }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, paymentMethod: option.value })}
              className={`p-4 border rounded-lg transition-all text-left ${
                formData.paymentMethod === option.value
                  ? 'bg-cyan-500/20 border-cyan-500/50'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="font-medium text-white mb-1">{option.label}</div>
              <div className="text-sm text-gray-400">{option.desc}</div>
            </button>
          ))}
        </div>
        {formData.paymentMethod === 'escrow' && (
          <div className="mt-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <p className="text-sm text-green-400">
              ✓ Recommended: Escrow protects both parties with milestone-based payments
            </p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-6">
        <h4 className="font-bold text-white mb-3">🚀 Ready to Submit</h4>
        <p className="text-gray-400 text-sm mb-4">
          Your quote request will be sent to <strong className="text-cyan-400">500+ verified providers</strong> in the HUSE Circle and Dofracto ecosystem. 
          You'll start receiving quotes within <strong className="text-cyan-400">{selectedPlan === 'standard' ? '48 hours' : selectedPlan === 'premium' ? '24 hours' : '8 hours'}</strong>.
        </p>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Posting Fee:</span>
            <span className="text-white font-bold text-lg">₹{
              selectedPlan === 'standard' ? '149' :
              selectedPlan === 'premium' ? '399' :
              '999'
            }</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Plan:</span>
            <span className={`font-medium ${
              selectedPlan === 'standard' ? 'text-cyan-400' :
              selectedPlan === 'premium' ? 'text-purple-400' :
              'text-amber-400'
            }`}>
              {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      <div className="pt-[100px] pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex-1 flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                    step >= s ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white' : 'bg-white/5 text-gray-400'
                  }`}>
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 5 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${
                      step > s ? 'bg-gradient-to-r from-cyan-500 to-teal-500' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Basic Info</span>
              <span>Budget</span>
              <span>Details</span>
              <span>Plan</span>
              <span>Submit</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
              {step === 5 && renderStep5()}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}