/**
 * @fileoverview Styled components for the public Layout shell and page motion layer.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

/* *************************************************************************************************
 ******************************************** SKIP LINK ********************************************
 ************************************************************************************************ */

export const SkipLink = styled.a`
  position: fixed;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.toast + 1};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  transform: translateY(-${({ theme }) => theme.motion.distance.skipLinkHidden});
  opacity: ${({ theme }) => theme.effects.opacity.skipLinkHidden};
  pointer-events: none;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast};

  &:focus {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  };
`;

/* *************************************************************************************************
 ********************************************** MAIN ***********************************************
 ************************************************************************************************ */

export const Main = styled.main<{ $workspaceMode?: boolean }>`
  outline: none;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding-top: ${({ theme }) => theme.sizes.layout.headerOffset};

  ${({ $workspaceMode, theme }) => ($workspaceMode
    ? css`
          min-height: calc(100vh - ${theme.sizes.layout.headerOffset});
          display: flex;
          flex-direction: column;
          overflow-x: hidden;

          body:not(.live-lab-immersive) & {
            height: auto;
            max-height: none;
            overflow-y: auto;
          }

          body.live-lab-immersive & {
            height: calc(100vh - ${theme.sizes.layout.headerOffset});
            max-height: calc(100vh - ${theme.sizes.layout.headerOffset});
            overflow: visible;
          }
        `
    : css`
          position: relative;
          z-index: ${theme.zIndex.content};
          min-height: 100vh;
          /* clip — unlike hidden, does not force overflow-y to compute as auto */
          overflow-x: clip;
          overflow-y: visible;
        `)};
`;

export const PageMotionLayer = styled(motion.div)<{ $workspace?: boolean }>`
  ${({ $workspace, theme }) => ($workspace
    ? css`
          position: relative;
          z-index: ${theme.zIndex.base};
          height: 100%;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;

          body:not(.live-lab-immersive) & {
            height: auto;
            min-height: calc(100vh - ${theme.sizes.layout.headerOffset});
            overflow: visible;
          }
        `
    : css`
          position: relative;
          z-index: ${theme.zIndex.content};
          min-height: 0;
          overflow: visible;
        `)};
`;

/* *************************************************************************************************
 ************************************* WORKSPACE MOTION SHELL **************************************
 ************************************************************************************************ */

/**
 * Flex column wrapper for the Live Lab page transition motion.div.
 * Replaces the inline style={{ height: '100%', display: 'flex', flexDirection: 'column' }}.
 */
export const WorkspaceMotionShell = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  body:not(.live-lab-immersive) & {
    height: auto;
    min-height: calc(100vh - ${({ theme }) => theme.sizes.layout.headerOffset});
  }
`;
