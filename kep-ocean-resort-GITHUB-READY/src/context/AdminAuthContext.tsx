import { createContext, useContext, useState, type ReactNode } from 'react';

// DEMO AUTHENTICATION ONLY.
// This is a client-side mock for demonstration purposes and is NOT secure.
// A production build must replace this with a real authentication service
// (session/JWT issued by a backend, password hashing, etc.).
const DEMO_EMAIL = 'admin@kepoceanresort.com';
const DEMO_PASSWORD = 'demo123';

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  adminName: string;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem('kor_demo_admin_auth') === 'true'
  );

  const login = (email: string, password: string) => {
    const ok = email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
    if (ok) {
      sessionStorage.setItem('kor_demo_admin_auth', 'true');
      setIsAuthenticated(true);
    }
    return ok;
  };

  const logout = () => {
    sessionStorage.removeItem('kor_demo_admin_auth');
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminName: 'Resort Manager', login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
