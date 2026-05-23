// Libraries
import styled from 'styled-components';

// Components
import { PageContainer } from '@/styles/pageLayout.style';

// =================================================================================================
// ========================================== PAGE SHELL ===========================================
// =================================================================================================

/**
 * Live Lab operational shell — canonical PageContainer with header clearance via Layout Main.
 * Top padding is zero here because Main already applies theme.sizes.layout.headerOffset.
 */
export const LiveLabPageShell = styled(PageContainer)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
  isolation: isolate;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: none;
  margin-left: auto;
  margin-right: auto;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${({ theme }) => theme.spacing.pageX};
  padding-right: ${({ theme }) => theme.spacing.pageX};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: ${({ theme }) => theme.spacing.lg};
    padding-right: ${({ theme }) => theme.spacing.lg};
  };
`;
