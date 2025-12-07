import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = loginService({ email, password });
      login(user);
      if (user.role === "student") navigate("/student/dashboard", { replace: true });
      else if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
      else navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card auth-card">
      <h2 className="page-title">Welcome back</h2>
      <p className="page-subtitle">Login to continue to your dashboard.</p>

      {error && (
        <p style={{ color: "#fca5a5", fontSize: "0.85rem", marginTop: "0.6rem" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-md">
        <input
          className="input"
          type="email"
          placeholder="College email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password (min 4 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>

      <p style={{ marginTop: "0.9rem", fontSize: "0.8rem", color: "#9ca3af" }}>
        New here? Sign up as{" "}
        <span style={{ color: "#c7d2fe" }}>student</span> or{" "}
        <span style={{ color: "#c7d2fe" }}>admin</span> from the sign up page.
      </p>
    </div>
  );
}