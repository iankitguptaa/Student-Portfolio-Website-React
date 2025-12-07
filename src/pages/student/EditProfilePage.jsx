import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { updateStudentProfile } from "../../services/portfolioService.js";

export default function EditProfilePage() {
  const { user, login } = useAuth();

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [skills, setSkills] = useState((user.skills || []).join(", "));
  const [profileImage, setProfileImage] = useState(user.profileImage || "");

  const [degree, setDegree] = useState(user.education?.degree || "");
  const [institution, setInstitution] = useState(user.education?.institution || "");
  const [graduationYear, setGraduationYear] = useState(
    user.education?.graduationYear || ""
  );

  const [github, setGithub] = useState(user.github || "");
  const [linkedin, setLinkedin] = useState(user.linkedin || "");

  const [resume, setResume] = useState(user.resume || "");   // NEW STATE
  const [resumeName, setResumeName] = useState("");          // NEW

  const [message, setMessage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setResume(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeResume = () => {
    setResume("");
    setResumeName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const skillsArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const education = { degree, institution, graduationYear };

    const updated = updateStudentProfile(user, {
      name,
      bio,
      skills: skillsArray,
      education,
      github,
      linkedin,
      profileImage,
      resume, 
    });

    login(updated);
    setMessage("Profile Updated Successfully!");
  };

  return (
    <div className="card auth-card">
      <h2 className="page-title">Edit Profile</h2>
      <p className="page-subtitle">
        Add resume, skills, education and links to improve your portfolio.
      </p>

      {message && (
        <p style={{ color: "#bbf7d0", fontSize: "0.85rem" }}>{message}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-md">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img
            src={profileImage || "https://via.placeholder.com/120"}
            alt="Profile"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #6366f1",
            }}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea className="input" rows={3} placeholder="Short bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        <input className="input" placeholder="Skills (React, C++, etc.)" value={skills} onChange={(e) => setSkills(e.target.value)} />

        <div style={{ color: "#9ca3af", marginTop: "0.6rem" }}>Education</div>
        <input className="input" placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
        <input className="input" placeholder="Institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />
        <input className="input" placeholder="Graduation Year" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} />

        <div style={{ color: "#9ca3af", marginTop: "0.6rem" }}>Social Profiles</div>
        <input className="input" placeholder="GitHub URL" value={github} onChange={(e) => setGithub(e.target.value)} />
        <input className="input" placeholder="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />

        <div style={{ color: "#9ca3af", marginTop: "0.6rem" }}>Resume Upload (PDF)</div>
        <input type="file" accept="application/pdf" className="input" onChange={handleResumeUpload} />

        {resume && (
          <div style={{
            background: "rgba(255,255,255,0.07)",
            padding: "0.8rem",
            borderRadius: "0.6rem",
            marginTop: "0.6rem",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <span style={{ fontSize: "0.85rem" }}>{resumeName || "Uploaded Resume"}</span>
            <button type="button" className="btn btn-ghost" onClick={removeResume}>Remove</button>
          </div>
        )}

        <button className="btn btn-primary" type="submit">Save changes</button>
      </form>
    </div>
  );
}