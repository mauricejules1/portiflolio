import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const SkillsMatrix: React.FC = () => {
  const { personalInfo } = usePortfolio();

  const defaultTechnical = [
    { name: "HTML", level: 90, iconColor: "text-orange-500", iconText: "5" },
    { name: "CSS", level: 80, iconColor: "text-blue-500", iconText: "3" },
    { name: "Javascript / TypeScript", level: 85, iconColor: "text-yellow-400", iconText: "JS" },
    { name: "Python", level: 75, iconColor: "text-sky-400", iconText: "PY" },
    { name: "React", level: 85, iconColor: "text-cyan-400", iconText: "⚛" },
    { name: "C / C++ & Assembly", level: 92, iconColor: "text-indigo-400", iconText: "C" },
    { name: "Computer Architecture & RISC-V", level: 95, iconColor: "text-emerald-400", iconText: "CPU" }
  ];

  const defaultProfessional = [
    { name: "Creativity", percentage: 90 },
    { name: "Communication", percentage: 65 },
    { name: "Problem Solving", percentage: 75 },
    { name: "Teamwork", percentage: 85 }
  ];

  const technicalSkills = personalInfo.technicalSkills && personalInfo.technicalSkills.length > 0 
    ? personalInfo.technicalSkills 
    : defaultTechnical;

  const professionalSkills = personalInfo.professionalSkills && personalInfo.professionalSkills.length > 0 
    ? personalInfo.professionalSkills 
    : defaultProfessional;

  // Helper for SVG circular progress meter calculation
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="py-20 sm:py-32 relative bg-[#081b29] bg-mirror-grid">
      
      {/* Ambient Neon Blue Background Light */}
      <div className="absolute top-1/3 right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#00eeff]/8 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#0077ff]/10 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading: "My Skills" */}
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight">
            My <span className="text-[#00eeff] [text-shadow:0_0_20px_#00eeff]">Skills</span>
          </h2>
        </div>

        {/* 2-Column Split: Technical Skills on Left vs Professional Skills on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Technical Skills with Horizontal Cyan Bars */}
          <div className="mirror-card-hard rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 space-y-6 sm:space-y-7">
            
            {/* Column Title */}
            <div className="border-b-2 border-[#00eeff]/40 pb-3">
              <h3 className="text-xl sm:text-3xl font-heading font-bold text-white tracking-wide">
                Technical Skills
              </h3>
            </div>

            {/* List of Skills */}
            <div className="space-y-5 sm:space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  
                  {/* Skill Label + Percentage */}
                  <div className="flex items-center justify-between text-xs sm:text-base font-semibold">
                    <div className="flex items-center gap-2 sm:gap-2.5 truncate">
                      <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#081b29] border border-[#00eeff]/30 flex items-center justify-center text-[10px] sm:text-xs font-mono font-black shrink-0 ${skill.iconColor || 'text-[#00eeff]'}`}>
                        {skill.iconText || "•"}
                      </span>
                      <span className="text-zinc-100 truncate">{skill.name}</span>
                    </div>
                    <span className="font-mono text-zinc-100 font-bold shrink-0 ml-2">{skill.level}%</span>
                  </div>

                  {/* Horizontal Glowing Cyan Bar */}
                  <div className="h-2.5 sm:h-3.5 w-full bg-[#081b29] rounded-full overflow-hidden border border-[#00eeff]/20 p-[2px]">
                    <div
                      className="h-full rounded-full bg-[#00eeff] shadow-[0_0_12px_#00eeff,0_0_20px_rgba(0,238,255,0.6)] transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Professional Skills with 2x2 Radial Circular Progress Dials */}
          <div className="mirror-card-hard rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 space-y-6 sm:space-y-7">
            
            {/* Column Title */}
            <div className="border-b-2 border-[#00eeff]/40 pb-3">
              <h3 className="text-xl sm:text-3xl font-heading font-bold text-white tracking-wide">
                Professional Skills
              </h3>
            </div>

            {/* 2x2 Grid of Circular Meters */}
            <div className="grid grid-cols-2 gap-6 sm:gap-10 pt-2 sm:pt-4">
              {professionalSkills.map((prof, index) => {
                const strokeDashoffset = circumference - (prof.percentage / 100) * circumference;

                return (
                  <div key={index} className="flex flex-col items-center justify-center text-center space-y-2.5 sm:space-y-3 group">
                    
                    {/* Radial SVG Meter */}
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        {/* Background Track Circle */}
                        <circle
                          cx="60"
                          cy="60"
                          r={radius}
                          stroke="#0e263d"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        {/* Glowing Foreground Cyan Circle */}
                        <circle
                          cx="60"
                          cy="60"
                          r={radius}
                          stroke="#00eeff"
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-1000 ease-out"
                          style={{
                            filter: 'drop-shadow(0 0 6px #00eeff)'
                          }}
                        />
                      </svg>

                      {/* Percentage Number in Center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg sm:text-2xl font-mono font-extrabold text-white">
                          {prof.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Skill Label */}
                    <span className="text-xs sm:text-base font-semibold text-zinc-200 group-hover:text-[#00eeff] transition-colors line-clamp-1">
                      {prof.name}
                    </span>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
