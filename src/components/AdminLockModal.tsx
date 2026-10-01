import React from 'react';
import { Lock, Clock, LogIn, ArrowLeft } from 'lucide-react';
import { RDInfraLogo } from './RDInfraLogo';

interface AdminLockModalProps {
  isOpen: boolean;
  onLoginAgain: () => void;
  onReturnToWebsite: () => void;
}

export const AdminLockModal: React.FC<AdminLockModalProps> = ({
  isOpen,
  onLoginAgain,
  onReturnToWebsite,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lock-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in"
    >
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#0A4D92]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shadow-lg">
              <Clock className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0A4D92] flex items-center justify-center border-2 border-slate-900">
              <Lock className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* RD INFRA Logo */}
        <div className="flex justify-center mb-3">
          <RDInfraLogo size="sm" showText={false} />
        </div>

        {/* Headings matching specification */}
        <h2 id="lock-title" className="text-2xl font-bold text-white tracking-tight">
          Session Expired
        </h2>
        <p className="text-slate-300 text-sm mt-2 leading-relaxed max-w-xs mx-auto">
          Your admin session has expired for security reasons. Please log in again.
        </p>

        <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400">
          <span>Unsaved form drafts in the current tab have been preserved.</span>
        </div>

        {/* Action Buttons matching specification */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onLoginAgain}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0A4D92] hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Login Again</span>
          </button>

          <button
            type="button"
            onClick={onReturnToWebsite}
            className="w-full py-3 px-6 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm border border-slate-700/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Website</span>
          </button>
        </div>

        <div className="mt-6 text-[11px] text-slate-500">
          RD INFRA Real Estate Security System • Inactivity Protection
        </div>
      </div>
    </div>
  );
};
