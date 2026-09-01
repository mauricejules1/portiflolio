import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowUp, 
  MessageSquare, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  MapPin, 
  Cpu, 
  FileText, 
  Home, 
  User, 
  FolderGit2, 
  Lock, 
  RotateCcw,
  Briefcase
} from 'lucide-react';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenResume }) => {
  const { personalInfo, setIsAdminModalOpen, replayIntro, isAdminAuthenticated } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05111a] border-t border-[#00eeff]/20 pt-16 pb-12 relative overflow-hidden text-zinc-400">
      
      {/* Background Glows */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00eeff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#00eeff]/15">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <a href="#home" className="flex items-center gap-2 select-none">
                {personalInfo.useImageLogo && personalInfo.logoUrl ? (
                  <img 
                    src={personalInfo.logoUrl} 
                    alt={personalInfo.name} 
                    referrerPolicy="no-referrer"
                    className="h-8 w-auto object-contain rounded-md border border-[#00eeff]/30"
                  />
                ) : (
                  <span className="text-2xl font-heading font-black text-white tracking-wide flex items-baseline">
                    <span>{personalInfo.logoText || "Portfolio"}</span>
                    <span className="text-[#00eeff] text-3xl leading-none [text-shadow:0_0_10px_#00eeff]">.</span>
                  </span>
                )}
              </a>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-sm">
              Engineering high-performance computing systems, embedded IoT hardware, and modern full-stack web platforms from {personalInfo.location}.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-[#00eeff]" />
              <span>{personalInfo.location} 🇷🇼</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-mono uppercase tracking-widest text-[#00eeff] font-bold">
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
                  <span>About</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00eeff] transition-colors flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#00eeff]/60" />
                  <span>Services</span>
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#00eeff] transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#00eeff]/60" />
                  <span>My Skills</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#00eeff] transition-colors flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#00eeff]/60" />
                  <span>Project</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#00eeff] transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#00eeff]/60" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Actions & Admin */}
          <div className="space-y-3 text-xs">
            <h4 className="font-mono uppercase tracking-widest text-[#00eeff] font-bold">
              Utilities
            </h4>
            
            <div className="space-y-2">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] border border-[#00eeff]/20 text-zinc-300 hover:text-white transition-all cursor-pointer font-mono text-[11px]"
              >
                <Lock className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>{isAdminAuthenticated ? 'Admin Panel (Active)' : 'Portfolio Admin'}</span>
              </button>

              <button
                onClick={replayIntro}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] border border-[#00eeff]/20 text-zinc-300 hover:text-white transition-all cursor-pointer font-mono text-[11px]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>Replay Intro Animation</span>
              </button>

              <button
                onClick={onOpenResume}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] border border-[#00eeff]/20 text-zinc-300 hover:text-white transition-all cursor-pointer font-mono text-[11px]"
              >
                <FileText className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>Curriculum Vitae</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
            <span>•</span>
            <span className="text-[#00eeff]">Crafted in Rwanda 🇷🇼</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] text-zinc-200 hover:text-[#00eeff] border border-[#00eeff]/30 cursor-pointer transition-colors shadow-[0_0_10px_rgba(0,238,255,0.2)]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
