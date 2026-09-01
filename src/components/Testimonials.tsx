import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Quote, Star, MessageSquare, Award, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono mb-3">
            <Quote className="w-3.5 h-3.5 text-red-400" />
            <span>PEER & COLLABORATOR FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white">
            Endorsements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-orange-400">Recommendations</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mt-3 text-sm sm:text-base">
            What engineering colleagues, mentors, and project partners say about working with MUHIRE Jules.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-7 rounded-3xl bg-[#0d090d]/80 backdrop-blur-xl border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between space-y-4 relative group shadow-xl"
            >
              {/* Top Quote Icon & Stars */}
              <div className="flex items-center justify-between">
                <Quote className="w-6 h-6 text-red-500/40 group-hover:text-red-400 transition-colors" />
                <div className="flex items-center gap-1 text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold font-mono text-sm shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                  {testimonial.avatarText}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] text-red-400 font-mono">
                    {testimonial.role}
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    {testimonial.organization} • {testimonial.relationship}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
