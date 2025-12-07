import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const projectsCount = user.projects?.length || 0;
  const skillsCount = user.skills?.length || 0;

  return (
    <div>
      <div className="card">
        <h2 className="page-title">Hi, {user.name}</h2>
        <p className="page-subtitle">
          Manage your public profile, projects and skills from this dashboard.
        </p>

        <div className="flex-row mt-md">
          <Link to="/student/edit-profile">
            <button className="btn btn-secondary">Edit profile</button>
          </Link>
          <Link to="/student/projects">
            <button className="btn btn-secondary">Manage projects</button>
          </Link>
        </div>

        <div className="mt-md" style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
          <div className="chip chip-accent">
            <strong style={{ marginRight: "0.25rem" }}>{skillsCount}</strong> skills
          </div>
          <div className="chip">
            <strong style={{ marginRight: "0.25rem" }}>{projectsCount}</strong> projects
          </div>
        </div>
      </div>

      <div className="card">
        <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
          Your portfolio appears on the <strong>Explore</strong> page. When you update
          your profile or projects, visitors will see the latest version instantly.
        </p>
      </div>
    </div>
  );
}
