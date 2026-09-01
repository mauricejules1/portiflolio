import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ShieldCheck, 
  X, 
  User, 
  FileText, 
  Cpu, 
  FolderGit2, 
  Mail, 
  Share2, 
  Image as ImageIcon, 
  Save, 
  RefreshCcw, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Sliders,
  ExternalLink,
  Sparkles,
  Layers,
  Wrench,
  Link,
  HelpCircle,
  Copy,
  Briefcase
} from 'lucide-react';
import { SkillCategory, SkillItem, Project, ServiceItem, GalleryItem } from '../types';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin,
    personalInfo,
    updatePersonalInfo,
    updateSocials,
    updateTechnicalSkills,
    updateProfessionalSkills,
    skillCategories,
    addSkillCategory,
    editSkillCategory,
    deleteSkillCategory,
    addSkill,
    editSkill,
    deleteSkill,
    projects,
    addProject,
    editProject,
    deleteProject,
    services,
    addService,
    editService,
    deleteService,
    galleryItems,
    addGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
    exportBackup,
    importBackup
  } = usePortfolio();

  // Authentication State
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'profile' | 'logo' | 'hero' | 'about' | 'skills' | 'services' | 'projects' | 'media' | 'contact' | 'system'
  >('profile');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Form Buffer
  const [profileForm, setProfileForm] = useState(personalInfo);

  // Service Editor State
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({
    title: '',
    shortDesc: '',
    fullDesc: '',
    icon: 'code',
    deliverables: []
  });
  const [newDeliverableInput, setNewDeliverableInput] = useState('');

  // Project Editor State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    category: 'systems',
    description: '',
    longDescription: '',
    technologies: [],
    keyFeatures: [],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: true,
    date: new Date().getFullYear().toString()
  });
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  // Technical Skill State
  const [techSkillForm, setTechSkillForm] = useState({
    name: '',
    level: 90,
    iconColor: 'text-[#00eeff]',
    iconText: 'JS'
  });

  // Professional Skill State
  const [profSkillForm, setProfSkillForm] = useState({
    name: '',
    percentage: 85
  });

  // Checklist Item State (for About section)
  const [newChecklistInput, setNewChecklistInput] = useState('');

  // Typing Tag State (for Hero section)
  const [newTagInput, setNewTagInput] = useState('');

  // Media Manager quick upload state
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaCategory, setMediaCategory] = useState<'project' | 'portrait' | 'certificate' | 'logo'>('project');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');

    const success = await loginAdmin(passwordInput);
    setIsAuthenticating(false);

    if (success) {
      setPasswordInput('');
      setProfileForm(personalInfo);
      showToast('Admin access unlocked successfully');
    } else {
      setAuthError('Incorrect security key. Access denied.');
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(profileForm);
    showToast('Profile settings saved successfully');
  };

  // Convert File to Base64 Image
  const handleGenericImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size is larger than 8MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onSuccess(result);
        showToast('Image uploaded and synced');
      };
      reader.readAsDataURL(file);
    }
  };

  // Export & Import Backup
  const handleExport = () => {
    const dataStr = exportBackup();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `muhire_jules_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Configuration backup exported');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const success = importBackup(content);
          if (success) {
            showToast('Portfolio configuration restored successfully');
          } else {
            alert('Failed to parse backup JSON file.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isAdminModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[70] flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#081b29] border border-[#00eeff]/80 text-[#00eeff] text-xs font-mono shadow-[0_0_25px_#00eeff] animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#00eeff]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full max-w-6xl h-[92vh] bg-[#081b29] border-2 border-[#00eeff]/50 rounded-[32px] shadow-[0_0_80px_rgba(0,238,255,0.35)] flex flex-col overflow-hidden text-zinc-100">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#00eeff]/20 bg-[#061521] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00eeff] via-[#0077ff] to-[#00eeff] p-[1.5px] shadow-[0_0_15px_#00eeff]">
              <div className="w-full h-full bg-[#081b29] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#00eeff]" />
              </div>
            </div>
            <div>
              <h2 className="font-heading font-black text-white text-sm sm:text-base flex items-center gap-2">
                <span>PORTFOLIO ADMIN CMS</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  isAdminAuthenticated 
                    ? 'bg-[#00eeff]/15 border-[#00eeff]/50 text-[#00eeff]' 
                    : 'bg-rose-950 border-rose-500/30 text-rose-400'
                }`}>
                  {isAdminAuthenticated ? 'UNLOCKED / ACTIVE' : 'LOCKED'}
                </span>
              </h2>
              <p className="text-[11px] text-zinc-400 font-mono hidden sm:block">
                Direct Content Management System for MUHIRE JULES
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  logoutAdmin();
                  showToast('Logged out of admin session');
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c2236] hover:bg-[#12304d] text-zinc-300 text-xs border border-[#00eeff]/20 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>Lock Session</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 rounded-xl bg-[#0c2236] hover:bg-[#12304d] text-zinc-400 hover:text-white border border-[#00eeff]/20 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Locked Login Screen */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md p-8 rounded-3xl bg-[#0b1e30] border border-[#00eeff]/40 shadow-[0_0_40px_rgba(0,238,255,0.2)] space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#081b29] border-2 border-[#00eeff] flex items-center justify-center text-[#00eeff] shadow-[0_0_25px_#00eeff]">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-heading font-black text-white">Administrator Access</h3>
                <p className="text-xs text-zinc-400">
                  Enter your secure portfolio administration key to edit content.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter admin password..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    className="w-full p-3.5 rounded-2xl bg-[#081b29] border border-[#00eeff]/40 text-white placeholder-zinc-500 focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_#00eeff] text-sm font-mono text-center tracking-widest transition-all"
                  />
                </div>

                {authError && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full btn-neon-cyan py-3 text-xs uppercase font-extrabold cursor-pointer"
                >
                  {isAuthenticating ? 'Verifying Key...' : 'Unlock Admin Panel'}
                </button>
              </form>

              <div className="pt-2 text-[11px] text-zinc-500 font-mono">
                Encrypted via SHA-256 Signature
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* AUTHENTICATED ADMIN DASHBOARD */
          /* ========================================================================= */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-[#00eeff]/20 bg-[#061521] p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible shrink-0 no-scrollbar">
              {[
                { id: 'profile', label: 'Profile Info', icon: User },
                { id: 'logo', label: 'Logo & Brand', icon: Sparkles },
                { id: 'hero', label: 'Home / Hero', icon: Eye },
                { id: 'about', label: 'About Me', icon: FileText },
                { id: 'skills', label: 'My Skills', icon: Cpu },
                { id: 'services', label: 'Services', icon: Wrench },
                { id: 'projects', label: 'Projects', icon: FolderGit2 },
                { id: 'media', label: 'Media & Photos', icon: ImageIcon },
                { id: 'contact', label: 'Contact & Socials', icon: Mail },
                { id: 'system', label: 'Backup & Reset', icon: Sliders },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'btn-neon-cyan'
                        : 'text-zinc-400 hover:text-white hover:bg-[#0c2236] border border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-[#081b29]">
              
              {/* ========================================================================= */}
              {/* TAB 1: PROFILE INFO */}
              {/* ========================================================================= */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileSave} className="space-y-6 max-w-3xl">
                  <div className="border-b border-[#00eeff]/20 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg">General Profile Information</h3>
                      <p className="text-xs text-zinc-400">Primary bio, name, titles, location and WhatsApp numbers.</p>
                    </div>
                    <button type="submit" className="btn-neon-cyan px-5 py-2 text-xs uppercase font-bold flex items-center gap-1.5">
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Primary Title / Role</label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Availability Status</label>
                      <input
                        type="text"
                        value={profileForm.availabilityStatus}
                        onChange={(e) => setProfileForm({ ...profileForm, availabilityStatus: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">WhatsApp Number (International format)</label>
                      <input
                        type="text"
                        value={profileForm.whatsappNumber}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsappNumber: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#00eeff] mb-1">Professional Bio</label>
                    <textarea
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#00eeff] mb-1">Resume / CV Document URL</label>
                    <input
                      type="text"
                      value={profileForm.resumeUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                    />
                  </div>
                </form>
              )}

              {/* ========================================================================= */}
              {/* TAB 2: LOGO & BRANDING MANAGEMENT */}
              {/* ========================================================================= */}
              {activeTab === 'logo' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-[#00eeff]/20 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg">Logo & Brand Customization</h3>
                      <p className="text-xs text-zinc-400">Upload or replace your custom logo, customize logo text, and preview live.</p>
                    </div>
                    <button
                      onClick={() => {
                        updatePersonalInfo(profileForm);
                        showToast('Logo settings saved');
                      }}
                      className="btn-neon-cyan px-5 py-2 text-xs uppercase font-bold flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Logo</span>
                    </button>
                  </div>

                  {/* Live Logo Preview Box */}
                  <div className="mirror-card-hard rounded-2xl p-6 space-y-4">
                    <h4 className="text-xs font-mono text-[#00eeff] uppercase font-bold">Live Navigation Bar Preview</h4>
                    <div className="p-4 rounded-xl bg-[#061521] border border-[#00eeff]/30 flex items-center justify-between">
                      {/* Logo Preview */}
                      <div className="flex items-center gap-3">
                        {profileForm.logoType !== 'text' && profileForm.customLogoUrl && (
                          <img
                            src={profileForm.customLogoUrl}
                            alt="Logo preview"
                            className="h-9 w-auto max-w-[140px] object-contain rounded-md"
                          />
                        )}
                        {profileForm.logoType !== 'image' && (
                          <span className="text-xl font-heading font-black tracking-wider text-white">
                            {profileForm.logoText || "MUHIRE"}
                            <span className="text-[#00eeff] [text-shadow:0_0_10px_#00eeff]">{profileForm.logoTextHighlight || "."}</span>
                          </span>
                        )}
                      </div>

                      {/* Mock nav pills */}
                      <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <span className="text-[#00eeff]">Home</span>
                        <span>About</span>
                        <span>Services</span>
                        <span>Skills</span>
                        <span>Projects</span>
                      </div>
                    </div>
                  </div>

                  {/* Logo Display Mode Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-[#00eeff]">Logo Display Format</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'text', label: 'Text Only' },
                        { id: 'image', label: 'Image Only' },
                        { id: 'both', label: 'Image + Text' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setProfileForm({ ...profileForm, logoType: opt.id as any });
                            updatePersonalInfo({ logoType: opt.id as any });
                          }}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            profileForm.logoType === opt.id
                              ? 'bg-[#00eeff]/20 border-[#00eeff] text-[#00eeff] shadow-[0_0_15px_rgba(0,238,255,0.3)]'
                              : 'bg-[#0c2236] border-[#00eeff]/20 text-zinc-300 hover:border-[#00eeff]/50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Logo Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Logo Text Brand</label>
                      <input
                        type="text"
                        value={profileForm.logoText || ''}
                        placeholder="MUHIRE"
                        onChange={(e) => {
                          setProfileForm({ ...profileForm, logoText: e.target.value });
                          updatePersonalInfo({ logoText: e.target.value });
                        }}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm font-heading font-black tracking-wide focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Text Suffix / Dot Highlight</label>
                      <input
                        type="text"
                        value={profileForm.logoTextHighlight || ''}
                        placeholder="."
                        onChange={(e) => {
                          setProfileForm({ ...profileForm, logoTextHighlight: e.target.value });
                          updatePersonalInfo({ logoTextHighlight: e.target.value });
                        }}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm font-heading font-black focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>
                  </div>

                  {/* Logo Image File Upload & URL */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono text-[#00eeff]">Logo Graphic Image (PNG, SVG, WebP, JPG)</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Image Preview / Placeholder */}
                      <div className="w-24 h-24 rounded-2xl bg-[#0c2236] border-2 border-dashed border-[#00eeff]/40 flex items-center justify-center overflow-hidden shrink-0">
                        {profileForm.customLogoUrl ? (
                          <img
                            src={profileForm.customLogoUrl}
                            alt="Custom Logo"
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <Sparkles className="w-8 h-8 text-[#00eeff]/40" />
                        )}
                      </div>

                      {/* Upload Controls */}
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex items-center gap-2">
                          <label className="btn-neon-cyan px-4 py-2 text-xs uppercase font-bold cursor-pointer flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleGenericImageUpload(e, (url) => {
                                setProfileForm(prev => ({ ...prev, customLogoUrl: url, logoType: 'both' }));
                                updatePersonalInfo({ customLogoUrl: url, logoType: 'both' });
                              })}
                            />
                          </label>

                          {profileForm.customLogoUrl && (
                            <button
                              type="button"
                              onClick={() => {
                                setProfileForm(prev => ({ ...prev, customLogoUrl: '', logoType: 'text' }));
                                updatePersonalInfo({ customLogoUrl: '', logoType: 'text' });
                                showToast('Logo image removed');
                              }}
                              className="px-4 py-2 rounded-xl bg-[#0c2236] border border-rose-500/40 text-rose-400 hover:bg-rose-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove Image</span>
                            </button>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Or paste direct image URL (https://...)"
                            value={profileForm.customLogoUrl || ''}
                            onChange={(e) => {
                              setProfileForm({ ...profileForm, customLogoUrl: e.target.value });
                              updatePersonalInfo({ customLogoUrl: e.target.value });
                            }}
                            className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono focus:outline-none focus:border-[#00eeff]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 3: HERO SECTION CUSTOMIZER */}
              {/* ========================================================================= */}
              {activeTab === 'hero' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-[#00eeff]/20 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg">Home / Hero Customizer</h3>
                      <p className="text-xs text-zinc-400">Control the animated typing titles, greeting, and hero portrait.</p>
                    </div>
                    <button
                      onClick={() => {
                        updatePersonalInfo(profileForm);
                        showToast('Hero settings saved');
                      }}
                      className="btn-neon-cyan px-5 py-2 text-xs uppercase font-bold flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Hero</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Greeting Text</label>
                      <input
                        type="text"
                        value={profileForm.heroGreeting || ''}
                        placeholder="Hello, It's Me"
                        onChange={(e) => setProfileForm({ ...profileForm, heroGreeting: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Typing Prefix Text</label>
                      <input
                        type="text"
                        value={profileForm.heroTypingPrefix || ''}
                        placeholder="And I'm a"
                        onChange={(e) => setProfileForm({ ...profileForm, heroTypingPrefix: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>
                  </div>

                  {/* Animated Typing Titles / Roles */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono text-[#00eeff]">Dynamic Typing Roles (Animated in Cyan)</label>
                    <div className="flex flex-wrap gap-2">
                      {(profileForm.heroRoles || ['Computer Systems Architect', 'Embedded & IoT Engineer', 'Full-Stack Developer', 'Hardware Designer']).map((role, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c2236] border border-[#00eeff]/40 text-[#00eeff] text-xs font-mono">
                          <span>{role}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newRoles = (profileForm.heroRoles || []).filter((_, i) => i !== idx);
                              setProfileForm({ ...profileForm, heroRoles: newRoles });
                              updatePersonalInfo({ heroRoles: newRoles });
                            }}
                            className="hover:text-rose-400 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add new typing role (e.g. RISC-V Designer)"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        className="flex-1 p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono focus:outline-none focus:border-[#00eeff]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newTagInput.trim()) {
                            const newRoles = [...(profileForm.heroRoles || []), newTagInput.trim()];
                            setProfileForm({ ...profileForm, heroRoles: newRoles });
                            updatePersonalInfo({ heroRoles: newRoles });
                            setNewTagInput('');
                            showToast('Role added to typing animation');
                          }
                        }}
                        className="btn-neon-cyan px-4 py-2 text-xs uppercase font-bold"
                      >
                        Add Role
                      </button>
                    </div>
                  </div>

                  {/* Hero Portrait Photo */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono text-[#00eeff]">Hero Portrait Photograph</label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#00eeff] to-[#0077ff] shrink-0">
                        <img
                          src={profileForm.portraitUrl || profileForm.avatarUrl}
                          alt="Hero Portrait"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <label className="btn-neon-cyan px-4 py-2 text-xs uppercase font-bold cursor-pointer flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Replace Portrait</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleGenericImageUpload(e, (url) => {
                                setProfileForm(prev => ({ ...prev, portraitUrl: url, avatarUrl: url }));
                                updatePersonalInfo({ portraitUrl: url, avatarUrl: url });
                              })}
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          placeholder="Or paste direct image URL"
                          value={profileForm.portraitUrl || ''}
                          onChange={(e) => {
                            setProfileForm({ ...profileForm, portraitUrl: e.target.value, avatarUrl: e.target.value });
                            updatePersonalInfo({ portraitUrl: e.target.value, avatarUrl: e.target.value });
                          }}
                          className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono focus:outline-none focus:border-[#00eeff]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 4: ABOUT ME SECTION */}
              {/* ========================================================================= */}
              {activeTab === 'about' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-[#00eeff]/20 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg">About Me Customizer</h3>
                      <p className="text-xs text-zinc-400">Edit biography, strengths checklist, quick stats cards and portrait.</p>
                    </div>
                    <button
                      onClick={() => {
                        updatePersonalInfo(profileForm);
                        showToast('About settings saved');
                      }}
                      className="btn-neon-cyan px-5 py-2 text-xs uppercase font-bold flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save About</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Section Title</label>
                      <input
                        type="text"
                        value={profileForm.aboutHeading || 'About Me'}
                        onChange={(e) => setProfileForm({ ...profileForm, aboutHeading: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={profileForm.aboutSubheading || 'Computer Systems & Embedded Engineer'}
                        onChange={(e) => setProfileForm({ ...profileForm, aboutSubheading: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>
                  </div>

                  {/* Strengths Checklist */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono text-[#00eeff]">Key Strengths Checklist</label>
                    <div className="space-y-2">
                      {(profileForm.aboutChecklist || [
                        "CPU & RISC-V Organization",
                        "ESP32 & IoT Telemetry Nodes",
                        "React, TypeScript & Tailwind CSS",
                        "Linux & TCP/IP Networking"
                      ]).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/20 text-xs">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#00eeff]" />
                            <span>{item}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newCheck = (profileForm.aboutChecklist || []).filter((_, i) => i !== idx);
                              setProfileForm({ ...profileForm, aboutChecklist: newCheck });
                              updatePersonalInfo({ aboutChecklist: newCheck });
                            }}
                            className="text-zinc-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add new checklist bullet (e.g. Distributed Cloud Systems)"
                        value={newChecklistInput}
                        onChange={(e) => setNewChecklistInput(e.target.value)}
                        className="flex-1 p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono focus:outline-none focus:border-[#00eeff]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newChecklistInput.trim()) {
                            const newCheck = [...(profileForm.aboutChecklist || []), newChecklistInput.trim()];
                            setProfileForm({ ...profileForm, aboutChecklist: newCheck });
                            updatePersonalInfo({ aboutChecklist: newCheck });
                            setNewChecklistInput('');
                            showToast('Checklist item added');
                          }
                        }}
                        className="btn-neon-cyan px-4 py-2 text-xs uppercase font-bold"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Stats Pills Management */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono text-[#00eeff]">Key Metric Cards</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {profileForm.stats.map((s, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 space-y-2">
                          <input
                            type="text"
                            value={s.value}
                            onChange={(e) => {
                              const newStats = [...profileForm.stats];
                              newStats[idx].value = e.target.value;
                              setProfileForm({ ...profileForm, stats: newStats });
                              updatePersonalInfo({ stats: newStats });
                            }}
                            className="w-full p-1.5 rounded-lg bg-[#081b29] border border-[#00eeff]/20 text-[#00eeff] text-center font-mono font-black text-sm"
                          />
                          <input
                            type="text"
                            value={s.label}
                            onChange={(e) => {
                              const newStats = [...profileForm.stats];
                              newStats[idx].label = e.target.value;
                              setProfileForm({ ...profileForm, stats: newStats });
                              updatePersonalInfo({ stats: newStats });
                            }}
                            className="w-full p-1 rounded-lg bg-[#081b29] border border-[#00eeff]/20 text-zinc-300 text-center font-mono text-[10px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 5: SKILLS MANAGEMENT */}
              {/* ========================================================================= */}
              {activeTab === 'skills' && (
                <div className="space-y-8 max-w-3xl">
                  <div className="border-b border-[#00eeff]/20 pb-3">
                    <h3 className="font-heading font-bold text-white text-lg">Skills Matrix Management</h3>
                    <p className="text-xs text-zinc-400">Manage technical horizontal progress bars and professional circular dials.</p>
                  </div>

                  {/* Technical Skills Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-heading font-bold text-[#00eeff] uppercase">Technical Skills (Left Column)</h4>
                    
                    <div className="space-y-2">
                      {(profileForm.technicalSkills || []).map((skill, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/20 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 flex-1">
                            <span className={`w-6 h-6 rounded bg-[#081b29] border border-[#00eeff]/40 flex items-center justify-center text-xs font-mono font-bold ${skill.iconColor}`}>
                              {skill.iconText || "•"}
                            </span>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => {
                                const newSkills = [...(profileForm.technicalSkills || [])];
                                newSkills[idx].name = e.target.value;
                                setProfileForm({ ...profileForm, technicalSkills: newSkills });
                                updateTechnicalSkills(newSkills);
                              }}
                              className="p-1 rounded bg-transparent text-white text-xs font-semibold focus:outline-none focus:bg-[#081b29]"
                            />
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={skill.level}
                                onChange={(e) => {
                                  const newSkills = [...(profileForm.technicalSkills || [])];
                                  newSkills[idx].level = parseInt(e.target.value) || 0;
                                  setProfileForm({ ...profileForm, technicalSkills: newSkills });
                                  updateTechnicalSkills(newSkills);
                                }}
                                className="w-14 p-1 rounded bg-[#081b29] border border-[#00eeff]/30 text-[#00eeff] text-xs font-mono font-bold text-center"
                              />
                              <span className="text-xs font-mono text-zinc-400">%</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const newSkills = (profileForm.technicalSkills || []).filter((_, i) => i !== idx);
                                setProfileForm({ ...profileForm, technicalSkills: newSkills });
                                updateTechnicalSkills(newSkills);
                              }}
                              className="text-zinc-400 hover:text-rose-400 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add New Technical Skill */}
                    <div className="p-3 rounded-xl bg-[#061521] border border-dashed border-[#00eeff]/30 flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        placeholder="Skill Name (e.g. Rust / Go)"
                        value={techSkillForm.name}
                        onChange={(e) => setTechSkillForm({ ...techSkillForm, name: e.target.value })}
                        className="flex-1 min-w-[140px] p-2 rounded-lg bg-[#081b29] border border-[#00eeff]/20 text-white text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Icon Badge (e.g. RS)"
                        value={techSkillForm.iconText}
                        onChange={(e) => setTechSkillForm({ ...techSkillForm, iconText: e.target.value })}
                        className="w-20 p-2 rounded-lg bg-[#081b29] border border-[#00eeff]/20 text-white text-xs font-mono text-center"
                      />
                      <input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="Level %"
                        value={techSkillForm.level}
                        onChange={(e) => setTechSkillForm({ ...techSkillForm, level: parseInt(e.target.value) || 0 })}
                        className="w-20 p-2 rounded-lg bg-[#081b29] border border-[#00eeff]/20 text-[#00eeff] text-xs font-mono text-center"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (techSkillForm.name.trim()) {
                            const newSkills = [...(profileForm.technicalSkills || []), { ...techSkillForm }];
                            setProfileForm({ ...profileForm, technicalSkills: newSkills });
                            updateTechnicalSkills(newSkills);
                            setTechSkillForm({ name: '', level: 85, iconColor: 'text-[#00eeff]', iconText: 'Code' });
                            showToast('Technical skill added');
                          }
                        }}
                        className="btn-neon-cyan px-4 py-2 text-xs uppercase font-bold"
                      >
                        Add Skill
                      </button>
                    </div>
                  </div>

                  {/* Professional Skills Section */}
                  <div className="space-y-4 pt-4 border-t border-[#00eeff]/20">
                    <h4 className="text-sm font-heading font-bold text-[#00eeff] uppercase">Professional Skills (Radial Dials)</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(profileForm.professionalSkills || []).map((prof, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/20 flex items-center justify-between gap-3">
                          <input
                            type="text"
                            value={prof.name}
                            onChange={(e) => {
                              const newProf = [...(profileForm.professionalSkills || [])];
                              newProf[idx].name = e.target.value;
                              setProfileForm({ ...profileForm, professionalSkills: newProf });
                              updateProfessionalSkills(newProf);
                            }}
                            className="p-1 rounded bg-transparent text-white text-xs font-semibold focus:outline-none focus:bg-[#081b29] flex-1"
                          />

                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={prof.percentage}
                              onChange={(e) => {
                                const newProf = [...(profileForm.professionalSkills || [])];
                                newProf[idx].percentage = parseInt(e.target.value) || 0;
                                setProfileForm({ ...profileForm, professionalSkills: newProf });
                                updateProfessionalSkills(newProf);
                              }}
                              className="w-14 p-1 rounded bg-[#081b29] border border-[#00eeff]/30 text-[#00eeff] text-xs font-mono font-bold text-center"
                            />
                            <span className="text-xs font-mono text-zinc-400">%</span>

                            <button
                              type="button"
                              onClick={() => {
                                const newProf = (profileForm.professionalSkills || []).filter((_, i) => i !== idx);
                                setProfileForm({ ...profileForm, professionalSkills: newProf });
                                updateProfessionalSkills(newProf);
                              }}
                              className="text-zinc-400 hover:text-rose-400 cursor-pointer ml-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add New Professional Skill */}
                    <div className="p-3 rounded-xl bg-[#061521] border border-dashed border-[#00eeff]/30 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Professional Skill (e.g. Leadership)"
                        value={profSkillForm.name}
                        onChange={(e) => setProfSkillForm({ ...profSkillForm, name: e.target.value })}
                        className="flex-1 p-2 rounded-lg bg-[#081b29] border border-[#00eeff]/20 text-white text-xs"
                      />
                      <input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="Percentage"
                        value={profSkillForm.percentage}
                        onChange={(e) => setProfSkillForm({ ...profSkillForm, percentage: parseInt(e.target.value) || 0 })}
                        className="w-24 p-2 rounded-lg bg-[#081b29] border border-[#00eeff]/20 text-[#00eeff] text-xs font-mono text-center"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (profSkillForm.name.trim()) {
                            const newProf = [...(profileForm.professionalSkills || []), { ...profSkillForm }];
                            setProfileForm({ ...profileForm, professionalSkills: newProf });
                            updateProfessionalSkills(newProf);
                            setProfSkillForm({ name: '', percentage: 85 });
                            showToast('Professional skill dial added');
                          }
                        }}
                        className="btn-neon-cyan px-4 py-2 text-xs uppercase font-bold"
                      >
                        Add Dial
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 6: SERVICES MANAGEMENT */}
              {/* ========================================================================= */}
              {activeTab === 'services' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-[#00eeff]/20 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg">Services Management</h3>
                      <p className="text-xs text-zinc-400">Add, edit or reorganize your hard mirror service cards.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingServiceId('new');
                        setServiceForm({
                          id: 'svc-' + Date.now(),
                          title: '',
                          shortDesc: '',
                          fullDesc: '',
                          deliverables: []
                        });
                      }}
                      className="btn-neon-cyan px-4 py-2 text-xs uppercase font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Service</span>
                    </button>
                  </div>

                  {/* Service Editor Form if active */}
                  {editingServiceId && (
                    <div className="mirror-card-hard rounded-2xl p-5 space-y-4 border-2 border-[#00eeff]/60">
                      <div className="flex justify-between items-center border-b border-[#00eeff]/20 pb-2">
                        <h4 className="text-sm font-heading font-bold text-[#00eeff]">
                          {editingServiceId === 'new' ? 'Create New Service' : 'Edit Service'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingServiceId(null)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Service Title *</label>
                          <input
                            type="text"
                            value={serviceForm.title}
                            placeholder="e.g. Web Design"
                            onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                            className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Short Card Description *</label>
                          <input
                            type="text"
                            value={serviceForm.shortDesc}
                            placeholder="Brief 1-2 sentence card overview"
                            onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                            className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#00eeff] mb-1">Full Service Description (Modal)</label>
                        <textarea
                          rows={3}
                          value={serviceForm.fullDesc}
                          placeholder="Comprehensive details shown when clicking 'learn more'..."
                          onChange={(e) => setServiceForm({ ...serviceForm, fullDesc: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs resize-none"
                        />
                      </div>

                      {/* Deliverables */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono text-[#00eeff]">Key Deliverables</label>
                        <div className="flex flex-wrap gap-2">
                          {(serviceForm.deliverables || []).map((d, i) => (
                            <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0c2236] border border-[#00eeff]/30 text-xs font-mono text-zinc-200">
                              <span>{d}</span>
                              <button
                                type="button"
                                onClick={() => setServiceForm({
                                  ...serviceForm,
                                  deliverables: (serviceForm.deliverables || []).filter((_, idx) => idx !== i)
                                })}
                                className="text-zinc-400 hover:text-rose-400 cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add deliverable..."
                            value={newDeliverableInput}
                            onChange={(e) => setNewDeliverableInput(e.target.value)}
                            className="flex-1 p-2 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newDeliverableInput.trim()) {
                                setServiceForm({
                                  ...serviceForm,
                                  deliverables: [...(serviceForm.deliverables || []), newDeliverableInput.trim()]
                                });
                                setNewDeliverableInput('');
                              }
                            }}
                            className="btn-neon-cyan px-3 py-2 text-xs uppercase font-bold"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-[#00eeff]/20">
                        <button
                          type="button"
                          onClick={() => setEditingServiceId(null)}
                          className="px-4 py-2 rounded-xl bg-[#0c2236] text-zinc-300 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!serviceForm.title || !serviceForm.shortDesc) {
                              alert('Please provide title and short description.');
                              return;
                            }
                            if (editingServiceId === 'new') {
                              addService({
                                id: 'svc-' + Date.now(),
                                title: serviceForm.title || 'Untitled Service',
                                shortDesc: serviceForm.shortDesc || '',
                                fullDesc: serviceForm.fullDesc || serviceForm.shortDesc || '',
                                deliverables: serviceForm.deliverables || []
                              });
                              showToast('Service added');
                            } else {
                              editService(editingServiceId, serviceForm);
                              showToast('Service updated');
                            }
                            setEditingServiceId(null);
                          }}
                          className="btn-neon-cyan px-5 py-2 text-xs uppercase font-bold"
                        >
                          Save Service
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of current services */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((svc) => (
                      <div key={svc.id} className="p-4 rounded-2xl bg-[#0c2236] border border-[#00eeff]/30 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <h4 className="font-heading font-bold text-white text-base">{svc.title}</h4>
                          <p className="text-xs text-zinc-300 line-clamp-2">{svc.shortDesc}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#00eeff]/15">
                          <span className="text-[11px] font-mono text-[#00eeff]">{svc.deliverables?.length || 0} Deliverables</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingServiceId(svc.id);
                                setServiceForm({ ...svc });
                              }}
                              className="p-1.5 rounded-lg bg-[#081b29] text-[#00eeff] hover:bg-[#00eeff]/20 text-xs cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete service "${svc.title}"?`)) {
                                  deleteService(svc.id);
                                  showToast('Service deleted');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-[#081b29] text-rose-400 hover:bg-rose-950 text-xs cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 7: PROJECTS SHOWCASE */}
              {/* ========================================================================= */}
              {activeTab === 'projects' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-[#00eeff]/20 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg">Projects Showcase</h3>
                      <p className="text-xs text-zinc-400">Add, edit, upload project covers, and manage repository URLs.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingProjectId('new');
                        setProjectForm({
                          id: 'proj-' + Date.now(),
                          title: '',
                          category: 'systems',
                          description: '',
                          longDescription: '',
                          technologies: ['C++', 'RISC-V'],
                          keyFeatures: [],
                          githubUrl: 'https://github.com',
                          liveUrl: '#',
                          imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=900&q=80',
                          featured: true
                        });
                      }}
                      className="btn-neon-cyan px-4 py-2 text-xs uppercase font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Project</span>
                    </button>
                  </div>

                  {/* Project Form */}
                  {editingProjectId && (
                    <div className="mirror-card-hard rounded-2xl p-6 space-y-4 border-2 border-[#00eeff]/60">
                      <div className="flex justify-between items-center border-b border-[#00eeff]/20 pb-2">
                        <h4 className="text-sm font-heading font-bold text-[#00eeff]">
                          {editingProjectId === 'new' ? 'Add New Project' : 'Edit Project'}
                        </h4>
                        <button onClick={() => setEditingProjectId(null)} className="text-zinc-400 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Project Title *</label>
                          <input
                            type="text"
                            value={projectForm.title}
                            placeholder="e.g. RISC-V 5-Stage Pipelined Processor"
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Category</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs"
                          >
                            <option value="systems">Systems & Architecture</option>
                            <option value="embedded">Embedded IoT</option>
                            <option value="web">Web Applications</option>
                            <option value="networking">Networking</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#00eeff] mb-1">Summary Description *</label>
                        <textarea
                          rows={2}
                          value={projectForm.description}
                          placeholder="Brief card summary..."
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#00eeff] mb-1">Full Technical Specifications (Modal)</label>
                        <textarea
                          rows={4}
                          value={projectForm.longDescription}
                          placeholder="Deep technical overview..."
                          onChange={(e) => setProjectForm({ ...projectForm, longDescription: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs resize-none"
                        />
                      </div>

                      {/* Project Cover Image */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono text-[#00eeff]">Cover Image</label>
                        <div className="flex items-center gap-3">
                          {projectForm.imageUrl && (
                            <img
                              src={projectForm.imageUrl}
                              alt="Preview"
                              className="w-16 h-12 rounded-lg object-cover border border-[#00eeff]/40"
                            />
                          )}
                          <label className="btn-neon-cyan px-3 py-1.5 text-xs uppercase font-bold cursor-pointer flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span>Upload Cover</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleGenericImageUpload(e, (url) => setProjectForm(prev => ({ ...prev, imageUrl: url })))}
                            />
                          </label>
                          <input
                            type="text"
                            placeholder="Or image URL..."
                            value={projectForm.imageUrl || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                            className="flex-1 p-2 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">GitHub Repository URL</label>
                          <input
                            type="text"
                            value={projectForm.githubUrl || ''}
                            placeholder="https://github.com/..."
                            onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                            className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Live Demo / Specification URL</label>
                          <input
                            type="text"
                            value={projectForm.liveUrl || ''}
                            placeholder="https://..."
                            onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                            className="w-full p-2.5 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-[#00eeff]/20">
                        <button
                          type="button"
                          onClick={() => setEditingProjectId(null)}
                          className="px-4 py-2 rounded-xl bg-[#0c2236] text-zinc-300 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!projectForm.title || !projectForm.description) {
                              alert('Please fill out the project title and description.');
                              return;
                            }
                            if (editingProjectId === 'new') {
                              addProject({
                                id: 'proj-' + Date.now(),
                                title: projectForm.title || 'Untitled Project',
                                subtitle: projectForm.subtitle || '',
                                category: projectForm.category || 'systems',
                                description: projectForm.description || '',
                                longDescription: projectForm.longDescription || projectForm.description || '',
                                technologies: projectForm.technologies && projectForm.technologies.length > 0 ? projectForm.technologies : ['C++', 'Architecture'],
                                keyFeatures: projectForm.keyFeatures || [],
                                githubUrl: projectForm.githubUrl || 'https://github.com',
                                liveUrl: projectForm.liveUrl || '#',
                                imageUrl: projectForm.imageUrl || 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=900&q=80',
                                featured: true,
                                date: `${new Date().getFullYear()}`
                              });
                              showToast('Project created');
                            } else {
                              editProject(editingProjectId, projectForm);
                              showToast('Project updated');
                            }
                            setEditingProjectId(null);
                          }}
                          className="btn-neon-cyan px-5 py-2 text-xs uppercase font-bold"
                        >
                          Save Project
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of projects */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-3.5 rounded-2xl bg-[#0c2236] border border-[#00eeff]/30 flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <div className="h-28 rounded-xl overflow-hidden bg-[#081b29]">
                            {proj.imageUrl ? (
                              <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#00eeff]/40">
                                <FolderGit2 className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                          <h4 className="font-heading font-bold text-white text-sm line-clamp-1">{proj.title}</h4>
                          <p className="text-xs text-zinc-300 line-clamp-2">{proj.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#00eeff]/15">
                          <span className="text-[10px] font-mono text-[#00eeff] uppercase">{proj.category}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProjectId(proj.id);
                                setProjectForm({ ...proj });
                              }}
                              className="p-1.5 rounded-lg bg-[#081b29] text-[#00eeff] hover:bg-[#00eeff]/20 text-xs cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete project "${proj.title}"?`)) {
                                  deleteProject(proj.id);
                                  showToast('Project deleted');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-[#081b29] text-rose-400 hover:bg-rose-950 text-xs cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 8: MEDIA & IMAGE MANAGER */}
              {/* ========================================================================= */}
              {activeTab === 'media' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-[#00eeff]/20 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg">Central Media & Image Hub</h3>
                      <p className="text-xs text-zinc-400">View, upload, replace, or copy URLs for all images used on the portfolio.</p>
                    </div>
                    <label className="btn-neon-cyan px-4 py-2 text-xs uppercase font-bold flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Upload New Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleGenericImageUpload(e, (url) => {
                          addGalleryItem({
                            id: 'img-' + Date.now(),
                            title: mediaTitle || 'Portfolio Image',
                            url: url,
                            category: mediaCategory
                          });
                          showToast('Image saved to central gallery');
                        })}
                      />
                    </label>
                  </div>

                  {/* Active Site Images Quick Strip */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-[#00eeff] uppercase font-bold">Active Core Photos</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Logo image */}
                      <div className="p-3.5 rounded-2xl bg-[#0c2236] border border-[#00eeff]/30 space-y-2">
                        <span className="text-[10px] font-mono text-[#00eeff] font-bold">Brand Logo</span>
                        <div className="h-24 rounded-xl bg-[#081b29] flex items-center justify-center p-2">
                          {personalInfo.customLogoUrl ? (
                            <img src={personalInfo.customLogoUrl} alt="Logo" className="h-full object-contain" />
                          ) : (
                            <span className="text-xs text-zinc-500 font-mono">Text Logo Active</span>
                          )}
                        </div>
                      </div>

                      {/* Hero Portrait */}
                      <div className="p-3.5 rounded-2xl bg-[#0c2236] border border-[#00eeff]/30 space-y-2">
                        <span className="text-[10px] font-mono text-[#00eeff] font-bold">Hero Portrait</span>
                        <div className="h-24 rounded-xl bg-[#081b29] overflow-hidden">
                          <img src={personalInfo.portraitUrl || personalInfo.avatarUrl} alt="Hero" className="w-full h-full object-cover" />
                        </div>
                      </div>

                      {/* About Portrait */}
                      <div className="p-3.5 rounded-2xl bg-[#0c2236] border border-[#00eeff]/30 space-y-2">
                        <span className="text-[10px] font-mono text-[#00eeff] font-bold">About Portrait</span>
                        <div className="h-24 rounded-xl bg-[#081b29] overflow-hidden">
                          <img src={personalInfo.aboutImageUrl || personalInfo.portraitUrl} alt="About" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Gallery Collection */}
                  <div className="space-y-3 pt-4 border-t border-[#00eeff]/20">
                    <h4 className="text-xs font-mono text-[#00eeff] uppercase font-bold">Custom Uploaded Media Assets ({galleryItems.length})</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {galleryItems.map((item) => (
                        <div key={item.id} className="p-2.5 rounded-2xl bg-[#0c2236] border border-[#00eeff]/30 space-y-2">
                          <div className="h-28 rounded-xl overflow-hidden bg-[#081b29]">
                            <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-[10px] text-zinc-300 truncate">{item.title}</span>
                            <button
                              onClick={() => {
                                deleteGalleryItem(item.id);
                                showToast('Image deleted from gallery');
                              }}
                              className="text-rose-400 hover:text-rose-300 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 9: CONTACT & SOCIALS */}
              {/* ========================================================================= */}
              {activeTab === 'contact' && (
                <form onSubmit={handleProfileSave} className="space-y-6 max-w-3xl">
                  <div className="border-b border-[#00eeff]/20 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg">Contact & Social Networks</h3>
                      <p className="text-xs text-zinc-400">Configure your direct messaging numbers and developer links.</p>
                    </div>
                    <button type="submit" className="btn-neon-cyan px-5 py-2 text-xs uppercase font-bold flex items-center gap-1.5">
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Socials</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        value={profileForm.whatsappNumber}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsappNumber: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">WhatsApp Display Text</label>
                      <input
                        type="text"
                        value={profileForm.whatsappDisplay || ''}
                        placeholder="+250 788 888 888"
                        onChange={(e) => setProfileForm({ ...profileForm, whatsappDisplay: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">GitHub URL</label>
                      <input
                        type="text"
                        value={profileForm.socials.github}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          socials: { ...profileForm.socials, github: e.target.value }
                        })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">LinkedIn URL</label>
                      <input
                        type="text"
                        value={profileForm.socials.linkedin}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          socials: { ...profileForm.socials, linkedin: e.target.value }
                        })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Twitter / X URL</label>
                      <input
                        type="text"
                        value={profileForm.socials.twitter || ''}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          socials: { ...profileForm.socials, twitter: e.target.value }
                        })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Telegram URL</label>
                      <input
                        type="text"
                        value={profileForm.socials.telegram || ''}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          socials: { ...profileForm.socials, telegram: e.target.value }
                        })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-[#00eeff]/30 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* ========================================================================= */}
              {/* TAB 10: BACKUP & SYSTEM */}
              {/* ========================================================================= */}
              {activeTab === 'system' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-[#00eeff]/20 pb-3">
                    <h3 className="font-heading font-bold text-white text-lg">System, Persistence & Backup</h3>
                    <p className="text-xs text-zinc-400">Export your complete configuration as JSON, restore from file, or reset.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Export Backup */}
                    <div className="p-5 rounded-2xl bg-[#0c2236] border border-[#00eeff]/30 space-y-3">
                      <div className="flex items-center gap-2 text-[#00eeff]">
                        <Download className="w-5 h-5" />
                        <h4 className="font-heading font-bold text-white text-sm">Export Portfolio JSON</h4>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Download a full snapshot of all projects, skills, services, logo, and profile settings.
                      </p>
                      <button
                        onClick={handleExport}
                        className="btn-neon-cyan w-full py-2.5 text-xs uppercase font-bold"
                      >
                        Download Backup
                      </button>
                    </div>

                    {/* Import Backup */}
                    <div className="p-5 rounded-2xl bg-[#0c2236] border border-[#00eeff]/30 space-y-3">
                      <div className="flex items-center gap-2 text-[#00eeff]">
                        <Upload className="w-5 h-5" />
                        <h4 className="font-heading font-bold text-white text-sm">Import / Restore JSON</h4>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Restore from a previously saved JSON file to instantly overwrite portfolio state.
                      </p>
                      <label className="btn-neon-cyan w-full py-2.5 text-xs uppercase font-bold flex items-center justify-center gap-2 cursor-pointer">
                        <span>Select File</span>
                        <input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={handleImport}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset to Factory Defaults */}
                  <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400">
                      <AlertCircle className="w-5 h-5" />
                      <h4 className="font-heading font-bold text-white text-sm">Factory Reset</h4>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Clear all changes saved in browser storage and restore the pristine original state.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all portfolio data back to default?')) {
                          resetToDefaults();
                          showToast('Portfolio reset to default state');
                        }
                      }}
                      className="px-5 py-2.5 rounded-xl bg-rose-950 border border-rose-500/50 text-rose-300 hover:bg-rose-900 text-xs font-bold transition-all cursor-pointer"
                    >
                      Reset All Data to Defaults
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
