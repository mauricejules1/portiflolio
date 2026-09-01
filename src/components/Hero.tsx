import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Github, 
  Linkedin, 
  MessageSquare, 
  Twitter, 
  Instagram,
  Facebook,
  ExternalLink,
  Code2,
  FileText
} from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenResume }) => {
  const { personalInfo } = usePortfolio();

  // Typewriter effect strings from personalInfo or defaults
  const roles = personalInfo.heroRoles && personalInfo.heroRoles.length > 0 
    ? personalInfo.heroRoles 
    : [
        "Computer Systems Architect",
        "Embedded & IoT Engineer",
        "Full-Stack Web Developer",
        "Hardware & Linux Specialist"
      ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const activeRoles = personalInfo.heroRoles && personalInfo.heroRoles.length > 0 
      ? personalInfo.heroRoles 
      : roles;
    const fullText = activeRoles[currentRoleIndex % activeRoles.length] || "Engineer";

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        // Deleting
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

  return (
    <section id="home" className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 flex items-center justify-center relative overflow-hidden bg-[#081b29] bg-mirror-grid">
      
      {/* Deep Blue Neon Mirror Glows in Background */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#00eeff]/10 rounded-full blur-[120px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#0077ff]/12 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Hello It's Me, Name, Typewriter, Bio, Socials, Button */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-left order-2 lg:order-1">
            
            <div className="space-y-2">
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-heading font-bold text-white tracking-wide">
                {personalInfo.heroGreeting || "Hello, It's Me"}
              </h3>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tight break-words">
                {personalInfo.name}
              </h1>

              <h3 className="text-xl sm:text-2xl lg:text-4xl font-heading font-bold text-white flex flex-wrap items-center gap-2 min-h-[40px]">
                <span>{personalInfo.heroTypingPrefix || "And I'm a"}</span>
                <span className="text-[#00eeff] [text-shadow:0_0_15px_#00eeff] inline-block font-mono font-bold">
                  {currentText}
                  <span className="animate-pulse text-white">|</span>
                </span>
              </h3>
            </div>

            {/* Introduction Paragraph */}
            <p className="text-xs sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed">
              {personalInfo.bio || "I'm a Computer Systems and Architecture engineer with extensive experience across digital circuits, CPU pipelines, embedded IoT microcontrollers (ESP32/Arduino), and modern full-stack web platforms."}
            </p>

            {/* Social Media Circular Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              {/* WhatsApp Direct */}
              <a
                href={`https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)},%20I%20visited%20your%20portfolio!`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
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
                className="social-icon-btn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* Twitter / X */}
              <a
                href={personalInfo.socials.twitter || "https://twitter.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={personalInfo.heroCtaLink || "#about"}
                id="hero-more-about-btn"
                className="btn-neon-cyan px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-bold shadow-[0_0_20px_#00eeff]"
              >
                {personalInfo.heroCtaText || "More About Me"}
              </a>

              <button
                onClick={onOpenResume}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-[#00eeff]/40 text-[#00eeff] hover:bg-[#00eeff]/10 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(0,238,255,0.2)]"
              >
                <FileText className="w-4 h-4" />
                <span>Curriculum Vitae</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Circular Portrait with Glowing Dual Neon Ring Halo */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
            <div className="relative">
              
              {/* Dual Neon Halo Glow Rings */}
              <div className="w-[230px] h-[230px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] rounded-full p-[3px] sm:p-[6px] bg-gradient-to-tr from-[#00eeff] via-[#d946ef] to-[#00eeff] shadow-[0_0_30px_#00eeff,0_0_60px_rgba(0,238,255,0.4),0_0_90px_rgba(217,70,239,0.3)] animate-[spin_12s_linear_infinite]">
                <div className="w-full h-full rounded-full bg-[#081b29] p-1.5 sm:p-2">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#00eeff]/40 to-[#081b29] p-[2px]" />
                </div>
              </div>

              {/* Centered Profile Picture inside the Glowing Dual Rings */}
              <div className="absolute inset-2.5 sm:inset-4 lg:inset-5 rounded-full overflow-hidden border-2 border-[#00eeff]/80 shadow-[inset_0_0_20px_rgba(0,238,255,0.5)] bg-[#0c2236]">
                <img
                  src={personalInfo.portraitUrl || personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
