import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  PERSONAL_INFO as DEFAULT_PERSONAL_INFO, 
  SKILL_CATEGORIES as DEFAULT_SKILL_CATEGORIES, 
  PROJECTS as DEFAULT_PROJECTS,
  SERVICES as DEFAULT_SERVICES,
  GALLERY_ITEMS as DEFAULT_GALLERY_ITEMS,
  CERTIFICATES as DEFAULT_CERTIFICATES,
  EXPERIENCES as DEFAULT_EXPERIENCES
} from '../data/portfolioData';
import { PersonalInfo, SkillCategory, SkillItem, Project, ServiceItem, GalleryItem, CertificateItem, ExperienceItem } from '../types';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Cryptographic SHA-256 hash of the administrative access key
const SECURE_ADMIN_HASH = "20d58c3267bb60d22739820da26d34a3ebd6157e8cc0ef6dfa49c8e8a7c6a61f";
const STORAGE_KEY = "muhire_jules_portfolio_state_v4";
const AUTH_SESSION_KEY = "muhire_jules_admin_session";
const INTRO_SHOWN_KEY = "muhire_jules_intro_shown";

// Firestore Document Reference for persistent global state
const CLOUD_DOC_ID = "main_content";

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  skillCategories: SkillCategory[];
  projects: Project[];
  services: ServiceItem[];
  galleryItems: GalleryItem[];
  certificates: CertificateItem[];
  experiences: ExperienceItem[];
  
  // Cloud sync status
  isCloudSynced: boolean;
  isSavingToCloud: boolean;
  cloudError: string | null;

  // Admin Updates
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSocials: (socials: Partial<PersonalInfo['socials']>) => void;
  
  // Skills Management
  updateSkillCategories: (categories: SkillCategory[]) => void;
  addSkillCategory: (category: SkillCategory) => void;
  editSkillCategory: (id: string, updated: Partial<SkillCategory>) => void;
  deleteSkillCategory: (id: string) => void;
  addSkill: (categoryId: string, skill: SkillItem) => void;
  editSkill: (categoryId: string, skillIndex: number, updated: SkillItem) => void;
  deleteSkill: (categoryId: string, skillIndex: number) => void;
  
  // Technical & Professional Skills
  updateTechnicalSkills: (skills: NonNullable<PersonalInfo['technicalSkills']>) => void;
  updateProfessionalSkills: (skills: NonNullable<PersonalInfo['professionalSkills']>) => void;

  // Services Management
  updateServices: (services: ServiceItem[]) => void;
  addService: (service: ServiceItem) => void;
  editService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Projects Management
  updateProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  editProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Certificates Management
  updateCertificates: (certificates: CertificateItem[]) => void;
  addCertificate: (certificate: CertificateItem) => void;
  editCertificate: (id: string, updated: Partial<CertificateItem>) => void;
  deleteCertificate: (id: string) => void;

  // Experience Management
  updateExperiences: (experiences: ExperienceItem[]) => void;
  addExperience: (experience: ExperienceItem) => void;
  editExperience: (id: string, updated: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;

  // Media & Gallery Management
  updateGalleryItems: (items: GalleryItem[]) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Backup & Reset & Manual Cloud Sync
  resetToDefaults: () => void;
  syncToCloudNow: () => Promise<boolean>;
  exportBackup: () => string;
  importBackup: (jsonString: string) => boolean;

  // Admin Auth & Modal
  isAdminAuthenticated: boolean;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;

  // Intro Screen
  showIntro: boolean;
  finishIntro: () => void;
  replayIntro: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

async function sha256(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage cache first for immediate render
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.personalInfo) return { ...DEFAULT_PERSONAL_INFO, ...parsed.personalInfo };
      }
    } catch (e) {
      console.warn("Could not parse saved portfolio info", e);
    }
    return DEFAULT_PERSONAL_INFO as PersonalInfo;
  });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.skillCategories && Array.isArray(parsed.skillCategories)) return parsed.skillCategories;
      }
    } catch (e) {
      console.warn("Could not parse saved skill categories", e);
    }
    return DEFAULT_SKILL_CATEGORIES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.projects && Array.isArray(parsed.projects)) return parsed.projects;
      }
    } catch (e) {
      console.warn("Could not parse saved projects", e);
    }
    return DEFAULT_PROJECTS;
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.certificates && Array.isArray(parsed.certificates)) return parsed.certificates;
      }
    } catch (e) {
      console.warn("Could not parse saved certificates", e);
    }
    return DEFAULT_CERTIFICATES;
  });

  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.experiences && Array.isArray(parsed.experiences)) return parsed.experiences;
      }
    } catch (e) {
      console.warn("Could not parse saved experiences", e);
    }
    return DEFAULT_EXPERIENCES;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.services && Array.isArray(parsed.services)) return parsed.services;
      }
    } catch (e) {
      console.warn("Could not parse saved services", e);
    }
    return DEFAULT_SERVICES;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.galleryItems && Array.isArray(parsed.galleryItems)) return parsed.galleryItems;
      }
    } catch (e) {
      console.warn("Could not parse saved gallery", e);
    }
    return DEFAULT_GALLERY_ITEMS;
  });

  // Cloud Database Sync States
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const [isSavingToCloud, setIsSavingToCloud] = useState<boolean>(false);
  const [cloudError, setCloudError] = useState<string | null>(null);

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Intro state
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return sessionStorage.getItem(INTRO_SHOWN_KEY) !== "true";
  });

  // Ref to prevent initial Firestore load from triggering an immediate overwrite
  const isInitialCloudLoadDone = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // =========================================================================
  // 1. HARDENED CLOUD FIRESTORE REAL-TIME LISTENER & HYDRATION
  // =========================================================================
  useEffect(() => {
    const docRef = doc(db, 'portfolio_content', CLOUD_DOC_ID);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const cloudData = snapshot.data();
        if (cloudData) {
          if (cloudData.personalInfo) {
            setPersonalInfo(prev => ({ ...prev, ...cloudData.personalInfo }));
          }
          if (cloudData.skillCategories && Array.isArray(cloudData.skillCategories)) {
            setSkillCategories(cloudData.skillCategories);
          }
          if (cloudData.projects && Array.isArray(cloudData.projects)) {
            setProjects(cloudData.projects);
          }
          if (cloudData.certificates && Array.isArray(cloudData.certificates)) {
            setCertificates(cloudData.certificates);
          }
          if (cloudData.experiences && Array.isArray(cloudData.experiences)) {
            setExperiences(cloudData.experiences);
          }
          if (cloudData.services && Array.isArray(cloudData.services)) {
            setServices(cloudData.services);
          }
          if (cloudData.galleryItems && Array.isArray(cloudData.galleryItems)) {
            setGalleryItems(cloudData.galleryItems);
          }
          setIsCloudSynced(true);
          setCloudError(null);
        }
      } else {
        // Document does not exist yet on Firestore -> initialize it with our robust state!
        const initialPayload = {
          personalInfo: DEFAULT_PERSONAL_INFO,
          skillCategories: DEFAULT_SKILL_CATEGORIES,
          projects: DEFAULT_PROJECTS,
          certificates: DEFAULT_CERTIFICATES,
          experiences: DEFAULT_EXPERIENCES,
          services: DEFAULT_SERVICES,
          galleryItems: DEFAULT_GALLERY_ITEMS,
          updatedAt: new Date().toISOString()
        };
        setDoc(docRef, initialPayload, { merge: true }).catch(err => {
          console.warn("Could not seed initial Firestore doc:", err);
        });
        setIsCloudSynced(true);
      }
      isInitialCloudLoadDone.current = true;
    }, (err) => {
      console.error("Firestore real-time sync error:", err);
      setCloudError(err.message);
    });

    return () => unsubscribe();
  }, []);

  // Dynamic Favicon and Page Branding Sync
  useEffect(() => {
    const logoToUse = personalInfo.customLogoUrl || personalInfo.logoUrl;
    if (logoToUse) {
      let faviconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
      if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.head.appendChild(faviconLink);
      }
      faviconLink.href = logoToUse;
    }

    if (personalInfo.name) {
      document.title = `${personalInfo.name} — ${personalInfo.title || "Computer System Learner"}`;
    }
  }, [personalInfo.customLogoUrl, personalInfo.logoUrl, personalInfo.name, personalInfo.title]);

  // =========================================================================
  // 2. HARD PERSISTENCE (LOCAL STORAGE + DURABLE CLOUD FIRESTORE)
  // =========================================================================
  useEffect(() => {
    // A) Fast LocalStorage persistence
    try {
      const payload = {
        personalInfo,
        skillCategories,
        projects,
        certificates,
        experiences,
        services,
        galleryItems,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }

    // B) Debounced Cloud Firestore Auto-Persistence
    if (!isInitialCloudLoadDone.current) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        setIsSavingToCloud(true);
        const docRef = doc(db, 'portfolio_content', CLOUD_DOC_ID);
        await setDoc(docRef, {
          personalInfo,
          skillCategories,
          projects,
          certificates,
          experiences,
          services,
          galleryItems,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        setIsCloudSynced(true);
        setCloudError(null);
      } catch (err: any) {
        console.error("Failed to save to Firestore backend:", err);
        setCloudError(err?.message || "Cloud backend save failed");
      } finally {
        setIsSavingToCloud(false);
      }
    }, 800); // 800ms debounce

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [personalInfo, skillCategories, projects, certificates, experiences, services, galleryItems]);

  const syncToCloudNow = async (): Promise<boolean> => {
    try {
      setIsSavingToCloud(true);
      const docRef = doc(db, 'portfolio_content', CLOUD_DOC_ID);
      await setDoc(docRef, {
        personalInfo,
        skillCategories,
        projects,
        certificates,
        experiences,
        services,
        galleryItems,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setIsCloudSynced(true);
      setCloudError(null);
      return true;
    } catch (err: any) {
      console.error("Manual cloud sync failed:", err);
      setCloudError(err?.message || "Manual cloud sync failed");
      return false;
    } finally {
      setIsSavingToCloud(false);
    }
  };

  const finishIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem(INTRO_SHOWN_KEY, "true");
  };

  const replayIntro = () => {
    setShowIntro(true);
  };

  const loginAdmin = async (password: string): Promise<boolean> => {
    try {
      const hashed = await sha256(password.trim());
      if (hashed === SECURE_ADMIN_HASH) {
        setIsAdminAuthenticated(true);
        sessionStorage.setItem(AUTH_SESSION_KEY, "true");
        return true;
      }
    } catch (err) {
      console.error("Admin authentication error", err);
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setPersonalInfo(prev => ({ ...prev, ...info }));
  };

  const updateSocials = (socials: Partial<PersonalInfo['socials']>) => {
    setPersonalInfo(prev => ({
      ...prev,
      socials: { ...prev.socials, ...socials }
    }));
  };

  const updateTechnicalSkills = (skills: NonNullable<PersonalInfo['technicalSkills']>) => {
    setPersonalInfo(prev => ({ ...prev, technicalSkills: skills }));
  };

  const updateProfessionalSkills = (skills: NonNullable<PersonalInfo['professionalSkills']>) => {
    setPersonalInfo(prev => ({ ...prev, professionalSkills: skills }));
  };

  const updateSkillCategories = (categories: SkillCategory[]) => {
    setSkillCategories(categories);
  };

  const addSkillCategory = (category: SkillCategory) => {
    setSkillCategories(prev => [...prev, category]);
  };

  const editSkillCategory = (id: string, updated: Partial<SkillCategory>) => {
    setSkillCategories(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteSkillCategory = (id: string) => {
    setSkillCategories(prev => prev.filter(c => c.id !== id));
  };

  const addSkill = (categoryId: string, skill: SkillItem) => {
    setSkillCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        return { ...c, skills: [...c.skills, skill] };
      }
      return c;
    }));
  };

  const editSkill = (categoryId: string, skillIndex: number, updated: SkillItem) => {
    setSkillCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        const newSkills = [...c.skills];
        newSkills[skillIndex] = updated;
        return { ...c, skills: newSkills };
      }
      return c;
    }));
  };

  const deleteSkill = (categoryId: string, skillIndex: number) => {
    setSkillCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        return { ...c, skills: c.skills.filter((_, idx) => idx !== skillIndex) };
      }
      return c;
    }));
  };

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const editProject = (id: string, updated: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateCertificates = (newCerts: CertificateItem[]) => {
    setCertificates(newCerts);
  };

  const addCertificate = (certificate: CertificateItem) => {
    setCertificates(prev => [certificate, ...prev]);
  };

  const editCertificate = (id: string, updated: Partial<CertificateItem>) => {
    setCertificates(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  const updateExperiences = (newExps: ExperienceItem[]) => {
    setExperiences(newExps);
  };

  const addExperience = (experience: ExperienceItem) => {
    setExperiences(prev => [experience, ...prev]);
  };

  const editExperience = (id: string, updated: Partial<ExperienceItem>) => {
    setExperiences(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
  };

  const deleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(e => e.id !== id));
  };

  const updateServices = (newServices: ServiceItem[]) => {
    setServices(newServices);
  };

  const addService = (service: ServiceItem) => {
    setServices(prev => [...prev, service]);
  };

  const editService = (id: string, updated: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const updateGalleryItems = (items: GalleryItem[]) => {
    setGalleryItems(items);
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGalleryItems(prev => [item, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  const resetToDefaults = async () => {
    setPersonalInfo(DEFAULT_PERSONAL_INFO as PersonalInfo);
    setSkillCategories(DEFAULT_SKILL_CATEGORIES);
    setProjects(DEFAULT_PROJECTS);
    setCertificates(DEFAULT_CERTIFICATES);
    setExperiences(DEFAULT_EXPERIENCES);
    setServices(DEFAULT_SERVICES);
    setGalleryItems(DEFAULT_GALLERY_ITEMS);
    localStorage.removeItem(STORAGE_KEY);
    
    // Also reset cloud document
    try {
      const docRef = doc(db, 'portfolio_content', CLOUD_DOC_ID);
      await setDoc(docRef, {
        personalInfo: DEFAULT_PERSONAL_INFO,
        skillCategories: DEFAULT_SKILL_CATEGORIES,
        projects: DEFAULT_PROJECTS,
        certificates: DEFAULT_CERTIFICATES,
        experiences: DEFAULT_EXPERIENCES,
        services: DEFAULT_SERVICES,
        galleryItems: DEFAULT_GALLERY_ITEMS,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Could not reset cloud doc:", e);
    }
  };

  const exportBackup = (): string => {
    return JSON.stringify({
      personalInfo,
      skillCategories,
      projects,
      certificates,
      experiences,
      services,
      galleryItems,
      version: "5.0-cloud",
      exportedAt: new Date().toISOString()
    }, null, 2);
  };

  const importBackup = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.personalInfo) setPersonalInfo(data.personalInfo);
      if (data.skillCategories && Array.isArray(data.skillCategories)) setSkillCategories(data.skillCategories);
      if (data.projects && Array.isArray(data.projects)) setProjects(data.projects);
      if (data.certificates && Array.isArray(data.certificates)) setCertificates(data.certificates);
      if (data.experiences && Array.isArray(data.experiences)) setExperiences(data.experiences);
      if (data.services && Array.isArray(data.services)) setServices(data.services);
      if (data.galleryItems && Array.isArray(data.galleryItems)) setGalleryItems(data.galleryItems);
      return true;
    } catch (e) {
      console.error("Invalid JSON import file", e);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        skillCategories,
        projects,
        certificates,
        experiences,
        services,
        galleryItems,
        isCloudSynced,
        isSavingToCloud,
        cloudError,
        updatePersonalInfo,
        updateSocials,
        updateSkillCategories,
        addSkillCategory,
        editSkillCategory,
        deleteSkillCategory,
        addSkill,
        editSkill,
        deleteSkill,
        updateTechnicalSkills,
        updateProfessionalSkills,
        updateCertificates,
        addCertificate,
        editCertificate,
        deleteCertificate,
        updateExperiences,
        addExperience,
        editExperience,
        deleteExperience,
        updateServices,
        addService,
        editService,
        deleteService,
        updateProjects,
        addProject,
        editProject,
        deleteProject,
        updateGalleryItems,
        addGalleryItem,
        deleteGalleryItem,
        resetToDefaults,
        syncToCloudNow,
        exportBackup,
        importBackup,
        isAdminAuthenticated,
        isAdminModalOpen,
        setIsAdminModalOpen,
        loginAdmin,
        logoutAdmin,
        showIntro,
        finishIntro,
        replayIntro
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
