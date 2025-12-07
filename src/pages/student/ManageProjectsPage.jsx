// src/pages/student/ManageProjectsPage.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { updateUser } from "../../services/userService.js";

export default function ManageProjectsPage() {
  const { currentUser, setCurrentUser } = useAuth();
  const [projects, setProjects] = useState(currentUser?.projects || []);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const updatedProjects = [
      ...projects,
      { id: Date.now().toString(), title, description: desc },
    ];
    setProjects(updatedProjects);

    const updatedUser = { ...currentUser, projects: updatedProjects };
    updateUser(updatedUser);
    setCurrentUser(updatedUser);

    setTitle("");
    setDesc("");
  };

  const handleRemove = (id) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);
    const updatedUser = { ...currentUser, projects: updatedProjects };
    updateUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  return (
    <div>
      <div className="card auth-card">
        <h2 className="page-title">Manage Projects</h2>

        <form onSubmit={handleAdd} className="mt-md">
          <input
            className="input"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="input"
            rows={3}
            placeholder="Project description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Add project
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Your projects</h3>
        {projects.length === 0 ? (
          <p className="muted-text">No projects added yet.</p>
        ) : (
          <ul className="project-list">
            {projects.map((p) => (
              <li key={p.id} className="project-item">
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.description}</p>
                </div>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => handleRemove(p.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
