import React, { createContext, useContext, useState, ReactNode } from 'react';
import { bookings as mockBookings } from '../data/mockData';
import { Booking } from '../types';

interface BookingsContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  getBookingById: (id: string) => Booking | undefined;
  getCustomerBookings: (customerId: string) => Booking[];
  getStaffBookings: (staffId: string) => Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  cancelBooking: (id: string) => void;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};

interface BookingsProviderProps {
  children: ReactNode;
}

export const BookingsProvider: React.FC<BookingsProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getBookingById = (id: string) => {
    return bookings.find(booking => booking.id === id);
  };

  const getCustomerBookings = (customerId: string) => {
    return bookings.filter(booking => booking.customerId === customerId);
  };

  const getStaffBookings = (staffId: string) => {
    return bookings.filter(booking => booking.staffId === staffId);
  };

  const createBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `new-${Date.now()}`,
      createdAt: new Date()
    };
    
    setBookings(prevBookings => [...prevBookings, newBooking]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const cancelBooking = (id: string) => {
    updateBookingStatus(id, 'cancelled');
  };

  const value = {
    bookings,
    loading,
    error,
    getBookingById,
    getCustomerBookings,
    getStaffBookings,
    createBooking,
    updateBookingStatus,
    cancelBooking
  };

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
};