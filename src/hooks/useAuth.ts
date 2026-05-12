import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import type { User } from '@/types';

export function useAuth() {
  const { setUser, logout } = useAppStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsReady(true);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          logout();
          setIsReady(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setUser(data as User);
    }
    setIsReady(true);
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }

  async function signUp(email: string, password: string, displayName: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });
    return { error };
  }

  async function signOut() {
    await supabase.auth.signOut();
    logout();
  }

  return { signIn, signUp, signOut, isReady };
}
