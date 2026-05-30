// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styles
import { panelChrome } from '../../../styles/surfaces';

export const CertificateModalViewport = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ModalOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.sm});
`;

export const ModalContent = styled(motion.div)`
  position: relative;
  ${panelChrome};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  max-width: 500px;
  width: 100%;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ModalCloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.text};
  };
`;

export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ModalCertificateInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export interface ModalPlatformBadgeProps {
  $bgColor?: string;
  $color?: string;
}

export const ModalPlatformBadge = styled.div<ModalPlatformBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  };
`;

export const ModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.4;
`;

export const ModalMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ModalMetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
  };
`;

export const ModalActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export interface ModalButtonProps {
  $variant: 'primary' | 'secondary';
  $platformColor?: string;
}

export const ModalButton = styled.button<ModalButtonProps>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  ${({ $variant, $platformColor, theme }) => ($variant === 'primary'
    ? `
          background-color: ${$platformColor || theme.colors.primary};
          color: white;

          &:hover {
            filter: brightness(1.1);
          }
        `
    : `
          background-color: ${theme.colors.backgroundSecondary};
          color: ${theme.colors.textSecondary};

          &:hover {
            background-color: ${theme.colors.border};
          }
        `)}
`;
