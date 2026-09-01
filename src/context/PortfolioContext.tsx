import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PERSONAL_INFO as DEFAULT_PERSONAL_INFO, 
  SKILL_CATEGORIES as DEFAULT_SKILL_CATEGORIES, 
  PROJECTS as DEFAULT_PROJECTS,
  SERVICES as DEFAULT_SERVICES,
  GALLERY_ITEMS as DEFAULT_GALLERY_ITEMS
} from '../data/portfolioData';
import { PersonalInfo, SkillCategory, SkillItem, Project, ServiceItem, GalleryItem } from '../types';

// Cryptographic SHA-256 hash of the administrative access key
// The plaintext password is never stored or exposed anywhere in the client code or UI.
const SECURE_ADMIN_HASH = "20d58c3267bb60d22739820da26d34a3ebd6157e8cc0ef6dfa49c8e8a7c6a61f";
const STORAGE_KEY = "muhire_jules_portfolio_state_v3";
const AUTH_SESSION_KEY = "muhire_jules_admin_session";
const INTRO_SHOWN_KEY = "muhire_jules_intro_shown";

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  skillCategories: SkillCategory[];
  projects: Project[];
  services: ServiceItem[];
  galleryItems: GalleryItem[];
  
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

  // Media & Gallery Management
  updateGalleryItems: (items: GalleryItem[]) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Backup & Reset
  resetToDefaults: () => void;
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

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Intro state
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return sessionStorage.getItem(INTRO_SHOWN_KEY) !== "true";
  });

  // Persist on state change
  useEffect(() => {
    try {
      const payload = {
        personalInfo,
        skillCategories,
        projects,
        services,
        galleryItems,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [personalInfo, skillCategories, projects, services, galleryItems]);

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

  const resetToDefaults = () => {
    setPersonalInfo(DEFAULT_PERSONAL_INFO as PersonalInfo);
    setSkillCategories(DEFAULT_SKILL_CATEGORIES);
    setProjects(DEFAULT_PROJECTS);
    setServices(DEFAULT_SERVICES);
    setGalleryItems(DEFAULT_GALLERY_ITEMS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportBackup = (): string => {
    return JSON.stringify({
      personalInfo,
      skillCategories,
      projects,
      services,
      galleryItems,
      version: "3.0",
      exportedAt: new Date().toISOString()
    }, null, 2);
  };

  const importBackup = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.personalInfo) setPersonalInfo(data.personalInfo);
      if (data.skillCategories && Array.isArray(data.skillCategories)) setSkillCategories(data.skillCategories);
      if (data.projects && Array.isArray(data.projects)) setProjects(data.projects);
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
        services,
        galleryItems,
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

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

