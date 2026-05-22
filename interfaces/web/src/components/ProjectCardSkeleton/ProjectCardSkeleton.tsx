/**
 * Skeleton loading component for project cards.
 */

import React from 'react';
import {
  SkeletonCard,
  SkeletonTitle,
  SkeletonDescription,
  SkeletonLine,
  SkeletonTagList,
  SkeletonTag,
  SkeletonLinks,
  SkeletonButton,
} from '@/components/ProjectCardSkeleton/ProjectCardSkeleton.style';

export function ProjectCardSkeleton(): React.ReactElement {
  return (
    <SkeletonCard>
      <SkeletonTitle />
      <SkeletonDescription>
        <SkeletonLine width="100%" />
        <SkeletonLine width="90%" />
        <SkeletonLine width="75%" />
      </SkeletonDescription>
      <SkeletonTagList>
        <SkeletonTag />
        <SkeletonTag />
        <SkeletonTag />
        <SkeletonTag />
      </SkeletonTagList>
      <SkeletonLinks>
        <SkeletonButton />
        <SkeletonButton />
      </SkeletonLinks>
    </SkeletonCard>
  );
}
