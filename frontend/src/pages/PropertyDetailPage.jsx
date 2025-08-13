import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  CardMedia, 
  IconButton, 
  CircularProgress,
  Chip,
  Divider,
  Card,
  CardContent,
  Button,
  Fade,
  Zoom,
  Skeleton
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Bed,
  Bathtub,
  DirectionsCar,
  Home,
  AttachMoney,
  ArrowBack,
  Share,
  Print,
  CalendarToday
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import favoritesService from '../services/favoritesService';
import propertyService from '../services/propertyService';
import useAuth from '../hooks/useAuth';

const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [property, setProperty] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await propertyService.getProperty(id);
        setProperty(response.data);
        
        // Record property view if user is authenticated
        if (isAuthenticated) {
          try {
            const token = localStorage.getItem('token');
            await axios.post(`/api/recentlyviewed/${id}`, {}, {
              headers: { Authorization: `Bearer ${token}` }
            });
          } catch (error) {
            console.error('Failed to record property view', error);
          }
        }
      } catch (error) {
        console.error('Failed to fetch property details', error);
      } finally {
        setLoading(false);
      }
    };

    const checkFavoriteStatus = async () => {
      if (isAuthenticated) {
        try {
          const response = await favoritesService.getFavorites();
          const favoriteIds = new Set(response.data.map((fav) => fav.id));
          setIsFavorite(favoriteIds.has(parseInt(id)));
        } catch (error) {
          console.error('Failed to fetch favorites', error);
        }
      }
    };

    fetchProperty();
    checkFavoriteStatus();
  }, [id, isAuthenticated]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3, mb: 3 }} />
        <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Property not found
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/properties')}
          sx={{ mt: 2 }}
        >
          Back to Properties
        </Button>
      </Container>
    );
  }

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await favoritesService.removeFavorite(property.id);
      } else {
        await favoritesService.addFavorite(property.id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to update favorite status', error);
    }
  };

  const propertyFeatures = [
    { icon: <Bed />, label: 'Bedrooms', value: property.bedrooms },
    { icon: <Bathtub />, label: 'Bathrooms', value: property.bathrooms },
    { icon: <DirectionsCar />, label: 'Car Spots', value: property.carSpots },
    { icon: <Home />, label: 'Type', value: property.listingType }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/properties')}
        sx={{ mb: 3, color: 'text.secondary' }}
      >
        Back to Properties
      </Button>

      <Fade in={true} timeout={800}>
        <Box>
          {/* Image Gallery */}
          <MotionPaper
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            elevation={4}
            sx={{ 
              borderRadius: 4, 
              overflow: 'hidden',
              mb: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            {property.imageUrls && property.imageUrls.length > 0 ? (
              <Box>
                <CardMedia
                  component="img"
                  height="500"
                  image={property.imageUrls[selectedImage] || property.imageUrls[0]}
                  alt={property.title}
                  onLoad={() => setImageLoading(false)}
                  sx={{
                    objectFit: 'cover',
                    transition: 'all 0.3s ease'
                  }}
                />
                {property.imageUrls.length > 1 && (
                  <Box sx={{ p: 2, backgroundColor: 'background.surface' }}>
                    <Grid container spacing={1}>
                      {property.imageUrls.map((url, index) => (
                        <Grid item key={index}>
                          <CardMedia
                            component="img"
                            height="80"
                            width="80"
                            image={url}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setSelectedImage(index)}
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: 2,
                              cursor: 'pointer',
                              border: selectedImage === index ? '3px solid #1976d2' : '3px solid transparent',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                transform: 'scale(1.05)'
                              }
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>
            ) : (
              <Box 
                sx={{ 
                  height: 500, 
                  backgroundColor: 'background.surface',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Home sx={{ fontSize: 80, color: 'text.disabled' }} />
              </Box>
            )}
          </MotionPaper>

          <Grid container spacing={4}>
            {/* Property Details */}
            <Grid item xs={12} md={8}>
              <MotionPaper
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                elevation={3}
                sx={{ p: 4, borderRadius: 3 }}
              >
                {/* Header */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h3" 
                        component="h1" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: 'text.primary',
                          mb: 1,
                          fontSize: { xs: '2rem', md: '2.5rem' }
                        }}
                      >
                        {property.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="h6" color="text.secondary">
                          {property.address}
                          {property.suburb && property.city && (
                            <Typography component="span" variant="body1" sx={{ display: 'block' }}>
                              {property.suburb}, {property.city}
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                      {isAuthenticated && (
                        <Zoom in={true}>
                          <IconButton
                            onClick={handleFavoriteClick}
                            sx={{
                              backgroundColor: isFavorite ? '#ffebee' : '#f5f5f5',
                              '&:hover': {
                                backgroundColor: isFavorite ? '#ffcdd2' : '#e0e0e0',
                                transform: 'scale(1.1)'
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {isFavorite ? 
                              <Favorite sx={{ color: 'error.main' }} /> : 
                              <FavoriteBorder sx={{ color: 'text.secondary' }} />
                            }
                          </IconButton>
                        </Zoom>
                      )}
                      <IconButton sx={{ backgroundColor: 'background.surface' }}>
                        <Share />
                      </IconButton>
                      <IconButton sx={{ backgroundColor: 'background.surface' }}>
                        <Print />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Price and Type */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AttachMoney sx={{ fontSize: 28, color: 'success.main', mr: 0.5 }} />
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          color: 'success.main',
                          fontWeight: 'bold'
                        }}
                      >
                        ${property.price.toLocaleString()}
                        {property.listingType === 'Rent' && (
                          <Typography component="span" variant="h6" sx={{ color: 'text.secondary', ml: 1 }}>
                            /month
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                    <Chip
                      label={`For ${property.listingType}`}
                      color={property.listingType === 'Sale' ? 'success' : 'warning'}
                      sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}
                    />
                  </Box>

                  {/* Property Features */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {propertyFeatures.map((feature, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Card
                          elevation={1}
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            borderRadius: 2,
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            },
                            transition: 'box-shadow 0.2s ease'
                          }}
                        >
                          <Box sx={{ color: 'primary.main', mb: 1 }}>
                            {feature.icon}
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            {feature.value}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {feature.label}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Description */}
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    About This Property
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontSize: '1.1rem', 
                      lineHeight: 1.8,
                      color: 'text.primary'
                    }}
                  >
                    {property.description}
                  </Typography>
                </Box>
              </MotionPaper>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <MotionCard
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                elevation={3}
                sx={{ borderRadius: 3, position: 'sticky', top: 20 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Contact Agent
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      mb: 2,
                      py: 1.5,
                      background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)'
                      }
                    }}
                  >
                    Call Now
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    sx={{ mb: 3 }}
                  >
                    Send Message
                  </Button>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Schedule Viewing
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<CalendarToday />}
                    sx={{ mb: 2 }}
                  >
                    Book Inspection
                  </Button>
                  
                  <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.surface', borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                      Property ID: {property.id}
                    </Typography>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
};

export default PropertyDetailPage;
