import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const RecentlyViewed = ({ lang = 'id' }) => {
  const { recentlyViewed } = useRecentlyViewed();
  
  const t = {
    id: {
      title: 'Baru saja dilihat',
      empty: 'Belum ada produk yang dilihat'
    },
    en: {
      title: 'Recently Viewed',
      empty: 'No products viewed yet'
    }
  };

  const translations = t[lang] || t['id'];

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto my-8 px-4 sm:px-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{translations.title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {recentlyViewed.map((product) => (
          <Link 
            key={product.id} 
            href="/" 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-32">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
              <p className="text-sm text-blue-600 font-medium mt-1">{formatPrice(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;