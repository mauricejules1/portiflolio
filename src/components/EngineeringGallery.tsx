import React, { useState } from 'react';
import { GALLERY_ITEMS, PERSONAL_INFO } from '../data/portfolioData';
import { GalleryItem } from '../types';
import { 
  Camera, 
  Eye, 
  X, 
  Layers, 
  Cpu, 
  Radio, 
  Activity, 
  Network, 
  MessageSquare,
  Maximize2
} from 'lucide-react';

export const EngineeringGallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filterCategories = [
    { id: 'all', label: 'All Photos' },
    { id: 'Embedded Hardware', label: 'Embedded Circuits' },
    { id: 'Computer Architecture', label: 'CPU & Silicon' },
    { id: 'Lab Diagnostics', label: 'Diagnostics & Oscilloscope' },
    { id: 'Networking & OS', label: 'Networking & Servers' },
    { id: 'IoT Deployment', label: 'Field Deployments' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(item => 
    selectedFilter === 'all' || item.category === selectedFilter
  );

  return (
    <section id="gallery" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono mb-3">
            <Camera className="w-3.5 h-3.5 text-red-400" />
            <span>VISUAL PORTFOLIO & WORKBENCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white">
            Hardware & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-orange-400">Engineering Gallery</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mt-3 text-sm sm:text-base">
            Sample photographs from the laboratory workbench, microarchitecture research, sensor circuit breadboards, and Rwandan tech field trials.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
                selectedFilter === cat.id
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-[#0d090d]/80 backdrop-blur-xl border border-white/10 hover:border-red-500/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-zinc-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d090d] via-[#0d090d]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                
                {/* Top Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-red-400 border border-red-500/30">
                    {item.category}
                  </span>
                </div>

                {/* Hover View Action */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-xl bg-black/80 backdrop-blur-md text-white border border-white/20">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content overlay */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <h3 className="font-heading font-bold text-white text-base leading-tight group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Tag footer */}
              <div className="p-3 bg-zinc-950/90 flex flex-wrap items-center gap-1.5 border-t border-white/10">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-400 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Full Image Lightbox Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0d090d] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl relative">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs font-mono text-red-400 uppercase tracking-wide">
                    {activeItem.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900 border border-white/10 text-xs cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Image */}
              <div className="rounded-2xl overflow-hidden bg-zinc-950 border border-white/10">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[450px] object-cover"
                />
              </div>

              {/* Description & Technical Info */}
              <div className="space-y-3">
                <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/80 p-4 rounded-2xl border border-white/10">
                  {activeItem.caption}
                </p>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-zinc-400 font-mono mr-2">Tags:</span>
                  {activeItem.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-950 text-orange-400 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`https://wa.me/${PERSONAL_INFO.whatsappNumber.replace('+', '')}?text=Hello%20MUHIRE%20Jules,%20I%20saw%20your%20engineering%20gallery%20photo%20"${encodeURIComponent(activeItem.title)}"%20and%20want%20to%20collaborate`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 cursor-pointer"
                >
                  Close Photo
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
