import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  MessageSquare, 
  Search, 
  Cpu, 
  Radio, 
  Globe, 
  Network, 
  Layers, 
  CheckCircle2, 
  X, 
  ArrowUpRight
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects, personalInfo } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'systems', label: 'Systems & Architecture' },
    { id: 'embedded', label: 'Embedded IoT' },
    { id: 'web', label: 'Web Applications' },
    { id: 'networking', label: 'Networking' },
  ];

  const filteredProjects = projects.filter(project => {
    return selectedCategory === 'all' || project.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-20 sm:py-32 relative bg-[#081b29] bg-mirror-grid">
      
      {/* Ambient Neon Blue Background Light */}
      <div className="absolute top-1/2 right-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#00eeff]/8 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading: "Latest Project" */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight">
            Latest <span className="text-[#00eeff] [text-shadow:0_0_20px_#00eeff]">Project</span>
          </h2>
        </div>

        {/* Category Filter Pills - Scrollable on mobile */}
        <div className="flex items-center gap-2.5 pb-2 mb-8 sm:mb-12 overflow-x-auto justify-start sm:justify-center no-scrollbar px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'btn-neon-cyan'
                    : 'bg-[#0e263d]/80 text-zinc-300 hover:text-white border border-[#00eeff]/20 hover:border-[#00eeff]/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Project Grid with Hard Mirror Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="mirror-card-hard rounded-[28px] overflow-hidden group flex flex-col justify-between"
            >
              {/* Project Image Box with Hover Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0c2236]">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#00eeff]/60">
                    <FolderGit2 className="w-12 h-12" />
                  </div>
                )}

                {/* Dark Blue Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081b29] via-transparent to-transparent opacity-80" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#081b29]/90 border border-[#00eeff]/40 text-[10px] font-mono text-[#00eeff] font-bold uppercase tracking-wider">
                  {project.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-[#00eeff] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-2 border-t border-[#00eeff]/15 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-full bg-[#0e263d] text-zinc-300 text-[10px] font-mono border border-[#00eeff]/20">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions: View Details + GitHub + Live Link */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-xs font-bold text-[#00eeff] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-[#0e263d] text-zinc-300 hover:text-[#00eeff] border border-[#00eeff]/20 transition-colors"
                          title="GitHub Source"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-[#0e263d] text-zinc-300 hover:text-[#00eeff] border border-[#00eeff]/20 transition-colors"
                          title="Live Preview"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0b1e30] border-2 border-[#00eeff]/40 rounded-[32px] shadow-[0_0_50px_rgba(0,238,255,0.3)] flex flex-col overflow-hidden text-zinc-100">
              
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-6 border-b border-[#00eeff]/20 bg-[#081b29]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#0e263d] border border-[#00eeff]/30 text-[#00eeff]">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-white text-lg sm:text-xl truncate max-w-md">
                      {activeModalProject.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#00eeff]">{activeModalProject.category.toUpperCase()} SPECIFICATION</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-xl bg-[#0e263d] text-zinc-300 hover:text-white border border-[#00eeff]/20 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {activeModalProject.imageUrl && (
                  <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-[#00eeff]/30">
                    <img
                      src={activeModalProject.imageUrl}
                      alt={activeModalProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-[#00eeff] font-bold uppercase">Overview</h4>
                  <p className="text-zinc-200 text-sm leading-relaxed">
                    {activeModalProject.longDescription || activeModalProject.description}
                  </p>
                </div>

                {activeModalProject.keyFeatures && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-[#00eeff] font-bold uppercase">Features & Architecture</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalProject.keyFeatures.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-[#081b29] border border-[#00eeff]/20 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-[#00eeff] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[#00eeff]/20 flex justify-end">
                  <a
                    href={`https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20MUHIRE%20Jules,%20I%20am%20interested%20in%20your%20project:%20${encodeURIComponent(activeModalProject.title)}`}
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
          </div>
        )}

      </div>
    </section>
  );
};
