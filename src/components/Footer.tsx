import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowUp, 
  MessageSquare, 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Award, 
  Layers, 
  FileText, 
  Home, 
  User, 
  FolderGit2, 
  Lock, 
  RotateCcw,
  Instagram,
  Facebook,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const { personalInfo, setIsAdminModalOpen, replayIntro, isAdminAuthenticated } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logoImgSrc = personalInfo.customLogoUrl || personalInfo.logoUrl;
  const showLogoImg = (personalInfo.logoType === 'image' || personalInfo.logoType === 'both' || personalInfo.useImageLogo) && Boolean(logoImgSrc);

  const whatsappLink = personalInfo.socials?.whatsapp || `https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)}`;
  const instagramLink = personalInfo.socials?.instagram || "https://instagram.com";
  const facebookLink = personalInfo.socials?.facebook || "https://facebook.com";
  const githubLink = personalInfo.socials?.github || "https://github.com";
  const linkedinLink = personalInfo.socials?.linkedin || "https://linkedin.com";

  const whatsappName = personalInfo.socials?.whatsappName || personalInfo.whatsappDisplay || personalInfo.whatsappNumber || "+250 794 410 997";
  const instagramName = personalInfo.socials?.instagramName || "@muhire_jules";
  const facebookName = personalInfo.socials?.facebookName || personalInfo.name || "MUHIRE JULES";
  const githubName = personalInfo.socials?.githubName || "muhirejules";
  const linkedinName = personalInfo.socials?.linkedinName || personalInfo.name || "MUHIRE JULES";

  return (
    <footer className="bg-[#05111a] border-t-2 border-[#00eeff]/20 pt-16 pb-12 relative overflow-hidden text-zinc-400">
      
      {/* Background Glows & Floating Mirror Atmospheres */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00eeff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#d946ef]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-mirror-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Prominent Social Channels & Assigned Handles Display */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#0c2236]/90 backdrop-blur-2xl border border-[#00eeff]/30 shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00eeff] to-transparent shadow-[0_0_15px_#00eeff]" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#00eeff] uppercase">
                <Sparkles className="w-4 h-4 text-[#00eeff]" />
                <span>Official Channels & Connect Handles</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-white mt-1">
                Direct Channels & Social Profiles
              </h3>
            </div>
            <p className="text-xs text-zinc-300 max-w-md">
              Reach out directly on any channel. Assigned names and handles are configured and verified for real-time contact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* 1. WhatsApp Channel Card */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#081b29]/90 border border-emerald-500/40 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-[0_0_12px_rgba(37,211,102,0.6)] group-hover:scale-105 transition-transform flex-shrink-0">
                <MessageSquare className="w-5 h-5 fill-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">WhatsApp</div>
                <div className="text-sm font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">
                  {whatsappName}
                </div>
              </div>
            </a>

            {/* 2. Instagram Channel Card */}
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#081b29]/90 border border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(225,48,108,0.4)] transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-[0_0_12px_rgba(225,48,108,0.6)] group-hover:scale-105 transition-transform flex-shrink-0">
                <Instagram className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono text-pink-400 font-bold uppercase tracking-wider">Instagram</div>
                <div className="text-sm font-semibold text-white truncate group-hover:text-pink-300 transition-colors">
                  {instagramName}
                </div>
              </div>
            </a>

            {/* 3. Facebook Channel Card */}
            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#081b29]/90 border border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#1877F2] to-[#3b82f6] text-white flex items-center justify-center shadow-[0_0_12px_rgba(24,119,242,0.6)] group-hover:scale-105 transition-transform flex-shrink-0">
                <Facebook className="w-5 h-5 fill-white stroke-none" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider">Facebook</div>
                <div className="text-sm font-semibold text-white truncate group-hover:text-sky-300 transition-colors">
                  {facebookName}
                </div>
              </div>
            </a>

            {/* 4. GitHub Channel Card */}
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#081b29]/90 border border-[#00eeff]/30 hover:border-[#00eeff] hover:shadow-[0_0_20px_rgba(0,238,255,0.4)] transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-[#112e42] border border-[#00eeff]/50 text-[#00eeff] flex items-center justify-center shadow-[0_0_12px_rgba(0,238,255,0.4)] group-hover:scale-105 transition-transform flex-shrink-0">
                <Github className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono text-[#00eeff] font-bold uppercase tracking-wider">GitHub</div>
                <div className="text-sm font-semibold text-white truncate group-hover:text-[#00eeff] transition-colors">
                  {githubName}
                </div>
              </div>
            </a>

            {/* 5. LinkedIn Channel Card */}
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#081b29]/90 border border-indigo-500/30 hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#0077B5] to-[#0A66C2] text-white flex items-center justify-center shadow-[0_0_12px_rgba(10,102,194,0.6)] group-hover:scale-105 transition-transform flex-shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono text-indigo-400 font-bold uppercase tracking-wider">LinkedIn</div>
                <div className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                  {linkedinName}
                </div>
              </div>
            </a>

            {/* 6. Email Channel Card */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#081b29]/90 border border-amber-500/30 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.6)] group-hover:scale-105 transition-transform flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">Email Address</div>
                <div className="text-sm font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                  {personalInfo.email}
                </div>
              </div>
            </a>

          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <a href="#home" className="flex items-center gap-2 select-none">
                {showLogoImg && (
                  <img 
                    src={logoImgSrc} 
                    alt={personalInfo.name} 
                    referrerPolicy="no-referrer"
                    className="h-9 w-auto object-contain rounded-lg border border-[#00eeff]/40 shadow-[0_0_12px_rgba(0,238,255,0.4)]"
                  />
                )}
                <span className="text-xl sm:text-2xl font-heading font-black text-white tracking-wide flex items-baseline">
                  <span>{personalInfo.name || "MUHIRE JULES"}</span>
                  <span className="text-[#00eeff] text-2xl font-black">.</span>
                </span>
              </a>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-sm">
              Computer System Learner developing practical technical skills in PC hardware, operating systems, networking, diagnostics, and web development.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-[#081b29] px-3 py-1.5 rounded-lg border border-zinc-800 w-fit">
              <MapPin className="w-3.5 h-3.5 text-[#00eeff]" />
              <span>{personalInfo.location || "Rusizi, Rwanda"}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-mono uppercase tracking-wider text-[#00eeff] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <a href="#home" className="hover:text-[#00eeff] transition-colors flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[#00eeff]/60" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#00eeff] transition-colors flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00eeff]/60" />
                  <span>About Me</span>
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#00eeff] transition-colors flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#00eeff]/60" />
                  <span>Skills Matrix</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#00eeff] transition-colors flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#00eeff]/60" />
                  <span>Projects & Certifications</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#00eeff] transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#00eeff]/60" />
                  <span>Contact Me</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Tools & Admin */}
          <div className="space-y-3 text-xs">
            <h4 className="font-mono uppercase tracking-wider text-[#00eeff] font-bold">
              Quick Actions
            </h4>
            
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] border border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer font-mono text-xs"
              >
                <Lock className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>{isAdminAuthenticated ? 'Admin Panel (Active)' : 'Portfolio Admin'}</span>
              </button>

              <button
                type="button"
                onClick={replayIntro}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] border border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer font-mono text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>Replay Intro Logo</span>
              </button>

              {(personalInfo.resumeUrl || personalInfo.cvUploaded) && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] border border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer font-mono text-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#00eeff]" />
                  <span>Curriculum Vitae</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>© {new Date().getFullYear()} {personalInfo.name || "MUHIRE JULES"}. All rights reserved.</span>
            <span>•</span>
            <span className="text-[#00eeff] font-semibold">Computer System Learner</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] text-zinc-200 hover:text-[#00eeff] border border-zinc-800 cursor-pointer transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
