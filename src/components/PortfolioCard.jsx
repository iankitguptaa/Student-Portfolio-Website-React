// src/components/PortfolioCard.jsx
import { Link } from "react-router-dom";

export default function PortfolioCard({ student }) {
  const initials = student.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="card">
      <div className="card-header-row">
        <div className="avatar">
          {student.profileImage ? (
            <img
              src={student.profileImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div>
          <div className="card-title-sm">{student.name}</div>
          <div className="card-sub-sm">
            {student.education?.degree || "Student"}
          </div>
        </div>
      </div>

      <p className="card-body-text">
        {student.bio || "No bio added yet."}
      </p>

      <div className="mt-sm">
        <Link to={`/portfolio/${student.id}`}>
          <button className="btn btn-secondary">View profile</button>
        </Link>
      </div>
    </div>
  );
}
