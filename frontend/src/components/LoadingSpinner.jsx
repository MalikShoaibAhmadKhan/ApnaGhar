import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const LoadingSpinner = ({ 
  size = 60, 
  message = 'Loading...', 
  fullScreen = false,
  color = 'primary' 
}) => {
  const containerStyles = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: 4,
  };

  return (
    <Fade in={true} timeout={300}>
      <Box sx={containerStyles}>
        <MotionBox
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: fullScreen ? 4 : 0,
            borderRadius: fullScreen ? 3 : 0,
            backgroundColor: fullScreen ? 'background.paper' : 'transparent',
            boxShadow: fullScreen ? '0 8px 32px rgba(0,0,0,0.2)' : 'none',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <CircularProgress 
              size={size} 
              color={color}
              thickness={4}
              sx={{
                animationDuration: '1.5s',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: size * 0.6,
                height: size * 0.6,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(66,165,245,0.1) 100%)',
                animation: 'pulse 2s infinite',
              }}
            />
          </Box>
          {message && (
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                fontWeight: 500,
                textAlign: 'center',
                maxWidth: 200,
              }}
            >
              {message}
            </Typography>
          )}
        </MotionBox>
      </Box>
    </Fade>
  );
};

export default LoadingSpinner;