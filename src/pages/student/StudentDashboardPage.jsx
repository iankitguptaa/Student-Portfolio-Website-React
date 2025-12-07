// src/pages/student/StudentDashboardPage.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function StudentDashboardPage() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="card">
        <h2 className="page-title">Hi, {currentUser?.name}</h2>
        <p className="page-subtitle">
          Manage your profile, projects and public portfolio.
        </p>

        <div className="flex-row mt-md">
          <Link to="/student/edit-profile">
            <button className="btn btn-secondary">Edit profile</button>
          </Link>
          <Link to="/student/projects">
            <button className="btn btn-secondary">Manage projects</button>
          </Link>
          <Link to={`/portfolio/${currentUser?.id}`}>
            <button className="btn btn-primary">View public portfolio</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
