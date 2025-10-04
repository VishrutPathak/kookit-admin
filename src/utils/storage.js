// src/utils/storage.js
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
    return fallback;
  } catch (e) {
    console.error("loadJSON error", e);
    return fallback;
  }
}

export function saveJSON(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}
