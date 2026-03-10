"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AppRole = "client" | "provider" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: AppRole;
}

interface AuthContextType {
  user: AuthUser | null;
  role: AppRole | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: AppRole) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development (before Laravel API is ready)
const MOCK_USERS: (AuthUser & { password: string })[] = [
  { id: "1", email: "client@test.ge", password: "password", name: "ტესტ კლიენტი", role: "client" },
  { id: "2", email: "provider@test.ge", password: "password", name: "ტესტ პროვაიდერი", role: "provider" },
  { id: "3", email: "admin@test.ge", password: "password", name: "ადმინი", role: "admin" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage on mount
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("auth_user");
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    // TODO: Replace with Laravel API call: POST /api/auth/login
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!found) return { error: "ელ-ფოსტა ან პაროლი არასწორია" };
    const { password: _, ...authUser } = found;
    setUser(authUser);
    localStorage.setItem("auth_user", JSON.stringify(authUser));
    return { error: null };
  };

  const signUp = async (
    email: string,
    _password: string,
    fullName: string,
    role: AppRole
  ): Promise<{ error: string | null }> => {
    // TODO: Replace with Laravel API call: POST /api/auth/register
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) return { error: "ეს ელ-ფოსტა უკვე გამოყენებულია" };
    const newUser: AuthUser = {
      id: Date.now().toString(),
      email,
      name: fullName,
      role,
    };
    setUser(newUser);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
    return { error: null };
  };

  const signOut = async () => {
    // TODO: Replace with Laravel API call: POST /api/auth/logout
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  const resetPassword = async (email: string): Promise<{ error: string | null }> => {
    // TODO: Replace with Laravel API call: POST /api/auth/forgot-password
    const exists = MOCK_USERS.find(u => u.email === email);
    if (!exists) return { error: "ამ ელ-ფოსტით მომხმარებელი ვერ მოიძებნა" };
    return { error: null };
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role ?? null, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
