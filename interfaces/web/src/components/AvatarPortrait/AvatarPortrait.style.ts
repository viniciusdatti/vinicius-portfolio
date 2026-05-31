// Libraries
import styled from 'styled-components';

export const AvatarPortraitPhoto = styled.img<{ $objectPosition: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $objectPosition }): string => $objectPosition};
  display: block;
`;
