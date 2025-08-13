import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  CircularProgress, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Paper,
  Chip,
  Fade,
  InputAdornment,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList,
  Clear,
  Home as HomeIcon,
  Compare,
  ViewList,
  ViewModule
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import PropertyComparison from '../components/PropertyComparison';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNotification } from '../components/NotificationSystem';
import favoritesService from '../services/favoritesService';
import propertyService from '../services/propertyService';
import useAuth from '../hooks/useAuth';

const MotionBox = motion(Box);

const PropertiesPage = () => {
  const { isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    suburb: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    listingType: '',
  });

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const response = await propertyService.getProperties(filters);
      setProperties(response.data);
      // Don't reset comparison selection when fetching properties
    } catch (error) {
      console.error('Failed to fetch properties', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleToggleFavorite = async (propertyId) => {
    if (!isAuthenticated) {
      showError('Please login to save favorites');
      return;
    }
    
    try {
      const newFavorites = new Set(favorites);
      if (favorites.has(propertyId)) {
        await favoritesService.removeFavorite(propertyId);
        newFavorites.delete(propertyId);
        showSuccess('Property removed from favorites');
      } else {
        await favoritesService.addFavorite(propertyId);
        newFavorites.add(propertyId);
        showSuccess('Property added to favorites');
      }
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Failed to toggle favorite', error);
      showError('Failed to update favorites');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, suburb: query }));
    fetchProperties();
  };

  const toggleComparison = (property) => {
    console.log('Toggle comparison for property:', property.id, 'Current selection:', selectedForComparison);
    setSelectedForComparison(prev => {
      const isSelected = prev.find(p => p.id === property.id);
      if (isSelected) {
        const newSelection = prev.filter(p => p.id !== property.id);
        console.log('Removed from comparison, new selection:', newSelection);
        return newSelection;
      } else if (prev.length < 3) {
        const newSelection = [...prev, property];
        console.log('Added to comparison, new selection:', newSelection);
        return newSelection;
      } else {
        showError('You can compare up to 3 properties at once');
        return prev;
      }
    });
  };

  const openComparison = () => {
    console.log('Opening comparison with:', selectedForComparison.length, 'properties');
    if (selectedForComparison.length < 2) {
      showError('Please select at least 2 properties to compare');
      return;
    }
    setShowComparison(true);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchProperties();
      if (isAuthenticated) {
        try {
          const response = await favoritesService.getFavorites();
          const favoriteIds = new Set(response.data.map((fav) => fav.id));
          setFavorites(favoriteIds);
        } catch (error) {
          console.error('Failed to fetch favorites', error);
        }
      }
    };
    loadData();
  }, [fetchProperties, isAuthenticated]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const clearFilters = () => {
    setFilters({
      suburb: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      listingType: '',
    });
    // Fetch properties with cleared filters
    setTimeout(() => fetchProperties(), 100);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Container maxWidth="xl">
      {/* Header Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{ mb: 4, textAlign: 'center' }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          Find Your Dream Property
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Discover amazing properties in your preferred location
        </Typography>
        
        {/* Enhanced Search Bar */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
      </MotionBox>

      {/* Enhanced Filter Section */}
      <Fade in={true} timeout={800}>
        <Paper 
          component="form" 
          onSubmit={handleFilterSubmit} 
          elevation={3}
          sx={{ 
            mb: 4,
            p: 3,
            backgroundColor: 'white',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e0e0e0'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterList sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', flexGrow: 1 }}>
              Search Filters
            </Typography>
            {hasActiveFilters && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<Clear />}
                onClick={clearFilters}
                sx={{ borderRadius: 2 }}
              >
                Clear All
              </Button>
            )}
          </Box>
          
          <Grid container spacing={2} alignItems="end">
            <Grid item xs={12} sm={6} md={2.5}>
              <TextField
                label="🏘️ Suburb or City"
                name="suburb"
                value={filters.suburb}
                onChange={handleFilterChange}
                fullWidth
                variant="outlined"
                placeholder="e.g., Downtown, Beverly Hills"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.5}>
              <TextField
                label="💰 Min Price"
                name="minPrice"
                type="number"
                value={filters.minPrice}
                onChange={handleFilterChange}
                fullWidth
                variant="outlined"
                placeholder="0"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.5}>
              <TextField
                label="💰 Max Price"
                name="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                fullWidth
                variant="outlined"
                placeholder="No limit"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.5}>
              <TextField
                label="🛏️ Bedrooms"
                name="bedrooms"
                type="number"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                fullWidth
                variant="outlined"
                placeholder="Any"
                inputProps={{ min: 0, max: 10 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>🏠 Listing Type</InputLabel>
                <Select
                  name="listingType"
                  value={filters.listingType}
                  onChange={handleFilterChange}
                  label="🏠 Listing Type"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="Sale">🏡 For Sale</MenuItem>
                  <MenuItem value="Rent">🏠 For Rent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2.5}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                startIcon={<SearchIcon />}
                sx={{ 
                  height: '56px',
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  borderRadius: 2,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(25,118,210,0.3)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Search Properties
              </Button>
            </Grid>
          </Grid>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ mr: 1, alignSelf: 'center' }}>
                Active filters:
              </Typography>
              {filters.suburb && (
                <Chip 
                  label={`Suburb: ${filters.suburb}`} 
                  size="small" 
                  onDelete={() => setFilters({...filters, suburb: ''})}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.minPrice && (
                <Chip 
                  label={`Min: $${filters.minPrice}`} 
                  size="small" 
                  onDelete={() => setFilters({...filters, minPrice: ''})}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.maxPrice && (
                <Chip 
                  label={`Max: $${filters.maxPrice}`} 
                  size="small" 
                  onDelete={() => setFilters({...filters, maxPrice: ''})}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.bedrooms && (
                <Chip 
                  label={`${filters.bedrooms} beds`} 
                  size="small" 
                  onDelete={() => setFilters({...filters, bedrooms: ''})}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.listingType && (
                <Chip 
                  label={filters.listingType} 
                  size="small" 
                  onDelete={() => setFilters({...filters, listingType: ''})}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
          )}
        </Paper>
      </Fade>

      {/* Results Section */}
      {loading ? (
        <LoadingSpinner 
          size={60} 
          message="Searching for properties..." 
        />
      ) : (
        <>
          {/* Results Header */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              {properties.length > 0 ? (
                <>Found {properties.length} Properties</>
              ) : (
                <>No Properties Found</>
              )}
            </Typography>
            
            {properties.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Comparison Button */}
                {selectedForComparison.length > 0 && (
                  <Button
                    variant="outlined"
                    startIcon={<Compare />}
                    onClick={openComparison}
                    sx={{ borderRadius: 2 }}
                  >
                    Compare ({selectedForComparison.length})
                  </Button>
                )}
                
                {/* View Mode Toggle */}
                <Box sx={{ display: 'flex', border: 1, borderColor: 'divider', borderRadius: 2 }}>
                  <Tooltip title="Grid View">
                    <IconButton
                      onClick={() => setViewMode('grid')}
                      color={viewMode === 'grid' ? 'primary' : 'default'}
                      sx={{ borderRadius: '8px 0 0 8px' }}
                    >
                      <ViewModule />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="List View">
                    <IconButton
                      onClick={() => setViewMode('list')}
                      color={viewMode === 'list' ? 'primary' : 'default'}
                      sx={{ borderRadius: '0 8px 8px 0' }}
                    >
                      <ViewList />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  Showing all available properties
                </Typography>
              </Box>
            )}
          </Box>

          {/* Properties Grid */}
          {properties.length > 0 ? (
            <Grid container spacing={3}>
              {properties.map((property, index) => (
                <Grid item key={property.id} xs={12} sm={6} lg={4} sx={{ display: 'flex' }}>
                  <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    sx={{ width: '100%', display: 'flex' }}
                  >
                    <PropertyCard
                      property={property}
                      isFavorite={favorites.has(property.id)}
                      onToggleFavorite={isAuthenticated ? handleToggleFavorite : null}
                      onCompareToggle={() => toggleComparison(property)}
                      isSelectedForComparison={selectedForComparison.some(p => p.id === property.id)}
                      viewMode={viewMode}
                    />
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper
              elevation={2}
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 3,
                backgroundColor: 'background.surface'
              }}
            >
              <HomeIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
                No Properties Found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search filters to find more properties.
              </Typography>
              <Button
                variant="contained"
                onClick={clearFilters}
                sx={{
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  borderRadius: 2
                }}
              >
                Clear All Filters
              </Button>
            </Paper>
          )}
        </>
      )}

      {/* Property Comparison Dialog */}
      <PropertyComparison
        open={showComparison}
        onClose={() => setShowComparison(false)}
        properties={selectedForComparison}
      />
    </Container>
  );
};

export default PropertiesPage;
