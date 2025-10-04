// src/utils/seedAdmin.js
import adminFile from "../data/admin.json";
import { loadJSON, saveJSON } from "./storage";

/**
 * Ensure localStorage has a consistent admins array under key "kookit_admins".
 * Call this once on app startup (optional) or when reset is used.
 */
export function seedAdminIfMissing() {
  try {
    const stored = loadJSON("kookit_admins", null);
    if (stored && Array.isArray(stored.admins) && stored.admins.length > 0) return;
    // adminFile might be a single object or an object with `admins` array — normalize
    const adminsArray = Array.isArray(adminFile)
      ? adminFile
      : (adminFile.admins ?? (adminFile.id ? [adminFile] : []));
    if (adminsArray.length > 0) saveJSON("kookit_admins", { admins: adminsArray });
  } catch (e) {
    console.error("seedAdminIfMissing error", e);
  }
}
