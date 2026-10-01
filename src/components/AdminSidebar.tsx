import React from 'react';
import {
  LayoutDashboard,
  Mail,
  Building,
  Layers,
  Home,
  Tag,
  PhoneCall,
  TrendingUp,
  Award,
  MessageSquareQuote,
  Sparkles,
  FileSpreadsheet,
  Settings,
  Shield,
  LogOut,
  X,
  User,
} from 'lucide-react';
import { RDInfraLogo } from './RDInfraLogo';
import { AdminSessionUser } from '../types';

export type AdminTab =
  | 'overview'
  | 'leads'
  | 'properties'
  | 'projects'
  | 'buy'
  | 'sell'
  | 'rent'
  | 'investment'
  | 'director'
  | 'testimonials'
  | 'ai-assistant'
  | 'content'
  | 'settings'
  | 'security'
  | 'activity';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  currentUser: AdminSessionUser;
  onLogout: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  leadsCount?: number;
  newLeadsCount?: number;
  propertiesCount?: number;
  projectsCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  currentUser,
  onLogout,
  isMobileOpen = false,
  onCloseMobile,
  leadsCount = 0,
  newLeadsCount = 0,
  propertiesCount = 0,
  projectsCount = 0,
}) => {
  // Exact 15 sidebar items as specified:
  // 1. Dashboard, 2. Leads & Inquiry CRM, 3. Properties, 4. Projects, 5. Buy, 6. Sell, 7. Rent, 8. Investment,
  // 9. Director Profile, 10. Testimonials, 11. AI Assistant, 12. Website Content, 13. Settings, 14. Security, 15. Logout
  const navItems = [
    { id: 'overview' as AdminTab, label: '1. Dashboard', icon: LayoutDashboard },
    {
      id: 'leads' as AdminTab,
      label: '2. Leads & Inquiry CRM',
      icon: Mail,
      badge: newLeadsCount > 0 ? `${newLeadsCount} new` : `${leadsCount}`,
      badgeColor: newLeadsCount > 0 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400',
    },
    {
      id: 'properties' as AdminTab,
      label: '3. Properties',
      icon: Building,
      badge: `${propertiesCount}`,
      badgeColor: 'bg-slate-800 text-slate-400',
    },
    {
      id: 'projects' as AdminTab,
      label: '4. Projects',
      icon: Layers,
      badge: `${projectsCount}`,
      badgeColor: 'bg-slate-800 text-slate-400',
    },
    { id: 'buy' as AdminTab, label: '5. Buy', icon: Home },
    { id: 'sell' as AdminTab, label: '6. Sell', icon: Tag },
    { id: 'rent' as AdminTab, label: '7. Rent', icon: PhoneCall },
    { id: 'investment' as AdminTab, label: '8. Investment', icon: TrendingUp },
    { id: 'director' as AdminTab, label: '9. Director Profile', icon: Award },
    { id: 'testimonials' as AdminTab, label: '10. Testimonials', icon: MessageSquareQuote },
    { id: 'ai-assistant' as AdminTab, label: '11. AI Assistant', icon: Sparkles },
    { id: 'content' as AdminTab, label: '12. Website Content', icon: FileSpreadsheet },
    { id: 'settings' as AdminTab, label: '13. Settings', icon: Settings },
    { id: 'security' as AdminTab, label: '14. Security', icon: Shield },
  ];

  const roleColors: Record<string, { badge: string; text: string }> = {
    superadmin: { badge: 'bg-emerald-950/80 border-emerald-800/80 text-emerald-300', text: 'Super Admin' },
    admin: { badge: 'bg-blue-950/80 border-blue-800/80 text-blue-300', text: 'Admin' },
    editor: { badge: 'bg-amber-950/80 border-amber-800/80 text-amber-300', text: 'Editor' },
  };

  const currentRole = roleColors[currentUser.role] || {
    badge: 'bg-slate-800 text-slate-300',
    text: currentUser.role,
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-slate-950 border-r border-slate-800/90 text-slate-200 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RDInfraLogo size="sm" showText={false} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#0A4D92]">
                RD INFRA
              </div>
              <h2 className="text-sm font-bold text-white tracking-tight font-display">
                ADMIN DASHBOARD
              </h2>
            </div>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Current User Card */}
        <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-900/40">
          <div className="flex items-center gap-3">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0A4D92] to-blue-700 flex items-center justify-center text-white font-bold text-xs shrink-0 border border-slate-700">
                {currentUser.fullName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">
                {currentUser.fullName}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${currentRole.badge}`}
                >
                  {currentRole.text}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items (1-14) */}
        <nav className="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-thin scrollbar-thumb-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-[#0A4D92] text-white font-semibold shadow-md shadow-blue-950/40'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Item 15: Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/30 hover:bg-rose-900/60 border border-rose-900/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>15. Logout</span>
        </button>
        <div className="text-[10px] text-slate-600 text-center mt-2">
          RD INFRA Real Estate Operating System
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-full h-full z-10 animate-slide-right">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
