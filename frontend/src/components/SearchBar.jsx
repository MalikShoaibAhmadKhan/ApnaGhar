import React, { useState, useRef, useEffect } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fade,
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn,
  Home,
  TrendingUp,
  Clear,
  History
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const MotionPaper = motion(Paper);

const SearchBar = ({ onSearch, placeholder = "Search properties, locations, or features..." }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const theme = useTheme();

  // Mock suggestions - in real app, these would come from API
  const mockSuggestions = [
    { type: 'location', text: 'Downtown', icon: <LocationOn /> },
    { type: 'location', text: 'Beverly Hills', icon: <LocationOn /> },
    { type: 'location', text: 'Manhattan', icon: <LocationOn /> },
    { type: 'property', text: '3 bedroom house', icon: <Home /> },
    { type: 'property', text: 'Luxury apartment', icon: <Home /> },
    { type: 'trending', text: 'Waterfront properties', icon: <TrendingUp /> },
    { type: 'trending', text: 'Modern condos', icon: <TrendingUp /> },
  ];

  const popularSearches = [
    'Luxury homes',
    'Apartments for rent',
    'Beachfront properties',
    'Modern condos',
    'Family homes'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecentSearches = [
        searchQuery,
        ...recentSearches.filter(item => item !== searchQuery)
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      
      onSearch(searchQuery);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <Box ref={searchRef} sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
      <MotionPaper
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        whileFocus={{ scale: 1.02 }}
        elevation={isOpen ? 8 : 2}
        sx={{
          p: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3,
          background: theme.palette.background.paper,
          border: `2px solid ${isOpen ? theme.palette.primary.main : 'transparent'}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }
        }}
      >
        <IconButton sx={{ p: '10px' }}>
          <SearchIcon color="primary" />
        </IconButton>
        
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: '1.1rem' }}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        
        {query && (
          <IconButton onClick={clearSearch} sx={{ p: '10px' }}>
            <Clear />
          </IconButton>
        )}
        
        <IconButton 
          onClick={() => handleSearch()}
          sx={{ 
            p: '10px',
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
            }
          }}
        >
          <SearchIcon />
        </IconButton>
      </MotionPaper>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <MotionPaper
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            elevation={8}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              mt: 1,
              borderRadius: 2,
              maxHeight: 400,
              overflow: 'auto',
              zIndex: 1000,
              background: theme.palette.background.paper,
            }}
          >
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: 'text.secondary' }}>
                  Suggestions
                </Typography>
                <List dense>
                  {suggestions.map((suggestion, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleSuggestionClick(suggestion)}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {suggestion.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={suggestion.text}
                        secondary={suggestion.type}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Box>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && query === '' && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Recent Searches
                  </Typography>
                  <IconButton size="small" onClick={clearRecentSearches}>
                    <Clear fontSize="small" />
                  </IconButton>
                </Box>
                <List dense>
                  {recentSearches.map((search, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleSearch(search)}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <History />
                      </ListItemIcon>
                      <ListItemText primary={search} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Box>
            )}

            {/* Popular Searches */}
            {query === '' && (
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                  Popular Searches
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {popularSearches.map((search, index) => (
                    <Chip
                      key={index}
                      label={search}
                      variant="outlined"
                      size="small"
                      onClick={() => handleSearch(search)}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </MotionPaper>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SearchBar;