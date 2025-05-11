export type UserRole = 'admin' | 'staff' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Note: In a real app, passwords would be hashed and not stored in frontend
  role: UserRole;
  profileImage?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: Date;
}

export interface Staff extends User {
  role: 'staff';
  skills: string[];
  assignedFacilities: string[];
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
  averageRating: number;
  totalReviews: number;
  isAvailable: boolean;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export interface Customer extends User {
  role: 'customer';
  bookings: string[];
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  assignedStaff: string[];
  isAvailable: boolean;
  estimatedTime: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  customerId: string;
  facilityId: string;
  staffId: string;
  date: Date;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  totalPrice: number;
  notes?: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  staffId: string;
  facilityId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}