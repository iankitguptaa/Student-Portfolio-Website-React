import { getAllUsers } from "../../services/authService.js";

export default function AdminDashboardPage() {
  const users = getAllUsers();
  const studentsCount = users.filter((u) => u.role === "student").length;
  const adminsCount = users.filter((u) => u.role === "admin").length;

  return (
    <div>
      <div className="card">
        <h2 className="page-title">Admin dashboard</h2>
        <p className="page-subtitle">
          Get a quick snapshot of how many students are using the portfolio platform.
        </p>

        <div className="mt-md" style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
          <div className="chip chip-accent">
            <strong style={{ marginRight: "0.25rem" }}>{users.length}</strong> total
            users
          </div>
          <div className="chip">
            <strong style={{ marginRight: "0.25rem" }}>{studentsCount}</strong> students
          </div>
          <div className="chip">
            <strong style={{ marginRight: "0.25rem" }}>{adminsCount}</strong> admins
          </div>
        </div>
      </div>
    </div>
  );
}