// Libraries
import 'styled-components';

// Theme
import type { Theme } from './styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
