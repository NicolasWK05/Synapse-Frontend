import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const KEY = 'session';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null); // { token, userId, username }
  const [loading, setLoading] = useState(true);

  // Restore a saved login when the app starts.
  useEffect(() => {
    (async () => {
      try {
        const saved = await SecureStore.getItemAsync(KEY);
        if (saved) setSession(JSON.parse(saved));
      } catch {
        // ignore: treat as logged out
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = useCallback(async (next) => {
    setSession(next);
    try {
      await SecureStore.setItemAsync(KEY, JSON.stringify(next));
    } catch {
      // session still works for this run even if saving fails
    }
  }, []);

  const signOut = useCallback(async () => {
    setSession(null);
    try {
      await SecureStore.deleteItemAsync(KEY);
    } catch {}
  }, []);

  const value = useMemo(() => ({ session, loading, signIn, signOut }), [session, loading, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
