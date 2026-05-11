/**
 * TripFund Design System - Web Version
 * Matches mobile theme exactly
 */

export const theme = {
  colors: {
    // Backgrounds
    background: '#0a0a0a',
    surface: '#1a1a1a',
    surfaceElevated: '#2a2a2a',
    card: '#1f1f1f',
    
    // Primary (Teal/Turquoise)
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
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    round: '9999px',
  },
  
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.25)',
    md: '0 4px 8px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.35)',
  },
  
  animation: {
    quick: '150ms',
    default: '250ms',
    smooth: '350ms',
  },
};

export type Theme = typeof theme;
