import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  CheckCircle2, 
  MessageSquare, 
  MapPin, 
  GraduationCap, 
  Wrench,
  Download,
  Sparkles
} from 'lucide-react';

export const About: React.FC<{ onOpenResume?: () => void }> = ({ onOpenResume }) => {
  const { personalInfo } = usePortfolio();

  const defaultChecklist = [
    "Computer Hardware Assembly & Component Testing",
    "Operating Systems Setup (Linux & Windows)",
    "Local Network Configuration & Troubleshooting",
    "Computer Maintenance & Diagnostics",
    "Web Development Fundamentals (HTML, CSS, JS, React)",
    "System Administration & CLI Scripting Basics"
  ];

  const activeChecklist = personalInfo.aboutChecklist && personalInfo.aboutChecklist.length > 0 
    ? personalInfo.aboutChecklist 
    : defaultChecklist;

  const hasCV = Boolean(personalInfo.resumeUrl || personalInfo.cvUploaded);

  return (
    <section id="about" className="py-20 sm:py-28 relative bg-[#081b29] overflow-hidden">
      
      {/* Background Ambient Glows & Floating Mirror Prisms */}
      <div className="absolute top-1/2 left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#00eeff]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#d946ef]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Mirror Elements */}
      <div className="absolute top-16 right-12 w-14 h-14 rounded-2xl bg-white/5 border border-[#00eeff]/30 backdrop-blur-md rotate-12 animate-mirror-float pointer-events-none" />
      <div className="absolute bottom-16 left-16 w-10 h-10 rounded-xl bg-white/5 border border-[#10b981]/30 backdrop-blur-md -rotate-12 animate-mirror-float [animation-delay:2.5s] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading: "About Me" */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00eeff]/10 border border-[#00eeff]/40 text-[#00eeff] text-xs font-mono tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(0,238,255,0.2)]">
            <GraduationCap className="w-4 h-4 text-[#00eeff]" />
            <span>Learner Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {personalInfo.aboutHeading ? (
              <span>{personalInfo.aboutHeading}</span>
            ) : (
              <>About <span className="text-[#00eeff] [text-shadow:0_0_20px_#00eeff]">Me</span></>
            )}
          </h2>
          <p className="text-zinc-300 max-w-xl mx-auto text-sm sm:text-base mt-2 font-medium">
            {personalInfo.aboutSubheading || "Dedicated Computer System learner based in Rusizi, Rwanda."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Circular Portrait Frame with Multi-Color Mirror Glow Ring */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <div className="relative">
              {/* Cyan & Magenta Outer Halo Glow */}
              <div className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[370px] lg:h-[370px] rounded-full p-1 bg-gradient-to-tr from-[#00eeff] via-[#d946ef] to-[#0077ff] shadow-[0_0_35px_rgba(0,238,255,0.4)]">
                <div className="w-full h-full rounded-full bg-[#081b29] p-1.5">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#00eeff]/70 bg-[#0c2236] shadow-[inset_0_0_20px_rgba(0,238,255,0.4)]">
                    <img
                      src={personalInfo.aboutImageUrl || personalInfo.portraitUrl || personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-2 right-4 px-3.5 py-1.5 rounded-full bg-[#0c2236]/95 border border-[#10b981]/80 shadow-[0_0_15px_rgba(16,185,129,0.4)] backdrop-blur-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
                <span className="text-[11px] font-mono font-bold text-white">Rwanda 🇷🇼</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Biography & Key Details */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 order-2 lg:order-2 text-left">
            
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                {personalInfo.title || "Computer System Learner"}
              </h3>
              <p className="text-[#00eeff] font-mono text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#00eeff]" />
                <span>{personalInfo.location || "Rusizi, Rwanda"}</span>
              </p>
            </div>

            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
              {personalInfo.bio || "I am MUHIRE JULES, a dedicated Computer System learner based in Rusizi, Rwanda. I am passionate about learning how computer hardware, operating systems, networks, and software operate together. My goal is to build strong, hands-on technical skills in PC assembly, system troubleshooting, networking, and web development through continuous practice."}
            </p>

            {/* Key Learning Areas Checklist */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00eeff] flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-[#00eeff]" />
                <span>What I Am Learning & Practicing</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {activeChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-100 bg-[#0c2236]/80 p-3 rounded-2xl border border-[#00eeff]/20 hover:border-[#00eeff]/60 hover:shadow-[0_0_15px_rgba(0,238,255,0.2)] transition-all">
                    <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Pills in Hard Blue Mirror with High-Contrast Colors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
              {personalInfo.stats.map((s, idx) => (
                <div key={idx} className="bg-[#0c2236]/90 border border-[#00eeff]/30 rounded-2xl p-3.5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#00eeff]/70 transition-all">
                  <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#00eeff] [text-shadow:0_0_12px_rgba(0,238,255,0.6)]">
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-300 font-mono mt-1 font-semibold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#skills"
                className="btn-neon-cyan px-5 sm:px-6 py-2.5 text-xs sm:text-sm uppercase font-bold"
              >
                View My Skills
              </a>

              <a
                href="#projects"
                className="px-4 sm:px-5 py-2.5 rounded-full bg-[#0c2236] border border-[#00eeff]/40 text-white hover:bg-[#00eeff]/20 hover:border-[#00eeff] text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                View Projects
              </a>

              {hasCV && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="px-4 sm:px-5 py-2.5 rounded-full border border-emerald-500/60 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </button>
              )}

              <a
                href={personalInfo.socials?.whatsapp || `https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-900/60 to-emerald-800/60 text-white hover:from-emerald-700 hover:to-emerald-600 border border-emerald-500/50 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-[0_0_12px_rgba(37,211,102,0.3)]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
