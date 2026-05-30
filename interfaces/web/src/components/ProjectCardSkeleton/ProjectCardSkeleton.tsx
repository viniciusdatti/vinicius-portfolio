// Core
import React from 'react';

// Styles
import {
  SkeletonCard,
  SkeletonTitle,
  SkeletonDescription,
  SkeletonLine,
  SkeletonTagList,
  SkeletonTag,
  SkeletonLinks,
  SkeletonButton,
} from './ProjectCardSkeleton.style';

export const ProjectCardSkeleton = (): React.ReactElement => (
  <SkeletonCard>
    <SkeletonTitle />
    <SkeletonDescription>
      <SkeletonLine $width="100%" />
      <SkeletonLine $width="90%" />
      <SkeletonLine $width="75%" />
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
