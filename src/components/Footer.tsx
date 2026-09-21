import React from 'react';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenXamppGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenAdmin,
  onOpenXamppGuide,
}) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-white block">
                RD INFRA
              </span>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1.5 block">
                Building Better Tomorrows
              </p>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mt-4">
              RD INFRA is a North Indian real estate advisory and development firm established in 2014. We specialize in premium farmhouses, strategic land investments, and plotted developments across Gurgaon, NH-48, Sohna, and Vrindavan.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p><strong className="text-white">Domain:</strong> {settings.domain}</p>
              <p><strong className="text-white">Experience:</strong> 10+ Years in Real Estate</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-blue-400">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  1. Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('director')} className="hover:text-white transition-colors cursor-pointer">
                  2. Director’s Profile
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors cursor-pointer">
                  3. Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('buy')} className="hover:text-white transition-colors cursor-pointer">
                  4. Buy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sell')} className="hover:text-white transition-colors cursor-pointer">
                  5. Sell
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('investment')} className="hover:text-white transition-colors cursor-pointer">
                  6. Investment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rent')} className="hover:text-white transition-colors cursor-pointer">
                  7. Rent
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-assistant')} className="hover:text-white transition-colors cursor-pointer">
                  8. AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  9. Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Focus Corridors */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-blue-400">Target Corridors</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Gurgaon Micro-Markets</li>
              <li>NH-48 Delhi–Jaipur Highway</li>
              <li>Sohna / Western Peripheral</li>
              <li>Delhi–Mumbai Expressway Spine</li>
              <li>Vrindavan Heritage Corridor</li>
              <li>Karnal Smart City Belt</li>
              <li>Dharuhera & Bawal Nodes</li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-blue-400">Contact & Social</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.phone}</span>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.email}</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400 text-xs pt-1">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{settings.office_location}</span>
              </div>

              <div className="pt-3 space-y-1 text-xs">
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-300 hover:text-blue-300"
                >
                  Instagram: @gurgaonluxuryfarms
                </a>
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-300 hover:text-blue-300"
                >
                  Facebook Page
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Real Estate Statutory Disclaimer */}
        <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed mb-8">
          <p className="font-bold text-slate-300 mb-1">Statutory Real Estate Disclaimer:</p>
          <p>
            The information, images, renderings, and specifications displayed on <strong>rd-infra.in</strong> are intended solely for general informational and marketing preview purposes. Nothing contained herein constitutes a binding offer of sale, legal warranty, or financial guarantee of capital appreciation or rental returns. Prospective purchasers are advised to independently verify all project dimensions, zoning regulations, title documentation, and statutory approvals prior to entering into any transaction.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} RD INFRA ({settings.domain}). All rights reserved. “Building Better Tomorrows”.</p>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenXamppGuide}
              className="text-slate-400 hover:text-blue-300 transition-colors underline"
            >
              XAMPP / PHP Architecture
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
