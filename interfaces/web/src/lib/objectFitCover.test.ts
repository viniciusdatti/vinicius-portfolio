// Libraries
import { describe, expect, it } from 'vitest';

// Config
import {
  ABOUT_AVATAR_CONTENT_PX,
  AVATAR_CIRCULAR_COVER_POSITION,
  AVATAR_IMAGE_FOCAL_POINT,
  AVATAR_IMAGE_NATURAL_HEIGHT,
  AVATAR_IMAGE_NATURAL_WIDTH,
  AVATAR_PORTRAIT_OBJECT_POSITION,
  computeAvatarPortraitObjectPosition,
} from '../config/avatarImage';

// Component
import {
  computeObjectFitCoverPosition,
  formatObjectFitCoverPosition,
} from './objectFitCover';

describe('computeObjectFitCoverPosition', () => {
  it('centers avatar focal point for square cover crop at any container size', () => {
    const position = computeObjectFitCoverPosition(
      AVATAR_IMAGE_NATURAL_WIDTH,
      AVATAR_IMAGE_NATURAL_HEIGHT,
      ABOUT_AVATAR_CONTENT_PX,
      ABOUT_AVATAR_CONTENT_PX,
      AVATAR_IMAGE_FOCAL_POINT,
    );

    expect(position.xPercent).toBe(50);
    expect(position.yPercent).toBeCloseTo(31.33, 2);
  });

  it('formats the legacy square avatar object-position string', () => {
    expect(AVATAR_CIRCULAR_COVER_POSITION).toBe('50% 31.33%');
    expect(
      formatObjectFitCoverPosition(
        computeObjectFitCoverPosition(
          AVATAR_IMAGE_NATURAL_WIDTH,
          AVATAR_IMAGE_NATURAL_HEIGHT,
          ABOUT_AVATAR_CONTENT_PX,
          ABOUT_AVATAR_CONTENT_PX,
          AVATAR_IMAGE_FOCAL_POINT,
        ),
      ),
    ).toBe(AVATAR_CIRCULAR_COVER_POSITION);
  });

  it('centers face in 5:6 portrait frame object-position', () => {
    expect(AVATAR_PORTRAIT_OBJECT_POSITION).toBe('50% 24.55%');
    expect(computeAvatarPortraitObjectPosition(240, 288)).toBe(AVATAR_PORTRAIT_OBJECT_POSITION);
  });

  it('derives object-position for measured About frame', () => {
    const aboutContentHeight: number = Math.round(196 * (6 / 5));
    expect(computeAvatarPortraitObjectPosition(196, aboutContentHeight)).toBe('50% 24.59%');
  });
});
