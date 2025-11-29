// src/utils/api.js
const API_BASE_URL = "http://localhost:3001";

const api = {
  get: async (endpoint, token) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return await res.json();
  },

  post: async (endpoint, data, token) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Erro na requisição");
    }

    return await res.json();
  },
};

export default api;
