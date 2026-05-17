import { useState } from 'react';
import { motion } from 'motion/react';
import { Megaphone, Send, Loader2, Users, GraduationCap, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { adminAction } from '../../../lib/api';

type TargetRole = 'all' | 'student' | 'recruiter';

interface AnnouncementForm {
  title: string;
  body: string;
  target_role: TargetRole;
  expires_at: string;
}

const ROLE_OPTIONS: { value: TargetRole; label: string; icon: any; description: string }[] = [
  { value: 'all', label: 'All Users', icon: Users, description: 'Send to every user on the platform' },
  { value: 'student', label: 'Students Only', icon: GraduationCap, description: 'HUSE Circle students' },
  { value: 'recruiter', label: 'Recruiters Only', icon: Briefcase, description: 'Verified recruiters' },
];

export function AnnouncementManagement() {
  const [form, setForm] = useState<AnnouncementForm>({
    title: '',
    body: '',
    target_role: 'all',
    expires_at: '',
  });
  const [loading, setLoading] = useState(false);
  const [recentAnnouncements, setRecentAnnouncements] = useState<{ title: string; role: string; sentAt: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) {
      toast.error('Title and body are required');
      return;
    }
    setLoading(true);
    try {
      await adminAction({
        action: 'send_announcement',
        title: form.title.trim(),
        body: form.body.trim(),
        target_role: form.target_role,
        ...(form.expires_at && { expires_at: new Date(form.expires_at).toISOString() }),
      });
      toast.success('Announcement sent!');
      setRecentAnnouncements(prev => [
        { title: form.title, role: form.target_role, sentAt: new Date().toLocaleString() },
        ...prev.slice(0, 4),
      ]);
      setForm({ title: '', body: '', target_role: 'all', expires_at: '' });
    } catch (e: any) {
      toast.error('Failed to send: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full bg-black border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500/50 placeholder-gray-600 text-sm';
  const labelClass = 'block text-gray-400 text-xs mb-1 uppercase tracking-wide';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
          <Megaphone className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Send Announcement</h2>
          <p className="text-gray-400 text-sm">Broadcast platform-wide announcements to users</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={labelClass}>Announcement Title *</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Platform maintenance tonight" className={inputClass} maxLength={120} required />
                <p className="text-gray-600 text-xs mt-1">{form.title.length}/120</p>
              </div>

              <div>
                <label className={labelClass}>Message Body *</label>
                <textarea rows={5} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                  placeholder="We will be down from 2am–4am IST for scheduled maintenance..." className={inputClass + ' resize-none'} required />
              </div>

              <div>
                <label className={labelClass}>Target Audience *</label>
                <div className="grid grid-cols-3 gap-3">
                  {ROLE_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, target_role: opt.value }))}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center ${
                        form.target_role === opt.value
                          ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <opt.icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  {ROLE_OPTIONS.find(o => o.value === form.target_role)?.description}
                </p>
              </div>

              <div>
                <label className={labelClass}>Expires At (optional)</label>
                <input type="datetime-local" value={form.expires_at} onChange={e => setForm(f => ({ ...f, expires_at: e.target.value }))}
                  className={inputClass} min={new Date().toISOString().slice(0, 16)} />
                <p className="text-gray-500 text-xs mt-1">Leave blank for no expiry</p>
              </div>

              {/* Preview */}
              {(form.title || form.body) && (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                  <p className="text-amber-400 text-xs font-medium mb-2 uppercase tracking-wide">Preview</p>
                  <p className="text-white font-semibold text-sm">{form.title || '(no title)'}</p>
                  <p className="text-gray-300 text-sm mt-1 whitespace-pre-wrap">{form.body || '(no body)'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">
                      {ROLE_OPTIONS.find(o => o.value === form.target_role)?.label}
                    </span>
                    {form.expires_at && (
                      <span className="text-xs text-gray-500">
                        Expires: {new Date(form.expires_at).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Send Announcement
              </button>
            </form>
          </motion.div>
        </div>

        {/* Recent sent */}
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Send className="w-4 h-4 text-amber-400" /> Recently Sent
          </h3>
          {recentAnnouncements.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <Megaphone className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No announcements sent this session</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAnnouncements.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <p className="text-white text-sm font-medium truncate">{a.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">{a.role}</span>
                    <span className="text-xs text-gray-500">{a.sentAt}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
