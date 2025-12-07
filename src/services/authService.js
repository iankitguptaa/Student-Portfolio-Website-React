// src/services/authService.js

const USERS_KEY = "spp_users";
const CURRENT_USER_KEY = "spp_current_user";

function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signup({ name, email, password, role }) {
  const users = loadUsers();

  // Email already registered
  if (users.some((u) => u.email === email)) {
    throw new Error("Email already registered");
  }

  // Only 1 admin allowed
  if (role === "admin") {
    const existingAdmin = users.find((u) => u.role === "admin");
    if (existingAdmin) {
      throw new Error("Admin already exists");
    }
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role,
    bio: "",
    skills: [],
    education: { degree: "", institution: "", graduationYear: "" },
    github: "",
    linkedin: "",
    profileImage: "",
    resume: "",
    projects: [],
  };

  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  return newUser;
}

export function login({ email, password }) {
  const users = loadUsers();
  const found = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!found) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
  return found;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser() {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
}
