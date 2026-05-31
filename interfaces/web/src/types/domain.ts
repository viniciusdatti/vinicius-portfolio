export enum SkillCategory {
  Frontend = 'frontend',
  Backend = 'backend',
  Testing = 'testing',
  Realtime = 'realtime',
  Tools = 'tools',
  Iot = 'iot',
}

export enum Language {
  Pt = 'pt',
  En = 'en',
}

export enum HighlightCardStatus {
  Neutral = 'neutral',
  Success = 'success',
  Error = 'error',
}

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
