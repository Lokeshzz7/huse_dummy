import { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  User,
  Briefcase,
  FileText,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

type KYCStatus = 'not-started' | 'pending' | 'approved' | 'rejected';
type TabType = 'dashboard' | 'kyc' | 'listings' | 'settings';

export function KYCVerificationPage({ 
  kycStatus, 
  setKycStatus,
  setActiveTab
}: { 
  kycStatus: KYCStatus;
  setKycStatus: (status: KYCStatus) => void;
  setActiveTab: (tab: TabType) => void;
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    businessAddress: '',
    businessType: '',
    registrationNumber: '',
    taxId: ''
  });
  const [documents, setDocuments] = useState({
    businessLicense: null as File | null,
    taxCertificate: null as File | null,
    ownershipProof: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (docType: keyof typeof documents) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocuments({
        ...documents,
        [docType]: file
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate KYC submission
    setKycStatus('pending');
    alert('KYC Application Submitted!\\n\\nYour verification documents have been submitted for review. We will notify you once the verification is complete (typically within 2-3 business days).\\n\\nFor demo purposes, your KYC will be auto-approved in 3 seconds...');
    
    // For demo purposes, auto-approve after 3 seconds
    setTimeout(() => {
      setKycStatus('approved');
      alert('🎉 KYC Verification Approved!\\n\\nCongratulations! Your account has been verified. You can now list your business on Dofracto.\\n\\nClick "My Business" tab to manage your listing.');
      setActiveTab('listings'); // Auto-navigate to listings tab
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl mb-1">KYC Verification</h2>
          <p className="text-gray-400 text-sm">Complete your business verification to start listing</p>
        </div>
        {kycStatus === 'approved' && (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400">Verified</span>
          </div>
        )}
        {kycStatus === 'pending' && (
          <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400">Under Review</span>
          </div>
        )}
      </div>

      {kycStatus === 'approved' ? (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-white text-xl mb-2">Your Account is Verified!</h3>
          <p className="text-gray-400 mb-6">You can now list and manage your business on Dofracto.</p>
          <button 
            onClick={() => setActiveTab('listings')}
            className="bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
          >
            Go to My Business
          </button>
        </div>
      ) : kycStatus === 'pending' ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-8 text-center">
          <Clock className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
          <h3 className="text-white text-xl mb-2">Verification in Progress</h3>
          <p className="text-gray-400 mb-4">Your KYC documents are under review. This typically takes 2-3 business days.</p>
          <p className="text-gray-500 text-sm">We'll send you an email once the verification is complete.</p>
          <p className="text-[#24c6dc] text-sm mt-4">⏳ Demo: Auto-approving in a few seconds...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h3 className="text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#24c6dc]" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h3 className="text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#24c6dc]" />
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  placeholder="Tech Solutions Inc."
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Business Type *</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc] [&>option]:bg-gray-900 [&>option]:text-white"
                >
                  <option value="">Select type</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="llc">Limited Liability Company (LLC)</option>
                  <option value="corporation">Corporation</option>
                  <option value="nonprofit">Non-Profit</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-2">Business Address *</label>
                <input
                  type="text"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  placeholder="123 Business St, City, State, ZIP"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Business Registration Number *</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  placeholder="BR-123456789"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Tax ID / EIN *</label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-[#24c6dc]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#24c6dc]"
                  placeholder="12-3456789"
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-[#111] border border-[#24c6dc]/20 rounded-xl p-6">
            <h3 className="text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#24c6dc]" />
              Document Upload
            </h3>
            <div className="space-y-4">
              <DocumentUpload
                label="Business License"
                required
                file={documents.businessLicense}
                onChange={handleFileUpload('businessLicense')}
              />
              <DocumentUpload
                label="Tax Certificate"
                required
                file={documents.taxCertificate}
                onChange={handleFileUpload('taxCertificate')}
              />
              <DocumentUpload
                label="Proof of Ownership"
                required
                file={documents.ownershipProof}
                onChange={handleFileUpload('ownershipProof')}
              />
            </div>
            <p className="text-gray-500 text-sm mt-4">
              * Accepted formats: PDF, JPG, PNG (Max size: 5MB per file)
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/20 transition-all"
            >
              Submit for Verification
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}

function DocumentUpload({ 
  label, 
  required, 
  file, 
  onChange 
}: { 
  label: string; 
  required?: boolean;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-black border border-[#24c6dc]/20 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-white flex items-center gap-2">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {file && (
          <span className="text-green-400 text-sm flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Uploaded
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type="file"
          onChange={onChange}
          required={required}
          accept=".pdf,.jpg,.jpeg,.png"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="border-2 border-dashed border-[#24c6dc]/30 rounded-lg p-4 text-center hover:border-[#24c6dc] transition-all">
          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">
            {file ? file.name : 'Click to upload or drag and drop'}
          </p>
        </div>
      </div>
    </div>
  );
}