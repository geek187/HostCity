/**
 * HostCity Theme
 * 
 * Unified design system for FIFA World Cup 2026 companion app.
 * Accessibility-first, outdoor-optimized, USA 2026 branded.
 */

export { colors } from './colors';
export { typography, fontFamily, fontSize, lineHeight } from './typography';
export { spacing, sizing, radii, shadows } from './spacing';

// Convenience theme object
import { colors } from './colors';
import { typography, fontFamily, fontSize, lineHeight } from './typography';
import { spacing, sizing, radii, shadows } from './spacing';

export const theme = {
  colors,
  typography,
  fontFamily,
  fontSize,
  lineHeight,
  spacing,
  sizing,
  radii,
  shadows,
} as const;

export type Theme = typeof theme;

