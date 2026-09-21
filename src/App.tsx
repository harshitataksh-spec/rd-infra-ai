import React, { useState, useEffect } from 'react';
import {
  initialProjects,
  initialUpcomingProjects,
  initialTestimonials,
  defaultSiteSettings,
  initialProperties,
  initialLeads,
  initialDirectorProfile,
  initialActivityLogs,
} from './data/initialData';
import {
  Project,
  UpcomingProject,
  Testimonial,
  Enquiry,
  SiteSettings,
  Property,
  Lead,
  DirectorProfile,
  ActivityLog,
  PropertyFilter,
} from './types';

// Core Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertySearch } from './components/PropertySearch';
import { PropertiesSection } from './components/PropertiesSection';
import { SellPropertyForm } from './components/SellPropertyForm';
import { AIAssistant } from './components/AIAssistant';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DirectorSection } from './components/DirectorSection';
import { ProjectsSection } from './components/ProjectsSection';
import { UpcomingProjectsSection } from './components/UpcomingProjectsSection';
import { CorridorsSection } from './components/CorridorsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LeadGenerationSection } from './components/LeadGenerationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ProjectModal } from './components/ProjectModal';
import { EnquiryModal } from './components/EnquiryModal';
import { AdminDashboard } from './components/AdminDashboard';
import { XamppExportModal } from './components/XamppExportModal';

export default function App() {
  // 1. Persistent State with localStorage fallback
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('rd_infra_properties');
    return saved ? JSON.parse(saved) : initialProperties;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('rd_infra_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [directorProfile, setDirectorProfile] = useState<DirectorProfile>(() => {
    const saved = localStorage.getItem('rd_infra_director');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.photoUrl?.includes('DAHVdpgZwQc') || parsed.photo_url?.includes('DAHVdpgZwQc')) {
          parsed.photoUrl = initialDirectorProfile.photoUrl;
          parsed.photo_url = initialDirectorProfile.photo_url;
        }
        return {
          ...initialDirectorProfile,
          ...parsed,
          introduction: parsed.introduction || initialDirectorProfile.introduction,
          directorsMessage: parsed.directorsMessage || initialDirectorProfile.directorsMessage,
          leadershipPhilosophy: parsed.leadershipPhilosophy || initialDirectorProfile.leadershipPhilosophy,
          achievements: parsed.achievements || initialDirectorProfile.achievements,
          canvaDesignUrl: parsed.canvaDesignUrl || initialDirectorProfile.canvaDesignUrl,
          canvaEmbedUrl: parsed.canvaEmbedUrl || initialDirectorProfile.canvaEmbedUrl,
          highlights: parsed.highlights || initialDirectorProfile.highlights,
          bioParagraphs: parsed.bioParagraphs || initialDirectorProfile.bioParagraphs,
        };
      } catch {
        return initialDirectorProfile;
      }
    }
    return initialDirectorProfile;
  });

  // Fetch Director Profile from backend API on initial application load
  useEffect(() => {
    fetch('/api/director')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch director profile');
        return res.json();
      })
      .then((data) => {
        if (data && data.success && data.profile) {
          setDirectorProfile(data.profile);
          localStorage.setItem('rd_infra_director', JSON.stringify(data.profile));
        }
      })
      .catch((err) => {
        console.info('Using locally stored director profile', err);
      });
  }, []);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('rd_infra_activity');
    return saved ? JSON.parse(saved) : initialActivityLogs;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('rd_infra_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [upcomingProjects, setUpcomingProjects] = useState<UpcomingProject[]>(() => {
    const saved = localStorage.getItem('rd_infra_upcoming');
    return saved ? JSON.parse(saved) : initialUpcomingProjects;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('rd_infra_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('rd_infra_enquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('rd_infra_settings');
    return saved ? JSON.parse(saved) : defaultSiteSettings;
  });

  // UI state
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    return (
      hash === '#admin' ||
      hash.startsWith('#admin') ||
      path === '/admin/director-profile' ||
      path.startsWith('/admin')
    );
  });
  const [adminTab, setAdminTab] = useState<
    'overview' | 'properties' | 'leads' | 'projects' | 'upcoming' | 'director' | 'activity' | 'settings'
  >(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (hash === '#admin/director-profile' || path === '/admin/director-profile') {
      return 'director';
    }
    return 'overview';
  });
  const [isXamppModalOpen, setIsXamppModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [enquiryModal, setEnquiryModal] = useState<{ isOpen: boolean; projectName?: string }>({
    isOpen: false,
    projectName: undefined,
  });
  const [activeSection, setActiveSection] = useState('home');
  const [propertyFilter, setPropertyFilter] = useState<'Featured' | 'Buy' | 'Rent' | 'All'>('Featured');

  // Search bridge between PropertySearch and PropertiesSection
  const [searchFilter, setSearchFilter] = useState<PropertyFilter | undefined>(undefined);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('rd_infra_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('rd_infra_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('rd_infra_director', JSON.stringify(directorProfile));
  }, [directorProfile]);

  useEffect(() => {
    localStorage.setItem('rd_infra_activity', JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem('rd_infra_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('rd_infra_upcoming', JSON.stringify(upcomingProjects));
  }, [upcomingProjects]);

  useEffect(() => {
    localStorage.setItem('rd_infra_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('rd_infra_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('rd_infra_settings', JSON.stringify(settings));
  }, [settings]);

  // Listen for hash change (#admin or #admin/director-profile) and route navigation
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;

      if (
        pathname === '/admin/director-profile' ||
        hash === '#admin/director-profile'
      ) {
        setIsAdminOpen(true);
        setAdminTab('director');
      } else if (
        pathname.startsWith('/admin') ||
        hash === '#admin' ||
        hash.startsWith('#admin/')
      ) {
        setIsAdminOpen(true);
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Track active section on scroll matching the exact 9 navigation items
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'director',
        'projects',
        'buy',
        'sell',
        'investment',
        'rent',
        'ai-assistant',
        'contact',
      ];
      const scrollY = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setIsAdminOpen(false);
    if (window.location.hash.startsWith('#admin')) {
      window.history.replaceState(null, '', ' ');
    }

    if (sectionId === 'buy') {
      setPropertyFilter('Buy');
      setActiveSection('buy');
      const el = document.getElementById('buy') || document.getElementById('properties');
      if (el) {
        const offset = 85;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
      return;
    }

    if (sectionId === 'rent') {
      setPropertyFilter('Rent');
      setActiveSection('rent');
      const el = document.getElementById('rent') || document.getElementById('properties');
      if (el) {
        const offset = 85;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
      return;
    }

    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenEnquiry = (projectName?: string) => {
    setEnquiryModal({
      isOpen: true,
      projectName: projectName || 'General Portfolio Advisory',
    });
  };

  const handleEnquirySuccess = (newEnquiry: Enquiry) => {
    setEnquiries((prev) => [newEnquiry, ...prev]);
    // Also record as a Lead in the unified CRM
    const newLead: Lead = {
      id: `enq-${Date.now()}`,
      name: newEnquiry.name,
      phone: newEnquiry.phone,
      email: newEnquiry.email,
      requirement: `${newEnquiry.project}: ${newEnquiry.requirement}`,
      transactionType: 'General',
      location: 'Delhi-NCR',
      budget: 'Not Specified',
      message: newEnquiry.message,
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };
    setLeads((prev) => [newLead, ...prev]);
    handleAddActivityLog('New Contact Inquiry', `Received from ${newEnquiry.name} (${newEnquiry.phone})`);
  };

  const handleAddLead = async (
    leadData: Omit<Lead, 'id' | 'createdAt' | 'status' | 'assignedTo'>
  ): Promise<boolean> => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };

    setLeads((prev) => [newLead, ...prev]);
    handleAddActivityLog(
      `New ${leadData.transactionType} Lead`,
      `Client: ${leadData.name} (${leadData.phone}) - ${leadData.requirement}`
    );

    // Try posting to backend API if available
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      }).catch(() => null);
    } catch {
      // safe fallback
    }

    return true;
  };

  const handleAddActivityLog = (action: string, affectedRecord: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      adminName: 'Portal Engine',
      action,
      affectedRecord,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const handleSearchTriggered = (filter: PropertyFilter) => {
    setSearchFilter(filter);
    handleNavigate('properties');
  };

  const handleUpdateDirectorProfile = (newProfile: DirectorProfile) => {
    setDirectorProfile(newProfile);
    try {
      localStorage.setItem('rd_infra_director', JSON.stringify(newProfile));
    } catch (e) {
      console.warn('Failed to persist director profile to localStorage', e);
    }
  };

  // If Admin Dashboard is active, render the dedicated restricted admin portal
  if (isAdminOpen) {
    return (
      <AdminDashboard
        initialTab={adminTab}
        properties={properties}
        onUpdateProperties={setProperties}
        leads={leads}
        onUpdateLeads={setLeads}
        projects={projects}
        upcomingProjects={upcomingProjects}
        testimonials={testimonials}
        enquiries={enquiries}
        settings={settings}
        directorProfile={directorProfile}
        activityLogs={activityLogs}
        onUpdateProjects={setProjects}
        onUpdateUpcoming={setUpcomingProjects}
        onUpdateTestimonials={setTestimonials}
        onUpdateEnquiries={setEnquiries}
        onUpdateSettings={setSettings}
        onUpdateDirectorProfile={handleUpdateDirectorProfile}
        onAddActivityLog={handleAddActivityLog}
        onExitAdmin={() => {
          setIsAdminOpen(false);
          setAdminTab('overview');
          window.history.replaceState(null, '', window.location.pathname === '/admin/director-profile' ? '/' : ' ');
        }}
        onOpenXamppGuide={() => setIsXamppModalOpen(true)}
      />
    );
  }

  // PUBLIC PRODUCTION-READY WEBSITE
  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#0A4D92] selection:text-white flex flex-col font-sans">
      {/* 1. Header / Navigation */}
      <Navbar
        settings={settings}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenXamppGuide={() => setIsXamppModalOpen(true)}
      />

      {/* 1. Home / Hero & Search Section */}
      <Hero
        settings={settings}
        onExploreProperties={() => handleNavigate('buy')}
        onContactUs={() => handleNavigate('contact')}
        onScheduleConsultation={() => handleOpenEnquiry('Private Site Consultation')}
        onListProperty={() => handleNavigate('sell')}
      />

      <PropertySearch
        onSearch={handleSearchTriggered}
        onOpenSellForm={() => handleNavigate('sell')}
      />

      {/* 2. Director’s Profile (Mr. Ravinder Deshwal) */}
      <DirectorSection
        profile={directorProfile}
        whatsappNumber={settings.whatsapp}
        phone={settings.phone}
        onOpenConsultation={() => handleOpenEnquiry('Strategic Executive Consultation')}
        onExploreProperties={() => handleNavigate('buy')}
      />

      {/* 3. Projects Portfolio & Corridors */}
      <ProjectsSection
        projects={projects}
        onSelectProject={(project) => setSelectedProject(project)}
        onEnquireProject={(project) => handleOpenEnquiry(project.project_name)}
      />

      <UpcomingProjectsSection
        upcomingProjects={upcomingProjects}
        onRegisterInterest={(upcoming) => handleOpenEnquiry(upcoming.project_name)}
      />

      <CorridorsSection
        onExploreCorridorProjects={() => handleNavigate('buy')}
      />

      {/* 4. Buy (Featured Real Estate & Portfolios for Sale) */}
      <PropertiesSection
        properties={properties}
        controlledFilter={propertyFilter}
        onFilterChange={setPropertyFilter}
        onContactAdvisor={(prop) => handleOpenEnquiry(`${prop.title} (${prop.priceLabel})`)}
        whatsappNumber={settings.whatsapp}
      />

      {/* 5. Sell Property Form Section */}
      <SellPropertyForm
        onAddLead={handleAddLead}
        phone={settings.phone}
        whatsappNumber={settings.whatsapp}
      />

      {/* 6. Real-Estate Investment Calculator */}
      <InvestmentCalculator />

      {/* 7. Rent anchor & quick action banner */}
      <div id="rent-showcase" className="bg-slate-50 border-y border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A4D92] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Leasing & Rental Services
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">
              Looking to Rent Premium Living or Farmhouse Estates?
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              We curate high-end rental residences, weekend retreat farmsteads, and commercial spaces with verified lease documentation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate('rent')}
              className="px-5 py-2.5 rounded-xl bg-[#0A4D92] text-white font-bold text-xs shadow-sm hover:bg-blue-800 transition-all cursor-pointer"
            >
              Browse Rental Listings
            </button>
            <button
              onClick={() => handleOpenEnquiry('Rental Requirement')}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer"
            >
              Post Rental Requirement
            </button>
          </div>
        </div>
      </div>

      {/* 8. AI Property Assistant */}
      <AIAssistant
        whatsappNumber={settings.whatsapp}
        onExploreProperties={() => handleNavigate('buy')}
      />

      {/* Institutional Credibility & Testimonials */}
      <WhyChooseUs />
      <TestimonialsSection testimonials={testimonials} />

      {/* 9. Contact & Lead Advisory Office */}
      <LeadGenerationSection
        onAddLead={handleAddLead}
        phone={settings.phone}
      />

      <ContactSection
        settings={settings}
        projects={projects}
        onEnquirySubmitted={(enq) => {
          const newRecord: Enquiry = {
            id: Date.now(),
            name: enq.name,
            phone: enq.phone,
            email: enq.email,
            project: enq.project,
            requirement: enq.requirement,
            message: enq.message,
            status: 'new',
            created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
          };
          handleEnquirySuccess(newRecord);
        }}
      />

      {/* 15. Footer (Discreet Admin Portal Access) */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenXamppGuide={() => setIsXamppModalOpen(true)}
      />

      {/* Floating Action Buttons (Phone, WhatsApp, Scroll to top) */}
      <FloatingActions settings={settings} />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquire={(project) => {
          setSelectedProject(null);
          handleOpenEnquiry(project.project_name);
        }}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />

      {/* Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModal.isOpen}
        projectName={enquiryModal.projectName}
        onClose={() => setEnquiryModal({ isOpen: false })}
        onSuccess={handleEnquirySuccess}
      />

      {/* XAMPP & PHP/MySQL Architecture Modal */}
      <XamppExportModal
        isOpen={isXamppModalOpen}
        onClose={() => setIsXamppModalOpen(false)}
      />
    </div>
  );
}
