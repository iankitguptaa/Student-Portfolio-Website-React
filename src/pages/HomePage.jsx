// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="card">
      <h1 className="page-title">Student Portfolio Platform</h1>
      <p className="page-subtitle">
        Create, manage and showcase student portfolios in one place. Dark UI · LocalStorage version.
      </p>

      <div className="flex-row mt-md">
        <Link to="/signup">
          <button className="btn btn-primary">Get started as student</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-secondary">Login</button>
        </Link>
        <Link to="/explore">
          <button className="btn btn-ghost">Explore portfolios</button>
        </Link>
      </div>
    </div>
  );
}
