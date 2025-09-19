'use client';

import { useWizardStore } from '@/lib/stores/wizard-store';
import { supabase } from '@/lib/supabase';
import { extractUserData, authLogger } from '@/lib/utils/auth-helpers';
import { useEffect } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useWizardStore();

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          authLogger.sessionError(error.message);
          return;
        }

        if (session?.user) {
          const userData = extractUserData(session.user);
          authLogger.sessionCheck(userData.id, userData.email);
          setUser(userData);
        }
      } catch (error) {
        authLogger.sessionError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`[AUTH] Auth state changed: ${event}`, session?.user?.id);

        if (event === 'SIGNED_IN' && session?.user) {
          const userData = extractUserData(session.user);
          authLogger.loginSuccess(userData.id, userData.email, 'oauth');
          setUser(userData);
        } else if (event === 'SIGNED_OUT') {
          authLogger.logoutSuccess(user ? user.id : undefined);
          // The reset is handled by the navbar logout function
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, user]);

  return <>{children}</>;
}
