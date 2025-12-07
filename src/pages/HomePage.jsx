import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="card">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr)",
          gap: "1.5rem",
        }}
      >
        <div>
          <div className="chip chip-accent" style={{ marginBottom: "0.8rem" }}>
            Digital portfolios for your batch
          </div>
          <h1 className="page-title">
            Showcase student work with a clean, modern portfolio.
          </h1>
          <p className="page-subtitle" style={{ marginTop: "0.4rem" }}>
            Students create their own profiles, add projects & skills. Others can explore
            portfolios, and admins keep full visibility of records.
          </p>

          <div className="flex-row mt-md">
            <Link to="/signup">
              <button className="btn btn-primary">Start as student</button>
            </Link>
            <Link to="/explore">
              <button className="btn btn-secondary">Browse portfolios</button>
            </Link>
          </div>

          <div className="mt-md" style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
            Tip: Sign up with role = <span style={{ color: "#c7d2fe" }}>admin</span> to get
            admin access.
          </div>
        </div>

        <div
          style={{
            borderRadius: "1.1rem",
            border: "1px solid rgba(148, 163, 184, 0.3)",
            background:
              "radial-gradient(circle at top left, rgba(129, 140, 248,0.4), rgba(15,23,42,0.98))",
            padding: "1rem 1.1rem",
            boxShadow: "0 22px 55px rgba(15,23,42,0.9)",
            fontSize: "0.8rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.6rem",
            }}
          >
            <span style={{ color: "#e5e7eb", fontWeight: 500 }}>
              Live portfolio preview
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                padding: "0.1rem 0.45rem",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.5)",
              }}
            >
              student@college
            </span>
          </div>

          <div
            style={{
              padding: "0.75rem",
              borderRadius: "0.9rem",
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(148, 163, 184, 0.4)",
            }}
          >
            <div style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background:
                    "radial-gradient(circle at top left, #4f46e5, #22c55e)",
                }}
              ></div>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Final year project
                </div>
                <div style={{ fontSize: "0.74rem", color: "#9ca3af" }}>
                  Full-stack Web App · React · Node
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                marginTop: "0.7rem",
                flexWrap: "wrap",
              }}
            >
              <span className="chip">React</span>
              <span className="chip">API</span>
              <span className="chip">UI Design</span>
            </div>
          </div>

          <div
            style={{
              marginTop: "0.7rem",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "0.5rem",
            }}
          >
            <div className="chip">
              <strong style={{ marginRight: "0.25rem" }}>32</strong> portfolios
            </div>
            <div className="chip">
              <strong style={{ marginRight: "0.25rem" }}>120+</strong> projects
            </div>
            <div className="chip">
              <strong style={{ marginRight: "0.25rem" }}>1</strong> admin panel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
