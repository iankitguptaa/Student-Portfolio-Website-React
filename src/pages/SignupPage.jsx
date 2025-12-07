// src/pages/SignupPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("student"); // dropdown role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = signup({ name, email, password, role });
      setCurrentUser(user);
      if (role === "admin") navigate("/admin/dashboard", { replace: true });
      else navigate("/student/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card auth-card">
      <h2 className="page-title">Create account</h2>
      <p className="page-subtitle">Choose your role and set up your profile.</p>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-md">
        <input
          className="input"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

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
          placeholder="Password (min 4 chars)"
          minLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
