export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface ProjectGridProps {
  projects: Project[];
}
