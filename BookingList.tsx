import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';
import { Booking } from '../types';
import Button from './ui/Button';
import { useBookings } from '../context/BookingsContext';

interface BookingListProps {
  bookings: Booking[];
  facilities: Record<string, { name: string; imageUrl: string }>;
  staffMembers: Record<string, { name: string }>;
  allowActions?: boolean;
}

const BookingList: React.FC<BookingListProps> = ({
  bookings,
  facilities,
  staffMembers,
  allowActions = false
}) => {
  const navigate = useNavigate();
  const { updateBookingStatus, cancelBooking } = useBookings();

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No bookings found.
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'cancelled':
        return <XCircle size={18} className="text-red-500" />;
      case 'confirmed':
        return <CheckCircle size={18} className="text-red-500" />;
      case 'in-progress':
        return <Loader size={18} className="text-yellow-500" />;
      default:
        return <AlertCircle size={18} className="text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    updateBookingStatus(bookingId, newStatus);
  };

  const handleCancel = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
    }
  };

  const handleViewDetails = (bookingId: string) => {
    navigate(`/bookings/${bookingId}`);
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="md:flex">
            <div className="md:flex-shrink-0 h-32 md:h-auto md:w-48">
              <img
                className="h-full w-full object-cover"
                src={facilities[booking.facilityId]?.imageUrl || 'https://images.pexels.com/photos/3760081/pexels-photo-3760081.jpeg'}
                alt={facilities[booking.facilityId]?.name || 'Service'}
              />
            </div>
            
            <div className="p-4 flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">
                  {facilities[booking.facilityId]?.name || 'Unknown Service'}
                </h3>
                <span className="flex items-center px-2 py-1 rounded text-sm font-medium">
                  {getStatusIcon(booking.status)}
                  <span className="ml-1 capitalize">{booking.status}</span>
                </span>
              </div>
              
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatDate(booking.date)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-1" />
                  <span>{booking.timeSlot}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <User size={16} className="mr-1" />
                  <span>{staffMembers[booking.staffId]?.name || 'Unknown Staff'}</span>
                </div>
              </div>
              
              {booking.notes && (
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Notes:</span> {booking.notes}
                </div>
              )}
              
              <div className="mt-4 text-lg font-semibold text-gray-900">
                ${booking.totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
          
          {allowActions && booking.status !== 'completed' && booking.status !== 'cancelled' && (
            <div className="px-4 py-3 bg-gray-50 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDetails(booking.id)}
              >
                View Details
              </Button>
              
              {booking.status === 'pending' && (
                <>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleStatusChange(booking.id, 'confirmed')}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel
                  </Button>
                </>
              )}
              
              {booking.status === 'confirmed' && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleStatusChange(booking.id, 'in-progress')}
                >
                  Mark In Progress
                </Button>
              )}
              
              {booking.status === 'in-progress' && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleStatusChange(booking.id, 'completed')}
                >
                  Mark Completed
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingList;