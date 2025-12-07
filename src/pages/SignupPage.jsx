import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup as signupService } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = signupService({ name, email, password });
      login(user);
      navigate("/student/dashboard", { replace: true });  // students only
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card auth-card">
      <h2 className="page-title">Create your account</h2>
      <p className="page-subtitle">Students can create portfolio & showcase achievements.</p>

      {error && (
        <p style={{ color: "#fca5a5", fontSize: "0.85rem", marginTop: "0.6rem" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-md">
        <input
          className="input"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          placeholder="Password (min 4 characters)"
          minLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}
