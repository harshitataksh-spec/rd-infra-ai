import React from 'react';
import {
  Compass,
  Cpu,
  Handshake,
  TrendingUp,
  FileCheck2,
  Headphones,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { RDInfraLogo } from './RDInfraLogo';

interface WhyChooseUsProps {
  onOpenBrandModal?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenBrandModal }) => {
  const benefits = [
    {
      icon: Compass,
      title: 'Simplified Property Discovery',
      subtitle: 'Effortless Browsing & Matching',
      description:
        'Navigate through hand-picked luxury apartments, gated farmhouses, and prime commercial assets with intuitive filters and clear specs.',
    },
    {
      icon: Cpu,
      title: 'Technology-Enabled Property Search',
      subtitle: 'AI-Guided Recommendations',
      description:
        'Leverage our proprietary AI Property Assistant to analyze micro-market corridors, project appreciation metrics, and find exact budget fits.',
    },
    {
      icon: Handshake,
      title: 'Buyer & Seller Support',
      subtitle: 'End-to-End Asset Handling',
      description:
        'Full spectrum advisory for investors buying high-yield corridors and property owners seeking qualified, high-intent purchasers.',
    },
    {
      icon: TrendingUp,
      title: 'Investment-Focused Tools',
      subtitle: 'Real Financial Projections',
      description:
        'Interactive financial calculators modeling loan EMIs, net rental yields, and 10-year capital appreciation curves with realistic Indian market assumptions.',
    },
    {
      icon: FileCheck2,
      title: 'Transparent Property Information',
      subtitle: '100% Legal & Revenue Clarity',
      description:
        'Uncompromising diligence on Jamabandi, Nakal, mutation status, and encumbrance checks. We ensure you buy only clear-title freehold assets.',
    },
    {
      icon: Headphones,
      title: 'Responsive Customer Support',
      subtitle: 'Direct Executive Assistance',
      description:
        'Direct connection to senior advisory desks with prompt WhatsApp replies, on-ground private site tours, and smooth registration assistance.',
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The RD INFRA Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Why Choose RD INFRA
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Combining 12+ years of real-estate expertise with modern technology to deliver trust, transparency, and sustainable growth.
          </p>
        </div>

        {/* 6 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-7 bg-white rounded-2xl border border-slate-200 hover:border-[#0A4D92] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-[#0A4D92] group-hover:bg-[#0A4D92] group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-5 border border-blue-100 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#0A4D92] transition-colors font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Brand Identity & Canva Logo Presentation Card */}
        <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Brand Story & Specifications */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Corporate Brand Identity</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
                  Official RD INFRA Logo Design
                </h3>
                <p className="text-sm font-semibold text-[#0A4D92] uppercase tracking-wider mt-1">
                  Building Better Tomorrows
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                The RD INFRA trademark embodies structural integrity, institutional stability, and modern skyline architecture. The interlocking 3D metallic blue and silver facets form our signature hexagonal crest framing high-rise silhouettes.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <p className="text-xs font-bold text-slate-900">Original Canva Design</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">High-definition vector asset</p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <p className="text-xs font-bold text-slate-900">Official Tagline</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Building Better Tomorrows</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://canva.link/ko5bhxv1zaasyoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span>Open RD Infra logo PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://canva.link/ko5bhxv1zaasyoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Open in Canva</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onOpenBrandModal && (
                  <button
                    type="button"
                    onClick={onOpenBrandModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0A4D92] border border-blue-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>Enlarge Viewer</span>
                  </button>
                )}
              </div>

              <p className="text-[11px] text-slate-400">
                Design document by <span className="text-slate-600 font-semibold">Harshita Taksh</span>
              </p>
            </div>

            {/* Right Column: Exact Canva PDF Embed */}
            <div className="lg:col-span-6">
              <div className="max-w-md mx-auto">
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 0,
                    paddingTop: '141.4286%',
                    paddingBottom: 0,
                    boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                    marginTop: '1.6em',
                    marginBottom: '0.9em',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    willChange: 'transform',
                  }}
                >
                  <iframe
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      border: 'none',
                      padding: 0,
                      margin: 0,
                    }}
                    src="https://www.canva.com/design/DAHVdpgZwQc/QpIOfpqwS-WrxfoHeqWMgg/view?embed"
                    allowFullScreen
                    allow="fullscreen"
                    title="RD Infra logo PDF by Harshita Taksh"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <a
                    href="https://canva.link/ko5bhxv1zaasyoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A4D92] hover:text-blue-800 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    RD Infra logo PDF
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>by Harshita Taksh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
