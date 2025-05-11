import React from 'react';
import { Users, Award, Shield, ThumbsUp, Clock, Settings } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About HomeServices</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Providing quality home services since 2010. We're committed to excellence in every service we offer.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                HomeServices was founded in 2010 with a simple mission: to provide reliable, high-quality home services that people can trust. What started as a small team of dedicated professionals has grown into a network of experts covering all aspects of home maintenance and repair.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Over the years, we've helped thousands of homeowners keep their homes in perfect condition, building a reputation for excellence and reliability in the process.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue to expand our services while maintaining our commitment to quality, reliability, and customer satisfaction. Our team of professionals is dedicated to providing the best possible service for all your home needs.
              </p>
            </div>
            <div className="mt-10 md:mt-0">
              <img
                src="https://images.pexels.com/photos/3810792/pexels-photo-3810792.jpeg"
                alt="Our Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and help us deliver consistently excellent service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-3 bg-red-100 rounded-full text-red-600 mb-4">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every service we provide, ensuring that each job meets our high standards of quality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-3 bg-red-100 rounded-full text-red-600 mb-4">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We operate with honesty and transparency, building trust with our customers through ethical business practices.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-3 bg-red-100 rounded-full text-red-600 mb-4">
                <ThumbsUp size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">
                We show up when we say we will and complete our work on time, respecting our customers' schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We stand out from the competition in several key ways that ensure you receive the best possible service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <Users size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Experienced Professionals</h3>
                <p className="text-gray-600">
                  Our team consists of experienced, vetted professionals with the skills and knowledge to handle any job.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <Clock size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Timely Service</h3>
                <p className="text-gray-600">
                  We value your time and always strive to provide prompt, efficient service without sacrificing quality.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <Settings size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Solutions</h3>
                <p className="text-gray-600">
                  From minor repairs to major projects, we offer a wide range of services to meet all your home maintenance needs.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <Shield size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Insured and Bonded</h3>
                <p className="text-gray-600">
                  All our work is fully insured, providing you with peace of mind and protection throughout the service process.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <Award size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">
                  We stand behind our work with a satisfaction guarantee, ensuring that you're happy with the results.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <ThumbsUp size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Customer-Focused</h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority, and we work closely with you to ensure that your needs are met.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who lead our company and ensure we deliver exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"
                alt="CEO"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">John Harrison</h3>
                <p className="text-red-600 mb-3">CEO & Founder</p>
                <p className="text-gray-600">
                  With over 20 years of experience in home services, John founded HomeServices to bring quality and reliability to the industry.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg"
                alt="Operations Director"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">Sarah Martinez</h3>
                <p className="text-red-600 mb-3">Operations Director</p>
                <p className="text-gray-600">
                  Sarah ensures that every service we provide meets our high standards of quality and customer satisfaction.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg"
                alt="Technical Manager"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">Michael Wilson</h3>
                <p className="text-red-600 mb-3">Technical Manager</p>
                <p className="text-gray-600">
                  Michael brings technical expertise to our team, guiding our professionals in delivering top-notch services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;