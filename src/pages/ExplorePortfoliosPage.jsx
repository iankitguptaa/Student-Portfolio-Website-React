// src/pages/ExplorePortfoliosPage.jsx
import { useEffect, useState } from "react";
import { getAllPortfolios } from "../services/portfolioService.js";
import PortfolioCard from "../components/PortfolioCard.jsx";

export default function ExplorePortfoliosPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getAllPortfolios());
  }, []);

  return (
    <div>
      <div className="card">
        <h1 className="page-title">Explore Portfolios</h1>
        <p className="page-subtitle">
          Browse student profiles and see their skills and projects.
        </p>
      </div>

      {students.length === 0 ? (
        <div className="card">
          <p className="muted-text">
            No portfolios yet. Ask students to sign up and build theirs!
          </p>
        </div>
      ) : (
        <div className="grid grid-3 mt-md">
          {students.map((s) => (
            <PortfolioCard key={s.id} student={s} />
          ))}
        </div>
      )}
    </div>
  );
}
