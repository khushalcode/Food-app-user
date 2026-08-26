/**
 * BlinkSy Food App — Design System
 *
 * 3-COLOR SCHEME (per user instruction):
 *   1. PRIMARY  = vibrant red        #FF1F3A   (headers, CTAs, brand)
 *   2. ACCENT   = golden yellow      #FFC107   ("50% OFF" banners, highlights)
 *   3. NEUTRAL  = white / light gray #FFFFFF / #F5F5F5  (backgrounds, surfaces)
 *
 * Functional accents (not part of the 3-color scheme):
 *   - SUCCESS GREEN  #16A34A  (rating badges, "Open Now", delivered status)
 *   - DANGER  #DC2626  (errors, cancelled, destructive actions)
 *
 * Typography: Roboto family (Regular/Medium/Bold/Black)
 */

export const colors = {
  // === 3-color scheme ===
  primary: '#FF1F3A',        // vibrant red — main brand
  primaryDark: '#D4002A',    // hover/pressed
  primaryLight: '#FF6B7A',   // tints
  primarySoft: '#FFE4E8',    // tint backgrounds

  accent: '#FFC107',         // golden yellow — "50% OFF" banners
  accentDark: '#FFA000',
  accentSoft: '#FFF8E1',

  white: '#FFFFFF',
  background: '#F5F5F5',     // light gray app background
  surface: '#FFFFFF',
  surfaceAlt: '#F0F0F2',
  border: '#E5E7EB',
  divider: '#F1F1F1',

  // === Text ===
  text: '#1A1A1A',           // near-black for body text
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',

  // === Functional accents ===
  success: '#16A34A',        // green for ratings, "delivered", "open"
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  info: '#2563EB',

  // === Module gradients ===
  cream: '#FFF8E1',          // profile page background
  creamDark: '#FFE082',

  walletStart: '#FF1F3A',    // red → pink gradient for wallet hero
  walletEnd: '#FF6B7A',

  pinkSoftStart: '#FFE4E8',
  pinkSoftEnd: '#FFD1DC',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const fontFamilies = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
  black: 'Roboto-Black',
};

export const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
  title: 34,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const theme = {
  colors,
  spacing,
  radii,
  fontFamilies,
  fontSizes,
  shadows,
};

export type Theme = typeof theme;
