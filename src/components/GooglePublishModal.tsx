import React, { useState } from 'react';
import {
  X,
  Search,
  Globe,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  FileCode,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Monitor,
  KeyRound,
  RefreshCw,
} from 'lucide-react';

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
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [verificationCode, setVerificationCode] = useState(() => {
    return localStorage.getItem('rd_infra_google_verification') || 'e4qefdr33c2pRgmvRPtpjhGoBCjeftWqDMlAkTZAEyM';
  });
  const [savedTokenSuccess, setSavedTokenSuccess] = useState(false);

  if (!isOpen) return null;

  const websiteUrl = `https://${domain}/`;
  const sitemapUrl = `https://${domain}/sitemap.xml`;
  const robotsUrl = `https://${domain}/robots.txt`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleSaveVerificationCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = verificationCode
      .replace(/<meta[^>]*content=["']?/i, '')
      .replace(/["']?[^>]*>/i, '')
      .trim();
    setVerificationCode(cleaned);
    localStorage.setItem('rd_infra_google_verification', cleaned);

    const metaEl = document.getElementById('google-verification-meta');
    if (metaEl) {
      metaEl.setAttribute('content', cleaned);
    }
    setSavedTokenSuccess(true);
    setTimeout(() => setSavedTokenSuccess(false), 3000);
  };

  const metaTagString = `<meta name="google-site-verification" content="${verificationCode}" />`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#0A4D92] via-blue-900 to-slate-900 px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shadow-inner">
              <Search className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  Google Search Console &amp; Brand Indexing
                </h3>
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full">
                  SEO Active
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5">
                Verify {domain} on Google Search Console, manage site brand identity &amp; submit sitemaps
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section 1: Live Google Search Result Preview */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0A4D92]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Google Search Snippet Preview
                </span>
              </div>

              {/* Device Selector */}
              <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
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
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                  <img src="/logo.jpg" alt="RD INFRA" className="w-6 h-6 object-contain" />
                </div>
                <div className="leading-tight overflow-hidden">
                  <div className="text-[14px] font-medium text-[#202124] truncate">
                    RD INFRA
                  </div>
                  <div className="text-[12px] text-[#4d5156] truncate">
                    https://{domain}
                  </div>
                </div>
              </div>

              {/* Title Link */}
              <h4 className="text-[18px] sm:text-[20px] font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug mb-1.5">
                RD INFRA | Properties, Real Estate &amp; Investment
              </h4>

              {/* Snippet Description */}
              <p className="text-xs sm:text-[13px] text-[#4d5156] leading-relaxed mb-3">
                RD INFRA is a North Indian real estate advisory and development firm established in 2014. We specialize in premium farmhouses, strategic land investments, and plotted developments across Gurgaon, NH-48, Sohna, and Vrindavan.
              </p>

              {/* Sitelinks Mini Grid */}
              <div className="pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
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
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#0A4D92]" />
              Google Search Console Checklist
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1: Verify Ownership */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0A4D92] border border-blue-200">
                      Step 1
                    </span>
                    <KeyRound className="w-4 h-4 text-slate-400" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">
                    HTML Meta Tag Verification
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Your Google Search Console verification tag (<code className="bg-slate-100 px-1 rounded">e4qefdr...</code>) and HTML file (<a href="/googlecc57c600f52289c8.html" target="_blank" rel="noopener noreferrer" className="text-[#0A4D92] underline font-mono">googlecc57c600f52289c8.html</a>) are live.
                  </p>
                </div>

                <form onSubmit={handleSaveVerificationCode} className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block text-[11px] font-semibold text-slate-600">
                    Google Verification Token:
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Paste token or meta tag"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-1.5 px-3 bg-[#0A4D92] hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      {savedTokenSuccess ? 'Saved!' : 'Update Token'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(metaTagString, 'meta')}
                      className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                      title="Copy HTML Meta Tag"
                    >
                      {copiedItem === 'meta' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </form>
              </div>

              {/* Step 2: Submit XML Sitemap */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0A4D92] border border-blue-200">
                      Step 2
                    </span>
                    <FileCode className="w-4 h-4 text-slate-400" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">
                    Submit Sitemap URL
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    In Google Search Console, open <strong>Sitemaps</strong> on the left menu and submit your XML sitemap URL.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-700 truncate">
                    {sitemapUrl}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(sitemapUrl, 'sitemap')}
                      className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedItem === 'sitemap' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Sitemap URL</span>
                        </>
                      )}
                    </button>
                    <a
                      href="/sitemap.xml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-blue-50 hover:bg-blue-100 text-[#0A4D92] rounded-lg border border-blue-200 transition-colors"
                      title="Open Live Sitemap"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 3: Request Indexing */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Step 3
                    </span>
                    <RefreshCw className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">
                    URL Inspection &amp; Re-Index
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Paste <code className="bg-slate-100 px-1 rounded text-slate-800 font-semibold">{websiteUrl}</code> into the top bar of Search Console and click <strong>Request Indexing</strong>.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleCopy(websiteUrl, 'siteUrl')}
                    className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedItem === 'siteUrl' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Homepage URL Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy {websiteUrl}</span>
                      </>
                    )}
                  </button>
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Open Search Console</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Pre-Configured SEO & Structured Data Status */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Active Google Brand &amp; Structured Data Configuration
              </h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Website Name:</strong> RD INFRA</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>WebSite Schema:</strong> RD INFRA</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Organization Schema:</strong> RD INFRA</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Favicon &amp; Logo:</strong> /logo.jpg</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>XML Sitemap:</strong> <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-[#0A4D92] underline">/sitemap.xml</a></span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Robots.txt:</strong> <a href={robotsUrl} target="_blank" rel="noopener noreferrer" className="text-[#0A4D92] underline">/robots.txt</a></span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <a
            href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(websiteUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#0A4D92] hover:underline flex items-center gap-1.5"
          >
            <span>Test Rich Results for {domain}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-[#0A4D92] hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <span>Launch Google Search Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
