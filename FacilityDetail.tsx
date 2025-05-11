import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, DollarSign, User, Calendar, ArrowLeft, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import BookingForm from '../components/BookingForm';
import ReviewList from '../components/ReviewList';
import { useFacilities } from '../context/FacilitiesContext';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewsContext';
import { staffMembers } from '../data/mockData';

const FacilityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { facilities, getFacilityById } = useFacilities();
  const { user } = useAuth();
  const { reviews, getFacilityReviews } = useReviews();
  
  const [facility, setFacility] = useState(getFacilityById(id || ''));
  const [facilityReviews, setFacilityReviews] = useState(getFacilityReviews(id || ''));
  const [assignedStaff, setAssignedStaff] = useState(
    staffMembers.filter(staff => facility?.assignedStaff.includes(staff.id))
  );
  
  useEffect(() => {
    if (!facility) {
      navigate('/facilities');
    } else {
      setFacilityReviews(getFacilityReviews(facility.id));
      setAssignedStaff(staffMembers.filter(staff => facility.assignedStaff.includes(staff.id)));
    }
  }, [facility, id, getFacilityReviews, navigate]);
  
  if (!facility) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Banner */}
      <div 
        className="h-64 md:h-80 bg-red-600 relative"
        style={{
          backgroundImage: `url(${facility.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{facility.name}</h1>
            <p className="text-lg text-red-100 max-w-2xl">{facility.category}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex items-center justify-between">
          <button 
            onClick={() => navigate('/facilities')}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to Services</span>
          </button>
          
          <div className="flex items-center">
            <div className="flex items-center text-yellow-500 mr-4">
              <Star size={18} className="fill-current" />
              <span className="ml-1 font-semibold">
                {facilityReviews.length > 0 
                  ? (facilityReviews.reduce((acc, review) => acc + review.rating, 0) / facilityReviews.length).toFixed(1)
                  : 'No ratings'}
              </span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${facility.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {facility.isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Facility Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Service</h2>
              <p className="text-gray-600 mb-6">{facility.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Clock size={20} className="text-red-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Estimated Time</p>
                    <p className="font-medium">{facility.estimatedTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign size={20} className="text-red-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">${facility.price}/hr</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={20} className="text-red-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Available From</p>
                    <p className="font-medium">
                      {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Professionals</h2>
              
              {assignedStaff.length > 0 ? (
                <div className="space-y-4">
                  {assignedStaff.map((staff) => (
                    <div key={staff.id} className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex-shrink-0 mr-4">
                        <img 
                          src={staff.profileImage || "https://via.placeholder.com/60"}
                          alt={staff.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold">{staff.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < Math.floor(staff.averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-gray-600">
                            {staff.averageRating.toFixed(1)} ({staff.totalReviews} reviews)
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {staff.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No staff members are currently assigned to this service.</p>
              )}
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
                <span className="text-gray-500">
                  {facilityReviews.length} {facilityReviews.length === 1 ? 'Review' : 'Reviews'}
                </span>
              </div>
              
              <ReviewList reviews={facilityReviews} />
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-1">
            {facility.isAvailable ? (
              user ? (
                <BookingForm facility={facility} staffMembers={assignedStaff} />
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Book This Service</h3>
                  <p className="text-gray-600 mb-6">Please log in to book this service.</p>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => navigate('/login')}
                  >
                    <User size={16} className="mr-2" />
                    Login to Book
                  </Button>
                </div>
              )
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Unavailable</h3>
                <p className="text-gray-600 mb-6">
                  This service is currently unavailable. Please check back later or contact us for more information.
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetail;