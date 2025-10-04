// src/pages/Users.jsx
import React, { useEffect, useState } from "react";
import usersData from "../data/users.json";
import { loadJSON, saveJSON, uid } from "../utils/storage";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null); // user for modal

  useEffect(() => {
    try {
      const stored = loadJSON("kookit_users", null);
      const list = stored?.users ?? usersData?.users ?? [];
      setUsers(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("Failed to load users:", e);
      setUsers([]);
    }
  }, []);

  const persist = (next) => {
    setUsers(next);
    saveJSON("kookit_users", { users: next });
  };

  const addUser = () => {
    const name = prompt("Name");
    const phone = prompt("Phone");
    if (!name || !phone) return;
    const newU = {
      id: uid("u"),
      name,
      phone,
      status: "active",
      joined: new Date().toISOString().slice(0, 10),
    };
    persist([newU, ...users]);
  };

  const removeUser = (id) => {
    if (!confirm("Delete user?")) return;
    persist(users.filter((u) => u.id !== id));
  };

  const toggleStatus = (id) => {
    persist(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
      )
    );
  };

  const reset = () => {
    const fromFile = usersData?.users ?? [];
    saveJSON("kookit_users", { users: fromFile });
    setUsers(Array.isArray(fromFile) ? fromFile : []);
  };

  const exportCSV = () => {
    const rows = [["id", "name", "phone", "status", "joined"]];
    users.forEach(u => rows.push([u.id, u.name, u.phone, u.status, u.joined]));
    const csv = rows.map(r => r.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kookit_users_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // filtering + search
  const filtered = (users || []).filter(u => {
    if (filter !== "all" && u.status !== filter) return false;
    if (!q) return true;
    const ql = q.toLowerCase();
    return (u.name || "").toLowerCase().includes(ql) || (u.phone || "").toLowerCase().includes(ql) || (u.id || "").toLowerCase().includes(ql);
  });

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2 mb-3">
        <div>
          <h3>Users</h3>
          <div className="text-muted small">Manage users, toggle status, export data</div>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <div className="input-group input-group-sm me-2" style={{ minWidth: 220 }}>
            <input className="form-control form-control-sm" placeholder="Search name / phone / id" value={q} onChange={e=>setQ(e.target.value)} />
            <button className="btn btn-outline-secondary" onClick={()=>setQ("")}>Clear</button>
          </div>

          <select className="form-select form-select-sm me-2" value={filter} onChange={e=>setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="btn btn-primary btn-sm" onClick={addUser}>Add User</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={reset}>Reset</button>
          <button className="btn btn-outline-success btn-sm" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-sm align-middle">
            <thead className="table-light">
              <tr><th>Name</th><th>Phone</th><th>Joined</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{cursor: "pointer"}} onClick={()=>setSelected(u)}>
                      <div className="fw-semibold">{u.name}</div>
                      <div className="text-muted small">{u.id}</div>
                    </div>
                  </td>
                  <td>{u.phone}</td>
                  <td>{u.joined ? new Date(u.joined).toLocaleDateString() : "-"}</td>
                  <td><span className={`badge ${u.status==="active" ? "bg-success" : "bg-secondary"}`}>{u.status}</span></td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-warning me-1" onClick={()=>toggleStatus(u.id)}>Toggle</button>
                    <button className="btn btn-sm btn-danger" onClick={()=>removeUser(u.id)}>Delete</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="text-center text-muted">No users</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bootstrap modal (simple) */}
      {selected && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={()=>setSelected(null)}></button>
              </div>
              <div className="modal-body">
                <dl className="row mb-0">
                  <dt className="col-4">ID</dt><dd className="col-8">{selected.id}</dd>
                  <dt className="col-4">Name</dt><dd className="col-8">{selected.name}</dd>
                  <dt className="col-4">Phone</dt><dd className="col-8">{selected.phone}</dd>
                  <dt className="col-4">Status</dt><dd className="col-8">{selected.status}</dd>
                  <dt className="col-4">Joined</dt><dd className="col-8">{selected.joined}</dd>
                </dl>
              </div>
              <div className="modal-footer">
                <button className="btn btn-sm btn-secondary" onClick={()=>{ setSelected(null); }}>Close</button>
                <button className="btn btn-sm btn-outline-primary" onClick={() => { toggleStatus(selected.id); setSelected(prev => ({ ...prev, status: prev.status === "active" ? "inactive" : "active" })); }}>Toggle status</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={()=>setSelected(null)}></div>
        </div>
      )}
    </div>
  );
}
