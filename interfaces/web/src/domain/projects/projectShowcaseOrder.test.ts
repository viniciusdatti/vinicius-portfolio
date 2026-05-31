// Libraries
import {
  describe,
  it,
  expect,
} from 'vitest';

// Types
import { Project } from '../../data/types';

// Domain
import {
  isFeaturedShowcaseProject,
  partitionProjectsByTier,
} from './projectShowcaseOrder';

// Plugins
import { buildFakeProject } from '../../plugins/testUtils';

describe('projectShowcaseOrder', (): void => {
  it('should treat is_featured as the primary tier signal', (): void => {
    const featured: Project = buildFakeProject({
      id: 10,
      title: 'custom-featured',
      is_featured: true,
      repository_url: 'https://github.com/viniciusdatti/custom-featured',
    });

    expect(isFeaturedShowcaseProject(featured)).toBe(true);
  });

  it('should fall back to the portfolio repository fragment when is_featured is false', (): void => {
    const portfolio: Project = buildFakeProject({
      is_featured: false,
      repository_url: 'https://github.com/viniciusdatti/vinicius-portfolio',
    });

    expect(isFeaturedShowcaseProject(portfolio)).toBe(true);
  });

  it('should partition projects into featured and studies tiers', (): void => {
    const featured: Project = buildFakeProject({
      id: 1,
      is_featured: true,
      repository_url: 'https://github.com/viniciusdatti/vinicius-portfolio',
    });
    const study: Project = buildFakeProject({
      id: 2,
      title: 'ReactGram',
      is_featured: false,
      repository_url: 'https://github.com/viniciusdatti/ReactGram',
    });

    const partition = partitionProjectsByTier([featured, study]);

    expect(partition.featured).toHaveLength(1);
    expect(partition.featured[0].id).toBe(1);
    expect(partition.studies).toHaveLength(1);
    expect(partition.studies[0].id).toBe(2);
  });
});
