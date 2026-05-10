import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';
import { ArrowRight, Loader2 } from 'lucide-react';

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

  const [formData, setFormData] = useState({
    name: user?.name || '',
    dob: '',
    ug_pg: 'UG',
    department: '',
    college_id: '',
    college_name: '',
    degree_program_id: '',
    current_year_of_study: 1,
    resume_url: ''
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [collegesRes, programsRes] = await Promise.all([
          supabase.from('colleges').select('id, name, city, state').order('name'),
          supabase.from('degree_programs').select('id, name, category, duration_years')
        ]);

        if (collegesRes.data) setColleges(collegesRes.data);
        if (programsRes.data) setPrograms(programsRes.data);

        // Check if user's email domain matches a college
        if (user?.email) {
          const domain = user.email.split('@')[1];
          const { data } = await supabase
            .from('college_domains')
            .select('college_id')
            .eq('domain', domain)
            .maybeSingle();

          if (data?.college_id && collegesRes.data) {
            const matchedCollege = collegesRes.data.find(c => c.id === data.college_id);
            if (matchedCollege) {
              setFormData(prev => ({
                ...prev,
                college_id: matchedCollege.id,
                college_name: matchedCollege.name
              }));
            }
          }
        }
      } catch (e) {
        console.error('Error loading academic metadata', e);
        toast.error('Failed to load colleges. Please try again.');
      } finally {
        setFetchingData(false);
      }
    }
    loadData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCollegeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedCollege = colleges.find(c => c.id === selectedId);
    setFormData(prev => ({
      ...prev,
      college_id: selectedId,
      college_name: selectedCollege?.name || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setLoading(true);

    const selectedProgram = programs.find(p => p.id === formData.degree_program_id);
    if (!selectedProgram) {
      toast.error('Please select a degree program');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        dob: formData.dob,
        ug_pg: formData.ug_pg,
        department: formData.department,
        college_id: formData.college_id,
        college_name: formData.college_name,
        degree_program_id: formData.degree_program_id,
        current_year_of_study: Number(formData.current_year_of_study),
        course_duration: selectedProgram.duration_years,
        resume_url: formData.resume_url || null
      };

      const { data, error } = await supabase
        .from('users')
        .update(payload)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      updateUser(payload);
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
        <p>Loading metadata...</p>
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
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Full Name</label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Date of Birth</label>
            <input 
              required
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">College / Institution</label>
          <select 
            required
            name="college_id"
            value={formData.college_id}
            onChange={handleCollegeChange}
            className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
          >
            <option value="" disabled>Select your college</option>
            {colleges.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Degree Program</label>
            <select 
              required
              name="degree_program_id"
              value={formData.degree_program_id}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
            >
              <option value="" disabled>Select program</option>
              {programs.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Level</label>
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
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Department / Branch</label>
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
            <label className="text-sm text-gray-400">Current Year of Study</label>
            <select 
              name="current_year_of_study"
              value={formData.current_year_of_study}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
            >
              {[1,2,3,4,5,6].map(yr => <option key={yr} value={yr}>Year {yr}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Resume URL (Optional)</label>
          <input 
            type="url"
            name="resume_url"
            value={formData.resume_url}
            onChange={handleChange}
            className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="https://drive.google.com/..."
          />
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
