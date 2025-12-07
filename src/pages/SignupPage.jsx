import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup as signupService } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");   // ADD role back
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] =useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = signupService({ name, email, password, role });
      login(user);
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/student/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card auth-card">
      <h2 className="page-title">Create your account</h2>

      {error && <p style={{ color: "#fca5a5" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="mt-md">
        <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />

        {/* TEMP ROLE DROPDOWN */}
        <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-primary" type="submit">Create Account</button>
      </form>
    </div>
  );
}
