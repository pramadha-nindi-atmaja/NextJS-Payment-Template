"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext();

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load recently viewed from localStorage on initial render
  useEffect(() => {
    const savedRecentlyViewed = localStorage.getItem('recentlyViewed');
    if (savedRecentlyViewed) {
      try {
        setRecentlyViewed(JSON.parse(savedRecentlyViewed));
      } catch (error) {
        console.error('Failed to parse recently viewed from localStorage:', error);
        setRecentlyViewed([]);
      }
    }
  }, []);

  // Save recently viewed to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      // Remove the product if it already exists
      const filtered = prev.filter(item => item.id !== product.id);
      // Add the product to the beginning of the array
      const updated = [product, ...filtered];
      // Limit to 10 items
      return updated.slice(0, 10);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const value = {
    recentlyViewed,
    addRecentlyViewed,
    clearRecentlyViewed
  };

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};