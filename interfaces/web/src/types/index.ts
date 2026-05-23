/* *************************************************************************************************
 ********************************** GLOBAL TYPES FOR PORTFOLIO V2 **********************************
 ************************************************************************************************ */
// Enums (project standard: use Enum instead of string unions)
export enum SkillCategory {
  Frontend = 'frontend',
  Backend = 'backend',
  Testing = 'testing',
  Realtime = 'realtime',
  Tools = 'tools',
  Iot = 'iot',
}

export enum ContactSubmissionStatus {
  Pending = 'pending',
  Read = 'read',
  Replied = 'replied',
  Archived = 'archived',
}

export enum Language {
  Pt = 'pt',
  En = 'en',
}

/** Status for showcase status cards (HighlightCard-style). */
export enum HighlightCardStatus {
  Neutral = 'neutral',
  Success = 'success',
  Error = 'error',
}

/* *************************************************************************************************
 ******************************************* SKILL TYPES *******************************************
 ************************************************************************************************ */
export interface Skill {
  id: number;
  name: string;
  name_pt: string | null;
  category: SkillCategory;
  proficiency: number;
  icon_url: string | null;
  display_order: number;
  is_active: boolean;
}

/* *************************************************************************************************
 **************************************** CERTIFICATE TYPES ****************************************
 ************************************************************************************************ */
export interface Certificate {
  id: number;
  name: string;
  name_pt: string | null;
  platform: string;
  platform_logo_url: string | null;
  certificate_url: string | null;
  image_url: string | null;
  year: number | null;
  display_order: number;
  is_active: boolean;
}

/* *************************************************************************************************
 ****************************************** CONTACT TYPES ******************************************
 ************************************************************************************************ */
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: number;
  status: ContactSubmissionStatus;
  created_at: string;
}

/* *************************************************************************************************
 *************************************** API RESPONSE TYPES ****************************************
 ************************************************************************************************ */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export * from '@/types/telemetry';
export * from '@/types/projectCase';
