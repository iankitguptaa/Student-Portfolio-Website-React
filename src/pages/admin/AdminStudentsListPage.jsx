import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/authService.js";

export default function AdminStudentsListPage() {
  const users = getAllUsers();
  const students = users.filter((u) => u.role === "student");

  return (
    <div className="card">
      <h2 className="page-title">All students</h2>
      <p className="page-subtitle">
        View all registered students and get a sense of their skills at a glance.
      </p>

      {students.length === 0 ? (
        <p style={{ marginTop: "0.8rem", color: "#9ca3af" }}>No students yet.</p>
      ) : (
        <div style={{ marginTop: "0.9rem", overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Name</th>
                <th style={{ textAlign: "left" }}>Email</th>
                <th style={{ textAlign: "left" }}>College</th>
                <th style={{ textAlign: "left" }}>Skills</th>
                <th style={{ textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.education?.institution || "-"}</td>
                  <td>{s.skills?.length ? s.skills.join(", ") : "Not added"}</td>
                  <td>
                    <Link to={`/admin/student/${s.id}`}>
                      <button className="btn btn-secondary">View Profile</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}