// src/pages/Settings.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, updatePassword, logout } = useAuth();
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!pass) return setMsg("Enter a new password");
    const res = updatePassword(pass);
    if (res.ok) {
      setMsg("Password updated locally.");
      setPass("");
    } else {
      setMsg(res.message || "Error updating password");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-3">Settings</h3>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h6>Admin Account</h6>
          <p className="mb-2"><strong>Username:</strong> {user?.username}</p>
          <form onSubmit={submit} className="row g-2 align-items-center">
            <div className="col-auto" style={{ minWidth: 300 }}>
              <input
                className="form-control"
                type="password"
                placeholder="New password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-success">Change Password</button>
            </div>
          </form>
          {msg && (
            <div className="mt-3 alert alert-success py-2 mb-0">{msg}</div>
          )}
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h6>Session</h6>
          <p className="mb-2 text-muted small">
            Click below to securely end your admin session.
          </p>
          <button className="btn btn-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>
      </div>
    </div>
  );
}
