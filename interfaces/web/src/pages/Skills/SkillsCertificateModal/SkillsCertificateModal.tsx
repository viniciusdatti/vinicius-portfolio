// Core
import React, {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

// Libraries
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

// Styles
import { motionEase } from '../../../styles/animations';
import { motionPresets } from '../../../styles/motionPresets';
import {
  CertificateModalViewport,
  ModalActions,
  ModalBody,
  ModalCertificateInfo,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalMeta,
  ModalMetaItem,
  ModalOverlay,
  ModalPlatformBadge,
  ModalButton,
  ModalTitle,
} from './SkillsCertificateModal.style';

// Types
import {
  getPlatformConfig,
  resolveCertificateDisplayName,
} from '../../../domain/skills';
import { SkillsCertificateModalProps } from './SkillsCertificateModal.types';

// Utils
import { BodyScrollLockClass, lockBodyScroll } from '../../../utils/bodyScrollLock';
import { trapTabKey } from '../../../utils/focusTrap';

export const SkillsCertificateModal: React.FC<SkillsCertificateModalProps> = ({
  certificate,
  isPt,
  onClose,
}): React.ReactElement | null => {
  const { t } = useTranslation();
  const reducedMotion: boolean = usePrefersReducedMotion();
  const titleId: string = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleViewCertificate = useCallback((): void => {
    if (certificate?.certificate_url) {
      window.open(certificate.certificate_url, '_blank', 'noopener,noreferrer');
    }
  }, [certificate]);

  useLayoutEffect(() => {
    if (!certificate) {
      return undefined;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const unlockScroll = lockBodyScroll(BodyScrollLockClass.Modal);

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (panelRef.current) {
        trapTabKey(panelRef.current, event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
      previousFocusRef.current?.focus({ preventScroll: true });
    };
  }, [certificate, onClose]);

  if (typeof document === 'undefined') {
    return null;
  }

  const platformConfig = certificate
    ? getPlatformConfig(certificate.platform)
    : null;

  return createPortal(
    <AnimatePresence>
      {certificate && platformConfig ? (
        <CertificateModalViewport>
          <ModalOverlay
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <ModalContent
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: motionPresets.distance.item }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: motionPresets.distance.item }
            }
            transition={{
              duration: motionPresets.duration.normal,
              ease: motionEase,
            }}
          >
            <ModalHeader>
              <ModalPlatformBadge
                $bgColor={platformConfig.bgColor}
                $color={platformConfig.color}
              >
                <img
                  src={platformConfig.logo}
                  alt={certificate.platform}
                />
                {certificate.platform}
              </ModalPlatformBadge>
              <ModalCloseButton
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={t('skills.certificates.close')}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                  />
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                  />
                </svg>
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <ModalCertificateInfo>
                <ModalTitle id={titleId}>
                  {resolveCertificateDisplayName(certificate, isPt)}
                </ModalTitle>
                <ModalMeta>
                  {certificate.year != null && (
                    <ModalMetaItem>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line
                          x1="16"
                          y1="2"
                          x2="16"
                          y2="6"
                        />
                        <line
                          x1="8"
                          y1="2"
                          x2="8"
                          y2="6"
                        />
                        <line
                          x1="3"
                          y1="10"
                          x2="21"
                          y2="10"
                        />
                      </svg>
                      {certificate.year}
                    </ModalMetaItem>
                  )}
                </ModalMeta>
              </ModalCertificateInfo>
              <ModalActions>
                {certificate.certificate_url && (
                  <ModalButton
                    $variant="primary"
                    onClick={handleViewCertificate}
                    $platformColor={platformConfig.color}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line
                        x1="10"
                        y1="14"
                        x2="21"
                        y2="3"
                      />
                    </svg>
                    {t('skills.certificates.viewCertificate')}
                  </ModalButton>
                )}
                <ModalButton $variant="secondary" onClick={onClose}>
                  {t('skills.certificates.close')}
                </ModalButton>
              </ModalActions>
            </ModalBody>
          </ModalContent>
        </CertificateModalViewport>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
