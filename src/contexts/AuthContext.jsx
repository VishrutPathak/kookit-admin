// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import adminDefault from "../data/admin.json";
import { loadJSON, saveJSON } from "../utils/storage";

const AuthContext = createContext();

function getAdminsFromDefaults() {
  // Normalize adminDefault (file) to array
  if (!adminDefault) return [];
  if (Array.isArray(adminDefault)) return adminDefault;
  if (Array.isArray(adminDefault.admins)) return adminDefault.admins;
  if (Array.isArray(adminDefault.admin)) return adminDefault.admin;
  if (adminDefault.id || adminDefault.username) return [adminDefault];
  return [];
}

function getAdmins() {
  // 1) try localStorage key that we use elsewhere in the app
  try {
    const stored = loadJSON("kookit_admins", null); // expects { admins: [...] }
    if (stored && Array.isArray(stored.admins)) return stored.admins;
  } catch (e) {
    // ignore
  }

  // 2) try a single-admin override (legacy) in localStorage (kookit_admin_creds)
  try {
    const override = loadJSON("kookit_admin_creds", null); // expects single object
    if (override && override.username) return [override];
  } catch (e) {
    // ignore
  }

  // 3) fallback to bundled admin.json (may be single object or array)
  return getAdminsFromDefaults();
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("kookit_admin_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("kookit_admin_user", JSON.stringify(user));
    else localStorage.removeItem("kookit_admin_user");
  }, [user]);

  const login = (username, password) => {
    const admins = getAdmins();
    const found = admins.find(a => String(a.username).toLowerCase() === String(username).toLowerCase());
    if (!found) return { ok: false, message: "Unknown user" };
    if (found.password !== password) return { ok: false, message: "Invalid password" };

    const safeUser = {
      id: found.id ?? found.username,
      username: found.username,
      name: found.name ?? found.username,
      role: found.role ?? "admin"
    };

    setUser(safeUser);
    localStorage.setItem("kookit_admin_user", JSON.stringify(safeUser));
    return { ok: true, user: safeUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kookit_admin_user");
  };

  /**
   * Update password for the currently signed-in admin.
   * - If localStorage.kookit_admins exists, update the matching admin in that array.
   * - Else update localStorage.kookit_admin_creds as a single-object override for convenience.
   *
   * Note: This is for dev/prototype only. Do not treat this as secure or production-ready.
   */
  const updatePassword = (newPassword) => {
    if (!user || !user.username) return { ok: false, message: "No signed-in user" };

    // Try to update array in kookit_admins
    try {
      const stored = loadJSON("kookit_admins", null);
      if (stored && Array.isArray(stored.admins)) {
        const admins = stored.admins;
        const idx = admins.findIndex(a => String(a.username).toLowerCase() === String(user.username).toLowerCase());
        if (idx >= 0) {
          admins[idx] = { ...admins[idx], password: newPassword };
          saveJSON("kookit_admins", { admins });
          return { ok: true };
        }
      }
    } catch (e) {
      console.warn("updatePassword: failed to update kookit_admins array", e);
    }

    // Fallback: write single-object override to kookit_admin_creds
    try {
      // preserve other properties if admin exists in bundled file
      const defaults = getAdminsFromDefaults();
      const match = defaults.find(a => String(a.username).toLowerCase() === String(user.username).toLowerCase()) ?? { username: user.username, id: user.id, name: user.name };
      const override = { ...match, password: newPassword };
      localStorage.setItem("kookit_admin_creds", JSON.stringify(override));
      return { ok: true };
    } catch (e) {
      console.error("updatePassword fallback failed", e);
      return { ok: false, message: "Failed to update password" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
