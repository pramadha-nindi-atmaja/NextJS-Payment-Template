"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "../contexts/WishlistContext";

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Daftar Keinginan</h1>
        
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Daftar keinginan Anda kosong</h3>
            <p className="mt-1 text-gray-500">Tambahkan produk ke daftar keinginan untuk menyimpannya untuk nanti.</p>
            <div className="mt-6">
              <Link href="/products" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Lanjutkan Belanja
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {wishlist.map((product) => (
                <li key={product.id} className="p-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link href={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p className="ml-4">{formatPrice(product.price)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.colors?.length > 0 && `Tersedia dalam ${product.colors.length} warna`}
                      </p>
                    </div>
                    
                    <div className="mt-4 flex-1 flex items-end justify-between">
                      <Link
                        href={`/product/${product.id}`}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Lihat Detail
                      </Link>
                      
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Hapus dari Daftar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-gray-200 px-6 py-4">
              <Link
                href="/products"
                className="text-indigo-600 font-medium hover:text-indigo-500"
              >
                ← Lanjutkan Belanja
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}