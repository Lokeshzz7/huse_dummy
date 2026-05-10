import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, Briefcase, DollarSign, TrendingUp, MapPin, Clock, 
  Users, Target, Zap, Filter, Search, ExternalLink, Bookmark,
  GraduationCap, Building2, MessageSquare, ArrowRight, Sparkles,
  Star, Award, CheckCircle, AlertCircle, Calendar, Tag, ArrowLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEcosystem } from '../context/EcosystemContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AlumniBadge } from '../components/AlumniBadge';
import { toast } from 'sonner';

type OpportunitySource = 'dofracto' | 'huse' | 'quotify';
type OpportunityType = 'equity' | 'revenue-share' | 'cash' | 'partnership' | 'gig' | 'quote';

interface OpportunityItem {
  id: string;
  source: OpportunitySource;
  type: OpportunityType;
  title: string;
  company: string;
  description: string;
  compensation: string;
  skills: string[];
  location: string;
  postedAt: string;
  applicants?: number;
  budget?: number;
  isUrgent?: boolean;
  isHuseAlumni?: boolean;
  college?: string;
}

export function OpportunityFeed() {
  const navigate = useNavigate();
  const { currentUser, gigPosts, startups, quoteRequests } = useEcosystem();
  const [selectedSource, setSelectedSource] = useState<OpportunitySource | 'all'>('all');
  const [selectedType, setSelectedType] = useState<OpportunityType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedOpps, setBookmarkedOpps] = useState<Set<string>>(new Set());

  // Handle Apply Now
  const handleApplyNow = (opp: OpportunityItem) => {
    // Navigate to the appropriate platform or show application modal
    if (opp.source === 'dofracto') {
      toast.success(`Applied to ${opp.title} at ${opp.company}!`);
      toast.info('Application submitted to Dofracto');
    } else if (opp.source === 'huse') {
      toast.success(`Applied to ${opp.title}!`);
      toast.info('Application submitted to HUSE Circle');
    } else if (opp.source === 'quotify') {
      toast.success(`Quote submitted for ${opp.title}!`);
      toast.info('Your quote has been sent');
    }
  };

  // Handle Bookmark
  const handleBookmark = (oppId: string, oppTitle: string) => {
    setBookmarkedOpps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(oppId)) {
        newSet.delete(oppId);
        toast.success(`Removed ${oppTitle} from bookmarks`);
      } else {
        newSet.add(oppId);
        toast.success(`Saved ${oppTitle} to bookmarks`);
      }
      return newSet;
    });
  };

  // Aggregate opportunities from all platforms
  const getAllOpportunities = (): OpportunityItem[] => {
    const opportunities: OpportunityItem[] = [];

    // From Dofracto - Startup opportunities
    (startups || []).forEach(startup => {
      startup.opportunities?.forEach(opp => {
        opportunities.push({
          id: opp.id,
          source: 'dofracto',
          type: opp.type === 'Equity' ? 'equity' : opp.type === 'Revenue Share' ? 'revenue-share' : 'cash',
          title: opp.title,
          company: startup.name,
          description: opp.description,
          compensation: opp.equity || opp.share || `$${opp.payment}`,
          skills: opp.skills,
          location: startup.location,
          postedAt: opp.postedOn,
          isHuseAlumni: startup.isHuseAlumni,
          college: startup.huseCollege
        });
      });
    });

    // From HUSE Circle - Gig posts
    (gigPosts || []).forEach(gig => {
      opportunities.push({
        id: gig.id,
        source: 'huse',
        type: 'gig',
        title: gig.title,
        company: gig.postedBy,
        description: gig.description,
        compensation: `$${gig.budget}`,
        skills: gig.skillsRequired,
        location: gig.college || 'Remote',
        postedAt: gig.createdAt,
        applicants: gig.applicants,
        budget: gig.budget,
        isUrgent: gig.isFromDofracto
      });
    });

    // From Quotify - Quote requests
    (quoteRequests || []).forEach(quote => {
      opportunities.push({
        id: quote.id,
        source: 'quotify',
        type: 'quote',
        title: quote.title,
        company: quote.userName,
        description: quote.description,
        compensation: quote.budget || 'Negotiable',
        skills: [quote.category],
        location: 'Remote',
        postedAt: quote.createdAt,
        isUrgent: quote.status === 'pending'
      });
    });

    // Add demo opportunities if no real data exists
    if (opportunities.length === 0) {
      const demoOpportunities: OpportunityItem[] = [
        {
          id: 'demo-1',
          source: 'dofracto',
          type: 'equity',
          title: 'Senior Full Stack Developer',
          company: 'TechVision AI',
          description: 'Join our founding team to build the next generation of AI-powered analytics tools. Looking for passionate developers who want equity stake in a high-growth startup.',
          compensation: '2-5% Equity',
          skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AI/ML'],
          location: 'Bangalore, India',
          postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          applicants: 23,
          isHuseAlumni: true,
          college: 'IIT Bombay'
        },
        {
          id: 'demo-2',
          source: 'huse',
          type: 'gig',
          title: 'UI/UX Design for Mobile App',
          company: 'Priya Sharma',
          description: 'Need a talented designer to create modern, intuitive designs for our fitness tracking mobile app. Must have experience with Figma and mobile design principles.',
          compensation: '₹25,000',
          skills: ['Figma', 'UI/UX', 'Mobile Design', 'Prototyping'],
          location: 'Remote',
          postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          applicants: 12,
          budget: 25000,
          isUrgent: true
        },
        {
          id: 'demo-3',
          source: 'quotify',
          type: 'quote',
          title: 'Logo & Brand Identity Design',
          company: 'StartupHub Ventures',
          description: 'Looking for a creative designer to develop complete brand identity including logo, color palette, typography, and brand guidelines for our new venture capital firm.',
          compensation: '₹30,000 - ₹50,000',
          skills: ['Brand Identity', 'Logo Design', 'Adobe Illustrator'],
          location: 'Remote',
          postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          isUrgent: false
        },
        {
          id: 'demo-4',
          source: 'dofracto',
          type: 'revenue-share',
          title: 'Marketing Growth Lead',
          company: 'EduTech Solutions',
          description: 'Join our team as a growth marketing expert. We offer revenue sharing model where you earn percentage of sales you bring in. Perfect for ambitious marketers.',
          compensation: '15% Revenue Share',
          skills: ['Digital Marketing', 'SEO', 'Content Marketing', 'Analytics'],
          location: 'Pune, India',
          postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          applicants: 18,
          isHuseAlumni: true,
          college: 'BITS Pilani'
        },
        {
          id: 'demo-5',
          source: 'huse',
          type: 'gig',
          title: 'Content Writer for Tech Blog',
          company: 'Arjun Mehta',
          description: 'Looking for technical content writers to create in-depth articles about web development, cloud computing, and DevOps. Must have strong technical background.',
          compensation: '₹2,000/article',
          skills: ['Technical Writing', 'Web Development', 'Cloud Computing'],
          location: 'Remote',
          postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          applicants: 31,
          budget: 2000
        },
        {
          id: 'demo-6',
          source: 'dofracto',
          type: 'cash',
          title: 'Backend Developer - Python/Django',
          company: 'FinanceFlow',
          description: 'We are building a fintech platform and need experienced backend developers. Competitive salary with opportunity to grow into leadership roles.',
          compensation: '₹8-12 LPA',
          skills: ['Python', 'Django', 'REST APIs', 'AWS', 'Docker'],
          location: 'Mumbai, India',
          postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          applicants: 45
        },
        {
          id: 'demo-7',
          source: 'quotify',
          type: 'quote',
          title: 'Video Editing for YouTube Channel',
          company: 'Creative Studios',
          description: 'Need professional video editor for our educational YouTube channel. Looking for someone who can create engaging edits with animations and effects.',
          compensation: 'Negotiable',
          skills: ['Video Editing', 'After Effects', 'Premiere Pro'],
          location: 'Remote',
          postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          isUrgent: true
        },
        {
          id: 'demo-8',
          source: 'huse',
          type: 'gig',
          title: 'Data Analysis & Visualization',
          company: 'Research Lab IIT Delhi',
          description: 'Part-time opportunity for students skilled in data analysis. Work on real research projects and build your portfolio while earning.',
          compensation: '₹15,000',
          skills: ['Python', 'Data Analysis', 'Tableau', 'Statistics'],
          location: 'Delhi, India',
          postedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          applicants: 27,
          budget: 15000,
          isHuseAlumni: true,
          college: 'IIT Delhi'
        }
      ];
      opportunities.push(...demoOpportunities);
    }

    return opportunities.sort((a, b) => 
      new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    );
  };

  const opportunities = getAllOpportunities();

  // Filter opportunities
  const filteredOpportunities = opportunities.filter(opp => {
    if (selectedSource !== 'all' && opp.source !== selectedSource) return false;
    if (selectedType !== 'all' && opp.type !== selectedType) return false;
    if (searchQuery && !opp.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !opp.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sourceConfig = {
    dofracto: { 
      icon: Rocket, 
      color: 'cyan', 
      gradient: 'from-cyan-500 to-blue-500',
      label: 'Dofracto'
    },
    huse: { 
      icon: GraduationCap, 
      color: 'purple', 
      gradient: 'from-purple-500 to-pink-500',
      label: 'HUSE Circle'
    },
    quotify: { 
      icon: MessageSquare, 
      color: 'blue', 
      gradient: 'from-blue-500 to-indigo-500',
      label: 'Quotify'
    }
  };

  const typeConfig = {
    equity: { icon: Target, label: 'Equity', color: 'text-green-400' },
    'revenue-share': { icon: TrendingUp, label: 'Revenue Share', color: 'text-purple-400' },
    cash: { icon: DollarSign, label: 'Cash', color: 'text-amber-400' },
    partnership: { icon: Users, label: 'Partnership', color: 'text-cyan-400' },
    gig: { icon: Briefcase, label: 'Gig', color: 'text-pink-400' },
    quote: { icon: MessageSquare, label: 'Quote', color: 'text-blue-400' }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Back to Dashboard Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 mb-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-xl text-gray-300 hover:text-white transition-all duration-300 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </motion.button>

            <div className="flex items-center justify-between">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Opportunity Feed
                  </h1>
                </motion.div>
                <p className="text-gray-400 text-lg">
                  All opportunities across HUSE Circle, Dofracto, and Quotify in one place
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                    <CheckCircle size={16} className="text-cyan-400" />
                    <span className="text-sm text-cyan-300">{opportunities.length} Total Opportunities</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                    <Zap size={16} className="text-purple-400" />
                    <span className="text-sm text-purple-300">Live Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            {/* Source Filter */}
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value as any)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-colors [&>option]:bg-gray-900 [&>option]:text-white"
            >
              <option value="all">All Platforms</option>
              <option value="dofracto">Dofracto</option>
              <option value="huse">HUSE Circle</option>
              <option value="quotify">Quotify</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-colors [&>option]:bg-gray-900 [&>option]:text-white"
            >
              <option value="all">All Types</option>
              <option value="equity">Equity</option>
              <option value="revenue-share">Revenue Share</option>
              <option value="cash">Cash Payment</option>
              <option value="gig">Gig Work</option>
              <option value="quote">Quote Request</option>
            </select>
          </div>

          {/* Results */}
          <div className="grid gap-4">
            {filteredOpportunities.length === 0 ? (
              <div className="text-center py-20">
                <AlertCircle className="mx-auto mb-4 text-gray-500" size={48} />
                <p className="text-gray-400 text-lg">No opportunities found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              filteredOpportunities.map((opp, index) => {
                const source = sourceConfig[opp.source];
                const type = typeConfig[opp.type];
                const SourceIcon = source.icon;
                const TypeIcon = type.icon;

                return (
                  <motion.div
                    key={opp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 cursor-pointer"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {/* Platform Badge */}
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r ${source.gradient} bg-opacity-20 border border-${source.color}-500/30 rounded-lg`}>
                            <SourceIcon size={14} className={`text-${source.color}-400`} />
                            <span className="text-xs font-semibold text-white">{source.label}</span>
                          </div>

                          {/* Type Badge */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg">
                            <TypeIcon size={14} className={type.color} />
                            <span className="text-xs font-semibold text-white">{type.label}</span>
                          </div>

                          {/* Urgent Badge */}
                          {opp.isUrgent && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-lg">
                              <Zap size={12} className="text-red-400" />
                              <span className="text-[10px] font-bold text-red-300">URGENT</span>
                            </div>
                          )}

                          {/* Alumni Badge */}
                          {opp.isHuseAlumni && opp.college && (
                            <AlumniBadge college={opp.college} size="sm" showLabel={false} />
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                          {opp.title}
                        </h3>
                        <p className="text-gray-400 mb-3">{opp.company}</p>
                        <p className="text-sm text-gray-300 line-clamp-2">{opp.description}</p>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmark(opp.id, opp.title);
                        }}
                        className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${
                          bookmarkedOpps.has(opp.id) ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'
                        }`}
                      >
                        <Bookmark 
                          className={bookmarkedOpps.has(opp.id) ? 'fill-cyan-400' : ''} 
                          size={20} 
                        />
                      </button>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {opp.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {opp.skills.length > 4 && (
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                          +{opp.skills.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <DollarSign size={16} className="text-green-400" />
                          <span className="font-semibold text-white">{opp.compensation}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <MapPin size={16} />
                          <span>{opp.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Clock size={16} />
                          <span>{new Date(opp.postedAt).toLocaleDateString()}</span>
                        </div>
                        {opp.applicants !== undefined && (
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <Users size={16} />
                            <span>{opp.applicants} applicants</span>
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyNow(opp);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 group-hover:scale-105"
                      >
                        <span>Apply Now</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}