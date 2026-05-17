import { useState, useEffect } from 'react';
import { adminAction, getAdminVerifications, getVerificationDocUrl } from '../../lib/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Loader2, Check, X, Eye, ShieldCheck, User, ChevronLeft, ChevronRight, Ban } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PendingUser {
  id: string;
  name: string;
  email: string;
  college: string;
  degree_program: string;
  verification_status: string;
  attempt_number?: number;
  created_at?: string;
}

interface ApproveFormState {
  joining_year_on_document: string;
  college_name_on_document: string;
  document_type: 'id_card' | 'admission_letter';
  attempt_number: 1 | 2 | 3;
}

interface RejectFormState {
  rejection_reason: string;
  document_type: 'id_card' | 'admission_letter';
  attempt_number: 1 | 2 | 3;
}

export function AdminVerificationQueue() {
  const { user, isLoading } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [approveTarget, setApproveTarget] = useState<PendingUser | null>(null);
  const [rejectTarget, setRejectTarget] = useState<PendingUser | null>(null);
  const [banTarget, setBanTarget] = useState<PendingUser | null>(null);
  const [banReason, setBanReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [isViewing, setIsViewing] = useState<string | null>(null);

  const [approveForm, setApproveForm] = useState<ApproveFormState>({
    joining_year_on_document: String(new Date().getFullYear() - 1),
    college_name_on_document: '',
    document_type: 'id_card',
    attempt_number: 1,
  });

  const [rejectForm, setRejectForm] = useState<RejectFormState>({
    rejection_reason: '',
    document_type: 'id_card',
    attempt_number: 1,
  });

  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  const fetchPending = async (p = 1) => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const data = await getAdminVerifications(p, 20) as any;
      const users: PendingUser[] = Array.isArray(data) ? data : data?.users || data?.items || [];
      if (p === 1) {
        setPendingUsers(users);
      } else {
        setPendingUsers(prev => [...prev, ...users]);
      }
      setHasMore(users.length === 20);
    } catch (e: any) {
      toast.error('Failed to fetch queue: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) fetchPending(1);
  }, [isLoading, user]);

  const viewDocument = async (userId: string) => {
    setIsViewing(userId);
    try {
      const data = await getVerificationDocUrl(userId);
      if (!data?.url) throw new Error('No document URL returned');
      window.open(data.url, '_blank');
    } catch (e: any) {
      toast.error('Could not load document: ' + e.message);
    } finally {
      setIsViewing(null);
    }
  };

  const openApproveModal = (u: PendingUser) => {
    setApproveForm({
      joining_year_on_document: String(new Date().getFullYear() - 1),
      college_name_on_document: (typeof u.college === 'object' ? (u.college as any)?.name : u.college) || '',
      document_type: 'id_card',
      attempt_number: (u.attempt_number as 1 | 2 | 3) || 1,
    });
    setApproveTarget(u);
  };

  const openRejectModal = (u: PendingUser) => {
    setRejectForm({
      rejection_reason: '',
      document_type: 'id_card',
      attempt_number: (u.attempt_number as 1 | 2 | 3) || 1,
    });
    setRejectTarget(u);
  };

  const handleApprove = async () => {
    if (!approveTarget) return;
    if (!approveForm.college_name_on_document.trim()) {
      toast.error('College name on document is required');
      return;
    }
    setActionLoading(true);
    try {
      await adminAction({
        action: 'approve_user',
        user_id: approveTarget.id,
        joining_year_on_document: Number(approveForm.joining_year_on_document),
        college_name_on_document: approveForm.college_name_on_document.trim(),
        document_type: approveForm.document_type,
        attempt_number: approveForm.attempt_number,
      });
      toast.success(`${approveTarget.name} approved!`);
      setPendingUsers(prev => prev.filter(u => u.id !== approveTarget.id));
      setApproveTarget(null);
    } catch (e: any) {
      toast.error('Approval failed: ' + e.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectTarget) return;
    if (rejectForm.rejection_reason.trim().length < 10) {
      toast.error('Rejection reason must be at least 10 characters');
      return;
    }
    setActionLoading(true);
    try {
      const result = await adminAction<{ rejected: boolean; new_status: string }>({
        action: 'reject_user',
        user_id: rejectTarget.id,
        rejection_reason: rejectForm.rejection_reason.trim(),
        document_type: rejectForm.document_type,
        attempt_number: rejectForm.attempt_number,
      });
      const isPermanent = result.new_status === 'rejected';
      toast.success(`${rejectTarget.name} rejected.${isPermanent ? ' (Permanent — 3rd attempt)' : ' Student may re-upload.'}`);
      setPendingUsers(prev => prev.filter(u => u.id !== rejectTarget.id));
      setRejectTarget(null);
    } catch (e: any) {
      toast.error('Rejection failed: ' + e.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBan = async () => {
    if (!banTarget) return;
    setActionLoading(true);
    try {
      await adminAction({
        action: 'ban_user',
        user_id: banTarget.id,
        reason: banReason.trim() || undefined,
      });
      toast.success(`${banTarget.name} has been banned.`);
      setPendingUsers(prev => prev.filter(u => u.id !== banTarget.id));
      setBanTarget(null);
      setBanReason('');
    } catch (e: any) {
      toast.error('Ban failed: ' + e.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center p-20 text-white">
        <Loader2 className="animate-spin w-8 h-8 text-purple-500" />
      </div>
    );
  }

  if (!isAdmin) {
    return <div className="flex items-center justify-center p-20 text-white">Access Denied. Admins Only.</div>;
  }

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 8 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Student Verification Queue</h2>
            <p className="text-gray-400">Review pending KYC documents and approve or reject students</p>
          </div>
        </div>
        <button
          onClick={() => fetchPending(1)}
          className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-sm"
        >
          Refresh
        </button>
      </div>

      {pendingUsers.length === 0 ? (
        <div className="text-center py-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
          <User className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h2 className="text-xl font-bold text-white">No Pending Verifications</h2>
          <p className="text-gray-500">The queue is currently empty.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {pendingUsers.map(u => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/20 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white">{u.name}</h3>
                  <p className="text-purple-400 text-sm mb-1">{u.email}</p>
                  <p className="text-gray-400 text-sm">
                    {typeof u.college === 'object' ? (u.college as any)?.name : u.college} • {typeof u.degree_program === 'object' ? (u.degree_program as any)?.name : u.degree_program}
                  </p>
                  {u.created_at && (
                    <p className="text-gray-500 text-xs mt-2">Applied: {new Date(u.created_at).toLocaleDateString()}</p>
                  )}
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${
                    u.verification_status === 'pending_verification'
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {u.verification_status} {u.attempt_number ? `• Attempt ${u.attempt_number}/3` : ''}
                  </span>
                </div>

                <div className="flex gap-2 w-full md:w-auto flex-wrap">
                  <button
                    onClick={() => viewDocument(u.id)}
                    disabled={isViewing === u.id}
                    className="flex-1 md:flex-none px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/10 flex items-center justify-center gap-2 text-sm"
                  >
                    {isViewing === u.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye size={14} />}
                    View Doc
                  </button>
                  <button
                    onClick={() => openRejectModal(u)}
                    className="flex-1 md:flex-none px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30 flex items-center justify-center gap-2 text-sm"
                  >
                    <X size={14} /> Reject
                  </button>
                  <button
                    onClick={() => openApproveModal(u)}
                    className="flex-1 md:flex-none px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors border border-green-500/30 flex items-center justify-center gap-2 text-sm"
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    onClick={() => { setBanTarget(u); setBanReason(''); }}
                    className="px-3 py-2 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-colors border border-orange-500/20 flex items-center justify-center text-sm"
                    title="Ban user"
                  >
                    <Ban size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => { const next = page + 1; setPage(next); fetchPending(next); }}
                className="px-6 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {/* Approve Modal */}
      <AnimatePresence>
        {approveTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !actionLoading && setApproveTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#111] border border-green-500/30 rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-white mb-1">Approve Student</h3>
              <p className="text-gray-400 text-sm mb-6">
                Approving <span className="text-white font-medium">{approveTarget.name}</span> — fill in details from the document.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Document Type</label>
                  <select
                    value={approveForm.document_type}
                    onChange={e => setApproveForm(f => ({ ...f, document_type: e.target.value as any }))}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500/50"
                  >
                    <option value="id_card">College ID Card</option>
                    <option value="admission_letter">Admission Letter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Attempt Number</label>
                  <select
                    value={approveForm.attempt_number}
                    onChange={e => setApproveForm(f => ({ ...f, attempt_number: Number(e.target.value) as any }))}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500/50"
                  >
                    <option value={1}>1st attempt</option>
                    <option value={2}>2nd attempt</option>
                    <option value={3}>3rd attempt</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Joining Year (on document)</label>
                  <select
                    value={approveForm.joining_year_on_document}
                    onChange={e => setApproveForm(f => ({ ...f, joining_year_on_document: e.target.value }))}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500/50"
                  >
                    {yearOptions.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">College Name (on document)</label>
                  <input
                    type="text"
                    value={approveForm.college_name_on_document}
                    onChange={e => setApproveForm(f => ({ ...f, college_name_on_document: e.target.value }))}
                    placeholder="Exact college name as shown on document"
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500/50 placeholder-gray-600"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setApproveTarget(null)}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors border border-green-500/30 flex items-center justify-center gap-2"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check size={16} />}
                  Confirm Approve
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        {rejectTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !actionLoading && setRejectTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#111] border border-red-500/30 rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-white mb-1">Reject Document</h3>
              <p className="text-gray-400 text-sm mb-6">
                Rejecting <span className="text-white font-medium">{rejectTarget.name}</span>'s verification.
                After 3 rejections the account is permanently rejected.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Document Type</label>
                  <select
                    value={rejectForm.document_type}
                    onChange={e => setRejectForm(f => ({ ...f, document_type: e.target.value as any }))}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500/50"
                  >
                    <option value="id_card">College ID Card</option>
                    <option value="admission_letter">Admission Letter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Attempt Number</label>
                  <select
                    value={rejectForm.attempt_number}
                    onChange={e => setRejectForm(f => ({ ...f, attempt_number: Number(e.target.value) as any }))}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500/50"
                  >
                    <option value={1}>1st attempt</option>
                    <option value={2}>2nd attempt</option>
                    <option value={3}>3rd attempt (permanent rejection)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Rejection Reason <span className="text-gray-500">(min 10 chars)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={rejectForm.rejection_reason}
                    onChange={e => setRejectForm(f => ({ ...f, rejection_reason: e.target.value }))}
                    placeholder="e.g. Document is blurry and unreadable, name doesn't match..."
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500/50 placeholder-gray-600 resize-none"
                  />
                  <p className={`text-xs mt-1 ${rejectForm.rejection_reason.length < 10 ? 'text-red-400' : 'text-gray-500'}`}>
                    {rejectForm.rejection_reason.length}/10 minimum
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setRejectTarget(null)}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading || rejectForm.rejection_reason.length < 10}
                  className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <X size={16} />}
                  Confirm Reject
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ban Modal */}
      <AnimatePresence>
        {banTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !actionLoading && setBanTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#111] border border-orange-500/30 rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-white mb-1">Ban User</h3>
              <p className="text-gray-400 text-sm mb-6">
                Ban <span className="text-white font-medium">{banTarget.name}</span> from the platform.
              </p>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Reason (optional)</label>
                <input
                  type="text"
                  value={banReason}
                  onChange={e => setBanReason(e.target.value)}
                  placeholder="e.g. Spam, abuse, policy violation..."
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500/50 placeholder-gray-600"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setBanTarget(null)}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBan}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors border border-orange-500/30 flex items-center justify-center gap-2"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ban size={16} />}
                  Ban User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
