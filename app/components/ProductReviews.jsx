import React, { useState } from 'react';
import RatingStars from './RatingStars';
import ReviewForm from './ReviewForm';

const ProductReviews = ({ product, onAddReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const handleAddReview = async (newReview) => {
    await onAddReview(newReview);
    setShowReviewForm(false);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Ulasan Pelanggan</h2>
        {!showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Tulis Ulasan
          </button>
        )}
      </div>
      
      {/* Overall Rating */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="text-center mb-4 sm:mb-0 sm:mr-8">
            <div className="text-4xl font-bold text-gray-900">{product.rating.toFixed(1)}</div>
            <div className="mt-1 text-sm text-gray-500">dari 5</div>
          </div>
          
          <div className="flex-1 w-full">
            <RatingStars 
              rating={product.rating} 
              size="lg"
              showLabel={true}
              reviewCount={product.reviewCount}
            />
            
            <div className="mt-4 text-sm text-gray-600">
              {product.reviewCount} ulasan pelanggan
            </div>
          </div>
        </div>
      </div>
      
      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-8">
          <ReviewForm 
            onSubmit={handleAddReview} 
            onCancel={() => setShowReviewForm(false)} 
          />
        </div>
      )}
      
      {/* Reviews List */}
      <div className="space-y-6">
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{review.userName}</h3>
                  <div className="mt-1">
                    <RatingStars rating={review.rating} size="sm" />
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              
              <div className="mt-3 text-gray-600">
                <p>{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Belum ada ulasan untuk produk ini.</p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Jadilah yang pertama menulis ulasan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;