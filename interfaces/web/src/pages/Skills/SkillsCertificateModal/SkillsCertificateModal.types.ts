// Types
import { Certificate } from '../../../types';

export interface SkillsCertificateModalProps {
  certificate: Certificate | null;
  isPt: boolean;
  onClose: () => void;
}
