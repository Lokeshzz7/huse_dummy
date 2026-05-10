import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, X, Check, Sparkles, TrendingUp, Users, Building2, Crown, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import logo from 'figma:asset/c5f0bab53a945965073dbcdefa0862c09d9e3ef8.png';

export function ThemePreview() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get theme colors from localStorage or use defaults
  const [themeColors, setThemeColors] = useState({
    primaryColor: '#24c6dc',
    secondaryColor: '#05997F',
    backgroundColor: '#0a0a0a'
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('previewTheme');
    if (savedTheme) {
      setThemeColors(JSON.parse(savedTheme));
    }
  }, []);

  const handleApplyTheme = () => {
    if (confirm('Apply this theme to your website?\n\nThis will update the live theme colors across the entire platform.')) {
      alert('Theme Applied Successfully!\n\nYour website has been updated with the new theme colors.');
      navigate('/admin-dashboard');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColors.backgroundColor }}>
      {/* Preview Header */}
      <div className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" style={{ color: themeColors.primaryColor }} />
              <span className="text-white">Theme Preview Mode</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: themeColors.primaryColor }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: themeColors.secondaryColor }}></div>
              <span className="text-gray-400 text-sm ml-2">Current Theme</span>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleApplyTheme}
              className="text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              style={{
                background: `linear-gradient(to right, ${themeColors.primaryColor}, ${themeColors.secondaryColor})`
              }}
            >
              <Check className="w-4 h-4" />
              Apply Theme
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: themeColors.primaryColor }}
            ></div>
            <div 
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: themeColors.secondaryColor }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-6 h-6" style={{ color: themeColors.primaryColor }} />
                <span 
                  className="text-xl bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${themeColors.primaryColor}, ${themeColors.secondaryColor})`
                  }}
                >
                  DOFRACTO
                </span>
              </div>
              
              <h1 className="text-white text-6xl md:text-7xl lg:text-8xl mb-6">
                Empower Your
                <br />
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${themeColors.primaryColor}, ${themeColors.secondaryColor})`
                  }}
                >
                  Business Growth
                </span>
              </h1>
              
              <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
                Connect with premium businesses and unlock exclusive networking opportunities
                through our innovative platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="px-8 py-4 rounded-full text-white shadow-lg transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(to right, ${themeColors.primaryColor}, ${themeColors.secondaryColor})`,
                    boxShadow: `0 10px 40px ${themeColors.primaryColor}40`
                  }}
                >
                  Get Started
                </button>
                <button className="px-8 py-4 rounded-full text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: Users, label: 'Active Users', value: '10,000+', color: themeColors.primaryColor },
                { icon: Building2, label: 'Business Listings', value: '5,000+', color: themeColors.secondaryColor },
                { icon: Crown, label: 'HUSE Members', value: '500+', color: themeColors.primaryColor },
                { icon: TrendingUp, label: 'Success Rate', value: '95%', color: themeColors.secondaryColor }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
                >
                  <stat.icon className="w-8 h-8 mb-4" style={{ color: stat.color }} />
                  <div className="text-white text-3xl mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-white text-5xl mb-4">
                Platform
                <span 
                  className="bg-clip-text text-transparent ml-3"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${themeColors.primaryColor}, ${themeColors.secondaryColor})`
                  }}
                >
                  Features
                </span>
              </h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                Discover powerful tools designed to accelerate your business success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Business Analytics',
                  description: 'Track your growth with comprehensive analytics and insights',
                  gradient: `linear-gradient(135deg, ${themeColors.primaryColor}20, ${themeColors.secondaryColor}20)`
                },
                {
                  title: 'Premium Networking',
                  description: 'Connect with industry leaders and expand your network',
                  gradient: `linear-gradient(135deg, ${themeColors.secondaryColor}20, ${themeColors.primaryColor}20)`
                },
                {
                  title: 'Growth Tools',
                  description: 'Access exclusive tools to scale your business faster',
                  gradient: `linear-gradient(135deg, ${themeColors.primaryColor}20, ${themeColors.secondaryColor}20)`
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all group"
                  style={{ background: feature.gradient }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${themeColors.primaryColor}, ${themeColors.secondaryColor})`
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white text-2xl mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-3xl p-12 text-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${themeColors.primaryColor}20, ${themeColors.secondaryColor}20)`,
                border: `1px solid ${themeColors.primaryColor}30`
              }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-full opacity-10"
                style={{
                  background: `radial-gradient(circle at 30% 50%, ${themeColors.primaryColor}, transparent 50%),
                               radial-gradient(circle at 70% 50%, ${themeColors.secondaryColor}, transparent 50%)`
                }}
              ></div>
              
              <div className="relative z-10">
                <h2 className="text-white text-4xl md:text-5xl mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses already growing with Dofracto
                </p>
                <button 
                  className="px-10 py-4 rounded-full text-white shadow-2xl transition-all hover:scale-105 text-lg"
                  style={{
                    background: `linear-gradient(to right, ${themeColors.primaryColor}, ${themeColors.secondaryColor})`,
                    boxShadow: `0 20px 60px ${themeColors.primaryColor}40`
                  }}
                >
                  Join Dofracto Today
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src={logo} alt="Dofracto" className="h-8 mix-blend-lighten" />
            </div>
            <p className="text-gray-400">
              © 2024 Dofracto. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Theme Info Panel */}
      <div className="fixed bottom-6 right-6 bg-black/90 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-2xl">
        <div className="text-white text-sm mb-3">Current Theme Colors:</div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: themeColors.primaryColor }}></div>
            <div>
              <div className="text-gray-400 text-xs">Primary</div>
              <div className="text-white text-xs font-mono">{themeColors.primaryColor}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: themeColors.secondaryColor }}></div>
            <div>
              <div className="text-gray-400 text-xs">Secondary</div>
              <div className="text-white text-xs font-mono">{themeColors.secondaryColor}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-white/20" style={{ backgroundColor: themeColors.backgroundColor }}></div>
            <div>
              <div className="text-gray-400 text-xs">Background</div>
              <div className="text-white text-xs font-mono">{themeColors.backgroundColor}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}