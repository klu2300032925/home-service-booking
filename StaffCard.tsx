import React from 'react';
import { Star, Calendar, CheckCircle } from 'lucide-react';
import Card from './ui/Card';
import { Staff } from '../types';

interface StaffCardProps {
  staff: Staff;
  selected?: boolean;
  onClick?: () => void;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff, selected = false, onClick }) => {
  return (
    <Card
      className={`transition-all ${selected ? 'ring-2 ring-red-500' : ''}`}
      hoverable
      onClick={onClick}
    >
      <div className="p-4 flex flex-col sm:flex-row sm:items-center">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
          <div className="relative">
            <img 
              src={staff.profileImage || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'} 
              alt={staff.name} 
              className="w-20 h-20 rounded-full object-cover"
            />
            {staff.isAvailable && (
              <span className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full">
                <CheckCircle size={14} className="text-white" />
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{staff.name}</h3>
          
          <div className="flex items-center mt-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(staff.averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600">
              {staff.averageRating.toFixed(1)} ({staff.totalReviews} reviews)
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {staff.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>Available: {staff.availability.days.join(', ')}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StaffCard;