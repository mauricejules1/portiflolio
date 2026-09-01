import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Copy, 
  Github, 
  Linkedin, 
  Twitter 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { personalInfo } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
      colors: ['#00eeff', '#0077ff', '#ffffff']
    });
  };

  const handleSendViaWhatsApp = () => {
    const text = `Hello ${personalInfo.name}! My name is ${formData.name || 'a visitor'}.
Email: ${formData.email || 'N/A'}
Phone: ${formData.phone || 'N/A'}
Subject: ${formData.subject || 'Portfolio Inquiry'}
Message: ${formData.message || 'I would like to discuss a project with you!'}`;

    const url = `https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-20 sm:py-32 relative bg-[#081b29] bg-mirror-grid">
      
      {/* Deep Blue Ambient Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[500px] bg-[#00eeff]/8 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading: "Contact Me" */}
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight">
            Contact <span className="text-[#00eeff] [text-shadow:0_0_20px_#00eeff]">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT: Contact Channels */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* WhatsApp Card */}
            <div className="mirror-card-hard rounded-[28px] p-5 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#081b29] border border-[#00eeff]/40 text-[#00eeff] shadow-[0_0_15px_rgba(0,238,255,0.3)]">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg">WhatsApp</h3>
                    <p className="text-xs text-[#00eeff]">Direct line & fast replies</p>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy('phone')}
                  className="p-2 rounded-xl bg-[#081b29] hover:bg-[#0e263d] text-zinc-300 hover:text-white border border-[#00eeff]/20 cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#081b29]/90 border border-[#00eeff]/20 font-mono text-xs sm:text-sm font-bold text-white flex justify-between items-center">
                <span className="truncate">{personalInfo.whatsappDisplay || personalInfo.whatsappNumber}</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 shrink-0 ml-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </span>
              </div>

              <a
                href={`https://wa.me/${personalInfo.whatsappNumber.replace('+', '')}?text=Hello%20${encodeURIComponent(personalInfo.name)},%20I%20visited%20your%20portfolio!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-neon-cyan py-3 text-xs uppercase font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-[#081b29]" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Email Card */}
            <div className="mirror-card-hard rounded-[28px] p-5 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#081b29] border border-[#00eeff]/40 text-[#00eeff]">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg">Email Address</h3>
                    <p className="text-xs text-zinc-400">Formal inquiries</p>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy('email')}
                  className="p-2 rounded-xl bg-[#081b29] hover:bg-[#0e263d] text-zinc-300 hover:text-white border border-[#00eeff]/20 cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`mailto:${personalInfo.email}`}
                className="block p-3.5 rounded-2xl bg-[#081b29]/90 border border-[#00eeff]/20 font-mono text-xs sm:text-sm text-zinc-200 hover:text-[#00eeff] truncate"
              >
                {personalInfo.email}
              </a>
            </div>

            {/* Location & Time */}
            <div className="mirror-card-hard rounded-[28px] p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-[#00eeff]">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{personalInfo.location}</span>
                </span>
                <span>🇷🇼</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 pt-1 border-t border-[#00eeff]/10">
                <Clock className="w-4 h-4 text-[#00eeff] shrink-0" />
                <span className="truncate">Rwanda Time: <strong className="text-white font-bold">{rwandaTime}</strong></span>
              </div>
            </div>

          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7">
            <div className="mirror-card-hard rounded-[28px] sm:rounded-[32px] p-6 sm:p-10">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#081b29] border-2 border-[#00eeff] flex items-center justify-center text-[#00eeff] mx-auto shadow-[0_0_25px_#00eeff]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-black text-white">
                    Message Ready!
                  </h3>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-[#00eeff]">{formData.name}</strong>. Send this directly to WhatsApp or reset the form.
                  </p>
                  <div className="flex justify-center gap-3 pt-4">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="btn-neon-cyan px-7 py-3 text-xs uppercase font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-[#081b29]" />
                      <span>Transmit via WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 rounded-full bg-[#081b29] text-zinc-300 hover:text-white border border-[#00eeff]/30 text-xs cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-[#081b29] border border-[#00eeff]/30 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_rgba(0,238,255,0.3)] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-[#081b29] border border-[#00eeff]/30 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_rgba(0,238,255,0.3)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">Phone / WhatsApp</label>
                      <input
                        type="text"
                        placeholder="+250..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-[#081b29] border border-[#00eeff]/30 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_rgba(0,238,255,0.3)] font-mono transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">Subject</label>
                      <input
                        type="text"
                        placeholder="Project Discussion"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-[#081b29] border border-[#00eeff]/30 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_rgba(0,238,255,0.3)] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">Your Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Type your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-[#081b29] border border-[#00eeff]/30 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_rgba(0,238,255,0.3)] resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-neon-cyan py-4 text-sm uppercase font-bold flex items-center justify-center gap-2 cursor-pointer"
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
