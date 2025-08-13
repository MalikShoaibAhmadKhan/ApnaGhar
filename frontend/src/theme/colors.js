// Color constants for consistent theming across the application
export const colors = {
  // Primary brand colors
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1976d2',
    700: '#1565c0',
    800: '#1565c0',
    900: '#0d47a1',
  },
  
  // Secondary colors
  secondary: {
    50: '#fce4ec',
    100: '#f8bbd9',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63',
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
  },
  
  // Success colors (green)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Warning colors (amber/orange)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Error colors (red)
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Info colors (blue)
  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Neutral colors
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Property specific colors
  property: {
    sale: '#10b981',
    rent: '#f59e0b',
    sold: '#6b7280',
  },
  
  // Status colors
  status: {
    online: '#10b981',
    offline: '#6b7280',
    pending: '#f59e0b',
    active: '#2196f3',
    inactive: '#9e9e9e',
  },
  
  // Background colors
  background: {
    light: {
      default: '#f8fafc',
      paper: '#ffffff',
      surface: '#f1f5f9',
      elevated: '#ffffff',
    },
    dark: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
      surface: '#2a2a2a',
      elevated: '#333333',
    }
  },
  
  // Text colors
  text: {
    light: {
      primary: '#1e293b',
      secondary: '#64748b',
      disabled: '#94a3b8',
    },
    dark: {
      primary: '#ffffff',
      secondary: '#b0bec5',
      disabled: '#616161',
    }
  },
  
  // Border colors
  border: {
    light: '#e2e8f0',
    dark: '#404040',
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
    primaryHover: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
    success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    info: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    dark: {
      primary: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)',
      primaryHover: 'linear-gradient(135deg, #42a5f5 0%, #2196f3 100%)',
    }
  }
};

// Helper function to get color with opacity
export const getColorWithOpacity = (color, opacity) => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

// Helper function to get theme-aware color
export const getThemeColor = (colorPath, theme) => {
  const isDark = theme?.palette?.mode === 'dark';
  const paths = colorPath.split('.');
  
  // Handle special cases for theme-aware colors
  if (paths[0] === 'background' && paths.length === 2) {
    return isDark ? colors.background.dark[paths[1]] : colors.background.light[paths[1]];
  }
  
  if (paths[0] === 'text' && paths.length === 2) {
    return isDark ? colors.text.dark[paths[1]] : colors.text.light[paths[1]];
  }
  
  if (paths[0] === 'border') {
    return isDark ? colors.border.dark : colors.border.light;
  }
  
  // Default color resolution
  let result = colors;
  for (const path of paths) {
    result = result?.[path];
  }
  
  return result;
};

export default colors;