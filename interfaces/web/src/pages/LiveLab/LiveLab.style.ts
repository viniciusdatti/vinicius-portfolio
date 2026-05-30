// Libraries
import styled from 'styled-components';

// Layout
import { PageContainerWide } from '../../styles/pageLayout.style';

export const LiveLabPageShell = styled(PageContainerWide)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
  isolation: isolate;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 100%;
  padding-top: 0;
  padding-bottom: 0;
  overflow-x: hidden;
  overflow-y: visible;
`;
