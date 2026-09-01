import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const IntroLoader: React.FC = () => {
  const { showIntro, finishIntro, personalInfo } = usePortfolio();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!showIntro) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            finishIntro();
          }, 350);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [showIntro, finishIntro]);

  if (!showIntro) return null;

  const fullName = (personalInfo.name || "MUHIRE JULES").toUpperCase();

  return (
    <AnimatePresence>
      <motion.div
        key="intro-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#081b29] text-white select-none overflow-hidden"
      >
        {/* Deep Blue Ambient Backlights */}
        <div className="absolute w-[600px] h-[600px] bg-[#00eeff]/15 rounded-full blur-[160px] pointer-events-none -top-20 -left-20 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-[#0077ff]/15 rounded-full blur-[140px] pointer-events-none -bottom-20 -right-20 animate-pulse" />
        <div className="absolute inset-0 bg-mirror-grid opacity-30 pointer-events-none" />

        {/* Central Luminous Hard Mirror Card */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-xl mx-4 p-8 sm:p-12 rounded-[32px] bg-[#0c2236]/90 backdrop-blur-2xl border-2 border-[#00eeff]/40 shadow-[0_0_80px_rgba(0,238,255,0.25)] flex flex-col items-center text-center space-y-6 overflow-hidden"
        >
          {/* Specular Mirror Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00eeff] to-transparent shadow-[0_0_15px_#00eeff]" />
          
          {/* Top Monogram Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-[2px] bg-gradient-to-tr from-[#00eeff] via-[#d946ef] to-[#00eeff] shadow-[0_0_30px_#00eeff]"
          >
            <div className="w-full h-full bg-[#081b29] rounded-2xl flex items-center justify-center">
              <span className="font-heading font-black text-xl sm:text-2xl text-[#00eeff] [text-shadow:0_0_10px_#00eeff]">
                MJ
              </span>
            </div>
          </motion.div>

          {/* Name Reveal */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-5xl font-heading font-black tracking-wider text-white"
            >
              <span>{fullName}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xs sm:text-sm font-mono tracking-widest text-[#00eeff] font-semibold uppercase flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Computer Systems Architect | Rwanda 🇷🇼</span>
            </motion.p>
          </div>

          {/* Minimalist Progress Meter */}
          <div className="w-full max-w-xs space-y-2 pt-2">
            <div className="w-full h-1.5 rounded-full bg-[#081b29] overflow-hidden border border-[#00eeff]/30 p-[1px]">
              <motion.div
                className="h-full rounded-full bg-[#00eeff] shadow-[0_0_12px_#00eeff]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>SYSTEM INITIALIZATION</span>
              <span className="text-[#00eeff] font-bold">{progress}%</span>
            </div>
          </div>

          {/* Skip Button */}
          <button
            onClick={finishIntro}
            className="text-[11px] font-mono text-zinc-400 hover:text-[#00eeff] transition-colors flex items-center gap-1 cursor-pointer pt-2 hover:underline"
          >
            <span>Enter Portfolio</span>
            <ArrowRight className="w-3 h-3 text-[#00eeff]" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
