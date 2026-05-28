// Libraries
import { css } from 'styled-components';

export const sectionBand = css`
  width: 100%;
  max-width: none;
`;

export const sectionBandInset = css`
  ${sectionBand};
  padding-left: ${({ theme }) => theme.spacing.pageX};
  padding-right: ${({ theme }) => theme.spacing.pageX};
`;

export const sectionBreath = css`
  padding-top: ${({ theme }) => theme.spacing.sectionLg};
  padding-bottom: ${({ theme }) => theme.spacing.sectionLg};
`;

export const sectionDense = css`
  padding-top: ${({ theme }) => theme.spacing.sectionSm};
  padding-bottom: ${({ theme }) => theme.spacing.sectionSm};
`;

/** Editorial left accent — typography-led block, not a card */
export const editorialAccentRail = css`
  border-left: 2px solid ${({ theme }) => theme.colors.accent};
  padding-left: ${({ theme }) => theme.spacing.xl};
`;

/** Fixed header clearance for in-page anchor scroll (header + breathing room). */
export const scrollAnchorOffset = css`
  scroll-margin-top: calc(${({ theme }) => theme.sizes.layout.headerOffset} + 0.5rem);
`;
