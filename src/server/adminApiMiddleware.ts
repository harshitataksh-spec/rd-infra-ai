import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import {
  authenticateAdmin,
  validateSessionToken,
  revokeSessionToken,
  getAuditLogs,
  addAuditLog,
  getActiveSessions,
  getAdminUsers,
  saveAdminUsers,
  hashPassword,
  generateSalt,
  AdminSession,
} from './authService';

interface StoredHighlight {
  id?: string | number;
  title: string;
  description: string;
  display_order?: number;
  displayOrder?: number;
  stat?: string;
  subtitle?: string;
}

interface StoredDirectorProfile {
  id: string | number;
  name: string;
  designation: string;
  subtitle: string;
  seo_title: string;
  seoTitle?: string;
  introduction?: string;
  directorsMessage?: string;
  leadershipPhilosophy?: string;
  achievements?: string[];
  canvaDesignUrl?: string;
  canvaEmbedUrl?: string;
  biography: string;
  bioParagraphs: string[];
  vision: string;
  photo_url: string;
  photoUrl: string;
  is_visible: boolean;
  isVisible: boolean;
  primary_cta_text: string;
  primaryCtaText?: string;
  primary_cta_link: string;
  primaryCtaLink?: string;
  secondary_cta_text: string;
  secondaryCtaText?: string;
  secondary_cta_link: string;
  secondaryCtaLink?: string;
  updated_at: string;
  updated_by: string;
  highlights: StoredHighlight[];
  experienceYears?: string;
  familiesGuided?: string;
  dubaiExperience?: string;
  developerCount?: string;
  locations?: string;
  developers?: string;
  coreExpertise?: string[];
}

const DEFAULT_PROFILE: StoredDirectorProfile = {
  id: 1,
  name: 'Mr. Ravinder Deshwal',
  designation: 'Founder & Director | Visionary Entrepreneur',
  subtitle: 'Visionary Entrepreneur',
  seo_title: 'Mr. Ravinder Deshwal – Founder & Director of RD Infra | 12+ Years Real Estate Leadership',
  seoTitle: 'Mr. Ravinder Deshwal – Founder & Director of RD Infra | 12+ Years Real Estate Leadership',
  introduction: 'With over 12 years of proven expertise in the real estate industry, Mr. Ravinder Deshwal brings extensive industry knowledge, strategic vision, and a strong commitment to delivering value-driven real-estate solutions.',
  directorsMessage: 'Building Better Tomorrows through vision, trust, and value-driven real estate.',
  leadershipPhilosophy: 'Integrity in advisory, absolute transparency in transactions, and enduring client partnerships that protect capital and maximize long-term wealth.',
  achievements: [
    '12+ Years of verified market leadership across Gurugram, Delhi-NCR, and northern growth corridors',
    '900+ families, HNWIs, and institutional investors guided to successful property decisions',
    'Strategic associations with tier-1 developers including DLF, M3M, Godrej, Emaar, Smart World, and Signature Global',
    'International cross-border advisory footprint with 2 years of active Dubai real estate market experience',
    'Pioneered premium farmhouse land aggregation and expressway corridor investments in Haryana',
  ],
  canvaDesignUrl: 'https://www.canva.com/design/DAHVdjVF3NQ/iup0ESj38_cbbPCnojuG6A/view',
  canvaEmbedUrl: 'https://www.canva.com/design/DAHVdjVF3NQ/iup0ESj38_cbbPCnojuG6A/view?embed',
  photo_url: 'https://www.canva.com/design/DAHVdjVF3NQ/iup0ESj38_cbbPCnojuG6A/view?embed',
  photoUrl: 'https://www.canva.com/design/DAHVdjVF3NQ/iup0ESj38_cbbPCnojuG6A/view?embed',
  biography: `With over 12 years of proven expertise in the real estate industry, Mr. Ravinder Deshwal brings extensive industry knowledge, strategic vision, and a strong commitment to delivering value-driven real-estate solutions.

As Founder & Director of RD Infra, he has spearheaded residential, commercial, farmhouse, and strategic land investments across North India. Over his career, he has personally advised over 900+ families and investors in securing high-appreciation assets in Gurugram, Delhi-NCR, Karnal, Rohtak, Dharuhera, Rewari, Jind, and adjacent growth corridors.

He maintains trusted relationships with leading developers—including DLF, M3M, Elan, AIPL, SS Group, Amaya, Emaar, Smart World, Signature Global, and Godrej Properties. Supplemented by two years of dedicated advisory in Dubai's premier freehold sectors, he delivers unmatched local precision with an international investment perspective.`,
  bioParagraphs: [
    'With over 12 years of proven expertise in the real estate industry, Mr. Ravinder Deshwal brings extensive industry knowledge, strategic vision, and a strong commitment to delivering value-driven real-estate solutions.',
    'As Founder & Director of RD Infra, he has spearheaded residential, commercial, farmhouse, and strategic land investments across North India. Over his career, he has personally advised over 900+ families and investors in securing high-appreciation assets in Gurugram, Delhi-NCR, Karnal, Rohtak, Dharuhera, Rewari, Jind, and adjacent growth corridors.',
    'He maintains trusted relationships with leading developers—including DLF, M3M, Elan, AIPL, SS Group, Amaya, Emaar, Smart World, Signature Global, and Godrej Properties. Supplemented by two years of dedicated advisory in Dubai\'s premier freehold sectors, he delivers unmatched local precision with an international investment perspective.',
  ],
  vision: 'To redefine real estate consultancy through trust, transparency, strategic guidance, and long-term value creation.',
  is_visible: true,
  isVisible: true,
  primary_cta_text: 'Connect With RD INFRA',
  primaryCtaText: 'Connect With RD INFRA',
  primary_cta_link: '#contact',
  primaryCtaLink: '#contact',
  secondary_cta_text: 'Explore Properties',
  secondaryCtaText: 'Explore Properties',
  secondary_cta_link: '#properties',
  secondaryCtaLink: '#properties',
  updated_at: new Date().toISOString(),
  updated_by: 'Mr. Ravinder Deshwal',
  highlights: [
    {
      id: 1,
      title: '12+ Years',
      description: 'Years of Real Estate Expertise',
      stat: '12+ Years',
      subtitle: 'Years of Real Estate Expertise',
      display_order: 1,
      displayOrder: 1,
    },
    {
      id: 2,
      title: 'Gurugram & Delhi-NCR',
      description: 'Market Experience',
      stat: 'Gurugram & Delhi-NCR',
      subtitle: 'Market Experience',
      display_order: 2,
      displayOrder: 2,
    },
    {
      id: 3,
      title: 'Strategic Sales, Marketing & Business Development',
      description: 'Core Expertise',
      stat: 'Strategic Sales, Marketing & Business Development',
      subtitle: 'Core Expertise',
      display_order: 3,
      displayOrder: 3,
    },
    {
      id: 4,
      title: 'Residential • Commercial • Investments',
      description: 'Real Estate Expertise',
      stat: 'Residential • Commercial • Investments',
      subtitle: 'Real Estate Expertise',
      display_order: 4,
      displayOrder: 4,
    },
  ],
};

function ensureDataDirectory(): string {
  const dataDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return dataDir;
}

function getStoredProfile(): StoredDirectorProfile {
  const dataDir = ensureDataDirectory();
  const filePath = path.join(dataDir, 'director_profile.json');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(DEFAULT_PROFILE, null, 2), 'utf-8');
    return DEFAULT_PROFILE;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse director_profile.json, using default', err);
    return DEFAULT_PROFILE;
  }
}

function saveStoredProfile(profile: StoredDirectorProfile): void {
  const dataDir = ensureDataDirectory();
  const filePath = path.join(dataDir, 'director_profile.json');
  fs.writeFileSync(filePath, JSON.stringify(profile, null, 2), 'utf-8');
}

function parseJsonBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
      if (data.length > 10 * 1024 * 1024) {
        reject(new Error('Request payload too large'));
      }
    });
    req.on('end', () => {
      try {
        if (!data) {
          resolve({});
          return;
        }
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// Extract session from request (Authorization header or Cookie)
function extractSession(req: any): AdminSession | null {
  // 1. Check Authorization header: Bearer <token>
  const authHeader = req.headers['authorization'] || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const session = validateSessionToken(token);
    if (session) return session;
  }

  // 2. Check Cookie header: rd_admin_session=<token>
  const cookieHeader = req.headers['cookie'] || '';
  const match = cookieHeader.match(/rd_admin_session=([^;]+)/);
  if (match) {
    const token = match[1].trim();
    const session = validateSessionToken(token);
    if (session) return session;
  }

  return null;
}

function getClientIp(req: any): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  );
}

export function adminApiPlugin(): Plugin {
  return {
    name: 'admin-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const fullUrl = req.url || '';
        const url = fullUrl.split('?')[0];

        // Serve Google Search Console HTML verification files directly without Vite script injection
        if (url === '/googlecc57c600f52289c8.html') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end('google-site-verification: googlecc57c600f52289c8.html');
          return;
        }
        if (url === '/googlee4qefdr33c2pRgmvRPtpjhGoBCjeftWqDMlAkTZAEyM.html') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end('google-site-verification: googlee4qefdr33c2pRgmvRPtpjhGoBCjeftWqDMlAkTZAEyM.html');
          return;
        }
        if (url === '/googlexkbfQKckJzjcLrNwpxbzZlomzbQ_sinVkzvVl83WGiE.html') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end('google-site-verification: googlexkbfQKckJzjcLrNwpxbzZlomzbQ_sinVkzvVl83WGiE.html');
          return;
        }

        // Only intercept /api/* routes
        if (!url.startsWith('/api/')) {
          return next();
        }

        res.setHeader('Content-Type', 'application/json');

        // ==========================================
        // 1. PUBLIC ENDPOINTS
        // ==========================================

        // GET /api/director (Public read-only)
        if (url === '/api/director' && req.method === 'GET') {
          const profile = getStoredProfile();
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, profile }));
          return;
        }

        // POST /api/admin/auth/login (Public login endpoint)
        if (url === '/api/admin/auth/login' && req.method === 'POST') {
          try {
            const body = await parseJsonBody(req);
            const { identifier, password } = body;
            const ip = getClientIp(req);
            const userAgent = (req.headers['user-agent'] as string) || '';

            const result = authenticateAdmin(identifier, password, ip, userAgent);

            if (!result.success || !result.session) {
              res.statusCode = result.locked ? 429 : 401;
              res.end(
                JSON.stringify({
                  success: false,
                  error: result.error || 'Invalid credentials.',
                  locked: result.locked || false,
                  remainingMinutes: result.remainingMinutes,
                })
              );
              return;
            }

            // Set secure cookie
            res.setHeader(
              'Set-Cookie',
              `rd_admin_session=${result.session.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=1800`
            );

            res.statusCode = 200;
            res.end(
              JSON.stringify({
                success: true,
                token: result.session.token,
                user: {
                  id: result.session.userId,
                  username: result.session.username,
                  email: result.session.email,
                  fullName: result.session.fullName,
                  role: result.session.role,
                  avatarUrl: result.session.avatarUrl,
                },
                expiresAt: result.session.expiresAt,
              })
            );
          } catch (err: any) {
            console.error('Login error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: 'Internal authentication error.' }));
          }
          return;
        }

        // POST /api/leads (Public lead capture from website forms)
        if (url === '/api/leads' && req.method === 'POST') {
          try {
            const body = await parseJsonBody(req);
            const dataDir = ensureDataDirectory();
            const filePath = path.join(dataDir, 'leads.json');
            let leads: any[] = [];
            if (fs.existsSync(filePath)) {
              leads = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            }
            leads.unshift({
              ...body,
              id: body.id || `lead-${Date.now()}`,
              createdAt: new Date().toISOString(),
            });
            fs.writeFileSync(filePath, JSON.stringify(leads.slice(0, 500), null, 2), 'utf-8');

            addAuditLog({
              adminName: 'Public Website System',
              action: 'NEW_LEAD_SUBMISSION',
              recordType: 'Lead',
              affectedRecord: `${body.name || 'Anonymous'} (${body.phone || 'N/A'})`,
              status: 'success',
              ipAddress: getClientIp(req),
              details: `Client inquiry received for: ${body.requirement || 'General'}`,
            });

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: 'Inquiry received successfully.' }));
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
          return;
        }

        // ==========================================
        // 2. PROTECTED ADMIN ENDPOINTS
        // Validate authentication for all other /api/admin/*
        // ==========================================
        if (url.startsWith('/api/admin')) {
          const session = extractSession(req);

          if (!session) {
            res.statusCode = 401;
            res.end(
              JSON.stringify({
                success: false,
                code: 'SESSION_EXPIRED',
                error: 'Unauthorized: Admin session expired or invalid. Please log in.',
              })
            );
            return;
          }

          // GET /api/admin/auth/me (Verify session)
          if (url === '/api/admin/auth/me' && req.method === 'GET') {
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                success: true,
                user: {
                  id: session.userId,
                  username: session.username,
                  email: session.email,
                  fullName: session.fullName,
                  role: session.role,
                  avatarUrl: session.avatarUrl,
                },
                expiresAt: session.expiresAt,
              })
            );
            return;
          }

          // POST /api/admin/auth/logout (Revoke session)
          if (url === '/api/admin/auth/logout' && req.method === 'POST') {
            revokeSessionToken(session.token);
            res.setHeader('Set-Cookie', 'rd_admin_session=; Path=/; HttpOnly; Max-Age=0');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: 'Logged out successfully.' }));
            return;
          }

          // POST /api/admin/auth/heartbeat (Touch session)
          if (url === '/api/admin/auth/heartbeat' && req.method === 'POST') {
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                success: true,
                expiresAt: session.expiresAt,
              })
            );
            return;
          }

          // GET /api/admin/security/audit-logs
          if (url === '/api/admin/security/audit-logs' && req.method === 'GET') {
            const logs = getAuditLogs();
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, logs }));
            return;
          }

          // GET /api/admin/security/sessions (Super Admin only)
          if (url === '/api/admin/security/sessions' && req.method === 'GET') {
            if (session.role !== 'superadmin') {
              res.statusCode = 403;
              res.end(
                JSON.stringify({
                  success: false,
                  error: 'Forbidden: Super Admin privileges required to view active sessions.',
                })
              );
              return;
            }

            const sessions = getActiveSessions().map((s) => ({
              userId: s.userId,
              username: s.username,
              fullName: s.fullName,
              role: s.role,
              ipAddress: s.ipAddress,
              createdAt: s.createdAt,
              lastActivityAt: s.lastActivityAt,
              expiresAt: s.expiresAt,
              isCurrent: s.token === session.token,
            }));

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, sessions }));
            return;
          }

          // GET /api/admin/security/users (Super Admin only)
          if (url === '/api/admin/security/users' && req.method === 'GET') {
            if (session.role !== 'superadmin') {
              res.statusCode = 403;
              res.end(
                JSON.stringify({
                  success: false,
                  error: 'Forbidden: Super Admin privileges required to view user directory.',
                })
              );
              return;
            }

            const users = getAdminUsers().map((u) => ({
              id: u.id,
              username: u.username,
              email: u.email,
              fullName: u.fullName,
              role: u.role,
              avatarUrl: u.avatarUrl,
              createdAt: u.createdAt,
              lastLogin: u.lastLogin,
            }));

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, users }));
            return;
          }

          // POST /api/admin/security/change-password
          if (url === '/api/admin/security/change-password' && req.method === 'POST') {
            try {
              const body = await parseJsonBody(req);
              const { currentPassword, newPassword } = body;

              if (!currentPassword || !newPassword || newPassword.length < 6) {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'New password must be at least 6 characters.',
                  })
                );
                return;
              }

              const users = getAdminUsers();
              const user = users.find((u) => u.id === session.userId);
              if (!user) {
                res.statusCode = 404;
                res.end(JSON.stringify({ success: false, error: 'User not found.' }));
                return;
              }

              const verifyHash = hashPassword(currentPassword, user.salt);
              if (verifyHash !== user.passwordHash) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Current password does not match.' }));
                return;
              }

              const newSalt = generateSalt();
              user.salt = newSalt;
              user.passwordHash = hashPassword(newPassword, newSalt);
              saveAdminUsers(users);

              addAuditLog({
                userId: user.id,
                adminName: user.fullName,
                adminEmail: user.email,
                action: 'PASSWORD_CHANGED',
                status: 'success',
                ipAddress: getClientIp(req),
                details: 'Administrator successfully changed account password.',
              });

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: 'Password updated successfully.' }));
            } catch (e: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: e.message }));
            }
            return;
          }

          // GET /api/admin/director
          if (url === '/api/admin/director' && req.method === 'GET') {
            const profile = getStoredProfile();
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, profile }));
            return;
          }

          // POST /api/admin/director/photo
          if (url === '/api/admin/director/photo' && req.method === 'POST') {
            if (session.role === 'editor') {
              res.statusCode = 403;
              res.end(
                JSON.stringify({
                  success: false,
                  error: 'Forbidden: Editor role cannot modify executive director portraits.',
                })
              );
              return;
            }

            try {
              const body = await parseJsonBody(req);
              const { fileName, fileData, mimeType } = body;

              if (!fileData || !mimeType) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Missing image data or MIME type.' }));
                return;
              }

              const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
              if (!allowedMimes.includes(mimeType.toLowerCase())) {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Unsupported image format. Please upload JPG, PNG, or WebP.',
                  })
                );
                return;
              }

              const base64Data = fileData.replace(/^data:image\/\w+;base64,/, '');
              const buffer = Buffer.from(base64Data, 'base64');

              if (buffer.length > 5 * 1024 * 1024) {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'File size exceeds maximum 5MB limit.',
                  })
                );
                return;
              }

              let ext = 'png';
              if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = 'jpg';
              else if (mimeType.includes('webp')) ext = 'webp';

              const publicImagesDir = path.resolve(process.cwd(), 'public', 'images');
              if (!fs.existsSync(publicImagesDir)) {
                fs.mkdirSync(publicImagesDir, { recursive: true });
              }

              const timestamp = Date.now();
              const savedFilename = `director-portrait-${timestamp}.${ext}`;
              const targetPath = path.join(publicImagesDir, savedFilename);
              fs.writeFileSync(targetPath, buffer);

              const distImagesDir = path.resolve(process.cwd(), 'dist', 'images');
              if (fs.existsSync(distImagesDir)) {
                fs.writeFileSync(path.join(distImagesDir, savedFilename), buffer);
              }

              const publicUrl = `/images/${savedFilename}`;
              addAuditLog({
                userId: session.userId,
                adminName: session.fullName,
                adminEmail: session.email,
                action: 'DIRECTOR_PHOTO_UPLOADED',
                recordType: 'Director',
                affectedRecord: savedFilename,
                status: 'success',
                ipAddress: getClientIp(req),
                details: `Uploaded new director portrait (${(buffer.length / 1024).toFixed(1)} KB).`,
              });

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, photoUrl: publicUrl }));
            } catch (err: any) {
              console.error('Photo upload error:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message || 'Failed to upload photo.' }));
            }
            return;
          }

          // PUT or POST /api/admin/director
          if (
            (url === '/api/admin/director' || url === '/api/director') &&
            (req.method === 'PUT' || req.method === 'POST')
          ) {
            if (session.role === 'editor') {
              res.statusCode = 403;
              res.end(
                JSON.stringify({
                  success: false,
                  error: 'Forbidden: Editor role cannot modify Director Profile.',
                })
              );
              return;
            }

            try {
              const body = await parseJsonBody(req);
              const {
                name,
                designation,
                seo_title,
                seoTitle,
                biography,
                bioParagraphs,
                vision,
                photo_url,
                photoUrl,
                is_visible,
                isVisible,
                primary_cta_text,
                primaryCtaText,
                primary_cta_link,
                primaryCtaLink,
                secondary_cta_text,
                secondaryCtaText,
                secondary_cta_link,
                secondaryCtaLink,
                highlights,
                photoChanged,
                experienceYears,
                familiesGuided,
                dubaiExperience,
                developerCount,
                locations,
                developers,
                coreExpertise,
              } = body;

              if (!name || typeof name !== 'string' || !name.trim()) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Director name is required.' }));
                return;
              }

              if (!designation || typeof designation !== 'string' || !designation.trim()) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Designation is required.' }));
                return;
              }

              const finalSeoTitle = (seo_title || seoTitle || '').trim();
              if (!finalSeoTitle) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'SEO / Profile Title is required.' }));
                return;
              }

              const rawBio = (biography || '').trim();
              let paragraphs = Array.isArray(bioParagraphs) ? bioParagraphs : [];
              if (rawBio && paragraphs.length === 0) {
                paragraphs = rawBio.split(/\n\n+/).filter(Boolean);
              }
              if (paragraphs.length === 0) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Director biography is required.' }));
                return;
              }

              const finalVision = (vision || '').trim();
              if (!finalVision) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Director vision statement is required.' }));
                return;
              }

              if (!Array.isArray(highlights) || highlights.length === 0) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'At least one highlight is required.' }));
                return;
              }

              const finalPhotoUrl = (photo_url || photoUrl || DEFAULT_PROFILE.canvaEmbedUrl).trim();
              const finalIsVisible =
                is_visible !== undefined
                  ? Boolean(is_visible)
                  : isVisible !== undefined
                  ? Boolean(isVisible)
                  : true;

              const updatedProfile: StoredDirectorProfile = {
                id: 1,
                name: name.trim(),
                designation: designation.trim(),
                subtitle: 'Visionary Entrepreneur',
                seo_title: finalSeoTitle,
                seoTitle: finalSeoTitle,
                biography: rawBio || paragraphs.join('\n\n'),
                bioParagraphs: paragraphs,
                vision: finalVision,
                photo_url: finalPhotoUrl,
                photoUrl: finalPhotoUrl,
                is_visible: finalIsVisible,
                isVisible: finalIsVisible,
                primary_cta_text: (primary_cta_text || primaryCtaText || 'Connect With RD INFRA').trim(),
                primaryCtaText: (primary_cta_text || primaryCtaText || 'Connect With RD INFRA').trim(),
                primary_cta_link: (primary_cta_link || primaryCtaLink || '#contact').trim(),
                primaryCtaLink: (primary_cta_link || primaryCtaLink || '#contact').trim(),
                secondary_cta_text: (secondary_cta_text || secondaryCtaText || 'Explore Properties').trim(),
                secondaryCtaText: (secondary_cta_text || secondaryCtaText || 'Explore Properties').trim(),
                secondary_cta_link: (secondary_cta_link || secondaryCtaLink || '#properties').trim(),
                secondaryCtaLink: (secondary_cta_link || secondaryCtaLink || '#properties').trim(),
                updated_at: new Date().toISOString(),
                updated_by: session.fullName,
                highlights: highlights.map((h, idx) => ({
                  id: h.id || idx + 1,
                  title: h.title.trim(),
                  description: h.description.trim(),
                  display_order: idx + 1,
                  displayOrder: idx + 1,
                  stat: h.title.trim(),
                  subtitle: h.description.trim(),
                })),
                experienceYears: experienceYears ? String(experienceYears).trim() : '12+ Years',
                familiesGuided: familiesGuided ? String(familiesGuided).trim() : '900+',
                dubaiExperience: dubaiExperience ? String(dubaiExperience).trim() : '2 Years',
                developerCount: developerCount ? String(developerCount).trim() : '10+',
                locations: locations
                  ? String(locations).trim()
                  : 'Gurugram, Delhi-NCR, Karnal, Rohtak, Dharuhera, Rewari, Jind',
                developers: developers
                  ? String(developers).trim()
                  : 'DLF, M3M, Elan, AIPL, SS Group, Amaya, Emaar, Smart World, Signature Global, Godrej Properties',
                coreExpertise:
                  Array.isArray(coreExpertise) && coreExpertise.length > 0
                    ? coreExpertise
                    : [
                        'Residential & Commercial Real Estate',
                        'Farmhouse & Land Investments',
                        'Investment Advisory & Wealth Creation',
                        'Market Research & Project Evaluation',
                        'Strategic Sales & Business Development',
                        'Dubai Real Estate Opportunities',
                      ],
              };

              saveStoredProfile(updatedProfile);

              const action = photoChanged ? 'Updated Director Profile and Photo' : 'Updated Director Profile';
              addAuditLog({
                userId: session.userId,
                adminName: session.fullName,
                adminEmail: session.email,
                action: 'DIRECTOR_PROFILE_UPDATED',
                recordType: 'Director',
                affectedRecord: updatedProfile.name,
                status: 'success',
                ipAddress: getClientIp(req),
                details: `${action} via authenticated admin session.`,
              });

              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Director Profile updated successfully.',
                  profile: updatedProfile,
                })
              );
            } catch (err: any) {
              console.error('Update director profile error:', err);
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  success: false,
                  error: err.message || 'Unable to update Director profile. Please try again.',
                })
              );
            }
            return;
          }
        }

        next();
      });
    },
  };
}

// Export directorApiPlugin as alias for backward compatibility
export const directorApiPlugin = adminApiPlugin;
