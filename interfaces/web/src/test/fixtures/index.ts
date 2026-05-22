/**
 * @deprecated Import builders from `plugins/testUtils` in new tests.
 * Kept for backward compatibility with MSW handlers and legacy imports.
 */

import type { Project, Technology } from '../../data/types';
import type { Certificate, ChatMessage, Skill } from '../../types';
import {
  buildFakeAdminChatMessage,
  buildFakeCertificate,
  buildFakeChatMessage,
  buildFakeProject,
  buildFakeSkill,
  buildFakeTechnology,
  MOCKED_CERTIFICATE_LIST,
  MOCKED_PROJECT_LIST,
  MOCKED_SKILL_LIST,
} from '../../plugins/testUtils';

export const mockTechnology = buildFakeTechnology;
export const mockProject = buildFakeProject;
export const mockProjectList = (): Project[] => MOCKED_PROJECT_LIST;
export const mockChatMessage = buildFakeChatMessage;
export const mockAdminMessage = buildFakeAdminChatMessage;
export const mockSkill = buildFakeSkill;
export const mockSkillList = (): Skill[] => MOCKED_SKILL_LIST;
export const mockCertificate = buildFakeCertificate;
export const mockCertificateList = (): Certificate[] => MOCKED_CERTIFICATE_LIST;

export type { Project, Technology, Certificate, ChatMessage, Skill };
