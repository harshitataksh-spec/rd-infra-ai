import { AdminSessionUser, AdminAuthResponse, AdminAuditEntry } from '../types';

const TOKEN_KEY = 'rd_infra_admin_token';
const USER_KEY = 'rd_infra_admin_user';

export function getAdminToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string, remember: boolean = false): void {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (e) {
    console.error('Failed to store admin token', e);
  }
}

export function clearAdminToken(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Failed to clear admin token', e);
  }
}

export function getStoredAdminUser(): AdminSessionUser | null {
  try {
    const raw = sessionStorage.getItem(USER_KEY) || localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredAdminUser(user: AdminSessionUser, remember: boolean = false): void {
  try {
    const json = JSON.stringify(user);
    sessionStorage.setItem(USER_KEY, json);
    if (remember) {
      localStorage.setItem(USER_KEY, json);
    }
  } catch (e) {
    console.error('Failed to store admin user', e);
  }
}

// Perform server-side login
export async function loginAdmin(
  identifier: string,
  plainPassword: string,
  remember: boolean = false
): Promise<AdminAuthResponse> {
  try {
    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password: plainPassword }),
    });

    const data = await res.json();
    if (res.ok && data.success && data.token && data.user) {
      setAdminToken(data.token, remember);
      setStoredAdminUser(data.user, remember);
      return {
        success: true,
        token: data.token,
        user: data.user,
        expiresAt: data.expiresAt,
      };
    }

    return {
      success: false,
      error: data.error || 'Authentication failed. Please verify your credentials.',
      lockoutRemainingMinutes: data.remainingMinutes,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network connection to authentication server failed.',
    };
  }
}

// Verify current session with server
export async function verifyCurrentSession(): Promise<{
  authenticated: boolean;
  user?: AdminSessionUser;
  expiresAt?: string;
  expired?: boolean;
}> {
  const token = getAdminToken();
  if (!token) {
    return { authenticated: false };
  }

  try {
    const res = await fetch('/api/admin/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok && data.success && data.user) {
      setStoredAdminUser(data.user);
      return {
        authenticated: true,
        user: data.user,
        expiresAt: data.expiresAt,
      };
    }

    // Token rejected or expired on server
    clearAdminToken();
    return {
      authenticated: false,
      expired: data.code === 'SESSION_EXPIRED',
    };
  } catch {
    // If offline/error, check if we had a stored user
    return { authenticated: false };
  }
}

// Revoke session on server and clear client
export async function logoutAdmin(): Promise<void> {
  const token = getAdminToken();
  if (token) {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // Ignore network error on logout
    }
  }
  clearAdminToken();
}

// Send session heartbeat
export async function sendSessionHeartbeat(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/admin/auth/heartbeat', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Fetch security audit logs
export async function fetchAuditLogs(): Promise<AdminAuditEntry[]> {
  const token = getAdminToken();
  if (!token) return [];

  try {
    const res = await fetch('/api/admin/security/audit-logs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.success ? data.logs : [];
  } catch {
    return [];
  }
}

// Fetch active sessions (Super Admin only)
export async function fetchActiveSessions(): Promise<any[]> {
  const token = getAdminToken();
  if (!token) return [];

  try {
    const res = await fetch('/api/admin/security/sessions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.success ? data.sessions : [];
  } catch {
    return [];
  }
}

// Fetch admin users (Super Admin only)
export async function fetchAdminUsers(): Promise<any[]> {
  const token = getAdminToken();
  if (!token) return [];

  try {
    const res = await fetch('/api/admin/security/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.success ? data.users : [];
  } catch {
    return [];
  }
}
