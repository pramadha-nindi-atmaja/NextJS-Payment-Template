import React, { useState, useEffect } from "react";
import { product } from "../libs/product";
import { translations } from "../libs/i18n";

const formatPrice = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const Checkout = ({ lang = 'id', selectedColor, quantity, setQuantity, selectedMethod, shippingInfo, couponDiscount }) => {
  const t = translations[lang];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  
  // Calculate total with discount
  const subtotal = quantity * product.price;
  const discountAmount = couponDiscount ? (subtotal * couponDiscount) / 100 : 0;
  const total = subtotal - discountAmount;

  const decreaseQuantity = () => {
    setQuantity((prevState) => (prevState > 1 ? prevState - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value < 1 ? 1 : value);
  };

  const handleQuantityBlur = () => {
    // Sanitize: ensure value is a positive integer
    setQuantity(Math.max(1, Math.min(99, Math.floor(quantity))));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.target.blur();
    }
  };

  const validateForm = () => {
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.phone || 
        !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode) {
      return false;
    }
    return true;
  };

  const checkout = async () => {
    if (!validateForm()) {
      setError(lang === 'id' ? 'Harap lengkapi semua informasi pengiriman yang diperlukan.' : 'Please complete all required shipping information.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          subtotal,
          discountAmount,
          total,
          selectedColor,
          selectedMethod,
          shippingInfo,
          couponDiscount
        }),
      });
      
      if (!response.ok) throw new Error('Checkout failed');
      
      const data = await response.json();
      window.snap.pay(data.token);
    } catch (error) {
      console.error("Checkout error:", error);
      setError(t.error.checkout);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePaymentLink = async () => {
    if (!validateForm()) {
      setError(lang === 'id' ? 'Harap lengkapi semua informasi pengiriman yang diperlukan.' : 'Please complete all required shipping information.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          subtotal,
          discountAmount,
          total,
          selectedColor,
          selectedMethod,
          shippingInfo,
          couponDiscount
        }),
      });
      
      if (!response.ok) throw new Error('Failed to generate payment link');
      
      const { paymentLink } = await response.json();
      // Copy to clipboard
      await navigator.clipboard.writeText(paymentLink);
      alert(t.linkCopied);
    } catch (error) {
      console.error("Payment link error:", error);
      setError(t.error.paymentLink);
    } finally {
      setIsLoading(false);
    }
  };

  // Retry mechanism for failed operations
  const retryOperation = () => {
    if (retryCount < 3) {
      setRetryCount(retryCount + 1);
      setError('');
      // Reset retry count after 5 seconds
      setTimeout(() => setRetryCount(0), 5000);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
          <div className="flex justify-between items-center">
            <span className="font-medium">{error}</span>
            {retryCount < 3 && (
              <button 
                onClick={retryOperation}
                className="text-sm font-medium text-red-900 underline hover:text-red-700"
                aria-label="Retry"
              >
                Coba Lagi
              </button>
            )}
          </div>
          {retryCount > 0 && (
            <p className="mt-1 text-xs">Percobaan ke-{retryCount} dari 3</p>
          )}
        </div>
      )}
      <div className="mb-4">
        <p className="text-sm text-gray-600">{t.unitPrice}: {formatPrice(product.price)}</p>
        {couponDiscount > 0 ? (
          <>
            <p className="text-sm text-gray-600 line-through">Subtotal: {formatPrice(subtotal)}</p>
            <p className="text-sm text-green-600">Diskon ({couponDiscount}%): -{formatPrice(discountAmount)}</p>
            <p className="text-lg font-semibold">Total: {formatPrice(total)}</p>
          </>
        ) : (
          <p className="text-lg font-semibold">{t.total}: {formatPrice(total)}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center border border-gray-200 rounded-md" role="group" aria-labelledby="quantity-label">
          <span id="quantity-label" className="sr-only">{t.quantity}</span>
          <button
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors disabled:opacity-50"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isLoading}
            aria-label={t.decrease}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>

          <input
            type="number"
            id="quantity"
            value={quantity}
            className="h-10 w-14 border-x border-gray-200 text-center text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            min="1"
            max="99"
            aria-label={t.quantity}
            role="spinbutton"
            aria-valuemin="1"
            aria-valuemax="99"
            aria-valuenow={quantity}
          />

          <button
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors disabled:opacity-50"
            onClick={increaseQuantity}
            disabled={isLoading}
            aria-label={t.increase}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <button
          className="w-full sm:w-auto rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
          onClick={checkout}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.processing}
            </span>
          ) : (
            t.checkout
          )}
        </button>
      </div>

      <button
        className="w-full text-center text-indigo-600 hover:text-indigo-800 py-2 text-sm font-medium transition-colors focus:outline-none disabled:opacity-70"
        onClick={generatePaymentLink}
        disabled={isLoading}
      >
        {isLoading ? t.processing : t.generateLink}
      </button>
    </div>
  );
};

export default Checkout;