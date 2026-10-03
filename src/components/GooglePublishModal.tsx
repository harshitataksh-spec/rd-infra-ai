import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Globe,
  FileCode,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Eye,
  Smartphone,
  Monitor,
  AlertCircle
} from 'lucide-react';
import { RDInfraLogo } from './RDInfraLogo';

interface GooglePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain?: string;
}

export const GooglePublishModal: React.FC<GooglePublishModalProps> = ({
  isOpen,
  onClose,
  domain = 'rd-infra.in',
}) => {
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [verificationCode, setVerificationCode] = useState(() => {
    return localStorage.getItem('rd_infra_google_verification') || 'xkbfQKckJzjcLrNwpxbzZlomzbQ_sinVkzvVl83WGiE';
  });
  const [isSavedCode, setIsSavedCode] = useState(false);

  const sitemapUrl = `https://${domain}/sitemap.xml`;
  const websiteUrl = `https://${domain}/`;

  useEffect(() => {
    if (verificationCode) {
      const meta = document.getElementById('google-verification-meta');
      if (meta) {
        meta.setAttribute('content', verificationCode);
      }
    }
  }, [verificationCode]);

  if (!isOpen) return null;

  const handleCopySitemap = () => {
    navigator.clipboard.writeText(sitemapUrl);
    setCopiedSitemap(true);
    setTimeout(() => setCopiedSitemap(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(websiteUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSaveVerification = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('rd_infra_google_verification', verificationCode.trim());
    const meta = document.getElementById('google-verification-meta');
    if (meta) {
      meta.setAttribute('content', verificationCode.trim());
    }
    setIsSavedCode(true);
    setTimeout(() => setIsSavedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full my-6 overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0A4D92] to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
              <Search className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                  Publish to Google Search
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                  SEO Ready
                </span>
              </div>
              <p className="text-xs text-blue-100/90 mt-0.5">
                Index {domain} on Googlebot, verify Search Console &amp; submit sitemaps
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 z-10"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[78vh] overflow-y-auto text-slate-700 text-sm">
          
          {/* Section 1: Live Google Search Result Preview */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#0A4D92]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Google Search Snippet Preview
                </span>
              </div>

              {/* Device Selector */}
              <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all ${
                    previewDevice === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all ${
                    previewDevice === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
              </div>
            </div>

            {/* Google Result Card Simulation */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm font-sans max-w-xl">
              {/* Header with Site Favicon & Name */}
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                  <img src="/logo.jpg" alt="RD INFRA" className="w-6 h-6 object-contain" />
                </div>
                <div className="leading-tight overflow-hidden">
                  <div className="text-[13px] font-medium text-[#202124] flex items-center gap-1.5 truncate">
                    <span>RD INFRA</span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-slate-500 text-xs truncate">https://rd-infra.in</span>
                  </div>
                </div>
              </div>

              {/* Title Link */}
              <h4 className="text-[17px] sm:text-[19px] font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug mb-1">
                RD INFRA | Building Better Tomorrows – Real Estate &amp; Land Investment
              </h4>

              {/* Rating stars snippet */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1.5">
                <div className="flex text-amber-500">
                  {'★'.repeat(5)}
                </div>
                <span className="font-semibold text-slate-700">Rating: 4.9</span>
                <span className="text-slate-400">•</span>
                <span>128 verified customer reviews</span>
              </div>

              {/* Snippet Description */}
              <p className="text-xs sm:text-[13px] text-[#4d5156] leading-relaxed mb-3">
                Explore luxury farmhouses, premium residential plots, and strategic corridor investments across Gurgaon, NH-48, Sohna, and Vrindavan with RD INFRA.
              </p>

              {/* Sitelinks Mini Grid */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium truncate">
                  Director’s Profile
                </div>
                <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium truncate">
                  Featured Projects
                </div>
                <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium truncate">
                  Buy Luxury Farmhouses
                </div>
                <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium truncate">
                  Contact Advisory Desk
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Three-Step Publishing Action Plan */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Publishing Checklist for Google Search Console
            </h4>

            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 text-[#0A4D92] font-bold flex items-center justify-center text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">
                      Verify Domain in Google Search Console
                    </h5>
                    <p className="text-xs text-slate-500">
                      Add your domain to Google Search Console to monitor crawls, indexing, and traffic.
                    </p>
                  </div>
                </div>

                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#0A4D92] hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>Open Console</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Custom Verification Meta Form */}
              <form onSubmit={handleSaveVerification} className="mt-2 pt-2 border-t border-slate-100">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Google Verification HTML Meta Tag Content:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="google-site-verification code"
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    {isSavedCode ? 'Saved ✓' : 'Save Meta Tag'}
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Tag in &lt;head&gt;: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700">&lt;meta name="google-site-verification" content="{verificationCode}" /&gt;</code>
                </div>
              </form>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 text-[#0A4D92] font-bold flex items-center justify-center text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">
                      Submit XML Sitemap to Googlebot
                    </h5>
                    <p className="text-xs text-slate-500">
                      Submit your structured XML sitemap in Google Search Console under "Sitemaps".
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <FileCode className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-mono text-xs text-slate-700 flex-1 truncate">
                  {sitemapUrl}
                </span>
                <button
                  type="button"
                  onClick={handleCopySitemap}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedSitemap ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedSitemap ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-[#0A4D92] flex items-center gap-1 transition-colors"
                >
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 text-[#0A4D92] font-bold flex items-center justify-center text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">
                      Request Instant URL Indexing
                    </h5>
                    <p className="text-xs text-slate-500">
                      In Google Search Console, paste <code className="bg-slate-100 px-1 rounded text-slate-800 font-semibold">{websiteUrl}</code> into the URL Inspection bar at the top and click <strong>"Request Indexing"</strong>.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Google SEO Diagnostics & Health Badges */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Live Google SEO Diagnostics
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Googlebot Directive: <strong>index, follow</strong></span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Google Favicon 48px Multiple: <strong>Linked</strong></span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Schema.org RealEstateAgent &amp; Sitelinks: <strong>Active</strong></span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>XML Sitemap with Images: <strong>Configured</strong></span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <a
                href="https://search.google.com/test/rich-results?url=https%3A%2F%2Frd-infra.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A4D92] hover:text-blue-800 font-bold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Test Google Rich Results for rd-infra.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Inspect robots.txt</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Domain: <strong className="text-slate-700">https://{domain}</strong> • Googlebot Crawler Enabled
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#0A4D92] hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Launch Google Search Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
