import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export type AdminRole = 'superadmin' | 'admin' | 'editor';

export interface StoredAdminUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: AdminRole;
  passwordHash: string;
  salt: string;
  avatarUrl?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AdminSession {
  token: string;
  userId: string;
  username: string;
  email: string;
  fullName: string;
  role: AdminRole;
  avatarUrl?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  lastActivityAt: string;
  expiresAt: string;
}

export interface AuditLogEntry {
  id: string;
  userId?: string;
  adminName: string;
  adminEmail?: string;
  action: string;
  recordType?: string;
  affectedRecord?: string;
  ipAddress?: string;
  status: 'success' | 'failed' | 'warning';
  details?: string;
  timestamp: string;
}

interface FailedAttemptRecord {
  count: number;
  firstAttemptTime: number;
  lastAttemptTime: number;
  lockedUntil?: number;
}

const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes inactivity timeout
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

// In-memory rate limiting store: key -> FailedAttemptRecord
const failedAttemptsMap = new Map<string, FailedAttemptRecord>();

function ensureDataDir(): string {
  const dataDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return dataDir;
}

// Password hashing helper using standard crypto PBKDF2-HMAC-SHA512
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

// Initialize seed admin users
function initDefaultUsers(): StoredAdminUser[] {
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || 'Admin@RD2026';
  
  const salt1 = generateSalt();
  const salt2 = generateSalt();
  const salt3 = generateSalt();

  return [
    {
      id: 'usr-1',
      username: 'ravinder',
      email: 'ravinder@rd-infra.in',
      fullName: 'Mr. Ravinder Deshwal',
      role: 'superadmin',
      salt: salt1,
      passwordHash: hashPassword(initialPassword, salt1),
      avatarUrl: '/images/director-portrait.jpg',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'usr-2',
      username: 'operations',
      email: 'operations@rd-infra.in',
      fullName: 'Operations & Compliance Lead',
      role: 'admin',
      salt: salt2,
      passwordHash: hashPassword(initialPassword, salt2),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'usr-3',
      username: 'editor',
      email: 'editor@rd-infra.in',
      fullName: 'Content & Inquiries Editor',
      role: 'editor',
      salt: salt3,
      passwordHash: hashPassword(initialPassword, salt3),
      createdAt: new Date().toISOString(),
    },
  ];
}

export function getAdminUsers(): StoredAdminUser[] {
  const dataDir = ensureDataDir();
  const usersFile = path.join(dataDir, 'admin_users.json');
  if (!fs.existsSync(usersFile)) {
    const defaults = initDefaultUsers();
    fs.writeFileSync(usersFile, JSON.stringify(defaults, null, 2), 'utf-8');
    return defaults;
  }
  try {
    const raw = fs.readFileSync(usersFile, 'utf-8');
    const users: StoredAdminUser[] = JSON.parse(raw);
    if (!users || users.length === 0) {
      const defaults = initDefaultUsers();
      fs.writeFileSync(usersFile, JSON.stringify(defaults, null, 2), 'utf-8');
      return defaults;
    }
    return users;
  } catch (err) {
    console.error('Failed to parse admin_users.json, resetting defaults:', err);
    const defaults = initDefaultUsers();
    fs.writeFileSync(usersFile, JSON.stringify(defaults, null, 2), 'utf-8');
    return defaults;
  }
}

export function saveAdminUsers(users: StoredAdminUser[]): void {
  const dataDir = ensureDataDir();
  const usersFile = path.join(dataDir, 'admin_users.json');
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}

// Active Sessions Store
function getSessionsFilePath(): string {
  return path.join(ensureDataDir(), 'admin_sessions.json');
}

export function getActiveSessions(): AdminSession[] {
  const filePath = getSessionsFilePath();
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const sessions: AdminSession[] = JSON.parse(raw);
    const now = Date.now();
    // Prune expired
    const active = sessions.filter((s) => new Date(s.expiresAt).getTime() > now);
    if (active.length !== sessions.length) {
      fs.writeFileSync(filePath, JSON.stringify(active, null, 2), 'utf-8');
    }
    return active;
  } catch {
    return [];
  }
}

function saveActiveSessions(sessions: AdminSession[]): void {
  const filePath = getSessionsFilePath();
  fs.writeFileSync(filePath, JSON.stringify(sessions, null, 2), 'utf-8');
}

// Audit logs
function getAuditLogsFilePath(): string {
  return path.join(ensureDataDir(), 'admin_audit_logs.json');
}

export function getAuditLogs(): AuditLogEntry[] {
  const filePath = getAuditLogsFilePath();
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
  const filePath = getAuditLogsFilePath();
  let logs = getAuditLogs();
  const newEntry: AuditLogEntry = {
    id: `audit-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };
  logs.unshift(newEntry);
  // Keep last 300 entries
  if (logs.length > 300) {
    logs = logs.slice(0, 300);
  }
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), 'utf-8');
}

// Rate Limiter Check
export function checkRateLimit(identifier: string): { allowed: boolean; remainingMinutes?: number } {
  const now = Date.now();
  const record = failedAttemptsMap.get(identifier);
  if (!record) return { allowed: true };

  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingMs = record.lockedUntil - now;
    return {
      allowed: false,
      remainingMinutes: Math.ceil(remainingMs / (60 * 1000)),
    };
  }

  // Clear if lockout expired or older than 15 mins
  if (now - record.lastAttemptTime > LOCKOUT_DURATION_MS) {
    failedAttemptsMap.delete(identifier);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(identifier: string): { locked: boolean; remainingMinutes?: number } {
  const now = Date.now();
  let record = failedAttemptsMap.get(identifier);
  if (!record) {
    record = {
      count: 1,
      firstAttemptTime: now,
      lastAttemptTime: now,
    };
  } else {
    // Reset if outside window
    if (now - record.firstAttemptTime > LOCKOUT_DURATION_MS) {
      record.count = 1;
      record.firstAttemptTime = now;
    } else {
      record.count += 1;
    }
    record.lastAttemptTime = now;
  }

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    failedAttemptsMap.set(identifier, record);
    return { locked: true, remainingMinutes: 15 };
  }

  failedAttemptsMap.set(identifier, record);
  return { locked: false };
}

export function clearFailedAttempts(identifier: string): void {
  failedAttemptsMap.delete(identifier);
}

// Authenticate user with password verification
export function authenticateAdmin(
  identifier: string, // username or email
  plainPassword: string,
  ipAddress?: string,
  userAgent?: string
): {
  success: boolean;
  user?: StoredAdminUser;
  session?: AdminSession;
  error?: string;
  locked?: boolean;
  remainingMinutes?: number;
} {
  const cleanId = (identifier || '').toLowerCase().trim();

  // Rate limit check
  const rateLimitKey = `${ipAddress || 'unknown'}_${cleanId}`;
  const rateCheck = checkRateLimit(rateLimitKey);
  if (!rateCheck.allowed) {
    addAuditLog({
      adminName: cleanId || 'Unknown',
      action: 'LOGIN_BLOCKED_RATE_LIMIT',
      status: 'failed',
      ipAddress,
      details: `Attempt blocked due to active rate limit lockout (${rateCheck.remainingMinutes}m remaining).`,
    });
    return {
      success: false,
      error: `Too many failed attempts. Account temporarily locked for security. Please try again in ${rateCheck.remainingMinutes} minutes.`,
      locked: true,
      remainingMinutes: rateCheck.remainingMinutes,
    };
  }

  if (!cleanId || !plainPassword) {
    return {
      success: false,
      error: 'Username/Email and password are required.',
    };
  }

  const users = getAdminUsers();
  const user = users.find(
    (u) => u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId
  );

  if (!user) {
    const lockResult = recordFailedAttempt(rateLimitKey);
    addAuditLog({
      adminName: cleanId,
      action: 'LOGIN_FAILED_UNKNOWN_USER',
      status: 'failed',
      ipAddress,
      details: 'Invalid login attempt with non-existent administrative identifier.',
    });
    if (lockResult.locked) {
      return {
        success: false,
        error: `Too many failed login attempts. Account temporarily locked for ${lockResult.remainingMinutes} minutes.`,
        locked: true,
        remainingMinutes: lockResult.remainingMinutes,
      };
    }
    return {
      success: false,
      error: 'Invalid username/email or password.',
    };
  }

  // Verify hash
  const computedHash = hashPassword(plainPassword, user.salt);
  const isValid = crypto.timingSafeEqual(
    Buffer.from(computedHash, 'hex'),
    Buffer.from(user.passwordHash, 'hex')
  );

  if (!isValid) {
    const lockResult = recordFailedAttempt(rateLimitKey);
    addAuditLog({
      userId: user.id,
      adminName: user.fullName,
      adminEmail: user.email,
      action: 'LOGIN_FAILED_INCORRECT_PASSWORD',
      status: 'failed',
      ipAddress,
      details: `Failed password authentication attempt (${MAX_FAILED_ATTEMPTS - (failedAttemptsMap.get(rateLimitKey)?.count || 0)} attempts remaining).`,
    });
    if (lockResult.locked) {
      return {
        success: false,
        error: `Too many failed login attempts. Account temporarily locked for ${lockResult.remainingMinutes} minutes.`,
        locked: true,
        remainingMinutes: lockResult.remainingMinutes,
      };
    }
    return {
      success: false,
      error: 'Invalid username/email or password.',
    };
  }

  // Clear failed attempts on success
  clearFailedAttempts(rateLimitKey);

  // Update user lastLogin
  user.lastLogin = new Date().toISOString();
  saveAdminUsers(users);

  // Create session
  const token = `rd-admin-${crypto.randomBytes(32).toString('hex')}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS).toISOString();

  const session: AdminSession = {
    token,
    userId: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    avatarUrl: user.avatarUrl,
    ipAddress,
    userAgent,
    createdAt: now.toISOString(),
    lastActivityAt: now.toISOString(),
    expiresAt,
  };

  const sessions = getActiveSessions();
  sessions.push(session);
  saveActiveSessions(sessions);

  addAuditLog({
    userId: user.id,
    adminName: user.fullName,
    adminEmail: user.email,
    action: 'LOGIN_SUCCESS',
    status: 'success',
    ipAddress,
    details: `Authenticated with role '${user.role}' via secure session token.`,
  });

  return {
    success: true,
    user,
    session,
  };
}

export function validateSessionToken(token: string): AdminSession | null {
  if (!token) return null;
  const sessions = getActiveSessions();
  const session = sessions.find((s) => s.token === token);
  if (!session) return null;

  const now = Date.now();
  if (new Date(session.expiresAt).getTime() < now) {
    // Session expired
    const active = sessions.filter((s) => s.token !== token);
    saveActiveSessions(active);
    addAuditLog({
      userId: session.userId,
      adminName: session.fullName,
      adminEmail: session.email,
      action: 'SESSION_EXPIRED',
      status: 'warning',
      details: 'Session expired due to inactivity timeout (30m).',
    });
    return null;
  }

  // Extend session on activity
  session.lastActivityAt = new Date().toISOString();
  session.expiresAt = new Date(now + SESSION_DURATION_MS).toISOString();
  saveActiveSessions(sessions);
  return session;
}

export function revokeSessionToken(token: string): boolean {
  if (!token) return false;
  const sessions = getActiveSessions();
  const found = sessions.find((s) => s.token === token);
  if (!found) return false;

  const filtered = sessions.filter((s) => s.token !== token);
  saveActiveSessions(filtered);

  addAuditLog({
    userId: found.userId,
    adminName: found.fullName,
    adminEmail: found.email,
    action: 'LOGOUT',
    status: 'success',
    details: 'Administrator logged out and session destroyed.',
  });

  return true;
}
