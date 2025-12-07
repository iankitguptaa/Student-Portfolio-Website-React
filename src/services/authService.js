import { saveToStorage, getFromStorage, removeFromStorage } from "../utils/storage.js";

const USERS_KEY = "spp_users";
const CURRENT_USER_KEY = "spp_current_user";

// FINAL VERSION - ONLY STUDENT SIGNUP ALLOWED
export function signup({ name, email, password }) {
  const users = getFromStorage(USERS_KEY, []);

  if (users.find((u) => u.email === email)) {
    throw new Error("Email already registered");
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role: "student",  // ALWAYS STUDENT
    bio: "",
    skills: [],
    projects: [],
    education: { degree: "", institution: "", graduationYear: "" },
    github: "",
    linkedin: "",
    profileImage: "",
    resume: "",
    achievements: [],
  };

  users.push(newUser);
  saveToStorage(USERS_KEY, users);
  saveToStorage(CURRENT_USER_KEY, newUser);
  return newUser;
}

// LOGIN
export function login({ email, password }) {
  const users = getFromStorage(USERS_KEY, []);
  const found = users.find((u) => u.email === email && u.password === password);

  if (!found) {
    throw new Error("Invalid email or password");
  }

  saveToStorage(CURRENT_USER_KEY, found);
  return found;
}

export function logout() {
  removeFromStorage(CURRENT_USER_KEY);
}

export function getCurrentUser() {
  return getFromStorage(CURRENT_USER_KEY, null);
}

export function getAllUsers() {
  return getFromStorage(USERS_KEY, []);
}

export function updateUser(updatedUser) {
  const users = getFromStorage(USERS_KEY, []);
  const index = users.findIndex((u) => u.id === updatedUser.id);

  if (index !== -1) {
    users[index] = updatedUser;
    saveToStorage(USERS_KEY, users);
    saveToStorage(CURRENT_USER_KEY, updatedUser);
  }

  return updatedUser;
}
