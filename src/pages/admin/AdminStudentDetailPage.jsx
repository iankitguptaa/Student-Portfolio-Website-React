// src/pages/admin/AdminStudentDetailPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService.js";

export default function AdminStudentDetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const s = getUserById(id);
    setStudent(s);
  }, [id]);

  if (!student) {
    return (
      <div className="card">
        <p>Student not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h2 className="page-title">{student.name}</h2>
        <p className="page-subtitle">{student.email}</p>

        <div className="profile-photo-block">
          <div className="profile-photo-circle sm">
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
          {student.bio || "No bio available."}
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
              View resume
            </a>
          </div>
        )}

        <div className="mt-md">
          <h3>Skills</h3>
          {student.skills?.length ? (
            <div className="flex-row">
              {student.skills.map((sk, i) => (
                <span key={i} className="chip">
                  {sk}
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
          <p className="muted-text">No projects added.</p>
        )}
      </div>
    </div>
  );
}
