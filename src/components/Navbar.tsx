import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Menu, 
  X,
  Lock,
  FileText,
  Terminal,
  Send
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
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'services', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

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
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Project', href: '#projects', id: 'projects' },
    { name: 'contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#081b29]/90 backdrop-blur-xl border-b border-[#00eeff]/20 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* LOGO: Image Logo, Text Logo, or Combined */}
          <a 
            href="#home" 
            className="flex items-center gap-2.5 group select-none"
          >
            {/* Show logo image if provided and logoType is not 'text' */}
            {(personalInfo.logoType === 'image' || personalInfo.logoType === 'both' || personalInfo.useImageLogo) && (personalInfo.customLogoUrl || personalInfo.logoUrl) ? (
              <img 
                src={personalInfo.customLogoUrl || personalInfo.logoUrl} 
                alt={personalInfo.name} 
                referrerPolicy="no-referrer"
                className="h-9 sm:h-10 w-auto max-w-[140px] object-contain rounded-lg border border-[#00eeff]/40 shadow-[0_0_12px_rgba(0,238,255,0.4)]"
              />
            ) : null}

            {/* Show text logo if logoType is not 'image' */}
            {personalInfo.logoType !== 'image' && (
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-wide flex items-baseline">
                <span>{personalInfo.logoText || "Portfolio"}</span>
                <span className="text-[#00eeff] text-3xl sm:text-4xl leading-none transition-all group-hover:scale-125 [text-shadow:0_0_12px_#00eeff]">
                  {personalInfo.logoTextHighlight || "."}
                </span>
              </span>
            )}
          </a>

          {/* DESKTOP NAV LINKS (Matching screenshot casing: Home, About, Services, Skills, Project, contact) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm lg:text-base font-medium transition-all duration-200 relative py-1 ${
                    isActive 
                      ? 'text-[#00eeff] font-bold [text-shadow:0_0_12px_rgba(0,238,255,0.7)]' 
                      : 'text-zinc-200 hover:text-[#00eeff]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00eeff] rounded-full shadow-[0_0_8px_#00eeff]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT ACTION ICONS: CV, CLI, Admin Key */}
          <div className="hidden sm:flex items-center gap-3">
            {/* CV */}
            <button
              onClick={onOpenResume}
              title="Curriculum Vitae"
              className="p-2 rounded-xl bg-[#0e263d]/80 hover:bg-[#123657] text-zinc-300 hover:text-[#00eeff] border border-[#00eeff]/20 hover:border-[#00eeff]/60 transition-all cursor-pointer text-xs font-mono flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-[#00eeff]" />
              <span>CV</span>
            </button>

            {/* CLI Terminal */}
            <button
              onClick={onOpenTerminal}
              title="System Terminal"
              className="p-2 rounded-xl bg-[#0e263d]/80 hover:bg-[#123657] text-zinc-300 hover:text-[#00eeff] border border-[#00eeff]/20 hover:border-[#00eeff]/60 transition-all cursor-pointer text-xs font-mono flex items-center gap-1.5"
            >
              <Terminal className="w-4 h-4 text-[#00eeff]" />
              <span>CLI</span>
            </button>

            {/* Admin Key button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              title={isAdminAuthenticated ? "Admin Dashboard (Unlocked)" : "Admin Lock"}
              className={`p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center gap-1 ${
                isAdminAuthenticated 
                  ? 'bg-[#00eeff]/20 border-[#00eeff] text-[#00eeff] shadow-[0_0_15px_rgba(0,238,255,0.4)]' 
                  : 'bg-[#0e263d]/80 hover:bg-[#123657] border-[#00eeff]/20 text-zinc-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-[#00eeff]" />
              <span className="text-[11px]">{isAdminAuthenticated ? 'Admin' : 'Lock'}</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#0e263d] border border-[#00eeff]/30 text-zinc-200 hover:text-[#00eeff]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-5 rounded-3xl bg-[#0b1e30]/95 backdrop-blur-2xl border border-[#00eeff]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#00eeff]/20">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      isActive 
                        ? 'bg-[#00eeff] text-[#081b29] font-bold shadow-[0_0_15px_#00eeff]' 
                        : 'text-zinc-200 hover:text-[#00eeff] bg-[#0e263d]/60 border border-[#00eeff]/10'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0e263d] text-zinc-200 border border-[#00eeff]/20 font-mono"
              >
                <FileText className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>CV</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0e263d] text-zinc-200 border border-[#00eeff]/20 font-mono"
              >
                <Terminal className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>CLI</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0e263d] text-[#00eeff] border border-[#00eeff]/30 font-mono"
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
