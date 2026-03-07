// ============================================
// Global Types for Portfolio V2
// ============================================

// Enums (project standard: use Enum instead of string unions)
export enum SkillCategory {
  Frontend = 'frontend',
  Backend = 'backend',
  Testing = 'testing',
  Realtime = 'realtime',
  Tools = 'tools',
  Iot = 'iot',
}

export enum ChatSessionStatus {
  Active = 'active',
  Closed = 'closed',
  Archived = 'archived',
}

export enum ChatMessageSenderType {
  Visitor = 'visitor',
  Admin = 'admin',
}

export enum ContactSubmissionStatus {
  Pending = 'pending',
  Read = 'read',
  Replied = 'replied',
  Archived = 'archived',
}

export enum UserRole {
  Admin = 'admin',
  SuperAdmin = 'super_admin',
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

// Skill Types
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

// Certificate Types
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

// Chat Types
export interface ChatSession {
  session_id: string;
  visitor_name: string;
  visitor_company: string | null;
  status: ChatSessionStatus;
  unread_count: number;
  last_message: string | null;
  started_at: string;
}

export interface ChatMessage {
  id: number;
  content: string;
  sender_type: ChatMessageSenderType;
  is_read: boolean;
  created_at: string;
}

// Contact Types
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

// Auth Types
export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// Project Types (existing)
export interface Technology {
  id: number;
  name: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  title_pt: string | null;
  description: string | null;
  description_pt: string | null;
  repository_url: string;
  demo_url: string | null;
  technologies: Technology[];
  created_at: string;
  updated_at: string;
}

// API Response Types
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
