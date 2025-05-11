import React, { createContext, useContext, useState, ReactNode } from 'react';
import { facilities as mockFacilities } from '../data/mockData';
import { Facility } from '../types';

interface FacilitiesContextType {
  facilities: Facility[];
  loading: boolean;
  error: string | null;
  getFacilityById: (id: string) => Facility | undefined;
  addFacility: (facility: Omit<Facility, 'id' | 'createdAt'>) => void;
  updateFacility: (id: string, facility: Partial<Facility>) => void;
  deleteFacility: (id: string) => void;
}

const FacilitiesContext = createContext<FacilitiesContextType | undefined>(undefined);

export const useFacilities = () => {
  const context = useContext(FacilitiesContext);
  if (context === undefined) {
    throw new Error('useFacilities must be used within a FacilitiesProvider');
  }
  return context;
};

interface FacilitiesProviderProps {
  children: ReactNode;
}

export const FacilitiesProvider: React.FC<FacilitiesProviderProps> = ({ children }) => {
  const [facilities, setFacilities] = useState<Facility[]>(mockFacilities);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getFacilityById = (id: string) => {
    return facilities.find(facility => facility.id === id);
  };

  const addFacility = (facility: Omit<Facility, 'id' | 'createdAt'>) => {
    const newFacility: Facility = {
      ...facility,
      id: `new-${Date.now()}`,
      createdAt: new Date()
    };
    
    setFacilities(prevFacilities => [...prevFacilities, newFacility]);
  };

  const updateFacility = (id: string, updatedFields: Partial<Facility>) => {
    setFacilities(prevFacilities => 
      prevFacilities.map(facility => 
        facility.id === id ? { ...facility, ...updatedFields } : facility
      )
    );
  };

  const deleteFacility = (id: string) => {
    setFacilities(prevFacilities => 
      prevFacilities.filter(facility => facility.id !== id)
    );
  };

  const value = {
    facilities,
    loading,
    error,
    getFacilityById,
    addFacility,
    updateFacility,
    deleteFacility
  };

  return (
    <FacilitiesContext.Provider value={value}>
      {children}
    </FacilitiesContext.Provider>
  );
};