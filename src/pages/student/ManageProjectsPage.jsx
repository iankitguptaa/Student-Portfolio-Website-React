import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { updateStudentProjects } from "../../services/portfolioService.js";

export default function ManageProjectsPage() {
  const { user, login } = useAuth();
  const [projects, setProjects] = useState(user.projects || []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addProject = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProjects = [...projects, { title, description }];
    const updated = updateStudentProjects(user, newProjects);

    setProjects(newProjects);
    login(updated);
    setTitle("");
    setDescription("");
  };

  const removeProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    const updated = updateStudentProjects(user, newProjects);
    setProjects(newProjects);
    login(updated);
  };

  return (
    <div>
      <div className="card auth-card">
        <h2 className="page-title">Manage projects</h2>
        <p className="page-subtitle">
          Add the projects you are proud of. These will show up on your public portfolio.
        </p>

        <form onSubmit={addProject} className="mt-md">
          <input
            className="input"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="input"
            rows={3}
            placeholder="Short description (what it does, tech used, your role)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Add project
          </button>
        </form>
      </div>

      <div className="card">
        <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Your projects</h3>
        {projects.length === 0 ? (
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
            No projects yet. Add your first project above.
          </p>
        ) : (
          <ul style={{ paddingLeft: "1rem" }}>
            {projects.map((p, idx) => (
              <li key={idx} style={{ marginBottom: "0.7rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 550 }}>{p.title}</div>
                    <div
                      style={{
                        fontSize: "0.87rem",
                        color: "#cbd5f5",
                        marginTop: "0.15rem",
                      }}
                    >
                      {p.description}
                    </div>
                  </div>
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={() => removeProject(idx)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
