import type { AuthUser } from "../auth/authTypes";

export function getStoredUser(): AuthUser | null {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  return JSON.parse(user);
}

export function getStoredAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

export function getStoredRefreshToken(): string | null {
  return localStorage.getItem("refresh_token");
}

export function clearAuthStorage(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
}
