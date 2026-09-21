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
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
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
      </div>
    </section>
  );
};
