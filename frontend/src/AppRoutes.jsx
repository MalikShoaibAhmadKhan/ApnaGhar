import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import RecentlyViewedPage from './pages/RecentlyViewedPage';
import AddPropertyPage from './pages/AddPropertyPage';
import ProtectedRoute from './components/ProtectedRoute';
import AnimatedPage from './components/AnimatedPage';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><RegisterPage /></AnimatedPage>} />
        <Route path="/properties" element={<AnimatedPage><PropertiesPage /></AnimatedPage>} />
        <Route path="/properties/:id" element={<AnimatedPage><PropertyDetailPage /></AnimatedPage>} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <AnimatedPage>
                <FavoritesPage />
              </AnimatedPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recently-viewed"
          element={
            <ProtectedRoute>
              <AnimatedPage>
                <RecentlyViewedPage />
              </AnimatedPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <AnimatedPage>
                <AddPropertyPage />
              </AnimatedPage>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
