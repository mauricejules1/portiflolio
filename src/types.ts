export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
  credentialUrl?: string;
  description?: string;
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  location: string;
  country: string;
  avatarUrl: string;
  portraitUrl: string;
  
  // Logo & Branding settings
  logoUrl?: string;
  customLogoUrl?: string;
  logoType?: 'text' | 'image' | 'both';
  logoText?: string;
  logoTextHighlight?: string;
  useImageLogo?: boolean;

  // Hero / Home customizations
  heroGreeting?: string;
  heroTypingPrefix?: string;
  heroRoles?: string[];
  heroIntro?: string;
  heroCtaText?: string;
  heroCtaLink?: string;

  // About customizations
  aboutHeading?: string;
  aboutSubheading?: string;
  aboutChecklist?: string[];
  aboutImageUrl?: string;
  learningGoals?: string[];

  // Resume / CV
  resumeUrl?: string;
  cvUploaded?: boolean;

  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  fieldOfStudy: string;
  status: string;
  bio: string;
  stats: { label: string; value: string; icon: string }[];
  socials: {
    github: string;
    linkedin: string;
    whatsapp: string;
    email: string;
    twitter: string;
    instagram?: string;
    facebook?: string;
    whatsappName?: string;
    instagramName?: string;
    facebookName?: string;
    githubName?: string;
    linkedinName?: string;
  };

  // Technical & Professional Skills
  technicalSkills?: { id: string; name: string; level: number; iconColor: string; iconText: string }[];
  professionalSkills?: { id: string; name: string; percentage: number }[];
  certificates?: CertificateItem[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'systems' | 'hardware' | 'networking' | 'web' | 'maintenance' | string;
  imageUrl?: string;
  description: string;
  longDescription: string;
  problemStatement?: string;
  solutionArchitecture?: string;
  keyFeatures: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  architectureDiagram?: string[];
  metrics?: { label: string; value: string }[];
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
  tags: string[];
  uploadedAt?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
  experienceYears?: string;
  tag: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  type: 'academic' | 'project' | 'leadership' | 'internship';
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  popular?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatarText: string;
  content: string;
  relationship: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  whatsappOrPhone: string;
  subject: string;
  serviceType: string;
  message: string;
  createdAt: string;
}


