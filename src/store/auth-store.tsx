import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthUser, UserRole } from '@/types/erp';

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

const demoCredentials: Record<UserRole, { email: string; password: string; name: string }> = {
  admin: { email: 'admin@erp.com', password: 'admin123', name: 'System Administrator' },
  crm: { email: 'crm@erp.com', password: 'crm123', name: 'CRM Manager' },
  selling: { email: 'selling@erp.com', password: 'selling123', name: 'Sales Manager' },
  buying: { email: 'buying@erp.com', password: 'buying123', name: 'Procurement Officer' },
  project: { email: 'project@erp.com', password: 'project123', name: 'Project Manager' },
  service: { email: 'service@erp.com', password: 'service123', name: 'Service Manager' },
  distribution: { email: 'distribution@erp.com', password: 'dist123', name: 'Distribution Manager' },
  hr: { email: 'hr@erp.com', password: 'hr123', name: 'HR Director' },
  manufacturing: { email: 'manufacturing@erp.com', password: 'mfg123', name: 'Manufacturing Lead' },
  accounts: { email: 'accounts@erp.com', password: 'acc123', name: 'Finance Manager' },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((email: string, password: string, role: UserRole): boolean => {
    const creds = demoCredentials[role];
    if (creds && creds.email === email && creds.password === password) {
      setUser({ email, name: creds.name, role });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
