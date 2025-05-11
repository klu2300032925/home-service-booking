import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, DollarSign } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { Facility } from '../types';

interface FacilityCardProps {
  facility: Facility;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/facilities/${facility.id}`);
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={facility.imageUrl} 
          alt={facility.name} 
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-xs font-bold">
          {facility.category}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{facility.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{facility.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={16} className="mr-1" />
            <span>{facility.estimatedTime}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Users size={16} className="mr-1" />
            <span>{facility.assignedStaff.length} Staff</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center font-medium text-gray-900">
            <DollarSign size={18} className="text-red-600" />
            <span>${facility.price}/hr</span>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-bold ${facility.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {facility.isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
        
        <Button variant="primary" onClick={handleViewDetails} fullWidth>
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default FacilityCard;