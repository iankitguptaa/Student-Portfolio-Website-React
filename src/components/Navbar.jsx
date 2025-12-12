// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { logout } from "../services/authService.js";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <header className="nav-root">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <div className="nav-logo-pill">SC</div>
          <div>
            <div className="nav-brand-text-main">SHOWCASE.ME</div>
            <div className="nav-brand-text-sub">Profile · Create · Explore</div>
          </div>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Explore
          </Link>

          {currentUser?.role === "student" && (
            <Link to="/student/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}

          {currentUser?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="nav-link">
                Admin
              </Link>
              <Link to="/admin/students" className="nav-link">
                Students
              </Link>
            </>
          )}

          {!currentUser ? (
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
              <span className="nav-user-tag">
                {currentUser.name} · {currentUser.role}
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
