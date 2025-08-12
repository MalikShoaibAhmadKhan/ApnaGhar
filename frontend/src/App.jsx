import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Chip,
  Avatar,
  Tooltip
} from '@mui/material';
import { 
  Home as HomeIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  DarkMode,
  LightMode,
  Add
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import useAuth from './hooks/useAuth';
import AppRoutes from './AppRoutes';
import ThemeProvider, { useTheme as useCustomTheme } from './theme/ThemeProvider';
import FloatingActionButton from './components/FloatingActionButton';
import NotificationProvider from './components/NotificationSystem';

const MotionBox = motion(Box);

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useCustomTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Router>
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{ 
            background: darkMode 
              ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
              : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ px: { xs: 0, sm: 2 }, minHeight: '70px !important' }}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
              >
                <HomeIcon sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }} />
                <Typography 
                  variant="h5" 
                  component="div" 
                  sx={{ 
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    🏠 Real Estate Portal
                  </Link>
                </Typography>
              </MotionBox>

              {!isMobile ? (
                <MotionBox
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/properties"
                    startIcon={<SearchIcon />}
                    sx={{ 
                      borderRadius: 3,
                      px: 2,
                      '&:hover': { 
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Properties
                  </Button>
                  
                  {isAuthenticated ? (
                    <>
                      <Button 
                        color="inherit" 
                        component={Link} 
                        to="/favorites"
                        startIcon={<FavoriteIcon />}
                        sx={{ 
                          borderRadius: 3,
                          px: 2,
                          '&:hover': { 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Favorites
                      </Button>
                      <Button 
                        color="inherit" 
                        component={Link} 
                        to="/recently-viewed"
                        startIcon={<HistoryIcon />}
                        sx={{ 
                          borderRadius: 3,
                          px: 2,
                          '&:hover': { 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Recent
                      </Button>
                      <Button 
                        color="inherit" 
                        component={Link} 
                        to="/add-property"
                        startIcon={<Add />}
                        sx={{ 
                          borderRadius: 3,
                          px: 2,
                          backgroundColor: 'rgba(76,175,80,0.2)',
                          '&:hover': { 
                            backgroundColor: 'rgba(76,175,80,0.3)',
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Add Property
                      </Button>
                      
                      <Tooltip title="Toggle theme">
                        <IconButton
                          color="inherit"
                          onClick={toggleDarkMode}
                          sx={{ 
                            ml: 1,
                            '&:hover': { 
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {darkMode ? <LightMode /> : <DarkMode />}
                        </IconButton>
                      </Tooltip>

                      <Chip
                        avatar={
                          <Avatar sx={{ bgcolor: 'white', color: 'primary.main', width: 32, height: 32 }}>
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                          </Avatar>
                        }
                        label={user?.email?.split('@')[0] || 'User'}
                        variant="outlined"
                        sx={{ 
                          color: 'white', 
                          borderColor: 'rgba(255,255,255,0.5)',
                          ml: 2,
                          '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255,255,255,0.1)'
                          }
                        }}
                      />
                      <Tooltip title="Logout">
                        <IconButton
                          color="inherit"
                          onClick={handleLogout}
                          sx={{ 
                            ml: 1,
                            '&:hover': { 
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <ExitToApp />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                      <Tooltip title="Toggle theme">
                        <IconButton
                          color="inherit"
                          onClick={toggleDarkMode}
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {darkMode ? <LightMode /> : <DarkMode />}
                        </IconButton>
                      </Tooltip>
                      <Button 
                        color="inherit" 
                        component={Link} 
                        to="/login"
                        variant="outlined"
                        sx={{ 
                          borderColor: 'rgba(255,255,255,0.5)',
                          borderRadius: 3,
                          '&:hover': { 
                            borderColor: 'white',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Login
                      </Button>
                      <Button 
                        component={Link} 
                        to="/register"
                        variant="contained"
                        sx={{ 
                          backgroundColor: 'white',
                          color: 'primary.main',
                          borderRadius: 3,
                          '&:hover': { 
                            backgroundColor: '#f5f5f5',
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Register
                      </Button>
                    </Box>
                  )}
                </MotionBox>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title="Toggle theme">
                    <IconButton
                      color="inherit"
                      onClick={toggleDarkMode}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {darkMode ? <LightMode /> : <DarkMode />}
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                    sx={{
                      '&:hover': { 
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'scale(1.1)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              )}
              
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    mt: 1,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  }
                }}
              >
                <MenuItem onClick={handleClose} component={Link} to="/properties">
                  <SearchIcon sx={{ mr: 1 }} /> Properties
                </MenuItem>
                {isAuthenticated ? (
                  [
                    <MenuItem key="favorites" onClick={handleClose} component={Link} to="/favorites">
                      <FavoriteIcon sx={{ mr: 1 }} /> Favorites
                    </MenuItem>,
                    <MenuItem key="recent" onClick={handleClose} component={Link} to="/recently-viewed">
                      <HistoryIcon sx={{ mr: 1 }} /> Recently Viewed
                    </MenuItem>,
                    <MenuItem key="add-property" onClick={handleClose} component={Link} to="/add-property">
                      <Add sx={{ mr: 1 }} /> Add Property
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>
                      <ExitToApp sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  ]
                ) : (
                  [
                    <MenuItem key="login" onClick={handleClose} component={Link} to="/login">
                      <AccountCircle sx={{ mr: 1 }} /> Login
                    </MenuItem>,
                    <MenuItem key="register" onClick={handleClose} component={Link} to="/register">
                      <AccountCircle sx={{ mr: 1 }} /> Register
                    </MenuItem>
                  ]
                )}
              </Menu>
            </Toolbar>
          </Container>
        </AppBar>
        
        <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
          <AppRoutes />
        </Box>
        
        {/* Enhanced Footer */}
        <Box 
          component="footer" 
          sx={{ 
            mt: 'auto',
            py: 4,
            px: 2,
            background: darkMode 
              ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
              : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
            textAlign: 'center',
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Real Estate Portal
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © 2024 Real Estate Portal. All rights reserved. | Find your dream home today!
            </Typography>
          </Container>
        </Box>

        {/* Floating Action Button */}
        <FloatingActionButton />
      </Box>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
