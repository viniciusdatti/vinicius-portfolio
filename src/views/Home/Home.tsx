import React from 'react';
import { Hero } from '../../components/Hero';
import { ProjectGrid } from '../../components/ProjectGrid';
import type { Project } from '../../components/ProjectGrid';
import { ProjectsSection } from './Home.style';

const projects: Project[] = [
  {
    title: 'Sistema de Design Corporativo',
    description:
      'Biblioteca de componentes reutilizáveis e documentação viva para padronizar a interface de produtos enterprise, com tokens de design e acessibilidade WCAG.',
    tags: ['React', 'TypeScript', 'Storybook', 'Styled Components'],
    link: '#',
  },
  {
    title: 'Dashboard de Performance',
    description:
      'Painel em tempo real para métricas de negócio, com gráficos interativos, filtros por período e exportação de relatórios.',
    tags: ['React', 'TypeScript', 'Chart.js', 'REST API'],
    link: '#',
  },
  {
    title: 'Plataforma de Investimentos',
    description:
      'Aplicação para simulação de carteira, acompanhamento de ativos e onboarding de novos investidores com fluxo guiado.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    link: '#',
  },
];

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ProjectsSection id="projetos">
        <ProjectGrid projects={projects} />
      </ProjectsSection>
    </>
  );
};
