// src/lib/portfolio-schema.ts
export type Link = { label: string; href: string };

export type Project = {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  links?: Link[];
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type Experience = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
};

export type Education = {
  school: string;
  detail: string;
  years: string;
};

export type PortfolioProfile = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  headline: string;
  summary: string;
  links: {
    github?: string;
    linkedin?: string;
    featuredRepo?: string;
    resume?: string; // /resume.pdf
  };
};

export type PortfolioData = {
  profile: PortfolioProfile;
  projects: Project[];
  skills: SkillGroup[];
  experience: Experience[];
  certifications: string[];
  education: Education[];
  techTicker: string[]; // for marquee/slider
};

export const STORAGE_KEY = "portfolio.data.v1";

export function safeParsePortfolioData(input: unknown): PortfolioData | null {
  try {
    if (!input || typeof input !== "object") return null;
    // minimal structural validation (kept light on purpose)
    const d = input as Record<string, unknown>;
    if (!d.profile || !d.projects || !d.skills || !d.experience) return null;
    return input as PortfolioData;
  } catch {
    return null;
  }
}
