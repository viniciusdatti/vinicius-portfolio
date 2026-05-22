// Libraries
import { motion } from 'framer-motion';
import styled, { keyframes, DefaultTheme } from 'styled-components';

const scanSweep = (theme: DefaultTheme) => keyframes`
  0% {
    transform: translateY(-120%);
    opacity: 0;
  }
  8% {
    opacity: ${theme.effects.opacity.heroGlowMin};
  }
  92% {
    opacity: ${theme.effects.opacity.heroGlowMin};
  }
  100% {
    transform: translateY(120%);
    opacity: 0;
  }
`;

const gridPulse = keyframes`
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.55; }
`;

export const HeroAmbientLayer = styled.div<{
  $pointerX: number;
  $pointerY: number;
}>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  --hero-glow-x: ${({ $pointerX }) => $pointerX};
  --hero-glow-y: ${({ $pointerY }) => $pointerY};
`;

export const HeroOperationalGrid = styled.div`
  position: absolute;
  inset: -1px;
  background-image:
    linear-gradient(
      ${({ theme }) => theme.colors.borderSubtle}40 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.borderSubtle}40 1px,
      transparent 1px
    );
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 85% 70% at 50% 40%, black 20%, transparent 72%);
  opacity: 0.5;
  animation: ${gridPulse} 8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const HeroNoiseLayer = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
`;

export const HeroScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  top: 0;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.accent}55 20%,
    ${({ theme }) => theme.colors.accent}88 50%,
    ${({ theme }) => theme.colors.accent}55 80%,
    transparent
  );
  animation: ${({ theme }) => scanSweep(theme)} 9s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const HeroMouseGlow = styled(motion.div)<{
  $active: boolean;
}>`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  background: radial-gradient(
    ellipse 42% 38% at calc(var(--hero-glow-x, 50%) * 100%)
      calc(var(--hero-glow-y, 40%) * 100%),
    ${({ theme }) => theme.colors.primary}18 0%,
    transparent 68%
  );
  transition: opacity ${({ theme }) => theme.transitions.slow};

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;
