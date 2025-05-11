import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, Star, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import FacilityCard from '../components/FacilityCard';
import { useFacilities } from '../context/FacilitiesContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { facilities } = useFacilities();
  
  // Get only 3 facilities for the showcase
  const showcaseFacilities = facilities.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Professional Home Services You Can Trust
            </h1>
            <p className="text-lg md:text-xl mb-8 text-red-100">
              From plumbing and electrical work to cleaning and repairs, we've got all your home service needs covered with our team of professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-white text-red-600 hover:bg-red-50"
                onClick={() => navigate('/facilities')}
              >
                Explore Services
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        
        {/* Trustmark bar */}
        <div className="bg-white/10 backdrop-blur-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center justify-center">
                <Check size={24} className="mb-2" />
                <span className="text-sm md:text-base font-medium">Verified Professionals</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Clock size={24} className="mb-2" />
                <span className="text-sm md:text-base font-medium">On-time Service</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Star size={24} className="mb-2" />
                <span className="text-sm md:text-base font-medium">Satisfaction Guaranteed</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Shield size={24} className="mb-2" />
                <span className="text-sm md:text-base font-medium">Insured & Bonded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our range of professional home services designed to keep your home in perfect condition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/facilities')}
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple process makes it easy to book the services you need in just a few steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Browse Services</h3>
              <p className="text-gray-600">Explore our range of professional home services and find what you need.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Book Online</h3>
              <p className="text-gray-600">Select your service, choose a convenient time, and book with ease.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Service</h3>
              <p className="text-gray-600">Our professionals will arrive on time and provide quality service.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. See what our satisfied customers have to say about our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The plumber was professional, courteous, and fixed our leaky pipe in no time. Highly recommend their services!"
              </p>
              <div className="font-medium">- Sarah Johnson</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Their cleaning service transformed my home! Every corner was spotless, and the staff was friendly and efficient."
              </p>
              <div className="font-medium">- Michael Brown</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={18} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Quick response to my AC emergency! The technician diagnosed the problem quickly and had my system running again by the end of the day."
              </p>
              <div className="font-medium">- Jennifer Smith</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Book your first service today and experience the difference of professional home services.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="bg-white text-red-600 hover:bg-red-50"
            onClick={() => navigate('/facilities')}
          >
            Book a Service
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;