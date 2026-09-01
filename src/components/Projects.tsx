import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  X, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects, personalInfo, isAdminAuthenticated, setIsAdminModalOpen } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'hardware', label: 'Hardware & Assembly' },
    { id: 'networking', label: 'Networking' },
    { id: 'web', label: 'Web Development' },
    { id: 'maintenance', label: 'IT & Maintenance' },
  ];

  const filteredProjects = projects.filter(project => {
    return selectedCategory === 'all' || project.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 relative bg-[#081b29]">
      
      {/* Ambient Neon Blue Background Light */}
      <div className="absolute top-1/2 right-1/4 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#00eeff]/6 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00eeff]/10 border border-[#00eeff]/30 text-[#00eeff] text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hands-on Practice & Builds</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            My <span className="text-[#00eeff] [text-shadow:0_0_15px_#00eeff]">Projects</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base mt-2">
            Real practical projects and technical labs demonstrating my hands-on Computer System skills.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 pb-2 mb-8 sm:mb-10 overflow-x-auto justify-start sm:justify-center no-scrollbar px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#00eeff] text-[#081b29] font-bold shadow-md shadow-[#00eeff]/20'
                    : 'bg-[#0b1e30] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid or Clean Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#0b1e30]/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 hover:border-[#00eeff]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:shadow-[#00eeff]/10"
              >
                {/* Project Image Box */}
                <div 
                  onClick={() => setActiveModalProject(project)}
                  className="relative aspect-[16/10] overflow-hidden bg-zinc-900 cursor-pointer"
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#00eeff]/60">
                      <FolderGit2 className="w-12 h-12" />
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1e30] via-transparent to-transparent opacity-80" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#081b29]/90 border border-[#00eeff]/30 text-[10px] font-mono text-[#00eeff] font-bold uppercase tracking-wider">
                    {project.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 
                      onClick={() => setActiveModalProject(project)}
                      className="text-lg font-bold text-white group-hover:text-[#00eeff] transition-colors cursor-pointer line-clamp-1"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="pt-3 border-t border-zinc-800 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[#081b29] text-zinc-300 text-[10px] font-mono border border-zinc-800">
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-mono">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions: View Details + GitHub + Live Link */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-bold text-[#00eeff] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-[#00eeff] border border-zinc-800 transition-colors"
                            title="GitHub Source"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-[#00eeff] border border-zinc-800 transition-colors"
                            title="Preview / Details"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="text-center py-16 px-6 rounded-2xl bg-[#0b1e30]/40 border border-dashed border-zinc-800 max-w-xl mx-auto">
            <FolderGit2 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Projects coming soon</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              Practical lab builds and project repositories will appear here.
            </p>
            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00eeff] text-[#081b29] text-sm font-semibold hover:shadow-lg hover:shadow-[#00eeff]/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Project in Admin Panel
              </button>
            )}
          </div>
        )}

        {/* Project Details Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0b1e30] border border-[#00eeff]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100">
              
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-[#081b29]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#0e263d] border border-[#00eeff]/30 text-[#00eeff]">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg truncate max-w-md">
                      {activeModalProject.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#00eeff]">{activeModalProject.category.toUpperCase()} PROJECT</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {activeModalProject.imageUrl && (
                  <div className="relative aspect-[16/8] rounded-xl overflow-hidden border border-zinc-800">
                    <img
                      src={activeModalProject.imageUrl}
                      alt={activeModalProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-[#00eeff] font-semibold uppercase">Project Overview</h4>
                  <p className="text-zinc-200 text-sm leading-relaxed">
                    {activeModalProject.longDescription || activeModalProject.description}
                  </p>
                </div>

                {activeModalProject.keyFeatures && activeModalProject.keyFeatures.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-[#00eeff] font-semibold uppercase">Key Features & Objectives</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalProject.keyFeatures.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#081b29] border border-zinc-800 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-[#00eeff] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-[#00eeff] font-semibold uppercase">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.technologies.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-[#081b29] border border-zinc-800 text-xs font-mono text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-end">
                  <a
                    href={`https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20MUHIRE%20JULES,%20I%20saw%20your%20project:%20${encodeURIComponent(activeModalProject.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon-cyan px-5 py-2.5 text-xs font-bold flex items-center gap-2 rounded-xl"
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
