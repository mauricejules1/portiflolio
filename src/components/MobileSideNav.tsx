import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Layers, 
  Cpu, 
  FolderGit2, 
  Mail,
  Terminal,
  MessageSquare
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface MobileSideNavProps {
  onOpenTerminal: () => void;
}

export const MobileSideNav: React.FC<MobileSideNavProps> = ({ onOpenTerminal }) => {
  const { personalInfo } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 250;

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'services', label: 'Services', icon: Layers, href: '#services' },
    { id: 'skills', label: 'Skills', icon: Cpu, href: '#skills' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, href: '#projects' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <aside
      id="mobile-mirror-nav"
      aria-label="Mobile Floating Navigation"
      className="md:hidden fixed left-2 sm:left-3 top-1/2 -translate-y-1/2 z-40 select-none animate-in fade-in slide-in-from-left duration-300"
    >
      {/* Floating Futuristic Blue Mirror Tab */}
      <div className="relative bg-[#081b29]/85 backdrop-blur-xl border border-[#00eeff]/45 rounded-2xl p-1.5 flex flex-col items-center gap-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(0,238,255,0.25),inset_0_1px_1px_rgba(0,238,255,0.4)]">
        
        {/* Specular Top Blue Mirror Accent Bar */}
        <div className="w-4 h-[2px] rounded-full bg-[#00eeff]/80 shadow-[0_0_8px_#00eeff] mb-0.5" />

        {/* Navigation Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              title={item.label}
              className={`relative p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center group ${
                isActive
                  ? 'bg-[#00eeff] text-[#081b29] shadow-[0_0_14px_#00eeff] scale-110'
                  : 'text-zinc-300 hover:text-[#00eeff] hover:bg-[#0e263d]/80'
              }`}
            >
              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />

              {/* Active Glow indicator dot */}
              {isActive && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00eeff] shadow-[0_0_6px_#00eeff]" />
              )}
            </a>
          );
        })}

        {/* Subtle Divider */}
        <div className="w-5 h-[1px] bg-[#00eeff]/20 my-0.5" />

        {/* Quick WhatsApp Direct Icon */}
        <a
          href={`https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)},%20I%20contacted%20you%20via%20your%20mobile%20portfolio!`}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp Chat"
          className="p-2.5 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all flex items-center justify-center"
        >
          <MessageSquare className="w-4 h-4" />
        </a>

        {/* Quick CLI Terminal Trigger */}
        <button
          onClick={onOpenTerminal}
          title="Open CLI Terminal"
          className="p-2.5 rounded-xl text-[#00eeff] hover:bg-[#00eeff]/15 transition-all flex items-center justify-center cursor-pointer"
        >
          <Terminal className="w-4 h-4" />
        </button>

      </div>
    </aside>
  );
};
