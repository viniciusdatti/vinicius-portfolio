// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

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
`;

export const PageTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.display};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradientTextDisplay};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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
