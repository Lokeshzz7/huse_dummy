import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

type UserRole = 'student' | 'contributor' | 'recruiter' | 'business' | 'client' | 'provider' | 'admin';
type Platform = 'huse' | 'dofracto' | 'quotify' | 'recruiter';
type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Contributor' | 'Business Owner';

interface User {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  avatar_style?: string;
  role: UserRole;
  platform: Platform;
  tier?: Tier;
  reputation?: number;
  college_name?: string;
  college_id?: string;
  verified?: boolean;
  phone_verified?: boolean;
  user_status?: string;
  subscription_expiry_date?: string;
  subscription_status?: string;
  // Additional fields based on role
  handle?: string;
  current_year_of_study?: number;
  course_duration?: number;
  graduating_year?: number;
  department?: string;
  skills?: string[];
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password?: string; platform: Platform; role?: UserRole }) => Promise<User | null>;
  signUp: (credentials: { email: string; password?: string; platform: Platform; role?: UserRole }) => Promise<User | null>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  switchPlatform: (platform: Platform) => void;
  canAccessFeature: (requiredTier: Tier) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
      }

      if (data) {
        // Map backend user to frontend user model
        const mappedUser: User = {
          id: data.id,
          name: data.name,
          email: data.email || email,
          avatar_style: data.avatar_style,
          avatar: data.avatar_style ? `https://api.dicebear.com/9.x/${data.avatar_style}/svg?seed=${data.id}` : '🎓',
          role: data.role as UserRole || 'student',
          platform: 'huse', // default
          tier: calculateTier(data.reputation || 0),
          reputation: data.reputation || 0,
          college_name: data.college_name,
          college_id: data.college_id,
          verified: data.verified,
          phone_verified: data.phone_verified,
          user_status: data.user_status,
          current_year_of_study: data.current_year_of_study,
          course_duration: data.course_duration,
          graduating_year: data.graduating_year,
          department: data.department,
          subscription_expiry_date: data.subscription_expiry_date,
          subscription_status: data.subscription_status,
          skills: data.skills,
          bio: data.bio
        };
        setUser(mappedUser);
        return mappedUser;
      } else {
        // In case the trigger hasn't fired yet or row missing
        const defaultUser: User = {
          id: userId,
          email: email,
          role: 'student',
          platform: 'huse',
          tier: 'Bronze',
          verified: false
        };
        setUser(defaultUser);
        return defaultUser;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserProfile(session.user.id, session.user.email || '');
      } else {
        setIsLoading(false);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await fetchUserProfile(session.user.id, session.user.email || '');
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, []);

  const login = async (credentials: { 
    email: string; 
    password?: string; 
    platform: Platform; 
    role?: UserRole 
  }) => {
    setIsLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password || ''
    });

    if (error) {
      setIsLoading(false);
      if (error.message === 'Invalid login credentials') {
        throw new Error('Incorrect password or no password set. Try "Continue with Google" or click "Forgot / Set Password" below.');
      }
      throw error;
    }

    if (data.session) {
      const fetchedUser = await fetchUserProfile(data.user.id, data.user.email || '');
      toast.success('Logged in successfully');
      return fetchedUser || null;
    }
    
    setIsLoading(false);
    return null;
  };

  const signUp = async (credentials: {
    email: string;
    password?: string;
    platform: Platform;
  }) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password || ''
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }

    if (data.session) {
      const fetchedUser = await fetchUserProfile(data.user.id, data.user.email || '');
      toast.success('Account created successfully');
      return fetchedUser || null;
    } else {
      toast.success('Please check your email to verify your account');
    }
    
    setIsLoading(false);
    return null;
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    });

    if (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    }
  };

  const switchPlatform = (platform: Platform) => {
    if (user) {
      const newRole = getUserRoleFromPlatform(platform);
      setUser({ ...user, platform, role: newRole });
      toast.success(`Switched to ${platform.toUpperCase()}`);
    }
  };

  const canAccessFeature = (requiredTier: Tier): boolean => {
    if (!user || !user.tier) return false;
    
    const tierLevels = { Bronze: 0, Silver: 1, Gold: 2, Platinum: 3, Contributor: 4, 'Business Owner': 5 };
    const userLevel = tierLevels[user.tier as keyof typeof tierLevels] || 0;
    const requiredLevel = tierLevels[requiredTier as keyof typeof tierLevels] || 0;
    
    return userLevel >= requiredLevel;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signUp,
    signInWithGoogle,
    logout,
    updateUser,
    switchPlatform,
    canAccessFeature,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper functions
function calculateTier(reputation: number): Tier {
  if (reputation >= 300000) return 'Business Owner';
  if (reputation >= 100000) return 'Contributor';
  if (reputation >= 30000) return 'Platinum';
  if (reputation >= 5000) return 'Gold';
  if (reputation >= 1000) return 'Silver';
  return 'Bronze';
}

function getUserRoleFromPlatform(platform: Platform): UserRole {
  switch (platform) {
    case 'huse': return 'student';
    case 'dofracto': return 'contributor';
    case 'quotify': return 'client';
    case 'recruiter': return 'recruiter';
    default: return 'student';
  }
}

export type { User, UserRole, Platform, Tier };