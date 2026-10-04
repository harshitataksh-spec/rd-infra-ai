import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ArrowRight, Sparkles, ExternalLink, Lock, Globe } from 'lucide-react';
import { SiteSettings } from '../types';
import { RDInfraLogo } from './RDInfraLogo';

interface NavbarProps {
  settings: SiteSettings;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenEnquiry: (projectName?: string) => void;
  onOpenAdmin: () => void;
  onOpenXamppGuide: () => void;
  onOpenBrandPresentation?: () => void;
  onOpenGoogleConsole?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  activeSection,
  onNavigate,
  onOpenEnquiry,
  onOpenAdmin,
  onOpenXamppGuide,
  onOpenBrandPresentation,
  onOpenGoogleConsole,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'director', label: "Director’s Profile" },
    { id: 'projects', label: 'Projects' },
    { id: 'buy', label: 'Buy' },
    { id: 'sell', label: 'Sell' },
    { id: 'investment', label: 'Investment' },
    { id: 'rent', label: 'Rent' },
    { id: 'ai-assistant', label: 'AI Assistant' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200'
          : 'bg-white/90 backdrop-blur-sm py-3 border-b border-slate-100'
      }`}
    >
      {/* Top micro-bar for phone, domain, and corridor focus */}
      <div className="hidden lg:block border-b border-slate-100 pb-1.5 mb-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-slate-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Strategic Real Estate & Investment Corridors • Delhi-NCR
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">Gurugram • NH-48 • Sohna • Delhi–Mumbai Expressway • Vrindavan</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 font-semibold text-[#0A4D92] hover:text-blue-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-semibold">{settings.domain}</span>
            <span className="text-slate-300">|</span>
            <a
              href="https://canva.link/ko5bhxv1zaasyoe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#0A4D92] hover:text-blue-700 transition-colors cursor-pointer flex items-center gap-1"
              title="View Official RD Infra Logo PDF on Canva"
            >
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>Canva Logo</span>
              <ExternalLink className="w-3 h-3 text-blue-500" />
            </a>
            {onOpenBrandPresentation && (
              <>
                <span className="text-slate-300">|</span>
                <button
                  onClick={onOpenBrandPresentation}
                  className="text-xs font-semibold text-slate-500 hover:text-[#0A4D92] transition-colors cursor-pointer flex items-center gap-1"
                  title="View Official Brand Presentation Modal"
                >
                  <span>Brand Modal</span>
                </button>
              </>
            )}
            {onOpenGoogleConsole && (
              <>
                <span className="text-slate-300">|</span>
                <button
                  onClick={onOpenGoogleConsole}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                  title="Google Search Console & SEO Indexing"
                >
                  <Globe className="w-3 h-3 text-emerald-600" />
                  <span>Google Console</span>
                </button>
              </>
            )}
            <span className="text-slate-300">|</span>
            <button
              onClick={onOpenAdmin}
              className="text-xs font-semibold text-slate-600 hover:text-[#0A4D92] transition-colors cursor-pointer flex items-center gap-1.5 px-2 py-0.5 rounded-lg hover:bg-slate-100"
              title="RD INFRA Admin Lock Portal"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Admin Lock</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-2.5">
          {/* Official Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md cursor-pointer group py-0.5"
            aria-label="RD INFRA - Home"
          >
            <RDInfraLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5" aria-label="Main Navigation">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={`${link.label}-${idx}`}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#0A4D92] bg-blue-50/90 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-[#0A4D92] hover:bg-slate-100/70'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-2.5 right-2.5 h-0.5 bg-[#0A4D92] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Buttons: List Your Property CTA + WhatsApp */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <a
              href={`https://wa.me/${settings.whatsapp}?text=Hello%20RD%20INFRA,%20I%20am%20interested%20in%20exploring%20properties.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-700" />
              <span>WhatsApp</span>
            </a>

            <button
              id="header-list-property-cta"
              onClick={() => handleLinkClick('sell')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0A4D92] hover:bg-blue-800 shadow-sm hover:shadow rounded-xl transition-all cursor-pointer"
            >
              <span>List Your Property</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleLinkClick('sell')}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#0A4D92] rounded-lg"
            >
              List Property
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="py-2.5 border-b border-slate-100 flex items-center justify-between">
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center text-left focus:outline-none cursor-pointer"
              aria-label="RD INFRA - Home"
            >
              <RDInfraLogo size="sm" />
            </button>
            <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-xs font-bold text-[#0A4D92] bg-blue-50 px-2.5 py-1 rounded-lg">
              {settings.phone}
            </a>
          </div>

          {/* Mobile Linear Navigation Menu strictly preserving 1 to 9 sequence */}
          <nav className="flex flex-col divide-y divide-slate-100 py-1" aria-label="Mobile Navigation">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={`${link.label}-${idx}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'text-[#0A4D92] bg-blue-50/90 font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0A4D92]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? 'bg-[#0A4D92] text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium">{link.label}</span>
                  </span>
                  {isActive && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A4D92]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A4D92] animate-pulse" />
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => handleLinkClick('sell')}
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#0A4D92] text-center"
            >
              List Your Property
            </button>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 border border-slate-300 text-center flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <a
              href="https://canva.link/ko5bhxv1zaasyoe"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-[#0A4D92] bg-blue-50 hover:bg-blue-100 border border-blue-200 text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>View Official Canva Logo PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {onOpenGoogleConsole && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGoogleConsole();
                }}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Google Search Console &amp; SEO</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Admin Lock Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
