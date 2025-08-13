import React from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Avatar,
  Fade,
  Slide,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  TrendingUp,
  Support,
  Star,
  ArrowForward,
  LocationOn,
  Apartment,
  Villa,
} from "@mui/icons-material";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const HomePage = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Smart Search",
      description:
        "Find your dream home with our advanced AI-powered search and intelligent filtering options.",
      colorKey: "primary",
    },
    {
      icon: <HomeIcon sx={{ fontSize: 40, color: "success.main" }} />,
      title: "Detailed Views",
      description:
        "Get comprehensive property information with high-quality photos, virtual tours, and detailed specifications.",
      colorKey: "success",
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40, color: "error.main" }} />,
      title: "Personal Wishlist",
      description:
        "Create your personalized property wishlist and get instant notifications for similar properties.",
      colorKey: "error",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Properties Listed", icon: <HomeIcon /> },
    { number: "5,000+", label: "Happy Customers", icon: <Star /> },
    { number: "50+", label: "Cities Covered", icon: <LocationOn /> },
    { number: "24/7", label: "Customer Support", icon: <Support /> },
  ];

  const propertyTypes = [
    { icon: <HomeIcon />, label: "Houses", count: "2,500+" },
    { icon: <Apartment />, label: "Apartments", count: "4,200+" },
    { icon: <Villa />, label: "Villas", count: "1,800+" },
    { icon: <TrendingUp />, label: "Commercial", count: "1,500+" },
  ];

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) =>
            theme.palette.brand?.gradient ||
            "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Fade in={isVisible} timeout={1000}>
            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              sx={{ textAlign: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <HomeIcon
                  sx={{ fontSize: { xs: "3rem", md: "4rem" }, mr: 2 }}
                />
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                  }}
                >
                  Find Your Dream Home
                </Typography>
              </Box>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  opacity: 0.9,
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                  mb: 4,
                  maxWidth: "700px",
                  mx: "auto",
                  textAlign: "center",
                }}
              >
                Discover amazing properties in prime locations with our
                comprehensive real estate platform
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  component={Link}
                  to="/properties"
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  sx={{
                    backgroundColor: "background.paper",
                    color: "primary.main",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderRadius: 3,
                    "&:hover": {
                      backgroundColor: "background.surface",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Browse Properties
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderRadius: 3,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "white",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </MotionBox>
          </Fade>
        </Container>
      </Box>

      {/* Property Types Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Property Types Available
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {propertyTypes.map((type, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Slide in={isVisible} direction="up" timeout={600 + index * 100}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 48,
                      height: 48,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    {type.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {type.label}
                  </Typography>
                  <Chip
                    label={type.count}
                    color="primary"
                    size="small"
                    sx={{ fontWeight: "bold" }}
                  />
                </Paper>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: "background.surface", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Slide
                  in={isVisible}
                  direction="up"
                  timeout={800 + index * 200}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: 3,
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "success.main",
                        width: 56,
                        height: 56,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              mb: 2,
            }}
          >
            Why Choose Our Platform?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "600px", mx: "auto" }}
          >
            We provide comprehensive real estate solutions with cutting-edge
            technology and personalized service
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            flexWrap: { xs: "wrap", lg: "nowrap" },
            "& > *": { flex: { xs: "1 1 300px", lg: "1 1 0" } },
          }}
        >
          {features.map((feature, index) => (
            <MotionCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              sx={{
                maxWidth: 400,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                "&:hover": {
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                },
                transition: "box-shadow 0.3s ease",
              }}
            >
              <Box
                sx={{
                  height: 80,
                  background: (theme) =>
                    theme.palette[feature.colorKey]?.main
                      ? `${theme.palette[feature.colorKey].main}15`
                      : `${theme.palette.primary.light}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {feature.icon}
              </Box>
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </MotionCard>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: (theme) =>
            theme.palette.brand?.gradient ||
            "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Ready to Find Your Perfect Property?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of satisfied customers who found their dream homes
              through our platform
            </Typography>
            <Button
              component={Link}
              to="/properties"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: "background.paper",
                color: "primary.main",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: 3,
                "&:hover": {
                  backgroundColor: "background.surface",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Your Search Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;