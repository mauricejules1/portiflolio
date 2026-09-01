import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  FileText, 
  Printer, 
  X, 
  Check, 
  Copy, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap, 
  Cpu, 
  MessageSquare
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personalInfo, skillCategories, projects } = usePortfolio();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const text = `
==================================================
CURRICULUM VITAE — ${personalInfo.name.toUpperCase()}
==================================================
Field: ${personalInfo.fieldOfStudy}
Location: ${personalInfo.location}
WhatsApp / Phone: ${personalInfo.whatsappDisplay} (${personalInfo.whatsappNumber})
Email: ${personalInfo.email}

PROFESSIONAL SUMMARY:
${personalInfo.bio}

EDUCATION & ACADEMICS:
- Major: Computer System and Architecture (CSA)
- Core Focus: CPU Microarchitectures, RISC-V, Assembly & C/C++, Memory Hierarchies, Digital Circuits, Operating Systems, Linux Kernel, Computer Networks.

FEATURED PROJECTS:
${projects.slice(0, 5).map((p, i) => `${i + 1}. ${p.title} (${p.technologies.slice(0, 3).join(', ')})`).join('\n')}
==================================================
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#081b29] border-2 border-[#00eeff]/40 rounded-[32px] max-w-4xl w-full max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,238,255,0.3)] overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="bg-[#05111a] p-4 border-b border-[#00eeff]/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00eeff]" />
            <h3 className="font-heading font-bold text-white text-base">
              Curriculum Vitae — <span className="text-[#00eeff]">{personalInfo.name}</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] text-zinc-300 hover:text-white border border-[#00eeff]/20 text-xs font-mono transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] text-[#00eeff] border border-[#00eeff]/30 text-xs font-mono transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#00eeff]" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#081b29] hover:bg-[#0e263d] text-zinc-400 hover:text-white border border-[#00eeff]/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#081b29] text-zinc-200 selection:bg-[#00eeff]/30">
          
          {/* Resume Header */}
          <div className="border-b border-[#00eeff]/20 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide">
                {personalInfo.name}
              </h1>
              <p className="text-sm font-mono text-[#00eeff] mt-1 font-semibold">
                {personalInfo.fieldOfStudy} Specialist
              </p>
              <p className="text-xs text-zinc-300 mt-1">
                Hardware-Software Integration • Embedded IoT • Full-Stack Systems
              </p>
            </div>

            <div className="text-xs font-mono text-zinc-300 space-y-1 sm:text-right">
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personalInfo.whatsappDisplay}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>{personalInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-[#00eeff] uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Core Technical Matrix */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#00eeff] uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Technical Skills Breakdown</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="p-3.5 rounded-2xl bg-[#0c2236] border border-[#00eeff]/20 space-y-1.5">
                  <div className="font-heading font-bold text-white text-xs">{cat.name}</div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    {cat.skills.map(s => s.name).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Highlight */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#00eeff] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Key Projects & Systems</span>
            </h2>

            <div className="space-y-3">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-[#0c2236] border border-[#00eeff]/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-white text-xs sm:text-sm">{p.title}</h4>
                    <span className="text-[10px] font-mono text-zinc-400">{p.date}</span>
                  </div>
                  <p className="text-xs text-zinc-300">{p.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.technologies.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#081b29] text-[10px] font-mono text-[#00eeff] border border-[#00eeff]/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connect Footer */}
          <div className="pt-4 border-t border-[#00eeff]/20 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Verified Document • {personalInfo.name}</span>
            <a
              href={`https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00eeff] hover:underline flex items-center gap-1"
            >
              <span>Connect on WhatsApp</span>
              <MessageSquare className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
