import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  RotateCcw, 
  StepForward, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Activity,
  Sliders,
  Zap,
  Sparkles
} from 'lucide-react';

export const ArchitectureLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'cache' | 'logic'>('pipeline');

  // Pipeline Simulator State
  const defaultProgram = [
    { text: "ADDI x1, x0, 5", op: "ADDI", rd: "x1", rs1: "x0", imm: 5 },
    { text: "ADDI x2, x0, 12", op: "ADDI", rd: "x2", rs1: "x0", imm: 12 },
    { text: "ADD  x3, x1, x2", op: "ADD",  rd: "x3", rs1: "x1", rs2: "x2" },
    { text: "SW   x3, 0(x0)",  op: "SW",   rs2: "x3", rs1: "x0", imm: 0 },
    { text: "LW   x4, 0(x0)",  op: "LW",   rd: "x4", rs1: "x0", imm: 0 },
  ];

  const [cycle, setCycle] = useState(1);
  const [pc, setPc] = useState(0);
  const [registers, setRegisters] = useState<Record<string, number>>({
    x0: 0, x1: 5, x2: 12, x3: 17, x4: 17, x5: 0, x6: 0, x7: 0
  });

  const pipelineStages = [
    { name: "IF", label: "Instruction Fetch", color: "border-red-500 bg-red-950/40 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]", desc: "Reading instruction from memory at PC address" },
    { name: "ID", label: "Instruction Decode", color: "border-rose-500 bg-rose-950/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]", desc: "Decoding opcode & reading register file operands" },
    { name: "EX", label: "Execute / ALU", color: "border-orange-500 bg-orange-950/40 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.2)]", desc: "Arithmetic Logic Unit computing results / addresses" },
    { name: "MEM", label: "Memory Access", color: "border-amber-500 bg-amber-950/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]", desc: "Reading or writing data to Data RAM" },
    { name: "WB", label: "Write Back", color: "border-purple-500 bg-purple-950/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]", desc: "Writing final computed value back into destination register" },
  ];

  const stepCycle = () => {
    setCycle(prev => prev + 1);
    setPc(prev => (prev + 4) % (defaultProgram.length * 4));
  };

  const resetCycle = () => {
    setCycle(1);
    setPc(0);
  };

  // Cache Calculator State
  const [addressHex, setAddressHex] = useState("0x3A7C");
  const [cacheSizeKB, setCacheSizeKB] = useState(32);
  const [blockSizeBytes, setBlockSizeBytes] = useState(64);
  const [associativity, setAssociativity] = useState(4);

  const offsetBits = Math.log2(blockSizeBytes);
  const totalBlocks = (cacheSizeKB * 1024) / blockSizeBytes;
  const numSets = totalBlocks / associativity;
  const indexBits = Math.log2(numSets);
  const tagBits = 32 - indexBits - offsetBits;

  // Logic Gate State
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(0);

  const andResult = inputA & inputB;
  const orResult = inputA | inputB;
  const xorResult = inputA ^ inputB;
  const nandResult = ~(inputA & inputB) & 1;
  const sumBit = xorResult;
  const carryBit = andResult;

  return (
    <section id="architecture-lab" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 text-red-400" />
            <span>INTERACTIVE CSA LABORATORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white">
            Computer Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-orange-400">Simulator</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mt-3 text-sm sm:text-base">
            Demonstrating Jules's core engineering specialty in microarchitecture, CPU pipelining, and digital memory hierarchies.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-wrap justify-center gap-1 text-xs sm:text-sm font-semibold backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'pipeline'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>5-Stage RISC-V Pipeline</span>
            </button>
            <button
              onClick={() => setActiveTab('cache')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'cache'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Cache Address Breakdown</span>
            </button>
            <button
              onClick={() => setActiveTab('logic')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'logic'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Digital Logic & Adder</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 5-Stage RISC-V Pipeline */}
        {activeTab === 'pipeline' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d090d]/85 backdrop-blur-xl border border-white/10 space-y-6 shadow-2xl animate-in fade-in duration-300">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span>Cycle-Accurate 5-Stage Datapath</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-red-950/60 text-red-400 border border-red-500/30">
                    RV32I ISA
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Visualizing instruction flow across pipeline latch registers with data forwarding.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300">
                  <span>CLOCK: </span>
                  <strong className="text-red-400 font-bold text-sm ml-1">{cycle}</strong>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300">
                  <span>PC: </span>
                  <strong className="text-orange-400 font-bold text-sm ml-1">0x{pc.toString(16).padStart(4, '0')}</strong>
                </div>

                <button
                  id="pipeline-step-btn"
                  onClick={stepCycle}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95 transition-all cursor-pointer"
                >
                  <StepForward className="w-4 h-4" />
                  <span>Step Clock</span>
                </button>

                <button
                  id="pipeline-reset-btn"
                  onClick={resetCycle}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/10 text-xs cursor-pointer"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pipeline Stage Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {pipelineStages.map((stage, idx) => {
                const stageInstIdx = (cycle - 1 - idx + defaultProgram.length * 10) % defaultProgram.length;
                const currentInst = defaultProgram[stageInstIdx];
                const isActive = cycle > idx;

                return (
                  <div 
                    key={stage.name}
                    className={`p-4 rounded-2xl border transition-all ${
                      isActive ? stage.color : 'border-white/5 bg-zinc-950/40 text-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading font-black text-base tracking-wider">{stage.name}</span>
                      <span className="text-[10px] font-mono opacity-80">Stage {idx + 1}</span>
                    </div>

                    <div className="font-semibold text-xs mb-1 text-zinc-200">{stage.label}</div>
                    
                    <div className="p-2 rounded-xl bg-zinc-950/90 border border-white/10 font-mono text-[11px] my-2 text-zinc-300 min-h-[36px] flex items-center">
                      {isActive ? currentInst.text : "— STALL / BUBBLE —"}
                    </div>

                    <p className="text-[10px] text-zinc-400 leading-tight">
                      {stage.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Register File State */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-red-400" />
                  <span>32-bit RISC-V Register File (x0 - x7)</span>
                </span>
                <span className="text-[11px] font-mono text-red-400">Hardwired Zero: x0 = 0</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 font-mono text-xs text-center">
                {Object.entries(registers).map(([reg, val]) => (
                  <div key={reg} className="p-2 rounded-xl bg-zinc-900 border border-white/5">
                    <span className="text-[10px] text-zinc-500 block">{reg}</span>
                    <span className="font-bold text-zinc-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Cache Address Decomposition */}
        {activeTab === 'cache' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d090d]/85 backdrop-blur-xl border border-white/10 space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <span>Cache Memory Address Analyzer</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-red-950/60 text-red-400 border border-red-500/30">
                  32-Bit Physical Address
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Calculates Tag bits, Set Index bits, and Byte Offset bits based on cache geometry.
              </p>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-zinc-950/80 p-4 rounded-2xl border border-white/10 text-xs">
              <div>
                <label className="block text-zinc-400 font-mono mb-1">Target Address (Hex):</label>
                <input
                  type="text"
                  value={addressHex}
                  onChange={(e) => setAddressHex(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-xs focus:border-red-500/60"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">Total Cache Size:</label>
                <select
                  value={cacheSizeKB}
                  onChange={(e) => setCacheSizeKB(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-xs"
                >
                  <option value={16}>16 KB</option>
                  <option value={32}>32 KB</option>
                  <option value={64}>64 KB</option>
                  <option value={128}>128 KB</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">Block / Line Size:</label>
                <select
                  value={blockSizeBytes}
                  onChange={(e) => setBlockSizeBytes(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-xs"
                >
                  <option value={32}>32 Bytes</option>
                  <option value={64}>64 Bytes</option>
                  <option value={128}>128 Bytes</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">Associativity:</label>
                <select
                  value={associativity}
                  onChange={(e) => setAssociativity(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-xs"
                >
                  <option value={1}>Direct Mapped (1-Way)</option>
                  <option value={2}>2-Way Set Associative</option>
                  <option value={4}>4-Way Set Associative</option>
                  <option value={8}>8-Way Set Associative</option>
                </select>
              </div>
            </div>

            {/* Address Bit Breakdown Visualizer */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-zinc-300">32-BIT ADDRESS DECOMPOSITION</h4>
              
              <div className="grid grid-cols-12 gap-2 text-center font-mono text-xs">
                {/* TAG */}
                <div 
                  className="col-span-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 space-y-1"
                >
                  <span className="text-[10px] text-rose-400 block uppercase">TAG FIELD</span>
                  <div className="text-xl font-bold font-mono">{tagBits} Bits</div>
                  <span className="text-[10px] text-zinc-400">Bits [31 : {32 - tagBits}]</span>
                </div>

                {/* SET INDEX */}
                <div 
                  className="col-span-4 p-4 rounded-2xl bg-orange-950/40 border border-orange-500/30 text-orange-300 space-y-1"
                >
                  <span className="text-[10px] text-orange-400 block uppercase">SET INDEX</span>
                  <div className="text-xl font-bold font-mono">{indexBits} Bits</div>
                  <span className="text-[10px] text-zinc-400">Sets: {numSets}</span>
                </div>

                {/* OFFSET */}
                <div 
                  className="col-span-2 p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-300 space-y-1"
                >
                  <span className="text-[10px] text-red-400 block uppercase">OFFSET</span>
                  <div className="text-xl font-bold font-mono">{offsetBits} Bits</div>
                  <span className="text-[10px] text-zinc-400">{blockSizeBytes}B</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 text-xs text-zinc-300 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>Calculated Sets:</span>
                <span className="text-red-400 font-bold">{numSets} sets</span>
              </div>
              <div className="flex justify-between">
                <span>Total Cache Lines / Blocks:</span>
                <span className="text-orange-400 font-bold">{totalBlocks} blocks</span>
              </div>
              <div className="flex justify-between">
                <span>Lookup Speed vs Miss Balance:</span>
                <span className="text-amber-300 font-bold">
                  {associativity > 1 ? `${associativity}-way reduces conflict misses` : 'Direct mapped: fastest hit time'}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Digital Logic & Half Adder */}
        {activeTab === 'logic' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d090d]/85 backdrop-blur-xl border border-white/10 space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <span>Digital Logic & 1-Bit Half-Adder Simulator</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-red-950/60 text-red-400 border border-red-500/30">
                  Boolean Circuit
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Toggle input logic levels to observe the behavior of basic gates and arithmetic adders.
              </p>
            </div>

            {/* Input Bit Toggles */}
            <div className="flex items-center justify-center gap-8 bg-zinc-950/80 p-6 rounded-3xl border border-white/10">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono text-zinc-400 block">INPUT A</span>
                <button
                  id="logic-input-a"
                  onClick={() => setInputA(inputA === 1 ? 0 : 1)}
                  className={`w-14 h-14 rounded-2xl font-mono text-2xl font-black transition-all border cursor-pointer ${
                    inputA === 1
                      ? 'bg-gradient-to-tr from-red-600 to-rose-600 text-white border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-105'
                      : 'bg-zinc-800 text-zinc-400 border-white/10'
                  }`}
                >
                  {inputA}
                </button>
              </div>

              <div className="text-zinc-600 font-bold text-2xl">+</div>

              <div className="text-center space-y-2">
                <span className="text-xs font-mono text-zinc-400 block">INPUT B</span>
                <button
                  id="logic-input-b"
                  onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                  className={`w-14 h-14 rounded-2xl font-mono text-2xl font-black transition-all border cursor-pointer ${
                    inputB === 1
                      ? 'bg-gradient-to-tr from-orange-600 to-amber-600 text-white border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.5)] scale-105'
                      : 'bg-zinc-800 text-zinc-400 border-white/10'
                  }`}
                >
                  {inputB}
                </button>
              </div>
            </div>

            {/* Circuit Outputs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 text-center">
                <span className="text-[11px] font-mono text-zinc-500 block">AND GATE</span>
                <span className="text-xl font-bold font-mono text-white">{andResult}</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 text-center">
                <span className="text-[11px] font-mono text-zinc-500 block">OR GATE</span>
                <span className="text-xl font-bold font-mono text-white">{orResult}</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 text-center">
                <span className="text-[11px] font-mono text-zinc-500 block">XOR GATE</span>
                <span className="text-xl font-bold font-mono text-white">{xorResult}</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 text-center">
                <span className="text-[11px] font-mono text-zinc-500 block">NAND GATE</span>
                <span className="text-xl font-bold font-mono text-white">{nandResult}</span>
              </div>
            </div>

            {/* Half Adder Sum & Carry */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-orange-950/40 border border-red-500/30 flex flex-wrap items-center justify-around gap-4 text-center">
              <div>
                <span className="text-xs font-mono text-red-400 block">SUM BIT (A ⊕ B):</span>
                <span className="text-2xl font-black font-mono text-white">{sumBit}</span>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="text-xs font-mono text-orange-400 block">CARRY OUT (A • B):</span>
                <span className="text-2xl font-black font-mono text-white">{carryBit}</span>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="text-xs font-mono text-rose-400 block">BINARY OUTPUT:</span>
                <span className="text-2xl font-black font-mono text-amber-400">{carryBit}{sumBit}₂ ({carryBit * 2 + sumBit}₁₀)</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
