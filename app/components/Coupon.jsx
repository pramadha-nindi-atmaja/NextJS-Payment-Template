import React, { useState } from "react";

const Coupon = ({ onApplyCoupon, lang = 'id' }) => {
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState('');

  const t = {
    id: {
      title: 'Kode Kupon',
      placeholder: 'Masukkan kode kupon',
      apply: 'Gunakan',
      applying: 'Memproses...',
      invalid: 'Kode kupon tidak valid',
      applied: 'Kupon berhasil diterapkan!',
      empty: 'Silakan masukkan kode kupon'
    },
    en: {
      title: 'Coupon Code',
      placeholder: 'Enter coupon code',
      apply: 'Apply',
      applying: 'Processing...',
      invalid: 'Invalid coupon code',
      applied: 'Coupon applied successfully!',
      empty: 'Please enter a coupon code'
    }
  };

  const translations = t[lang] || t['id'];

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setMessage(translations.empty);
      return;
    }

    setIsApplying(true);
    setMessage('');

    try {
      // In a real application, you would validate the coupon with your backend
      // For demo purposes, we'll simulate a successful coupon application
      const isValid = couponCode.toLowerCase() === 'diskon10' || couponCode.toLowerCase() === 'save20';
      
      if (isValid) {
        // Apply 10% discount for diskon10, 20% for save20
        const discount = couponCode.toLowerCase() === 'diskon10' ? 10 : 20;
        onApplyCoupon(discount, couponCode);
        setMessage(translations.applied);
      } else {
        setMessage(translations.invalid);
      }
    } catch (error) {
      setMessage(translations.invalid);
    } finally {
      setIsApplying(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{translations.title}</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={translations.placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isApplying}
        />
        <button
          onClick={handleApplyCoupon}
          disabled={isApplying}
          className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {isApplying ? translations.applying : translations.apply}
        </button>
      </div>
      {message && (
        <p className={`mt-2 text-sm ${message.includes('berhasil') || message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Coupon;