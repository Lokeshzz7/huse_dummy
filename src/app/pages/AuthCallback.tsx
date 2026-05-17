import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function AuthCallback() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');

      const queryParams = new URLSearchParams(window.location.search);
      const q_access_token = queryParams.get('access_token');
      const q_refresh_token = queryParams.get('refresh_token');

      // 1. Check for tokens in Hash (OAuth/Google)
      if (access_token && refresh_token) {
        try {
          console.log('OAuth tokens found, establishing session...');
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) throw error;
        } catch (error: any) {
          console.error('Auth callback error:', error);
          toast.error('Authentication failed: ' + error.message);
          navigate('/husecircle/student/login');
        }
      } 
      // 2. Check for tokens in Query (Magic Link)
      else if (q_access_token && q_refresh_token) {
        try {
          console.log('Magic link tokens found, establishing session...');
          const { error } = await supabase.auth.setSession({ 
            access_token: q_access_token, 
            refresh_token: q_refresh_token 
          });
          if (error) throw error;
        } catch (error: any) {
          toast.error('Magic link error: ' + error.message);
          navigate('/husecircle/student/login');
        }
      } 
      // 3. Handle Errors or missing tokens
      else {
        const errorDescription = params.get('error_description') || queryParams.get('error_description');
        if (errorDescription) {
          toast.error(errorDescription);
          navigate('/husecircle/student/login');
        }
        // If we reach here with no tokens, just wait for onAuthStateChange to potentially pick up an existing session
      }
    };

    handleAuthCallback();
  }, [navigate]);

  // Use a separate effect to wait for the user profile to be loaded by AuthContext
  useEffect(() => {
    if (user) {
      console.log('Auth successful, user loaded:', user.email);
      navigate('/husecircle/onboarding');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white gap-4">
      <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
      <h2 className="text-xl font-medium">Finishing sign-in...</h2>
      <p className="text-gray-400">Please wait while we secure your session.</p>
    </div>
  );
}
