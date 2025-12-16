import React, { useState } from 'react';
import RatingStars from './RatingStars';

const ReviewForm = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Silakan berikan rating terlebih dahulu.');
      return;
    }
    
    if (!name.trim()) {
      setError('Nama tidak boleh kosong.');
      return;
    }
    
    if (!comment.trim()) {
      setError('Komentar tidak boleh kosong.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // In a real app, this would be an API call
      const newReview = {
        id: Date.now(), // Simple ID generation
        userName: name,
        rating: rating,
        date: new Date().toISOString().split('T')[0],
        comment: comment
      };
      
      await onSubmit(newReview);
      
      // Reset form
      setRating(0);
      setName('');
      setComment('');
    } catch (err) {
      setError('Gagal mengirim ulasan. Silakan coba lagi.');
      console.error('Review submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Tulis Ulasan</h3>
      
      {error && (
        <div className="mb-4 p-3 text-sm text-red-800 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating Anda
          </label>
          <RatingStars 
            rating={rating} 
            onRatingChange={setRating} 
            interactive={true} 
            size="lg"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Anda
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Masukkan nama Anda"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Ulasan Anda
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Bagikan pengalaman Anda dengan produk ini..."
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;