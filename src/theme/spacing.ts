/**
 * HostCity Spacing System
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const sizing = {
  touchTarget: 48,
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  avatarSmall: 32,
  avatarMedium: 40,
  avatarLarge: 56,
  buttonHeight: 48,
  inputHeight: 48,
  cardMinHeight: 80,
} as const;

export const radii = {
  none: 0,
  sm: 6,
  md: 8,
  base: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export type SpacingKeys = keyof typeof spacing;
export type SizingKeys = keyof typeof sizing;
export type RadiiKeys = keyof typeof radii;
