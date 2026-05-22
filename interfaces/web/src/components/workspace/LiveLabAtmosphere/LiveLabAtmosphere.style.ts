// Libraries
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const gridFlow = keyframes`
  0% {
    transform: rotateX(68deg) rotateZ(0deg) translateZ(0);
  }
  100% {
    transform: rotateX(68deg) rotateZ(360deg) translateZ(0);
  }
`;

const scanPulse = keyframes`
  0%, 100% {
    opacity: 0.15;
    transform: translateY(-30%) scaleX(0.6);
  }
  50% {
    opacity: 0.45;
    transform: translateY(10%) scaleX(1);
  }
`;

const orbDrift = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(4%, -3%) scale(1.08);
  }
`;

export const AtmosphereDepthVeil = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 100% 75% at 50% 100%, rgba(0, 0, 0, 0.5) 0%, transparent 65%),
    linear-gradient(0deg, rgba(6, 7, 8, 0.85) 0%, transparent 42%);
  z-index: 2;
`;

export const AtmosphereRoot = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(180deg, transparent 0%, rgba(4, 5, 6, 0.55) 100%);
`;

export const GlCanvasWrap = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
`;

export const AtmosphereOrb = styled.div`
  position: absolute;
  width: 55%;
  height: 45%;
  top: -8%;
  right: -12%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.primary}22 0%,
    transparent 68%
  );
  filter: blur(48px);
  animation: ${orbDrift} 14s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const AtmosphereOrbSecondary = styled(AtmosphereOrb)`
  top: auto;
  bottom: -15%;
  left: -18%;
  right: auto;
  width: 48%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.accent}16 0%,
    transparent 70%
  );
  animation-duration: 18s;
  animation-direction: reverse;
`;

export const PerspectiveStage = styled.div`
  position: absolute;
  inset: 0;
  perspective: 1100px;
  perspective-origin: 50% 35%;
`;

export const GridFloor = styled(motion.div)`
  position: absolute;
  left: -35%;
  top: 18%;
  width: 170%;
  height: 140%;
  transform-style: preserve-3d;
  transform: rotateX(68deg);
  background-image:
    linear-gradient(
      ${({ theme }) => theme.colors.borderSubtle}55 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.borderSubtle}55 1px,
      transparent 1px
    );
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 75% 55% at 50% 42%, black 10%, transparent 72%);
  opacity: 0.55;
  animation: ${gridFlow} 90s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const HorizonLine = styled.div`
  position: absolute;
  left: 5%;
  right: 5%;
  top: 42%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.accent}66 30%,
    ${({ theme }) => theme.colors.primary}88 50%,
    ${({ theme }) => theme.colors.accent}66 70%,
    transparent
  );
  opacity: 0.55;
`;

export const ScanBeam = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 28%;
  height: 35%;
  background: linear-gradient(
    180deg,
    transparent,
    ${({ theme }) => theme.colors.primary}08 45%,
    transparent
  );
  animation: ${scanPulse} 6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const NoiseVeil = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
`;
