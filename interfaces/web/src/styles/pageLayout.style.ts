// Libraries
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import {
  cardInteractive,
  operationalGlass,
} from '@/styles/surfaces';

// =================================================================================================
// ========================================== PAGE SHELL ===========================================
// =================================================================================================

const pageShellPadding = css`
  padding: ${({ theme }) => theme.spacing.pageY}
    ${({ theme }) => theme.spacing.pageX};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl}
      ${({ theme }) => theme.spacing.lg};
  };
`;

export const PageContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMax};
  margin: 0 auto;
  padding-bottom: clamp(3rem, 8vw, 5rem);
  ${pageShellPadding};

  @media (min-width: ${({ theme }) => theme.breakpoints.ultraWide}) {
    max-width: ${({ theme }) => theme.layout.contentWide};
  };
`;

/** About — slightly narrower reading measure */
export const PageContainerNarrow = styled(PageContainer)`
  max-width: ${({ theme }) => theme.layout.contentNarrow};

  @media (min-width: ${({ theme }) => theme.breakpoints.ultraWide}) {
    max-width: ${({ theme }) => theme.layout.contentMax};
  };
`;

/** Projects — wide showcase canvas */
export const PageContainerWide = styled(PageContainer)`
  max-width: ${({ theme }) => theme.layout.contentWide};

  @media (min-width: ${({ theme }) => theme.breakpoints.ultraWide}) {
    max-width: ${({ theme }) => theme.layout.contentWide};
  };
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(2.5rem, 6vw, ${({ theme }) => theme.spacing.sectionSm});
  max-width: ${({ theme }) => theme.layout.proseWide};
  margin-left: auto;
  margin-right: auto;
  scroll-margin-top: calc(${({ theme }) => theme.sizes.layout.headerOffset} + 0.5rem);
`;

/** Gradient mask lives on inner span so Framer blur filters never flatten the H1. */
export const PageTitleGradient = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.gradientTextDisplay};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

export const PageTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.display};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: transparent;
`;

export const PageSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.prose};
  margin-left: auto;
  margin-right: auto;
`;

export const SectionEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: '';
    width: 20px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.45;
    flex-shrink: 0;
  }
`;

export const PageHeaderLeft = styled(PageHeader)`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
    margin-left: 0;
    margin-right: 0;
  }
`;

export const PageTitleLeft = styled(PageTitle)`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  };
`;

// =================================================================================================
// ======================================== PAGE SECTIONS ==========================================
// =================================================================================================

export const PageSection = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.sectionSm};
`;

export const PageSectionSpacious = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.section};
  padding-bottom: clamp(2rem, 6vw, 4rem);
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  text-wrap: balance;
`;

// =================================================================================================
// =================================== EDITORIAL HEADER SPLIT ======================================
// =================================================================================================

export const PageHeaderEditorial = styled(PageHeader)`
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.xxl};
    align-items: end;
    max-width: 100%;
    text-align: left;
  };
`;

export const PageHeaderMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  };
`;

export const PageHeaderAside = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: 0;
    display: block;
  };
`;

const eyebrowLineExpand = keyframes`
  from {
    width: 0;
    opacity: 0;
  };
  to {
    width: 24px;
    opacity: 1;
  };
`;

export const SectionEyebrowAnimated = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: '';
    display: block;
    height: 1px;
    width: 0;
    background: ${({ theme }) => theme.colors.accent};
    animation: ${eyebrowLineExpand} 500ms ${({ theme }) => theme.motion.easeOut} 200ms both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      width: 24px;
    };
  };
`;

export const PageLead = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.prose};
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-left: 0;
    margin-right: 0;
  };
`;

// =================================================================================================
// ===================================== PAGE CARD SURFACE =========================================
// =================================================================================================

export const PageCard = styled(motion.div)`
  ${operationalGlass};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  ${cardInteractive};

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }
`;
