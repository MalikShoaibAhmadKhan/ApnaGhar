import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { colors } from './colors';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? colors.primary[300] : colors.primary[600],
        light: darkMode ? colors.primary[200] : colors.primary[400],
        dark: darkMode ? colors.primary[600] : colors.primary[700],
        contrastText: '#ffffff',
      },
      secondary: {
        main: darkMode ? colors.secondary[200] : colors.secondary[600],
        light: darkMode ? colors.secondary[100] : colors.secondary[400],
        dark: darkMode ? colors.secondary[700] : colors.secondary[800],
        contrastText: '#ffffff',
      },
      background: {
        default: darkMode ? colors.background.dark.default : colors.background.light.default,
        paper: darkMode ? colors.background.dark.paper : colors.background.light.paper,
        surface: darkMode ? colors.background.dark.surface : colors.background.light.surface,
      },
      text: {
        primary: darkMode ? colors.text.dark.primary : colors.text.light.primary,
        secondary: darkMode ? colors.text.dark.secondary : colors.text.light.secondary,
        disabled: darkMode ? colors.text.dark.disabled : colors.text.light.disabled,
      },
      success: {
        main: darkMode ? colors.success[400] : colors.success[600],
        light: darkMode ? colors.success[300] : colors.success[400],
        dark: darkMode ? colors.success[600] : colors.success[700],
        contrastText: '#ffffff',
      },
      warning: {
        main: darkMode ? colors.warning[300] : colors.warning[500],
        light: darkMode ? colors.warning[200] : colors.warning[400],
        dark: darkMode ? colors.warning[600] : colors.warning[600],
        contrastText: '#ffffff',
      },
      error: {
        main: darkMode ? colors.error[400] : colors.error[500],
        light: darkMode ? colors.error[300] : colors.error[400],
        dark: darkMode ? colors.error[600] : colors.error[600],
        contrastText: '#ffffff',
      },
      info: {
        main: darkMode ? colors.info[300] : colors.info[500],
        light: darkMode ? colors.info[200] : colors.info[400],
        dark: darkMode ? colors.info[600] : colors.info[600],
        contrastText: '#ffffff',
      },
      // Custom colors for consistent branding
      brand: {
        gradient: darkMode ? colors.gradients.dark.primary : colors.gradients.primary,
        gradientHover: darkMode ? colors.gradients.dark.primaryHover : colors.gradients.primaryHover,
        surface: darkMode ? colors.background.dark.surface : colors.background.light.surface,
        border: darkMode ? colors.border.dark : colors.border.light,
      },
      // Property type colors
      property: {
        sale: colors.property.sale,
        rent: colors.property.rent,
        sold: colors.property.sold,
      },
      // Status colors
      status: {
        online: colors.status.online,
        offline: colors.status.offline,
        pending: colors.status.pending,
        active: colors.status.active,
        inactive: colors.status.inactive,
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.1rem',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 12,
            padding: '10px 24px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            background: darkMode 
              ? 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)'
              : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: '#ffffff !important',
            '&:hover': {
              background: darkMode
                ? 'linear-gradient(135deg, #42a5f5 0%, #2196f3 100%)'
                : 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
              color: '#ffffff !important',
            },
            '&:disabled': {
              background: darkMode ? '#424242' : '#e2e8f0',
              color: darkMode ? '#9e9e9e !important' : '#94a3b8 !important',
            },
          },
          outlined: {
            borderColor: darkMode ? '#64b5f6' : '#1976d2',
            color: darkMode ? '#64b5f6' : '#1976d2',
            '&:hover': {
              borderColor: darkMode ? '#42a5f5' : '#1565c0',
              backgroundColor: darkMode 
                ? 'rgba(100, 181, 246, 0.08)' 
                : 'rgba(25, 118, 210, 0.04)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: darkMode 
              ? '0 4px 20px rgba(0,0,0,0.3)'
              : '0 4px 20px rgba(0,0,0,0.08)',
            '&:hover': {
              boxShadow: darkMode
                ? '0 8px 30px rgba(0,0,0,0.4)'
                : '0 8px 30px rgba(0,0,0,0.12)',
            },
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: darkMode 
              ? '0 4px 20px rgba(0,0,0,0.3)'
              : '0 4px 20px rgba(0,0,0,0.08)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              '&:hover fieldset': {
                borderColor: darkMode ? '#64b5f6' : '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderWidth: 2,
                borderColor: darkMode ? '#64b5f6' : '#1976d2',
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;