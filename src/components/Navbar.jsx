import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="nav-root">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <div className="nav-logo-pill">SP</div>
          <div>
            <div className="nav-brand-text-main">Student Portfolio</div>
            <div className="nav-brand-text-sub">Showcase • Discover • Manage</div>
          </div>
        </Link>

        <div className="nav-links">
          <Link to="/explore" className="nav-link">
            Explore
          </Link>

          {isAuthenticated && user?.role === "student" && (
            <Link to="/student/dashboard" className="nav-link">
              My dashboard
            </Link>
          )}

          {isAuthenticated && user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="nav-link">
                Admin
              </Link>
              <Link to="/admin/students" className="nav-link">
                Students
              </Link>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <button className="btn btn-ghost">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary">Sign up</button>
              </Link>
            </>
          ) : (
            <>
              <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>
                <span style={{ color: "#e5e7eb" }}>{user.name}</span>{" "}
                <span style={{ opacity: 0.8 }}>· {user.role}</span>
              </span>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}