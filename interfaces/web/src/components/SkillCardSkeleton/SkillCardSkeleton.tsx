/**
 * Skeleton loading component for skill cards.
 */

// Core
import React from 'react';

// Component
import {
  SkeletonCard,
  SkeletonIcon,
  SkeletonInfo,
  SkeletonName,
  SkeletonCategory,
} from './SkillCardSkeleton.style';

export const SkillCardSkeleton = (): React.ReactElement => (
  <SkeletonCard>
    <SkeletonIcon />
    <SkeletonInfo>
      <SkeletonName />
      <SkeletonCategory />
    </SkeletonInfo>
  </SkeletonCard>
);
