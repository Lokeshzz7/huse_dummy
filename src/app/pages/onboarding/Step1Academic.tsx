import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { apiGet } from '../../../lib/api';
import { toast } from 'sonner';
import { ArrowRight, Loader2, X, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
}

interface DegreeProgram {
  id: string;
  name: string;
  category: string;
  duration_years: number;
}

export function Step1Academic({ onNext }: { onNext: () => void }) {
  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState<College[]>([]);
  const [programs, setPrograms] = useState<DegreeProgram[]>([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [collegeInput, setCollegeInput] = useState(user?.college_name || '');
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const collegeRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    dob: (user as any)?.dob || '',
    mobile: user?.mobile ? user.mobile.replace('+91', '') : '',
    ug_pg: (user as any)?.ug_pg || 'UG',
    department: user?.department || '',
    college_id: user?.college_id || '',
    college_name: user?.college_name || '',
    degree_program_id: (user as any)?.degree_program_id || '',
    current_year_of_study: user?.current_year_of_study || 1,
    joining_year: (user as any)?.joining_year || currentYear,
    resume_url: user?.resume_url || '',
  });

  useEffect(() => {
    async function loadData() {
      setFetchError(false);
      try {
        const [degreesData, collegesData] = await Promise.all([
          apiGet<DegreeProgram[]>('/reference/degrees'),
          apiGet<College[]>('/reference/colleges'),
        ]);
        setPrograms(degreesData);
        setColleges(collegesData);
      } catch (e: any) {
        setFetchError(true);
        toast.error('Could not load college/degree options. Please refresh.');
      } finally {
        setFetchingData(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (collegeRef.current && !collegeRef.current.contains(e.target as Node)) {
        setShowCollegeDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredColleges = (collegeInput && !formData.college_id)
    ? colleges.filter(c =>
        c.name.toLowerCase().includes(collegeInput.toLowerCase()) ||
        c.city?.toLowerCase().includes(collegeInput.toLowerCase())
      )
    : colleges;

  const handleCollegeSelect = (c: College) => {
    setFormData(prev => ({ ...prev, college_id: c.id, college_name: c.name }));
    setCollegeInput(c.name);
    setShowCollegeDropdown(false);
  };

  const clearCollege = () => {
    setFormData(prev => ({ ...prev, college_id: '', college_name: '' }));
    setCollegeInput('');
    setShowCollegeDropdown(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'current_year_of_study') {
        updated.joining_year = currentYear - (Number(value) - 1);
      }
      if (name === 'ug_pg') {
        updated.degree_program_id = '';
      }
      return updated;
    });
  };

  const filteredPrograms = programs.filter(p => p.category === formData.ug_pg);
  const selectedProgram = programs.find(p => p.id === formData.degree_program_id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    if (!formData.college_id) {
      toast.error('Please select your college from the list');
      return;
    }
    if (!selectedProgram) {
      toast.error('Please select a degree program');
      return;
    }

    setLoading(true);
    try {
      const mobile = formData.mobile ? `+91${formData.mobile.replace(/\D/g, '')}` : null;

      const { error } = await supabase
        .from('users')
        .update({
          name: formData.name,
          ug_pg: formData.ug_pg,
          college_name: formData.college_name,
          college_id: formData.college_id,
          department: formData.department,
          current_year_of_study: Number(formData.current_year_of_study),
          mobile,
        })
        .eq('id', user.id);

      if (error) throw error;

      updateUser({
        name: formData.name,
        ug_pg: formData.ug_pg as 'UG' | 'PG',
        college_name: formData.college_name,
        college_id: formData.college_id,
        degree_program_id: formData.degree_program_id,
        department: formData.department,
        current_year_of_study: Number(formData.current_year_of_study),
        joining_year: Number(formData.joining_year),
        dob: formData.dob,
        mobile,
        onboarding_step: 'verify_phone',
      });

      onNext();
    } catch (e: any) {
      toast.error(e.message || 'Failed to save academic details');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-purple-500" />
        <p>Loading college &amp; degree options...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-white font-semibold">Failed to load options</p>
        <p className="text-gray-400 text-sm">Could not fetch colleges and degree programs.</p>
        <button
          onClick={() => { setFetchingData(true); setFetchError(false); }}
          className="px-5 py-2 bg-purple-500/20 border border-purple-500/40 text-purple-400 rounded-xl text-sm hover:bg-purple-500/30 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-[28px] font-bold text-white mb-2">Academic Profile</h2>
        <p className="text-gray-400">Tell us about your educational background.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* SECTION 1: Identity & Timing */}
        <div className="p-6 bg-[#1A1A1A]/30 border border-white/5 rounded-2xl space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Full Name</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Date of Birth</label>
              <input
                required
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Joining Year</label>
              <select
                name="joining_year"
                value={formData.joining_year}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
              >
                {Array.from({ length: 7 }, (_, i) => currentYear - 6 + i).map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: Institution Details */}
        <div className="p-6 bg-[#1A1A1A]/30 border border-white/5 rounded-2xl space-y-5">

          {/* College combobox */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-pink-400 uppercase tracking-wider">College / Institution</label>
            <div ref={collegeRef} className="relative">
              <div className={`flex items-center bg-[#1A1A1A] border ${formData.college_id ? 'border-purple-500/60' : 'border-gray-800'} rounded-xl focus-within:border-purple-500 transition-colors`}>
                <input
                  type="text"
                  value={collegeInput}
                  onChange={(e) => {
                    setCollegeInput(e.target.value);
                    if (formData.college_id) {
                      setFormData(prev => ({ ...prev, college_id: '', college_name: '' }));
                    }
                    setShowCollegeDropdown(true);
                  }}
                  onFocus={() => setShowCollegeDropdown(true)}
                  placeholder={
                    colleges.length === 0
                      ? 'No colleges available — admin must add them first'
                      : 'Type to search your college...'
                  }
                  disabled={colleges.length === 0}
                  className="flex-1 bg-transparent px-4 py-3 text-white focus:outline-none text-sm placeholder-gray-600 disabled:cursor-not-allowed"
                />
                {formData.college_id ? (
                  <button
                    type="button"
                    onClick={clearCollege}
                    className="px-3 py-3 text-gray-500 hover:text-white transition-colors"
                    title="Clear selection"
                  >
                    <X size={14} />
                  </button>
                ) : (
                  <ChevronDown size={14} className="mr-3 text-gray-500 flex-shrink-0" />
                )}
              </div>

              {showCollegeDropdown && colleges.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-[#161616] border border-gray-700 rounded-xl shadow-2xl max-h-52 overflow-y-auto">
                  {filteredColleges.length === 0 ? (
                    <p className="px-4 py-3 text-gray-500 text-sm text-center">
                      No match — try a different name or city
                    </p>
                  ) : (
                    filteredColleges.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onMouseDown={() => handleCollegeSelect(c)}
                        className="w-full px-4 py-2.5 text-left hover:bg-purple-500/15 transition-colors flex items-center justify-between gap-4 border-b border-white/5 last:border-0"
                      >
                        <span className="text-white text-sm font-medium truncate">{c.name}</span>
                        <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">{c.city}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {formData.college_id && (
              <div className="flex items-center gap-1.5 text-xs text-green-400 mt-1">
                <CheckCircle2 size={11} />
                {formData.college_name} selected
              </div>
            )}

            {colleges.length === 0 && (
              <p className="text-xs text-amber-400 flex items-center gap-1.5 mt-1">
                <AlertCircle size={11} />
                Your institution is not listed yet. Contact support or wait for admin to add it.
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-pink-400 uppercase tracking-wider">Level</label>
              <select
                name="ug_pg"
                value={formData.ug_pg}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
              >
                <option value="UG">Undergraduate (UG)</option>
                <option value="PG">Postgraduate (PG)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-pink-400 uppercase tracking-wider">Degree Program</label>
              <select
                required
                name="degree_program_id"
                value={formData.degree_program_id}
                onChange={handleChange}
                disabled={filteredPrograms.length === 0}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled>
                  {filteredPrograms.length === 0 ? 'No programs available for this level' : 'Select program'}
                </option>
                {filteredPrograms.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.duration_years}yr)
                  </option>
                ))}
              </select>
              {filteredPrograms.length === 0 && programs.length > 0 && (
                <p className="text-xs text-amber-400 flex items-center gap-1.5">
                  <AlertCircle size={11} />
                  No {formData.ug_pg} programs added yet. Switch level or contact support.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: Current Status & Contact */}
        <div className="p-6 bg-[#1A1A1A]/30 border border-white/5 rounded-2xl space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Department</label>
              <input
                required
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Computer Science"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Year of Study</label>
              <select
                name="current_year_of_study"
                value={formData.current_year_of_study}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
              >
                {Array.from({ length: selectedProgram?.duration_years || 4 }, (_, i) => i + 1).map(yr => (
                  <option key={yr} value={yr}>Year {yr}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Mobile (Optional)</label>
              <div className={`flex bg-[#1A1A1A] border ${mobileError ? 'border-red-500' : 'border-gray-800'} rounded-xl overflow-hidden focus-within:border-purple-500 transition-colors`}>
                <span className="px-3 py-3 bg-[#222] text-gray-500 border-r border-gray-800 text-sm font-medium">+91</span>
                <input
                  type="tel"
                  name="mobile"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) => {
                    setMobileError(false);
                    setFormData(prev => ({ ...prev, mobile: e.target.value.replace(/\D/g, '') }));
                  }}
                  className="w-full bg-transparent px-4 py-3 text-white focus:outline-none"
                  placeholder="9876543210"
                />
              </div>
              {mobileError && <p className="text-red-500 text-xs mt-1">Number already in use.</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Resume (Optional)</label>
              <input
                type="url"
                name="resume_url"
                value={formData.resume_url}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="https://drive..."
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Continue <ArrowRight className="w-5 h-5" /></>}
        </button>
      </form>
    </motion.div>
  );
}
