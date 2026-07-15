
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/** Client-side fetch wrapper — always sends the auth cookie to the Express API. */
export async function apiFetch(path: string, options: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}
