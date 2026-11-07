"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { PublicUserProfile, ReviewRecord } from "@/lib/db";

interface AuthContextValue {
  user: PublicUserProfile | null;
  ownReviews: ReviewRecord[];
  loading: boolean;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  ownReviews: [],
  loading: true,
  refreshAuth: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUserProfile | null>(null);
  const [ownReviews, setOwnReviews] = useState<ReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
        setOwnReviews(data.reviews || []);
      } else {
        setUser(null);
        setOwnReviews([]);
      }
    } catch {
      setUser(null);
      setOwnReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOwnReviews([]);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, ownReviews, loading, refreshAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
