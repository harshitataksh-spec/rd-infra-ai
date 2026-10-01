import React from 'react';
import { X, ExternalLink, ShieldCheck, Sparkles, Download } from 'lucide-react';
import {
  CanvaLogoEmbed,
  CANVA_LOGO_VIEW_URL,
  CANVA_LOGO_SHARE_URL,
} from './CanvaLogoEmbed';

interface BrandPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandPresentationModal: React.FC<BrandPresentationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-[#0A4D92] border border-blue-200">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-heading">
                RD INFRA Official Brand Identity
              </h3>
              <p className="text-xs text-slate-500">
                Official logo design & visual specifications (Canva PDF Presentation)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body with Canva Embed */}
        <div className="p-6 overflow-y-auto max-h-[75vh] bg-slate-100/60 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <CanvaLogoEmbed showCaption={true} />
          </div>

          {/* Details & Direct Action Bar */}
          <div className="p-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#0A4D92] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">Verified Trademark & Brand Identity</p>
                <p className="text-[11px] text-slate-600">
                  RD INFRA — Building Better Tomorrows. Designed by Harshita Taksh.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={CANVA_LOGO_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <span>View Full PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={CANVA_LOGO_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                <span>Canva Link</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>RD INFRA © 2014 – 2026. All rights reserved.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
