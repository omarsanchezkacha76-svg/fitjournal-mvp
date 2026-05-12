export const Colors = {
  dark: {
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textTertiary: '#475569',
    textDisabled: '#2D3A5C',

    background: '#0A0F1E',
    surface: '#141B2D',
    surfaceHover: '#1A2340',
    surfaceActive: '#1F2A4A',

    border: '#1E2A4A',
    borderStrong: '#2D3A5C',

    primary: '#6366F1',
    primaryGlow: '#4F46E5',
    primaryDim: 'rgba(99,102,241,0.15)',

    accent: '#06B6D4',
    accentGlow: '#0891B2',
    accentDim: 'rgba(6,182,212,0.15)',

    success: '#22C55E',
    successDim: 'rgba(34,197,94,0.12)',
    successBg: '#14532D',

    error: '#EF4444',
    errorDim: 'rgba(239,68,68,0.12)',
    errorBg: '#7F1D1D',

    warning: '#EAB308',
    warningDim: 'rgba(234,179,8,0.12)',
    warningBg: '#713F12',

    tabIconDefault: '#475569',
    tabIconSelected: '#6366F1',

    shadow: 'rgba(0,0,0,0.3)',
    innerHighlight: 'rgba(255,255,255,0.05)',
  },
} as const;

export type ThemeColors = typeof Colors.dark;
