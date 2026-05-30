export interface Technology {
  id: number;
  name: string;
  slug: string;
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
