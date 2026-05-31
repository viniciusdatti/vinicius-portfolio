// Core
import React from 'react';

// Libraries
import { Variants } from 'framer-motion';

// Hooks
import { ScrollMotionContract } from '../../../hooks/useScrollMotion';

export interface SkillsExperienceSectionProps {
  scrollMotion: ScrollMotionContract;
}

export interface ExperienceCardShellProps {
  itemVariants: Variants;
  featured: boolean;
  children: React.ReactNode;
}
