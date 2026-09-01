import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Menu, 
  X,
  Lock,
  FileText,
  Terminal,
  Award
} from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenResume }) => {
  const { personalInfo, setIsAdminModalOpen, isAdminAuthenticated } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const logoImgSrc = personalInfo.customLogoUrl || personalInfo.logoUrl;
  const showLogoImg = (personalInfo.logoType === 'image' || personalInfo.logoType === 'both' || personalInfo.useImageLogo) && Boolean(logoImgSrc);
  const showLogoText = personalInfo.logoType !== 'image';

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#081b29]/90 backdrop-blur-xl border-b border-zinc-800/80 shadow-lg py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO: Image Logo, Text Logo, or Combined */}
          <a 
            href="#home" 
            className="flex items-center gap-2.5 group select-none"
          >
            {showLogoImg && (
              <img 
                src={logoImgSrc} 
                alt={personalInfo.name} 
                referrerPolicy="no-referrer"
                className="h-8 sm:h-9 w-auto max-w-[140px] object-contain rounded-lg border border-[#00eeff]/40 shadow-[0_0_10px_rgba(0,238,255,0.3)]"
              />
            )}

            {showLogoText && (
              <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wide flex items-baseline">
                <span>{personalInfo.logoText || "MUHIRE"}</span>
                <span className="text-[#00eeff] text-2xl sm:text-3xl leading-none transition-all group-hover:scale-125 [text-shadow:0_0_12px_#00eeff]">
                  {personalInfo.logoTextHighlight || "."}
                </span>
              </span>
            )}
          </a>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                    isActive 
                      ? 'text-[#00eeff] font-semibold [text-shadow:0_0_10px_rgba(0,238,255,0.6)]' 
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00eeff] rounded-full shadow-[0_0_6px_#00eeff]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT ACTION ICONS: CV, CLI, Admin Key */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* CV (if available) */}
            {(personalInfo.resumeUrl || personalInfo.cvUploaded) && (
              <button
                type="button"
                onClick={onOpenResume}
                title="Curriculum Vitae"
                className="px-3 py-1.5 rounded-lg bg-[#0b1e30] hover:bg-[#123657] text-zinc-300 hover:text-[#00eeff] border border-zinc-800 hover:border-[#00eeff]/50 transition-all cursor-pointer text-xs font-mono flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>CV</span>
              </button>
            )}

            {/* CLI Terminal */}
            <button
              type="button"
              onClick={onOpenTerminal}
              title="System Diagnostics Terminal"
              className="px-3 py-1.5 rounded-lg bg-[#0b1e30] hover:bg-[#123657] text-zinc-300 hover:text-[#00eeff] border border-zinc-800 hover:border-[#00eeff]/50 transition-all cursor-pointer text-xs font-mono flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-[#00eeff]" />
              <span>CLI</span>
            </button>

            {/* Admin Key button */}
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              title={isAdminAuthenticated ? "Admin Dashboard (Unlocked)" : "Admin Lock"}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                isAdminAuthenticated 
                  ? 'bg-[#00eeff]/20 border-[#00eeff] text-[#00eeff] shadow-[0_0_12px_rgba(0,238,255,0.4)]' 
                  : 'bg-[#0b1e30] hover:bg-[#123657] border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-[#00eeff]" />
              <span>{isAdminAuthenticated ? 'Admin' : 'Lock'}</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#0b1e30] border border-zinc-800 text-zinc-200 hover:text-[#00eeff]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#0b1e30]/95 backdrop-blur-xl border border-zinc-800 shadow-2xl space-y-3 animate-in slide-in-from-top-3 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-800">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-[#00eeff] text-[#081b29] font-bold shadow-md shadow-[#00eeff]/20' 
                        : 'text-zinc-200 hover:text-[#00eeff] bg-[#081b29] border border-zinc-800'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
              {(personalInfo.resumeUrl || personalInfo.cvUploaded) && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#081b29] text-zinc-200 border border-zinc-800 font-mono"
                >
                  <FileText className="w-3.5 h-3.5 text-[#00eeff]" />
                  <span>CV</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#081b29] text-zinc-200 border border-zinc-800 font-mono"
              >
                <Terminal className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>CLI</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#081b29] text-[#00eeff] border border-[#00eeff]/30 font-mono"
              >
                <Lock className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
