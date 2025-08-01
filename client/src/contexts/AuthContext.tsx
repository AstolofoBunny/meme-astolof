import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// Demo user for local testing
const createDemoUser = (email: string, displayName: string) => ({
  uid: Math.random().toString(36).substr(2, 9),
  email,
  displayName,
  getIdToken: async () => 'demo-token'
});

export const signInAsDemo = (userType: 'admin' | 'user') => {
  const demoUsers = {
    admin: createDemoUser('admin@example.com', 'Demo Admin'),
    user: createDemoUser('user@example.com', 'Demo User')
  };
  
  const demoUser = demoUsers[userType];
  localStorage.setItem('demoUser', JSON.stringify(demoUser));
  window.location.reload();
};

export const signOutDemo = () => {
  localStorage.removeItem('demoUser');
  window.location.reload();
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo user in localStorage first
    const demoUser = localStorage.getItem('demoUser');
    if (demoUser) {
      const userData = JSON.parse(demoUser);
      setUser(userData);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};