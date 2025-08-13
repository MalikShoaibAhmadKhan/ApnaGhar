import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  IconButton, 
  Box, 
  Chip,
  Tooltip,
  CardActionArea,
  Fade,
  Zoom,
  Checkbox,
  useTheme
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
  Compare
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const MotionCard = motion(Card);

const PropertyCard = ({ 
  property, 
  isFavorite, 
  onToggleFavorite, 
  onCompareToggle,
  isSelectedForComparison = false,
  viewMode = 'grid'
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const theme = useTheme();

  if (viewMode === 'list') {
    return (
      <MotionCard 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        sx={{ 
          mb: 2,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          },
          transition: 'all 0.3s ease'
        }}
      >
        <Box sx={{ display: 'flex', height: 200 }}>
          <CardMedia
            component="img"
            sx={{ width: 300, flexShrink: 0 }}
            image={property.imageUrls?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
            onError={(e) => {
              console.log('List view image failed to load:', property.imageUrls?.[0]);
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
            alt={property.title}
          />
          <CardContent sx={{ flex: 1, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h6" component={Link} to={`/properties/${property.id}`} 
                sx={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  fontWeight: 'bold',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {property.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {onCompareToggle && (
                  <Tooltip title="Compare">
                    <Checkbox
                      icon={<Compare />}
                      checkedIcon={<Compare color="primary" />}
                      checked={isSelectedForComparison}
                      onChange={() => onCompareToggle(property)}
                    />
                  </Tooltip>
                )}
                {onToggleFavorite && (
                  <IconButton onClick={() => onToggleFavorite(property.id)}>
                    {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                  </IconButton>
                )}
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {property.suburb && property.city ? 
                  `${property.suburb}, ${property.city}` : 
                  property.address
                }
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
              ${property.price?.toLocaleString()}
              {property.listingType === 'Rent' && (
                <Typography component="span" variant="body1" sx={{ color: 'text.secondary', ml: 0.5 }}>
                  /month
                </Typography>
              )}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip icon={<Bed />} label={`${property.bedrooms} beds`} size="small" variant="outlined" />
              <Chip icon={<Bathtub />} label={`${property.bathrooms} baths`} size="small" variant="outlined" />
              <Chip icon={<DirectionsCar />} label={`${property.carSpots} cars`} size="small" variant="outlined" />
              <Chip label={property.listingType} size="small" color="primary" />
            </Box>
          </CardContent>
        </Box>
      </MotionCard>
    );
  }

  return (
    <MotionCard 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      sx={{ 
        width: '100%',
        height: '100%',
        minHeight: 480,
        maxHeight: 480,
        maxWidth: 345, 
        margin: 'auto',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        },
        position: 'relative',
        background: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Listing Type Badge */}
      <Chip
        label={property.listingType}
        size="small"
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 2,
          backgroundColor: property.listingType === 'Sale' ? 'success.main' : 'warning.main',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />

      {/* Action Buttons */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, display: 'flex', gap: 0.5 }}>
        {onCompareToggle && (
          <Tooltip title="Compare">
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                onCompareToggle(property);
              }}
              sx={{
                backgroundColor: isSelectedForComparison ? 'primary.main' : 'rgba(255,255,255,0.9)',
                color: isSelectedForComparison ? 'white' : 'primary.main',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: isSelectedForComparison ? 'primary.dark' : 'rgba(255,255,255,1)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <Compare fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        
        {onToggleFavorite && (
          <Zoom in={true}>
            <IconButton 
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite(property.id);
              }}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
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
      </Box>

      <CardActionArea component={Link} to={`/properties/${property.id}`}>
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <Fade in={imageLoaded} timeout={500}>
            <CardMedia
              component="img"
              height="220"
              image={property.imageUrls?.[0] || 'https://via.placeholder.com/300x220?text=No+Image'}
              onError={(e) => {
                console.log('Image failed to load:', property.imageUrls?.[0]);
                e.target.src = 'https://via.placeholder.com/300x220?text=No+Image';
              }}
              alt={property.title}
              onLoad={() => setImageLoaded(true)}
              sx={{
                transition: 'transform 0.3s ease',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          </Fade>
          {!imageLoaded && (
            <Box 
              sx={{ 
                height: 220, 
                backgroundColor: 'background.surface',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Home sx={{ fontSize: 48, color: 'text.disabled' }} />
            </Box>
          )}
        </Box>
        
        <CardContent sx={{ 
          p: 2.5, 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 'bold',
              color: 'text.primary',
              lineHeight: 1.3,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {property.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {property.suburb && property.city ? 
                `${property.suburb}, ${property.city}` : 
                property.address
              }
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AttachMoney sx={{ fontSize: 20, color: 'success.main', mr: 0.5 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'success.main',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              ${property.price?.toLocaleString()}
              {property.listingType === 'Rent' && (
                <Typography component="span" variant="body2" sx={{ color: 'text.secondary', ml: 0.5 }}>
                  /month
                </Typography>
              )}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
            <Tooltip title="Bedrooms">
              <Chip
                icon={<Bed sx={{ fontSize: 16 }} />}
                label={property.bedrooms}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            </Tooltip>
            <Tooltip title="Bathrooms">
              <Chip
                icon={<Bathtub sx={{ fontSize: 16 }} />}
                label={property.bathrooms}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            </Tooltip>
            <Tooltip title="Car Spots">
              <Chip
                icon={<DirectionsCar sx={{ fontSize: 16 }} />}
                label={property.carSpots}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            </Tooltip>
          </Box>
        </CardContent>
      </CardActionArea>
    </MotionCard>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string,
    suburb: PropTypes.string,
    price: PropTypes.number.isRequired,
    listingType: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    carSpots: PropTypes.number.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool,
};

export default PropertyCard;
