import React from 'react';
import { DirectorProfile } from '../types';
import {
  ShieldCheck,
  Award,
  Quote,
  ArrowRight,
  MessageSquare,
  Building2,
  CheckCircle2,
  Globe2,
  Users2,
  TrendingUp,
} from 'lucide-react';

interface DirectorSectionProps {
  profile: DirectorProfile;
  whatsappNumber: string;
  phone: string;
  onOpenConsultation: () => void;
  onExploreProperties?: () => void;
}

const DEFAULT_CANVA_EMBED = 'https://www.canva.com/design/DAHVdjVF3NQ/iup0ESj38_cbbPCnojuG6A/view?embed';
const DEFAULT_CANVA_VIEW = 'https://www.canva.com/design/DAHVdjVF3NQ/iup0ESj38_cbbPCnojuG6A/view';

export const DirectorSection: React.FC<DirectorSectionProps> = ({
  profile,
  whatsappNumber,
  phone: _phone,
  onOpenConsultation,
  onExploreProperties,
}) => {
  // If explicitly hidden by admin, do not render publicly
  if (profile.is_visible === false && profile.isVisible === false) {
    return null;
  }

  const rawPhoto = (
    profile.canvaEmbedUrl ||
    profile.canvaDesignUrl ||
    profile.photoUrl ||
    profile.photo_url ||
    ''
  ).trim();

  // Check if current photo is a custom uploaded image (data URL or non-canva image file)
  const isCustomUploadedImage =
    Boolean(rawPhoto) &&
    (rawPhoto.startsWith('data:image/') ||
      (rawPhoto.startsWith('http') && !rawPhoto.includes('canva.')) ||
      (rawPhoto.startsWith('/') && !rawPhoto.includes('canva')));

  // Determine Canva embed URL with ?embed parameter
  let canvaEmbedUrl = DEFAULT_CANVA_EMBED;
  if (rawPhoto.includes('canva.com') || rawPhoto.includes('canva.link')) {
    canvaEmbedUrl = rawPhoto.includes('embed')
      ? rawPhoto
      : `${rawPhoto}${rawPhoto.includes('?') ? '&' : '?'}embed`;
  }

  const directorName = profile.name || 'Mr. Ravinder Deshwal';
  const designation = profile.designation || 'Founder & Director | Visionary Entrepreneur';

  const introduction =
    profile.introduction ||
    'With over 12 years of proven expertise in the real estate industry, Mr. Ravinder Deshwal brings extensive industry knowledge, strategic vision, and a strong commitment to delivering value-driven real-estate solutions.';

  const leadershipPhilosophy =
    profile.leadershipPhilosophy ||
    'Integrity in advisory, absolute transparency in transactions, and enduring client partnerships that protect capital and maximize long-term wealth.';

  const directorsMessage =
    profile.directorsMessage ||
    'Building Better Tomorrows through vision, trust, and value-driven real estate.';

  const visionText =
    profile.vision ||
    'To redefine real estate consultancy through trust, transparency, strategic guidance, and long-term value creation.';

  const achievementsList =
    profile.achievements && profile.achievements.length > 0
      ? profile.achievements
      : [
          '12+ Years of verified market leadership across Gurugram, Delhi-NCR, and northern growth corridors',
          '900+ families, HNWIs, and institutional investors guided to successful property decisions',
          'Strategic associations with tier-1 developers including DLF, M3M, Godrej, Emaar, Smart World, and Signature Global',
          'International cross-border advisory footprint with 2 years of active Dubai real estate market experience',
          'Pioneered premium farmhouse land aggregation and expressway corridor investments in Haryana',
        ];

  const defaultExpertise = [
    'Residential & Commercial Real Estate Advisory',
    'Farmhouse & Strategic Land Investments',
    'High-Yield Investment Advisory & Wealth Creation',
    'Market Evaluation & Project Viability Analysis',
    'Strategic Developer Alignments & Large Scale Sales',
    'Dubai Freehold & Global Property Opportunities',
  ];

  const expertiseList =
    profile.coreExpertise && profile.coreExpertise.length > 0
      ? profile.coreExpertise
      : defaultExpertise;

  const stats = [
    {
      value: profile.experienceYears || '12+ Years',
      label: 'Real Estate Expertise',
      icon: Award,
    },
    {
      value: profile.familiesGuided || '900+',
      label: 'Families & Investors Guided',
      icon: Users2,
    },
    {
      value: profile.dubaiExperience || '2 Years',
      label: 'Dubai Real Estate Advisory',
      icon: Globe2,
    },
    {
      value: profile.developerCount || '10+',
      label: 'Leading Developer Associations',
      icon: Building2,
    },
  ];

  return (
    <section
      id="director"
      className="py-20 lg:py-28 bg-slate-50/60 border-t border-slate-200/80 relative overflow-hidden"
    >
      {/* Background Architectural Grid & Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-200/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            MOBILE LAYOUT HEADER:
            Sequence requested by user:
            1. Section heading: MEET OUR DIRECTOR
            2. Canva portrait at the top
            3. Director name
            4. Designation
            5. Biography
            6. Vision
            7. Leadership message
            8. Achievements
            9. CTA
           ========================================================================= */}
        <div className="block lg:hidden mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-[#0A4D92]" />
            <span>Executive Profile</span>
          </div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#0A4D92] mb-1 font-heading">
            MEET OUR DIRECTOR
          </h2>
        </div>

        {/* =========================================================================
            RESPONSIVE GRID:
            Desktop: 2 Columns (LEFT: Col-span-5 Canva Portrait | RIGHT: Col-span-7 Information)
            Mobile: Single Column matching requested sequential flow
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* =========================================================================
              LEFT COLUMN: Canva Director Portrait (Desktop) / Top Portrait (Mobile)
              Prominently displayed, integrated seamlessly without external document links.
             ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto group">
              {/* Outer architectural aura accent */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#0A4D92]/15 via-blue-50 to-slate-200/60 opacity-80 blur-md -z-10 transition-opacity group-hover:opacity-100 duration-500" />

              {/* Integrated Visual Showcase: Canva Executive Portrait Embed or Uploaded Portrait */}
              {isCustomUploadedImage ? (
                <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-900/5 aspect-[4/5] w-full">
                  <img
                    src={rawPhoto}
                    alt="Mr. Ravinder Deshwal – Founder & Director of RD Infra"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent p-5 text-white pointer-events-none">
                    <div className="font-heading text-xl font-bold tracking-tight text-white drop-shadow-sm">
                      {directorName}
                    </div>
                    <div className="text-xs text-blue-200 font-semibold tracking-wide mt-0.5">
                      {designation}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-900/5 w-full">
                  {/* Official Canva Executive Portrait Embed */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 0,
                      paddingTop: '135%',
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      loading="eager"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        border: 'none',
                        padding: 0,
                        margin: 0,
                      }}
                      src={canvaEmbedUrl}
                      allowFullScreen
                      allow="fullscreen"
                      title="RD INFRA Executive Portrait"
                    />
                  </div>
                </div>
              )}

              {/* Executive Credentials Badge */}
              <div className="mt-3.5 w-full sm:w-auto sm:mt-0 sm:absolute sm:-bottom-5 sm:right-4 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-xl border border-slate-200 shadow-md flex items-center justify-center sm:justify-start gap-3 z-10">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0A4D92] flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#0A4D92]" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-heading">
                    EXECUTIVE LEADERSHIP
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    12+ Years Industry Leadership
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Consultation prompt below portrait */}
            <div className="mt-8 w-full max-w-md hidden sm:flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-xs text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Strategic Real Estate Advisory
              </span>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="font-bold text-[#0A4D92] hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Schedule Consultation &rarr;
              </button>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Structured Profile Information
              1. MEET OUR DIRECTOR
              2. Director Name: Mr. Ravinder Deshwal
              3. Designation: Founder & Director | Visionary Entrepreneur
              4. Professional Biography & Profile Introduction
              5. Vision
              6. Leadership Message & Philosophy
              7. Achievements & Experience Highlights
              8. CTA Buttons
             ========================================================================= */}
          <div className="lg:col-span-7 space-y-7">
            {/* 1, 2, 3: SECTION HEADING, DIRECTOR NAME & DESIGNATION */}
            <div>
              <div className="hidden lg:flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-[#0A4D92]" />
                  <span>Executive Leadership</span>
                </span>
              </div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#0A4D92] mb-1 font-heading">
                MEET OUR DIRECTOR
              </h2>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
                {directorName}
              </div>
              <div className="text-base sm:text-lg font-semibold text-slate-600 mt-1">
                {designation}
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0A4D92] via-blue-600 to-slate-400 mt-4 rounded-full" />
            </div>

            {/* 4. PROFESSIONAL BIOGRAPHY */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {/* Profile Introduction Highlight */}
              <div className="p-4 rounded-xl bg-blue-50/50 border-l-4 border-[#0A4D92] text-slate-800 font-medium">
                {introduction}
              </div>

              {/* Detailed Biography Paragraphs */}
              {profile.bioParagraphs && profile.bioParagraphs.length > 0 ? (
                profile.bioParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-slate-700">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p>
                    As Founder &amp; Director of RD Infra, Mr. Ravinder Deshwal has spearheaded
                    residential, commercial, farmhouse, and strategic land investments across North
                    India. Over his career, he has personally advised over{' '}
                    <strong className="text-slate-900 font-bold">900+ families and investors</strong>{' '}
                    in securing high-appreciation assets in Gurugram, Delhi-NCR, Karnal, Rohtak,
                    Dharuhera, Rewari, Jind, and adjacent growth corridors.
                  </p>
                  <p>
                    He maintains trusted relationships with leading developers—including{' '}
                    <strong className="text-slate-900 font-bold">
                      DLF, M3M, Elan, AIPL, SS Group, Amaya, Emaar, Smart World, Signature Global, and Godrej Properties
                    </strong>
                    . Supplemented by two years of dedicated advisory in Dubai's premier freehold
                    sectors, he delivers unmatched local precision with an international
                    investment perspective.
                  </p>
                </>
              )}
            </div>

            {/* 5. HIS VISION */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 relative overflow-hidden shadow-xs">
              <Quote className="w-10 h-10 text-slate-200 absolute top-3 right-4 -z-0" />
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0A4D92] mb-2 font-heading">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>VISION</span>
                </div>
                <blockquote className="text-base sm:text-lg font-heading font-semibold text-slate-900 italic leading-snug">
                  “{visionText}”
                </blockquote>
              </div>
            </div>

            {/* 6. LEADERSHIP MESSAGE & PHILOSOPHY */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0A4D92] text-white shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-200" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-100 font-heading">
                  DIRECTOR'S MESSAGE
                </span>
              </div>
              <blockquote className="text-lg sm:text-xl font-bold font-heading leading-snug">
                “{directorsMessage}”
              </blockquote>
              {leadershipPhilosophy && (
                <div className="pt-3 border-t border-blue-400/30">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-1">
                    Leadership Philosophy
                  </div>
                  <p className="text-sm text-blue-50 leading-relaxed">
                    {leadershipPhilosophy}
                  </p>
                </div>
              )}
            </div>

            {/* 7. ACHIEVEMENTS & TRACK RECORD */}
            <div className="space-y-4">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-heading">
                KEY ACHIEVEMENTS &amp; MILESTONES
              </div>
              <div className="space-y-2.5">
                {achievementsList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0A4D92] mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPERIENCE HIGHLIGHTS CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0A4D92] transition-all text-center flex flex-col items-center justify-center group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0A4D92] flex items-center justify-center mb-2 group-hover:bg-[#0A4D92] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium mt-0.5 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CORE EXPERTISE GRID */}
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 font-heading">
                AREAS OF EXPERTISE
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {expertiseList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#0A4D92] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. CTAs & INTERACTIVE CONTROLS */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-slate-200">
              {/* Primary Connect CTA */}
              <button
                type="button"
                id="director-connect-btn"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0A4D92] hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Connect With RD INFRA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Explore Properties CTA */}
              {onExploreProperties && (
                <button
                  type="button"
                  id="director-explore-properties-btn"
                  onClick={onExploreProperties}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-slate-600" />
                  <span>Explore Properties</span>
                </button>
              )}

              {/* WhatsApp Option */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello%20RD%20INFRA,%20I%20would%20like%20to%20connect%20with%20Mr.%20Ravinder%20Deshwal%20regarding%20property%20investments.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-sm rounded-xl transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp RD INFRA</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
