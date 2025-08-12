import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Card,
  CardMedia,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Fade
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  Add,
  Home,
  LocationOn,
  AttachMoney,
  Description,
  Check
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../components/NotificationSystem';
import LoadingSpinner from '../components/LoadingSpinner';
import propertyService from '../services/propertyService';

const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    suburb: '',
    city: '',
    price: '',
    listingType: 'Sale',
    bedrooms: '',
    bathrooms: '',
    carSpots: '',
    features: []
  });
  const [newFeature, setNewFeature] = useState('');

  const steps = [
    {
      label: 'Basic Information',
      icon: <Home />,
      description: 'Property title and description'
    },
    {
      label: 'Location Details',
      icon: <LocationOn />,
      description: 'Address and location information'
    },
    {
      label: 'Property Details',
      icon: <AttachMoney />,
      description: 'Price, type, and specifications'
    },
    {
      label: 'Images & Features',
      icon: <Description />,
      description: 'Upload images and add features'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter(img => img.id !== imageId);
    });
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return formData.title.trim() && formData.description.trim();
      case 1:
        return formData.address.trim() && formData.city.trim();
      case 2:
        return formData.price && formData.bedrooms && formData.bathrooms;
      case 3:
        return images.length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Convert images to base64 or upload to a service
      // For now, we'll use placeholder URLs
      const imageUrls = images.map((_, index) => 
        `https://via.placeholder.com/800x600?text=Property+Image+${index + 1}`
      );

      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        carSpots: parseInt(formData.carSpots) || 0,
        imageUrls: imageUrls
      };

      await propertyService.createProperty(propertyData);
      
      showSuccess('Property added successfully!', {
        title: 'Success',
        duration: 5000
      });
      
      navigate('/properties');
    } catch (error) {
      console.error('Error adding property:', error);
      showError(error.response?.data?.message || 'Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Beautiful 3-bedroom house in downtown"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your property in detail..."
                required
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g., 123 Main Street"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Suburb"
                name="suburb"
                value={formData.suburb}
                onChange={handleInputChange}
                placeholder="e.g., Downtown"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g., New York"
                required
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Listing Type</InputLabel>
                <Select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleInputChange}
                  label="Listing Type"
                >
                  <MenuItem value="Sale">For Sale</MenuItem>
                  <MenuItem value="Rent">For Rent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleInputChange}
                inputProps={{ min: 0, max: 20 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleInputChange}
                inputProps={{ min: 0, max: 20 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Car Spots"
                name="carSpots"
                type="number"
                value={formData.carSpots}
                onChange={handleInputChange}
                inputProps={{ min: 0, max: 20 }}
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(25,118,210,0.04)'
                  },
                  transition: 'all 0.2s ease'
                }}
                component="label"
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Upload Property Images
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to select multiple images or drag and drop
                </Typography>
              </Box>
            </Grid>

            {images.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Uploaded Images ({images.length})
                </Typography>
                <Grid container spacing={2}>
                  {images.map((image) => (
                    <Grid item xs={6} sm={4} md={3} key={image.id}>
                      <MotionCard
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        sx={{ position: 'relative' }}
                      >
                        <CardMedia
                          component="img"
                          height="120"
                          image={image.url}
                          alt="Property"
                        />
                        <IconButton
                          onClick={() => removeImage(image.id)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.9)',
                            }
                          }}
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </MotionCard>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Property Features
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="e.g., Swimming Pool, Garden, Garage"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={addFeature}
                  startIcon={<Add />}
                  sx={{ minWidth: 120 }}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.features.map((feature) => (
                  <Chip
                    key={feature}
                    label={feature}
                    onDelete={() => removeFeature(feature)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner message="Adding your property..." fullScreen />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in={true} timeout={800}>
        <MotionPaper
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          elevation={4}
          sx={{ p: 4, borderRadius: 3 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Add New Property
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Fill in the details to list your property
            </Typography>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  icon={step.icon}
                  sx={{
                    '& .MuiStepLabel-iconContainer': {
                      color: activeStep >= index ? 'primary.main' : 'text.disabled'
                    }
                  }}
                >
                  <Typography variant="h6">{step.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Box sx={{ mt: 2, mb: 3 }}>
                    {renderStepContent(index)}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      variant="outlined"
                    >
                      Back
                    </Button>
                    {index === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!validateStep(index)}
                        startIcon={<Check />}
                      >
                        Add Property
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!validateStep(index)}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                Property added successfully!
              </Alert>
              <Button
                variant="contained"
                onClick={() => navigate('/properties')}
              >
                View Properties
              </Button>
            </Box>
          )}
        </MotionPaper>
      </Fade>
    </Container>
  );
};

export default AddPropertyPage;