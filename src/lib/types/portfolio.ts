// Core types for portfolio content
export interface BaseMetadata {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  version?: number;
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex?: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  website?: string;
}

// BioCluster Types
export interface BioContent {
  name: string;
  tagline: string;
  position: string;
  location: string;
  profileImage: string;
  personalStory: string;
  missionStatement: string;
  socialLinks: SocialLink[];
  contactInfo: ContactInfo;
  timeline?: TimelineItem[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  milestone: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  yearsOfExperience: number;
  certifications: string[];
  description: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface BioClusterCard {
  id: string;
  cardType: 'bio' | 'welcome' | 'skills' | 'experience' | 'medals' | 'ask' | 'miniGallery' | 'testimonialCarousel' | 'featuredArticles' | 'featuredSocialEmbeds' | 'newsTicker';
  title: string;
  isActive: boolean;
  position: Position;
  content: any; // Will be typed based on cardType
  metadata: BaseMetadata;
}