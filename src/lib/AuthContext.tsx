import React, { useContext, createContext, useState } from 'react';

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
