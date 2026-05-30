// Core
import React from 'react';

// Libraries
import { Variants } from 'framer-motion';

// Types
import { SkillLayoutTier } from '../../../../domain/skills';

export interface SkillEditorialCardShellProps {
  tier: SkillLayoutTier;
  gridSpan: number;
  itemVariants: Variants;
  children: React.ReactNode;
}
