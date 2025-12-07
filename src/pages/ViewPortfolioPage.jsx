import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPortfolioById } from "../services/portfolioService.js";

export default function ViewPortfolioPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    setStudent(getPortfolioById(id));
  }, [id]);

  if (!student) {
    return (
      <div className="card">
        <p>Portfolio not found.</p>
      </div>
    );
  }

  const hasEducation =
    student.education &&
    (student.education.degree ||
      student.education.institution ||
      student.education.graduationYear);

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

        <p style={{ marginTop: "0.7rem", fontSize: "0.9rem" }}>
          {student.bio || "No bio yet."}
        </p>

        {hasEducation && (
          <div className="mt-md">
            <h3 style={{ fontSize: "0.95rem", marginBottom: "0.3rem" }}>Education</h3>
            <p style={{ fontSize: "0.88rem", color: "#cbd5f5" }}>
              {student.education.degree && (
                <>
                  <strong>{student.education.degree}</strong>
                  <br />
                </>
              )}
              {student.education.institution}
              {student.education.graduationYear && (
                <span> · Class of {student.education.graduationYear}</span>
              )}
            </p>
          </div>
        )}

        {(student.github || student.linkedin) && (
          <div className="mt-md">
            <h3 style={{ fontSize: "0.95rem", marginBottom: "0.3rem" }}>Links</h3>
            <div className="flex-row">
              {student.github && (
                <a
                  href={student.github}
                  target="_blank"
                  rel="noreferrer"
                  className="chip chip-accent"
                >
                  GitHub
                </a>
              )}
              {student.linkedin && (
                <a
                  href={student.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="chip"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        )}

        {student.resume && (
          <div className="mt-md">
            <h3 style={{ fontSize: "0.95rem" }}>Resume</h3>
            <a
              href={student.resume}
              target="_blank"
              rel="noreferrer"
              download={`${student.name}_resume.pdf`}
              className="btn btn-primary"
            >
              View / Download Resume
            </a>
          </div>
        )}

        <div className="mt-md">
          <h3 style={{ fontSize: "0.95rem", marginBottom: "0.4rem" }}>Skills</h3>
          {student.skills?.length ? (
            <div className="flex-row">
              {student.skills.map((skill, idx) => (
                <span key={idx} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Not added.</p>
          )}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Projects</h2>
        {student.projects?.length ? (
          <ul style={{ paddingLeft: "1rem" }}>
            {student.projects.map((p, idx) => (
              <li key={idx} style={{ marginBottom: "0.7rem" }}>
                <strong>{p.title}</strong>
                <p style={{ fontSize: "0.87rem", color: "#cbd5f5", marginTop: "0.25rem" }}>
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>No projects yet.</p>
        )}
      </div>
    </div>
  );
}
