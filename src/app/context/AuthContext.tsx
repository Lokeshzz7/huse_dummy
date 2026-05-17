import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';
import { apiGet, apiPost, apiPostPublic } from '../../lib/api';

type UserRole = 'student' | 'contributor' | 'recruiter' | 'business' | 'client' | 'provider' | 'admin' | 'superadmin';
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
  onboarding_step?: 'complete_profile' | 'verify_phone' | 'upload_doc' | 'profile_setup' | 'pending_review' | 'reupload_doc' | 'done';
  verification_status?: string;
  linkedin_url?: string | null;
  github_url?: string | null;
  twitter_url?: string | null;
  website_url?: string | null;
  resume_url?: string | null;
  subscription_expiry_date?: string | null;
  subscription_status?: string | null;
  // Academic Fields
  degree_program_id?: string;
  department?: string | null;
  current_year_of_study?: number | null;
  joining_year?: number | null;
  ug_pg?: 'UG' | 'PG' | null;
  dob?: string | null;
  graduating_year?: number | null;
  mobile?: string | null;
  // Additional fields based on role
  handle?: string | null;
  course_duration?: number | null;
  skills?: string[] | null;
  bio?: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password?: string; platform: Platform; role?: UserRole }) => Promise<User | null>;
  signUp: (credentials: { email: string; password?: string; platform: Platform; role?: UserRole; name?: string }) => Promise<User | null>;
  signInWithGoogle: () => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
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

  const fetchPromiseRef = useRef<Promise<User | null> | null>(null);
  const isManualAuthRef = useRef(false);

  const fetchUserProfile = async (userId: string, email: string, token?: string): Promise<User | null> => {
    console.log(`[Auth] fetchUserProfile starting for ${userId}. Token provided: ${!!token}`);
    // If we have a token, we force a refresh to avoid race conditions during login
    if (token) {
      fetchPromiseRef.current = null;
    }
    
    if (fetchPromiseRef.current) return fetchPromiseRef.current;

    const promise = (async () => {
      setIsLoading(true);
      
      try {
        console.log(`[Auth] Calling /auth/me...`);
        // 1. Fetch main profile from backend
        const backendUser = await apiGet<any>('/auth/me', token);
        console.log(`[Auth] /auth/me success:`, backendUser?.email);
        
        console.log(`[Auth] Calling Supabase users table...`);
        // 2. Fetch academic fields from Supabase (secondary read for persistence)
        const { data: supabaseData } = await supabase
          .from('users')
          .select('avatar_style, college_id, college_name, department, current_year_of_study, joining_year, ug_pg, dob, mobile, degree_program_id')
          .eq('id', userId)
          .single();
        
        // Recover step from LocalStorage if backend is lagging
        const localStep = localStorage.getItem(`onboarding_step_${userId}`);

        if (backendUser) {
          const mappedUser: User = {
            ...supabaseData,
            id: backendUser.id,
            name: backendUser.name,
            email: backendUser.email || email,
            avatar_style: supabaseData?.avatar_style,
            avatar: supabaseData?.avatar_style ? `https://api.dicebear.com/9.x/${supabaseData.avatar_style}/svg?seed=${backendUser.id}` : '🎓',
            role: backendUser.role as UserRole || 'student',
            platform: 'huse',
            tier: calculateTier(backendUser.reputation || 0),
            reputation: backendUser.reputation || 0,
            college_name: backendUser.college_name,
            college_id: backendUser.college_id,
            verified: backendUser.verified,
            phone_verified: backendUser.mobile_verified, // Map from backend
            user_status: backendUser.user_status,
            onboarding_step: (localStep as any) || backendUser.onboarding_step,
            verification_status: backendUser.verification_status,
            linkedin_url: backendUser.linkedin_url,
            github_url: backendUser.github_url,
            twitter_url: backendUser.twitter_url,
            website_url: backendUser.website_url,
            resume_url: backendUser.resume_url,
            current_year_of_study: backendUser.current_year_of_study,
            course_duration: backendUser.course_duration,
            graduating_year: backendUser.graduating_year,
            department: backendUser.department,
            subscription_expiry_date: backendUser.subscription_expiry_date,
            subscription_status: backendUser.subscription_status,
            skills: backendUser.skills,
            bio: backendUser.bio,
            mobile: backendUser.mobile
          };
          setUser(mappedUser);
          return mappedUser;
        } else {
          // Fallback if backend returns success but no data (unlikely with our apiGet)
          return null;
        }
      } catch (e) {
        console.error('Error fetching profile from backend:', e);
        // If /auth/me fails, we might still have a partial user from session
        return null;
      } finally {
        fetchPromiseRef.current = null;
        setIsLoading(false);
      }
    })();

    fetchPromiseRef.current = promise;
    return promise;
  };

  const userIdRef = useRef<string | null>(null);
  
  useEffect(() => {
    userIdRef.current = user?.id || null;
  }, [user?.id]);

  useEffect(() => {
    let authListenerSubscription: any;

    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserProfile(session.user.id, session.user.email || '');
      } else {
        setIsLoading(false);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log(`[Auth] Event: ${event}`);
        if (event === 'SIGNED_IN' && session) {
          // SKIP background fetch if we are in the middle of a manual login/signup
          if (isManualAuthRef.current) {
            console.log(`[Auth] Skipping background fetch during manual auth`);
            return;
          }
          
          if (userIdRef.current !== session.user.id) {
            console.log(`[Auth] Triggering background fetch for ${session.user.id}`);
            await fetchUserProfile(session.user.id, session.user.email || '');
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsLoading(false);
        }
      });

      authListenerSubscription = authListener.subscription;
    };

    initializeAuth();

    return () => {
      if (authListenerSubscription) {
        authListenerSubscription.unsubscribe();
      }
    };
  }, []);

  const login = async (credentials: { 
    email: string; 
    password?: string; 
    platform: Platform; 
    role?: UserRole 
  }) => {
    setIsLoading(true);
    isManualAuthRef.current = true;
    try {
      console.log(`[Auth] Manual login starting...`);
      const response = await apiPostPublic<any>('/auth/login', {
        email: credentials.email,
        password: credentials.password || ''
      });

      const { access_token, refresh_token, user: backendUser } = response;

      // Establish local session (non-blocking to prevent hangs)
      console.log(`[Auth] Establishing Supabase session...`);
      supabase.auth.setSession({ access_token, refresh_token }).catch(err => {
        console.error('[Auth] setSession background error:', err);
      });

      return await fetchUserProfile(backendUser.id, backendUser.email, access_token);
    } catch (error: any) {
      const message = error.message === 'Invalid login credentials' 
        ? 'Incorrect password or no password set. Try "Continue with Google" or click "Forgot / Set Password" below.'
        : error.message;
      throw new Error(message);
    } finally {
      setIsLoading(false);
      isManualAuthRef.current = false;
      console.log(`[Auth] Manual login process finished.`);
    }
  };

  const signUp = async (credentials: {
    email: string;
    password?: string;
    platform: Platform;
    role?: UserRole;
    name?: string;
  }) => {
    setIsLoading(true);
    isManualAuthRef.current = true;
    try {
      console.log(`[Auth] Manual signup starting...`);
      // 1. Signup via backend
      await apiPostPublic('/auth/signup', {
        email: credentials.email,
        password: credentials.password || '',
        name: credentials.name,
        role: credentials.role || 'student'
      });

      // 2. Login immediately to get tokens
      const response = await apiPostPublic<any>('/auth/login', {
        email: credentials.email,
        password: credentials.password || ''
      });

      const { access_token, refresh_token, user: backendUser } = response;
      
      // Establish local session (non-blocking)
      console.log(`[Auth] Establishing Supabase session...`);
      supabase.auth.setSession({ access_token, refresh_token }).catch(err => {
        console.error('[Auth] setSession background error:', err);
      });

      return await fetchUserProfile(backendUser.id, backendUser.email, access_token);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
      isManualAuthRef.current = false;
      console.log(`[Auth] Manual signup process finished.`);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth/callback',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const sendMagicLink = async (email: string) => {
    setIsLoading(true);
    try {
      await apiPostPublic('/auth/magic-link', { 
        email, 
        redirect_to: window.location.origin + '/auth/callback' 
      });
      toast.success('Check your inbox for the magic link!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiPost('/auth/logout', {});
    } catch (e) {
      console.error('Logout error on backend:', e);
    }
    await supabase.auth.signOut();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      
      // Persist onboarding step to LocalStorage as a backup
      if (updates.onboarding_step) {
        localStorage.setItem(`onboarding_step_${prev.id}`, updates.onboarding_step);
      }
      
      return updated;
    });
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
    sendMagicLink,
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