import React, { createContext, useContext, useState, ReactNode } from 'react';
import { reviews as mockReviews } from '../data/mockData';
import { Review } from '../types';

interface ReviewsContextType {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  getReviewById: (id: string) => Review | undefined;
  getStaffReviews: (staffId: string) => Review[];
  getFacilityReviews: (facilityId: string) => Review[];
  getCustomerReviews: (customerId: string) => Review[];
  createReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  updateReview: (id: string, updatedFields: Partial<Review>) => void;
  deleteReview: (id: string) => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

interface ReviewsProviderProps {
  children: ReactNode;
}

export const ReviewsProvider: React.FC<ReviewsProviderProps> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getReviewById = (id: string) => {
    return reviews.find(review => review.id === id);
  };

  const getStaffReviews = (staffId: string) => {
    return reviews.filter(review => review.staffId === staffId);
  };

  const getFacilityReviews = (facilityId: string) => {
    return reviews.filter(review => review.facilityId === facilityId);
  };

  const getCustomerReviews = (customerId: string) => {
    return reviews.filter(review => review.customerId === customerId);
  };

  const createReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: `new-${Date.now()}`,
      createdAt: new Date()
    };
    
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  const updateReview = (id: string, updatedFields: Partial<Review>) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === id ? { ...review, ...updatedFields } : review
      )
    );
  };

  const deleteReview = (id: string) => {
    setReviews(prevReviews => 
      prevReviews.filter(review => review.id !== id)
    );
  };

  const value = {
    reviews,
    loading,
    error,
    getReviewById,
    getStaffReviews,
    getFacilityReviews,
    getCustomerReviews,
    createReview,
    updateReview,
    deleteReview
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
};