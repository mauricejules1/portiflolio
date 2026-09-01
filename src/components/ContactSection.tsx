import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Copy, 
  Sparkles,
  Instagram,
  Facebook
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { personalInfo } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [rwandaTime, setRwandaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Africa/Kigali',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setRwandaTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (type: 'phone' | 'email') => {
    if (type === 'phone') {
      navigator.clipboard.writeText(personalInfo.whatsappNumber);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00eeff', '#25D366', '#d946ef', '#1877F2', '#ffffff']
    });
  };

  const handleSendViaWhatsApp = () => {
    const text = `Hello ${personalInfo.name}! My name is ${formData.name || 'a visitor'}.
Email: ${formData.email || 'N/A'}
Message: ${formData.message || 'I visited your portfolio and would like to get in touch!'}`;

    const url = `https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const whatsappDisplay = personalInfo.socials?.whatsappName || personalInfo.whatsappDisplay || personalInfo.whatsappNumber;
  const instagramDisplay = personalInfo.socials?.instagramName || "@muhire_jules";
  const facebookDisplay = personalInfo.socials?.facebookName || personalInfo.name;

  return (
    <section id="contact" className="py-20 sm:py-28 relative bg-[#081b29] overflow-hidden">
      
      {/* Deep Blue & Multi-Color Ambient Glows */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[450px] bg-[#00eeff]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-[#d946ef]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Mirror Prisms */}
      <div className="absolute top-20 left-12 w-12 h-12 rounded-xl bg-white/5 border border-[#00eeff]/30 backdrop-blur-md rotate-45 animate-mirror-float pointer-events-none" />
      <div className="absolute bottom-20 right-12 w-14 h-14 rounded-2xl bg-white/5 border border-[#25D366]/30 backdrop-blur-md -rotate-12 animate-mirror-float [animation-delay:3s] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading: "Contact Me" */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00eeff]/10 border border-[#00eeff]/40 text-[#00eeff] text-xs font-mono tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(0,238,255,0.2)]">
            <Sparkles className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="text-[#00eeff] [text-shadow:0_0_20px_#00eeff]">Me</span>
          </h2>
          <p className="text-zinc-300 max-w-xl mx-auto text-sm sm:text-base mt-2 font-medium">
            Have a question, technical project, or inquiry? Connect on WhatsApp, Instagram, Facebook, or send a direct message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Contact Channels */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            
            {/* WhatsApp Card */}
            <div className="bg-[#0c2236]/90 backdrop-blur-xl rounded-2xl border border-emerald-500/40 p-5 sm:p-6 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-[0_0_15px_rgba(37,211,102,0.6)]">
                    <MessageSquare className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">WhatsApp</h3>
                    <p className="text-xs text-emerald-400 font-mono font-medium">{whatsappDisplay}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('phone')}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={personalInfo.socials?.whatsapp || `https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-neon-cyan py-3 text-xs uppercase font-bold flex items-center justify-center gap-2 rounded-xl"
              >
                <MessageSquare className="w-4 h-4 fill-[#081b29]" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Instagram & Facebook Dual Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Instagram */}
              <a
                href={personalInfo.socials?.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#0c2236]/90 border border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(225,48,108,0.3)] transition-all flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(225,48,108,0.5)] group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-pink-400 font-bold uppercase">Instagram</div>
                  <div className="text-xs font-semibold text-white truncate">{instagramDisplay}</div>
                </div>
              </a>

              {/* Facebook */}
              <a
                href={personalInfo.socials?.facebook || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#0c2236]/90 border border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1877F2] to-[#3b82f6] text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(24,119,242,0.5)] group-hover:scale-105 transition-transform">
                  <Facebook className="w-5 h-5 fill-white stroke-none" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-sky-400 font-bold uppercase">Facebook</div>
                  <div className="text-xs font-semibold text-white truncate">{facebookDisplay}</div>
                </div>
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-[#0c2236]/90 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-5 sm:p-6 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Direct Email</h3>
                    <p className="text-xs text-amber-400 font-mono">Personal inbox</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('email')}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`mailto:${personalInfo.email}`}
                className="block p-3 rounded-xl bg-[#081b29] border border-zinc-700 font-mono text-xs sm:text-sm text-zinc-200 hover:text-[#00eeff] truncate"
              >
                {personalInfo.email}
              </a>
            </div>

            {/* Location & Time */}
            <div className="bg-[#0c2236]/90 backdrop-blur-xl rounded-2xl border border-zinc-700 p-5 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-1.5 text-[#00eeff] font-bold">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{personalInfo.location || "Rusizi, Rwanda"}</span>
                </span>
                <span>🇷🇼</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 pt-2 border-t border-zinc-700">
                <Clock className="w-4 h-4 text-[#00eeff] shrink-0" />
                <span className="truncate">Local Time: <strong className="text-white font-bold">{rwandaTime}</strong></span>
              </div>
            </div>

          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0c2236]/90 backdrop-blur-2xl rounded-3xl border border-[#00eeff]/30 p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00eeff] to-transparent shadow-[0_0_15px_#00eeff]" />
              
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#081b29] border-2 border-[#00eeff] flex items-center justify-center text-[#00eeff] mx-auto shadow-[0_0_20px_#00eeff]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Message Prepared!
                  </h3>
                  <p className="text-zinc-200 text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-[#00eeff]">{formData.name}</strong>. You can now transmit this message directly to WhatsApp or reset the form.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="btn-neon-cyan px-6 py-3 text-xs uppercase font-bold flex items-center gap-2 rounded-xl cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-[#081b29]" />
                      <span>Transmit via WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs cursor-pointer"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jean Paul"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-[#081b29] border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00eeff] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-[#081b29] border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00eeff] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-semibold">Your Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Type your message, project idea, or technical question..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-[#081b29] border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00eeff] resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-neon-cyan py-3.5 text-xs uppercase font-bold flex items-center justify-center gap-2 rounded-xl cursor-pointer"
                  >
                    <Send className="w-4 h-4 fill-[#081b29]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
