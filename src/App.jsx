// src/App.jsx
import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

// lazy pages
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Ingredients = lazy(() => import("./pages/Ingredients"));
const Recipes = lazy(() => import("./pages/Recipes"));
const RecipeForm = lazy(() => import("./pages/RecipeForm"));
const RecipeEdit = lazy(() => import("./pages/RecipeEdit"));
const Users = lazy(() => import("./pages/Users"));
const Devices = lazy(() => import("./pages/Devices"));
const Admins = lazy(() => import("./pages/Admins"));

/** PublicRoute: if user is logged in, redirect to /dashboard */
function PublicRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Routes>
        {/* Public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected — all protected routes are wrapped in ProtectedRoute + AdminLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ingredients"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Ingredients />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipes"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Recipes />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipes/new"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <RecipeForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipes/:id"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <RecipeEdit />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/devices"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Devices />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Admins />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 fallback (last) */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <div className="p-4">
                  <h3>404 — Page not found</h3>
                  <p>The page you are looking for doesn't exist.</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}
