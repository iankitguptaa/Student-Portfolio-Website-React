import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ExplorePortfoliosPage from "./pages/ExplorePortfoliosPage.jsx";
import ViewPortfolioPage from "./pages/ViewPortfolioPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

import StudentDashboardPage from "./pages/student/StudentDashboardPage.jsx";
import EditProfilePage from "./pages/student/EditProfilePage.jsx";
import ManageProjectsPage from "./pages/student/ManageProjectsPage.jsx";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import AdminStudentsListPage from "./pages/admin/AdminStudentsListPage.jsx";
import AdminStudentDetailPage from "./pages/admin/AdminStudentDetailPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePortfoliosPage />} />
      <Route path="/portfolio/:id" element={<ViewPortfolioPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Student */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/edit-profile"
        element={
          <ProtectedRoute role="student">
            <EditProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/projects"
        element={
          <ProtectedRoute role="student">
            <ManageProjectsPage />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute role="admin">
            <AdminStudentsListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/student/:id"
        element={
          <ProtectedRoute role="admin">
            <AdminStudentDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}