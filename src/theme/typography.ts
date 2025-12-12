/**
 * HostCity Typography System
 * Using Inter font family
 */

export const typography = {
  // Display - Large titles
  display: {
    fontSize: 30,
    fontWeight: '700' as '700',
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  // Headings
  h1: {
    fontSize: 24,
    fontWeight: '700' as '700',
    lineHeight: 30,
  },
  h2: {
    fontSize: 18,
    fontWeight: '700' as '700',
    lineHeight: 24,
  },
  h3: {
    fontSize: 16,
    fontWeight: '600' as '600',
    lineHeight: 22,
  },
  // Body
  body: {
    fontSize: 14,
    fontWeight: '400' as '400',
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400' as '400',
    lineHeight: 16,
  },
  // Labels
  label: {
    fontSize: 12,
    fontWeight: '500' as '500',
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: 'uppercase' as 'uppercase',
  },
  labelSmall: {
    fontSize: 10,
    fontWeight: '500' as '500',
    lineHeight: 14,
    letterSpacing: 0.5,
  },
  // Buttons
  button: {
    fontSize: 14,
    fontWeight: '500' as '500',
    lineHeight: 20,
  },
  buttonSmall: {
    fontSize: 12,
    fontWeight: '600' as '600',
    lineHeight: 16,
  },
  // Meta/Caption
  meta: {
    fontSize: 10,
    fontWeight: '600' as '600',
    lineHeight: 14,
  },
  // Font families
  fontFamily: 'DMSans_400Regular',
  fontFamilyMedium: 'DMSans_500Medium',
  fontFamilySemiBold: 'DMSans_600SemiBold',
  fontFamilyBold: 'DMSans_700Bold',
} as const;

export type TypographyKeys = keyof typeof typography;
