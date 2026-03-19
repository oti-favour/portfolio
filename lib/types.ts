export interface SocialLinks {
  github: string;
  linkedin: string;
}

export interface Personal {
  name: string;
  logo: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  aboutText: string;
  socialLinks: SocialLinks;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface TechStack {
  languages: TechItem[];
  frameworks: TechItem[];
  tools: TechItem[];
}

export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  /** Marketing / live website */
  link?: string;
  /** iOS App Store */
  appStoreUrl?: string;
  /** Google Play */
  playStoreUrl?: string;
  color: string;
  thumbnail?: string;
  featured?: boolean;
}

export interface PortfolioData {
  personal: Personal;
  navLinks: NavLink[];
  stats: Stat[];
  techStack: TechStack;
  experience: Experience[];
  projects: Project[];
}
