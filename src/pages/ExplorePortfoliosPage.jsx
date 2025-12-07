import { useEffect, useState } from "react";
import { getAllStudents } from "../services/userService.js";
import PortfolioCard from "../components/PortfolioCard.jsx";

export default function ExplorePortfoliosPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await getAllStudents();
      setStudents(list);
    })();
  }, []);

  return (
    <div>
      <div className="card">
        <h2 className="page-title">Explore Portfolios</h2>
        <p className="page-subtitle">Browse all student profiles.</p>
      </div>

      {students.length === 0 ? (
        <div className="card">
          <p style={{ color: "#9ca3af" }}>No portfolios yet.</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {students.map((s) => (
            <PortfolioCard student={s} key={s.id} />
          ))}
        </div>
      )}
    </div>
  );
}
