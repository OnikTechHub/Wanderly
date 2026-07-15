import { cookies } from "next/headers";
import { API_URL } from "./api";
import { JwtPayload } from "./types";

export const AUTH_COOKIE = "wanderly_token";

/**
 * Reads the current user by forwarding the browser's auth cookie to the
 * Express backend's /api/auth/me endpoint. Used inside Server Components
 * (e.g. to protect /items/add, /items/manage, /dashboard).
 */
export async function getCurrentUser(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { cookie: `${AUTH_COOKIE}=${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user as JwtPayload | null;
}
