// src/pages/admin/AdminDashboardPage.jsx
import { getAllUsers } from "../../services/userService.js";

export default function AdminDashboardPage() {
  const users = getAllUsers();
  const students = users.filter((u) => u.role === "student").length;
  const admins = users.filter((u) => u.role === "admin").length;

  return (
    <div className="card">
      <h2 className="page-title">Admin Dashboard</h2>
      <p className="page-subtitle">Overview of users on the platform.</p>

      <div className="flex-row mt-md">
        <div className="chip chip-accent">
          <strong>{users.length}</strong>&nbsp; total users
        </div>
        <div className="chip">
          <strong>{students}</strong>&nbsp; students
        </div>
        <div className="chip">
          <strong>{admins}</strong>&nbsp; admins
        </div>
      </div>
    </div>
  );
}
