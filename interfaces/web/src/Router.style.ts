/**
 * @fileoverview Styled components for Router (e.g. page loader fallback).
 */

// Libraries
import styled from 'styled-components';

/**
 * Wrapper for the lazy-load fallback (centers spinner).
 */
export const PageLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;
