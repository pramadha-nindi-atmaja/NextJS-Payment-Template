import React, { useState } from "react";
import Image from "next/image";

const ProductGallery = ({ images, productName, isLoading }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="relative h-64 sm:h-80">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="relative h-64 sm:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image display */}
      <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={images[selectedImageIndex]}
          alt={`${productName} - View ${selectedImageIndex + 1}`}
          fill
          priority
          className="object-contain"
        />
      </div>
      
      {/* Thumbnail images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                selectedImageIndex === index 
                  ? "border-indigo-600 ring-2 ring-indigo-300" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setSelectedImageIndex(index)}
              aria-label={`View ${index + 1}`}
              aria-pressed={selectedImageIndex === index}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;