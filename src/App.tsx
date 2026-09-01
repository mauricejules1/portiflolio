import React, { useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { IntroLoader } from './components/IntroLoader';
import { AdminPanel } from './components/AdminPanel';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { SkillsMatrix } from './components/SkillsMatrix';
import { Projects } from './components/Projects';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileSideNav } from './components/MobileSideNav';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ResumeModal } from './components/ResumeModal';
import { QuickContactFloating } from './components/QuickContactFloating';

function PortfolioApp() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#081b29] text-zinc-100 selection:bg-[#00eeff]/30 selection:text-[#00eeff] relative overflow-x-hidden font-sans">
      
      {/* Intro Animation & Loading Screen for MUHIRE JULES */}
      <IntroLoader />

      {/* Admin Panel Modal & Controller */}
      <AdminPanel />

      {/* Background Subtle Dot & Hard Mirror Grid Overlays */}
      <div className="fixed inset-0 bg-mirror-grid opacity-25 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00eeff]/8 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-10 w-[600px] h-[600px] bg-[#0077ff]/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Navigation Bar (Portals: Home | About | Services | Skills | Project | contact) */}
      <Navbar 
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Floating Glass/Mirror Left-Side Navigation Bar for Mobile Phones */}
      <MobileSideNav />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 1: Home (Screenshot 1) */}
        <Hero 
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />
        
        {/* Section 2: About */}
        <About 
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Section 3: Services (Screenshot 3) */}
        <Services />

        {/* Section 4: Skills (Screenshot 2) */}
        <SkillsMatrix />

        {/* Section 5: Projects */}
        <Projects />

        {/* Section 6: Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Floating Action Button for Back-To-Top & WhatsApp */}
      <QuickContactFloating 
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Interactive Terminal Modal */}
      <InteractiveTerminal 
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Resume / CV Modal */}
      <ResumeModal 
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
