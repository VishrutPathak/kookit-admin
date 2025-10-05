// src/pages/Support.jsx
import React, { useEffect, useMemo, useState } from "react";
import { loadJSON, saveJSON, uid } from "../utils/storage";
import usersData from "../data/users.json";

/**
 * Support page
 * - Tickets are stored in localStorage under key "kookit_tickets"
 * - Ticket shape:
 *   { id, subject, userId (optional), status: "open"|"resolved", createdAt, messages: [{ id, author, text, createdAt }] }
 */

const SAMPLE_TICKETS = [
  {
    id: "t1",
    subject: "Device not connecting to Wi-Fi",
    userId: "u1001",
    status: "open",
    createdAt: "2025-09-22T10:15:00Z",
    messages: [
      { id: "m1", author: "Asha Rao", text: "My Kookit Pad A1 won't connect to home Wi-Fi.", createdAt: "2025-09-22T10:15:00Z" },
      { id: "m2", author: "Support", text: "Hi Asha — can you confirm signal strength near the device?", createdAt: "2025-09-22T11:05:00Z" },
    ],
  },
  {
    id: "t2",
    subject: "How to reset recipe data",
    userId: null,
    status: "resolved",
    createdAt: "2025-09-20T08:30:00Z",
    messages: [
      { id: "m1", author: "Admin", text: "Guide: go to Recipes > Reset to restore defaults.", createdAt: "2025-09-20T08:30:00Z" }
    ],
  }
];

function formatDate(d) {
  try { return new Date(d).toLocaleString(); } catch { return d; }
}

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("open");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null); // selected ticket id
  const [newMsg, setNewMsg] = useState("");
  const [subject, setSubject] = useState("");
  const [userId, setUserId] = useState("");
  const users = useMemo(() => {
    const stored = loadJSON("kookit_users", null);
    return stored?.users ?? usersData?.users ?? [];
  }, []);

  useEffect(() => {
    try {
      const stored = loadJSON("kookit_tickets", null);
      const list = stored?.tickets ?? SAMPLE_TICKETS;
      setTickets(Array.isArray(list) ? list : SAMPLE_TICKETS);
    } catch (e) {
      console.error("Failed to load tickets:", e);
      setTickets(SAMPLE_TICKETS);
    }
  }, []);

  const persist = (next) => {
    setTickets(next);
    saveJSON("kookit_tickets", { tickets: next });
  };

  const filtered = tickets.filter(t => {
    if (filter !== "all" && t.status !== filter) return false;
    if (!q) return true;
    const ql = q.toLowerCase();
    if ((t.subject || "").toLowerCase().includes(ql)) return true;
    if ((t.messages || []).some(m => (m.text || "").toLowerCase().includes(ql) || (m.author || "").toLowerCase().includes(ql))) return true;
    return false;
  });

  const openTicket = (id) => setSelected(id);

  const createTicket = (e) => {
    e.preventDefault();
    if (!subject?.trim()) return alert("Enter a subject");
    const id = uid("t");
    const msgId = uid("m");
    const ticket = {
      id,
      subject: subject.trim(),
      userId: userId || null,
      status: "open",
      createdAt: new Date().toISOString(),
      messages: [
        { id: msgId, author: userId ? (users.find(u => u.id === userId)?.name ?? "User") : "Admin", text: newMsg || "(no message)", createdAt: new Date().toISOString() }
      ]
    };
    persist([ticket, ...tickets]);
    setSubject("");
    setUserId("");
    setNewMsg("");
    setSelected(id);
  };

  const addReply = (ticketId) => {
    if (!newMsg?.trim()) return;
    const next = tickets.map(t => {
      if (t.id !== ticketId) return t;
      const msg = { id: uid("m"), author: "Support", text: newMsg.trim(), createdAt: new Date().toISOString() };
      return { ...t, messages: [...(t.messages||[]), msg], status: "open" };
    });
    persist(next);
    setNewMsg("");
    setSelected(ticketId);
  };

  const markResolved = (ticketId) => {
    if (!confirm("Mark ticket resolved?")) return;
    const next = tickets.map(t => t.id === ticketId ? { ...t, status: "resolved" } : t);
    persist(next);
    setSelected(ticketId);
  };

  const deleteTicket = (ticketId) => {
    if (!confirm("Delete ticket permanently?")) return;
    const next = tickets.filter(t => t.id !== ticketId);
    persist(next);
    setSelected(null);
  };

  const exportCSV = () => {
    const rows = [["ticketId","subject","status","createdAt","messageId","author","messageText","messageCreatedAt"]];
    tickets.forEach(t => {
      (t.messages || []).forEach(m => {
        rows.push([t.id, t.subject, t.status, t.createdAt, m.id, m.author, m.text, m.createdAt]);
      });
      if (!t.messages || t.messages.length === 0) {
        rows.push([t.id, t.subject, t.status, t.createdAt, "", "", "", ""]);
      }
    });
    const csv = rows.map(r => r.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kookit_tickets_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    saveJSON("kookit_tickets", { tickets: SAMPLE_TICKETS });
    setTickets(SAMPLE_TICKETS);
    setSelected(null);
  };

  const selectedTicket = tickets.find(t => t.id === selected);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
        <div>
          <h3>Support</h3>
          <div className="text-muted small">Manage support tickets, reply and resolve issues</div>
        </div>

        <div className="d-flex gap-2">
          <div className="input-group input-group-sm" style={{ minWidth: 220 }}>
            <input className="form-control form-control-sm" placeholder="Search tickets..." value={q} onChange={e=>setQ(e.target.value)} />
            <button className="btn btn-outline-secondary" onClick={()=>setQ("")}>Clear</button>
          </div>

          <select className="form-select form-select-sm" value={filter} onChange={e=>setFilter(e.target.value)}>
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
            <option value="all">All</option>
          </select>

          <button className="btn btn-outline-success btn-sm" onClick={exportCSV}>Export CSV</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={reset}>Reset</button>
        </div>
      </div>

      <div className="row g-3">
        {/* Left: create + list */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h6 className="mb-2">New ticket</h6>
              <form onSubmit={createTicket}>
                <div className="mb-2">
                  <input className="form-control form-control-sm" placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} />
                </div>

                <div className="mb-2">
                  <select className="form-select form-select-sm" value={userId} onChange={e=>setUserId(e.target.value)}>
                    <option value="">(no user)</option>
                    {users.map(u => <option key={u.id} value={u.id}>{u.name} — {u.id}</option>)}
                  </select>
                </div>

                <div className="mb-2">
                  <textarea className="form-control form-control-sm" rows={3} placeholder="Message (optional)" value={newMsg} onChange={e=>setNewMsg(e.target.value)} />
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm" type="submit">Create</button>
                  <button className="btn btn-outline-secondary btn-sm" type="button" onClick={()=>{ setSubject(""); setNewMsg(""); setUserId(""); }}>Clear</button>
                </div>
              </form>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-2" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {filtered.length === 0 && <div className="text-center text-muted p-3">No tickets</div>}
              <ul className="list-group">
                {filtered.map(t => (
                  <li key={t.id} className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${selected === t.id ? "active text-white" : ""}`} style={{ cursor: "pointer" }} onClick={() => openTicket(t.id)}>
                    <div style={{ flex: 1 }}>
                      <div className="fw-semibold">{t.subject}</div>
                      <div className="text-muted small">{t.userId ? (users.find(u=>u.id===t.userId)?.name ?? t.userId) : "Admin/Guest"}</div>
                      <div className="text-muted small">{formatDate(t.createdAt)}</div>
                    </div>
                    <div className="ms-2 text-nowrap">
                      <span className={`badge ${t.status === "open" ? "bg-warning text-dark" : "bg-success"}`}>{t.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: selected ticket */}
        <div className="col-md-8">
          {!selectedTicket ? (
            <div className="card shadow-sm">
              <div className="card-body text-center text-muted">
                Select a ticket to view details.
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="mb-1">{selectedTicket.subject}</h5>
                    <div className="small text-muted">{selectedTicket.userId ? (users.find(u=>u.id===selectedTicket.userId)?.name ?? selectedTicket.userId) : "Admin/Guest"} • {formatDate(selectedTicket.createdAt)}</div>
                  </div>

                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-secondary" onClick={()=>deleteTicket(selectedTicket.id)}>Delete</button>
                    {selectedTicket.status === "open" ? (
                      <button className="btn btn-sm btn-success" onClick={()=>markResolved(selectedTicket.id)}>Mark resolved</button>
                    ) : (
                      <button className="btn btn-sm btn-warning" onClick={()=>{ if (confirm("Re-open ticket?")) { persist(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: "open" } : t)); } }}>Re-open</button>
                    )}
                  </div>
                </div>

                <div style={{ maxHeight: "48vh", overflowY: "auto", padding: 8, border: "1px solid #eee", borderRadius: 6, marginBottom: 12 }}>
                  {(selectedTicket.messages || []).map(m => (
                    <div key={m.id} className="mb-3">
                      <div className="d-flex justify-content-between">
                        <div className="fw-semibold">{m.author}</div>
                        <div className="text-muted small">{formatDate(m.createdAt)}</div>
                      </div>
                      <div>{m.text}</div>
                      <hr />
                    </div>
                  ))}
                </div>

                <div>
                  <textarea className="form-control mb-2" rows={3} placeholder="Write a reply..." value={newMsg} onChange={e=>setNewMsg(e.target.value)} />
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-outline-secondary btn-sm" onClick={()=>setNewMsg("")}>Clear</button>
                    <button className="btn btn-primary btn-sm" onClick={()=>addReply(selectedTicket.id)}>Send reply</button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
