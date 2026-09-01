import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  CheckCircle2, 
  FileText, 
  MessageSquare, 
  MapPin, 
  GraduationCap, 
  Cpu
} from 'lucide-react';

export const About: React.FC<{ onOpenResume: () => void }> = ({ onOpenResume }) => {
  const { personalInfo } = usePortfolio();

  const defaultChecklist = [
    "CPU & RISC-V Organization",
    "ESP32 & IoT Telemetry Nodes",
    "React, TypeScript & Tailwind CSS",
    "Linux & TCP/IP Networking"
  ];

  const activeChecklist = personalInfo.aboutChecklist && personalInfo.aboutChecklist.length > 0 
    ? personalInfo.aboutChecklist 
    : defaultChecklist;

  return (
    <section id="about" className="py-20 sm:py-32 relative bg-[#081b29] bg-mirror-grid">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#00eeff]/8 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading: "About Me" */}
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight">
            {personalInfo.aboutHeading ? (
              <span>{personalInfo.aboutHeading}</span>
            ) : (
              <>About <span className="text-[#00eeff] [text-shadow:0_0_20px_#00eeff]">Me</span></>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Circular Portrait Frame with Cyan Glow Ring */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <div className="relative">
              {/* Dual Glowing Ring */}
              <div className="w-[230px] h-[230px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full p-[3px] sm:p-[5px] bg-gradient-to-tr from-[#00eeff] via-[#d946ef] to-[#00eeff] shadow-[0_0_30px_#00eeff,0_0_60px_rgba(0,238,255,0.35)]">
                <div className="w-full h-full rounded-full bg-[#081b29] p-1.5 sm:p-2">
                  <div className="w-full h-full rounded-full overflow-hidden border border-[#00eeff]/60 bg-[#0c2236]">
                    <img
                      src={personalInfo.aboutImageUrl || personalInfo.portraitUrl || personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Biography & Key Details */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 order-2 lg:order-2">
            
            <div className="space-y-2">
              <h3 className="text-xl sm:text-3xl font-heading font-bold text-white">
                {personalInfo.title}
              </h3>
              <p className="text-[#00eeff] font-mono text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#00eeff]" />
                <span>{personalInfo.location}</span>
              </p>
            </div>

            <p className="text-zinc-300 text-xs sm:text-base leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* Key Strengths Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              {activeChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00eeff] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Stats Pills in Hard Blue Mirror */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
              {personalInfo.stats.map((s, idx) => (
                <div key={idx} className="mirror-card-hard rounded-2xl p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-mono font-extrabold text-[#00eeff] [text-shadow:0_0_10px_rgba(0,238,255,0.5)]">
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#services"
                className="btn-neon-cyan px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm uppercase font-bold"
              >
                Explore Services
              </a>

              <button
                onClick={onOpenResume}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-[#00eeff]/50 text-[#00eeff] hover:bg-[#00eeff]/10 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(0,238,255,0.2)]"
              >
                <FileText className="w-4 h-4" />
                <span>Curriculum Vitae</span>
              </button>

              <a
                href={`https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)},%20let%27s%20connect!`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#0e263d] text-zinc-200 hover:text-white border border-[#00eeff]/20 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#00eeff]" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
