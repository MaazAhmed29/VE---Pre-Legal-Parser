"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const VALID_CREDENTIALS = [
  { email: "admin@prelegal.com", password: "admin123" },
  { email: "demo@prelegal.com", password: "demo123" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("prelegal_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("prelegal_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const match = VALID_CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    );
    if (match) {
      const u = { email: match.email };
      setUser(u);
      localStorage.setItem("prelegal_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    const exists = VALID_CREDENTIALS.find((c) => c.email === email);
    if (exists) return false;
    const u = { email };
    setUser(u);
    localStorage.setItem("prelegal_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("prelegal_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
