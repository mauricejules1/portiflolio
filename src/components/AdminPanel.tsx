import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ShieldCheck, 
  X, 
  User, 
  FileText, 
  Cpu, 
  FolderGit2, 
  Mail, 
  Image as ImageIcon, 
  Save, 
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
  Sparkles,
  Award,
  GraduationCap,
  Camera,
  RotateCcw,
  Check,
  Link2,
  RefreshCw
} from 'lucide-react';
import { SkillCategory, SkillItem, Project, CertificateItem, ExperienceItem } from '../types';
import { PERSONAL_INFO as DEFAULT_PERSONAL_INFO } from '../data/portfolioData';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin,
    personalInfo,
    updatePersonalInfo,
    updateTechnicalSkills,
    updateProfessionalSkills,
    skillCategories,
    addSkillCategory,
    deleteSkillCategory,
    addSkill,
    deleteSkill,
    projects,
    addProject,
    editProject,
    deleteProject,
    certificates,
    addCertificate,
    editCertificate,
    deleteCertificate,
    experiences,
    addExperience,
    editExperience,
    deleteExperience,
    galleryItems,
    addGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
    syncToCloudNow,
    isCloudSynced,
    isSavingToCloud,
    cloudError,
    exportBackup,
    importBackup
  } = usePortfolio();

  // Authentication State
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'profile' | 'logo' | 'hero' | 'about' | 'skills' | 'certificates' | 'journey' | 'projects' | 'media' | 'contact' | 'system'
  >('profile');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Form Buffer
  const [profileForm, setProfileForm] = useState(personalInfo);

  // Project Editor State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    category: 'systems',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: true,
    date: new Date().getFullYear().toString()
  });
  const [techInput, setTechInput] = useState('');

  // Certificate Editor State
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certForm, setCertForm] = useState<Partial<CertificateItem>>({
    title: '',
    issuer: '',
    date: new Date().getFullYear().toString(),
    imageUrl: '',
    credentialUrl: '',
    description: ''
  });

  // Experience Editor State
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState<Partial<ExperienceItem>>({
    role: '',
    organization: '',
    location: 'Rusizi, Rwanda',
    period: '2024 - Present',
    description: '',
    category: 'education'
  });

  // Technical Skill State
  const [techSkillForm, setTechSkillForm] = useState({
    name: '',
    level: 85,
    iconColor: 'text-[#00eeff]',
    iconText: 'CS'
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

  useEffect(() => {
    if (isAdminModalOpen) {
      setProfileForm(personalInfo);
    }
  }, [isAdminModalOpen, personalInfo]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[70] flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#081b29] border border-[#00eeff]/80 text-[#00eeff] text-xs font-mono shadow-lg animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#00eeff]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full max-w-6xl h-[92vh] bg-[#081b29] border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#061521] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00eeff]/20 border border-[#00eeff]/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#00eeff]" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
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
              <>
                {/* Cloud Sync Status Badge */}
                <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-mono ${
                  cloudError 
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                    : isSavingToCloud 
                      ? 'bg-[#00eeff]/10 border-[#00eeff]/40 text-[#00eeff]' 
                      : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    cloudError ? 'bg-amber-400' : isSavingToCloud ? 'bg-[#00eeff] animate-ping' : 'bg-emerald-400'
                  }`} />
                  <span>{cloudError ? 'Cloud Offline' : isSavingToCloud ? 'Syncing to Cloud...' : 'Cloud Backend Live'}</span>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    const success = await syncToCloudNow();
                    if (success) {
                      showToast('Successfully synchronized all changes to Cloud Database!');
                    } else {
                      showToast('Cloud sync encounter issue. Saved to Local Cache.');
                    }
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-[#00eeff]/15 text-zinc-200 hover:text-[#00eeff] text-xs border border-zinc-700 hover:border-[#00eeff]/40 transition-colors cursor-pointer"
                  title="Force upload all portfolio content to Cloud Backend"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSavingToCloud ? 'animate-spin text-[#00eeff]' : ''}`} />
                  <span>Sync Cloud</span>
                </button>

                <button
                  onClick={() => {
                    logoutAdmin();
                    showToast('Logged out of admin session');
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs border border-zinc-700 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#00eeff]" />
                  <span>Lock Session</span>
                </button>
              </>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Locked Login Screen */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md p-8 rounded-2xl bg-[#0b1e30] border border-zinc-700 shadow-xl space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#081b29] border border-[#00eeff] flex items-center justify-center text-[#00eeff]">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Administrator Access</h3>
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
                    className="w-full p-3.5 rounded-xl bg-[#081b29] border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-[#00eeff] text-sm font-mono text-center tracking-widest transition-all"
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
                  className="w-full py-3 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase cursor-pointer transition-colors"
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
            <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-zinc-800 bg-[#061521] p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible shrink-0 no-scrollbar">
              {[
                { id: 'profile', label: 'Profile Info', icon: User },
                { id: 'logo', label: 'Logo & Brand', icon: Sparkles },
                { id: 'hero', label: 'Home / Hero', icon: Eye },
                { id: 'about', label: 'About Me', icon: FileText },
                { id: 'skills', label: 'My Skills', icon: Cpu },
                { id: 'certificates', label: 'Certificates', icon: Award },
                { id: 'journey', label: 'Journey & Edu', icon: GraduationCap },
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
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#00eeff] text-[#081b29]'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent'
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
              {/* TAB 1: PROFILE INFO & PICTURE */}
              {/* ========================================================================= */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileSave} className="space-y-6 max-w-3xl">
                  <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">General Profile & Picture</h3>
                      <p className="text-xs text-zinc-400">Change your profile picture, bio, name, titles, location and contact numbers.</p>
                    </div>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer transition-colors">
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  {/* PROFILE PICTURE MANAGEMENT CARD */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#0c2236] border border-[#00eeff]/40 shadow-[0_8px_30px_rgba(0,0,0,0.4)] space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#00eeff]/20 text-[#00eeff] flex items-center justify-center border border-[#00eeff]/40">
                          <Camera className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Profile Picture & Portrait Photo</h4>
                          <p className="text-xs text-zinc-400">Upload a new photo from your device or enter an image link.</p>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const defaultPic = DEFAULT_PERSONAL_INFO.portraitUrl;
                          const defaultAvatar = DEFAULT_PERSONAL_INFO.avatarUrl;
                          const updated = {
                            ...profileForm,
                            portraitUrl: defaultPic,
                            avatarUrl: defaultAvatar,
                            aboutImageUrl: defaultPic
                          };
                          setProfileForm(updated);
                          updatePersonalInfo(updated);
                          showToast('Profile photo reset to default');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                        title="Reset to default photo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Default</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Left: Live Visual Previews */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-[#081b29] border border-zinc-800 space-y-3">
                        <div className="relative">
                          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#00eeff] via-[#d946ef] to-[#0077ff] shadow-[0_0_25px_rgba(0,238,255,0.4)]">
                            <div className="w-full h-full rounded-full bg-[#081b29] p-1">
                              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#00eeff]/80 bg-[#0c2236]">
                                <img
                                  src={profileForm.portraitUrl || profileForm.avatarUrl || DEFAULT_PERSONAL_INFO.portraitUrl}
                                  alt="Profile Preview"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="absolute -bottom-1 right-0 px-2 py-0.5 rounded-full bg-[#0c2236] border border-[#10b981] text-[10px] font-mono font-bold text-[#10b981] shadow-md flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                            <span>Active</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-bold text-white truncate max-w-[160px]">{profileForm.name || "Muhire Jules"}</p>
                          <p className="text-[10px] font-mono text-[#00eeff]">Live Profile Preview</p>
                        </div>
                      </div>

                      {/* Right: Upload & URL Controls */}
                      <div className="md:col-span-8 space-y-4">
                        {/* Direct File Upload Button */}
                        <div className="p-4 rounded-xl bg-[#081b29] border border-dashed border-[#00eeff]/50 hover:border-[#00eeff] transition-all space-y-3">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="flex items-center gap-3 text-left">
                              <div className="w-10 h-10 rounded-xl bg-[#00eeff]/10 border border-[#00eeff]/30 text-[#00eeff] flex items-center justify-center shrink-0">
                                <Upload className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white">Upload New Photo File</p>
                                <p className="text-[11px] text-zinc-400">Choose PNG, JPG, JPEG or WEBP from phone or computer</p>
                              </div>
                            </div>

                            <label className="btn-neon-cyan px-4 py-2.5 text-xs font-bold uppercase cursor-pointer flex items-center gap-2 shrink-0 rounded-xl">
                              <Camera className="w-4 h-4" />
                              <span>Select Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleGenericImageUpload(e, (url) => {
                                  const updated = {
                                    ...profileForm,
                                    portraitUrl: url,
                                    avatarUrl: url,
                                    aboutImageUrl: url
                                  };
                                  setProfileForm(updated);
                                  updatePersonalInfo(updated);
                                  showToast('New profile photo uploaded and applied everywhere!');
                                })}
                              />
                            </label>
                          </div>
                        </div>

                        {/* Or Paste Image Link */}
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1.5 flex items-center gap-1.5">
                            <Link2 className="w-3.5 h-3.5" />
                            <span>Or Enter Image URL Link</span>
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="https://... or image link"
                              value={profileForm.portraitUrl || profileForm.avatarUrl || ''}
                              onChange={(e) => {
                                const url = e.target.value;
                                setProfileForm({
                                  ...profileForm,
                                  portraitUrl: url,
                                  avatarUrl: url,
                                  aboutImageUrl: url
                                });
                              }}
                              className="flex-1 p-2.5 rounded-xl bg-[#081b29] border border-zinc-700 text-white text-xs font-mono focus:outline-none focus:border-[#00eeff]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                updatePersonalInfo({
                                  portraitUrl: profileForm.portraitUrl,
                                  avatarUrl: profileForm.avatarUrl,
                                  aboutImageUrl: profileForm.aboutImageUrl || profileForm.portraitUrl
                                });
                                showToast('Profile photo link applied & saved!');
                              }}
                              className="px-4 py-2.5 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Apply</span>
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono pt-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#00eeff]" />
                          <span>Automatically synchronizes to Navbar Avatar, Hero Portrait, and About Section.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Primary Title / Role</label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Field of Study</label>
                      <input
                        type="text"
                        value={profileForm.fieldOfStudy || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, fieldOfStudy: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Availability Status</label>
                      <input
                        type="text"
                        value={profileForm.availabilityStatus}
                        onChange={(e) => setProfileForm({ ...profileForm, availabilityStatus: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        value={profileForm.whatsappNumber}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsappNumber: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">WhatsApp Display Text</label>
                      <input
                        type="text"
                        value={profileForm.whatsappDisplay || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsappDisplay: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#00eeff] mb-1">Bio / Learner Summary</label>
                    <textarea
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00eeff] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#00eeff] mb-1">Resume / CV Document URL</label>
                    <input
                      type="text"
                      value={profileForm.resumeUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                      placeholder="https://.../cv.pdf or relative link"
                      className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00eeff]"
                    />
                  </div>
                </form>
              )}

              {/* ========================================================================= */}
              {/* TAB 2: LOGO & BRANDING */}
              {/* ========================================================================= */}
              {activeTab === 'logo' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">Logo & Brand Customization</h3>
                      <p className="text-xs text-zinc-400">Upload or replace your custom logo, customize logo text, and preview live.</p>
                    </div>
                    <button
                      onClick={() => {
                        updatePersonalInfo(profileForm);
                        showToast('Logo settings saved');
                      }}
                      className="px-5 py-2 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Logo</span>
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#0c2236] border border-zinc-700 space-y-4">
                    <h4 className="text-xs font-mono text-[#00eeff] uppercase font-bold">Logo Display Mode</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(['text', 'image', 'both'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setProfileForm({ ...profileForm, logoType: mode })}
                          className={`p-3 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer border ${
                            profileForm.logoType === mode
                              ? 'bg-[#00eeff] text-[#081b29] border-[#00eeff]'
                              : 'bg-[#081b29] text-zinc-300 border-zinc-700 hover:bg-zinc-800'
                          }`}
                        >
                          {mode} Logo
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Custom Logo Image URL</label>
                      <input
                        type="text"
                        value={profileForm.customLogoUrl || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, customLogoUrl: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#081b29] border border-zinc-700 text-white text-sm"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#081b29] border border-zinc-700 hover:bg-zinc-800 text-zinc-200 text-xs cursor-pointer">
                        <Upload className="w-4 h-4 text-[#00eeff]" />
                        <span>Upload Logo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleGenericImageUpload(e, (url) => {
                            setProfileForm({ ...profileForm, customLogoUrl: url, logoType: 'image' });
                          })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 3: HERO SECTION */}
              {/* ========================================================================= */}
              {activeTab === 'hero' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">Hero / Intro Section</h3>
                      <p className="text-xs text-zinc-400">Configure greeting, typing roles, and portrait photo.</p>
                    </div>
                    <button
                      onClick={() => {
                        updatePersonalInfo(profileForm);
                        showToast('Hero settings saved');
                      }}
                      className="px-5 py-2 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Hero</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Hero Greeting</label>
                      <input
                        type="text"
                        value={profileForm.heroGreeting || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, heroGreeting: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Hero Tagline / Subtitle</label>
                      <textarea
                        rows={3}
                        value={profileForm.heroTagline || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, heroTagline: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">Hero Portrait URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={profileForm.portraitUrl || profileForm.avatarUrl || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, portraitUrl: e.target.value, avatarUrl: e.target.value })}
                          className="flex-1 p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm"
                        />
                        <label className="px-4 py-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1.5 cursor-pointer text-xs">
                          <Upload className="w-4 h-4 text-[#00eeff]" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleGenericImageUpload(e, (url) => {
                              setProfileForm({ ...profileForm, portraitUrl: url, avatarUrl: url });
                            })}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 4: ABOUT ME */}
              {/* ========================================================================= */}
              {activeTab === 'about' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">About Section</h3>
                      <p className="text-xs text-zinc-400">Configure detailed about biography and learning focus points.</p>
                    </div>
                    <button
                      onClick={() => {
                        updatePersonalInfo(profileForm);
                        showToast('About section saved');
                      }}
                      className="px-5 py-2 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save About</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">About Bio Paragraph</label>
                      <textarea
                        rows={5}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#00eeff] mb-1">About Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={profileForm.aboutImageUrl || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, aboutImageUrl: e.target.value })}
                          className="flex-1 p-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-white text-sm"
                        />
                        <label className="px-4 py-3 rounded-xl bg-[#0c2236] border border-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1.5 cursor-pointer text-xs">
                          <Upload className="w-4 h-4 text-[#00eeff]" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleGenericImageUpload(e, (url) => {
                              setProfileForm({ ...profileForm, aboutImageUrl: url });
                            })}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 5: SKILLS */}
              {/* ========================================================================= */}
              {activeTab === 'skills' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">Skills Matrix & Knowledge</h3>
                      <p className="text-xs text-zinc-400">Manage technical skills, proficiency levels, and categories.</p>
                    </div>
                  </div>

                  {/* Add skill to category */}
                  <div className="space-y-6">
                    {skillCategories.map((cat) => (
                      <div key={cat.id} className="p-4 rounded-xl bg-[#0c2236] border border-zinc-700 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-white text-sm flex items-center gap-2">
                            <span className="text-[#00eeff]">•</span>
                            <span>{cat.name}</span>
                            <span className="text-xs font-mono text-zinc-400">({cat.skills.length} skills)</span>
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cat.skills.map((s, sIdx) => (
                            <div key={sIdx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#081b29] border border-zinc-800 text-xs">
                              <div>
                                <span className="font-bold text-white">{s.name}</span>
                                <span className="ml-2 text-zinc-400 font-mono">{s.level}%</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => deleteSkill(cat.id, sIdx)}
                                className="text-rose-400 hover:text-rose-300 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 6: CERTIFICATES */}
              {/* ========================================================================= */}
              {activeTab === 'certificates' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">Certificates & Verification</h3>
                      <p className="text-xs text-zinc-400">Add, edit, and organize verified learning certifications and badges.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingCertId('new');
                        setCertForm({
                          title: '',
                          issuer: '',
                          date: new Date().getFullYear().toString(),
                          imageUrl: '',
                          credentialUrl: '',
                          description: ''
                        });
                      }}
                      className="px-4 py-2 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Certificate</span>
                    </button>
                  </div>

                  {/* Certificate Form */}
                  {editingCertId && (
                    <div className="p-4 rounded-xl bg-[#0c2236] border border-zinc-700 space-y-4">
                      <h4 className="font-bold text-white text-sm">
                        {editingCertId === 'new' ? 'New Certificate' : 'Edit Certificate'}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Title</label>
                          <input
                            type="text"
                            value={certForm.title}
                            onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Issuer / Organization</label>
                          <input
                            type="text"
                            value={certForm.issuer}
                            onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Date / Year</label>
                          <input
                            type="text"
                            value={certForm.date}
                            onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Credential URL (optional)</label>
                          <input
                            type="text"
                            value={certForm.credentialUrl || ''}
                            onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#00eeff] mb-1">Certificate Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={certForm.imageUrl || ''}
                            onChange={(e) => setCertForm({ ...certForm, imageUrl: e.target.value })}
                            className="flex-1 p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                          <label className="px-3 py-2 rounded-lg bg-[#081b29] border border-zinc-700 text-zinc-300 text-xs flex items-center gap-1 cursor-pointer">
                            <Upload className="w-3.5 h-3.5 text-[#00eeff]" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleGenericImageUpload(e, (url) => {
                                setCertForm({ ...certForm, imageUrl: url });
                              })}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#00eeff] mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={certForm.description || ''}
                          onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingCertId(null)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (editingCertId === 'new') {
                              addCertificate({
                                id: 'cert-' + Date.now(),
                                title: certForm.title || 'Verified Skill Certificate',
                                issuer: certForm.issuer || 'Practical IT Systems Lab',
                                date: certForm.date || '2024',
                                imageUrl: certForm.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
                                credentialUrl: certForm.credentialUrl,
                                description: certForm.description || ''
                              });
                              showToast('Certificate added');
                            } else {
                              editCertificate(editingCertId, certForm);
                              showToast('Certificate updated');
                            }
                            setEditingCertId(null);
                          }}
                          className="px-4 py-1.5 rounded-lg bg-[#00eeff] text-[#081b29] font-bold text-xs cursor-pointer"
                        >
                          Save Certificate
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of certificates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certificates.map((c) => (
                      <div key={c.id} className="p-3.5 rounded-xl bg-[#0c2236] border border-zinc-700 space-y-2">
                        <div className="h-28 rounded-lg overflow-hidden bg-[#081b29]">
                          <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-white text-xs sm:text-sm">{c.title}</h4>
                            <p className="text-[11px] text-zinc-400">{c.issuer} • {c.date}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingCertId(c.id);
                                setCertForm({ ...c });
                              }}
                              className="p-1 rounded bg-[#081b29] text-[#00eeff] text-xs cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete certificate "${c.title}"?`)) {
                                  deleteCertificate(c.id);
                                  showToast('Certificate removed');
                                }
                              }}
                              className="p-1 rounded bg-[#081b29] text-rose-400 text-xs cursor-pointer"
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
              {/* TAB 7: JOURNEY & EDUCATION */}
              {/* ========================================================================= */}
              {activeTab === 'journey' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">Journey & Practical Milestones</h3>
                      <p className="text-xs text-zinc-400">Track educational achievements and hands-on system building milestones.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingExpId('new');
                        setExpForm({
                          role: '',
                          organization: '',
                          location: 'Rusizi, Rwanda',
                          period: '2024 - Present',
                          description: '',
                          category: 'education'
                        });
                      }}
                      className="px-4 py-2 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  {editingExpId && (
                    <div className="p-4 rounded-xl bg-[#0c2236] border border-zinc-700 space-y-4">
                      <h4 className="font-bold text-white text-sm">
                        {editingExpId === 'new' ? 'New Milestone' : 'Edit Milestone'}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Role / Milestone Title</label>
                          <input
                            type="text"
                            value={expForm.role}
                            onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">School / Organization</label>
                          <input
                            type="text"
                            value={expForm.organization}
                            onChange={(e) => setExpForm({ ...expForm, organization: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Period</label>
                          <input
                            type="text"
                            value={expForm.period}
                            onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Location</label>
                          <input
                            type="text"
                            value={expForm.location}
                            onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#00eeff] mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={expForm.description}
                          onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingExpId(null)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (editingExpId === 'new') {
                              addExperience({
                                id: 'exp-' + Date.now(),
                                role: expForm.role || 'Computer System Learner',
                                organization: expForm.organization || 'Self-Directed & Academic Labs',
                                location: expForm.location || 'Rusizi, Rwanda',
                                period: expForm.period || '2024 - Present',
                                description: expForm.description || '',
                                type: 'academic',
                                highlights: [],
                                technologies: ['Hardware', 'Linux', 'Networking']
                              });
                              showToast('Milestone added');
                            } else {
                              editExperience(editingExpId, expForm);
                              showToast('Milestone updated');
                            }
                            setEditingExpId(null);
                          }}
                          className="px-4 py-1.5 rounded-lg bg-[#00eeff] text-[#081b29] font-bold text-xs cursor-pointer"
                        >
                          Save Milestone
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of experiences */}
                  <div className="space-y-3">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="p-3.5 rounded-xl bg-[#0c2236] border border-zinc-700 flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-xs sm:text-sm">{exp.role}</h4>
                          <p className="text-[11px] text-zinc-400">{exp.organization} • {exp.period}</p>
                          <p className="text-xs text-zinc-300">{exp.description}</p>
                        </div>
                        <div className="flex items-center gap-1 ml-4">
                          <button
                            onClick={() => {
                              setEditingExpId(exp.id);
                              setExpForm({ ...exp });
                            }}
                            className="p-1 rounded bg-[#081b29] text-[#00eeff] text-xs cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete milestone "${exp.role}"?`)) {
                                deleteExperience(exp.id);
                                showToast('Milestone removed');
                              }
                            }}
                            className="p-1 rounded bg-[#081b29] text-rose-400 text-xs cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 8: PROJECTS */}
              {/* ========================================================================= */}
              {activeTab === 'projects' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">Project Management</h3>
                      <p className="text-xs text-zinc-400">Add, edit, or remove practical labs and system builds.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingProjectId('new');
                        setProjectForm({
                          title: '',
                          subtitle: '',
                          category: 'systems',
                          description: '',
                          technologies: [],
                          githubUrl: '',
                          liveUrl: '',
                          imageUrl: '',
                          featured: true,
                          date: new Date().getFullYear().toString()
                        });
                      }}
                      className="px-4 py-2 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Project</span>
                    </button>
                  </div>

                  {editingProjectId && (
                    <div className="p-4 rounded-xl bg-[#0c2236] border border-zinc-700 space-y-4">
                      <h4 className="font-bold text-white text-sm">
                        {editingProjectId === 'new' ? 'Create Project' : 'Edit Project'}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Title</label>
                          <input
                            type="text"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Category</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          >
                            <option value="systems">Hardware & Systems</option>
                            <option value="networking">Networking</option>
                            <option value="web">Web Development</option>
                            <option value="database">Database</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">GitHub Link (optional)</label>
                          <input
                            type="text"
                            value={projectForm.githubUrl || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#00eeff] mb-1">Live Demo / Documentation Link (optional)</label>
                          <input
                            type="text"
                            value={projectForm.liveUrl || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                            className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#00eeff] mb-1">Project Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={projectForm.imageUrl || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                            className="flex-1 p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                          />
                          <label className="px-3 py-2 rounded-lg bg-[#081b29] border border-zinc-700 text-zinc-300 text-xs flex items-center gap-1 cursor-pointer">
                            <Upload className="w-3.5 h-3.5 text-[#00eeff]" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleGenericImageUpload(e, (url) => {
                                setProjectForm({ ...projectForm, imageUrl: url });
                              })}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#00eeff] mb-1">Short Description</label>
                        <textarea
                          rows={3}
                          value={projectForm.description || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-[#081b29] border border-zinc-700 text-white text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingProjectId(null)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (editingProjectId === 'new') {
                              addProject({
                                id: 'proj-' + Date.now(),
                                title: projectForm.title || 'Untitled System Project',
                                subtitle: projectForm.subtitle || '',
                                category: projectForm.category || 'systems',
                                description: projectForm.description || '',
                                longDescription: projectForm.longDescription || projectForm.description || '',
                                keyFeatures: projectForm.keyFeatures || ['Practical Implementation', 'Hardware Testing'],
                                technologies: projectForm.technologies && projectForm.technologies.length > 0 ? projectForm.technologies : ['Hardware', 'Diagnostics'],
                                githubUrl: projectForm.githubUrl || '',
                                liveUrl: projectForm.liveUrl || '',
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
                          className="px-4 py-1.5 rounded-lg bg-[#00eeff] text-[#081b29] font-bold text-xs cursor-pointer"
                        >
                          Save Project
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of projects */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-3.5 rounded-xl bg-[#0c2236] border border-zinc-700 flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <div className="h-28 rounded-lg overflow-hidden bg-[#081b29]">
                            {proj.imageUrl ? (
                              <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#00eeff]/40">
                                <FolderGit2 className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                          <h4 className="font-bold text-white text-sm line-clamp-1">{proj.title}</h4>
                          <p className="text-xs text-zinc-300 line-clamp-2">{proj.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                          <span className="text-[10px] font-mono text-[#00eeff] uppercase">{proj.category}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProjectId(proj.id);
                                setProjectForm({ ...proj });
                              }}
                              className="p-1.5 rounded-lg bg-[#081b29] text-[#00eeff] text-xs cursor-pointer"
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
                              className="p-1.5 rounded-lg bg-[#081b29] text-rose-400 text-xs cursor-pointer"
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
              {/* TAB 9: MEDIA & HUB */}
              {/* ========================================================================= */}
              {activeTab === 'media' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">Central Media Hub</h3>
                      <p className="text-xs text-zinc-400">View, upload, and manage custom photo assets.</p>
                    </div>
                    <label className="px-4 py-2 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Upload Media</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleGenericImageUpload(e, (url) => {
                          addGalleryItem({
                            id: 'img-' + Date.now(),
                            title: mediaTitle || 'Portfolio Image',
                            imageUrl: url,
                            category: mediaCategory,
                            caption: mediaTitle || 'Portfolio Photo',
                            tags: ['computer-systems', 'hardware']
                          });
                          showToast('Image saved to central gallery');
                        })}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {galleryItems.map((item) => (
                      <div key={item.id} className="p-2.5 rounded-xl bg-[#0c2236] border border-zinc-700 space-y-2">
                        <div className="h-28 rounded-lg overflow-hidden bg-[#081b29]">
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-[10px] text-zinc-300 truncate">{item.title}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = {
                                  ...profileForm,
                                  portraitUrl: item.imageUrl,
                                  avatarUrl: item.imageUrl,
                                  aboutImageUrl: item.imageUrl
                                };
                                setProfileForm(updated);
                                updatePersonalInfo(updated);
                                showToast(`Set "${item.title}" as Profile Picture!`);
                              }}
                              className="px-2 py-1 rounded bg-[#081b29] hover:bg-[#00eeff]/20 text-[#00eeff] text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
                              title="Set as Profile Picture"
                            >
                              <Camera className="w-3 h-3" />
                              <span>Set Profile</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                deleteGalleryItem(item.id);
                                showToast('Image deleted');
                              }}
                              className="p-1 rounded text-rose-400 hover:text-rose-300 cursor-pointer"
                              title="Delete Image"
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
              {/* TAB 10: CONTACT & SOCIALS */}
              {/* ========================================================================= */}
              {activeTab === 'contact' && (
                <form onSubmit={handleProfileSave} className="space-y-6 max-w-3xl">
                  <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">Contact & Social Networks</h3>
                      <p className="text-xs text-zinc-400">Configure messaging numbers, email, and social profile links.</p>
                    </div>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-[#00eeff] hover:bg-[#00c8db] text-[#081b29] font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer">
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Socials</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* WhatsApp */}
                    <div className="p-3.5 rounded-xl bg-[#081b29] border border-emerald-500/30 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">WhatsApp Channel</span>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">WhatsApp Number / Link</label>
                        <input
                          type="text"
                          value={profileForm.whatsappNumber}
                          onChange={(e) => setProfileForm({ ...profileForm, whatsappNumber: e.target.value })}
                          placeholder="+250 794 410 997"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Assigned Name / Display</label>
                        <input
                          type="text"
                          value={profileForm.socials?.whatsappName || profileForm.whatsappDisplay || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            whatsappDisplay: e.target.value,
                            socials: { ...profileForm.socials, whatsappName: e.target.value }
                          })}
                          placeholder="e.g. +250 794 410 997"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Instagram */}
                    <div className="p-3.5 rounded-xl bg-[#081b29] border border-pink-500/30 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-pink-400 uppercase">Instagram Channel</span>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Instagram URL</label>
                        <input
                          type="text"
                          value={profileForm.socials?.instagram || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, instagram: e.target.value }
                          })}
                          placeholder="https://instagram.com/yourhandle"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Assigned Name / Handle</label>
                        <input
                          type="text"
                          value={profileForm.socials?.instagramName || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, instagramName: e.target.value }
                          })}
                          placeholder="e.g. @muhire_jules"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Facebook */}
                    <div className="p-3.5 rounded-xl bg-[#081b29] border border-blue-500/30 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-sky-400 uppercase">Facebook Channel</span>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Facebook URL</label>
                        <input
                          type="text"
                          value={profileForm.socials?.facebook || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, facebook: e.target.value }
                          })}
                          placeholder="https://facebook.com/yourprofile"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Assigned Name / Display</label>
                        <input
                          type="text"
                          value={profileForm.socials?.facebookName || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, facebookName: e.target.value }
                          })}
                          placeholder="e.g. MUHIRE JULES"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* GitHub */}
                    <div className="p-3.5 rounded-xl bg-[#081b29] border border-[#00eeff]/30 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-[#00eeff] uppercase">GitHub Channel</span>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">GitHub URL</label>
                        <input
                          type="text"
                          value={profileForm.socials?.github || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, github: e.target.value }
                          })}
                          placeholder="https://github.com/username"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Assigned Name / Handle</label>
                        <input
                          type="text"
                          value={profileForm.socials?.githubName || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, githubName: e.target.value }
                          })}
                          placeholder="e.g. muhirejules"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="p-3.5 rounded-xl bg-[#081b29] border border-indigo-500/30 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase">LinkedIn Channel</span>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">LinkedIn URL</label>
                        <input
                          type="text"
                          value={profileForm.socials?.linkedin || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, linkedin: e.target.value }
                          })}
                          placeholder="https://linkedin.com/in/profile"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Assigned Name</label>
                        <input
                          type="text"
                          value={profileForm.socials?.linkedinName || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, linkedinName: e.target.value }
                          })}
                          placeholder="e.g. MUHIRE JULES"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="p-3.5 rounded-xl bg-[#081b29] border border-amber-500/30 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">Direct Email</span>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          placeholder="mauricemjules@gmail.com"
                          className="w-full p-2.5 rounded-lg bg-[#0c2236] border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* ========================================================================= */}
              {/* TAB 11: SYSTEM BACKUP & RESET */}
              {/* ========================================================================= */}
              {activeTab === 'system' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-zinc-800 pb-3">
                    <h3 className="font-bold text-white text-lg">System Configuration & Data</h3>
                    <p className="text-xs text-zinc-400">Export snapshot backups, restore previous states, or reset to original defaults.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#0c2236] border border-zinc-700 space-y-3">
                      <div className="flex items-center gap-2 text-[#00eeff]">
                        <Download className="w-5 h-5" />
                        <h4 className="font-bold text-white text-sm">Export Data Backup</h4>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Download all portfolio text, customized images, certificates, and settings into a JSON backup file.
                      </p>
                      <button
                        onClick={handleExport}
                        className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[#00eeff] border border-zinc-700 text-xs font-bold uppercase transition-colors cursor-pointer"
                      >
                        Download Backup JSON
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0c2236] border border-zinc-700 space-y-3">
                      <div className="flex items-center gap-2 text-[#00eeff]">
                        <Upload className="w-5 h-5" />
                        <h4 className="font-bold text-white text-sm">Import Data Backup</h4>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Restore your portfolio instantly from an exported JSON backup file.
                      </p>
                      <label className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors">
                        <span>Select JSON File</span>
                        <input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={handleImport}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                    <h4 className="font-bold text-rose-400 text-sm">Factory Reset</h4>
                    <p className="text-xs text-zinc-400">
                      Reset all content, photos, and skills back to the default Computer System Learner profile configuration.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to reset all portfolio data back to defaults?")) {
                          resetToDefaults();
                          setProfileForm(personalInfo);
                          showToast("Portfolio reset to default template");
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-900/50 hover:bg-rose-800/60 text-rose-300 border border-rose-500/40 text-xs font-bold cursor-pointer"
                    >
                      Reset Everything to Defaults
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
