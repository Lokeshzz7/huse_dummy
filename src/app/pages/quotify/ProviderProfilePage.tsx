import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft, Star, MapPin, Calendar, Award, CheckCircle,
  Briefcase, DollarSign, Clock, MessageSquare, Share2,
  TrendingUp, Shield, Eye, ExternalLink, Building2,
  GraduationCap, Users, Zap, Target, Globe, Mail,
  Phone, Heart, Flag, ThumbsUp, Image as ImageIcon
} from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { toast } from 'sonner';

interface Review {
  id: number;
  clientName: string;
  clientAvatar: string;
  rating: number;
  date: string;
  projectTitle: string;
  comment: string;
  helpful: number;
}

interface Portfolio {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const mockProviders: any = {
  'tech-startup-001': {
    id: 'tech-startup-001',
    name: 'TechVenture AI',
    type: 'business',
    avatar: '🚀',
    tagline: 'AI-Powered Solutions for Modern Businesses',
    location: 'Bangalore, India',
    memberSince: '2023-01',
    verified: true,
    rating: 4.8,
    reviewCount: 47,
    completedProjects: 156,
    responseTime: '2 hours',
    successRate: 98,
    skills: ['React', 'Node.js', 'AI/ML', 'Cloud Architecture', 'E-commerce'],
    about: 'We are a team of 12 experienced developers specializing in building scalable web applications with cutting-edge technology. Our expertise includes AI integration, cloud solutions, and full-stack development.',
    teamSize: 12,
    languages: ['English', 'Hindi'],
    hourlyRate: '$50-75',
    email: 'contact@techventure.ai',
    phone: '+91 98765 43210',
    website: 'https://techventure.ai',
    badges: ['Dofracto Verified', 'Top Rated', 'Fast Delivery'],
    portfolio: [
      {
        id: 1,
        title: 'E-commerce Platform',
        category: 'Web Development',
        image: '🛍️',
        description: 'Full-stack marketplace with 10k+ active users'
      },
      {
        id: 2,
        title: 'AI Chatbot System',
        category: 'AI/ML',
        image: '🤖',
        description: 'Custom NLP chatbot with 95% accuracy'
      },
      {
        id: 3,
        title: 'SaaS Dashboard',
        category: 'Web Development',
        image: '📊',
        description: 'Analytics platform for enterprise clients'
      }
    ],
    reviews: [
      {
        id: 1,
        clientName: 'Sarah Johnson',
        clientAvatar: '👩‍💼',
        rating: 5,
        date: '2024-12-10',
        projectTitle: 'E-commerce Website',
        comment: 'Outstanding work! The team delivered ahead of schedule and exceeded all expectations. Highly professional and communicative throughout.',
        helpful: 24
      },
      {
        id: 2,
        clientName: 'Mike Chen',
        clientAvatar: '👨‍💻',
        rating: 4,
        date: '2024-11-28',
        projectTitle: 'Mobile App Development',
        comment: 'Great experience working with TechVenture. Minor delays but the final product was excellent.',
        helpful: 18
      }
    ]
  },
  'student-platinum-003': {
    id: 'student-platinum-003',
    name: 'Arjun Kumar',
    type: 'student',
    avatar: '👨‍💻',
    tagline: 'Full-Stack Developer | HUSE Circle Platinum',
    location: 'Mumbai, India',
    memberSince: '2024-03',
    verified: true,
    rating: 4.6,
    reviewCount: 12,
    completedProjects: 28,
    responseTime: '4 hours',
    successRate: 95,
    skills: ['React', 'Next.js', 'TypeScript', 'Firebase', 'UI/UX Design'],
    about: 'Platinum tier student at IIT Bombay with a passion for creating beautiful, functional web applications. Completed 28+ projects on HUSE Circle with excellent client satisfaction.',
    education: 'IIT Bombay - Computer Science (3rd Year)',
    languages: ['English', 'Hindi', 'Marathi'],
    hourlyRate: '$25-40',
    email: 'arjun.kumar@iitb.ac.in',
    phone: '+91 87654 32109',
    badges: ['HUSE Platinum', 'Student Developer', 'Fast Learner'],
    portfolio: [
      {
        id: 1,
        title: 'Portfolio Website',
        category: 'Web Design',
        image: '💼',
        description: 'Modern portfolio for freelance designer'
      },
      {
        id: 2,
        title: 'Task Manager App',
        category: 'Web Development',
        image: '✅',
        description: 'Full-stack productivity application'
      }
    ],
    reviews: [
      {
        id: 1,
        clientName: 'Priya Sharma',
        clientAvatar: '👩‍🎨',
        rating: 5,
        date: '2024-12-05',
        projectTitle: 'Landing Page Design',
        comment: 'Arjun is incredibly talented! He understood my vision perfectly and delivered a stunning website.',
        helpful: 15
      },
      {
        id: 2,
        clientName: 'Rahul Verma',
        clientAvatar: '👨‍💼',
        rating: 4,
        date: '2024-11-20',
        projectTitle: 'E-commerce Site',
        comment: 'Good work overall. Very responsive and willing to make changes.',
        helpful: 8
      }
    ]
  }
};

export function ProviderProfilePage() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews'>('overview');
  const [isSaved, setIsSaved] = useState(false);

  const provider = mockProviders[providerId || ''];

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Provider Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-cyan-400 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleContactProvider = () => {
    toast.success(`Message sent to ${provider.name}!`);
  };

  const handleSaveProfile = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved' : 'Saved to your list');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Profile link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <div className="pt-[80px] pb-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          {/* Profile Header */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-5xl">
                  {provider.avatar}
                </div>
                {provider.verified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 border-4 border-[#0a0a0a] flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-white">{provider.name}</h1>
                      {provider.type === 'business' ? (
                        <span className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs">
                          <Building2 className="w-3 h-3" />
                          Dofracto Business
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs">
                          <GraduationCap className="w-3 h-3" />
                          HUSE Platinum
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-lg mb-3">{provider.tagline}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {provider.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Member since {new Date(provider.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className={`p-3 rounded-lg border transition-all ${
                        isSaved
                          ? 'bg-red-500/20 border-red-500/30 text-red-400'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 transition-all">
                      <Flag className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.badges.map((badge: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 rounded-full text-xs font-medium flex items-center gap-1"
                    >
                      <Award className="w-3 h-3" />
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-2xl font-bold text-white">{provider.rating}</span>
                    </div>
                    <div className="text-xs text-gray-400">{provider.reviewCount} reviews</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-2xl font-bold text-white">{provider.completedProjects}</span>
                    </div>
                    <div className="text-xs text-gray-400">Completed</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-lg font-bold text-white">{provider.responseTime}</span>
                    </div>
                    <div className="text-xs text-gray-400">Response time</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span className="text-2xl font-bold text-white">{provider.successRate}%</span>
                    </div>
                    <div className="text-xs text-gray-400">Success rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
              <button
                onClick={handleContactProvider}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Contact Provider</span>
              </button>
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                <span className="font-medium">Request Quote</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-8 border-b border-white/10">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'portfolio', label: 'Portfolio', count: provider.portfolio.length },
              { id: 'reviews', label: 'Reviews', count: provider.reviewCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeProfileTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* About */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">About</h2>
                  <p className="text-gray-400 leading-relaxed">{provider.about}</p>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Skills */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                      Skills & Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">{provider.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">{provider.phone}</span>
                      </div>
                      {provider.website && (
                        <div className="flex items-center gap-3 text-sm">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                            Visit Website
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm pt-2 border-t border-white/10">
                        <span className="text-gray-400">Languages:</span>
                        <span className="text-white">{provider.languages.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        Hourly Rate
                      </h3>
                      <p className="text-gray-400 text-sm">Standard pricing for services</p>
                    </div>
                    <div className="text-3xl font-bold text-green-400">{provider.hourlyRate}</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {provider.portfolio.map((item: Portfolio) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group cursor-pointer"
                  >
                    <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-6xl">
                      {item.image}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <p className="text-xs text-purple-400 mb-2">{item.category}</p>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Rating Summary */}
                <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-2xl p-8">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-white mb-2">{provider.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.round(provider.rating)
                                ? 'text-amber-400 fill-current'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-400">{provider.reviewCount} reviews</div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage = rating === 5 ? 75 : rating === 4 ? 20 : 5;
                        return (
                          <div key={rating} className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-400 w-8">{rating}★</span>
                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-400 w-12 text-right">{percentage}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                {provider.reviews.map((review: Review) => (
                  <div
                    key={review.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl">
                        {review.clientAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-white">{review.clientName}</h4>
                            <p className="text-sm text-gray-400">{review.projectTitle}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? 'text-amber-400 fill-current'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-xs text-gray-400">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-3">{review.comment}</p>
                        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
