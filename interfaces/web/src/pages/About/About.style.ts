/**
 * Styled components for the About page.
 */

// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

export const PageTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

export const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

export const IntroSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const Avatar = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryHover}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: white;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 150px;
    height: 150px;
    font-size: 3rem;
  }
`;

export const IntroContent = styled.div`
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }
`;

export const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PhilosophyCard = styled(motion.div)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}10,
    ${({ theme }) => theme.colors.surface}
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-style: italic;
  }
`;

export const EducationCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const EducationMain = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const EducationIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

export const EducationInfo = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0;
  }
`;

export const EducationStatus = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.success}20;
  color: ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const ComplementaryText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
