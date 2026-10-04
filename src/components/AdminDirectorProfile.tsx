import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Award,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Save,
  Eye,
  EyeOff,
  Building2,
  Quote,
  RefreshCw,
  X,
  ExternalLink,
  Users2,
  Globe2,
  MapPin,
  Check,
  Plus,
  Trash2,
  Maximize2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { DirectorProfile, DirectorHighlight } from '../types';

interface AdminDirectorProfileProps {
  currentAdmin: {
    id: number;
    name: string;
    email: string;
    role: string;
    token?: string;
  };
  initialProfile: DirectorProfile;
  onSaveProfile: (
    updatedProfile: DirectorProfile,
    photoChanged: boolean
  ) => Promise<{ success: boolean; message?: string }>;
  onCancel?: () => void;
  onRegisterUnsavedChanges?: (isDirty: boolean) => void;
}

const DEFAULT_HIGHLIGHTS: DirectorHighlight[] = [
  {
    id: 1,
    title: '12+ Years',
    description: 'Real Estate Experience',
    stat: '12+ Years',
    subtitle: 'Real Estate Experience',
    display_order: 1,
  },
  {
    id: 2,
    title: '900+',
    description: 'Families & Investors Guided',
    stat: '900+',
    subtitle: 'Families & Investors Guided',
    display_order: 2,
  },
  {
    id: 3,
    title: '2 Years',
    description: 'Dubai Real Estate Experience',
    stat: '2 Years',
    subtitle: 'Dubai Real Estate Experience',
    display_order: 3,
  },
  {
    id: 4,
    title: '10+',
    description: 'Leading Developer Associations',
    stat: '10+',
    subtitle: 'Leading Developer Associations',
    display_order: 4,
  },
];

const DEFAULT_EXPERTISE = [
  'Residential & Commercial Real Estate Advisory',
  'Farmhouse & Strategic Land Investments',
  'High-Yield Investment Advisory & Wealth Creation',
  'Market Evaluation & Project Viability Analysis',
  'Strategic Developer Alignments & Large Scale Sales',
  'Dubai Freehold & Global Property Opportunities',
];

const DEFAULT_ACHIEVEMENTS = [
  '12+ Years of verified market leadership across Gurugram, Delhi-NCR, and northern growth corridors',
  '900+ families, HNWIs, and institutional investors guided to successful property decisions',
  'Strategic associations with tier-1 developers including DLF, M3M, Godrej, Emaar, Smart World, and Signature Global',
  'International cross-border advisory footprint with 2 years of active Dubai real estate market experience',
  'Pioneered premium farmhouse land aggregation and expressway corridor investments in Haryana',
];

export const DEFAULT_CANVA_VIEW =
  'https://www.canva.com/design/DAHVdjVF3NQ/iup0ESj38_cbbPCnojuG6A/view';
export const DEFAULT_CANVA_EMBED =
  'https://www.canva.com/design/DAHVdjVF3NQ/iup0ESj38_cbbPCnojuG6A/view?embed';

export const AdminDirectorProfile: React.FC<AdminDirectorProfileProps> = ({
  currentAdmin,
  initialProfile,
  onSaveProfile,
  onCancel,
  onRegisterUnsavedChanges,
}) => {
  // Local form state with all new and editable fields
  const [formData, setFormData] = useState<DirectorProfile>(() => {
    const defaultBio =
      initialProfile.biography ||
      (initialProfile.bioParagraphs ? initialProfile.bioParagraphs.join('\n\n') : '') ||
      `With over 12 years of proven expertise in the real estate industry, Mr. Ravinder Deshwal brings extensive industry knowledge, strategic vision, and a strong commitment to delivering value-driven real-estate solutions.

As Founder & Director of RD Infra, he has spearheaded residential, commercial, farmhouse, and strategic land investments across North India. Over his career, he has personally advised over 900+ families and investors in securing high-appreciation assets in Gurugram, Delhi-NCR, Karnal, Rohtak, Dharuhera, Rewari, Jind, and adjacent growth corridors.

He maintains trusted relationships with leading developers—including DLF, M3M, Elan, AIPL, SS Group, Amaya, Emaar, Smart World, Signature Global, and Godrej Properties. Supplemented by two years of dedicated advisory in Dubai's premier freehold sectors, he delivers unmatched local precision with an international investment perspective.`;

    const bioParagraphs =
      initialProfile.bioParagraphs && initialProfile.bioParagraphs.length > 0
        ? initialProfile.bioParagraphs
        : defaultBio.split(/\n\n+/).filter(Boolean);

    return {
      ...initialProfile,
      name: initialProfile.name || 'Mr. Ravinder Deshwal',
      designation: initialProfile.designation || 'Founder & Director | Visionary Entrepreneur',
      seo_title:
        initialProfile.seo_title ||
        initialProfile.seoTitle ||
        'Mr. Ravinder Deshwal – Founder & Director of RD Infra | 12+ Years Real Estate Leadership',
      seoTitle:
        initialProfile.seo_title ||
        initialProfile.seoTitle ||
        'Mr. Ravinder Deshwal – Founder & Director of RD Infra | 12+ Years Real Estate Leadership',
      introduction:
        initialProfile.introduction ||
        'With over 12 years of proven expertise in the real estate industry, Mr. Ravinder Deshwal brings extensive industry knowledge, strategic vision, and a strong commitment to delivering value-driven real-estate solutions.',
      directorsMessage:
        initialProfile.directorsMessage ||
        'Building Better Tomorrows through vision, trust, and value-driven real estate.',
      leadershipPhilosophy:
        initialProfile.leadershipPhilosophy ||
        'Integrity in advisory, absolute transparency in transactions, and enduring client partnerships that protect capital and maximize long-term wealth.',
      achievements:
        initialProfile.achievements && initialProfile.achievements.length > 0
          ? initialProfile.achievements
          : DEFAULT_ACHIEVEMENTS,
      canvaDesignUrl: initialProfile.canvaDesignUrl || DEFAULT_CANVA_VIEW,
      canvaEmbedUrl: initialProfile.canvaEmbedUrl || DEFAULT_CANVA_EMBED,
      biography: defaultBio,
      bioParagraphs,
      experienceYears: initialProfile.experienceYears || '12+ Years',
      familiesGuided: initialProfile.familiesGuided || '900+',
      dubaiExperience: initialProfile.dubaiExperience || '2 Years',
      developerCount: initialProfile.developerCount || '10+',
      locations:
        initialProfile.locations ||
        'Gurugram, Delhi-NCR, Karnal, Rohtak, Dharuhera, Rewari, Jind',
      developers:
        initialProfile.developers ||
        'DLF, M3M, Elan, AIPL, SS Group, Amaya, Emaar, Smart World, Signature Global, Godrej Properties',
      coreExpertise:
        initialProfile.coreExpertise && initialProfile.coreExpertise.length > 0
          ? initialProfile.coreExpertise
          : DEFAULT_EXPERTISE,
      vision:
        initialProfile.vision ||
        'To redefine real estate consultancy through trust, transparency, strategic guidance, and long-term value creation.',
      photoUrl:
        initialProfile.photoUrl ||
        initialProfile.photo_url ||
        initialProfile.canvaEmbedUrl ||
        DEFAULT_CANVA_EMBED,
      photo_url:
        initialProfile.photoUrl ||
        initialProfile.photo_url ||
        initialProfile.canvaEmbedUrl ||
        DEFAULT_CANVA_EMBED,
      is_visible:
        initialProfile.is_visible !== undefined
          ? initialProfile.is_visible
          : initialProfile.isVisible !== undefined
          ? initialProfile.isVisible
          : true,
      isVisible:
        initialProfile.is_visible !== undefined
          ? initialProfile.is_visible
          : initialProfile.isVisible !== undefined
          ? initialProfile.isVisible
          : true,
      primary_cta_text:
        initialProfile.primary_cta_text || initialProfile.primaryCtaText || 'Connect With RD INFRA',
      primaryCtaText:
        initialProfile.primary_cta_text || initialProfile.primaryCtaText || 'Connect With RD INFRA',
      primary_cta_link:
        initialProfile.primary_cta_link || initialProfile.primaryCtaLink || '#contact',
      primaryCtaLink:
        initialProfile.primary_cta_link || initialProfile.primaryCtaLink || '#contact',
      secondary_cta_text:
        initialProfile.secondary_cta_text || initialProfile.secondaryCtaText || 'Explore Properties',
      secondaryCtaText:
        initialProfile.secondary_cta_text || initialProfile.secondaryCtaText || 'Explore Properties',
      secondary_cta_link:
        initialProfile.secondary_cta_link || initialProfile.secondaryCtaLink || '#properties',
      secondaryCtaLink:
        initialProfile.secondary_cta_link || initialProfile.secondaryCtaLink || '#properties',
      highlights:
        initialProfile.highlights && initialProfile.highlights.length >= 4
          ? initialProfile.highlights.slice(0, 4)
          : DEFAULT_HIGHLIGHTS,
    };
  });

  // Photo / Canva management state
  const [newPhotoPreview, setNewPhotoPreview] = useState<string | null>(null);
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [showPhotoPreviewModal, setShowPhotoPreviewModal] = useState<boolean>(false);

  // New Achievement & Expertise input states
  const [newAchievementInput, setNewAchievementInput] = useState<string>('');
  const [newExpertiseInput, setNewExpertiseInput] = useState<string>('');

  // Status & Feedback
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );
  const [showDiscardConfirm, setShowDiscardConfirm] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if form has unsaved modifications
  const isDirty = useMemo(() => {
    if (newPhotoPreview) return true;
    if (formData.name !== initialProfile.name) return true;
    if (formData.designation !== initialProfile.designation) return true;
    if (formData.introduction !== initialProfile.introduction) return true;
    if (formData.directorsMessage !== initialProfile.directorsMessage) return true;
    if (formData.leadershipPhilosophy !== initialProfile.leadershipPhilosophy) return true;
    if (formData.biography !== initialProfile.biography) return true;
    if (formData.vision !== initialProfile.vision) return true;
    if (formData.canvaDesignUrl !== initialProfile.canvaDesignUrl) return true;
    if (formData.canvaEmbedUrl !== initialProfile.canvaEmbedUrl) return true;
    if (formData.experienceYears !== initialProfile.experienceYears) return true;
    if (formData.familiesGuided !== initialProfile.familiesGuided) return true;
    if (formData.dubaiExperience !== initialProfile.dubaiExperience) return true;
    if (formData.developerCount !== initialProfile.developerCount) return true;
    if (formData.locations !== initialProfile.locations) return true;
    if (formData.developers !== initialProfile.developers) return true;
    if (Boolean(formData.is_visible) !== Boolean(initialProfile.is_visible ?? initialProfile.isVisible ?? true))
      return true;
    return false;
  }, [formData, initialProfile, newPhotoPreview]);

  // Sync isDirty callback to parent Admin
  useEffect(() => {
    if (onRegisterUnsavedChanges) {
      onRegisterUnsavedChanges(isDirty);
    }
  }, [isDirty, onRegisterUnsavedChanges]);

  // Photo Selection Handler
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoError(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setPhotoError('Invalid format. Please upload JPG, PNG, or WebP.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setPhotoError('File size exceeds 8MB. Please optimize before upload.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setNewPhotoPreview(dataUrl);
      setNewPhotoFile(file);
      setFormData((prev) => ({
        ...prev,
        photoUrl: dataUrl,
        photo_url: dataUrl,
      }));
    };
    reader.onerror = () => {
      setPhotoError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  // Revert photo to default Canva Embed
  const handleResetToCanva = () => {
    setNewPhotoPreview(null);
    setNewPhotoFile(null);
    setPhotoError(null);
    setFormData((prev) => ({
      ...prev,
      canvaDesignUrl: DEFAULT_CANVA_VIEW,
      canvaEmbedUrl: DEFAULT_CANVA_EMBED,
      photoUrl: DEFAULT_CANVA_EMBED,
      photo_url: DEFAULT_CANVA_EMBED,
    }));
  };

  // Canva Embed link updater
  const handleUpdateCanvaUrls = (designUrl: string, embedUrl: string) => {
    const finalEmbed =
      embedUrl.trim() ||
      (designUrl.includes('embed')
        ? designUrl
        : `${designUrl}${designUrl.includes('?') ? '&' : '?'}embed`);

    setFormData((prev) => ({
      ...prev,
      canvaDesignUrl: designUrl.trim(),
      canvaEmbedUrl: finalEmbed.trim(),
      photoUrl: finalEmbed.trim(),
      photo_url: finalEmbed.trim(),
    }));
  };

  // Toggle Visibility
  const handleToggleVisibility = () => {
    setFormData((prev) => {
      const nextVisible = !Boolean(prev.is_visible ?? prev.isVisible ?? true);
      return {
        ...prev,
        is_visible: nextVisible,
        isVisible: nextVisible,
      };
    });
  };

  // Achievements handlers
  const handleAddAchievement = () => {
    if (!newAchievementInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), newAchievementInput.trim()],
    }));
    setNewAchievementInput('');
  };

  const handleRemoveAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: (prev.achievements || []).filter((_, i) => i !== index),
    }));
  };

  // Expertise handlers
  const handleAddExpertise = () => {
    if (!newExpertiseInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      coreExpertise: [...(prev.coreExpertise || []), newExpertiseInput.trim()],
    }));
    setNewExpertiseInput('');
  };

  const handleRemoveExpertise = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      coreExpertise: (prev.coreExpertise || []).filter((_, i) => i !== index),
    }));
  };

  // Discard changes
  const handleDiscard = () => {
    setFormData({
      ...initialProfile,
      coreExpertise: initialProfile.coreExpertise || DEFAULT_EXPERTISE,
      achievements: initialProfile.achievements || DEFAULT_ACHIEVEMENTS,
    });
    setNewPhotoPreview(null);
    setNewPhotoFile(null);
    setPhotoError(null);
    setValidationErrors({});
    setShowDiscardConfirm(false);
    setSaveStatus(null);
  };

  // Form Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Director Name is required.';
    }
    if (!formData.designation.trim()) {
      errors.designation = 'Designation is required.';
    }
    if (!formData.introduction?.trim()) {
      errors.introduction = 'Profile Introduction is required.';
    }
    if (!formData.biography.trim()) {
      errors.biography = 'Director Biography is required.';
    }
    if (!formData.vision.trim()) {
      errors.vision = 'Director Vision statement is required.';
    }
    if (!formData.directorsMessage?.trim()) {
      errors.directorsMessage = "Director's Message quote is required.";
    }
    if (!formData.experienceYears?.trim()) {
      errors.experienceYears = 'Years of Experience is required.';
    }
    if (!formData.familiesGuided?.trim()) {
      errors.familiesGuided = 'Number of Families Guided is required.';
    }
    if (!formData.dubaiExperience?.trim()) {
      errors.dubaiExperience = 'Dubai Experience is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save handler
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaveStatus(null);

    if (!validateForm()) {
      setSaveStatus({
        type: 'error',
        message: 'Please resolve the highlighted validation errors before saving.',
      });
      return;
    }

    setIsSaving(true);

    try {
      let finalPhotoUrl =
        formData.photoUrl ||
        formData.photo_url ||
        formData.canvaEmbedUrl ||
        DEFAULT_CANVA_EMBED;
      let photoChanged = false;

      // If a new photo file was chosen, upload to backend endpoint
      if (newPhotoFile && newPhotoPreview) {
        photoChanged = true;
        try {
          const uploadRes = await fetch('/api/admin/director/photo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer rd-admin-token-${currentAdmin.id}`,
              'X-Admin-Email': currentAdmin.email,
              'X-Admin-Name': currentAdmin.name,
            },
            body: JSON.stringify({
              fileName: newPhotoFile.name,
              mimeType: newPhotoFile.type,
              fileData: newPhotoPreview,
            }),
          });

          const uploadData = await uploadRes.json();
          if (uploadData.success && uploadData.photoUrl) {
            finalPhotoUrl = uploadData.photoUrl;
          } else {
            finalPhotoUrl = newPhotoPreview;
          }
        } catch {
          finalPhotoUrl = newPhotoPreview;
        }
      }

      // Format bio paragraphs
      const bioParagraphs = (formData.biography || '')
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

      const isVisible = Boolean(formData.is_visible ?? formData.isVisible ?? true);

      const updatedProfile: DirectorProfile = {
        ...formData,
        id: formData.id || 1,
        name: formData.name.trim(),
        designation: formData.designation.trim(),
        subtitle: 'Visionary Entrepreneur',
        seo_title: (formData.seo_title || formData.seoTitle || '').trim(),
        seoTitle: (formData.seo_title || formData.seoTitle || '').trim(),
        introduction: (formData.introduction || '').trim(),
        directorsMessage: (formData.directorsMessage || '').trim(),
        leadershipPhilosophy: (formData.leadershipPhilosophy || '').trim(),
        achievements: formData.achievements || DEFAULT_ACHIEVEMENTS,
        canvaDesignUrl: (formData.canvaDesignUrl || DEFAULT_CANVA_VIEW).trim(),
        canvaEmbedUrl: (formData.canvaEmbedUrl || DEFAULT_CANVA_EMBED).trim(),
        biography: formData.biography.trim(),
        bioParagraphs,
        experienceYears: (formData.experienceYears || '12+ Years').trim(),
        familiesGuided: (formData.familiesGuided || '900+').trim(),
        dubaiExperience: (formData.dubaiExperience || '2 Years').trim(),
        developerCount: (formData.developerCount || '10+').trim(),
        locations: (formData.locations || '').trim(),
        developers: (formData.developers || '').trim(),
        coreExpertise: formData.coreExpertise || DEFAULT_EXPERTISE,
        vision: formData.vision.trim(),
        photo_url: finalPhotoUrl,
        photoUrl: finalPhotoUrl,
        is_visible: isVisible,
        isVisible: isVisible,
        updated_at: new Date().toISOString(),
        updated_by: currentAdmin.name,
        highlights: [
          {
            id: 1,
            title: (formData.experienceYears || '12+ Years').trim(),
            description: 'Real Estate Experience',
            stat: (formData.experienceYears || '12+ Years').trim(),
            subtitle: 'Real Estate Experience',
            display_order: 1,
          },
          {
            id: 2,
            title: (formData.familiesGuided || '900+').trim(),
            description: 'Families & Investors Guided',
            stat: (formData.familiesGuided || '900+').trim(),
            subtitle: 'Families & Investors Guided',
            display_order: 2,
          },
          {
            id: 3,
            title: (formData.dubaiExperience || '2 Years').trim(),
            description: 'Dubai Real Estate Experience',
            stat: (formData.dubaiExperience || '2 Years').trim(),
            subtitle: 'Dubai Real Estate Experience',
            display_order: 3,
          },
          {
            id: 4,
            title: (formData.developerCount || '10+').trim(),
            description: 'Leading Developer Associations',
            stat: (formData.developerCount || '10+').trim(),
            subtitle: 'Leading Developer Associations',
            display_order: 4,
          },
        ],
      };

      const result = await onSaveProfile(updatedProfile, photoChanged);

      if (result.success) {
        setSaveStatus({
          type: 'success',
          message: 'Director Profile updated successfully.',
        });
        setNewPhotoPreview(null);
        setNewPhotoFile(null);
        setFormData(updatedProfile);
        setValidationErrors({});
      } else {
        setSaveStatus({
          type: 'error',
          message: result.message || 'Unable to update Director profile. Please try again.',
        });
      }
    } catch (err: any) {
      setSaveStatus({
        type: 'error',
        message: err.message || 'Unable to update Director profile. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Preview Image / Canva calculation
  const rawPreviewPhoto =
    newPhotoPreview ||
    formData.canvaEmbedUrl ||
    formData.photoUrl ||
    formData.photo_url ||
    DEFAULT_CANVA_EMBED;
  const isPreviewCanva =
    rawPreviewPhoto.includes('canva.com') || rawPreviewPhoto.includes('canva.link');
  const effectivePreviewPhoto = rawPreviewPhoto;
  const isVisibleStatus = Boolean(formData.is_visible ?? formData.isVisible ?? true);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-[#0A4D92]" />
            <span className="text-xs font-bold text-[#0A4D92] uppercase tracking-wider font-heading">
              DIRECTOR PROFILE MANAGEMENT
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Executive Profile Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage Director profile details, Canva executive portrait embed, philosophy, achievements, and visibility.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Publish / Unpublish Toggle */}
          <button
            type="button"
            onClick={handleToggleVisibility}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${
              isVisibleStatus
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
            }`}
          >
            {isVisibleStatus ? (
              <>
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>Published (Visible)</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                <span>Unpublished (Hidden)</span>
              </>
            )}
          </button>

          {/* Preview Photo / Embed Modal Button */}
          <button
            type="button"
            onClick={() => setShowPhotoPreviewModal(true)}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#0A4D92]" />
            <span>Preview Portrait</span>
          </button>

          {/* Update Director Profile Button */}
          <button
            type="button"
            id="admin-update-director-profile-top-btn"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#0A4D92] hover:bg-blue-800 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>UPDATE DIRECTOR PROFILE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success / Error Notification Toast */}
      {saveStatus && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-3 shadow-sm ${
            saveStatus.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {saveStatus.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="text-sm font-bold">{saveStatus.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setSaveStatus(null)}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Discard Confirmation Modal */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Discard unsaved modifications?
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Discarding will revert all fields back to stored database records. Unsaved changes will be lost.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDiscardConfirm(false)}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Keep Editing
              </button>
              <button
                type="button"
                onClick={handleDiscard}
                className="px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Size Photo Preview Modal */}
      {showPhotoPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setShowPhotoPreviewModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-4">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                RD INFRA Executive Portrait Preview
              </h3>
              <p className="text-xs text-slate-500">
                Mr. Ravinder Deshwal – Founder &amp; Director of RD Infra
              </p>
            </div>
            {isPreviewCanva ? (
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[4/5] bg-slate-100 flex items-center justify-center relative">
                <iframe
                  src={
                    effectivePreviewPhoto.includes('embed')
                      ? effectivePreviewPhoto
                      : `${effectivePreviewPhoto}?embed`
                  }
                  className="w-full h-full border-0"
                  allowFullScreen
                  title="RD INFRA Executive Portrait"
                />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[4/5] bg-slate-100 flex items-center justify-center">
                <img
                  src={effectivePreviewPhoto}
                  alt="Mr. Ravinder Deshwal – Founder & Director of RD Infra"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate max-w-[280px]">
                {formData.canvaEmbedUrl || DEFAULT_CANVA_EMBED}
              </span>
              <button
                type="button"
                onClick={() => setShowPhotoPreviewModal(false)}
                className="font-bold text-[#0A4D92] hover:underline cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2-Column Responsive Layout: Left Form, Right Live Website Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Editable Fields Form (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={(e) => handleSave(e)} className="space-y-6">
            {/* 1. LEADERSHIP CREDENTIALS: NAME & DESIGNATION */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0A4D92]" />
                  <span>1. Leadership Identity</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Director Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Director Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Mr. Ravinder Deshwal"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] ${
                      validationErrors.name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="text-[11px] text-rose-600 mt-1">{validationErrors.name}</p>
                  )}
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Designation <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="Founder & Director | Visionary Entrepreneur"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] ${
                      validationErrors.designation
                        ? 'border-rose-400 bg-rose-50/50'
                        : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.designation && (
                    <p className="text-[11px] text-rose-600 mt-1">{validationErrors.designation}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. CANVA INTEGRATION & PORTRAIT MANAGEMENT */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#0A4D92]" />
                    <span>2. Canva Design &amp; Executive Portrait</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Store and edit the Canva design URLs. Updates reflect directly on the public Director Profile.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetToCanva}
                  className="px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
                >
                  Reset to Default Design
                </button>
              </div>

              {/* Canva Design URL input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Canva Design URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.canvaDesignUrl || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleUpdateCanvaUrls(val, formData.canvaEmbedUrl || '');
                    }}
                    placeholder={DEFAULT_CANVA_VIEW}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                  />
                  {formData.canvaDesignUrl && (
                    <a
                      href={formData.canvaDesignUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
                      title="Open Canva Design in new tab"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Canva Embed URL input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Canva Embed URL
                </label>
                <input
                  type="text"
                  value={formData.canvaEmbedUrl || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleUpdateCanvaUrls(formData.canvaDesignUrl || '', val);
                  }}
                  placeholder={DEFAULT_CANVA_EMBED}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Default Embed: {DEFAULT_CANVA_EMBED}
                </p>
              </div>

              {/* Upload custom photo option */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Custom Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPhotoPreviewModal(true)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Portrait</span>
                  </button>
                </div>
                {photoError && (
                  <p className="text-xs text-rose-600 font-semibold">{photoError}</p>
                )}
              </div>
            </div>

            {/* 3. PROFILE INTRODUCTION & BIOGRAPHY */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                  3. Profile Introduction &amp; Biography
                </div>
              </div>

              {/* Profile Introduction */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Profile Introduction <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.introduction || ''}
                  onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                  placeholder="With over 12 years of proven expertise in the real estate industry, Mr. Ravinder Deshwal brings extensive industry knowledge, strategic vision, and a strong commitment to delivering value-driven real-estate solutions."
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-900 leading-snug focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] ${
                    validationErrors.introduction ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {validationErrors.introduction && (
                  <p className="text-[11px] text-rose-600 mt-1">{validationErrors.introduction}</p>
                )}
              </div>

              {/* Full Biography */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Biography (Paragraphs separated by blank line) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={7}
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  placeholder="Enter detailed corporate biography paragraphs..."
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-normal text-slate-900 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] ${
                    validationErrors.biography ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {validationErrors.biography && (
                  <p className="text-[11px] text-rose-600 mt-1">{validationErrors.biography}</p>
                )}
              </div>
            </div>

            {/* 4. VISION, DIRECTOR'S MESSAGE & LEADERSHIP PHILOSOPHY */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                  4. Vision, Message &amp; Leadership Philosophy
                </div>
              </div>

              {/* Vision Statement */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Vision Statement <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  placeholder="To redefine real estate consultancy through trust, transparency, strategic guidance, and long-term value creation."
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-900 leading-snug focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] ${
                    validationErrors.vision ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {validationErrors.vision && (
                  <p className="text-[11px] text-rose-600 mt-1">{validationErrors.vision}</p>
                )}
              </div>

              {/* Director's Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0A4D92]" />
                  <span>Director's Message (Highlighted Quote) <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="text"
                  value={formData.directorsMessage || ''}
                  onChange={(e) => setFormData({ ...formData, directorsMessage: e.target.value })}
                  placeholder="Building Better Tomorrows through vision, trust, and value-driven real estate."
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] ${
                    validationErrors.directorsMessage ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {validationErrors.directorsMessage && (
                  <p className="text-[11px] text-rose-600 mt-1">{validationErrors.directorsMessage}</p>
                )}
              </div>

              {/* Leadership Philosophy */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Leadership Philosophy
                </label>
                <textarea
                  rows={2}
                  value={formData.leadershipPhilosophy || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, leadershipPhilosophy: e.target.value })
                  }
                  placeholder="Integrity in advisory, absolute transparency in transactions, and enduring client partnerships that protect capital and maximize long-term wealth."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 leading-snug focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>
            </div>

            {/* 5. KEY ACHIEVEMENTS */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                    5. Achievements &amp; Milestones
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Bullet milestones displayed on the public Director Profile.
                  </p>
                </div>
              </div>

              {/* Achievements list */}
              <div className="space-y-2">
                {(formData.achievements || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 gap-2"
                  >
                    <span className="flex items-start gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#0A4D92] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Achievement input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAchievementInput}
                  onChange={(e) => setNewAchievementInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAchievement();
                    }
                  }}
                  placeholder="Add a key milestone or career achievement..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A4D92]"
                />
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="px-3.5 py-2 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* 6. EXPERIENCE METRICS & STATS */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                  6. Professional Experience Metrics
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Years of Experience */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Years of Experience <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.experienceYears || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, experienceYears: e.target.value })
                    }
                    placeholder="12+ Years"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>

                {/* Families Guided */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Families Guided <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.familiesGuided || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, familiesGuided: e.target.value })
                    }
                    placeholder="900+"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>

                {/* Dubai Experience */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Dubai Experience <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.dubaiExperience || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, dubaiExperience: e.target.value })
                    }
                    placeholder="2 Years"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Markets Covered */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0A4D92]" />
                  <span>Locations / Growth Corridors Covered</span>
                </label>
                <input
                  type="text"
                  value={formData.locations || ''}
                  onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                  placeholder="Gurugram, Delhi-NCR, Karnal, Rohtak, Dharuhera, Rewari, Jind"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>

              {/* Developer Associations */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0A4D92]" />
                  <span>Developer Associations</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.developers || ''}
                  onChange={(e) => setFormData({ ...formData, developers: e.target.value })}
                  placeholder="DLF, M3M, Elan, AIPL, SS Group, Amaya, Emaar, Smart World, Signature Global, Godrej Properties"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>
            </div>

            {/* 7. CORE EXPERTISE */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                    7. Areas of Expertise
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Add or remove expertise areas displayed on the public Director profile.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {(formData.coreExpertise || []).map((exp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#0A4D92]" />
                      {exp}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExpertise(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newExpertiseInput}
                  onChange={(e) => setNewExpertiseInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddExpertise();
                    }
                  }}
                  placeholder="Add another area of expertise..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A4D92]"
                />
                <button
                  type="button"
                  onClick={handleAddExpertise}
                  className="px-3.5 py-2 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Bottom Submit Action Bar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                {isDirty ? (
                  <span className="text-blue-700 font-semibold">
                    Unsaved changes detected. Click update to save permanently.
                  </span>
                ) : (
                  <span>All fields synchronized with backend database.</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (onCancel) onCancel();
                    else setShowDiscardConfirm(true);
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel Changes
                </button>

                <button
                  type="submit"
                  id="admin-update-director-profile-btn"
                  disabled={isSaving}
                  className={`px-6 py-2.5 text-xs font-bold text-white rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
                    isSaving
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-[#0A4D92] hover:bg-blue-800 active:scale-[0.98]'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Updates...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Director Profile Update</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Real-Time Live Website Preview (5 cols on lg) */}
        <div className="lg:col-span-5 sticky top-24 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading">
                Live Public Simulation
              </span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isVisibleStatus
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isVisibleStatus ? '● Published' : '○ Unpublished'}
            </span>
          </div>

          {/* Website Preview Container */}
          <div className="bg-slate-50 rounded-2xl border border-slate-300 overflow-hidden shadow-lg">
            {/* Mock Browser Topbar */}
            <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between text-white text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 text-slate-300 font-mono text-[10px]">rd-infra.in/#director</span>
              </div>
              <span className="text-slate-300 text-[10px]">Desktop View</span>
            </div>

            {/* Preview Body */}
            <div className="p-5 bg-white overflow-y-auto max-h-[80vh] space-y-5">
              {/* Heading */}
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A4D92] mb-1 font-heading">
                  MEET OUR DIRECTOR
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 font-heading">
                  {formData.name || 'Mr. Ravinder Deshwal'}
                </h4>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  {formData.designation || 'Founder & Director | Visionary Entrepreneur'}
                </p>
              </div>

              {/* Photo Presentation */}
              <div className="relative w-full max-w-xs mx-auto">
                <div className="relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-md aspect-[4/5] w-full">
                  {isPreviewCanva ? (
                    <iframe
                      src={
                        effectivePreviewPhoto.includes('embed')
                          ? effectivePreviewPhoto
                          : `${effectivePreviewPhoto}?embed`
                      }
                      className="w-full h-full border-0"
                      allowFullScreen
                      title="RD INFRA Executive Portrait"
                    />
                  ) : (
                    <img
                      src={effectivePreviewPhoto}
                      alt="Mr. Ravinder Deshwal – Founder & Director of RD Infra"
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                </div>
              </div>

              {/* Introduction Box */}
              {formData.introduction && (
                <div className="p-3 rounded-lg bg-blue-50/70 border-l-3 border-[#0A4D92] text-[11px] text-slate-800 font-medium leading-relaxed">
                  {formData.introduction}
                </div>
              )}

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-base font-extrabold text-slate-900 font-heading">
                    {formData.experienceYears || '12+ Years'}
                  </div>
                  <div className="text-[10px] text-slate-600">Real Estate Experience</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-base font-extrabold text-slate-900 font-heading">
                    {formData.familiesGuided || '900+'}
                  </div>
                  <div className="text-[10px] text-slate-600">Families Guided</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-base font-extrabold text-slate-900 font-heading">
                    {formData.dubaiExperience || '2 Years'}
                  </div>
                  <div className="text-[10px] text-slate-600">Dubai Real Estate</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-base font-extrabold text-slate-900 font-heading">
                    {formData.developerCount || '10+'}
                  </div>
                  <div className="text-[10px] text-slate-600">Developer Associations</div>
                </div>
              </div>

              {/* Vision Box */}
              {formData.vision && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 relative">
                  <Quote className="w-5 h-5 text-slate-300 absolute top-2 right-2" />
                  <div className="text-[9px] font-extrabold uppercase tracking-wider text-[#0A4D92] mb-1 font-heading">
                    VISION
                  </div>
                  <blockquote className="text-xs font-semibold text-slate-900 italic">
                    “{formData.vision}”
                  </blockquote>
                </div>
              )}

              {/* Director's Message */}
              {formData.directorsMessage && (
                <div className="p-3.5 rounded-xl bg-[#0A4D92] text-white space-y-1">
                  <div className="text-[9px] font-extrabold uppercase tracking-wider text-blue-200 font-heading">
                    DIRECTOR'S MESSAGE
                  </div>
                  <blockquote className="text-xs font-bold">
                    “{formData.directorsMessage}”
                  </blockquote>
                  {formData.leadershipPhilosophy && (
                    <p className="text-[10px] text-blue-100 pt-1 border-t border-blue-400/30">
                      {formData.leadershipPhilosophy}
                    </p>
                  )}
                </div>
              )}

              {/* Achievements Preview */}
              {formData.achievements && formData.achievements.length > 0 && (
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 font-heading">
                    KEY ACHIEVEMENTS
                  </div>
                  <div className="space-y-1">
                    {formData.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3 h-3 text-[#0A4D92] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Expertise List */}
              {formData.coreExpertise && formData.coreExpertise.length > 0 && (
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 font-heading">
                    AREAS OF EXPERTISE
                  </div>
                  <div className="space-y-1">
                    {formData.coreExpertise.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A4D92] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
