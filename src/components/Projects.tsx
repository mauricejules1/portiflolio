import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, CertificateItem } from '../types';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  X, 
  ArrowUpRight,
  Sparkles,
  Award,
  ShieldCheck,
  Calendar,
  Building2,
  Eye,
  Download,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Projects: React.FC = () => {
  const { 
    projects, 
    certificates, 
    personalInfo, 
    isAdminAuthenticated, 
    setIsAdminModalOpen 
  } = usePortfolio();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Practical Projects' },
    { id: 'hardware', label: 'Hardware & Assembly' },
    { id: 'networking', label: 'Networking' },
    { id: 'web', label: 'Web Development' },
    { id: 'maintenance', label: 'IT & Maintenance' },
  ];

  const filteredProjects = projects.filter(project => {
    return selectedCategory === 'all' || project.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 relative bg-[#081b29] overflow-hidden">
      
      {/* Background Ambient Glows & Floating Mirror Prisms */}
      <div className="absolute top-1/4 right-1/4 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#00eeff]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#d946ef]/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Mirror Geometry */}
      <div className="absolute top-16 left-8 w-12 h-12 rounded-xl bg-white/5 border border-[#00eeff]/30 backdrop-blur-md rotate-12 animate-mirror-float pointer-events-none shadow-[0_0_20px_rgba(0,238,255,0.15)]" />
      <div className="absolute bottom-24 right-10 w-16 h-16 rounded-2xl bg-white/5 border border-[#10b981]/30 backdrop-blur-md -rotate-6 animate-mirror-float [animation-delay:2.5s] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* PART 1: PRACTICAL PROJECTS SHOWCASE */}
        {/* ========================================================================= */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00eeff]/10 border border-[#00eeff]/40 text-[#00eeff] text-xs font-mono tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(0,238,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hands-on Practice & Technical Labs</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Practical <span className="text-[#00eeff] [text-shadow:0_0_20px_#00eeff]">Projects</span>
          </h2>
          <p className="text-zinc-300 max-w-xl mx-auto text-sm sm:text-base mt-2 font-medium">
            Real hardware installations, network setups, maintenance routines, and web development builds.
          </p>
        </div>

        {/* Category Filter Pills & Quick Certificate Jump */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2 mb-8 sm:mb-10 px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#00eeff] text-[#081b29] font-bold shadow-md shadow-[#00eeff]/30'
                    : 'bg-[#0c2236] text-zinc-300 hover:text-white border border-zinc-700 hover:border-[#00eeff]/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          <a
            href="#verified-certificates"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-900/60 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Certificates ({certificates?.length || 0})</span>
          </a>
        </div>

        {/* Projects Grid or Clean Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#0c2236]/90 backdrop-blur-xl rounded-2xl border border-[#00eeff]/30 hover:border-[#00eeff] transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_12px_40px_rgba(0,238,255,0.2)]"
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
                    <div className="w-full h-full flex items-center justify-center text-[#00eeff]/60 bg-[#081b29]">
                      <FolderGit2 className="w-12 h-12" />
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2236] via-transparent to-transparent opacity-85" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#081b29]/95 border border-[#00eeff]/40 text-[10px] font-mono text-[#00eeff] font-bold uppercase tracking-wider shadow-sm">
                    {project.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
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
                  <div className="pt-3 border-t border-zinc-800/80 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[#081b29] text-zinc-200 text-[10px] font-mono border border-zinc-700">
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
                            className="p-2 rounded-lg bg-[#081b29] text-zinc-300 hover:text-[#00eeff] border border-zinc-700 hover:border-[#00eeff]/40 transition-colors"
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
                            className="p-2 rounded-lg bg-[#081b29] text-zinc-300 hover:text-[#00eeff] border border-zinc-700 hover:border-[#00eeff]/40 transition-colors"
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
          /* Clean Empty State for Projects */
          <div className="text-center py-16 px-6 rounded-2xl bg-[#0c2236]/60 border border-dashed border-zinc-700 max-w-xl mx-auto">
            <FolderGit2 className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Projects in this category coming soon</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              Practical lab builds and project repositories will appear here as they are added.
            </p>
            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="btn-neon-cyan px-5 py-2.5 rounded-xl text-xs uppercase font-bold inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project in Admin</span>
              </button>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PART 2: DEDICATED SEPARATED CERTIFICATES & CREDENTIALS SUB-SECTION */}
        {/* ========================================================================= */}
        <div id="verified-certificates" className="mt-24 pt-16 border-t-2 border-[#00eeff]/20 relative scroll-mt-24">
          
          {/* Glowing Top Divider Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-1.5 rounded-full bg-[#081b29] border border-[#00eeff]/60 shadow-[0_0_20px_rgba(0,238,255,0.4)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00eeff]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#00eeff] uppercase">
              Accredited Credentials & Certificates
            </span>
          </div>

          <div className="text-center mb-12 sm:mb-14 mt-4">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Verified <span className="text-[#00eeff] [text-shadow:0_0_20px_#00eeff]">Certifications</span> & Credentials
            </h3>
            <p className="text-zinc-300 max-w-2xl mx-auto text-xs sm:text-sm mt-2 font-medium">
              Official certificates, course completions, and practical technical credentials validating skills in computer systems, networking, hardware, and software.
            </p>
          </div>

          {/* Certificate Cards Grid */}
          {certificates && certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {certificates.map((cert, index) => (
                <div
                  key={cert.id || index}
                  className="group bg-[#0c2236]/90 backdrop-blur-xl rounded-2xl border border-emerald-500/30 hover:border-[#00eeff] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_12px_40px_rgba(0,238,255,0.25)]"
                >
                  {/* Certificate Image Box */}
                  {cert.imageUrl ? (
                    <div 
                      onClick={() => setSelectedCert(cert)}
                      className="relative h-48 w-full overflow-hidden bg-zinc-900 cursor-pointer group-hover:opacity-95 transition-opacity"
                    >
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c2236] via-transparent to-transparent opacity-85" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#00eeff] text-[#081b29] text-xs font-bold shadow-[0_0_15px_#00eeff]">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Certificate</span>
                        </span>
                      </div>

                      {/* Verified Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#081b29]/95 border border-emerald-500/50 text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Verified Credential</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-28 w-full bg-gradient-to-br from-[#0c2236] to-[#081b29] flex items-center justify-center border-b border-zinc-800">
                      <Award className="w-10 h-10 text-[#00eeff]/70" />
                    </div>
                  )}

                  {/* Card Details */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
                        <div className="flex items-center gap-1.5 text-[#00eeff] font-semibold">
                          <Building2 className="w-3.5 h-3.5 text-[#00eeff]" />
                          <span className="truncate max-w-[160px]">{cert.issuer}</span>
                        </div>
                        {cert.date && (
                          <div className="flex items-center gap-1 text-zinc-300">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{cert.date}</span>
                          </div>
                        )}
                      </div>

                      <h4 
                        onClick={() => setSelectedCert(cert)}
                        className="text-base sm:text-lg font-bold text-white group-hover:text-[#00eeff] transition-colors cursor-pointer mb-2 line-clamp-2"
                      >
                        {cert.title}
                      </h4>

                      {cert.description && (
                        <p className="text-zinc-300 text-xs leading-relaxed line-clamp-3">
                          {cert.description}
                        </p>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                      {cert.imageUrl ? (
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#00eeff] hover:underline cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview Image</span>
                        </button>
                      ) : <span />}

                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#081b29] hover:bg-[#00eeff] hover:text-[#081b29] border border-zinc-700 hover:border-[#00eeff] px-3 py-1.5 rounded-xl transition-all shadow-sm"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Document Verified</span>
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            /* Clean Empty State for Certificates */
            <div className="text-center py-14 px-6 rounded-2xl bg-[#0c2236]/60 border border-dashed border-zinc-700 max-w-xl mx-auto">
              <Award className="w-12 h-12 text-[#00eeff]/50 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-1.5">Certificates & Credentials</h4>
              <p className="text-zinc-300 text-xs max-w-md mx-auto mb-5 leading-relaxed">
                Academic and industry certifications will be displayed here as credentials are earned and uploaded.
              </p>
              {isAdminAuthenticated && (
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(true)}
                  className="btn-neon-cyan px-5 py-2.5 rounded-xl text-xs uppercase font-bold inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certificate in Admin</span>
                </button>
              )}
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* MODAL 1: PROJECT DETAILS MODAL LIGHTBOX */}
        {/* ========================================================================= */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c2236] border border-[#00eeff]/50 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,238,255,0.3)] flex flex-col overflow-hidden text-zinc-100">
              
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-[#081b29]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#00eeff]/10 border border-[#00eeff]/40 text-[#00eeff]">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg truncate max-w-md">
                      {activeModalProject.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#00eeff] uppercase font-bold">{activeModalProject.category} PROJECT</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {activeModalProject.imageUrl && (
                  <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-zinc-700 shadow-md">
                    <img
                      src={activeModalProject.imageUrl}
                      alt={activeModalProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-[#00eeff] font-semibold uppercase tracking-wider">Project Overview</h4>
                  <p className="text-zinc-200 text-sm leading-relaxed">
                    {activeModalProject.longDescription || activeModalProject.description}
                  </p>
                </div>

                {activeModalProject.keyFeatures && activeModalProject.keyFeatures.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-[#00eeff] font-semibold uppercase tracking-wider">Key Features & Objectives</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalProject.keyFeatures.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-[#081b29] border border-zinc-800 text-xs text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-[#00eeff] font-semibold uppercase tracking-wider">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.technologies.map((t, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-[#081b29] border border-zinc-700 text-xs font-mono text-zinc-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {activeModalProject.githubUrl && (
                      <a
                        href={activeModalProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#081b29] text-white border border-zinc-700 hover:border-[#00eeff] text-xs font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {activeModalProject.liveUrl && (
                      <a
                        href={activeModalProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#081b29] text-white border border-zinc-700 hover:border-[#00eeff] text-xs font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)},%20I%20saw%20your%20project:%20${encodeURIComponent(activeModalProject.title)}`}
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

        {/* ========================================================================= */}
        {/* MODAL 2: FULL CERTIFICATE LIGHTBOX PREVIEW */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-[#0c2236] border border-[#00eeff]/60 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(0,238,255,0.4)] flex flex-col max-h-[92vh]"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-[#081b29]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-[#00eeff] text-[#081b29] flex items-center justify-center font-bold shadow-[0_0_12px_rgba(0,238,255,0.4)]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg truncate max-w-lg">
                        {selectedCert.title}
                      </h4>
                      <p className="text-xs font-mono text-[#00eeff]">
                        Issued by <strong className="text-white font-semibold">{selectedCert.issuer}</strong> {selectedCert.date ? `• ${selectedCert.date}` : ''}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Image Display */}
                <div className="p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-center space-y-4">
                  {selectedCert.imageUrl ? (
                    <div className="max-h-[60vh] w-auto rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl bg-black">
                      <img
                        src={selectedCert.imageUrl}
                        alt={selectedCert.title}
                        referrerPolicy="no-referrer"
                        className="max-h-[60vh] w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className="p-12 text-center text-zinc-400">
                      <Award className="w-16 h-16 text-[#00eeff]/50 mx-auto mb-3" />
                      <p className="text-sm">No certificate image preview available.</p>
                    </div>
                  )}

                  {selectedCert.description && (
                    <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl text-center leading-relaxed">
                      {selectedCert.description}
                    </p>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-zinc-800 bg-[#081b29] flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Official Qualification Record</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedCert.imageUrl && (
                      <a
                        href={selectedCert.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={`${selectedCert.title.replace(/\s+/g, '_')}_Certificate`}
                        className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Image</span>
                      </a>
                    )}

                    {selectedCert.credentialUrl && (
                      <a
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-neon-cyan px-5 py-2 rounded-xl text-xs uppercase font-bold flex items-center gap-1.5"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
