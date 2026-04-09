const API_BASE = import.meta.env.VITE_API_BASE || "/api";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(`API ${res.status}: ${body?.message || res.statusText}`);
  }
  return res.json();
}

export default apiFetch;
