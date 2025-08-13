import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  CircularProgress, 
  Box,
  Paper,
  Button,
  Fade,
  Chip
} from '@mui/material';
import { 
  Favorite as FavoriteIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import favoritesService from '../services/favoritesService';
import PropertyCard from '../components/PropertyCard';

const MotionBox = motion(Box);

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const handleToggleFavorite = async (propertyId) => {
    try {
      const newFavoriteIds = new Set(favoriteIds);
      if (favoriteIds.has(propertyId)) {
        await favoritesService.removeFavorite(propertyId);
        newFavoriteIds.delete(propertyId);
        // Remove from favorites list
        setFavorites(favorites.filter(prop => prop.id !== propertyId));
      } else {
        await favoritesService.addFavorite(propertyId);
        newFavoriteIds.add(propertyId);
      }
      setFavoriteIds(newFavoriteIds);
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  const clearAllFavorites = async () => {
    try {
      // Remove all favorites
      for (const property of favorites) {
        await favoritesService.removeFavorite(property.id);
      }
      setFavorites([]);
      setFavoriteIds(new Set());
    } catch (error) {
      console.error('Failed to clear all favorites', error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await favoritesService.getFavorites();
        setFavorites(response.data);
        const ids = new Set(response.data.map(prop => prop.id));
        setFavoriteIds(ids);
      } catch (error) {
        console.error('Failed to fetch favorites', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
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
            background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            boxShadow: '0 8px 25px rgba(244,67,54,0.3)'
          }}
        >
          <FavoriteIcon sx={{ fontSize: 40, color: 'white' }} />
        </Box>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #f44336 30%, #e57373 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          My Favorite Properties
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Your saved properties collection
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
          <CircularProgress size={60} sx={{ mb: 2, color: 'error.main' }} />
          <Typography variant="h6" color="text.secondary">
            Loading your favorite properties...
          </Typography>
        </Box>
      ) : favorites.length === 0 ? (
        <Fade in={true} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 4,
              backgroundColor: 'error.light',
              backgroundOpacity: 0.1,
              border: '2px dashed',
              borderColor: 'error.light'
            }}
          >
            <FavoriteIcon sx={{ fontSize: 80, color: 'error.light', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: 'error.dark', fontWeight: 'bold' }}>
              No Favorite Properties Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              Start building your dream property collection! Browse our properties and click the heart icon to save your favorites here.
            </Typography>
            <Button
              component={Link}
              to="/properties"
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              sx={{
                background: 'linear-gradient(45deg, #f44336 30%, #e57373 90%)',
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(244,67,54,0.3)'
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
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                {favorites.length} Favorite {favorites.length === 1 ? 'Property' : 'Properties'}
              </Typography>
              <Chip
                icon={<FavoriteIcon />}
                label="Saved"
                color="error"
                variant="outlined"
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
            {favorites.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<ClearIcon />}
                onClick={clearAllFavorites}
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(244,67,54,0.04)'
                  }
                }}
              >
                Clear All
              </Button>
            )}
          </Box>

          {/* Properties Grid */}
          <Grid container spacing={3}>
            {favorites.map((property, index) => (
              <Grid item key={property.id} xs={12} sm={6} lg={4}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PropertyCard 
                    property={property} 
                    isFavorite={true}
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
                background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: 'error.dark', fontWeight: 'bold' }}>
                Keep Exploring!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Discover more amazing properties and add them to your favorites collection.
              </Typography>
              <Button
                component={Link}
                to="/properties"
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #f44336 30%, #e57373 90%)',
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)'
                  }
                }}
              >
                Browse More Properties
              </Button>
            </Paper>
          </Fade>
        </>
      )}
    </Container>
  );
};

export default FavoritesPage;
