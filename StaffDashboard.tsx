import React, { useState } from 'react';
import { Calendar, Clock, User, Settings, Star, CheckCircle, XCircle } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import BookingList from '../../components/BookingList';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../context/BookingsContext';
import { useReviews } from '../../context/ReviewsContext';
import { facilities } from '../../data/mockData';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getStaffBookings } = useBookings();
  const { getStaffReviews } = useReviews();
  
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [isAvailable, setIsAvailable] = useState(true);
  
  if (!user || user.role !== 'staff') {
    return <div>Loading...</div>;
  }
  
  const staffBookings = getStaffBookings(user.id);
  const staffReviews = getStaffReviews(user.id);
  
  // Prepare data for BookingList
  const facilitiesMap = facilities.reduce((acc, facility) => {
    acc[facility.id] = { name: facility.name, imageUrl: facility.imageUrl };
    return acc;
  }, {} as Record<string, { name: string; imageUrl: string }>);
  
  const staffMap = {
    [user.id]: { name: user.name }
  };
  
  // Filter bookings
  const upcomingBookings = staffBookings.filter(
    booking => booking.status !== 'completed' && booking.status !== 'cancelled'
  );
  
  const pastBookings = staffBookings.filter(
    booking => booking.status === 'completed' || booking.status === 'cancelled'
  );
  
  // Stats
  const todayBookings = staffBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return (
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear() &&
      booking.status !== 'cancelled'
    );
  }).length;
  
  const completedBookings = staffBookings.filter(booking => booking.status === 'completed').length;
  const pendingBookings = staffBookings.filter(booking => booking.status === 'pending' || booking.status === 'confirmed').length;
  
  // Calculate average rating
  const averageRating = staffReviews.length > 0
    ? (staffReviews.reduce((acc, review) => acc + review.rating, 0) / staffReviews.length).toFixed(1)
    : 'N/A';
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Staff Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-red-100 text-sm">Today's Bookings</p>
                  <p className="text-3xl font-bold mt-1">{todayBookings}</p>
                </div>
                <div className="p-3 bg-red-400 bg-opacity-30 rounded-full">
                  <Calendar size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm">Completed Services</p>
                  <p className="text-3xl font-bold mt-1">{completedBookings}</p>
                </div>
                <div className="p-3 bg-green-400 bg-opacity-30 rounded-full">
                  <CheckCircle size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-100 text-sm">Pending Bookings</p>
                  <p className="text-3xl font-bold mt-1">{pendingBookings}</p>
                </div>
                <div className="p-3 bg-amber-400 bg-opacity-30 rounded-full">
                  <Clock size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 text-sm">Average Rating</p>
                  <div className="flex items-center mt-1">
                    <span className="text-3xl font-bold mr-1">{averageRating}</span>
                    <Star size={20} className="fill-current" />
                  </div>
                </div>
                <div className="p-3 bg-purple-400 bg-opacity-30 rounded-full">
                  <Star size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Profile and Availability */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-red-600 text-white flex items-center justify-center text-3xl mb-4">
                  {user.name.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
                <p className="text-gray-500 mb-2">{user.email}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= Number(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-600">
                    {averageRating}/5 ({staffReviews.length} reviews)
                  </span>
                </div>
                
                <div className="w-full mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Availability Status</span>
                    <span className={`flex items-center text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      {isAvailable 
                        ? <><CheckCircle size={16} className="mr-1" /> Available</>
                        : <><XCircle size={16} className="mr-1" /> Unavailable</>
                      }
                    </span>
                  </div>
                  <Button 
                    variant={isAvailable ? "success" : "danger"} 
                    fullWidth 
                    onClick={() => setIsAvailable(!isAvailable)}
                  >
                    {isAvailable ? "Set as Unavailable" : "Set as Available"}
                  </Button>
                </div>
                
                <Button variant="outline" fullWidth className="mb-2">
                  <User size={16} className="mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" fullWidth>
                  <Settings size={16} className="mr-2" />
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Schedule & Stats */}
          <Card className="lg:col-span-3">
            <CardHeader className="bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Daily Schedule</h2>
            </CardHeader>
            <CardContent className="p-6">
              {todayBookings > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings
                    .filter(booking => {
                      const bookingDate = new Date(booking.date);
                      const today = new Date();
                      return (
                        bookingDate.getDate() === today.getDate() &&
                        bookingDate.getMonth() === today.getMonth() &&
                        bookingDate.getFullYear() === today.getFullYear()
                      );
                    })
                    .map(booking => {
                      const facility = facilities.find(f => f.id === booking.facilityId);
                      
                      return (
                        <div key={booking.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <Clock size={24} className="text-red-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{facility?.name || 'Unknown Service'}</h3>
                              <p className="text-gray-600">{booking.timeSlot}</p>
                            </div>
                          </div>
                          <div>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize bg-red-100 text-red-800">
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>You don't have any bookings scheduled for today.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Bookings Section */}
        <Card className="mb-8">
          <CardHeader className="bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">My Bookings</h2>
            <div className="flex mt-3 sm:mt-0">
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'upcoming' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-md`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'past' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-md`}
                onClick={() => setActiveTab('past')}
              >
                Past
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {activeTab === 'upcoming' ? (
              upcomingBookings.length > 0 ? (
                <BookingList
                  bookings={upcomingBookings}
                  facilities={facilitiesMap}
                  staffMembers={staffMap}
                  allowActions={true}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>You don't have any upcoming bookings.</p>
                </div>
              )
            ) : (
              pastBookings.length > 0 ? (
                <BookingList
                  bookings={pastBookings}
                  facilities={facilitiesMap}
                  staffMembers={staffMap}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>You don't have any past bookings.</p>
                </div>
              )
            )}
          </CardContent>
        </Card>
        
        {/* Reviews */}
        <Card>
          <CardHeader className="bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Customer Reviews</h2>
          </CardHeader>
          <CardContent className="p-6">
            {staffReviews.length > 0 ? (
              <div className="space-y-4">
                {staffReviews.map(review => {
                  const facility = facilities.find(f => f.id === review.facilityId);
                  
                  return (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold">{facility?.name || 'Unknown Service'}</h3>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <div className="text-sm text-gray-500 text-right">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>You haven't received any reviews yet.</p>
                <p className="mt-2">When customers leave reviews after services, they'll appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;