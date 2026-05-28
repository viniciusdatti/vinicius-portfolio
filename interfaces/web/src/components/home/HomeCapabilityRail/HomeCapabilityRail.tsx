// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { resolveI18nKeyOrFallback } from '../../../lib/i18nDisplay';

// Config
import { publicAssetUrl } from '../../../config/env';

// Hooks
import { useScrollMotion } from '../../../hooks/useScrollMotion';

// Components
import { HomeSectionReveal } from '../HomeSectionReveal';

// Component
import {
  CapabilityBand,
  CapabilityShell,
  CapabilityHeader,
  CapabilityIndex,
  CapabilityTitle,
  CapabilityLink,
  CapabilityList,
  CapabilityRow,
  CapabilitySignal,
  CapabilityNameLead,
  CapabilityNameIconSlot,
  CapabilityName,
  CapabilityMeta,
  CapabilityIcon,
  CapabilityDomain,
  CapabilityFeaturedRow,
  CapabilityFeaturedMeta,
  CapabilityFeaturedDomain,
  CapabilityFeaturedDesc,
} from './HomeCapabilityRail.style';

interface CapabilityItem {
  name: string;
  icon: string;
  signal: string;
  featured?: boolean;
}

const ITEMS: CapabilityItem[] = [
  {
    name: 'React', icon: 'react.svg', signal: 'SIG-01', featured: true,
  },
  { name: 'TypeScript', icon: 'typescript.svg', signal: 'SIG-02' },
  { name: 'Python', icon: 'python.svg', signal: 'SIG-03' },
  { name: 'FastAPI', icon: 'fastapi.svg', signal: 'SIG-04' },
  { name: 'PostgreSQL', icon: 'postgresql.svg', signal: 'SIG-05' },
  { name: 'Docker', icon: 'docker.svg', signal: 'SIG-06' },
];

export const HomeCapabilityRail = (): React.ReactElement => {
  const { t } = useTranslation();
  const { stagger, item, viewport } = useScrollMotion();

  const featured = ITEMS.find((i) => i.featured);
  const rest = ITEMS.filter((i) => !i.featured);

  const resolveCapabilityDomain = (skillName: string): string => {
    const domainKey: string = `skills.layout.coreDomains.${skillName}`;
    return resolveI18nKeyOrFallback(domainKey, skillName, t);
  };

  return (
    <CapabilityBand id="section-capabilities">
      <CapabilityShell>
        <CapabilityHeader>
          <HomeSectionReveal stagger>
            <CapabilityIndex variants={item} aria-hidden>
              {t('home.sections.skills.index')}
            </CapabilityIndex>
            <CapabilityTitle variants={item}>
              {t('home.skillsPreview.title')}
            </CapabilityTitle>
            <CapabilityLink variants={item} to="/skills">
              {t('home.skillsPreview.viewAll')}
              {' '}
              →
            </CapabilityLink>
          </HomeSectionReveal>
        </CapabilityHeader>

        <CapabilityList
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {featured ? (
            <CapabilityFeaturedRow variants={item}>
              <CapabilitySignal aria-hidden>{featured.signal}</CapabilitySignal>
              <CapabilityNameLead $featured>
                <CapabilityIcon
                  src={publicAssetUrl(`icons/${featured.icon}`)}
                  alt=""
                  aria-hidden
                />
                <CapabilityName>{featured.name}</CapabilityName>
              </CapabilityNameLead>
              <CapabilityFeaturedMeta>
                <CapabilityFeaturedDesc>{t('skills.layout.heroDescription')}</CapabilityFeaturedDesc>
                <CapabilityFeaturedDomain>{t('skills.layout.heroDomain')}</CapabilityFeaturedDomain>
              </CapabilityFeaturedMeta>
            </CapabilityFeaturedRow>
          ) : null}
          {rest.map((cap: CapabilityItem) => (
            <CapabilityRow key={cap.name} variants={item}>
              <CapabilitySignal aria-hidden>{cap.signal}</CapabilitySignal>
              <CapabilityNameLead>
                <CapabilityNameIconSlot aria-hidden />
                <CapabilityName>{cap.name}</CapabilityName>
              </CapabilityNameLead>
              <CapabilityMeta>
                <CapabilityIcon
                  src={publicAssetUrl(`icons/${cap.icon}`)}
                  alt=""
                  aria-hidden
                />
                <CapabilityDomain>{resolveCapabilityDomain(cap.name)}</CapabilityDomain>
              </CapabilityMeta>
            </CapabilityRow>
          ))}
        </CapabilityList>
      </CapabilityShell>
    </CapabilityBand>
  );
};
