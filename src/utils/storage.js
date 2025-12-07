export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key, defaultValue) {
  const raw = localStorage.getItem(key);
  if (!raw) return defaultValue;
  try {
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

export function removeFromStorage(key) {
  localStorage.removeItem(key);
}
