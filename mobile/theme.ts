/**
 * TripFund Design System
 * Premium dark theme with vibrant travel accents
 */

export const theme = {
  colors: {
    // Backgrounds
    background: '#0a0a0a',
    surface: '#1a1a1a',
    surfaceElevated: '#2a2a2a',
    card: '#1f1f1f',
    
    // Primary (Teal/Turquoise - Travel vibes)
    primary: '#00d9ff',
    primaryDark: '#00b8d4',
    primaryLight: '#4df3ff',
    
    // Accent (Coral/Sunset)
    accent: '#ff6b6b',
    accentDark: '#ff5252',
    accentLight: '#ff8a80',
    
    // Gradients
    gradientStart: '#00d9ff',
    gradientMid: '#ff6b6b',
    gradientEnd: '#ffa726',
    
    // Text
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    textTertiary: '#666666',
    textInverse: '#000000',
    
    // Semantic
    success: '#00ff88',
    warning: '#ffaa00',
    error: '#ff4444',
    info: '#00d9ff',
    
    // Interactive
    border: '#333333',
    borderLight: '#444444',
    disabled: '#555555',
    overlay: 'rgba(0, 0, 0, 0.75)',
    
    // Special
    premium: '#ffd700',
    verified: '#00d9ff',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 999,
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodyBold: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  
  animation: {
    quick: 150,
    default: 250,
    smooth: 350,
  },
};

export type Theme = typeof theme;
