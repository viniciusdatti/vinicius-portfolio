// Core
import React from 'react';

// Libraries
import { Variants } from 'framer-motion';

// Hooks
import { ScrollMotionContract } from '../../../hooks/useScrollMotion';

// Types
import { Certificate } from '../../../types';

export interface SkillsCertificatesSectionProps {
  certificates: Certificate[];
  isLoading: boolean;
  isError: boolean;
  isPt: boolean;
  scrollMotion: ScrollMotionContract;
  onRetry: () => void;
  onCertificateSelect: (certificate: Certificate) => void;
}

export interface CertificateCardShellProps {
  itemVariants: Variants;
  platformColor: string;
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
}
