import React, { useState } from 'react';
import { FileSpreadsheet, CheckCircle2, Globe, ExternalLink, Award } from 'lucide-react';
import { SiteSettings, DirectorProfile } from '../types';
import { RDInfraLogo } from './RDInfraLogo';

interface AdminWebsiteContentViewProps {
  settings: SiteSettings;
  directorProfile: DirectorProfile;
  onUpdateSettings: (settings: SiteSettings) => void;
  onAddActivityLog: (action: string, record: string) => void;
}

export const AdminWebsiteContentView: React.FC<AdminWebsiteContentViewProps> = ({
  settings,
  directorProfile,
  onUpdateSettings,
  onAddActivityLog,
}) => {
  const [headline, setHeadline] = useState('Premier Real Estate & Farmhouse Infrastructure in Northern India');
  const [canvaLogoLink, setCanvaLogoLink] = useState(
    settings.canva_logo_link || 'https://canva.link/ko5bhxv1zaasyoe'
  );
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      canva_logo_link: canvaLogoLink,
    });
    onAddActivityLog('Updated Website Content', 'Homepage brand headlines and Canva logo links synchronized');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0A4D92] border border-blue-200 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-heading">
              Website Content & Brand Asset Management
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage public website headlines, Canva brand asset links, and corridor spotlights.
            </p>
          </div>
        </div>
      </div>

      {savedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Website content updated successfully.</span>
        </div>
      )}

      {/* Brand Asset Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Official RD INFRA Brand Logo & Canva Artwork
            </h3>
            <p className="text-xs text-slate-500">
              Vector source for favicon, site navigation, and client presentations.
            </p>
          </div>
          <RDInfraLogo size="sm" />
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Canva Design Master URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={canvaLogoLink}
                onChange={(e) => setCanvaLogoLink(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 text-xs"
              />
              <a
                href={canvaLogoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-blue-50 text-[#0A4D92] hover:bg-blue-100 border border-blue-200 rounded-xl font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Open Design</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Official link: https://canva.link/ko5bhxv1zaasyoe
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Executive Hero Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium"
            />
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0A4D92] hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Save Website Content
            </button>
          </div>
        </form>
      </div>

      {/* Corridor Focus Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-heading">
          Active Real Estate Growth Corridors
        </h3>
        <p className="text-xs text-slate-500">
          Geographic focus areas spotlighted across RD INFRA public landing modules.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {[
            {
              name: 'NH-48 Corridor (Gurugram – Dharuhera – Rewari)',
              desc: 'Industrial expansion, logistics hubs, and premium agricultural land parcels.',
            },
            {
              name: 'Dwarka Expressway & Western Peripheral',
              desc: 'Luxury high-rise residential complexes and express transit corridors.',
            },
            {
              name: 'Northern Haryana (Karnal, Rohtak, Jind)',
              desc: 'High-appreciation farmhouse land banks and institutional acreage.',
            },
          ].map((corridor, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="text-xs font-bold text-slate-900">{corridor.name}</div>
              <div className="text-[11px] text-slate-500 mt-1">{corridor.desc}</div>
              <div className="mt-3 inline-block text-[10px] font-bold text-[#0A4D92] bg-blue-50 px-2 py-0.5 rounded">
                Active Corridor
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
