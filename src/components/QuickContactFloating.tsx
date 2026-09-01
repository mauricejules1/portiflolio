import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MessageSquare, ArrowUp, X, Terminal } from 'lucide-react';

interface QuickContactFloatingProps {
  onOpenTerminal: () => void;
}

export const QuickContactFloating: React.FC<QuickContactFloatingProps> = ({ onOpenTerminal }) => {
  const { personalInfo } = usePortfolio();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
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

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
      
      {/* Floating Back-To-Top Button (Exactly matching the glowing cyan square icon on bottom-right of Screenshot 1) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          className="w-11 h-11 rounded-xl bg-[#00eeff] text-[#081b29] flex items-center justify-center shadow-[0_0_20px_#00eeff] hover:scale-110 active:scale-95 transition-all cursor-pointer font-bold"
        >
          <ArrowUp className="w-6 h-6 stroke-[2.5]" />
        </button>
      )}

      {/* Floating WhatsApp Action Pill */}
      <a
        href={`https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)},%20I%20would%20like%20to%20chat!`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#081b29] border-2 border-[#00eeff] text-[#00eeff] hover:bg-[#00eeff] hover:text-[#081b29] font-bold text-xs shadow-[0_0_15px_rgba(0,238,255,0.4)] hover:shadow-[0_0_25px_#00eeff] transition-all cursor-pointer"
        title="Direct WhatsApp"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

    </div>
  );
};
