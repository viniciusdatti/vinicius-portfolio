/**
 * @deprecated Import builders from `plugins/testUtils` instead.
 */
// Types
import { Project, Technology } from '../../data/types';
import { Certificate, Skill } from '../../types';

// Plugins
import {
  buildFakeCertificate,
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
export const mockSkill = buildFakeSkill;
export const mockSkillList = (): Skill[] => MOCKED_SKILL_LIST;
export const mockCertificate = buildFakeCertificate;
export const mockCertificateList = (): Certificate[] => MOCKED_CERTIFICATE_LIST;

export type {
  Project,
  Technology,
  Certificate,
  Skill,
};
