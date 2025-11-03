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

const Checkout = ({ lang = 'id' }) => {
  const t = translations[lang];
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(product.price);

  useEffect(() => {
    setTotal(quantity * product.price);
  }, [quantity]);

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

  const checkout = async () => {
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
          total,
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
          total,
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

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
          <span className="font-medium">{error}</span>
        </div>
      )}
      <div className="mb-4">
        <p className="text-sm text-gray-600">{t.unitPrice}: {formatPrice(product.price)}</p>
        <p className="text-lg font-semibold">{t.total}: {formatPrice(total)}</p>
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