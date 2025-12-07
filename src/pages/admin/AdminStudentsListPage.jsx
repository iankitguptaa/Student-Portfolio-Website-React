// src/pages/admin/AdminStudentsListPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllStudents } from "../../services/userService.js";

export default function AdminStudentsListPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getAllStudents());
  }, []);

  return (
    <div className="card">
      <h2 className="page-title">All Students</h2>

      {students.length === 0 ? (
        <p className="muted-text">No students registered yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">Email</th>
                <th align="left">Institution</th>
                <th align="left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.education?.institution || "-"}</td>
                  <td>
                    <Link to={`/admin/student/${s.id}`}>
                      <button className="btn btn-secondary btn-sm">
                        View
                      </button>
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
