import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  CircularProgress, 
  Box,
  Paper,
  Button,
  Fade
} from '@mui/material';
import { 
  History as HistoryIcon,
  Search as SearchIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import favoritesService from '../services/favoritesService';

const MotionBox = motion(Box);

const RecentlyViewedPage = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const handleToggleFavorite = async (propertyId) => {
    try {
      const newFavorites = new Set(favorites);
      if (favorites.has(propertyId)) {
        await favoritesService.removeFavorite(propertyId);
        newFavorites.delete(propertyId);
      } else {
        await favoritesService.addFavorite(propertyId);
        newFavorites.add(propertyId);
      }
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        // Fetch recently viewed properties
        const recentResponse = await axios.get('/api/recentlyviewed', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecentlyViewed(recentResponse.data);

        // Fetch favorites
        try {
          const favResponse = await favoritesService.getFavorites();
          const favoriteIds = new Set(favResponse.data.map((fav) => fav.id));
          setFavorites(favoriteIds);
        } catch (error) {
          console.error('Failed to fetch favorites', error);
        }
      } catch (error) {
        console.error('Failed to fetch recently viewed properties', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      {/* Header Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{ mb: 4, textAlign: 'center' }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            boxShadow: '0 8px 25px rgba(255,152,0,0.3)'
          }}
        >
          <HistoryIcon sx={{ fontSize: 40, color: 'white' }} />
        </Box>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          Recently Viewed Properties
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Properties you've recently explored
        </Typography>
      </MotionBox>

      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 8,
          mb: 8
        }}>
          <CircularProgress size={60} sx={{ mb: 2, color: '#ff9800' }} />
          <Typography variant="h6" color="text.secondary">
            Loading your recently viewed properties...
          </Typography>
        </Box>
      ) : recentlyViewed.length === 0 ? (
        <Fade in={true} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 4,
              backgroundColor: '#fff8e1',
              border: '2px dashed #ffb74d'
            }}
          >
            <HomeIcon sx={{ fontSize: 80, color: '#ffb74d', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: '#e65100', fontWeight: 'bold' }}>
              No Recently Viewed Properties
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              You haven't viewed any properties yet. Start exploring our amazing collection of properties to see them appear here.
            </Typography>
            <Button
              component={Link}
              to="/properties"
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              sx={{
                background: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(45deg, #f57c00 30%, #ff9800 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255,152,0,0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Browse Properties
            </Button>
          </Paper>
        </Fade>
      ) : (
        <>
          {/* Results Header */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
              {recentlyViewed.length} Recently Viewed {recentlyViewed.length === 1 ? 'Property' : 'Properties'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sorted by most recent
            </Typography>
          </Box>

          {/* Properties Grid */}
          <Grid container spacing={3}>
            {recentlyViewed.map((property, index) => (
              <Grid item key={property.id} xs={12} sm={6} lg={4}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PropertyCard 
                    property={property} 
                    isFavorite={favorites.has(property.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </MotionBox>
              </Grid>
            ))}
          </Grid>

          {/* Call to Action */}
          <Fade in={true} timeout={1000}>
            <Paper
              elevation={2}
              sx={{
                mt: 6,
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: '#e65100', fontWeight: 'bold' }}>
                Looking for More Properties?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Explore our full collection of properties to find your perfect match.
              </Typography>
              <Button
                component={Link}
                to="/properties"
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #f57c00 30%, #ff9800 90%)'
                  }
                }}
              >
                Browse All Properties
              </Button>
            </Paper>
          </Fade>
        </>
      )}
    </Container>
  );
};

export default RecentlyViewedPage;