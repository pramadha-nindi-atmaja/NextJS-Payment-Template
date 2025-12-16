"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useWishlist } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-hot-toast";

// Dummy product data
const dummyProducts = [
  {
    id: 1,
    name: "LEVI'S® WOMEN'S XL TRUCKER JACKET",
    price: 350000,
    image: "/img.png",
    rating: 4.5,
    reviewCount: 128,
    colors: ["putih", "biru", "hitam"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "ZARA Basic Cotton T-Shirt",
    price: 150000,
    image: "/img.png",
    rating: 4.2,
    reviewCount: 89,
    colors: ["putih", "hitam", "abu-abu"],
    sizes: ["S", "M", "L"]
  },
  {
    id: 3,
    name: "UNIQLO Ultra Stretch Jeans",
    price: 450000,
    image: "/img.png",
    rating: 4.7,
    reviewCount: 203,
    colors: ["biru", "hitam"],
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    id: 4,
    name: "H&M Slim Fit Chino Pants",
    price: 250000,
    image: "/img.png",
    rating: 4.0,
    reviewCount: 67,
    colors: ["khaki", "hitam", "navy"],
    sizes: ["28", "30", "32", "34"]
  },
  {
    id: 5,
    name: "ADIDAS Running Shoes",
    price: 750000,
    image: "/img.png",
    rating: 4.8,
    reviewCount: 156,
    colors: ["putih", "hitam", "biru"],
    sizes: ["39", "40", "41", "42", "43", "44"]
  },
  {
    id: 6,
    name: "NIKE Sports Jacket",
    price: 650000,
    image: "/img.png",
    rating: 4.6,
    reviewCount: 94,
    colors: ["hitam", "biru", "merah"],
    sizes: ["S", "M", "L", "XL"]
  }
];

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

export default function ProductsPage() {
  const [products] = useState(dummyProducts);
  const { wishlist, toggleWishlist } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} ditambahkan ke keranjang`);
  };

  const handleToggleWishlist = (product) => {
    if (!isAuthenticated) {
      toast.error("Silakan masuk untuk menambahkan ke daftar keinginan");
      return;
    }
    
    const wasInWishlist = isInWishlist(product.id);
    toggleWishlist(product);
    
    if (wasInWishlist) {
      toast.success(`${product.name} dihapus dari daftar keinginan`);
    } else {
      toast.success(`${product.name} ditambahkan ke daftar keinginan`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/products" className="text-xl font-bold text-indigo-600">
                ShopNow
              </Link>
            </div>
            
            <div className="flex-1 mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center text-sm rounded-full focus:outline-none">
                    <span className="mr-2 text-gray-700 hidden md:block">{user?.name}</span>
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-800 font-medium">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  </button>
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
                    <div className="py-1">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profil
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Pesanan Saya
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Keluar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  Masuk
                </Link>
              )}
              
              <Link href="/wishlist" className="text-gray-600 hover:text-gray-900 relative">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-gray-900 relative">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Produk Kami</h1>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada produk ditemukan</h3>
            <p className="mt-1 text-sm text-gray-500">Coba ubah kata kunci pencarian Anda.</p>
            <div className="mt-6">
              <button
                onClick={() => setSearchTerm("")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Lihat semua produk
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/product/${product.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link href={`/product/${product.id}`} className="block">
                    <h2 className="text-sm font-medium text-gray-900 line-clamp-2 h-12">
                      {product.name}
                    </h2>
                  </Link>
                  
                  <div className="mt-2 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                  
                  <p className="mt-2 text-lg font-medium text-blue-600">
                    {formatPrice(product.price)}
                  </p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      + Keranjang
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleWishlist(product);
                      }}
                      className="p-1 text-gray-400 hover:text-red-500 focus:outline-none"
                    >
                      {isInWishlist(product.id) ? (
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}