import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Github, 
  Linkedin, 
  MessageSquare, 
  Twitter, 
  Mail,
  Download,
  Sparkles,
  Layers,
  FolderGit2,
  User,
  Send,
  Instagram,
  Facebook
} from 'lucide-react';

interface HeroProps {
  onOpenTerminal?: () => void;
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { personalInfo } = usePortfolio();

  const roles = personalInfo.heroRoles && personalInfo.heroRoles.length > 0 
    ? personalInfo.heroRoles 
    : [
        "Computer System Learner",
        "Hardware & IT Enthusiast",
        "Networking Learner",
        "Web Development Learner",
        "Operating Systems Student"
      ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);

  useEffect(() => {
    const activeRoles = personalInfo.heroRoles && personalInfo.heroRoles.length > 0 
      ? personalInfo.heroRoles 
      : roles;
    const fullText = activeRoles[currentRoleIndex % activeRoles.length] || "Computer System Learner";

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(90);

        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(45);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % activeRoles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed, personalInfo.heroRoles]);

  const hasCV = Boolean(personalInfo.resumeUrl || personalInfo.cvUploaded);

  return (
    <section id="home" className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 flex items-center justify-center relative overflow-hidden bg-[#081b29]">
      {/* Dynamic Background Glows & Floating Mirror Prisms */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#00eeff]/12 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-[#d946ef]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-10 w-[240px] h-[240px] bg-[#10b981]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Geometric Mirror Crystals */}
      <div className="absolute top-20 right-1/4 w-12 h-12 rounded-xl bg-white/5 border border-[#00eeff]/40 backdrop-blur-md rotate-12 animate-mirror-float pointer-events-none shadow-[0_0_20px_rgba(0,238,255,0.2)]" />
      <div className="absolute bottom-28 left-10 w-16 h-16 rounded-2xl bg-white/5 border border-[#d946ef]/40 backdrop-blur-md -rotate-6 animate-mirror-float [animation-delay:3s] pointer-events-none shadow-[0_0_20px_rgba(217,70,239,0.2)]" />
      <div className="absolute top-1/2 left-1/3 w-8 h-8 rounded-lg bg-white/5 border border-[#10b981]/40 backdrop-blur-md rotate-45 animate-mirror-float [animation-delay:1.5s] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Name, Subtitle, Intro, Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
            
            {/* Status Pill with Multi-color Glow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00eeff]/10 border border-[#00eeff]/40 text-[#00eeff] text-xs font-mono tracking-wider uppercase shadow-[0_0_15px_rgba(0,238,255,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-ping" />
              <span>{personalInfo.status || "Actively Learning & Building Skills"}</span>
            </div>

            {/* Prominent Name & Title */}
            <div className="space-y-2">
              <p className="text-zinc-400 text-sm sm:text-base font-medium tracking-wide">
                {personalInfo.heroGreeting || "Hello, It's Me"}
              </p>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
                {personalInfo.name || "MUHIRE JULES"}
              </h1>

              {/* Title & Animated Role */}
              <div className="pt-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex flex-wrap items-center gap-2">
                  <span className="text-zinc-400 text-lg sm:text-xl font-normal">{personalInfo.heroTypingPrefix || "And I'm a"}</span>
                  <span className="text-[#00eeff] font-mono [text-shadow:0_0_15px_rgba(0,238,255,0.8)]">
                    {currentText}
                    <span className="animate-pulse text-white font-normal">|</span>
                  </span>
                </h2>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1 flex items-center gap-2">
                  <span className="text-[#10b981] font-bold">● Active Student</span>
                  <span>•</span>
                  <span>Field: <span className="text-zinc-200">{personalInfo.fieldOfStudy || "Computer Systems"}</span></span>
                  <span>•</span>
                  <span>{personalInfo.location || "Rusizi, Rwanda"}</span>
                </p>
              </div>
            </div>

            {/* Short Introduction */}
            <p className="text-sm sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed">
              {personalInfo.heroIntro || personalInfo.bio || "I am a serious, motivated learner developing practical knowledge and hands-on skills in computer systems, hardware assembly, operating systems, networking, computer maintenance, and web fundamentals."}
            </p>

            {/* Social Media Circular Buttons (WhatsApp, Instagram, Facebook, GitHub, LinkedIn, Email) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* WhatsApp Direct */}
              <a
                href={personalInfo.socials?.whatsapp || `https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn hover:!border-emerald-400 hover:!bg-emerald-500 hover:!text-white"
                title={`WhatsApp: ${personalInfo.socials?.whatsappName || personalInfo.whatsappDisplay || personalInfo.whatsappNumber}`}
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* Instagram */}
              <a
                href={personalInfo.socials?.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn hover:!border-pink-400 hover:!bg-gradient-to-tr hover:!from-amber-500 hover:!via-pink-500 hover:!to-purple-600 hover:!text-white"
                title={`Instagram: ${personalInfo.socials?.instagramName || personalInfo.name}`}
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* Facebook */}
              <a
                href={personalInfo.socials?.facebook || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn hover:!border-blue-400 hover:!bg-[#1877F2] hover:!text-white"
                title={`Facebook: ${personalInfo.socials?.facebookName || personalInfo.name}`}
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="social-icon-btn hover:!border-amber-400 hover:!bg-amber-500 hover:!text-white"
                title="Send Email"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.socials.github || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.socials.linkedin || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn hover:!border-indigo-400 hover:!bg-indigo-600 hover:!text-white"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* Required Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href="#skills"
                className="btn-neon-cyan px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,238,255,0.5)] flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>View My Skills</span>
              </a>

              <a
                href="#projects"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#0b1e30] border border-[#00eeff]/50 text-white hover:bg-[#00eeff]/15 hover:border-[#00eeff] text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
              >
                <FolderGit2 className="w-4 h-4 text-[#00eeff]" />
                <span>View My Projects</span>
              </a>

              <a
                href="#about"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 text-xs sm:text-sm font-medium transition-all flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>About Me</span>
              </a>

              <a
                href="#contact"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-[#00eeff] hover:border-[#00eeff]/50 text-xs sm:text-sm font-medium transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Contact Me</span>
              </a>

              {/* Download CV */}
              {hasCV && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-emerald-500/50 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </button>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Clean Circular Portrait with Glowing Mirror Frame */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
            <div className="relative">
              
              {/* Cyan & Pink Outer Halo Glow */}
              <div className="w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] lg:w-[390px] lg:h-[390px] rounded-full p-1 bg-gradient-to-tr from-[#00eeff] via-[#d946ef] to-[#0077ff] shadow-[0_0_40px_rgba(0,238,255,0.5)] animate-[spin_20s_linear_infinite]">
                <div className="w-full h-full rounded-full bg-[#081b29] p-1.5" />
              </div>

              {/* Centered Profile Picture */}
              <div className="absolute inset-3 sm:inset-4 lg:inset-5 rounded-full overflow-hidden border-2 border-[#00eeff]/80 shadow-[inset_0_0_25px_rgba(0,238,255,0.4)] bg-[#0c2236]">
                <img
                  src={personalInfo.portraitUrl || personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Mirror Learner Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0b1e30]/95 border border-[#00eeff]/70 shadow-[0_0_20px_rgba(0,238,255,0.4)] backdrop-blur-md flex items-center gap-2 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 text-[#00eeff]" />
                <span className="text-xs font-semibold text-white">Computer System Learner</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

