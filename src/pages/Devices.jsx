// src/pages/Devices.jsx
import React, { useEffect, useState } from "react";
import devicesData from "../data/devices.json";
import usersData from "../data/users.json";
import { loadJSON, saveJSON, uid } from "../utils/storage";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dstored = loadJSON("kookit_devices", null);
    const ustored = loadJSON("kookit_users", null);
    setDevices(dstored?.devices ?? devicesData.devices);
    setUsers(ustored?.users ?? usersData.users);
  }, []);

  const persist = (next) => {
    setDevices(next);
    saveJSON("kookit_devices", { devices: next });
  };

  const addDevice = () => {
    const name = prompt("Device name");
    if (!name) return;
    const dateSold = prompt("date sold (YYYY-MM-DD)", new Date().toISOString().slice(0,10));
    const newD = { id: uid("d"), name, dateSold, primaryUserId: null, secondaryUserId: null, status: "active" };
    persist([newD, ...devices]);
  };

  const removeDevice = (id) => {
    if (!confirm("Delete device?")) return;
    persist(devices.filter(d => d.id !== id));
  };

  const assignPrimary = (deviceId) => {
    const userId = prompt("Primary user id (e.g. u1001)");
    if (!userId) return;
    const next = devices.map(d => d.id === deviceId ? { ...d, primaryUserId: userId } : d);
    persist(next);
  };

  const getUserName = (id) => users.find(u => u.id === id)?.name ?? (id ? `Unknown (${id})` : "-");

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Devices</h3>
        <div>
          <button className="btn btn-primary me-2" onClick={addDevice}>Add Device</button>
          <button className="btn btn-outline-secondary" onClick={() => { saveJSON("kookit_devices", { devices: devicesData.devices }); setDevices(devicesData.devices); }}>Reset</button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-sm align-middle">
            <thead className="table-light">
              <tr><th>Name</th><th>Date Sold</th><th>Primary User</th><th>Secondary User</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {devices.map(d => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{new Date(d.dateSold).toLocaleDateString()}</td>
                  <td>{getUserName(d.primaryUserId)}</td>
                  <td>{getUserName(d.secondaryUserId)}</td>
                  <td><span className={`badge ${d.status==="active" ? "bg-success" : "bg-secondary"}`}>{d.status}</span></td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={()=>assignPrimary(d.id)}>Assign primary</button>
                    <button className="btn btn-sm btn-danger" onClick={()=>removeDevice(d.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {devices.length===0 && <tr><td colSpan="6" className="text-center text-muted">No devices</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
