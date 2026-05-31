// Core
import React from 'react';

// Styles
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
