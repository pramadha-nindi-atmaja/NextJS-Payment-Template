import React, { useState } from "react";
import { product } from "../libs/product";
import { translations } from "../libs/i18n";
import Coupon from "./Coupon";

const formatPrice = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const OrderSummary = ({ quantity, selectedColor, lang = 'id', couponDiscount, setCouponDiscount }) => {
  const t = translations[lang] || translations['id'];
  const subtotal = quantity * product.price;
  const discountAmount = couponDiscount ? (subtotal * couponDiscount) / 100 : 0;
  const total = subtotal - discountAmount;
  
  // Find the color label based on the selected color value
  const colorLabel = product.colors.find(color => color.value === selectedColor)?.label || selectedColor;

  const handleApplyCoupon = (discount, couponCode) => {
    setCouponDiscount(discount);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-medium text-gray-900 mb-3">Ringkasan Pesanan</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Produk</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Warna</span>
          <span className="text-gray-900">{colorLabel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Jumlah</span>
          <span className="text-gray-900">{quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Harga Satuan</span>
          <span className="text-gray-900">{formatPrice(product.price)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        
        {couponDiscount > 0 && (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Diskon ({couponDiscount}%)</span>
              <span className="text-green-600">-{formatPrice(discountAmount)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-medium text-gray-900">Total Setelah Diskon</span>
              <span className="font-medium text-blue-600">{formatPrice(total)}</span>
            </div>
          </>
        )}
        
        {!couponDiscount && (
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="font-medium text-gray-900">Total</span>
            <span className="font-medium text-blue-600">{formatPrice(subtotal)}</span>
          </div>
        )}
      </div>
      
      {/* Coupon Section */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Coupon onApplyCoupon={handleApplyCoupon} lang={lang} />
      </div>
    </div>
  );
};

export default OrderSummary;