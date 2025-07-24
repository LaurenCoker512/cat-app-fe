import { apiClient } from "./client";
import { mockApi } from "./mockApi";
import type {
  User,
  Cat,
  AuthResponse,
  HealthLog,
  EnrichmentActivity,
  EnrichmentSuggestion,
  SignupRequest,
} from "./types";

export interface ApiService {
  login(email: string, password: string): Promise<AuthResponse>;
  signup(data: SignupRequest): Promise<AuthResponse>;
  getUser(id: number): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  getCat(id: number): Promise<Cat>;
  updateCat(id: number, updates: Partial<Cat>): Promise<Cat>;

  getHealthLogs(catId: number): Promise<HealthLog[]>;
  addHealthLog(catId: number, log: Omit<HealthLog, "id">): Promise<HealthLog>;

  getEnrichmentActivities(catId: number): Promise<EnrichmentActivity[]>;
  addEnrichmentActivity(
    catId: number,
    activity: Omit<EnrichmentActivity, "id">
  ): Promise<EnrichmentActivity>;

  getEnrichmentSuggestions(catId: number): Promise<EnrichmentSuggestion[]>;
}

export const api: ApiService =
  import.meta.env.VITE_USE_MOCK_API === "true" ? mockApi : apiClient;
