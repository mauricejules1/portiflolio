import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Cpu, 
  Network, 
  Code2, 
  Wrench, 
  CheckCircle,
  Layers,
  Sparkles
} from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const { personalInfo, skillCategories } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | string>('all');

  const defaultTechnical = [
    { name: "Computer Hardware & Assembly", level: 88, iconColor: "text-emerald-400", iconText: "HW" },
    { name: "Operating Systems (Linux & Windows)", level: 84, iconColor: "text-sky-400", iconText: "OS" },
    { name: "Computer Maintenance & Diagnostics", level: 86, iconColor: "text-cyan-400", iconText: "IT" },
    { name: "Networking & IP Configuration", level: 80, iconColor: "text-indigo-400", iconText: "NET" },
    { name: "Web Development (HTML, CSS, JS)", level: 82, iconColor: "text-yellow-400", iconText: "WEB" },
    { name: "Programming Basics (Python & C)", level: 78, iconColor: "text-orange-400", iconText: "CODE" },
    { name: "Database Fundamentals (SQL)", level: 75, iconColor: "text-purple-400", iconText: "DB" }
  ];

  const defaultProfessional = [
    { name: "Problem Solving & Troubleshooting", percentage: 88 },
    { name: "Fast Learner & Self-Motivated", percentage: 92 },
    { name: "Attention to Detail", percentage: 85 },
    { name: "Teamwork & Communication", percentage: 82 }
  ];

  const technicalSkills = personalInfo.technicalSkills && personalInfo.technicalSkills.length > 0 
    ? personalInfo.technicalSkills 
    : defaultTechnical;

  const professionalSkills = personalInfo.professionalSkills && personalInfo.professionalSkills.length > 0 
    ? personalInfo.professionalSkills 
    : defaultProfessional;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'cpu':
        return <Cpu className="w-5 h-5 text-[#00eeff]" />;
      case 'network':
        return <Network className="w-5 h-5 text-[#00eeff]" />;
      case 'code2':
      case 'code':
        return <Code2 className="w-5 h-5 text-[#00eeff]" />;
      case 'wrench':
      default:
        return <Wrench className="w-5 h-5 text-[#00eeff]" />;
    }
  };

  // Helper for SVG circular progress meter calculation
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  const filteredCategories = activeTab === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-20 sm:py-28 relative bg-[#081b29]">
      
      {/* Ambient Neon Blue Background Light */}
      <div className="absolute top-1/3 right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#00eeff]/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#0077ff]/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading: "My Skills" */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00eeff]/10 border border-[#00eeff]/30 text-[#00eeff] text-xs font-mono tracking-wider uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Practical Knowledge & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            My <span className="text-[#00eeff] [text-shadow:0_0_15px_#00eeff]">Skills</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base mt-2">
            Structured skill categories representing my practical learning in Computer Systems.
          </p>
        </div>

        {/* 2-Column Split: Technical Skills Progress Bars vs Professional Skills Radial Meters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
          
          {/* LEFT COLUMN: Technical Skills with Horizontal Cyan Bars */}
          <div className="bg-[#0b1e30]/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-[#00eeff]/30 pb-3 flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Technical Knowledge
              </h3>
              <span className="text-xs font-mono text-[#00eeff]">Practical Progress</span>
            </div>

            {/* List of Skills */}
            <div className="space-y-4">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="space-y-1.5">
                  
                  {/* Skill Label + Percentage */}
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <div className="flex items-center gap-2 truncate">
                      <span className={`w-6 h-6 rounded-md bg-[#081b29] border border-[#00eeff]/30 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${skill.iconColor || 'text-[#00eeff]'}`}>
                        {skill.iconText || "•"}
                      </span>
                      <span className="text-zinc-100 truncate">{skill.name}</span>
                    </div>
                    <span className="font-mono text-zinc-300 font-semibold shrink-0 ml-2">{skill.level}%</span>
                  </div>

                  {/* Horizontal Glowing Cyan Bar */}
                  <div className="h-2.5 w-full bg-[#081b29] rounded-full overflow-hidden border border-zinc-800 p-[1px]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-[#00eeff] shadow-[0_0_10px_rgba(0,238,255,0.5)] transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Professional Attributes with 2x2 Radial Circular Progress Dials */}
          <div className="bg-[#0b1e30]/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-[#00eeff]/30 pb-3 flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Learning & Work Habits
              </h3>
              <span className="text-xs font-mono text-[#00eeff]">Core Attributes</span>
            </div>

            {/* 2x2 Grid of Circular Meters */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
              {professionalSkills.map((prof, index) => {
                const strokeDashoffset = circumference - (prof.percentage / 100) * circumference;

                return (
                  <div key={index} className="flex flex-col items-center justify-center text-center p-3 rounded-xl bg-[#081b29]/60 border border-zinc-800/60 group">
                    
                    {/* Radial SVG Meter */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        {/* Background Track Circle */}
                        <circle
                          cx="60"
                          cy="60"
                          r={radius}
                          stroke="#0e263d"
                          strokeWidth="7"
                          fill="transparent"
                        />
                        {/* Glowing Foreground Cyan Circle */}
                        <circle
                          cx="60"
                          cy="60"
                          r={radius}
                          stroke="#00eeff"
                          strokeWidth="7"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-1000 ease-out"
                          style={{
                            filter: 'drop-shadow(0 0 5px rgba(0,238,255,0.7))'
                          }}
                        />
                      </svg>

                      {/* Percentage Number in Center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-base sm:text-lg font-mono font-bold text-white">
                          {prof.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Skill Label */}
                    <span className="text-xs font-medium text-zinc-200 group-hover:text-[#00eeff] transition-colors mt-2 line-clamp-2">
                      {prof.name}
                    </span>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* ORGANIZED CATEGORIES (Computer Systems, Networking, Development, Tools & Technology) */}
        <div className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00eeff]" />
                <span>Skill Categories</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">Detailed breakdown across key Computer System disciplines</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'all' ? 'bg-[#00eeff] text-[#081b29] font-bold shadow-md shadow-[#00eeff]/20' : 'bg-zinc-800/80 text-zinc-300 hover:text-white'}`}
              >
                All Categories
              </button>
              {skillCategories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === cat.id ? 'bg-[#00eeff] text-[#081b29] font-bold shadow-md shadow-[#00eeff]/20' : 'bg-zinc-800/80 text-zinc-300 hover:text-white'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCategories.map((category) => (
              <div 
                key={category.id} 
                className="bg-[#0b1e30]/70 border border-zinc-800/80 hover:border-[#00eeff]/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-[#081b29] border border-[#00eeff]/30 shadow-inner">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{category.name}</h4>
                      <p className="text-xs text-zinc-400">{category.description}</p>
                    </div>
                  </div>

                  {/* Skills List in Category */}
                  <div className="space-y-3 mt-4">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="bg-[#081b29]/70 rounded-xl p-3 border border-zinc-800/60">
                        <div className="flex items-center justify-between text-xs font-semibold mb-1">
                          <span className="text-white flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-[#00eeff]" />
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-[#00eeff]">
                            {skill.tag || "Learner"}
                          </span>
                        </div>
                        {skill.description && (
                          <p className="text-[11px] text-zinc-400 leading-relaxed mt-1">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
