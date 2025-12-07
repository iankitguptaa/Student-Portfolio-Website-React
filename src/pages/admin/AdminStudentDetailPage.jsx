import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPortfolioById } from "../../services/portfolioService.js";

export default function AdminStudentDetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    setStudent(getPortfolioById(id));
  }, [id]);

  if (!student) {
    return (
      <div className="card">
        <p>No student found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h1 className="page-title">{student.name}</h1>
        <p className="page-subtitle">{student.email}</p>

        <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
          <img
            src={student.profileImage || "https://via.placeholder.com/140"}
            alt="Profile"
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #6366f1",
            }}
          />
        </div>

        <p style={{ fontSize: "0.9rem" }}>{student.bio || "No bio available"}</p>

        {student.resume && (
          <a
            href={student.resume}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            View Resume
          </a>
        )}
      </div>

      <div className="card">
        <h2>Projects</h2>
        {student.projects?.length ? (
          <ul style={{ paddingLeft: "1rem" }}>
            {student.projects.map((project, index) => (
              <li key={index} style={{ marginBottom: "0.7rem" }}>
                <strong>{project.title}</strong>
                <p style={{ fontSize: "0.9rem" }}>{project.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}
