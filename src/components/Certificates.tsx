import React, { useState } from 'react';
import { Award, ExternalLink, Calendar, Building2, Plus, Eye, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificateItem } from '../types';

export const Certificates: React.FC = () => {
  const { certificates, isAdminAuthenticated, setIsAdminModalOpen } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certificates" className="py-24 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00eeff]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00eeff]/10 border border-[#00eeff]/30 text-[#00eeff] text-xs font-mono tracking-wider uppercase mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Learning & Achievements</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Certificates & <span className="text-[#00eeff] text-glow">Achievements</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg">
          Credentials, practical lab verifications, and milestones earned through focused learning in Computer Systems.
        </p>
      </div>

      {/* Certificate Grid or Clean Empty State */}
      {certificates && certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-[#0b1e30]/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 hover:border-[#00eeff]/50 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-xl hover:shadow-[#00eeff]/10"
            >
              {/* Image Preview Container */}
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
                      // Fallback if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1e30] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00eeff] text-[#081b29] text-xs font-semibold shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      View Certificate
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-28 w-full bg-gradient-to-br from-[#00eeff]/10 to-blue-600/10 flex items-center justify-center border-b border-zinc-800">
                  <Award className="w-10 h-10 text-[#00eeff]/60" />
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2.5">
                    <div className="flex items-center gap-1.5 text-[#00eeff]">
                      <Building2 className="w-3.5 h-3.5" />
                      <span className="font-medium">{cert.issuer}</span>
                    </div>
                    {cert.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{cert.date}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#00eeff] transition-colors mb-2">
                    {cert.title}
                  </h3>

                  {cert.description && (
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
                  {cert.imageUrl ? (
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#00eeff] hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview Image
                    </button>
                  ) : <span />}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 px-2.5 py-1 rounded-md transition-colors"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Clean Empty State */
        <div className="text-center py-16 px-6 rounded-2xl bg-[#0b1e30]/40 border border-dashed border-zinc-800 max-w-xl mx-auto relative z-10">
          <Award className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Certificates Coming Soon</h3>
          <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
            Certificates and course credentials will be displayed here as they are earned and uploaded.
          </p>
          {isAdminAuthenticated && (
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00eeff] text-[#081b29] text-sm font-semibold hover:shadow-lg hover:shadow-[#00eeff]/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Certificate in Admin Panel
            </button>
          )}
        </div>
      )}

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#0b1e30] border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{selectedCert.title}</h3>
                  <p className="text-xs sm:text-sm text-[#00eeff]">{selectedCert.issuer} {selectedCert.date ? `• ${selectedCert.date}` : ''}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image */}
              {selectedCert.imageUrl && (
                <div className="p-4 bg-zinc-950 flex items-center justify-center max-h-[60vh] overflow-hidden">
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[55vh] w-auto max-w-full object-contain rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Modal Footer Description */}
              {selectedCert.description && (
                <div className="p-4 sm:p-6 bg-[#0b1e30] border-t border-zinc-800 text-sm text-zinc-300">
                  {selectedCert.description}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
