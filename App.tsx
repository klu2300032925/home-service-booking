import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Facilities from './pages/Facilities';
import FacilityDetail from './pages/FacilityDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import StaffDashboard from './pages/dashboard/StaffDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FacilitiesProvider } from './context/FacilitiesContext';
import { BookingsProvider } from './context/BookingsContext';
import { ReviewsProvider } from './context/ReviewsContext';

// Protected route component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode;
  allowedRoles?: string[];
}> = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FacilitiesProvider>
          <BookingsProvider>
            <ReviewsProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/facilities" element={<Facilities />} />
                    <Route path="/facilities/:id" element={<FacilityDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Protected Routes */}
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/staff" 
                      element={
                        <ProtectedRoute allowedRoles={['staff']}>
                          <StaffDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/customer" 
                      element={
                        <ProtectedRoute allowedRoles={['customer']}>
                          <CustomerDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Redirect for unknown routes */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </ReviewsProvider>
          </BookingsProvider>
        </FacilitiesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;