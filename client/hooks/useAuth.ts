import { useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "candidate" | "admin";
  statistics?: {
    totalSessions: number;
    averageScore: number;
    currentStreak: number;
    bestStreak: number;
    experiencePoints: number;
  };
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  tokens: AuthTokens | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const stored = localStorage.getItem("auth_tokens");
      if (stored) {
        try {
          setTokens(JSON.parse(stored));
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem("auth_tokens");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Login failed");

      const data = (await response.json()) as AuthContextType;
      const newTokens = data.tokens as unknown as AuthTokens;
      setTokens(newTokens);
      setUser(data.user as User);
      setIsAuthenticated(true);
      localStorage.setItem("auth_tokens", JSON.stringify(newTokens));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, provider: "email" }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Registration failed");

      const result = (await response.json()) as AuthContextType;
      const newTokens = result.tokens as unknown as AuthTokens;
      setTokens(newTokens);
      setUser(result.user as User);
      setIsAuthenticated(true);
      localStorage.setItem("auth_tokens", JSON.stringify(newTokens));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setTokens(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_tokens");
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Token refresh failed");

      const newTokens = (await response.json()) as AuthTokens;
      setTokens(newTokens);
      localStorage.setItem("auth_tokens", JSON.stringify(newTokens));
    } catch {
      await logout();
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    tokens,
    login,
    register,
    logout,
    refreshToken,
  };
};
