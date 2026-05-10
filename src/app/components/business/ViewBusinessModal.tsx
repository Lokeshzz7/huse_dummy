import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Eye, Users, TrendingUp, Calendar, DollarSign, MapPin, Globe, Mail, Phone, CheckCircle } from 'lucide-react';

interface ViewBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: {
    id: string;
    name: string;
    category: string;
    description: string;
    status: 'active' | 'pending' | 'draft';
    views: number;
    applications: number;
    createdAt: string;
    capitalRaised?: number;
  };
}

export function ViewBusinessModal({ isOpen, onClose, business }: ViewBusinessModalProps) {
  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-500/10 text-green-500 border-green-500/30',
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
      draft: 'bg-gray-500/10 text-gray-500 border-gray-500/30',
    };
    const icons = {
      active: <CheckCircle className="w-3 h-3" />,
      pending: <Calendar className="w-3 h-3" />,
      draft: <Building2 className="w-3 h-3" />,
    };
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-3xl bg-theme-card border border-theme-accent rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-theme-card border-b border-theme-secondary p-6 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-br from-[#24c6dc]/20 to-[#05997F]/20 rounded-lg">
                      <Building2 className="w-6 h-6 text-[#24c6dc]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-theme-primary">{business.name}</h2>
                      <p className="text-sm text-theme-tertiary">{business.category}</p>
                    </div>
                  </div>
                  {getStatusBadge(business.status)}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-theme-secondary rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-theme-muted" />
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-theme-secondary/50">
                <div className="bg-theme-card border border-theme-accent rounded-xl p-4">
                  <Eye className="w-5 h-5 text-[#24c6dc] mb-2" />
                  <p className="text-2xl font-bold text-theme-primary">{business.views}</p>
                  <p className="text-xs text-theme-tertiary">Total Views</p>
                </div>
                <div className="bg-theme-card border border-theme-accent rounded-xl p-4">
                  <Users className="w-5 h-5 text-[#05997F] mb-2" />
                  <p className="text-2xl font-bold text-theme-primary">{business.applications}</p>
                  <p className="text-xs text-theme-tertiary">Applications</p>
                </div>
                <div className="bg-theme-card border border-theme-accent rounded-xl p-4">
                  <TrendingUp className="w-5 h-5 text-[#B66FDE] mb-2" />
                  <p className="text-2xl font-bold text-theme-primary">+24%</p>
                  <p className="text-xs text-theme-tertiary">Growth</p>
                </div>
                <div className="bg-theme-card border border-theme-accent rounded-xl p-4">
                  <DollarSign className="w-5 h-5 text-green-500 mb-2" />
                  <p className="text-2xl font-bold text-theme-primary">
                    ₹{business.capitalRaised ? (business.capitalRaised / 100000).toFixed(1) + 'L' : '0'}
                  </p>
                  <p className="text-xs text-theme-tertiary">Capital Raised</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#24c6dc]" />
                    About
                  </h3>
                  <p className="text-theme-tertiary leading-relaxed">
                    {business.description}
                  </p>
                </div>

                {/* Business Details */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-3">Business Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 bg-theme-secondary rounded-lg">
                      <Calendar className="w-5 h-5 text-[#24c6dc] mt-0.5" />
                      <div>
                        <p className="text-xs text-theme-muted mb-1">Created Date</p>
                        <p className="text-sm text-theme-primary font-medium">
                          {new Date(business.createdAt).toLocaleDateString('en-IN', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-theme-secondary rounded-lg">
                      <MapPin className="w-5 h-5 text-[#24c6dc] mt-0.5" />
                      <div>
                        <p className="text-xs text-theme-muted mb-1">Location</p>
                        <p className="text-sm text-theme-primary font-medium">Bangalore, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-theme-secondary rounded-lg">
                      <Globe className="w-5 h-5 text-[#24c6dc] mt-0.5" />
                      <div>
                        <p className="text-xs text-theme-muted mb-1">Website</p>
                        <p className="text-sm text-[#24c6dc] font-medium">www.example.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-theme-secondary rounded-lg">
                      <Mail className="w-5 h-5 text-[#24c6dc] mt-0.5" />
                      <div>
                        <p className="text-xs text-theme-muted mb-1">Contact Email</p>
                        <p className="text-sm text-theme-primary font-medium">contact@example.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capital Raised Section */}
                {business.capitalRaised && business.capitalRaised > 0 && (
                  <div>
                    <h3 className="font-bold text-theme-primary mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      Capital Raised Through Contributions
                    </h3>
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-3xl font-bold text-green-500">
                            ₹{business.capitalRaised.toLocaleString('en-IN')}
                          </p>
                          <p className="text-sm text-theme-tertiary">Total contributions received</p>
                        </div>
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <TrendingUp className="w-8 h-8 text-green-500" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-theme-tertiary">Target: ₹10,00,000</span>
                          <span className="text-green-500 font-semibold">
                            {((business.capitalRaised / 1000000) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-theme-secondary rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(business.capitalRaised / 1000000) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Activity */}
                <div>
                  <h3 className="font-bold text-theme-primary mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-theme-secondary rounded-lg">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-theme-primary font-medium">New application received</p>
                        <p className="text-xs text-theme-muted">Sarah Johnson applied for Senior Developer • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-theme-secondary rounded-lg">
                      <div className="w-8 h-8 bg-[#24c6dc]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Eye className="w-4 h-4 text-[#24c6dc]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-theme-primary font-medium">Profile viewed 47 times</p>
                        <p className="text-xs text-theme-muted">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-theme-card border-t border-theme-secondary p-6">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#24c6dc] to-[#05997F] text-white rounded-lg hover:shadow-lg hover:shadow-[#24c6dc]/30 transition-all font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
