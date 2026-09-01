import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const IntroLoader: React.FC = () => {
  const { showIntro, finishIntro, personalInfo } = usePortfolio();

  useEffect(() => {
    if (!showIntro) return;

    // Minimum 4.0 seconds bouncing/vibrating logo display before showing website
    const timer = setTimeout(() => {
      finishIntro();
    }, 4000);

    return () => clearTimeout(timer);
  }, [showIntro, finishIntro]);

  if (!showIntro) return null;

  const uploadedLogo = personalInfo.customLogoUrl || personalInfo.logoUrl;
  const displayName = personalInfo.name || "MUHIRE JULES";

  return (
    <AnimatePresence>
      <motion.div
        key="intro-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#081b29] text-white select-none overflow-hidden"
      >
        {/* Floating Multi-Color Glowing Mirror Atmosphere */}
        <div className="absolute w-[600px] h-[600px] bg-[#00eeff]/20 rounded-full blur-[160px] pointer-events-none -top-24 -left-24 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-[#d946ef]/15 rounded-full blur-[150px] pointer-events-none -bottom-24 -right-24 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-[#0077ff]/20 rounded-full blur-[140px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-mirror-grid opacity-40 pointer-events-none" />

        {/* Floating Reflective Mirror Prisms */}
        <div className="absolute top-1/4 left-1/6 w-16 h-16 rounded-2xl bg-white/5 border border-[#00eeff]/30 backdrop-blur-md rotate-12 animate-mirror-float pointer-events-none shadow-[0_0_25px_rgba(0,238,255,0.2)]" />
        <div className="absolute bottom-1/4 right-1/6 w-20 h-20 rounded-3xl bg-white/5 border border-[#d946ef]/30 backdrop-blur-md -rotate-12 animate-mirror-float [animation-delay:2s] pointer-events-none shadow-[0_0_25px_rgba(217,70,239,0.2)]" />
        <div className="absolute top-1/3 right-1/4 w-10 h-10 rounded-xl bg-white/5 border border-[#10b981]/30 backdrop-blur-md rotate-45 animate-mirror-float [animation-delay:4s] pointer-events-none" />

        {/* Central Logo ONLY - Vibrating and Bouncing with Mirror Reflection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center p-6 cursor-pointer"
          onClick={finishIntro}
          title="Click to enter website"
        >
          {/* Glowing Ambient Halo behind Logo */}
          <div className="absolute w-52 h-52 sm:w-64 sm:h-64 bg-gradient-to-tr from-[#00eeff]/35 via-[#d946ef]/25 to-[#0077ff]/35 rounded-full blur-2xl animate-pulse pointer-events-none" />

          {/* Logo Container with Mirror Reflection & Vibrating Bounce */}
          <div className="relative p-6 sm:p-8 rounded-[36px] bg-[#0c2236]/90 backdrop-blur-2xl border-2 border-[#00eeff]/70 shadow-[0_0_60px_rgba(0,238,255,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] animate-logo-bounce flex items-center justify-center">
            
            {/* Mirror Specular Top Line */}
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#00eeff] to-transparent shadow-[0_0_15px_#00eeff]" />

            {uploadedLogo ? (
              <img
                src={uploadedLogo}
                alt={displayName}
                referrerPolicy="no-referrer"
                className="max-h-32 sm:max-h-44 max-w-[260px] sm:max-w-[320px] object-contain rounded-2xl drop-shadow-[0_0_30px_rgba(0,238,255,0.85)]"
              />
            ) : (
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-[#081b29] to-[#112e42] border-2 border-[#00eeff] flex flex-col items-center justify-center text-center shadow-[0_0_35px_#00eeff]">
                <span className="text-4xl sm:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00eeff] via-white to-[#00eeff]">
                  MJ
                </span>
                <span className="text-xs font-mono text-[#00eeff] tracking-widest font-bold mt-1">
                  SYSTEMS
                </span>
              </div>
            )}

            {/* Specular Bottom Accent */}
            <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#d946ef] to-transparent" />
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
