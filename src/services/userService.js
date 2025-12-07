// src/services/userService.js
const USERS_KEY = "spp_users";
const CURRENT_USER_KEY = "spp_current_user";

function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getAllUsers() {
  return loadUsers();
}

export function getAllStudents() {
  return loadUsers().filter((u) => u.role === "student");
}

export function getUserById(id) {
  return loadUsers().find((u) => u.id === id) || null;
}

export function updateUser(updatedUser) {
  const users = loadUsers();
  const index = users.findIndex((u) => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  }
  return updatedUser;
}
