import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MessageSquare, ArrowUp, Instagram, Facebook } from 'lucide-react';

interface QuickContactFloatingProps {
  onOpenTerminal?: () => void;
}

export const QuickContactFloating: React.FC<QuickContactFloatingProps> = () => {
  const { personalInfo } = usePortfolio();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const whatsappLink = personalInfo.socials?.whatsapp || `https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)},%20I%20visited%20your%20portfolio!`;
  const instagramLink = personalInfo.socials?.instagram || "https://instagram.com";
  const facebookLink = personalInfo.socials?.facebook || "https://facebook.com";

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3 select-none">
      
      {/* Floating Back-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to top"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#00eeff] text-[#081b29] flex items-center justify-center shadow-[0_0_20px_rgba(0,238,255,0.7)] hover:scale-110 active:scale-95 transition-all cursor-pointer font-bold border border-white/40"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>
      )}

      {/* Floating Action Container - Vibrating Mirrors without text names on bottom-right */}
      <div className="flex flex-col gap-2.5 sm:gap-3 p-1.5 rounded-2xl bg-[#081b29]/80 backdrop-blur-xl border border-[#00eeff]/30 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_25px_rgba(0,238,255,0.2)]">
        
        {/* 1. WhatsApp Button (Vibrating & Glowing) */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          title={`WhatsApp: ${personalInfo.socials?.whatsappName || personalInfo.whatsappDisplay || personalInfo.whatsappNumber}`}
          aria-label="Connect on WhatsApp"
          className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-[0_0_18px_rgba(37,211,102,0.6)] hover:shadow-[0_0_30px_rgba(37,211,102,0.9)] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-emerald-300/40 animate-vibrate-social"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
          
          {/* Subtle reflection ping */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping opacity-75" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </a>

        {/* 2. Instagram Button (Vibrating & Glowing Gradient) */}
        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          title={`Instagram: ${personalInfo.socials?.instagramName || personalInfo.name}`}
          aria-label="Connect on Instagram"
          className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white flex items-center justify-center shadow-[0_0_18px_rgba(225,48,108,0.6)] hover:shadow-[0_0_30px_rgba(225,48,108,0.9)] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-pink-300/40 animate-vibrate-social [animation-delay:400ms]"
        >
          <Instagram className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-pink-300 rounded-full" />
        </a>

        {/* 3. Facebook Button (Vibrating & Glowing Blue) */}
        <a
          href={facebookLink}
          target="_blank"
          rel="noopener noreferrer"
          title={`Facebook: ${personalInfo.socials?.facebookName || personalInfo.name}`}
          aria-label="Connect on Facebook"
          className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#1877F2] to-[#3b82f6] text-white flex items-center justify-center shadow-[0_0_18px_rgba(24,119,242,0.6)] hover:shadow-[0_0_30px_rgba(24,119,242,0.9)] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-sky-300/40 animate-vibrate-social [animation-delay:800ms]"
        >
          <Facebook className="w-5 h-5 sm:w-6 sm:h-6 fill-white stroke-none" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-sky-300 rounded-full" />
        </a>

      </div>

    </div>
  );
};
