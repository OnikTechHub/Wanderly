import { cookies } from "next/headers";
import { API_URL } from "./api";
import { JwtPayload } from "./types";

export const AUTH_COOKIE = "wanderly_token";

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
