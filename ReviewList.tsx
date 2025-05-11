import React from 'react';
import { Star, User, Calendar } from 'lucide-react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet.
      </div>
    );
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <div className="bg-gray-200 p-2 rounded-full mr-3">
                <User size={20} className="text-gray-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Customer</div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">{review.rating}/5</span>
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={14} className="mr-1" />
              {formatDate(review.createdAt)}
            </div>
          </div>
          <p className="text-gray-600 mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;