import Navbar from "./components/Navbar.jsx";
import AppRouter from "./router.jsx";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <div className="app-main">
        <div className="app-container">
          <AppRouter />
        </div>
      </div>
    </div>
  );
}
