import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Calculator, 
  Send, 
  MessageSquare, 
  Check, 
  Clock, 
  Layers, 
  Cpu, 
  Radio, 
  Globe, 
  Wrench, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ProjectEstimator: React.FC = () => {
  const [serviceType, setServiceType] = useState('embedded');
  const [timeline, setTimeline] = useState('standard');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'telemetry',
    'mobile_responsive'
  ]);

  const services = [
    { id: 'embedded', label: 'Embedded & IoT Hardware', icon: Radio, desc: 'ESP32/Arduino, Sensor Networks, Microcontrollers' },
    { id: 'web', label: 'Full-Stack Web App', icon: Globe, desc: 'React, TypeScript, Tailwind, REST/WebSocket APIs' },
    { id: 'csa', label: 'CSA & Systems Audit', icon: Cpu, desc: 'Low-level C/C++, Pipeline optimization, OS & ASM' },
    { id: 'diagnostics', label: 'Hardware Maintenance', icon: Wrench, desc: 'PC Assembly, Firmware/BIOS tuning, Recovery' },
  ];

  const timelines = [
    { id: 'urgent', label: 'Urgent (1–2 Weeks)', badge: 'Priority Sprint' },
    { id: 'standard', label: 'Standard (3–5 Weeks)', badge: 'Recommended' },
    { id: 'extended', label: 'Flexible / Ongoing', badge: 'Continuous' },
  ];

  const featureOptions = [
    { id: 'telemetry', label: 'Real-Time Telemetry & Cloud Dashboard', costNote: 'MQTT/WebSocket' },
    { id: 'pcb', label: 'Custom PCB Circuit Schematic & Breadboard', costNote: 'Hardware layout' },
    { id: 'mobile_responsive', label: 'Mobile-First Responsive UI & Dark Mode', costNote: 'Clean UX' },
    { id: 'api_backend', label: 'Secure REST / Node.js Backend API', costNote: 'Database sync' },
    { id: 'whatsapp_alerts', label: 'WhatsApp / SMS Alert Notifications', costNote: 'Direct webhooks' },
    { id: 'training', label: 'Documentation & Handover Training', costNote: 'Full guide' },
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getServiceLabel = () => {
    return services.find(s => s.id === serviceType)?.label || serviceType;
  };

  const getTimelineLabel = () => {
    return timelines.find(t => t.id === timeline)?.label || timeline;
  };

  const generateWhatsAppMessage = () => {
    const selectedLabels = featureOptions
      .filter(f => selectedFeatures.includes(f.id))
      .map(f => `• ${f.label}`)
      .join('%0A');

    const msg = `Hello MUHIRE Jules!%0A%0AI would like to start a project with you:%0A%0A*Service:* ${getServiceLabel()}%0A*Timeline:* ${getTimelineLabel()}%0A*Selected Features:*%0A${selectedLabels}%0A%0APlease let me know your availability and initial quotation.%0AFrom: [Your Name]`;
    return `https://wa.me/${PERSONAL_INFO.whatsappNumber.replace('+', '')}?text=${msg}`;
  };

  return (
    <section id="estimator" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono mb-3">
            <Calculator className="w-3.5 h-3.5 text-red-400" />
            <span>INTERACTIVE ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white">
            Estimate Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-orange-400">& Dispatch to WhatsApp</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mt-3 text-sm sm:text-base">
            Select your technical requirements below to instantly generate a structured project scope and send directly to Jules on WhatsApp (0794410997).
          </p>
        </div>

        {/* Card Box */}
        <div className="rounded-3xl bg-[#0d090d]/85 backdrop-blur-xl border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Step 1: Select Service */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold block mb-3">
              1. Choose Project Domain
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {services.map(s => {
                const Icon = s.icon;
                const isSelected = serviceType === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setServiceType(s.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-red-950/50 border-red-500 text-red-300 ring-1 ring-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        : 'bg-zinc-950/70 border-white/10 text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-red-400' : 'text-zinc-500'}`} />
                    <h4 className="font-heading font-bold text-sm text-white">{s.label}</h4>
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{s.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Timeline */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold block mb-3">
              2. Desired Delivery Timeline
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {timelines.map(t => {
                const isSelected = timeline === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTimeline(t.id)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-red-950/50 border-red-500 text-red-300 ring-1 ring-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        : 'bg-zinc-950/70 border-white/10 text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <h4 className="font-semibold text-sm text-white">{t.label}</h4>
                      <span className="text-[10px] font-mono text-zinc-400">{t.badge}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-red-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Feature Modules */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold block mb-3">
              3. Include Feature Modules
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {featureOptions.map(f => {
                const isChecked = selectedFeatures.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFeature(f.id)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-zinc-900 border-red-500/60 text-white shadow-sm'
                        : 'bg-zinc-950/60 border-white/10 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="pr-2">
                      <p className="text-xs font-medium text-white leading-tight">{f.label}</p>
                      <span className="text-[10px] text-zinc-500 font-mono">{f.costNote}</span>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-gradient-to-r from-red-600 to-rose-600 border-red-500 text-white' : 'border-zinc-700'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary & Dispatch Button */}
          <div className="p-6 rounded-2xl bg-zinc-950/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-red-400 font-bold mb-0.5">READY FOR INSTANT DISPATCH</div>
              <h4 className="font-heading font-bold text-white text-base">
                {getServiceLabel()} • {selectedFeatures.length} Features Selected
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Sends directly to <strong className="text-white font-mono">0794410997</strong> via WhatsApp with formatted specification.
              </p>
            </div>

            <a
              id="estimator-whatsapp-send"
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-xs bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send Scope to WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
