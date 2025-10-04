// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import usersData from "../data/users.json";
import devicesData from "../data/devices.json";
import adminsData from "../data/admin.json";
import { loadJSON } from "../utils/storage";
import { Link } from "react-router-dom";

/**
 * Enhanced Dashboard: Improved UI with animations, transitions, and visual effects
 */

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const ustored = loadJSON("kookit_users", null);
        const dstored = loadJSON("kookit_devices", null);
        const astored = loadJSON("kookit_admins", null);

        // fall back to fixtures; ensure arrays
        const ulist = ustored?.users ?? usersData?.users ?? [];
        const dlist = dstored?.devices ?? devicesData?.devices ?? [];
        const alist = astored?.admins ?? adminsData?.admins ?? [];

        setUsers(Array.isArray(ulist) ? ulist : []);
        setDevices(Array.isArray(dlist) ? dlist : []);
        setAdmins(Array.isArray(alist) ? alist : []);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setUsers([]);
        setDevices([]);
        setAdmins([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const totals = useMemo(() => {
    const safeUsers = Array.isArray(users) ? users : [];
    const totalUsers = safeUsers.length;
    const active = safeUsers.filter(u => u?.status === "active").length;
    const inactive = safeUsers.filter(u => u?.status === "inactive").length;
    const activePercentage = totalUsers > 0 ? Math.round((active / totalUsers) * 100) : 0;
    
    return { totalUsers, active, inactive, activePercentage };
  }, [users]);

  const getUserName = (id) => {
    if (!id) return "-";
    const u = (Array.isArray(users) ? users : []).find(x => x?.id === id);
    return u?.name ?? `Unknown (${id})`;
  };

  // Internal CSS Styles
  const styles = `
    .dashboard-container {
      opacity: 0;
      animation: fadeIn 0.8s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
      opacity: 0;
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .animate-slide-up {
      opacity: 0;
      transform: translateY(30px);
      animation: slideUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }

    @keyframes slideUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }

    /* Stats Cards */
    .stats-card {
      transition: all 0.3s ease;
      border: 1px solid #e9ecef;
      position: relative;
      overflow: hidden;
    }

    .stats-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s ease;
    }

    .stats-card:hover::before {
      left: 100%;
    }

    .card-hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
      border-color: #007bff;
    }

    .stats-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: white;
    }

    .users-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .devices-icon { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
    .admins-icon { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }

    .stats-number {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .text-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Buttons */
    .btn-glow {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .btn-glow:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,123,255,0.4);
    }

    .btn-hover {
      transition: all 0.3s ease;
    }

    .btn-hover:hover {
      transform: translateX(5px);
    }

    /* User and Admin Avatars */
    .user-avatar, .admin-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .admin-avatar {
      width: 30px;
      height: 30px;
      font-size: 0.8rem;
    }

    /* User Cards */
    .user-card {
      background: #f8f9fa;
      border-radius: 10px;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }

    .user-card:hover {
      background: white;
      border-color: #007bff;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    /* Status Badges */
    .status-badge {
      padding: 0.35em 0.65em;
      font-size: 0.75em;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .status-badge:hover {
      transform: scale(1.05);
    }

    /* User Badges */
    .user-badge {
      padding: 0.25em 0.6em;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .primary-user {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
      border: 1px solid rgba(40, 167, 69, 0.2);
    }

    .secondary-user {
      background: rgba(108, 117, 125, 0.1);
      color: #6c757d;
      border: 1px solid rgba(108, 117, 125, 0.2);
    }

    /* Device Icon */
    .device-icon {
      width: 30px;
      height: 30px;
      background: #f8f9fa;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6c757d;
    }

    /* Loading Skeleton */
    .loading-skeleton .skeleton-card {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    .skeleton-title, .skeleton-subtitle, .skeleton-text-small, 
    .skeleton-text-large, .skeleton-text-medium, .skeleton-button,
    .skeleton-table {
      background: #e0e0e0;
      border-radius: 4px;
      animation: loading 1.5s infinite;
    }

    .skeleton-title { height: 24px; width: 200px; }
    .skeleton-subtitle { height: 16px; width: 100px; }
    .skeleton-text-small { height: 14px; width: 80px; }
    .skeleton-text-large { height: 32px; width: 60px; }
    .skeleton-text-medium { height: 12px; width: 120px; }
    .skeleton-button { height: 32px; width: 120px; }
    .skeleton-table { height: 200px; width: 100%; }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Admin List */
    .admin-list div {
      transition: all 0.3s ease;
    }

    .admin-list div:hover {
      transform: translateX(5px);
    }

    /* Table row animations */
    .table-hover tbody tr {
      transition: all 0.2s ease;
    }

    .table-hover tbody tr:hover {
      background-color: rgba(0,123,255,0.05);
      transform: translateX(5px);
    }

    /* Progress bar animation */
    .progress-bar {
      transition: width 1s ease-in-out;
    }

    /* Empty state styling */
    .empty-state {
      padding: 3rem 1rem;
      text-align: center;
      color: #6c757d;
    }

    .empty-state i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
  `;

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="loading-skeleton">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="skeleton-title"></div>
        <div className="skeleton-subtitle"></div>
      </div>
      
      <div className="row g-3 mb-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="col-md-4">
            <div className="card shadow-sm skeleton-card">
              <div className="card-body">
                <div className="skeleton-text-small"></div>
                <div className="skeleton-text-large mt-2"></div>
                <div className="skeleton-text-medium mt-3"></div>
                <div className="skeleton-button mt-3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card shadow-sm mb-4 skeleton-card">
        <div className="card-body">
          <div className="skeleton-table"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container-fluid">
        <style>{styles}</style>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="container-fluid dashboard-container">
      <style>{styles}</style>
      
      {/* Header with fade-in animation */}
      <div className="d-flex justify-content-between align-items-center mb-4 animate-fade-in">
        <div>
          <h2 className="h3 mb-1 fw-bold text-gradient">Dashboard Overview</h2>
          <p className="text-muted mb-0">Welcome to your management dashboard</p>
        </div>
        <div className="text-end">
          <small className="text-muted d-block">Last updated</small>
          <small className="text-muted">{new Date().toLocaleTimeString()}</small>
        </div>
      </div>

      {/* Stats Cards with hover effects and animations */}
      <div className="row g-4 mb-5">
        <div className="col-md-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div 
            className={`card stats-card ${hoveredCard === 'users' ? 'card-hover' : ''}`}
            onMouseEnter={() => setHoveredCard('users')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="stats-icon users-icon">
                  <i className="bi bi-people-fill"></i>
                </div>
                <small className="text-muted ms-2">Total Users</small>
              </div>
              <h3 className="stats-number">{totals.totalUsers}</h3>
              
              {/* Progress bar for active users */}
              <div className="progress mt-3" style={{ height: "6px" }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${totals.activePercentage}%` }}
                ></div>
              </div>
              
              <div className="mt-3 d-flex justify-content-between">
                <span className="text-success">
                  <i className="bi bi-check-circle-fill me-1"></i>
                  Active: {totals.active}
                </span>
                <span className="text-muted">
                  Inactive: {totals.inactive}
                </span>
              </div>
              <div className="mt-4">
                <Link to="/users" className="btn btn-sm btn-primary btn-glow">
                  Manage Users
                  <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div 
            className={`card stats-card ${hoveredCard === 'devices' ? 'card-hover' : ''}`}
            onMouseEnter={() => setHoveredCard('devices')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="stats-icon devices-icon">
                  <i className="bi bi-laptop-fill"></i>
                </div>
                <small className="text-muted ms-2">Registered Devices</small>
              </div>
              <h3 className="stats-number">{Array.isArray(devices) ? devices.length : 0}</h3>
              
              <div className="mt-3">
                <small className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  All device types included
                </small>
              </div>
              
              <div className="mt-4">
                <Link to="/devices" className="btn btn-sm btn-primary btn-glow">
                  Manage Devices
                  <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div 
            className={`card stats-card ${hoveredCard === 'admins' ? 'card-hover' : ''}`}
            onMouseEnter={() => setHoveredCard('admins')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="stats-icon admins-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <small className="text-muted ms-2">Administrators</small>
              </div>
              <h3 className="stats-number">{Array.isArray(admins) ? admins.length : 0}</h3>
              
              <div className="mt-2 text-muted small admin-list">
                {(Array.isArray(admins) ? admins.slice(0,2) : []).map((a, index) => (
                  <div key={a.id} className="d-flex align-items-center mb-1 animate-fade-in" 
                       style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                    <div className="admin-avatar me-2">
                      {a.name?.charAt(0) || 'A'}
                    </div>
                    <div>
                      {a.name} 
                      <span className="text-muted ms-1">({a.role})</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-3">
                <Link to="/admins" className="btn btn-sm btn-primary btn-glow">
                  Manage Admins
                  <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Devices table with enhanced styling */}
      <div className="card shadow-sm mb-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <div className="card-header bg-transparent border-bottom-0 pb-0">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1 fw-semibold">Device Management</h6>
              <p className="text-muted small mb-0">Recently registered devices and their status</p>
            </div>
            <div>
              <Link to="/devices" className="btn btn-sm btn-outline-primary btn-hover">
                View All Devices
                <i className="bi bi-chevron-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-sm align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Date Sold</th>
                  <th>Primary User</th>
                  <th>Secondary User</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(devices) && devices.length > 0) ? devices.map((d, index) => (
                  <tr 
                    key={d.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="device-icon me-2">
                          <i className="bi bi-laptop"></i>
                        </div>
                        <span className="fw-medium">{d.name}</span>
                      </div>
                    </td>
                    <td>
                      {d.dateSold ? (
                        <span className="text-muted">
                          {new Date(d.dateSold).toLocaleDateString()}
                        </span>
                      ) : "-"}
                    </td>
                    <td>
                      <span className="user-badge primary-user">
                        {getUserName(d.primaryUserId)}
                      </span>
                    </td>
                    <td>
                      {d.secondaryUserId ? (
                        <span className="user-badge secondary-user">
                          {getUserName(d.secondaryUserId)}
                        </span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge status-badge ${d.status === "active" ? "bg-success" : "bg-secondary"}`}>
                        {d.status}
                        <i className={`bi ${d.status === "active" ? "bi-check-circle" : "bi-dash-circle"} ms-1`}></i>
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 empty-state">
                      <i className="bi bi-inbox"></i>
                      <div>No devices found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent users with enhanced cards */}
      <div className="card shadow-sm animate-slide-up" style={{ animationDelay: "0.5s" }}>
        <div className="card-header bg-transparent border-bottom-0">
          <h6 className="mb-1 fw-semibold">Recent Users</h6>
          <p className="text-muted small mb-0">Latest registered users in the system</p>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {(Array.isArray(users) && users.length > 0) ? users.slice(0,6).map((u, index) => (
              <div key={u.id} className="col-lg-4 col-md-6">
                <div 
                  className="user-card animate-fade-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="d-flex align-items-center p-3">
                    <div className="user-avatar me-3">
                      {u.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-semibold text-truncate">{u.name}</div>
                      <div className="text-muted small">
                        <div className="text-truncate">
                          <i className="bi bi-telephone me-1"></i>
                          {u.phone || 'No phone'}
                        </div>
                        <div>
                          <i className="bi bi-calendar me-1"></i>
                          Joined: {u.joined ? new Date(u.joined).toLocaleDateString() : "-"}
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className={`badge status-badge ${u.status === "active" ? "bg-success" : "bg-secondary"}`}>
                        {u.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12">
                <div className="text-center py-5 empty-state">
                  <i className="bi bi-people"></i>
                  <div>No users found</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}