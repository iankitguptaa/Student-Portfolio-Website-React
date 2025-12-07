// src/pages/ViewPortfolioPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPortfolioById } from "../services/portfolioService.js";

export default function ViewPortfolioPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const s = getPortfolioById(id);
    setStudent(s || null);
  }, [id]);

  if (!student) {
    return (
      <div className="card">
        <p>Portfolio not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h1 className="page-title">{student.name}</h1>
        <p className="page-subtitle">{student.email}</p>

        <div className="profile-photo-block">
          <div className="profile-photo-circle">
            {student.profileImage ? (
              <img
                src={student.profileImage}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span>No photo</span>
            )}
          </div>
        </div>

        <p className="card-body-text">
          {student.bio || "No bio yet."}
        </p>

        {student.resume && (
          <div className="mt-md">
            <h3>Resume</h3>
            <a
              href={student.resume}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
            >
              View / download resume
            </a>
          </div>
        )}

        <div className="mt-md">
          <h3>Skills</h3>
          {student.skills?.length ? (
            <div className="flex-row">
              {student.skills.map((s, i) => (
                <span key={i} className="chip">
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="muted-text">No skills added.</p>
          )}
        </div>
      </div>

      <div className="card mt-md">
        <h3>Projects</h3>
        {student.projects?.length ? (
          <ul className="project-list">
            {student.projects.map((p) => (
              <li key={p.id} className="project-item">
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted-text">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
