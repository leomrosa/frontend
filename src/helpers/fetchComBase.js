// src/utils/fetchComBase.js
const BASE_URL =
  process.env.REACT_APP_API_BASE_URL?.trim() || "http://localhost:3001";

export { BASE_URL };

/**
 * Wrapper de fetch que já cola o BASE_URL e adiciona headers comuns.
 * Mantém o Response original (não lê JSON aqui, para podermos logar raw).
 */
export default async function fetchComBase(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const finalOptions = {
    // Se não precisas de cookies/sessions, podes remover line abaixo:
    // credentials: "include",
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  console.log("[fetchComBase] → Request", { url, options: finalOptions });

  try {
    const res = await fetch(url, finalOptions);
    console.log("[fetchComBase] ← Response", {
      url,
      status: res.status,
      statusText: res.statusText,
      ok: res.ok,
    });
    return res;
  } catch (err) {
    console.error("[fetchComBase] ✖ Network error", err);
    throw err;
  }
}
