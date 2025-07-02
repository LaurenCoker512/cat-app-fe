import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AuthFormData, AuthResponse } from "../types/auth";

interface AuthContextType {
  user: null | { email: string; name: string };
  login: (data: AuthFormData) => Promise<AuthResponse>;
  signup: (data: AuthFormData) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | { email: string; name: string }>(
    null
  );

  // Mock login function - replace with actual API call
  const login = async (data: AuthFormData): Promise<AuthResponse> => {
    try {
      // In a real app, you would call your backend here
      console.log("Logging in with:", data);
      setUser({ email: data.email, name: "Cat Owner" });
      return { success: true, message: "Login successful" };
    } catch (error) {
      return { success: false, message: "Login failed" };
    }
  };

  // Mock signup function - replace with actual API call
  const signup = async (data: AuthFormData): Promise<AuthResponse> => {
    try {
      // In a real app, you would call your backend here
      console.log("Signing up with:", data);
      setUser({ email: data.email, name: data.name || "Cat Owner" });
      return { success: true, message: "Signup successful" };
    } catch (error) {
      return { success: false, message: "Signup failed" };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
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
