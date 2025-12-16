"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const RatingContext = createContext();

export const useRating = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRating must be used within a RatingProvider');
  }
  return context;
};

export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});

  // Load ratings and reviews from localStorage on initial render
  useEffect(() => {
    const savedRatings = localStorage.getItem('productRatings');
    const savedReviews = localStorage.getItem('productReviews');
    
    if (savedRatings) {
      try {
        setRatings(JSON.parse(savedRatings));
      } catch (error) {
        console.error('Failed to parse ratings from localStorage:', error);
        setRatings({});
      }
    }
    
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error('Failed to parse reviews from localStorage:', error);
        setReviews({});
      }
    }
  }, []);

  // Save ratings to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('productRatings', JSON.stringify(ratings));
  }, [ratings]);

  // Save reviews to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('productReviews', JSON.stringify(reviews));
  }, [reviews]);

  const setProductRating = (productId, rating) => {
    setRatings(prev => ({
      ...prev,
      [productId]: rating
    }));
  };

  const getProductRating = (productId) => {
    return ratings[productId] || 0;
  };

  const addProductReview = (productId, review) => {
    setReviews(prev => {
      const productReviews = prev[productId] || [];
      return {
        ...prev,
        [productId]: [...productReviews, review]
      };
    });
  };

  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  const value = {
    ratings,
    setProductRating,
    getProductRating,
    reviews,
    addProductReview,
    getProductReviews
  };

  return (
    <RatingContext.Provider value={value}>
      {children}
    </RatingContext.Provider>
  );
};