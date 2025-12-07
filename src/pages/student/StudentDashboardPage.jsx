import { useEffect, useState } from "react";
import { getPublicPortfolios } from "../services/portfolioService.js";
import PortfolioCard from "../components/PortfolioCard.jsx";

export default function ExplorePortfoliosPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getPublicPortfolios());
  }, []);

  return (
    <div>
      <div className="card">
        <h2 className="page-title">Explore student portfolios</h2>
        <p className="page-subtitle">
          Browse profiles and see what students are building across your institute.
        </p>
      </div>

      {students.length === 0 ? (
        <div className="card">
          <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
            No portfolios yet. Ask students to sign up and start building their profiles.
          </p>
        </div>
      ) : (
        <div className="grid grid-3">
          {students.map((s) => (
            <PortfolioCard key={s.id} student={s} />
          ))}
        </div>
      )}
    </div>
  );
}