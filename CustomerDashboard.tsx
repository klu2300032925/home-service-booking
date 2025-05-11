import React, { useState } from 'react';
import { Calendar, Clock, User, Settings, Grid, Star } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import BookingList from '../../components/BookingList';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../context/BookingsContext';
import { useReviews } from '../../context/ReviewsContext';
import { facilities, staffMembers } from '../../data/mockData';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { bookings, getCustomerBookings } = useBookings();
  const { reviews, getCustomerReviews } = useReviews();
  
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  if (!user || user.role !== 'customer') {
    return <div>Loading...</div>;
  }
  
  const customerBookings = getCustomerBookings(user.id);
  const customerReviews = getCustomerReviews(user.id);
  
  // Prepare data for BookingList
  const facilitiesMap = facilities.reduce((acc, facility) => {
    acc[facility.id] = { name: facility.name, imageUrl: facility.imageUrl };
    return acc;
  }, {} as Record<string, { name: string; imageUrl: string }>);
  
  const staffMap = staffMembers.reduce((acc, staff) => {
    acc[staff.id] = { name: staff.name };
    return acc;
  }, {} as Record<string, { name: string }>);
  
  // Filter bookings
  const upcomingBookings = customerBookings.filter(
    booking => booking.status !== 'completed' && booking.status !== 'cancelled'
  );
  
  const pastBookings = customerBookings.filter(
    booking => booking.status === 'completed' || booking.status === 'cancelled'
  );
  
  // Counts
  const totalBookings = customerBookings.length;
  const completedBookings = customerBookings.filter(booking => booking.status === 'completed').length;
  const pendingBookings = customerBookings.filter(booking => booking.status === 'pending').length;
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Customer Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-red-100 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold mt-1">{totalBookings}</p>
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
                  <Clock size={24} />
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
        </div>
        
        {/* Profile and Actions */}
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
                <p className="text-gray-500 mb-4">{user.email}</p>
                
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
          
          {/* Quick Actions */}
          <Card className="lg:col-span-3">
            <CardHeader className="bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="primary"
                  className="flex items-center justify-center py-6"
                  onClick={() => window.location.href = '/facilities'}
                >
                  <Grid size={24} className="mr-2" />
                  Browse Services
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center py-6"
                  onClick={() => setActiveTab('upcoming')}
                >
                  <Calendar size={24} className="mr-2" />
                  View Bookings
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center py-6"
                  onClick={() => window.location.href = '/contact'}
                >
                  <User size={24} className="mr-2" />
                  Contact Support
                </Button>
              </div>
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
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>You don't have any upcoming bookings.</p>
                  <Button 
                    variant="primary" 
                    className="mt-4"
                    onClick={() => window.location.href = '/facilities'}
                  >
                    Browse Services
                  </Button>
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
            <h2 className="text-lg font-semibold text-gray-900">My Reviews</h2>
          </CardHeader>
          <CardContent className="p-6">
            {customerReviews.length > 0 ? (
              <div className="space-y-4">
                {customerReviews.map(review => {
                  const facility = facilities.find(f => f.id === review.facilityId);
                  const staff = staffMembers.find(s => s.id === review.staffId);
                  
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
                      <div className="text-sm text-gray-500 flex justify-between">
                        <span>Staff: {staff?.name || 'Unknown'}</span>
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>You haven't left any reviews yet.</p>
                <p className="mt-2">After a service is completed, you can leave a review for the staff member.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;