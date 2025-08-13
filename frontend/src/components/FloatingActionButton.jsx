import React, { useState, useEffect } from 'react';
import { 
  Fab, 
  Zoom, 
  Tooltip, 
  Box,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  Collapse
} from '@mui/material';
import { 
  KeyboardArrowUp,
  DarkMode,
  LightMode,
  Favorite,
  Search,
  Home,
  Share,
  Add,
  Menu as MenuIcon,
  Close
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../theme/ThemeProvider';
import useAuth from '../hooks/useAuth';

const MotionFab = motion(Fab);
const MotionPaper = motion(Paper);

const FloatingActionButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useCustomTheme();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ApnaGhar',
          text: 'Check out this amazing real estate platform!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    setIsMenuOpen(false);
  };

  const actions = [
    {
      icon: <Add />,
      name: 'Add Property',
      onClick: () => {
        navigate('/add-property');
        setIsMenuOpen(false);
      },
      show: isAuthenticated,
      color: 'success.main'
    },
    {
      icon: darkMode ? <LightMode /> : <DarkMode />,
      name: darkMode ? 'Light Mode' : 'Dark Mode',
      onClick: () => {
        toggleDarkMode();
        setIsMenuOpen(false);
      },
      show: true,
      color: 'warning.main'
    },
    {
      icon: <Home />,
      name: 'Home',
      onClick: () => {
        navigate('/');
        setIsMenuOpen(false);
      },
      show: true,
      color: 'info.main'
    },
    {
      icon: <Search />,
      name: 'Search Properties',
      onClick: () => {
        navigate('/properties');
        setIsMenuOpen(false);
      },
      show: true,
      color: 'secondary.main'
    },
    {
      icon: <Favorite />,
      name: 'Favorites',
      onClick: () => {
        navigate('/favorites');
        setIsMenuOpen(false);
      },
      show: isAuthenticated,
      color: 'error.main'
    },
    {
      icon: <Share />,
      name: 'Share',
      onClick: handleShare,
      show: true,
      color: 'text.secondary'
    },
  ].filter(action => action.show);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: isMobile ? 20 : 30,
        left: isMobile ? 20 : 30,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1
      }}
    >
      {/* Action Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <MotionPaper
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            elevation={8}
            sx={{
              p: 1,
              borderRadius: 3,
              background: theme.palette.background.paper,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.divider}`,
              mb: 1
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {actions.map((action, index) => (
                <motion.div
                  key={action.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Tooltip title={action.name} placement="right">
                    <IconButton
                      onClick={action.onClick}
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: action.color,
                        color: 'white',
                        '&:hover': {
                          backgroundColor: action.color,
                          transform: 'scale(1.1)',
                          boxShadow: `0 4px 12px ${action.color}40`,
                        },
                        transition: 'all 0.2s ease',
                        mb: 0.5
                      }}
                    >
                      {action.icon}
                    </IconButton>
                  </Tooltip>
                </motion.div>
              ))}
            </Box>
          </MotionPaper>
        )}
      </AnimatePresence>

      {/* Main Menu Button */}
      <MotionFab
        color="primary"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #90caf9 0%, #64b5f6 100%)'
            : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          '&:hover': {
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)'
              : 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
          },
          boxShadow: '0 4px 20px rgba(25,118,210,0.3)',
        }}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isMenuOpen ? <Close /> : <MenuIcon />}
        </motion.div>
      </MotionFab>

      {/* Scroll to top button */}
      <Zoom in={showScrollTop}>
        <Tooltip title="Scroll to top" placement="right">
          <MotionFab
            size="small"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{
              position: 'fixed',
              bottom: isMobile ? 20 : 30,
              right: isMobile ? 20 : 30,
              zIndex: 999,
              background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)',
              },
              boxShadow: '0 4px 20px rgba(255,152,0,0.3)',
            }}
          >
            <KeyboardArrowUp />
          </MotionFab>
        </Tooltip>
      </Zoom>
    </Box>
  );
};

export default FloatingActionButton;