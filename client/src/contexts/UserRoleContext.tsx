import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface UserRoleContextType {
  userRole: 'user' | 'admin' | null;
  isAdmin: boolean;
  loading: boolean;
}

const UserRoleContext = createContext<UserRoleContextType>({ 
  userRole: null, 
  isAdmin: false, 
  loading: true 
});

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user || authLoading) {
        setUserRole(null);
        setLoading(authLoading);
        return;
      }

      // Handle demo users
      if (user.email === 'admin@example.com') {
        setUserRole('admin');
        setLoading(false);
        return;
      } else if (user.email === 'user@example.com') {
        setUserRole('user');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/role', {
          headers: {
            'Authorization': `Bearer ${await user.getIdToken()}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role || 'user');
        } else {
          // If user doesn't exist in our database, create them with default role
          const createResponse = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${await user.getIdToken()}`
            },
            body: JSON.stringify({
              email: user.email,
              displayName: user.displayName,
              role: 'user'
            })
          });
          
          if (createResponse.ok) {
            setUserRole('user');
          }
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setUserRole('user'); // Default to user role on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user, authLoading]);

  const isAdmin = userRole === 'admin';

  return (
    <UserRoleContext.Provider value={{ userRole, isAdmin, loading }}>
      {children}
    </UserRoleContext.Provider>
  );
};