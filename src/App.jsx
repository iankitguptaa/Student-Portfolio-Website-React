// src/App.jsx
import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./router.jsx";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <div className="app-container">
          <AppRoutes />
        </div>
      </main>
    </div>
  );
}
