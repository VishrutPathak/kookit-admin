// src/pages/Settings.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Settings() {
  const { user, updatePassword } = useAuth();
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!pass) return setMsg("Enter a new password");
    updatePassword(pass);
    setMsg("Password updated locally.");
    setPass("");
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-3">Settings</h3>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h6>Admin Account</h6>
          <p className="mb-2"><strong>Username:</strong> {user.username}</p>
          <form onSubmit={submit} className="row g-2 align-items-center">
            <div className="col-auto" style={{minWidth: 300}}>
              <input className="form-control" placeholder="New password" value={pass} onChange={(e)=>setPass(e.target.value)} />
            </div>
            <div className="col-auto">
              <button className="btn btn-success">Change password</button>
            </div>
          </form>
          {msg && <div className="mt-3 alert alert-success py-2">{msg}</div>}
        </div>
      </div>
    </div>
  );
}
