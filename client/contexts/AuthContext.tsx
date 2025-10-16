// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  [key: string]: any;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 👇 Use your backend URL from .env or fallback to localhost
const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) restoreSession();
    else setIsLoading(false);
  }, []);

  /** Restore user session if token exists */
  const restoreSession = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const url = `${API_BASE}/api/auth/me`;
      console.log("Restoring session from:", url);

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Session restore failed");

      const data = await response.json();
      setUser(data.data || data.user || data);
    } catch (error) {
      console.error("❌ Failed to restore session:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  /** User login */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const url = `${API_BASE}/api/auth/login`;
    console.log("Attempting login at:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Handle fetch failures before reading body
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Login failed [${response.status}]: ${text}`);
      }

      const data = await response.json();
      const { accessToken, refreshToken, user: userData } = data.data || data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(userData);
      console.log("✅ Login successful:", userData);
    } catch (error: any) {
      console.error("❌ Login error:", error.message || error);
      alert("Login failed. Check network, backend URL, or CORS settings.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /** User registration */
  const register = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) => {
    setIsLoading(true);
    const url = `${API_BASE}/api/auth/register`;
    console.log("Attempting registration at:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Registration failed [${response.status}]: ${text}`);
      }

      const data = await response.json();
      const { accessToken, refreshToken, user: userData } = data.data || data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(userData);
      console.log("✅ Registration successful:", userData);
    } catch (error: any) {
      console.error("❌ Registration error:", error.message || error);
      alert("Registration failed. Please verify your backend is running and accessible.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /** Logout user */
  const logout = () => {
    console.log("🔒 Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  /** Update user profile locally */
  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) setUser({ ...user, ...profile });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Hook to use auth context */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
