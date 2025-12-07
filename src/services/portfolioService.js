import { getAllUsers, updateUser } from "./authService.js";

export function getPublicPortfolios() {
  const users = getAllUsers();
  return users.filter((u) => u.role === "student");
}

export function getPortfolioById(id) {
  const users = getAllUsers();
  return users.find((u) => u.id === id);
}

export function updateStudentProfile(
  user,
  { name, bio, skills, education, github, linkedin, profileImage, resume }
) {
  const updated = {
    ...user,
    name,
    bio,
    skills,
    education,
    github,
    linkedin,
    profileImage,
    resume,   // NEW FIELD ADDED
  };

  return updateUser(updated);
}

export function updateStudentProjects(user, projects) {
  const updated = { ...user, projects };
  return updateUser(updated);
}