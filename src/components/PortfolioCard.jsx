import { Link } from "react-router-dom";

export default function PortfolioCard({ student }) {
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const eduLine =
    student.education?.degree || student.education?.institution
      ? `${student.education?.degree || ""}${
          student.education?.degree && student.education?.institution ? " · " : ""
        }${student.education?.institution || ""}`
      : null;

  return (
    <div className="card">
      <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            background: "#1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {student.profileImage ? (
            <img
              src={student.profileImage}
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontWeight: 700 }}>{initials}</span>
          )}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "1rem" }}>{student.name}</div>
          {eduLine ? (
            <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>{eduLine}</div>
          ) : (
            <div style={{ fontSize: "0.78rem", color: "#6b7280" }}>
              Student portfolio
            </div>
          )}
        </div>
      </div>

      <p
        style={{
          marginTop: "0.6rem",
          color: "#cbd5f5",
          fontSize: "0.87rem",
          lineHeight: 1.4,
        }}
      >
        {student.bio || "No bio written yet."}
      </p>

      <div className="mt-sm">
        <span className="chip chip-accent">
          {student.skills?.length
            ? student.skills.slice(0, 3).join(" • ")
            : "Skills not added"}
          {student.skills?.length > 3 ? " +" : ""}
        </span>
      </div>

      {(student.github || student.linkedin) && (
        <div
          style={{
            marginTop: "0.5rem",
            fontSize: "0.75rem",
            color: "#9ca3af",
          }}
        >
          {student.github && <span>GitHub • </span>}
          {student.linkedin && <span>LinkedIn</span>}
        </div>
      )}

      <div className="mt-sm">
        <Link to={`/portfolio/${student.id}`}>
          <button className="btn btn-secondary">View profile</button>
        </Link>
      </div>
    </div>
  );
}
