import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthFormData, AuthResponse } from "../types/auth";

interface AuthContextType {
  user: null | { email: string; name: string };
  token: string | null;
  login: (data: AuthFormData) => Promise<AuthResponse>;
  signup: (
    data: AuthFormData & { passwordConfirmation: string }
  ) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | { email: string; name: string }>(
    () => {
      const stored = localStorage.getItem("authUser");
      return stored ? JSON.parse(stored) : null;
    }
  );
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("authToken");
  });

  // Keep state in sync with localStorage if it changes elsewhere
  useEffect(() => {
    const handleStorage = () => {
      setUser(() => {
        const stored = localStorage.getItem("authUser");
        return stored ? JSON.parse(stored) : null;
      });
      setToken(localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = async (data: AuthFormData): Promise<AuthResponse> => {
    try {
      // Call your backend or mock API here
      const response = await import("../api").then((mod) =>
        mod.api.login(data.email, data.password)
      );
      if (response.token && response.user) {
        setUser({ email: response.user.email, name: response.user.name });
        setToken(response.token);
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("authUser", JSON.stringify(response.user));
        return {
          success: true,
          message: "Login successful",
          token: response.token,
        };
      } else {
        return { success: false, message: "Login failed" };
      }
    } catch (error: any) {
      return { success: false, message: error?.message || "Login failed" };
    }
  };

  const signup = async (
    data: AuthFormData & { passwordConfirmation: string }
  ): Promise<AuthResponse> => {
    try {
      const response = await import("../api").then((mod) =>
        mod.api.signup({
          name: data.name || "",
          email: data.email,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        })
      );
      if (response.token && response.user) {
        setUser({ email: response.user.email, name: response.user.name });
        setToken(response.token);
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("authUser", JSON.stringify(response.user));
        return {
          success: true,
          message: "Signup successful",
          token: response.token,
        };
      } else {
        return { success: false, message: response.message || "Signup failed" };
      }
    } catch (error: any) {
      return { success: false, message: error?.message || "Signup failed" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
