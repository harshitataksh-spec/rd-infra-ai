import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { SiteSettings } from '../types';

interface FloatingActionsProps {
  settings: SiteSettings;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ settings }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 select-none">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="h-10 w-10 rounded-full bg-slate-900 text-white shadow-lg flex items-center justify-center hover:bg-slate-800 transition-all transform hover:scale-105"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Call Button */}
      <a
        href={`tel:${settings.phone.replace(/\s+/g, '')}`}
        aria-label="Call RD INFRA"
        className="flex items-center gap-2 py-2.5 px-4 rounded-full bg-[#0A4D92] text-white shadow-lg hover:bg-blue-800 transition-all transform hover:scale-105"
      >
        <Phone className="w-4 h-4" />
        <span className="text-xs font-bold hidden sm:inline">Call RD INFRA</span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${settings.whatsapp}?text=Hello%20RD%20INFRA,%20I%20am%20interested%20in%20exploring%20your%20farmhouse%20and%20land%20investment%20projects.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with RD INFRA"
        className="flex items-center gap-2 py-2.5 px-4 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-105"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="text-xs font-bold hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
};
