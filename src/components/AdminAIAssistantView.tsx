import React, { useState } from 'react';
import { Sparkles, Bot, ShieldCheck, Lock, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';
import { AdminSessionUser, SiteSettings } from '../types';

interface AdminAIAssistantViewProps {
  currentUser: AdminSessionUser;
  settings: SiteSettings;
  onUpdateSettings: (settings: SiteSettings) => void;
  onAddActivityLog: (action: string, record: string) => void;
}

export const AdminAIAssistantView: React.FC<AdminAIAssistantViewProps> = ({
  currentUser,
  settings,
  onUpdateSettings,
  onAddActivityLog,
}) => {
  const [welcomeMessage, setWelcomeMessage] = useState(
    'Welcome to RD INFRA. I am your AI Property Advisor. How may I assist your real estate search today?'
  );
  const [leadPhone, setLeadPhone] = useState(settings.whatsapp || '+919999999999');
  const [autoQualifyBudget, setAutoQualifyBudget] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const isSuperAdmin = currentUser.role === 'superadmin';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      whatsapp: leadPhone,
    });
    onAddActivityLog('Updated AI Assistant Settings', 'AI Assistant welcome parameters and WhatsApp routing updated');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-heading">
              AI Property Assistant Configuration
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Client interaction guidelines, conversational prompts, and automated WhatsApp lead handoffs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Assistant Active</span>
          </span>
        </div>
      </div>

      {savedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>AI Assistant configuration successfully synchronized.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSave} className="space-y-5 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Assistant Greeting / Initial Prompt
              </label>
              <textarea
                rows={3}
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D92] text-slate-800 leading-relaxed"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Rendered when visitors initiate the AI Assistant widget on the public site.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Direct WhatsApp Lead Routing Destination
              </label>
              <input
                type="text"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                placeholder="+919999999999"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D92] text-slate-800 font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Inquiries qualified by the AI Assistant will send pre-filled WhatsApp consultation messages to this number.
              </p>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoQualifyBudget}
                  onChange={(e) => setAutoQualifyBudget(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0A4D92] focus:ring-0"
                />
                <div>
                  <div className="font-bold text-slate-800">Automatic Budget & Corridor Qualification</div>
                  <div className="text-[11px] text-slate-500">
                    Prompt the user for location preferences (Gurgaon, Delhi-NCR, Haryana) before submitting lead.
                  </div>
                </div>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0A4D92] hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Save Assistant Settings
              </button>
            </div>
          </form>
        </div>

        {/* Sensitive Model Configuration (Super Admin Gate) */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-heading">
                Backend LLM Integration
              </span>
              <span className="text-[10px] bg-blue-950 border border-blue-800 text-blue-300 px-2 py-0.5 rounded-full">
                Gemini Architecture
              </span>
            </div>

            <div className="text-xs text-slate-400 space-y-2">
              <div>
                <span className="text-slate-500">Active Model:</span>{' '}
                <span className="text-white font-mono">gemini-2.5-flash</span>
              </div>
              <div>
                <span className="text-slate-500">Execution Mode:</span>{' '}
                <span className="text-emerald-400 font-semibold">Server-Side Proxy</span>
              </div>
              <div>
                <span className="text-slate-500">API Key Encryption:</span>{' '}
                <span className="text-purple-300 font-semibold">Environment Secret</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              {isSuperAdmin ? (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Super Admin permission verified. API secrets managed via server configuration.</span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-800/60 text-amber-200 text-xs flex items-start gap-2">
                  <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <span className="font-bold">Super Admin Required:</span> Only Super Admins can alter deep LLM temperature, grounding search tokens, and API quotas.
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
