import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft, DollarSign, Clock, FileText, Send, Calendar,
  Paperclip, CheckCircle, User, Building2
} from 'lucide-react';
import { toast } from 'sonner';

export function SubmitQuotePage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    price: '',
    timeline: '',
    proposal: '',
    experience: '',
    portfolio: '',
    attachments: null as File[] | null
  });

  // Mock request data
  const request = {
    id: requestId,
    title: 'E-commerce Website Development',
    category: 'Web Development',
    description: 'Need a full-stack e-commerce platform with payment integration, user authentication, product catalog, and admin dashboard.',
    budget: '$5,000 - $10,000',
    timeline: '2-3 months',
    requirements: ['React/Next.js', 'Payment Gateway', 'Admin Panel', 'Responsive Design']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast.success('Quote submitted successfully!');
      setIsSubmitting(false);
      navigate('/admin/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Request Summary */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">{request.title}</h2>
              <p className="text-gray-400 text-sm mb-3">{request.description}</p>
              <div className="flex flex-wrap gap-2">
                {request.requirements.map((req, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-gray-300"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-gray-400">Budget:</span>
              <span className="text-white font-medium">{request.budget}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-gray-400">Timeline:</span>
              <span className="text-white font-medium">{request.timeline}</span>
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Submit Your Quote</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pricing & Timeline */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Your Price <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#111] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
                    placeholder="e.g., $7,500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Client budget: {request.budget}</p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Estimated Timeline <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#111] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
                    placeholder="e.g., 2.5 months"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Client timeline: {request.timeline}</p>
              </div>
            </div>

            {/* Proposal */}
            <div>
              <label className="block text-white font-medium mb-2">
                Your Proposal <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                value={formData.proposal}
                onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-[#111] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all resize-none"
                placeholder="Describe your approach, methodology, and why you're the best fit for this project..."
              />
              <p className="text-xs text-gray-500 mt-1">Be specific about how you'll meet the requirements</p>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-white font-medium mb-2">
                Relevant Experience <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-[#111] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all resize-none"
                placeholder="List similar projects you've completed, your expertise, and team size..."
              />
            </div>

            {/* Portfolio Links */}
            <div>
              <label className="block text-white font-medium mb-2">
                Portfolio / Previous Work
              </label>
              <textarea
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-[#111] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all resize-none"
                placeholder="Add links to your portfolio, case studies, or relevant work samples..."
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-white font-medium mb-2">
                Attachments (Optional)
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-all cursor-pointer">
                <Paperclip className="text-gray-500 mx-auto mb-2" size={24} />
                <p className="text-gray-400 text-sm mb-1">
                  Attach proposals, portfolio PDFs, or relevant documents
                </p>
                <p className="text-gray-600 text-xs">
                  PDF, DOC, Images (Max 10MB)
                </p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFormData({ ...formData, attachments: e.target.files ? Array.from(e.target.files) : null })}
                  className="hidden"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Quote
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
          <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Tips for a Winning Quote
          </h4>
          <ul className="text-sm text-gray-400 space-y-1 ml-6 list-disc">
            <li>Be specific about your approach and deliverables</li>
            <li>Highlight relevant experience and past projects</li>
            <li>Provide a realistic timeline with milestones</li>
            <li>Include links to your portfolio or case studies</li>
            <li>Respond promptly to client questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}