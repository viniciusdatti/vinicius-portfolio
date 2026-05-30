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

export const editorialAccentRail = css`
  border-left: 2px solid ${({ theme }) => theme.colors.accent};
  padding-left: ${({ theme }) => theme.spacing.xl};
`;

export const scrollAnchorOffset = css`
  scroll-margin-top: calc(${({ theme }) => theme.sizes.layout.headerOffset} + 0.5rem);
`;
