export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // For mock purposes only
}

export interface Cat {
  id: number;
  name: string;
  birthDate: Date;
  breed: string;
  temperament: string[];
  profilePicture: string;
}

export interface HealthLog {
  id: number;
  date: Date;
  litterBoxHabits: string;
  energyLevel: number;
  skinCondition: string;
  notes: string;
}

export interface EnrichmentActivity {
  id: number;
  name: string;
  description: string;
  lastTried?: Date;
  enjoymentRating?: number;
}

export interface EnrichmentSuggestion {
  id: number;
  name: string;
  description: string;
  reason: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status?: number;
}
