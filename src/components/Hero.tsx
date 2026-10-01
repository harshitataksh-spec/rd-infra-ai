import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Award, Users, ChevronRight, Phone, Building2 } from 'lucide-react';
import { SiteSettings } from '../types';
import { RDInfraLogo } from './RDInfraLogo';

interface HeroProps {
  settings: SiteSettings;
  onExploreProperties: () => void;
  onContactUs: () => void;
  onScheduleConsultation: () => void;
  onListProperty?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onExploreProperties,
  onContactUs,
  onScheduleConsultation,
  onListProperty,
}) => {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-slate-900">
      {/* Background with Dark Subtle Gradient Overlay over Luxury Farmhouse & Architecture */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
          alt="RD INFRA Luxury Real Estate and Plotted Land"
          className="w-full h-full object-cover object-center opacity-30"
          loading="eager"
        />
        {/* Gradients using Professional Blue (#0A4D92) and Dark Architectural Slate (#0f172a) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-[#0A4D92]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 max-w-3xl">
            {/* Tagline & Since Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="h-2 w-2 rounded-full bg-blue-400"></span>
              <span className="text-blue-200 font-bold">{settings.company_name}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-200">“Building Better Tomorrows”</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300">EST. {settings.since_year}</span>
            </div>

            {/* Strong Primary Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-heading">
              Building Better{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
                Tomorrows.
              </span>
            </h1>

            {/* Approved Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal mb-8 max-w-2xl">
              Discover better properties, smarter opportunities, and a simpler way to <strong>buy</strong>, <strong>rent</strong>, <strong>sell</strong>, and <strong>invest</strong> across Gurugram, Delhi-NCR, and North India’s strategic growth corridors.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-6">
              <button
                id="hero-explore-properties-btn"
                onClick={onExploreProperties}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0A4D92] hover:bg-blue-600 transition-all shadow-lg shadow-blue-950/50 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-talk-expert-btn"
                onClick={onContactUs}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-100 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Talk to an Expert</span>
                <ChevronRight className="w-4 h-4 text-blue-300" />
              </button>

              {onListProperty && (
                <button
                  id="hero-list-property-btn"
                  onClick={onListProperty}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs text-blue-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>List Your Property</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Hero Column: Executive Real Estate Advisory Card */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/30 text-left">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0A4D92] text-xs font-bold tracking-wider uppercase mb-3 border border-blue-100">
                  Executive Real Estate Advisory
                </span>
                <div className="py-1">
                  <RDInfraLogo size="md" />
                </div>
              </div>
              <div className="border-t border-slate-200/80 pt-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real estate consultancy &amp; infrastructure investments backed by 10+ years of verified market leadership and transparent transactions.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-slate-100 py-2 px-2 rounded-lg font-bold text-slate-800 border border-slate-200">10+ Years Heritage</div>
                  <div className="bg-blue-50 py-2 px-2 rounded-lg font-bold text-[#0A4D92] border border-blue-100">100% Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quick Trust Badges Grid */}
        <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-blue-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base lg:text-lg font-extrabold text-white leading-tight font-heading">10+ Years Experience</p>
                <p className="text-xs text-slate-300 mt-0.5 font-medium">Proven Market Heritage</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-blue-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base lg:text-lg font-extrabold text-white leading-tight font-heading">Trusted Network</p>
                <p className="text-xs text-slate-300 mt-0.5 font-medium">Top Tier Developer Ties</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-blue-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base lg:text-lg font-extrabold text-white leading-tight font-heading">Verified Listings</p>
                <p className="text-xs text-slate-300 mt-0.5 font-medium">100% Legal Due Diligence</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-blue-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base lg:text-lg font-extrabold text-white leading-tight font-heading">Transparent Deals</p>
                <p className="text-xs text-slate-300 mt-0.5 font-medium">Clear Title & Registry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
