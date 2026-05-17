import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Building2, Globe, Plus, GraduationCap, Loader2,
  Copy, Check, ChevronDown, X, RefreshCw, BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';
import { adminAction, apiGet } from '../../../lib/api';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  website_url?: string;
}

interface DegreeProgram {
  id: string;
  name: string;
  category: string;
  duration_years: number;
}

type Section = 'college' | 'domain' | 'degree';

export function CollegeManagement() {
  const [section, setSection] = useState<Section>('college');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [colleges, setColleges] = useState<College[]>([]);
  const [degrees, setDegrees] = useState<DegreeProgram[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // College form
  const [collegeForm, setCollegeForm] = useState({
    name: '', city: '', state: '', website_url: '', logo_url: '',
  });

  // Domain form — college selected via combobox, id auto-mapped
  const [domainCollegeInput, setDomainCollegeInput] = useState('');
  const [domainSelectedId, setDomainSelectedId] = useState('');
  const [domainSelectedName, setDomainSelectedName] = useState('');
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [domainValue, setDomainValue] = useState('');
  const domainComboRef = useRef<HTMLDivElement>(null);

  // Degree form
  const [degreeForm, setDegreeForm] = useState<{
    name: string; category: 'UG' | 'PG'; duration_years: number;
  }>({ name: '', category: 'UG', duration_years: 4 });

  // ─── Data loading ────────────────────────────────────────────────────────────

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [collegesData, degreesData] = await Promise.all([
        apiGet<College[]>('/reference/colleges'),
        apiGet<DegreeProgram[]>('/reference/degrees'),
      ]);
      setColleges(collegesData);
      setDegrees(degreesData);
    } catch {
      // keep existing lists on failure
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Close domain combobox on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (domainComboRef.current && !domainComboRef.current.contains(e.target as Node)) {
        setShowDomainDropdown(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ─── Domain combobox helpers ─────────────────────────────────────────────────

  const filteredForDomain = domainCollegeInput
    ? colleges.filter(c =>
        c.name.toLowerCase().includes(domainCollegeInput.toLowerCase()) ||
        c.city?.toLowerCase().includes(domainCollegeInput.toLowerCase())
      )
    : colleges;

  const selectDomainCollege = (c: College) => {
    setDomainSelectedId(c.id);
    setDomainSelectedName(c.name);
    setDomainCollegeInput('');
    setShowDomainDropdown(false);
  };

  const clearDomainCollege = () => {
    setDomainSelectedId('');
    setDomainSelectedName('');
    setDomainCollegeInput('');
    setShowDomainDropdown(true);
  };

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleAddCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeForm.name.trim() || !collegeForm.city.trim() || !collegeForm.state.trim()) {
      toast.error('Name, city and state are required');
      return;
    }
    setLoading(true);
    try {
      const result = await adminAction<{ college_id: string }>({
        action: 'add_college',
        name: collegeForm.name.trim(),
        city: collegeForm.city.trim(),
        state: collegeForm.state.trim(),
        ...(collegeForm.website_url && { website_url: collegeForm.website_url.trim() }),
        ...(collegeForm.logo_url && { logo_url: collegeForm.logo_url.trim() }),
      });

      const added: College = {
        id: result.college_id,
        name: collegeForm.name.trim(),
        city: collegeForm.city.trim(),
        state: collegeForm.state.trim(),
        website_url: collegeForm.website_url.trim() || undefined,
      };
      setColleges(prev => [...prev, added]);

      // Pre-select in domain tab so admin can immediately link a domain
      setDomainSelectedId(result.college_id);
      setDomainSelectedName(collegeForm.name.trim());

      toast.success(`"${added.name}" added. Switch to Domain tab to link an email domain.`);
      setCollegeForm({ name: '', city: '', state: '', website_url: '', logo_url: '' });
    } catch (e: any) {
      toast.error('Failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainSelectedId || !domainValue.trim()) {
      toast.error('Please select a college and enter a domain');
      return;
    }
    setLoading(true);
    try {
      await adminAction({
        action: 'add_college_domain',
        college_id: domainSelectedId,
        domain: domainValue.trim().toLowerCase(),
      });
      toast.success(`@${domainValue.trim().toLowerCase()} linked to ${domainSelectedName}`);
      setDomainValue('');
      setDomainSelectedId('');
      setDomainSelectedName('');
    } catch (e: any) {
      toast.error('Failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDegree = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!degreeForm.name.trim()) {
      toast.error('Degree name is required');
      return;
    }
    setLoading(true);
    try {
      const result = await adminAction<{ degree_id: string }>({
        action: 'add_degree',
        name: degreeForm.name.trim(),
        category: degreeForm.category,
        duration_years: degreeForm.duration_years,
      });
      setDegrees(prev => [...prev, {
        id: result.degree_id,
        name: degreeForm.name.trim(),
        category: degreeForm.category,
        duration_years: degreeForm.duration_years,
      }]);
      toast.success(`"${degreeForm.name.trim()}" added.`);
      setDegreeForm({ name: '', category: 'UG', duration_years: 4 });
    } catch (e: any) {
      toast.error('Failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Styles ──────────────────────────────────────────────────────────────────

  const inputClass = 'w-full bg-black border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 placeholder-gray-600 text-sm';
  const labelClass = 'block text-gray-400 text-xs mb-1.5 uppercase tracking-wide font-medium';

  const tabs: { id: Section; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'college', label: 'Colleges', icon: Building2, count: colleges.length },
    { id: 'domain', label: 'Add Domain', icon: Globe },
    { id: 'degree', label: 'Degrees', icon: GraduationCap, count: degrees.length },
  ];

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">College Management</h2>
            <p className="text-gray-400 text-sm">Add colleges, email domains, and degree programs</p>
          </div>
        </div>
        <button
          onClick={fetchData}
          disabled={loadingData}
          className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 text-sm transition-colors disabled:opacity-40"
        >
          <RefreshCw size={13} className={loadingData ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setSection(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
              section === t.id
                ? 'text-purple-400 bg-purple-500/10 border border-purple-500/30 border-b-transparent -mb-px'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
            {t.count !== undefined && (
              <span className={`px-1.5 py-0.5 rounded text-xs ${
                section === t.id ? 'bg-purple-500/20 text-purple-300' : 'bg-white/10 text-gray-500'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <motion.div key={section} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        {/* ══════════════════════════ COLLEGES TAB ══════════════════════════ */}
        {section === 'college' && (
          <>
            {/* Add form */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl">
              <form onSubmit={handleAddCollege} className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Plus className="w-4 h-4 text-purple-400" /> Add New College
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className={labelClass}>College Name *</label>
                    <input type="text" value={collegeForm.name}
                      onChange={e => setCollegeForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Anna University" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>City *</label>
                    <input type="text" value={collegeForm.city}
                      onChange={e => setCollegeForm(f => ({ ...f, city: e.target.value }))}
                      placeholder="Chennai" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>State *</label>
                    <input type="text" value={collegeForm.state}
                      onChange={e => setCollegeForm(f => ({ ...f, state: e.target.value }))}
                      placeholder="Tamil Nadu" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Website URL (optional)</label>
                    <input type="url" value={collegeForm.website_url}
                      onChange={e => setCollegeForm(f => ({ ...f, website_url: e.target.value }))}
                      placeholder="https://annauniv.edu" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Logo URL (optional)</label>
                    <input type="url" value={collegeForm.logo_url}
                      onChange={e => setCollegeForm(f => ({ ...f, logo_url: e.target.value }))}
                      placeholder="https://..." className={inputClass} />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add College
                </button>
              </form>
            </div>

            {/* College list */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <Building2 size={14} className="text-gray-400" />
                All Added Colleges
                <span className="text-gray-500 font-normal">({colleges.length})</span>
              </h3>

              {loadingData ? (
                <div className="flex items-center gap-2 text-gray-500 text-sm py-6">
                  <Loader2 size={14} className="animate-spin" /> Loading...
                </div>
              ) : colleges.length === 0 ? (
                <p className="text-gray-500 text-sm py-6">No colleges added yet. Use the form above to add the first one.</p>
              ) : (
                <div className="space-y-2">
                  {colleges.map(c => (
                    <div key={c.id}
                      className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 gap-4 hover:border-white/20 transition-colors">
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium text-sm">{c.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{c.city}, {c.state}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <code className="text-gray-600 text-xs font-mono hidden md:block select-all">
                          {c.id.slice(0, 8)}…
                        </code>
                        <button
                          type="button"
                          onClick={() => copyId(c.id)}
                          title={c.id}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {copiedId === c.id
                            ? <><Check size={11} className="text-green-400" /> Copied</>
                            : <><Copy size={11} /> Copy ID</>
                          }
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ══════════════════════════ DOMAIN TAB ══════════════════════════ */}
        {section === 'domain' && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl">
            <form onSubmit={handleAddDomain} className="space-y-5">
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-purple-400" /> Link Email Domain
                </h3>
                <p className="text-gray-400 text-sm">
                  Students whose email matches this domain will be linked to the college automatically.
                </p>
              </div>

              {/* College combobox */}
              <div>
                <label className={labelClass}>College *</label>
                <div ref={domainComboRef} className="relative">
                  <div className={`flex items-center bg-black border ${domainSelectedId ? 'border-purple-500/50' : 'border-white/20'} rounded-lg focus-within:border-purple-500/50 transition-colors`}>
                    <input
                      type="text"
                      value={domainSelectedId ? domainSelectedName : domainCollegeInput}
                      onChange={(e) => {
                        if (domainSelectedId) {
                          // Typing after selection clears it and starts a new search
                          setDomainSelectedId('');
                          setDomainSelectedName('');
                        }
                        setDomainCollegeInput(e.target.value);
                        setShowDomainDropdown(true);
                      }}
                      onFocus={() => !domainSelectedId && setShowDomainDropdown(true)}
                      placeholder={
                        colleges.length === 0
                          ? 'No colleges yet — add one in the Colleges tab'
                          : 'Search college by name or city...'
                      }
                      disabled={colleges.length === 0}
                      className="flex-1 bg-transparent px-4 py-2.5 text-white text-sm focus:outline-none placeholder-gray-600 disabled:cursor-not-allowed"
                    />
                    {domainSelectedId ? (
                      <button type="button" onClick={clearDomainCollege}
                        className="px-3 text-gray-500 hover:text-white transition-colors">
                        <X size={13} />
                      </button>
                    ) : (
                      <ChevronDown size={13} className="mr-3 text-gray-600 flex-shrink-0" />
                    )}
                  </div>

                  {showDomainDropdown && colleges.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-[#111] border border-white/15 rounded-xl shadow-2xl max-h-56 overflow-y-auto">
                      {filteredForDomain.length === 0 ? (
                        <p className="px-4 py-3 text-gray-500 text-sm text-center">No match found</p>
                      ) : (
                        filteredForDomain.map(c => (
                          <button
                            key={c.id}
                            type="button"
                            onMouseDown={() => selectDomainCollege(c)}
                            className="w-full px-4 py-2.5 text-left hover:bg-purple-500/15 transition-colors flex items-center justify-between gap-4 border-b border-white/5 last:border-0"
                          >
                            <span className="text-white text-sm font-medium">{c.name}</span>
                            <span className="text-gray-500 text-xs flex-shrink-0">{c.city}</span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                {domainSelectedId && (
                  <p className="text-xs text-green-400 mt-1.5 flex items-center gap-1">
                    <Check size={11} /> {domainSelectedName}
                    <span className="text-gray-600 font-mono ml-1">({domainSelectedId.slice(0, 8)}…)</span>
                  </p>
                )}
              </div>

              {/* Domain input */}
              <div>
                <label className={labelClass}>Email Domain *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm select-none">@</span>
                  <input
                    type="text"
                    value={domainValue}
                    onChange={e => setDomainValue(e.target.value)}
                    placeholder="annauniv.edu"
                    className={inputClass + ' pl-8'}
                    required
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1">Without the @ symbol — e.g. <code className="text-gray-400">annauniv.edu</code></p>
              </div>

              <button
                type="submit"
                disabled={loading || !domainSelectedId}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                Link Domain
              </button>
            </form>
          </div>
        )}

        {/* ══════════════════════════ DEGREE TAB ══════════════════════════ */}
        {section === 'degree' && (
          <>
            {/* Add form */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl">
              <form onSubmit={handleAddDegree} className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Plus className="w-4 h-4 text-purple-400" /> Add Degree Program
                </h3>
                <div>
                  <label className={labelClass}>Degree Name *</label>
                  <input type="text" value={degreeForm.name}
                    onChange={e => setDegreeForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. B.Tech / B.E." className={inputClass} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Category *</label>
                    <select value={degreeForm.category}
                      onChange={e => setDegreeForm(f => ({ ...f, category: e.target.value as 'UG' | 'PG' }))}
                      className={inputClass}>
                      <option value="UG">UG — Undergraduate</option>
                      <option value="PG">PG — Postgraduate</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Duration (years) *</label>
                    <select value={degreeForm.duration_years}
                      onChange={e => setDegreeForm(f => ({ ...f, duration_years: Number(e.target.value) }))}
                      className={inputClass}>
                      {[1,2,3,4,5,6,7,8,9,10].map(y => (
                        <option key={y} value={y}>{y} year{y > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-xs text-gray-500 space-y-0.5">
                  <p className="font-medium text-gray-400 mb-1">Common mappings:</p>
                  <p>B.Sc / B.Com / BA / BBA / BCA → 3 yrs UG</p>
                  <p>B.Tech / B.E. → 4 yrs UG</p>
                  <p>Integrated M.Tech / BA LLB / BBA LLB → 5 yrs UG</p>
                  <p>MBBS → 6 yrs UG</p>
                  <p>M.Sc / M.Com / MA / MBA / MCA / M.Tech / M.E. → 2 yrs PG</p>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GraduationCap className="w-4 h-4" />}
                  Add Degree Program
                </button>
              </form>
            </div>

            {/* Degree list */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <BookOpen size={14} className="text-gray-400" />
                All Added Degree Programs
                <span className="text-gray-500 font-normal">({degrees.length})</span>
              </h3>

              {loadingData ? (
                <div className="flex items-center gap-2 text-gray-500 text-sm py-6">
                  <Loader2 size={14} className="animate-spin" /> Loading...
                </div>
              ) : degrees.length === 0 ? (
                <p className="text-gray-500 text-sm py-6">No degree programs added yet.</p>
              ) : (
                <>
                  {/* UG group */}
                  {['UG', 'PG'].map(cat => {
                    const group = degrees.filter(d => d.category === cat);
                    if (group.length === 0) return null;
                    return (
                      <div key={cat} className="mb-5">
                        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${cat === 'UG' ? 'text-blue-400' : 'text-purple-400'}`}>
                          {cat === 'UG' ? 'Undergraduate (UG)' : 'Postgraduate (PG)'}
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {group.map(d => (
                            <div key={d.id}
                              className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 hover:border-white/20 transition-colors gap-3">
                              <div className="min-w-0">
                                <p className="text-white text-sm font-medium truncate">{d.name}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{d.duration_years} yr</p>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-xs font-bold flex-shrink-0 ${
                                cat === 'UG' ? 'bg-blue-500/15 text-blue-400' : 'bg-purple-500/15 text-purple-400'
                              }`}>
                                {cat}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </>
        )}

      </motion.div>
    </div>
  );
}
