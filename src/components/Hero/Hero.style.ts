// Libraries
import styled, { keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02);
  }
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  text-align: center;
  position: relative;
  padding: 2rem;
`;

export const GlowBackdrop = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(90vw, 480px);
  height: 200px;
  background: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    ${({ theme }) => theme.colors.primary}40 0%,
    ${({ theme }) => theme.colors.primary}15 40%,
    transparent 70%
  );
  pointer-events: none;
  animation: ${pulseGlow} 3s ease-in-out infinite;
  z-index: 0;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const HeroName = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.25rem, 6vw + 1rem, 4rem);
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text} 0%,
    ${({ theme }) => theme.colors.primary} 50%,
    ${({ theme }) => theme.colors.text} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

export const HeroTitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw + 0.75rem, 1.5rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  letter-spacing: 0.02em;
`;

export const CtaWrapper = styled.div`
  margin-top: 2rem;
`;

export const CtaButtonWrapper = styled.div`
  display: inline-block;
`;
