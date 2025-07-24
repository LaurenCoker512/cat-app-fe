import type {
  User,
  Cat,
  AuthResponse,
  ApiError,
  HealthLog,
  EnrichmentActivity,
  EnrichmentSuggestion,
} from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const apiClient = {
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      const error: ApiError = {
        message: response.statusText,
        status: response.status,
      };
      throw error;
    }

    return response.json();
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async signup(data: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`);
  },

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  async getCat(id: number): Promise<Cat> {
    return this.request<Cat>(`/cats/${id}`);
  },

  async updateCat(id: number, updates: Partial<Cat>): Promise<Cat> {
    return this.request<Cat>(`/cats/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  async getHealthLogs(catId: number): Promise<HealthLog[]> {
    return this.request<HealthLog[]>(`/cats/${catId}/healthLogs`);
  },
  async addHealthLog(
    catId: number,
    log: Omit<HealthLog, "id">
  ): Promise<HealthLog> {
    return this.request<HealthLog>(`/cats/${catId}/healthLogs`, {
      method: "POST",
      body: JSON.stringify(log),
    });
  },

  async getEnrichmentActivities(catId: number): Promise<EnrichmentActivity[]> {
    return this.request<EnrichmentActivity[]>(
      `/cats/${catId}/enrichmentActivities`
    );
  },
  async addEnrichmentActivity(
    catId: number,
    activity: Omit<EnrichmentActivity, "id">
  ): Promise<EnrichmentActivity> {
    return this.request<EnrichmentActivity>(
      `/cats/${catId}/enrichmentActivities`,
      {
        method: "POST",
        body: JSON.stringify(activity),
      }
    );
  },

  async getEnrichmentSuggestions(
    catId: number
  ): Promise<EnrichmentSuggestion[]> {
    return this.request<EnrichmentSuggestion[]>(
      `/cats/${catId}/enrichmentSuggestions`
    );
  },
};
