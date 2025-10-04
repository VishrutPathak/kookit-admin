// src/pages/Admins.jsx
import React, { useEffect, useState } from "react";
import adminData from "../data/admin.json"; // your single-object file (or it may contain admins/admin arrays)
import { loadJSON, saveJSON, uid } from "../utils/storage";

/**
 * Admins page
 * - Normalizes adminData (single object or admins/admin arrays)
 * - Persists to localStorage under key "kookit_admins" as { admins: [...] }
 */

export default function Admins() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    try {
      const stored = loadJSON("kookit_admins", null);

      // Possible sources:
      // - localStorage -> stored.admins (preferred)
      // - admin.json -> admins (array)
      // - admin.json -> admin (array)
      // - admin.json -> single object { id, username, ... }
      const fromStorage = stored?.admins;
      const fromFileAdmins = adminData?.admins;
      const fromFileAdmin = adminData?.admin;
      const fromFileSingle = (adminData && !Array.isArray(adminData) && adminData.id) ? [adminData] : null;

      const list = Array.isArray(fromStorage)
        ? fromStorage
        : Array.isArray(fromFileAdmins)
        ? fromFileAdmins
        : Array.isArray(fromFileAdmin)
        ? fromFileAdmin
        : Array.isArray(fromFileSingle)
        ? fromFileSingle
        : [];

      setAdmins(list);
    } catch (err) {
      console.error("Failed to load admins:", err);
      setAdmins([]);
    }
  }, []);

  const persist = (next) => {
    setAdmins(next);
    saveJSON("kookit_admins", { admins: next });
  };

  const addAdmin = () => {
    const name = prompt("Name");
    const username = prompt("Username (email)");
    if (!name || !username) return;
    const newA = { id: uid("a"), name, username, role: "admin", lastLogin: null };
    persist([newA, ...admins]);
  };

  const removeAdmin = (id) => {
    if (!confirm("Delete admin?")) return;
    persist(admins.filter(a => a.id !== id));
  };

  // Ensure adminList is always an array for rendering
  const adminList = Array.isArray(admins) ? admins : [];

  const resetFromFile = () => {
    const fromFileAdmins = adminData?.admins ?? adminData?.admin ?? (adminData?.id ? [adminData] : []);
    saveJSON("kookit_admins", { admins: fromFileAdmins });
    setAdmins(Array.isArray(fromFileAdmins) ? fromFileAdmins : []);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Admins</h3>
        <div>
          <button className="btn btn-primary me-2" onClick={addAdmin}>Add Admin</button>
          <button className="btn btn-outline-secondary" onClick={resetFromFile}>Reset</button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-sm align-middle">
            <thead className="table-light">
              <tr><th>Name</th><th>Username</th><th>Role</th><th>Last Login</th><th></th></tr>
            </thead>
            <tbody>
              {adminList.length > 0 ? (
                adminList.map(a => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.username}</td>
                    <td>{a.role ?? "admin"}</td>
                    <td>{a.lastLogin ? new Date(a.lastLogin).toLocaleString() : "-"}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-danger" onClick={() => removeAdmin(a.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center text-muted">No admins</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
