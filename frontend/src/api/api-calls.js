const API_BASE = import.meta.env.VITE_API_BASE || "/api";

async function apiFetch(path, options = {}) {
  // Don't set Content-Type if sending FormData (browser sets it with boundary)
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_BASE}${path}`, {
    headers: isFormData ? {} : { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(`API ${res.status}: ${body?.message || res.statusText}`);
  }
  return res.json();
}

export default apiFetch;
