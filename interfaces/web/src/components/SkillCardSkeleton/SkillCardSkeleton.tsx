/**
 * Skeleton loading component for skill cards.
 */

import React from 'react';
import {
  SkeletonCard,
  SkeletonIcon,
  SkeletonInfo,
  SkeletonName,
  SkeletonCategory,
} from '@/components/SkillCardSkeleton/SkillCardSkeleton.style';

export const SkillCardSkeleton = (): React.ReactElement => (
  <SkeletonCard>
    <SkeletonIcon />
    <SkeletonInfo>
      <SkeletonName />
      <SkeletonCategory />
    </SkeletonInfo>
  </SkeletonCard>
);
