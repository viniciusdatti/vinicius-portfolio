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

export function SkillCardSkeleton(): React.ReactElement {
  return (
    <SkeletonCard>
      <SkeletonIcon />
      <SkeletonInfo>
        <SkeletonName />
        <SkeletonCategory />
      </SkeletonInfo>
    </SkeletonCard>
  );
}
