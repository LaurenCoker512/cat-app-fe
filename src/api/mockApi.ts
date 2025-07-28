import type {
  User,
  Cat,
  AuthResponse,
  ApiError,
  HealthLog,
  EnrichmentActivity,
  EnrichmentSuggestion,
} from "./types";

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "cat123",
    avatar: "https://placekitten.com/200/200",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "meowmeow",
    avatar: "https://placekitten.com/200/200",
  },
];

const cats: Cat[] = [
  {
    id: 1,
    name: "Whiskers",
    birthDate: new Date("05/15/2020"),
    breed: "Domestic Shorthair",
    temperament: ["calm", "affectionate"],
    profilePicture:
      "https://images.freeimages.com/images/large-previews/855/adorable-striped-cat-0410-5697589.jpg?fmt=webp&h=350",
  },
  {
    id: 2,
    name: "Mittens",
    birthDate: new Date("12/01/2018"),
    breed: "Siamese",
    temperament: ["wary", "energetic"],
    profilePicture:
      "https://images.freeimages.com/images/premium/previews/1822/18227379-cat.jpg?fmt=webp&h=350",
  },
];

let healthLogs: HealthLog[] = [
  {
    id: 1,
    date: new Date(2023, 10, 15),
    litterBoxHabits: "Normal",
    energyLevel: 4,
    skinCondition: "Healthy",
    notes: "Everything seems normal",
  },
  {
    id: 2,
    date: new Date(2023, 10, 10),
    litterBoxHabits: "Slightly less frequent",
    energyLevel: 3,
    skinCondition: "Healthy",
    notes: "Ate slightly less today",
  },
];

let enrichmentActivities: EnrichmentActivity[] = [
  {
    id: 1,
    name: "Feather Wand",
    description: "Interactive play with feather wand toy",
    lastTried: new Date(2023, 10, 14),
    enjoymentRating: 5,
  },
  {
    id: 2,
    name: "Puzzle Feeder",
    description: "Food dispensing puzzle toy",
    lastTried: new Date(2023, 10, 12),
    enjoymentRating: 4,
  },
];

const enrichmentSuggestions: EnrichmentSuggestion[] = [
  {
    id: 1,
    name: "Cardboard Box Fort",
    description: "Create a small fort with cardboard boxes",
    reason: "Your cat enjoys hiding and exploring small spaces",
  },
  {
    id: 2,
    name: "Window Perch",
    description: "Set up a perch by a window with bird feeder outside",
    reason: "Your cat shows interest in watching birds",
  },
  {
    id: 3,
    name: "Treat Hunt",
    description: "Hide treats around the house for your cat to find",
    reason: "Encourages natural hunting behaviors",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    await delay(500);
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw { message: "Invalid credentials", status: 401 } as ApiError;
    }
    const { password: _pw, ...userWithoutPassword } = user;
    return { token: "mock-token", user: userWithoutPassword };
  },

  async signup(data: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }) {
    await delay(500);
    const { name, email, password, passwordConfirmation } = data;
    if (!name || !email || !password || !passwordConfirmation) {
      throw { message: "All fields are required", status: 400 };
    }
    if (password !== passwordConfirmation) {
      throw { message: "Passwords do not match", status: 400 };
    }
    if (users.find((u) => u.email === email)) {
      throw { message: "Email already registered", status: 409 };
    }
    const newUser = { id: users.length + 1, name, email, password };
    users.push(newUser);
    const { password: _pw, ...userWithoutPassword } = newUser;
    return { token: "mock-token", user: userWithoutPassword };
  },

  async getUser(id: number): Promise<User> {
    await delay(300);
    const user = users.find((u) => u.id === id);
    if (!user) throw { message: "User not found", status: 404 } as ApiError;
    return user;
  },

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    await delay(500);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1)
      throw { message: "User not found", status: 404 } as ApiError;
    users[index] = { ...users[index], ...updates };
    return users[index];
  },

  async getCat(id: number): Promise<Cat> {
    await delay(300);
    const cat = cats.find((u) => u.id === id);
    if (!cat) throw { message: "Cat not found", status: 404 } as ApiError;
    return cat;
  },

  async updateCat(id: number, updates: Partial<Cat>): Promise<Cat> {
    await delay(500);
    const index = cats.findIndex((u) => u.id === id);
    if (index === -1)
      throw { message: "Cat not found", status: 404 } as ApiError;
    cats[index] = { ...cats[index], ...updates };
    return cats[index];
  },

  async getHealthLogs(catId: number): Promise<HealthLog[]> {
    await delay(200);
    return healthLogs;
  },
  async addHealthLog(
    catId: number,
    log: Omit<HealthLog, "id">
  ): Promise<HealthLog> {
    await delay(200);
    const newLog = { ...log, id: healthLogs.length + 1 };
    healthLogs = [newLog, ...healthLogs];
    return newLog;
  },

  async getEnrichmentActivities(catId: number): Promise<EnrichmentActivity[]> {
    await delay(200);
    return enrichmentActivities;
  },
  async addEnrichmentActivity(
    catId: number,
    activity: Omit<EnrichmentActivity, "id">
  ): Promise<EnrichmentActivity> {
    await delay(200);
    const newActivity = { ...activity, id: enrichmentActivities.length + 1 };
    enrichmentActivities = [newActivity, ...enrichmentActivities];
    return newActivity;
  },

  async getEnrichmentSuggestions(
    catId: number
  ): Promise<EnrichmentSuggestion[]> {
    await delay(200);
    return enrichmentSuggestions;
  },
};
