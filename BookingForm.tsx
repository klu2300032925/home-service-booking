import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, DollarSign, FileText } from 'lucide-react';
import Button from './ui/Button';
import { useBookings } from '../context/BookingsContext';
import { useAuth } from '../context/AuthContext';
import { Facility, Staff } from '../types';

interface BookingFormProps {
  facility: Facility;
  staffMembers: Staff[];
}

const BookingForm: React.FC<BookingFormProps> = ({ facility, staffMembers }) => {
  const { user } = useAuth();
  const { createBooking } = useBookings();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!selectedDate || !selectedTimeSlot || !selectedStaffId) {
      setError('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a new booking
      const booking = {
        customerId: user.id,
        facilityId: facility.id,
        staffId: selectedStaffId,
        date: new Date(`${selectedDate}T00:00:00`),
        timeSlot: selectedTimeSlot,
        status: 'pending' as const,
        totalPrice: facility.price,
        notes: notes
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      createBooking(booking);
      
      // Navigate to customer dashboard
      navigate('/customer');
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate time slots (9 AM to 5 PM)
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9;
    const startTime = `${hour === 12 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
    const endTime = `${(hour + 1) === 12 ? 12 : (hour + 1) % 12}:00 ${(hour + 1) < 12 ? 'AM' : 'PM'}`;
    return `${startTime} - ${endTime}`;
  });

  // Get tomorrow's date as min date for the date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Book This Service</h3>
      
      {error && (
        <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="date">
            <Calendar size={16} className="inline mr-1" /> Select Date
          </label>
          <input
            type="date"
            id="date"
            min={minDate}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="timeSlot">
            <Clock size={16} className="inline mr-1" /> Select Time Slot
          </label>
          <select
            id="timeSlot"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="staff">
            <User size={16} className="inline mr-1" /> Select Staff
          </label>
          <select
            id="staff"
            value={selectedStaffId}
            onChange={(e) => setSelectedStaffId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select a staff member</option>
            {staffMembers.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name} - Rating: {staff.averageRating}/5
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="notes">
            <FileText size={16} className="inline mr-1" /> Additional Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[80px]"
            placeholder="Any special requests or information..."
          />
        </div>
        
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Price:</span>
            <span className="font-semibold text-gray-900">${facility.price}</span>
          </div>
        </div>
        
        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          <DollarSign size={16} className="mr-1" /> Book Now
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;