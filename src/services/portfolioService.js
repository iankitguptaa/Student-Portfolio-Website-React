// src/services/portfolioService.js
import { getAllStudents, getUserById } from "./userService.js";

export function getAllPortfolios() {
  return getAllStudents();
}

export function getPortfolioById(id) {
  return getUserById(id);
}
