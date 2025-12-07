// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = login({ email, password });
      setCurrentUser(user);

      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/student/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card auth-card">
      <h2 className="page-title">Login</h2>
      <p className="page-subtitle">Welcome back to your portfolio space.</p>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-md">
        <input
          className="input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>

      <p className="small-text mt-md">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="link">
          Sign up
        </Link>
      </p>
    </div>
  );
}
