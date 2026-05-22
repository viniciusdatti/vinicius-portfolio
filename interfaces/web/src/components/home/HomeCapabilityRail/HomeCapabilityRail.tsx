// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Config
import { publicAssetUrl } from '@/config/env';

// Hooks
import { useScrollMotion } from '@/hooks/useScrollMotion';

// View
import {
  CapabilityBand,
  CapabilityShell,
  CapabilityHeader,
  CapabilityIndex,
  CapabilityTitle,
  CapabilityLink,
  CapabilityList,
  CapabilityRow,
  CapabilityName,
  CapabilityMeta,
  CapabilityIcon,
  CapabilityDomain,
} from '@/components/home/HomeCapabilityRail/HomeCapabilityRail.style';

interface CapabilityItem {
  name: string;
  icon: string;
  domain: string;
}

const ITEMS: CapabilityItem[] = [
  { name: 'React', icon: 'react.svg', domain: 'UI' },
  { name: 'TypeScript', icon: 'typescript.svg', domain: 'Types' },
  { name: 'Python', icon: 'python.svg', domain: 'Services' },
  { name: 'FastAPI', icon: 'fastapi.svg', domain: 'API' },
  { name: 'PostgreSQL', icon: 'postgresql.svg', domain: 'Data' },
  { name: 'Docker', icon: 'docker.svg', domain: 'Ops' },
];

const viewport = { once: true, margin: '-60px' as const };

export function HomeCapabilityRail(): React.ReactElement {
  const { t } = useTranslation();
  const { section, stagger, item } = useScrollMotion();

  return (
    <CapabilityBand id="section-capabilities">
      <CapabilityShell>
        <CapabilityHeader>
          <CapabilityIndex aria-hidden>{t('home.sections.skills.index')}</CapabilityIndex>
          <CapabilityTitle
            variants={section}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {t('home.skillsPreview.title')}
          </CapabilityTitle>
          <CapabilityLink to="/skills">
            {t('home.skillsPreview.viewAll')}
            {' '}
            →
          </CapabilityLink>
        </CapabilityHeader>
        <CapabilityList
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {ITEMS.map((cap: CapabilityItem) => (
            <CapabilityRow key={cap.name} variants={item}>
              <CapabilityName>{cap.name}</CapabilityName>
              <CapabilityMeta>
                <CapabilityIcon
                  src={publicAssetUrl(`icons/${cap.icon}`)}
                  alt=""
                  aria-hidden
                />
                <CapabilityDomain>{cap.domain}</CapabilityDomain>
              </CapabilityMeta>
            </CapabilityRow>
          ))}
        </CapabilityList>
      </CapabilityShell>
    </CapabilityBand>
  );
}
