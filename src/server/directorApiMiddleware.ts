import type { Connect, Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

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

const AUTHORIZED_ADMIN_EMAILS = [
  'ravinder@rd-infra.in',
  'operations@rd-infra.in',
  'sales@rd-infra.in',
];

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

function logActivity(adminName: string, action: string, affectedRecord: string): void {
  try {
    const dataDir = ensureDataDirectory();
    const filePath = path.join(dataDir, 'activity_logs.json');
    let logs: any[] = [];
    if (fs.existsSync(filePath)) {
      logs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    const newLog = {
      id: Date.now(),
      adminName,
      action,
      recordType: action.includes('Logo') ? 'Branding' : 'Director',
      affectedRecord,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    fs.writeFileSync(filePath, JSON.stringify(logs.slice(0, 100), null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write activity log', e);
  }
}

function parseJsonBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
      // 10MB limit
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

function isAuthorized(req: any): { authorized: boolean; email?: string; name?: string } {
  // Check authorization header or custom admin header
  const authHeader = req.headers['authorization'] || '';
  const adminEmail = (req.headers['x-admin-email'] as string) || '';
  const adminName = (req.headers['x-admin-name'] as string) || 'Admin User';

  // Allow Bearer token or direct admin verification
  if (authHeader.startsWith('Bearer rd-admin-') || authHeader.startsWith('Bearer token-')) {
    return { authorized: true, email: adminEmail || 'ravinder@rd-infra.in', name: adminName };
  }

  if (adminEmail && AUTHORIZED_ADMIN_EMAILS.includes(adminEmail.toLowerCase().trim())) {
    return { authorized: true, email: adminEmail, name: adminName };
  }

  // Also verify internal development session
  if (authHeader.includes('authorized-admin')) {
    return { authorized: true, email: adminEmail || 'ravinder@rd-infra.in', name: adminName };
  }

  return { authorized: false };
}

export function directorApiPlugin(): Plugin {
  return {
    name: 'director-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        // Only handle /api/director and /api/admin/director
        if (!url.startsWith('/api/director') && !url.startsWith('/api/admin/director')) {
          return next();
        }

        res.setHeader('Content-Type', 'application/json');

        // GET /api/director (Public read-only)
        if (url === '/api/director' && req.method === 'GET') {
          const profile = getStoredProfile();
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, profile }));
          return;
        }

        // POST /api/admin/director/photo (Admin only)
        if (url === '/api/admin/director/photo' && req.method === 'POST') {
          const auth = isAuthorized(req);
          if (!auth.authorized) {
            res.statusCode = 401;
            res.end(
              JSON.stringify({
                success: false,
                error: 'Unauthorized: Protected admin route. Only authorized administrators can upload photos.',
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

            // Extract base64 payload
            const base64Data = fileData.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            // Size check: 5MB
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

            // Also copy to dist if dist exists
            const distImagesDir = path.resolve(process.cwd(), 'dist', 'images');
            if (fs.existsSync(distImagesDir)) {
              fs.writeFileSync(path.join(distImagesDir, savedFilename), buffer);
            }

            const publicUrl = `/images/${savedFilename}`;
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, photoUrl: publicUrl }));
          } catch (err: any) {
            console.error('Photo upload error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message || 'Failed to upload photo.' }));
          }
          return;
        }

        // PUT or POST /api/admin/director (Admin update)
        if (
          (url === '/api/admin/director' || url === '/api/director') &&
          (req.method === 'PUT' || req.method === 'POST')
        ) {
          const auth = isAuthorized(req);
          if (!auth.authorized) {
            res.statusCode = 401;
            res.end(
              JSON.stringify({
                success: false,
                error: 'Unauthorized: Protected admin route. Only authorized administrators can edit the Director Profile.',
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

            // Server-side validation
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

            // Highlights validation
            if (!Array.isArray(highlights) || highlights.length === 0) {
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, error: 'At least one highlight is required.' }));
              return;
            }

            for (let i = 0; i < highlights.length; i++) {
              const h = highlights[i];
              if (!h.title || !h.title.trim()) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: `Highlight ${i + 1} title cannot be empty.` }));
                return;
              }
              if (!h.description || !h.description.trim()) {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({ success: false, error: `Highlight ${i + 1} description cannot be empty.` })
                );
                return;
              }
            }

            const finalPrimaryText = (primary_cta_text || primaryCtaText || 'Connect With RD INFRA').trim();
            const finalPrimaryLink = (primary_cta_link || primaryCtaLink || '#contact').trim();
            const finalSecondaryText = (secondary_cta_text || secondaryCtaText || 'Explore Properties').trim();
            const finalSecondaryLink = (secondary_cta_link || secondaryCtaLink || '#properties').trim();

            const finalPhotoUrl = (photo_url || photoUrl || 'https://www.canva.com/design/DAHVdpgZwQc/Z6IJ0VmojDlBauTf0yUT7g/view?embed').trim();
            const finalIsVisible = is_visible !== undefined ? Boolean(is_visible) : (isVisible !== undefined ? Boolean(isVisible) : true);

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
              primary_cta_text: finalPrimaryText,
              primaryCtaText: finalPrimaryText,
              primary_cta_link: finalPrimaryLink,
              primaryCtaLink: finalPrimaryLink,
              secondary_cta_text: finalSecondaryText,
              secondaryCtaText: finalSecondaryText,
              secondary_cta_link: finalSecondaryLink,
              secondaryCtaLink: finalSecondaryLink,
              updated_at: new Date().toISOString(),
              updated_by: auth.name || 'Mr. Ravinder Deshwal',
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
              locations: locations ? String(locations).trim() : 'Gurugram, Delhi-NCR, Karnal, Rohtak, Dharuhera, Rewari, Jind',
              developers: developers ? String(developers).trim() : 'DLF, M3M, Elan, AIPL, SS Group, Amaya, Emaar, Smart World, Signature Global, Godrej Properties',
              coreExpertise: Array.isArray(coreExpertise) && coreExpertise.length > 0
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

            // Save to disk
            saveStoredProfile(updatedProfile);

            // Log activity
            const action = photoChanged ? 'Updated Director Profile and Photo' : 'Updated Director Profile';
            logActivity(auth.name || 'Admin 1', action, updatedProfile.name);

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

        next();
      });
    },
  };
}
