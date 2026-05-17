import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase, MapPin, DollarSign, Clock, Building2, Globe,
  TrendingUp, Users, Filter, Search, Bookmark, Eye,
  CheckCircle, Calendar, Award, Target, Zap, Star,
  ChevronDown, ExternalLink, Send, ArrowLeft, Rocket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { JobBoard } from '../components/JobBoard';

export function DofractoOpportunities() {
  const navigate = useNavigate();

  // Mock Dofracto contributor user
  const currentUser = {
    name: 'Alex Contributor',
    avatar: '👨‍💼',
    tier: 'Gold',
    reputation: 1250,
    completedProjects: 15
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dofracto/builder/hub')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Hub</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                  <Rocket className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-white text-2xl font-bold">Career Opportunities</h1>
                  <p className="text-gray-400 text-sm">Exclusive jobs for Dofracto contributors</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-cyan-400 font-bold">{currentUser.name}</p>
                <p className="text-gray-500 text-xs">{currentUser.tier} Tier • {currentUser.reputation} Rep</p>
              </div>
              <div className="text-3xl">{currentUser.avatar}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Star className="text-cyan-400" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg font-bold mb-2">Premium Opportunities for Dofracto Contributors</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                Access exclusive job postings from companies specifically looking for skilled contributors from the Dofracto ecosystem. 
                Your reputation and completed projects give you an edge!
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-2 text-cyan-400">
                  <CheckCircle size={14} />
                  <span>Verified Companies Only</span>
                </div>
                <div className="flex items-center gap-2 text-teal-400">
                  <CheckCircle size={14} />
                  <span>Direct Contact with Recruiters</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle size={14} />
                  <span>Fast-Track Applications</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Job Board Component */}
        <JobBoard currentUser={currentUser} platform="dofracto" />
      </main>
    </div>
  );
}
