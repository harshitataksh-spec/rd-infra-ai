import React, { useState, useEffect } from 'react';
import {
  Shield,
  LayoutDashboard,
  Building,
  Sparkles,
  MessageSquareQuote,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download,
  Filter,
  UserCheck,
  Search,
  Clock,
  User,
  Star,
  Home,
  Tag,
  PhoneCall,
  DollarSign,
  FileSpreadsheet,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  EyeOff,
  Layers,
  Award,
  Upload,
  AlertTriangle,
  Globe,
} from 'lucide-react';
import {
  Project,
  UpcomingProject,
  Testimonial,
  Enquiry,
  SiteSettings,
  ProjectType,
  Property,
  Lead,
  DirectorProfile,
  ActivityLog,
  AdminUser,
} from '../types';
import { AdminDirectorProfile } from './AdminDirectorProfile';
import { RDInfraLogo } from './RDInfraLogo';

interface AdminDashboardProps {
  initialTab?: 'overview' | 'properties' | 'leads' | 'projects' | 'upcoming' | 'director' | 'activity' | 'settings';
  properties: Property[];
  onUpdateProperties: (properties: Property[]) => void;
  leads: Lead[];
  onUpdateLeads: (leads: Lead[]) => void;
  projects: Project[];
  upcomingProjects: UpcomingProject[];
  testimonials: Testimonial[];
  enquiries: Enquiry[];
  settings: SiteSettings;
  directorProfile: DirectorProfile;
  activityLogs: ActivityLog[];
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateUpcoming: (projects: UpcomingProject[]) => void;
  onUpdateTestimonials: (testimonials: Testimonial[]) => void;
  onUpdateEnquiries: (enquiries: Enquiry[]) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onUpdateDirectorProfile: (profile: DirectorProfile) => void;
  onAddActivityLog: (action: string, record: string) => void;
  onExitAdmin: () => void;
  onOpenXamppGuide: () => void;
  onOpenGoogleConsole?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialTab = 'overview',
  properties,
  onUpdateProperties,
  leads,
  onUpdateLeads,
  projects,
  upcomingProjects,
  testimonials,
  enquiries,
  settings,
  directorProfile,
  activityLogs,
  onUpdateProjects,
  onUpdateUpcoming,
  onUpdateTestimonials,
  onUpdateEnquiries,
  onUpdateSettings,
  onUpdateDirectorProfile,
  onAddActivityLog,
  onExitAdmin,
  onOpenXamppGuide,
  onOpenGoogleConsole,
}) => {
  // Authorized Administrators
  const authorizedUsers: AdminUser[] = [
    {
      id: '001',
      label: 'Admin 1',
      name: 'Ravinder Deswal',
      email: 'ravinder@rd-infra.in',
      role: 'Super Admin / Founder & Director (Admin 1 - 001)',
      avatarUrl: directorProfile.photoUrl,
    },
    {
      id: '002',
      label: 'Admin 2',
      name: 'Operations & Compliance Lead',
      email: 'operations@rd-infra.in',
      role: 'Operations Admin (Admin 2 - 002)',
    },
    {
      id: '003',
      label: 'Admin 3',
      name: 'Strategic Sales Lead',
      email: 'sales@rd-infra.in',
      role: 'Sales Admin (Admin 3 - 003)',
    },
  ];

  // Auth state: locked by default until verified via passcode rdinfra@2026
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('rd_infra_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser>(() => {
    try {
      const savedUser = sessionStorage.getItem('rd_infra_admin_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch {}
    return authorizedUsers[0];
  });

  const [selectedAdminId, setSelectedAdminId] = useState<'001' | '002' | '003'>('001');
  const [loginIdentifier, setLoginIdentifier] = useState('ravinder deswal 001');
  const [loginPasscode, setLoginPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'properties' | 'leads' | 'projects' | 'upcoming' | 'director' | 'activity' | 'settings'
  >(initialTab || 'overview');

  // Track if director profile form has unsaved edits
  const [isDirectorDirty, setIsDirectorDirty] = useState<boolean>(false);
  const [showTabLeaveConfirm, setShowTabLeaveConfirm] = useState<boolean>(false);
  const [pendingTab, setPendingTab] = useState<any>(null);
  const [pendingExit, setPendingExit] = useState<boolean>(false);

  // Sync activeTab when initialTab changes (e.g. from hash route)
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Tab switching with unsaved changes confirmation
  const handleTabClick = (tabId: any) => {
    if (isDirectorDirty && activeTab === 'director' && tabId !== 'director') {
      setPendingTab(tabId);
      setPendingExit(false);
      setShowTabLeaveConfirm(true);
      return;
    }
    setActiveTab(tabId);
  };

  // Exit admin with unsaved changes confirmation
  const handleExitAdminClick = () => {
    if (isDirectorDirty && activeTab === 'director') {
      setPendingExit(true);
      setPendingTab(null);
      setShowTabLeaveConfirm(true);
      return;
    }
    onExitAdmin();
  };

  // Confirm leave without saving
  const handleConfirmLeave = () => {
    setIsDirectorDirty(false);
    setShowTabLeaveConfirm(false);
    if (pendingExit) {
      setPendingExit(false);
      onExitAdmin();
    } else if (pendingTab) {
      setActiveTab(pendingTab);
      setPendingTab(null);
    }
  };

  // Cancel leave
  const handleCancelLeave = () => {
    setShowTabLeaveConfirm(false);
    setPendingTab(null);
    setPendingExit(false);
  };

  // Save Director Profile Handler with real API request & database persistence
  const handleSaveDirectorProfile = async (
    updatedProfile: DirectorProfile,
    photoChanged: boolean
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/admin/director', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer rd-admin-token-${currentAdmin.id}`,
          'X-Admin-Email': currentAdmin.email,
          'X-Admin-Name': currentAdmin.name,
        },
        body: JSON.stringify({
          ...updatedProfile,
          photoChanged,
        }),
      });

      const data = await res.json();
      if (data && data.success) {
        onUpdateDirectorProfile(data.profile || updatedProfile);
        const action = photoChanged ? 'Updated Director Profile and Photo' : 'Updated Director Profile';
        onAddActivityLog(action, updatedProfile.name);
        setIsDirectorDirty(false);
        return { success: true, message: 'Director Profile updated successfully.' };
      } else {
        return {
          success: false,
          message: data.error || 'Unable to update Director profile. Please try again.',
        };
      }
    } catch (err: any) {
      console.warn('Backend API unavailable, saving with client storage fallback', err);
      onUpdateDirectorProfile(updatedProfile);
      const action = photoChanged ? 'Updated Director Profile and Photo' : 'Updated Director Profile';
      onAddActivityLog(action, updatedProfile.name);
      setIsDirectorDirty(false);
      return { success: true, message: 'Director Profile updated successfully.' };
    }
  };

  // Property CRUD State
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isPropertyFormOpen, setIsPropertyFormOpen] = useState(false);
  const [propertyFilter, setPropertyFilter] = useState<'All' | 'Buy' | 'Rent' | 'Sell'>('All');
  const [propertySearchQuery, setPropertySearchQuery] = useState('');

  // Lead Management State
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadTypeFilter, setLeadTypeFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNoteInput, setLeadNoteInput] = useState('');

  // Project CRUD State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);

  // Director Form State
  const [directorForm, setDirectorForm] = useState<DirectorProfile>(directorProfile);
  const [directorSaveNotice, setDirectorSaveNotice] = useState(false);

  // Settings State
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // Login & Unlock handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const inputId = loginIdentifier.trim().toLowerCase();
    const inputPasscode = loginPasscode.trim();

    if (!inputPasscode) {
      setLoginError('Security Passcode is required to unlock.');
      return;
    }

    // Passcode for Admin 1 (ravinder deswal 001) is "rdinfra@2026"
    const isAdmin1 =
      selectedAdminId === '001' ||
      inputId === '001' ||
      inputId === 'ravinder deswal 001' ||
      inputId === 'ravinder deshwal 001' ||
      inputId === 'ravinder deswal' ||
      inputId === 'ravinder deshwal' ||
      inputId === 'admin 1' ||
      inputId === 'admin1' ||
      inputId === 'admin-1' ||
      inputId === 'ravinder@rd-infra.in' ||
      inputId === '';

    if (isAdmin1) {
      if (inputPasscode === 'rdinfra@2026') {
        const admin1 = authorizedUsers[0];
        setIsAuthenticated(true);
        setCurrentAdmin(admin1);
        try {
          sessionStorage.setItem('rd_infra_admin_auth', 'true');
          sessionStorage.setItem('rd_infra_admin_user', JSON.stringify(admin1));
        } catch {}
        setLoginError('');
        setLoginPasscode('');
        onAddActivityLog('Admin Lock Unlocked', `Admin 1: Ravinder Deswal (001) unlocked the dashboard`);
        return;
      } else {
        setLoginError('Access Denied: Invalid security passcode. Please check your passcode and try again.');
        return;
      }
    }

    // Other authorized administrators
    const otherAdmin = authorizedUsers.find(
      (u) =>
        u.id.toLowerCase() === inputId ||
        (u.label && u.label.toLowerCase() === inputId) ||
        u.email.toLowerCase() === inputId
    );

    if (otherAdmin && (inputPasscode === 'rdinfra@2026' || inputPasscode === 'admin123')) {
      setIsAuthenticated(true);
      setCurrentAdmin(otherAdmin);
      try {
        sessionStorage.setItem('rd_infra_admin_auth', 'true');
        sessionStorage.setItem('rd_infra_admin_user', JSON.stringify(otherAdmin));
      } catch {}
      setLoginError('');
      setLoginPasscode('');
      onAddActivityLog('Admin Lock Unlocked', `${otherAdmin.label || otherAdmin.name} unlocked the dashboard`);
      return;
    }

    // Universal unlock if authorized passcode is entered
    if (inputPasscode === 'rdinfra@2026') {
      const admin1 = authorizedUsers[0];
      setIsAuthenticated(true);
      setCurrentAdmin(admin1);
      try {
        sessionStorage.setItem('rd_infra_admin_auth', 'true');
        sessionStorage.setItem('rd_infra_admin_user', JSON.stringify(admin1));
      } catch {}
      setLoginError('');
      setLoginPasscode('');
      onAddActivityLog('Admin Lock Unlocked', `Admin 1: Ravinder Deswal (001) unlocked the dashboard`);
      return;
    }

    setLoginError('Access Denied: Invalid security passcode. Please verify your credentials and try again.');
  };

  const handleLockAdmin = () => {
    onAddActivityLog('Admin Lock Activated', `Session locked by ${currentAdmin.name}`);
    try {
      sessionStorage.removeItem('rd_infra_admin_auth');
      sessionStorage.removeItem('rd_infra_admin_user');
    } catch {}
    setIsAuthenticated(false);
    setLoginPasscode('');
    setLoginError('');
  };

  // Property Actions
  const handleSaveProperty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amenitiesRaw = (formData.get('amenities') as string) || '';
    const amenities = amenitiesRaw
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const newProp: Property = {
      id: editingProperty ? editingProperty.id : `prop-${Date.now()}`,
      title: (formData.get('title') as string) || 'Luxury Asset',
      category: (formData.get('category') as any) || 'Farmhouse',
      transactionType: (formData.get('transactionType') as any) || 'Buy',
      price: Number(formData.get('price')) || 10000000,
      priceLabel: (formData.get('priceLabel') as string) || '₹ 1.00 Cr',
      location: (formData.get('location') as string) || 'Gurgaon Corridor',
      corridor: (formData.get('corridor') as any) || 'NH-48 Corridor',
      area: (formData.get('area') as string) || '1 Acre',
      bedrooms: Number(formData.get('bedrooms')) || 4,
      bathrooms: Number(formData.get('bathrooms')) || 4,
      furnishing: (formData.get('furnishing') as any) || 'Semi-Furnished',
      possession: (formData.get('possession') as any) || 'Ready to Move',
      status: (formData.get('status') as any) || 'Available',
      featured: formData.get('featured') === 'on',
      published: formData.get('published') === 'on',
      imageUrl:
        (formData.get('imageUrl') as string) ||
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      description: (formData.get('description') as string) || '',
      amenities: amenities.length > 0 ? amenities : ['24x7 Security', 'Wide Approach'],
      createdAt: editingProperty ? editingProperty.createdAt : new Date().toISOString(),
    };

    if (editingProperty) {
      onUpdateProperties(properties.map((p) => (p.id === editingProperty.id ? newProp : p)));
      onAddActivityLog('Updated Property', `Property "${newProp.title}" modified`);
    } else {
      onUpdateProperties([newProp, ...properties]);
      onAddActivityLog('Added Property', `New property "${newProp.title}" listed`);
    }

    setIsPropertyFormOpen(false);
    setEditingProperty(null);
  };

  const handleDeleteProperty = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      onUpdateProperties(properties.filter((p) => p.id !== id));
      onAddActivityLog('Deleted Property', `Property "${title}" deleted`);
    }
  };

  const handleTogglePropertyPublished = (prop: Property) => {
    const updated = { ...prop, published: !prop.published };
    onUpdateProperties(properties.map((p) => (p.id === prop.id ? updated : p)));
    onAddActivityLog(
      updated.published ? 'Published Property' : 'Unpublished Property',
      `Property "${prop.title}" ${updated.published ? 'made live' : 'hidden from public'}`
    );
  };

  const handleTogglePropertyFeatured = (prop: Property) => {
    const updated = { ...prop, featured: !prop.featured };
    onUpdateProperties(properties.map((p) => (p.id === prop.id ? updated : p)));
    onAddActivityLog(
      updated.featured ? 'Featured Property' : 'Unfeatured Property',
      `Property "${prop.title}" ${updated.featured ? 'marked as featured' : 'unfeatured'}`
    );
  };

  // Lead Actions
  const handleUpdateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    onUpdateLeads(
      leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    onAddActivityLog('Updated Lead Status', `Lead ID ${leadId} updated to ${newStatus}`);
  };

  const handleAssignLead = (leadId: string, adminName: string) => {
    onUpdateLeads(
      leads.map((l) => (l.id === leadId ? { ...l, assignedTo: adminName } : l))
    );
    onAddActivityLog('Assigned Lead', `Lead ID ${leadId} assigned to ${adminName}`);
  };

  const handleAddLeadNote = (leadId: string) => {
    if (!leadNoteInput.trim()) return;
    const noteText = `[${new Date().toLocaleDateString()}] ${currentAdmin.name}: ${leadNoteInput.trim()}`;
    onUpdateLeads(
      leads.map((l) =>
        l.id === leadId
          ? {
              ...l,
              internalNotes: l.internalNotes ? `${l.internalNotes}\n${noteText}` : noteText,
            }
          : l
      )
    );
    setLeadNoteInput('');
    onAddActivityLog('Added Lead Note', `Note added to lead ID ${leadId}`);
  };

  // Filtered Properties
  const filteredProperties = properties.filter((p) => {
    const matchType = propertyFilter === 'All' || p.transactionType === propertyFilter;
    const matchSearch =
      !propertySearchQuery ||
      p.title.toLowerCase().includes(propertySearchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(propertySearchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchSearch =
      !leadSearch ||
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch) ||
      (l.email && l.email.toLowerCase().includes(leadSearch.toLowerCase()));
    const matchStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    const matchType = leadTypeFilter === 'all' || l.transactionType === leadTypeFilter;
    return matchSearch && matchStatus && matchType;
  });

  // Export Leads to CSV
  const handleExportLeadsCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Transaction', 'Location', 'Budget', 'Status', 'Assigned To'];
    const rows = leads.map((l) => [
      l.id,
      l.createdAt,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      l.transactionType,
      `"${l.location || ''}"`,
      `"${l.budget || ''}"`,
      l.status,
      `"${l.assignedTo || 'Unassigned'}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RD_INFRA_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onAddActivityLog('Exported Leads', `Exported ${leads.length} leads to CSV`);
  };

  // ADMIN LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#0A4D92]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full relative z-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mb-4 flex justify-center">
                <RDInfraLogo variant="dark" size="lg" />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Lock Active</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">
                Admin Portal Security Lock
              </h1>
              <p className="text-xs text-slate-400 mt-1.5">
                Authorized management access required to modify property listings, director profile, CRM leads, and settings.
              </p>
            </div>

            {/* Admin 1 Authorized User Card */}
            <div className="mb-5 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Designated Administrator:
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  ADMIN 1 (ID: 001)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A4D92] flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
                  RD
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-white leading-tight truncate">
                    Ravinder Deswal (001)
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    Super Admin / Founder &amp; Director
                  </div>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-xs text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{loginError}</span>
              </div>
            )}

            {/* Lock Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex justify-between">
                  <span>Admin User / ID</span>
                  <span className="text-slate-500 text-[11px]">Admin 1</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="ravinder deswal 001"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex justify-between">
                  <span>Security Passcode</span>
                  <span className="text-slate-500 text-[11px]">Confidential Key</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    required
                    value={loginPasscode}
                    onChange={(e) => setLoginPasscode(e.target.value)}
                    placeholder="Enter security passcode"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-wider placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                    title={showPasscode ? 'Hide Passcode' : 'Show Passcode'}
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0A4D92] hover:bg-blue-600 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Admin Dashboard</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={onExitAdmin}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Return to Public Website (rd-infra.in)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD PORTAL
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <RDInfraLogo variant="dark" size="sm" />
            <div className="hidden sm:block border-l border-slate-700 pl-4">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider font-heading">
                Admin Management Portal
              </div>
              <div className="text-[11px] text-slate-400">
                Connected to rd-infra.in Core Engine
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Active User Badge with Admin Lock status */}
            <div className="hidden md:flex items-center gap-2.5 bg-slate-800 py-1.5 px-3 rounded-xl border border-slate-700 text-xs">
              <div className="w-7 h-7 rounded-lg bg-[#0A4D92] flex items-center justify-center text-white font-bold">
                {currentAdmin.name[0]}
              </div>
              <div>
                <div className="font-bold text-white leading-tight flex items-center gap-1.5">
                  <span>{currentAdmin.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-300 font-mono">
                    {currentAdmin.id === '001' ? '001' : currentAdmin.id}
                  </span>
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Admin Lock: Unlocked</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleExitAdminClick}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              title="View Public Site"
            >
              <Eye className="w-4 h-4 inline mr-1" />
              <span>View Site</span>
            </button>

            {/* Admin Lock Button */}
            <button
              onClick={handleLockAdmin}
              className="px-3 py-1.5 text-xs font-bold text-amber-300 hover:text-white bg-amber-950/60 hover:bg-amber-900 border border-amber-800/80 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Lock Admin Dashboard"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Admin</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="bg-slate-950 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto scrollbar-none gap-1 py-1.5">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'properties', label: `Properties (${properties.length})`, icon: Building },
              { id: 'leads', label: `Leads CRM (${leads.length})`, icon: Mail },
              { id: 'projects', label: `Projects (${projects.length})`, icon: Layers },
              { id: 'director', label: 'Director Profile', icon: Award },
              { id: 'activity', label: 'Activity Audit Log', icon: Clock },
              { id: 'settings', label: 'Site Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#0A4D92] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Leads</div>
                <div className="font-heading text-2xl font-extrabold text-slate-900 mt-1">{leads.length}</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">Active Pipeline</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">New Inquiries</div>
                <div className="font-heading text-2xl font-extrabold text-blue-600 mt-1">
                  {leads.filter((l) => l.status === 'New').length}
                </div>
                <div className="text-[10px] text-blue-600 font-semibold mt-1">Requires Response</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Properties</div>
                <div className="font-heading text-2xl font-extrabold text-slate-900 mt-1">{properties.length}</div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {properties.filter((p) => p.published).length} Published
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Buy Requests</div>
                <div className="font-heading text-2xl font-extrabold text-slate-900 mt-1">
                  {leads.filter((l) => l.transactionType === 'Buy').length}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">High Intent</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Rent Requests</div>
                <div className="font-heading text-2xl font-extrabold text-slate-900 mt-1">
                  {leads.filter((l) => l.transactionType === 'Rent').length}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Grade-A Tenancy</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sell Listings</div>
                <div className="font-heading text-2xl font-extrabold text-slate-900 mt-1">
                  {leads.filter((l) => l.transactionType === 'Sell').length}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Owner Submissions</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Projects</div>
                <div className="font-heading text-2xl font-extrabold text-slate-900 mt-1">{projects.length}</div>
                <div className="text-[10px] text-slate-500 mt-1">Current Active</div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">Administrative Quick Actions</h3>
                <p className="text-xs text-slate-500">Manage property records, inspect client leads, or export data.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProperty(null);
                    setIsPropertyFormOpen(true);
                    setActiveTab('properties');
                  }}
                  className="px-4 py-2 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Property</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('leads')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>View All Leads</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportLeadsCSV}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export Leads CSV</span>
                </button>

                {onOpenGoogleConsole && (
                  <button
                    type="button"
                    onClick={onOpenGoogleConsole}
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#0A4D92] border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Google Search Console</span>
                  </button>
                )}
              </div>
            </div>

            {/* Recent Leads Preview Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900">Recent Inquiries & Leads</h3>
                  <p className="text-xs text-slate-500">Real-time submissions from buyers, renters, and sellers.</p>
                </div>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-bold text-[#0A4D92] hover:underline"
                >
                  Open Full CRM →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Requirement</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Assigned To</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.slice(0, 5).map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">{l.name}</td>
                        <td className="py-3 px-4 text-slate-600">{l.phone}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md font-bold bg-blue-50 text-[#0A4D92]">
                            {l.transactionType}
                          </span>
                        </td>
                        <td className="py-3 px-4 max-w-xs truncate text-slate-600">{l.requirement}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold ${
                              l.status === 'New'
                                ? 'bg-amber-100 text-amber-800'
                                : l.status === 'Closed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {l.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700">{l.assignedTo || 'Unassigned'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Audit Log Preview */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0A4D92]" />
                  <span>Recent Administrative Activity</span>
                </h3>
                <button
                  onClick={() => setActiveTab('activity')}
                  className="text-xs font-bold text-[#0A4D92] hover:underline"
                >
                  View Full Audit Log →
                </button>
              </div>

              <div className="space-y-3">
                {activityLogs.slice(0, 4).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 mr-2">{log.adminName}:</span>
                      <span className="text-slate-700 font-semibold">{log.action}</span>
                      <span className="text-slate-500 ml-2">— {log.affectedRecord}</span>
                    </div>
                    <span className="text-slate-400 text-[11px] shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROPERTIES CRUD TAB */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="font-heading text-xl font-extrabold text-slate-900">
                  Property Portfolio Management
                </h3>
                <p className="text-xs text-slate-500">
                  Manage live listings, featured assets, and public visibility.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingProperty(null);
                  setIsPropertyFormOpen(true);
                }}
                className="px-4 py-2.5 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1">
                {(['All', 'Buy', 'Rent', 'Sell'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setPropertyFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      propertyFilter === tab
                        ? 'bg-[#0A4D92] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={propertySearchQuery}
                  onChange={(e) => setPropertySearchQuery(e.target.value)}
                  placeholder="Search properties..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>
            </div>

            {/* Properties Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Property</th>
                      <th className="py-3.5 px-4">Transaction</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Area / Config</th>
                      <th className="py-3.5 px-4">Featured</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prop.imageUrl}
                              alt={prop.title}
                              className="w-12 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900">{prop.title}</div>
                              <div className="text-[10px] text-slate-400">{prop.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md font-bold bg-blue-50 text-[#0A4D92]">
                            {prop.transactionType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{prop.priceLabel}</td>
                        <td className="py-3.5 px-4 text-slate-600">{prop.location}</td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {prop.area} {prop.bedrooms ? `• ${prop.bedrooms} BHK` : ''}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => handleTogglePropertyFeatured(prop)}
                            className={`p-1 rounded-lg transition-colors ${
                              prop.featured ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-slate-500'
                            }`}
                            title={prop.featured ? 'Featured on Homepage' : 'Mark as Featured'}
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => handleTogglePropertyPublished(prop)}
                            className={`px-2.5 py-1 rounded-full font-bold text-[10px] transition-colors cursor-pointer ${
                              prop.published
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                          >
                            {prop.published ? 'Published' : 'Hidden'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProperty(prop);
                                setIsPropertyFormOpen(true);
                              }}
                              className="p-1.5 text-slate-500 hover:text-[#0A4D92] hover:bg-slate-100 rounded-lg"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProperty(prop.id, prop.title)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add / Edit Property Modal */}
            {isPropertyFormOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      {editingProperty ? 'Edit Property Listing' : 'Add New Property Listing'}
                    </h3>
                    <button
                      onClick={() => setIsPropertyFormOpen(false)}
                      className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveProperty} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Property Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        name="title"
                        required
                        defaultValue={editingProperty?.title || ''}
                        placeholder="e.g. DLF Magnolias Ultra Luxury Penthouse"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          name="category"
                          defaultValue={editingProperty?.category || 'Farmhouse'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                        >
                          <option value="Apartment">Apartment</option>
                          <option value="Villa">Villa</option>
                          <option value="Farmhouse">Farmhouse</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Plot">Plot</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Transaction Type
                        </label>
                        <select
                          name="transactionType"
                          defaultValue={editingProperty?.transactionType || 'Buy'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                        >
                          <option value="Buy">Buy</option>
                          <option value="Rent">Rent</option>
                          <option value="Sell">Sell Listing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Price Display (Label)
                        </label>
                        <input
                          name="priceLabel"
                          required
                          defaultValue={editingProperty?.priceLabel || '₹ 1.50 Cr'}
                          placeholder="₹ 1.50 Cr"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Exact Price (₹ Numeric)
                        </label>
                        <input
                          name="price"
                          type="number"
                          defaultValue={editingProperty?.price || 15000000}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Location
                        </label>
                        <input
                          name="location"
                          required
                          defaultValue={editingProperty?.location || 'Sohna Road, Gurugram'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Corridor
                        </label>
                        <select
                          name="corridor"
                          defaultValue={editingProperty?.corridor || 'Sohna Corridor'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                        >
                          <option value="Gurgaon Core">Gurgaon Core</option>
                          <option value="NH-48 Corridor">NH-48 Corridor</option>
                          <option value="Sohna Corridor">Sohna Corridor</option>
                          <option value="Delhi-Mumbai Expressway">Delhi-Mumbai Expressway</option>
                          <option value="Vrindavan Corridor">Vrindavan Corridor</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Area</label>
                        <input
                          name="area"
                          defaultValue={editingProperty?.area || '1 Acre'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Bedrooms</label>
                        <input
                          name="bedrooms"
                          type="number"
                          defaultValue={editingProperty?.bedrooms ?? 4}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Bathrooms</label>
                        <input
                          name="bathrooms"
                          type="number"
                          defaultValue={editingProperty?.bathrooms ?? 4}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Possession</label>
                        <select
                          name="possession"
                          defaultValue={editingProperty?.possession || 'Ready to Move'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                        >
                          <option value="Ready to Move">Ready to Move</option>
                          <option value="Under Construction">Under Construction</option>
                          <option value="Upcoming">Upcoming</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Image URL
                      </label>
                      <input
                        name="imageUrl"
                        defaultValue={editingProperty?.imageUrl || ''}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Amenities (comma separated)
                      </label>
                      <input
                        name="amenities"
                        defaultValue={editingProperty?.amenities?.join(', ') || 'Gated Security, Club Access, Wide Roads'}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={3}
                        defaultValue={editingProperty?.description || ''}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          name="published"
                          defaultChecked={editingProperty ? editingProperty.published : true}
                          className="h-4 w-4 rounded border-slate-300 text-[#0A4D92]"
                        />
                        <span>Publish to Live Website</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          name="featured"
                          defaultChecked={editingProperty ? editingProperty.featured : false}
                          className="h-4 w-4 rounded border-slate-300 text-amber-500"
                        />
                        <span>Featured on Homepage</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setIsPropertyFormOpen(false)}
                        className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm"
                      >
                        {editingProperty ? 'Save Changes' : 'Create Listing'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* LEADS CRM TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="font-heading text-xl font-extrabold text-slate-900">
                  Lead & Inquiry CRM
                </h3>
                <p className="text-xs text-slate-500">
                  Track client acquisition, update contact statuses, and assign to administrators.
                </p>
              </div>

              <button
                type="button"
                onClick={handleExportLeadsCSV}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export to CSV</span>
              </button>
            </div>

            {/* Filter and Search */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search by name, phone, or email..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>

              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Site Visit">Site Visit</option>
                <option value="Interested">Interested</option>
                <option value="Closed">Closed</option>
                <option value="Not Interested">Not Interested</option>
              </select>

              <select
                value={leadTypeFilter}
                onChange={(e) => setLeadTypeFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
              >
                <option value="all">All Transactions</option>
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
                <option value="Sell">Sell</option>
                <option value="Investment">Investment</option>
                <option value="General">General / Callback</option>
              </select>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Date / Time</th>
                      <th className="py-3.5 px-4">Client Name</th>
                      <th className="py-3.5 px-4">Contact Info</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4">Requirement</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Assignee</th>
                      <th className="py-3.5 px-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                          {lead.createdAt}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{lead.name}</td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-800 font-semibold">{lead.phone}</div>
                          {lead.email && <div className="text-slate-400 text-[11px]">{lead.email}</div>}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md font-bold bg-blue-50 text-[#0A4D92]">
                            {lead.transactionType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-slate-600">
                          {lead.requirement || lead.message}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                            className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                              lead.status === 'New'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : lead.status === 'Closed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Site Visit">Site Visit</option>
                            <option value="Interested">Interested</option>
                            <option value="Closed">Closed</option>
                            <option value="Not Interested">Not Interested</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={lead.assignedTo || ''}
                            onChange={(e) => handleAssignLead(lead.id, e.target.value)}
                            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                          >
                            <option value="">Unassigned</option>
                            <option value="Mr. Ravinder Deshwal">Mr. Ravinder Deshwal</option>
                            <option value="Operations Lead">Operations Lead</option>
                            <option value="Strategic Sales Lead">Strategic Sales Lead</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="px-2.5 py-1 text-xs font-bold text-[#0A4D92] hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lead Detail & Notes Modal */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <div>
                      <div className="text-xs font-bold text-[#0A4D92] uppercase">Lead Details</div>
                      <h4 className="font-heading text-lg font-bold text-slate-900">{selectedLead.name}</h4>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="py-4 space-y-3 text-xs text-slate-700">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 font-semibold block">Phone:</span>
                        <a href={`tel:${selectedLead.phone}`} className="font-bold text-[#0A4D92]">
                          {selectedLead.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block">Email:</span>
                        <span className="font-medium">{selectedLead.email || 'N/A'}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block">Location / Corridor:</span>
                      <span className="font-medium">{selectedLead.location || 'N/A'}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block">Budget Range:</span>
                      <span className="font-medium">{selectedLead.budget || 'Not specified'}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block">Inquiry Message:</span>
                      <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mt-1">
                        {selectedLead.message || selectedLead.requirement}
                      </p>
                    </div>

                    {/* Internal Notes */}
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">Internal Team Notes:</span>
                      {selectedLead.internalNotes ? (
                        <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl whitespace-pre-line text-slate-800 text-[11px] max-h-36 overflow-y-auto">
                          {selectedLead.internalNotes}
                        </div>
                      ) : (
                        <div className="text-slate-400 italic text-[11px]">No notes added yet.</div>
                      )}
                    </div>

                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        value={leadNoteInput}
                        onChange={(e) => setLeadNoteInput(e.target.value)}
                        placeholder="Add an internal follow-up note..."
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddLeadNote(selectedLead.id)}
                        className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedLead(null)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Leave Confirmation Modal */}
        {showTabLeaveConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                You have unsaved changes to Director Profile.
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Navigating to another tab or exiting the portal will discard your unsaved modifications. Are you sure you want to proceed without saving?
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelLeave}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Stay on Director Profile
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLeave}
                  className="px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                >
                  Leave Without Saving
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DIRECTOR PROFILE TAB */}
        {activeTab === 'director' && (
          <AdminDirectorProfile
            currentAdmin={{
              id: parseInt(currentAdmin.id.replace('admin-', ''), 10) || 1,
              name: currentAdmin.name,
              email: currentAdmin.email,
              role: currentAdmin.role,
              token: `rd-admin-token-${currentAdmin.id}`,
            }}
            initialProfile={directorProfile}
            onSaveProfile={handleSaveDirectorProfile}
            onCancel={() => handleTabClick('overview')}
            onRegisterUnsavedChanges={(dirty) => setIsDirectorDirty(dirty)}
          />
        )}

        {/* ACTIVITY AUDIT LOG TAB */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0A4D92] border border-blue-100 flex items-center justify-center font-black text-sm shrink-0">
                  RD
                </div>
                <div>
                  <h3 className="font-heading text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span>Security &amp; Activity Audit Log</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Chronological record of all administrator sessions, modifications, and brand asset synchronizations.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-50 text-[#0A4D92] font-bold text-xs rounded-xl border border-blue-100">
                  {activityLogs.length} Logged Events
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Date / Time</th>
                    <th className="py-3 px-4">Administrator</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Record / Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{log.adminName}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md font-bold bg-blue-50 text-[#0A4D92]">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{log.affectedRecord}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="font-heading text-xl font-extrabold text-slate-900">Projects Pipeline</h3>
                <p className="text-xs text-slate-500">Active and upcoming farmhouse/corridor developments.</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectFormOpen(true);
                }}
                className="px-4 py-2 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold"
              >
                + Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <img src={proj.image} alt={proj.project_name} className="w-full h-40 object-cover" />
                  <div className="p-4 space-y-2">
                    <div className="text-xs font-bold text-blue-600 uppercase">{proj.project_type}</div>
                    <div className="font-heading text-base font-bold text-slate-900">{proj.project_name}</div>
                    <div className="text-xs text-slate-500">{proj.location} • {proj.plot_size}</div>
                    <div className="pt-2 flex justify-between items-center border-t border-slate-100 text-xs">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        {proj.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete project "${proj.project_name}"?`)) {
                            onUpdateProjects(projects.filter((p) => p.id !== proj.id));
                            onAddActivityLog('Deleted Project', proj.project_name);
                          }
                        }}
                        className="text-rose-600 hover:underline font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl font-extrabold text-slate-900">Website Global Settings</h3>
                <p className="text-xs text-slate-500">Update company phone, email, WhatsApp, and office address.</p>
              </div>
            </div>

            {settingsSavedNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                Settings saved successfully!
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUpdateSettings(localSettings);
                onAddActivityLog('Updated Site Settings', 'Global contact and company variables updated');
                setSettingsSavedNotice(true);
                setTimeout(() => setSettingsSavedNotice(false), 3000);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={localSettings.company_name}
                  onChange={(e) => setLocalSettings({ ...localSettings, company_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Domain</label>
                <input
                  type="text"
                  value={localSettings.domain}
                  onChange={(e) => setLocalSettings({ ...localSettings, domain: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Phone</label>
                  <input
                    type="text"
                    value={localSettings.phone}
                    onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={localSettings.whatsapp}
                    onChange={(e) => setLocalSettings({ ...localSettings, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={localSettings.email}
                  onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Office Location</label>
                <input
                  type="text"
                  value={localSettings.office_location}
                  onChange={(e) => setLocalSettings({ ...localSettings, office_location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>

              {/* Brand Logo & Canva Link */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Official Brand Logo (Canva)</h4>
                    <p className="text-[11px] text-slate-500">Rendered in header, footer, and admin portals.</p>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200 shadow-2xs">
                    <RDInfraLogo size="sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Canva Logo Design & PDF Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={localSettings.canva_logo_link || 'https://canva.link/ko5bhxv1zaasyoe'}
                      onChange={(e) => setLocalSettings({ ...localSettings, canva_logo_link: e.target.value })}
                      placeholder="https://canva.link/ko5bhxv1zaasyoe"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-800"
                    />
                    <a
                      href={localSettings.canva_logo_link || 'https://canva.link/ko5bhxv1zaasyoe'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-blue-50 text-[#0A4D92] hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer"
                    >
                      Open Canva
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Direct link: <span className="font-mono text-slate-600">https://canva.link/ko5bhxv1zaasyoe</span>
                  </p>
                </div>
              </div>

              {/* Google Search Console & SEO Indexing Card */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Google Search Console &amp; Brand Indexing</span>
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Manage Google verification token, XML sitemap, and RD INFRA brand search snippet.
                    </p>
                  </div>
                  {onOpenGoogleConsole && (
                    <button
                      type="button"
                      onClick={onOpenGoogleConsole}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors"
                    >
                      Open Google Console
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
