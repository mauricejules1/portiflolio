import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ServiceItem } from '../types';
import { 
  Code, 
  Crop, 
  Apple, 
  Cpu, 
  Radio, 
  Globe, 
  Network, 
  Wrench, 
  CheckCircle2, 
  MessageSquare, 
  X, 
  ArrowRight
} from 'lucide-react';

export const Services: React.FC = () => {
  const { services, personalInfo } = usePortfolio();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Map service icons to match Screenshot 3 style (e.g. </> code brackets, crop tool, apple/mobile device)
  const getServiceIcon = (index: number) => {
    switch (index % 3) {
      case 0:
        return <Code className="w-8 h-8 text-[#00eeff] [filter:drop-shadow(0_0_8px_#00eeff)]" />;
      case 1:
        return <Crop className="w-8 h-8 text-[#00eeff] [filter:drop-shadow(0_0_8px_#00eeff)]" />;
      case 2:
        return <Apple className="w-8 h-8 text-[#00eeff] [filter:drop-shadow(0_0_8px_#00eeff)]" />;
      default:
        return <Cpu className="w-8 h-8 text-[#00eeff]" />;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-32 relative bg-[#081b29] bg-mirror-grid">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[800px] h-[350px] sm:h-[500px] bg-[#00eeff]/8 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading: "My Services" (Screenshot 3) */}
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight">
            My <span className="text-[#00eeff] [text-shadow:0_0_20px_#00eeff]">Services</span>
          </h2>
        </div>

        {/* 3-Column Grid of Hard Blue Mirror Cards (Screenshot 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {services.slice(0, 3).map((service, index) => {
            return (
              <div
                key={service.id}
                className="mirror-card-hard rounded-[28px] p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 group min-h-[340px] sm:min-h-[380px]"
              >
                <div className="space-y-4 sm:space-y-6">
                  {/* Top Left Cyan Icon (Screenshot 3) */}
                  <div className="flex items-center">
                    {getServiceIcon(index)}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-3xl font-heading font-bold text-white tracking-wide group-hover:text-[#00eeff] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description text in clean legible color */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {service.shortDesc || service.fullDesc}
                  </p>
                </div>

                {/* Cyan Glowing Pill Button: "learn more" (Screenshot 3) */}
                <div className="pt-6 sm:pt-8">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="btn-neon-cyan px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-wider font-extrabold cursor-pointer"
                  >
                    learn more
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Services row if available */}
        {services.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-6 sm:mt-8">
            {services.slice(3).map((service, index) => (
              <div
                key={service.id}
                className="mirror-card-hard rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#081b29] border border-[#00eeff]/30 text-[#00eeff] shadow-[0_0_15px_rgba(0,238,255,0.3)]">
                      {index % 2 === 0 ? <Network className="w-6 h-6" /> : <Wrench className="w-6 h-6" />}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-heading font-bold text-white group-hover:text-[#00eeff] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="btn-neon-cyan px-6 py-2.5 text-xs uppercase tracking-wider font-bold cursor-pointer"
                  >
                    learn more
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive "Learn More" Service Details Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-[#0b1e30] border-2 border-[#00eeff]/50 rounded-[32px] shadow-[0_0_50px_rgba(0,238,255,0.3)] p-6 sm:p-8 text-zinc-100 space-y-6">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#00eeff]/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#081b29] border border-[#00eeff]/40 text-[#00eeff]">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-heading font-black text-white">{selectedService.title}</h3>
                    <p className="text-xs font-mono text-[#00eeff]">Service Specification</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-xl bg-[#081b29] border border-[#00eeff]/30 text-zinc-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-zinc-200">
                <p>{selectedService.fullDesc}</p>

                {selectedService.deliverables && selectedService.deliverables.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#00eeff] font-bold">Key Deliverables:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedService.deliverables.map((d, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-[#081b29]/80 border border-[#00eeff]/20 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-[#00eeff] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Inquire on WhatsApp */}
              <div className="pt-4 border-t border-[#00eeff]/20 flex justify-end">
                <a
                  href={`https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)},%20I%20would%20like%20to%20learn%20more%20about%20your%20service:%20${encodeURIComponent(selectedService.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon-cyan px-6 py-3 text-xs uppercase font-bold flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-[#081b29]" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
