import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const { personalInfo: PERSONAL_INFO, skillCategories: SKILL_CATEGORIES, projects: PROJECTS } = usePortfolio();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (history.length === 0) {
        setHistory([
          {
            id: 'welcome',
            command: 'sys.init()',
            timestamp: new Date().toLocaleTimeString(),
            output: (
              <div className="space-y-1.5 text-zinc-300">
                <div className="text-[#00eeff] font-bold font-mono">
                  ╔══════════════════════════════════════════════════════════════════════╗
                  <br />
                  ║  MUHIRE Jules — Computer Systems & Architecture Terminal v2.4       ║
                  <br />
                  ║  System: RISC-V 32-bit Host | Rusizi, Western Province, Rwanda 🇷🇼  ║
                  <br />
                  ╚══════════════════════════════════════════════════════════════════════╝
                </div>
                <p className="text-xs text-zinc-400">
                  Type <span className="text-[#00eeff] font-bold">help</span> to view available system commands or click the shortcut chips below.
                </p>
              </div>
            )
          }
        ]);
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setPastCommands(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const timestamp = new Date().toLocaleTimeString();

    let output: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-[#00eeff] font-bold">Available System Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2 font-mono">
              <div><span className="text-[#00eeff] font-bold">whoami</span> — Profile, Education & Bio</div>
              <div><span className="text-[#00eeff] font-bold">csa</span> — Computer Systems & Microarchitecture</div>
              <div><span className="text-[#00eeff] font-bold">skills</span> — Full Technical Stack Matrix</div>
              <div><span className="text-[#00eeff] font-bold">projects</span> — List Featured Engineering Projects</div>
              <div><span className="text-[#00eeff] font-bold">whatsapp</span> — Direct WhatsApp Contact (0794410997)</div>
              <div><span className="text-[#00eeff] font-bold">contact</span> — Email, Phone & Location Info</div>
              <div><span className="text-[#00eeff] font-bold">sudo hire-jules</span> — Fast-Track Job / Freelance Offer</div>
              <div><span className="text-[#00eeff] font-bold">specs</span> — Hardware Architecture Benchmarks</div>
              <div><span className="text-[#00eeff] font-bold">date</span> — Live Rwanda Local Time</div>
              <div><span className="text-[#00eeff] font-bold">clear</span> — Wipe Terminal Screen</div>
              <div><span className="text-[#00eeff] font-bold">exit</span> — Close CLI Terminal</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p><strong className="text-[#00eeff]">NAME:</strong> {PERSONAL_INFO.name}</p>
            <p><strong className="text-[#00eeff]">FIELD:</strong> {PERSONAL_INFO.fieldOfStudy}</p>
            <p><strong className="text-[#00eeff]">LOCATION:</strong> {PERSONAL_INFO.location}</p>
            <p><strong className="text-[#00eeff]">WHATSAPP:</strong> {PERSONAL_INFO.whatsappDisplay} ({PERSONAL_INFO.whatsappNumber})</p>
            <p className="text-zinc-400 leading-relaxed pt-1">{PERSONAL_INFO.bio}</p>
          </div>
        );
        break;

      case 'csa':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-[#00eeff] font-bold">Computer Systems and Architecture (CSA) Competencies:</p>
            <ul className="list-disc pl-4 space-y-1 text-zinc-300">
              <li>Microprocessor Datapath & Control Unit Engineering (RISC-V / x86 / MIPS)</li>
              <li>5-Stage Instruction Pipelining (Fetch, Decode, Execute, Memory, Writeback)</li>
              <li>Data Hazard Forwarding & Branch Prediction Algorithms</li>
              <li>Cache Hierarchy Optimization (L1/L2/L3 Tag & Set Mapping)</li>
              <li>Low-Level Memory Allocators & OS Kernel Preemption</li>
            </ul>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-[#00eeff] font-bold">Technical Matrix Summary:</p>
            {SKILL_CATEGORIES.map(cat => (
              <div key={cat.id} className="border-l border-[#00eeff]/20 pl-2">
                <span className="text-[#00eeff] font-bold font-mono">{cat.name}:</span>
                <span className="text-zinc-300 ml-2">
                  {cat.skills.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-[#00eeff] font-bold">Engineering Projects Index:</p>
            <div className="space-y-1.5 pl-2">
              {PROJECTS.map((p, idx) => (
                <div key={p.id} className="flex items-start gap-2">
                  <span className="text-[#00eeff] font-mono">[{idx + 1}]</span>
                  <div>
                    <span className="font-semibold text-zinc-200">{p.title}</span>
                    <span className="text-[#00eeff] ml-2 font-mono text-[11px]">({p.category})</span>
                    <p className="text-zinc-400 text-[11px]">{p.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'whatsapp':
      case 'call':
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="text-[#00eeff] font-bold">Launching WhatsApp Dispatch...</p>
            <p className="text-zinc-300">
              Phone / WhatsApp Number: <strong className="text-white">{PERSONAL_INFO.whatsappDisplay}</strong> ({PERSONAL_INFO.whatsappNumber})
            </p>
            <a
              href={`https://wa.me/${PERSONAL_INFO.whatsappNumber.replace('+', '')}?text=Hello%20MUHIRE%20Jules,%20I%20contacted%20you%20via%20your%20Portfolio%20Terminal!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 px-4 py-2 rounded-xl btn-neon-cyan text-xs font-bold"
            >
              Click to Open WhatsApp Chat
            </a>
          </div>
        );
        window.open(`https://wa.me/${PERSONAL_INFO.whatsappNumber.replace('+', '')}?text=Hello%20MUHIRE%20Jules,%20I%20contacted%20you%20via%20your%20Portfolio%20Terminal!`, '_blank');
        break;

      case 'contact':
      case 'email':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
            <p><span className="text-zinc-500">WHATSAPP:</span> <span className="text-[#00eeff] font-bold">{PERSONAL_INFO.whatsappDisplay}</span></p>
            <p><span className="text-zinc-500">EMAIL:</span> <span className="text-cyan-300">{PERSONAL_INFO.email}</span></p>
            <p><span className="text-zinc-500">LOCATION:</span> <span>{PERSONAL_INFO.location}</span></p>
            <p><span className="text-zinc-500">STATUS:</span> <span className="text-emerald-400">Available for Projects & Roles</span></p>
          </div>
        );
        break;

      case 'sudo':
        if (parts[1] === 'hire-jules' || parts[1] === 'hire') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00eeff', '#0077ff', '#ffffff']
          });
          output = (
            <div className="p-4 rounded-2xl bg-[#081b29] border border-[#00eeff]/50 space-y-2 text-xs">
              <p className="text-[#00eeff] font-bold text-sm">🎉 PERMISSION GRANTED: HIRING MUHIRE JULES</p>
              <p className="text-zinc-300 leading-relaxed">
                Thank you for choosing to work with MUHIRE Jules! An exceptional engineer in Computer System & Architecture, Embedded IoT, and Full-Stack Systems is ready for your team.
              </p>
              <a
                href={`https://wa.me/${PERSONAL_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Jules!%20I%20used%20the%20sudo%20hire%20command%20on%20your%20portfolio%20and%20want%20to%20hire%20you!`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 rounded-xl btn-neon-cyan text-xs font-bold"
              >
                Complete Offer on WhatsApp ({PERSONAL_INFO.whatsappDisplay})
              </a>
            </div>
          );
        } else {
          output = <p className="text-cyan-400 text-xs">sudo: command not found: {parts[1] || ''}. Try 'sudo hire-jules'</p>;
        }
        break;

      case 'specs':
        output = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-[#00eeff] font-bold">CSA BENCHMARK HOST METRICS:</p>
            <p>CPU CORE ARCH: 32-bit RISC-V Pipelined Core @ Virtual 1.2 GHz</p>
            <p>L1 D-CACHE: 32 KB (4-Way Set Associative, 64-byte lines)</p>
            <p>L1 I-CACHE: 32 KB (Direct Mapped, 64-byte lines)</p>
            <p>BRANCH PREDICTION: 2-Bit Saturating Counter with BHT</p>
            <p>GEOGRAPHIC NODE: Rusizi / Western Province / Rwanda (UTC+2)</p>
          </div>
        );
        break;

      case 'date':
        output = (
          <p className="text-xs font-mono text-[#00eeff]">
            Rwanda Local Time (CAT / UTC+2): {new Date().toLocaleString('en-US', { timeZone: 'Africa/Kigali' })}
          </p>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = (
          <p className="text-cyan-400 text-xs font-mono">
            zsh: command not found: '{trimmed}'. Type <span className="text-[#00eeff] font-bold cursor-pointer underline" onClick={() => handleCommand('help')}>help</span> for valid commands.
          </p>
        );
        break;
    }

    setHistory(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output,
        timestamp
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < pastCommands.length) {
          setHistoryIndex(nextIdx);
          setInputVal(pastCommands[pastCommands.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(pastCommands[pastCommands.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickCommands = [
    "help",
    "whoami",
    "csa",
    "skills",
    "projects",
    "whatsapp",
    "sudo hire-jules",
    "specs",
    "clear"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`bg-[#081b29] border-2 border-[#00eeff]/40 rounded-[32px] shadow-[0_0_50px_rgba(0,238,255,0.3)] flex flex-col transition-all overflow-hidden font-mono ${
          isFullScreen ? 'w-full h-full' : 'max-w-3xl w-full h-[600px] max-h-[90vh]'
        }`}
      >
        
        {/* Terminal Title Bar */}
        <div className="bg-[#05111a] px-4 py-3 border-b border-[#00eeff]/20 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer" />
            <button onClick={() => setIsFullScreen(!isFullScreen)} className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#00eeff]" />
            <span className="text-xs text-zinc-300 font-semibold ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#00eeff]" />
              <span>jules@rusizi-csa: ~ (zsh)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer"
              title={isFullScreen ? 'Restore Size' : 'Maximize Window'}
            >
              {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Action Chips */}
        <div className="bg-[#0c2236]/80 px-4 py-2.5 border-b border-[#00eeff]/15 flex flex-wrap items-center gap-1.5 text-[11px] overflow-x-auto">
          <span className="text-zinc-500 mr-1 text-[10px]">Quick:</span>
          {quickCommands.map(cmd => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 rounded-lg bg-[#081b29] hover:bg-[#00eeff] hover:text-[#081b29] text-zinc-300 border border-[#00eeff]/20 transition-colors text-[10px] cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen & Logs */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#061521] cursor-text text-zinc-200 text-xs sm:text-sm font-mono"
        >
          {history.map((log) => (
            <div key={log.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <span className="text-[#00eeff] font-bold">jules@rusizi-csa:~$</span>
                <span className="text-white font-semibold">{log.command}</span>
                <span className="text-[10px] text-zinc-500 ml-auto">{log.timestamp}</span>
              </div>
              <div className="pl-3 border-l border-[#00eeff]/20">
                {log.output}
              </div>
            </div>
          ))}

          {/* Active Prompt Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[#00eeff] font-bold shrink-0">jules@rusizi-csa:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white text-xs sm:text-sm font-mono focus:ring-0 p-0"
              placeholder="Type a command (e.g. help, whoami, whatsapp, sudo hire-jules)..."
              autoFocus
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1 rounded bg-[#00eeff]/20 text-[#00eeff] hover:bg-[#00eeff] hover:text-[#081b29] transition-colors cursor-pointer"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Terminal Status Bar */}
        <div className="bg-[#05111a] px-4 py-2 border-t border-[#00eeff]/20 text-[10px] text-zinc-400 flex items-center justify-between font-mono">
          <span>HOST: RUSIZI-RWANDA-01</span>
          <span className="text-[#00eeff]">WHATSAPP: {PERSONAL_INFO.whatsappDisplay}</span>
          <span className="text-emerald-400">STATUS: ONLINE</span>
        </div>

      </div>
    </div>
  );
};
