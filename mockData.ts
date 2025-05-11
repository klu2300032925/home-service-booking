import { User, Facility, Booking, Review, Staff, Admin, Customer } from '../types';

// Mock Admins
export const admins: Admin[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@homeservices.com',
    password: 'admin123',
    role: 'admin',
    profileImage: 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg',
    phoneNumber: '555-0100',
    address: '123 Admin St, Admin City',
    createdAt: new Date('2023-01-01'),
    permissions: ['manage_staff', 'manage_facilities', 'manage_bookings', 'view_reports']
  }
];

// Mock Staff
export const staffMembers: Staff[] = [
  {
    id: '1',
    name: 'John Technician',
    email: 'john@homeservices.com',
    password: 'john123',
    role: 'staff',
    profileImage: 'https://images.pexels.com/photos/8091469/pexels-photo-8091469.jpeg',
    phoneNumber: '555-0101',
    address: '456 Staff St, Staff City',
    createdAt: new Date('2023-01-15'),
    skills: ['Plumbing', 'Electrical'],
    assignedFacilities: ['1', '2'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: {
        start: '09:00',
        end: '17:00'
      }
    },
    averageRating: 4.7,
    totalReviews: 23,
    isAvailable: true
  },
  {
    id: '2',
    name: 'Sarah Cleaner',
    email: 'sarah@homeservices.com',
    password: 'sarah123',
    role: 'staff',
    profileImage: 'https://images.pexels.com/photos/6194095/pexels-photo-6194095.jpeg',
    phoneNumber: '555-0102',
    address: '789 Staff Ave, Staff Town',
    createdAt: new Date('2023-02-01'),
    skills: ['Cleaning', 'Organization'],
    assignedFacilities: ['3'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: {
        start: '08:00',
        end: '16:00'
      }
    },
    averageRating: 4.9,
    totalReviews: 45,
    isAvailable: true
  },
  {
    id: '3',
    name: 'Mike Repairman',
    email: 'mike@homeservices.com',
    password: 'mike123',
    role: 'staff',
    profileImage: 'https://images.pexels.com/photos/8108035/pexels-photo-8108035.jpeg',
    phoneNumber: '555-0103',
    address: '101 Staff Blvd, Staffville',
    createdAt: new Date('2023-02-15'),
    skills: ['AC Repair', 'Appliance Repair'],
    assignedFacilities: ['4', '5'],
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      hours: {
        start: '10:00',
        end: '18:00'
      }
    },
    averageRating: 4.5,
    totalReviews: 17,
    isAvailable: true
  }
];

// Mock Customers
export const customers: Customer[] = [
  {
    id: '1',
    name: 'Alice Customer',
    email: 'alice@example.com',
    password: 'alice123',
    role: 'customer',
    profileImage: 'https://images.pexels.com/photos/3760583/pexels-photo-3760583.jpeg',
    phoneNumber: '555-0104',
    address: '222 Customer Rd, Customer City',
    createdAt: new Date('2023-03-01'),
    bookings: ['1', '3']
  },
  {
    id: '2',
    name: 'Bob Homeowner',
    email: 'bob@example.com',
    password: 'bob123',
    role: 'customer',
    profileImage: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    phoneNumber: '555-0105',
    address: '333 Customer St, Customer Town',
    createdAt: new Date('2023-03-15'),
    bookings: ['2']
  }
];

// All Users
export const users: User[] = [
  ...admins,
  ...staffMembers,
  ...customers
];

// Mock Facilities
export const facilities: Facility[] = [
  {
    id: '1',
    name: 'Plumbing Services',
    description: 'Professional plumbing services for your home, including pipe repairs, installations, and drain cleaning.',
    imageUrl: 'https://images.pexels.com/photos/5486432/pexels-photo-5486432.jpeg',
    price: 75,
    category: 'Plumbing',
    assignedStaff: ['1'],
    isAvailable: true,
    estimatedTime: '1-2 hours',
    createdAt: new Date('2023-01-10')
  },
  {
    id: '2',
    name: 'Electrical Services',
    description: 'Certified electricians for all your electrical needs, from installations to repairs and maintenance.',
    imageUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
    price: 85,
    category: 'Electrical',
    assignedStaff: ['1'],
    isAvailable: true,
    estimatedTime: '1-3 hours',
    createdAt: new Date('2023-01-12')
  },
  {
    id: '3',
    name: 'Home Cleaning',
    description: 'Thorough home cleaning services that leave your spaces spotless and fresh.',
    imageUrl: 'https://images.pexels.com/photos/4107098/pexels-photo-4107098.jpeg',
    price: 120,
    category: 'Cleaning',
    assignedStaff: ['2'],
    isAvailable: true,
    estimatedTime: '3-4 hours',
    createdAt: new Date('2023-01-14')
  },
  {
    id: '4',
    name: 'AC Repair & Maintenance',
    description: 'Keep your home cool with our expert AC repair and maintenance services.',
    imageUrl: 'https://images.pexels.com/photos/4108714/pexels-photo-4108714.jpeg',
    price: 95,
    category: 'AC Repair',
    assignedStaff: ['3'],
    isAvailable: true,
    estimatedTime: '1-2 hours',
    createdAt: new Date('2023-01-16')
  },
  {
    id: '5',
    name: 'Appliance Repair',
    description: 'Expert repairs for all major household appliances, including refrigerators, washing machines, and dishwashers.',
    imageUrl: 'https://images.pexels.com/photos/5063095/pexels-photo-5063095.jpeg',
    price: 80,
    category: 'Appliance Repair',
    assignedStaff: ['3'],
    isAvailable: true,
    estimatedTime: '1-3 hours',
    createdAt: new Date('2023-01-18')
  }
];

// Mock Bookings
export const bookings: Booking[] = [
  {
    id: '1',
    customerId: '1',
    facilityId: '1',
    staffId: '1',
    date: new Date('2023-04-15T10:00:00'),
    timeSlot: '10:00 - 12:00',
    status: 'completed',
    totalPrice: 75,
    notes: 'Fixing leak under the kitchen sink',
    createdAt: new Date('2023-04-10')
  },
  {
    id: '2',
    customerId: '2',
    facilityId: '3',
    staffId: '2',
    date: new Date('2023-04-20T08:00:00'),
    timeSlot: '08:00 - 12:00',
    status: 'completed',
    totalPrice: 120,
    notes: 'Full house cleaning, please pay special attention to bathrooms',
    createdAt: new Date('2023-04-15')
  },
  {
    id: '3',
    customerId: '1',
    facilityId: '4',
    staffId: '3',
    date: new Date('2023-05-05T14:00:00'),
    timeSlot: '14:00 - 16:00',
    status: 'confirmed',
    totalPrice: 95,
    notes: 'AC not cooling properly',
    createdAt: new Date('2023-05-01')
  }
];

// Mock Reviews
export const reviews: Review[] = [
  {
    id: '1',
    bookingId: '1',
    customerId: '1',
    staffId: '1',
    facilityId: '1',
    rating: 5,
    comment: 'John fixed our plumbing issue quickly and professionally. Highly recommend!',
    createdAt: new Date('2023-04-16')
  },
  {
    id: '2',
    bookingId: '2',
    customerId: '2',
    staffId: '2',
    facilityId: '3',
    rating: 5,
    comment: 'Sarah did an amazing job cleaning our home. Everything looks spotless!',
    createdAt: new Date('2023-04-21')
  }
];