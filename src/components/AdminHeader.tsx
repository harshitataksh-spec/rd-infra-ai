import React from 'react';
import { Menu, ShieldCheck, ExternalLink, LogOut } from 'lucide-react';
import { AdminSessionUser } from '../types';
import { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  activeTab: AdminTab;
  currentUser: AdminSessionUser;
  onOpenMobileMenu: () => void;
  onViewWebsite: () => void;
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  currentUser,
  onOpenMobileMenu,
  onViewWebsite,
  onLogout,
}) => {
  const tabTitles: Record<AdminTab, string> = {
    overview: 'Executive Dashboard & Metrics',
    leads: 'Lead & Inquiry CRM',
    properties: 'Property Portfolio Management',
    projects: 'Projects Pipeline (Active & Upcoming)',
    buy: 'Buy Inquiries & Available Inventories',
    sell: 'Sell Inquiries & Owner Submissions',
    rent: 'Rental & Leasing Inquiries',
    investment: 'Strategic Investment & Land Holdings',
    director: 'Director Profile Management',
    testimonials: 'Client Reviews & Testimonials',
    'ai-assistant': 'AI Property Assistant Settings',
    content: 'Website Content & Corridor Architecture',
    settings: 'Global Platform & System Settings',
    security: 'Security, Audit Logs & Access Control',
    activity: 'Audit & Activity Log',
  };

  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 border-b border-slate-800/90 backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-between text-white">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white font-display tracking-tight flex items-center gap-2">
            <span>{tabTitles[activeTab] || 'Admin Portal'}</span>
          </h1>
          <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-2">
            <span>RD INFRA Administration</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3 h-3" />
              <span>Session Active (30m Auto-lock)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onViewWebsite}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">View Public Website</span>
          <span className="sm:hidden">Website</span>
        </button>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-950/50 hover:bg-rose-900 border border-rose-800/70 text-rose-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          title="Sign out of Admin Portal"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
