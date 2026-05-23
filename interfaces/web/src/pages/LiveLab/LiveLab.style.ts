/**
 * @fileoverview Live Lab page shell layout overrides.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Libraries
import styled from 'styled-components';

// Components
import { PageContainerWide } from '@/styles/pageLayout.style';

/* *************************************************************************************************
 ******************************************* PAGE SHELL ********************************************
 ************************************************************************************************ */

/**
 * Live Lab operational shell — canonical PageContainer with header clearance via Layout Main.
 * Top padding is zero here because Main already applies theme.sizes.layout.headerOffset.
 */
export const LiveLabPageShell = styled(PageContainerWide)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
  isolation: isolate;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 100%;
  padding-top: 0;
  padding-bottom: 0;
  overflow-x: hidden;
  overflow-y: visible;
`;
