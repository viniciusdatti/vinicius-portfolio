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
  CapabilitySignal,
  CapabilityName,
  CapabilityMeta,
  CapabilityIcon,
  CapabilityDomain,
  CapabilityFeaturedRow,
  CapabilityFeaturedName,
  CapabilityFeaturedMeta,
  CapabilityFeaturedDomain,
  CapabilityFeaturedDesc,
} from '@/components/home/HomeCapabilityRail/HomeCapabilityRail.style';

interface CapabilityItem {
  name: string;
  icon: string;
  domain: string;
  signal: string;
  desc?: string;
  featured?: boolean;
}

const ITEMS: CapabilityItem[] = [
  {
    name: 'React',
    icon: 'react.svg',
    domain: 'UI Architecture',
    signal: 'SIG-01',
    desc: 'Component systems, realtime state, design-system integration',
    featured: true,
  },
  { name: 'TypeScript', icon: 'typescript.svg', domain: 'Type Safety', signal: 'SIG-02' },
  { name: 'Python', icon: 'python.svg', domain: 'Services', signal: 'SIG-03' },
  { name: 'FastAPI', icon: 'fastapi.svg', domain: 'API', signal: 'SIG-04' },
  { name: 'PostgreSQL', icon: 'postgresql.svg', domain: 'Data', signal: 'SIG-05' },
  { name: 'Docker', icon: 'docker.svg', domain: 'Ops', signal: 'SIG-06' },
];

const viewport = { once: true, margin: '-60px' as const };

export function HomeCapabilityRail(): React.ReactElement {
  const { t } = useTranslation();
  const { section, stagger, item } = useScrollMotion();

  const featured = ITEMS.find((i) => i.featured);
  const rest = ITEMS.filter((i) => !i.featured);

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

        {featured ? (
          <CapabilityFeaturedRow>
            <CapabilitySignal aria-hidden>{featured.signal}</CapabilitySignal>
            <CapabilityFeaturedName>
              <CapabilityIcon
                src={publicAssetUrl(`icons/${featured.icon}`)}
                alt=""
                aria-hidden
              />
              {featured.name}
            </CapabilityFeaturedName>
            <CapabilityFeaturedMeta>
              {featured.desc ? (
                <CapabilityFeaturedDesc>{featured.desc}</CapabilityFeaturedDesc>
              ) : null}
              <CapabilityFeaturedDomain>{featured.domain}</CapabilityFeaturedDomain>
            </CapabilityFeaturedMeta>
          </CapabilityFeaturedRow>
        ) : null}

        <CapabilityList
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {rest.map((cap: CapabilityItem) => (
            <CapabilityRow key={cap.name} variants={item}>
              <CapabilitySignal aria-hidden>{cap.signal}</CapabilitySignal>
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
