// src/components/AdminLayout.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { loadJSON } from "../utils/storage";
import kpiData from "../data/kpi.json";

/**
 * AdminLayout
 * - Sidebar for Users / Devices / Admins / Recipes / Ingredients / Settings / Support
 * - Shows small badges with counts using localStorage keys when available
 * - Uses safe fallbacks and an inline SVG avatar to avoid external network requests
 */

// helper to get counts from localStorage or fallback json
function getCount(key, fallbackKey, fallbackData) {
  try {
    const raw = loadJSON(key, null);
    if (raw && Array.isArray(raw[fallbackKey])) return raw[fallbackKey].length;
  } catch (e) {
    // ignore
  }
  if (fallbackData && Array.isArray(fallbackData[fallbackKey])) return fallbackData[fallbackKey].length;
  return 0;
}

export default function AdminLayout({ children }) {
  // counts (reads localStorage keys)
  const usersCount = getCount("kookit_users", "users", null);
  const devicesCount = getCount("kookit_devices", "devices", null);
  const adminsCount = getCount("kookit_admins", "admins", null);
  const recipesCount = getCount("kookit_recipes", "recipes", window.__KOOKIT_RECIPES_FALLBACK__ ? window.__KOOKIT_RECIPES_FALLBACK__ : null);
  const ingredientsCount = getCount("kookit_ingredients", "ingredients", window.__KOOKIT_INGREDIENTS_FALLBACK__ ? window.__KOOKIT_INGREDIENTS_FALLBACK__ : null);

  // fallback KPI values from kpi.json (optional)
  const kpi = kpiData || {};

  // inline small SVG avatar to avoid external network call
  const inlineAvatar = "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'><rect fill='#eee' width='36' height='36'/><g fill='#b3b3b3' transform='translate(6,5)'><circle cx='12' cy='8' r='6'/><path d='M0 28c0-6.6 9.6-6.6 12-6.6S24 21.4 24 28v1H0v-1z'/></g></svg>`
  );

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <nav className="sidebar bg-white border-end vh-100 p-3" style={{ width: 260 }}>
        <div className="mb-4">
          <Link to="/dashboard" className="text-decoration-none">
            <h5 className="mb-0 text-primary"><i className="bi bi-geo-alt-fill me-2"></i>Kookit Admin</h5>
          </Link>
        </div>

        <div className="mb-3 small text-muted px-1">MAIN</div>

        <ul className="nav nav-pills flex-column mb-3">
          <li className="nav-item mb-1">
            <NavLink to="/dashboard" className={({ isActive }) => "nav-link d-flex justify-content-between align-items-center " + (isActive ? "active" : "")}>
              <span><i className="bi bi-speedometer2 me-2"></i>Dashboard</span>
              <span className="badge bg-light text-dark rounded-pill">{kpi.totalUsers ?? usersCount}</span>
            </NavLink>
          </li>

          <li className="nav-item mb-1">
            <NavLink to="/users" className={({ isActive }) => "nav-link d-flex justify-content-between align-items-center " + (isActive ? "active" : "")}>
              <span><i className="bi bi-people-fill me-2"></i>Users</span>
              <span className="badge bg-light text-dark rounded-pill">{usersCount}</span>
            </NavLink>
          </li>

          <li className="nav-item mb-1">
            <NavLink to="/devices" className={({ isActive }) => "nav-link d-flex justify-content-between align-items-center " + (isActive ? "active" : "")}>
              <span><i className="bi bi-device-hdd me-2"></i>Devices</span>
              <span className="badge bg-light text-dark rounded-pill">{devicesCount}</span>
            </NavLink>
          </li>

          <li className="nav-item mb-1">
            <NavLink to="/admins" className={({ isActive }) => "nav-link d-flex justify-content-between align-items-center " + (isActive ? "active" : "")}>
              <span><i className="bi bi-shield-lock-fill me-2"></i>Admins</span>
              <span className="badge bg-light text-dark rounded-pill">{adminsCount}</span>
            </NavLink>
          </li>
        </ul>

        <div className="mb-3 small text-muted px-1">CONTENT</div>

        <ul className="nav nav-pills flex-column mb-3">
          <li className="nav-item mb-1">
            <NavLink to="/recipes" className={({ isActive }) => "nav-link d-flex justify-content-between align-items-center " + (isActive ? "active" : "")}>
              <span><i className="bi bi-journal-bookmark-fill me-2"></i>Recipes</span>
              <span className="badge bg-light text-dark rounded-pill">{recipesCount}</span>
            </NavLink>
          </li>

          <li className="nav-item mb-1">
            <NavLink to="/ingredients" className={({ isActive }) => "nav-link d-flex justify-content-between align-items-center " + (isActive ? "active" : "")}>
              <span><i className="bi bi-basket3-fill me-2"></i>Ingredients</span>
              <span className="badge bg-light text-dark rounded-pill">{ingredientsCount}</span>
            </NavLink>
          </li>
        </ul>

        <div className="mb-3 small text-muted px-1">SYSTEM</div>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item mb-1">
            <NavLink to="/settings" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
              <span><i className="bi bi-gear-fill me-2"></i>Settings</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/support" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
              <span><i className="bi bi-life-preserver me-2"></i>Support</span>
            </NavLink>
          </li>
        </ul>

        <hr />

        <div className="text-muted small px-1">© Kookit Admin</div>
      </nav>

      {/* Main area */}
      <div className="flex-grow-1">
        <header className="navbar navbar-expand bg-white border-bottom">
          <div className="container-fluid">
            <button className="btn btn-light d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar">
              <i className="bi bi-list"></i>
            </button>

            <div className="d-flex align-items-center ms-auto">
              <div className="me-3" style={{ width: 320 }}>
                <input className="form-control form-control-sm" placeholder="Quick search..." />
              </div>
              <div className="dropdown">
                <a className="d-flex align-items-center text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={inlineAvatar} alt="avatar" className="rounded-circle me-2" width="36" height="36" />
                  <strong>Admin</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/login">Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4">
          {children}
        </main>
      </div>

      {/* Offcanvas for mobile (re-uses same nav links) */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Kookit Admin</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <nav className="nav nav-pills flex-column">
            <NavLink to="/dashboard" className="nav-link mb-1">Dashboard</NavLink>
            <NavLink to="/users" className="nav-link mb-1">Users</NavLink>
            <NavLink to="/devices" className="nav-link mb-1">Devices</NavLink>
            <NavLink to="/admins" className="nav-link mb-1">Admins</NavLink>
            <NavLink to="/recipes" className="nav-link mb-1">Recipes</NavLink>
            <NavLink to="/ingredients" className="nav-link mb-1">Ingredients</NavLink>
            <NavLink to="/settings" className="nav-link">Settings</NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
