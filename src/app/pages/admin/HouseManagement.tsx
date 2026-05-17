import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Home, Plus, Edit2, Trash2, UserPlus, Loader2,
  ChevronDown, X, Check, Copy, RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { adminAction, apiGet } from '../../../lib/api';

type Section = 'create' | 'edit' | 'delete' | 'assign';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
}

interface House {
  id: string;
  name: string;
  color?: string;
  college_id: string;
}

export function HouseManagement() {
  const [section, setSection] = useState<Section>('create');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [colleges, setColleges] = useState<College[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // ── Create form ──────────────────────────────────────────────────────────────
  const [createCollegeInput, setCreateCollegeInput] = useState('');
  const [createCollegeId, setCreateCollegeId] = useState('');
  const [createCollegeName, setCreateCollegeName] = useState('');
  const [showCreateCollegeDD, setShowCreateCollegeDD] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createColor, setCreateColor] = useState('#8B5CF6');
  const createCollegeRef = useRef<HTMLDivElement>(null);

  // ── Edit form ────────────────────────────────────────────────────────────────
  const [editHouseId, setEditHouseId] = useState('');
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('#8B5CF6');

  // ── Delete ───────────────────────────────────────────────────────────────────
  const [deleteHouseId, setDeleteHouseId] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // ── Assign form ──────────────────────────────────────────────────────────────
  const [assignHouseId, setAssignHouseId] = useState('');
  const [assignUserId, setAssignUserId] = useState('');

  // ─── Data loading ────────────────────────────────────────────────────────────

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [collegesData, housesData] = await Promise.all([
        apiGet<College[]>('/reference/colleges'),
        apiGet<House[]>('/reference/houses').catch(() => [] as House[]),
      ]);
      setColleges(collegesData);
      setHouses(housesData);
    } catch {
      // keep existing data on failure
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Close college combobox on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (createCollegeRef.current && !createCollegeRef.current.contains(e.target as Node)) {
        setShowCreateCollegeDD(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const collegeName = (id: string) =>
    colleges.find(c => c.id === id)?.name ?? 'Unknown College';

  const housesForCollege = (college_id: string) =>
    houses.filter(h => h.college_id === college_id);

  const selectedEditHouse = houses.find(h => h.id === editHouseId);
  const selectedDeleteHouse = houses.find(h => h.id === deleteHouseId);
  const selectedAssignHouse = houses.find(h => h.id === assignHouseId);

  const filteredCollegesForCreate = createCollegeInput
    ? colleges.filter(c =>
        c.name.toLowerCase().includes(createCollegeInput.toLowerCase()) ||
        c.city?.toLowerCase().includes(createCollegeInput.toLowerCase())
      )
    : colleges;

  const selectCreateCollege = (c: College) => {
    setCreateCollegeId(c.id);
    setCreateCollegeName(c.name);
    setCreateCollegeInput('');
    setShowCreateCollegeDD(false);
  };

  const clearCreateCollege = () => {
    setCreateCollegeId('');
    setCreateCollegeName('');
    setCreateCollegeInput('');
    setShowCreateCollegeDD(true);
  };

  const selectEditHouse = (id: string) => {
    setEditHouseId(id);
    const h = houses.find(h => h.id === id);
    if (h) {
      setEditName(h.name);
      setEditColor(h.color || '#8B5CF6');
    }
  };

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createCollegeId || !createName.trim()) {
      toast.error('College and house name are required');
      return;
    }
    setLoading(true);
    try {
      const result = await adminAction<{ house_id: string }>({
        action: 'create_house',
        college_id: createCollegeId,
        name: createName.trim(),
        ...(createColor && { color: createColor }),
      });
      const newHouse: House = {
        id: result.house_id,
        name: createName.trim(),
        color: createColor,
        college_id: createCollegeId,
      };
      setHouses(prev => [...prev, newHouse]);
      toast.success(`"${createName.trim()}" house created under ${createCollegeName}.`);
      setCreateName('');
      setCreateColor('#8B5CF6');
      setCreateCollegeId('');
      setCreateCollegeName('');
    } catch (e: any) {
      toast.error('Failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editHouseId) {
      toast.error('Select a house to edit');
      return;
    }
    if (!editName.trim() && !editColor.trim()) {
      toast.error('At least one of Name or Color is required');
      return;
    }
    setLoading(true);
    try {
      await adminAction({
        action: 'edit_house',
        house_id: editHouseId,
        ...(editName.trim() && { name: editName.trim() }),
        ...(editColor.trim() && { color: editColor.trim() }),
      });
      setHouses(prev => prev.map(h =>
        h.id === editHouseId
          ? { ...h, name: editName.trim() || h.name, color: editColor.trim() || h.color }
          : h
      ));
      toast.success('House updated successfully');
      setEditHouseId('');
      setEditName('');
      setEditColor('#8B5CF6');
    } catch (e: any) {
      toast.error('Failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteHouseId) {
      toast.error('Select a house to delete');
      return;
    }
    if (!confirmDelete) {
      toast.error('Please confirm deletion by checking the checkbox');
      return;
    }
    setLoading(true);
    try {
      await adminAction({ action: 'delete_house', house_id: deleteHouseId });
      setHouses(prev => prev.filter(h => h.id !== deleteHouseId));
      toast.success('House deleted');
      setDeleteHouseId('');
      setConfirmDelete(false);
    } catch (e: any) {
      toast.error('Failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignUserId.trim() || !assignHouseId) {
      toast.error('User ID and house are required');
      return;
    }
    setLoading(true);
    try {
      await adminAction({
        action: 'assign_house',
        user_id: assignUserId.trim(),
        house_id: assignHouseId,
      });
      const h = houses.find(h => h.id === assignHouseId);
      toast.success(`User assigned to "${h?.name ?? 'house'}"`);
      setAssignUserId('');
      setAssignHouseId('');
    } catch (e: any) {
      toast.error('Failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Styles ──────────────────────────────────────────────────────────────────

  const inputClass = 'w-full bg-black border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 placeholder-gray-600 text-sm';
  const labelClass = 'block text-gray-400 text-xs mb-1.5 uppercase tracking-wide font-medium';

  const tabs: { id: Section; label: string; icon: React.ElementType; accent: string }[] = [
    { id: 'create', label: 'Create', icon: Plus, accent: 'text-purple-400' },
    { id: 'edit', label: 'Edit', icon: Edit2, accent: 'text-blue-400' },
    { id: 'delete', label: 'Delete', icon: Trash2, accent: 'text-red-400' },
    { id: 'assign', label: 'Assign', icon: UserPlus, accent: 'text-green-400' },
  ];

  // House <select> shared across Edit / Delete / Assign
  const HouseSelect = ({
    value,
    onChange,
    borderClass = 'border-white/20',
  }: {
    value: string;
    onChange: (id: string) => void;
    borderClass?: string;
  }) => (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full bg-black border ${borderClass} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 text-sm appearance-none`}
    >
      <option value="" disabled>
        {houses.length === 0 ? 'No houses yet — create one first' : 'Select a house...'}
      </option>
      {colleges.map(c => {
        const ch = housesForCollege(c.id);
        if (ch.length === 0) return null;
        return (
          <optgroup key={c.id} label={c.name}>
            {ch.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </optgroup>
        );
      })}
      {/* Houses whose college isn't in the list (edge case) */}
      {houses.filter(h => !colleges.find(c => c.id === h.college_id)).map(h => (
        <option key={h.id} value={h.id}>{h.name} (unknown college)</option>
      ))}
    </select>
  );

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Home className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">House Management</h2>
            <p className="text-gray-400 text-sm">Create, edit, delete and assign college-level Houses</p>
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
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setSection(t.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              section === t.id
                ? 'bg-white/10 border border-white/20 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <t.icon className={`w-4 h-4 ${t.accent}`} />
            {t.label}
          </button>
        ))}
      </div>

      <motion.div key={section} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        {/* ══════════════════════════ CREATE TAB ══════════════════════════ */}
        {section === 'create' && (
          <>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl">
              <form onSubmit={handleCreate} className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Plus className="w-4 h-4 text-purple-400" /> Create House
                </h3>

                {/* College combobox */}
                <div>
                  <label className={labelClass}>College *</label>
                  <div ref={createCollegeRef} className="relative">
                    <div className={`flex items-center bg-black border ${createCollegeId ? 'border-purple-500/50' : 'border-white/20'} rounded-lg focus-within:border-purple-500/50 transition-colors`}>
                      <input
                        type="text"
                        value={createCollegeId ? createCollegeName : createCollegeInput}
                        onChange={(e) => {
                          if (createCollegeId) {
                            setCreateCollegeId('');
                            setCreateCollegeName('');
                          }
                          setCreateCollegeInput(e.target.value);
                          setShowCreateCollegeDD(true);
                        }}
                        onFocus={() => !createCollegeId && setShowCreateCollegeDD(true)}
                        placeholder={colleges.length === 0 ? 'No colleges yet' : 'Search college by name or city...'}
                        disabled={colleges.length === 0}
                        className="flex-1 bg-transparent px-4 py-2.5 text-white text-sm focus:outline-none placeholder-gray-600 disabled:cursor-not-allowed"
                      />
                      {createCollegeId ? (
                        <button type="button" onClick={clearCreateCollege} className="px-3 text-gray-500 hover:text-white transition-colors">
                          <X size={13} />
                        </button>
                      ) : (
                        <ChevronDown size={13} className="mr-3 text-gray-600 flex-shrink-0" />
                      )}
                    </div>

                    {showCreateCollegeDD && colleges.length > 0 && (
                      <div className="absolute z-20 w-full mt-1 bg-[#111] border border-white/15 rounded-xl shadow-2xl max-h-52 overflow-y-auto">
                        {filteredCollegesForCreate.length === 0 ? (
                          <p className="px-4 py-3 text-gray-500 text-sm text-center">No match</p>
                        ) : (
                          filteredCollegesForCreate.map(c => (
                            <button
                              key={c.id}
                              type="button"
                              onMouseDown={() => selectCreateCollege(c)}
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
                  {createCollegeId && (
                    <p className="text-xs text-green-400 mt-1.5 flex items-center gap-1">
                      <Check size={11} /> {createCollegeName}
                    </p>
                  )}
                </div>

                {/* House name */}
                <div>
                  <label className={labelClass}>House Name *</label>
                  <input
                    type="text"
                    value={createName}
                    onChange={e => setCreateName(e.target.value)}
                    placeholder="e.g. Phoenix"
                    className={inputClass}
                    required
                  />
                </div>

                {/* Color picker */}
                <div>
                  <label className={labelClass}>House Color</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={createColor}
                      onChange={e => setCreateColor(e.target.value)}
                      className="w-12 h-10 rounded-lg bg-black border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={createColor}
                      onChange={e => setCreateColor(e.target.value)}
                      placeholder="#8B5CF6"
                      className={inputClass}
                      maxLength={7}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !createCollegeId}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Create House
                </button>
              </form>
            </div>

            {/* Houses list */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <Home size={14} className="text-gray-400" />
                All Houses
                <span className="text-gray-500 font-normal">({houses.length})</span>
              </h3>

              {loadingData ? (
                <div className="flex items-center gap-2 text-gray-500 text-sm py-6">
                  <Loader2 size={14} className="animate-spin" /> Loading...
                </div>
              ) : houses.length === 0 ? (
                <p className="text-gray-500 text-sm py-6">No houses created yet.</p>
              ) : (
                <div className="space-y-4">
                  {colleges.filter(c => housesForCollege(c.id).length > 0).map(c => (
                    <div key={c.id}>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{c.name}</p>
                      <div className="space-y-2">
                        {housesForCollege(c.id).map(h => (
                          <div
                            key={h.id}
                            className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 gap-4 hover:border-white/20 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span
                                className="w-4 h-4 rounded-full flex-shrink-0 border border-white/10"
                                style={{ backgroundColor: h.color || '#8B5CF6' }}
                              />
                              <p className="text-white font-medium text-sm">{h.name}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <code className="text-gray-600 text-xs font-mono hidden md:block">
                                {h.id.slice(0, 8)}…
                              </code>
                              <button
                                type="button"
                                onClick={() => copyId(h.id)}
                                title={h.id}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                {copiedId === h.id
                                  ? <><Check size={11} className="text-green-400" /> Copied</>
                                  : <><Copy size={11} /> Copy ID</>
                                }
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ══════════════════════════ EDIT TAB ══════════════════════════ */}
        {section === 'edit' && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl">
            <form onSubmit={handleEdit} className="space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-blue-400" /> Edit House
              </h3>

              <div>
                <label className={labelClass}>House *</label>
                <HouseSelect value={editHouseId} onChange={selectEditHouse} />
                {selectedEditHouse && (
                  <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full inline-block border border-white/10"
                      style={{ backgroundColor: selectedEditHouse.color || '#8B5CF6' }}
                    />
                    {selectedEditHouse.name} · {collegeName(selectedEditHouse.college_id)}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>New Name <span className="normal-case text-gray-600">(leave blank to keep)</span></label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  placeholder="New house name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>New Color <span className="normal-case text-gray-600">(leave blank to keep)</span></label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={editColor || '#8B5CF6'}
                    onChange={e => setEditColor(e.target.value)}
                    className="w-12 h-10 rounded-lg bg-black border border-white/20 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editColor}
                    onChange={e => setEditColor(e.target.value)}
                    placeholder="#FF5733"
                    className={inputClass}
                    maxLength={7}
                  />
                </div>
              </div>

              <p className="text-gray-500 text-xs">At least one of Name or Color must be provided.</p>

              <button
                type="submit"
                disabled={loading || !editHouseId}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit2 className="w-4 h-4" />}
                Update House
              </button>
            </form>
          </div>
        )}

        {/* ══════════════════════════ DELETE TAB ══════════════════════════ */}
        {section === 'delete' && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl">
            <form onSubmit={handleDelete} className="space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-400" /> Delete House
              </h3>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 text-sm font-medium">This action is irreversible.</p>
                <p className="text-red-400/70 text-xs mt-1">Deleting a house removes it from all associated users.</p>
              </div>

              <div>
                <label className={labelClass}>Select House *</label>
                <HouseSelect
                  value={deleteHouseId}
                  onChange={id => { setDeleteHouseId(id); setConfirmDelete(false); }}
                  borderClass="border-red-500/30 focus:border-red-500/50"
                />
                {selectedDeleteHouse && (
                  <div className="mt-2 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0 border border-white/10"
                      style={{ backgroundColor: selectedDeleteHouse.color || '#8B5CF6' }}
                    />
                    <span className="text-red-300 text-xs font-medium">{selectedDeleteHouse.name}</span>
                    <span className="text-red-400/60 text-xs">— {collegeName(selectedDeleteHouse.college_id)}</span>
                  </div>
                )}
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmDelete}
                  onChange={e => setConfirmDelete(e.target.checked)}
                  className="w-4 h-4 rounded border-red-500/50 bg-black text-red-500 focus:ring-red-500"
                />
                <span className="text-red-400 text-sm">I understand this will permanently delete the house</span>
              </label>

              <button
                type="submit"
                disabled={loading || !deleteHouseId || !confirmDelete}
                className="w-full bg-red-500/20 border border-red-500/40 text-red-400 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-500/30 transition-colors disabled:opacity-40"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete House
              </button>
            </form>
          </div>
        )}

        {/* ══════════════════════════ ASSIGN TAB ══════════════════════════ */}
        {section === 'assign' && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl">
            <form onSubmit={handleAssign} className="space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-green-400" /> Assign House to User
              </h3>

              <div>
                <label className={labelClass}>House *</label>
                <HouseSelect value={assignHouseId} onChange={setAssignHouseId} />
                {selectedAssignHouse && (
                  <p className="text-xs text-green-400 mt-1.5 flex items-center gap-2">
                    <Check size={11} />
                    {selectedAssignHouse.name} · {collegeName(selectedAssignHouse.college_id)}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>User ID *</label>
                <input
                  type="text"
                  value={assignUserId}
                  onChange={e => setAssignUserId(e.target.value)}
                  placeholder="User UUID (from User Management)"
                  className={inputClass}
                  required
                />
                <p className="text-gray-500 text-xs mt-1">
                  Find the user's UUID in User Management → copy from their profile.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !assignHouseId}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                Assign House
              </button>
            </form>
          </div>
        )}

      </motion.div>
    </div>
  );
}
