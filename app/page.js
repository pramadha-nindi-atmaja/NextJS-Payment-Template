"use client";

import Image from "next/image";
import { product } from "./libs/product";
import Checkout from "./components/Checkout";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // render midtrans snap token
    // Simulate loading completion
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64 sm:h-80">
          {isLoading ? (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>
        
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-blue-600">
              Rp {formatPrice(product.price)}
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Deskripsi Produk</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
          
          {product.features && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Fitur</h2>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6">
            <Checkout />
          </div>
        </div>
      </div>
    </main>
  );
}