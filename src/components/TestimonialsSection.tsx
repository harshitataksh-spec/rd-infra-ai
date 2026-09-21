import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const publishedTestimonials = testimonials.filter((t) => t.status === 'published');

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Customer Testimonials
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Hear from investors, homeowners, and land purchasers who have built their real estate portfolios with RD INFRA.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {publishedTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Quotation Icon & Star Rating */}
                <div className="flex justify-between items-center mb-6">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0A4D92] flex items-center justify-center border border-blue-100">
                    <Quote className="w-5 h-5 fill-[#0A4D92]" />
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  “{item.testimonial}”
                </p>
              </div>

              {/* Customer Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-[#0A4D92] font-black text-xs">
                  {item.customer_name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm tracking-wide">
                    {item.customer_name}
                  </h4>
                  {item.location_tag && (
                    <p className="text-xs text-slate-500 font-medium">
                      {item.location_tag}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
