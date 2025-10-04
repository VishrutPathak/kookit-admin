// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(username.trim(), password);
    if (res.ok) navigate("/dashboard");
    else setErr(res.message || "Invalid credentials");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient">
      <div className="card shadow-sm" style={{ width: 420 }}>
        <div className="card-body p-4">
          <h4 className="card-title mb-3 text-center">Admin Sign In</h4>

          {err && <div className="alert alert-danger py-2">{err}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small">Email</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="admin@kookit.io"
                autoComplete="username"
              />
            </div>

            <div className="mb-3">
              <label className="form-label small">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Sign In</button>
            </div>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">Demo: admin@kookit.io / admin123</small>
          </div>
        </div>
      </div>
    </div>
  );
}
