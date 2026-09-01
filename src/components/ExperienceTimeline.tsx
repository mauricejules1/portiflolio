import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Cpu, 
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { experiences } = usePortfolio();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredExperiences = experiences.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'academic': return { label: 'Education & Studies', color: 'bg-blue-950/60 text-blue-300 border-blue-800/60' };
      case 'project': return { label: 'Hardware Lab', color: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60' };
      case 'internship': return { label: 'Practical Training', color: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60' };
      case 'leadership': return { label: 'Peer & Community', color: 'bg-purple-950/60 text-purple-300 border-purple-800/60' };
      default: return { label: 'Milestone', color: 'bg-zinc-800 text-zinc-300 border-zinc-700' };
    }
  };

  return (
    <section id="journey" className="py-20 sm:py-28 relative bg-[#081b29]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00eeff]/10 border border-[#00eeff]/30 text-[#00eeff] text-xs font-mono tracking-wider uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Learning Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Learning & <span className="text-[#00eeff] [text-shadow:0_0_15px_#00eeff]">Education Journey</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base mt-2">
            Academic background, lab practice, and structured hands-on milestones in Computer Systems.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'academic', label: 'Education' },
            { id: 'internship', label: 'Practical Training' },
            { id: 'project', label: 'Hardware Labs' },
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterType(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                filterType === f.id
                  ? 'bg-[#00eeff] text-[#081b29] font-bold shadow-md shadow-[#00eeff]/20'
                  : 'bg-[#0b1e30] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-32 space-y-10">
          {filteredExperiences.map((exp) => {
            const badge = getTypeBadge(exp.type);
            return (
              <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#081b29] border-2 border-[#00eeff] group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(0,238,255,0.6)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00eeff] m-auto mt-0.5" />
                </div>

                {/* Left Period Label (on desktop) */}
                <div className="hidden sm:block absolute -left-32 top-1 w-24 text-right">
                  <span className="text-xs font-mono text-[#00eeff] font-bold block">
                    {exp.period}
                  </span>
                </div>

                {/* Main Experience Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#0b1e30]/80 backdrop-blur-md border border-zinc-800/80 hover:border-[#00eeff]/40 transition-all space-y-3 shadow-lg">
                  
                  {/* Mobile period display */}
                  <div className="sm:hidden flex items-center gap-1 text-xs font-mono text-[#00eeff] font-bold mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>

                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00eeff] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-zinc-400 font-medium flex items-center gap-2 mt-0.5">
                        <span className="text-zinc-300 font-semibold">{exp.organization}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-zinc-400">
                          <MapPin className="w-3 h-3 text-[#00eeff]" />
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
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {exp.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00eeff] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies Badges */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800">
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#081b29] text-zinc-300 border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
