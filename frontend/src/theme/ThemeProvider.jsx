import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

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
        main: darkMode ? '#64b5f6' : '#1976d2',
        light: darkMode ? '#90caf9' : '#42a5f5',
        dark: darkMode ? '#1976d2' : '#1565c0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#dc004e',
        light: darkMode ? '#ffc1e3' : '#ff5983',
        dark: darkMode ? '#c2185b' : '#9a0036',
        contrastText: '#ffffff',
      },
      background: {
        default: darkMode ? '#0a0a0a' : '#f8fafc',
        paper: darkMode ? '#1a1a1a' : '#ffffff',
        surface: darkMode ? '#2a2a2a' : '#f1f5f9',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#1e293b',
        secondary: darkMode ? '#b0bec5' : '#64748b',
        disabled: darkMode ? '#616161' : '#94a3b8',
      },
      success: {
        main: darkMode ? '#66bb6a' : '#10b981',
        light: darkMode ? '#81c784' : '#34d399',
        dark: darkMode ? '#388e3c' : '#059669',
        contrastText: '#ffffff',
      },
      warning: {
        main: darkMode ? '#ffb74d' : '#f59e0b',
        light: darkMode ? '#ffcc02' : '#fbbf24',
        dark: darkMode ? '#f57c00' : '#d97706',
        contrastText: '#ffffff',
      },
      error: {
        main: darkMode ? '#f44336' : '#ef4444',
        light: darkMode ? '#e57373' : '#f87171',
        dark: darkMode ? '#d32f2f' : '#dc2626',
        contrastText: '#ffffff',
      },
      info: {
        main: darkMode ? '#29b6f6' : '#0ea5e9',
        light: darkMode ? '#4fc3f7' : '#38bdf8',
        dark: darkMode ? '#0288d1' : '#0284c7',
        contrastText: '#ffffff',
      },
      // Custom colors for consistent branding
      brand: {
        gradient: darkMode 
          ? 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)'
          : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        gradientHover: darkMode
          ? 'linear-gradient(135deg, #42a5f5 0%, #2196f3 100%)'
          : 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
        surface: darkMode ? '#2a2a2a' : '#f8fafc',
        border: darkMode ? '#404040' : '#e2e8f0',
      },
      // Property type colors
      property: {
        sale: darkMode ? '#66bb6a' : '#10b981',
        rent: darkMode ? '#ffb74d' : '#f59e0b',
        sold: darkMode ? '#9e9e9e' : '#6b7280',
      },
      // Status colors
      status: {
        online: darkMode ? '#66bb6a' : '#10b981',
        offline: darkMode ? '#9e9e9e' : '#6b7280',
        pending: darkMode ? '#ffb74d' : '#f59e0b',
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
            color: 'white',
            '&:hover': {
              background: darkMode
                ? 'linear-gradient(135deg, #42a5f5 0%, #2196f3 100%)'
                : 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
            },
            '&:disabled': {
              background: darkMode ? '#424242' : '#e2e8f0',
              color: darkMode ? '#9e9e9e' : '#94a3b8',
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