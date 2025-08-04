import React, { useState } from "react";

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  const checkout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Checkout SNAP! 🌟");
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePaymentLink = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Checkout Payment Link! 🔥");
    } catch (error) {
      console.error("Payment link error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center border border-gray-200 rounded-md">
          <button
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors disabled:opacity-50"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isLoading}
            aria-label="Kurangi jumlah"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>

          <input
            type="text"
            id="quantity"
            value={quantity}
            className="h-10 w-14 border-x border-gray-200 text-center text-gray-900 text-sm focus:outline-none"
            onChange={handleQuantityChange}
            disabled={isLoading}
            min="1"
          />

          <button
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors disabled:opacity-50"
            onClick={increaseQuantity}
            disabled={isLoading}
            aria-label="Tambah jumlah"
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
              Proses...
            </span>
          ) : (
            "Checkout Sekarang"
          )}
        </button>
      </div>

      <button
        className="w-full text-center text-indigo-600 hover:text-indigo-800 py-2 text-sm font-medium transition-colors focus:outline-none disabled:opacity-70"
        onClick={generatePaymentLink}
        disabled={isLoading}
      >
        {isLoading ? "Memproses..." : "Buat Tautan Pembayaran"}
      </button>
    </div>
  );
};

export default Checkout;