export const Colors = {
  // Core backgrounds
  black: '#000000',
  darkBg: '#030308',
  deepNavy: '#050A1A',
  navyDark: '#070D1F',
  navyMid: '#0A1228',

  // Card surfaces
  glass: 'rgba(255,255,255,0.04)',
  glassMid: 'rgba(255,255,255,0.07)',
  glassHigh: 'rgba(255,255,255,0.10)',
  glassBorder: 'rgba(255,255,255,0.10)',
  glassBorderBright: 'rgba(255,255,255,0.18)',

  // Neon Blues
  electricBlue: '#00D4FF',
  cyan: '#00FFFF',
  cyanGlow: 'rgba(0,212,255,0.3)',
  cyanDim: 'rgba(0,212,255,0.15)',
  cyanFaint: 'rgba(0,212,255,0.06)',

  // Neon Purples
  neonPurple: '#8B5CF6',
  purple: '#7C3AED',
  purpleGlow: 'rgba(139,92,246,0.3)',
  purpleDim: 'rgba(139,92,246,0.15)',

  // Accent Blues
  blue: '#3B82F6',
  blueGlow: 'rgba(59,130,246,0.3)',

  // Neon Green/Teal
  teal: '#14F1D9',
  tealGlow: 'rgba(20,241,217,0.25)',

  // Text
  white: '#FFFFFF',
  whiteAlpha90: 'rgba(255,255,255,0.9)',
  whiteAlpha70: 'rgba(255,255,255,0.7)',
  whiteAlpha50: 'rgba(255,255,255,0.5)',
  whiteAlpha30: 'rgba(255,255,255,0.3)',
  whiteAlpha80: 'rgba(255,255,255,0.8)',
  whiteAlpha60: 'rgba(255,255,255,0.6)',
  whiteAlpha40: 'rgba(255,255,255,0.4)',
  whiteAlpha15: 'rgba(255,255,255,0.15)',
  whiteAlpha08: 'rgba(255,255,255,0.08)',

  // Gradients
  gradientBlue: ['#00D4FF', '#0066FF'] as const,
  gradientPurple: ['#8B5CF6', '#6D28D9'] as const,
  gradientCyan: ['#00FFFF', '#00D4FF'] as const,
  gradientDark: ['#0A1228', '#030308'] as const,
  gradientCardBlue: ['rgba(0,212,255,0.12)', 'rgba(0,212,255,0.02)'] as const,
  gradientCardPurple: ['rgba(139,92,246,0.15)', 'rgba(139,92,246,0.03)'] as const,
  gradientCardTeal: ['rgba(20,241,217,0.12)', 'rgba(20,241,217,0.02)'] as const,

  // Status
  success: '#10F08A',
  warning: '#F59E0B',
  error: '#EF4444',
  successGlow: 'rgba(16,240,138,0.25)',
};

export const Gradients = {
  splash: ['#000000', '#030820', '#050F2E'] as string[],
  screen: ['#030308', '#070D1F', '#0A1228'] as string[],
  card: ['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.02)'] as string[],
  hero: ['rgba(0,212,255,0.2)', 'rgba(139,92,246,0.1)', 'rgba(0,0,0,0)'] as string[],
  button: ['#00D4FF', '#0066FF'] as string[],
  buttonPurple: ['#8B5CF6', '#6D28D9'] as string[],
};
