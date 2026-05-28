// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PHYSICAL_PERSPECTIVE_PX } from '../../../lib/motionPhysics';

// Components
import { operationalGlassDeep } from '../../../styles/surfaces';

export const HeroPortraitBustRoot = styled(motion.div)`
  display: none;
  position: relative;
  z-index: 2;
  width: min(100%, ${({ theme }) => theme.sizes.hero.avatarFrame});
  max-width: 320px;
  aspect-ratio: 4 / 5;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  ${operationalGlassDeep};
  pointer-events: none;
  perspective: ${PHYSICAL_PERSPECTIVE_PX}px;
  transform-style: preserve-3d;
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
    margin-top: calc(
      ${({ theme }) => theme.spacing.md} + ${({ theme }) => theme.spacing.sm}
    );
    margin-bottom: 0;
  };
`;
