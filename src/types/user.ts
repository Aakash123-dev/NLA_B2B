import { BaseEntity, Status } from './common';

// User-facing application types
export interface Project extends BaseEntity {
  title: string;
  description: string;
  version: string;
  logo: string;
  color: string;
  progress?: number;
  features: string[];
  status: Status;
  createdBy: string;
  updatedBy?: string;
}

export interface Template extends BaseEntity {
  name: string;
  description: string;
  category: string;
  isPublic: boolean;
  thumbnail?: string;
  config: TemplateConfig;
}

export interface TemplateConfig {
  [key: string]: any;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface UserProfile {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  companyInfo: {
    companyName: string;
    address: string;
    website?: string;
  };
  preferences: {
    timezone: string;
    language: string;
    theme: 'light' | 'dark' | 'system';
  };
  notifications: NotificationSettings;
}
