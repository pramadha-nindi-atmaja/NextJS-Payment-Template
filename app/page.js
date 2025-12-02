"use client";

import Image from "next/image";
import { product } from "./libs/product";
import Checkout from "./components/Checkout";
import OrderSummary from "./components/OrderSummary";
import PaymentMethods from "./components/PaymentMethods";
import ShippingInfo from "./components/ShippingInfo";
import ProductGallery from "./components/ProductGallery";
import SizeSelector from "./components/SizeSelector";
import WishlistButton from "./components/WishlistButton";
import { useRecentlyViewed } from "./contexts/RecentlyViewedContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].value);
  const [quantity, setQuantity] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('credit_card');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    // Add product to recently viewed
    addRecentlyViewed(product);
    
    // render midtrans snap token
    // Simulate loading completion
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [addRecentlyViewed]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Product Gallery Component */}
        <div className="p-4 sm:p-6">
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
            isLoading={isLoading} 
          />
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
          
          {/* Wishlist Button */}
          <div className="mb-4">
            <WishlistButton product={product} />
          </div>
          
          {/* Size Selection */}
          <SizeSelector 
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />
          
          {/* Color Selection */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Warna</h2>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.value}
                  className={`px-3 py-1 text-sm rounded-full border transition-all ${
                    selectedColor === color.value
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-medium"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedColor(color.value)}
                  aria-pressed={selectedColor === color.value}
                >
                  {color.label}
                </button>
              ))}
            </div>
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
          
          {/* Shipping Information */}
          <ShippingInfo 
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
          />
          
          {/* Payment Methods */}
          <PaymentMethods 
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
          
          {/* Order Summary */}
          <div className="mb-6">
            <OrderSummary 
              quantity={quantity} 
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              couponDiscount={couponDiscount}
              setCouponDiscount={setCouponDiscount}
            />
          </div>
          
          <div className="mt-6">
            <Checkout 
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
              selectedMethod={selectedMethod}
              shippingInfo={shippingInfo}
              couponDiscount={couponDiscount}
            />
          </div>
        </div>
      </div>
    </main>
  );
}