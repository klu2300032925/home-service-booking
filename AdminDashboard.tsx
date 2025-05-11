import React, { useState } from 'react';
import { Plus, Users, Grid, Clock, Star, ChevronDown, ChevronUp, Edit, Trash } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useFacilities } from '../../context/FacilitiesContext';
import { useBookings } from '../../context/BookingsContext';
import { staffMembers, customers, Facility } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { facilities, addFacility, updateFacility, deleteFacility } = useFacilities();
  const { bookings } = useBookings();
  
  const [activeTab, setActiveTab] = useState<'facilities' | 'staff' | 'customers' | 'bookings'>('facilities');
  const [isAddingFacility, setIsAddingFacility] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [newFacility, setNewFacility] = useState<Partial<Facility>>({
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    category: '',
    assignedStaff: [],
    isAvailable: true,
    estimatedTime: ''
  });
  const [expandedStaffId, setExpandedStaffId] = useState<string | null>(null);
  
  if (!user || user.role !== 'admin') {
    return <div>Loading...</div>;
  }
  
  // Stats
  const totalFacilities = facilities.length;
  const totalStaff = staffMembers.length;
  const totalCustomers = customers.length;
  const totalBookings = bookings.length;
  
  const handleAddFacility = () => {
    if (
      !newFacility.name ||
      !newFacility.description ||
      !newFacility.category ||
      !newFacility.imageUrl ||
      !newFacility.estimatedTime ||
      newFacility.price === undefined
    ) {
      alert('Please fill in all required fields');
      return;
    }
    
    addFacility(newFacility as Omit<Facility, 'id' | 'createdAt'>);
    setNewFacility({
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      category: '',
      assignedStaff: [],
      isAvailable: true,
      estimatedTime: ''
    });
    setIsAddingFacility(false);
  };
  
  const handleUpdateFacility = () => {
    if (!editingFacility) return;
    
    updateFacility(editingFacility.id, editingFacility);
    setEditingFacility(null);
  };
  
  const handleDeleteFacility = (id: string) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      deleteFacility(id);
    }
  };
  
  const toggleStaffDetails = (staffId: string) => {
    if (expandedStaffId === staffId) {
      setExpandedStaffId(null);
    } else {
      setExpandedStaffId(staffId);
    }
  };
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card
            className={`bg-gradient-to-br from-red-500 to-red-600 text-white cursor-pointer transition-transform ${
              activeTab === 'facilities' ? 'transform scale-105' : ''
            }`}
            onClick={() => setActiveTab('facilities')}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-red-100 text-sm">Total Facilities</p>
                  <p className="text-3xl font-bold mt-1">{totalFacilities}</p>
                </div>
                <div className="p-3 bg-red-400 bg-opacity-30 rounded-full">
                  <Grid size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card
            className={`bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer transition-transform ${
              activeTab === 'staff' ? 'transform scale-105' : ''
            }`}
            onClick={() => setActiveTab('staff')}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm">Total Staff</p>
                  <p className="text-3xl font-bold mt-1">{totalStaff}</p>
                </div>
                <div className="p-3 bg-green-400 bg-opacity-30 rounded-full">
                  <Users size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card
            className={`bg-gradient-to-br from-amber-500 to-amber-600 text-white cursor-pointer transition-transform ${
              activeTab === 'customers' ? 'transform scale-105' : ''
            }`}
            onClick={() => setActiveTab('customers')}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-100 text-sm">Total Customers</p>
                  <p className="text-3xl font-bold mt-1">{totalCustomers}</p>
                </div>
                <div className="p-3 bg-amber-400 bg-opacity-30 rounded-full">
                  <Users size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card
            className={`bg-gradient-to-br from-purple-500 to-purple-600 text-white cursor-pointer transition-transform ${
              activeTab === 'bookings' ? 'transform scale-105' : ''
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold mt-1">{totalBookings}</p>
                </div>
                <div className="p-3 bg-purple-400 bg-opacity-30 rounded-full">
                  <Clock size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Content Area */}
        <Card>
          <CardHeader className="bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === 'facilities' && 'Manage Facilities'}
              {activeTab === 'staff' && 'Manage Staff'}
              {activeTab === 'customers' && 'Customer List'}
              {activeTab === 'bookings' && 'All Bookings'}
            </h2>
            {activeTab === 'facilities' && (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setIsAddingFacility(true)}
                disabled={isAddingFacility}
              >
                <Plus size={16} className="mr-1" />
                Add New Facility
              </Button>
            )}
            {activeTab === 'staff' && (
              <Button 
                variant="primary" 
                size="sm"
              >
                <Plus size={16} className="mr-1" />
                Add New Staff
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-6">
            {/* Facilities Tab Content */}
            {activeTab === 'facilities' && (
              <div>
                {isAddingFacility && (
                  <div className="mb-6 p-4 border border-red-200 rounded-lg bg-red-50">
                    <h3 className="text-lg font-semibold mb-4">Add New Facility</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={newFacility.name}
                          onChange={(e) => setNewFacility({...newFacility, name: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                          type="text"
                          value={newFacility.category}
                          onChange={(e) => setNewFacility({...newFacility, category: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                          type="number"
                          value={newFacility.price}
                          onChange={(e) => setNewFacility({...newFacility, price: parseFloat(e.target.value)})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time</label>
                        <input
                          type="text"
                          value={newFacility.estimatedTime}
                          onChange={(e) => setNewFacility({...newFacility, estimatedTime: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="e.g. 1-2 hours"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={newFacility.imageUrl}
                          onChange={(e) => setNewFacility({...newFacility, imageUrl: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Available</label>
                        <select
                          value={newFacility.isAvailable ? 'true' : 'false'}
                          onChange={(e) => setNewFacility({...newFacility, isAvailable: e.target.value === 'true'})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={newFacility.description}
                          onChange={(e) => setNewFacility({...newFacility, description: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddingFacility(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleAddFacility}
                      >
                        Add Facility
                      </Button>
                    </div>
                  </div>
                )}
                
                {editingFacility && (
                  <div className="mb-6 p-4 border border-red-200 rounded-lg bg-red-50">
                    <h3 className="text-lg font-semibold mb-4">Edit Facility</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={editingFacility.name}
                          onChange={(e) => setEditingFacility({...editingFacility, name: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                          type="text"
                          value={editingFacility.category}
                          onChange={(e) => setEditingFacility({...editingFacility, category: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                          type="number"
                          value={editingFacility.price}
                          onChange={(e) => setEditingFacility({...editingFacility, price: parseFloat(e.target.value)})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time</label>
                        <input
                          type="text"
                          value={editingFacility.estimatedTime}
                          onChange={(e) => setEditingFacility({...editingFacility, estimatedTime: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={editingFacility.imageUrl}
                          onChange={(e) => setEditingFacility({...editingFacility, imageUrl: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Available</label>
                        <select
                          value={editingFacility.isAvailable ? 'true' : 'false'}
                          onChange={(e) => setEditingFacility({...editingFacility, isAvailable: e.target.value === 'true'})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={editingFacility.description}
                          onChange={(e) => setEditingFacility({...editingFacility, description: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setEditingFacility(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleUpdateFacility}
                      >
                        Update Facility
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Facilities List */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {facilities.map((facility) => (
                        <tr key={facility.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full object-cover" src={facility.imageUrl} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{facility.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{facility.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${facility.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span 
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                facility.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {facility.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {facility.assignedStaff.length} staff
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => setEditingFacility(facility)}
                              className="text-red-600 hover:text-red-900 mr-3"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteFacility(facility.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Staff Tab Content */}
            {activeTab === 'staff' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {staffMembers.map((staff) => (
                        <React.Fragment key={staff.id}>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full object-cover" src={staff.profileImage} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                                  <div className="text-sm text-gray-500">{staff.skills.join(', ')}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{staff.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Star size={16} className="text-yellow-400 fill-current mr-1" />
                                <span>{staff.averageRating.toFixed(1)} ({staff.totalReviews})</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span 
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  staff.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {staff.isAvailable ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                className="text-red-600 hover:text-red-900 flex items-center"
                                onClick={() => toggleStaffDetails(staff.id)}
                              >
                                {expandedStaffId === staff.id ? (
                                  <>
                                    <ChevronUp size={16} className="mr-1" />
                                    Hide Details
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown size={16} className="mr-1" />
                                    View Details
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                          {expandedStaffId === staff.id && (
                            <tr>
                              <td colSpan={5} className="px-6 py-4 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                                    <p className="text-sm text-gray-600">Phone: {staff.phoneNumber}</p>
                                    <p className="text-sm text-gray-600">Address: {staff.address}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Availability</h4>
                                    <p className="text-sm text-gray-600">Days: {staff.availability.days.join(', ')}</p>
                                    <p className="text-sm text-gray-600">
                                      Hours: {staff.availability.hours.start} - {staff.availability.hours.end}
                                    </p>
                                  </div>
                                  <div className="md:col-span-2">
                                    <h4 className="font-medium text-gray-900 mb-2">Assigned Facilities</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {staff.assignedFacilities.map(facilityId => {
                                        const facility = facilities.find(f => f.id === facilityId);
                                        return facility ? (
                                          <span 
                                            key={facilityId}
                                            className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
                                          >
                                            {facility.name}
                                          </span>
                                        ) : null;
                                      })}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                  <Button variant="outline" size="sm">Edit Staff</Button>
                                  <Button 
                                    variant={staff.isAvailable ? "danger" : "success"} 
                                    size="sm"
                                  >
                                    {staff.isAvailable ? "Mark Unavailable" : "Mark Available"}
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Customers Tab Content */}
            {activeTab === 'customers' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img 
                                  className="h-10 w-10 rounded-full object-cover" 
                                  src={customer.profileImage || 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg'}
                                  alt="" 
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{customer.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{customer.bookings.length} bookings</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(customer.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="outline" size="sm">View Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Bookings Tab Content */}
            {activeTab === 'bookings' && (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <div>
                    <select className="p-2 border border-gray-300 rounded-md text-sm">
                      <option value="all">All Bookings</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      className="p-2 pl-8 border border-gray-300 rounded-md text-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => {
                        const facility = facilities.find(f => f.id === booking.facilityId);
                        const staff = staffMembers.find(s => s.id === booking.staffId);
                        const customer = customers.find(c => c.id === booking.customerId);
                        
                        return (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">#{booking.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{facility?.name || 'Unknown'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{customer?.name || 'Unknown'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{staff?.name || 'Unknown'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(booking.date).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-500">{booking.timeSlot}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                                ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                ${booking.status === 'confirmed' ? 'bg-red-100 text-red-800' : ''}
                                ${booking.status === 'in-progress' ? 'bg-purple-100 text-purple-800' : ''}
                              `}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Button variant="outline" size="sm">View Details</Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;