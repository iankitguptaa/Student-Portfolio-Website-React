// src/pages/student/EditProfilePage.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { updateUser } from "../../services/userService.js";

export default function EditProfilePage() {
  const { currentUser, setCurrentUser } = useAuth();

  const [name, setName] = useState(currentUser?.name || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [skills, setSkills] = useState((currentUser?.skills || []).join(", "));
  const [degree, setDegree] = useState(currentUser?.education?.degree || "");
  const [institution, setInstitution] = useState(
    currentUser?.education?.institution || ""
  );
  const [gradYear, setGradYear] = useState(
    currentUser?.education?.graduationYear || ""
  );
  const [github, setGithub] = useState(currentUser?.github || "");
  const [linkedin, setLinkedin] = useState(currentUser?.linkedin || "");
  const [profileImage, setProfileImage] = useState(
    currentUser?.profileImage || ""
  );
  const [resume, setResume] = useState(currentUser?.resume || "");
  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    const skillsArr = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updated = {
      ...currentUser,
      name,
      bio,
      skills: skillsArr,
      education: {
        degree,
        institution,
        graduationYear: gradYear,
      },
      github,
      linkedin,
      profileImage,
      resume,
    };

    updateUser(updated);
    setCurrentUser(updated);
    setMessage("Profile updated successfully!");
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setResume(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="card auth-card">
      <h2 className="page-title">Edit Profile</h2>
      {message && <p className="success-text">{message}</p>}

      {/* profile image */}
      <div className="profile-photo-block">
        <div className="profile-photo-circle">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span>No photo</span>
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleProfileImageChange} />
      </div>

      <form onSubmit={handleSave} className="mt-md">
        <input
          className="input"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="input"
          rows={3}
          placeholder="Short bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          className="input"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <div className="section-label">Education</div>
        <input
          className="input"
          placeholder="Degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
        <input
          className="input"
          placeholder="Institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
        />
        <input
          className="input"
          placeholder="Graduation Year"
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
        />

        <div className="section-label">Links</div>
        <input
          className="input"
          placeholder="GitHub URL"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <input
          className="input"
          placeholder="LinkedIn URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <div className="section-label">Resume (PDF or Image)</div>
        <input type="file" className="input" onChange={handleResumeChange} />
        {resume && (
          <a
            href={resume}
            target="_blank"
            rel="noreferrer"
            className="link mt-sm"
          >
            Preview current resume
          </a>
        )}

        <button className="btn btn-primary mt-md" type="submit">
          Save changes
        </button>
      </form>
    </div>
  );
}
