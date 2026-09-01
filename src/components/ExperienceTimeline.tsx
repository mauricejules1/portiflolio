import React, { useState } from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Award, 
  Cpu, 
  Flame,
  Layers,
  Sparkles
} from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredExperiences = EXPERIENCES.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'academic': return { label: 'Academic & CSA Core', color: 'bg-red-950/60 text-red-300 border-red-800/60' };
      case 'project': return { label: 'Hardware & IoT Lab', color: 'bg-orange-950/60 text-orange-300 border-orange-800/60' };
      case 'internship': return { label: 'Engineering Practice', color: 'bg-rose-950/60 text-rose-300 border-rose-800/60' };
      case 'leadership': return { label: 'Community & Mentorship', color: 'bg-amber-950/60 text-amber-300 border-amber-800/60' };
      default: return { label: 'Milestone', color: 'bg-zinc-800 text-zinc-300 border-zinc-700' };
    }
  };

  return (
    <section id="timeline" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-red-400" />
            <span>ACADEMIC & LAB ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-orange-400">Engineering Journey</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mt-3 text-sm sm:text-base">
            Track record in Computer Systems & Architecture, digital circuit simulations, IoT prototypes in Rusizi, and software leadership.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'academic', label: 'CSA Academic Focus' },
            { id: 'project', label: 'IoT & Systems Lab' },
            { id: 'internship', label: 'Software Engineering' },
            { id: 'leadership', label: 'Mentorship' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
                filterType === f.id
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-red-950/80 ml-4 sm:ml-32 space-y-10">
          {filteredExperiences.map((exp) => {
            const badge = getTypeBadge(exp.type);
            return (
              <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-zinc-950 border-2 border-red-500 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(239,68,68,0.6)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 m-auto mt-0.5" />
                </div>

                {/* Left Period Label (on desktop) */}
                <div className="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
                  <span className="text-xs font-mono text-orange-400 font-bold block">
                    {exp.period}
                  </span>
                </div>

                {/* Main Experience Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0d090d]/80 backdrop-blur-xl border border-white/10 hover:border-red-500/40 transition-all space-y-3 shadow-xl">
                  
                  {/* Mobile period display */}
                  <div className="sm:hidden flex items-center gap-1 text-xs font-mono text-orange-400 font-bold mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>

                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-heading font-bold text-white group-hover:text-red-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-zinc-400 font-medium flex items-center gap-2 mt-0.5">
                        <span className="text-zinc-300 font-semibold">{exp.organization}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-zinc-400">
                          <MapPin className="w-3 h-3 text-red-400" />
                          {exp.location}
                        </span>
                      </p>
                    </div>

                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {exp.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-zinc-950 text-zinc-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
