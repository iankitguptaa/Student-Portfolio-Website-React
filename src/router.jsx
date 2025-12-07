// src/router.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ExplorePortfoliosPage from "./pages/ExplorePortfoliosPage.jsx";
import ViewPortfolioPage from "./pages/ViewPortfolioPage.jsx";

// student pages
import StudentDashboardPage from "./pages/student/StudentDashboardPage.jsx";
import EditProfilePage from "./pages/student/EditProfilePage.jsx";
import ManageProjectsPage from "./pages/student/ManageProjectsPage.jsx";

// admin pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import AdminStudentsListPage from "./pages/admin/AdminStudentsListPage.jsx";
import AdminStudentDetailPage from "./pages/admin/AdminStudentDetailPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<ExplorePortfoliosPage />} />
      <Route path="/explore" element={<ExplorePortfoliosPage />} />
      <Route path="/portfolio/:id" element={<ViewPortfolioPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Student routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowed={["student"]}>
            <StudentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/edit-profile"
        element={
          <ProtectedRoute allowed={["student"]}>
            <EditProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/projects"
        element={
          <ProtectedRoute allowed={["student"]}>
            <ManageProjectsPage />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowed={["admin"]}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute allowed={["admin"]}>
            <AdminStudentsListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/student/:id"
        element={
          <ProtectedRoute allowed={["admin"]}>
            <AdminStudentDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
