import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Close as CloseIcon,
  Bed,
  Bathtub,
  DirectionsCar,
  Home,
  LocationOn,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Remove
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const PropertyComparison = ({ open, onClose, properties = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedProperties, setSelectedProperties] = useState(properties.slice(0, 3));

  const removeProperty = (propertyId) => {
    setSelectedProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  const comparisonData = [
    { label: 'Price', key: 'price', icon: <AttachMoney />, format: (value) => `$${value?.toLocaleString()}` },
    { label: 'Bedrooms', key: 'bedrooms', icon: <Bed /> },
    { label: 'Bathrooms', key: 'bathrooms', icon: <Bathtub /> },
    { label: 'Car Spots', key: 'carSpots', icon: <DirectionsCar /> },
    { label: 'Property Type', key: 'listingType', icon: <Home /> },
    { label: 'Location', key: 'address', icon: <LocationOn /> },
  ];

  const getBestValue = (key) => {
    if (!selectedProperties.length) return null;
    
    const values = selectedProperties.map(p => p[key]).filter(v => v != null);
    if (!values.length) return null;

    if (key === 'price') {
      return Math.min(...values);
    } else if (['bedrooms', 'bathrooms', 'carSpots'].includes(key)) {
      return Math.max(...values);
    }
    return null;
  };

  const getValueIndicator = (property, key) => {
    const bestValue = getBestValue(key);
    if (bestValue === null || property[key] === null) return null;

    if (key === 'price') {
      if (property[key] === bestValue) return <TrendingDown color="success" />;
      if (property[key] > bestValue * 1.2) return <TrendingUp color="error" />;
    } else if (['bedrooms', 'bathrooms', 'carSpots'].includes(key)) {
      if (property[key] === bestValue) return <TrendingUp color="success" />;
    }
    return null;
  };

  if (!selectedProperties.length) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Property Comparison</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No properties selected for comparison.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          maxHeight: '90vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Property Comparison
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Property Cards */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Grid container spacing={2}>
            {selectedProperties.map((property, index) => (
              <Grid item xs={12} md={4} key={property.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  elevation={3}
                  sx={{ 
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden'
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => removeProperty(property.id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 2,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.7)',
                      }
                    }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>

                  <CardMedia
                    component="img"
                    height="200"
                    image={property.imageUrls?.[0] || 'https://via.placeholder.com/300x200'}
                    alt={property.title}
                  />
                  
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {property.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {property.suburb && property.city ? 
                          `${property.suburb}, ${property.city}` : 
                          property.address
                        }
                      </Typography>
                    </Box>

                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                      ${property.price?.toLocaleString()}
                      {property.listingType === 'Rent' && (
                        <Typography component="span" variant="body2" sx={{ color: 'text.secondary', ml: 0.5 }}>
                          /month
                        </Typography>
                      )}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<Bed sx={{ fontSize: 16 }} />}
                        label={property.bedrooms}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<Bathtub sx={{ fontSize: 16 }} />}
                        label={property.bathrooms}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<DirectionsCar sx={{ fontSize: 16 }} />}
                        label={property.carSpots}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider />

        {/* Comparison Table */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Detailed Comparison
          </Typography>
          
          <TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Feature</TableCell>
                  {selectedProperties.map((property) => (
                    <TableCell key={property.id} align="center" sx={{ fontWeight: 'bold' }}>
                      Property {selectedProperties.indexOf(property) + 1}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {comparisonData.map((item) => (
                  <TableRow key={item.key} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {item.icon}
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.label}
                        </Typography>
                      </Box>
                    </TableCell>
                    {selectedProperties.map((property) => (
                      <TableCell key={property.id} align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <Typography variant="body2">
                            {item.format ? 
                              item.format(property[item.key]) : 
                              property[item.key] || 'N/A'
                            }
                          </Typography>
                          {getValueIndicator(property, item.key)}
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, p: 2, backgroundColor: theme.palette.grey[50], borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <TrendingUp color="success" sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
              Best value indicator
              <TrendingDown color="success" sx={{ fontSize: 16, mx: 1, verticalAlign: 'middle' }} />
              Lowest price
              <TrendingUp color="error" sx={{ fontSize: 16, mx: 1, verticalAlign: 'middle' }} />
              Higher price
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button variant="contained" onClick={() => window.print()}>
          Print Comparison
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyComparison;