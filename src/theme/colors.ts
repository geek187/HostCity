/**
 * HostCity Color Palette
 * 
 * Matching the World Cup 2026 Host City Guide design
 * Orange primary accent, light backgrounds, white cards
 */

export const colors = {
  // Backgrounds
  background: '#F3F4F6',           // Light gray background
  backgroundDark: '#111827',       // Dark mode background
  
  // Cards & Surfaces
  card: '#FFFFFF',                 // White cards
  cardDark: '#1F2937',             // Dark mode cards
  
  // Primary - Orange accent
  primary: '#F97316',              // Main orange
  primaryHover: '#EA580C',         // Darker orange for hover/press
  primaryLight: '#F9731615',       // Transparent orange
  primaryGlow: 'rgba(249, 115, 22, 0.3)',
  
  // Text
  textPrimary: '#111827',          // Gray-900
  textSecondary: '#6B7280',        // Gray-500
  textTertiary: '#9CA3AF',         // Gray-400
  textMuted: '#D1D5DB',            // Gray-300
  white: '#FFFFFF',
  
  // Semantic
  success: '#22C55E',
  successLight: '#22C55E15',
  warning: '#F59E0B',
  warningLight: '#F59E0B15',
  danger: '#EF4444',
  dangerLight: '#EF444415',
  info: '#3B82F6',
  infoLight: '#3B82F615',
  
  // Weather icons
  windBlue: '#60A5FA',
  sunYellow: '#FBBF24',
  
  // Borders
  border: '#E5E7EB',               // Gray-200
  borderLight: '#F3F4F6',          // Gray-100
  borderDark: '#374151',           // Gray-700
  
  // Shadows
  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
  
  // Gradient overlays
  gradientDark: 'rgba(0, 0, 0, 0.7)',
  gradientMid: 'rgba(0, 0, 0, 0.2)',
  gradientLight: 'rgba(0, 0, 0, 0)',
  
  // Blur backgrounds
  blurOrange: 'rgba(249, 115, 22, 0.1)',
  blurBlue: 'rgba(59, 130, 246, 0.1)',
} as const;

export type ColorKeys = keyof typeof colors;
