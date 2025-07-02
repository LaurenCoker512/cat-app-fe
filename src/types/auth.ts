export interface AuthFormData {
  email: string;
  password: string;
  name?: string; // Only for signup
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
}
