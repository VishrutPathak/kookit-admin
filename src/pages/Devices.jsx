// src/pages/Devices.jsx
import React, { useEffect, useState } from "react";
import devicesData from "../data/devices.json";
import usersData from "../data/users.json";
import { loadJSON, saveJSON, uid } from "../utils/storage";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const dstored = loadJSON("kookit_devices", null);
        const ustored = loadJSON("kookit_users", null);
        setDevices(dstored?.devices ?? devicesData.devices);
        setUsers(ustored?.users ?? usersData.users);
      } catch (error) {
        console.error("Error loading data:", error);
        setDevices(devicesData.devices);
        setUsers(usersData.users);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const persist = (next) => {
    setDevices(next);
    saveJSON("kookit_devices", { devices: next });
  };

  const addDevice = () => {
    const name = prompt("Device name");
    if (!name) return;
    const dateSold = prompt("Date sold (YYYY-MM-DD)", new Date().toISOString().slice(0,10));
    const newD = { 
      id: uid("d"), 
      name, 
      dateSold, 
      primaryUserId: null, 
      secondaryUserId: null, 
      status: "active" 
    };
    persist([newD, ...devices]);
  };

  const removeDevice = (id) => {
    if (!confirm("Are you sure you want to delete this device?")) return;
    persist(devices.filter(d => d.id !== id));
  };

  const assignPrimary = (deviceId) => {
    const userId = prompt("Primary user ID (e.g., u1001)");
    if (!userId) return;
    const next = devices.map(d => d.id === deviceId ? { ...d, primaryUserId: userId } : d);
    persist(next);
  };

  const assignSecondary = (deviceId) => {
    const userId = prompt("Secondary user ID (e.g., u1002)");
    if (!userId) return;
    const next = devices.map(d => d.id === deviceId ? { ...d, secondaryUserId: userId } : d);
    persist(next);
  };

  const toggleStatus = (deviceId) => {
    const next = devices.map(d => 
      d.id === deviceId ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d
    );
    persist(next);
  };

  const getUserName = (id) => users.find(u => u.id === id)?.name ?? (id ? `Unknown (${id})` : "-");

  const resetToDefaults = () => {
    if (!confirm("Reset all devices to default? This cannot be undone.")) return;
    saveJSON("kookit_devices", { devices: devicesData.devices });
    setDevices(devicesData.devices);
  };

  // Filter devices based on search and filters
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || device.status === statusFilter;
    const matchesUser = selectedUser === "all" || 
                       device.primaryUserId === selectedUser || 
                       device.secondaryUserId === selectedUser;
    return matchesSearch && matchesStatus && matchesUser;
  });

  // Get unique users for filter
  const userOptions = users.map(user => ({
    id: user.id,
    name: user.name
  }));

  // Internal CSS Styles
  const styles = `
    .devices-container {
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

    /* Table Styles */
    .devices-table {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e9ecef;
    }

    .table-row {
      transition: all 0.3s ease;
      border-bottom: 1px solid #f1f5f9;
    }

    .table-row:hover {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      transform: translateX(5px);
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .table-row:last-child {
      border-bottom: none;
    }

    /* Status Badges */
    .status-badge {
      padding: 0.35em 0.8em;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .status-badge:hover {
      transform: scale(1.05);
    }

    .status-active {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .status-inactive {
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      color: white;
    }

    /* User Badges */
    .user-badge {
      background: rgba(79, 70, 229, 0.1);
      color: #4f46e5;
      padding: 0.25em 0.6em;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 500;
      border: 1px solid rgba(79, 70, 229, 0.2);
    }

    .user-badge-secondary {
      background: rgba(107, 114, 128, 0.1);
      color: #6b7280;
      border-color: rgba(107, 114, 128, 0.2);
    }

    /* Buttons */
    .btn-glow {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .btn-glow:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
    }

    .btn-icon {
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .btn-icon:hover {
      transform: scale(1.1);
    }

    /* Search and Filter */
    .search-box {
      border-radius: 10px;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .search-box:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .filter-select {
      border-radius: 10px;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .filter-select:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    /* Loading Skeleton */
    .loading-skeleton .skeleton-card {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    .skeleton-title, .skeleton-subtitle, .skeleton-text, 
    .skeleton-button, .skeleton-row {
      background: #e0e0e0;
      border-radius: 4px;
      animation: loading 1.5s infinite;
    }

    .skeleton-title { height: 24px; width: 200px; margin-bottom: 10px; }
    .skeleton-subtitle { height: 16px; width: 150px; margin-bottom: 20px; }
    .skeleton-text { height: 14px; margin-bottom: 8px; }
    .skeleton-button { height: 32px; width: 80px; margin-right: 8px; }
    .skeleton-row { height: 60px; margin-bottom: 10px; border-radius: 8px; }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Empty State */
    .empty-state {
      padding: 3rem 2rem;
      text-align: center;
      color: #6c757d;
    }

    .empty-state i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Text Gradient */
    .text-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Stats Cards */
    .stat-card {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 1px solid #e9ecef;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    /* Device Icon */
    .device-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-right: 12px;
    }
  `;

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="loading-skeleton">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="skeleton-title"></div>
        <div className="d-flex">
          <div className="skeleton-button" style={{ width: '140px' }}></div>
          <div className="skeleton-button" style={{ width: '100px', marginLeft: '10px' }}></div>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="skeleton-text" style={{ height: '45px' }}></div>
        </div>
        <div className="col-md-3">
          <div className="skeleton-text" style={{ height: '45px' }}></div>
        </div>
        <div className="col-md-3">
          <div className="skeleton-text" style={{ height: '45px' }}></div>
        </div>
        <div className="col-md-2">
          <div className="skeleton-text" style={{ height: '45px' }}></div>
        </div>
      </div>

      <div className="card skeleton-card">
        <div className="card-body">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="skeleton-row mb-3"></div>
          ))}
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
    <div className="container-fluid devices-container">
      <style>{styles}</style>

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 animate-fade-in">
        <div>
          <h2 className="h3 mb-1 fw-bold text-gradient">Device Management</h2>
          <p className="text-muted mb-0">Manage and track all registered devices</p>
        </div>
        <div className="text-end">
          <small className="text-muted d-block">Total Devices</small>
          <small className="fw-semibold">{devices.length} devices</small>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="col-md-3">
          <div className="stat-card p-3 text-center">
            <div className="h4 mb-1 text-primary">{devices.length}</div>
            <div className="text-muted small">Total Devices</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-3 text-center">
            <div className="h4 mb-1 text-success">{devices.filter(d => d.status === "active").length}</div>
            <div className="text-muted small">Active Devices</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-3 text-center">
            <div className="h4 mb-1 text-warning">{devices.filter(d => d.primaryUserId).length}</div>
            <div className="text-muted small">Assigned Devices</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-3 text-center">
            <div className="h4 mb-1 text-info">{filteredDevices.length}</div>
            <div className="text-muted small">Filtered Results</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-glow" onClick={addDevice}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Device
          </button>
          <button className="btn btn-outline-secondary btn-glow" onClick={resetToDefaults}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="row mb-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control search-box border-start-0"
              placeholder="Search devices by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select 
            className="form-select filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="col-md-3">
          <select 
            className="form-select filter-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="all">All Users</option>
            {userOptions.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <div className="text-muted small">
            Showing {filteredDevices.length} of {devices.length}
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="card shadow-sm devices-table animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <div className="card-header bg-transparent border-bottom-0">
          <h6 className="mb-0 fw-semibold">Devices List</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ minWidth: 200 }} className="ps-4">Device</th>
                  <th style={{ minWidth: 120 }}>Date Sold</th>
                  <th style={{ minWidth: 150 }}>Primary User</th>
                  <th style={{ minWidth: 150 }}>Secondary User</th>
                  <th style={{ minWidth: 100 }}>Status</th>
                  <th style={{ width: 200 }} className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((d, index) => (
                  <tr 
                    key={d.id}
                    className={`table-row animate-fade-in ${hoveredRow === d.id ? 'table-active' : ''}`}
                    style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                    onMouseEnter={() => setHoveredRow(d.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="device-icon">
                          <i className="bi bi-laptop"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">{d.name}</div>
                          <div className="text-muted small">{d.id}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="text-muted">
                        {new Date(d.dateSold).toLocaleDateString()}
                      </span>
                    </td>

                    <td>
                      {d.primaryUserId ? (
                        <span className="user-badge">
                          {getUserName(d.primaryUserId)}
                        </span>
                      ) : (
                        <span className="text-muted small">Not assigned</span>
                      )}
                    </td>

                    <td>
                      {d.secondaryUserId ? (
                        <span className="user-badge user-badge-secondary">
                          {getUserName(d.secondaryUserId)}
                        </span>
                      ) : (
                        <span className="text-muted small">Not assigned</span>
                      )}
                    </td>

                    <td>
                      <span 
                        className={`status-badge ${d.status === "active" ? "status-active" : "status-inactive"}`}
                        onClick={() => toggleStatus(d.id)}
                        title="Click to toggle status"
                      >
                        {d.status}
                        <i className={`bi ${d.status === "active" ? "bi-check-circle" : "bi-dash-circle"} ms-1`}></i>
                      </span>
                    </td>

                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-1">
                        <button 
                          className="btn btn-sm btn-outline-primary btn-icon" 
                          onClick={() => assignPrimary(d.id)}
                          title="Assign primary user"
                        >
                          <i className="bi bi-person-plus"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-success btn-icon" 
                          onClick={() => assignSecondary(d.id)}
                          title="Assign secondary user"
                        >
                          <i className="bi bi-person"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger btn-icon" 
                          onClick={() => removeDevice(d.id)}
                          title="Delete device"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Empty State */}
                {filteredDevices.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-5 empty-state">
                      <i className="bi bi-laptop"></i>
                      <h5 className="text-muted mt-3 mb-2">No Devices Found</h5>
                      <p className="text-muted mb-0">
                        {searchTerm || statusFilter !== "all" || selectedUser !== "all" 
                          ? "Try adjusting your search or filter criteria" 
                          : "Get started by adding your first device"
                        }
                      </p>
                      {(searchTerm || statusFilter !== "all" || selectedUser !== "all") && (
                        <button 
                          className="btn btn-outline-primary mt-3"
                          onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("all");
                            setSelectedUser("all");
                          }}
                        >
                          Clear Filters
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}