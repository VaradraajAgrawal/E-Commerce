const API_URL = "http://localhost:8000";

export const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && token !== "undefined"
      ? { Authorization: `Bearer ${token}` }
      : {}),
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return { error: true, status: res.status, data };
  }

  return data;
};
